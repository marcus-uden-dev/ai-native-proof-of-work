import { expect, test } from './fixtures.js';

test('homepage selected proof shows the lead case and supporting profile signals', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('#selected-proof .proof-card');
  await expect(cards).toHaveCount(3);
  await expect(cards.nth(0).getByText('Lead proof', { exact: true })).toBeVisible();
  await expect(cards.nth(1).getByText('Supporting proof', { exact: true })).toBeVisible();
  await expect(cards.nth(1)).toContainText('Recursive workflow system');
  await expect(cards.nth(1).getByRole('link', { name: /Open the recursive workflow proof/ })).toHaveAttribute('href', 'proof/recursive-workflow/');
  await expect(cards.nth(2).getByText('Supporting profile signal', { exact: true })).toBeVisible();
  await expect(cards.nth(2)).toContainText('Information diet');
  await expect(cards.nth(2).getByRole('link', { name: /Open the information diet evidence/ })).toHaveAttribute('href', 'proof/information-diet/');
});

test('homepage states the system loop beneath the intact product loop', async ({ page }) => {
  await page.goto('/');
  const method = page.locator('section[aria-labelledby="method-title"]');
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
  await expect(page.getByText(/No important instruction is updated without human review/)).toBeVisible();
});

test('the Autoresearch section names the actual quality-filter criteria', async ({ page }) => {
  await page.goto('/proof/recursive-workflow/');
  const autoresearch = page.locator('#autoresearch');
  for (const criterion of ['primary source', 'reproducible', 'practical', 'relevant', 'low-hype']) {
    await expect(autoresearch).toContainText(criterion);
  }
  // U1 regression: the existing example article is untouched by this unit
  await expect(autoresearch).toContainText('A pattern, not a headline');
  await expect(autoresearch).toContainText('A recurring signal found during research');
});

test('the daily-automation section names at least three task layers', async ({ page }) => {
  await page.goto('/proof/recursive-workflow/');
  const automation = page.locator('section[aria-labelledby="automation-title"]');
  await expect(automation).toContainText('daily verifier');
  await expect(automation).toContainText('weekly compiler');
  await expect(automation).toContainText(/kill-switch review/i);
});

test('the promotion section states a named example and the pattern-to-destination mapping', async ({ page }) => {
  await page.goto('/proof/recursive-workflow/');
  const promotion = page.locator('#promotion');
  await expect(promotion).toContainText('lessons file');
  await expect(promotion).toContainText('prevention checks');
  await expect(promotion.getByText('A repeated prompt becomes a template or instruction.')).toBeVisible();
  await expect(promotion.getByText('A repeated review step becomes a checklist.')).toBeVisible();
  await expect(promotion.getByText('A repeated schedule need becomes a scheduled task.')).toBeVisible();
  // existing human-gate/kill-switch rules remain present, not crowded out
  await expect(promotion.getByText(/No important instruction is updated without human review/)).toBeVisible();
});

test('the loops section carries a two-loop diagram with a labeled human-gate branch', async ({ page }) => {
  await page.goto('/proof/recursive-workflow/');
  const diagram = page.locator('.loop-diagram');
  await expect(diagram).toBeVisible();
  for (const step of ['Execute', 'Review', 'Detect pattern', 'Human gate']) {
    await expect(diagram).toContainText(step);
  }
  await expect(diagram.getByText('Confirmed pattern', { exact: true })).toBeVisible();
  await expect(diagram.getByText('Promote → next cycle', { exact: true })).toBeVisible();
  await expect(diagram.getByText('One-off', { exact: true })).toBeVisible();
  await expect(diagram.getByText('Not promoted, discarded', { exact: true })).toBeVisible();
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

test('the decision log content is present in the raw HTML response, with no JavaScript required', async ({ request }) => {
  const response = await request.get('/proof/recursive-workflow/');
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  expect(html).toContain('id="decision-log"');
  expect(html).toContain('<!-- DECISION_LOG_ENTRIES:BEGIN -->');
  expect(html).toContain('<!-- DECISION_LOG_ENTRIES:END -->');
  expect(html).toContain('2026-08-09');
  expect(html).toContain('telemetry and outcome learning');
  expect(html).toContain('pricing hypotheses');
  expect(html).not.toContain('No entries yet — check back after the next weekly run.');
  expect(html).toContain('evidence/decision-log.json');
  expect(html).toContain('evidence/decision-log-tags.json');
});

test('the decision log reuses the limitations-list--stacked component rather than a bespoke card grid', async ({ page }) => {
  await page.goto('/proof/recursive-workflow/');
  const list = page.locator('#decision-log ul');
  await expect(list).toHaveClass(/limitations-list/);
  await expect(list).toHaveClass(/limitations-list--stacked/);
});

test('the decision log renders the newest published entry', async ({ page }) => {
  await page.goto('/proof/recursive-workflow/');
  const section = page.locator('#decision-log');
  await expect(section).toBeVisible();
  await expect(section.getByText('2026-08-24')).toBeVisible();
  await expect(section.getByText('Framed the operating layer as the evolving system behind the products rather than presenting the portfolio infrastructure as a product by itself.')).toBeVisible();
});

test('the Oracle project and capability filters reveal the matching decisions', async ({ page }) => {
  await page.goto('/proof/recursive-workflow/');
  const entries = page.locator('#decision-timeline > li[data-project]');

  await page.getByRole('button', { name: /Job-agent/ }).click();
  await expect(page.locator('[data-scroll-status]')).toContainText('6 decisions');
  expect(await entries.evaluateAll((items) => items.filter((item) => !item.hidden).length)).toBe(6);
  expect(await entries.evaluateAll((items) => items.filter((item) => item.hidden).length)).toBe(11);

  await page.getByRole('button', { name: 'evidence-driven', exact: true }).click();
  await expect(page.locator('[data-scroll-status]')).toContainText('4 decisions');
  expect(await entries.evaluateAll((items) => items.filter((item) => !item.hidden).length)).toBe(4);

  await page.getByRole('button', { name: /All decisions/ }).click();
  await expect(page.locator('[data-scroll-status]')).toContainText('17 decisions');
  expect(await entries.evaluateAll((items) => items.filter((item) => !item.hidden).length)).toBe(17);
});

test('the compact decision timeline auto-scrolls and pauses on interaction', async ({ page }) => {
  await page.goto('/proof/recursive-workflow/');
  const viewport = page.locator('.decision-log-viewport');
  await expect(viewport).toHaveAttribute('data-auto-scroll', 'true');
  await page.waitForTimeout(1300);
  const positionBeforePause = await viewport.evaluate((element) => element.scrollTop);
  expect(positionBeforePause).toBeGreaterThan(0);
  await viewport.hover();
  await expect(page.locator('[data-scroll-status]')).toContainText('Paused');
  const positionAfterPause = await viewport.evaluate((element) => element.scrollTop);
  await page.waitForTimeout(250);
  expect(await viewport.evaluate((element) => element.scrollTop)).toBe(positionAfterPause);
});

test('the decision log links to its structured evidence files with working relative paths', async ({ page }) => {
  await page.goto('/proof/recursive-workflow/');
  const section = page.locator('#decision-log');
  await expect(section.getByRole('link', { name: 'decision-log.json' })).toHaveAttribute('href', '../../evidence/decision-log.json');
  await expect(section.getByRole('link', { name: 'capability tag taxonomy' })).toHaveAttribute('href', '../../evidence/decision-log-tags.json');
});
