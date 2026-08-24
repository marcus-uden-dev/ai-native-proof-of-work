# Scheduled Automation Instruction — Weekly Proof-of-Work Compiler

Use this as the scheduled task prompt.

Active schedule and recreation details are documented in [template/WEEKLY_AUTOMATION_RUNBOOK.md](template/WEEKLY_AUTOMATION_RUNBOOK.md).

```text
Run the weekly Proof-of-Work Compiler for my private GitHub portfolio evidence repository.

Canonical repo:
https://github.com/marcus-uden-dev/ai-native-proof-of-work

The repo is recruiter-shareable and documents concrete product execution first, especially job-agent, with PKM and the household budget app as supporting proof points. It is the portfolio evidence layer, not the product. It also documents the automation, source indexing, weekly review, and Claude/Codex operating model that make the work repeatable and recruiter-readable.

This is not a code repo. The main output should be Markdown files readable directly in GitHub. Use Mermaid diagrams for user flows, functional models, technical architecture, and recursive agent/workflow loops. Optional exports to PDF/DOCX/PPTX may be created later, but Markdown is the source of truth.

Clean-state contract:
- Before editing, run `pwsh -NoProfile -File scripts/Test-CleanGitState.ps1` from the repository root.
- If the preflight fails, stop without editing and report the existing changes as the blocker. Do not stack a new weekly run onto a dirty worktree.
- After editing and validation, stage only the exact files produced by this run, inspect `git diff --cached`, and create one dated documentation commit. Never use broad staging such as `git add -A`.
- Run `pwsh -NoProfile -File scripts/Test-CleanGitState.ps1` again after the commit. Do not report the run as complete while staged, unstaged, or untracked files remain.
- Push only when the automation already has explicit authorization and the remote is configured; otherwise report the clean local commit and its SHA.

Before updating artifacts, inspect:
1. AGENTS.md
2. weekly-input/
3. SOURCE_MAP.md
4. README.md
5. NAVIGATION.md
6. PROOF_OF_WORK.md
7. PROJECT_STATUS.md
8. PROJECT_PROOF_POINTS.md
9. PROJECT_TIMELINE.md
10. RECRUITER_ONE_PAGER.md
11. docs/reports/recruiter-llm-report-brief.md
12. RECRUITER_AGENT_GUIDE.md
13. EVIDENCE_MATRIX.md
14. ROLE_READING_PATHS.md
15. case-studies/
16. logs/WEEKLY_LOG.md
17. logs/CHANGELOG.md
18. logs/DECISION_LOG.md
19. logs/PROBLEM_SOLVING_LOG.md
20. recruiter-assets/
21. strategy/
22. architecture/
23. workflows/
24. diagrams/
25. case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md
26. case-studies/WORKFLOW_IMPLEMENTATION_CASES.md
27. case-studies/CUSTOM_SKILLS_CASE_STUDY.md
28. workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md
29. template/
30. template/CUSTOM_SKILL_CASE_TEMPLATE.md

If local source indexes are available, inspect:
- internal/LOCAL_SOURCE_MAP.md
- internal/source-indexes/*.md

If the source indexes are unavailable, do not invent their contents. Mark them as unavailable and continue with repo-visible evidence.

Treat weekly-input/ as the clean input layer for new progress, features, decisions, blockers, lessons, and product/business-model insights. Do not use raw Claude/Codex sessions as the primary source for recruiter-facing updates. If a weekly input item changes value proposition, pricing, GTM, ICP, product strategy, architecture, or operating model, update the relevant project-specific strategy/workflow document and add a decision-log entry when the change is meaningful. Product strategy belongs under `strategy/<project>/` using the canonical `product/`, `business/`, `market/`, and `decisions/` subfolders; Personal AI Harness strategy belongs under `strategy/personal-ai-harness/`.

Update or create:
1. project proof-point map
2. current project status layer
3. project milestone timeline
4. recruiter one-pager
5. recruiter LLM report brief
6. recruiter agent guide
7. navigation hub
8. evidence matrix
9. role reading paths
10. project case studies
11. workflow implementation case studies
12. custom skills case study when a Marcus-created skill or skill family has new evidence, changed status, or a better sanitized before/after example
13. custom skills documentation model when the redaction, promotion, or evidence standard changes
14. custom skill case template when the reusable documentation shape changes
15. GitHub-ready project log
16. weekly diary / changelog
17. CV bullet
18. LinkedIn post draft
19. portfolio case-study note
20. demo script
21. recruiter-facing summary
22. product strategy document updates if changed
23. value proposition updates if changed
24. business model updates if changed
25. pricing strategy updates if changed
26. architecture updates if changed
27. ingestion/autoresearch model updates if changed
28. recursive workflow model updates if changed
29. Claude + Codex workflow philosophy updates if changed
30. problem-solving log entries
31. decision log entries
32. lead source repo install and LLM handoff guide updates when setup, dependencies, ports, validation commands, or agent entrypoints changed
33. template adoption files under `template/` when clone/fork guidance, bootstrap prompts, automation recreation, reusable-template rules, or custom skill case templates change
34. dependent indexes, reading paths, prompt inspection lists, runbooks, source maps, and local Markdown links whenever a file is added, removed, renamed, moved, or repositioned

Focus on:
- practical execution
- concrete project proof, especially job-agent
- job-agent handoff quality, including whether another user or LLM can clone, configure, run, validate, and understand the source repo
- dependency and cross-reference maintenance so new or moved files do not create broken links, stale indexes, or orphaned recruiter-facing documents
- supporting evidence from PKM and the household budget app
- project milestones over time
- weekly input notes as the source for new insights
- automation as documented operating infrastructure, not the whole value proposition
- measurable workflow improvement
- AI-native operating model
- project-level value propositions
- project-level business models
- project-level pricing strategy
- project-level product strategy
- technical architecture
- ingestion model
- autoresearch
- recursive review/promotion loops
- custom skills as sanitized problem/solution workflow cases, not raw prompt dumps
- problems encountered and how they were solved
- how I work with Claude and Codex

Canonical positioning:
- Projects are the primary proof.
- Job-agent is the lead proof point.
- PKM and the household budget app are supporting proof points.
- Automation, source indexes, weekly compiler, and review loops are important documented secondary proof points.
- Do not frame this repository, compiler, or documentation automation as the product; frame them as the evidence and packaging layer for the product projects.
- Keep `case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md` current as the bridge from proof-of-work evidence to reproducible source-project setup.
- Recruiter-facing files should link to `SOURCE_MAP.md`, `PROJECT_STATUS.md`, `PROJECT_PROOF_POINTS.md`, and `PROJECT_TIMELINE.md` rather than local-only internal index files.
- Recruiter-facing review should remain easy for both humans and agents through `RECRUITER_ONE_PAGER.md`, `docs/reports/recruiter-llm-report-brief.md`, `RECRUITER_AGENT_GUIDE.md`, `EVIDENCE_MATRIX.md`, and `ROLE_READING_PATHS.md`.
- New recruiter-facing docs must be discoverable from the nearest index and at least one top-level reading path when they affect recruiter, agent, template, workflow, status, or evidence review.

Avoid:
- hype
- generic AI language
- inflated claims
- fake metrics
- vague productivity claims
- exposing private/sensitive information
- exposing private local paths
- raw chat dumps

Use evidence labels:
- Verified
- Estimated
- Planned
- Open Question
- Decision
- Hypothesis
- Rejected
- Needs Review

If time spent is not tracked, say:
Time spent: Estimated / not directly tracked.

If no verified new source material is available, do not invent a weekly update. Instead, add:
No verified new source material available this week.
Required input: weekly summary, repo changes, exported notes, linked source files, or refreshed source indexes.

Final output must list:
1. updated files
2. new artifacts
3. static files changed
4. project proof-point updates
5. project status updates
6. project timeline updates
7. source index updates
8. key proof-of-work this week
9. claims that need evidence
10. problems/blockers
11. lead source repo handoff status
12. dependency and cross-reference updates
13. custom skill documentation status
14. Markdown link-check result
15. orphan-doc check result
16. one concrete next action
17. final clean-state check result and local commit SHA
```
