# Architecture

## Pipeline

```
 episodes/<id>/storyboard.json
          │
          ▼
 ① validate      schema + template/action catalogue + brand lint + PII guard + claims gate
          │
          ▼
 ② narrate       Kokoro TTS, one clip per beat (cached by content hash)
          │      → narration.wav + timing.json (every beat's start/end, caption chunks)
          ▼
 ③ render        Revideo (headless Chrome) plays each scene template;
          │      cue actions fire at their beat's timestamp → silent 1080p30 MP4
          ▼
 ④ mux           FFmpeg: narration (+ optional music bed) → loudnorm −14 LUFS → master MP4
          │      + .srt captions, chapters.txt, thumbnail.png, contact-sheet.png
          ▼
 ⑤ listen-back   faster-whisper transcribes each beat; mismatches vs script are flagged
          │
          ▼
 ⑥ QA            duration vs timing, loudness, true peak, black frames → qa.json
          │
          ▼
      HUMAN REVIEW (docs/07) → status: approved → publish
```

`npm run render -- <episode-id>` runs ①–⑥. Each stage also runs on its own (`validate`, `narrate`, `listen`).

## Why beat-level narration drives everything

Each beat (roughly one spoken sentence) is synthesised separately, so we know exactly when it starts and ends without a forced-alignment model. Cue actions are positioned *within* a beat (`at: 0.0–1.0`), and captions are chunked inside beats. Timing always comes from the voice. Animations never push narration around, and changing one sentence re-times only that scene.

Scene lengths snap to whole frames (30 fps), so audio and video can't drift over a long episode.

## Code layout

```
studio/
  src/project.tsx            builds one Revideo scene per storyboard scene
  src/brand/theme.ts         colour, type scale, motion defaults (single source of truth)
  src/brand/fonts.css        Fraunces + Inter (OFL) from assets/fonts
  src/lib/cues.ts            runCues(): fires cue actions at narration timestamps
  src/lib/chrome.tsx         captions, progress bar, series label
  src/lib/motion.ts          reveal / pulse / shake primitives
  src/templates/*.tsx        scene templates (each returns its cue-action handlers)
  templates.manifest.json    machine-readable catalogue the validator and agents read
  lexicon.json               pronunciation overrides for TTS
  pipeline/build.ts          orchestrator (validate, narrate, listen, render, say)
  pipeline/narrate.py        TTS + timing
  pipeline/listen.py         transcription diff
  pipeline/editor.ts         live editor launcher (uses vite.config.ts)
  editor.vite.config.ts      editor-only fs allow-list for ../assets and the symlinked engine
  setup.sh                   idempotent machine setup
```

## Where things live (repository vs local cache)

| In the Git repository | In `~/.edzola-video-studio` (local, regenerable) |
|---|---|
| docs, knowledge, catalogue, storyboards, scenes, templates, pipeline code | `engine/node_modules` (symlinked as `studio/node_modules`), `hyperframes/` engine |
| brand assets, fonts, sound effects | `.venv` (Python), `voice-lab/` voice envs, `models/` (Kokoro), `hf/` (Whisper, Chatterbox, Qwen weights) |
| episode briefs, storyboards, scene HTML, review notes | `build/<id>/`: per-beat audio cache, scene renders, mixes |
| | **Masters (MP4)** go to GitHub Releases and YouTube, never into git |

Override the local path with `EDZOLA_VIDEO_HOME`.

## Template contract

```ts
type Template = (stage: Node, scene: TimedScene) => Record<string, (a: CueAction) => ThreadGenerator>;
```

A template builds all its visuals hidden on `stage` and returns named actions (`show-sheet`, `set-cell`…). The storyboard decides *when* each action fires. Templates never hard-code narration timing. Gotcha: in Revideo, a spawned child thread is cancelled when its parent finishes, so long-running effects inside a handler must be awaited with `all(...)`, not fired with a bare `yield`.

## Extending

- **New template:** add `src/templates/X.tsx`, register it in `src/templates/index.ts` **and** `templates.manifest.json`, then document it in [06-scene-template-library.md](06-scene-template-library.md).
- **Vertical Shorts (next):** add `aspect: "9:16"` support. Templates read layout from a frame object, and the project size switches to 1080×1920.
- **Manim / Excalidraw assets:** render to SVG/MP4, place under `assets/`, and embed with `Img`/`Video` inside a template.
- **Product walkthroughs:** Playwright script records a demo tenant to MP4; a `UIHighlight` template overlays zooms and callouts on it.
