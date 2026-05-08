# Source Index Refresh Prompt

Use this prompt in Codex on Marcus’s local machine, not in a remote-only environment.

```text
Refresh local source indexes for the AI-native proof-of-work repository.

Target repo:
https://github.com/TheOneDarkHorse/ai-native-proof-of-work

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

Do not commit internal source indexes unless Marcus explicitly approves it.
```
