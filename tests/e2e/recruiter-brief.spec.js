import { expect, test } from '@playwright/test';

test('the first viewport establishes the hiring case and conversion path', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.getByText('Experienced individual contributor')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('clear, buildable product work');
  await expect(page.getByText('Operational depth. Product thinking. AI-native execution.')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download CV' }).first()).toBeInViewport();
  await expect(page.getByRole('link', { name: 'Contact' })).toBeInViewport();
});

test('claim-to-evidence links target three named public anchors', async ({ page }) => {
  await page.goto('/');
  const expected = [
    ['Inspect the research decision', 'proof/job-agent/#company-research'],
    ['Follow the proof sequence', 'proof/job-agent/#proof-sequence'],
    ['See the evidence boundary', 'proof/job-agent/#evidence-boundary']
  ];
  for (const [name, href] of expected) {
    await expect(page.getByRole('link', { name })).toHaveAttribute('href', href);
  }
  await expect(page.locator('[data-role-chip]')).toHaveCount(0);
});

test('CV precedes the interview action and email has visible and copyable fallbacks', async ({ context, page }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/#contact');
  const actions = page.locator('.contact-panel__actions');
  await expect(actions.getByRole('link', { name: 'Download CV' })).toHaveAttribute('download', '');
  await expect(actions.getByRole('link', { name: 'Request an interview' })).toHaveAttribute('href', /^mailto:/);
  const labels = await actions.locator('a, button').allTextContents();
  expect(labels.indexOf('Download CV')).toBeLessThan(labels.indexOf('Request an interview'));
  await expect(page.getByRole('link', { name: 'marcus.uden.dev@gmail.com' }).first()).toBeVisible();
  await actions.getByRole('button', { name: 'Copy email' }).click();
  await expect(actions.locator('[data-copy-status]')).toContainText('succeeded');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('marcus.uden.dev@gmail.com');
});

test('print keeps the public email and evidence destinations understandable', async ({ page }) => {
  await page.goto('/');
  await page.emulateMedia({ media: 'print' });
  await expect(page.getByRole('link', { name: 'marcus.uden.dev@gmail.com' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Open the guided case study/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Copy email' })).toBeHidden();
});

