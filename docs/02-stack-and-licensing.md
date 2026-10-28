# Stack decisions and licensing (market research, Oct 2026)

Research date: 20 Oct 2026. Versions and licences were checked against npm, PyPI, GitHub and Hugging Face. Commercial prices are from secondary sources; verify before budgeting.

## Decisions

| Layer | Choice | Licence | Why |
|---|---|---|---|
| Animation engine | **Revideo 0.11** (`@revideo/*`) | MIT | Fork of Motion Canvas with the same scene API, plus an official **headless render API**. Released Jul 2026 (github.com/midrender/revideo). Renders our 1:49 episode in ~20 s. |
| Narration (POC) | **Kokoro-82M** via `kokoro-onnx` 0.6.1 | Apache-2.0 weights, MIT wrapper | Runs locally on Apple Silicon, no API key, ~2× real-time on CPU, good British/American voices, Hindi voices too. |
| Listen-back QA | **faster-whisper** 1.2.1 (`base.en`) | MIT | Plain pip install on Mac; catches mispronunciations. |
| Encoding / mux | **FFmpeg** 8.x | LGPL/GPL build (Homebrew) | Loudness normalisation, captions, thumbnails, QA filters. Used as a CLI tool, not linked into a product. |
| Fonts | **Fraunces + Inter** | SIL OFL | Matches the published Technology That Sticks kit. |
| Orchestration | TypeScript (`tsx`) + Python | | The engine is TS; the audio/ML ecosystem is Python. |

## Why not Motion Canvas directly?

The concept note proposed Motion Canvas. We kept its **authoring model** (Revideo scenes are Motion Canvas scenes) but not the package:
- Motion Canvas's last release was 3.17.2 (Dec 2024); code commits stopped in Feb 2025. It isn't archived, but it is effectively dormant.
- It has **no headless rendering**. Issue #415 (2023) is still open, and PR #1055 was never merged. Rendering means driving the editor UI with Puppeteer.

Any Motion Canvas tutorial, snippet or skill transfers to Revideo with a different import path (`@revideo/2d` instead of `@motion-canvas/2d`). If Revideo stalls, porting back is mechanical.

## Why not Remotion?

Remotion is source-available, not OSI open source. Companies with more than 3 employees need a Company License: $25/month per creator seat, $0.01 per render, $100/month minimum, Enterprise from $500/month. Remotion 5 will count contractors toward team size. It is very active and excellent; reconsider it if we ever want its React ecosystem and accept the cost.

## Watch list (re-evaluate quarterly)

| Tool | Licence | Status | Potential role |
|---|---|---|---|
| **HyperFrames** (HeyGen) | Apache-2.0 | Created Mar 2026, ~68k stars, releases daily, Node 22+ | HTML/CSS-based, deterministic MP4 via CLI, ships Claude Code skills. **Top alternative.** Prototype one scene type in it during Week 2. |
| Manim Community 0.22 | MIT | Active | Precise maths and graph animation; render to MP4/SVG and embed |
| Excalidraw | MIT | Very active | Hand-drawn diagrams → SVG assets |
| Lottie / dotLottie | MIT | lottie-web in maintenance | Icon and character micro-animations |
| Theatre.js | Apache-2.0 | Stale since Aug 2024 | Avoid |
| Kdenlive | GPL | Active | Manual finishing only when needed |
| Playwright + OBS | Apache-2.0 / GPL | Active | Product walkthrough capture |

## Voice options and licence traps

| Option | Licence | Verdict |
|---|---|---|
| **Kokoro-82M** | Apache-2.0 | ✅ Default. No en-IN English voice; we use `bf_emma` (British, matches our British English). |
| **Chatterbox** (Resemble AI) | MIT | ✅ Step-up option: consented voice cloning of an EdZola team member for an Indian-English voice. Outputs carry a watermark. |
| **Sarvam Bulbul v3** | Commercial API | ✅ Production path for en-IN and 10 Indic languages (Hindi, Tamil…). Reported at about ₹30 per 10k characters (unverified). |
| ElevenLabs / OpenAI / Google Chirp | Commercial API | OK if budgeted; Google has en-IN voices |
| Coqui XTTS-v2 | Weights **non-commercial**, company shut down | ❌ Avoid |
| F5-TTS | Weights **CC-BY-NC** | ❌ Avoid |
| Piper (new) | **GPL-3.0** successor | ⚠️ Avoid embedding in products |

**Consent rule:** never clone a real person's voice without their written consent, recorded in `assets/voices/CONSENT.md`.

## Known environment notes

- npm 10 crashes resolving Revideo's peer graph, so `setup.sh` uses `--legacy-peer-deps`.
- Puppeteer 25 prefers Node ≥ 22.12. Node 20.19 works but warns, so upgrade to Node 22 LTS when convenient.
- Rendering uses `chrome-headless-shell` (`puppeteer: {headless: 'shell'}`); full Chrome failed to start in sandboxed shells.
