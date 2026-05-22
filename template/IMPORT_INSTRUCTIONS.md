# Import Instructions

For a standalone, LLM-agnostic seed that can recreate this repository architecture and automation model for another user, use [REPO_SEED_BLUEPRINT.md](REPO_SEED_BLUEPRINT.md).

## One-Click Clone Goal State

The target experience is:

1. clone or fork the repository
2. open it with any capable LLM assistant or coding agent
3. paste the seed prompt from [REPO_SEED_BLUEPRINT.md](REPO_SEED_BLUEPRINT.md) or [LLM_BOOTSTRAP_REPO_PROMPT.md](LLM_BOOTSTRAP_REPO_PROMPT.md)
4. replace user/project placeholders
5. point the system at the user's own product repositories, weekly input, screenshots, source summaries, and evidence
6. recreate the weekly automation from [WEEKLY_AUTOMATION_RUNBOOK.md](WEEKLY_AUTOMATION_RUNBOOK.md)

This reproduces the system architecture, prompts, documentation workflow, automation contract, and privacy rules.

It does not automatically reproduce private evidence, local source indexes, scheduler state, GitHub permissions, secrets, local paths, or access to private product repositories.

For another user, the weekly update loop must use that user's own repositories and evidence sources. Do not keep this repo wired to Marcus's product repos unless that is the explicit intent.

## Option A — Use Codex locally

Run these commands in **PowerShell** from the folder where you want to clone the repo:

```powershell
git clone https://github.com/TheOneDarkHorse/ai-native-proof-of-work.git
cd ai-native-proof-of-work
```

Extract the ZIP contents into this repo folder.

Then run Codex from the repo root and paste:

```text
Use AGENTS.md as the controlling instruction. Inspect the scaffold I just added. Do not overwrite useful files. Validate the Markdown structure, Mermaid diagrams, recruiter reading path, privacy rules, and weekly proof-of-work workflow. Then create a single commit with the scaffold.
```

Commit manually if needed:

```powershell
git status
git add .
git commit -m "Bootstrap AI-native proof-of-work repository"
git push origin main
```

## Option B — Upload directly to GitHub

1. Open the private repo:
   `https://github.com/TheOneDarkHorse/ai-native-proof-of-work`
2. Upload the ZIP contents, not the outer folder if GitHub asks for files.
3. Commit to `main`.
4. Open [README.md](../README.md) and confirm Mermaid diagrams render.

## Option C — Use GitHub Desktop

1. Clone `TheOneDarkHorse/ai-native-proof-of-work`.
2. Extract this ZIP into the local repo folder.
3. Review changes.
4. Commit: `Bootstrap AI-native proof-of-work repository`.
5. Push.

## Important

Do not commit real internal source indexes unless you intentionally want them in the private repo.

The `.gitignore` excludes:

```text
internal/LOCAL_SOURCE_MAP.md
internal/source-indexes/*.md
```

Template files are safe. Real local source indexes may contain private machine paths and should stay local unless explicitly approved.
