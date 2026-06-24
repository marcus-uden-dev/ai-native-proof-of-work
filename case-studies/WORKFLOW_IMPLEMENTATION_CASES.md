# Workflow Implementation Case Studies

Last updated: 2026-06-14
Status: Active / Supporting proof points

## Purpose

This page captures workflow implementation cases that support the main product portfolio.

The primary recruiter proof points remain job-agent, PKM, and the household budget app. These workflow cases show how the operating system around that product work was improved: intake, review, reusable instructions, automation, source indexing, lessons, templates, and tool-specific handoff patterns.

## How To Read These

Use these cases when evaluating AI-native workflow design, not as a replacement for product execution evidence.

Each case should answer:

```text
Context -> Previous Workflow -> Change Implemented -> Evidence -> Tradeoffs -> Next Improvement
```

## Case Inventory

| Case | What Changed | Current Evidence | Status | Recruiter Relevance |
|---|---|---|---|---|
| Claude artifact to repository artifact | Strategy and synthesis work is converted into Markdown artifacts, decision trails, and portfolio updates instead of remaining in chat output | [workflows/CLAUDE_CODEX_WORKFLOW.md](../workflows/CLAUDE_CODEX_WORKFLOW.md), [logs/DECISION_LOG.md](../logs/DECISION_LOG.md) | Decision / Needs Review | Shows practical handoff between reasoning, implementation, and preserved evidence |
| Codex tasks and lessons loop | Durable project rules are captured in `tasks/lessons.md` so repeated mistakes become prevention checks | [../tasks/lessons.md](../tasks/lessons.md) | Verified | Shows self-improving repo operations and disciplined memory hygiene |
| DESIGN.md adoption pattern | UI rules are promoted into a canonical visual identity contract when a project has reusable design rules | Internal source scan found project-level `DESIGN.md` material; current proof-of-work repo has no root `DESIGN.md` | Internal / Verified summary | Shows how UI style rules become durable implementation guidance |
| Shared skills as reusable workflow infrastructure | Repeated workflows are maintained as skills, scripts, scheduled routines, and templates rather than re-derived each time | [PROOF_OF_WORK.md](../PROOF_OF_WORK.md), [SOURCE_MAP.md](../SOURCE_MAP.md) | Internal / Verified summary | Shows repeatable AI workflow design beyond prompt improvisation |
| Custom skills as documented workflow cases | Marcus-created skills are translated into recruiter-safe problem/solution cases instead of raw prompt dumps | [CUSTOM_SKILLS_CASE_STUDY.md](CUSTOM_SKILLS_CASE_STUDY.md), [../workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md](../workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md), [../template/CUSTOM_SKILL_CASE_TEMPLATE.md](../template/CUSTOM_SKILL_CASE_TEMPLATE.md) | Verified / Needs Review by skill | Shows how reusable agent routines are evaluated, redacted, and maintained |
| Codex runtime health skill | Runtime-warning fixes now have a reusable check, rollback expectation, startup smoke test, and incident-note loop instead of one-off diagnosis | [CUSTOM_SKILLS_CASE_STUDY.md](CUSTOM_SKILLS_CASE_STUDY.md), internal incident summary | Internal / Verified summary | Shows self-healing agent infrastructure and promotion from bugfix to reusable workflow |
| ChatGPT / Codex intake flow | User input, repo instructions, source indexes, and evidence labels are used as a structured intake layer before recruiter-facing updates | [START_HERE.md](../START_HERE.md), [RECRUITER_AGENT_GUIDE.md](../RECRUITER_AGENT_GUIDE.md), [prompts/WEEKLY_PROOF_OF_WORK_COMPILER.md](../prompts/WEEKLY_PROOF_OF_WORK_COMPILER.md) | Verified | Shows how messy context becomes scoped work with quality gates |
| Weekly proof-of-work compiler | Weekly updates move from ad hoc summaries to a repeatable compiler loop with source checks, privacy rules, and missing-evidence handling | [AUTOMATION_PROMPT.md](../AUTOMATION_PROMPT.md), [template/WEEKLY_AUTOMATION_RUNBOOK.md](../template/WEEKLY_AUTOMATION_RUNBOOK.md), [logs/WEEKLY_LOG.md](../logs/WEEKLY_LOG.md) | Verified | Shows recurring automation with human review and claim discipline |
| Global logbook / operating log | Decisions, weekly changes, problems, and changelog entries are separated so the repo can show both narrative and audit trail | [logs/WEEKLY_LOG.md](../logs/WEEKLY_LOG.md), [logs/CHANGELOG.md](../logs/CHANGELOG.md), [logs/PROBLEM_SOLVING_LOG.md](../logs/PROBLEM_SOLVING_LOG.md), [logs/DECISION_LOG.md](../logs/DECISION_LOG.md) | Verified | Shows operational memory and traceable progress |
| Template and bootstrap materials | Reusable adoption material is kept under `template/` so the main repository stays recruiter-first | [template/README.md](../template/README.md), [template/REPO_SEED_BLUEPRINT.md](../template/REPO_SEED_BLUEPRINT.md), [template/LLM_BOOTSTRAP_REPO_PROMPT.md](../template/LLM_BOOTSTRAP_REPO_PROMPT.md) | Verified | Shows the system can be cloned without exposing private evidence |
| Claude feature lifecycle | Raw ideas move through brainstorm, intake, refinement, implementation, and post-launch review queues | Internal source scan found reusable feature lifecycle command docs | Internal / Verified summary | Shows product-feature workflow discipline rather than one-off prompting |
| Repo automation audit loop | Scheduled audit findings become concrete repo improvements such as agent instructions, lessons, TODO indexing, CI, and handoff docs | Internal source scan found before/after audit reports | Internal / Verified summary | Shows recursive improvement from audit to implemented operating infrastructure |
| Agent review queue / project intake | Saved artifacts are triaged into log-only, instruction update, scheduled task, repo action, implementation plan, test, merge, or archive buckets | Internal source scan found a reusable intake routine | Internal / Verified summary | Shows cross-tool intake discipline and source provenance |
| Browser automation promotion gate | Browser exploration is only promoted to reusable skill when API/fetch/parser paths are checked and the workflow is recurring, safe, and validated | Internal source scan found global browser-routing and promotion-gate docs | Internal / Verified summary | Shows judgment about when to automate and when not to |
| Agent governance files | `AGENTS.md` and `CLAUDE.md` files are used as layered instruction contracts, adapters, and compatibility shims rather than one duplicated mega-prompt | Internal source scan found shared, runtime-specific, repo-local, and template-level instruction files | Internal / Verified summary | Shows system thinking around multi-agent instruction ownership |
| Naming and authorship conventions | Plans, handoffs, ops runs, and instruction files use date/scope/type naming plus visible author or implementer metadata | Internal source scan found global naming rules, run formatting rules, and authorship lessons | Internal / Verified summary | Makes AI-assisted work traceable, reviewable, and easier to route |

## Strongest Case To Expand First

The strongest first expansion is the weekly proof-of-work compiler case because it already connects multiple artifacts:

- source intake
- privacy filtering
- evidence labels
- decision logs
- recruiter assets
- missing-evidence handling
- template reuse

Other high-value expansions:

1. Custom skills case study.
2. Job-agent repo automation audit loop.
3. Claude feature lifecycle.
4. Agent review queue / project intake.
5. DESIGN.md visual identity contract.
6. Browser automation promotion gate.
7. Agent governance files, naming conventions, and authorship.

## Historical Shape

The internal scan suggests this workflow layer developed in stages:

| Period | What Emerged | Evidence Status |
|---|---|---|
| 2026-03 | Claude feature lifecycle commands and queues | Internal / Verified summary |
| 2026-04 | Job-agent automation audits turned missing agent infrastructure into concrete fixes | Internal / Verified summary |
| 2026-04 | Global instruction, naming, run-formatting, and routing conventions became explicit | Internal / Verified summary |
| 2026-05 | Proof-of-work compiler, source indexes, recruiter assets, and reusable template layer were added | Verified / Internal |
| 2026-06 | Workflow implementation cases were separated into their own supporting proof surface | Verified |
| 2026-06 | Runtime-warning incidents began promoting into reusable health checks and incident-note workflows | Internal / Verified summary |

This history matters because it shows an operating system forming from repeated friction: missed context, duplicated instructions, stale setup claims, unclear authorship, scattered plans, and hard-to-review automation output.

## Mini Case Template

Use this format when expanding any row into a full case study:

```markdown
## Case: [Workflow Name]

### Context

What problem or repeated friction existed?

### Previous Workflow

What happened before this workflow existed?

### Change Implemented

What changed in the repo, tool flow, prompt, automation, lesson, template, or handoff process?

### Evidence

| Evidence | Status | Notes |
|---|---|---|
| | Verified / Internal / Planned / Needs Review | |

### Tradeoffs

What became easier, and what new maintenance cost appeared?

### Next Improvement

One concrete improvement that would make the workflow more robust or easier to evaluate.
```

## Evidence Boundaries

- Do not copy raw Claude, ChatGPT, Codex, email, or private local source contents into recruiter-facing files.
- Summarize workflow patterns and link to sanitized repository artifacts.
- Mark workflow claims as `Internal`, `Needs Review`, or `Planned` when evidence is not visible in this repository.
- Keep workflow cases supporting the product portfolio rather than replacing it.
