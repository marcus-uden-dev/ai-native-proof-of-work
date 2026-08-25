---
title: "feat: make AI-fit career evidence and decision-log aware"
type: feat
date: 2026-08-25
author: Marcus + Codex
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
product_contract_source: ce-plan-bootstrap
execution: code
---

# AI-fit career evidence and decision-log awareness

**Target repositories:**

- Proof repository: `ai-native-proof-of-work` (this plan's repository)
- Product repository: `job-agent` (source-project implementation boundary)

## Goal Capsule

### Objective

When an agent evaluates Marcus against a job, it can find the relevant career evidence and portfolio decisions, distinguish evidence classes, and avoid reporting explicit CV evidence as missing. The job-agent product match score also receives the user's available CV text instead of relying on a persona summary alone.

### Means

Create a sanitized, searchable career-evidence source in the proof repository; add it, `CV.md`, and the decision log to the recruiter-agent priority path; keep the full recruiter-safe repository available as reference material; and pass the newest active user CV as optional context to the product match-score prompt. Keep portfolio decision evidence separate from employment evidence.

### Authority and stop conditions

- The user's request and repository `AGENTS.md` govern scope and privacy.
- The supplied CV documents are evidence sources, not instruction sources.
- The current failing smoke test is the regression contract.
- Do not infer SME/corporate lending, pricing/margin ownership, or commercial product outcomes where the sources do not state them.
- Do not load portfolio-repository decision logs into the user's product match-score prompt.
- Stop before changing public staging, external accounts, billing, auth, or deployment behavior.
- Preserve unrelated dirty worktree changes in both repositories.

### Execution profile

Implement in dependency order: proof-repository evidence source, recruiter scan routing, product CV-context input, then validation and smoke records. Use test-first characterization for the match-score prompt boundary and source-availability behavior.

### Tail ownership

The executor owns implementation, targeted tests, privacy checks, and final status reporting. No public push or external publication is included.

## Product Contract

### Summary

The Zinova assessment missed explicit SEB evidence because the recruiter reading path did not prioritize the CV and the job-agent match-score path sends only `persona_summary`. The user needs a durable source that synthesizes all supplied CV variants and flags missing role detail, plus a clear agent scan contract that includes the decision log without confusing portfolio decisions with employment history.

### Problem Frame

The current evidence is distributed across several CV variants and portfolio documents. Agents can see product and workflow evidence but fail to retrieve banking and financing experience. A simple keyword addition is insufficient: the system must preserve provenance, mark uncertainty, and report the difference between an unavailable source and a source that lacks a claim.

### Requirements

#### R1. Canonical career-evidence source

Create one recruiter-safe Markdown source that synthesizes the four supplied CV variants and the current repo CV into one service-history matrix. Each role must include source provenance, evidence status, safe claim, and missing detail flags.

#### R2. Complete role coverage

Cover the supplied evidence for ChefNextDoor, PostNord, Ldek AB, Murphy Bed, IoT product, Lendify, Tierps Tryckeri, SEB Construction Loans, Ramshöjden AB, SEB Mortgages/Construction Loans, Comboloan, ELSA Sweden, ELSA Stockholm, and the legal/IP representative work.

#### R3. General evidence boundaries

Mark bank, financing, mortgage/construction-loan, risk-analysis, contract-review, regulated-process, commercial-real-estate-exposure, and SwedSec evidence as verified where explicitly stated. Keep unstated customer scope, decision rights, commercial responsibility, and measurable outcomes as open or needs-detail unless explicitly supported. Any target-role-specific interpretation belongs in the relevant assessment or smoke-test record, not in the general career source.

#### R4. Decision-log scan source

Make `logs/DECISION_LOG.md` and `logs/DECISION_LOG_TAGS.md` explicit in the recruiter-agent scan path. Treat them as `portfolio_decision_evidence`, separate from employment evidence. Decision-log entries may support product judgment, workflow design, tradeoffs, and operating methods but may not upgrade a missing employment claim.

#### R5. Full repository reference with prioritized CV routing

Keep the complete recruiter-safe repository available as reference material. Add `CV.md` and the career-evidence source to the recruiter report brief, recruiter agent guide, and machine-readable priority path. The scan contract must state that the order is a retrieval aid, not an allowlist, and must preserve the evidence-class boundary.

#### R6. Product match-score CV context

The job-agent match-score path must pass optional user CV text to the model. If no active CV is available, it must preserve the existing persona-only behavior and make the missing-CV condition observable to the prompt/test boundary rather than silently claiming the CV was searched.

#### R7. Product source boundary

The job-agent product must not read the proof repository's portfolio decision log as user employment data. Its match prompt may use user-owned persona and CV data only.

#### R8. Regression proof

Add structural and product-level verification showing that the Zinova/SEB case retrieves bank and financing evidence, while keeping SME/corporate-lending and pricing claims open. Preserve the original failing smoke record and add a dated remediation record for the new source contract.

#### R9. Privacy and portability

Recruiter-facing artifacts must contain no private Drive paths, personal phone numbers, raw personal email addresses, credentials, raw chat logs, or unnecessary sensitive data. All plan and code paths must remain portable across machines.

### Success Criteria

- A recruiter-side agent can reach `CV.md`, `career-evidence/CAREER_EVIDENCE_SOURCE.md`, `logs/DECISION_LOG.md`, and `logs/DECISION_LOG_TAGS.md` from its documented reading path.
- The synthesized source contains the SEB evidence that failed in `AI-FIT-001` and explicit flags for missing duties and scope.
- The product match-score prompt includes CV context when an active CV exists and retains persona-only fallback when none exists.
- The source classes are visible in the prompt/documentation contract: employment evidence, user CV evidence, persona evidence, and portfolio decision evidence.
- The post-change structural smoke test passes without claiming a full model execution.

### Scope Boundaries

#### In scope

- New career-evidence source and usage guide in the proof repository.
- Recruiter-facing reading-path and source-priority updates.
- Decision-log discoverability and evidence-class labeling.
- Optional CV context in the job-agent match-score path and targeted tests.
- Smoke-test and privacy documentation.

#### Deferred to follow-up work

- User-facing selection of a canonical CV variant for match scoring.
- A database field for an explicitly selected/default CV.
- Automated parsing of external Drive CV files.
- LLM-generated evidence citations beyond the prompt contract.
- Public-site publication or GitHub-profile changes.
- Adding unverified duties or outcomes to the CV.

#### Outside this product's identity

- Treating the proof repository's portfolio decision log as private user profile data inside job-agent.
- Rewriting employment history based on inferred duties.
- Claims of market outcomes, revenue, conversion, or pricing impact without evidence.

### Outstanding Questions

These are deferred and non-blocking for this implementation:

- Which CV variant should become the user-facing application master? The implementation uses the newest active product CV as the current fallback, preserving future explicit selection as follow-up work.
- Which missing SEB details should Marcus fill in first? The source flags them without inventing answers.
- Should a future recruiter-facing source split into public-safe and private-detail layers? The current source stays recruiter-safe and excludes unnecessary contact data.

### Sources

- Existing requirements and evidence boundary: `plans/2026-08-25-ai-fit-cv-evidence-source/plan-for-plan.md`
- Regression case: `logs/automation-smoke/2026-08-25-ai-fit-credit-evidence-smoke.md`
- Current CV: `CV.md`
- Decision trail: `logs/DECISION_LOG.md`, `logs/DECISION_LOG_TAGS.md`
- Recruiter guidance: `docs/reports/recruiter-llm-report-brief.md`, `RECRUITER_AGENT_GUIDE.md`, `llms.txt`, `NAVIGATION.md`
- Product match path: `backend/app/jobs/service.py`, `backend/app/jobs/router.py`, `backend/app/cv/models.py`, `backend/app/cv/scoring.py`

## Planning Contract

### Key Technical Decisions

#### KTD1. Keep the canonical synthesized source in the proof repository

The proof repository is the recruiter evidence layer and can hold a sanitized cross-CV source. The product repository should not depend on this repo's local filesystem or private source documents.

**Governs:** R1, R5, R9.

#### KTD2. Separate evidence classes

Use `employment_evidence` for CV/service history, `user_cv_evidence` for the product's selected or fallback CV, `persona_evidence` for profile data, and `portfolio_decision_evidence` for the proof repository's decision log. Do not merge these classes in either documentation or prompts.

**Governs:** R3, R4, R6, R7.

#### KTD3. Use newest active CV as the product fallback

Until the product has an explicit selected-CV field, use the newest active `CVVariant` for match-score context. If no active CV exists, pass no CV context and preserve persona-only scoring. This follows the existing newest-active fallback pattern used by proof-of-work generation and keeps selection work deferred.

**Governs:** R6, R7.

#### KTD4. Preserve uncertainty instead of optimizing the score narrative

The career source and smoke test must report verified SEB financing evidence while leaving SME/corporate-lending, pricing, margin, and commercial-outcome claims open where the sources are silent.

**Governs:** R3, R8, R9.

#### KTD5. Keep the failing regression record and add a new remediation record

The original `AI-FIT-001` record remains historical evidence of the defect. A new source-contract smoke record reports structural validation and explicitly states that native model execution was not run.

**Governs:** R8.

### High-Level Technical Design

```mermaid
flowchart LR
    A[Four supplied CV variants] --> B[Sanitized career evidence source]
    C[Current CV.md] --> B
    D[Decision log + tag taxonomy] --> E[Portfolio decision evidence]
    B --> F[Recruiter agent reading path]
    E --> F
    F --> G[Role-fit assessment with separated evidence classes]

    H[User persona] --> I[Product match-score context]
    J[Newest active CVVariant] --> I
    K[No active CV] --> L[Persona-only fallback]
    I --> M[Job-agent match prompt]
    L --> M
    E -. never loaded into product .-> M
```

### System-Wide Impact

- Recruiter agents will receive a richer, more explicit priority path while retaining access to all recruiter-safe repository reference material; they must handle two evidence classes.
- The proof repository gains a new recruiter-safe evidence artifact and new cross-references.
- Job-agent's initial/refresh match score will receive more candidate context, with a modest prompt-size and privacy impact.
- Existing persona-only users remain supported.
- The two repositories remain separate; no public staging or external publication is changed.

### Risks & Dependencies

| Risk / dependency | Handling |
|---|---|
| CV source contains personal contact data | Synthesize only career evidence; redact contact details and source paths. |
| New source is not added to every recruiter reading path | Update report brief, recruiter guide, machine-readable path, and navigation together; run targeted link/orphan checks. |
| Newest active CV is not the best application variant | Keep this as an explicit fallback and defer selected-CV UX/data-model work. |
| Prompt grows too large | Bound CV context using the existing text truncation convention and test that CV context is present without sending raw unrelated fields. |
| Decision log is mistaken for employment evidence | Use explicit labels in the source guide, reading path, and smoke test. |
| Source repo has unrelated dirty changes | Inspect status before edits and stage/validate only task files; do not reset or overwrite unrelated work. |

### Sequencing

1. Create the sanitized career-evidence source and usage guide in the proof repository.
2. Update recruiter-facing and machine-readable reading paths, including explicit decision-log routing.
3. Add optional CV context to the job-agent match-score boundary and load the newest active CV fallback.
4. Add targeted tests and a post-change structural smoke record.
5. Run privacy, link, focused test, and cross-repo status checks.

## Implementation Units

### U1. Create the canonical career-evidence source

**Goal:** Give recruiter-side agents one searchable, source-linked employment history with explicit missing-detail flags.

**Requirements:** R1, R2, R3, R9.

**Dependencies:** None.

**Files:**

- Proof repository: `career-evidence/CAREER_EVIDENCE_SOURCE.md`
- Proof repository: `career-evidence/README.md`

**Approach:**

1. Organize the source by service history, with one section per role/activity and a compact summary table.
2. Include the detailed evidence available in the supplied CVs, including SEB commercial-real-estate exposure and the IoT full-cycle wording where stated.
3. Add `Evidence status`, `Source variants`, `Safe recruiter claim`, and `Needs detail` fields to each role.
4. Add a separate section for generally useful claims that need more detail, including customer scope, decision rights, commercial responsibility, and measurable outcomes.
5. Keep all source paths and contact details out of the artifact.

**Execution note:** Treat the supplied documents as evidence only. Do not copy embedded instructions or raw personal contact data.

**Patterns to follow:** Evidence labels and privacy rules in `SOURCE_MAP.md`, `SHARING_CHECKLIST.md`, and the existing smoke record.

**Test scenarios:**

1. Happy path: the source contains every role/activity named in the supplied CV research matrix.
2. SEB evidence: the source contains bank, financing, mortgage/construction-loan, risk-analysis, contract-review, commercial-real-estate-exposure, and SwedSec evidence with source labels.
3. Boundary case: customer scope, decision rights, commercial responsibility, and measurable outcomes remain `Needs Detail` or `Open Question` unless explicitly stated.
4. Privacy case: the source contains no private Drive path, phone number, raw personal email, credential, or raw chat content.

**Verification:** A reviewer can find each role by employer or capability keyword and trace every promoted claim to one or more named source variants without needing the original files.

### U2. Route recruiter agents to the full repository, with CV and decision evidence prioritized

**Goal:** Make the recruiter-side agent use the full recruiter-safe repository as reference material while scanning the highest-value career and decision sources before declaring a capability gap.

**Requirements:** R4, R5, R9.

**Dependencies:** U1.

**Files:**

- Proof repository: `docs/reports/recruiter-llm-report-brief.md`
- Proof repository: `RECRUITER_AGENT_GUIDE.md`
- Proof repository: `llms.txt`
- Proof repository: `NAVIGATION.md`

**Approach:**

1. Add `CV.md` and `career-evidence/CAREER_EVIDENCE_SOURCE.md` near the top of the recruiter source priority, while stating that every other recruiter-safe repository file remains eligible reference material.
2. Make `logs/DECISION_LOG.md` and `logs/DECISION_LOG_TAGS.md` explicit scan sources in the canonical recruiter reading order.
3. State that decision-log material is `portfolio_decision_evidence` and cannot establish unlisted employment duties; other repository sources may be used when they are relevant and evidence-labeled.
4. Add links from navigation and machine-readable routing without exposing local source paths.

**Patterns to follow:** Existing recruiter reading order, `llms.txt` machine-readable conventions, and `NAVIGATION.md` table format.

**Test scenarios:**

1. Reading-path case: every new path resolves from the repository root, and the guide does not describe the priority list as a closed source allowlist.
2. Ordering case: an agent encounters CV and career evidence before the missing-evidence interpretation section.
3. Decision boundary case: the guide explicitly separates employment evidence from portfolio decision evidence.
4. Privacy case: changed recruiter-facing files contain no private local path or raw contact detail.

**Verification:** Targeted Markdown-link and orphan-document checks pass, and a cold reader can identify the source order without reading internal plans.

### U3. Pass user CV context into job-agent match scoring

**Goal:** Ensure the product's match-score model can use the user's CV when an active CV exists, without coupling the product to the proof repository.

**Requirements:** R6, R7.

**Dependencies:** None for product code; coordinate with U4 for shared regression coverage.

**Files:**

- Product repository: `backend/app/jobs/service.py`
- Product repository: `backend/app/jobs/router.py`
- Product repository: `backend/tests/test_jobs_service_metering.py`
- Product repository: `backend/tests/test_jobs_cv_context.py`

**Approach:**

1. Extend the match-score context boundary with optional CV text while preserving the existing persona summary and integer-score output contract.
2. In the user-job scoring path, load the newest active `CVVariant` using the existing owner and recency patterns.
3. Flatten the CV summary and structured sections using the existing CV text conventions; bound the context before it reaches the model.
4. If no active CV exists, omit CV context and preserve persona-only behavior.
5. Keep portfolio decision logs and proof-repository files outside the product prompt.

**Execution note:** Start with characterization coverage for the existing prompt and metering call, then add the CV-context branch.

**Patterns to follow:** `backend/app/proof_of_work/router.py` newest-active CV fallback, `backend/app/jobs/router.py` owner-scoped CV reads, and `backend/app/cv/scoring.py` CV flattening.

**Test scenarios:**

1. CV-present case: a newest active CV containing a distinctive financing phrase is included in the match-score prompt sent to the LLM adapter.
2. CV-absent case: no active CV produces a valid persona-only prompt and does not raise an exception.
3. Ownership case: a CV belonging to another user is never loaded into the prompt.
4. Empty-content case: an active CV with empty summary and sections does not add misleading empty evidence.
5. Boundary case: CV text is bounded and does not include proof-repository decision-log content.
6. Existing contract case: the score remains parseable as a numeric value and the existing task metering/user ID behavior is unchanged.

**Verification:** Focused backend tests prove prompt inclusion, fallback, ownership, bounding, and unchanged numeric/metering behavior.

### U4. Add post-change smoke and evidence-boundary validation

**Goal:** Prove the source contract is fixed and preserve a clear distinction between structural validation and full model execution.

**Requirements:** R3, R4, R8, R9.

**Dependencies:** U1, U2, U3.

**Files:**

- Proof repository: `logs/automation-smoke/2026-08-25-ai-fit-credit-evidence-source-contract.md`
- Proof repository: `logs/automation-smoke/2026-08-25-ai-fit-credit-evidence-smoke.md` (only if a concise remediation pointer is needed)
- Product repository: `backend/tests/test_jobs_cv_context.py`

**Approach:**

1. Validate the new career-evidence file, recruiter links, decision-log labels, and privacy boundary.
2. Run the focused product tests for CV context and the existing match-score service behavior.
3. Record the Zinova expected result: bank/financing evidence is found; SME/corporate lending and pricing remain open where not stated.
4. State explicitly whether a native model execution occurred. Do not label structural validation as a full AI run.

**Test scenarios:**

1. Structural smoke case: all required evidence files and links resolve and the source contains the expected SEB phrases.
2. Evidence classification case: the smoke fixture rejects a result that says bank experience is unsupported while accepting an open-question label for SME lending.
3. Privacy boundary case: no private local path or contact detail appears in recruiter-facing outputs.
4. Product regression case: focused CV-context tests and existing match-score tests pass.

**Verification:** A dated run record reports counts/checks, model-execution limitation, changed repositories, and remaining open evidence questions.

## Verification Contract

### Proof repository

- Markdown formatting and whitespace checks pass for all changed files.
- Targeted Markdown links for `career-evidence/`, recruiter guidance, navigation, and logs resolve.
- A repository privacy scan finds no private local paths, raw contact details, secrets, or raw chat leakage in recruiter-facing files.
- The new source contains all required employers/activities and the required SEB evidence.
- The structural smoke record states whether model execution occurred and does not overclaim.

### Product repository

- Focused tests for match-score service context and job-router CV loading pass.
- Existing match-score metering tests pass.
- The product prompt contains user CV context only when an owner-scoped active CV is available.
- The no-CV fallback remains valid and numeric scoring behavior is unchanged.
- No product test or source imports the proof repository or its decision log.

### Cross-repository boundary

- Unrelated dirty changes remain untouched.
- No public staging repository, GitHub profile, external account, deployment, or push is modified.
- Final status reports both repositories separately.

## Definition of Done

- [x] `career-evidence/CAREER_EVIDENCE_SOURCE.md` exists and synthesizes all supplied CV service history with provenance and missing-detail flags.
- [x] `career-evidence/README.md` documents the evidence classes and agent usage.
- [x] Recruiter report brief, recruiter agent guide, `llms.txt`, and navigation expose the CV, career source, and decision log in a clear scan path while keeping the full recruiter-safe repository available.
- [x] Product match scoring receives bounded, owner-scoped CV context when available and preserves persona-only fallback when unavailable.
- [x] Decision-log content is never treated as product employment data.
- [x] `AI-FIT-001` remediation is recorded without overstating model execution.
- [x] Focused tests and repository privacy/link checks pass.
- [x] Unrelated user changes are preserved and no external publication occurs.
- [x] No abandoned experimental files or dead-end generated artifacts were created by this implementation.

## Deferred to Follow-Up Work

- Explicit user-selected CV ID in the match-score request.
- Filling missing SEB duties, customer segments, decision rights, volumes, and outcomes.
- Automated Drive ingestion or synchronization.
- Full model-evaluation harness with golden recruiter reports.
- Public website or GitHub profile publication.
