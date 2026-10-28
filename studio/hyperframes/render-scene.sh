#!/usr/bin/env bash
# Render one HyperFrames scene of an episode, timed by its narration.
#
#   bash studio/hyperframes/render-scene.sh <episode-id> <scene-id> [timing.json] [--draft] [--snap "1,5,9"]
#
# - Stages episodes/<id>/scenes/<scene>.html as index.html in
#   $EDZOLA_VIDEO_HOME/build/<id>/hf/<scene>/ with the kit, fonts, brand assets, GSAP.
# - Writes cues.js (beat start/end, captions, duration) from timing.json
#   (default: $EDZOLA_VIDEO_HOME/build/<id>/timing.json) and fills {{DURATION}}.
# - Runs `hyperframes check`, then renders to build/<id>/scenes/<scene>.mp4.
# - --snap renders only still frames at the given seconds (fast design review).
set -euo pipefail
EP="$1"; SCENE="$2"; shift 2
HOME_DIR="${EDZOLA_VIDEO_HOME:-$HOME/.edzola-video-studio}"
TIMING="$HOME_DIR/build/$EP/timing.json"
QUALITY="delivery"; SNAP=""
while [ $# -gt 0 ]; do
  case "$1" in
    --draft) QUALITY="draft" ;;
    --snap) SNAP="$2"; shift ;;
    *) TIMING="$1" ;;
  esac
  shift
done

KIT="$(cd "$(dirname "$0")" && pwd)"
STUDIO="$(cd "$KIT/../.." && pwd)"
SRC="$STUDIO/episodes/$EP/scenes/$SCENE.html"
WORK="$HOME_DIR/hyperframes"
STAGE="$HOME_DIR/build/$EP/hf/$SCENE"
OUT="$HOME_DIR/build/$EP/scenes"
[ -f "$SRC" ] || { echo "missing $SRC"; exit 1; }
[ -f "$TIMING" ] || { echo "missing timing $TIMING (run narrate first)"; exit 1; }

source "$HOME/.nvm/nvm.sh" >/dev/null
nvm use 22 >/dev/null 2>&1 || nvm install 22 >/dev/null
export HYPERFRAMES_SKIP_SKILLS=1 HYPERFRAMES_TELEMETRY_DISABLED=1 DO_NOT_TRACK=1
mkdir -p "$WORK" "$STAGE/fonts" "$STAGE/brand" "$OUT"
if [ ! -d "$WORK/node_modules/hyperframes" ]; then
  (cd "$WORK" && npm init -y >/dev/null && npm install --no-fund --no-audit hyperframes@0.8.181 gsap@3.14.2 >/dev/null)
fi

python3 - "$STUDIO/episodes/$EP/storyboard.json" "$TIMING" "$SCENE" "$SRC" "$STAGE" <<'PY'
import json, sys
board_p, timing_p, scene_id, src, stage = sys.argv[1:6]
board, timing = json.load(open(board_p)), json.load(open(timing_p))
t = next(s for s in timing["scenes"] if s["id"] == scene_id)
cues = {"scene": scene_id, "duration": t["duration"], "series": board.get("series", ""),
        "captions": board.get("captions", "burned") == "burned",
        "beats": [{"start": b["start"], "end": b["end"], "captions": b["captions"]} for b in t["beats"]]}
open(f"{stage}/cues.js", "w").write("window.CUES = " + json.dumps(cues) + ";\n")
html = open(src).read().replace("{{DURATION}}", f'{t["duration"]:.3f}')
open(f"{stage}/index.html", "w").write(html)
print(f"staged {scene_id}: {t['duration']:.2f}s, {len(t['beats'])} beats")
PY
cp "$KIT/kit/brand.css" "$KIT/kit/kit.js" "$STAGE/"
cp "$WORK/node_modules/gsap/dist/gsap.min.js" "$STAGE/"
cp "$STUDIO/assets/fonts/"*.ttf "$STAGE/fonts/"
cp "$STUDIO/assets/brand/"*.svg "$STUDIO/assets/brand/"*.png "$STAGE/brand/"

cd "$WORK"
npx hyperframes check "$STAGE" || { echo "hyperframes check failed for $SCENE"; [ -n "${HF_ALLOW_CHECK_FAIL:-}" ] || exit 2; }
if [ -n "$SNAP" ]; then
  npx hyperframes snapshot "$STAGE" --at "$SNAP" -o "$OUT/$SCENE-snaps"
  echo "snapshots: $OUT/$SCENE-snaps"
else
  npx hyperframes render "$STAGE" --fps 30 --quality "$QUALITY" -o "$OUT/$SCENE.mp4"
  echo "rendered: $OUT/$SCENE.mp4"
fi
