# Marcus Udén — proof of work

This repository contains the recruiter-first public proof-of-work edition for Marcus Udén and hands-on product roles.

The site leads with a concise hiring case. It then provides dated evidence, explicit maturity labels, and a guided Job-agent case study. The public edition is curated. It is not a mirror of a working repository.

## Current state

This is a public, recruiter-shareable repository. It is the curated evidence layer around product work, not a mirror of every working file or a claim that a product is released or market-validated.

Use the GitHub repository directly. The recruiter route does not require a custom domain or a separate public website.

## Hiring route

1. Start with [the recruiter agent guide](RECRUITER_AGENT_GUIDE.md) for a guided, evidence-bound review.
2. Read [the two-minute hiring brief](RECRUITER_ONE_PAGER.md).
3. Inspect [the Job-agent case study](case-studies/JOB_AGENT_CASE_STUDY.md) and the [evidence matrix](EVIDENCE_MATRIX.md).
4. Download [the sanitized English CV](site/assets/cv/marcus-uden-cv.pdf).
5. Request an interview through `marcus.uden.dev@gmail.com`.

The site describes Job-agent as work in progress, not live, not market-validated, and without measured market outcomes.

## Development

```text
npm ci
npm test
npm run release:validate
```

The `site/` directory contains release assets and is not part of the current recruiter reading path. The release validator checks file allowlisting, identity separation, private paths, credentials, product maturity wording, Git metadata, and binary privacy records.

## Publication boundary

GitHub Pages activation and domain changes require explicit approval. The rollback method is an append-only revert commit to the last approved release.

CI uses read-only permissions for quality checks. Pages and identity-token permissions exist only in the deployment job, which runs after Quality succeeds. See `docs/RELEASE_RUNBOOK.md` for the release, temporary-host, rollback, and domain gates.
