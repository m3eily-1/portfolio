#!/bin/bash
# Headless-Chrome screenshot of a dev route, for comparing against Figma renders.
# usage: scripts/shot.sh <route> <width> <height> <out.png> [--motion] [--wait ms]
# Defaults to prefers-reduced-motion so GSAP sections render their settled state
# (headless virtual time stalls time-based tweens otherwise).
ROUTE="$1"; W="$2"; H="$3"; OUT="$4"; shift 4
MOTION="--force-prefers-reduced-motion"; WAIT=7000
while [ $# -gt 0 ]; do
  case "$1" in
    --motion) MOTION="";;
    --wait) WAIT="$2"; shift;;
  esac
  shift
done
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PROFILE=$(mktemp -d /tmp/shot-profile.XXXXXX)
rm -f "$OUT"
"$CHROME" --headless=new --hide-scrollbars $MOTION \
  --use-angle=swiftshader --enable-unsafe-swiftshader \
  --window-size="$W,$H" --virtual-time-budget="$WAIT" \
  --user-data-dir="$PROFILE" --screenshot="$OUT" "http://localhost:4760$ROUTE" >/dev/null 2>&1 &
PID=$!
for i in $(seq 1 90); do
  [ -s "$OUT" ] && sleep 0.5 && break
  sleep 0.5
done
kill $PID 2>/dev/null; sleep 0.3; kill -9 $PID 2>/dev/null
pkill -f "$PROFILE" 2>/dev/null
rm -rf "$PROFILE"
[ -s "$OUT" ] && echo "ok $OUT" || { echo "FAILED $ROUTE"; exit 1; }
