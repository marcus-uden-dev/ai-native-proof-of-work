import { expect, test } from '@playwright/test';

for (const route of ['/', '/proof/job-agent/', '/proof/job-agent/demo/', '/proof/job-agent/archive/0.8-public-proof/', '/proof/job-agent/archive/0.8-public-proof/demo/', '/proof/recursive-workflow/', '/cv/']) {
  test(`public route ${route} loads the disabled password-gate toggle`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('body > .access-gate')).toHaveCount(0);
    await expect(page.locator('body > header, body > main').first()).toBeVisible();
    await expect.poll(() => page.evaluate(() => performance.getEntriesByType('resource')
      .some((entry) => new URL(entry.name).pathname.endsWith('/assets/js/access-gate.js')))).toBe(true);
  });
}
