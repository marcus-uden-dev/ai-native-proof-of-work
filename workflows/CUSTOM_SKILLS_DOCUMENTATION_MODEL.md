# Custom Skills Documentation Model

Last updated: 2026-06-08
Status: Proposal / Needs Review

## Purpose

Custom skills should be documented as proof of reusable workflow design, not as a raw dump of local instruction files.

The recruiter-facing story is:

```text
Repeated problem -> reusable skill -> better workflow -> evidence -> next improvement
```

This keeps the focus on judgment, system design, and practical execution while avoiding private local paths, raw prompts, secrets, or tool-specific noise.

## Where This Fits

| Layer | File / Folder | Audience | Use |
|---|---|---|---|
| Recruiter-facing overview | `case-studies/WORKFLOW_IMPLEMENTATION_CASES.md` | Recruiters / reviewers | Shows custom skills as supporting workflow proof |
| Operating model | `workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md` | Reviewers / future agents | Defines how skill documentation should be shaped |
| Reusable template | `template/CUSTOM_SKILL_CASE_TEMPLATE.md` | Marcus / adopters / agents | Gives a repeatable format for documenting one skill |
| Internal source index | `internal/source-indexes/SKILLS_INDEX.md` | Local-only | Tracks source roots and skill families without exposing raw local content |

## Recommended Artifact Types

Use three levels, from lightest to deepest.

| Level | Artifact | When To Use | Example |
|---|---|---|---|
| 1 | Skill inventory row | The skill exists but has limited public evidence | `browser automation promotion gate` |
| 2 | Mini case | The skill solved a repeated workflow problem | `weekly proof-of-work compiler` |
| 3 | Full case study | The skill changed a meaningful operating workflow and has visible evidence | `feature lifecycle`, `source index refresh`, `repo audit loop` |

## Skill Case Structure

Each documented custom skill should answer these questions:

1. What repeated problem made the skill necessary?
2. What happened before the skill existed?
3. What does the skill standardize?
4. What changed after using it?
5. What evidence supports the claim?
6. What tradeoff or maintenance cost does it introduce?
7. What should be improved next?

## Suggested Summary Table

Use this table in `case-studies/WORKFLOW_IMPLEMENTATION_CASES.md` or a future dedicated `case-studies/CUSTOM_SKILLS_CASE_STUDY.md`.

| Skill / Skill Family | Problem | Solution | Evidence | Status | Recruiter Relevance |
|---|---|---|---|---|---|
| Weekly proof-of-work compiler | Progress was scattered across chats, local files, and repo changes | A repeatable compiler flow turns weekly input into evidence, logs, recruiter assets, and missing-evidence notes | `AUTOMATION_PROMPT.md`, `template/WEEKLY_AUTOMATION_RUNBOOK.md`, `logs/WEEKLY_LOG.md` | Verified | Shows recurring automation with claim discipline |
| Feature lifecycle skills | Ideas could move straight to implementation without structured triage | Brainstorm, refine, implement, review, and promote feature work through reusable stages | Internal source summary; visible workflow cases when sanitized | Internal / Needs Review | Shows product workflow discipline |
| Browser automation promotion gate | Browser automation can become brittle or overused | Skills require API/fetch/parser checks before recurring browser automation is promoted | Internal source summary; browser routing policy when sanitized | Internal / Needs Review | Shows automation judgment and risk control |
| Source index refresh | Local source roots are large and easy to rediscover repeatedly | Indexes summarize source roots so later runs can work from current maps | `internal/source-indexes/*.md`, `prompts/SOURCE_INDEX_REFRESH_PROMPT.md` | Internal / Verified summary | Shows scalable context management |

## Documentation Rules

- Document the problem and workflow improvement before implementation details.
- Link to sanitized repo artifacts whenever possible.
- Do not expose private local paths in recruiter-facing files.
- Do not copy raw skill prompts, raw chat logs, credentials, or hidden tool instructions.
- Mark source-only evidence as `Internal`.
- Mark unreviewed claims as `Needs Review`.
- Prefer before/after workflow evidence over vague productivity claims.
- Keep product projects as the primary proof points; custom skills are supporting operating-system evidence.

## Promotion Rule

A custom skill is worth documenting publicly when at least one of these is true:

- it prevents a repeated mistake
- it turns a recurring manual workflow into a checklist, script, or reusable agent routine
- it improves evidence quality, privacy, reproducibility, or reviewability
- it helps move product work from idea to shipped artifact
- it creates a reusable pattern another reviewer could understand or adopt

## Decision Trail

```text
Context -> Custom skills are currently visible mostly through internal indexes and workflow summaries.
Options Considered -> Keep skills only internal; add a full skills directory; add a lightweight documentation model and template.
Tradeoffs -> A public skills catalog creates clearer proof but risks overexposing local implementation details if copied raw.
Decision -> Document custom skills through sanitized problem/solution case templates and link only to safe artifacts.
Evidence -> Existing workflow case studies already treat shared skills as supporting workflow infrastructure.
Open Questions -> Which skill family should become the first full public case study?
Next Action -> Expand one high-value custom skill into a mini case using `template/CUSTOM_SKILL_CASE_TEMPLATE.md`.
```
