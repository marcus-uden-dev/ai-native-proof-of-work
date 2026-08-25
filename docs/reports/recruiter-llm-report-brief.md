# Recruiter LLM Report Brief

Last updated: 2026-08-09
Status: Active / Recruiter-facing / LLM-readable

## Purpose

Use this file when a recruiter, hiring manager, or their assistant wants an LLM to create a fair, evidence-grounded report about Marcus from this repository.

The goal is not to produce hype. The goal is to produce a balanced assessment that captures product execution, AI-native workflow design, systems thinking, communication quality, and open evidence gaps.

## Report Goal

Create a report that answers:

```text
What does this repository fairly demonstrate about Marcus, what is strongest, what is still unvalidated, and what should an interviewer ask next?
```

## Source Priority

Use the complete recruiter-safe repository as reference material. The order below is a retrieval aid, not a closed allowlist: search other relevant repository files when the role, claim, or question requires them.

Read these high-signal sources first:

1. [Career Evidence Source](../../career-evidence/CAREER_EVIDENCE_SOURCE.md)
2. [CV.md](../../CV.md)
3. [START_HERE.md](../../START_HERE.md)
4. [RECRUITER_ONE_PAGER.md](../../RECRUITER_ONE_PAGER.md)
5. [case-studies/JOB_AGENT_CASE_STUDY.md](../../case-studies/JOB_AGENT_CASE_STUDY.md)
6. [PROJECT_PROOF_POINTS.md](../../PROJECT_PROOF_POINTS.md)
7. [EVIDENCE_MATRIX.md](../../EVIDENCE_MATRIX.md)
8. [case-studies/WORKFLOW_IMPLEMENTATION_CASES.md](../../case-studies/WORKFLOW_IMPLEMENTATION_CASES.md)
9. [PROJECT_TIMELINE.md](../../PROJECT_TIMELINE.md)
10. [logs/DECISION_LOG.md](../../logs/DECISION_LOG.md)
11. [logs/DECISION_LOG_TAGS.md](../../logs/DECISION_LOG_TAGS.md)
12. [SOURCE_MAP.md](../../SOURCE_MAP.md)
13. [RECRUITER_AGENT_GUIDE.md](../../RECRUITER_AGENT_GUIDE.md)

Classify the career source and CV as `employment_evidence` / `user_cv_evidence` as applicable. Classify the decision log and its tag taxonomy as `portfolio_decision_evidence`. Decision evidence can support product judgment, workflow design, and tradeoffs, but it cannot establish an unlisted employment duty.

Use `persona_evidence` for profile facts such as target roles, preferences, and working context. Use `employment_evidence` for stated work history, `user_cv_evidence` for user-owned CV text used by job-agent, and `portfolio_decision_evidence` for documented product or workflow decisions. These classes explain evidence limits; they do not restrict the recruiter agent from searching the rest of the recruiter-safe repository.

## Interpretation Rules

- Treat job-agent as the lead product proof point.
- Treat PKM and the household budget app as supporting proof points.
- Treat workflow automation, source indexes, lessons, skills, templates, `AGENTS.md`, and `CLAUDE.md` conventions as evidence of operating-system design.
- Do not reduce the portfolio to "AI automation"; the stronger story is AI-native product execution plus a repeatable evidence system.
- Do not infer exact business impact, revenue, usage, time saved, or production maturity unless explicitly verified.
- Do not expose private local paths, raw chats, internal indexes, credentials, personal data, or sensitive source details.
- Distinguish `Verified`, `Internal / Verified`, `Hypothesis`, `Estimated`, `Needs Review`, and `Open Question` claims.
- When job-agent source status docs lag actual repo HEAD, use the direct source-verification date and cited commits from the portfolio handoff/log files instead of assuming the status doc is freshest.
- Do not treat dirty local source worktree changes as shipped evidence. On 2026-08-09, the fair `job-agent` boundary is the committed redesign branch state through `bc10287`, including the latest committed product-code signal `cfb91bc`, plus an explicit note that newer local edits were not promoted.

## Suggested Report Layout

```markdown
# Recruiter Assessment Report: Marcus

## 1. Executive Summary

3-6 sentences. State the strongest overall signal and the main caveat.

## 2. Best-Fit Roles

List roles or role families this evidence supports, with one-sentence rationale for each.

## 3. Strongest Evidence

Rank the top 5 proof points. Include links and evidence labels.

## 4. Product Execution

Assess job-agent first, then PKM and the household budget app as supporting evidence.

## 5. AI-Native Workflow Design

Assess Claude/Codex workflow, scheduled reviews, source indexing, lessons, skills, templates, and workflow implementation cases.

## 6. Systems Thinking

Assess instruction layering, `AGENTS.md` / `CLAUDE.md`, naming conventions, authorship, handoff design, source maps, and governance patterns.

## 7. Technical Judgment

Assess architecture reasoning, QA/test discipline, privacy/trust handling, deployment/handoff thinking, and evidence boundaries.

## 8. Product and Business Judgment

Assess value proposition, strategy, pricing/GTM hypotheses, tradeoffs, and open questions.

## 9. Communication Quality

Assess clarity, structure, recruiter readability, LLM readability, and ability to turn messy work into reviewable artifacts.

## 10. Evidence Boundaries

List what is strongly evidenced, what is internal-only, what is speculative, and what should not be inferred.

## 11. Suggested Interview Questions

Ask questions that test the strongest claims and unresolved gaps.

## 12. Hiring Signal Summary

Give a balanced final assessment: strengths, risks, and what evidence would make the case stronger.
```

## What A Fair Report Should Capture

- Marcus uses AI tools as an operating layer for product work, not just as text generation.
- The clearest product proof point is job-agent, with PKM and household budgeting showing range.
- The portfolio shows system thinking: source maps, lessons, templates, handoffs, scheduled routines, skill routing, naming conventions, and authorship metadata.
- The documentation is part of the evidence, but it should not be mistaken for the product itself.
- The strongest claims are evidence-labeled; unvalidated claims should stay visibly unvalidated.
- Privacy and source-boundary discipline are part of the work.

## Avoid These Failure Modes

- Do not write a generic glowing recommendation.
- Do not turn internal summaries into public proof.
- Do not ignore evidence gaps.
- Do not over-index on the portfolio repository and miss the actual product projects.
- Do not present planned or hypothesis-stage business claims as validated market traction.
- Do not copy private source details into the report.

## One-Line Prompt

```text
Using this repository, create a fair recruiter assessment report about Marcus following docs/reports/recruiter-llm-report-brief.md. Ground every major claim in linked evidence, separate verified evidence from hypotheses or internal summaries, and include interview questions for unresolved gaps.
```
