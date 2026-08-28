---
created: 2026-08-25
author: Marcus + Codex
source_tool: ChatGPT current thread
source: Repository Interview prompt plus public Saab job listing
type: ops-run
status: completed
review_status: needs-human-review
tags:
  - ai-fit
  - smoke-test
  - repository-interview
  - evidence-boundary
  - ai-product-management
---

# AI-FIT-002 — Repository Interview smoke test for an AI Product Manager role

## Result

**PASS — evidence was retrieved and separated from open questions.**

The prompt produced an evidence-bounded assessment in the current ChatGPT thread. It found product, AI-workflow, regulated-process, customer-research, and QA evidence. It did not convert adjacent experience into unsupported claims about production agentic systems, defence or safety-critical environments, security clearance, measured AI-product outcomes, or full commercial ownership.

This is a current-thread smoke test with the repository available to the assistant. It is not proof that an anonymous ChatGPT incognito session can retrieve the repository without the prompt, public URLs, or supplied files.

## Test case

| Field | Value |
|---|---|
| Test ID | `AI-FIT-002` |
| Role context | AI & Data Product Manager, Saab |
| Role source | [Saab job listing](https://saabgroup.wd116.myworkdayjobs.com/en-US/Saab_careers/job/AI---Data-Product-Manager_REQ_42264-1) |
| Test mode | Current ChatGPT thread with repository context |
| Prompt source | `prompts/REPOSITORY_INTERVIEW_PROMPT.md` |
| Required behavior | Search the complete repository, cite evidence, separate evidence classes, and mark unsupported claims |
| Public incognito result | Not executed; Cloudflare human verification blocked the fresh browser session |

## Role context used in the question

The Saab listing describes a strategic AI and Data Product Manager role. The role covers what to build, why to build it, and how to create value. It includes AI and data products, agentic systems, high technical complexity, security requirements, prioritization, long-term thinking, and value focus.

## Exact prompt used

```text
You are interviewing Marcus's public proof repository.

A recruiter may ask questions about Marcus's:
- skills and capabilities;
- work history and domain experience;
- projects and product work;
- decisions, trade-offs, and working methods;
- evidence boundaries, gaps, and open questions.

Search the complete repository as reference material. The reading paths are starting points, not a closed allowlist. Include the Career Evidence Source and CV when the question concerns employment history, and include the Decision Log when the question concerns product judgment, workflow design, or trade-offs.

For every material claim:
1. cite the relevant repository file and section, or a public link;
2. label the evidence as Verified, Estimated, Planned, Hypothesis, Open Question, or Needs Review;
3. separate employment evidence, persona/context evidence, and portfolio decision evidence;
4. distinguish what the source states from your interpretation;
5. say clearly when the repository does not support an answer.

Do not treat the repository as a replacement for Marcus's human-readable profile. Do not invent duties, metrics, outcomes, seniority, or domain experience. Do not use private paths, raw sessions, secrets, or unsupported claims.

Recruiter question:
Assess Marcus's fit for the Saab AI & Data Product Manager role. What verified skills, work history, projects, decisions, and evidence support fit? What is not evidenced? Use the role context from the linked Saab job listing and cite the repository files that support each material claim.
```

## Smoke-test answer

### Executive assessment

Marcus shows a credible partial fit for the product-judgment, workflow-design, AI-native execution, and regulated-process parts of the role. The repository does not prove that he has already owned a production AI/data platform or agentic system in a security-critical environment. That distinction should be tested in interview.

### Evidence-backed strengths

1. **Verified — product judgment and workflow design.** The Job-agent case study describes a reviewed workflow covering discovery, company research, application support, feedback, privacy/data rights, QA, deployment planning, telemetry, and billing decisions. It also records the choice to build a reviewed career workflow instead of an autonomous applier. Sources: `case-studies/JOB_AGENT_CASE_STUDY.md`, `PROJECT_PROOF_POINTS.md`, and `logs/DECISION_LOG.md`.

2. **Verified — AI-native workflow design.** The repository documents an operating model where AI supports research, synthesis, prototyping, evaluation, evidence capture, and recursive improvement while human review controls promotion and removal. Sources: `workflows/AI_OPERATING_MODEL.md`, `workflows/CLAUDE_CODEX_WORKFLOW.md`, and `proof/` documentation.

3. **Verified — product discovery and customer-centred analysis.** The career source records customer-journey, service-flow, requirements, prototyping, onboarding, adoption, target-group, and journey-mapping work across ChefNextDoor, the IoT product, Lendify, Murphy Bed, and other assignments. Source: `career-evidence/CAREER_EVIDENCE_SOURCE.md`.

4. **Verified — regulated-process and risk judgment.** The CV and career source state that Marcus handled SEB mortgage and construction-finance cases involving risk analysis, contract review, customer handling, process systems, and SwedSec licensing. This is relevant transferable evidence for working with controls and complex operational constraints. Sources: `CV.md` and `career-evidence/CAREER_EVIDENCE_SOURCE.md`.

5. **Verified — evidence discipline and quality gates.** The repository separates verified, planned, estimated, hypothesis, and open-question claims. It records privacy boundaries, test coverage, release validation, human gates, and explicit limitations. Sources: `AGENTS.md`, `logs/DECISION_LOG.md`, `case-studies/JOB_AGENT_CASE_STUDY.md`, and `tests/`.

### Partial fit or open questions

1. **Open Question — production AI/data product ownership.** The repository shows hands-on AI workflow prototyping and a sensor-and-app SaaS concept, but it does not prove ownership of a production AI/data platform at Saab-like scale.

2. **Open Question — agentic systems in safety-critical environments.** The repository discusses agentic workflows and human-gated automation. It does not evidence delivery of autonomous or cooperating AI components in defence, aerospace, sensors, underwater systems, or other safety-critical environments.

3. **Open Question — security requirements and clearance.** Privacy, data rights, security-aware household data access, and release controls are documented. The repository does not evidence defence-security clearance, classified-system work, formal safety-case work, or Saab-specific security processes.

4. **Needs Detail — roadmap and commercial accountability.** Product recommendations, prioritisation, business-model analysis, and product decisions are evidenced. Pricing, margin, profitability, measured adoption, and full commercial ownership remain open in the career source and project evidence.

5. **Needs Detail — technical depth.** The repository shows collaboration with code, tests, workflows, and product architecture. It does not establish the depth of data engineering, ML operations, model evaluation, platform architecture, or production observability expected for this specific role.

### Interview questions

1. Which AI or data product have you taken beyond prototype, and what did you personally own from problem framing through operation?
2. How would you define a human gate, evaluation method, and rollback path for an agentic system used in a high-consequence environment?
3. What security, safety, privacy, and data-governance constraints have you worked under, and which were your decision rights?
4. What measurable product or operational outcome resulted from your AI-native workflow work?
5. How deep is your hands-on experience with data pipelines, model evaluation, observability, and production incident handling?

## Evidence boundary check

| Check | Result |
|---|---|
| Repository searched beyond the CV | `Passed` |
| Employment evidence kept separate from portfolio decisions | `Passed` |
| Decision Log used for product/workflow judgment only | `Passed` |
| Saab-specific production, security, and agentic-system claims kept open | `Passed` |
| Unsupported metrics or outcomes invented | `No` |
| Anonymous ChatGPT retrieval tested | `No — Cloudflare blocked the fresh browser session` |

## Follow-up

Repeat this test in a real fresh ChatGPT session after the public branch is merged and deployed. Confirm that the assistant can retrieve `repository-interview-prompt.txt`, the recruiter guide, the public Decision Log, and the approved career evidence without local repository context.
