# Vertical reels and promotional videos

The explainer formula ([13](13-explainer-formula.md)) is for 4 to 6 minute lessons in 16:9. This doc covers the other kind of video the team now makes: **short 9:16 reels and promos for EdZola offerings** (DPDP Assessment cohorts, Zolabs) for Instagram Reels, YouTube Shorts, LinkedIn and WhatsApp status. It distils p001 to p008 (29 Oct to 3 Nov 2026). The six learning principles in [16](16-creative-range.md) still apply where they fit; the guardrails apply in full.

## 1. When it's a promo, not a lesson

| | Explainer (`a…`, `ep…`) | Promo / reel (`p…`) |
|---|---|---|
| Goal | Teach one idea | One offering, one action (enrol, try, contact) |
| Length | 4 to 6 min | **30 s** reel (or about 60 s cut for WhatsApp/LinkedIn) |
| Frame | 1920 × 1080 | **1080 × 1920**, 30 fps |
| Script | Ours, from the knowledge brief | Usually supplied by the team; we adapt it to brand voice |
| Claims | Claims register | Dates, fees, features: all `needs_evidence` until the offering owner confirms them |
| Sign-off | Reviewer | Reviewer **plus the offering or product owner** |

Use `p<nnn>-<offering>-<cut>` ids (e.g. `p004-dpdp-comply-reel`), and set `creative.structure` to `promo-reel-30s` or `promo-panels` and a descriptive `creative.visual_world` so the tracker's no-repeat rule works for promos too.

## 2. Script and voice: the 30-second budget

- **About 75 words for a 30 s reel with a 2 to 3 s end card.** 73 words at Kokoro speed 1.1 landed at 29.6 s; 90 words can't fit (31.5 s of speech even at speed 1.2). When a supplied script is long, propose specific cuts in `review.md` instead of speeding the voice up.
- **Sound like a person, not a list.** Feedback on the first DPDP cut was "too slow, sounds AI, awkward pause after every sentence". Use contractions, linking words ("So…", "Plus…"), and let beats end on a comma that runs into the next beat.
- **Kill the gaps.** Per beat `pause` about 0.05 to 0.1; scene `hold` about 0.1 to 0.25; `lead_in` about 0.15 to 0.2. The explainer defaults (0.3 + hold + lead-in) add 1.2 to 2.2 s of silence at every scene change.
- **Voice:** Kokoro `af_heart` at speed 1.04 to 1.2 is the most natural local voice so far (American accent; flag it in review). For release, an Indian English human VO or a consented Chatterbox clone is better.
- **Hit 30 s with `hold`, not speed.** Scene length follows the voice; raise `hold` on quieter scenes. Changing `hold` doesn't re-voice anything.
- **Acronyms:** write `DPDP` plain in `say`. `D.P.D.P.` makes Kokoro stop after every letter (a 0.35 to 0.47 s stall after the acronym).
- **Years:** keep the year on screen and leave it out of `say`. Whisper writes "twenty twenty-six" as digits and listen-back flags the line.
- **Brand edits to supplied scripts:** "NGO" becomes "nonprofit"; dashes become commas or full stops. List every change in `review.md`.

## 3. Building 9:16 HyperFrames scenes

No pipeline change is needed. In each scene:

```html
<div id="root" data-composition-id="hook" data-start="0" data-duration="{{DURATION}}"
     data-width="1080" data-height="1920" data-fps="30">
```

```css
html, body, #root { width: 1080px; height: 1920px; }
/* captions: centred, wrapping, above the Reels/Shorts UI */
#ez-caption { left: 0; right: 0; margin: 0 auto; transform: none; bottom: 200px;
              width: max-content; max-width: 960px; white-space: normal; }
```

- **Safe zones:** headline on two lines at the top, illustration or plate in the middle, captions at about y 1600 to 1750. Always check on a real phone that captions clear the Instagram and Shorts UI.
- **Generate scenes, don't hand-copy them.** Every promo keeps a `scenes-src/build-scenes.mjs` that writes `scenes/*.html` from shared helpers (cast, set, palette, headline, transitions). Forking the last episode's generator and swapping copy, timings and palette made each new cut quick (p002 from p001, p005 from p004). Edit the generator, never `scenes/`.
- **One scene, many beats** beats many 2 s scenes for a short reel: swap stacked headlines with a `swap(from, to, t)` helper instead of cutting.
- **Finish motion by about 85% of a short beat.** Shakes and pulses in the last half-second fail the contrast sample at the end.
- **Don't show an empty card** while its rows wait for later beats; bring the card in with its first row.

## 4. Making it feel edited, not generated

Scenes render separately and are joined with hard cuts, so transitions are split across the cut: run the outgoing half in the last 0.45 s of scene A and the incoming half in the first 0.5 s of scene B, so the cut lands mid-move.

| Device | How | From |
|---|---|---|
| Colour wipe | Full-frame `#wipe` covers by the cut, clears after it. Kill the kit's dip-to-cream with `tl.getTweensOf(stage)` after `EZ.finish` | p003 |
| Light-leak dissolve | Warm radial div to full opacity in the last 0.45 s of A, out over the first 0.6 s of B | p006 |
| Match cut | End A on a mark (a yellow point), open B on the same mark in the same place | p008 |
| Connecting thread | One full-frame SVG per scene, `pathLength="1"`, `stroke-dasharray: 1 1`, tween `strokeDashoffset` 1 → 0; start each path where the last left the frame | p007 |
| Kinetic headlines | Words rise from `overflow: hidden` masks; pill or marker bar `scaleX` 0 → 1 from the left; give each line an id so it can land on its own beat | p003, p008 |
| Life in the frame | Camera drift on an inner `#cam` wrapper; breathing and floating on each layer's child `<svg>` (never on the element the entry tween moves); blinking eyes | p003 |
| Colour as story | Warm first scene, then the brand colour after a wipe: "busy, then clearer" | p005 |

**Cover intro and grade** happen in FFmpeg after `npm run render`, so re-run them after every re-render and keep the exact command in `review.md`:

```bash
# fine film grain + soft vignette → the master to share
ffmpeg -i output/<id>.mp4 -vf "noise=c0s=6:c0f=t+u,vignette=angle=PI/6,format=yuv420p" \
  -c:v libx264 -preset slow -crf 21 -movflags +faststart -c:a copy output/<id>-master.mp4
```

For a reel cover, render a still (`scenes-src/build-cover.mjs`), hold it about 0.95 s with a slow push-in, `xfade` 0.35 s into the reel, and delay the audio by the same amount (`adelay`); see `episodes/p004-dpdp-comply-reel/review.md`.

**Music:** `procedural:warm-pulse` suits illustrated promos. `procedural:ambient-lift` (in `studio/pipeline/sound.py`) is a 100 bpm ambient score shaped for 30 s brand films: sparse pad 0 to 6 s, pulse and arpeggio from 6 s, a riser into about 14.5 s, a fuller middle, and a held chord blooming under the end card from 24 s. Time your acts to it.

## 5. Visual worlds we've used

1. **Hand-built flat illustration** (p001 to p004): one shared cast and set (wall, desk, laptop) drawn in the generator. Crossfade two copies of a character in different poses for a free pose change. Keep raised arms within about 115 units of the body centre in line-ups.
2. **Storyset illustrations** (p003 to p005): recoloured to EdZola coral or a sub-brand palette and built layer by layer. **Licence:** free tier requires the credit "Illustrations by Storyset (storyset.com)" in the video or in every post's caption, and **the SVGs must not be committed** (`episodes/*/assets-storyset/` is git-ignored).
3. **Photo plates** (p006 to p008), from a team storyboard: crop around baked-in text with FFmpeg, upscale with `lanczos` + light `unsharp`, make a `gblur` full-frame copy as the background, embed plates as data URIs (`render-scene.mjs` only stages `assets/brand`), feather with a CSS `mask-image` gradient, and move `#pimg` with GSAP (dolly via `x`, push-in via `scale`). Rebuild any product UI as crisp HTML; never use the storyboard's baked-in UI.
   - **Ask for full-resolution source images first.** Crops of 165 to 300 px upscaled 3 to 6 times make faces soft. Better still, generate image-to-video shots from them (`shot-prompts.md`) and drop the clips in under the same overlays.
   - **Rights:** confirm people in storyboard images are AI-generated or licensed for advertising. Real people need written consent ([GUARDRAILS](../GUARDRAILS.md)).
4. **Sub-brands:** swap the palette object in the generator (e.g. Storyset `#FF725E` → Zolabs violet) and use a text wordmark until the official logo arrives. Don't fake a logo.

## 6. Promo checklist (add to `review.md`)

- [ ] Watched on a phone, with sound, full screen.
- [ ] Length within target (30 s reel); listen-back 0 flags; loudness about −15 LUFS.
- [ ] Every date, fee, feature and URL confirmed by the offering owner (claims start as `needs_evidence`).
- [ ] Brand edits to the supplied script listed.
- [ ] Captions clear the platform UI; headline readable at phone size.
- [ ] Licences: Storyset credit in the post caption; people in plates cleared.
- [ ] Offering or product owner sign-off.
- [ ] Master (graded / with cover) is the file shared; the command to rebuild it is in `review.md`.
