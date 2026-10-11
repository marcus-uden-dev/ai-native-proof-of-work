import { expect, test } from '@playwright/test';

test('shows the public proof-of-work site without a password gate', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body > .access-gate')).toHaveCount(0);
  await expect(page.locator('body > header')).toBeVisible();
  await expect(page.locator('h1')).toContainText('messy operational problems');

  await page.goto('/proof/job-agent/');
  await expect(page.locator('body > .access-gate')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Make each job decision more deliberate.' })).toBeVisible();
});

test('the demo route is also public', async ({ page }) => {
  await page.goto('/proof/job-agent/demo/');
  await expect(page.locator('body > .access-gate')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Explore the current Job-agent shell.' })).toBeVisible();
});
