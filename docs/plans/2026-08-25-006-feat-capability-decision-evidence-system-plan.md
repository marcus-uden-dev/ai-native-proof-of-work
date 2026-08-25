---
title: "feat: redesign capability and decision evidence system"
type: feat
date: 2026-08-25
topic: capability-decision-evidence-system
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
product_contract_source: user-request
execution: code
status: active
---

# Capability and Decision Evidence System

## Product Contract

### Summary

Replace the public Decision Log's flat technical tag cloud with a small recruiter-facing capability model, an inspectable mechanism library, explicit evidence/outcome semantics, and role-lens views over existing proof. Keep the static site, concrete products, privacy boundary, and evidence-first editorial design intact.

### Problem Frame

The current public model exposes about 50 tags that mix employable capabilities with implementation mechanisms, controls, and AI workflow vocabulary. A recruiter can see technical detail but must infer what Marcus can do and how strongly the repository supports it. The Profile Oracle surface also presents a smaller, inconsistent set of signals than the underlying Decision Log.

The repository has 17 public decision records, existing static HTML, structured JSON, release allowlisting, and contract/e2e tests. The public checkout is the canonical target; the separate local documentation checkout is not part of this implementation.

### Requirements

- **R1 — Typed evidence model:** Every decision record must separate recruiter-facing capabilities, mechanisms, evidence status, outcome status, and case potential. (Source: user request sections 3, 9, 15, 16.)
- **R2 — Primary capabilities:** Publish a substantially smaller primary capability taxonomy centered on recruiter-readable abilities, including execution, operational understanding, requirements translation, technical fluency, quality judgment, stakeholder management, operating-model design, change management, adoption and enablement, metrics and KPIs, value realization, and evidence discipline. (Source: user request sections 4 and 26.)
- **R3 — Secondary and mechanism library:** Keep technically useful concepts searchable without competing visually with primary capabilities. Do not create a capability for every AI technique. (Source: user request sections 2, 5, and 7.)
- **R4 — Conservative migration:** Migrate all 17 existing decisions individually, preserve factual wording and evidence boundaries, use 2–4 meaningful capabilities per decision, and record explicit alias/deprecation mappings. (Source: user request section 16.)
- **R5 — Role lenses:** Provide AI Product, AI Transformation / Enablement, Product Ops / Business Analysis, and AI Implementation / Customer Enablement as views over the same evidence, with core/supporting capability lists and no invented strength scores. (Source: user request sections 10–11.)
- **R6 — Evidence-first Profiles UX:** Let a reviewer move from role to capability to strongest proof to supporting decisions to deeper evidence. Weak or missing proof must appear as an evidence gap or remain omitted. (Source: user request section 12.)
- **R7 — Workflow language:** Remove unnecessary recruiter-facing `Autoresearch` terminology and describe the system as a human-gated workflow improvement loop. Preserve the explicit human gate and do not imply autonomous self-modification. (Source: user request section 8.)
- **R8 — Static and private-safe:** Core content must remain present in raw HTML without JavaScript, use relative links, preserve the release/privacy boundary, and keep concrete product proof ahead of harness mechanisms. (Source: user request sections 18–20 and 21.)
- **R9 — Contracts:** Add semantic tests for taxonomy integrity, references, statuses, migration aliases, static recruiter copy, link validity, no unsupported outcomes, and the release boundary. (Source: user request section 22.)

### Scope Boundaries

- Do not fabricate new cases or import private workbench evidence.
- Do not add scores, percentages, stars, radar charts, proficiency bars, or badge clouds.
- Do not build a frontend framework or client-render core content.
- Do not change remotes, Pages, DNS, publication, identity, or the Job-agent maturity/outcome boundary.
- Do not change binary artifacts or privacy records unless a validator proves a required metadata update is unavoidable.
- Do not turn the Personal AI Harness into the lead proof point.

### Success Criteria

- A recruiter can identify the capability model without reading technical mechanisms first.
- The active primary taxonomy is materially smaller and more coherent than the current flat list.
- Every existing decision has valid typed references and conservative evidence/outcome semantics.
- Profiles and the Decision Log work with JavaScript disabled and remain readable at mobile and desktop widths.
- All repository-prescribed validation commands pass.

### Key Decisions

1. **One canonical typed taxonomy file** — use `site/evidence/taxonomy.json` for capabilities, mechanisms, role lenses, controlled vocabularies, and migration mappings. This avoids multiple hand-maintained lists while keeping the model inspectable.
2. **Retired legacy compatibility** — migrate the former flat-tag vocabulary into `taxonomy.json`, then remove the deprecated compatibility manifest after the repository and local-runtime reference audit. Active recruiter UI and validation use only the typed taxonomy and structured Decision Log.
3. **Static-first Profiles page** — turn the existing `/profile-oracle/` compatibility route into a static Profiles evidence view. Keep the route for discoverability, but use plain recruiter language in the page title and navigation.
4. **Human-gated workflow wording** — replace public `Autoresearch` positioning with “workflow improvement loop” and retain a precise Execute → Review → Detect pattern → Human gate → Improve → Validate explanation.

## Planning Contract

### Key Technical Decisions

- Primary capabilities will use the requested 20-item starting set after review; `product-taste` and `evidence-discipline` remain distinct because one evaluates product coherence while the other controls claim strength.
- Secondary capabilities will retain only distinguishable, evidence-supportable concepts needed by the current records and role lenses: `research-judgment`, `research-synthesis`, `automation-judgment`, `ai-systems-fluency`, `solution-design`, `root-cause-analysis`, `reliability`, `experimentation`, `governance-and-risk`, `privacy-and-security-judgment`, `continuous-improvement`, `ownership`, `delivery-management`, `facilitation`, `cross-functional-alignment`, and `executive-communication`.
- Mechanisms will include the current implementation/control concepts where the records explicitly support them, including canary, human-gate, quality-gate, validation, context-engineering, workflow-automation, least-privilege, traceability, recursive-loop, and reusable-infrastructure.
- Decision records will use arrays for `capabilities` and `mechanisms`, plus `evidence: { status, refs }`, `outcome: { status, successDefinition?, leadingIndicators?, measuredOutcome? }`, and `casePotential`. No numeric strength field will be added.
- The static Decision Log may preserve a compact timeline, but capability-first evidence navigation belongs on Profiles. The timeline remains a detail surface, not the primary taxonomy presentation.

### Assumptions

- The four role lenses are useful hypotheses for the current public evidence; the UI will state that a lens is a view over evidence rather than a claim of strength.
- Existing 17 records are the only public decision evidence in scope. Public proof links will point to existing pages and the homepage unless a record already has a more specific allowed page.
- `Verified`, `Planned`, and `Hypothesis` remain current public lifecycle values; the new evidence/outcome enums add precision without upgrading any record.

## Implementation Units

### U1 — Canonical typed taxonomy and migration contract

**Files:** `site/evidence/taxonomy.json`, `release/allowlist.json`, `tests/contracts/decision-log.test.mjs`

Define the versioned taxonomy, 20 primary capabilities, approved secondary capabilities, mechanisms, four role lenses, controlled status vocabularies, and complete former-tag migration mappings. Remove the deprecated compatibility manifest after the reference audit and make contract tests validate duplicate IDs, references, migration coverage, and role-lens references.

**Verification:** contract tests reject duplicate IDs, unknown references, invalid statuses, and deprecated aliases used as active capabilities.

### U7 — Retire the compatibility manifest

**Files:** `site/evidence/decision-log-tags.json`, `release/allowlist.json`, `tests/contracts/decision-log.test.mjs`, `DESIGN.md`, `site/recruiter-agent-guide.md`

Audit repository and local-runtime references. No active site or runtime consumer was found; remaining matches were historical documentation or backups. Remove the compatibility manifest, remove it from the public release allowlist, update active guidance, and retain all former-tag mappings in `taxonomy.json`.

**Verification:** the manifest path is absent, the taxonomy still contains all 49 former-tag mappings, and contract, release, and browser validation pass.

### U2 — Conservative Decision Log migration

**Files:** `site/evidence/decision-log.json`, `tests/contracts/decision-log.test.mjs`

Migrate all 17 records individually. Preserve titles and factual summaries, assign only evidenced 2–4 primary/secondary capabilities, add mechanisms only where the text supports them, and add evidence/outcome/case-potential fields. Keep planned and hypothesis records explicit and do not add measured outcomes.

**Verification:** schema tests validate every reference and outcome field; tests assert all 17 records remain present and newest-first; a fixture proves unsupported outcome claims fail.

### U3 — Static Profiles evidence view

**Files:** `site/profile-oracle/index.html`, `site/assets/css/site.css`, `site/index.html`, `site/proof/recursive-workflow/index.html`, `site/llms.txt`, `site/recruiter-agent-guide.md`, `tests/e2e/site-shell.spec.js`, `tests/e2e/recursive-workflow.spec.js`, `tests/e2e/agent-handoff.spec.js`

Replace the redirect-only Profile Oracle route with a static “Profiles” page. Render each role lens as a short evidence view: capability, evidence available, strongest existing proof, and links to relevant decisions/deep evidence. Add honest evidence-gap language where the current repository has no public proof. Reduce the Decision Log filter surface to primary capabilities and keep mechanisms available as secondary metadata.

**Verification:** raw HTML contains role, capability, proof, and decision paths without JS; e2e tests cover navigation, default readability, relative links, and no score/badge language.

### U4 — Recruiter terminology and workflow cleanup

**Files:** `site/index.html`, `site/proof/recursive-workflow/index.html`, `site/assets/css/site.css`, `site/llms.txt`, `site/recruiter-agent-guide.md`, `site/recruiter-report-brief.md`, `tests/e2e/recursive-workflow.spec.js`, `tests/e2e/recruiter-brief.spec.js`

Replace unnecessary public `Autoresearch` references with “workflow improvement loop” or “human-gated workflow improvement”. Keep the workflow sequence and human approval boundary explicit. Update metadata and tests consistently while preserving any external-source attribution only if it is genuinely needed.

**Verification:** public recruiter-facing files contain no unqualified `Autoresearch`; workflow tests assert the human gate and non-autonomous wording.

### U5 — Static Decision Log rendering and accessibility regression coverage

**Files:** `site/proof/recursive-workflow/index.html`, `site/assets/js/site.js`, `site/assets/css/site.css`, `tests/e2e/accessibility.spec.js`, `tests/e2e/recursive-workflow.spec.js`, `tests/e2e/discoverability-and-conversion.spec.js`

Update the static timeline labels and filters to the new taxonomy without making JS necessary for core content. Preserve the existing restrained stacked-list pattern, visible focus, mobile layout, and optional filter behavior. Ensure the default page emphasizes concrete proof before mechanisms.

**Verification:** desktop/mobile Playwright checks, accessibility checks, raw response checks, and relative-link validation pass.

### U6 — Full CE review and repository validation

**Files:** all changed files; `release/allowlist.json` only if required

Run simplify review when substantive code warrants it, run `ce-code-review`, apply actionable findings, inspect the recruiter-facing result, and run the complete prescribed validation suite. Do not commit or publish automatically; the user did not request a commit or push.

**Verification:** `npm ci`, `npm run test:contracts`, `npm run test:e2e`, `npm run release:validate`, and `git diff --check` pass. Record any unverified recruiter-testing or future evidence gaps in the final report.

### Dependencies and sequence

U1 must precede U2. U2 must precede U3 and U5 so the UI can use stable references. U4 can run alongside U3 but must be complete before the final e2e sweep. U6 is the final gate.

### Evidence gaps to preserve

The current public repository may not establish strong public proof for operational understanding, requirements translation, stakeholder management, change management, adoption and enablement, metrics/KPIs, value realization, customer understanding, implementation, or commercial judgment. Treat these as evidence gaps unless the migrated records support them. Do not convert the gap list into new cases.

### Product Contract preservation

Product Contract unchanged — this plan is derived directly from the user's supplied requirements and the current public checkout research.
