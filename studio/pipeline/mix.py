"""Mix narration + sound effects + music bed into one stem (48 kHz mono).

Usage:
  python mix.py <build_dir> <sfx_dir> <music: none | procedural:<style> | path.wav>

Reads <build_dir>/narration.wav and timing.json (sfx events per beat, already
absolute within each scene), writes <build_dir>/mix.wav. Loudness
normalisation happens later in the FFmpeg mux.

Ducking: the music follows the inverse of the voice envelope, so it rises in
pauses and sits well under speech. Effects are placed at their cue times.
"""

import json
import subprocess
import sys
from pathlib import Path

import numpy as np
import soundfile as sf

SR = 48000
SFX_GAIN_DB = -9.0       # effects sit under the voice
MUSIC_GAIN_DB = -21.0    # bed level in pauses
DUCK_DB = -9.0           # extra reduction while the narrator speaks


def db(x):
    return 10 ** (x / 20)


def load(path: Path) -> np.ndarray:
    """Mono float32 at 48 kHz (FFmpeg does any resampling, for quality)."""
    if sf.info(str(path)).samplerate != SR:
        raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", str(path), "-ac", "1", "-ar", str(SR),
                              "-f", "f32le", "-"], check=True, capture_output=True).stdout
        return np.frombuffer(raw, dtype=np.float32).copy()
    audio, _ = sf.read(path, dtype="float32", always_2d=True)
    return audio.mean(axis=1)


def box(x: np.ndarray, n: int) -> np.ndarray:
    """Centred moving average in O(len(x)) via a running sum."""
    c = np.cumsum(np.r_[np.zeros(n // 2 + 1), x, np.zeros(n - n // 2)])
    return (c[n:n + len(x)] - c[:len(x)]) / n


def envelope(x: np.ndarray, win: float = 0.25) -> np.ndarray:
    """Smoothed 0..1 voice-activity envelope."""
    active = (np.sqrt(box(x.astype(np.float64) ** 2, int(win * SR))) > 0.01).astype(np.float64)
    return np.clip(box(active, int(0.4 * SR)), 0, 1)  # 0.4 s attack/release smoothing


def main():
    build, sfx_dir, music = Path(sys.argv[1]), Path(sys.argv[2]), sys.argv[3]
    timing = json.loads((build / "timing.json").read_text())
    voice = load(build / "narration.wav")
    total = len(voice)

    sfx = np.zeros(total, dtype=np.float32)
    cache, placed = {}, 0
    for scene in timing["scenes"]:
        for beat in scene["beats"]:
            for ev in beat.get("sfx", []):
                if ev["name"] not in cache:
                    cache[ev["name"]] = load(sfx_dir / f"{ev['name']}.wav")
                clip = cache[ev["name"]] * db(ev.get("gain", 0))
                start = int((scene["start"] + ev["at"]) * SR)
                end = min(total, start + len(clip))
                if start < total:
                    sfx[start:end] += clip[: end - start]
                    placed += 1

    bed = np.zeros(total, dtype=np.float32)
    if music != "none":
        if music.startswith("procedural:"):
            path = build / "music.wav"
            subprocess.run([sys.executable, str(Path(__file__).with_name("sound.py")), "music", str(path),
                            str(total / SR + 0.1), music.split(":", 1)[1]], check=True)
        else:
            path = Path(music)
        m = load(path)
        reps = int(np.ceil(total / len(m)))
        bed = np.tile(m, reps)[:total]
        duck = db(MUSIC_GAIN_DB) * (1 - (1 - db(DUCK_DB)) * envelope(voice))
        bed = bed * duck

    mix = voice + sfx * db(SFX_GAIN_DB) + bed
    peak = np.max(np.abs(mix))
    if peak > 0.98:
        mix *= 0.98 / peak
    sf.write(build / "mix.wav", mix.astype(np.float32), SR)
    print(json.dumps({"sfx_events": placed, "music": music, "seconds": round(total / SR, 2)}))


if __name__ == "__main__":
    main()
