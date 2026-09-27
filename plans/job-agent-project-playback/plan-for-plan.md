# Project Replay Planning Record

## Decision

Use the latest approved Job-agent interface iteration as the only visual edition in the public playback.

## Evidence check

1. `current-find-jobs.png`, `current-today.png`, and `current-job-detail.png` were captured from the current Job-agent frontend on 31 August 2026.
2. The public privacy review approves all three frames as synthetic demo data and confirms that they contain no local paths, private identifiers, credentials, or realistic private data.
3. The frames use the same synthetic company, role, names, and figures. This is intentional. It makes the three surfaces read as one product workflow.

## Scope

The live case study includes four chapters:

1. Text-only origin: the product problem framing.
2. Find jobs: criteria, sources, saved searches, and monitoring.
3. Today: daily priority and next move.
4. Job detail: fit, evidence, and action in one reviewable surface.

The public-proof boundary remains visible above the story and in every chapter's evidence links. It is not a separate playback stop, so the current state opens on the Job detail frame.

The three visual chapters are `v0.9 public proof`. The previous `0.8-public-proof` release remains an evidence record, but its older frames do not appear in this public story.

## Interaction and accessibility

The static HTML contains all four full chapter records and their public evidence links. JavaScript then adds a stable rewind interface:

1. The current state is the default view.
2. Play always begins at the origin.
3. The range control, previous/next controls, chapter links, and arrow-key navigation work without pointer dragging.
4. Reduced motion starts at the origin but does not autoplay.
5. On small screens, the strip becomes a vertical chronological trail.

## Evidence limits

Do not present the current frames as historical proof of an earlier frontend launch, a redesign sequence, a personal-letter-writer feature, live usage, recruitment outcomes, or market validation. Those claims have no approved public support.
