# Marcus Udén — proof of work

This repository contains the recruiter-first public proof-of-work edition for Marcus Udén and hands-on product roles.

The site leads with a concise hiring case. It then provides dated evidence, explicit maturity labels, and a guided Job-agent case study. The public edition is curated. It is not a mirror of a working repository.

## Current state

The repository is a local clean-room staging area. It has no remote and is not published. The intended public project is `marcus-uden-dev/ai-native-proof-of-work`, with `https://marcus.uden.dev` as the canonical site after approval and DNS validation.

## Hiring route

1. Read the two-minute hiring brief.
2. Inspect the Job-agent case study and synthetic company-research proof.
3. Download the sanitized English CV.
4. Request an interview through `marcus.uden.dev@gmail.com`.

The site describes Job-agent as work in progress, not live, not market-validated, and without measured market outcomes.

## Development

```text
npm ci
npm test
npm run release:validate
```

The static site will live under `site/`. The release validator checks file allowlisting, identity separation, private paths, credentials, product maturity wording, Git metadata, and binary privacy records.

## Publication boundary

Publication, GitHub Pages activation, and domain changes require explicit approval. The rollback method is an append-only revert commit to the last approved release.

CI uses read-only permissions for quality checks. Pages and identity-token permissions exist only in the deployment job, which runs after Quality succeeds. See `docs/RELEASE_RUNBOOK.md` for the release, temporary-host, rollback, and domain gates.
