# Repository Interview Prompt Generator

Status: Decision update — API feasibility assessed; implementation not started
Date: 2026-08-30
Scope: Public recruiter-facing website

## Objective

Replace the current static AI-review block with a recruiter-friendly Repository Interview experience. A recruiter or hiring manager should be able to ask a question about Marcus or paste a complete job description, generate a ready-to-use prompt locally in the browser, inspect it, and either copy it into an assistant or receive a repository-grounded answer on the same page through a protected API route.

The prompt-first version must work without an AI API, backend, authentication, tracking, or automatic submission of recruiter input. A later same-page answer flow may use a protected server-side API route; it must not call a model directly from browser JavaScript.

## Existing constraints

- Read and follow `AGENTS.md` and `DESIGN.md` before implementation.
- Inspect the current public site HTML, CSS, JavaScript, `site/repository-interview-prompt.txt`, and `docs/prototypes/profile-decision-timeline-preview-v2.html` before editing.
- Preserve the existing editorial, evidence-first visual language.
- Do not introduce chatbot, AI-SaaS, neon, glow, avatar, or decorative UI patterns.
- Do not alter evidence claims or add new recruiter capability claims.
- Do not publish or deploy as part of this change.
- The `profile-editorial-proof` library folder is not yet present. The preview may use the verified proposal styling, but implementation should confirm the canonical design source before coding.

## Proposed recruiter experience

Use this hierarchy:

1. Kicker: `Repository interview`
2. Heading: `Good work leaves a trail of evidence.`
3. Supporting heading: `See how Marcus thinks, decides and executes.`
4. Short explanation: the recruiter can ask about Marcus's project, decision, or claim, or paste the role they are hiring for.
5. One clear textarea labelled `Ask a question or paste a job description`.
6. Primary action: `Generate interview prompt`.
7. Result state with `Interview prompt about Marcus`, a readable selectable prompt area, `Copy prompt`, and a short explanation that the prompt can be pasted into ChatGPT, Claude, Gemini, or another assistant.
8. Optional restrained `Start over` or `Clear` action.

The input must support both a short question and a complete job description. Example starters may populate the textarea but must not submit or navigate automatically. Include these starters: Automation judgment, Prioritization, Research judgment, Execution, Decision making, Human + AI, Reusable systems, and Risk & governance. Do not include an `Evidence gaps` starter.

## Gemini API feasibility assessment — 2026-09-05

**Decision:** Gemini remains viable for a later same-page answer flow, but Groq is the recommended first alternative to test. Both must pass the same quota, citation, privacy, and abuse checks. Neither is a reason to remove the prompt-first fallback.

Google documents a Gemini API free tier with free input and output tokens for selected models, but access and rate limits vary by model and project. The free tier also states that content may be used to improve Google's products. This means “free” should be treated as a bounded prototype tier, not as unlimited or automatically suitable for recruiter-submitted private job descriptions.

The same-page flow is technically feasible with this shape:

```text
Recruiter page → protected /api/repository-interview route → Gemini API
                         ↓
              allowlisted public evidence sources
```

The API key must stay server-side. Google explicitly advises against exposing keys in client-side production code and recommends a backend proxy. A serverless function, Azure Function, or equivalent route can keep the key in an environment secret while the static page remains the recruiter-facing surface.

Recommended first implementation when the public-site source is available:

1. Keep local prompt generation and copy as the no-API fallback.
2. Add one rate-limited server-side endpoint for a short recruiter input.
3. Retrieve only an allowlisted, reviewed snapshot of the public repository or selected Markdown files. Do not give the model arbitrary repository or network access.
4. Require third-person answers about Marcus, evidence labels, file/section citations, and an explicit unsupported-claim response.
5. Return the answer and citations on the same page; do not store recruiter input by default.
6. Start with a low-cost text model and verify the exact model quota in AI Studio before making a cost claim.

Do not start with a persistent File Search store. It may be useful later, but it adds ingestion, refresh, deletion, and citation-management work. A bounded reviewed evidence snapshot is easier to test against the repository's existing evidence contract and keeps the first implementation reversible.

Key constraints:

| Constraint | Consequence | Required control |
|---|---|---|
| Free tier is quota-limited and model-dependent | It can stop or throttle without warning | Show a graceful fallback to copyable prompt; monitor quota |
| Free-tier content may be used to improve products | Recruiters may paste personal or confidential role data | Warn against sensitive input, or use a paid tier with the required privacy boundary |
| Browser-side keys are extractable | A public page could be abused against the project quota | Use a server-side secret, rate limits, origin checks, and abuse limits |
| Model answers can overstate evidence | A fluent answer is not proof | Send only reviewed sources and enforce citations/evidence labels |
| Repository content changes | Cached context can become stale | Version the snapshot and display its evidence date |

Sources: [Gemini pricing](https://ai.google.dev/gemini-api/docs/pricing), [rate limits](https://ai.google.dev/gemini-api/docs/rate-limits), [API key security](https://ai.google.dev/gemini-api/docs/api-key), and [File Search](https://ai.google.dev/gemini-api/docs/file-search). Verified against the official documentation on 2026-09-05.

### Other free API candidates

| Candidate | Current free access | Fit for this repository question | Assessment |
|---|---|---|---|
| **Groq** | Free-plan limits are published per model; the current table lists 30 RPM, 1,000 RPD, 8K TPM, and 200K TPD for `openai/gpt-oss-120b` | Fast text generation through an OpenAI-compatible API; needs our own evidence retrieval and citations | **Best first alternative** for a small Azure/serverless endpoint |
| **Cerebras Inference** | Free tier; current documentation lists 30 RPM, 14.4K RPD, 64K TPM, and 1M TPD for `gpt-oss-120b` | Very fast and suitable for short, retrieved evidence packets; quotas can change and some popular models have temporarily reduced free limits | **Strong second candidate** |
| **OpenRouter** | Free models are available, but the default limit is 50 free-model requests/day; 1,000/day requires at least $10 in purchased credits | Excellent for comparing models through one OpenAI-compatible API; ZDR/provider controls are useful, but free-model availability is variable | **Best evaluation router, not the primary public dependency** |
| **Cloudflare Workers AI** | 10,000 Neurons/day free; some models require a paid billing method | Good if the same site already runs on Cloudflare Workers/Pages Functions; less natural if Azure hosts the route | **Good hosting-aligned option only if Cloudflare is already in use** |
| **Mistral** | Free mode enables API access without a credit card, with limited usage and rate limits; most general model pricing is paid | Easy to test and has RAG features, but the free allowance is less clearly suited to a public endpoint | **Smoke-test candidate** |
| **Hugging Face Inference Providers** | Free users receive $0.10/month in credits, subject to change | Useful for testing many models, but too small and variable for a public recruiter endpoint | **Not suitable as the main service** |

GitHub Models is not a viable fallback: GitHub documents that the playground, model catalog, inference API, and BYOK service were retired on 2026-07-30.

None of these providers automatically creates trustworthy citations for this repository. The application still needs a reviewed retrieval layer: an allowlisted evidence index plus selected Markdown excerpts, with file and section references returned alongside the answer. The provider should therefore be an adapter behind the same endpoint, for example `LLM_PROVIDER=groq`, with Gemini and Cerebras available for controlled comparison.

Sources: [Groq rate limits](https://console.groq.com/docs/rate-limits), [Cerebras rate limits](https://inference-docs.cerebras.ai/support/rate-limits), [OpenRouter free-model limits](https://openrouter.ai/docs/faq), [OpenRouter privacy controls](https://openrouter.ai/docs/guides/features/zdr), [Cloudflare Workers AI pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/), [Mistral free mode](https://docs.mistral.ai/getting-started/quickstarts/studio/activate-and-generate-api-key), [Hugging Face pricing](https://huggingface.co/docs/inference-providers/pricing), and [GitHub Models retirement](https://docs.github.com/en/github-models). Verified against official documentation on 2026-09-05.

## Prompt generation

Use one canonical Repository Interview prompt. First reconcile `site/repository-interview-prompt.txt` with the current Repository Interview prompt before implementation. Do not create a third divergent version.

The evidence contract must remain intact:

- use the public proof repository as the reference;
- cite the relevant repository file and section or public link;
- label evidence as Verified, Estimated, Planned, Hypothesis, Open Question, or Needs Review;
- separate employment evidence, persona/context evidence, and portfolio decision evidence;
- distinguish source statements from interpretation;
- state when the repository does not support a claim;
- do not invent duties, metrics, outcomes, seniority, or domain experience;
- do not use private paths, raw sessions, secrets, or unsupported claims.

The smallest semantic template change is to use `Recruiter input:` instead of `Recruiter question:` so the same template accepts either a question or a job description.

Implementation model:

```text
canonical prompt template + recruiter input = generated prompt
```

Treat textarea content as text. Never insert it as HTML. Keep the generated prompt fully selectable if clipboard access fails.

## Client-side behavior

- No network request when the recruiter types or generates a prompt.
- Empty input shows clear inline feedback and does not generate a meaningless prompt.
- Short questions, long job descriptions, Swedish characters, and special characters remain intact.
- The generated prompt is visible before copying.
- Copy feedback uses an accessible live region.
- A copy failure provides a manual selection fallback.
- The static explanation and a link to the canonical `.txt` prompt remain useful when JavaScript is unavailable.
- State should be structured so a later `Ask → AI response` flow can replace generation without redesigning the whole section.

## Visual treatment

Use the existing public site design system and the approved editorial direction:

- restrained editorial layout;
- existing warm paper, ink, gold, and teal palette;
- Georgia/serif display type, Inter/system sans body type, and IBM Plex Mono for the prompt;
- no chips in the left editorial column;
- two clear GitHub links near the left-side action area: GitHub profile and proof repository;
- corrected contrast and semantic colors for the chips/buttons beside GitHub profile and Copy prompt;
- minimum 44px interaction targets;
- visible keyboard focus states;
- responsive stacking below 760px;
- prompt viewport with a fixed maximum height and `overflow-y: auto`;
- no oversized rounded SaaS card or shadow-heavy treatment.

## Files expected to change during implementation

- `site/index.html`: replace the current `#ai-review` section, add the textarea/result states, prompt fallback link, GitHub links, and related CTA/navigation copy if needed for consistency.
- `site/assets/css/site.css`: add the editorial generator, result state, scroll viewport, responsive layout, focus state, and corrected chip/button colors using existing tokens.
- `site/assets/js/site.js`: add local prompt generation, reset behavior, safe text insertion, copy behavior, and accessible status feedback. Reuse existing copy conventions where possible.
- `site/repository-interview-prompt.txt`: update only if reconciliation confirms it is the canonical source and the newer evidence contract should replace its current content.
- Relevant contract/E2E tests: cover generation, evidence-contract preservation, links, copy behavior, empty input, long input, special characters, keyboard use, mobile layout, and JavaScript-disabled fallback.

## Explicitly out of scope for this implementation slice

- Implementing the API route, backend, authentication, or API-key UI.
- Calling Gemini or another model directly from browser JavaScript.
- Automatic submission of recruiter questions or job descriptions.
- Tracking or analytics.
- Private repositories, identities, or local source paths in public output.
- Redesign of unrelated homepage sections.
- Publishing, deployment, Pages, DNS, or release changes.

## Validation plan

Run the repository-required checks after implementation:

```text
npm ci
npm run test:contracts
npm run test:e2e
npm run release:validate
git diff --check
```

Also inspect the final page at desktop and below 760px as a recruiter. Confirm that the user can understand the workflow in 5–10 seconds, generate a prompt, copy the complete result, and continue with follow-up questions in their chosen assistant.

## Acceptance criteria

The implementation is complete when a non-technical recruiter can:

1. discover that a question or job description can be entered;
2. paste a complete job description without truncation;
3. generate a prompt locally;
4. see the complete generated prompt before copying;
5. copy the complete prompt;
6. understand where to paste it and that follow-up questions are supported;
7. see that the assistant should use Marcus's public evidence rather than unsupported profile claims;
8. use the feature with keyboard navigation and on a narrow screen;
9. still understand the purpose and find the canonical prompt when JavaScript is disabled.
