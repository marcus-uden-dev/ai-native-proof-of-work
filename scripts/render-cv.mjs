import { chromium } from '@playwright/test';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error('Usage: node scripts/render-cv.mjs <input-html> <output-pdf>');
  process.exit(1);
}

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(resolve(input)).href, { waitUntil: 'load' });
  await page.pdf({
    path: resolve(output),
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true
  });
} finally {
  await browser.close();
}

