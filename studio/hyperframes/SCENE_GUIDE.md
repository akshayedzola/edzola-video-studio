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
bash studio/hyperframes/render-scene.sh <ep> <scene> [timing.json] --snap "2,6,10"
# full render
bash studio/hyperframes/render-scene.sh <ep> <scene> [timing.json]
```

The check gate (lint, runtime, layout overlap, motion, WCAG contrast) must pass. **Look at the snapshot PNGs** at every beat before calling a scene done.
