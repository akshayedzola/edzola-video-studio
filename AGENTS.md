# AGENTS.md: operating manual for AI agents in EdZola Video Studio

You are working inside EdZola's knowledge-to-video studio. Read this file fully before acting, then the role brief for your task in [`agents/`](agents/).

## What this studio does

It turns EdZola's verified knowledge (nonprofit data systems, MAP, AI in the social sector, Zolabs/DozAI/ImpactOS) into educational videos, through a structured pipeline:

`catalog` issue (`/claim`) → `knowledge/` → `episodes/<id>/brief.md` → `storyboard.json` (voice-directed beats) → narrate + listen-back → HyperFrames scenes → `npm run render` → PR → human review → publish.

**Start here:** [`docs/13-explainer-formula.md`](docs/13-explainer-formula.md) (one proven recipe) and [`docs/16-creative-range.md`](docs/16-creative-range.md) (what's fixed vs free; you must propose three different treatments and avoid repeating recent ones), [`CONTRIBUTING.md`](CONTRIBUTING.md) (the workflow), [`GUARDRAILS.md`](GUARDRAILS.md) (the rules). For Claude Code, the [`edzola-video-episode`](.claude/skills/edzola-video-episode/SKILL.md) skill walks through every step. Background: [`docs/00-concept-note.md`](docs/00-concept-note.md), [`docs/01-architecture.md`](docs/01-architecture.md).

## Hard rules (never break these)

1. **No PII, ever.** Never write beneficiary, donor or partner-staff names, phone numbers, emails, Aadhaar or other IDs, health or financial details, or call transcripts into any file here, and never pull them from emails, chat exports, CRMs or partner documents. Use the fictional Sitara Foundation ([`knowledge/case-studies/sitara-foundation.md`](knowledge/case-studies/sitara-foundation.md)) and synthetic data.
2. **No credentials** in any file or prompt.
3. **Never invent facts or numbers.** Every claim goes in [`knowledge/claims-register.md`](knowledge/claims-register.md) and the storyboard's `claims`. If unsure, mark it `needs_evidence` and say so.
4. **You never approve or publish.** Agents may set `status` to `draft` or `in_review` only. A named human sets `approved` and uploads.
5. **Stay structured.** Only work on catalogue ids that have an issue. HyperFrames scenes start from the [scene patterns](studio/hyperframes/patterns/README.md) and follow the [scene guide](studio/hyperframes/SCENE_GUIDE.md); Revideo episodes use [`studio/templates.manifest.json`](studio/templates.manifest.json).
6. **Brand voice:** British English; "nonprofits", "programmes", "partners"; no em dashes in narration; never "disrupt", "unlock", "unleash", "supercharge", "leverage", "digital transformation journey". See [`docs/05-visual-language.md`](docs/05-visual-language.md) and [`docs/08-narration-and-voice.md`](docs/08-narration-and-voice.md).
7. **Keep the repo light.** Never commit `node_modules`, models, renders or MP4s (they live in `~/.edzola-video-studio` and in GitHub Releases). See the runbook.

## Roles

| Stage | Role brief | Produces |
|---|---|---|
| 1–2 | [`agents/researcher.md`](agents/researcher.md) | brief.md, knowledge-brief.md |
| 3 | [`agents/instructional-designer.md`](agents/instructional-designer.md) | three teaching approaches, chosen scene plan |
| 4 | [`agents/scriptwriter.md`](agents/scriptwriter.md) | narration beats |
| 5 | [`agents/visual-planner.md`](agents/visual-planner.md) | templates, props and cue actions in storyboard.json |
| 5 | [`agents/scene-engineer.md`](agents/scene-engineer.md) | new or improved templates in `studio/src/templates/` |
| 6–7 | [`agents/reviewer.md`](agents/reviewer.md) | review.md pre-check, render QA triage |

These are stages of ordinary orchestrated work, not autonomous agents. One agent may play several roles in sequence. Hand off through files, not chat.

## Commands (from `studio/`)

```bash
npm run validate -- <id>      # must pass before render
npm run narrate  -- <id>      # voice every beat (cached)
npm run listen   -- <id>      # transcription check: retake until 0 flags
node hyperframes/render-scene.mjs <id> <scene> --snap "2,6,9"   # stills for design review
npm run render   -- <id>      # full pipeline + QA → episodes/<id>/output/
npm run say -- "DozAI"        # pronunciation check
```

After rendering, **look at** `output/contact-sheet.png` and a few full-resolution frames before reporting success, and read `qa.json` and `listen.json`. Report failures honestly.

## Definition of done for an agent's turn

- Files written where this manual says.
- `npm run validate` passes (or failures are explained).
- What a human must check next is written in `episodes/<id>/review.md`.
- A `LEARNINGS.md` entry exists for anything you learned. **Improve these instructions** when you find a better way: that's part of the job.
