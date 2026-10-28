# Voice comparison (Oct 2026)

`voice-comparison.m4a` plays the same six cold-open lines in four voices. A chime separates each voice, in this order:

| # | Voice | Licence | Controls | Notes |
|---|---|---|---|---|
| 1 | Kokoro `bf_emma`, flat (v1 voice) | Apache-2.0 | none | Clean, consistent, monotone |
| 2 | Kokoro `bf_emma`, paced | Apache-2.0 | per-beat speed | Better rhythm, still no emotion |
| 3 | **Chatterbox** (Resemble AI), expressive (used in ep000 v2) | MIT | per-beat `energy` → exaggeration/cfg, `pace`, `seed` (retakes) | Much more alive. About 6× slower than real time on an M2 Pro. Short punchy lines sometimes slur; listen-back catches these, and a new `seed` or a spoken rewrite fixes them. Output carries Resemble's inaudible watermark. |
| 4 | **Qwen3-TTS VoiceDesign** (Alibaba) | Apache-2.0 | plain-English `instruct` (persona + acting note) | Voice designed from a description ("warm… light Indian English accent"). Can drift between lines because the voice is re-designed on every call. A CustomVoice model with a fixed speaker would be steadier. |

**How to switch an episode's voice:** set `voice.engine` in `storyboard.json` (`kokoro` | `chatterbox` | `qwen` | `macos-say`), then run `npm run render`. Scenes read their timing from the narration, so the visuals re-sync automatically.

**Paid upgrade if local voices aren't good enough:** ElevenLabs v3/v4 (audio tags like `[excited]`, Indian-English voice library, about $0.36 per 5-minute episode) or Sarvam Bulbul v3 (most authentic en-IN, ₹30 per 10k characters). Either needs an API key in an environment variable, never in a file.
