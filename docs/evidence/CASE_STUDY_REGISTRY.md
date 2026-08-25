# Canonical Case Study Registry

Last updated: 2026-08-26
Status: Active / Evidence-bounded

## Purpose

This is the canonical editorial registry for recruiter-facing case studies.
It separates default Profiles proof, evidence-backfill candidates, supporting
operating/trust proof, historical experience, and mechanisms that must not
become standalone cases.

Narrative pages in `case-studies/` provide readable detail. The
machine-readable `repository-evidence-index.json` is a retrieval projection.

## Evidence rules

1. Use `Verified` only when the repository or an approved source supports the claim.
2. Use `Evidence backfill` when scope, authority, public clearance, adoption, or outcomes need confirmation.
3. Use `Not measured` when no outcome metric is available. Never infer adoption, revenue, impact, or market success.
4. Keep employment evidence separate from portfolio decision evidence.
5. Do not expose private paths, raw sessions, confidential employer details, or sensitive personal data.
6. Mechanisms may support a case, but are not standalone default Profiles cases.

## Public hierarchy

| Tier | Cases | Default treatment |
|---|---|---|
| Lead proof | CASE-001 Job-agent | Default first-level attention |
| Strong product / experience proof | CASE-002 PKM, CASE-003 Household Budget, CASE-005 ELSA, CASE-006 Lendify, CASE-011 PostNord | Promote according to status below |
| Role-specific supporting depth | CASE-007 IoT Fitness, CASE-008 ChefNextDoor | Retrieve for relevant roles |
| Agent database / historical experience | CASE-009 Murphy Bed, CASE-010 Tierps Tryckeri, CASE-012 SEB, CASE-013 Ramshöjden | Keep searchable; promote only when relevant and sufficiently evidenced |
| Operating and trust proof | CASE-004 Human-gated Workflow Improvement, CASE-014 Public Evidence and Release System | Supporting evidence beneath stronger cases |

## Case record contract

Every promoted record should answer:

```text
Problem → Evidence → Insight → Options → Trade-off → Decision → Execution → Result / Next Test
```

Each record carries a stable ID, portfolio/public/evidence/outcome status,
role lenses, capabilities, supporting mechanisms, source references, privacy
boundary, and one concrete next evidence test.

## Canonical records

### CASE-001 — Job-agent

- **Title:** Job-agent — Career decision-support workflow
- **Portfolio status:** Lead proof
- **Public status:** Public recruiter-safe proof available
- **Evidence status:** Public evidence, internal verified evidence, and synthetic demo
- **Outcome status:** Not measured
- **Role lenses:** AI Product; Product Operations; AI Implementation; AI Transformation
- **Capabilities:** Product judgment; product discovery; problem framing; requirements translation; execution; quality judgment; technical fluency; evidence discipline
- **Decision:** Build a reviewed career workflow connecting discovery, research, application support, preparation, and feedback while keeping provenance and human decisions visible.
- **Result boundary:** Current proof demonstrates the decision model and interface, not market adoption or job-search outcomes.
- **Next evidence test:** Moderated review of whether the research flow improves decision clarity and trust.
- **Sources:** `case-studies/JOB_AGENT_CASE_STUDY.md`; `case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md`; `PROJECT_STATUS.md`

### CASE-002 — Personal Knowledge Management

- **Title:** Personal Knowledge Management (PKM) — Turning fragmented information into usable knowledge
- **Portfolio status:** Supporting product proof
- **Public status:** Partial / summarized evidence
- **Evidence status:** Internal verified summary; public promotion requires release review
- **Outcome status:** Not measured
- **Role lenses:** AI Product; Product Operations; AI Enablement
- **Capabilities:** Product judgment; problem framing; systems thinking; prioritization; product discovery
- **Decision:** Treat PKM as a workflow from capture to structure to retrieval to review to learning/action, not as a note repository.
- **Result boundary:** Product architecture evidence exists; sustained daily-use value and adoption are not validated.
- **Next evidence test:** Validate one complete capture → retrieve → review → use journey.
- **Sources:** `case-studies/PKM_CASE_STUDY.md`; `strategy/pkm/README.md`

### CASE-003 — Household Budget

- **Title:** Household Budget — Designing a trust-sensitive shared financial workflow
- **Portfolio status:** Supporting product proof
- **Public status:** Internal verified summary; selected public proof requires review
- **Evidence status:** Internal verified summary
- **Outcome status:** Not measured
- **Role lenses:** AI Product; Product Operations; Business Analysis
- **Capabilities:** Problem framing; systems thinking; product judgment; requirements translation; privacy/security; reliability
- **Decision:** Model the household as a first-class domain with explicit roles, ownership, and review workflows.
- **Result boundary:** Provides domain-modelling evidence; no external adoption or financial outcome is claimed.
- **Next evidence test:** Validate household ownership, imported transactions, and shared-account workflows end to end.
- **Sources:** `case-studies/HOUSEHOLD_BUDGET_CASE_STUDY.md`; `strategy/household-budget-app/README.md`

### CASE-004 — Human-gated Workflow Improvement

- **Title:** Human-gated workflow improvement — Turning recurring friction into reusable operating infrastructure
- **Portfolio status:** Supporting operating proof
- **Public status:** Public supporting proof exists
- **Evidence status:** Public evidence
- **Outcome status:** Operational improvement demonstrated; business outcome not measured
- **Role lenses:** AI Transformation / Enablement; Product Operations
- **Capabilities:** Operating-model design; systems thinking; continuous improvement; automation judgment
- **Decision:** Use a reviewed loop from execution to review to pattern detection to human approval to reusable improvement.
- **Result boundary:** Operating infrastructure around product work, not a standalone flagship product.
- **Next evidence test:** Show one before/after workflow improvement with a verification artifact.
- **Sources:** `case-studies/WORKFLOW_IMPLEMENTATION_CASES.md`; `workflows/REVIEW_AND_PROMOTION_LOOP.md`

### CASE-005 — ELSA National Digitalisation Rollout

- **Portfolio status:** High-priority evidence-backfill case
- **Public status:** Profiles after lightweight evidence backfill
- **Evidence status:** Employment evidence verified; adoption, scale, and outcome detail need confirmation
- **Outcome status:** Not measured
- **Role lenses:** Product Operations; AI Transformation & Enablement; Implementation
- **Capabilities:** Change management; adoption and enablement; operating-model design; stakeholder management; implementation
- **Decision boundary:** Describe rollout, taxonomy, training, and coordination only to the level supported by the career source.
- **Next evidence test:** Confirm user scope, adoption signal, decision authority, and lasting result.
- **Sources:** `career-evidence/CAREER_EVIDENCE_SOURCE.md`; `CV.md`

### CASE-006 — Lendify Customer Research and Retention

- **Portfolio status:** High-priority evidence-backfill case
- **Public status:** Profiles after evidence backfill
- **Evidence status:** Employment evidence verified; sample, findings, implementation, and outcome detail need confirmation
- **Outcome status:** Not measured
- **Role lenses:** Product Discovery; Customer Understanding; Product Operations
- **Capabilities:** Customer understanding; research judgment; research synthesis; customer journey; commercial judgment
- **Decision boundary:** Present research and strategy reasoning without claiming a measured retention effect.
- **Next evidence test:** Confirm sample, key findings, recommendation ownership, and implementation status.
- **Sources:** `career-evidence/CAREER_EVIDENCE_SOURCE.md`; `CV.md`

### CASE-007 — IoT Fitness Product

- **Portfolio status:** Evidence-backfill case
- **Public status:** Role-specific supporting case
- **Evidence status:** Described activities verified; launch, adoption, and commercial results need detail
- **Outcome status:** Not measured
- **Role lenses:** AI Product; Product Management; Product Discovery
- **Capabilities:** Product discovery; requirements translation; onboarding; adoption; product judgment; business-model design
- **Next evidence test:** Confirm product name, technical scope, launch status, user scale, and result.
- **Sources:** `career-evidence/CAREER_EVIDENCE_SOURCE.md`; `CV.md`

### CASE-008 — ChefNextDoor Customer Journey

- **Portfolio status:** Evidence-backfill case
- **Public status:** Role-specific case after source review
- **Evidence status:** Employment evidence verified; mandate, deliverables, and adopted outcomes need detail
- **Outcome status:** Not measured
- **Role lenses:** Customer Understanding; Product Discovery; Business Analysis
- **Capabilities:** Customer journey; problem framing; research synthesis; prioritization; commercial judgment
- **Next evidence test:** Confirm mandate, decision rights, deliverables, and implementation.
- **Sources:** `career-evidence/CAREER_EVIDENCE_SOURCE.md`; `CV.md`

### CASE-009 — Murphy Bed Product and Business Launch

- **Portfolio status:** Agent database / historical experience
- **Public status:** Promote only when commercially relevant and recruiter-safe
- **Evidence status:** Employment evidence verified; scale, revenue, and launch results need detail
- **Outcome status:** Not measured
- **Role lenses:** Commercial Product; Business Development; Operations
- **Capabilities:** Commercial judgment; execution; requirements; logistics; channel design; ownership
- **Next evidence test:** Confirm team, supplier scope, launch scale, unit economics, and market outcome.
- **Sources:** `career-evidence/CAREER_EVIDENCE_SOURCE.md`; `CV.md`

### CASE-010 — Tierps Tryckeri Digitalisation

- **Portfolio status:** Agent database / historical experience
- **Public status:** Promote if evidence quality is sufficient
- **Evidence status:** Employment evidence verified; implementation status and users need detail
- **Outcome status:** Not measured
- **Role lenses:** Digital Transformation; Product Operations; Business Development
- **Capabilities:** Digital transformation; process improvement; stakeholder management; solution design; commercial thinking
- **Next evidence test:** Confirm digitalisation scope, system status, users, ownership, and result.
- **Sources:** `career-evidence/CAREER_EVIDENCE_SOURCE.md`; `CV.md`

### CASE-011 — PostNord Frontline Digitalisation

- **Portfolio status:** Highest-priority internal case candidate
- **Public status:** Profiles after recruiter-safe clearance
- **Evidence status:** Employment evidence verified; internal scope, authority, and outcome need detail
- **Outcome status:** Not measured
- **Role lenses:** Product Operations; AI Transformation; Service Design; Implementation
- **Capabilities:** Operational understanding; problem framing; requirements translation; product judgment; execution; stakeholder management
- **Decision boundary:** Generalise internal details and state only verified responsibilities and improvement work.
- **Next evidence test:** Confirm what may be public, the intervention, stakeholders, and any measurable result.
- **Sources:** `career-evidence/CAREER_EVIDENCE_SOURCE.md`; `CV.md`

### CASE-012 — SEB Construction Finance and Risk

- **Portfolio status:** Agent database / experience proof
- **Public status:** Recruiter-safe employment evidence; not a default product case
- **Evidence status:** Employment evidence verified; customer segment, authority, case scope, and outcomes need detail
- **Outcome status:** Not measured
- **Role lenses:** Business Analysis; Risk and Controls; Operations
- **Capabilities:** Regulated-process judgment; risk analysis; contract review; customer handling; process improvement
- **Next evidence test:** Confirm decision rights, case volume, customer segment, and risk/legal/compliance collaboration.
- **Sources:** `career-evidence/CAREER_EVIDENCE_SOURCE.md`; `CV.md`

### CASE-013 — Ramshöjden Quality and Operations Setup

- **Portfolio status:** Agent database / historical experience
- **Public status:** Role-specific evidence until scope is backfilled
- **Evidence status:** Employment evidence verified; scale, budget, regulatory scope, and result need detail
- **Outcome status:** Not measured
- **Role lenses:** Operations; Entrepreneurship; Business Development
- **Capabilities:** Ownership; quality management; procurement; planning; operational judgment
- **Next evidence test:** Confirm team, project scale, budget, regulatory context, and result.
- **Sources:** `career-evidence/CAREER_EVIDENCE_SOURCE.md`; `CV.md`

### CASE-014 — Public Evidence and Release System

- **Title:** Public evidence and release system — Publishing bounded proof safely
- **Portfolio status:** Supporting trust proof
- **Public status:** Supporting evidence only
- **Evidence status:** Public evidence and release controls
- **Outcome status:** Process controls demonstrated; business outcome not measured
- **Role lenses:** AI Governance; Product Operations; AI Transformation
- **Capabilities:** Evidence discipline; governance and risk; privacy/security judgment; quality judgment
- **Decision:** Use public/private boundaries, allowlisted release inputs, evidence classes, and validation gates.
- **Result boundary:** Supports stronger cases; it is not a flagship product case.
- **Next evidence test:** Validate the registry and public release manifest during repository consolidation.
- **Sources:** `SOURCE_MAP.md`; `SHARING_CHECKLIST.md`; `docs/plans/2026-08-25-repository-consolidation-and-source-of-truth-plan.md`

## Mechanism boundary

Context engineering, custom skills, prompt libraries, model routing, memory
hygiene, quality gates, least privilege, human-in-the-loop controls, agent
governance files, templates, naming conventions, checkpoints, handoffs, weekly
compiler routines, and individual scheduled automations remain supporting
evidence. Link them from stronger cases when they explain execution or validation.

## Promotion gate

- Public name and summary are recruiter-safe.
- Problem and decision are clear without private context.
- Every capability claim has case-level evidence.
- Employment and portfolio decision evidence remain separate.
- Outcomes are labelled `Measured`, `Not measured`, or `Open Question`.
- Sensitive details are removed or generalised.
- The next evidence test is concrete.
- Release manifests and links are updated together.

## CE-suite integration

| CE stage | Registry responsibility |
|---|---|
| `ce-brainstorm` | Decide whether a candidate should become a case and define scope |
| `ce-plan` | Plan evidence backfill, redaction, promotion, and projection updates |
| `ce-work` | Apply one bounded registry/case/navigation change and verify links |
| `ce-doc-review` | Review claims, hierarchy, readability, and evidence boundaries |
| `ce-proof` | Share a draft for human review; the local registry stays canonical |
| `ce-compound` | Capture reusable workflow learning in `docs/solutions/`; do not store case records there |
| `ce-promote` | Draft public copy only from verified changes |

The CE plugin remains unchanged. This repository owns the case taxonomy and its evidence boundaries.
