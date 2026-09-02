import { expect, test } from './fixtures.js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

test('current entry shows version and synthetic context before prototype data', async ({ page }) => {
  await page.goto('/proof/job-agent/demo/');
  await expect(page.locator('.entry-notice')).toContainText('static recruiter-safe prototype');
  await expect(page.locator('.context-bar')).toContainText('0.9-public-proof');
  await expect(page.locator('.context-bar')).toContainText('Not live');
  const order = await page.locator('.entry-notice, #prototype-main').evaluateAll(nodes => nodes.map(node => node.id || node.className));
  expect(order).toEqual(['entry-notice', 'prototype-main']);
});

test('current shell navigation and keyboard navigation keep selected state', async ({ page }) => {
  await page.goto('/proof/job-agent/demo/');
  const today = page.getByRole('tab', { name: 'Today' });
  await today.focus();
  await page.keyboard.press('ArrowRight');
  const find = page.getByRole('tab', { name: 'Find jobs' });
  await expect(find).toBeFocused();
  await expect(find).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel', { name: 'Find jobs' })).toBeVisible();
  await page.getByRole('link', { name: 'Pipeline', exact: true }).first().click();
  await expect(page.getByRole('tab', { name: 'Pipeline' })).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('link', { name: /Re-research company/ }).click();
  await expect(page.getByRole('tab', { name: 'Research' })).toHaveAttribute('aria-selected', 'true');
});

test('company research is rendered from the governed synthetic fixture', async ({ page }) => {
  await page.goto('/proof/job-agent/demo/#research');
  await expect(page.getByRole('tabpanel', { name: 'Research' })).toBeVisible();
  await expect(page.locator('.research-field')).toHaveCount(4);
  await expect(page.locator('[data-demo-field="compensation"] .data-source')).toHaveText('inferred demo');
  await expect(page.locator('[data-demo-field="culture"] .data-source')).toHaveText('inferred demo');
  await expect(page.getByText('SEK 58,000–72,000 per month')).toBeVisible();
});

test('previous public edition is linked from the current prototype', async ({ page }) => {
  await page.goto('/proof/job-agent/demo/');
  await expect(page.getByRole('link', { name: /previous 0.8 edition/ }).first()).toHaveAttribute('href', '../archive/0.8-public-proof/');
});

test('prototype contains no dead controls or disallowed positive maturity wording', async ({ page }) => {
  await page.goto('/proof/job-agent/demo/');
  await expect(page.locator('button')).toHaveCount(0);
  for (const link of await page.locator('a').all()) {
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).not.toBe('#');
  }
  const source = ['site/proof/job-agent/demo/index.html', 'site/proof/job-agent/demo/app.js'].map(path => readFileSync(resolve(path), 'utf8')).join('\n');
  for (const phrase of ['current-UX', 'working application', 'verified demo snapshot', 'live-verifiable']) expect(source).not.toContain(phrase);
  expect(source).toContain('Not live');
});

test('all seven current views work without horizontal page overflow on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  for (const view of ['today', 'find', 'pipeline', 'activity', 'research', 'tailor', 'prepare']) {
    await page.goto(`/proof/job-agent/demo/#${view}`);
    await expect(page.locator(`[data-view="${view}"]`)).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  }
});
