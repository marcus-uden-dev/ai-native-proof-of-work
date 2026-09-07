# Recruiter review Worker

This Worker is the secure API layer for the existing Repository Interview panel on GitHub Pages.

```text
Recruiter textbox → Cloudflare Worker → Groq
```

The Worker adds the correct server-side analysis contract for a focused question or role description. It receives only the submitted text, does not persist it, limits requests, and validates model output against the published evidence catalogue before returning it.

## One-key provisioning

From the repository root, run:

```powershell
npm run review-api:provision
```

The command opens Cloudflare login if it is needed, then asks for `GROQ_API_KEY` once. It deploys the Worker, stores the key as a Cloudflare secret, and writes the returned Workers URL into the static-site configuration. The key never enters Git.

After provisioning, deploy the changed GitHub Pages configuration through the normal `main` branch workflow.

## Local checks

```powershell
npm run test:review-api
npx --yes wrangler@4.129.0 deploy --cwd workers/recruiter-review --dry-run --secrets-file workers/recruiter-review/.dev.vars.example
```

## Boundaries

- The browser does not receive `GROQ_API_KEY`.
- Only listed public origins can call the Worker.
- The Worker accepts only `POST /api/recruiter-review`.
- The evidence catalogue is allowlisted and citations outside it are rejected.
- The result is public-evidence coverage, not a candidate score or automated hiring decision.
