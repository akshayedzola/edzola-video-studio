# Learnings log

The studio's memory. **Every episode PR adds an entry.** Maintainers review this monthly and fold recurring lessons into the docs (and then tick `→ folded into` here). Newest first.

Format:

```
## <date> · <episode id> · <your GitHub handle>
- Worked: …
- Change next time: …
- Tool gotcha: …
→ folded into: <doc link, or "not yet">
```

---

## 2026-11-03 · p008-zolabs-behind-the-numbers (30 s 9:16 reel, storyboard concept 02) · @VishwaPoojithaKannan (with Claude Code)
- **Worked:** a match cut across separate scene renders only needs the same mark in the same place: end scene A on a yellow point and open scene B on a yellow dot that becomes the waveform. The light-leak dissolve hides the join.
- **Worked:** marker headlines: an absolute `.mk` yellow bar inside each inline-block line, `scaleX` 0 to 1 from the left, then the masked words rise. Give each line its own id so the second line can land on a later beat.
- **Tool gotcha:** SVG chart labels near the bottom edge trip `text_box_overflow`, and a highlight ring over a label trips `text_occluded`; leave 20 px below the labels. `z-index: -1` for a highlight behind text trips `negative_z_index`; put the text in a `position: relative` span over the highlight instead.
- **Change next time:** this storyboard is 1024 px wide, so plates were 165 to 250 px crops (up to 6 times upscale) and faces look soft. Ask the team for the full-resolution panel images before cutting plates.
→ folded into: [docs/17-reels-and-promos.md](docs/17-reels-and-promos.md), [studio/hyperframes/SCENE_GUIDE.md](studio/hyperframes/SCENE_GUIDE.md), [docs/08-narration-and-voice.md](docs/08-narration-and-voice.md), [docs/15-windows.md](docs/15-windows.md)

## 2026-11-03 · p007-zolabs-every-voice (30 s 9:16 reel, six-panel storyboard) · @VishwaPoojithaKannan (with Claude Code)
- **Worked:** a "connecting thread" motif across separately rendered scenes is cheap. Put one full-frame SVG per scene with `pathLength="1"` paths, `stroke-dasharray: 1 1`, and tween `strokeDashoffset` from 1 to 0. Start each scene's path near where the last one left the frame.
- **Worked:** scene length follows the voice, so to land on 30 s raise `hold` on the quieter scenes instead of slowing the voice. Changing `hold` doesn't re-voice anything.
- **Tool gotcha:** `render-scene --snap` uses the narration timing, not `hold` changes made since. Snap times past the old scene end show the closing light leak, not a bug. Read `build/<id>/hf/<scene>/cues.js` for real durations.
- **Tool gotcha:** a shared GSAP setup for `.hd` headlines warns in a scene with no headline; guard it with `document.querySelector`. Give chips a higher `z-index` than the thread so the line never crosses their text.
→ folded into: [docs/17-reels-and-promos.md](docs/17-reels-and-promos.md), [studio/hyperframes/SCENE_GUIDE.md](studio/hyperframes/SCENE_GUIDE.md), [docs/08-narration-and-voice.md](docs/08-narration-and-voice.md), [docs/15-windows.md](docs/15-windows.md)

## 2026-11-03 · p006-zolabs-brand-film (30 s 9:16 cinematic cut) · @VishwaPoojithaKannan (with Claude Code)
- **Worked:** a photo storyboard becomes footage plates in a few ffmpeg crops. Cut around the baked-in text, upscale with `lanczos` + light `unsharp`, and make a `gblur` full-frame copy for the background. Embed the plates as data URIs, because `render-scene.mjs` only stages `assets/brand`. Feather the plate into the background with a CSS `mask-image` gradient and move `#pimg` with GSAP (dolly via `x`, push-in via `scale`).
- **Worked:** a warm radial "light leak" div faded to full in the last 0.45 s of scene A and out over the first 0.6 s of scene B reads as a cinematic dissolve across separately rendered scenes. Film grain and vignette as an ffmpeg pass on the final MP4 (`noise=c0s=6:c0f=t+u,vignette`) is cheaper than doing it in HTML.
- **Tool gotcha:** masked kinetic words (`.w > .wi`) trip `text_occluded` when a card slides up underneath them. Put `data-layout-allow-occlusion` on the `.wi` spans too, and slide cards in sideways.
- **Tool gotcha:** `hyperframes check` rejects tweening `letterSpacing` (it snaps to pixels). Use `scale`. A highlight on an inline span that wraps lines needs `box-decoration-break: clone` plus a `backgroundColor` tween, not an absolute child with `scaleX`.
- **Change next time:** small storyboard crops (300 px tall) upscaled 3 times or more look soft on faces. Ask for full-resolution source frames, or generate image-to-video clips from them (`episodes/p006-zolabs-brand-film/shot-prompts.md`).
→ folded into: [docs/17-reels-and-promos.md](docs/17-reels-and-promos.md), [studio/hyperframes/SCENE_GUIDE.md](studio/hyperframes/SCENE_GUIDE.md), [docs/08-narration-and-voice.md](docs/08-narration-and-voice.md), [docs/15-windows.md](docs/15-windows.md)

## 2026-11-02 · p005-zolabs-reel (30 s 9:16 product reel) · @VishwaPoojithaKannan (with Claude Code)
- **Worked:** forking p004's `build-scenes.mjs` and swapping the palette (Storyset `#FF725E` → Zolabs violet, wipe with a text wordmark instead of the EdZola PNG) gave a sub-brand reel quickly. A warm cream first scene, then lavender after the violet wipe, turns the brief's "busy, then clearer" arc into colour.
- **Worked:** about 73 words at Kokoro speed 1.1 plus a 3 s end card landed at 29.6 s, which confirms the ~75-word budget for a 30 s reel.
- **Tool gotcha:** a headline under an *incoming* colour wipe fails contrast even while its words are hidden by their masks. Keep the whole headline at `opacity: 0` until the wipe has cleared (`tl.set("#head", {opacity: 1}, 0.4)`).
- **Tool gotcha:** `pdftoppm` isn't installed, so the Read tool can't render PDF pages, but Git Bash ships `pdftotext` (`/ucrt64/bin`). `pdftotext -layout brief.pdf -` gets the text.
- **Tool gotcha:** the voice venv must live at `~/.edzola-video-studio/voice-lab/.venv` (`EDZOLA_VIDEO_HOME`), not `~/voice-lab`. And Chatterbox won't load on an 8 GB Windows laptop: "paging file is too small (os error 1455)". Use a machine with 16 GB or more, or raise the Windows page file, before promising an expressive re-voice.
→ folded into: [docs/17-reels-and-promos.md](docs/17-reels-and-promos.md), [studio/hyperframes/SCENE_GUIDE.md](studio/hyperframes/SCENE_GUIDE.md), [docs/08-narration-and-voice.md](docs/08-narration-and-voice.md), [docs/15-windows.md](docs/15-windows.md)

## 2026-10-29 · p002-dpdp-cohort-2-v2 (promo, second cut) · @VishwaPoojithaKannan (with Claude Code)
- **Worked:** forking p001's `scenes-src/build-scenes.mjs` made a re-scripted promo fast: same cast and set, only headlines, timings and one new panel changed.
- **Tool gotcha:** Kokoro plus listen-back flagged a spoken year ("twenty twenty-six"): Whisper writes it as digits and the line fails. Keep the year on screen and leave it out of `say`.
- **Tool gotcha:** on a short one-beat scene (about 4 s), animations in the last half-second (shake, pulse) made `hyperframes check` fail contrast on the final sample. Finish motion by about 85% of the beat.
→ folded into: [docs/17-reels-and-promos.md](docs/17-reels-and-promos.md), [studio/hyperframes/SCENE_GUIDE.md](studio/hyperframes/SCENE_GUIDE.md), [docs/08-narration-and-voice.md](docs/08-narration-and-voice.md), [docs/15-windows.md](docs/15-windows.md)

## 2026-10-29 · p004-dpdp-comply-reel (30 s reel) · @VishwaPoojithaKannan (with Claude Code)
- **Change next time:** don't write acronyms with full stops in `say` ("D.P.D.P."). Kokoro treats each stop as a break: measured gaps of 0.07 to 0.09 s after the letters plus a 0.35 to 0.47 s stall after the acronym. Plain "DPDP" is phonemised as one smooth "dee-pee-dee-pee" and listen-back still hears "DPDP". Measure gaps by synthesising variants and finding silences ≥ 60 ms in the envelope.
- **Change next time:** a script of about 90 words can't fit 30 s with this voice (about 31.5 s of speech at speed 1.2). Budget about 75 words for a 30 s reel with a 2 s end card.
→ folded into: [docs/17-reels-and-promos.md](docs/17-reels-and-promos.md), [studio/hyperframes/SCENE_GUIDE.md](studio/hyperframes/SCENE_GUIDE.md), [docs/08-narration-and-voice.md](docs/08-narration-and-voice.md), [docs/15-windows.md](docs/15-windows.md)

## 2026-10-29 · p003-dpdp-cohort-2-vertical (9:16 promo) · @VishwaPoojithaKannan (with Claude Code)
- **Change next time:** feedback on p002 was "too slow, sounds AI, awkward pause after every sentence". The causes: 0.3 s `pause` per beat plus `hold` + `lead_in` gave 1.2 to 2.2 s of silence at every scene change, and every beat was a separate full-stop sentence. Fix: pause about 0.1, hold about 0.25, lead_in about 0.15; a conversational script (contractions, "So…", "Plus…", beats ending on a comma that run into the next); Kokoro `af_heart` (its most natural voice) at speed 1.1.
- **Worked:** vertical HyperFrames scenes need no pipeline change: set `data-width="1080" data-height="1920"` and override `html, body, #root` size in the scene CSS. Also override `#ez-caption` (width max-content, max-width 960px, white-space normal) so captions wrap.
- **Tool gotcha:** `hyperframes check` can't see SVG `<rect>` backgrounds, so white text on an SVG fill is measured against the page and fails contrast (worst during exit fades). Use dark text on light fills inside SVGs.
- **Tool gotcha:** a very long Bash heredoc fails on Windows with `ENAMETOOLONG`. Write the file with the Write tool instead.
- **Worked (polish pass):** cross-scene transitions with scenes rendered separately: run the outgoing half in the last 0.45 s of scene A and the incoming half in the first 0.5 s of scene B, so the hard cut lands mid-move (a colour wipe fully covering at the cut, or a matching slide). Kill the kit's dip-to-cream with `tl.getTweensOf(stage)` after `EZ.finish`. Kinetic headlines (words rising from `overflow:hidden` masks, pill background `scaleX` sweep), camera drift on an inner `#cam` wrapper, breathing and floating on each layer's child `<svg>` (so it never fights entry tweens), and blinking eyes made it feel edited rather than generated.
- **Tool gotcha:** stacked headlines hidden only by their masks still trip `content_overlap`. Also toggle each container's opacity so only one is visible at a time.
- **Tool gotcha:** `assets/brand/edzola-wordmark-cream.png` is the dark wordmark on a cream box, not a cream wordmark. On coloured fills, use `edzola-wordmark-transparent.png` with `filter: brightness(0) invert(.97)`.
→ folded into: [docs/17-reels-and-promos.md](docs/17-reels-and-promos.md), [studio/hyperframes/SCENE_GUIDE.md](studio/hyperframes/SCENE_GUIDE.md), [docs/08-narration-and-voice.md](docs/08-narration-and-voice.md), [docs/15-windows.md](docs/15-windows.md)

## 2026-10-29 · p004-dpdp-cohort-2-reel (36 s 9:16 reel) · @VishwaPoojithaKannan (with Claude Code)
- **Worked:** for a short reel, one scene with four short beats and swapped stacked headlines (a `swap(from, to, t)` helper) reads better than four 2 s scenes with transitions. Crossfading two copies of the same seated character (`arms: 'desk'` and `arms: 'chin'`) gives a pose change for free.
- **Change next time:** if a card's rows appear one per beat, don't show the empty card during the intro beat. It reads as a blank box for 4 s. Bring it in with the first row and fill the intro with something else (here, "?" bubbles).
- **Tool gotcha:** raised-arm poses collide with neighbours in the standing line-up. Check the `enrol` frame at full size; keep a raised fist within about 115 units of the body centre.
→ folded into: [docs/17-reels-and-promos.md](docs/17-reels-and-promos.md), [studio/hyperframes/SCENE_GUIDE.md](studio/hyperframes/SCENE_GUIDE.md), [docs/08-narration-and-voice.md](docs/08-narration-and-voice.md), [docs/15-windows.md](docs/15-windows.md)

## 2026-10-28 · studio · @akshayedzola (with Claude Code)
- **Change:** most of the team is on Windows. The pipeline is now Node + Python only (no bash in the render path), with `setup.ps1` and a Windows CI job that renders a scene and a full episode on every studio change.
- **Change:** the a001 formula risked becoming a template. Split into six fixed learning principles plus open structure, visual world, voice and length; every brief declares three treatments and a creative bet; no repeating the last three structure + world combinations in a series.
→ folded into: [docs/15-windows.md](docs/15-windows.md), [docs/16-creative-range.md](docs/16-creative-range.md)

## 2026-10-27 · a001-what-is-an-mis (v2) · @akshayedzola (with Claude Code)
- **Worked:** the nine-move arc (cold open mystery → analogy → watch it happen → predict → twist → build → replay → not-list + Monday questions → close). The prediction pause and the twist ("each team counted correctly") are what make it feel like a lesson.
- **Worked:** voice direction per beat (pace, energy, acting note) plus synthesised SFX and a ducked music bed took the voice from flat to alive.
- **Worked:** HyperFrames scenes (HTML/GSAP) timed by `EZ.b(n)`; `hyperframes check` caught real contrast and overlap bugs before render.
- **Change next time:** Chatterbox slurs short, high-energy lines ("So who got it wrong?" came out "So, get it well"). Run listen-back before building scenes, and keep energy ≤ 0.65 on short lines.
- **Change next time:** "M&E" is hard for TTS; "Kavya" was misheard. Use `say` rewrites ("M and E", "Kaavya") and keep captions in the written form.
- **Tool gotcha:** adding a field to the voice params changes every beat's cache key, so add optional params only when set.
- **Tool gotcha:** HyperFrames' static lint needs the literal `window.__timelines["<id>"] = tl` line in each scene file.
- **Tool gotcha:** rows scrolled out of a clipped viewport trigger occlusion warnings; mark them `data-layout-allow-occlusion`.
→ folded into: [docs/13-explainer-formula.md](docs/13-explainer-formula.md), [studio/hyperframes/SCENE_GUIDE.md](studio/hyperframes/SCENE_GUIDE.md)

## 2026-10-20 · x000-revideo-pilot (v1) · @akshayedzola (with Claude Code)
- **Worked:** the structured pipeline (storyboard → per-beat TTS → cue-timed scenes → FFmpeg → QA) and the validator's privacy and brand checks.
- **Change next time:** it *told* rather than taught. No analogy, no prediction, no surprise, one flat voice. See [redesign-v2](episodes/a001-what-is-an-mis/redesign-v2.md).
- **Tool gotcha:** in Revideo a bare `yield` inside a cue handler is cancelled when the handler returns, so wrap effects in `all(...)`.
→ folded into: [docs/13-explainer-formula.md](docs/13-explainer-formula.md)
