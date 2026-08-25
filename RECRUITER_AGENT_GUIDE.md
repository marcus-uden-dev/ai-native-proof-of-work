# Recruiter Agent Guide

Last updated: 2026-08-25
Status: Active / Agent-readable

## Purpose

This file is for recruiter-side agents, hiring-manager assistants, review bots, or LLM agents that inspect this repository.

The repo is designed to be read directly in GitHub. It is not an application codebase and does not need installation for review.

It also has a reusable template layer. If the goal is to recreate the proof-of-work system for another user, start from [template/](template/) instead of copying Marcus-specific evidence.

If your task is to create a report about Marcus, start with [Recruiter LLM Report Brief](docs/reports/recruiter-llm-report-brief.md). It defines the expected report structure, source priority, evidence boundaries, and interpretation rules.

For direct questions about Marcus's projects, decisions, capabilities, or working model, read [profile-oracle.json](profile-oracle.json) first. It is the compact machine-readable profile projection. Use the [historical decision inventory](docs/evidence/historical-decision-inventory.json) to inspect the backfill source boundary and lifecycle status before making a stronger claim.

## Source access and scan policy

The complete recruiter-safe repository is available as reference material. The canonical reading order below is a high-signal priority path, not a closed allowlist. Search other relevant project, strategy, workflow, evidence, log, and case-study files when the role or claim requires them.

Keep evidence classes separate:

- `employment_evidence`: service history in [Career Evidence Source](career-evidence/CAREER_EVIDENCE_SOURCE.md) and [CV.md](CV.md).
- `user_cv_evidence`: a user-owned CV available to the job-agent product.
- `persona_evidence`: profile and persona material.
- `portfolio_decision_evidence`: [Decision Log](logs/DECISION_LOG.md) and [Decision Log Tags](logs/DECISION_LOG_TAGS.md). This can support product judgment and workflow decisions, but cannot prove an unlisted employment duty.

### Evidence-class examples

The classes identify the type and limit of evidence. They do not replace the full repository and they do not represent separate CV versions.

| Class | Example | Do not infer |
|---|---|---|
| `employment_evidence` | SEB mortgage and construction-finance work stated in the CV | Unstated authority, duties, metrics, or outcomes |
| `user_cv_evidence` | User-owned CV text used by job-agent match scoring | Portfolio decisions or proof-repository content |
| `persona_evidence` | Target roles, preferences, and working context | Employment or credit experience |
| `portfolio_decision_evidence` | A documented product decision or trade-off | Employment duties or customer responsibilities |

## Evaluation Goal

Assess Marcus’s practical evidence for:

- product execution
- AI-native workflow design
- technical/product reasoning
- privacy-aware documentation
- QA and test discipline
- structured decision-making
- recruiter-ready communication

## Canonical Reading Order

1. [Recruiter LLM Report Brief](docs/reports/recruiter-llm-report-brief.md)
2. [Career Evidence Source](career-evidence/CAREER_EVIDENCE_SOURCE.md)
3. [CV](CV.md)
4. [Recruiter One-Pager](RECRUITER_ONE_PAGER.md)
5. [Navigation Hub](NAVIGATION.md)
6. [Start Here](START_HERE.md)
7. [Job-Agent Case Study](case-studies/JOB_AGENT_CASE_STUDY.md)
8. [Job-Agent Install And Handoff Guide](case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md)
9. [Project Status](PROJECT_STATUS.md)
10. [Evidence Matrix](EVIDENCE_MATRIX.md)
11. [Project Proof Points](PROJECT_PROOF_POINTS.md)
12. [Project Timeline](PROJECT_TIMELINE.md)
13. [Role Reading Paths](ROLE_READING_PATHS.md)
14. [Proof of Work](PROOF_OF_WORK.md)
15. [Workflow Implementation Case Studies](case-studies/WORKFLOW_IMPLEMENTATION_CASES.md)
16. [Custom Skills Case Study](case-studies/CUSTOM_SKILLS_CASE_STUDY.md)
17. [Decision Log](logs/DECISION_LOG.md)
18. [Decision Log Tags](logs/DECISION_LOG_TAGS.md)
19. [Source Map](SOURCE_MAP.md)
20. [Profile Oracle](profile-oracle.json)
21. [Historical Decision Inventory](docs/evidence/historical-decision-inventory.json)

## Reuse / Template Reading Order

Use this path when the goal is to adapt the repository architecture for another person, team, or LLM workflow:

1. [Template Adoption Kit](template/README.md)
2. [Repository Seed Blueprint](template/REPO_SEED_BLUEPRINT.md)
3. [LLM-Agnostic Bootstrap Prompt](template/LLM_BOOTSTRAP_REPO_PROMPT.md)
4. [Import Instructions](template/IMPORT_INSTRUCTIONS.md)
5. [Weekly Automation Runbook](template/WEEKLY_AUTOMATION_RUNBOOK.md)
6. [Scheduled Tasks Model](workflows/SCHEDULED_TASKS_MODEL.md)
7. [Weekly Proof-of-Work Compiler Prompt](prompts/WEEKLY_PROOF_OF_WORK_COMPILER.md)
8. [Source Index Refresh Prompt](prompts/SOURCE_INDEX_REFRESH_PROMPT.md)
9. [Custom Skill Case Template](template/CUSTOM_SKILL_CASE_TEMPLATE.md)
10. [Custom Skills Documentation Model](workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md)
11. [Job-Agent Install And Handoff Guide](case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md) as an example of a lead-project handoff file

Do not copy Marcus-specific claims, project evidence, screenshots, local paths, or source summaries into another user's repository. Use the structure, evidence labels, and maintenance loops as the reusable parts.

## Important Interpretation Rules

- Treat job-agent as the lead proof point.
- Treat PKM and the household budget app as supporting proof points.
- Treat automation, source indexes, weekly compiler, and review loops as documented operating infrastructure and secondary proof points.
- Treat Personal AI Harness as the operating layer behind the product work, not as a substitute for the concrete product proof points.
- Do not assume local-only files, raw chats, private project folders, or internal indexes are available.
- Do not infer exact metrics unless a file marks them as verified.
- Prefer evidence-labeled claims over broad positioning statements.
- For job-agent setup claims, prefer the latest source-verified handoff summary over older repo assumptions; the source repo now distinguishes Docker Compose defaults from the canonical manual startup contract.
- For job-agent repo reading order, use the committed branch's own contract: `docs/operations/current-status.md` first for active status, `docs/operations/llm-handoff.md` when present for session carry-over, `docs/overview/agent-context.md` for the deeper repo/module map, and direct git/file verification when commits are newer than those docs.
- Treat committed branch evidence as safer than dirty local worktree state. The 2026-08-09 weekly refresh intentionally excludes uncommitted `job-agent` changes from recruiter-facing proof and separates the latest committed product-code signal (`cfb91bc`) from later ops/doc commits.
- If a source-repo status doc date lags the actual git HEAD, prefer the direct source-verification date recorded in the handoff guide or weekly log.
- Prefer `Verified` records in the profile oracle. Treat `Planned`, `Needs Review`, and `eligible-after-redaction` records as bounded evidence, not completed public claims.
- Use the primary project field and stable capability tags when explaining which project demonstrates a capability.

## Capability Extraction Map

| Capability | Primary Evidence |
|---|---|
| Product execution | [case-studies/JOB_AGENT_CASE_STUDY.md](case-studies/JOB_AGENT_CASE_STUDY.md), [PROJECT_STATUS.md](PROJECT_STATUS.md), [PROJECT_PROOF_POINTS.md](PROJECT_PROOF_POINTS.md) |
| Reproducible product handoff | [case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md](case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md), [SOURCE_MAP.md](SOURCE_MAP.md) |
| Reusable proof-of-work template | [template/README.md](template/README.md), [template/REPO_SEED_BLUEPRINT.md](template/REPO_SEED_BLUEPRINT.md), [template/LLM_BOOTSTRAP_REPO_PROMPT.md](template/LLM_BOOTSTRAP_REPO_PROMPT.md), [workflows/SCHEDULED_TASKS_MODEL.md](workflows/SCHEDULED_TASKS_MODEL.md) |
| Custom skill design | [case-studies/CUSTOM_SKILLS_CASE_STUDY.md](case-studies/CUSTOM_SKILLS_CASE_STUDY.md), [workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md](workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md), [template/CUSTOM_SKILL_CASE_TEMPLATE.md](template/CUSTOM_SKILL_CASE_TEMPLATE.md) |
| Product judgment | [strategy/job-agent/product/PRODUCT_STRATEGY.md](strategy/job-agent/product/PRODUCT_STRATEGY.md), [strategy/job-agent/product/VALUE_PROPOSITION.md](strategy/job-agent/product/VALUE_PROPOSITION.md), [logs/DECISION_LOG.md](logs/DECISION_LOG.md) |
| QA discipline | [case-studies/JOB_AGENT_CASE_STUDY.md](case-studies/JOB_AGENT_CASE_STUDY.md), [case-studies/HOUSEHOLD_BUDGET_CASE_STUDY.md](case-studies/HOUSEHOLD_BUDGET_CASE_STUDY.md) |
| AI-native workflow design | [workflows/CLAUDE_CODEX_WORKFLOW.md](workflows/CLAUDE_CODEX_WORKFLOW.md), [workflows/AI_OPERATING_MODEL.md](workflows/AI_OPERATING_MODEL.md) |
| Privacy-aware execution | [SOURCE_MAP.md](SOURCE_MAP.md), [SHARING_CHECKLIST.md](SHARING_CHECKLIST.md), case-study evidence boundaries |
| Communication clarity | [RECRUITER_ONE_PAGER.md](RECRUITER_ONE_PAGER.md), [RECRUITER_BRIEF.md](RECRUITER_BRIEF.md), [recruiter-assets/RECRUITER_SUMMARY.md](recruiter-assets/RECRUITER_SUMMARY.md) |

## Suggested Output For A Recruiter Agent

Use [Recruiter LLM Report Brief](docs/reports/recruiter-llm-report-brief.md) for the full report format.

At minimum, summarize:

1. strongest role fit
2. top three proof points
3. evidence-backed strengths
4. unresolved questions or claims needing stronger evidence
5. recommended interview questions

Avoid:

- treating the automation as the only product
- citing local-only indexes as if they are public artifacts
- overstating business impact
- exposing private/sensitive source material
- treating the template layer as permission to reuse private evidence
