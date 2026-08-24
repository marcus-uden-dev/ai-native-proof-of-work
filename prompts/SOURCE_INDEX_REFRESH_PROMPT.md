# Source Index Refresh Prompt

Use this prompt in Codex on Marcus’s local machine, not in a remote-only environment.

```text
Refresh local source indexes for the AI-native portfolio evidence repository.

Target repo:
https://github.com/marcus-uden-dev/ai-native-proof-of-work

Canonical positioning:
- Local indexes are internal evidence infrastructure.
- The repository and compiler are evidence infrastructure, not the product.
- Recruiter-facing proof should be summarized through `SOURCE_MAP.md`, `PROJECT_STATUS.md`, `PROJECT_PROOF_POINTS.md`, and `PROJECT_TIMELINE.md`.
- Weekly deltas, insights, blockers, and strategy changes should be captured through `weekly-input/` before they are promoted into recruiter-facing files.
- Job-agent is the lead project proof point.
- PKM and the household budget app are supporting project proof points.
- Automation, source indexes, weekly compiler, and review loops are documented operating infrastructure and secondary proof points.

Known local source roots:
- C:\Users\marcu\.codex\
- C:\Users\marcu\.codex\projects
- C:\Users\marcu\.claude\
- C:\Users\marcu\.claude\projects
- C:\Users\marcu\.agents

Create or update local-only files:
- internal/LOCAL_SOURCE_MAP.md
- internal/source-indexes/CODEX_ROOT_INDEX.md
- internal/source-indexes/CODEX_PROJECTS_INDEX.md
- internal/source-indexes/CLAUDE_ROOT_INDEX.md
- internal/source-indexes/CLAUDE_PROJECTS_INDEX.md
- internal/source-indexes/AGENTS_ROOT_INDEX.md
- internal/source-indexes/SKILLS_INDEX.md
- internal/source-indexes/SCRIPTS_INDEX.md
- internal/source-indexes/DOCUMENTATION_INDEX.md

Before scanning, check whether indexes already exist and whether they are older than 14 days.

Exclude:
- node_modules
- .git
- .next
- dist
- build
- .venv
- venv
- __pycache__
- .cache
- binary files
- large logs
- raw credentials
- secrets
- API keys
- private email dumps
- unrelated temporary files

Summarize folder purpose. Do not dump raw file contents.

For each index, include:
1. summary
2. important folders
3. important files
4. skills / reusable components
5. scripts
6. candidate proof-of-work signals
7. unknowns
8. freshness status

After refreshing indexes, update recruiter-safe summaries only when evidence changed:
- `weekly-input/` only if Marcus provided explicit weekly notes or asked to create a draft input file
- `SOURCE_MAP.md` for source categories and safe project-source summaries
- `PROJECT_STATUS.md` for current project status, blockers, and recent progress
- `PROJECT_PROOF_POINTS.md` for project evidence summaries
- `PROJECT_TIMELINE.md` only when a meaningful milestone changed
- `EVIDENCE_MATRIX.md` when capability-to-evidence mapping changes
- case studies under `case-studies/` when project summaries change materially
- `logs/CHANGELOG.md` and `logs/WEEKLY_LOG.md` for the refresh event

Do not link recruiter-facing files directly to local-only index files. Link to the safe summaries instead.

Do not commit internal source indexes unless Marcus explicitly approves it.
```
