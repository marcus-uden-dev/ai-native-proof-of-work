# Evidence Matrix

Last updated: 2026-08-09
Status: Active / Recruiter-facing

## Purpose

This matrix maps recruiter-relevant capabilities to concrete proof points.

Use it as a quick scan before reading the deeper case studies.

Case identity and promotion status come from the [Canonical Case Study Registry](docs/evidence/CASE_STUDY_REGISTRY.md).
Capability tags are retrieval aids; they are not a substitute for case-level evidence.

## Visual Map

```mermaid
flowchart TD
    A["Marcus<br/>AI-native product builder"] --> B["Product proof<br/>Job-agent leads;<br/>PKM and budget app support"]
    B --> C["Product judgment<br/>value prop, pricing,<br/>GTM, open questions"]
    C --> D["Reliability<br/>tests and verification notes"]
    D --> E["Trust<br/>privacy and data-rights choices"]
    E --> F["AI workflow<br/>Claude, Codex,<br/>compiler, indexes"]
    F --> G["Communication<br/>one-pager, case studies,<br/>timeline, decisions"]
```

## Capability Matrix

| Capability | Evidence | Status | Why It Matters |
|---|---|---|---|
| Full-stack product execution | [case-studies/JOB_AGENT_CASE_STUDY.md](case-studies/JOB_AGENT_CASE_STUDY.md) | Internal / Verified | Shows a broad product system, not only documentation |
| Current project progression | [PROJECT_STATUS.md](PROJECT_STATUS.md), [PROJECT_TIMELINE.md](PROJECT_TIMELINE.md) | Internal / Verified | Shows what is complete, what is progressing, and what remains blocked |
| Career-domain product judgment | [PROJECT_PROOF_POINTS.md](PROJECT_PROOF_POINTS.md), [strategy/job-agent/product/VALUE_PROPOSITION.md](strategy/job-agent/product/VALUE_PROPOSITION.md) | Hypothesis / Internal Verified | Connects project execution to job-search workflow pain |
| Knowledge workflow design | [case-studies/PKM_CASE_STUDY.md](case-studies/PKM_CASE_STUDY.md) | Internal / Verified | Shows ingestion, search, learning, and prioritization thinking |
| Financial domain modeling | [case-studies/HOUSEHOLD_BUDGET_CASE_STUDY.md](case-studies/HOUSEHOLD_BUDGET_CASE_STUDY.md) | Internal / Verified | Shows careful modeling of household data, imports, goals, and forecasts |
| QA and regression discipline | Job-agent and budget case studies | Internal / Verified | Shows attention to reliability and verification, not just ideation |
| Reproducible product handoff | [case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md](case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md), [PROJECT_STATUS.md](PROJECT_STATUS.md) | Verified | Shows that setup claims are tied to source-verified env files, startup docs, ports, validation paths, the currently accessible committed branch contract, and actual source HEAD rather than memory, stale status summaries, or dirty local WIP |
| Published product snapshots | [Published Demo Portal](https://theonedarkhorse.github.io/ai-native-proof-of-work-demo/) | Verified | Gives reviewers a no-install way to inspect the main product surfaces before reading deeper docs |
| Privacy-aware execution | [SOURCE_MAP.md](SOURCE_MAP.md), [SHARING_CHECKLIST.md](SHARING_CHECKLIST.md) | Verified | Shows judgment about what should and should not be shared |
| Learning signal and source taste | [recruiter-assets/INFORMATION_DIET.md](recruiter-assets/INFORMATION_DIET.md) | Verified subscription and aggregate listening time / category share unavailable | Shows external signal intake across AI, startups, business, science, and institutions without overstating category-level learning |
| Structured decision-making | [logs/DECISION_LOG.md](logs/DECISION_LOG.md), [strategy/job-agent/decisions/DECISION_TRAIL.md](strategy/job-agent/decisions/DECISION_TRAIL.md) | Decision | Makes tradeoffs visible without exposing private reasoning |
| Automation as operating layer | [AUTOMATION_PROMPT.md](AUTOMATION_PROMPT.md), [prompts/WEEKLY_PROOF_OF_WORK_COMPILER.md](prompts/WEEKLY_PROOF_OF_WORK_COMPILER.md), [workflows/CLAUDE_CODEX_WORKFLOW.md](workflows/CLAUDE_CODEX_WORKFLOW.md) | Verified | Shows repeatability, review discipline, and evidence packaging |
| Workflow implementation | [case-studies/WORKFLOW_IMPLEMENTATION_CASES.md](case-studies/WORKFLOW_IMPLEMENTATION_CASES.md), [tasks/lessons.md](tasks/lessons.md), [template/README.md](template/README.md) | Verified / Needs Review by case | Shows how repeated AI-assisted workflows become durable repo assets instead of one-off conversations |
| Custom skill design | [case-studies/CUSTOM_SKILLS_CASE_STUDY.md](case-studies/CUSTOM_SKILLS_CASE_STUDY.md), [workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md](workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md), [template/CUSTOM_SKILL_CASE_TEMPLATE.md](template/CUSTOM_SKILL_CASE_TEMPLATE.md) | Verified / Needs Review by skill | Shows how Marcus-created skills are documented as reusable, redacted problem/solution workflows rather than raw prompts |
| Recruiter communication | [RECRUITER_ONE_PAGER.md](RECRUITER_ONE_PAGER.md), [docs/reports/recruiter-llm-report-brief.md](docs/reports/recruiter-llm-report-brief.md), [RECRUITER_BRIEF.md](RECRUITER_BRIEF.md), recruiter assets | Verified | Makes the portfolio easier to evaluate quickly and helps recruiter-side LLMs produce balanced reports |

## Case routing

| Role lens | First case | Additional cases | Evidence boundary |
|---|---|---|---|
| AI Product | CASE-001 Job-agent | CASE-002 PKM; CASE-003 Household Budget; CASE-007 IoT Fitness | Product proof leads; outcome status remains explicit |
| Product Operations | CASE-001 Job-agent | CASE-003 Household Budget; CASE-005 ELSA; CASE-011 PostNord | Experience cases require scope and authority backfill |
| AI Transformation / Enablement | CASE-004 Human-gated Workflow Improvement | CASE-005 ELSA; CASE-011 PostNord; CASE-014 Public Evidence | Operating mechanisms support cases and do not replace them |
| Customer Understanding | CASE-006 Lendify | CASE-008 ChefNextDoor; CASE-007 IoT Fitness | Research and retention outcomes are not claimed without source detail |
| Business Analysis / Risk | CASE-003 Household Budget | CASE-012 SEB; CASE-009 Murphy Bed | Separate portfolio domain modelling from employment evidence |

## Evidence Gaps To Close Next

| Gap | Why It Matters | Suggested Fix |
|---|---|---|
| Public-safe job-agent screenshots | Makes the product feel more concrete | Add 2-4 sanitized screenshots after privacy review |
| Selected commit/test references for job-agent | Strengthens verification beyond summaries | Add safe commit hashes or copied test result summaries if shareable |
| Recruiter feedback | Validates whether the repo improves interview quality | Log recruiter/hiring-manager reactions when available |
