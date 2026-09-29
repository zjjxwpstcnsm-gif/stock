import { test, expect } from '@playwright/test';
import { LESSONS } from '../../src/course-data.js';

test('tutorial deep links, browser history, reading progress and chapter practice', async ({ page }, info) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/');
  await page.getByRole('button', { name: '系统教程', exact: true }).click();
  await expect(page).toHaveURL(/#course\/basics$/);
  await expect(page.getByRole('heading', { name: '期权：买的是一项权利', exact: true })).toBeVisible();
  await page.screenshot({ path: info.outputPath('course-basics.png'), fullPage: true });
  await page.getByRole('button', { name: '标记本章已读', exact: true }).click();
  await expect(page.locator('.course-progress')).toContainText('已读 1 / 12 章');
  await page.locator('.lesson-pagination a').last().click();
  await expect(page).toHaveURL(/#course\/contracts$/);
  await page.reload();
  await expect(page.locator('#lesson-title')).toHaveText('读懂合约、报价与术语');
  await expect(page.locator('.course-progress')).toContainText('已读 1 / 12 章');
  await page.goBack();
  await expect(page.locator('#lesson-title')).toHaveText('期权：买的是一项权利');
  await expect(page.getByRole('button', { name: '✓ 已读完本章' })).toBeVisible();
  await page.getByRole('button', { name: '练习：基础知识 →', exact: true }).click();
  await expect(page.locator('.chapter-option.selected')).toContainText('期权基础知识');
  await page.getByRole('button', { name: '开始练习', exact: true }).click();
  await expect(page.locator('.question-panel')).toContainText('基础知识');
  expect(errors).toEqual([]);
});

test('all 12 chapters render diagrams and self checks without page overflow', async ({ page }, info) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/#course');
  for (const lesson of LESSONS) {
    await page.goto(`/#course/${lesson.id}`);
    await expect(page.locator('#lesson-title')).toHaveText(lesson.title);
    await expect(page.locator('.lesson-sources a')).toHaveCount(lesson.sources.length);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), lesson.id).toBeTruthy();
    if (lesson.lab) {
      await expect(page.locator('.lesson-chart svg')).toHaveAttribute('role', 'img');
      const paths = await page.locator('.lesson-chart path').evaluateAll(paths => paths.map(p => p.getAttribute('d')));
      expect(paths.every(p => p && !/NaN|Infinity/.test(p))).toBeTruthy();
    }
    await page.locator('.check-options button').nth(lesson.check.answer).click();
    await expect(page.locator('.check-feedback')).toContainText('回答正确');
  }
  await page.screenshot({ path: info.outputPath('course-roadmap.png'), fullPage: true });
  expect(errors).toEqual([]);
});

test('payoff, decay and all Greek controls update the actual graph and amounts', async ({ page }, info) => {
  await page.goto('/#course/payoffs');
  const lab = page.locator('.lesson-lab');
  await expect(lab.locator('.lab-stats')).toContainText('+800 元');
  const curve = await lab.locator('path').first().getAttribute('d');
  await page.selectOption('#payoff-position', 'short-call');
  await expect(lab.locator('.lab-stats')).toContainText('−800'.replace('−', '-'));
  await expect(lab.locator('path').first()).not.toHaveAttribute('d', curve);
  await expect(lab).toContainText('理论无上限');
  await page.locator('#payoff-spot').fill('3.12');
  await expect(lab.locator('.lab-stats')).toContainText('0 元');
  await lab.scrollIntoViewIfNeeded();
  await page.screenshot({ path: info.outputPath('payoff-lab.png') });
  await page.goto('/#course/value');
  await page.locator('#decay-elapsed').fill('90');
  await expect(page.locator('.lab-stats')).toContainText('0.0000 元');
  await page.goto('/#course/delta-gamma');
  await page.selectOption('#delta-metric', 'gamma');
  await page.locator('#delta-days').fill('1');
  await expect(page.locator('.lesson-chart svg title')).toHaveText('Gamma 敏感度曲线');
  await page.goto('/#course/theta-vega-rho');
  for (const metric of ['theta', 'vega', 'rho']) {
    await page.selectOption('#greeks-metric', metric);
    await page.selectOption('#greeks-type', 'put');
    await page.locator('#greeks-days').fill('180');
    await expect(page.locator('.lesson-chart svg title')).toContainText(metric[0].toUpperCase() + metric.slice(1));
  }
  await page.locator('.lesson-lab').scrollIntoViewIfNeeded();
  await page.screenshot({ path: info.outputPath('greeks-lab.png') });
});

test('reading does not replace active answer sheet; tutorial tolerates unavailable storage', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '开始综合模拟', exact: true }).click();
  await page.getByRole('radio').nth(1).click();
  const session = await page.evaluate(() => JSON.parse(localStorage.getItem('zhiquan.practice.v1')).active);
  await page.getByRole('button', { name: '系统教程', exact: true }).click();
  await page.getByRole('button', { name: '标记本章已读', exact: true }).click();
  await page.getByRole('button', { name: '练习：基础知识 →', exact: true }).click();
  await expect(page.getByRole('button', { name: '继续作答', exact: true })).toBeVisible();
  const after = await page.evaluate(() => JSON.parse(localStorage.getItem('zhiquan.practice.v1')).active);
  expect(after).toEqual(session);
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('blocked'); };
    Storage.prototype.setItem = () => { throw new Error('blocked'); };
  });
  await page.goto('/#course/basics');
  await page.reload(); // A hash-only navigation does not rerun init scripts.
  await expect(page.locator('#lesson-title')).toHaveText('期权：买的是一项权利');
  await page.getByRole('button', { name: '标记本章已读', exact: true }).click();
  await expect(page.locator('.course-progress')).toContainText('已读 1 / 12 章');
  await expect(page.locator('#main')).toContainText('阅读进度暂时无法保存');
});
