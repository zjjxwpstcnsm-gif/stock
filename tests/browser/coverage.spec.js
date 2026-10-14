import { test, expect } from '@playwright/test';
import { SUBJECTS } from '../../src/subjects.js';
import { coverageIndex, coverageSummary, questionIdsForObjective } from '../../src/coverage-views.js';

test('coverage filters distinguish explicit mappings from unassessed gaps on all three fund subjects', async ({ page }, info) => {
  for (const id of ['fund1', 'fund2', 'fund3']) {
    const rows = coverageIndex(SUBJECTS[id]);
    const counts = coverageSummary(rows);
    await page.goto(`/?subject=${id}#coverage`);
    await expect(page.locator('.coverage-objective')).toHaveCount(rows.length);
    await expect(page.locator('.coverage-summary')).toContainText(`${counts.mapped}`);
    await expect(page.locator('.coverage-explainer')).toContainText('并非官方认证');
    await page.selectOption('#coverage-status', 'gaps');
    await expect(page.locator('.coverage-objective')).toHaveCount(counts.gaps);
    await expect(page.locator('[data-action="coverage-practice"]')).toHaveCount(0);
    await page.selectOption('#coverage-status', 'mapped');
    await expect(page.locator('.coverage-objective')).toHaveCount(counts.mapped);
    // This release supplies explicit mappings; a bank accidentally omitting them must fail.
    expect(counts.mapped).toBeGreaterThan(0);
    const code = rows.find(row => row.hasDirect).code;
    await page.locator('#coverage-query').fill(code);
    await page.locator('#coverage-search').getByRole('button', { name: '查找', exact: true }).click();
    await expect(page.locator('.coverage-objective')).toHaveCount(1);
    await expect(page.locator('.coverage-objective')).toHaveAttribute('data-outline-code', code);
    await expect(page.locator('#coverage-query')).toBeFocused();
    await page.selectOption('#coverage-status', 'gaps');
    await expect(page.locator('.coverage-empty')).toBeVisible();
    await page.getByRole('button', { name: '显示全部要求', exact: true }).click();
    await expect(page.locator('.coverage-objective')).toHaveCount(rows.length);
    await expect(page.locator('#coverage-query')).toHaveValue('');
    await page.selectOption('#coverage-chapter', '1');
    await expect(page.locator('.coverage-chapter')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
    await page.screenshot({ path: info.outputPath(`${id}-coverage.png`), fullPage: true });
    if (info.project.name === 'mobile') {
      await page.setViewportSize({ width: 320, height: 844 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
      await page.screenshot({ path: info.outputPath(`${id}-coverage-320.png`), fullPage: true });
      await page.setViewportSize({ width: 390, height: 844 });
    }
  }
});

test('exact-objective practice uses only mapped IDs, hides answers before checking and updates existing records', async ({ page }, info) => {
  const subject = SUBJECTS.fund2;
  const row = coverageIndex(subject).find(row => row.hasDirect);
  expect(row, 'fund2 needs at least one explicit objective mapping').toBeTruthy();
  await page.goto('/?subject=fund2#coverage');
  await page.locator('#coverage-query').fill(row.code);
  await page.locator('#coverage-search button').click();
  const card = page.locator(`.coverage-objective[data-outline-code="${row.code}"]`);
  await card.locator('.coverage-matches summary').click();
  await expect(card.locator('.coverage-question-preview')).toHaveCount(row.directQuestions.length);
  await expect(card).toContainText(row.directQuestions[0].stem);
  await expect(page.locator('.explanation')).toHaveCount(0);
  await page.screenshot({ path: info.outputPath('mapped-question-preview.png'), fullPage: true });
  await card.locator('[data-action="coverage-practice"]').click();
  const active = await page.evaluate(key => JSON.parse(localStorage.getItem(key)).active, subject.practiceKey);
  expect([...active.ids].sort()).toEqual(questionIdsForObjective(subject, row.code).sort());
  expect(active.mode).toBe('practice');
  const q = subject.QUESTIONS.find(question => question.id === active.ids[0]);
  await expect(page.locator('#question-title')).toHaveText(q.stem);
  await expect(page.locator('.explanation')).toHaveCount(0);
  await page.getByRole('radio').nth((q.answer + 1) % q.options.length).click();
  await page.getByRole('button', { name: '确认答案', exact: true }).click();
  await expect(page.locator('.explanation')).toContainText(q.explanation);
  await page.getByRole('button', { name: '大纲清单', exact: true }).click();
  await expect(page.locator(`.coverage-objective[data-outline-code="${row.code}"] .coverage-attempts`)).toContainText('最近答错 1 题');
  await page.selectOption('#coverage-status', 'wrong');
  await expect(page.locator(`.coverage-objective[data-outline-code="${row.code}"]`)).toBeVisible();
  await page.reload();
  const progress = await page.evaluate(({ key, id }) => JSON.parse(localStorage.getItem(key)).progress[id], { key: subject.practiceKey, id: q.id });
  expect(progress.attempts).toBe(1);
  expect(progress.wrong).toBe(true);
  await expect(page.locator('.coverage-summary')).toContainText('对应题最近答错');
});

test('browsing coverage and cancelling a replacement preserve the running exam and its original deadline', async ({ page }) => {
  const subject = SUBJECTS.fund1;
  await page.goto('/?subject=fund1');
  await page.getByRole('button', { name: '开始本科模拟', exact: true }).click();
  await page.getByRole('radio').first().click();
  const before = await page.evaluate(key => JSON.parse(localStorage.getItem(key)).active, subject.practiceKey);
  await page.getByRole('button', { name: '大纲清单', exact: true }).click();
  await page.selectOption('#coverage-status', 'mapped');
  await page.locator('[data-action="coverage-practice"]').first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.locator('[data-action="cancel-dialog"]').click();
  const after = await page.evaluate(key => JSON.parse(localStorage.getItem(key)).active, subject.practiceKey);
  expect(after.id).toBe(before.id);
  expect(after.deadline).toBe(before.deadline);
  expect(after.answers).toEqual(before.answers);
  expect(after.ids).toEqual(before.ids);
  await page.getByRole('button', { name: '学习空间', exact: true }).click();
  await page.getByRole('button', { name: '继续作答', exact: true }).click();
  await expect(page.getByRole('radio').first()).toHaveAttribute('aria-checked', 'true');
});

test('reviewed-content shortcuts filter the correct collection without restricting random practice', async ({page})=>{
 for(const id of ['fund1','securities2']){
  const subject=SUBJECTS[id];await page.goto(`/?subject=${id}`);
  const shortcut=page.locator('.content-update [data-action="workbench-filter"]').first();
  const batch=await shortcut.getAttribute('data-batch');
  const count=subject.QUESTIONS.filter(q=>q.editorialBatch===batch).length;
  await shortcut.click();await expect(page.locator('#practice-batch')).toHaveValue(batch);
  await expect(page.locator('.practice-match')).toContainText(`匹配 ${count} 题`);
  await page.getByRole('button',{name:'随机刷题',exact:true}).click();
  await expect(page.locator('#main input,#main select')).toHaveCount(0);
  const active=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).active,subject.practiceKey);
  expect(new Set(active.drill.pool)).toEqual(new Set(subject.QUESTIONS.map(q=>q.id)));
 }
});
