# Public Incognito Guided Recruiter Smoke Test

## Execution record

- Date: 2026-08-27
- Method: unauthenticated HTTP retrieval with no sign-in, browser session, or cookies
- Guide followed: `https://marcus-uden-dev.github.io/ai-native-proof-of-work/recruiter-agent-guide.md`
- Report model followed: `https://marcus-uden-dev.github.io/ai-native-proof-of-work/recruiter-report-brief.md`
- Role input: synthetic Product Manager, Workflow and Operations brief in the paired `.prompt.txt` file
- Scope: public guide sources only; no general web search, local files, or non-public repositories
- Important limitation: this is a Codex public-source smoke test, not an observed run from a separate ChatGPT or Claude incognito session.

## Public-source access check

| Source | Result |
|---|---|
| Recruiter agent guide | HTTP 200 |
| Recruiter report brief | HTTP 200 |
| Public homepage | HTTP 200 |
| Job-agent proof | HTTP 200 |
| Recursive workflow proof | HTTP 200 |
| Release manifest | HTTP 200 |
| Public CV page (`/cv/`) | HTTP 404 |
| CV facts JSON (`/evidence/cv-facts.json`) | HTTP 404 |
| English CV PDF | HTTP 200, but not named in the live guide's allowed-source list |

## Smoke-test response

### 1. Role needs

The role needs a hands-on product manager who can structure ambiguous operational work, prioritise evidence, define small delivery scopes, work with AI without removing human judgment, and communicate trade-offs. It also requires evidence of professional experience, education, and language capability.

### 2. Evidence-backed matches

1. **Strong — workflow problem framing and product scope.** The Job-agent proof moves from a mixed queue of roles, saved work, stale items, and missing data into a prioritised next action. This supports the requirement to turn messy operational inputs into a clear product decision. [Job-agent proof](https://marcus-uden-dev.github.io/ai-native-proof-of-work/proof/job-agent/)

2. **Strong — evidence-led prioritisation.** The company-research flow records provenance and decision use for each field, then produces a pursue, investigate, or pass decision. This demonstrates a traceable approach to deciding what needs further work. [Job-agent proof](https://marcus-uden-dev.github.io/ai-native-proof-of-work/proof/job-agent/)

3. **Strong — AI-assisted work with human judgment.** The public profile describes AI as an accelerator for research, synthesis, prototyping, and validation while keeping evidence, trade-offs, and human decisions visible. The recursive-workflow proof adds a human gate before patterns become reusable infrastructure. [Homepage](https://marcus-uden-dev.github.io/ai-native-proof-of-work/), [recursive workflow proof](https://marcus-uden-dev.github.io/ai-native-proof-of-work/proof/recursive-workflow/)

4. **Moderate — quality and risk controls.** The public decision history describes bounded validation before expanding automation and a preference for verifiable committed evidence over stronger but unsupported claims. This supports an evidence-conscious delivery style, but it is not direct evidence of team-level quality ownership. [Decision log](https://marcus-uden-dev.github.io/ai-native-proof-of-work/evidence/decision-log.json)

### 3. Inferences that need interview validation

- The documented approach suggests Marcus may work effectively between product, operations, and technical colleagues. This is an inference from the workflow and decision artifacts, not direct evidence of cross-functional responsibility in a specific organisation.
- The public artifacts suggest clear written communication of uncertainty and trade-offs. Interview validation should test how this translates to stakeholder alignment, prioritisation conflicts, and delivery pressure.

### 4. Gaps or missing evidence

- **Professional history, education, and language capability: Not evidenced by the live guide's allowed source set.** The guide does not currently name a CV source. The public CV page and CV facts JSON returned HTTP 404 in this unauthenticated check. The English CV PDF was reachable but is not listed as an allowed source in the live guide, so this assessment did not rely on it.
- **Measured product outcomes: Not evidenced.** The release manifest states that Job-agent is work in progress, not market-validated, and has no measured market outcomes. [Release manifest](https://marcus-uden-dev.github.io/ai-native-proof-of-work/evidence/releases/job-agent-v1.json)
- **Real-company research data: Not applicable.** The release-one company and company-specific values are synthetic or inferred from synthetic inputs, so they cannot support claims about a real employer or market result. [Release manifest](https://marcus-uden-dev.github.io/ai-native-proof-of-work/evidence/releases/job-agent-v1.json)

### 5. Interview questions

1. Describe a real operational workflow you took from ambiguity to a prioritised product decision. What evidence changed your scope?
2. How do you decide what an AI-supported workflow may automate and where human review must remain?
3. Tell us about a trade-off you made between speed, evidence quality, and delivery risk.
4. How have you aligned operations, product, and technical stakeholders when they had different priorities?
5. Which parts of your professional experience and education are most relevant to this role, and what evidence would you bring to a recruiter screen?

### 6. Fit assessment

**Evidence-backed fit: Moderate to strong for workflow problem framing, evidence-led product judgment, and human-gated AI-assisted work.** Confidence is medium because the live public source route provides strong project and decision evidence but does not currently provide an allowed CV path for screening professional history, education, or languages. The next action is to publish the CV facts route and PDF reference, then rerun this smoke test against the live guide.

## Test observations for later analysis

1. The live guide did not trigger an irrelevant question about Marcus's identity or CV authenticity in this test response.
2. The live guide still has a closed source list and omits the CV materials needed for recruiter screening.
3. The locally updated draft guide fixes the instruction wording, but its CV routes are not yet available on the public site. A true incognito retest must occur after those changes are committed, pushed, and published.
