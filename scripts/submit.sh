#!/bin/bash

# Submit every URL from the generated sitemap to IndexNow as a single payload.
# Usage: ./scripts/submit.sh
# Requires: INDEXNOW_KEY env var, and _site/sitemap.xml to exist
#           (run `npm run build` first).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
SITEMAP="$ROOT_DIR/_site/sitemap.xml"

if [ ! -f "$SITEMAP" ]; then
    echo "Error: $SITEMAP not found. Run 'npm run build' first." >&2
    exit 1
fi

grep -oE '<loc>[^<]+</loc>' "$SITEMAP" \
    | sed -E 's|</?loc>||g' \
    | "$SCRIPT_DIR/indexnow.sh"
