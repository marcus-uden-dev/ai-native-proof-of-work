# AGENTS.md — AI-Native Proof-of-Work Repository Compiler

Last updated: 2026-05-08
Status: Active instruction

## Mission

Maintain a private GitHub proof-of-work repository that documents Marcus’s AI-native workflow design, product thinking, automation systems, business strategy, architecture reasoning, local project context, reusable skills, and weekly execution.

This repository is not a codebase.

It is a polished, recruiter-shareable documentation repository showing concrete product execution first, especially job-agent, with PKM and the household budget app as supporting proof points. It also shows how Marcus thinks, builds, evaluates, documents, and improves workflows using Claude, Codex, scheduled tasks, GitHub, local project archives, shared skills, and structured review loops.

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
Private recruiter-shareable proof-of-work archive for AI-native workflow design, automation strategy, product thinking, architecture reasoning, local knowledge organization, and weekly execution evidence.

Current canonical structure:

- Projects are the primary proof.
- Job-agent is the lead proof point.
- PKM and the household budget app are supporting proof points.
- Automation, source indexes, weekly compiler, and review loops are documented operating infrastructure and secondary proof points.
- Recruiter-facing docs should summarize local-only evidence through `SOURCE_MAP.md`, `PROJECT_PROOF_POINTS.md`, and `PROJECT_TIMELINE.md`.
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

Weekly dynamic files update every weekly run:

```text
RECRUITER_ONE_PAGER.md
RECRUITER_AGENT_GUIDE.md
NAVIGATION.md
EVIDENCE_MATRIX.md
ROLE_READING_PATHS.md
BEFORE_AFTER_SNAPSHOTS.md
PROOF_OF_WORK.md
PROJECT_PROOF_POINTS.md
PROJECT_TIMELINE.md
case-studies/JOB_AGENT_CASE_STUDY.md
case-studies/PKM_CASE_STUDY.md
case-studies/HOUSEHOLD_BUDGET_CASE_STUDY.md
RECRUITER_BRIEF.md
PORTFOLIO_CASE_STUDY.md
DEMO_SCRIPT.md
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
8. Add placeholder sections where evidence is missing.
9. Do not fabricate completed work.
10. Mark unknowns clearly.
11. Return a list of missing inputs needed for the next run.

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

1. [SOURCE_MAP.md](SOURCE_MAP.md)
2. `internal/LOCAL_SOURCE_MAP.md` if available
3. `internal/source-indexes/*.md` if available
4. [logs/WEEKLY_LOG.md](logs/WEEKLY_LOG.md)
5. [logs/CHANGELOG.md](logs/CHANGELOG.md)
6. [logs/DECISION_LOG.md](logs/DECISION_LOG.md)
7. [PROOF_OF_WORK.md](PROOF_OF_WORK.md)
8. [PROJECT_PROOF_POINTS.md](PROJECT_PROOF_POINTS.md)
9. [PROJECT_TIMELINE.md](PROJECT_TIMELINE.md)
10. [RECRUITER_ONE_PAGER.md](RECRUITER_ONE_PAGER.md)
11. [RECRUITER_AGENT_GUIDE.md](RECRUITER_AGENT_GUIDE.md)
12. [EVIDENCE_MATRIX.md](EVIDENCE_MATRIX.md)
13. [ROLE_READING_PATHS.md](ROLE_READING_PATHS.md)
14. case studies under `case-studies/`
15. newly added or changed files since the last run

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
18. project timeline updates if milestones changed

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
13. Separate static strategy from weekly updates.
14. Record meaningful strategy or architecture changes in the decision log.
15. Prioritize substance over volume.
16. Check source indexes before rescanning local roots.
17. Refresh stale source indexes when necessary.
18. Summarize local sources; do not dump raw content.
19. Respect Marcus’s custom shared-skills setup.
20. Treat `.agents` as potentially important but structurally non-standard.
21. Treat `https://github.com/TheOneDarkHorse/ai-native-proof-of-work` as the canonical repository.
22. If not running inside the repo, report that limitation before attempting edits.

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
- [PROJECT_TIMELINE.md](PROJECT_TIMELINE.md) reflects any meaningful new milestones
- recruiter-facing assets are updated
- any changed strategy or architecture docs have decision-log entries
- diagrams are valid Mermaid
- no sensitive/private material is included
- private local paths are excluded from recruiter-facing docs
- all speculative claims are labeled
- local source indexes are checked or marked stale
- final response lists updated files, new artifacts, source index status, missing evidence, and one next action
