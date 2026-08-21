import { expect, test } from '@playwright/test';

test('homepage selected proof shows the lead case and the subordinate supporting case', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('#selected-proof .proof-card');
  await expect(cards).toHaveCount(2);
  await expect(cards.nth(0).getByText('Lead proof', { exact: true })).toBeVisible();
  await expect(cards.nth(1).getByText('Supporting proof', { exact: true })).toBeVisible();
  await expect(cards.nth(1)).toContainText('Recursive workflow system');
  await expect(cards.nth(1).getByRole('link', { name: /Open the recursive workflow proof/ })).toHaveAttribute('href', 'proof/recursive-workflow/');
});

test('homepage states the system loop beneath the intact product loop', async ({ page }) => {
  await page.goto('/');
  const method = page.locator('section.section--dark');
  await expect(method.getByText('Discover', { exact: true })).toBeVisible();
  await expect(method.getByText('Define', { exact: true })).toBeVisible();
  await expect(method.getByText('Build', { exact: true })).toBeVisible();
  await expect(method.getByText('Improve', { exact: true })).toBeVisible();
  for (const stage of ['Execute', 'Review', 'Detect pattern', 'Human gate', 'Promote', 'Next cycle']) {
    await expect(method.getByText(stage, { exact: true })).toBeVisible();
  }
  await expect(method).toContainText(/human review controls every promotion/i);
});

test('the supporting-proof page states both loops, Autoresearch, daily automation, and the human gate', async ({ page }) => {
  const response = await page.goto('/proof/recursive-workflow/');
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByText('Discover → Define → Build → Improve', { exact: true })).toBeVisible();
  await expect(page.getByText('Execute → Review → Detect pattern → Human gate → Promote → Next cycle', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Broad discovery filtered into decision-relevant evidence.' })).toBeVisible();
  await expect(page.getByText(/scheduled, semi-automated research loop/)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Health, drift, and opportunities become bounded next actions.' })).toBeVisible();
  await expect(page.getByText(/kill-switch review/i)).toBeVisible();
  await expect(page.getByText(/No important instruction is updated without human review/)).toBeVisible();
});

test('the supporting-proof page only uses "autonomous" to deny self-modification, never to claim it', async ({ page }) => {
  await page.goto('/proof/recursive-workflow/');
  const body = (await page.locator('body').innerText()).toLowerCase();
  const mentions = [...body.matchAll(/(.{0,12})autonomous/g)].map((match) => match[1]);
  expect(mentions.length).toBeGreaterThan(0);
  for (const precedingText of mentions) {
    expect(precedingText).toMatch(/not\s+$/);
  }
  expect(body).toContain('not autonomous self-modification');
});

test('the supporting-proof page carries unique identity metadata and a working CV path', async ({ page }) => {
  await page.goto('/proof/recursive-workflow/');
  await expect(page).toHaveTitle('Recursive workflow system — Marcus Udén');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://marcus.uden.dev/proof/recursive-workflow/');
  await expect(page.getByRole('link', { name: 'Download CV' })).toHaveAttribute('href', '../../assets/cv/marcus-uden-cv.pdf');
  await expect(page.getByRole('link', { name: 'Return to the hiring brief' })).toHaveAttribute('href', '../../');
});
