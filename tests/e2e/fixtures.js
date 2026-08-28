import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('marcus-proof-preview-unlocked', '1');
    });
    await use(page);
  }
});

export { expect };
