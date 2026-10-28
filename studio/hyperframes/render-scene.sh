#!/usr/bin/env bash
# Thin wrapper kept for macOS/Linux muscle memory. The real script is render-scene.mjs (cross-platform).
#   bash studio/hyperframes/render-scene.sh <episode-id> <scene-id> [timing.json] [--draft] [--snap "1,5,9"]
set -euo pipefail
exec node "$(cd "$(dirname "$0")" && pwd)/render-scene.mjs" "$@"
