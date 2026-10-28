---
name: edzola-video-episode
description: Make, improve or review an EdZola Video Studio episode end to end — claim-to-PR workflow, the nine-move explainer formula, storyboard with voice direction, HyperFrames scenes, narration retakes, render and QA. Use when someone says "make episode <id>", "start the next video", "write a storyboard for…", "build the scenes for…", "review this episode", or works anywhere in episodes/.
---

# Making an EdZola Video Studio episode

You are helping a contributor make one teaching video. Quality bar: `episodes/a001-what-is-an-mis` (watch the release, read its storyboard and scenes). Read `AGENTS.md` and `GUARDRAILS.md` first; they override everything here.

## 0. Pick and claim
- The episode must exist as an issue with a catalogue id (`catalog/episodes.json`). Never invent an id. New ideas go through the *Episode idea* issue form.
- The human comments `/claim` on the issue. You don't claim on their behalf unless they ask you to run `gh issue comment <n> --body /claim`.
- `git checkout -b ep/<id>` and `cp -R episodes/_template episodes/<id>`; set `video_id` to the id.

## 1. Brief (`brief.md`) and knowledge (`knowledge-brief.md`)
- Read the issue's knowledge sources, plus `knowledge/edzola/brand-voice.md`, `docs/13-explainer-formula.md` and `docs/09-pedagogy-and-formats.md`.
- Decide: the viewer's question, the misconception, the active moment, the reframe, the Monday takeaway (the six fixed principles in `docs/16-creative-range.md`).
- Propose **three genuinely different treatments**, each a different structure *and* visual world from docs/16. Check TRACKER for the last three published in the series and don't repeat their combination. **Never default to the a001 nine-move mystery**; it's one option among many. Record the chosen `creative` block.
- Facts only from `knowledge/` or primary public sources; every number goes in `knowledge/claims-register.md`. Use the fictional Sitara Foundation (or add fictional characters to its bible).
- Show the human the brief and get agreement before writing the script.

## 2. Storyboard (`storyboard.json`)
- As many scenes as the chosen structure needs (a001 used nine; a Short may use three).
- One beat = one spoken sentence under ~15 words; each beat has `voice: {pace, energy, direction}`, a cue-worthy change on screen, and 0–3 `sfx`.
- Digits in `text`, spelled out in `say`; acronyms and names in `studio/lexicon.json`.
- Every scene gets a `visual` brief: what appears on which beat.
- `cd studio && npm run validate -- <id>` must pass.

## 3. Voice, before visuals
- `npm run narrate -- <id>` then `npm run listen -- <id>`.
- For each flagged line, add `voice.seed` (a new take), lower `energy` (short punchy lines ≤ 0.65), or rewrite `say`. Repeat until 0 flags. Only changed lines re-voice.

## 4. Scenes (`episodes/<id>/scenes/<scene>.html`)
- Follow `studio/hyperframes/SCENE_GUIDE.md` exactly. Start from the closest pattern in `studio/hyperframes/patterns/README.md`.
- Time everything with `EZ.b(n)` / `EZ.at(n, f)` from narration; never literal seconds for narrated events.
- `node studio/hyperframes/render-scene.mjs <id> <scene> --snap "<a time in every beat>"`; the check must pass. **Read every snapshot PNG** and fix overlaps, cropping, tiny text and empty frames before moving on.

## 5. Render and self-review
- `npm run render -- <id>`. Confirm `qa.json` (duration_ok, loudness_ok, 0 black segments, 0 listen-back flags).
- Look at `contact-sheet.png` and full-resolution frames at each chapter.
- Tell the human to watch it with sound before review. You cannot judge tone by ear.

## 6. PR and learning loop
- Commit only text and SVG (never MP4/WAV). Open a **draft** PR with `Episode: #<issue>`; attach the master MP4 to the PR.
- Fill in `review.md`'s maker section, and add a `LEARNINGS.md` entry (what worked, what to change, tool gotchas).
- If you discovered something that changes how everyone should work, propose the doc edit in the same PR.

## Never
- Put real people's data, partner names, internal documents or credentials anywhere.
- Set `status: approved`, mark a PR approved, or publish. Those are human steps.
- Use non-commercial model weights for published videos.
