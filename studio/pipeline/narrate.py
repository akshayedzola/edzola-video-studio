"""Narrate a storyboard: one TTS clip per beat, exact timing for every cue.

Usage:
  python narrate.py <storyboard.json> <lexicon.json> <build_dir> <models_dir>

Writes to <build_dir>:
  narration.wav   full episode narration (24 kHz mono), scene-aligned
  timing.json     per scene: duration, beats [{start, end}], captions, sfx
  cache/          per-beat clips keyed by content hash (re-runs only redo
                  beats whose text/voice/direction changed)

Synthesising each beat separately gives us beat boundaries for free, so
animation cues and captions line up with the voice without a separate
forced-alignment pass.

Voice engines (storyboard `voice.engine`):
  kokoro      local, fast, consistent; pace via native speed; no emotion
  chatterbox  local (MIT); per-beat `energy` -> exaggeration / cfg_weight
  qwen        local via mlx-audio (Apache-2.0); per-beat `direction` text
  macos-say   no-dependency fallback
Per-beat `voice: {pace, energy, direction}` overrides shape delivery.
"""

import hashlib
import json
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
import soundfile as sf

SR = 24000
DEFAULT_LEAD_IN = 0.6
DEFAULT_PAUSE = 0.35
DEFAULT_HOLD = 0.9
CAPTION_MAX_CHARS = 52
HERE = Path(__file__).resolve().parent
HOME = Path(os.environ.get("EDZOLA_VIDEO_HOME", Path.home() / ".edzola-video-studio"))
WORKERS = {
    "chatterbox": (HOME / "voice-lab/.venv/bin/python", HERE / "voices/chatterbox_worker.py"),
    "qwen": (HOME / "voice-lab/.venv-mlx/bin/python", HERE / "voices/qwen_worker.py"),
}


def apply_lexicon(text: str, lexicon: dict) -> str:
    for key in sorted((k for k in lexicon if not k.startswith("$")), key=len, reverse=True):
        text = re.sub(rf"(?<![\w&]){re.escape(key)}(?![\w&])", lexicon[key], text)
    return text


def trim(audio: np.ndarray, threshold: float = 0.01, pad: float = 0.04) -> np.ndarray:
    idx = np.where(np.abs(audio) > threshold)[0]
    if len(idx) == 0:
        return audio
    p = int(pad * SR)
    return audio[max(0, idx[0] - p): min(len(audio), idx[-1] + p)]


def caption_chunks(text: str, max_chars: int = CAPTION_MAX_CHARS) -> list[str]:
    """Split into caption-sized chunks, preferring sentence/clause breaks."""
    sentences = re.split(r"(?<=[.!?])\s+", text.strip())
    chunks = []
    for s in sentences:
        words, line = s.split(), ""
        for w in words:
            candidate = f"{line} {w}".strip()
            if len(candidate) > max_chars and line:
                chunks.append(line)
                line = w
            else:
                line = candidate
        if line:
            # Merge a short tail ("argument?") into the previous line rather than flash it alone.
            if chunks and len(line) < 16 and len(chunks[-1]) + len(line) < max_chars + 18:
                chunks[-1] = f"{chunks[-1]} {line}"
            else:
                chunks.append(line)
    return chunks


def ffmpeg_to_mono24k(src: Path, dst: Path, tempo: float = 1.0):
    """Resample to 24 kHz mono and apply pitch-preserving tempo (atempo)."""
    af = ["-af", f"atempo={tempo:.3f}"] if abs(tempo - 1) > 0.005 else []
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(src), *af, "-ar", str(SR), "-ac", "1", str(dst)], check=True)


class Voice:
    def __init__(self, cfg: dict, models_dir: Path):
        self.cfg = cfg
        self.engine = cfg.get("engine", "kokoro")
        self.models_dir = models_dir
        self._kokoro = None

    def params(self, beat: dict) -> dict:
        """Engine parameters for one beat, from the episode voice + beat overrides."""
        v = beat.get("voice", {})
        pace = v.get("pace", 1.0) * self.cfg.get("speed", 1.0)
        energy = v.get("energy", 0.5)
        direction = v.get("direction", "")
        if self.engine == "chatterbox":
            return {"exaggeration": round(0.3 + 0.6 * energy, 3), "cfg_weight": round(0.55 - 0.3 * energy, 3),
                    "tempo": pace, "audio_prompt": self.cfg.get("reference"),
                    **({"seed": v["seed"]} if "seed" in v else {})}  # only retakes change the cache key
        if self.engine == "qwen":
            persona = self.cfg.get("persona", "")
            return {"model": self.cfg["voice"], "speaker": self.cfg.get("speaker"),
                    "instruct": f"{persona} {direction}".strip() if "Design" in self.cfg["voice"] else direction,
                    "tempo": pace}
        return {"speed": pace}

    def key(self, text: str, params: dict) -> str:
        sig = json.dumps([self.engine, self.cfg.get("voice"), self.cfg.get("lang"), params, text], sort_keys=True)
        return hashlib.sha1(sig.encode()).hexdigest()[:16]

    def synth_batch(self, jobs: list[dict]):
        """jobs: [{text, out (Path), params}] -> writes trimmed 24 kHz clips to job['out']."""
        if not jobs:
            return
        if self.engine == "kokoro":
            if self._kokoro is None:
                from kokoro_onnx import Kokoro
                self._kokoro = Kokoro(str(self.models_dir / "kokoro-v1.0.onnx"), str(self.models_dir / "voices-v1.0.bin"))
            for j in jobs:
                samples, sr = self._kokoro.create(j["text"], voice=self.cfg["voice"], speed=j["params"]["speed"],
                                                  lang=self.cfg.get("lang", "en-gb"))
                assert sr == SR
                sf.write(j["out"], trim(np.asarray(samples, dtype=np.float32)), SR)
            return
        if self.engine == "macos-say":
            for j in jobs:
                aiff = j["out"].with_suffix(".aiff")
                rate = int(180 * j["params"]["speed"])
                subprocess.run(["say", "-v", self.cfg["voice"], "-r", str(rate), "-o", str(aiff), j["text"]], check=True)
                ffmpeg_to_mono24k(aiff, j["out"])
                aiff.unlink()
                sf.write(j["out"], trim(sf.read(j["out"], dtype="float32")[0]), SR)
            return
        python, worker = WORKERS[self.engine]
        if not python.exists():
            raise SystemExit(f"{self.engine} env missing at {python}; run: bash setup.sh --voices")
        with tempfile.TemporaryDirectory() as tmp:
            raw_jobs = []
            for i, j in enumerate(jobs):
                p = {k: v for k, v in j["params"].items() if k != "tempo" and v is not None}
                raw_jobs.append({"text": j["text"], "out": f"{tmp}/{i}.wav", **p})
            spec = Path(tmp) / "jobs.json"
            spec.write_text(json.dumps(raw_jobs))
            env = {**os.environ, "PYTORCH_ENABLE_MPS_FALLBACK": "1"}
            subprocess.run([str(python), str(worker), str(spec)], check=True, env=env)
            for i, j in enumerate(jobs):
                tmp_out = Path(tmp) / f"{i}_24k.wav"
                ffmpeg_to_mono24k(Path(tmp) / f"{i}.wav", tmp_out, j["params"].get("tempo", 1.0))
                sf.write(j["out"], trim(sf.read(tmp_out, dtype="float32")[0]), SR)


def main():
    storyboard_path, lexicon_path, build_dir, models_dir = map(Path, sys.argv[1:5])
    board = json.loads(storyboard_path.read_text())
    lexicon = json.loads(lexicon_path.read_text())
    cache = build_dir / "cache"
    cache.mkdir(parents=True, exist_ok=True)
    voice = Voice(board["voice"], models_dir)

    # Pass 1: work out every beat's clip and synthesise the missing ones in one batch.
    plan, missing = [], []
    for scene in board["scenes"]:
        for beat in scene["beats"]:
            spoken = apply_lexicon(beat.get("say", beat["text"]), lexicon)
            params = voice.params(beat)
            clip = cache / f"{voice.key(spoken, params)}.wav"
            plan.append((spoken, clip))
            if not clip.exists() and all(m["out"] != clip for m in missing):
                missing.append({"text": spoken, "out": clip, "params": params})
    voice.synth_batch(missing)

    # Pass 2: lay clips on the timeline.
    timeline, scenes_out, t_abs, k = [], [], 0.0, 0
    for scene in board["scenes"]:
        t = scene.get("lead_in", DEFAULT_LEAD_IN)
        parts = [np.zeros(int(t * SR), dtype=np.float32)]
        beats_out = []
        for beat in scene["beats"]:
            spoken, clip_path = plan[k]
            k += 1
            clip, _ = sf.read(clip_path, dtype="float32")
            dur = len(clip) / SR
            chunks = caption_chunks(beat["text"])
            total_chars = sum(len(c) for c in chunks) or 1
            caps, c_t = [], t
            for c in chunks:
                c_dur = dur * len(c) / total_chars
                caps.append({"text": c, "start": round(c_t, 3), "end": round(c_t + c_dur, 3)})
                c_t += c_dur
            sfx = [{"name": s["name"], "at": round(t + s.get("at", 0) * dur, 3), "gain": s.get("gain", 0)}
                   for s in beat.get("sfx", [])]
            beats_out.append({"start": round(t, 3), "end": round(t + dur, 3), "spoken": spoken,
                              "captions": caps, "sfx": sfx})
            pause = beat.get("pause", DEFAULT_PAUSE)
            parts += [clip, np.zeros(int(pause * SR), dtype=np.float32)]
            t += dur + pause
        hold = scene.get("hold", DEFAULT_HOLD)
        parts.append(np.zeros(int(hold * SR), dtype=np.float32))
        audio = np.concatenate(parts)
        # Snap scene length to whole frames (30 fps) so audio and video never drift.
        frames = int(np.ceil(len(audio) / SR * 30))
        duration = frames / 30
        audio = np.pad(audio, (0, int(round(duration * SR)) - len(audio)))
        timeline.append(audio)
        scenes_out.append({"id": scene["id"], "start": round(t_abs, 3), "duration": duration, "beats": beats_out})
        t_abs += duration

    narration = np.concatenate(timeline)
    sf.write(build_dir / "narration.wav", narration, SR)
    (build_dir / "timing.json").write_text(json.dumps({"total": round(t_abs, 3), "scenes": scenes_out}, indent=2))
    print(json.dumps({"total_seconds": round(t_abs, 2), "beats_synthesised": len(missing),
                      "beats_cached": len(plan) - len(missing), "engine": voice.engine}))


if __name__ == "__main__":
    main()
