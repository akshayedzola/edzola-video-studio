"""Qwen3-TTS (Alibaba, Apache-2.0) batch worker for Windows/Linux via the PyTorch
`qwen-tts` package. Runs in $EDZOLA_VIDEO_HOME/voice-lab/.venv-qwen. An NVIDIA GPU is
strongly recommended; CPU works but is slow. (macOS uses qwen_worker.py on mlx-audio.)

Usage: python qwen_torch_worker.py <jobs.json>
jobs.json: [{"text", "out", "model", "instruct", "speaker"?}]
Model names written for mlx-audio (mlx-community/Qwen3-TTS-...-bf16) are mapped to the
official Qwen/ weights, so one storyboard works on every platform.
"""

import json
import re
import sys

import soundfile as sf
import torch
from qwen_tts import Qwen3TTSModel


def official(name: str) -> str:
    if name.startswith("mlx-community/"):
        name = "Qwen/" + name.split("/", 1)[1]
    return re.sub(r"-(bf16|fp16|[0-9]+bit)$", "", name)


device = "cuda" if torch.cuda.is_available() else "cpu"
dtype = torch.bfloat16 if device == "cuda" else torch.float32
jobs = json.load(open(sys.argv[1]))
models = {}
for i, job in enumerate(jobs):
    name = official(job["model"])
    if name not in models:
        models[name] = Qwen3TTSModel.from_pretrained(name, device_map=device, dtype=dtype)
    model = models[name]
    if "CustomVoice" in name:
        wavs, sr = model.generate_custom_voice(text=job["text"], speaker=job["speaker"], language="English",
                                               instruct=job.get("instruct", ""))
    else:
        wavs, sr = model.generate_voice_design(text=job["text"], instruct=job["instruct"], language="English")
    sf.write(job["out"], wavs[0], sr)
    print(f"[{i + 1}/{len(jobs)}] {job['out']}", flush=True)
