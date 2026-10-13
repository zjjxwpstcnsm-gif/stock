import {test,expect} from '@playwright/test';
import {SUBJECTS} from '../../src/subjects.js';
import {CLINIC_QUESTIONS} from '../../src/clinic-questions.js';
import {createDrill} from '../../src/drill-engine.js';
import {createExamEngine} from '../../src/engine.js';
async function seed(page,subject,question,{lastInBatch=false}={}) {
 const ids=lastInBatch?[...subject.QUESTIONS.filter(q=>q.id!==question.id).slice(0,19).map(q=>q.id),question.id,...subject.QUESTIONS.filter(q=>q.id!==question.id).slice(19).map(q=>q.id)]:[question.id,...subject.QUESTIONS.filter(q=>q.id!==question.id).map(q=>q.id)];
 const plan=createDrill(ids,{batchSize:20,endless:true,instant:true},()=>.99999);
 const active={...createExamEngine(subject).makeSession(plan.ids,'practice'),drill:plan.drill,title:`${subject.short} · 随机刷题`};
 const progress={};
 if(lastInBatch){active.index=19;for(const id of active.ids.slice(0,19)){const q=subject.QUESTIONS.find(q=>q.id===id);active.checked.push(id);active.answers[id]=q.answer;progress[id]={attempts:1,correct:1,wrong:false};}}
 active.version=`${subject.id}-2026-10-13.3`;
 await page.goto(`/?subject=${subject.id}`);
 await page.evaluate(({key,active,progress,id})=>{localStorage.setItem(key,JSON.stringify({active,progress,history:[],saved:[]}));history.replaceState(null,'',`/?subject=${id}#drill`);},{key:subject.practiceKey,active,progress,id:subject.id});
 await page.reload();await expect(page.locator('#question-title')).toHaveText(question.stem);
}
test('all subjects expose three readable concept pairs and eight linked new cases',async({page},info)=>{
 for(const s of Object.values(SUBJECTS)){
  await page.goto(`/?subject=${s.id}`);await expect(page.locator('.concept-pair')).toHaveCount(3);
  await page.locator('.concept-pair>summary').first().click();await expect(page.locator('.concept-columns').first()).toBeVisible();
  await page.locator('.clinic-library>summary').click();await expect(page.locator('.clinic-topics button')).toHaveCount(8);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  await expect(page.locator('.concept-clinic')).not.toContainText(CLINIC_QUESTIONS[s.id][0].explanation);
 }
 await page.locator('.concept-clinic').screenshot({path:info.outputPath('concept-comparison.png')});
 await page.locator('.clinic-topics button').first().click();await expect(page.locator('.practice-match')).toContainText('匹配 1 题');
});
test('confirmed answers can be read without changing current question, counters or keyboard answers',async({page},info)=>{
 const s=SUBJECTS.options,q=CLINIC_QUESTIONS.options[0];await seed(page,s,q);
 await expect(page.locator('.recap-count')).toHaveText('0 条');await expect(page.locator('#main input,#main select')).toHaveCount(0);
 await page.locator(`#option-${q.answer}`).click();await expect(page.locator('.recap-count')).toHaveText('1 条');
 await page.locator('[data-action="drill-next"]').click();await expect(page.locator('#question-title')).not.toHaveText(q.stem);
 const stem=await page.locator('#question-title').textContent();
 await page.locator('.drill-recap>summary').click();const item=page.locator('.recap-item>summary').first();await item.click();
 await expect(page.locator('.recap-detail')).toContainText(q.explanation);
 const before=await page.evaluate(key=>localStorage.getItem(key),s.practiceKey);
 await item.focus();await page.keyboard.press('1');await expect(page.locator('#answer-feedback')).toHaveCount(0);
 expect(await page.evaluate(key=>localStorage.getItem(key),s.practiceKey)).toBe(before);await expect(page.locator('#question-title')).toHaveText(stem);
 await page.locator('.drill-recap').screenshot({path:info.outputPath('read-only-recap.png')});
 await page.reload();await expect(page.locator('.recap-count')).toHaveText('1 条');await expect(page.locator('#question-title')).toHaveText(stem);
 await page.locator('.drill-recap>summary').focus();await page.keyboard.press('Enter');await expect(page.locator('.recap-body')).toBeVisible();
 const state=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),s.practiceKey);expect(state.progress[q.id].attempts).toBe(1);
});
test('recent answers persist across the invisible twenty-question batch boundary',async({page})=>{
 const s=SUBJECTS.fund2,q=CLINIC_QUESTIONS.fund2[0];await seed(page,s,q,{lastInBatch:true});
 await expect(page.locator('.recap-count')).toHaveText('19 条');await page.locator(`#option-${q.answer}`).click();await expect(page.locator('.recap-count')).toHaveText('20 条');
 await page.locator('[data-action="drill-next"]').click();await expect(page.locator('#question-title')).not.toHaveText(q.stem);await expect(page.locator('.recap-count')).toHaveText('20 条');
 await page.locator('.drill-recap>summary').click();await page.locator('.recap-item>summary').first().click();await expect(page.locator('.recap-detail').first()).toContainText(q.explanation);
 await expect(page.locator('#answer-feedback')).toHaveCount(0);await page.reload();await expect(page.locator('.recap-count')).toHaveText('20 条');
 const state=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),s.practiceKey);expect(state.active.drill.answered).toBe(20);expect(state.active.checked).toHaveLength(0);expect(state.progress[q.id].attempts).toBe(1);
});
test('multi-select is excluded until submission and recap stays usable at 320px',async({page},info)=>{
 const s=SUBJECTS.futures1,q=s.QUESTIONS.find(q=>Array.isArray(q.answer)&&q.answer.length>1);await seed(page,s,q);
 await page.setViewportSize({width:320,height:900});await page.locator(`#option-${q.answer[0]}`).click();
 await expect(page.locator('.recap-count')).toHaveText('0 条');await expect(page.locator('.recap-detail')).toHaveCount(0);
 await page.getByRole('button',{name:'提交多选答案',exact:true}).click();await expect(page.locator('.recap-count')).toHaveText('1 条');
 await page.locator('.drill-recap>summary').click();await page.locator('.recap-item>summary').click();await expect(page.locator('.recap-wrong')).toHaveText('待巩固');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 expect(await page.locator('.question-actions').evaluate(el=>getComputedStyle(el).position)).toBe('static');
 await page.locator('.drill-recap').screenshot({path:info.outputPath('narrow-multiselect-recap.png')});
});
test('concept notes connect to the full course and allow returning to the pending random question',async({page})=>{
 const s=SUBJECTS.fund1,q=CLINIC_QUESTIONS.fund1[0];await seed(page,s,q);
 await page.getByRole('button',{name:'‹ 返回学习空间',exact:true}).click();
 await page.locator('.concept-pair>summary').first().click();await page.locator('.concept-actions [data-action="course-open"]').first().click();
 await expect(page).toHaveURL(/#course/);await page.getByRole('button',{name:'随机刷题',exact:true}).click();
 await expect(page.locator('#question-title')).toHaveText(q.stem);await expect(page.locator('#answer-feedback')).toHaveCount(0);
});
