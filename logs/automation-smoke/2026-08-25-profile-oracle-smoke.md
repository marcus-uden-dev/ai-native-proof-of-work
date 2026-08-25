---
created: 2026-08-25
author: Marcus + Codex
source_tool: Codex
source: local automation smoke test
type: ops-run
status: completed
review_status: reviewed
tags:
  - profile-oracle
  - automation
  - privacy-boundary
  - validation
---

# Profile Oracle Automation Smoke Test

## Result

**PASS — bounded local equivalent.**

The native scheduled automation runner was not available in this environment, so this run did not invoke the model or publish any output. It executed the safe local checks that cover the new profile-oracle contract.

## Checks

| Check | Result |
|---|---|
| Automation config loads | Pass |
| Configured model | `gpt-5.6-terra` |
| Configured reasoning effort | `medium` |
| Historical inventory records | 15 |
| Profile oracle decisions | 12 |
| Known taxonomy tags | 149 |
| Unknown oracle/inventory tags | 0 |
| Unresolved repository evidence references | 0 |
| Private preview present in public staging | No |
| Private local paths in public staging | 0 matches |
| Public write or push | None |
| Boundary | Dry-run local validation only |

## Commands

- `Test-CodexAutomationLoad.ps1` with the automation root and the ai-native-proof-of-work automation.
- PowerShell JSON, taxonomy, evidence-reference, and public-boundary validation.
- `Test-AgentDriveSpillGuard.ps1` before the smoke run.

## Limitation

This is an **automation-contract smoke test**, not a full scheduled model execution. A future run should use the Codex automation runner when an explicit dry-run or isolated execution interface is available. Until then, the automation must not be treated as having published or regenerated recruiter-facing output based on this run.
