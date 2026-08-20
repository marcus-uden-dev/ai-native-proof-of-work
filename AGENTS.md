# Repository instructions

## Purpose

This repository is the public, recruiter-first proof-of-work edition for Marcus Udén.

## Boundaries

- Keep this repository separate from all private workbench repositories and identities.
- Do not copy Git history, remotes, raw sessions, local paths, credentials, or private metadata.
- Add public artifacts only after they appear in `release/allowlist.json`.
- Record every published binary artifact in `release/privacy-review.json` with its SHA-256 digest.
- Describe Job-agent as work in progress, not live, not market-validated, and without measured outcomes.
- Use only the professional identity `Marcus Udén`, `marcus.uden.dev`, and `github.com/marcus-uden-dev`.

## Product and design authority

- The evidence manifest is the source of truth for public status and provenance.
- `DESIGN.md` is the source of truth for visual design.
- Core content must work as static HTML without client-side rendering.
- Use relative internal links so GitHub Pages project paths and the custom domain both work.

## Validation

Run these checks before each release candidate:

```text
npm ci
npm run test:contracts
npm run test:e2e
npm run release:validate
git diff --check
```

Do not add a remote, publish a repository, enable Pages, or change DNS without Marcus's explicit approval.

