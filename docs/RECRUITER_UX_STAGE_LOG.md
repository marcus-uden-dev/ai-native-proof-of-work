# Recruiter-first UX refactor — execution checkpoint

> Branch: `feat/editorial-recruiter-ux-20261021`
> Base `main` commit: `35fc4249126967ee44c8ed133d5a88280d8b2c9e`
> Design authority: existing `DESIGN.md` (Paper Trail Evidence, unchanged)
> Public deploy: **NO** — branch is not `main`
> Updated: 2026-10-21

## Editorial direction

Use the Editorial layout selected by Marcus, but retain the repository's existing visual system. No redesign of colours, fonts, spacing tokens or named design principles. Preserve the evidence manifest and static HTML baseline.

## Stage tracker

- [x] Stage 00 — branch and baseline reference established
- [ ] Stage 01 — WIP notice implemented; full release validation pending
- [ ] Stage 02 — header/navigation audit
- [ ] Stage 03 — projects before decision log
- [ ] Stage 04 — status truthfulness
- [ ] Stage 05 — source-based evidence review in batches
- [ ] Stage 06 — plain-English decision rewrites
- [ ] Stage 07 — selected decisions plus archive
- [ ] Stage 08 — project evidence routes
- [ ] Stage 09 — chips, filters, accessibility
- [ ] Stage 10 — hero and AI-review hierarchy
- [ ] Stage 11 — responsive/editorial polish
- [ ] Stage 12 — publication review (approval required)

## Stage 01 scope

- Added one static informational notice immediately following the homepage skip link and preceding the masthead.
- Copy: “Work in progress. This portfolio is being refined. Some interactive features and evidence views are not yet complete. Thanks for your patience.”
- Reused `--gold-soft`, `--line` and `--ink`; avoided animation, dismissal and JavaScript.
- Added a contract assertion for notice visibility, placement and non-interactivity.
- Preserved `DESIGN.md`, Job-agent maturity statements and publication settings.

## Verification

**Local structural assertions:** notice placement, single instance and approved palette references verified before this branch update.

**Full tests:** PENDING. Current execution environment cannot reach GitHub through local Git, so `npm ci`, Playwright and `npm run release:validate` have not been run against this candidate. Do not mark Stage 01 complete or merge until required checks pass.

**Visual checks:** PENDING at 320, 390, 768, 1024 and 1440 px.

**Next action:** Run required full test gate, visually inspect notice on mobile/desktop, mark Stage 01 done only if all checks pass, and continue with Stage 02. Keep changes off `main` until explicit publication approval.

**Privacy:** This checkpoint contains only public-safe branch and repository references.
