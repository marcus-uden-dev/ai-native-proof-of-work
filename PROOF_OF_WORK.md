# Proof of Work

Last updated: 2026-08-09
Status: Active / Project-focused evidence map

## What This Demonstrates

- full-stack product execution
- AI-native workflow design applied to real projects
- project-scoped product strategy
- technical architecture reasoning
- test and QA discipline
- privacy-aware product thinking
- documentation discipline
- practical execution across multiple project domains

## Evidence Map

| Artifact | What It Shows | Status | Link |
|---|---|---|---|
| Recruiter one-pager | Fast skim path and top proof points | Verified | [RECRUITER_ONE_PAGER.md](RECRUITER_ONE_PAGER.md) |
| Recruiter LLM report brief | Fair report format, source priority, and overclaiming guardrails for recruiter-side assistants | Verified | [docs/reports/recruiter-llm-report-brief.md](docs/reports/recruiter-llm-report-brief.md) |
| Job-agent case study | Lead product proof point | Internal / Verified | [case-studies/JOB_AGENT_CASE_STUDY.md](case-studies/JOB_AGENT_CASE_STUDY.md) |
| Evidence matrix | Capability-to-evidence map | Verified | [EVIDENCE_MATRIX.md](EVIDENCE_MATRIX.md) |
| Role reading paths | Role-specific recruiter navigation | Verified | [ROLE_READING_PATHS.md](ROLE_READING_PATHS.md) |
| Recruiter agent guide | Agent-readable evaluation instructions | Verified | [RECRUITER_AGENT_GUIDE.md](RECRUITER_AGENT_GUIDE.md) |
| Project status | Current state, recent progress, and open work across projects | Internal / Verified | [PROJECT_STATUS.md](PROJECT_STATUS.md) |
| Project proof points | Concrete project portfolio: job-agent, PKM, household budget app | Internal / Verified | [PROJECT_PROOF_POINTS.md](PROJECT_PROOF_POINTS.md) |
| Project timeline | Milestones across products and the portfolio evidence layer | Internal / Verified | [PROJECT_TIMELINE.md](PROJECT_TIMELINE.md) |
| Weekly log | Execution cadence | Verified | [logs/WEEKLY_LOG.md](logs/WEEKLY_LOG.md) |
| Static demo portal | Published no-install click-through for job-agent, PKM, and household budget snapshots | Verified | [Published demo](https://theonedarkhorse.github.io/ai-native-proof-of-work-demo/), [demos/manifest.json](demos/manifest.json) |
| Value proposition | Project-focused positioning | Hypothesis | [strategy/job-agent/product/VALUE_PROPOSITION.md](strategy/job-agent/product/VALUE_PROPOSITION.md) |
| Architecture docs | Technical reasoning | Verified | [architecture/ARCHITECTURE.md](architecture/ARCHITECTURE.md) |
| Workflow model | Supporting operating model | Decision | [workflows/AI_OPERATING_MODEL.md](workflows/AI_OPERATING_MODEL.md) |
| Workflow implementation cases | Supporting proof of implemented intake, lessons, skills, automations, logs, and templates | Verified / Needs Review by case | [case-studies/WORKFLOW_IMPLEMENTATION_CASES.md](case-studies/WORKFLOW_IMPLEMENTATION_CASES.md) |
| Custom skills case study | Sanitized problem/solution documentation for Marcus-created reusable skills | Verified / Needs Review by skill | [case-studies/CUSTOM_SKILLS_CASE_STUDY.md](case-studies/CUSTOM_SKILLS_CASE_STUDY.md) |
| Recruiter brief | Communication clarity | Verified | [RECRUITER_BRIEF.md](RECRUITER_BRIEF.md) |
| Local source index summaries | Ability to operationalize project context without exposing private paths | Internal / Verified | [SOURCE_MAP.md](SOURCE_MAP.md), [PROJECT_PROOF_POINTS.md](PROJECT_PROOF_POINTS.md) |
| Template adoption kit | Provider-neutral reuse path for the proof-of-work system | Verified | [template/README.md](template/README.md), [template/REPO_SEED_BLUEPRINT.md](template/REPO_SEED_BLUEPRINT.md), [template/WEEKLY_AUTOMATION_RUNBOOK.md](template/WEEKLY_AUTOMATION_RUNBOOK.md) |

## Workflow Improvements

| Workflow | Before | After | Evidence |
|---|---|---|---|
| Weekly documentation | Scattered notes/chats/local projects | Structured portfolio evidence archive | [logs/WEEKLY_LOG.md](logs/WEEKLY_LOG.md), commit `1c74a04` |
| Career assets | Rewritten manually | Generated from one source | `recruiter-assets/`, commit `1c74a04` |
| Strategy decisions | Implicit | Decision trail with tradeoffs | [logs/DECISION_LOG.md](logs/DECISION_LOG.md) |
| Local project context | Rediscovered repeatedly | Indexed source map split by Codex projects, Claude projects, and shared agent assets | Internal source summaries created 2026-05-08 |
| Project positioning | Automation/compiler was treated as the whole value prop | Concrete product projects are now the main proof points, with automation documented as the operating method | [PROJECT_PROOF_POINTS.md](PROJECT_PROOF_POINTS.md), [RECRUITER_BRIEF.md](RECRUITER_BRIEF.md), [strategy/job-agent/product/VALUE_PROPOSITION.md](strategy/job-agent/product/VALUE_PROPOSITION.md) |
| Lead-project handoff | Recruiter-facing setup guidance could drift from the actual source repo | Weekly source verification now checks env files, compose, Makefile, package metadata, requirements, migrations, agent entrypoints, and startup-port/OAuth routing notes before promoting claims | [case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md](case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md), [logs/WEEKLY_LOG.md](logs/WEEKLY_LOG.md) |
| Workflow implementation evidence | Workflow improvements were scattered across prompts, lessons, logs, skills, automation notes, and templates | Supporting workflow cases now identify which operating-system improvements should become recruiter-readable proof points | [case-studies/WORKFLOW_IMPLEMENTATION_CASES.md](case-studies/WORKFLOW_IMPLEMENTATION_CASES.md) |
| Custom skill documentation | Marcus-created skills were visible mainly as internal source-index summaries or local tool assets | Custom skills now have a recruiter-safe case-study model with problem, solution, evidence, tradeoff, and redaction boundaries | [case-studies/CUSTOM_SKILLS_CASE_STUDY.md](case-studies/CUSTOM_SKILLS_CASE_STUDY.md), [workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md](workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md), [template/CUSTOM_SKILL_CASE_TEMPLATE.md](template/CUSTOM_SKILL_CASE_TEMPLATE.md) |

## Best Current Proof Points

### 1. Job-agent career workflow product

- What was done: Built and documented a career workflow product covering CV, job discovery, application support, feedback, privacy, QA, deployment, telemetry, and billing planning.
- Current status: Committed source status still marks MVP and career-ops tasks complete; direct source verification on 2026-08-09 confirms the currently accessible redesign branch at `bc10287`, committed redesign planning plus M0/M1 shell work (`19c3525`, `dd29f6d`, `38cefcb`), August 8 shell polish (`cfb91bc`), 44 migrations with named head `0043`, and an explicit boundary that excludes dirty local worktree changes from recruiter-facing proof.
- Why it matters: Shows practical full-stack product execution in a domain directly related to job search, recruiter workflows, and AI-assisted career operations.
- Status: Internal / Verified.
- Evidence link: [PROJECT_PROOF_POINTS.md](PROJECT_PROOF_POINTS.md), [SOURCE_MAP.md](SOURCE_MAP.md)
- Case study: [case-studies/JOB_AGENT_CASE_STUDY.md](case-studies/JOB_AGENT_CASE_STUDY.md)
- Reproducible handoff: [case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md](case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md)
- Recruiter relevance: Strongest current proof point for product thinking, engineering execution, privacy awareness, and test discipline.

### 2. PKM product and knowledge workflow system

- What was done: Maintained a personal knowledge-management project with ingestion, search, learning/feed surfaces, browser extension material, tests, and feature lifecycle workflow.
- Current status: Feature workflow and core surfaces are represented; social feed is marked done in the local feature queue; full daily-use readiness still depends on operational setup and verification.
- Why it matters: Shows information architecture, source ingestion, knowledge workflows, and structured prioritization.
- Status: Internal / Verified.
- Evidence link: [PROJECT_PROOF_POINTS.md](PROJECT_PROOF_POINTS.md), [SOURCE_MAP.md](SOURCE_MAP.md)
- Case study: [case-studies/PKM_CASE_STUDY.md](case-studies/PKM_CASE_STUDY.md)
- Recruiter relevance: Demonstrates ability to build systems that turn messy knowledge into usable product workflows.

### 3. Household budget app

- What was done: Designed and implemented a household budgeting product with shared household modeling, imports, transaction review, forecasting, goals, security/RLS concerns, and broad test coverage.
- Current status: Core surfaces and household/shared-account hardening are active; recent work extracts read models, view models, workflows, and mutations while migration cleanup remains open.
- Why it matters: Shows domain modeling, financial-product UX, and security-aware application design.
- Status: Internal / Verified.
- Evidence link: [PROJECT_PROOF_POINTS.md](PROJECT_PROOF_POINTS.md), [SOURCE_MAP.md](SOURCE_MAP.md)
- Case study: [case-studies/HOUSEHOLD_BUDGET_CASE_STUDY.md](case-studies/HOUSEHOLD_BUDGET_CASE_STUDY.md)
- Recruiter relevance: Demonstrates product execution outside the AI/career domain, making the portfolio broader and more credible.

### 4. Portfolio evidence repository scaffold

- What was done: Created a structured documentation architecture for proof-of-work artifacts.
- Why it matters: Turns product work into reusable evidence and shows the automation discipline behind that evidence without making the repository itself the product.
- Status: Verified.
- Evidence link: [README.md](README.md), [AGENTS.md](AGENTS.md), [START_HERE.md](START_HERE.md)
- Commit evidence: `1c74a04` (`Bootstrap AI-native proof-of-work repository`)
- Recruiter relevance: Shows structured thinking, documentation discipline, and AI-native workflow design as support for the product portfolio.

### 5. Decision-trail standard

- What was done: Defined a visible reasoning format for decisions.
- Why it matters: Makes strategy and tradeoffs inspectable without exposing hidden chain-of-thought.
- Status: Decision.
- Evidence link: [AGENTS.md](AGENTS.md), [logs/DECISION_LOG.md](logs/DECISION_LOG.md)
- Commit evidence: `1c74a04`
- Recruiter relevance: Shows clear judgment under uncertainty.

### 6. Source-indexing model

- What was done: Created local-only source indexes for Codex projects, Claude projects, and shared agent assets.
- Why it matters: Reduces repeated rediscovery and preserves source separation between product execution evidence, planning evidence, and reusable workflow infrastructure.
- Status: Internal / Verified.
- Evidence link: [architecture/INGESTION_MODEL.md](architecture/INGESTION_MODEL.md), [diagrams/LOCAL_SOURCE_DISCOVERY_MODEL.md](diagrams/LOCAL_SOURCE_DISCOVERY_MODEL.md), [SOURCE_MAP.md](SOURCE_MAP.md)
- Recruiter relevance: Shows ability to turn messy tool ecosystems into operating systems.

### 7. Shared skills and routines inventory

- What was done: Indexed the shared skills/workflows layer as reusable operating infrastructure.
- Why it matters: Shows that repeatable workflows are maintained as skills, scripts, scheduled routines, and lessons rather than one-off prompts. The strongest custom skill examples now have a recruiter-safe documentation path.
- Status: Internal / Verified.
- Evidence summary: 239 shared skill directories and 11 scheduled routine Markdown files observed.
- Case study: [case-studies/CUSTOM_SKILLS_CASE_STUDY.md](case-studies/CUSTOM_SKILLS_CASE_STUDY.md)
- Documentation model: [workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md](workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md)
- Recruiter relevance: Shows systematic workflow design and reusable automation thinking.

## Current Evidence Gaps

| Claim | Status | Missing Evidence |
|---|---|---|
| Job-agent is MVP-complete | Internal / Verified | Add recruiter-safe excerpt or commit evidence if this claim will be shared outside the private repo |
| PKM and household budget app are strong supporting projects | Internal / Verified | Add sanitized project case-study pages or selected commits/tests |
| Weekly workflow improvement has measurable impact | Estimated / not directly tracked | Time saved, reuse count, or before/after workflow data |
| Recruiter assets improve response or interview quality | Hypothesis | Recruiter feedback, interview outcomes, or sharing results |
| Static demo portal publication | Verified | Published through separate public repo [marcus-uden-dev/ai-native-proof-of-work-demo](https://github.com/marcus-uden-dev/ai-native-proof-of-work-demo) and smoke-tested live |
| Weekly narrative for the 2026-08-09 source boundary | Needs Review | Direct source verification exists through 2026-08-09, but there is still no dated `weekly-input/` note explaining user-visible outcomes or decision context for the latest job-agent redesign branch changes |
