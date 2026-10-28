# Contributing to EdZola Video Studio

Thank you for helping. Every video here teaches someone in the social sector something useful. Read [GUARDRAILS.md](GUARDRAILS.md) once before your first contribution.

## Ways to contribute

| You want to… | Do this |
|---|---|
| **Make a video** | Claim an episode issue (below) |
| **Suggest a video** | Open an issue with the *Episode idea* form. A maintainer adds it to `catalog/core.json` so it gets an id |
| **Improve the playbook** | Open a PR to `docs/`, `knowledge/`, `studio/` or this file, or use the *Playbook improvement* form. Small fixes are very welcome |
| **Build a reusable scene pattern** | Add it under `studio/hyperframes/patterns/` with a demo, see [SCENE_GUIDE](studio/hyperframes/SCENE_GUIDE.md) |
| **Review videos** | Watch PRs labelled `stage:review` with sound, then comment using the [checklist](docs/07-editorial-review.md) |

## Making a video, step by step

### 1. Claim (stage: *Claimed*)
- Browse [open episodes](../../issues?q=is%3Aopen+label%3Aepisode+label%3Astage%3Aopen). Start with `priority:p1`.
- Comment `/claim`. The bot assigns you and replies with next steps. You can hold **two** unfinished episodes at a time.
- Can't continue? Comment `/unclaim`. Claims idle for 14 days get a reminder and are released after 21.
- **Before claiming, check [TRACKER.md](TRACKER.md)** so nobody duplicates work. Never start a video that has no issue: propose it first.

### 2. Create (stage: *Creation*)
```bash
git checkout -b ep/<id>
cp -R episodes/_template episodes/<id>
```
1. `brief.md`: one question, audience, the misconception, the takeaway. Sketch **three different treatments** (structure + visual world) and declare your **creative bet** ([creative range](docs/16-creative-range.md)); don't repeat the structure + world of the last three episodes in your series.
2. `knowledge-brief.md`: facts with sources, EdZola opinions, illustrative material, and what you excluded.
3. `storyboard.json`: the nine moves as scenes; every beat with voice direction and a `visual` brief per scene. Run `npm run validate -- <id>`.
4. `npm run narrate -- <id>` then `npm run listen -- <id>`. Retake flagged lines (new `seed`, calmer `energy`, or a `say` rewrite) until there are 0 flags.
5. Scenes: one HTML file per scene in `episodes/<id>/scenes/`, following [SCENE_GUIDE](studio/hyperframes/SCENE_GUIDE.md). Snapshot every beat and look at it.
6. `npm run render -- <id>`: produces `episodes/<id>/output/` (never committed) with QA.
7. **Open a draft PR early** with `Episode: #<issue number>` in the description. The issue moves to *creation* automatically.

### 3. Manual review (stage: *Manual review*)
- Watch the whole video **with sound, full screen**. Fill in `episodes/<id>/review.md` (copy from the template).
- Upload the master MP4 to the PR as an attachment (or a private link) so reviewers can watch it.
- Mark the PR **ready for review**. A reviewer (CODEOWNERS) checks facts, pedagogy, voice, brand and privacy. Product episodes also need the product owner's approval.
- Address comments in the same PR. Approval + merge moves the episode to *approved*.

### 4. Publish (stage: *Published*)
- EdZola maintainers upload to the EdZola YouTube channel: title = the viewer's question, chapters from `chapters.txt`, captions from the `.srt`, sources and the AI disclosure in the description ([docs/07](docs/07-editorial-review.md)).
- They comment `/published <youtube-url>` on the issue. That closes it and opens issues for its **3 Shorts** and **language versions**.
- At 14 and 28 days, add retention and comment insights to `episodes/<id>/metrics.md`.

### 5. Close the learning loop (every time)
Add 2–5 lines to [LEARNINGS.md](LEARNINGS.md): what worked, what you'd change, any tool gotcha. If a lesson changes how *everyone* should work, also edit the relevant doc (formula, scene guide, brand voice) in the same PR. Maintainers fold recurring lessons into the playbook monthly.

## Pull request rules

- One episode per PR, on a branch named `ep/<id>`. Playbook changes go in separate PRs.
- CI must pass: catalogue check, privacy scan, storyboard validation.
- No media in git: MP4s and WAVs go to the PR, Releases or YouTube. Fonts and SVGs are fine.
- Tag AI-assisted work in the PR description (most of it will be, and that's fine) and confirm you reviewed and understand it.

## Commands cheat sheet

| Where | Command | Effect |
|---|---|---|
| Issue | `/claim` · `/unclaim` · `/help` | Take, return, explain |
| Issue (maintainers) | `/published <url>` · `/release` | Mark live; free a stalled claim |
| Terminal (`studio/`) | `npm run validate -- <id>` | Schema, brand, privacy, claims |
| | `npm run narrate -- <id>` / `npm run listen -- <id>` | Voice, then transcription check |
| | `npm run render -- <id>` | Full pipeline + QA |
| | `node hyperframes/render-scene.mjs <id> <scene> --snap "2,6,9"` | Stills of one scene for design review (Windows and Mac) |
| Repo root | `node scripts/catalog.mjs` | Rebuild the catalogue and counts |
