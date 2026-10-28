# HyperFrames prototype: "the twist" (Sitara Foundation, fictional data)

Prototype run on 20 Oct 2026 to compare HyperFrames with Revideo and Manim for EdZola explainers.
All data and names are fictional and illustrative. No PII.

## Files (this folder)

| File | What |
|---|---|
| `index.html` | The whole composition: HTML/CSS + one paused GSAP timeline (~330 lines) |
| `cues.json` | Data and beat times (team numbers, rows, duplicates, placed, `tGrid`/`tDupes`/`tReveal`/`tLine`) passed as HyperFrames variables |
| `render.sh` | Reproducible build: stages source + fonts + GSAP locally, runs `hyperframes check`, renders, copies the MP4 back |
| `twist-hyperframes.mp4` | Final render: 1920x1080, 30 fps, 16.0 s, H.264 yuv420p, silent, ~2.0 MB |

Local (outside Drive): `~/.edzola-video-studio/experiments/hyperframes/` holds `node_modules` (118 MB), the staged `project/` and `renders/`. Puppeteer's Chrome lives in `~/.cache/puppeteer` (563 MB, shared).

## Versions

- hyperframes CLI **0.8.181** (npm, Apache-2.0, published the same day as this test; it ships very frequently)
- GSAP **3.14.2** (vendored locally from npm, not the CDN)
- Node **22.23.2** via nvm (`nvm use 22` inside `render.sh` only; default alias stays on 20)
- Chrome / chrome-headless-shell **155.0.8059.79** (downloaded automatically by Puppeteer on first render)
- FFmpeg **8.1.1** (Homebrew)
- macOS, Apple M2 Pro; HyperFrames auto-detected the hardware GPU

## Install and commands run

```bash
source ~/.nvm/nvm.sh && nvm use 22
mkdir -p ~/.edzola-video-studio/experiments/hyperframes && cd $_
npm init -y && npm install hyperframes gsap@3.14.2        # ~16 s
npx hyperframes --help ; npx hyperframes render --help    # real flags
# docs ship inside the package: node_modules/hyperframes/dist/docs/*.md and dist/skills/**
npx hyperframes lint project --verbose
npx hyperframes check project                             # lint + runtime + layout + motion + WCAG contrast
npx hyperframes render project --fps 30 --quality delivery \
  --variables-file project/cues.json -o renders/twist-hyperframes.mp4
```

Or simply: `./render.sh` from this folder.

I did not use `hyperframes init` (it scaffolds a project and checks GitHub for agent skills); I read its `blank` template and wrote `index.html` by hand. Rendering worked inside the command sandbox; no sandbox override was needed.

## Render time

- First ever render: **~4.5 min wall**, almost all of it Puppeteer downloading Chrome (one-off).
- Every render after that: **17 to 22 s** for 480 frames (setup ~4 s, capture ~11 s across 4 Chrome workers, encode ~3.5 s). `render.sh` end to end including `check`: ~26 s.
- `--quality draft`: ~16 s. Static-frame dedup reuses identical frames automatically.

## How the scene is built

One root composition (`data-composition-id="twist"`, 16 s) with plain absolutely positioned DOM. A paused `gsap.timeline()` is registered on `window.__timelines["twist"]`; HyperFrames seeks it frame by frame in headless Chrome and pipes screenshots to FFmpeg. The 500 row bars are generated in JS; duplicates and their twins are picked with a seeded LCG (HyperFrames forbids `Math.random()`/`Date.now()` for determinism). Number roll-ups are tweens on a plain object with `onUpdate` writing `textContent`, which seek correctly in both directions.

## Timing and sync to narration

- **Yes, cues can come from JSON.** Declare `data-composition-variables` on `<html>`, read them with `window.__hyperframes.getVariables()`, override with `--variables '{...}'` or `--variables-file cues.json`. I verified this: rendering with `{"placed":111,"tLine":12,"programme":999}` changed both the numbers and the beat timing. `--strict-variables` type-checks the JSON against the declarations; `--batch rows.json` renders one video per row.
- For a storyboard pipeline, the natural mapping is: storyboard beat start times (from TTS word timestamps) become variables, and the template's timeline positions read them. Audio is an `<audio data-start=... data-volume=...>` element in the same composition, so voice-over and visuals share one clock.
- The CLI also has `transcribe` (word-level timestamps via Whisper), `beats` (music beat detection) and `audio` (onset/loudness analysis), which are useful for automatic cue alignment.
- Caveat: variable types I saw in the bundle are string/number/color/boolean/enum/font/image/object/array; I only exercised `number`. A whole storyboard object could probably be passed as one `object` variable, but I did not test it.

## What was easy

- It is just HTML/CSS/JS. An AI agent already knows this stack; there is no new DSL. Brand tokens map straight to CSS variables, and `@font-face` with the Fraunces/Inter TTFs worked first time (including variable `opsz`).
- `hyperframes check` is excellent for agents: it flagged three real problems before rendering (zero-duration `tl.set` at t=0 not hiding frame 0; a CSS `transform` that GSAP would clobber; WCAG contrast of deep coral on peach at 4.16:1) and gave the fix for each. It also catches overlapping text, and accepts `data-layout-allow-overlap` for intentional overlaps.
- Rendering is fast and deterministic, and setting fps, quality, CRF, resolution presets (4K via DPR) and formats (MP4, WebM/MOV with alpha, GIF, PNG sequence) are all CLI flags.
- `snapshot --at 1,8,15` grabs stills without a full render (handy for agent self-review).

## What was hard / gotchas

1. **The docs website was hard to reach**: `hyperframes.dev/docs` returned 404. The useful docs are bundled in the npm package (`dist/docs`, `dist/skills/**`) and at `https://hyperframes.heygen.com/llms.txt`.
2. **First render downloads Chrome (~560 MB)** into `~/.cache/puppeteer`; budget time and disk.
3. **Initial hidden states**: use `gsap.set()` outside the timeline (or CSS), not `tl.set(..., 0)`, or frame 0 shows unhidden content.
4. **Don't put `transform` in CSS on elements GSAP animates**; let GSAP own it (lint rule `gsap_css_transform_conflict`).
5. **Nested wrapper divs with timing attributes** trigger a "move to sub-composition" warning; keep timed elements top-level or split into `compositions/*.html`.
6. The init template loads GSAP from a CDN; I vendored it locally so renders do not depend on the network.
7. The CLI sends **anonymous telemetry by default** (`hyperframes telemetry disable` to opt out) and `init`/most commands check GitHub for agent skills unless `HYPERFRAMES_SKIP_SKILLS=1`. Worth disabling for client work.
8. Very fast release cadence (0.8.x, daily publishes). Pin the exact version (`render.sh` pins 0.8.181).
9. Fraunces at `opsz 144` renders a hairline "4"; `opsz 48` looks sturdier at these sizes.

## Quality assessment

The output looks like a polished motion-design piece: crisp text and anti-aliasing (real Chrome rendering), true brand fonts, soft shadows, rounded cards, and smooth ease-out motion with no visible jitter. All five beats landed as specified (cards; 500 rows; 37 yellow duplicates merging into twins with the "Kavya Sharma / Kavya S. / K. Sharma" cluster resolving to one chip; counter 500 to 463 "real people"; team numbers struck and dimmed; 298 rolling up; closing line). Verified by extracting frames at 1 s, 8 s, 9.9 s and 15 s. Limitations: anything beyond the DOM/CSS/SVG/Canvas/WebGL toolset (e.g. Manim-style LaTeX maths or morphing paths) needs extra libraries.

## Licence

HyperFrames: **Apache-2.0** (permissive, commercial use fine). GSAP 3.14: free for commercial use under GreenSock's standard "no charge" licence (not OSI open source; check it before bundling in a product). Fraunces and Inter: SIL OFL (in `assets/fonts`).

## Ratings (1 to 10)

- **(a) Visual polish achievable: 9.** Anything a web page can show, rendered by Chrome: real typography, shadows, blur, SVG, Canvas, WebGL shaders.
- **(b) Authoring speed for an AI agent: 9.** Plain HTML + GSAP, which models write fluently; the `check` gate gives precise, actionable feedback. This scene took about 30 minutes including reading docs and three render iterations.
- **(c) Fit with a JSON-storyboard pipeline: 8.** Variables + `--variables-file` + `--batch` map cleanly onto storyboard-driven templates, and audio lives on the same timeline. Points off because the variable system is flat key/value per composition (nested beat lists need an `object` variable or code generation of the HTML), and the project is young and changes fast.

## Top pros / cons

Pros
1. Web-native: agents author it quickly, brand CSS and fonts drop straight in.
2. Built-in `check` gate (layout overlap, contrast, GSAP pitfalls) plus fast, deterministic local renders (~20 s for 16 s of 1080p).
3. JSON variables can drive both data and cue timing; batch rendering and narration audio supported.

Cons
1. Young, fast-moving project (0.8.x, daily releases); docs site URLs unreliable; must pin versions.
2. Heavy first-run footprint (Chrome download ~560 MB) and telemetry/skills network calls on by default.
3. Timing logic is still imperative JS per template; no built-in declarative scene-graph or maths tooling like Manim.
