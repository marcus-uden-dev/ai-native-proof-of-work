# Prototype Library

This directory is the canonical, tracked home for shareable visual prototypes.

## Open a prototype locally

Run this command from the repository root:

```text
npm run serve:prototypes
```

Then open the library at `http://127.0.0.1:54959/`. Select a prototype from the visual index. Stop the server with `Ctrl+C` when finished.

## Add a prototype

1. Save its self-contained HTML file in this directory with a purpose-based name.
2. Add it to `index.html` with its purpose and review status.
3. Add its path to `release/allowlist.json` after the public-boundary review.
4. Run `npm run release:validate` before a release candidate.

Do not store temporary screenshots, raw sessions, private data, or local machine paths here.
