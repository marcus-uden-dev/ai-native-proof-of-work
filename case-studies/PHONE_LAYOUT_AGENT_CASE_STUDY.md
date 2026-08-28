# Phone-layout-agent Case Study

Last updated: 2026-08-28
Status: Supporting product proof / evidence-bounded

## Executive Summary

Phone-layout-agent is a local Windows CLI for organizing visible apps on a Samsung One UI Android launcher. The key product decision was to separate AI-assisted classification and review from deterministic device execution. The runner creates an approval-gated proposal, uses an allowlisted ADB surface, applies small native folder-picker batches, and verifies the real folder state before it records success.

This case demonstrates practical automation judgment: the goal is not to make a model control a phone freely. The goal is to make a narrow physical-device workflow safer, repeatable, recoverable, and inspectable.

The source repository is private. This public case summarizes verified source files, automated checks, and internal run evidence without exposing device identifiers, personal app inventories, raw logs, or local paths.

## Tags

### Platform tags

`android` · `adb` · `samsung-one-ui` · `launcher-automation` · `physical-device-validation`

These describe the technical setting. They are separate from the portfolio capability taxonomy, which is reserved for recruiter-relevant skills.

### Capability tags

`process-improvement` · `automation-judgment` · `automation-reliability` · `technical-judgment` · `quality-assurance` · `validation` · `risk-awareness`

## Problem

Organizing a phone launcher across multiple home pages and an app drawer creates a deceptively difficult automation problem. Screenshot-driven loops and direct coordinate drags can be slow, brittle, and hard to verify. A transient folder-picker surface can also look like a successful folder state unless the runner checks the actual folder after the transition.

The problem was therefore broader than “move these apps.” It was how to automate a physical UI while preserving user control, limiting the action surface, handling uncertainty, and producing evidence that a move really happened.

## What Was Built

| Area | Implementation | Evidence status |
|---|---|---|
| Proposal and approval | Dry-run is the default; applying changes requires explicit confirmation bound to the proposed device/layout state | Verified in source implementation and README |
| Bounded device control | A small allowlisted ADB client exposes only the launcher operations required by the workflow | Verified in source implementation |
| Samsung-specific execution | A One UI adapter uses observed labels and native folder-picker flows instead of assuming fixed global coordinates | Verified in source architecture and execution code |
| Batch reconciliation | Actions are grouped into small batches, skipped when already satisfied, checkpointed, and revalidated before resume | Verified in source implementation and tests |
| Safety and recovery | Protected launcher items, confidence thresholds, mismatch blocking, bounded retries, and separate ADB recovery levels constrain failure impact | Verified in source implementation and tests |
| Independent verification | The runner checks hierarchy and screenshot evidence and rejects the folder picker as a false positive | Verified in source implementation and tests |
| Run evidence | Local snapshots, metrics, checkpoints, and run records support later review without becoming recruiter-facing data | Verified in source documentation; local artifacts remain private |

## Decision Trail

### Context

The initial interaction model relied too heavily on repeated observation and individual drag decisions. The workflow needed a faster path for ordinary visible apps, but the device boundary made unrestricted autonomy unacceptable.

### Options Considered

| Option | Advantages | Trade-offs |
|---|---|---|
| Repeat screenshot analysis and model-directed drags | Flexible for unfamiliar layouts | High interaction cost, coordinate fragility, and weak completion evidence |
| Direct coordinate drags | Simple low-level mechanism | Sensitive to page position and layout changes; difficult to resume safely |
| Deterministic native picker batches with approval and re-open verification | Lower action count, stronger safety boundary, resumability, and clearer evidence | Requires a Samsung-specific adapter and sends ambiguous items to review |

### Trade-off

The selected design accepts device-specific implementation work and a conservative scope in exchange for better reliability and auditability. It does not attempt to solve every launcher case: uncertain classifications, home-only shortcuts, inaccessible states, and unsupported layouts remain review or slow-path work.

### Decision

Use AI for discovery, classification, question formation, and strategy review. Use deterministic code for ADB health checks, navigation, native folder-picker actions, batching, checkpoints, recovery, and verification. Keep the workflow dry-run-first and approval-gated.

### Evidence

- [Private source repository](https://github.com/marcus-uden-dev/phone-layout-agent) at the verified source boundary `a7bea45`.
- Source [README](https://github.com/marcus-uden-dev/phone-layout-agent/blob/codex/phone-layout-agent/README.md) and [architecture notes](https://github.com/marcus-uden-dev/phone-layout-agent/blob/codex/phone-layout-agent/docs/architecture.md).
- Source [deterministic strategy](https://github.com/marcus-uden-dev/phone-layout-agent/blob/codex/phone-layout-agent/docs/next-run-deterministic-strategy-2026-08-28.md) and [optimization discovery](https://github.com/marcus-uden-dev/phone-layout-agent/blob/codex/phone-layout-agent/docs/optimization-discovery-2026-08-27.md).
- Source automated validation: 45 test files and 110 tests passed with a single Vitest worker; lint, typecheck, and production build passed in the inspected checkout.
- The diagnostic baseline is explicitly not a controlled throughput benchmark. No throughput, adoption, or productivity outcome is claimed here.

### Open Questions

- How does the selected native-batch path compare with the former interaction loop on a fixed, repeatable workload?
- What reliability threshold should be required before enabling more launcher layouts or cross-page gestures?
- Which accessibility or shortcut cases deserve a separate slow path rather than broader permissions?
- Can the adapter boundary support another launcher without weakening the allowlist or evidence model?

### Next Action

Run one controlled workload with a fixed app set and record attempted moves, verified moves, failures, retries, ADB disconnects, recovery levels, and median successful move time for both the baseline and deterministic path.

## Skills Demonstrated

| Skill | What this case shows |
|---|---|
| Process improvement | Reframed repetitive manual interaction as an observable, planned, and verifiable workflow |
| Automation judgment | Chose where AI helps and where deterministic code is safer and easier to audit |
| Technical judgment | Designed bounded ADB access, a launcher adapter, state reconciliation, and a recovery ladder around a physical UI |
| Reliability engineering | Added checkpoints, idempotent batches, mismatch blocking, retries, and independent verification |
| Quality assurance | Used unit and integration tests for allowlists, folder reconciliation, recovery, snapshots, and false-positive prevention |
| Risk awareness | Protected system-critical items, required approval, deferred ambiguity, and avoided arbitrary device control |
| Evidence discipline | Kept diagnostic measurements separate from controlled outcomes and kept personal device data out of the public case |

## Current Status and Evidence Boundary

**Verified:** The source checkout contains the documented CLI, deterministic Samsung launcher path, allowlisted ADB surface, test suite, recovery logic, snapshot support, and run-record model. The inspected checkout passes 45 test files / 110 tests with one worker, plus lint, typecheck, and build.

**Operational improvement demonstrated:** The source documentation and internal run summaries show that native folder-picker batching, checkpointing, and independent re-open verification were exercised on a Samsung Android device.

**Not measured:** A controlled before/after throughput result, unattended multi-device reliability, external adoption, and production readiness.

## Interview Prompts

- Why should an AI agent not control every individual phone gesture in this workflow?
- How did the false-positive verification problem change the design?
- Where would you draw the permission boundary if the workflow expanded beyond visible launcher items?
- What would make the next benchmark credible rather than anecdotal?
