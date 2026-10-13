import { test, expect } from '@playwright/test';
import { SUBJECTS } from '../../src/subjects.js';
import { CASEBOOK_DATE } from '../../src/content-quality.js';
import { createExamEngine } from '../../src/engine.js';
const subject=SUBJECTS.options;
const q=subject.QUESTIONS.find(q=>q.editorialBatch===CASEBOOK_DATE);
const record=(extra={})=>({active:null,progress:{},history:[],saved:[],...extra});
async function seed(page,value){await page.goto('/');await page.evaluate(({key,value})=>localStorage.setItem(key,JSON.stringify(value)),{key:subject.practiceKey,value});await page.reload();}

test('review workspace renders all subjects with honest counts, dated notices and responsive layouts',async({page},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const s of Object.values(SUBJECTS)){
  await page.goto(`/?subject=${s.id}#review`);await expect(page.getByRole('heading',{name:'复习工作台',exact:true})).toBeVisible();
  await expect(page.locator('.quality-counts>div').first()).toContainText('20');
  await expect(page.locator('.review-coverage')).toContainText('非掌握度');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
 }
 await page.goto('/?subject=futures2#review');
 await expect(page.locator('.policy-notices')).toContainText('2026-11-16');
 await expect(page.locator('.policy-notices')).toContainText('核对时未施行');
 await page.screenshot({path:info.outputPath('review-workspace.png'),fullPage:true});
 expect(errors).toEqual([]);
});

test('new case studies hide all rationales until confirmation and link back to their own lesson',async({page},info)=>{
 await page.goto(`/#practice?question=${q.id}`);
 await expect(page.locator('.practice-match')).toContainText('匹配 1 题');
 await page.getByRole('button',{name:'开始练习',exact:true}).click();
 await expect(page.locator('.option-rationales')).toHaveCount(0);
 await expect(page.locator('#main')).not.toContainText(q.rationales[q.answer]);
 await page.getByRole('radio').nth(q.answer).click();await page.getByRole('button',{name:'确认答案',exact:true}).click();
 await expect(page.locator('#answer-feedback')).toBeFocused();
 await page.locator('.option-rationales summary').click();await expect(page.locator('.option-rationales article')).toHaveCount(4);
 await expect(page.locator('.source')).toContainText('本题核对 2026-10-13');
 await page.screenshot({path:info.outputPath('casebook-explanation.png'),fullPage:true});
 await page.getByRole('button',{name:'回到对应教程 →',exact:true}).click();
 await expect(page).toHaveURL(new RegExp(`#course/${q.lessonId}`));
});

test('persistent bookmarks survive reload, appear in workbench and remain distinct from exam marks',async({page})=>{
 await page.goto(`/#practice?question=${q.id}`);await page.getByRole('button',{name:'开始练习',exact:true}).click();
 await page.getByRole('button',{name:'☆ 收藏此题',exact:true}).click();
 await expect(page.getByRole('button',{name:'★ 已收藏',exact:true})).toHaveAttribute('aria-pressed','true');
 await expect(page.getByRole('button',{name:'标记此题',exact:true})).toHaveAttribute('aria-pressed','false');
 await page.getByRole('button',{name:'复习工作台',exact:true}).click();
 await expect(page.locator('.saved-list article')).toHaveCount(1);await page.reload();
 await expect(page.locator('.saved-question-link')).toHaveText(q.stem);
 await page.getByRole('button',{name:`移除收藏：${q.topic}`,exact:true}).click();
 await expect(page.locator('.saved-list article')).toHaveCount(0);await page.reload();
 await expect(page.locator('.saved-empty')).toBeVisible();
});

test('smart review starts with a previous wrong answer and clears it only after a correct confirmation',async({page})=>{
 await seed(page,record({progress:{[q.id]:{attempts:2,correct:1,wrong:true}}}));
 await page.goto('/#review');await page.getByRole('button',{name:'开始智能复习 · 10 题 →',exact:true}).click();
 await expect(page.locator('#question-title')).toHaveText(q.stem);
 await page.getByRole('radio').nth(q.answer).click();await page.getByRole('button',{name:'确认答案',exact:true}).click();
 const state=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),subject.practiceKey);
 expect(state.progress[q.id]).toEqual({attempts:3,correct:2,wrong:false});
 expect(new Set(state.active.ids).size).toBe(10);
});

test('state, difficulty and editorial filters compose, reset and handle empty results',async({page},info)=>{
 await seed(page,record({saved:[q.id]}));await page.goto('/#review');
 await page.getByRole('button',{name:'练习本次新题 →',exact:true}).click();
 await expect(page.locator('.practice-match')).toContainText('匹配 20 题');
 await page.locator('#practice-status').selectOption('saved');
 await expect(page.locator('.practice-match')).toContainText('匹配 1 题');
 await page.locator('#practice-difficulty').selectOption('unrated');
 await expect(page.getByRole('button',{name:'开始练习',exact:true})).toBeDisabled();
 await expect(page.locator('.practice-match')).toContainText('没有匹配');
 await page.getByRole('button',{name:'重置筛选',exact:true}).click();
 await expect(page.locator('.practice-match')).toContainText(`匹配 ${subject.QUESTIONS.length} 题`);
 await page.screenshot({path:info.outputPath('practice-filtering.png'),fullPage:true});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
});

test('keyboard arrows stay inside the answer group while PageDown changes questions',async({page})=>{
 await page.goto('/#review');await page.getByRole('button',{name:'练习本次新题 →',exact:true}).click();
 await page.getByRole('button',{name:'开始练习',exact:true}).click();
 const stem=await page.locator('#question-title').textContent();
 await page.getByRole('radio').nth(0).focus();await page.keyboard.press('ArrowRight');
 await expect(page.getByRole('radio').nth(1)).toHaveAttribute('aria-checked','true');
 await expect(page.locator('#question-title')).toHaveText(stem);
 await page.keyboard.press('PageDown');await expect(page.locator('#question-title')).not.toHaveText(stem);
 await expect(page.locator('#question-title')).toBeFocused();
});

test('bookmarks export and merge without duplicating learning progress',async({page})=>{
 await seed(page,record({saved:[q.id],progress:{[q.id]:{attempts:1,correct:1,wrong:false}}}));
 await page.goto('/#history');
 const downloading=page.waitForEvent('download');await page.getByRole('button',{name:'导出学习记录',exact:true}).click();
 const download=await downloading;const stream=await download.createReadStream();const chunks=[];for await(const part of stream)chunks.push(part);
 const data=JSON.parse(Buffer.concat(chunks).toString());expect(data.subjects.options.practice.saved).toEqual([q.id]);
 await page.locator('#import-records').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});
 await page.getByRole('button',{name:'合并保存',exact:true}).click();
 const restored=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),subject.practiceKey);
 expect(restored.saved).toEqual([q.id]);expect(restored.progress[q.id].attempts).toBe(1);
});

test('exam-mode new questions never expose rationales before submission',async({page})=>{
 const engine=createExamEngine(subject),ids=engine.makePaper(subject.QUESTIONS,'comprehensive');
 const index=ids.findIndex(id=>subject.QUESTIONS.find(item=>item.id===id).chapter===q.chapter);
 if(!ids.includes(q.id))ids[index]=q.id;
 const session=engine.makeSession(ids,'exam','comprehensive');session.index=ids.indexOf(q.id);
 await seed(page,record({active:session}));await page.reload();await page.getByRole('button',{name:'继续作答',exact:true}).click();
 await expect(page.locator('#question-title')).toHaveText(q.stem);await expect(page.locator('.option-rationales')).toHaveCount(0);
 await expect(page.locator('#main')).not.toContainText(q.rationales[q.answer]);
 await page.getByRole('radio').nth(q.answer).click();await expect(page.locator('.option-rationales')).toHaveCount(0);
 await page.getByRole('button',{name:'提交试卷',exact:true}).click();await page.getByRole('button',{name:'确认交卷',exact:true}).click();
 await expect(page.locator('.option-rationales').first()).toBeVisible();
});
