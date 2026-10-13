/** Smoke-test the actual published Pages site, not the local development server. */
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';
import { SUBJECTS } from '../src/subjects.js';

const base = new URL(process.env.PAGES_URL || 'https://zjjxwpstcnsm-gif.github.io/stock/');
assert.equal(base.protocol, 'https:');
const { assetVersion } = JSON.parse(await readFile('dist/version.json', 'utf8'));
const output = 'published-verification';
await mkdir(output, { recursive: true });
const report = { url: base.href, assetVersion, commit: process.env.GITHUB_SHA || null, checks: [], errors: [] };
let browser;
try {
  // Pages/CDN publication is asynchronous. Require the exact built asset version.
  let published = false;
  for (let attempt = 0; attempt < 12; attempt++) {
    try {
      const url = new URL('version.json', base);
      url.searchParams.set('v', assetVersion);
      url.searchParams.set('attempt', String(attempt));
      const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(15000) });
      published = response.ok && (await response.json()).assetVersion === assetVersion;
    } catch { /* A temporary CDN/HTTP failure is retried, never treated as success. */ }
    if (published) break;
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
  assert.ok(published, `Pages did not publish asset version ${assetVersion}`);
  browser = await chromium.launch();
  for (const [device, viewport] of [['desktop', { width: 1440, height: 1050 }], ['mobile', { width: 390, height: 844 }]]) {
    const context = await browser.newContext({ viewport, isMobile: device === 'mobile', hasTouch: device === 'mobile' });
    const page = await context.newPage();
    const errors = [], assets = new Set();
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => {
      const url = new URL(request.url());
      if (url.origin === base.origin && /\/src\/.*\.(?:js|css)$/.test(url.pathname)) assets.add(url.href);
    });
    await page.goto(base.href, { waitUntil: 'networkidle' });
    await expect(page.locator('.study-home')).toBeVisible();
    await page.screenshot({ path: `${output}/${device}-home.png`, fullPage: true });
    await page.getByRole('button', { name: '开始随机刷题', exact: true }).click();
    await expect(page.locator('#question-title')).toBeVisible();
    assert.equal(new URL(page.url()).hash, '#drill');
    report.checks.push({ device, check: 'home opens random practice in one click' });
    for (const subject of Object.values(SUBJECTS)) {
      const url = new URL(base);
      url.searchParams.set('subject', subject.id);
      url.hash = 'drill';
      await page.goto(url.href, { waitUntil: 'networkidle' });
      await expect(page.locator('#question-title')).toBeVisible();
      await expect(page.locator('#main input, #main select, .drill-settings, .practice-filters, dialog[open]')).toHaveCount(0);
      await expect(page.locator('#answer-feedback')).toHaveCount(0);
      const stem = await page.locator('#question-title').textContent();
      const question = subject.QUESTIONS.find(q => q.stem === stem);
      assert.ok(question, `Unknown published question for ${subject.id}`);
      const state = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), subject.practiceKey);
      assert.equal(state.active.drill.endless, true);
      assert.equal(state.active.drill.instant, true);
      assert.deepEqual(new Set(state.active.drill.pool), new Set(subject.QUESTIONS.map(q => q.id)));
      if (subject.id === 'options') await page.screenshot({ path: `${output}/${device}-question.png`, fullPage: true });
      for (const choice of Array.isArray(question.answer) ? question.answer : [question.answer]) {
        await page.locator(`#option-${choice}`).click();
      }
      if (Array.isArray(question.answer)) {
        await expect(page.locator('#answer-feedback')).toHaveCount(0);
        await page.getByRole('button', { name: '提交多选答案', exact: true }).click();
      }
      await expect(page.locator('#answer-feedback')).toContainText(question.explanation);
      await expect(page.locator('#question-title')).toHaveText(stem);
      await page.reload({ waitUntil: 'networkidle' });
      await expect(page.locator('#question-title')).toHaveText(stem);
      await expect(page.locator('#answer-feedback')).toContainText('回答正确');
      if (subject.id === 'options') await page.screenshot({ path: `${output}/${device}-answer.png`, fullPage: true });
      await page.locator('[data-action="drill-next"]').click();
      await expect(page.locator('#question-title')).not.toHaveText(stem);
      await expect(page.locator('#answer-feedback')).toHaveCount(0);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      report.checks.push({ device, subject: subject.id, check: 'direct start, full pool, answer, refresh and next question', passed: true });
    }
    assert.deepEqual(errors, []);
    assert.ok(assets.size > 20, 'Expected the published module graph to load');
    for (const asset of assets) assert.equal(new URL(asset).searchParams.get('v'), assetVersion, `Stale asset: ${asset}`);
    report.checks.push({ device, check: 'published module graph uses the exact built version', assets: assets.size, passed: true });
    await context.close();
  }
  console.log(`Published verification passed: ${report.checks.length} checks, asset version ${assetVersion}`);
} catch (error) {
  report.errors.push(error.stack || String(error));
  throw error;
} finally {
  if (browser) await browser.close();
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2) + '\n');
}
