import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const dataPath = resolve('site/evidence/project-replay-job-agent.json');
const pagePath = resolve('site/proof/job-agent/index.html');
const begin = '<!-- PROJECT_REPLAY:BEGIN -->';
const end = '<!-- PROJECT_REPLAY:END -->';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function dateLabel(value) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${value}T00:00:00Z`));
}

function renderEvidence(evidence) {
  return `<ul>${evidence.map((item) => `<li><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>`).join('')}</ul>`;
}

function renderVisual(visual) {
  if (!visual) {
    return `<div class="project-story__origin-visual"><p class="project-story__origin-mark" aria-hidden="true">01</p><p>This chapter is the public problem framing. A verified interface frame begins with the next chapter.</p></div>`;
  }

  return `<figure class="project-story__visual"><a href="${escapeHtml(visual.href)}"><img src="${escapeHtml(visual.href)}" alt="${escapeHtml(visual.alt)}"></a><figcaption><strong>${escapeHtml(visual.label)}</strong>${escapeHtml(visual.caption)}</figcaption></figure>`;
}

function renderEvent(event) {
  return `
          <li class="project-story__chapter" id="${escapeHtml(event.id)}" data-story-event data-story-index="${event.visual_order - 1}" data-story-date="${escapeHtml(event.date)}">
            <article>
              <header class="project-story__chapter-meta">
                <time datetime="${escapeHtml(event.date)}">${escapeHtml(dateLabel(event.date))}</time>
                <span>${escapeHtml(event.edition)}</span>
                <span>${escapeHtml(event.stage)}</span>
              </header>
              <div class="project-story__chapter-layout${event.visual ? '' : ' project-story__chapter-layout--origin'}">
                <div class="project-story__chapter-copy">
                  <p class="project-story__chapter-number">Chapter ${String(event.visual_order).padStart(2, '0')}</p>
                  <h3>${escapeHtml(event.title)}</h3>
                  <dl class="project-story__fields">
                    <div><dt>What changed</dt><dd>${escapeHtml(event.summary)}</dd></div>
                    <div><dt>How it works</dt><dd>${escapeHtml(event.how_it_works)}</dd></div>
                    <div><dt>Decision annotation</dt><dd>${escapeHtml(event.decision_annotation)}</dd></div>
                    <div><dt>Why it matters</dt><dd>${escapeHtml(event.why_it_matters)}</dd></div>
                    <div><dt>Next question</dt><dd>${escapeHtml(event.next_question)}</dd></div>
                    <div><dt>What this demonstrates</dt><dd><ul class="project-story__capabilities">${event.demonstrates.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}</ul></dd></div>
                    <div><dt>Evidence available</dt><dd>${renderEvidence(event.evidence)}</dd></div>
                  </dl>
                </div>
                ${renderVisual(event.visual)}
              </div>
            </article>
          </li>`;
}

export function validateReplay(data) {
  const ids = new Set();
  const orders = new Set();
  const requiredFields = ['id', 'date', 'valid_from', 'recorded_at', 'edition', 'stage', 'title', 'summary', 'how_it_works', 'decision_annotation', 'why_it_matters', 'next_question'];

  if (data.schema_version !== 2 || data.project !== 'job-agent') {
    throw new Error('The Job-agent story must use schema version 2.');
  }
  if (!Array.isArray(data.events) || data.events.length < 4 || data.events.length > 8) {
    throw new Error('The Job-agent story must contain 4–8 curated chapters.');
  }

  for (const event of data.events) {
    for (const field of requiredFields) {
      if (typeof event[field] !== 'string' || !event[field].trim()) {
        throw new Error(`${event.id || 'chapter'}: ${field} is required.`);
      }
    }
    if (ids.has(event.id) || !Number.isInteger(event.visual_order) || orders.has(event.visual_order)) {
      throw new Error(`${event.id}: id and visual_order must be unique.`);
    }
    for (const value of [event.date, event.valid_from, event.recorded_at]) {
      if (Number.isNaN(Date.parse(value))) throw new Error(`${event.id}: invalid temporal value.`);
    }
    if (Date.parse(event.valid_from) > Date.parse(event.recorded_at)) {
      throw new Error(`${event.id}: recorded_at cannot predate valid_from.`);
    }
    if (!Array.isArray(event.demonstrates) || event.demonstrates.length === 0) {
      throw new Error(`${event.id}: at least one capability is required.`);
    }
    if (!Array.isArray(event.evidence) || event.evidence.length === 0) {
      throw new Error(`${event.id}: at least one public evidence link is required.`);
    }
    for (const evidence of event.evidence) {
      if (!evidence.label || !/^https:\/\//.test(evidence.href)) {
        throw new Error(`${event.id}: evidence must use an HTTPS public link.`);
      }
    }
    if (event.visual !== null) {
      for (const field of ['href', 'alt', 'label', 'caption']) {
        if (!event.visual?.[field]) throw new Error(`${event.id}: visual ${field} is required.`);
      }
      if (!event.visual.href.startsWith('../../assets/images/job-agent/')) {
        throw new Error(`${event.id}: visual must use an approved local Job-agent asset.`);
      }
    }
    ids.add(event.id);
    orders.add(event.visual_order);
  }
}

export function renderReplay(data) {
  const events = [...data.events].sort((a, b) => a.visual_order - b.visual_order);
  return `${begin}
      <section class="section section--ruled shell project-replay" id="project-replay" aria-labelledby="project-replay-title" data-project-story>
        <div class="section-heading section-heading--split">
          <div>
            <p class="kicker">Project Replay · Product playback</p>
            <h2 id="project-replay-title">The Job-agent story.</h2>
          </div>
          <p>Rewind the product chapters. Inspect what changed, how each surface worked, and the evidence that supports the public record.</p>
        </div>
        <p class="project-replay__boundary"><strong>Evidence boundary:</strong> ${escapeHtml(data.evidence_boundary)}</p>
        <div class="project-story__controls" data-story-controls hidden aria-label="Job-agent story playback controls">
          <div class="project-story__control-row">
            <button class="button button--secondary" type="button" data-story-previous>Previous chapter</button>
            <button class="button button--secondary" type="button" data-story-next>Next chapter</button>
            <button class="button button--primary" type="button" data-story-play>Play from origin</button>
            <button class="button button--secondary" type="button" data-story-pause>Pause</button>
            <button class="button button--secondary" type="button" data-story-current>Current state</button>
          </div>
          <label for="project-story-position">Playback position <output data-story-date-output></output></label>
          <input id="project-story-position" type="range" min="0" max="${events.length - 1}" step="1" value="${events.length - 1}" data-story-range>
          <p class="project-story__control-note" data-story-note></p>
        </div>
        <ol class="project-story__strip" aria-label="Job-agent story chapters">${events.map((event) => `
          <li data-story-marker data-story-index="${event.visual_order - 1}"><a href="#${escapeHtml(event.id)}" data-story-select data-story-index="${event.visual_order - 1}"><span class="project-story__dot" aria-hidden="true"></span><span class="project-story__strip-meta">${escapeHtml(event.edition)}</span><strong>${escapeHtml(event.title)}</strong><span>${escapeHtml(event.stage)}</span></a></li>`).join('')}
        </ol>
        <p class="project-story__strip-note">Every chapter remains available as a complete static record below. JavaScript adds the optional rewind and playback controls.</p>
        <div class="project-story__stage" data-story-stage aria-live="polite" aria-label="Selected Job-agent story chapter" hidden></div>
        <ol class="project-story__chapters" aria-label="Complete chronological Job-agent story">${events.map(renderEvent).join('')}
        </ol>
        <details class="project-replay__gaps">
          <summary>Evidence gaps kept out of this story</summary>
          <ul>${data.evidence_gaps.map((gap) => `<li>${escapeHtml(gap)}</li>`).join('')}</ul>
        </details>
        <p class="project-replay__audit">Temporal audit fields are available in <a href="../../evidence/project-replay-job-agent.json">project-replay-job-agent.json</a>. <code>valid_from</code> describes when a chapter applied; <code>recorded_at</code> records when the public evidence model captured it.</p>
      </section>
${end}`;
}

function replaceSection(page, section) {
  const start = page.indexOf(begin);
  const finish = page.indexOf(end);
  if (start === -1 || finish === -1 || finish < start) {
    throw new Error('Project Replay markers are missing from the Job-agent case study.');
  }
  return `${page.slice(0, start)}${section}${page.slice(finish + end.length)}`;
}

function main() {
  const data = JSON.parse(readFileSync(dataPath, 'utf8'));
  validateReplay(data);
  const section = renderReplay(data);
  const page = readFileSync(pagePath, 'utf8');
  const nextPage = replaceSection(page, section);
  if (process.argv.includes('--check')) {
    if (page !== nextPage) throw new Error('Project Replay HTML is stale. Run: npm run generate:project-replay');
    return;
  }
  writeFileSync(pagePath, nextPage);
}

if (import.meta.url === pathToFileURL(resolve(process.argv[1])).href) main();
