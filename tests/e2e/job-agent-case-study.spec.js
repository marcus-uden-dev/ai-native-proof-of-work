import { expect, test } from './fixtures.js';

test('status and synthetic notices appear before the first proof frame', async ({ page }) => {
  await page.goto('/proof/job-agent/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('job decision');
  await expect(page.getByText('Work in progress', { exact: true })).toBeVisible();
  await expect(page.getByText('Not market-validated', { exact: true })).toBeVisible();
  await expect(page.getByText('No measured market outcomes', { exact: true })).toBeVisible();
  await expect(page.getByText('Moderated recruiter review of the synthetic company-research decision flow', { exact: true })).toBeVisible();
  await expect(page.getByText(/release-one company is invented/i)).toBeVisible();
  const order = await page.locator('#evidence-boundary, #proof-sequence').evaluateAll((nodes) => nodes.map((node) => node.id));
  expect(order).toEqual(['evidence-boundary', 'proof-sequence']);
});

test('90-second summary explains the product and the validation limit', async ({ page }) => {
  await page.goto('/proof/job-agent/');
  const hero = page.locator('.case-hero');
  await expect(hero).toContainText('discovery, company research, application tailoring, and interview preparation');
  await expect(hero).toContainText('not market outcomes');
});

test('company research fields retain provenance, confidence, and decision use', async ({ page }) => {
  await page.goto('/proof/job-agent/#company-research');
  const fields = page.locator('.research-field');
  await expect(fields).toHaveCount(4);
  for (const field of await fields.all()) {
    await expect(field.locator('.source-label')).toHaveCount(1);
    await expect(field.getByText('Confidence', { exact: true })).toBeVisible();
    await expect(field.getByText('Decision use', { exact: true })).toBeVisible();
  }
  await expect(page.locator('[data-field="compensation"] .source-label')).toHaveText('inferred demo');
  await expect(page.locator('[data-field="culture"] .source-label')).toHaveText('inferred demo');
  await expect(page.locator('[data-field="compensation"]')).not.toContainText('public source');
  await expect(page.locator('[data-field="culture"]')).not.toContainText('public source');
});

test('research includes the required decision signals and outputs', async ({ page }) => {
  await page.goto('/proof/job-agent/#company-research');
  for (const label of ['Compensation benchmark', 'Company stage', 'Financial signal', 'Culture and working model', 'Positive signals', 'Warning signals']) {
    await expect(page.getByText(label, { exact: true })).toBeVisible();
  }
  for (const decision of ['Application tailoring', 'Interview investigation', 'Compensation']) {
    await expect(page.getByRole('heading', { name: decision, exact: true })).toBeVisible();
  }
});

test('current proof and the Job-agent story use reviewed synthetic prototype images', async ({ page }) => {
  await page.goto('/proof/job-agent/#proof-sequence');
  const proofImages = page.locator('#proof-sequence .visual-proof-grid img');
  await expect(proofImages).toHaveCount(3);
  const staticStoryImages = page.locator('#project-replay .project-story__chapters .project-story__visual img');
  await expect(staticStoryImages).toHaveCount(3);
  await expect(page.locator('#project-replay [data-story-stage] .project-story__visual img')).toHaveCount(1);
  for (const image of [...await proofImages.all(), ...await staticStoryImages.all()]) {
    expect(await image.getAttribute('alt')).toBeTruthy();
  }
  for (const image of await proofImages.all()) {
    await expect(image).toBeVisible();
  }
});

test('The Job-agent story preserves complete chapter records in raw HTML without JavaScript', async ({ request }) => {
  const response = await request.get('/proof/job-agent/');
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  expect(html).toContain('id="project-replay"');
  expect(html).toContain('The Job-agent story.');
  expect(html).toContain('data-project-story');
  expect(html).toContain('Before build');
  expect(html).toContain('Set up a repeatable way to find work');
  expect(html).toContain('Bring fit, evidence, and action into one role view');
  expect(html).not.toContain('v0.5 public proof');
  expect(html).toContain('Evidence gaps kept out of this story');
  expect(html).toContain('data-story-controls');
  expect(html).not.toContain('data-replay-range');
});

test('The Job-agent story rewinds from the evidence-backed origin and restores the current state', async ({ page }) => {
  await page.goto('/proof/job-agent/#project-replay');
  const story = page.locator('#project-replay');
  const stage = story.locator('[data-story-stage]');
  const range = story.locator('[data-story-range]');
  await expect(story.locator('.project-story__strip li')).toHaveCount(4);
  await expect(story.locator('.project-story__chapters > li')).toHaveCount(4);
  await expect(story.locator('[data-story-controls]')).toBeVisible();
  await range.fill('0');
  await expect(stage).toContainText('Before build');
  await expect(stage).toContainText('Build a reviewed workflow');
  expect(await story.locator('[data-story-marker]:not([hidden])').count()).toBe(1);
  await story.getByRole('button', { name: 'Current state' }).click();
  await expect(stage).toContainText('Bring fit, evidence, and action into one role view');
  expect(await story.locator('[data-story-marker]:not([hidden])').count()).toBe(4);
});

test('The Job-agent story plays from origin and respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/proof/job-agent/#project-replay');
  const story = page.locator('#project-replay');
  await story.getByRole('button', { name: 'Play from origin' }).click();
  await expect(story.locator('[data-story-stage]')).toContainText('Before build');
  await expect(story.getByText('Reduced motion is enabled. Playback starts at the origin and advances only when you select Next chapter.')).toBeVisible();
  await expect(story.getByRole('button', { name: 'Play from origin' })).toBeEnabled();
});

test('The Job-agent story supports keyboard chapter navigation', async ({ page }) => {
  await page.goto('/proof/job-agent/#project-replay');
  const story = page.locator('#project-replay');
  await story.getByRole('button', { name: 'Play from origin' }).click();
  await story.locator('[data-story-select]').first().focus();
  await page.keyboard.press('ArrowRight');
  await expect(story.locator('[data-story-stage]')).toContainText('Set up a repeatable way to find work');
  await story.getByRole('button', { name: 'Next chapter' }).click();
  await expect(story.locator('[data-story-stage]')).toContainText('Turn the workflow into a daily next move');
});

test('The Job-agent story is a vertical, keyboard-reachable chronological trail on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('/proof/job-agent/#project-replay');
  const story = page.locator('#project-replay');
  await expect(story.locator('.project-story__strip')).toBeVisible();
  await expect(story.locator('.project-story__chapters > li')).toHaveCount(4);
  const previous = story.getByRole('button', { name: 'Previous chapter' });
  await previous.focus();
  await page.keyboard.press('Enter');
  await expect(story.locator('[data-story-stage]')).toContainText('Turn the workflow into a daily next move');
});

test('the guided reading order remains stable and printable', async ({ page }) => {
  await page.goto('/proof/job-agent/');
  const ids = await page.locator('main > section[id]').evaluateAll((sections) => sections.map((section) => section.id));
  expect(ids).toEqual(['evidence-boundary', 'proof-sequence', 'project-replay', 'company-research', 'decisions', 'limitations', 'contact']);
  await page.emulateMedia({ media: 'print' });
  await expect(page.getByRole('heading', { level: 2, name: 'Is this company and role worth my time?' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'What this evidence does not prove.' })).toBeVisible();
});
