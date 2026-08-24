# AGENTS.md — AI-Native Proof-of-Work Repository Compiler

Last updated: 2026-06-02
Status: Active instruction

## Mission

Maintain a private GitHub portfolio evidence repository that documents Marcus’s AI-native workflow design, product thinking, automation systems, business strategy, architecture reasoning, local project context, reusable skills, and weekly execution.

This repository is not a codebase and it is not the product.

It is a polished, recruiter-shareable documentation repository showing concrete product execution first, especially job-agent, with PKM and the household budget app as supporting proof points. The repository is the evidence and packaging layer around those products. It also shows how Marcus thinks, builds, evaluates, documents, and improves workflows using Claude, Codex, scheduled tasks, GitHub, local project archives, shared skills, and structured review loops.

Reusable clone/fork/template adoption material belongs under `template/` so the main repository surface stays recruiter-first.

## Target Repository

Canonical GitHub repository:

```text
https://github.com/TheOneDarkHorse/ai-native-proof-of-work
```

Repository name:

```text
ai-native-proof-of-work
```

Repository purpose:

```text
Private recruiter-shareable proof-of-work archive for AI-native workflow design, automation strategy, product thinking, architecture reasoning, local knowledge organization, and weekly execution evidence. This archive is the portfolio evidence layer, not the product being commercialized or evaluated as the main build.

Current canonical structure:

- Projects are the primary proof.
- Job-agent is the lead proof point.
- PKM and the household budget app are supporting proof points.
- Automation, source indexes, weekly compiler, and review loops are documented operating infrastructure and secondary proof points.
- Recruiter-facing docs should summarize local-only evidence through `SOURCE_MAP.md`, `PROJECT_STATUS.md`, `PROJECT_PROOF_POINTS.md`, and `PROJECT_TIMELINE.md`.
```

Codex must treat this repository as the source of truth for proof-of-work documentation.

If Codex is not running inside this repository, it must clearly report that it needs to be run from the repo root or given access to the repo before making file changes.

## Core Principle

This repository is a proof-of-work system, not a content dump.

Every document should answer at least one of these questions:

1. What problem was identified?
2. What was the previous workflow or assumption?
3. What changed?
4. Why was that change made?
5. What alternatives were considered?
6. What tradeoffs were accepted?
7. What evidence supports the decision?
8. What remains unvalidated?
9. How does this demonstrate practical execution?
10. Why would this matter to a recruiter, hiring manager, or collaborator?

## Decision Trail Standard

Show the visible reasoning trail, not hidden model chain-of-thought.

Do not write private/internal model reasoning.

Use:

```text
Context → Options Considered → Tradeoffs → Decision → Evidence → Open Questions → Next Action
```

Use this in strategy, architecture, pricing, workflow design, weekly reviews, and problem-solving logs.

## Canonical Format

Markdown is the source of truth.

Use:

- `.md` files for all main documentation
- Mermaid diagrams for GitHub-rendered infographics
- tables for comparisons
- short executive summaries at the top of important files
- decision logs for strategy and architecture reasoning
- clear status labels for claims

Optional recruiter exports may later be created as `.pdf`, `.docx`, or `.pptx`, but exports must never replace Markdown.

## Critical Access Rule

Do not assume access to any file, repo, documentation, chat, email, Google Drive document, Claude project, Codex project, skill, or local script unless it is available in the current runtime.

If a source is unavailable, write:

```text
Source unavailable — needs user-provided file, repo path, export, or connector access.
```

Do not invent source contents.

## Known Local Source Roots

Marcus has relevant local material in these Windows paths:

```text
C:\Users\marcu\.codex\
C:\Users\marcu\.codex\projects

C:\Users\marcu\.claude\
C:\Users\marcu\.claude\projects

C:\Users\marcu\.agents
```

Important:

- `.codex\projects` contains Codex project histories and repo-related work.
- `.claude\projects` contains Claude project histories and context.
- `.agents` contains shared skills, documentation, scripts, and reusable agent material.
- Marcus uses a custom shared-skills setup. Do not assume a standard folder layout.
- Inspect and index before relying on contents.
- Do not repeatedly deep-scan these folders if a fresh index already exists.

## Internal Source Indexes

Create and maintain internal source indexes so Codex does not rediscover folder contents every run.

Expected local-only files:

```text
internal/
  README.md
  LOCAL_SOURCE_MAP.md
  source-indexes/
    CODEX_ROOT_INDEX.md
    CODEX_PROJECTS_INDEX.md
    CLAUDE_ROOT_INDEX.md
    CLAUDE_PROJECTS_INDEX.md
    AGENTS_ROOT_INDEX.md
    SKILLS_INDEX.md
    SCRIPTS_INDEX.md
    DOCUMENTATION_INDEX.md
```

These files may contain local paths and should not be included in recruiter-facing exports.

Default rule:

```text
Keep internal source indexes local and gitignored.
```

## Source Indexing Rules

When indexing local folders, include:

- project names
- file paths
- folder purpose
- README files
- instruction files
- skill definitions
- scripts
- templates
- documentation
- workflow descriptions
- AGENTS.md / CLAUDE.md / CODEX.md files
- reusable prompts
- scheduled task instructions
- architecture notes
- implementation plans

Exclude:

- `node_modules`
- `.git`
- `.next`
- `dist`
- `build`
- `.venv`
- `venv`
- `__pycache__`
- `.cache`
- binary files
- large logs
- raw credentials
- secrets
- API keys
- private email dumps
- unrelated temporary files

Summarize, do not dump raw content.

## Static vs Dynamic Files

Mostly static files change only when strategy, architecture, positioning, or workflow assumptions change.

Weekly input files are read during weekly runs, but should only be created or edited when Marcus provides notes or explicitly asks for a draft input file:

```text
weekly-input/*.md
```

Weekly dynamic output files update every weekly run when there is verified new material:

```text
RECRUITER_ONE_PAGER.md
docs/reports/recruiter-llm-report-brief.md
RECRUITER_AGENT_GUIDE.md
NAVIGATION.md
EVIDENCE_MATRIX.md
ROLE_READING_PATHS.md
BEFORE_AFTER_SNAPSHOTS.md
PROOF_OF_WORK.md
PROJECT_PROOF_POINTS.md
PROJECT_TIMELINE.md
case-studies/JOB_AGENT_CASE_STUDY.md
case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md
case-studies/WORKFLOW_IMPLEMENTATION_CASES.md
case-studies/PKM_CASE_STUDY.md
case-studies/HOUSEHOLD_BUDGET_CASE_STUDY.md
RECRUITER_BRIEF.md
PORTFOLIO_CASE_STUDY.md
DEMO_SCRIPT.md
template/README.md
template/REPO_SEED_BLUEPRINT.md
template/IMPORT_INSTRUCTIONS.md
template/LLM_BOOTSTRAP_REPO_PROMPT.md
template/WEEKLY_AUTOMATION_RUNBOOK.md
logs/WEEKLY_LOG.md
logs/CHANGELOG.md
logs/PROBLEM_SOLVING_LOG.md
logs/DECISION_LOG.md
recruiter-assets/CV_BULLETS.md
recruiter-assets/LINKEDIN_DRAFTS.md
recruiter-assets/RECRUITER_SUMMARY.md
recruiter-assets/INTERVIEW_TALKING_POINTS.md
```

Internal index files update when first bootstrapping, source folders change, indexes are older than 14 days, the user asks to refresh, or a weekly run cannot find relevant evidence.

## Bootstrap Mode

If the repository is empty or incomplete:

1. Create the full folder structure.
2. Create all required Markdown files.
3. Create [SOURCE_MAP.md](SOURCE_MAP.md).
4. Create local internal source-map placeholders.
5. Add `.gitignore`.
6. Add [START_HERE.md](START_HERE.md).
7. Add initial Mermaid diagrams.
8. Add `template/` with clone/fork adoption instructions if the repository should be reusable by other users.
9. Add placeholder sections where evidence is missing.
10. Do not fabricate completed work.
11. Mark unknowns clearly.
12. Return a list of missing inputs needed for the next run.

## Evidence Labels

Use labels to avoid overstatement.

| Label | Meaning |
|---|---|
| `Verified` | Supported by an artifact, file, commit, screenshot, source, or explicit user input |
| `Estimated` | Plausible but not directly measured |
| `Planned` | Intended but not yet completed |
| `Open Question` | Still unresolved |
| `Decision` | A strategic, architectural, workflow, or product decision |
| `Hypothesis` | A testable product/business assumption |
| `Rejected` | Considered and intentionally not pursued |
| `Internal` | Useful for operation but not recruiter-facing |
| `Needs Review` | Stale or uncertain artifact |

Do not invent exact metrics.

If time is not tracked, write:

```text
Time spent: Estimated / not directly tracked.
```

## Privacy and Redaction Rule

Before writing recruiter-shareable files, remove or generalize:

- private email contents
- personal phone numbers
- home addresses
- private recruiter names unless approved
- confidential company information
- internal PostNord details that should not be public
- sensitive personal data
- raw chat logs
- private family/health references
- credentials
- tokens
- API keys
- secrets
- private local machine paths
- internal `.codex`, `.claude`, `.agents` folder details

Use generalized phrasing when needed.

Instead of:

```text
I discussed X with [specific person] at [company] about [internal system].
```

Use:

```text
I explored an internal workflow improvement involving field data capture, master data quality, and operational feedback loops.
```

## Weekly Run

Before updating artifacts, inspect:

1. [weekly-input/](weekly-input/) for the current dated weekly input, if present
2. [SOURCE_MAP.md](SOURCE_MAP.md)
3. `internal/LOCAL_SOURCE_MAP.md` if available
4. `internal/source-indexes/*.md` if available
5. [logs/WEEKLY_LOG.md](logs/WEEKLY_LOG.md)
6. [logs/CHANGELOG.md](logs/CHANGELOG.md)
7. [logs/DECISION_LOG.md](logs/DECISION_LOG.md)
8. [PROOF_OF_WORK.md](PROOF_OF_WORK.md)
9. [PROJECT_STATUS.md](PROJECT_STATUS.md)
10. [PROJECT_PROOF_POINTS.md](PROJECT_PROOF_POINTS.md)
11. [PROJECT_TIMELINE.md](PROJECT_TIMELINE.md)
12. [RECRUITER_ONE_PAGER.md](RECRUITER_ONE_PAGER.md)
13. [docs/reports/recruiter-llm-report-brief.md](docs/reports/recruiter-llm-report-brief.md)
14. [RECRUITER_AGENT_GUIDE.md](RECRUITER_AGENT_GUIDE.md)
15. [EVIDENCE_MATRIX.md](EVIDENCE_MATRIX.md)
16. [ROLE_READING_PATHS.md](ROLE_READING_PATHS.md)
17. case studies under `case-studies/`
18. newly added or changed files since the last run

Weekly input rule:

- Treat [weekly-input/](weekly-input/) as the clean input layer for new progress, features, decisions, blockers, lessons, and product/business-model insights.
- Do not treat raw Claude/Codex sessions as the primary source for recruiter-facing updates.
- If a weekly input file exists, cross-check it against project status files, source indexes, logs, and repo diffs before promoting claims.
- If a weekly input item changes value proposition, pricing, GTM, ICP, product strategy, architecture, or operating model, update the relevant project-specific strategy/workflow document and add a decision-log entry when the change is meaningful.
- Keep product strategy under `strategy/<project>/` for the actual product project, using the canonical subfolders `product/`, `business/`, `market/`, and `decisions/`. Use `strategy/personal-ai-harness/` for the Personal AI Harness: memory, skills, scheduled work, recursive improvement, evidence capture, weekly review, and recruiter packaging.
- If no weekly input exists, continue from verified repo-visible changes and source indexes, but do not invent missing progress.

If no verified new source material is available, do not invent a weekly update.

Instead, add:

```text
No verified new source material available this week.
Required input: weekly summary, repo changes, exported notes, linked source files, or refreshed source indexes.
```

Create or update:

1. GitHub-ready project log
2. weekly diary / changelog
3. CV bullet
4. LinkedIn post draft
5. portfolio case-study note
6. demo script
7. recruiter-facing summary
7a. recruiter-side LLM report brief if report structure, evidence boundaries, or reading order changed
8. product strategy updates if changed
9. value proposition updates if changed
10. business model updates if changed
11. pricing strategy updates if changed
12. architecture updates if changed
13. ingestion/autoresearch updates if changed
14. recursive workflow updates if changed
15. Claude + Codex workflow philosophy updates if changed
16. local source index updates if needed
17. project proof-point map updates if changed
18. project status updates if current state, blockers, or progress changed
19. project timeline updates if milestones changed
20. install and LLM handoff guide updates for the lead source repo if setup, ports, dependencies, or agent boot sequence changed

## Quality Gate

Before completing any weekly run, verify:

- all claims are grounded
- speculative claims are marked as hypotheses or open questions
- metrics are verified or clearly estimated
- diagrams are valid Mermaid
- recruiter-facing files are readable without context
- weekly log is updated
- there is a clear before/after workflow improvement
- technical docs are understandable to a non-engineer
- deeper technical sections are available for advanced review
- sensitive/private information is excluded
- static files only changed when there is a real reason
- the repo is still useful if shared with a recruiter
- writing is clear, concise, and credible
- the repo shows decision quality, not just activity
- local source indexes are fresh enough
- private local paths are excluded from recruiter-facing docs

## Operating Rules for Codex

1. Inspect existing files before editing.
2. Preserve useful prior work.
3. Update incrementally unless a file is clearly wrong or obsolete.
4. Do not create duplicate documents.
5. Keep Markdown clean and GitHub-readable.
6. Use Mermaid for infographics.
7. Do not add application code unless explicitly requested.
8. Do not expose private/sensitive information.
9. Do not fabricate metrics, commits, evidence, or source contents.
10. Mark uncertainty clearly.
11. Keep recruiter-facing documents readable without technical background.
12. Keep technical documents available for deeper review.
13. Keep source-project install and LLM handoff instructions accurate enough that another user or assistant can reproduce the lead project locally.
14. Keep clone/fork/template adoption material under `template/` so the main root and recruiter navigation stay focused.
15. Separate static strategy from weekly updates.
16. Keep product strategy project-scoped under `strategy/<project>/` with the canonical `product/`, `business/`, `market/`, and `decisions/` subfolders; do not make strategy docs read as though the portfolio evidence layer is the product unless the file is explicitly about the portfolio operating system.
17. Record meaningful strategy or architecture changes in the decision log.
18. Prioritize substance over volume.
19. Check source indexes before rescanning local roots.
20. Refresh stale source indexes when necessary.
21. Summarize local sources; do not dump raw content.
22. Respect Marcus’s custom shared-skills setup.
23. Treat `.agents` as potentially important but structurally non-standard.
24. Treat `https://github.com/TheOneDarkHorse/ai-native-proof-of-work` as the canonical repository.
25. If not running inside the repo, report that limitation before attempting edits.

## Weekly Final Response Format

```markdown
# Weekly Proof-of-Work Compiler Result

## Updated Files

| File | Change | Reason |
|---|---|---|
| | | |

## New Artifacts

| Artifact | Purpose | Recruiter Relevance |
|---|---|---|
| | | |

## Static Files Changed

| File | Why It Changed | Decision Log Updated? |
|---|---|---|
| | | Yes / No |

## Project Proof-Point Updates

| Project | Updated? | Reason | Evidence Status |
|---|---|---|---|
| Job-agent | Yes / No | | |
| PKM | Yes / No | | |
| Household budget app | Yes / No | | |

## Project Timeline Updates

| Timeline Updated? | New / Changed Milestone | Evidence |
|---|---|---|
| Yes / No | | |

## Source Index Updates

| Index | Updated? | Reason | Freshness |
|---|---|---|---|
| CODEX_ROOT_INDEX.md | Yes / No | | |
| CODEX_PROJECTS_INDEX.md | Yes / No | | |
| CLAUDE_ROOT_INDEX.md | Yes / No | | |
| CLAUDE_PROJECTS_INDEX.md | Yes / No | | |
| AGENTS_ROOT_INDEX.md | Yes / No | | |
| SKILLS_INDEX.md | Yes / No | | |
| SCRIPTS_INDEX.md | Yes / No | | |
| DOCUMENTATION_INDEX.md | Yes / No | | |

## Key Proof-of-Work This Week

1.
2.
3.

## Claims That Need Evidence

| Claim | Missing Evidence | Suggested Fix |
|---|---|---|
| | | |

## Problems / Blockers

| Problem | Current Handling | Next Action |
|---|---|---|
| | | |

## Suggested Next Action

One concrete next action only.
```

## Definition of Done

A weekly run is complete only when:

- [logs/WEEKLY_LOG.md](logs/WEEKLY_LOG.md) has a new weekly entry
- [PROOF_OF_WORK.md](PROOF_OF_WORK.md) reflects the strongest current evidence
- [PROJECT_PROOF_POINTS.md](PROJECT_PROOF_POINTS.md) reflects the strongest current project evidence
- [PROJECT_STATUS.md](PROJECT_STATUS.md) reflects meaningful changes in current state, progress, and blockers
- [PROJECT_TIMELINE.md](PROJECT_TIMELINE.md) reflects any meaningful new milestones
- [case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md](case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md) reflects the current install, service, port, validation, and LLM handoff model for the lead source repo
- recruiter-facing assets are updated
- recruiter-side LLM report guidance is current when the review path changes
- any changed strategy or architecture docs have decision-log entries
- diagrams are valid Mermaid
- no sensitive/private material is included
- private local paths are excluded from recruiter-facing docs
- all speculative claims are labeled
- local source indexes are checked or marked stale
- final response lists updated files, new artifacts, source index status, missing evidence, and one next action
