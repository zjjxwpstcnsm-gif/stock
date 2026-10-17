/** Smoke-test the actual published Pages site, not the local development server. */
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';
import { SUBJECTS } from '../src/subjects.js';
import { coverageIndex, coverageSummary } from '../src/coverage-views.js';
import { COVERAGE_POLISH_BATCH, COVERAGE_POLISH_QUESTIONS } from '../src/coverage-polish-questions.js';

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
    await expect(page.locator('.concept-pair')).toHaveCount(3);
    await page.locator('.concept-pair>summary').first().click();
    await expect(page.locator('.concept-columns').first()).toBeVisible();
    report.checks.push({ device, check: 'published concept comparisons render and expand', passed: true });
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
      await expect(page.locator('.recap-count')).toHaveText('1 条');
      await page.locator('.drill-recap>summary').click();
      await page.locator('.recap-item>summary').first().click();
      await expect(page.locator('.recap-detail').first()).toContainText(question.explanation);
      const unchanged = await page.evaluate(key => localStorage.getItem(key), subject.practiceKey);
      await page.locator('.recap-item>summary').first().focus();
      await page.keyboard.press('1');
      await expect(page.locator('#answer-feedback')).toHaveCount(0);
      assert.equal(await page.evaluate(key => localStorage.getItem(key), subject.practiceKey), unchanged);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      report.checks.push({ device, subject: subject.id, check: 'direct start, full pool, answer, refresh, next and read-only recap', passed: true });
    }
    for (const id of ['fund1','fund2','fund3']) {
      const subject=SUBJECTS[id], rows=coverageIndex(subject), summary=coverageSummary(rows);
      const url=new URL(base);url.searchParams.set('subject',id);url.hash='coverage';
      await page.goto(url.href,{waitUntil:'networkidle'});
      await expect(page.locator('.coverage-objective')).toHaveCount(summary.total);
      await page.selectOption('#coverage-status','mapped');
      await expect(page.locator('.coverage-objective')).toHaveCount(summary.mapped);
      assert.ok(summary.mapped>0,'Expected actual exact-objective mappings');
      const row=rows.find(r=>r.hasDirect),card=page.locator(`[data-outline-code="${row.code}"]`);
      await card.locator('.coverage-matches summary').click();
      await expect(card).toContainText(row.directQuestions[0].stem);
      await expect(page.locator('.explanation')).toHaveCount(0);
      const before=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).active,subject.practiceKey);
      await card.locator('[data-action="coverage-practice"]').click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.locator('[data-action="cancel-dialog"]').click();
      assert.deepEqual(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).active,subject.practiceKey),before);
      await card.locator('[data-action="coverage-practice"]').click();
      await page.locator('#confirm-button').click();
      const stem=await page.locator('#question-title').textContent();
      const question=row.directQuestions.find(q=>q.stem===stem);assert.ok(question);
      await page.locator(`#option-${question.answer}`).click();
      await page.getByRole('button',{name:'确认答案',exact:true}).click();
      await expect(page.locator('.explanation')).toContainText(question.explanation);
      await page.getByRole('button',{name:'大纲清单',exact:true}).click();
      await expect(page.locator(`[data-outline-code="${row.code}"] .coverage-attempts`)).toContainText('1 /');
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
      if(id==='fund2')await page.screenshot({path:`${output}/${device}-coverage.png`,fullPage:true});
      report.checks.push({device,subject:id,check:'exact objective mappings, no answer leak, cancel preservation and confirmed practice',mapped:summary.mapped,total:summary.total,passed:true});
    }
    // Explicitly exercise newly added content; random draws alone may select old questions.
    const expansionContext = await browser.newContext({viewport, isMobile:device==='mobile', hasTouch:device==='mobile'});
    const expansionPage = await expansionContext.newPage();
    expansionPage.on('pageerror', error=>errors.push(error.message));
    for (const subject of Object.values(SUBJECTS)) {
      const question=subject.QUESTIONS.filter(q=>q.editorialBatch==='2026-10-14-expansion').at(-1);
      assert.ok(question, `Missing expansion for ${subject.id}`);
      const url=new URL(base);url.searchParams.set('subject',subject.id);url.hash=`practice?question=${question.id}`;
      await expansionPage.goto(url.href,{waitUntil:'networkidle'});
      await expect(expansionPage.locator('.practice-match')).toContainText('匹配 1 题');
      await expansionPage.getByRole('button',{name:'开始练习',exact:true}).click();
      await expect(expansionPage.locator('#question-title')).toHaveText(question.stem);
      await expect(expansionPage.locator('.option-rationales')).toHaveCount(0);
      await expansionPage.getByRole('radio').nth(question.answer).click();
      await expansionPage.getByRole('button',{name:'确认答案',exact:true}).click();
      await expect(expansionPage.locator('#answer-feedback')).toContainText('回答正确');
      await expansionPage.locator('.option-rationales summary').click();
      await expect(expansionPage.locator('.option-rationales article')).toHaveCount(4);
      for(const reason of question.rationales)await expect(expansionPage.locator('.option-rationales')).toContainText(reason);
      await expect(expansionPage.locator('.source')).toContainText(question.referenceSection);
      await expect(expansionPage.locator('.source')).toContainText('AI辅助');
      assert.ok(await expansionPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
      await expansionPage.screenshot({path:`${output}/${device}-${subject.id}-expansion-answer.png`,fullPage:true});
      report.checks.push({device,subject:subject.id,question:question.id,check:'published expansion answer, four rationales, source and AI attribution',passed:true});
    }
    await expansionContext.close();
    const polishContext = await browser.newContext({viewport, isMobile:device==='mobile', hasTouch:device==='mobile'});
    const polishPage = await polishContext.newPage();
    polishPage.on('pageerror', error=>errors.push(error.message));
    for (const id of ['fund1','fund2','fund3']) {
      const subject=SUBJECTS[id], questions=COVERAGE_POLISH_QUESTIONS[id];
      const question=questions.find(q=>q.polishCalculation) || questions[0];
      assert.equal(questions.length,12);
      const url=new URL(base);url.searchParams.set('subject',id);
      await polishPage.goto(url.href,{waitUntil:'networkidle'});
      const shortcut=polishPage.locator(`.content-update [data-batch="${COVERAGE_POLISH_BATCH}"]`);
      await expect(shortcut).toContainText('12 题');
      await shortcut.click();
      await expect(polishPage.locator('.practice-match')).toContainText('匹配 12 题');
      url.hash=`practice?question=${question.id}`;
      await polishPage.goto(url.href,{waitUntil:'networkidle'});
      await polishPage.getByRole('button',{name:'开始练习',exact:true}).click();
      await expect(polishPage.locator('#question-title')).toHaveText(question.stem);
      await expect(polishPage.locator('#main')).not.toContainText(question.explanation);
      await polishPage.getByRole('radio').nth(question.answer).click();
      await polishPage.getByRole('button',{name:'确认答案',exact:true}).click();
      await expect(polishPage.locator('#answer-feedback')).toContainText(question.explanation);
      await polishPage.locator('.option-rationales summary').click();
      await expect(polishPage.locator('.option-rationales article')).toHaveCount(4);
      for(const reason of question.rationales)await expect(polishPage.locator('.option-rationales')).toContainText(reason);
      await expect(polishPage.locator('.source')).toContainText(question.referenceSection);
      await expect(polishPage.locator('.source a').first()).toHaveAttribute('href',subject.SOURCES[question.source].url);
      assert.ok(await polishPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
      await polishPage.screenshot({path:`${output}/${device}-${id}-coverage-polish.png`,fullPage:true});
      report.checks.push({device,subject:id,question:question.id,check:'published October 17 batch shortcut, original case, four rationales and primary source',passed:true});
    }
    await polishContext.close();
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
