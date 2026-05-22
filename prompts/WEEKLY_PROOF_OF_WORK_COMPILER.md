# Weekly Proof-of-Work Compiler Prompt

Use this prompt in Codex from the root of `TheOneDarkHorse/ai-native-proof-of-work`.

The active weekly schedule and recreation contract are documented in [../template/WEEKLY_AUTOMATION_RUNBOOK.md](../template/WEEKLY_AUTOMATION_RUNBOOK.md).

```text
Run the weekly Proof-of-Work Compiler for this private GitHub portfolio evidence repository.

Treat this repository as the canonical source of truth:
https://github.com/TheOneDarkHorse/ai-native-proof-of-work

Canonical positioning:
- Concrete product projects are the primary proof.
- Job-agent is the lead proof point.
- PKM and the household budget app are supporting proof points.
- The proof-of-work compiler, source indexes, weekly review, and Claude/Codex workflow are documented operating infrastructure and secondary proof points.
- This repository, compiler, and documentation automation are the evidence and packaging layer, not the product.
- Recruiter-facing files should summarize local-only evidence through `SOURCE_MAP.md`, `PROJECT_STATUS.md`, `PROJECT_PROOF_POINTS.md`, and `PROJECT_TIMELINE.md`.
- Recruiter-facing review should remain easy for both humans and agents through `RECRUITER_ONE_PAGER.md`, `RECRUITER_AGENT_GUIDE.md`, `EVIDENCE_MATRIX.md`, and `ROLE_READING_PATHS.md`.

Before editing, inspect:
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
11. RECRUITER_AGENT_GUIDE.md
12. EVIDENCE_MATRIX.md
13. ROLE_READING_PATHS.md
14. case-studies/
15. logs/WEEKLY_LOG.md
16. logs/CHANGELOG.md
17. logs/DECISION_LOG.md
18. logs/PROBLEM_SOLVING_LOG.md
19. recruiter-assets/
20. strategy/
21. architecture/
22. workflows/
23. diagrams/
24. case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md
25. template/

If internal local source indexes are available, inspect them:
- internal/LOCAL_SOURCE_MAP.md
- internal/source-indexes/*.md

If they are unavailable or gitignored, continue without inventing their contents.

Compile this week’s work into project-first proof-of-work artifacts.

Treat [weekly-input/](../weekly-input/) as the clean input layer for new progress, features, decisions, blockers, lessons, and product/business-model insights. Do not use raw Claude/Codex sessions as the primary source for recruiter-facing updates. If a weekly input item changes value proposition, pricing, GTM, ICP, product strategy, architecture, or operating model, update the relevant project-specific strategy/workflow document and add a decision-log entry when the change is meaningful. Product strategy belongs under `strategy/<project>/` using the canonical `product/`, `business/`, `market/`, and `decisions/` subfolders; portfolio evidence-layer strategy belongs under `strategy/portfolio-operating-system/`.

Create or update:
1. project proof-point map
2. current project status layer
3. project milestone timeline
4. recruiter one-pager
5. recruiter agent guide
6. navigation hub
7. evidence matrix
8. role reading paths
9. project case studies
10. GitHub-ready project log
11. weekly diary / changelog
12. CV bullet
13. LinkedIn post draft
14. portfolio case-study note
15. demo script
16. recruiter-facing summary
17. product strategy updates if changed
18. value proposition updates if changed
19. business model updates if changed
20. pricing strategy updates if changed
21. architecture updates if changed
22. ingestion/autoresearch updates if changed
23. recursive workflow updates if changed
24. Claude + Codex workflow philosophy updates if changed
25. local source index updates if needed and available
26. lead source repo install and LLM handoff guide updates when setup, dependencies, ports, validation commands, or agent entrypoints changed
27. template adoption files under `template/` when clone/fork guidance, bootstrap prompts, automation recreation, or reusable-template rules change

Focus on:
- practical execution
- concrete project proof, especially job-agent
- job-agent handoff quality, including whether another user or LLM can clone, configure, run, validate, and understand the source repo
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
- problems encountered and how they were solved
- how Marcus works with Claude and Codex

Avoid:
- hype
- generic AI language
- inflated claims
- fake metrics
- vague productivity claims
- exposing private/sensitive information
- raw chat dumps
- private local paths in recruiter-facing docs

Use evidence labels:
- Verified
- Estimated
- Planned
- Open Question
- Decision
- Hypothesis
- Rejected
- Needs Review

If time spent is not tracked, write:
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
12. one concrete next action
```
