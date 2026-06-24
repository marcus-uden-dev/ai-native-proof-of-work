# Changelog

## 2026-06-23 — Weekly compiler boundary refresh without new milestone claims

### Added

- Weekly log entry for the 2026-06-23 compiler run.
- Timeline milestone showing that the lead-project source boundary was refreshed again without inventing a new shipped milestone.

### Changed

- Re-verified [case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md](../case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md) against the current `job-agent` source tree and corrected the migration snapshot to 46 files with named head `0045`.
- Refreshed [PROJECT_STATUS.md](../PROJECT_STATUS.md), [PROJECT_PROOF_POINTS.md](../PROJECT_PROOF_POINTS.md), [PROOF_OF_WORK.md](../PROOF_OF_WORK.md), [PROJECT_TIMELINE.md](../PROJECT_TIMELINE.md), and [SOURCE_MAP.md](../SOURCE_MAP.md) so the lead proof point is now anchored to a direct source verification on 2026-06-23.

### Notes

No dated weekly-input file existed for the current week, so this sync promoted only direct source-verified repo state, noted that PR #6 remains open, and did not invent a new product milestone.

## 2026-06-14 — Weekly compiler direct-source refresh

### Added

- Weekly log entry for the 2026-06-14 compiler run.
- Timeline milestone for the refreshed `job-agent` privacy-retention and direct source-verification boundary.
- Problem-solving entry and decision-log entry covering how to handle lagging source-repo status docs.

### Changed

- Re-verified [case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md](../case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md) against the current `job-agent` source tree and git history.
- Refreshed [PROJECT_STATUS.md](../PROJECT_STATUS.md), [PROJECT_PROOF_POINTS.md](../PROJECT_PROOF_POINTS.md), [PROOF_OF_WORK.md](../PROOF_OF_WORK.md), [PROJECT_TIMELINE.md](../PROJECT_TIMELINE.md), and [SOURCE_MAP.md](../SOURCE_MAP.md) so the lead proof point is now anchored to a direct source verification on 2026-06-14 instead of 2026-05-31.
- Updated recruiter/agent reading surfaces to clarify that direct source-verification dates override lagging source-repo status-doc dates.

### Notes

No dated weekly-input file existed for the current week, so this sync promoted only direct source-verified repo state and did not invent a higher-level weekly narrative.

## 2026-06-07 — Weekly compiler no-new-evidence sync

### Added

- Weekly log entry for the 2026-06-07 compiler run.
- Lesson covering how weekly runs should handle an inaccessible lead source repo without inventing freshness.

### Changed

- Refreshed [PROJECT_STATUS.md](../PROJECT_STATUS.md), [PROOF_OF_WORK.md](../PROOF_OF_WORK.md), and [SOURCE_MAP.md](../SOURCE_MAP.md) so they explicitly keep `job-agent` freshness bounded to the last direct source verification on 2026-05-31.

### Notes

No dated weekly-input file existed for the current week, and the `job-agent` source repo was not directly accessible from this workspace, so no new product-progress claims were promoted.

## 2026-06-03 — Weekly automation prompt synced with new review surfaces

### Changed

- Updated the active Codex automation `ai-native-proof-of-work` so it explicitly inspects and maintains [RECRUITER_LLM_REPORT_BRIEF.md](../RECRUITER_LLM_REPORT_BRIEF.md) and [case-studies/WORKFLOW_IMPLEMENTATION_CASES.md](../case-studies/WORKFLOW_IMPLEMENTATION_CASES.md).
- Added an explicit dependency and cross-reference maintenance rule so the automation updates indexes, reading paths, prompt inspection lists, runbooks, source maps, and local Markdown links when docs are added, moved, renamed, removed, or repositioned.
- Updated [template/WEEKLY_AUTOMATION_RUNBOOK.md](../template/WEEKLY_AUTOMATION_RUNBOOK.md) and [prompts/WEEKLY_PROOF_OF_WORK_COMPILER.md](../prompts/WEEKLY_PROOF_OF_WORK_COMPILER.md) to match the active automation contract.
- Synced the portable shared-routine Markdown copy for the automation.

### Validation

- Confirmed the active automation prompt contains the new recruiter LLM report brief and workflow implementation case responsibilities.
- Confirmed the active automation prompt contains dependency/cross-reference, link-check, and orphan-doc checks.
- Ran targeted link and diff validation after the update.

## 2026-06-02 — Recruiter LLM report brief and workflow-case routing

### Added

- [RECRUITER_LLM_REPORT_BRIEF.md](../RECRUITER_LLM_REPORT_BRIEF.md) as the first-class report format for recruiter-side LLMs.
- [case-studies/WORKFLOW_IMPLEMENTATION_CASES.md](../case-studies/WORKFLOW_IMPLEMENTATION_CASES.md) as a supporting workflow implementation case index.

### Changed

- Linked the report brief from README, Start Here, navigation, recruiter agent guide, and `llms.txt`.
- Updated proof, evidence, status, timeline, source-map, role-path, and automation-maintenance docs so the report brief and workflow cases are maintained by future progress runs.

### Validation

- Local Markdown link audit passed for recruiter-facing files.
- Recruiter-facing privacy scan found no local private paths in the newly touched public files.

## 2026-06-01 — Public demo portal published

### Added

- Public repository `TheOneDarkHorse/ai-native-proof-of-work-demo` containing only the static demo portal and required screenshot assets.
- GitHub Pages deployment for the demo portal: `https://theonedarkhorse.github.io/ai-native-proof-of-work-demo/`.

### Changed

- Updated recruiter-facing navigation, proof, status, timeline, case-study, and demo manifest files with the live demo URL.
- Kept the private proof-of-work evidence repository separate from the public demo repository.

### Validation

- GitHub Pages status: built.
- Live Playwright smoke: 2 passed against the public demo URL and public manifest.

## 2026-06-01 — Manual compiler run-now audit

### Added

- Weekly log entry for the manual run-now audit of the active scheduled compiler contract.
- Timeline milestone for the static demo portal and the manual compiler audit.
- Source-map note showing that internal source indexes were refreshed at a high level on 2026-06-01.

### Changed

- Refreshed stale entry-point files: [START_HERE.md](../START_HERE.md), [NAVIGATION.md](../NAVIGATION.md), [EXECUTIVE_SUMMARY.md](../EXECUTIVE_SUMMARY.md), and [BEFORE_AFTER_SNAPSHOTS.md](../BEFORE_AFTER_SNAPSHOTS.md).
- Updated [PROJECT_STATUS.md](../PROJECT_STATUS.md), [PROJECT_PROOF_POINTS.md](../PROJECT_PROOF_POINTS.md), [PROOF_OF_WORK.md](../PROOF_OF_WORK.md), and [PROJECT_TIMELINE.md](../PROJECT_TIMELINE.md) to reflect the demo portal, active automation check, refreshed index freshness, and PKM/budget maintenance signals.
- Updated PKM and household budget case studies with demo links and maintenance-freshness boundaries.

### Notes

No dated weekly-input file existed, so this run did not promote new product progress beyond source-verified status, repo-visible demo work, and dependency-maintenance signals.

## 2026-05-31 — Weekly proof-of-work sync with startup-contract verification

### Added

- Weekly compiler log entry for the 2026-05-31 run.
- Problem-solving log entry for separating Docker Compose defaults from the manual startup/OAuth contract in the `job-agent` handoff.
- Recruiter-agent and role-reading updates that point reviewers to the stronger setup/handoff evidence.

### Changed

- Re-verified [case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md](../case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md) against the current `job-agent` source tree, including `.claude/CLAUDE.md`, `docs/operations/llm-handoff.md`, and `docs/operations/job-agent-startup-skill-handoff.md`.
- Updated [PROOF_OF_WORK.md](../PROOF_OF_WORK.md), [PROJECT_STATUS.md](../PROJECT_STATUS.md), [PROJECT_PROOF_POINTS.md](../PROJECT_PROOF_POINTS.md), and [PROJECT_TIMELINE.md](../PROJECT_TIMELINE.md) to reflect the 2026-05-26 source-repo status refresh and startup-contract evidence.
- Refreshed recruiter-facing summaries and assets to describe the stronger source-verified handoff signal.

### Notes

No dated weekly-input file existed for the current week, so this sync relied on direct source verification plus existing repo-visible changes. Internal source indexes were available but stale and were not refreshed in this pass.

## 2026-05-24 — Weekly proof-of-work sync and handoff verification

### Added

- Weekly compiler log entry for the 2026-05-24 run.
- Decision-log entry for keeping the reusable seed template-scoped and provider-neutral.
- Problem-solving log entry for source-verifying the `job-agent` handoff guide.
- Lesson requiring source verification before updating lead-project handoff docs.

### Changed

- Re-verified [case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md](../case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md) against inspected `job-agent` source files and removed nonexistent agent-entry claims.
- Updated [PROOF_OF_WORK.md](../PROOF_OF_WORK.md), [PROJECT_STATUS.md](../PROJECT_STATUS.md), [PROJECT_PROOF_POINTS.md](../PROJECT_PROOF_POINTS.md), and [PROJECT_TIMELINE.md](../PROJECT_TIMELINE.md) to reflect the reusable template layer and the latest source-verified `job-agent` status.
- Refreshed recruiter assets to mention the reproducible handoff layer and provider-neutral template model.

### Notes

No dated weekly-input file existed for the current week, so this sync used verified repo-visible changes plus inspected `job-agent` source files only.

## 2026-05-11 — Project-scoped strategy structure

### Added

- [strategy/README.md](../strategy/README.md) as the strategy index.
- [strategy/job-agent/](../strategy/job-agent/) as the lead product strategy folder.
- [strategy/pkm/](../strategy/pkm/) as the PKM strategy folder.
- [strategy/household-budget-app/](../strategy/household-budget-app/) as the household budget app strategy folder.
- [strategy/portfolio-operating-system/README.md](../strategy/portfolio-operating-system/README.md) to separate portfolio evidence-layer strategy from product strategy.

### Changed

- Updated recruiter-facing links from flat `strategy/*.md` files to project-scoped strategy paths.
- Updated automation/bootstrap prompts so future runs create and maintain project-scoped strategy docs.
- Normalized the strategy folders and documents so each project uses the same `product/`, `business/`, `market/`, and `decisions/` subfolders plus the same canonical section structure for README, value proposition, product strategy, business model, pricing, GTM, competitive positioning, and decision trails.
- Added a decision-log entry for the strategy restructure.

### Removed

- Removed the old flat strategy files that made product strategy look like it described the portfolio evidence layer.

### Notes

Each project now has the same canonical strategy folders and document names. Job-agent has the most developed strategy because it is the lead proof point; PKM and the household budget app are intentionally marked as supporting and not commercially validated where evidence is still thin.

## 2026-05-09 — Project-first repositioning with documented automation

### Added

- [PROJECT_PROOF_POINTS.md](../PROJECT_PROOF_POINTS.md) as the project-centered evidence map for job-agent, PKM, and the household budget app.
- [PROJECT_TIMELINE.md](../PROJECT_TIMELINE.md) as a living milestone timeline for projects and documentation automation.
- [RECRUITER_ONE_PAGER.md](../RECRUITER_ONE_PAGER.md) for fast recruiter review.
- [RECRUITER_AGENT_GUIDE.md](../RECRUITER_AGENT_GUIDE.md) for recruiter-side agents and review bots.
- [NAVIGATION.md](../NAVIGATION.md) as a plain-English hub for non-technical reviewers.
- [EVIDENCE_MATRIX.md](../EVIDENCE_MATRIX.md) with a visual Mermaid capability map.
- [ROLE_READING_PATHS.md](../ROLE_READING_PATHS.md) for role-specific navigation.
- [BEFORE_AFTER_SNAPSHOTS.md](../BEFORE_AFTER_SNAPSHOTS.md) to show progression over time.
- Sanitized case studies for job-agent, PKM, and the household budget app.
- Screenshot sharing plan for future privacy-reviewed visuals.
- Lesson requiring recruiter-facing artifacts to lead with concrete projects, especially job-agent, while keeping the proof-of-work compiler documented as operating infrastructure.

### Changed

- Repositioned [PROOF_OF_WORK.md](../PROOF_OF_WORK.md), [RECRUITER_BRIEF.md](../RECRUITER_BRIEF.md), [EXECUTIVE_SUMMARY.md](../EXECUTIVE_SUMMARY.md), [START_HERE.md](../START_HERE.md), and [README.md](../README.md) around concrete project execution.
- Updated [strategy/job-agent/product/VALUE_PROPOSITION.md](../strategy/job-agent/product/VALUE_PROPOSITION.md) and [strategy/job-agent/product/PRODUCT_STRATEGY.md](../strategy/job-agent/product/PRODUCT_STRATEGY.md) so the value proposition is project evidence plus a documented automation method, not the automation/compiler alone.
- Updated recruiter assets and demo script to make job-agent the lead proof point, with PKM and the household budget app as supporting examples.

### Notes

The compiler is now described as documented supporting infrastructure for evidence extraction, review, privacy, and recruiter translation.

## 2026-05-08

### Added

- Initial repository scaffold
- [AGENTS.md](../AGENTS.md) Codex instruction
- README and recruiter reading path
- Strategy documentation templates
- Architecture documentation templates
- Workflow documentation templates
- Mermaid diagram files
- Weekly log template and first entry
- Recruiter asset templates
- Sharing checklist
- Automation prompt
- Codex bootstrap prompt

### Changed

- None

### Removed

- None

### Notes

Initial scaffold generated as ZIP because direct GitHub file creation was unreliable in-session.

## 2026-05-08 — Weekly compiler pass

### Changed

- Updated dynamic proof-of-work artifacts to treat commit `1c74a04` as verified scaffold evidence.
- Clarified that local source indexes are unavailable this run.
- Added evidence-gap tracking to the central proof-of-work file.
- Updated recruiter-facing assets to remove pre-commit placeholder wording.

### Notes

No local source index contents were invented. This pass used repo-visible evidence only.

## 2026-05-08 — Local source index refresh

### Added

- Internal local source map.
- Codex root and Codex projects indexes.
- Claude root and Claude projects indexes.
- Agents root, skills, scripts, and documentation indexes.
- Lesson capturing the requirement to keep source layers separate.

### Changed

- Updated proof-of-work and recruiter-facing artifacts to show that internal source indexes now exist.
- Clarified source separation between Codex execution projects, Claude strategy/planning projects, and shared workflow infrastructure.

### Notes

Internal indexes are gitignored and may contain private local paths. Recruiter-facing files use generalized summaries only.
