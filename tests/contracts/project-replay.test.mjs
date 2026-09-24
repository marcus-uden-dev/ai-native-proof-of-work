import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { renderReplay, validateReplay } from '../../scripts/generate-project-replay.mjs';

const data = JSON.parse(readFileSync('site/evidence/project-replay-job-agent.json', 'utf8'));
const html = readFileSync('site/proof/job-agent/index.html', 'utf8');

test('The Job-agent story is a small, valid evidence-backed playback dataset', () => {
  assert.doesNotThrow(() => validateReplay(data));
  assert.equal(data.schema_version, 2);
  assert.equal(data.project, 'job-agent');
  assert.equal(data.title, 'The Job-agent story');
  assert.equal(data.events.length, 4);
  assert.equal(data.events[0].title, 'Before build');
  assert.ok(data.events.slice(1).every((event) => event.edition === 'v0.9 public proof'));
  assert.deepEqual(
    data.events.filter((event) => event.visual).map((event) => event.visual.href),
    [
      '../../assets/images/job-agent/current-find-jobs.png',
      '../../assets/images/job-agent/current-today.png',
      '../../assets/images/job-agent/current-job-detail.png'
    ]
  );
});

test('The Job-agent story keeps public evidence time separate from record time', () => {
  for (const event of data.events) {
    assert.ok(event.valid_from, `${event.id} has valid_from`);
    assert.ok(event.recorded_at, `${event.id} has recorded_at`);
    assert.ok(Date.parse(event.valid_from) <= Date.parse(event.recorded_at), `${event.id} must not be recorded before it applied`);
  }
});

test('every chapter has public HTTPS evidence and an approved local visual when shown', () => {
  for (const event of data.events) {
    assert.ok(html.includes(event.title), `${event.id} title is in static HTML`);
    for (const evidence of event.evidence) {
      const url = new URL(evidence.href);
      assert.equal(url.protocol, 'https:');
      assert.ok(html.includes(evidence.href), `${event.id} evidence link is in static HTML`);
    }
    if (event.visual) {
      const filePath = event.visual.href.replace('../../', 'site/');
      assert.ok(existsSync(filePath), `${event.id} visual exists`);
      assert.ok(html.includes(event.visual.href), `${event.id} visual is in static HTML`);
      assert.ok(html.includes(event.visual.alt), `${event.id} visual alt text is in static HTML`);
    }
  }
});

test('generated playback stays synchronized with its static HTML fallback', () => {
  assert.ok(html.includes('<!-- PROJECT_REPLAY:BEGIN -->'));
  assert.ok(html.includes('<!-- PROJECT_REPLAY:END -->'));
  assert.ok(html.includes(renderReplay(data)));
  assert.ok(html.includes('data-project-story'));
  assert.ok(html.includes('data-story-controls'));
  assert.ok(html.includes('JavaScript adds the optional rewind and playback controls.'));
  assert.ok(!html.includes('data-replay-range'));
  assert.ok(html.includes('project-replay.js'));
});
