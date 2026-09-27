---
created: 2026-09-02
author: Marcus Udén (Codex)
source_tool: Codex Desktop
source: approved plan-for-plan research and user request
type: implementation-plan
status: ready
review_status: pending
supersedes: plans/job-agent-public-refresh/plan-for-plan.md
tags: [job-agent, recruiter-safe, public-proof, versioning, github-pages]
---

# Job-agent public proof refresh — implementation plan

## Outcome

Publish the current Job-agent UI and refresh the clickable recruiter-safe prototype as `0.9-public-proof` while keeping both earlier public-proof states inspectable:

```text
v0.5 historical UI → 0.8-public-proof previous edition → 0.9-public-proof current edition
```

The page will lead with the current product surface. The clickable prototype will use the current site structure and interactions. The previous public edition will remain available as an archived snapshot. The original `v0.5` UI and simulated data will remain visible in the timeline.

## Baseline and evidence boundary

- Public repository: `marcus-uden-dev/ai-native-proof-of-work`.
- Public baseline: `origin/main` at `5a8791b`, currently labelled `0.8-public-proof`.
- Current private Job-agent source candidate, branch `codex/final-verification-and-cleanup`, commit `061d0e2`.
- Current source screens to represent: `Today`, `Find jobs`, and job detail.
- The source branch is pushed but has no pull request according to its current status document. The public update must pass a source-boundary review before publication.
- The public proof remains static, recruiter-safe, synthetic-only, and not market validation.

## Versioning decision

Use these labels consistently:

| Label | Meaning | Treatment |
|---|---|---|
| `v0.5` | Earlier UI baseline with the original simulated workflow | Keep visible and unchanged |
| `0.8-public-proof` | Previous public evidence edition | Archive as a complete, directly reachable edition |
| `0.9-public-proof` | New public evidence edition based on the approved current-source capture | Make the primary page edition |
| `1.0` | Future coherent end-to-end product milestone | Do not use in this change |

`0.9-public-proof` is a public evidence version. It is not a source-code SemVer release. Do not change `frontend/package.json` only to support this page update. Do not call the source branch a production release.

## Information architecture

The updated Job-agent page will use this order:

1. **Current edition header** — `0.9-public-proof`, evidence date, source boundary, and work-in-progress status.
2. **Current UI proof** — job detail as the lead frame, with Today and Find jobs as supporting frames. This keeps the selected Option B composition.
3. **Version timeline** — `v0.5` → `0.8` → `0.9`, with each item linked to its page anchor or archive.
4. **Previous public edition** — `0.8-public-proof`, clearly labelled as archived and preserved.
5. **Earlier UI version** — `v0.5`, with the existing scope, research, and preparation frames and the existing simulated-data copy.
6. **Decision and limitations** — retain evidence labels, synthetic-data language, no-production-service language, and no-measured-outcomes language.
7. **Clickable recruiter-safe prototype** — refresh the actual click-through experience to match the current site structure while keeping its governed synthetic fixture.

## Separate artifacts

The implementation must keep these three artifacts separate:

| Artifact | Purpose | Change in this plan |
|---|---|---|
| `docs/prototypes/job-agent-public-refresh-preview.html` | Local layout review with A/B/C presentation variants | Review only; it is not the public prototype |
| `site/proof/job-agent/index.html` | GitHub Pages case-study page | Update to `0.9-public-proof` and add the version timeline |
| `site/proof/job-agent/demo/` | Public clickable recruiter-safe prototype | Refresh the actual UI shell, screens, and interactions |

## Files and changes

### 1. Create a clean public worktree

Use a separate worktree based on `origin/main`. Do not use the dirty primary worktree.

Create branch:

```text
codex/job-agent-public-refresh-v09
```

Record the starting SHA before edits. This is the recovery point for the change.

### 2. Add versioned image assets

Add new current screenshots under a non-colliding directory:

```text
site/assets/images/job-agent/v0.9-public-proof/current-job-detail.png
site/assets/images/job-agent/v0.9-public-proof/current-today.png
site/assets/images/job-agent/v0.9-public-proof/current-find-jobs.png
```

Capture these from the approved current-source commit after the source-boundary gate passes. Use the same synthetic fixture and privacy-review process as the existing public assets.

Preserve the existing paths. Do not overwrite:

```text
site/assets/images/job-agent/current-job-detail.png
site/assets/images/job-agent/current-today.png
site/assets/images/job-agent/current-find-jobs.png
site/assets/images/job-agent/intake-scope.png
site/assets/images/job-agent/decision-research.png
site/assets/images/job-agent/tailored-action.png
```

The old current-image paths remain the rollback and archive source. The old historical paths remain the `v0.5` source.

### 3. Add a preserved `0.8` edition

Add a directly reachable archive page:

```text
site/proof/job-agent/archive/0.8-public-proof/index.html
```

This page will preserve the previous public-page structure and copy. Update only relative asset links as needed for the archive location. It must retain:

- the `0.8-public-proof` label;
- the 2026-08-31 evidence date;
- the existing current proof frames;
- the existing `v0.5` historical section;
- the existing evidence-boundary and limitations language;
- a link back to the current `0.9-public-proof` page.

Keep `site/evidence/releases/job-agent-v1.json` unchanged as the current `0.8` manifest. Do not mutate the old manifest into the new edition.

### 4. Add a new release manifest

Add:

```text
site/evidence/releases/job-agent-v2.json
```

Set:

```json
{
  "releaseId": "job-agent-v2",
  "productVersion": "0.9-public-proof",
  "previousProductVersion": "0.8-public-proof",
  "evidenceDate": "<approved capture date>",
  "sourceCommit": "<approved source commit>",
  "publicAvailability": "Static recruiter-safe preview only"
}
```

Copy the existing governed source classes, limitations, synthetic fixture reference, maturity state, and next-test language. Keep the existing wording that says the product is work in progress, not market-validated, and has no measured market outcomes.

The manifest may include the new traceability fields only after checking the repository's contract tests and release script. Do not add a new schema or dependency.

### 5. Update the current public page

Modify:

```text
site/proof/job-agent/index.html
```

Required changes:

- Point the release card to `job-agent-v2` data and display `0.9-public-proof`.
- Point the primary three proof frames to the new `v0.9-public-proof/` assets.
- Add a visible three-state version timeline.
- Add an explicit `0.8-public-proof · previous public edition` block with a link to the archive page.
- Keep the existing `v0.5` section and original simulated-data text.
- Keep current proof first and historical proof later.
- Keep the Option B job-detail-led presentation.
- Add capture date and source-commit traceability without exposing private local paths.
- Keep the static prototype link and its recruiter-safe boundary.

If the existing CSS cannot support the timeline and archive block cleanly, update only the relevant selectors in:

```text
site/assets/css/site.css
```

Do not refactor the full site shell.

### 6. Refresh the clickable recruiter-safe prototype

Review and update only the affected public prototype files:

```text
site/proof/job-agent/demo/index.html
site/proof/job-agent/demo/app.js
site/proof/job-agent/demo/styles.css
```

This is a functional static click-through update. It is not only a copy or label change.

Implement the current site structure in the prototype:

- current dark Job-agent shell and navigation;
- `Today`, `Find jobs`, and job-detail surfaces;
- clickable navigation between the main surfaces;
- the current Option B emphasis on job detail;
- visible `0.9-public-proof` current-edition label;
- a clear route to the preserved `0.8-public-proof` edition or archive;
- the original `v0.5` history entry and simulated workflow context.

Keep the existing governed fixture:

```text
site/evidence/fixtures/job-agent-company-v1.json
```

Keep the same simulated company, evidence labels, decision flow, and no-production-service boundary. Use in-memory state only. The prototype must work without a backend or login. Do not introduce live requests, user data, or new external dependencies.

The prototype may use simplified static representations of the current source UI. It must preserve the interaction story: discover a role, inspect fit and company evidence, and move toward a supported next action.

### 7. Update the release allowlist and tests

Modify:

```text
release/allowlist.json
tests/e2e/job-agent-case-study.spec.js
tests/e2e/job-agent-demo.spec.js
tests/contracts/evidence-consistency.test.mjs
```

Add assertions for:

- visible `0.9-public-proof` current metadata;
- visible `0.8-public-proof` archive link or block;
- visible `v0.5` historical section;
- current image paths under the new versioned directory;
- all historical image paths still resolving;
- the archive page resolving;
- synthetic and inferred evidence labels remaining governed;
- no prohibited maturity or live-product claims;
- static prototype link still resolving.

Add clickable-prototype assertions for:

- navigation from the prototype entry screen to Today, Find jobs, and job detail;
- the current-edition label appearing before prototype data;
- the job-detail surface exposing the intended evidence and next-action controls;
- the previous-edition link or archive route resolving;
- the prototype remaining usable with JavaScript enabled and no backend;
- no dead controls, production URLs, or live-service claims.

Add every new public file to `release/allowlist.json`. Do not allow private source files, local paths, raw source-repository exports, or unreviewed screenshots.

## Execution sequence

1. Refresh the public repository and create the clean versioned branch from `origin/main`.
2. Confirm the approved source commit and capture boundary for the current UI.
3. Capture and privacy-review the three new current screenshots.
4. Add the new versioned assets and the `job-agent-v2.json` manifest.
5. Add the immutable `0.8` archive page.
6. Update the current page to `0.9-public-proof` and add the visible timeline.
7. Refresh the clickable prototype UI and interactions while keeping the existing simulated fixture.
8. Update the release allowlist and focused tests.
9. Run validation locally.
10. Push the branch and open a pull request.
11. Wait for the privacy, quality, and release checks to pass.
12. Merge the pull request using the repository's normal merge flow.
13. Wait for GitHub Pages deployment.
14. Verify the live current page, archive page, historical assets, current assets, and prototype link.

## Validation gate

Run from the clean public worktree:

```powershell
npm test
npm run release:validate
git diff --check
```

Also verify directly:

- the current page returns HTTP 200;
- the archive page returns HTTP 200;
- all six historical/current image groups return HTTP 200;
- the release manifest returns HTTP 200 and contains `0.9-public-proof`;
- the prototype link returns HTTP 200;
- the clickable prototype navigation and primary controls work without a backend;
- the page shows `0.9` before `0.8` before `v0.5` in the reading order;
- the live page contains no private local paths or `file:///` links;
- GitHub Actions Quality passes;
- GitHub Pages deployment passes;
- the deployed page reports the intended release metadata.

## Privacy gate

Before the pull request is merged, verify every new screenshot and text change:

- no real personal data appears;
- no real recruiter, employer, email, phone number, or address appears;
- the company and company-specific values remain synthetic or inferred from synthetic inputs;
- no private source-repository path appears;
- the source commit is public-safe metadata only;
- the page does not claim a live product, market validation, user adoption, or measured outcome.

If the current source branch cannot pass this gate, use the latest approved committed source boundary and mark the newer work as deferred. Do not publish an unreviewed dirty-worktree capture.

## Rollback

This is a two-way-door change.

- Preserve the pre-change `origin/main` SHA and the PR merge SHA.
- Revert the merge commit to restore the current `0.8-public-proof` page.
- The `0.8` archive page and old manifest remain in the repository as an additional recovery path.
- Do not force-push or delete the source branch before the live verification and recovery window close.

## Definition of done

- `0.9-public-proof` is the visible current edition on GitHub Pages.
- `0.8-public-proof` is directly reachable as a preserved archive.
- `v0.5` remains visible with its original simulated data and copy.
- New screenshots use versioned, non-colliding paths.
- The static recruiter-safe prototype still uses governed synthetic data.
- The clickable recruiter-safe prototype reflects the current site structure and supports the main review path.
- The current page keeps Option B: job detail leads, Today and Find jobs support.
- All local and CI validation passes.
- GitHub Pages deploys successfully.
- Live verification confirms the current edition, archive, history, assets, and prototype.
- No unrelated primary-worktree changes are committed.

## Current preview

The local layout preview is available at:

```text
http://127.0.0.1:8766/docs/prototypes/job-agent-public-refresh-preview.html?variant=b
```

Variant B is the recommended layout. Variants A and C remain available for comparison, but the implementation should proceed with B unless the preview review selects another layout.
