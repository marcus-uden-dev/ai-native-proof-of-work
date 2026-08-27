# Local Draft Recruiter Smoke Test — Zinova Product Manager

## Execution record

- Date: 2026-08-27
- Method: unauthenticated HTTP retrieval from the local static site with no sign-in, browser session, or cookies.
- Guide followed: `recruiter-agent-guide.md`.
- Report model followed: `recruiter-report-brief.md`.
- Role input: sanitized summary in the paired `.prompt.txt` file.
- Scope: guided public-source route only. No general web search, local CV source files, or non-public repositories were used as assessment evidence.
- Important limitation: this verifies the local draft route. It is not an observed run from ChatGPT or Claude against the deployed public site.

## Source-access result

- `200` — recruiter agent guide
- `200` — recruiter report brief
- `200` — CV facts page
- `200` — CV facts JSON
- `200` — English CV PDF
- `200` — Job-agent proof
- `200` — recursive workflow proof

## Smoke-test response

### 1. Executive summary

- **Evidence-backed fit: Moderate.** Marcus has relevant product-workflow and financial-services evidence, with a clear limitation on direct SME-finance equivalence.
- **Strongest match: Credit and risk context.** The public CV sources record SEB mortgage and construction-finance work with risk analysis and contract review.
- **Strongest match: Product judgment and AI-assisted workflow design.** The public proof shows structured research, trade-offs, and human-gated AI support.
- **Main gap: Direct SME product ownership, pricing, margin, and measured credit-product outcomes require interview validation. Confidence: medium.**

### 2. Role needs

Zinova needs a hands-on Product Manager who can own financial products and digital customer journeys. The role needs product strategy, customer research, credit understanding, pricing and packaging judgment, AI-assisted prototyping, clear requirements, collaboration with risk and compliance, and measurable commercial results for Swedish small and medium-sized businesses.

### 3. Evidence-backed matches

1. **Strong — related credit, risk, and contract experience.** The CV facts source records work at SEB Construction Loans and SEB Mortgages and Construction Loans. The listed scope includes construction finance, mortgage and construction-finance cases, risk analysis, and contract review. This is relevant evidence for Zinova's credit and regulated-finance context. It is not direct evidence of SME or commercial lending. [CV facts JSON](https://marcus-uden-dev.github.io/ai-native-proof-of-work/evidence/cv-facts.json), [English CV PDF](https://marcus-uden-dev.github.io/ai-native-proof-of-work/assets/cv/marcus-uden-cv.pdf)

2. **Strong — structured product decisions under uncertainty.** The Job-agent proof connects research inputs, provenance, decision use, and a pursue, investigate, or pass outcome. This supports Zinova's need for prioritisation and customer-journey decisions where uncertainty and risk matter. [Job-agent proof](https://marcus-uden-dev.github.io/ai-native-proof-of-work/proof/job-agent/)

3. **Strong — AI-assisted prototyping with human controls.** The public workflow evidence describes AI support for research, synthesis, prototyping, and validation while keeping human decisions and promotion controls visible. This is relevant to Zinova's AI-assisted prototyping need. [Recursive workflow proof](https://marcus-uden-dev.github.io/ai-native-proof-of-work/proof/recursive-workflow/)

4. **Moderate — Swedish and English communication.** The structured CV facts list Swedish and English at native level. [CV facts JSON](https://marcus-uden-dev.github.io/ai-native-proof-of-work/evidence/cv-facts.json)

### 4. Inferences that need interview validation

- The SEB credit and risk experience may transfer well to a regulated SME-finance product context. This is an inference because the public sources do not show direct SME or commercial lending ownership.
- The product evidence suggests Marcus can turn a complex customer problem into a clear flow and next action. Interview validation should test ownership across roadmap, requirements, engineering delivery, and launch.
- The public materials suggest a risk-aware approach. Interview validation should test practical collaboration with credit, compliance, legal, and risk functions.

### 5. Gaps or missing evidence

- **Direct SME or commercial lending: Not evidenced by the current public source route.** The CV documents related private-side mortgage and construction-finance experience. It does not establish direct SME or commercial lending equivalence.
- **Pricing, packaging, margin, conversion, volume, and credit-quality outcomes: Not evidenced by the current public source route.** The Job-agent release remains work in progress, not market-validated, and has no measured market outcomes. [Release manifest](https://marcus-uden-dev.github.io/ai-native-proof-of-work/evidence/releases/job-agent-v1.json)
- **End-to-end financial-product launch ownership: Not evidenced by the current public source route.** The public product proof demonstrates workflow and decision design. It does not prove production ownership of a lending product through launch and measured outcomes.

### 6. Interview questions

1. Which private-side mortgage or construction-finance cases at SEB required the most risk and contract judgment, and how did you make the decision clear for the customer?
2. What evidence would you need before transferring experience from mortgage and construction finance to a small-business financing journey?
3. Describe a product decision where customer value, risk, compliance, and commercial economics pointed in different directions.
4. How do you translate a prototype into business rules, acceptance criteria, and delivery-ready requirements?
5. Which direct experience do you have with pricing, packaging, margin, conversion, volume, or credit-quality metrics?

### 7. Fit assessment

**Evidence-backed fit: Moderate for regulated product judgment, customer-workflow design, AI-assisted prototyping, Swedish and English communication, and related private-side credit experience.** The rerun improves on the prior assessment because the guided route now exposes the SEB credit, mortgage, construction-finance, risk-analysis, and contract-review evidence. Confidence remains medium because Zinova's direct SME-finance, commercial lending, pricing, and measured-outcome requirements need specific interview validation.

## Improvement against the pre-fix smoke test

1. The required CV sources were available through the guided route instead of returning `404` or being excluded from the guide.
2. The assessment identified related SEB credit experience instead of treating it as absent.
3. The assessment kept the correct distinction between related private-side credit work and direct SME or commercial lending.
4. The test did not raise identity or CV-authenticity concerns.
