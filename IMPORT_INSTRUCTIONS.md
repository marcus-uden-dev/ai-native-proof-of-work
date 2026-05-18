# Import Instructions

For a standalone, LLM-agnostic seed that can recreate this repository architecture and automation model for another user, use [REPO_SEED_BLUEPRINT.md](REPO_SEED_BLUEPRINT.md).

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
4. Open [README.md](README.md) and confirm Mermaid diagrams render.

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
