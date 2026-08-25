---
created: 2026-08-25
author: Marcus + Codex
source_tool: ChatGPT inkognito log plus local repository inspection
source: user-provided AI-fit smoke-test case
type: ops-run
status: failed-as-expected
review_status: reviewed
tags:
  - ai-fit
  - smoke-test
  - cv-retrieval
  - evidence-boundary
  - credit-experience
---

# AI-FIT-001 — Credit experience must be found in the CV

## Result

**FAIL — regression reproduced.**

The pasted ChatGPT inkognito assessment marked bank, credit, and financing experience as unsupported. The repository inspection below shows that the CV contains clear evidence for bank work, mortgage/construction finance, risk analysis, and contract review. The test therefore identifies a source-retrieval or input-contract gap in the AI-fit flow.

This test does **not** require the model to claim direct SME corporate lending. The CV does not use that exact phrase. It must, however, distinguish the supported financial-services evidence from evidence that remains open.

Remediation tracking: [AI-FIT credit evidence source contract](2026-08-25-ai-fit-credit-evidence-source-contract.md).

## Test case

| Field | Value |
|---|---|
| Test ID | `AI-FIT-001` |
| Job | Product Manager, Zinova |
| Critical job signals | SME financing, loans, credits, bank/finance/fintech, credit/risk/compliance, pricing and margin |
| Candidate source | Root `CV.md` |
| Observed failure | Assessment says bank, credit, corporate lending, and financing experience are not evidenced |
| Expected behavior | Read the CV before declaring those evidence areas unsupported |
| Boundary | Do not infer SME/corporate lending, pricing, margin ownership, or full product ownership unless the source states them |

## Evidence that the smoke test must retrieve

The CV contains the following relevant claims:

- **SEB Construction Loans, Jun 2016–Dec 2017:** processed construction finance with risk analysis and contract review; held a SwedSec licence.
- **SEB Mortgages and Construction Loans, Oct 2007–Sep 2014:** managed mortgage and construction-finance cases, including risk and contract review; improved customer-handling processes and parts of the risk-management system; held a SwedSec licence.
- **Comboloan, Jan 2007–Oct 2007:** managed customer relationships and supported market, competitor, and customer analysis.

These support the following claims:

| Claim | Correct status | Reason |
|---|---|---|
| Bank / regulated financial-services experience | **Verified** | SEB roles and SwedSec licence are explicit in `CV.md`. |
| Loan / financing / credit-related experience | **Verified** | Mortgage and construction-finance cases, risk analysis, and contract review are explicit. |
| SME or corporate lending experience | **Open Question** | The CV does not explicitly use “SME”, “corporate lending”, or “företagskredit”. Interview verification is still needed. |
| Pricing, margin management, or financial-product packaging | **Open Question** | Not stated in the CV evidence inspected. |
| Full product ownership from strategy to commercial result | **Open Question** | The CV shows product and entrepreneurial work, but not this complete claim in the SEB roles. |

## Observed assessment failure

The pasted assessment states, in substance:

- “SME-finansiering, företagslån och krediter — Inte belagt”
- “Bank, fintech eller annan reglerad verksamhet — Inte belagt”
- “Företagskredit eller kommersiell utlåning — Inte belagt”
- “Prissättning, marginalstyrning och finansiell produktpaketering — Inte belagt”

The first, third, and fourth statements need the qualification shown in the evidence table above. The second statement is contradicted by the CV: SEB and the SwedSec licence are explicit.

## Source and prompt diagnosis

### 1. The CV exists, but availability depends on the session

`CV.md` is present in this proof-of-work repository and is intended as the canonical public CV. That does not mean every ChatGPT inkognito session can search it. An unauthenticated session can only use a repository or URL that it can actually access, or text/files supplied in that chat. A private local checkout is not automatically available to ChatGPT.

### 2. The recruiter-agent reading path does not currently include the CV

`docs/reports/recruiter-llm-report-brief.md` lists a source priority that omits `CV.md`.
`RECRUITER_AGENT_GUIDE.md` also omits `CV.md` from its canonical reading order.

An agent following those instructions can produce the observed result even when the CV is present in the repository. This is a prompt/reading-path defect.

### 3. The job-agent match-score input also omits CV text

The current `job-agent` match-score path accepts a `persona_summary` and sends that summary plus job requirements to the model. It does not send the CV text. The separate keyword-gap path can read a selected CV variant, but that is a different path and does not prove that the AI-fit score used the CV.

This is an input-contract limitation, not only a wording problem in the prompt.

## Reproduction contract

Run the AI-fit assessment for the Zinova job with the root `CV.md` explicitly available. The result passes only if it:

1. identifies the SEB roles as evidence of bank/financial-services experience;
2. identifies mortgage and construction-finance work as loan/financing/risk evidence;
3. cites or links the relevant CV evidence;
4. keeps SME/corporate-lending experience as an open question unless the CV or another approved source states it;
5. keeps pricing, margin, and full commercial product ownership separate from the verified SEB evidence; and
6. records whether the CV was actually retrieved, not merely assumed to be available.

## Recommended fix boundary

The AI-fit module should use an explicit source contract:

```text
job ad + canonical CV text + approved profile/persona evidence
    -> evidence extraction with source references
    -> fit assessment with Verified / Open Question / Missing Evidence labels
```

If the CV is unavailable, the output must say **“CV unavailable to this run”** rather than **“not evidenced”**. If the CV is available, the output must search it before reporting a missing experience area.

## Source log note

This record is based on the user-pasted ChatGPT inkognito log for the Zinova role. The full job-ad text and assessment were supplied in the chat; this smoke-test record preserves the decision-relevant content and redacts the recruiter contact address. It is a diagnostic artifact, not a recruiter-facing claim that the AI-fit module has been fixed.

## Next action

Wire `CV.md` or the user's selected CV variant into the AI-fit input contract, then rerun `AI-FIT-001` and require source-linked evidence in the result.
