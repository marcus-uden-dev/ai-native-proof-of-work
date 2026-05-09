# Evidence Matrix

Last updated: 2026-05-09
Status: Active / Recruiter-facing

## Purpose

This matrix maps recruiter-relevant capabilities to concrete proof points.

Use it as a quick scan before reading the deeper case studies.

## Visual Map

```mermaid
flowchart TD
    A["Marcus<br/>AI-native product builder"]

    A --> B["Product Execution"]
    A --> C["Product Judgment"]
    A --> D["QA + Reliability"]
    A --> E["Privacy + Trust"]
    A --> F["AI-native Operating Model"]
    A --> G["Communication + Evidence"]

    B --> B1["Job-agent<br/>career workflow product"]
    B --> B2["PKM<br/>knowledge workflow system"]
    B --> B3["Budget app<br/>financial domain product"]

    C --> C1["Value proposition"]
    C --> C2["Pricing / GTM hypotheses"]
    C --> C3["Open questions shown explicitly"]

    D --> D1["Backend tests"]
    D --> D2["Playwright / live verification notes"]
    D --> D3["Regression-focused documentation"]

    E --> E1["Data rights / retention planning"]
    E --> E2["Privacy-safe source summaries"]
    E --> E3["Sharing checklist"]

    F --> F1["Claude for reasoning"]
    F --> F2["Codex for repository execution"]
    F --> F3["Weekly compiler + source indexing"]

    G --> G1["One-pager"]
    G --> G2["Case studies"]
    G --> G3["Timeline + decision logs"]
```

## Capability Matrix

| Capability | Evidence | Status | Why It Matters |
|---|---|---|---|
| Full-stack product execution | [case-studies/JOB_AGENT_CASE_STUDY.md](case-studies/JOB_AGENT_CASE_STUDY.md) | Internal / Verified | Shows a broad product system, not only documentation |
| Career-domain product judgment | [PROJECT_PROOF_POINTS.md](PROJECT_PROOF_POINTS.md), [strategy/VALUE_PROPOSITION.md](strategy/VALUE_PROPOSITION.md) | Hypothesis / Internal Verified | Connects project execution to job-search workflow pain |
| Knowledge workflow design | [case-studies/PKM_CASE_STUDY.md](case-studies/PKM_CASE_STUDY.md) | Internal / Verified | Shows ingestion, search, learning, and prioritization thinking |
| Financial domain modeling | [case-studies/HOUSEHOLD_BUDGET_CASE_STUDY.md](case-studies/HOUSEHOLD_BUDGET_CASE_STUDY.md) | Internal / Verified | Shows careful modeling of household data, imports, goals, and forecasts |
| QA and regression discipline | Job-agent and budget case studies | Internal / Verified | Shows attention to reliability and verification, not just ideation |
| Privacy-aware execution | [SOURCE_MAP.md](SOURCE_MAP.md), [SHARING_CHECKLIST.md](SHARING_CHECKLIST.md) | Verified | Shows judgment about what should and should not be shared |
| Structured decision-making | [logs/DECISION_LOG.md](logs/DECISION_LOG.md), [strategy/DECISION_TRAIL.md](strategy/DECISION_TRAIL.md) | Decision | Makes tradeoffs visible without exposing private reasoning |
| Automation as operating layer | [AUTOMATION_PROMPT.md](AUTOMATION_PROMPT.md), [prompts/WEEKLY_PROOF_OF_WORK_COMPILER.md](prompts/WEEKLY_PROOF_OF_WORK_COMPILER.md), [workflows/CLAUDE_CODEX_WORKFLOW.md](workflows/CLAUDE_CODEX_WORKFLOW.md) | Verified | Shows repeatability, review discipline, and evidence packaging |
| Recruiter communication | [RECRUITER_ONE_PAGER.md](RECRUITER_ONE_PAGER.md), [RECRUITER_BRIEF.md](RECRUITER_BRIEF.md), recruiter assets | Verified | Makes the portfolio easier to evaluate quickly |

## Evidence Gaps To Close Next

| Gap | Why It Matters | Suggested Fix |
|---|---|---|
| Public-safe job-agent screenshots | Makes the product feel more concrete | Add 2-4 sanitized screenshots after privacy review |
| Selected commit/test references for job-agent | Strengthens verification beyond summaries | Add safe commit hashes or copied test result summaries if shareable |
| Recruiter feedback | Validates whether the repo improves interview quality | Log recruiter/hiring-manager reactions when available |
