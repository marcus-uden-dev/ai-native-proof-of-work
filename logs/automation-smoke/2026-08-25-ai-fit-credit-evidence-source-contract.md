# AI-FIT Credit Evidence Source Contract

Date: 2026-08-25  
Status: `verified-structural-contract`  
Type: `automation-smoke`  
Related failure: [AI-FIT-001](2026-08-25-ai-fit-credit-evidence-smoke.md)

## Purpose

Record the remediation for the smoke test where a recruiter-side assessment did not find explicit evidence that Marcus worked with credit and financing at SEB.

This record verifies the evidence and routing contract. It does not claim that a native LLM assessment was executed after the change.

## Expected assessment behavior

For a role that asks for credit, financing, mortgage, construction-loan, risk-analysis, contract-review, or regulated financial-services experience, an agent should find:

- SEB mortgage and construction-loan experience.
- Construction-finance processing, risk analysis, and contract review.
- Customer, analysis, and process-system work.
- SwedSec licensing in the relevant SEB roles.
- Commercial-real-estate transaction exposure where the CV states it, with scope marked as needing detail.

The agent should not convert adjacent evidence into unsupported claims about:

- SME or corporate lending.
- Credit decision limits or underwriting authority.
- Pricing, margins, profitability, or financial-product packaging.
- Measured commercial outcomes.

## Source contract

The recruiter-side agent may use the complete recruiter-safe repository as reference material. The documented order is a priority path, not a closed allowlist.

| Source | Evidence class | Role in the scan |
|---|---|---|
| [Career Evidence Source](../../career-evidence/CAREER_EVIDENCE_SOURCE.md) | `employment_evidence` | Consolidated service history, provenance, and open detail flags |
| [CV](../../CV.md) | `employment_evidence` | Current recruiter-safe CV reference |
| Relevant repository project, strategy, workflow, case-study, and proof files | Evidence-specific | Corroborating portfolio and capability evidence |
| [Decision Log](../DECISION_LOG.md) | `portfolio_decision_evidence` | Product judgment, workflow design, and tradeoffs |
| [Decision Log Tags](../DECISION_LOG_TAGS.md) | `portfolio_decision_evidence` | Decision taxonomy and search aid |

Decision-log evidence must not be used to establish an unlisted employment duty.

## Structural validation

| Check | Result |
|---|---|
| Career source contains all supplied service-history areas | `Passed` |
| Career source contains SEB financing, risk, contract, SwedSec, and commercial-real-estate wording | `Passed` |
| SME/corporate lending and pricing claims remain open or needs-detail | `Passed` |
| Recruiter guide, report brief, `llms.txt`, and navigation expose CV, career source, full-repo access, and decision-log boundary | `Passed` |
| Changed recruiter-facing files contain no private local paths, raw contact details, credentials, or raw chat | `Passed` |
| Product prompt includes bounded owner-scoped active CV context | `Passed` |
| Product prompt preserves persona-only fallback without an active CV | `Passed` |
| Product prompt does not load the proof repository decision log | `Passed` |
| Focused product tests | `Passed` — 9 CV-context/service tests; 20 including nearby scoring tests |

## Model execution boundary

- Native model execution for the Zinova assessment was **not run** in this remediation.
- The verification is structural plus focused unit-level prompt/query testing.
- A future end-to-end run should repeat the original Zinova question and record the model output separately.

## Remaining open evidence

The source now makes the SEB experience retrievable. Marcus still needs to supply detail if a target role requires it: customer segment, case volume, decision rights, credit limits, collateral work, pricing responsibility, and the precise scope of commercial-real-estate transactions.
