"""Chatterbox (Resemble AI, MIT) batch worker. Runs in its own venv
($EDZOLA_VIDEO_HOME/voice-lab/.venv) because it needs torch.

Usage: python chatterbox_worker.py <jobs.json>
jobs.json: [{"text", "out", "exaggeration", "cfg_weight", "seed"?, "audio_prompt"?}]
"""

import json
import sys

import torch
import torchaudio as ta
from chatterbox.tts import ChatterboxTTS

dev = "mps" if torch.backends.mps.is_available() else "cpu"
_load = torch.load
torch.load = lambda *a, **k: _load(*a, **{"map_location": torch.device(dev), **k})

model = ChatterboxTTS.from_pretrained(device=dev)
jobs = json.load(open(sys.argv[1]))
for i, job in enumerate(jobs):
    torch.manual_seed(job.get("seed", 7))
    wav = model.generate(
        job["text"],
        exaggeration=job["exaggeration"],
        cfg_weight=job["cfg_weight"],
        audio_prompt_path=job.get("audio_prompt"),
    )
    ta.save(job["out"], wav, model.sr)
    print(f"[{i + 1}/{len(jobs)}] {job['out']}", flush=True)
