"""Qwen3-TTS (Alibaba, Apache-2.0) batch worker via mlx-audio on Apple Silicon.
Runs in $EDZOLA_VIDEO_HOME/voice-lab/.venv-mlx.

Usage: python qwen_worker.py <jobs.json>
jobs.json: [{"text", "out", "model", "instruct", "speaker"?}]
  - VoiceDesign models: the voice is described in `instruct` (persona + direction).
  - CustomVoice models: fixed `speaker`, emotion/pace direction in `instruct`.
"""

import json
import sys

import numpy as np
import soundfile as sf
from mlx_audio.tts.utils import load_model

jobs = json.load(open(sys.argv[1]))
models = {}
for i, job in enumerate(jobs):
    name = job["model"]
    if name not in models:
        models[name] = load_model(name)
    model = models[name]
    if "CustomVoice" in name:
        results = model.generate_custom_voice(
            text=job["text"], speaker=job["speaker"], language="English", instruct=job["instruct"]
        )
    else:
        results = model.generate_voice_design(text=job["text"], language="English", instruct=job["instruct"])
    audio = np.concatenate([np.array(r.audio) for r in results])
    sf.write(job["out"], audio, model.sample_rate)
    print(f"[{i + 1}/{len(jobs)}] {job['out']}", flush=True)
