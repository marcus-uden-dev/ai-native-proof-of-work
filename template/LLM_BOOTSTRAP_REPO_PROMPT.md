# LLM-Agnostic Bootstrap Repo Prompt

Use this prompt with any capable LLM, coding agent, IDE assistant, or automation runner.

For the full standalone seed, use [REPO_SEED_BLUEPRINT.md](REPO_SEED_BLUEPRINT.md).

```text
Bootstrap a private proof-of-work repository from the current repository state.

Do not assume a specific provider, model, IDE, plugin, or automation platform. Use whatever file-editing and validation tools are available in the current environment.

If the repository is empty, create the scaffold described in REPO_SEED_BLUEPRINT.md.
If the repository already has files, inspect them first, preserve useful work, and update incrementally.

The repository is the evidence and packaging layer around real projects. It is not the product itself.

Keep the architecture provider-neutral:
- use "LLM assistant" or "coding agent" for the portable pattern
- use tool-specific names only when documenting an actual local adapter
- replace all source repository references with the target user's own repositories
- wire weekly updates to the target user's own product repos, weekly notes, screenshots, source summaries, and explicit evidence
- keep source indexes private and gitignored
- do not expose private local paths, raw chat logs, credentials, secrets, or sensitive personal data

Create or verify:
- README.md
- START_HERE.md
- NAVIGATION.md
- template/README.md
- template/REPO_SEED_BLUEPRINT.md
- template/IMPORT_INSTRUCTIONS.md
- PROOF_OF_WORK.md
- PROJECT_STATUS.md
- PROJECT_PROOF_POINTS.md
- PROJECT_TIMELINE.md
- EVIDENCE_MATRIX.md
- RECRUITER_AGENT_GUIDE.md
- SOURCE_MAP.md
- case-studies/<LEAD_PROJECT>_CASE_STUDY.md
- case-studies/<LEAD_PROJECT>_INSTALL_AND_HANDOFF.md
- logs/WEEKLY_LOG.md
- logs/DECISION_LOG.md
- prompts/WEEKLY_PROOF_OF_WORK_COMPILER.md
- prompts/SOURCE_INDEX_REFRESH_PROMPT.md
- template/LLM_BOOTSTRAP_REPO_PROMPT.md
- template/WEEKLY_AUTOMATION_RUNBOOK.md
- template/CUSTOM_SKILL_CASE_TEMPLATE.md
- workflows/SCHEDULED_TASKS_MODEL.md
- workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md
- case-studies/WORKFLOW_IMPLEMENTATION_CASES.md
- case-studies/CUSTOM_SKILLS_CASE_STUDY.md

The lead-project install and handoff file should explain setup prerequisites, local services, ports, environment-variable placeholders, validation commands, LLM entrypoint files, and what not to copy.

Custom skills should be documented as sanitized problem/solution workflow cases. Do not copy raw local skill prompts, private local paths, raw chat logs, account identifiers, credentials, or secrets.

Do not fabricate evidence. Use placeholders and evidence labels where source material is missing.

Return:
1. files created or updated
2. missing inputs
3. validation performed
4. privacy risks found
5. one next action
```
