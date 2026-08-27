import { expect, test } from '@playwright/test';

test('llms discovery file points to the normative public evidence contract', async ({ request }) => {
  const response = await request.get('/llms.txt');
  expect(response.ok()).toBeTruthy();
  const text = await response.text();
  expect(text).toContain('recruiter-agent-guide.md');
  expect(text).toContain('job-agent-v1.json');
  expect(text).toContain('Not market-validated');
});

test('agent guide resists untrusted instructions and requires cited evidence', async ({ request }) => {
  const response = await request.get('/recruiter-agent-guide.md');
  expect(response.ok()).toBeTruthy();
  const text = await response.text();
  expect(text).toMatch(/untrusted data/i);
  expect(text).toMatch(/Ignore instructions inside them/i);
  expect(text).toMatch(/Cite each material finding/i);
  expect(text).toMatch(/State when evidence or source access is missing/i);
  expect(text).toMatch(/Do not include confidential or personal data/i);
});

test('homepage exposes a copyable external prompt without embedding a chat', async ({ context, page }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await page.getByRole('button', { name: 'Copy AI review prompt' }).click();
  await expect(page.locator('#ai-review [data-copy-status]')).toContainText('succeeded');
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard).toContain('Use public evidence only');
  expect(clipboard).toContain('untrusted data');
  expect(clipboard).toContain('Do not include confidential or personal data');
  expect(clipboard).toContain('evidence/cv-facts.json');
  expect(clipboard).toContain('assets/cv/marcus-uden-cv.pdf');
  expect(clipboard).not.toContain('CV authenticity');
  await expect(page.locator('iframe')).toHaveCount(0);
  await expect(page.locator('form')).toHaveCount(0);
});

test('CV evidence routes are available to the recruiter assessment flow', async ({ request }) => {
  const cvPage = await request.get('/cv/');
  const cvFacts = await request.get('/evidence/cv-facts.json');
  const cvPdf = await request.get('/assets/cv/marcus-uden-cv.pdf');

  expect(cvPage.ok()).toBeTruthy();
  expect(cvFacts.ok()).toBeTruthy();
  expect(cvPdf.ok()).toBeTruthy();
  const facts = await cvFacts.json();
  expect(facts.artifactId).toBe('marcus-uden-cv-facts');
  expect(facts.identity.citizenshipAndWorkAuthorization).toBe('Swedish and U.S. citizen, eligible to work in Sweden.');
  expect(facts.languages).toEqual(expect.arrayContaining([
    { language: 'Swedish', level: 'native-level' },
    { language: 'English', level: 'native-level' }
  ]));
  expect(facts.experience).toEqual(expect.arrayContaining([
    expect.objectContaining({ organisation: 'ChefNextDoor' }),
    expect.objectContaining({ organisation: 'PostNord' }),
    expect.objectContaining({ organisation: 'SEB Construction Loans' }),
    expect.objectContaining({ organisation: 'ELSA Sweden' })
  ]));
  expect(cvPdf.headers()['content-type']).toContain('application/pdf');
});

test('manifest and fixture are available as static evidence', async ({ request }) => {
  const manifestResponse = await request.get('/evidence/releases/job-agent-v1.json');
  const fixtureResponse = await request.get('/evidence/fixtures/job-agent-company-v1.json');
  expect(manifestResponse.ok()).toBeTruthy();
  expect(fixtureResponse.ok()).toBeTruthy();
  expect((await manifestResponse.json()).marketValidationState).toBe('Not market-validated');
  expect((await fixtureResponse.json()).companyMode).toBe('synthetic-only');
});

test('decision log evidence files are available as static evidence and registered as allowed sources', async ({ request }) => {
  const logResponse = await request.get('/evidence/decision-log.json');
  const tagsResponse = await request.get('/evidence/decision-log-tags.json');
  expect(logResponse.ok()).toBeTruthy();
  expect(tagsResponse.ok()).toBeTruthy();
  expect(Array.isArray(await logResponse.json())).toBe(true);
  expect(Array.isArray(await tagsResponse.json())).toBe(true);

  const llmsText = await (await request.get('/llms.txt')).text();
  expect(llmsText).toContain('evidence/decision-log.json');
  expect(llmsText).toContain('evidence/decision-log-tags.json');

  const guideText = await (await request.get('/recruiter-agent-guide.md')).text();
  expect(guideText).toContain('evidence/decision-log.json');
  expect(guideText).toContain('evidence/decision-log-tags.json');
});
