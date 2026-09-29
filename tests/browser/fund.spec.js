import { test, expect } from '@playwright/test';
import { FUND_QUESTIONS } from '../../src/fund-questions.js';
import { FUND_LESSONS } from '../../src/fund-course-data.js';

test('fund exam is isolated from options, restores timer and grades 100 questions at one point each',async({page},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await page.getByRole('button',{name:'开始综合模拟',exact:true}).click();
 await page.getByRole('radio').first().click();
 const old=await page.evaluate(()=>localStorage.getItem('zhiquan.practice.v1'));
 await page.selectOption('#subject-select','fund1');
 await expect(page.getByRole('heading',{name:'中国大陆基金从业资格',exact:true})).toBeVisible();
 await page.screenshot({path:info.outputPath('fund-home.png'),fullPage:true});
 await page.getByRole('button',{name:'开始本科模拟',exact:true}).click();
 await expect(page.locator('.answer-cell')).toHaveCount(100);
 await expect(page.locator('#timer-value')).toHaveText(/^(120:00|119:5\d)$/);
 await expect(page.locator('.answer-rules')).toContainText('60 分');
 await expect(page.locator('.explanation')).toHaveCount(0);
 const stem=await page.locator('#question-title').textContent(), q=FUND_QUESTIONS.fund1.find(q=>q.stem===stem);
 await page.getByRole('radio').nth(q.answer).click();
 await page.selectOption('#subject-select','fund2');
 await expect(page.locator('.resume-banner')).toHaveCount(0);
 await page.selectOption('#subject-select','fund1');
 await page.getByRole('button',{name:'继续作答',exact:true}).click();
 await expect(page.locator('#question-title')).toHaveText(stem);
 await expect(page.getByRole('radio').nth(q.answer)).toHaveAttribute('aria-checked','true');
 await page.getByRole('button',{name:'提交试卷',exact:true}).click();
 await expect(page.getByRole('dialog')).toContainText('99 题未作答');
 await page.getByRole('button',{name:'确认交卷',exact:true}).click();
 await expect(page.locator('.result-message')).toContainText('答对 1 / 100');
 await expect(page.locator('.big-score')).toHaveText('1/ 100 分');
 await expect(page.locator('.section-results')).toContainText('基金从业 · 科目一');
 await expect(page.locator('.review-question')).toHaveCount(100);
 expect(await page.evaluate(()=>localStorage.getItem('zhiquan.practice.v1'))).toBe(old);
 await page.selectOption('#subject-select','options');
 await page.getByRole('button',{name:'继续作答',exact:true}).click();
 await expect(page.getByRole('radio').first()).toHaveAttribute('aria-checked','true');
 expect(errors).toEqual([]);
});

test('all 15 lessons, self-checks, diagrams, source resources and chapter practice work on each viewport',async({page},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const subject of ['fund1','fund2','fund3']){
  await page.goto(`/?subject=${subject}#course`);
  for(const [index,l] of FUND_LESSONS[subject].entries()){
   if(info.project.name==='mobile')await page.selectOption('#course-chapter',l.id);
   else await page.locator('.course-toc').getByRole('link').nth(index).click();
   await expect(page.locator('#lesson-title')).toHaveText(l.title);
   await expect(page.locator('.lesson-section')).toHaveCount(3);
   await page.locator(`[data-action="course-answer"][data-choice="${l.check.answer}"]`).click();
   await expect(page.locator('.check-feedback')).toContainText('回答正确');
   if(l.diagram){
    await expect(page.locator('.fund-diagram')).toBeVisible();
    if(await page.locator('[data-fund-lab]').count()){
     const before=await page.locator('#fund-lab-output').textContent();
     await page.locator('[data-fund-lab]').fill(await page.locator('[data-fund-lab]').getAttribute('max'));
     await expect(page.locator('#fund-lab-output')).not.toHaveText(before);
    }
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
  }
  await page.locator('[data-action="course-complete"]').click();await page.reload();
  await expect(page.locator('.course-progress')).toContainText('1 / 5');
  await page.screenshot({path:info.outputPath(`${subject}-course.png`),fullPage:true});
  await page.locator('[data-action="course-practice"]').click();
  await expect(page.locator('.practice-settings h2')).toHaveText(subject==='fund1'?'净值与费用入门':subject==='fund2'?'基金交易计算':'业绩与分配计算');
  await page.getByRole('button',{name:'开始练习',exact:true}).click();
  const stem=await page.locator('#question-title').textContent(),q=FUND_QUESTIONS[subject].find(q=>q.stem===stem);
  await page.getByRole('radio').nth((q.answer+1)%4).click();await page.getByRole('button',{name:'确认答案',exact:true}).click();
  await expect(page.locator('.explanation')).toContainText(q.explanation);
  await page.getByRole('button',{name:/错题本/}).click();await expect(page.locator('.list-question')).toHaveCount(1);
  await page.getByRole('button',{name:'重练这 1 题',exact:true}).click();
  await page.getByRole('button',{name:'替换并开始',exact:true}).click();
  await page.getByRole('radio').nth(q.answer).click();await page.getByRole('button',{name:'确认答案',exact:true}).click();
  await page.getByRole('button',{name:/错题本/}).click();await expect(page.getByRole('heading',{name:'错题本还是空的'})).toBeVisible();
  await page.getByRole('button',{name:'真题资料',exact:true}).click();await page.reload();
  await expect(page.getByRole('heading',{name:'真题资料与官方大纲'})).toBeVisible();
  await expect(page.locator('#main')).toContainText('非官方原卷');
  await expect(page.locator('#main a[href$=".pdf"]')).toHaveCount(3);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
 }
 expect(errors).toEqual([]);
});

test('expired fund exam submits on return and corrupted storage is recoverable',async({page})=>{
 await page.goto('/?subject=fund3');await page.getByRole('button',{name:'开始本科模拟',exact:true}).click();
 await page.evaluate(()=>{
  const key='zhiquan.fund3.practice.v1',d=JSON.parse(localStorage.getItem(key));
  d.active.startedAt=Date.now()-121*60000;d.active.deadline=d.active.startedAt+120*60000;
  localStorage.setItem(key,JSON.stringify(d));
 });
 await page.reload();await expect(page.locator('.page-heading')).toContainText('到时自动交卷');
 await expect(page.locator('.result-message')).toContainText('答对 0 / 100');
 await page.evaluate(()=>localStorage.setItem('zhiquan.fund3.practice.v1','{bad'));
 await page.reload();await expect(page.locator('.warning')).toBeVisible();
 await expect(page.getByRole('heading',{name:'中国大陆基金从业资格'})).toBeVisible();
});
