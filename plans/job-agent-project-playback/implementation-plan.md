# Project Replay Implementation Plan

## Purpose

Add an evidence-disciplined product playback to the Job-agent case study. It helps a recruiter inspect the project origin, the current connected workflow, the public evidence, and the remaining limits in less than one minute.

## Source of truth

`site/evidence/project-replay-job-agent.json` is the structured source. `scripts/generate-project-replay.mjs` validates it and writes the static HTML section into `site/proof/job-agent/index.html`.

`site/evidence/releases/job-agent-v2.json` defines the current `0.9-public-proof` edition. It lists the three approved current frames and their hashes. `release/privacy-review.json` remains the public privacy approval source.

## Public placement

Place `#project-replay` after `#proof-sequence` and before `#company-research`. The section replaces the standalone UI-evolution treatment and does not compete with the case-study hero, CV, or primary proof sequence.

## Playback model

1. Before build — text-only problem framing.
2. Find jobs — the discovery system.
3. Today — daily prioritization.
4. Job detail — the role decision surface.

The public-proof boundary remains in the section introduction and evidence links. It is not a separate playback stop, so the current state opens on Job detail.

The visual chapters use only the latest approved Job-agent iteration. The shared synthetic placeholders are preserved across each frame.

## Validation

1. Check generator and data-model synchronisation.
2. Check the static HTML contains every title, date, status, evidence link, and visual alt text without JavaScript.
3. Check playback starts at the origin, restores the current state, and does not autoplay with reduced motion.
4. Check the desktop and mobile trails, keyboard navigation, and all three frame paths.
5. Run the repository validation suite before release.
