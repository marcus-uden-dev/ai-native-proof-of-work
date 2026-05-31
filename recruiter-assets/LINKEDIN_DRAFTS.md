# LinkedIn Drafts

Last updated: 2026-05-31
Status: Drafts / Not published

## Draft — 2026-05-09

### Topic

Turning project work into proof of work.

### Draft

A lot of useful product work disappears into places nobody can evaluate later:

- chats
- notes
- local project folders
- tests
- implementation plans
- task outputs
- handoff docs

I’m building a private portfolio evidence repository to solve that for my own project portfolio.

The goal is not to make the documentation layer the product story.

The goal is to make real projects easier to evaluate:

```text
Project work
→ decision captured
→ test or evidence linked
→ tradeoffs documented
→ recruiter/portfolio/interview reuse
```

The lead proof point is a job-agent career workflow product. Supporting proof points include a PKM system and a household budget app.

The repository is Markdown-first, GitHub-readable, and built around evidence labels.

Claims are marked as verified, estimated, planned, open questions, decisions, or hypotheses.

That matters because AI-assisted work can easily become vague. The useful part is not hype. It is better structure, better review, and lower friction between building the work and showing the work.

### Proof Point Used

Project-first proof-of-work repositioning with job-agent as lead evidence.

### Claim Risk

Low

### Evidence

Verified by the committed private repository scaffold and internal project source indexes. Keep the post unpublished until the repo is reviewed for sharing and any private context is removed.

## Draft — 2026-05-24

### Topic

Why a lead-project handoff guide matters in a proof-of-work repo.

### Draft

One failure mode in AI-assisted product work is that the story gets cleaner while the setup path gets fuzzier.

That is a bad trade if you want another person to evaluate the work seriously.

This week I tightened the handoff layer for the lead project in my proof-of-work repo by re-checking the actual source tree instead of trusting memory:

- env examples
- compose setup
- Makefile commands
- package metadata
- backend requirements
- migration tree
- agent entry files

The useful outcome is not "more docs."

It is less drift between:

```text
what the portfolio claims
and
what the source repo actually supports
```

That is one of the most practical uses of AI in documentation work:

- reduce repeated verification effort
- keep claims attached to real files
- make handoff reproducible
- show uncertainty when something cannot be verified

### Proof Point Used

Source-verified `job-agent` install and LLM handoff update on 2026-05-24.

### Claim Risk

Low

### Evidence

Verified by the updated `case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md`, weekly log, and direct source-file inspection. Keep unpublished unless the linked repo artifacts remain privacy-safe.

## Draft — 2026-05-31

### Topic

Why setup truth matters more than a clean architecture story.

### Draft

A common failure mode in documentation-heavy product work is that the story gets cleaner while the startup contract gets less true.

This week I tightened the lead-project handoff again by checking the source repo's actual ops docs instead of flattening everything into one generic "run it locally" story.

The useful nuance:

- Docker Compose still exposes one frontend port
- the manual dev startup contract uses another
- OAuth callback routing only works if you treat that difference as real

That is exactly the kind of detail that separates:

```text
documentation that sounds plausible
from
documentation another person can actually use
```

AI is useful here when it helps keep claims anchored to the source tree, not when it smooths over the sharp edges.

### Proof Point Used

Source-verified `job-agent` startup-contract and LLM handoff refresh on 2026-05-31.

### Claim Risk

Low

### Evidence

Verified by the updated `case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md`, weekly log, and direct inspection of the source repo's `docs/operations/current-status.md`, `docs/operations/llm-handoff.md`, and `docs/operations/job-agent-startup-skill-handoff.md`.
