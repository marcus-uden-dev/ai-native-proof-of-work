# Marcus Udén — proof of work

This repository contains the recruiter-first public proof-of-work edition for Marcus Udén and hands-on product roles.

The site leads with a concise hiring case. It then provides dated evidence, explicit maturity labels, and a guided Job-agent case study. The public edition is curated. It is not a mirror of a working repository.

## Current state

This is the professional public repository for `marcus-uden-dev/ai-native-proof-of-work`. The site is published on GitHub Pages at `https://marcus-uden-dev.github.io/ai-native-proof-of-work/`. The custom domain `https://marcus.uden.dev` is not active yet. It contains the curated static site and a staged migration of project strategy and case-study evidence from the earlier proof-of-work archive. It is a public, recruiter-shareable evidence layer around product work, not a mirror of every working file or a claim of public product availability, market validation, adoption, or measured outcomes.

The migration is content-only. The earlier repository history is not imported. See [release/migration-manifest.json](release/migration-manifest.json) for the staged file boundary. The recruiter route does not require a custom domain or a separate public website.

## Project evidence

- [Project proof points](PROJECT_PROOF_POINTS.md)
- [Project status](PROJECT_STATUS.md)
- [Earned Signal case study](case-studies/JOB_AGENT_CASE_STUDY.md)
- [PKM case study](case-studies/PKM_CASE_STUDY.md)
- [Household budget app case study](case-studies/HOUSEHOLD_BUDGET_CASE_STUDY.md)

## Hiring route

1. Read the two-minute hiring brief.
2. Inspect the Job-agent case study and synthetic company-research proof.
3. Download the sanitized English CV.
4. Request an interview through `marcus.uden.dev@gmail.com`.

The site describes Earned Signal (formerly Job-agent) as released to an invite-only closed beta on 2026-11-24. The first invited tester signed in and accepted the current terms. This is controlled external use, not public availability, market validation, adoption proof, or a measured outcome.

## Development

```text
npm ci
npm test
npm run release:validate
```

The static site lives under `site/`. The release validator checks file allowlisting, identity separation, private paths, credentials, product maturity wording, Git metadata, and binary privacy records.

## Publication boundary

The repository is public and GitHub Pages is active on the project URL. Domain changes require separate explicit approval. The rollback method is an append-only revert commit to the last approved release.

CI uses read-only permissions for quality checks. Pages and identity-token permissions exist only in the deployment job, which runs after Quality succeeds. See `docs/RELEASE_RUNBOOK.md` for the release, temporary-host, rollback, and domain gates.
