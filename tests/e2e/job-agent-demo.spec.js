import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

test('first entry shows WIP and synthetic context before prototype data', async ({ page }) => {
  await page.goto('/proof/job-agent/demo/');
  const notice = page.locator('.entry-notice');
  await expect(notice).toContainText('Aster Vale Software is invented');
  await expect(page.locator('.context-bar')).toContainText('Work in progress');
  await expect(page.locator('.context-bar')).toContainText('Not live');
  const order = await page.locator('.entry-notice, #prototype-main').evaluateAll((nodes) => nodes.map((node) => node.id || node.className));
  expect(order).toEqual(['entry-notice', 'prototype-main']);
});

test('tabs, action links, and keyboard navigation keep selected state and focus', async ({ page }) => {
  await page.goto('/proof/job-agent/demo/');
  const today = page.getByRole('tab', { name: 'Today' });
  await today.focus();
  await page.keyboard.press('ArrowRight');
  const discover = page.getByRole('tab', { name: 'Discover' });
  await expect(discover).toBeFocused();
  await expect(discover).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel', { name: 'Discover' })).toBeVisible();
  await page.getByRole('link', { name: 'Review match' }).click();
  await expect(page.getByRole('tab', { name: 'Job', exact: true })).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('link', { name: 'Review company research' }).click();
  await expect(page.getByRole('tab', { name: 'Company research' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('[data-view-status]')).toContainText('Company research view selected');
});

test('company research is rendered from the governed synthetic fixture', async ({ page }) => {
  await page.goto('/proof/job-agent/demo/#research');
  await expect(page.getByRole('tabpanel', { name: 'Company research' })).toBeVisible();
  await expect(page.locator('.demo-research-field')).toHaveCount(4);
  await expect(page.locator('[data-demo-field="compensation"] .data-source')).toHaveText('inferred demo');
  await expect(page.locator('[data-demo-field="culture"] .data-source')).toHaveText('inferred demo');
  await expect(page.getByText('SEK 58,000–72,000 per month')).toBeVisible();
});

test('direct project-subpath deep link survives refresh', async ({ page }) => {
  await page.goto('/ai-native-proof-of-work/proof/job-agent/demo/#prepare');
  await expect(page.getByRole('tabpanel', { name: 'Prepare' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('tabpanel', { name: 'Prepare' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Prepare' })).toHaveAttribute('aria-selected', 'true');
});

test('prototype contains no dead controls or disallowed positive maturity wording', async ({ page }) => {
  await page.goto('/proof/job-agent/demo/');
  await expect(page.locator('button')).toHaveCount(0);
  for (const link of await page.locator('a').all()) {
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).not.toBe('#');
  }
  const source = [
    'site/proof/job-agent/demo/index.html',
    'site/proof/job-agent/demo/app.js'
  ].map((path) => readFileSync(resolve(path), 'utf8')).join('\n');
  for (const phrase of ['current-UX', 'working application', 'verified demo snapshot', 'live-verifiable']) {
    expect(source).not.toContain(phrase);
  }
  expect(source).toContain('Not live');
});

test('all seven views work without horizontal page overflow on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  for (const view of ['today', 'discover', 'job', 'research', 'tailor', 'cv', 'prepare']) {
    await page.goto(`/proof/job-agent/demo/#${view}`);
    await expect(page.locator(`[data-view="${view}"]`)).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  }
});
