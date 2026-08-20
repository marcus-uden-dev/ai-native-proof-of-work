# Marcus Udén — proof of work

This repository contains a recruiter-first, public proof-of-work edition for hands-on product roles.

The site leads with a concise hiring case. It then provides dated evidence, explicit maturity labels, and a guided Job-agent case study. The public edition is curated. It is not a mirror of a working repository.

## Current state

The repository is a local clean-room staging area. It has no remote and is not published.

## Development

```text
npm ci
npm test
npm run release:validate
```

The static site will live under `site/`. The release validator checks file allowlisting, identity separation, private paths, credentials, product maturity wording, Git metadata, and binary privacy records.

## Publication boundary

Publication, GitHub Pages activation, and domain changes require explicit approval. The rollback method is an append-only revert commit to the last approved release.

