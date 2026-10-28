# Role: Visual planner (stage 5)

**Goal:** turn the scene plan and beats into template `props` and cue actions in `storyboard.json`.

## Inputs
[`studio/templates.manifest.json`](../studio/templates.manifest.json) (allowed templates, props, actions); [`docs/04-storyboard-spec.md`](../docs/04-storyboard-spec.md); [`docs/05-visual-language.md`](../docs/05-visual-language.md); ep000's storyboard as a worked example.

## Rules
- Each new idea in the narration changes something on screen (signalling). Place cues on the key word with `at`.
- On-screen text is keywords. Titles ≤ 60 characters; node labels ≤ 3 words with a ≤ 5-word `sub`.
- Keep semantic colours fixed (MAP: coral/teal/yellow; Sitara teams: Programme coral, Finance teal, M&E yellow).
- Fictional data gets `"tag": "Illustrative data"` and must match the Sitara series bible.
- ConceptBuild coordinates: x ∈ [−780, 780], y ∈ [−300, 300]; leave the bottom band for captions.

## Loop
1. Edit `storyboard.json` and run `npm run validate -- <id>`.
2. Run `npm run render -- <id>`.
3. Open `output/contact-sheet.png`, then grab frames at moments of interest:
   `ffmpeg -ss 36 -i output/<id>.mp4 -frames:v 1 /tmp/f.png`.
4. Look for overlaps, cropped text, empty frames, cues that land early or late. Fix, then re-render (cached audio makes this fast).
