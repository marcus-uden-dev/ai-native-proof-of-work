# Custom Skills Case Study

Last updated: 2026-06-14
Status: Active / Supporting proof point / Sanitized

## Executive Summary

Marcus-created skills are documented here as reusable workflow infrastructure.

The point is not to publish raw prompts or local skill files. The point is to show the operating-system pattern behind them:

```text
Repeated problem -> reusable skill -> safer workflow -> evidence artifact -> next improvement
```

This makes custom skills readable as proof of practical workflow design while preserving privacy and source boundaries.

## Why This Exists

Custom skills can otherwise be hard to evaluate from the outside. They often live in local tool folders, contain implementation-specific instructions, and may reference private workflows.

This case study turns them into recruiter-safe evidence by documenting:

- the repeated problem
- the previous workflow
- the standardized solution
- the before/after improvement
- the evidence status
- the maintenance tradeoff
- the next improvement

## Skill Documentation Standard

Each custom skill or skill family should use the structure in [template/CUSTOM_SKILL_CASE_TEMPLATE.md](../template/CUSTOM_SKILL_CASE_TEMPLATE.md).

For operating guidance, use [workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md](../workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md).

## Current Custom Skill Proof Points

| Skill / Skill Family | Problem | Solution | Evidence | Status | Recruiter Relevance |
|---|---|---|---|---|---|
| Weekly proof-of-work compiler | Weekly progress could remain scattered across chats, local notes, project files, and undocumented repo changes | A recurring compiler flow turns verified input into logs, evidence maps, recruiter assets, missing-evidence notes, and cross-link maintenance | [AUTOMATION_PROMPT.md](../AUTOMATION_PROMPT.md), [prompts/WEEKLY_PROOF_OF_WORK_COMPILER.md](../prompts/WEEKLY_PROOF_OF_WORK_COMPILER.md), [template/WEEKLY_AUTOMATION_RUNBOOK.md](../template/WEEKLY_AUTOMATION_RUNBOOK.md), [logs/WEEKLY_LOG.md](../logs/WEEKLY_LOG.md) | Verified | Shows recurring automation with source discipline and claim boundaries |
| Source index refresh | Local project context can be rediscovered repeatedly and mixed into recruiter-facing claims without clear provenance | Internal source indexes summarize source roots, freshness, and evidence boundaries before claims are promoted | [SOURCE_MAP.md](../SOURCE_MAP.md), [prompts/SOURCE_INDEX_REFRESH_PROMPT.md](../prompts/SOURCE_INDEX_REFRESH_PROMPT.md), internal source indexes when available | Internal / Verified summary | Shows scalable context management without exposing local paths |
| Feature lifecycle skills | Raw ideas can move directly to implementation without enough triage, refinement, review, or promotion discipline | Feature work is split into repeatable stages such as brainstorm, intake, refinement, implementation, review, and learning | [case-studies/WORKFLOW_IMPLEMENTATION_CASES.md](WORKFLOW_IMPLEMENTATION_CASES.md), internal source summary | Internal / Needs Review | Shows product workflow discipline rather than one-off prompting |
| Browser automation promotion gate | Browser automation can be brittle, expensive, or overused when a cheaper structured path exists | Automation is promoted to a reusable skill only after API, fetch, parser, and recurrence checks are considered | [workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md](../workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md), internal source summary | Internal / Needs Review | Shows judgment about when to automate and when not to |
| Lessons loop | Durable corrections can disappear after a task is finished | Stable rules are captured in `tasks/lessons.md` with context, corrected rule, and prevention check | [tasks/lessons.md](../tasks/lessons.md) | Verified | Shows self-improving operating memory |
| Codex runtime health | Local agent-runtime problems can recur as startup warnings, invisible plugins, stale cache metadata, broken hooks, or MCP drift | A reusable `codex-runtime-health` skill standardizes runtime checks, warning triage, rollback backups, verification, and incident notes | Internal source summary; incident note retained in local Codex notes | Internal / Verified summary | Shows self-healing agent infrastructure and disciplined promotion from incident to reusable skill |

## Mini Case: Weekly Proof-of-Work Compiler

### Problem

Useful work was distributed across product repos, local tool histories, weekly notes, logs, prompts, and recruiter-facing summaries.

Without a recurring compiler, the same context could be rediscovered, claims could drift, and recruiter-facing updates could become either stale or overconfident.

### Previous Workflow

Updates were more likely to be assembled manually from memory, recent files, or ad hoc chat context.

That created three risks:

- missing the strongest current evidence
- promoting claims without clear source status
- leaving new artifacts disconnected from navigation, prompts, and reading paths

### Solution

The weekly proof-of-work compiler now requires a structured inspection list, source boundary checks, evidence labels, privacy filters, dependent index updates, and final validation reporting.

The automation also has a recreation path in [template/WEEKLY_AUTOMATION_RUNBOOK.md](../template/WEEKLY_AUTOMATION_RUNBOOK.md), so the workflow is not only an instruction hidden in one scheduler.

### Before / After

| Before | After | Evidence Status |
|---|---|---|
| Weekly updates depended on manual assembly and local memory | Weekly updates follow a documented source inspection and output contract | Verified |
| New docs could become orphaned | Automation requires discoverability through indexes, reading paths, and link checks | Verified |
| Source-only claims could leak into recruiter-facing summaries | Automation requires evidence labels and privacy filtering | Verified |

### Evidence

| Evidence | What It Shows | Status | Recruiter-Safe? |
|---|---|---|---|
| [AUTOMATION_PROMPT.md](../AUTOMATION_PROMPT.md) | Scheduled compiler instruction | Verified | Yes |
| [prompts/WEEKLY_PROOF_OF_WORK_COMPILER.md](../prompts/WEEKLY_PROOF_OF_WORK_COMPILER.md) | Manual compiler prompt | Verified | Yes |
| [template/WEEKLY_AUTOMATION_RUNBOOK.md](../template/WEEKLY_AUTOMATION_RUNBOOK.md) | Schedule, recreation path, and validation expectations | Verified | Yes |
| [logs/WEEKLY_LOG.md](../logs/WEEKLY_LOG.md) | Weekly execution history | Verified | Yes |

### Tradeoffs

The compiler adds maintenance overhead. Inspection lists, links, and reading paths must be kept current whenever new proof artifacts are added.

That cost is intentional: the repository is meant to show reviewed evidence, not raw activity.

### Next Improvement

Expand one custom skill family into a full case after there is a sanitized example of it changing a product workflow, preferably feature lifecycle or browser automation promotion.

## Mini Case: Codex Runtime Health

### Problem

Local agent-runtime bugs can look small in isolation: a plugin appears installed but is not visible, a manifest warning scrolls by during startup, an MCP command drifts out of PATH, or generated skill metadata uses an invalid path.

Without a reusable check, each incident requires rediscovering the same plugin, skill, MCP, hook, marketplace, cache, and startup-warning surfaces.

### Previous Workflow

Runtime warnings were investigated directly from the current symptom. That worked, but it made repeated checks depend on memory and made it easier to fix the immediate warning without preserving a reusable prevention path.

### Solution

The `codex-runtime-health` skill packages a repeatable health workflow and a bundled PowerShell check for:

- enabled plugin runtime cache manifests
- plugin manifest parseability and UTF-8 BOM warnings
- MCP command existence
- `hooks.json` parseability
- generated plugin skill icon paths that point outside the skill folder
- optional fresh Codex startup warning smoke tests

The workflow also requires rollback backups before local runtime edits and an incident note after fixes.

### Before / After

| Before | After | Evidence Status |
|---|---|---|
| Runtime-warning fixes depended on one-off diagnosis | A named skill runs a standard static check plus optional fresh startup smoke test | Internal / Verified summary |
| Local fixes could be completed without a durable incident trail | Incident notes capture symptoms, root cause, fix, verification, remaining warnings, and promotion decision | Internal / Verified summary |
| Repeated plugin/skill/MCP/hook checks were re-derived manually | The check is reusable and can be promoted to scheduled automation if drift recurs | Internal / Verified summary |

### Evidence

| Evidence | What It Shows | Status | Recruiter-Safe? |
|---|---|---|---|
| `codex-runtime-health` skill | Repeatable runtime health workflow with bundled script | Internal / Verified summary | Summary only |
| Local incident note | Promotion path from runtime bugfix to reusable skill | Internal / Verified summary | Summary only |
| This case study row | Sanitized proof-of-work record without raw local cache details | Verified | Yes |

### Tradeoffs

The skill is intentionally local-ops focused. It should stay summarized in recruiter-facing docs unless a sanitized automation run or public-safe demo is created.

### Next Improvement

If Codex runtime drift repeats, promote the health script to a scheduled or startup-safe check that reports only bounded, deduplicated warnings.

## Privacy And Redaction Boundary

Do not copy raw local skill files, raw prompts, chat transcripts, credentials, account identifiers, or private local paths into this case study.

Recruiter-facing docs may summarize custom skills by problem, workflow, evidence status, and result. Internal indexes can track source roots separately.

## Decision Trail

```text
Context -> Custom skills are a meaningful part of the AI-native operating model but are mostly visible through local indexes and workflow summaries.
Options Considered -> Leave skills internal; publish a raw catalog; document them as sanitized workflow cases.
Tradeoffs -> A public case study improves reviewability but requires careful redaction and evidence labeling.
Decision -> Document custom skills through problem/solution cases and keep raw implementation details internal.
Evidence -> The weekly compiler, lessons loop, workflow case index, and template files already show reusable workflow infrastructure.
Open Questions -> Which skill family should be expanded next with concrete before/after evidence?
Next Action -> Use the template to expand the strongest custom skill family after the next verified source update.
```
