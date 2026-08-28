# Todo: Replace “Profile Oracle” with a repository interview surface

Status: `Planned`  
Priority: `High`  
Owner: Marcus + Codex

## Why

“Profile Oracle” sounds like a static profile or an authority that speaks for Marcus. The intended experience is different: a recruiter or collaborator should be able to understand how the work was reasoned about, read the continuous decision history, and optionally ask questions about the evidence in the repository.

The public profile is the human-facing career and recruiter summary. The public proof repository is the searchable evidence and project context for an agent. The interactive surface helps an agent answer questions from that repository; it does not replace the profile or become a second CV.

## Settled architecture decision

Use a two-channel model:

- **Human channel:** the recruiter reads the public profile for the career story and summary.
- **Agent channel:** an agent searches the public proof repository for decisions, project evidence, work history, and source boundaries.

The first interactive implementation should be prompt-first: generate a provider-neutral prompt that an agent can use against the public repository. Direct in-page answers through an API are deferred until the prompt-first flow proves useful and the privacy, cost, citation, and abuse controls are designed.

## Proposed information architecture

### 1. Static surface: Decision Log

Use the existing decision log as the public, human-readable record of meaningful product, workflow, and architecture decisions.

Proposed copy:

> Learn how I think through my continuous decision log.

Alternative:

> See how decisions, trade-offs, evidence, and open questions accumulate over time.

### 2. Interactive surface: Ask the Repository

Use `Ask the Repository` as the working name for the question-and-answer experience.

Proposed copy:

> Ask a question about the work. Get an evidence-linked answer from the public repository.

Alternative name: `Repository Interview`.

Avoid using `Oracle` in public-facing headings, navigation, copy, or page titles.

### Live page audit finding

The current published recursive-workflow page still contains these stale public labels:

- `Oracle detail`
- `What this profile can answer.`
- `The Decision Log is the detailed, public Oracle view.`
- `Decision Log Oracle detail`

Replace them with the settled information architecture:

- `Decision Log`
- `Learn how I think through my continuous decision log.`
- `Ask the Repository`
- `Ask questions about skills, work history, projects, decisions, evidence, and open questions.`

The public-page source was located in the canonical public repository: `site/proof/recursive-workflow/index.html`, with the homepage prompt in `site/index.html` and the recruiter guidance in `site/recruiter-agent-guide.md`. The live page still requires a commit and push from that source checkout before the change is published.

### Repository-interview prompt contract

The generated prompt must state that the recruiter can ask the repository questions about Marcus’s:

- skills and capabilities;
- work history and domain experience;
- projects and product work;
- decisions, trade-offs, and working methods;
- evidence boundaries, gaps, and open questions.

The prompt must instruct the assistant to search the public repository, cite file paths or public links, separate verified evidence from interpretation, and say when the repository does not support an answer. It must not imply that the repository replaces the human-readable profile or that every career claim is proven by the repository.

Suggested prompt framing:

> You are interviewing Marcus’s public proof repository. A recruiter may ask about his skills, work history, domain experience, projects, decisions, working methods, and evidence. Search the repository before answering, cite the relevant public files or links, distinguish verified evidence from interpretation, and state clearly when the repository does not support a claim.

## Feasibility options

### Option A — Prompt-first, selected first slice

Create a copyable prompt that includes the public repository URL, reading instructions, evidence boundaries, and the user’s question.

Expected flow:

1. Reader enters or selects a question.
2. The page creates a provider-neutral repository-interview prompt.
3. Reader copies it into ChatGPT, Claude, or another assistant.
4. The assistant answers from the public repository and links its evidence.

Benefits: reversible, low cost, no API key, no server-side user data, and compatible with ChatGPT Inkognito when the repository is publicly reachable.

Limitation: the answer does not appear directly on the page.

### Option B — API-backed search field

Create a search field that sends the question to a controlled backend or retrieval service and renders an answer with repository links and evidence labels.

Required investigation:

- Which model/API and account boundary are permitted?
- How are repository documents indexed and refreshed?
- How are prompt injection, unsupported claims, rate limits, cost, and abuse handled?
- How are citations and source snippets rendered?
- What data is retained, and can the page operate without storing personal questions?

Important constraint: a public page cannot reliably submit a question to a user’s ChatGPT Inkognito browser session. Direct in-page answers require an API-backed service or another explicitly supported connector.

### Option C — Later hybrid

Launch the prompt-first flow and add an API-backed answer field later if the interaction proves useful and the privacy/cost boundary is acceptable.

## Acceptance criteria

- [ ] No public-facing page, navigation label, artifact name, or copy calls the experience “Profile Oracle”.
- [ ] The static decision history uses `Decision Log` and the continuous-thinking copy is tested.
- [ ] The interactive concept uses `Ask the Repository` or `Repository Interview` consistently.
- [ ] A provider-neutral prompt can be generated from a question and the public repository URL.
- [ ] The prompt instructs the assistant to cite repository evidence, separate evidence classes, and mark uncertainty.
- [ ] The prompt-first route works without a private API key or server-side question storage.
- [ ] API-backed search remains explicitly deferred until the prompt-first flow and its evidence boundary are validated.
- [ ] The experience does not replace the public profile or make unsupported career claims.

## Initial implementation scope

1. Inventory all public-facing `oracle` labels, links, titles, smoke records, and prototypes.
2. Rename or rewrite public-facing copy to `Decision Log` and `Ask the Repository`.
3. Draft the provider-neutral repository-interview prompt.
4. Add a static prompt-generation prototype with a copy button if the public-site source is available.
5. Run a small question set covering project decisions, work history, evidence boundaries, and open questions.
6. Reassess whether an API-backed field is justified after the prompt-first test; do not add it to the first slice by default.

## Open decisions

- Final interactive name: `Ask the Repository` or `Repository Interview`.
- Whether “continuous decision log” is the primary copy or supporting copy.
- Whether a later release should show answers directly after the prompt-first flow has been validated.
- Whether the public repository is the only retrieval source, or whether a separate reviewed index is needed.
