import { expect, test } from './fixtures.js';

test('the first viewport establishes the hiring case and primary conversion path', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.getByText('Experienced individual contributor')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('clear, buildable product work');
  await expect(page.getByText('Operational depth. Product thinking. AI-native execution.')).toBeVisible();
  const primaryNavigation = page.getByRole('navigation', { name: 'Primary navigation' });
  await expect(primaryNavigation.getByRole('link', { name: 'Product portfolio' })).toBeVisible();
  await expect(primaryNavigation.getByRole('link', { name: 'CV' })).toBeVisible();
  await expect(primaryNavigation.getByRole('link', { name: 'Interview my work' })).toBeVisible();
  const entryPoints = page.locator('.action-row--entry-points');
  await expect(entryPoints.getByRole('link', { name: 'Explore product work' })).toBeInViewport();
  await expect(entryPoints.getByRole('link', { name: 'Follow the decisions' })).toBeInViewport();
  await expect(entryPoints.getByRole('link', { name: 'CV' })).toBeVisible();
  await expect(entryPoints.getByRole('link', { name: 'Interview my work' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Contact' })).toBeInViewport();
});

test('hero entry controls share a single layout and direct visitors to distinct routes', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const controls = page.locator('.action-row--entry-points .button');
  await expect(controls).toHaveCount(4);
  const dimensions = await controls.evaluateAll((elements) => elements.map((element) => {
    const box = element.getBoundingClientRect();
    return { width: Math.round(box.width), height: Math.round(box.height) };
  }));
  expect(new Set(dimensions.map(({ width }) => width)).size).toBe(1);
  expect(new Set(dimensions.map(({ height }) => height)).size).toBe(1);
});

test('claim-to-evidence links target three named public anchors', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'See how I turn a claim into a decision.' })).toBeVisible();
  await expect(page.getByText('Each example pairs a product claim with the public artifact behind it. Open one to see the reasoning, trade-offs, and evidence.')).toBeVisible();
  const expected = [
    ['See the company research decision', 'proof/job-agent/#company-research'],
    ['See how the scope became working proof', 'proof/job-agent/#proof-sequence'],
    ['See how the AI workflow is governed', 'proof/job-agent/#evidence-boundary']
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

