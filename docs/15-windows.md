# Working on Windows

Most of the EdZola team uses Windows laptops, and the studio runs natively on Windows 10/11 (x64). Every pipeline step is Node or Python with no bash required. A [CI job](../.github/workflows/windows-smoke.yml) sets up a fresh Windows machine with `setup.ps1` and renders a scene and a full episode on every change to the studio, so Windows doesn't quietly break.

## One-time setup (about 20 minutes, mostly downloads)

Open **PowerShell** (Start → "PowerShell") and run:

```powershell
# 1. Tools: Git, Node LTS (22+), FFmpeg, uv. Skip any you already have.
winget install --id Git.Git -e
winget install --id OpenJS.NodeJS.LTS -e
winget install --id Gyan.FFmpeg -e
winget install --id astral-sh.uv -e
```

**Close and reopen PowerShell** (so the new tools are on your PATH), then:

```powershell
# 2. Get the repo. Keep it in a short path, NOT inside OneDrive or Google Drive.
mkdir C:\dev -Force; cd C:\dev
git clone https://github.com/akshayedzola/edzola-video-studio.git
cd edzola-video-studio\studio

# 3. Install the studio (add -Voices for the expressive narrators; several GB)
powershell -ExecutionPolicy Bypass -File setup.ps1 -Voices
```

`setup.ps1 -InstallPrereqs` does step 1 for you. Re-running `setup.ps1` is safe; it skips what's already installed.

## Everyday commands (PowerShell, inside `studio\`)

```powershell
npm run validate -- a003-placement-vs-employment
npm run narrate  -- a003-placement-vs-employment
npm run listen   -- a003-placement-vs-employment
node hyperframes\render-scene.mjs a003-placement-vs-employment cold-open --snap "2,6,9"
npm run render   -- a003-placement-vs-employment
```

Outputs land in `episodes\<id>\output\` (never committed). Snapshots and build files are in `%USERPROFILE%\.edzola-video-studio\build\<id>\`.

## What works where

| Component | Windows | Notes |
|---|---|---|
| HyperFrames scenes, Revideo templates | ✅ | Headless Chrome is downloaded by setup |
| Kokoro voice (fast, default draft voice) | ✅ | CPU; faster than real time |
| Chatterbox (expressive narrator) | ✅ | **NVIDIA GPU recommended.** `setup.ps1 -Voices` installs the CUDA build of PyTorch automatically if `nvidia-smi` is found; on CPU it works but is slow (budget about 20× real time) |
| Qwen3-TTS (voice design, Indian English) | ✅ with NVIDIA GPU | Uses the PyTorch `qwen-tts` package on Windows (macOS uses mlx-audio). Same storyboard works on both |
| Listen-back (faster-whisper) | ✅ | CPU |
| Sound effects, music bed, mixing, captions, QA | ✅ | |
| `macos-say` voice | ❌ | macOS only (it's just a fallback) |

**No NVIDIA GPU?** Draft with Kokoro (`"engine": "kokoro"` in the storyboard), build and review your scenes, then ask a teammate with a GPU or a Mac to run the final Chatterbox narration. Narration is cached by content, so they only re-voice; your scenes re-time automatically. You can also design scenes before any voicing: `render-scene.mjs` falls back to the episode's committed `timing.preview.json`.

## Git on Windows

- Line endings are normalised by `.gitattributes`; you don't need to configure `core.autocrlf`.
- If Git complains about long paths: `git config --global core.longpaths true`.
- Don't clone into OneDrive (it fights `node_modules` and big files). `C:\dev\` is a good home.
- Use the GitHub CLI (`winget install GitHub.cli`, then `gh auth login`) or GitHub Desktop for PRs.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `running scripts is disabled on this system` | Run setup as `powershell -ExecutionPolicy Bypass -File setup.ps1` |
| `ffmpeg` / `node` / `uv` not found right after installing | Close and reopen PowerShell |
| `Node 22+ required` | `winget upgrade OpenJS.NodeJS.LTS` |
| `studio\node_modules is a real folder` | Delete `studio\node_modules`, then re-run setup (it creates a junction) |
| Chatterbox very slow | No CUDA: check `nvidia-smi`; otherwise draft with Kokoro (above) |
| Antivirus slows `npm install` or Chrome downloads | Exclude `%USERPROFILE%\.edzola-video-studio` from real-time scanning (ask IT) |
| Anything else | Check [docs/12-runbook.md](12-runbook.md), then open an issue with the *Playbook improvement* form and paste the error |
