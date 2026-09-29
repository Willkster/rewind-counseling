#!/usr/bin/env bash
# Flips the repo from preview to live. Run from the repo root, at cutover time.
# Does NOT touch DNS. See CUTOVER.md for the Squarespace side.
set -euo pipefail

echo "==> adding CNAME"
echo "www.rewindcounseling.com" > CNAME

echo "==> removing noindex from all pages"
python3 - <<'PY'
import glob
n = 0
for f in glob.glob('*.html'):
    s = open(f).read()
    t = s.replace('<meta name="robots" content="noindex, nofollow">\n', '')
    if t != s:
        open(f, 'w').write(t); n += 1
print(f"    {n} pages")
PY

echo "==> opening robots.txt to crawlers"
cat > robots.txt <<'ROBOTS'
User-agent: *
Allow: /

Sitemap: https://www.rewindcounseling.com/sitemap.xml
ROBOTS

echo "==> done. Review, then commit and push."
git status --short
