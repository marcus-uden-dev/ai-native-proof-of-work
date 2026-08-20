# Navigation Hub

Last updated: 2026-08-15
Status: Active / Recruiter-facing

## Purpose

This page is the simplest map through the repository.

Use it if the file list feels overwhelming.

## If You Have 5 Minutes

| Step | Open | Why |
|---|---|---|
| 1 | [Recruiter One-Pager](RECRUITER_ONE_PAGER.md) | Fast overview of the strongest proof points |
| 2 | [Job-Agent Case Study](case-studies/JOB_AGENT_CASE_STUDY.md) | Lead project proof point |
| 3 | [Project Status](PROJECT_STATUS.md) | Current state and evidence boundaries |

Optional historical preview: [published Job-Agent V1 snapshot](https://theonedarkhorse.github.io/ai-native-proof-of-work-demo/demos/job-agent/index.html). The local snapshot is more current.

## If You Have 15 Minutes

| Step | Open | Why |
|---|---|---|
| 1 | [Start Here](START_HERE.md) | One-minute orientation |
| 2 | [Recruiter One-Pager](RECRUITER_ONE_PAGER.md) | Summary of positioning and proof |
| 3 | [Job-Agent Case Study](case-studies/JOB_AGENT_CASE_STUDY.md) | Main product evidence |
| 4 | [Project Status](PROJECT_STATUS.md) | Current state and open work |
| 5 | [Evidence Matrix](EVIDENCE_MATRIX.md) | Capability map |
| 6 | [Project Timeline](PROJECT_TIMELINE.md) | Progression over time |

## If You Have 30 Minutes

| Step | Open | Why |
|---|---|---|
| 1 | [Recruiter LLM Report Brief](docs/reports/recruiter-llm-report-brief.md) | Suggested fair report format and evidence boundaries for recruiter-side LLMs |
| 2 | [Recruiter Agent Guide](RECRUITER_AGENT_GUIDE.md) | Detailed path for agents and structured review |
| 3 | [Evidence Matrix](EVIDENCE_MATRIX.md) | Capability map |
| 4 | [Project Status](PROJECT_STATUS.md) | Current state, progress, and blockers |
| 5 | [Project Proof Points](PROJECT_PROOF_POINTS.md) | Portfolio-level evidence |
| 6 | [Job-Agent Case Study](case-studies/JOB_AGENT_CASE_STUDY.md) | Lead project |
| 7 | [PKM Case Study](case-studies/PKM_CASE_STUDY.md) | Supporting knowledge-system evidence |
| 8 | [Household Budget App Case Study](case-studies/HOUSEHOLD_BUDGET_CASE_STUDY.md) | Supporting domain-modeling evidence |
| 9 | [Workflow Implementation Cases](case-studies/WORKFLOW_IMPLEMENTATION_CASES.md) | Supporting AI-native workflow implementation evidence |
| 10 | [Decision Log](logs/DECISION_LOG.md) | Tradeoffs and positioning decisions |
| 11 | [Before / After Snapshots](BEFORE_AFTER_SNAPSHOTS.md) | How the portfolio improved |

## Technical Reviewer / LLM Handoff

| Step | Open | Why |
|---|---|---|
| 1 | [Recruiter Agent Guide](RECRUITER_AGENT_GUIDE.md) | Agent-readable review path |
| 2 | [Job-Agent Install And Handoff Guide](case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md) | Reproducible setup path for the lead product |
| 3 | [Architecture Overview](architecture/ARCHITECTURE.md) | Technical model |
| 4 | [AI Operating Model](workflows/AI_OPERATING_MODEL.md) | How the workflow layer works |
| 5 | [llms.txt](llms.txt) | Machine-readable repository map |

## By Question

| Question | Best File |
|---|---|
| What is this repo? | [Start Here](START_HERE.md) |
| What should a recruiter read first? | [Recruiter One-Pager](RECRUITER_ONE_PAGER.md) |
| Where can I see the published historical demo? | [Job-Agent V1 Snapshot](https://theonedarkhorse.github.io/ai-native-proof-of-work-demo/demos/job-agent/index.html) |
| What should an agent read first? | [Recruiter Agent Guide](RECRUITER_AGENT_GUIDE.md) |
| Can an LLM create a fair recruiter report about Marcus? | [Recruiter LLM Report Brief](docs/reports/recruiter-llm-report-brief.md) |
| What is the strongest project? | [Job-Agent Case Study](case-studies/JOB_AGENT_CASE_STUDY.md) |
| How can another user install the lead product? | [Job-Agent Install And Handoff Guide](case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md) |
| What is the current project status? | [Project Status](PROJECT_STATUS.md) |
| What capabilities are evidenced? | [Evidence Matrix](EVIDENCE_MATRIX.md) |
| Where are workflow implementation examples? | [Workflow Implementation Cases](case-studies/WORKFLOW_IMPLEMENTATION_CASES.md) |
| Where are custom skills documented? | [Custom Skills Case Study](case-studies/CUSTOM_SKILLS_CASE_STUDY.md) |
| How should custom skills be documented? | [Custom Skills Documentation Model](workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md) |
| How did this develop over time? | [Project Timeline](PROJECT_TIMELINE.md) |
| What role does this support? | [Role Reading Paths](ROLE_READING_PATHS.md) |
| What changed and why? | [Decision Log](logs/DECISION_LOG.md) |
| What evidence is private/internal? | [Source Map](SOURCE_MAP.md) |
| Where is project strategy documented? | [Project Strategy Index](strategy/README.md) |
| How can another person recreate this repository system? | [Template Adoption Kit](template/README.md) |
| Is the weekly compiler scheduled? | [Weekly Automation Runbook](template/WEEKLY_AUTOMATION_RUNBOOK.md) |

## What Not To Start With

These file areas are useful, but they are not the best first read for a non-technical recruiter.

| File Area | Use Later For |
|---|---|
| [architecture/](architecture/) | Technical depth after the project story is clear |
| [strategy/](strategy/) | Project-level product, business, pricing, GTM, and positioning strategy |
| [workflows/](workflows/) | Operating model details |
| [prompts/](prompts/) | Automation maintenance |
| [logs/](logs/) | Chronology and audit trail |
| [weekly-input/](weekly-input/) | Weekly compiler input notes |
| [template/](template/) | Clone/fork adoption kit for reusing the system |
| [internal/](internal/) | Local-only source maps and templates; not recruiter-facing |

## Recommended Summary Path

```mermaid
flowchart TD
    A["Start Here"] --> B["Recruiter One-Pager"]
    B --> C["Job-Agent Case Study"]
    C --> D["Project Status"]
    D --> E["Evidence Matrix"]
    E --> F["Project Timeline"]
```
