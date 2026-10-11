import { expect, test } from '@playwright/test';

for (const route of ['/', '/proof/job-agent/', '/proof/job-agent/demo/', '/proof/recursive-workflow/', '/cv/']) {
  test(`public route ${route} loads without a password gate`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('body > .access-gate')).toHaveCount(0);
    await expect(page.locator('body > header, body > main').first()).toBeVisible();
  });
}
