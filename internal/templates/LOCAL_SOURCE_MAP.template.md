# Local Source Map

Last updated: YYYY-MM-DD  
Status: Internal / Not recruiter-facing

## Purpose

Maps local source material used by the proof-of-work compiler.

This file helps Codex find relevant local projects, documentation, shared skills, and scripts without repeatedly rediscovering the folder layout.

Do not expose this file in recruiter-facing exports.

## Local Root Paths

| Source Root | Path | Purpose | Access Status |
|---|---|---|---|
| Codex root | `C:\Users\marcu\.codex\` | Codex configuration, history, projects, related metadata | Available / Unknown |
| Codex projects | `C:\Users\marcu\.codex\projects` | Codex project work and repo-related material | Available / Unknown |
| Claude root | `C:\Users\marcu\.claude\` | Claude configuration, history, projects, related metadata | Available / Unknown |
| Claude projects | `C:\Users\marcu\.claude\projects` | Claude project context and work histories | Available / Unknown |
| Shared agents root | `C:\Users\marcu\.agents` | Shared skills, docs, scripts, reusable agent material | Available / Unknown |

## Index Files

| Index | Source | Purpose | Freshness |
|---|---|---|---|
| `source-indexes/CODEX_ROOT_INDEX.md` | `.codex` | Map root-level Codex folders/files | Fresh / Needs review |
| `source-indexes/CODEX_PROJECTS_INDEX.md` | `.codex/projects` | Map Codex projects | Fresh / Needs review |
| `source-indexes/CLAUDE_ROOT_INDEX.md` | `.claude` | Map root-level Claude folders/files | Fresh / Needs review |
| `source-indexes/CLAUDE_PROJECTS_INDEX.md` | `.claude/projects` | Map Claude projects | Fresh / Needs review |
| `source-indexes/AGENTS_ROOT_INDEX.md` | `.agents` | Map shared agent system | Fresh / Needs review |
| `source-indexes/SKILLS_INDEX.md` | `.agents` and related folders | Map reusable skills | Fresh / Needs review |
| `source-indexes/SCRIPTS_INDEX.md` | `.agents` and related folders | Map scripts | Fresh / Needs review |
| `source-indexes/DOCUMENTATION_INDEX.md` | `.agents`, `.codex`, `.claude` | Map useful docs | Fresh / Needs review |

## Rule

Before scanning local roots, check whether a relevant fresh index already exists.

If the index is older than 14 days or the user says the folder changed, refresh it.
