import { expect, test } from './fixtures.js';

test('status and synthetic notices appear before the first proof frame', async ({ page }) => {
  await page.goto('/proof/job-agent/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('job decision');
  await expect(page.getByText('Work in progress', { exact: true })).toBeVisible();
  await expect(page.getByText('Not market-validated', { exact: true })).toBeVisible();
  await expect(page.getByText('No measured market outcomes', { exact: true })).toBeVisible();
  await expect(page.getByText('Moderated recruiter review of the current decision-led prototype and its version history', { exact: true })).toBeVisible();
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
    await expect(page.getByRole('heading', { name: decision })).toBeVisible();
  }
});

test('current and historical proof frames use reviewed synthetic prototype images', async ({ page }) => {
  await page.goto('/proof/job-agent/#proof-sequence');
  for (const grid of ['#proof-sequence .visual-proof-grid', '#ui-evolution .visual-proof-grid']) {
    const figures = page.locator(`${grid} figure`);
    await expect(figures).toHaveCount(3);
    for (const image of await figures.locator('img').all()) {
      await expect(image).toBeVisible();
      expect(await image.getAttribute('alt')).toBeTruthy();
    }
  }
});

test('the guided reading order remains stable and printable', async ({ page }) => {
  await page.goto('/proof/job-agent/');
  const ids = await page.locator('main > section[id]').evaluateAll((sections) => sections.map((section) => section.id));
  expect(ids).toEqual(['evidence-boundary', 'proof-sequence', 'ui-evolution', 'company-research', 'decisions', 'limitations', 'contact']);
  await page.emulateMedia({ media: 'print' });
  await expect(page.getByRole('heading', { level: 2, name: 'Is this company and role worth my time?' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'What this evidence does not prove.' })).toBeVisible();
});

test('current release and previous edition are both discoverable', async ({ page }) => {
  await page.goto('/proof/job-agent/');
  await expect(page.getByText('0.9-public-proof', { exact: true }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /0.8-public-proof archive/ })).toHaveAttribute('href', 'archive/0.8-public-proof/');
  await page.locator('.technical-appendix summary').click();
  await expect(page.getByRole('link', { name: /Current release manifest/ })).toHaveAttribute('href', '../../evidence/releases/job-agent-v2.json');
  await expect(page.getByRole('link', { name: /Previous release manifest/ })).toHaveAttribute('href', '../../evidence/releases/job-agent-v1.json');
});
