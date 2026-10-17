import {test, expect} from '@playwright/test';
import {SUBJECTS} from '../../src/subjects.js';
import {COVERAGE_POLISH_BATCH, COVERAGE_POLISH_QUESTIONS} from '../../src/coverage-polish-questions.js';

for (const id of ['fund1','fund2','fund3']) {
  test(`${id}: new cases are reachable from home, explained after confirmation and linked to an exact objective`, async ({page}, info) => {
    const subject = SUBJECTS[id], questions = COVERAGE_POLISH_QUESTIONS[id];
    const q = questions.find(q => q.polishCalculation) || questions[0];
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`/?subject=${id}`);
    const shortcut = page.locator(`.content-update [data-batch="${COVERAGE_POLISH_BATCH}"]`);
    await expect(shortcut).toContainText(`${questions.length} 题`);
    await shortcut.click();
    await expect(page.locator('.practice-match')).toContainText(`匹配 ${questions.length} 题`);
    await page.goto(`/?subject=${id}#practice?question=${q.id}`);
    await page.getByRole('button', {name:'开始练习',exact:true}).click();
    await expect(page.locator('#question-title')).toHaveText(q.stem);
    await expect(page.locator('.option-rationales')).toHaveCount(0);
    await expect(page.locator('#main')).not.toContainText(q.explanation);
    await page.getByRole('radio').nth((q.answer + 1) % 4).click();
    await page.getByRole('button', {name:'确认答案',exact:true}).click();
    await expect(page.locator('#answer-feedback')).toContainText(q.explanation);
    await page.locator('.option-rationales summary').click();
    await expect(page.locator('.option-rationales article')).toHaveCount(4);
    for (const reason of q.rationales) await expect(page.locator('.option-rationales')).toContainText(reason);
    await expect(page.locator('.source')).toContainText(q.referenceSection);
    await expect(page.locator('.source a').first()).toHaveAttribute('href', subject.SOURCES[q.source].url);
    await page.screenshot({path:info.outputPath(`${id}-new-case.png`),fullPage:true});
    await page.getByRole('button', {name:'大纲清单',exact:true}).click();
    await page.locator('#coverage-query').fill(q.outlineCodes[0]);
    await page.locator('#coverage-search button').click();
    const card = page.locator(`[data-outline-code="${q.outlineCodes[0]}"]`);
    await expect(page.locator('.coverage-objective')).toHaveCount(1);
    await expect(card).toContainText('最近答错 1 题');
    await card.locator('[data-action="coverage-practice"]').click();
    await page.getByRole('button', {name:'替换并开始',exact:true}).click();
    await expect(page.locator('#question-title')).toHaveText(q.stem);
    await page.getByRole('radio').nth(q.answer).click();
    await page.getByRole('button', {name:'确认答案',exact:true}).click();
    const progress = await page.evaluate(({key,id}) => JSON.parse(localStorage.getItem(key)).progress[id], {key:subject.practiceKey,id:q.id});
    expect(progress).toEqual({attempts:2,correct:1,wrong:false});
    await page.getByRole('button', {name:'回到对应教程 →',exact:true}).click();
    await expect(page).toHaveURL(new RegExp(`#course/${q.lessonId}$`));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
    expect(errors).toEqual([]);
  });
}
