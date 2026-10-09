---
created: 2026-10-09
author: Marcus Udén (Codex)
source_tool: Codex Desktop
source: repository identity check during decision-log release
type: task
status: proposed
review_status: pending
tags: [privacy, repository-instructions, public-release]
---

# found: Align repository privacy instructions with GitHub visibility

Priority: P1
Area: `ai-native-proof-of-work` repository instructions

## Evidence

- `AGENTS.md:8` describes this repository as private.
- `gh repo view marcus-uden-dev/ai-native-proof-of-work --json visibility` returned `PUBLIC` on 2026-10-09.

## Risk

An agent can treat tracked files as private and publish source details without applying public-release review.

## Scope

This task records an instruction mismatch found during the decision-log update. Correcting repository-wide publication rules is separate from that update.

## Next action

Review the repository's intended visibility and update `AGENTS.md` and release guidance to match the actual public boundary.
