# Manim CE prototype: "the twist"

Fictional Sitara Foundation scene: three team counts (312 / 287 / 341), 500 spreadsheet rows, 37 duplicates merge, 463 real people, 298 actually placed. All data illustrative.

Output: `twist-manim.mp4` (1920x1080, 30 fps, H.264 yuv420p, 16.3 s, 1.3 MB, silent). Source: `twist.py`.

## Versions

| Component | Version |
|---|---|
| Manim Community Edition | 0.22.0 (MIT) |
| Python (uv-managed) | 3.11 |
| ManimPango | 0.7.0 |
| pycairo | 1.29.2 (built from source) |
| Homebrew cairo / pango / pkgconf | 1.18.4 / 1.58.0 / 3.0.10 |
| FFmpeg (only for frame checks; Manim bundles PyAV) | 8.1.1 |

## Install (macOS Apple Silicon)

```bash
brew install pkgconf             # cairo + pango were already present; pkg-config was NOT
uv venv --python 3.11 ~/.edzola-video-studio/experiments/manim/.venv
uv pip install --python ~/.edzola-video-studio/experiments/manim/.venv/bin/python manim
```

Venv is ~256 MB, kept outside the repo. No LaTeX installed or needed.

## Render

```bash
cd "experiments/manim"
M=~/.edzola-video-studio/experiments/manim
$M/.venv/bin/manim render -qh --fps 30 --media_dir $M/media --disable_caching twist.py Twist
cp $M/media/videos/twist/1080p30/Twist.mp4 twist-manim.mp4
```

Render time: **~17-21 s wall clock** for 16 s of 1080p30 (M-series Mac, ~1.2x realtime). Install: ~30 s once pkgconf was present.

## What was easy

- Fonts: `manimpango.register_font(path)` on the variable TTFs, then `Text(..., font="Fraunces")`. Verified in rendered frames: real Fraunces (ball terminals, italic) and Inter, not fallbacks. `weight=` and `slant=ITALIC` pick instances from the variable fonts.
- Brand colours, `config.background_color`, rounded cards, pills and chips: a few lines each.
- 500 independent bars, LaggedStart fade-in and 37 path-arc merges: trivial in code, and fast to render.
- ValueTracker-driven counters (500 to 463, 0 to 298) with ease-out curves look calm and precise.
- Deterministic: seeded RNG gives the same frames every render. Good for review diffs.

## What was hard / gotchas

1. **`DecimalNumber` needs LaTeX** (default `mob_class=MathTex`). Swapping `mob_class=Text` is unreliable (global per-string cache ignores font/colour). Workaround used: `always_redraw(lambda: Text(f"{int(v)}", font=...))`.
2. **A play-level `rate_func` overrides per-animation rate functions.** `self.play(a.animate(rate_func=squish_rate_func(...)), ..., rate_func=X)` silently applies X to everything. Caught only by looking at frames (ghosted chips and labels at 8 s).
3. `-qh` means **60 fps**; you must add `--fps 30`.
4. `pycairo` has no macOS wheel for this combo; it compiles and needs `pkg-config` (`brew install pkgconf`). Error message is clear.
5. Coordinates are in Manim units (frame 14.2 x 8), not pixels. Layout collisions (tag vs cards, label vs caption) needed two iterations of frame checks.
6. `ReplacementTransform` between different words morphs glyphs messily; `FadeTransform` reads better for label swaps.
7. Letter-spacing needs `MarkupText` with Pango `letter_spacing` (in 1/1024 pt).
8. No live preview in this setup: iterate by render (~20 s) and frame extraction. `-ql` would speed iteration.
9. Rendering writes nothing into the source folder when `--media_dir` is set (no `__pycache__` either, since the scene file is run as a script).

## Driving it from narration timing

The scene already isolates beat durations in a `BEATS` dict. For a JSON-storyboard pipeline:

```python
beats = json.load(open("storyboard.json"))["beats"]   # [{"id":"merge","start":5.0,"end":10.0}, ...]
dur = {b["id"]: b["end"] - b["start"] for b in beats}
# each beat: run its animations with run_time scaled to fit, then self.wait(dur[id] - used)
```

Manim's clock is strictly sequential (`play` + `wait`), so absolute timestamps convert cleanly to durations. Word-level cues (e.g. start the counter when the narrator says "duplicates") map to splitting a beat into sub-plays. Audio can be attached with `self.add_sound(path, time_offset=...)`, so the narration track and cue timings can come from the same JSON. A small "beat runner" helper (beat id to method, with a fit-to-duration wrapper) would make this generic. Props (team names, counts, labels) are plain Python values, so they can be read from JSON too.

## Quality assessment

Looks clean and on-brand: crisp vector text, correct fonts and palette, smooth easing, no aliasing. The merge beat reads clearly (yellow duplicates fly into twins, which turn teal; three name chips collapse to one). Weaknesses versus a web renderer: no soft shadows, blur or CSS-style effects out of the box; text is converted to paths (no hinting, but at 1080p that is invisible); typographic refinements (tabular figures, tracking) take workarounds. Overall it looks like a polished explainer, slightly "mathematical" in feel unless styled deliberately.

## Licence

Manim CE: MIT. ManimPango: MIT. pycairo: LGPL-2.1 / MPL-1.1. Cairo / Pango: LGPL. Fonts: SIL OFL (Fraunces, Inter). Output videos carry no licence restrictions from the tool.

## Ratings (1-10)

| Criterion | Score | Why |
|---|---|---|
| (a) Visual polish achievable | **7** | Precise vector motion and good typography; lacks shadows/blur/rich effects without extra work |
| (b) Authoring speed for an AI agent | **8** | Pure Python, well-documented API, one file, ~20 s renders; gotchas (rate_func override, DecimalNumber/LaTeX) are learnable |
| (c) Fit with a JSON-storyboard pipeline | **7** | Sequential timeline maps well to beat durations, but no declarative scene format: needs a template/beat-runner layer in Python, and it is a separate Python toolchain from the Node studio |
