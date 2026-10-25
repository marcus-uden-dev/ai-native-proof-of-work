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
    const link = page.getByRole('link', { name });
    await expect(link).toHaveAttribute('href', href);
    await expect(link).toHaveClass(/button--secondary/);
  }
  await expect(page.locator('[data-role-chip]')).toHaveCount(0);
});

test('CV precedes the interview action and email has visible and copyable fallbacks', async ({ context, page }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/#contact');
  const actions = page.locator('.contact-panel__actions');
  await expect(actions.getByRole('link', { name: 'Download CV' })).toHaveAttribute('download', '');
  await expect(actions.getByRole('link', { name: 'Read CV facts' })).toHaveClass(/button--secondary/);
  await expect(actions.getByRole('link', { name: 'Request an interview' })).toHaveAttribute('href', /^mailto:/);
  const copyEmail = actions.getByRole('button', { name: 'Copy email' });
  await expect(copyEmail).toHaveClass(/button--compact/);
  const [actionsBox, copyEmailBox] = await Promise.all([actions.boundingBox(), copyEmail.boundingBox()]);
  expect(copyEmailBox?.width).toBeLessThan(actionsBox?.width ?? Number.POSITIVE_INFINITY);
  const labels = await actions.locator('a, button').allTextContents();
  expect(labels.indexOf('Download CV')).toBeLessThan(labels.indexOf('Request an interview'));
  await expect(page.getByRole('link', { name: 'marcus.uden.dev@gmail.com' }).first()).toBeVisible();
  await copyEmail.click();
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


test('How I think claims show project attribution before the unchanged decision log', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const order = await page.evaluate(() => {
    const keys = ['how-i-think', 'claims-title', 'decision-log', 'selected-proof'];
    return keys.map((key) => {
      const section = document.getElementById(key).closest('section');
      return Array.from(document.querySelectorAll('main > section')).indexOf(section);
    });
  });
  expect(order).toEqual([...order].sort((a, b) => a - b));
  expect(new Set(order).size).toBe(4);

  const how = page.locator('#how-i-think');
  await expect(how.getByRole('link', { name: 'Job-agent', exact: true })).toHaveAttribute('href', 'proof/job-agent/');
  await expect(how.getByRole('link', { name: 'Personal AI Harness', exact: true })).toHaveAttribute('href', 'proof/recursive-workflow/');

  const claims = [
    ['claim-product-judgment', 'Job-agent', 'proof/job-agent/#company-research'],
    ['claim-execution', 'Personal AI Harness', 'proof/recursive-workflow/#loops'],
    ['claim-ai-native', 'Personal AI Harness', 'proof/recursive-workflow/#promotion']
  ];
  for (const [id, project, href] of claims) {
    const card = page.locator('#' + id);
    await expect(card.locator('.claim-card__project')).toHaveText(project);
    await expect(card.locator('.claim-card__project a')).toHaveCount(0);
    await expect(card.locator('.claim-card__meta .claim-card__type')).toBeVisible();
    await expect(card.locator('a.button')).toHaveAttribute('href', href);
  }

  const chipTops = await page.locator('.claim-card__project').evaluateAll((elements) =>
    elements.map((element) => Math.round(element.getBoundingClientRect().top))
  );
  expect(new Set(chipTops).size).toBe(1);
  await expect(page.locator('#decision-log .decision-log-oracle')).toBeVisible();
});
