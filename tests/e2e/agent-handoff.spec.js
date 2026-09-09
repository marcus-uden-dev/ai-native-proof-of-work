import { expect, test } from './fixtures.js';

test('llms discovery file points to the normative public evidence contract', async ({ request }) => {
  const response = await request.get('/llms.txt');
  expect(response.ok()).toBeTruthy();
  const text = await response.text();
  expect(text).toContain('recruiter-agent-guide.md');
  expect(text).toContain('job-agent-v2.json');
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
  expect(text).toMatch(/Not evidenced by the current public source route/i);
});

test('homepage generates a copyable repository interview prompt without embedding a chat', async ({ context, page }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.route('**/assets/js/recruiter-review-config.js', (route) => route.fulfill({
    contentType: 'application/javascript',
    body: 'window.RECRUITER_REVIEW_API = {};'
  }));
  await page.goto('/');
  await page.getByLabel('Ask about Marcus or paste a job description').fill('What evidence is there of product judgment?');
  await page.getByRole('button', { name: 'Generate review prompt' }).click();
  await expect(page.getByRole('heading', { name: 'Your review prompt' })).toBeVisible();
  await page.getByRole('button', { name: 'Copy prompt' }).click();
  await expect(page.locator('#copyStatus')).toContainText('Prompt copied.');
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard).toContain('Public repository:');
  expect(clipboard).toContain('What evidence is there of product judgment?');
  expect(clipboard).toContain('Do not use private paths, raw sessions, secrets, or unsupported claims.');
  await expect(page.getByRole('link', { name: 'Proof repository' })).toHaveAttribute('href', 'https://github.com/marcus-uden-dev/ai-native-proof-of-work');
  await expect(page.getByRole('link', { name: 'Read job description prompt' })).toHaveAttribute('href', 'job-description-prompt.html');
  const promptPage = await context.newPage();
  const promptResponse = await promptPage.goto('/job-description-prompt.html');
  expect(promptResponse?.status()).toBe(200);
  await expect(promptPage.getByRole('heading', { name: 'Job description prompt' })).toBeVisible();
  await expect(promptPage.getByText('Paste a non-confidential job description here')).toBeVisible();
  const generatorActions = page.locator('.generator-actions');
  await expect(generatorActions.getByRole('button', { name: 'Generate review prompt' })).toBeVisible();
  await expect(generatorActions.getByRole('link', { name: 'Open ChatGPT' })).toHaveAttribute('href', 'https://chatgpt.com/');
  const resultActions = page.locator('.button-row');
  await expect(resultActions.getByRole('link', { name: 'Open GitHub' })).toHaveAttribute('href', 'https://github.com/marcus-uden-dev');
  await expect(resultActions.getByRole('link', { name: 'Open ChatGPT' })).toHaveAttribute('href', 'https://chatgpt.com/');
  await expect(resultActions.locator('button, a')).toHaveCount(3);
  const actionControls = generatorActions.locator('button, a');
  await expect(actionControls).toHaveCount(3);
  await expect(actionControls.nth(0)).toHaveText('Generate review prompt');
  await expect(actionControls.nth(1)).toHaveText(/Open ChatGPT/);
  await expect(actionControls.nth(2)).toHaveText('Clear');
  await expect(page.locator('iframe')).toHaveCount(0);
  await expect(page.locator('form')).toHaveCount(0);
});

test('repository review uses separate prompt contracts for a question and a role description', async ({ page }) => {
  await page.route('**/assets/js/recruiter-review-config.js', (route) => route.fulfill({
    contentType: 'application/javascript',
    body: 'window.RECRUITER_REVIEW_API = {};'
  }));
  await page.goto('/');
  const input = page.getByLabel('Ask about Marcus or paste a job description');

  await input.fill('What public evidence shows Marcus’s product judgment?');
  await expect(page.locator('#inputClassification')).toContainText('Detected mode: evidence question.');
  await page.getByRole('button', { name: 'Generate review prompt' }).click();
  await expect(page.locator('#repositoryPrompt')).toContainText('RECRUITER QUESTION:');
  await expect(page.locator('#repositoryPrompt')).not.toContainText('Experience Fit Map dimensions');

  await input.fill('Role: Product operations lead\n\nResponsibilities\n- Improve cross-functional workflows\n\nRequirements\n- Experience with evidence-based product decisions');
  await expect(page.locator('#inputClassification')).toContainText('Detected mode: role assessment.');
  await page.getByRole('button', { name: 'Generate review prompt' }).click();
  await expect(page.locator('#repositoryPrompt')).toContainText('ROLE DESCRIPTION:');
  await expect(page.locator('#repositoryPrompt')).toContainText('Experience Fit Map dimensions');

  await page.getByRole('button', { name: 'Ask about Marcus' }).click();
  await expect(page.locator('#inputClassification')).toContainText('Selected mode: evidence question.');
  await page.getByRole('button', { name: 'Generate review prompt' }).click();
  await expect(page.locator('#repositoryPrompt')).toContainText('RECRUITER QUESTION:');
});

test('the existing repository review panel renders a cited AI role assessment when configured', async ({ page }) => {
  const dimensions = [
    ['product-framing', 'Product framing'],
    ['workflow-design', 'Workflow design'],
    ['ai-native-execution', 'AI-native execution'],
    ['evidence-synthesis', 'Evidence synthesis'],
    ['operational-collaboration', 'Operational collaboration'],
    ['technical-delivery', 'Technical delivery'],
    ['business-prioritisation', 'Business prioritisation']
  ].map(([id, label], index) => ({
    id,
    label,
    state: index === 1 ? 'direct' : 'not_evidenced',
    explanation: index === 1 ? 'The CV documents product operations and workflow design.' : 'The public record needs interview validation for this role requirement.',
    evidenceIds: index === 1 ? ['cv-product-operations'] : index === 2 ? ['unknown-evidence-id'] : [],
    verificationQuestion: index === 1 ? '' : `Ask Marcus about ${label.toLowerCase()}.`
  }));
  await page.route('**/assets/js/recruiter-review-config.js', (route) => route.fulfill({
    contentType: 'application/javascript',
    body: "window.RECRUITER_REVIEW_API = { endpoint: '/api/recruiter-review' };"
  }));
  await page.route('**/api/recruiter-review', async (route) => {
    const request = route.request();
    expect(request.method()).toBe('POST');
    expect((await request.postDataJSON()).mode).toBe('role');
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        kind: 'role',
        assessment: {
          summary: 'The public record directly documents workflow-design evidence for this role.',
          roleNeeds: ['Workflow design'],
          dimensions,
          roleCoverage: [{
            capabilityId: 'systems-api-integration',
            label: 'Systems, APIs, and integrations',
            roleNeed: 'API layer design and integration',
            state: 'direct',
            explanation: 'The public record documents systems and workflow delivery.',
            evidenceIds: ['cv-product-operations'],
            verificationQuestion: ''
          }],
          evidenceAnchors: ['cv-product-operations'],
          interviewQuestions: [],
          limitations: ['This is public evidence coverage, not a hiring decision.']
        },
        evidenceSources: [
          {
            id: 'cv-product-operations',
            label: 'CV: product operations and workflow design',
            sourceClass: 'employment',
            url: 'https://marcus-uden-dev.github.io/ai-native-proof-of-work/cv/'
          },
          {
            id: 'unknown-evidence-id',
            label: 'Decision log: workflow evidence',
            sourceClass: 'public-repository',
            url: 'https://github.com/marcus-uden-dev/ai-native-proof-of-work/blob/main/site/evidence/decision-log.json'
          }
        ]
      })
    });
  });

  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Review with AI' })).toBeVisible();
  await page.getByLabel('Ask about Marcus or paste a job description').fill('Role: Product operations lead\n\nResponsibilities\n- Improve cross-functional workflows');
  await page.getByRole('button', { name: 'Review with AI' }).click();
  await expect(page.getByRole('heading', { name: 'AI review' })).toBeVisible();
  await expect(page.locator('.experience-fit-radar__svg')).toBeVisible();
  await expect(page.locator('.experience-fit-track .evidence-state--direct')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Role-specific needs detected' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Role-specific evidence coverage' })).toBeVisible();
  await expect(page.getByText('API layer design and integration')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Evidence limits' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'CV: product operations and workflow design ↗' }).first()).toHaveAttribute('href', 'https://marcus-uden-dev.github.io/ai-native-proof-of-work/cv/');
  await expect(page.getByRole('link', { name: 'Decision log: workflow evidence ↗' })).toHaveAttribute('href', 'https://github.com/marcus-uden-dev/ai-native-proof-of-work/blob/main/site/evidence/decision-log.json');
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.locator('.role-coverage__list').evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length)).toBe(1);
});

test('repository interview keeps the preview typography and full-width brown surface', async ({ page }) => {
  await page.goto('/');
  const metrics = await page.locator('#ai-review').evaluate((section) => {
    const card = section.querySelector('.agent-card');
    const heading = section.querySelector('.agent-copy h2');
    const sectionStyle = getComputedStyle(section);
    const cardStyle = getComputedStyle(card);
    const headingStyle = getComputedStyle(heading);
    return {
      left: section.getBoundingClientRect().left,
      width: section.getBoundingClientRect().width,
      documentWidth: document.documentElement.clientWidth,
      background: sectionStyle.backgroundColor,
      cardBackground: cardStyle.backgroundColor,
      cardRadius: cardStyle.borderRadius,
      headingFamily: headingStyle.fontFamily,
      headingWeight: headingStyle.fontWeight
    };
  });

  expect(metrics.left).toBe(0);
  expect(metrics.width).toBe(metrics.documentWidth);
  expect(metrics.background).toBe('rgb(32, 27, 18)');
  expect(metrics.cardBackground).toBe('rgba(0, 0, 0, 0)');
  expect(metrics.cardRadius).toBe('0px');
  expect(metrics.headingFamily).toContain('Georgia');
  expect(metrics.headingWeight).toBe('500');
});

test('a saved smoke test renders through the live recruiter-review interface', async ({ page }) => {
  await page.goto('/?smoke=spotify-customer-service-platform#ai-review');

  await expect(page.getByRole('heading', { name: 'AI review' })).toBeVisible();
  await expect(page.getByText('Saved smoke test: Spotify — Customer Service Platform. Public evidence coverage only.')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Source role listing ↗' })).toHaveAttribute('href', 'https://jobs.lever.co/spotify/7f0a8faa-f4f5-4db9-9f51-4101d6a29b34');
  await expect(page.getByText('Role reviewed: Spotify — Customer Service Platform')).toBeVisible();
  await expect(page.locator('.experience-fit-radar__axis-label')).toHaveCount(7);
  await expect(page.locator('.experience-fit-state-bar')).toHaveCount(12);
  await expect(page.getByRole('heading', { name: 'Role-specific evidence coverage' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'strengthen the API layer connecting support systems' })).toBeVisible();
  await expect(page.locator('.experience-fit-track')).toHaveCount(7);
  await expect(page.locator('.role-coverage__item')).toHaveCount(5);
});

test('repository interview rejects empty input and keeps the static prompt fallback', async ({ browser, page: activePage }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Read the role-assessment prompt' })).toHaveAttribute('href', 'repository-interview-prompt.txt');
  await expect(page.getByRole('link', { name: 'read the evidence-question prompt' })).toHaveAttribute('href', 'repository-question-prompt.txt');
  await context.close();

  await activePage.route('**/assets/js/recruiter-review-config.js', (route) => route.fulfill({
    contentType: 'application/javascript',
    body: 'window.RECRUITER_REVIEW_API = {};'
  }));
  await activePage.goto('/');
  await activePage.getByRole('button', { name: 'Generate review prompt' }).click();
  await expect(activePage.locator('#inputError')).toContainText('Add a question or paste a job description first.');
  await expect(activePage.locator('#generatorResult')).toBeHidden();
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
  const manifestResponse = await request.get('/evidence/releases/job-agent-v2.json');
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
