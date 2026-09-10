# Recruiter review Worker

This Worker is the secure API layer for the existing Repository Interview panel on GitHub Pages.

```text
Recruiter textbox → Cloudflare Worker → Groq
```

The Worker adds the correct server-side analysis contract for a focused question or role description. It validates model output against the published evidence catalogue before returning it.

The separate opt-in follow-up endpoint stores a recruiter’s submitted text and contact details only after they give consent. It deletes records after 90 days and can notify Marcus at `marcus.uden.dev@gmail.com`. The review endpoint itself does not store inputs.

## One-key provisioning

From the repository root, run:

```powershell
npm run review-api:provision
```

The command opens Cloudflare login if it is needed, then asks for `GROQ_API_KEY` once. It deploys the Worker, stores the key as a Cloudflare secret, and writes the returned Workers URL into the static-site configuration. The key never enters Git.

After provisioning, deploy the changed GitHub Pages configuration through the normal `main` branch workflow.

## Follow-up notification setup

The D1 database and secure `EMAIL` binding are part of this Worker. Before Cloudflare can send notification emails, onboard a sender domain in Cloudflare Email Service and set the verified sender address:

```powershell
npx --yes wrangler@4.129.0 secret put FOLLOW_UP_FROM --cwd workers/recruiter-review
```

Use an address from the onboarded domain. The Worker binding restricts email delivery to `marcus.uden.dev@gmail.com`; it cannot send recruiter data to another address. Until `FOLLOW_UP_FROM` is configured, follow-up requests are still saved but no email is sent.

## Local checks

```powershell
npm run test:review-api
npx --yes wrangler@4.129.0 deploy --cwd workers/recruiter-review --dry-run --secrets-file workers/recruiter-review/.dev.vars.example
```

## Boundaries

- The browser does not receive `GROQ_API_KEY`.
- Only listed public origins can call the Worker.
- The Worker accepts only `POST /api/recruiter-review`.
- `POST /api/recruiter-enquiry` requires explicit consent, contact email, and an idempotency ID.
- The Worker stores opt-in follow-up data in D1 for at most 90 days; it does not store IP addresses.
- The evidence catalogue is allowlisted and citations outside it are rejected.
- The result is public-evidence coverage, not a candidate score or automated hiring decision.
