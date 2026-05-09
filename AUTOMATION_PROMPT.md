# Scheduled Automation Instruction — Weekly Proof-of-Work Compiler

Use this as the scheduled task prompt.

```text
Run the weekly Proof-of-Work Compiler for my private GitHub proof-of-work repository.

Canonical repo:
https://github.com/TheOneDarkHorse/ai-native-proof-of-work

The repo is recruiter-shareable and documents concrete product execution first, especially job-agent, with PKM and the household budget app as supporting proof points. It also documents the automation, source indexing, weekly review, and Claude/Codex operating model that make the work repeatable and recruiter-readable.

This is not a code repo. The main output should be Markdown files readable directly in GitHub. Use Mermaid diagrams for user flows, functional models, technical architecture, and recursive agent/workflow loops. Optional exports to PDF/DOCX/PPTX may be created later, but Markdown is the source of truth.

Before updating artifacts, inspect:
1. AGENTS.md
2. SOURCE_MAP.md
3. README.md
4. PROOF_OF_WORK.md
5. PROJECT_PROOF_POINTS.md
6. PROJECT_TIMELINE.md
7. RECRUITER_ONE_PAGER.md
8. RECRUITER_AGENT_GUIDE.md
9. EVIDENCE_MATRIX.md
10. ROLE_READING_PATHS.md
11. case-studies/
12. logs/WEEKLY_LOG.md
13. logs/CHANGELOG.md
14. logs/DECISION_LOG.md
15. logs/PROBLEM_SOLVING_LOG.md
16. recruiter-assets/
17. strategy/
18. architecture/
19. workflows/
20. diagrams/

If local source indexes are available, inspect:
- internal/LOCAL_SOURCE_MAP.md
- internal/source-indexes/*.md

If the source indexes are unavailable, do not invent their contents. Mark them as unavailable and continue with repo-visible evidence.

Update or create:
1. project proof-point map
2. project milestone timeline
3. recruiter one-pager
4. recruiter agent guide
5. evidence matrix
6. role reading paths
7. project case studies
8. GitHub-ready project log
9. weekly diary / changelog
10. CV bullet
11. LinkedIn post draft
12. portfolio case-study note
13. demo script
14. recruiter-facing summary
15. product strategy document updates if changed
16. value proposition updates if changed
17. business model updates if changed
18. pricing strategy updates if changed
19. architecture updates if changed
20. ingestion/autoresearch model updates if changed
21. recursive workflow model updates if changed
22. Claude + Codex workflow philosophy updates if changed
23. problem-solving log entries
24. decision log entries

Focus on:
- practical execution
- concrete project proof, especially job-agent
- supporting evidence from PKM and the household budget app
- project milestones over time
- automation as documented operating infrastructure, not the whole value proposition
- measurable workflow improvement
- AI-native operating model
- value proposition
- business model
- pricing strategy
- product strategy
- technical architecture
- ingestion model
- autoresearch
- recursive review/promotion loops
- problems encountered and how they were solved
- how I work with Claude and Codex

Canonical positioning:
- Projects are the primary proof.
- Job-agent is the lead proof point.
- PKM and the household budget app are supporting proof points.
- Automation, source indexes, weekly compiler, and review loops are important documented secondary proof points.
- Recruiter-facing files should link to `SOURCE_MAP.md`, `PROJECT_PROOF_POINTS.md`, and `PROJECT_TIMELINE.md` rather than local-only internal index files.
- Recruiter-facing review should remain easy for both humans and agents through `RECRUITER_ONE_PAGER.md`, `RECRUITER_AGENT_GUIDE.md`, `EVIDENCE_MATRIX.md`, and `ROLE_READING_PATHS.md`.

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
5. project timeline updates
6. source index updates
7. key proof-of-work this week
8. claims that need evidence
9. problems/blockers
10. one concrete next action
```
