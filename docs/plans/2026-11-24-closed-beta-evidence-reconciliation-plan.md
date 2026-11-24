---
title: Closed Beta Evidence Reconciliation - Plan
type: docs
date: 2026-11-24
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
product_contract_source: ce-plan
execution: code
---

# Closed Beta Evidence Reconciliation - Plan

## Goal Capsule

- **Objective:** reconcile the public proof-of-work repository with the verified 2026-11-24 Earned Signal closed-beta milestone without overstating adoption, market validation, outcomes, or public availability.
- **Authority:** `AGENTS.md`, the public evidence manifests, release/privacy rules, and current committed source evidence. Historical public manifests remain immutable snapshots.
- **Evidence basis:** committed source release notes, current-status documentation, decision records, and dated checkpoints from 2026-11-22 through 2026-11-24.
- **Current verified state:** invite-only closed beta is running; the first invited tester signed in and accepted the current terms on 2026-11-24; smoke tests, telemetry checks, backup/restore and reboot checks are recorded as passed; the beta is free; in-app payments remain test-mode only.
- **Evidence boundary:** closed beta is not public availability, market validation, adoption proof, recruiter response, job-search impact, or a measured business outcome.
- **Privacy boundary:** publish only recruiter-safe conclusions. Do not publish private repository identity, private paths, tester identity, contact details, runtime secrets, allow-list contents, or operational host details.

## Product Contract

### Naming

- Public product name: **Earned Signal**.
- `Job-agent` remains the historical project/route label where changing URLs would break evidence continuity.
- Recruiter-facing prose should use **Earned Signal (formerly Job-agent)** on first mention where context is needed.
- Remove claims that Job-agent is merely a working title or that the product is not live.

### Canonical maturity facts

- Product version: `closed-beta-2026-11-24`
- Evidence date: `2026-11-24`
- Implementation state: `Closed beta running with invited testers`
- Public availability: `Invite-only closed beta; public recruiter-safe preview remains separate`
- Maturity: `Released — closed beta`
- Market validation: `Not market-validated`
- Outcomes: `No measured market outcomes`
- Privacy: `Public proof privacy review complete; closed-beta operations internally verified`

### Requirements

- R1. Update the repository-level status contract so future agents describe Earned Signal as released to and running in an invite-only closed beta, while preserving the no-market-validation/no-measured-outcomes boundary.
- R2. Add a new current release manifest. Preserve v1 and v2 unchanged as historical snapshots.
- R3. Update all canonical recruiter-facing release-fact surfaces to the new manifest and exact values.
- R4. Update the homepage and guided case study so the closed-beta milestone is visible within a short recruiter skim.
- R5. Keep the public demo explicitly synthetic and disconnected from closed-beta user data.
- R6. Update project status, proof points, case study and strategy documents that still frame deployment/legal/telemetry as future work.
- R7. Record only material closed-beta decisions in the public decision log: controlled invite-only launch, verification before invitations, and free-beta/payment boundary.
- R8. Keep private source details private. Public evidence may state `Internal / Verified` and summarize the verification basis.
- R9. Regenerate static decision-log projections and the repository evidence index after source changes.
- R10. Update tests so the current release contract points to v3 and prevents regression to pre-launch wording.
- R11. Pass contract tests, browser tests, release validation, evidence-index check and whitespace checks before merge.

## Implementation Units

### U1 — Status contract and current evidence manifest

**Files**
- `AGENTS.md`
- `site/evidence/releases/job-agent-v3.json`
- `release/allowlist.json`

**Acceptance**
- No normative instruction says the product is “not live”.
- v3 has the exact canonical maturity facts above.
- v1/v2 are unchanged.

### U2 — Recruiter-facing current state

**Files**
- `README.md`
- `site/index.html`
- `site/proof/job-agent/index.html`
- `site/recruiter-agent-guide.md`
- `site/recruiter-report-brief.md`
- `site/llms.txt`
- `DESIGN.md`

**Acceptance**
- First-screen proof clearly says “Released — closed beta”.
- Earned Signal is the current product name.
- Public static demo is not presented as the live beta.
- Market/outcome caveats remain explicit.

### U3 — Evidence-backed project documentation

**Files**
- `PROJECT_STATUS.md`
- `PROJECT_PROOF_POINTS.md`
- `case-studies/JOB_AGENT_CASE_STUDY.md`
- `RELEASE_NOTES.md`

**Acceptance**
- Current status is dated 2026-11-24.
- Closed-beta launch, first tester, telemetry/smoke verification and privacy/control boundaries are represented.
- No tester identity, private source path, private host detail or unsupported metric is published.

### U4 — Strategy reconciliation

**Files**
- `strategy/job-agent/README.md`
- `strategy/job-agent/product/PRODUCT_STRATEGY.md`
- `strategy/job-agent/market/GO_TO_MARKET.md`
- `strategy/job-agent/business/PRICING_STRATEGY.md`
- `strategy/job-agent/business/BUSINESS_MODEL.md`
- `strategy/job-agent/decisions/DECISION_TRAIL.md`

**Acceptance**
- The strategy distinguishes the current closed-beta experiment from still-unvalidated commercial hypotheses.
- The current beta is documented as free and invite-only.
- Paid pricing remains a later hypothesis, not a validated model.
- The first external cohort is treated as product-learning evidence, not market validation.

### U5 — Decision evidence and generated projections

**Files**
- `site/evidence/decision-log.json`
- `site/index.html`
- `site/proof/recursive-workflow/index.html`

**Public decisions to add**
1. Launch the first beta on a constrained invite-only operating surface instead of waiting for the final hosting target.
2. Require smoke/telemetry/backup/auth verification before sending the first invitation.
3. Keep the beta free and defer paid monetization while the product is still learning from a controlled cohort.

**Acceptance**
- Entries use existing capability tags only.
- Static HTML is generated from the JSON in newest-first order.
- Decision wording describes observable choices and evidence, not private reasoning.

### U6 — Contract updates and evidence index

**Files**
- `tests/contracts/evidence-consistency.test.mjs`
- relevant e2e tests only where current status text is asserted
- `site/evidence/repository-evidence-index.json`

**Acceptance**
- Tests read v3 as current and v2 as previous.
- Exact repeated release facts are enforced.
- Repository evidence index is current after all changed recruiter-evidence files.

## CE Execution

1. **ce-plan:** this artifact defines the single thematic PR and acceptance contract.
2. **ce-work:** implement U1-U6 on `docs/closed-beta-evidence-reconciliation`.
3. **ce-code-review:** inspect the diff for overclaiming, private-source leakage, stale pre-launch wording and generated-file drift.
4. **ce-commit-push-pr:** open one PR with source/evidence summary and verification checklist.
5. **ce-babysit-pr:** wait for Quality, inspect failing steps, repair the branch, and re-run until green.
6. **merge gate:** merge only after CI is green and the PR diff still matches the evidence boundary.
7. **post-merge:** verify Pages deployment for the merge SHA. Do not change DNS or custom-domain configuration.

## Stop Conditions

Stop and do not publish a claim if:
- the only support is an uncommitted or ambiguous source;
- the claim would identify a tester or expose a private source path/repository identity;
- the wording implies public availability, adoption, market validation or measured outcomes;
- a generated index or static decision-log projection cannot be reconciled with its source;
- release/privacy validation fails.
