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
