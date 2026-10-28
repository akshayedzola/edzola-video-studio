# Runbook

## First-time setup (each machine)

**Windows users: see [15-windows.md](15-windows.md).** macOS prerequisites: Apple Silicon, Node 22+ (`nvm install 22`; the repo has an `.nvmrc`), Homebrew FFmpeg, `uv`.

```bash
git clone https://github.com/akshayedzola/edzola-video-studio.git
cd edzola-video-studio/studio
bash setup.sh --voices     # omit --voices for Kokoro only (smaller download)
```

`setup.sh` is idempotent. It installs the Revideo engine into `~/.edzola-video-studio/engine` and symlinks `node_modules`, then installs headless Chrome, the Python env (Kokoro, faster-whisper) and the Kokoro model (~350 MB). It doesn't touch anything outside `~/.edzola-video-studio` and this folder.

## Everyday commands (run inside `studio/`)

| Command | What it does |
|---|---|
| `npm run validate -- <id>` | Schema, templates, brand lint, PII guard, claims gate |
| `npm run narrate -- <id>` | Voice all beats (cached) and compute timing |
| `npm run render -- <id>` | Full pipeline → `episodes/<id>/output/` |
| `npm run listen -- <id>` | Re-run the transcription check only |
| `npm run say -- "text" [voice]` | Hear how a line or name is pronounced |
| `npm run editor` | Live Revideo editor at http://localhost:9000 for template development; shows the last built episode (run `render` or `narrate` + `render` first) |
| `node hyperframes/render-scene.mjs <id> <scene> --snap "2,6"` | Check + stills for one HyperFrames scene (`HF_ALLOW_CHECK_FAIL=1` to inspect a failing one) |
| `node ../scripts/catalog.mjs` | Rebuild the catalogue and counts |
| `node ../scripts/tracker.mjs` | Regenerate TRACKER.md locally (needs `gh`) |
| `npm run typecheck` | TypeScript check |

## Outputs (`episodes/<id>/output/`)

`<id>.mp4` (master) · `<id>.srt` · `chapters.txt` · `thumbnail.png` · `contact-sheet.png` (one frame every 4 s; review this first) · `qa.json` · `listen.json`

## Starting a new episode

```bash
cp -R "episodes/_template" "episodes/ep001-your-slug"
```

Fill in `brief.md`, then `knowledge-brief.md`, then `storyboard.json`. Validate and render, then review.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `npm install` crashes with `Cannot read properties of null (reading 'edgesOut')` | Use `--legacy-peer-deps` (setup.sh does) |
| `Failed to launch the browser process` | Rendering uses `chrome-headless-shell`; re-run `npx puppeteer browsers install chrome-headless-shell` from `~/.edzola-video-studio/engine`. In sandboxed agent shells, run render outside the sandbox. |
| `The thread is not available in the current context` | Don't import scenes with `?scene` (Motion Canvas syntax); Revideo uses plain imports |
| The last animation in a scene never appears | A handler fired a child with a bare `yield` and it was cancelled; use `all(...)`. `runCues` already lives until scene end. |
| Fonts look like system fonts | Check `assets/fonts/*.ttf` exist; `project.tsx` waits for `document.fonts.load` |
| A line is slurred or misheard in `listen.json` | Add `"seed": 11` to that beat's `voice` (a new take), lower `energy`, or rewrite its `say`. Only that line re-voices |
| `hyperframes check` fails | Read the fix it prints; common ones: hidden start states via `gsap.set` outside the timeline, literal `window.__timelines[...]` line, contrast (use `--coral-deep` for text) |
| Chatterbox: `No module named 'pkg_resources'` | `uv pip install --python ~/.edzola-video-studio/voice-lab/.venv/bin/python "setuptools<81"` |
| Model download stalls | Re-run; Hugging Face downloads resume. Slow networks: run `setup.sh --voices` overnight |
| Word sounds wrong | Add it to `studio/lexicon.json`, or add a `say` override on the beat |
| Editor shows an unstyled dark skeleton / 403s in the console | Use `npm run editor` (our `pipeline/editor.ts`), not `npx revideo editor`: the stock CLI ignores project Vite config (we use `editor.vite.config.ts`), so it can't read `../assets` or the symlinked engine |
| Cloud-sync folder (Drive/OneDrive) syncing thousands of files | `studio/node_modules` must be the symlink `setup.sh` creates. Don't run `npm install` inside `studio/`. |
