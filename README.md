# EdZola Video Studio

**An open, collaborative studio for turning EdZola's knowledge into excellent teaching videos**: nonprofit data systems, MIS, M&E, AI in the social sector, and EdZola's MAP framework. Every video is built from source files (a storyboard, HTML scenes, an AI voice with acting direction, synthesised sound design) and reviewed by humans before it reaches YouTube.

**The goal: 3,500+ videos.** That's 220 long-form explainers, 660 Shorts, and Hindi, Tamil and Marathi versions, made together by the EdZola team and contributors.

▶ **Watch the reference episode first:** *What is an MIS, really?* (4:09). See [Releases](../../releases). Then read **[the explainer formula](docs/13-explainer-formula.md)** (why it works) and **[creative range](docs/16-creative-range.md)** (the six things every video must do, and the many ways to do them, so 3,500 videos don't look alike).

---

## How to make a video (the short version)

```mermaid
flowchart LR
  O[Open] -->|/claim| C[Claimed]
  C -->|draft PR| R[Creation]
  R -->|PR ready for review| M[Manual review]
  M -->|merged| A[Approved]
  A -->|/published url| P[Published on YouTube]
  P -->|auto| S[Shorts + language versions open up]
```

1. **Pick** an open episode in [Issues](../../issues?q=is%3Aopen+label%3Aepisode+label%3Astage%3Aopen+label%3Apriority%3Ap1) (start with `priority:p1`) and comment **`/claim`**. Progress for everyone is in **[TRACKER.md](TRACKER.md)**.
2. **Set up** once. **Windows:** `powershell -ExecutionPolicy Bypass -File studio\setup.ps1 -Voices` ([Windows guide](docs/15-windows.md)). **macOS:** `cd studio && bash setup.sh --voices` ([runbook](docs/12-runbook.md)).
3. **Create**: copy `episodes/_template` to `episodes/<id>`, write the brief, storyboard and scenes following [the formula](docs/13-explainer-formula.md), then run `npm run render -- <id>`. Open a **draft PR** containing `Episode: #<issue>` early.
4. **Review**: when QA is green and you've watched it with sound, mark the PR *ready for review*. A reviewer uses the [checklist](docs/07-editorial-review.md).
5. **Publish**: once merged, an EdZola maintainer uploads to YouTube and comments `/published <url>`.
6. **Improve the playbook**: add what you learned to [LEARNINGS.md](LEARNINGS.md). This is how the studio gets better with every video.

Full details: **[CONTRIBUTING.md](CONTRIBUTING.md)** · Non-negotiables: **[GUARDRAILS.md](GUARDRAILS.md)** · For AI agents: **[AGENTS.md](AGENTS.md)**

## What's in here

| Path | What |
|---|---|
| [docs/](docs/) | Concept note, architecture, stack research, production playbook, storyboard spec, visual language, pedagogy, review checklist, runbook, and **[13: the explainer formula](docs/13-explainer-formula.md)** |
| [knowledge/](knowledge/) | EdZola knowledge to teach from: brand voice, MAP framework, 15 points of view, **16 sector field guides**, published essays, products, a fictional case study, the claims register |
| [catalog/](catalog/) | The episode catalogue: 60 curated core episodes + sector templates → `node scripts/catalog.mjs` expands to every id |
| [episodes/](episodes/) | One folder per video: `brief.md`, `storyboard.json`, `scenes/*.html`, `review.md`. `a001-what-is-an-mis` is the reference |
| [studio/](studio/) | The engine: narration (Kokoro / Chatterbox / Qwen3-TTS), HyperFrames scene kit, Revideo templates, mixing, QA, listen-back |
| [schemas/](schemas/) | Storyboard JSON Schema |
| [agents/](agents/) · [.claude/skills/](.claude/skills/) | Role briefs and a Claude Code skill for AI-assisted episode making |
| [experiments/](experiments/) | Tool and voice bake-offs (HyperFrames vs Manim vs Revideo; four voices) |

## The stack (all local, open source, ₹0 per video)

| Layer | Tool | Licence |
|---|---|---|
| Scenes | [HyperFrames](https://github.com/heygen-com/hyperframes) 0.8.181 (HTML + GSAP) · [Revideo](https://github.com/midrender/revideo) 0.11 for template episodes | Apache-2.0 · MIT |
| Voice | [Chatterbox](https://github.com/resemble-ai/chatterbox) (expressive) · [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) (fast) · [Qwen3-TTS](https://huggingface.co/Qwen) via mlx-audio (voice design) | MIT · Apache-2.0 · Apache-2.0 |
| Listen-back QA | [faster-whisper](https://github.com/SYSTRAN/faster-whisper) | MIT |
| Sound | Synthesised in code (`studio/pipeline/sound.py`) | ours |
| Assembly | FFmpeg 8 | LGPL/GPL (CLI) |
| Fonts | Fraunces + Inter | SIL OFL |

Runs on **Windows 10/11** and **macOS (Apple Silicon)**: Node 22+, FFmpeg, `uv`, Git. Windows is tested in CI on every studio change ([guide](docs/15-windows.md)). An NVIDIA GPU (Windows) or Apple Silicon (Mac) makes the expressive voices fast; Kokoro works anywhere. See [docs/02](docs/02-stack-and-licensing.md) for why each was chosen.

## Licence

- **Code** (`studio/`, `scripts/`, `.github/`): [MIT](LICENSE)
- **Content** (`docs/`, `knowledge/`, `catalog/`, `episodes/`): [CC BY-NC-SA 4.0](LICENSE-CONTENT.md)
- **EdZola name, logos and brand marks** (`assets/brand/`): © EdZola, all rights reserved; use only for EdZola videos
- Fonts: SIL Open Font Licence (`assets/fonts/`)
