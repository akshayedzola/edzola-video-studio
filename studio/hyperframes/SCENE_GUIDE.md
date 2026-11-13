# Writing a HyperFrames scene for EdZola Video Studio

A scene is one HTML file at `episodes/<id>/scenes/<scene-id>.html`: plain HTML/CSS plus **one paused GSAP timeline**, timed by the narration. The reference implementation is [`episodes/a001-what-is-an-mis/scenes/cold-open.html`](../../episodes/a001-what-is-an-mis/scenes/cold-open.html). Copy its structure.

## Contract (the checker enforces most of this)

```html
<html lang="en"><head>
  <link rel="stylesheet" href="brand.css" />
  <script src="cues.js"></script>  <script src="gsap.min.js"></script>  <script src="kit.js"></script>
  <style> /* scene CSS */ </style>
</head><body>
  <div id="root" data-composition-id="<scene-id>" data-start="0" data-duration="{{DURATION}}"
       data-width="1920" data-height="1080" data-fps="30">
    <div id="stage" class="abs" style="inset:0"> ...all scene content... </div>
  </div>
  <script>
    (function () {
      var tl = gsap.timeline({paused: true, defaults: {ease: "power2.out"}});
      gsap.set([...], {opacity: 0});       // hidden start states OUTSIDE the timeline
      // ...tl animations positioned with EZ.b(n) / EZ.at(n, f)...
      EZ.finish(tl, {tag: true});          // captions, series label, fades, length
      window.__timelines = window.__timelines || {};
      window.__timelines["<scene-id>"] = tl;   // must be literal in the file
    })();
  </script>
</body></html>
```

- `{{DURATION}}` and `cues.js` are filled in by `render-scene.sh` from the narration timing.
- **Timing:** `EZ.b(n)` = beat n start (1-based, seconds), `EZ.e(n)` = end, `EZ.at(n, 0.6)` = 60% through beat n. Anything the voice mentions appears at its beat. Never hard-code those times.
- **Helpers** (`kit.js`): `EZ.rise`, `EZ.pop`, `EZ.count` (rolling numbers), `EZ.type` (typewriter), `EZ.strike` (needs a `.strike-line` child), `EZ.pulse`, `EZ.shake`, `EZ.fly` (token on an arc), `EZ.rand` (deterministic random). Read `kit.js` for signatures.
- **Brand** (`brand.css`): CSS variables (`--coral`, `--coral-deep`, `--teal`, `--yellow`, `--peach`, `--ink`, `--grey`…), `.serif` (Fraunces), `.card`, `.pill.programme|me|finance`, `.chip`, `.token`, `.kicker`. Team colours are fixed: Programme coral, M&E yellow, Finance teal.
- **Assets:** brand marks are in `brand/` (e.g. `brand/starburst-yellow.svg`, `brand/floral-mark.svg`, `brand/edzola-wordmark-transparent.png`). Use inline SVG for icons and illustrations.

## Rules

1. Keep content **above y = 900 px**; the bottom band is for captions. Leave 120 px side margins.
2. Don't put CSS `transform` on elements GSAP animates (use `left`/`top` for placement). Don't use `tl.set(..., 0)` for initial hidden states; use `gsap.set` outside the timeline.
3. No `Math.random()`/`Date.now()`; use `EZ.rand()`.
4. Intentional overlaps get `data-layout-allow-overlap` (and `data-layout-allow-occlusion`) on that element.
5. Contrast: body text ≥ 4.5:1 on its background. Use `--coral-deep` for coral text, never `--coral`.
6. Motion: calm ease-out reveals. Use movement to *explain* (things flying where data goes, merging, counting), never decoration. One focal point at a time.
7. All data is fictional (Sitara Foundation). Show `{tag: true}` when data appears.

## Loop

```bash
# design review: stills at chosen seconds (fast)
node studio/hyperframes/render-scene.mjs <ep> <scene> [timing.json] --snap "2,6,10"
# full render
node studio/hyperframes/render-scene.mjs <ep> <scene> [timing.json]
```

The check gate (lint, runtime, layout overlap, motion, WCAG contrast) must pass. **Look at the snapshot PNGs** at every beat before calling a scene done.

## Vertical (9:16) scenes

Set `data-width="1080" data-height="1920"` and override `html, body, #root` and `#ez-caption` in the scene CSS; nothing else changes. Full recipe, safe zones and transition devices: [docs/17-reels-and-promos.md](../../docs/17-reels-and-promos.md).

## Check-gate gotchas (learned on p003 to p008)

| Check fails | Cause | Fix |
|---|---|---|
| contrast, white text on an SVG fill | The checker can't see SVG `<rect>` backgrounds and measures against the page | Dark text on light SVG fills, or put the fill on an HTML element |
| contrast, headline under an incoming wipe | Words hidden by masks are still sampled | Keep the headline container at `opacity: 0` until the wipe clears (`tl.set("#head", {opacity: 1}, 0.4)`) |
| contrast on the last sample of a short beat | Shake or pulse still running at the end | Finish motion by about 85% of the beat |
| `content_overlap` | Stacked headlines hidden only by masks | Also toggle each container's opacity so one is visible at a time |
| `text_occluded` | Masked kinetic words (`.w > .wi`) with a card sliding under them, or a highlight ring over a label | `data-layout-allow-occlusion` on the `.wi` spans too; slide cards in sideways |
| `text_box_overflow` | SVG chart labels near the bottom edge | Leave 20 px below the labels |
| `negative_z_index` | `z-index: -1` highlight behind text | Put the text in a `position: relative` span above the highlight |
| letter-spacing tween rejected | `letterSpacing` snaps to pixels | Animate `scale` instead |
| highlight on wrapped inline text looks wrong | Absolute child with `scaleX` breaks across lines | `box-decoration-break: clone` plus a `backgroundColor` tween |
| warning in a scene with no headline | Shared GSAP setup targets `.hd` | Guard with `document.querySelector` |

- `--snap` uses the narration timing, not `hold` changes made since. A snap past the old scene end shows the closing transition, not a bug. Real durations are in `build/<id>/hf/<scene>/cues.js`.
- `render-scene.mjs` prefers `~/.edzola-video-studio/build/<id>/timing.json` over the committed `timing.preview.json` whenever a build exists. Pass the preview file explicitly to design against it.
- Only `assets/brand` is staged next to a scene. Embed any other image (plates, covers) as a data URI.
- Brand files: `edzola-wordmark-cream.png` is the dark wordmark on a cream box. On coloured fills use `edzola-wordmark-transparent.png` with `filter: brightness(0) invert(.97)`.
