# Clickable Demo Portal

Status: Static / recruiter-safe demo

Open [index.html](index.html) directly in a browser.

Published public demo:

- [Proof-of-Work Demo Portal](https://theonedarkhorse.github.io/ai-native-proof-of-work-demo/)
- Public demo repo: [TheOneDarkHorse/ai-native-proof-of-work-demo](https://github.com/TheOneDarkHorse/ai-native-proof-of-work-demo)

The public repo intentionally contains only this static demo portal and required screenshot assets. The private proof-of-work evidence repository remains separate.

## Scope

- `job-agent`: clickable mock flow for jobs, discovery, job detail, company research, apply/CV assistant, feedback, privacy, and settings.
- `pkm`: lightweight knowledge feed, search, and source capture demo.
- `household-budget`: lightweight budget dashboard, liquidity, budget, and import-review demo.

## Data Rules

Every field that can be mistaken for evidence is labeled as one of:

- `public_source`
- `synthetic`
- `inferred_demo`

OpenAI and Anthropic are used as public-source example companies where official public pages support the claim. Salary, fit, score, warning flag, and financial KPI examples are synthetic unless explicitly labeled otherwise.
