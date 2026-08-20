import { expect, test } from '@playwright/test';

const pages = [
  { path: '/', canonical: 'https://marcus.uden.dev/', title: 'Marcus Udén — Product judgment, execution, and AI-native leverage' },
  { path: '/proof/job-agent/', canonical: 'https://marcus.uden.dev/proof/job-agent/', title: 'Job-agent case study — Marcus Udén' },
  { path: '/proof/job-agent/demo/', canonical: 'https://marcus.uden.dev/proof/job-agent/demo/', title: 'Job-agent recruiter-safe prototype — Marcus Udén' }
];

for (const target of pages) {
  test(`${target.path} has unique identity and share metadata`, async ({ page }) => {
    await page.goto(target.path);
    await expect(page).toHaveTitle(target.title);
    await expect(page.locator('h1:visible')).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Marcus|Job-agent|synthetic/i);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', target.canonical);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', target.title);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', target.canonical);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://marcus.uden.dev/assets/social-card.png');
  });
}

test('home exposes valid Person structured data with the professional GitHub only', async ({ page }) => {
  await page.goto('/');
  const data = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  expect(data['@type']).toBe('ProfilePage');
  expect(data.mainEntity.name).toBe('Marcus Udén');
  expect(data.mainEntity.email).toBe('mailto:marcus.uden.dev@gmail.com');
  expect(data.mainEntity.sameAs).toEqual(['https://github.com/marcus-uden-dev']);
});

test('robots and sitemap publish one canonical identity', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text();
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(robots).toContain('Sitemap: https://marcus.uden.dev/sitemap.xml');
  expect(sitemap).toContain('<loc>https://marcus.uden.dev/</loc>');
  expect(sitemap).toContain('<loc>https://marcus.uden.dev/proof/job-agent/</loc>');
  expect(sitemap).not.toContain('github.io');
});

test('CV and interview actions use the approved public assets and email', async ({ page, request }) => {
  await page.goto('/');
  for (const link of await page.getByRole('link', { name: 'Download CV' }).all()) {
    await expect(link).toHaveAttribute('href', 'assets/cv/marcus-uden-cv.pdf');
    await expect(link).toHaveAttribute('download', '');
  }
  await expect(page.getByRole('link', { name: 'Request an interview' })).toHaveAttribute('href', /^mailto:marcus\.uden\.dev@gmail\.com/);
  const cv = await request.get('/assets/cv/marcus-uden-cv.pdf');
  expect(cv.ok()).toBeTruthy();
  expect((await cv.body()).subarray(0, 4).toString()).toBe('%PDF');
});

test('project-subpath navigation keeps relative assets and downloads valid', async ({ page }) => {
  await page.goto('/ai-native-proof-of-work/');
  await expect(page.locator('link[rel="stylesheet"]')).toHaveAttribute('href', 'assets/css/site.css');
  await page.getByRole('link', { name: /Open the guided case study/ }).click();
  await expect(page).toHaveURL(/\/ai-native-proof-of-work\/proof\/job-agent\/$/);
  await expect(page.getByRole('link', { name: 'Download CV' })).toHaveAttribute('href', '../../assets/cv/marcus-uden-cv.pdf');
});

