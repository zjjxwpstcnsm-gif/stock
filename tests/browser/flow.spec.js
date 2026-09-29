import { test, expect } from '@playwright/test';
import { QUESTIONS } from '../../src/questions.js';

test('exam: no answer leakage, save/reload, change answer, grade and review', async ({page}, info) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('heading',{name:'把知识练熟，再从容开考。'})).toBeVisible();
  await page.screenshot({path:info.outputPath('home.png'),fullPage:true});
  await page.getByRole('button',{name:'开始综合模拟',exact:true}).click();
  await expect(page.getByRole('radio')).toHaveCount(4);
  await expect(page.locator('.explanation')).toHaveCount(0);
  const stem = await page.locator('#question-title').textContent();
  const q = QUESTIONS.find(q => q.stem === stem);
  await page.getByRole('radio').nth((q.answer + 1) % 4).click();
  await page.getByRole('button',{name:'标记此题',exact:true}).click();
  const before = await page.locator('#timer-value').textContent();
  await page.reload();
  await page.getByRole('button',{name:'继续作答',exact:true}).click();
  await expect(page.locator('#question-title')).toHaveText(stem);
  await expect(page.getByRole('radio').nth((q.answer + 1) % 4)).toHaveAttribute('aria-checked','true');
  await expect(page.getByRole('button',{name:'已标记',exact:true})).toBeVisible();
  const after = await page.locator('#timer-value').textContent();
  expect(after <= before).toBeTruthy();
  await page.getByRole('radio').nth(q.answer).click();
  await page.screenshot({path:info.outputPath('exam.png'),fullPage:true});
  await page.getByRole('button',{name:'提交试卷',exact:true}).click();
  await expect(page.getByRole('dialog')).toContainText('还有 19 题未作答');
  await page.getByRole('button',{name:'确认交卷',exact:true}).click();
  await expect(page.locator('.big-score')).toContainText('5');
  await expect(page.locator('.result-message')).toContainText('答对 1 / 20');
  await expect(page.locator('.review-question')).toHaveCount(20);
  await page.reload();
  await page.getByRole('button',{name:'学习记录',exact:true}).click();
  await expect(page.locator('.history-row')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('practice: confirm, explanation, wrong-book, correct retry and persisted progress', async ({page}, info) => {
  await page.goto('/');
  await page.getByRole('button',{name:'专项练习',exact:true}).click();
  await page.getByRole('button',{name:'开始练习',exact:true}).click();
  const stem = await page.locator('#question-title').textContent();
  const q = QUESTIONS.find(q => q.stem === stem);
  await page.getByRole('radio').nth((q.answer + 1) % 4).click();
  await page.getByRole('button',{name:'确认答案',exact:true}).click();
  await expect(page.locator('.explanation')).toContainText(q.explanation);
  await page.getByRole('button',{name:'结束练习',exact:true}).click();
  await page.getByRole('dialog').getByRole('button',{name:'结束练习',exact:true}).click();
  await expect(page.locator('.result-message')).toContainText('答对 0 / 1');
  await page.getByRole('button',{name:/错题本/}).click();
  await expect(page.locator('.list-question')).toHaveCount(1);
  await page.getByRole('button',{name:'重练这 1 题',exact:true}).click();
  await page.getByRole('radio').nth(q.answer).click();
  await page.getByRole('button',{name:'确认答案',exact:true}).click();
  await expect(page.locator('.explanation')).toContainText('回答正确');
  await page.screenshot({path:info.outputPath('explanation.png'),fullPage:true});
  await page.getByRole('button',{name:/错题本/}).click();
  await expect(page.getByRole('heading',{name:'错题本还是空的'})).toBeVisible();
  await page.reload();
  await expect(page.locator('.progress-ring strong')).toHaveText('1');
});

test('expired restored exam automatically submits; malformed storage does not break app', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button',{name:'开始综合模拟',exact:true}).click();
  await page.evaluate(() => {
    const d = JSON.parse(localStorage.getItem('zhiquan.practice.v1'));
    d.active.startedAt = Date.now() - 31 * 60000;
    d.active.deadline = d.active.startedAt + 30 * 60000;
    localStorage.setItem('zhiquan.practice.v1', JSON.stringify(d));
  });
  await page.reload();
  await expect(page.locator('.page-heading')).toContainText('到时自动交卷');
  await expect(page.locator('.result-message')).toContainText('答对 0 / 20');
  await page.evaluate(() => localStorage.setItem('zhiquan.practice.v1', '{broken'));
  await page.reload();
  await expect(page.getByRole('heading',{name:'把知识练熟，再从容开考。'})).toBeVisible();
  await expect(page.locator('.warning')).toBeVisible();
});

test('all main views fit viewport without horizontal overflow', async ({page}) => {
  await page.goto('/');
  for (const name of ['模拟考试','专项练习','错题本','学习记录','考试说明']) {
    await page.getByRole('button',{name,exact:true}).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBeTruthy();
  }
});

test('expanded bank counts, 500-question navigation and new calculation review work', async ({page}, info) => {
  await page.goto('/');
  await expect(page.locator('.progress-ring')).toContainText('/ 500 题');
  await page.getByRole('button',{name:'专项练习',exact:true}).click();
  await expect(page.locator('.chapter-option b')).toHaveText(['500 题','150 题','100 题','125 题','125 题']);
  await page.selectOption('#practice-count','0');
  await page.getByRole('button',{name:'开始练习',exact:true}).click();
  await expect(page.locator('.answer-cell')).toHaveCount(500);
  await page.getByRole('button',{name:'第 500 题，未答',exact:true}).click();
  const q = QUESTIONS.at(-1);
  await expect(page.locator('#question-title')).toHaveText(q.stem);
  await page.getByRole('radio').nth(q.answer).click();
  await page.getByRole('button',{name:'确认答案',exact:true}).click();
  await expect(page.locator('.explanation')).toContainText(q.explanation);
  await expect(page.locator('.explanation a')).toHaveAttribute('href', /sse\.com\.cn/);
  expect(await page.locator('.answer-grid').evaluate(grid => {
    const current = grid.querySelector('[aria-current="step"]').getBoundingClientRect();
    const bounds = grid.getBoundingClientRect();
    return current.top >= bounds.top && current.bottom <= bounds.bottom+1;
  })).toBeTruthy();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth+1)).toBeTruthy();
  await page.screenshot({path:info.outputPath('question-500.png'),fullPage:true});
  await page.reload();
  await page.getByRole('button',{name:'继续作答',exact:true}).click();
  await expect(page.locator('#question-title')).toHaveText(q.stem);
  await expect(page.locator('.explanation')).toContainText('回答正确');
  await page.getByRole('button',{name:'考试说明',exact:true}).click();
  await expect(page.locator('#main')).toContainText('基础知识 150 道');
  await expect(page.locator('#main')).toContainText('HTTP 567');
});

test('original-bank active session, history and wrong-book survive expansion', async ({page}) => {
  await page.goto('/');
  const q = QUESTIONS.find(q => q.id==='c1-001');
  const session = {
    id:'old-session',version:'2026-09-29.1',ids:[q.id],mode:'practice',profile:null,
    answers:{[q.id]:(q.answer+1)%4},checked:[q.id],marked:[],index:0,
    startedAt:Date.now()-60000,deadline:null,title:'专项练习',
  };
  await page.evaluate(({session,id}) => {
    localStorage.setItem('zhiquan.practice.v1',JSON.stringify({
      active:session, progress:{[id]:{attempts:1,correct:0,wrong:true}},
      history:[{...session,id:'old-history',endedAt:Date.now()-30000}],
    }));
  },{session,id:q.id});
  await page.reload();
  await expect(page.locator('.progress-ring strong')).toHaveText('1');
  await page.getByRole('button',{name:'继续作答',exact:true}).click();
  await expect(page.locator('#question-title')).toHaveText(q.stem);
  await expect(page.locator('.explanation')).toContainText(q.explanation);
  await page.getByRole('button',{name:'学习记录',exact:true}).click();
  await expect(page.locator('.history-row')).toHaveCount(1);
  await page.getByRole('button',{name:/错题本/}).click();
  await expect(page.locator('.list-question')).toHaveCount(1);
});
