import {test,expect} from '@playwright/test';
import {SUBJECTS} from '../../src/subjects.js';
import {WORKSHOP_QUESTIONS} from '../../src/workshop-questions.js';
import {createDrill} from '../../src/drill-engine.js';
import {createExamEngine} from '../../src/engine.js';

async function seed(page,subject,question) {
 const pool=[question.id,...subject.QUESTIONS.filter(q=>q.id!==question.id).map(q=>q.id)];
 const plan=createDrill(pool,{endless:true,instant:true},()=>.999999);
 const active={...createExamEngine(subject).makeSession(plan.ids,'practice'),drill:plan.drill};
 // Simulate a pre-update compatible random session, keeping the original deadline semantics.
 active.version=`${subject.id}-2026-10-13.2`;
 await page.goto(`/?subject=${subject.id}`);
 await page.evaluate(({subject,active})=>{
  localStorage.setItem(subject.practiceKey,JSON.stringify({active,progress:{},history:[],saved:[]}));
  history.replaceState(null,'',`/?subject=${subject.id}#drill`);
 },{subject:{id:subject.id,practiceKey:subject.practiceKey},active});
 await page.reload();await expect(page.locator('#question-title')).toHaveText(question.stem);
}
test('each subject exposes methods and eight linked cases without showing answers',async({page},info)=>{
 for(const s of Object.values(SUBJECTS)){
  await page.goto(`/?subject=${s.id}`);await expect(page.locator('.workshop-topics button')).toHaveCount(8);
  await expect(page.locator('.workshop-desk')).toContainText('原创训练，不是真题');
  await expect(page.locator('.workshop-desk')).not.toContainText(WORKSHOP_QUESTIONS[s.id][0].explanation);
  await page.locator('.workshop-desk summary').click();await expect(page.locator('.method-steps>section')).toHaveCount(3);
  await expect(page.locator('.method-steps')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 }
 await page.screenshot({path:info.outputPath('workshop-methods.png'),fullPage:true});
});
test('workshop topics locate exactly one question while random practice retains the whole bank',async({page})=>{
 const s=SUBJECTS.fund2,q=WORKSHOP_QUESTIONS.fund2[0];await page.goto('/?subject=fund2');
 await page.locator(`.workshop-topics [data-id="${q.id}"]`).click();await expect(page).toHaveURL(new RegExp(`#practice\\?question=${q.id}$`));
 await expect(page.locator('.practice-match')).toContainText('匹配 1 题');
 await page.getByRole('button',{name:'随机刷题',exact:true}).click();
 await expect(page.locator('#main input,#main select')).toHaveCount(0);
 const state=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),s.practiceKey);expect(state.active.drill.pool.length).toBe(s.QUESTIONS.length);
});
test('wrong-choice rationale is immediate, draft is private-data-free, and fixed link resolves separately',async({page},info)=>{
 const s=SUBJECTS.options,q=WORKSHOP_QUESTIONS.options[0];await seed(page,s,q);
 await expect(page.locator('.misconception,.case-method,#answer-feedback')).toHaveCount(0);
 await expect(page.locator('.question-trace')).toContainText(q.id);
 const draft=await page.getByRole('link',{name:'反馈此题，打开 GitHub 草稿，需自行提交'}).getAttribute('href');
 const url=new URL(draft);expect(url.hostname).toBe('github.com');expect(url.searchParams.get('body')).toContain(q.id);expect(url.searchParams.get('body')).not.toContain(q.explanation);
 const link=await page.getByRole('link',{name:'打开此题固定链接'}).getAttribute('href');
 const wrong=(q.answer+1)%4;await page.locator(`#option-${wrong}`).click();
 await expect(page.locator('#answer-feedback')).toContainText('再巩固一下');await expect(page.locator('.misconception')).toContainText(q.rationales[wrong]);
 await page.locator('.case-method summary').click();await expect(page.locator('.method-steps')).toBeVisible();
 await page.screenshot({path:info.outputPath('workshop-feedback.png'),fullPage:true});
 await page.reload();await expect(page.locator('.misconception')).toContainText(q.rationales[wrong]);
 const state=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),s.practiceKey);expect(state.progress[q.id].attempts).toBe(1);
 const other=await page.context().newPage();await other.goto('/'+link);await expect(other.locator('.practice-match')).toContainText('匹配 1 题');await other.close();
 await page.locator('[data-action="drill-next"]').click();await expect(page.locator('#question-title')).not.toHaveText(q.stem);await expect(page.locator('#answer-feedback,.misconception')).toHaveCount(0);
});
test('wrong and right workshop feedback stay within narrow screens and unobstructed controls',async({page})=>{
 const s=SUBJECTS.options,q=WORKSHOP_QUESTIONS.options[3];
 for(const width of [320,390,768]){
  await page.setViewportSize({width,height:900});await seed(page,s,q);
  expect(await page.locator('.question-actions').evaluate(el=>getComputedStyle(el).position)).toBe('static');
  await page.locator(`#option-${q.answer}`).click();await expect(page.locator('#answer-feedback')).toContainText('回答正确');await expect(page.locator('.misconception')).toHaveCount(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  await expect(page.locator('[data-action="drill-next"]')).toBeEnabled();
 }
});
