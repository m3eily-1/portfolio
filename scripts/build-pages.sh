#!/bin/bash
# Build the static GitHub Pages site into docs/ (served from main /docs at m3eily-1.github.io/portfolio).
# Plain "/img/…" and "/logo/…" strings in components and data aren't rewritten by basePath,
# so the exported files are post-processed to add the prefix.
set -euo pipefail
cd "$(dirname "$0")/.."
BASE="/portfolio"
rm -rf out
STATIC_EXPORT=true NEXT_PUBLIC_BASE_PATH="$BASE" npx next build
python3 - "$BASE" <<'PY'
import re, sys, pathlib
base = sys.argv[1]
pat = re.compile(r'''(["'`(]|url\(|,\s)(/(?:img|logo)/)''')
n = 0
for p in pathlib.Path("out").rglob("*"):
    if p.suffix in (".html", ".css", ".js", ".txt") and p.is_file():
        s = p.read_text(encoding="utf-8", errors="ignore")
        t = pat.sub(lambda m: m.group(1) + base + m.group(2), s)
        if t != s:
            p.write_text(t, encoding="utf-8"); n += 1
print(f"prefixed asset paths in {n} files")
PY
rm -rf docs && cp -R out docs && touch docs/.nojekyll && rm -rf out
echo "docs/ ready"
