import { expect, test } from './fixtures.js';
import { resolve } from 'node:path';

const axePath = resolve('node_modules/axe-core/axe.min.js');
const routes = [
  '/',
  '/proof/job-agent/',
  '/proof/job-agent/demo/#research',
  '/proof/recursive-workflow/'
];

for (const route of routes) {
  for (const viewport of [{ width: 375, height: 900 }, { width: 1440, height: 1000 }]) {
    test(`${route} has no automated WCAG A or AA violations at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(route);
      await page.addScriptTag({ path: axePath });
      const results = await page.evaluate(async () => window.axe.run(document, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']
        }
      }));
      const violationSummary = results.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary
        }))
      }));
      expect(results.violations, JSON.stringify(violationSummary, null, 2)).toEqual([]);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
}

test('primary conversion controls meet the 44-pixel design target', async ({ page }) => {
  await page.goto('/');
  for (const control of await page.locator('.button:visible').all()) {
    const box = await control.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  }
});
