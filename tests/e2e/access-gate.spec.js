import { expect, test } from '@playwright/test';

test('shows a WIP password gate before the preview and unlocks the session with the approved password', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Private preview · WIP')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'This site is still being finished.' })).toBeVisible();
  await expect(page.locator('body > .access-gate')).toBeVisible();
  await expect(page.locator('body > header')).toBeHidden();

  await page.getByLabel('Preview password').fill('wrong');
  await page.getByRole('button', { name: 'Open preview' }).click();
  await expect(page.getByRole('alert')).toContainText('did not match');

  await page.evaluate(() => {
    const approvedHash = 'cbdd10d72000b3a4068a0ea6c99aec6b306c0d49beb065c105143ee2e815256f';
    const digestBytes = Uint8Array.from(approvedHash.match(/.{2}/g).map((byte) => Number.parseInt(byte, 16)));
    crypto.subtle.digest = async () => digestBytes.buffer;
  });
  await page.getByLabel('Preview password').fill('approved-preview-password');
  await page.getByRole('button', { name: 'Open preview' }).click();
  await expect(page.locator('body > .access-gate')).toHaveCount(0);
  await expect(page.locator('body > header')).toBeVisible();
  await expect(page.locator('h1')).toContainText('messy operational problems');

  await page.goto('/proof/job-agent/');
  await expect(page.locator('body > .access-gate')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Make each job decision more deliberate.' })).toBeVisible();
});

test('the demo route also shows the WIP gate before access', async ({ page }) => {
  await page.goto('/proof/job-agent/demo/');
  await expect(page.getByText('Private preview · WIP')).toBeVisible();
  await expect(page.locator('body > .access-gate')).toBeVisible();
});
