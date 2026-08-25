import { expect, test } from '@playwright/test';

const viewports = [
  { width: 375, height: 900 },
  { width: 768, height: 900 },
  { width: 1024, height: 900 },
  { width: 1440, height: 1000 }
];

for (const viewport of viewports) {
  test(`entry point has no horizontal overflow at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('messy operational problems');
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    await expect(page.locator('main section').first()).toHaveAttribute('aria-labelledby', 'hero-title');
    await expect(page.getByRole('link', { name: 'Review fit with AI' })).toBeVisible();
  });
}

test('core positioning and actions remain available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByText('Experienced individual contributor')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download CV' }).first()).toHaveAttribute('href', 'assets/cv/marcus-uden-cv.pdf');
  await expect(page.getByRole('link', { name: /Open the guided case study/ })).toHaveAttribute('href', 'proof/job-agent/');
  await expect(page.getByRole('link', { name: 'Request an interview' })).toHaveAttribute('href', /mailto:/);
  await expect(page.getByRole('link', { name: 'Review fit with AI' })).toHaveAttribute('href', '#ai-review');
  await expect(page.getByRole('heading', { name: 'How the work is thought through.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open the WIP Oracle preview' })).toHaveAttribute('href', 'profile-oracle/');
  await context.close();
});

test('keyboard navigation exposes visible focus and accurate names', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to the hiring brief' })).toBeFocused();
  await expect(page.getByRole('link', { name: 'Skip to the hiring brief' })).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Marcus Udén, home' })).toBeFocused();
});

test('the quiet repository link is reachable after the primary nav and has a visible focus outline', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const repoLink = page.getByRole('link', { name: /Browse proof-of-work repo/ });
  await expect(repoLink).toHaveAttribute('href', 'https://github.com/marcus-uden-dev/ai-native-proof-of-work');
  await repoLink.focus();
  await expect(repoLink).toHaveCSS('outline-style', 'solid');
});

test('print mode keeps evidence and hides navigation controls', async ({ page }) => {
  await page.goto('/');
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.masthead')).toBeHidden();
  await expect(page.getByRole('heading', { name: 'Why Marcus for hands-on product work?' })).toBeVisible();
  await expect(page.locator('#selected-proof').getByRole('heading', { name: 'Job-agent', exact: true })).toBeVisible();
  await expect(page.getByText('Working title', { exact: true })).toBeVisible();
});

test('reduced-motion preference removes smooth movement', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
  const motion = await page.locator('.button').first().evaluate((element) => ({
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    transitionDuration: Number.parseFloat(getComputedStyle(element).transitionDuration)
  }));
  expect(motion.scrollBehavior).toBe('auto');
  expect(motion.transitionDuration).toBeLessThanOrEqual(0.001);
});

test('the quiet repository link is consistent across every masthead page', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const path of ['/', '/proof/job-agent/', '/proof/recursive-workflow/']) {
    await page.goto(path);
    await expect(page.getByRole('link', { name: /Browse proof-of-work repo/ })).toHaveAttribute('href', 'https://github.com/marcus-uden-dev/ai-native-proof-of-work');
  }
});

test('project subpath and the recovery page resolve', async ({ page }) => {
  await page.goto('/ai-native-proof-of-work/');
  await expect(page.locator('h1')).toContainText('messy operational problems');
  const response = await page.goto('/missing-route');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'This page is not part of the current public release.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Return to the hiring brief' })).toBeVisible();
});
