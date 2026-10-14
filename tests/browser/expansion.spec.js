import {test,expect} from '@playwright/test';
import {SUBJECTS} from '../../src/subjects.js';
const batch='2026-10-14-expansion';
for(const s of Object.values(SUBJECTS)){
 test(`${s.id}: new application case supports hidden reasoning, four rationales, persistence and lesson navigation`,async({page},info)=>{
  const fresh=s.QUESTIONS.filter(q=>q.editorialBatch===batch);
  expect(fresh.length).toBeGreaterThan(0);
  const q=fresh.at(-1);
  await page.goto(`/?subject=${s.id}#practice?question=${q.id}`);
  await expect(page.locator('.practice-match')).toContainText('匹配 1 题');
  await page.getByRole('button',{name:'开始练习',exact:true}).click();
  await expect(page.locator('#question-title')).toHaveText(q.stem);
  await expect(page.locator('.option-rationales')).toHaveCount(0);
  await expect(page.locator('#main')).not.toContainText(q.explanation);
  await page.getByRole('radio').nth(q.answer).click();
  await page.getByRole('button',{name:'确认答案',exact:true}).click();
  await expect(page.locator('#answer-feedback')).toContainText('回答正确');
  await page.locator('.option-rationales summary').click();
  await expect(page.locator('.option-rationales article')).toHaveCount(4);
  for(const reason of q.rationales)await expect(page.locator('.option-rationales')).toContainText(reason);
  await expect(page.locator('.source')).toContainText(q.referenceSection);
  await expect(page.locator('.source')).toContainText('本题核对 2026-10-14');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
  await page.screenshot({path:info.outputPath(`${s.id}-expansion-answer.png`),fullPage:true});
  await page.reload();
  const state=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),s.practiceKey);
  expect(state.progress[q.id]).toEqual({attempts:1,correct:1,wrong:false});
  await page.locator('[data-action="resume"]').click();
  await expect(page.locator('#question-title')).toHaveText(q.stem);
  await page.getByRole('button',{name:'回到对应教程 →',exact:true}).click();
  await expect(page).toHaveURL(new RegExp(`#course/${q.lessonId}$`));
  await page.screenshot({path:info.outputPath(`${s.id}-expansion-lesson.png`),fullPage:true});
 });
}
