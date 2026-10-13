import {test,expect} from '@playwright/test';
import {SUBJECTS} from '../../src/subjects.js';
import {createExamEngine,questionType} from '../../src/engine.js';
import {createDrill} from '../../src/drill-engine.js';
const url = s => `/?subject=${s.id}`;
const read = (page,s) => page.evaluate(key=>JSON.parse(localStorage.getItem(key)),s.practiceKey);
async function seed(page,s,question=s.QUESTIONS[0],batchSize=20) {
 const pool=[question.id,...s.QUESTIONS.filter(q=>q.id!==question.id).map(q=>q.id)];
 const plan=createDrill(pool,{batchSize,endless:true,instant:true},()=>.999999);
 const active={...createExamEngine(s).makeSession(plan.ids,'practice'),drill:plan.drill,title:'随机刷题'};
 await page.goto(url(s));
 await page.evaluate(({key,active})=>localStorage.setItem(key,JSON.stringify({active,progress:{},history:[],saved:[]})),{key:s.practiceKey,active});
 // Set the route without firing the live app's hashchange handler.
 // The new document must load the injected state before any render can save it.
 await page.evaluate(route=>history.replaceState(null,'',route),url(s)+'#drill');
 await page.reload();
 await expect(page.locator('#question-title')).toHaveText(question.stem);
 expect((await read(page,s)).active.ids).toEqual(active.ids);
 return active;
}
async function answer(page,s) {
 const stem=await page.locator('#question-title').textContent(),q=s.QUESTIONS.find(q=>q.stem===stem);
 for(const n of (Array.isArray(q.answer)?q.answer:[q.answer]))await page.locator(`#option-${n}`).click();
 if(Array.isArray(q.answer))await page.locator('[data-action="check"]').click();
 await expect(page.locator('#answer-feedback')).toContainText('回答正确');
 return q;
}

test('all eight subjects open directly with no setup and the complete subject pool',async({page},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const s of Object.values(SUBJECTS)){
  await page.goto(url(s)+'#drill');
  await expect(page.locator('.focus-drill-heading h1')).toContainText('随机刷题');
  await expect(page.locator('#question-title')).toBeVisible();
  await expect(page.locator('#main select,#main input,.drill-settings,.practice-filters')).toHaveCount(0);
  await expect(page.locator('#answer-feedback')).toHaveCount(0);
  await expect(page.locator('[data-view="drill"].nav-item')).toHaveAttribute('aria-current','page');
  const d=(await read(page,s)).active.drill;
  expect(new Set(d.pool)).toEqual(new Set(s.QUESTIONS.map(q=>q.id)));
  expect(d.endless).toBe(true);expect(d.instant).toBe(true);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
 }
 await page.screenshot({path:info.outputPath('direct-drill.png'),fullPage:true});expect(errors).toEqual([]);
});

test('home and sidebar launch immediately; specialist filters never restrict random practice',async({page},info)=>{
 await page.goto('/');await page.screenshot({path:info.outputPath('study-desk.png'),fullPage:true});
 await page.getByRole('button',{name:'开始随机刷题',exact:true}).click();
 await expect(page).toHaveURL(/#drill$/);await expect(page.locator('#question-title')).toBeVisible();
 await page.getByRole('button',{name:'专项练习',exact:true}).click();
 await page.selectOption('#practice-source','sample');await page.selectOption('#practice-status','saved');
 await expect(page.getByRole('button',{name:'开始练习',exact:true})).toBeDisabled();
 await page.getByRole('button',{name:'随机刷题',exact:true}).click();
 await expect(page.locator('#question-title')).toBeVisible();
 expect((await read(page,SUBJECTS.options)).active.drill.pool.length).toBe(SUBJECTS.options.QUESTIONS.length);
 await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('single choice reveals once, survives refresh, waits for the learner and supports Enter',async({page},info)=>{
 const s=SUBJECTS.options,q=s.QUESTIONS[0];await seed(page,s,q);
 await page.locator(`#option-${q.answer}`).click();
 await expect(page.locator('#answer-feedback')).toContainText(q.explanation);
 await expect(page.locator('#answer-feedback')).toBeFocused();
 await expect(page.locator('#question-title')).toHaveText(q.stem);
 expect((await read(page,s)).progress[q.id].attempts).toBe(1);
 await page.reload();await expect(page.locator('#answer-feedback')).toContainText('回答正确');
 await expect(page.locator(`#option-${q.answer}`)).toBeDisabled();
 await page.screenshot({path:info.outputPath('instant-explanation.png'),fullPage:true});
 await page.locator('#answer-feedback').focus();await page.keyboard.press('Enter');
 await expect(page.locator('#question-title')).not.toHaveText(q.stem);
 expect((await read(page,s)).progress[q.id].attempts).toBe(1);
});

test('multiple choice waits for explicit submission and rejects partial selections',async({page})=>{
 const s=SUBJECTS.securities2,q=s.QUESTIONS.find(q=>Array.isArray(q.answer)&&q.answer.length>1);
 await seed(page,s,q);await expect(page.getByRole('button',{name:'提交多选答案',exact:true})).toBeDisabled();
 await page.locator(`#option-${q.answer[0]}`).click();await expect(page.locator('#answer-feedback')).toHaveCount(0);
 await page.locator(`#option-${q.answer[0]}`).click();await expect(page.locator('[data-action="check"]')).toBeDisabled();
 await page.locator(`#option-${q.answer[0]}`).click();await page.reload();
 await expect(page.locator(`#option-${q.answer[0]}`)).toHaveAttribute('aria-checked','true');
 await page.locator('[data-action="check"]').click();await expect(page.locator('#answer-feedback')).toContainText('再巩固一下');
 expect((await read(page,s)).progress[q.id].wrong).toBe(true);
});

test('judgment answers reveal immediately, without a confirmation step',async({page})=>{
 const s=SUBJECTS.futures1,q=s.QUESTIONS.find(q=>questionType(q)==='judge');
 await seed(page,s,q);await expect(page.locator('.options button')).toHaveCount(2);
 await page.locator(`#option-${q.answer}`).click();await expect(page.locator('#answer-feedback')).toContainText('回答正确');
 await expect(page.locator('[data-action="check"]')).toHaveCount(0);
});

test('internal batch boundaries never interrupt the next-question loop or repeat IDs',async({page})=>{
 const s=SUBJECTS.options;await seed(page,s,s.QUESTIONS[0],2);const seen=[];
 for(let i=0;i<7;i++){
  seen.push((await answer(page,s)).id);
  await expect(page.locator('[data-action="drill-next"]')).toHaveText('下一题 ›');
  await page.locator('[data-action="drill-next"]').click();
  await expect(page.locator('.result-summary')).toHaveCount(0);
 }
 expect(new Set(seen).size).toBe(7);
 const state=await read(page,s);expect(state.active.drill.answered+state.active.checked.length).toBe(7);
 expect(state.history.length).toBe(3);expect(state.active.drill.correct).toBe(6);
 await page.reload();await expect(page.locator('.drill-status')).toContainText('已答 7 题');
});

test('legacy finite filtered sessions retain the answer and expand to the whole subject',async({page})=>{
 const s=SUBJECTS.options,q=s.QUESTIONS[0],e=createExamEngine(s),plan=createDrill([q.id,s.QUESTIONS[1].id],{batchSize:2,endless:false,instant:false},()=>.999999);
 const active={...e.makeSession(plan.ids,'practice'),drill:plan.drill,answers:{[q.id]:q.answer},checked:[q.id]};
 await page.goto('/');await page.evaluate(({key,active,id})=>localStorage.setItem(key,JSON.stringify({active,progress:{[id]:{attempts:1,correct:1,wrong:false}},history:[],saved:[]})),{key:s.practiceKey,active,id:q.id});
 await page.evaluate(()=>history.replaceState(null,'','/#drill'));await page.reload();
 const current=(await read(page,s)).active;
 expect(current.drill.pool.length).toBe(s.QUESTIONS.length);expect(current.drill.endless).toBe(true);expect(current.drill.instant).toBe(true);
 await expect(page.locator('#question-title')).toHaveText(q.stem);await expect(page.locator('#answer-feedback')).toContainText('回答正确');
});

test('starting random practice parks a pending exam and resume restores its original answers and deadline',async({page})=>{
 const s=SUBJECTS.options;await page.goto('/');await page.getByRole('button',{name:'开始综合模拟',exact:true}).click();
 await page.locator('#option-1').click();const exam=(await read(page,s)).active;
 await page.getByRole('button',{name:'随机刷题',exact:true}).click();
 await expect(page.getByRole('dialog')).not.toBeVisible();expect((await read(page,s)).suspended).toEqual(exam);
 await answer(page,s);const drill=(await read(page,s)).active;
 const backup=await page.evaluate(async()=> (await import('/src/learning-records.js')).collectBackup());
 expect(backup.subjects.options.practice.suspended).toEqual(exam);
 await page.reload();await page.locator('.drill-back').click();
 await page.getByRole('button',{name:'继续作答',exact:true}).click();
 const resumed=await read(page,s);expect(resumed.active).toEqual(exam);expect(resumed.suspended).toEqual(drill);
 await expect(page.locator('#option-1')).toHaveAttribute('aria-checked','true');
 await page.getByRole('button',{name:'随机刷题',exact:true}).click();
 expect((await read(page,s)).active.ids).toEqual(drill.ids);await expect(page.locator('#answer-feedback')).toContainText('回答正确');
});

test('switching subject stays in direct practice and preserves each subject answer',async({page})=>{
 const s=SUBJECTS.options;await seed(page,s);await answer(page,s);const stem=await page.locator('#question-title').textContent();
 await page.selectOption('#subject-select','fund1');await expect(page).toHaveURL(/subject=fund1#drill$/);
 await expect(page.locator('#question-title')).toBeVisible();await expect(page.locator('#answer-feedback')).toHaveCount(0);
 await page.selectOption('#subject-select','options');await expect(page.locator('#question-title')).toHaveText(stem);
 await expect(page.locator('#answer-feedback')).toContainText('回答正确');
});

test('early finish grades only confirmed questions and an empty finish returns home',async({page})=>{
 const s=SUBJECTS.options;await seed(page,s);await page.getByRole('button',{name:'结束练习',exact:true}).click();
 await page.getByRole('dialog').getByRole('button',{name:'结束练习',exact:true}).click();
 await expect(page.locator('.study-home')).toBeVisible();expect((await read(page,s)).active).toBeNull();
 await page.getByRole('button',{name:'开始随机刷题',exact:true}).click();await answer(page,s);
 await page.getByRole('button',{name:'结束练习',exact:true}).click();await page.getByRole('dialog').getByRole('button',{name:'结束练习',exact:true}).click();
 await expect(page.locator('.result-message')).toContainText('答对 1 / 1');expect((await read(page,s)).history[0].ids.length).toBe(1);
});

test('320px and tablet layouts have no overflow and unconfirmed choices are not covered',async({page},info)=>{
 for(const width of [320,390,768]){
  await page.setViewportSize({width,height:844});await page.goto('/#drill');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
  await expect(page.locator('.question-actions')).toHaveCSS('position','static');
  await expect(page.locator('.focus-question')).toBeVisible();
  await page.screenshot({path:info.outputPath(`focused-${width}.png`),fullPage:true});
 }
});
