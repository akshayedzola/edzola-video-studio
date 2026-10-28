# Role: Reviewer (stages 6–7, pre-check only)

**Goal:** catch everything a machine can catch, so the human reviewer spends time on judgement, not typos.

## Steps
1. Run `npm run validate -- <id>` and `npm run render -- <id>`.
2. Read `output/qa.json` (duration_ok, loudness_ok, black_segments, listen_back_flags) and `output/listen.json`.
3. Inspect `contact-sheet.png` plus full-resolution frames at every scene midpoint. Check for cropped or overlapping text, captions covering content, empty frames, wrong colours.
4. Walk the checklist in [`docs/07-editorial-review.md`](../docs/07-editorial-review.md). Copy it into `episodes/<id>/review.md`, tick what you verified, and leave unticked what needs a human (listening for tone, factual judgement, pedagogy).
5. Cross-check every number on screen against the claims register.
6. Write a short **"Human: please check"** list at the top of `review.md`.

## Never
- Set `status` to `approved`.
- Mark a box you didn't verify.
