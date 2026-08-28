# Public Incognito Recruiter Smoke Test — Zinova Product Manager

## Execution record

- Date: 2026-08-27
- Method: unauthenticated HTTP retrieval with no sign-in, browser session, or cookies
- Guide followed: `https://marcus-uden-dev.github.io/ai-native-proof-of-work/recruiter-agent-guide.md`
- Report model followed: `https://marcus-uden-dev.github.io/ai-native-proof-of-work/recruiter-report-brief.md`
- Role input: sanitized summary of the user-provided Zinova Product Manager advertisement in the paired `.prompt.txt` file
- Scope: public guide sources only; no general web search, local files, or non-public repositories
- Important limitation: this is a Codex public-source smoke test, not an observed run from a separate ChatGPT or Claude incognito session.

## Smoke-test response

### 1. Role needs

Zinova needs a hands-on Product Manager who can own financial products and the digital customer journey from strategy, customer problem, and pricing through prototype, requirements, launch, and measurable business results. The role also requires commercial and credit judgment, collaboration with risk and compliance functions, clear technical requirements, fast prioritisation, and Swedish and English communication.

### 2. Evidence-backed matches

1. **Strong — customer problem to decision-ready product flow.** The Job-agent proof turns discovery, company research, application tailoring, and interview preparation into a deliberate sequence of user decisions and next actions. This supports Zinova's need to make a complex customer journey clearer, although it is not evidence from financial products. [Job-agent proof](https://marcus-uden-dev.github.io/ai-native-proof-of-work/proof/job-agent/)

2. **Strong — evidence-led prioritisation and trade-offs.** The public research flow links provenance and decision use to each input, then produces a pursue, investigate, or pass outcome. The decision log also records an explicit preference for verifiable evidence over stronger but unsupported progress claims. This is relevant to product decisions where risk and uncertainty matter. [Job-agent proof](https://marcus-uden-dev.github.io/ai-native-proof-of-work/proof/job-agent/), [decision log](https://marcus-uden-dev.github.io/ai-native-proof-of-work/evidence/decision-log.json)

3. **Strong — AI-assisted prototyping with human judgment.** The public profile describes AI as support for research, synthesis, prototyping, and validation while keeping human decisions visible. The recursive workflow proof shows that promotion of repeated patterns requires human review. This aligns with Zinova's request for fast AI-assisted prototyping without uncontrolled automation. [Homepage](https://marcus-uden-dev.github.io/ai-native-proof-of-work/), [recursive workflow proof](https://marcus-uden-dev.github.io/ai-native-proof-of-work/proof/recursive-workflow/)

4. **Moderate — structured requirements and product-to-action thinking.** The Job-agent sequence makes the relationship between research, a decision, and a tailored next action visible. This suggests useful product-requirements discipline, but the public sources do not directly show formal business rules, acceptance criteria, or delivery ownership with an engineering team. [Job-agent proof](https://marcus-uden-dev.github.io/ai-native-proof-of-work/proof/job-agent/)

### 3. Inferences that need interview validation

- The evidence suggests Marcus may be effective at making complex financial or operational choices clearer for users, because the public work repeatedly structures ambiguous information into action. This is an inference; no public source shows Zinova-specific finance-product work.
- The visible human-review controls suggest a risk-aware approach that may transfer well to credit, compliance, and legal collaboration. Interview validation should test direct experience with regulated product decisions and formal controls.
- The prototype and decision artifacts suggest technical fluency and effective collaboration with developers, but the public source route does not directly demonstrate leading a delivery team from requirements through production launch.

### 4. Gaps or missing evidence

- **Business lending, SME financing, credit products, and credit quality: Not evidenced by the live guide's allowed source set.** The public release-one company is synthetic and cannot support real finance-domain claims. [Release manifest](https://marcus-uden-dev.github.io/ai-native-proof-of-work/evidence/releases/job-agent-v1.json)
- **Pricing, margin management, product packaging, and commercial results: Not evidenced.** The release manifest states that Job-agent is work in progress, not market-validated, and has no measured market outcomes. [Release manifest](https://marcus-uden-dev.github.io/ai-native-proof-of-work/evidence/releases/job-agent-v1.json)
- **Professional experience, education, Swedish, and English: Not evidenced by the live guide's allowed source set.** The guide does not currently list the public CV PDF, a CV facts page, or a CV facts JSON source. The paired public-source availability check found that the live `/cv/` page and `/evidence/cv-facts.json` returned HTTP 404.
- **Launch ownership, production metrics, and outcomes: Not evidenced.** The evidence demonstrates a prototype and decision model, not a live product with measured conversion, margin, volume, customer satisfaction, or credit-quality results. [Release manifest](https://marcus-uden-dev.github.io/ai-native-proof-of-work/evidence/releases/job-agent-v1.json)

### 5. Interview questions

1. Tell us about a financial, lending, or regulated product you helped shape. What customer problem, risk constraint, and business outcome guided the decision?
2. How would you design a small-business financing journey from first interest through application, decision, funding, and self-service follow-up?
3. Describe a time when pricing, margin, customer value, and risk pointed in different directions. How did you decide what to prioritise?
4. Show how you turn a prototype into requirements, business rules, acceptance criteria, and a test plan that an engineering team can use.
5. Which parts of your professional background, education, and Swedish/English communication best support this role, and what evidence should a recruiter review?

### 6. Fit assessment

**Evidence-backed fit: Moderate for the product-judgment, workflow-design, evidence-discipline, and AI-assisted-prototyping aspects of the role.** Confidence is medium-low because the most important domain and screening requirements — SME finance, lending, credit, pricing, commercial outcomes, regulated delivery, professional history, education, and languages — are not available through the live guide's allowed public source set. The public portfolio supports an exploratory recruiter conversation, but a CV-grounded screening review and direct interview validation are necessary before assessing fit for Zinova's core financing-product mandate.

## Test observations for later analysis

1. The response follows the live guide's evidence, inference, gaps, interview-question, and fit-assessment structure.
2. It does not introduce irrelevant doubts about Marcus's identity or the authenticity of the CV.
3. The response is necessarily conservative on Zinova's central finance-domain requirements because the live guided route does not yet include publishable CV evidence.
4. The local draft guide includes CV routes and a recruiter-perspective rule, but those routes are not live. Repeat this exact fixture after the updated guide and CV evidence are published.

## Post-run factual correction

The user clarified after this smoke test that Marcus worked with credits at SEB, mainly on the private side. The current local CV records mortgage and construction-loan work, including risk analysis and contract review. This does not prove direct SME-financing or commercial-lending equivalence for the Zinova role, but it does mean the smoke test must not be read as saying Marcus lacks lending or credit experience.

The correct diagnosis is a guided-source routing gap: the live public guide did not make the CV evidence available to the incognito assessment. This post-run correction is not retroactive evidence available to the original smoke-test run; it identifies what the public CV route must expose and what the rerun must assess.
