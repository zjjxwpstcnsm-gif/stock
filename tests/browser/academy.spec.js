import {test,expect} from '@playwright/test';
import {SUBJECTS} from '../../src/subjects.js';
import {createExamEngine,questionType} from '../../src/engine.js';

test('new four subjects render every lesson, self-check and matching chapter practice',async({page},info)=>{
 test.setTimeout(120000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const id of ['securities1','securities2','futures1','futures2']){
  const s=SUBJECTS[id];await page.goto(`/?subject=${id}#course`);
  for(const [index,l] of s.LESSONS.entries()){
   if(info.project.name==='mobile')await page.selectOption('#course-chapter',l.id);
   else await page.locator('.course-toc').getByRole('link').nth(index).click();
   await expect(page.locator('#lesson-title')).toHaveText(l.title);
   await expect(page.locator('.lesson-section')).toHaveCount(4);
   await page.locator(`[data-action="course-answer"][data-choice="${l.check.answer}"]`).click();
   await expect(page.locator('.check-feedback')).toContainText('回答正确');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
  }
  await page.getByRole('button',{name:'标记本章已读',exact:true}).click();
  await page.reload();await expect(page.locator('.course-progress')).toContainText(`1 / ${s.LESSONS.length}`);
  await page.locator('[data-action="course-practice"]').click();
  await expect(page.locator('.practice-settings h2')).toHaveText(s.LESSONS.at(-1).title);
  await page.getByRole('button',{name:'真题资料',exact:true}).click();
  await expect(page.locator('.recall-question')).toHaveCount(s.QUESTIONS.filter(q=>q.sourceKind==='recall').length);
  await expect(page.locator('.recall-question .source').first()).toContainText('来源页面第');
  expect(errors).toEqual([]);
 }
 await page.screenshot({path:info.outputPath('new-subject-sources.png'),fullPage:true});
});

test('multi-select toggles, restores, rejects partial answers and moves correct retries out of wrong-book',async({page},info)=>{
 const s=SUBJECTS.securities2;
 await page.goto('/?subject=securities2#practice');await page.selectOption('#practice-type','multiple');
 await page.selectOption('#practice-count','0');await page.getByRole('button',{name:'开始练习',exact:true}).click();
 const stem=await page.locator('#question-title').textContent(),q=s.QUESTIONS.find(q=>q.stem===stem);
 await expect(page.getByRole('checkbox')).toHaveCount(4);await expect(page.locator('.explanation')).toHaveCount(0);
 await page.getByRole('checkbox').nth(q.answer[0]).click();
 await page.reload();await page.getByRole('button',{name:'继续作答',exact:true}).click();
 await expect(page.getByRole('checkbox').nth(q.answer[0])).toHaveAttribute('aria-checked','true');
 await page.getByRole('checkbox').nth(q.answer[0]).click();
 await expect(page.getByRole('button',{name:'确认答案',exact:true})).toBeDisabled();
 await page.getByRole('checkbox').nth(q.answer[0]).click();await page.getByRole('button',{name:'确认答案',exact:true}).click();
 await expect(page.locator('.explanation')).toContainText('再巩固一下');
 await page.getByRole('button',{name:/错题本/}).click();await expect(page.locator('.list-question')).toHaveCount(1);
 await page.locator('.list-question summary').click();await expect(page.locator('.list-question')).not.toContainText('undefined');
 await page.getByRole('button',{name:'重练这 1 题',exact:true}).click();await page.getByRole('button',{name:'替换并开始',exact:true}).click();
 for(const answer of q.answer)await page.getByRole('checkbox').nth(answer).click();
 await page.getByRole('button',{name:'确认答案',exact:true}).click();
 await expect(page.locator('.explanation')).toContainText('回答正确');
 await expect(page.locator('.option.correct')).toHaveCount(q.answer.length);
 await page.screenshot({path:info.outputPath('multi-answer.png'),fullPage:true});
 await page.locator('.answer-panel').getByRole('button',{name:'结束练习',exact:true}).click();
 await page.getByRole('dialog').getByRole('button',{name:'结束练习',exact:true}).click();
 await expect(page.locator('.big-score')).toContainText('100');
 await expect(page.locator('.review-options .right-answer')).toHaveCount(q.answer.length);
 await page.getByRole('button',{name:/错题本/}).click();await expect(page.getByRole('heading',{name:'错题本还是空的'})).toBeVisible();
});

test('futures exam restores mixed answers and grades type weights rather than question percentage',async({page},info)=>{
 const s=SUBJECTS.futures2;
 await page.goto('/?subject=futures2');await page.getByRole('button',{name:'开始本科模拟',exact:true}).click();
 await expect(page.locator('.answer-cell')).toHaveCount(130);await expect(page.locator('#timer-value')).toHaveText(/^(100:00|99:5\d)$/);
 await page.evaluate(({key,answers})=>{const data=JSON.parse(localStorage.getItem(key));data.active.answers=Object.fromEntries(data.active.ids.filter(id=>answers[id]!==undefined).map(id=>[id,answers[id]]));localStorage.setItem(key,JSON.stringify(data));},{key:s.practiceKey,answers:Object.fromEntries(s.QUESTIONS.filter(q=>['multiple','case'].includes(questionType(q))).map(q=>[q.id,q.answer]))});
 await page.reload();await page.getByRole('button',{name:'继续作答',exact:true}).click();
 await expect(page.locator('.answer-panel .section-title')).toContainText('50 / 130');
 await expect(page.locator('.explanation')).toHaveCount(0);
 await page.getByRole('button',{name:'提交试卷',exact:true}).click();await page.getByRole('button',{name:'确认交卷',exact:true}).click();
 await expect(page.locator('.big-score')).toHaveText('60/ 100 分');
 await expect(page.locator('.result-message')).toContainText('本次模拟达标');
 await expect(page.locator('.result-message')).toContainText('答对 50 / 130');
 await expect(page.locator('.review-question')).toHaveCount(130);
 await page.screenshot({path:info.outputPath('weighted-result.png'),fullPage:true});
});

test('catalog, cross-subject search and question deep links lead to usable practice without revealing answers',async({page})=>{
 await page.goto('/?subject=securities1#catalog');await expect(page.locator('.subject-card')).toHaveCount(8);
 await expect(page.locator('#main')).toContainText('2,454');
 await page.locator('#global-search').fill('久期');await page.locator('#topbar-search button').click();
 await expect(page).toHaveURL(/#search\?q=/);await expect(page.locator('.search-question').first()).toBeVisible();
 await page.selectOption('#search-scope','all');await expect(page.locator('.search-result').first()).toBeVisible();
 await page.selectOption('#search-type','question');
 const href=await page.locator('.search-question').first().getAttribute('href');
 const id=new URL(href,'http://example.test').hash.split('question=')[1];
 await page.locator('.search-question').first().click();
 await expect(page.locator('.practice-match')).toContainText('匹配 1 题');
 await expect(page.locator('.located-question')).toBeVisible();
 await page.reload();await expect(page.locator('.practice-match')).toContainText('匹配 1 题');
 await page.getByRole('button',{name:'开始练习',exact:true}).click();
 const q=Object.values(SUBJECTS).flatMap(s=>s.QUESTIONS).find(q=>q.id===decodeURIComponent(id));
 await expect(page.locator('#question-title')).toHaveText(q.stem);await expect(page.locator('.explanation')).toHaveCount(0);
 await page.goto('/?subject=securities1#search?q=不存在的考点XYZ');await expect(page.getByRole('heading',{name:'暂时没有匹配内容'})).toBeVisible();
});

test('reading preferences persist across self-check render and interactive models update real calculations',async({page},info)=>{
 await page.goto('/?subject=securities1#course/securities1-5');
 const output=page.locator('#academy-lab-output');await expect(output).toContainText('95.55 元');
 const currentPoint=await output.locator('.current-model-point').getAttribute('cx');
 await page.locator('#bond-yield').fill('3');await expect(output).toContainText('100.00 元');
 await expect(output.locator('.current-model-point')).not.toHaveAttribute('cx',currentPoint);
 await page.selectOption('#reader-size','large');await page.getByRole('button',{name:'专注阅读',exact:true}).click();
 await expect(page.locator('.shell')).toHaveClass(/reading-focus/);
 await page.locator('.check-options button').first().click();
 await expect(page.locator('.course-reader')).toHaveClass(/large-reading/);await expect(page.locator('.shell')).toHaveClass(/reading-focus/);
 await expect(page.locator('#reader-size')).toHaveValue('large');
 await page.getByRole('button',{name:'退出专注',exact:true}).click();
 await page.goto('/?subject=futures1#course/futures1-4');
 await expect(output.locator('.academy-lab-stats')).toContainText('4,000');
 await page.locator('#hedge-spot').fill('4800');await expect(output.locator('.academy-lab-stats div').last()).toHaveText('套保后有效售价4,000');
 await page.locator('#hedge-basis').fill('100');await expect(output.locator('.academy-lab-stats div').last()).toHaveText('套保后有效售价4,150');
 await expect(output.locator('svg')).toHaveAttribute('role','img');
 await page.locator('.academy-lab').scrollIntoViewIfNeeded();await page.screenshot({path:info.outputPath('basis-lab.png'),fullPage:true});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
});

test('record export, previewed merge and malformed imports work without losing current answers',async({page})=>{
 await page.goto('/?subject=securities2');await page.getByRole('button',{name:'开始本科模拟',exact:true}).click();
 const first=page.locator('.options [data-action="answer"]').first();await first.click();
 const active=await page.evaluate(()=>JSON.parse(localStorage.getItem('zhiquan.securities2.practice.v1')).active);
 await page.getByRole('button',{name:'学习记录',exact:true}).click();
 const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'导出学习记录',exact:true}).click();
 const download=await downloadPromise;expect(download.suggestedFilename()).toMatch(/^zhiquan-learning-.*\.json$/);
 const file=await download.path();await page.locator('#import-records').setInputFiles(file);
 await expect(page.getByRole('dialog')).toContainText('8 个科目');await page.getByRole('button',{name:'合并保存',exact:true}).click();
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('zhiquan.securities2.practice.v1')).active)).toEqual(active);
 await expect(page.locator('.record-status')).toContainText('已合并');
 await page.locator('#import-records').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('{bad')});
 await expect(page.locator('.record-status')).toContainText('文件不是有效JSON');
 await page.getByRole('button',{name:'模拟考试',exact:true}).click();await page.getByRole('button',{name:'继续作答',exact:true}).click();
 await expect(page.locator('.options [data-action="answer"]').first()).toHaveAttribute('aria-checked','true');
});

test('all new subject views fit mobile and desktop, with genuine-source zero-match states',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const id of ['securities1','securities2','futures1','futures2'])for(const view of ['','practice','course','resources','guide','catalog','history','wrong']){
  await page.goto(`/?subject=${id}${view?'#'+view:''}`);await expect(page.locator('h1')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${id}/${view}`).toBeTruthy();
 }
 await page.goto('/?subject=securities2#practice');await page.selectOption('#practice-source','sample');
 await expect(page.getByRole('button',{name:'开始练习',exact:true})).toBeDisabled();
 await expect(page.locator('.practice-match')).toContainText('暂无匹配');
 await page.goto('/#practice');await page.selectOption('#practice-source','original');
 await expect(page.locator('.practice-match')).toContainText('匹配 580 题');
 await page.selectOption('#practice-source','sample');await page.selectOption('#practice-year','2015');
 await expect(page.locator('.practice-match')).toContainText('匹配 10 题');
 await page.goto('/#guide');await expect(page.locator('#main')).not.toContainText('undefined');
 await page.goto('/?subject=__proto__');await expect(page.getByRole('heading',{name:'把知识练熟，再从容开考。'})).toBeVisible();
 expect(errors).toEqual([]);
});
