# Interview Talking Points

Last updated: 2026-05-31
Status: Active / Project-focused

## 1. Job-agent as the lead proof point

The strongest example is job-agent: a career workflow product that touches CV work, job discovery, application support, feedback, privacy/data rights, QA, deployment planning, telemetry, and billing decisions.

## 2. AI as an operating layer

I do not treat AI as a content shortcut. I use it as a layer for structuring product work, extracting decisions, reducing repeated effort, and turning execution into reusable artifacts.

## 3. Proof of work over vague claims

The portfolio repository is built around evidence: what was built, what changed, what tradeoff was made, what was tested, and what still needs validation.

Current verified examples: job-agent, PKM, and household budget app are identified in internal source indexes, and the portfolio evidence scaffold was committed as `1c74a04`.

## 4. Claude + Codex split

Claude is strongest for reasoning, synthesis, strategy, and evaluation. Codex is stronger for repository execution, file updates, and keeping documentation structured.

## 5. Documentation as compounding asset

Weekly logs, decision trails, and architecture docs make work easier to reuse in CVs, recruiter conversations, portfolio notes, and interviews.

## 6. Practical automation

The goal is not full autonomy. The goal is to automate repeatable work around real projects while keeping human review on important decisions.

## 7. Product + architecture thinking

The portfolio docs connect project-level proof points, value propositions, business models, pricing hypotheses, GTM questions, architecture notes, ingestion, and recursive workflows without treating the docs as the product.

## 8. Privacy-aware workflow design

Sensitive information is excluded, redacted, or generalized before anything becomes recruiter-facing.

## 9. Source separation

I keep Codex execution evidence, Claude planning evidence, and shared skills/workflow infrastructure separate so claims can be traced to the right kind of source.

## 10. Reproducible handoff discipline

For the lead project, I keep a recruiter-safe install and LLM handoff guide current and re-check it against the actual source repo so the setup path does not drift into guesswork. A concrete recent example was separating Docker Compose defaults from the manual startup/OAuth port contract after the source repo made that distinction explicit.
