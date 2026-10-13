import {test,expect} from '@playwright/test';
import {SUBJECTS} from '../../src/subjects.js';
import {PRECISION_BATCH} from '../../src/precision-questions.js';
import {createExamEngine} from '../../src/engine.js';
import {createDrill} from '../../src/drill-engine.js';
const state=(page,s=SUBJECTS.options)=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)),s.practiceKey);
async function start(page,{id='options',count=2,endless=false,instant=true}={}){
 await page.goto(`/?subject=${id}#drill`);
 await page.locator('#practice-batch').selectOption(PRECISION_BATCH);
 if(endless)await page.locator('[data-action="drill-mode"][data-endless="true"]').click();
 await page.locator('#drill-count').fill(String(count));
 if(!instant)await page.locator('#drill-instant').uncheck();
 await page.locator('[data-action="start-drill"]').click();
 await expect(page.locator('.question-stem')).toBeVisible();
}
async function choose(page,s=SUBJECTS.options,wrong=false){
 const record=await state(page,s),q=s.QUESTIONS.find(q=>q.id===record.active.ids[record.active.index]);
 if(Array.isArray(q.answer)){
  for(const index of q.answer)await page.locator(`#option-${index}`).click();
  await page.locator('[data-action="check"]').click();
 } else await page.locator(`#option-${wrong?(q.answer+1)%q.options.length:q.answer}`).click();
 await expect(page.locator('#answer-feedback')).toBeVisible();return q;
}
test('all eight subjects provide immediate random practice, source rationales and responsive layouts',async({page},info)=>{
 test.setTimeout(60000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const s of Object.values(SUBJECTS)){
  await start(page,{id:s.id,count:1});const q=await choose(page,s);
  await expect(page.locator('#answer-feedback')).toContainText('回答正确');
  await expect(page.locator('#answer-feedback')).toBeFocused();
  await expect(page.locator('.option-rationales')).toHaveCount(1);
  expect((await state(page,s)).progress[q.id]).toEqual({attempts:1,correct:1,wrong:false});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
  await page.locator('[data-action="drill-next"]').click();
  await expect(page.locator('[data-action="drill-repeat"]')).toBeVisible();
 }
 await page.goto('/#drill');await page.screenshot({path:info.outputPath('random-practice-setup.png'),fullPage:true});
 expect(errors).toEqual([]);
});
test('finite batches save once, show wrong answers, resume and continue without repeated IDs',async({page},info)=>{
 await start(page);const first=await state(page),firstId=first.active.ids[0];await choose(page,SUBJECTS.options,true);
 await expect(page.locator('#answer-feedback')).toContainText('再巩固一下');
 await page.keyboard.press('1');expect((await state(page)).progress[firstId].attempts).toBe(1);
 await page.screenshot({path:info.outputPath('random-practice-feedback.png'),fullPage:true});
 await page.reload();await page.locator('[data-action="resume"]').first().click();
 await expect(page.locator('#answer-feedback')).toBeVisible();
 await page.locator('[data-action="drill-next"]').click();await choose(page);await page.locator('[data-action="drill-next"]').click();
 const finished=await state(page);expect(finished.active).toBeNull();expect(finished.history).toHaveLength(1);
 expect(finished.history[0].ids).toHaveLength(2);
 await page.locator('[data-action="drill-repeat"]').click();const next=await state(page);
 expect(next.active.ids.some(id=>first.active.ids.includes(id))).toBeFalsy();expect(next.active.drill.answered).toBe(2);
});
test('infinite mode refills at the cycle boundary with bounded batches and cumulative totals',async({page})=>{
 test.setTimeout(60000);await start(page,{count:5,endless:true});const seen=[];
 for(let index=0;index<12;index++){
  const s=await state(page);seen.push(s.active.ids[s.active.index]);await choose(page);await page.locator('[data-action="drill-next"]').click();
 }
 expect(new Set(seen).size).toBe(12);const s=await state(page);
 expect(s.active.drill.cycle).toBe(2);expect(s.active.drill.answered).toBe(12);expect(s.active.drill.correct).toBe(12);
 expect(s.active.ids).toHaveLength(5);expect(s.active.ids[0]).not.toBe(seen.at(-1));
 expect(s.history).toHaveLength(3);expect(s.history.filter(h=>h.drill)).toHaveLength(1);
 expect(s.history.map(h=>h.ids.length)).toEqual([2,5,5]);
});
test('multi-select waits for explicit submit even with immediate mode enabled',async({page})=>{
 const subject=SUBJECTS.futures1,q=subject.QUESTIONS.find(q=>Array.isArray(q.answer)&&q.answer.length>1);
 expect(q).toBeTruthy();const plan=createDrill([q.id],{endless:true}),session={...createExamEngine(subject).makeSession(plan.ids,'practice'),drill:plan.drill};
 await page.goto('/?subject=futures1');await page.evaluate(({key,session})=>localStorage.setItem(key,JSON.stringify({active:session,history:[],progress:{},saved:[]})),{key:subject.practiceKey,session});
 await page.reload();await page.locator('[data-action="resume"]').click();
 await expect(page.locator('[data-action="check"]')).toHaveText('提交多选答案');
 await page.locator(`#option-${q.answer[0]}`).click();await expect(page.locator('#answer-feedback')).toHaveCount(0);
 await page.locator(`#option-${q.answer[0]}`).click();await expect(page.locator('[data-action="check"]')).toBeDisabled();
 for(const n of q.answer)await page.locator(`#option-${n}`).click();
 await page.locator('[data-action="check"]').click();await expect(page.locator('#answer-feedback')).toContainText('回答正确');
});
test('number input validates, supports arbitrary counts and preserves the first start click',async({page})=>{
 await page.goto('/#drill');await page.locator('#drill-count').fill('0');await page.locator('[data-action="start-drill"]').click();
 await expect(page.locator('.question-stem')).toHaveCount(0);
 await page.locator('#drill-count').fill('3');await page.locator('[data-action="start-drill"]').click();
 await expect(page.locator('.question-stem')).toBeVisible();expect((await state(page)).active.ids).toHaveLength(3);
});
test('empty filters, shortages and opt-out of immediate reveal remain explicit',async({page})=>{
 await page.goto('/#drill');await page.locator('#practice-source').selectOption('recall');
 await expect(page.locator('[data-action="start-drill"]')).toBeDisabled();
 await page.locator('[data-action="reset-practice"]').click();
 await page.locator('#practice-batch').selectOption(PRECISION_BATCH);await page.locator('#drill-count').fill('200');
 await page.locator('#drill-instant').uncheck();await page.locator('[data-action="start-drill"]').click();
 expect((await state(page)).active.ids).toHaveLength(12);
 await page.locator('#option-0').click();await expect(page.locator('#answer-feedback')).toHaveCount(0);
 await page.locator('[data-action="check"]').click();await expect(page.locator('#answer-feedback')).toBeVisible();
});
test('keyboard arrow navigation in immediate mode moves focus without submitting an answer',async({page})=>{
 await start(page);await page.locator('#option-0').focus();await page.keyboard.press('ArrowRight');
 await expect(page.locator('#option-1')).toBeFocused();await expect(page.locator('#answer-feedback')).toHaveCount(0);
 expect((await state(page)).active.checked).toEqual([]);
 await page.keyboard.press('Enter');await expect(page.locator('#answer-feedback')).toBeVisible();
});
