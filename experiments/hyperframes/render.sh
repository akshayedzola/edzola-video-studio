#!/usr/bin/env bash
# Reproducible render for the HyperFrames "twist" prototype.
# Source lives in the repo; node_modules, fonts copy and renders live locally.
set -euo pipefail
SRC="$(cd "$(dirname "$0")" && pwd)"
STUDIO="$(cd "$SRC/../.." && pwd)"
WORK="$HOME/.edzola-video-studio/experiments/hyperframes"
PROJ="$WORK/project"

source "$HOME/.nvm/nvm.sh"
nvm use 22 >/dev/null            # Node 22 for this experiment only; default alias untouched
export HYPERFRAMES_SKIP_SKILLS=1     # skip the GitHub skills check on every CLI call

mkdir -p "$WORK" "$PROJ/fonts" "$PROJ/vendor"
cd "$WORK"
[ -f package.json ] || npm init -y >/dev/null
[ -d node_modules/hyperframes ] || npm install hyperframes@0.8.181 gsap@3.14.2

cp "$SRC/index.html" "$SRC/cues.json" "$PROJ/"
cp "$STUDIO/assets/fonts/Fraunces-Variable.ttf" "$STUDIO/assets/fonts/Inter-Variable.ttf" "$PROJ/fonts/"
cp node_modules/gsap/dist/gsap.min.js "$PROJ/vendor/"

npx hyperframes check "$PROJ"     # lint + runtime + layout + motion + WCAG contrast gate
time npx hyperframes render "$PROJ" --fps 30 --quality delivery \
  --variables-file "$PROJ/cues.json" -o "$WORK/renders/twist-hyperframes.mp4"
cp "$WORK/renders/twist-hyperframes.mp4" "$SRC/twist-hyperframes.mp4"
echo "Done: $SRC/twist-hyperframes.mp4"
