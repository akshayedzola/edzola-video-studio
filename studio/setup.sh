#!/usr/bin/env bash
# EdZola Video Studio: one-time machine setup (macOS, Apple Silicon). Idempotent.
#
#   bash setup.sh            core: Revideo + HyperFrames engines, Kokoro voice, QA tools
#   bash setup.sh --voices   also the expressive voices: Chatterbox (MIT) + Qwen3-TTS (Apache-2.0), ~10 GB
#
# Heavy, regenerable things (node_modules ~50k files, voice models, renders)
# live in $EDZOLA_VIDEO_HOME (default ~/.edzola-video-studio); studio/node_modules
# is a symlink to it. This keeps the repo light and also works if you clone
# into a synced folder (Google Drive, OneDrive), which must not sync them.
set -euo pipefail

STUDIO="$(cd "$(dirname "$0")" && pwd)"
HOME_DIR="${EDZOLA_VIDEO_HOME:-$HOME/.edzola-video-studio}"
ENGINE="$HOME_DIR/engine"
HF_ENGINE="$HOME_DIR/hyperframes"
MODELS="$HOME_DIR/models"
VOICES="$HOME_DIR/voice-lab"
KOKORO_URL="https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0"
WITH_VOICES=0
[ "${1:-}" = "--voices" ] && WITH_VOICES=1

say_step() { printf "\n\033[1;33m==> %s\033[0m\n" "$1"; }

say_step "Checking prerequisites"
command -v node >/dev/null || { echo "Install Node 22+: https://github.com/nvm-sh/nvm then 'nvm install 22' (or brew install node@22)"; exit 1; }
command -v ffmpeg >/dev/null || { echo "Install FFmpeg: brew install ffmpeg"; exit 1; }
command -v uv >/dev/null || { echo "Install uv: curl -LsSf https://astral.sh/uv/install.sh | sh"; exit 1; }
node -e 'if (+process.versions.node.split(".")[0] < 22) { console.error("Node 22+ required (found " + process.version + "). With nvm: nvm install 22 && nvm use (the repo has an .nvmrc)"); process.exit(1) }'
echo "node $(node -v) | $(ffmpeg -version | head -1 | cut -d' ' -f1-3) | $(uv --version)"

say_step "Revideo engine (template episodes) in $ENGINE"
mkdir -p "$ENGINE"
cp "$STUDIO/package.json" "$ENGINE/package.json"
[ -f "$STUDIO/package-lock.json" ] && cp "$STUDIO/package-lock.json" "$ENGINE/package-lock.json"
# --legacy-peer-deps: npm 10's arborist crashes on Revideo 0.11's peer graph.
(cd "$ENGINE" && npm install --legacy-peer-deps --no-fund --no-audit)
cp "$ENGINE/package-lock.json" "$STUDIO/package-lock.json"
if [ -e "$STUDIO/node_modules" ] && [ ! -L "$STUDIO/node_modules" ]; then
  echo "Refusing to replace a real studio/node_modules folder; delete it first."; exit 1
fi
ln -sfn "$ENGINE/node_modules" "$STUDIO/node_modules"
(cd "$ENGINE" && npx --yes puppeteer browsers install chrome-headless-shell >/dev/null && echo "chrome-headless-shell ready")

say_step "HyperFrames engine (HTML/GSAP scenes) in $HF_ENGINE"
mkdir -p "$HF_ENGINE"
if [ ! -d "$HF_ENGINE/node_modules/hyperframes" ]; then
  (cd "$HF_ENGINE" && echo '{"private":true}' > package.json && npm install --no-fund --no-audit hyperframes@0.8.181 gsap@3.14.2 >/dev/null)
fi
HYPERFRAMES_SKIP_SKILLS=1 node "$HF_ENGINE/node_modules/hyperframes/bin/hyperframes.mjs" telemetry disable >/dev/null 2>&1 || true
echo "hyperframes $(node -p "require('$HF_ENGINE/node_modules/hyperframes/package.json').version")"

say_step "Python env (Kokoro, mixing, listen-back) in $HOME_DIR/.venv"
[ -x "$HOME_DIR/.venv/bin/python" ] || uv venv --python 3.11 "$HOME_DIR/.venv"
uv pip install --python "$HOME_DIR/.venv/bin/python" -r "$STUDIO/pipeline/requirements.txt"

say_step "Sound effects (synthesised, royalty-free) in assets/sfx"
"$HOME_DIR/.venv/bin/python" -I "$STUDIO/pipeline/sound.py" sfx "$STUDIO/../assets/sfx"

say_step "Kokoro voice model (Apache-2.0) in $MODELS"
mkdir -p "$MODELS"
[ -s "$MODELS/kokoro-v1.0.onnx" ] || curl -fSL -o "$MODELS/kokoro-v1.0.onnx" "$KOKORO_URL/kokoro-v1.0.onnx"
[ -s "$MODELS/voices-v1.0.bin" ] || curl -fSL -o "$MODELS/voices-v1.0.bin" "$KOKORO_URL/voices-v1.0.bin"

if [ "$WITH_VOICES" = 1 ]; then
  say_step "Expressive voices in $VOICES (first run downloads several GB)"
  mkdir -p "$VOICES"
  [ -x "$VOICES/.venv/bin/python" ] || uv venv --python 3.11 "$VOICES/.venv"
  # setuptools<81: Chatterbox's watermarker still imports pkg_resources.
  uv pip install --python "$VOICES/.venv/bin/python" chatterbox-tts==0.1.7 "setuptools<81"
  [ -x "$VOICES/.venv-mlx/bin/python" ] || uv venv --python 3.11 "$VOICES/.venv-mlx"
  uv pip install --python "$VOICES/.venv-mlx/bin/python" mlx-audio==0.6.0 soundfile
  "$VOICES/.venv/bin/python" -c "from huggingface_hub import snapshot_download as s; s('ResembleAI/chatterbox')"
  echo "Chatterbox ready. Qwen3-TTS weights download on first use."
fi

say_step "Done"
echo "Try:  cd \"$STUDIO\" && npm run say -- \"Welcome to EdZola Video Studio\""
echo "      npm run render -- a001-what-is-an-mis     (needs --voices for its Chatterbox narrator)"
