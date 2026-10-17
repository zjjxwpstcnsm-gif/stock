import {test, expect} from '@playwright/test';
import {SUBJECTS} from '../../src/subjects.js';
import {createExamEngine} from '../../src/engine.js';
import {createDrill} from '../../src/drill-engine.js';

const subject = SUBJECTS.options;
const engine = createExamEngine(subject);
const read = page => page.evaluate(key => JSON.parse(localStorage.getItem(key)), subject.practiceKey);

async function seedParkedExam(page, secondsLeft = 60) {
  const now = Date.now();
  await page.clock.install({time: now});
  const exam = engine.makeSession(engine.makePaper(subject.QUESTIONS, 'comprehensive'), 'exam', 'comprehensive', now - 30 * 60000 + secondsLeft * 1000);
  const examQuestion = subject.QUESTIONS.find(q => q.id === exam.ids[0]);
  exam.answers[examQuestion.id] = examQuestion.answer;
  const plan = createDrill(subject.QUESTIONS.map(q => q.id), {batchSize:20,endless:true,instant:true}, () => .999999);
  const active = {...engine.makeSession(plan.ids, 'practice', null, now), drill:plan.drill, title:`${subject.short} · 随机刷题`};
  await page.goto('/');
  await page.evaluate(({key, active, exam}) => {
    localStorage.setItem(key, JSON.stringify({active, suspended:exam, progress:{}, history:[], saved:[]}));
    history.replaceState(null, '', '/#drill');
  }, {key:subject.practiceKey, active, exam});
  await page.reload();
  await expect(page.locator('#question-title')).toHaveText(subject.QUESTIONS[0].stem);
  return {exam, active};
}

test('a parked exam expires once without resetting the live random question or its open explanation', async ({page}) => {
  const {exam} = await seedParkedExam(page);
  const q = subject.QUESTIONS[0];
  await page.locator(`#option-${q.answer}`).click();
  await page.locator('.focus-source summary').click();
  await page.locator('.focus-source summary').focus();
  const drill = (await read(page)).active;
  await page.clock.fastForward(61000);
  await expect.poll(async () => (await read(page)).suspended).toBeNull();
  const state = await read(page);
  expect(state.active).toEqual(drill);
  expect(state.history.filter(s => s.id === exam.id)).toHaveLength(1);
  expect(state.history[0].auto).toBe(true);
  expect(state.history[0].deadline).toBe(exam.deadline);
  expect(engine.grade(state.history[0], subject.QUESTIONS).score).toBe(5);
  await expect(page.locator('#question-title')).toHaveText(q.stem);
  await expect(page.locator('.focus-source')).toHaveAttribute('open', '');
  await expect(page.locator('.focus-source summary')).toBeFocused();
  await expect(page.locator('#session-notice')).toContainText('已到时自动交卷');
  await page.clock.fastForward(120000);
  await page.reload();
  const restored = await read(page);
  expect(restored.history.filter(s => s.id === exam.id)).toHaveLength(1);
  expect(restored.progress).toEqual(state.progress);
  expect(restored.active).toEqual(drill);
});

test('parked expiry keeps an open finish dialog attached to the original live practice', async ({page}) => {
  await seedParkedExam(page);
  const q = subject.QUESTIONS[0];
  await page.locator(`#option-${q.answer}`).click();
  await page.getByRole('button', {name:'结束练习', exact:true}).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.clock.fastForward(61000);
  await expect.poll(async () => (await read(page)).suspended).toBeNull();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('dialog').getByRole('button', {name:'结束练习', exact:true}).click();
  await expect(page.locator('.result-message')).toContainText('答对 1 / 1');
  const state = await read(page);
  expect(state.history).toHaveLength(2);
  expect(state.history.filter(s => s.mode === 'exam')).toHaveLength(1);
  expect(state.history.filter(s => s.mode === 'practice')).toHaveLength(1);
});

for (const cancellation of ['button', 'escape']) {
  test(`expired parked exam disappears from the home summary after dialog cancellation by ${cancellation}`, async ({page}) => {
    const {active, exam} = await seedParkedExam(page);
    await page.locator('.drill-back').click();
    await expect(page.locator('.resume-banner')).toContainText('模拟卷');
    await page.getByRole('button', {name:'开始综合模拟',exact:true}).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.clock.fastForward(61000);
    await expect.poll(async () => (await read(page)).suspended).toBeNull();
    await expect(page.getByRole('dialog')).toBeVisible();
    if (cancellation === 'escape') await page.keyboard.press('Escape');
    else await page.locator('[data-action="cancel-dialog"]').click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await expect(page.locator('.resume-banner')).not.toContainText('模拟卷');
    await expect(page.locator('[data-action="resume-suspended"]')).toHaveCount(0);
    await page.getByRole('button', {name:'继续作答',exact:true}).click();
    await expect(page.locator('#question-title')).toHaveText(subject.QUESTIONS[0].stem);
    const state = await read(page);
    expect(state.active).toEqual(active);
    expect(state.suspended).toBeNull();
    expect(state.history.filter(s => s.id === exam.id)).toHaveLength(1);
  });
}

test('an already expired parked exam is archived on reload while the drill stays resumable', async ({page}) => {
  const {exam, active} = await seedParkedExam(page, -60);
  const state = await read(page);
  expect(state.suspended).toBeNull();
  expect(state.active.id).toBe(active.id);
  expect(state.history[0].id).toBe(exam.id);
  await page.locator('.drill-back').click();
  await expect(page.locator('.resume-banner')).not.toContainText('模拟卷');
  await page.getByRole('button', {name:'学习记录', exact:true}).click();
  await expect(page.locator('.history-row')).toContainText('到时交卷');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
});

test('direct tutorial links and browser history update the homepage reading destination', async ({page}) => {
  await page.goto('/#course/delta-gamma');
  await expect(page.locator('#lesson-title')).toBeVisible();
  await page.getByRole('button', {name:'学习空间', exact:true}).click();
  await expect(page.locator('.reading-footer [data-action="course-open"]')).toHaveAttribute('data-lesson', 'delta-gamma');
  await page.reload();
  await expect(page.locator('.reading-footer [data-action="course-open"]')).toHaveAttribute('data-lesson', 'delta-gamma');
  await page.goto('/#course/contracts');
  await expect(page.locator('#lesson-title')).toHaveText('读懂合约、报价与术语');
  await page.goto('/#course/payoffs');
  await page.goBack();
  await expect(page).toHaveURL(/#course\/contracts$/);
  await page.getByRole('button', {name:'学习空间', exact:true}).click();
  await expect(page.locator('.reading-footer [data-action="course-open"]')).toHaveAttribute('data-lesson', 'contracts');
});

test('import preserves valid local work beside damaged reading progress and exports the original after reload', async ({page}) => {
  const q = subject.QUESTIONS[0];
  const active = engine.makeSession([q.id], 'practice');
  active.answers[q.id] = q.answer;
  active.checked = [q.id];
  const local = {active, suspended:null, progress:{[q.id]:{attempts:5,correct:4,wrong:false}}, history:[], saved:[q.id]};
  const practiceRaw = JSON.stringify(local);
  const courseRaw = JSON.stringify({last:'retired-lesson',done:[subject.LESSONS[0].id]});
  await page.goto('/');
  await page.evaluate(({subject, practiceRaw, courseRaw}) => {
    localStorage.setItem(subject.practiceKey, practiceRaw);
    localStorage.setItem(subject.courseKey, courseRaw);
    history.replaceState(null, '', '/#history');
  }, {subject:{practiceKey:subject.practiceKey,courseKey:subject.courseKey}, practiceRaw, courseRaw});
  await page.reload();
  const backup = {format:'zhiquan.learning-backup',version:1,subjects:{options:{
    practice:{active:null,progress:{},history:[],saved:[]},
    course:{last:subject.LESSONS[0].id,done:[]},
  }}};
  await page.locator('#import-records').setInputFiles({name:'learning.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});
  await page.getByRole('button', {name:'合并保存',exact:true}).click();
  await expect(page.locator('.record-status')).toContainText('有效进度已保留');
  const merged = await read(page);
  expect(merged.active).toEqual(active);
  expect(merged.progress).toEqual(local.progress);
  expect(merged.saved).toEqual([q.id]);
  await page.reload();
  const downloading = page.waitForEvent('download');
  await page.getByRole('button', {name:'导出原记录副本',exact:true}).click();
  const download = await downloading;
  const stream = await download.createReadStream();
  const chunks = [];
  for await (const part of stream) chunks.push(part);
  const originals = JSON.parse(Buffer.concat(chunks).toString());
  expect(originals.format).toBe('zhiquan.recovery-originals');
  expect(originals.copies[0].snapshots[0].practiceRaw).toBe(practiceRaw);
  expect(originals.copies[0].snapshots[0].courseRaw).toBe(courseRaw);
  expect(await read(page)).toEqual(merged);
});

test('the completed-course homepage keeps the last chapter and starts a wrong-first review directly', async ({page}, info) => {
  const q = subject.QUESTIONS[0];
  const last = subject.LESSONS.at(-1);
  await page.goto('/');
  await page.evaluate(({subject, questionId, last}) => {
    localStorage.setItem(subject.practiceKey, JSON.stringify({active:null,progress:{[questionId]:{attempts:7,correct:5,wrong:true}},history:[],saved:[questionId]}));
    localStorage.setItem(subject.courseKey, JSON.stringify({last,done:subject.lessonIds}));
  }, {subject:{practiceKey:subject.practiceKey,courseKey:subject.courseKey,lessonIds:subject.LESSONS.map(l=>l.id)},questionId:q.id,last:last.id});
  await page.reload();
  await expect(page.locator('#reading-title')).toHaveText(last.title);
  await expect(page.locator('.reading-footer button')).toHaveText('回看本章');
  await expect(page.locator('.desk-review')).toContainText('1 道题待纠正');
  await expect(page.locator('.attempted-count')).toHaveText('1');
  await expect(page.locator('.desk-progress')).toContainText('71%');
  await page.screenshot({path:info.outputPath('home-progress.png'),fullPage:true});
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
  await page.getByRole('button', {name:'开始复习 · 10 题',exact:true}).click();
  await expect(page.locator('#question-title')).toHaveText(q.stem);
  await expect(page.getByRole('dialog')).not.toBeVisible();
  expect((await read(page)).active.ids).toHaveLength(10);
  await expect(page.locator('#main select, #main input')).toHaveCount(0);
});

test('closed-session conflicts survive normal app saves after the old result leaves the latest fifty', async ({page}) => {
  const q = subject.QUESTIONS[0], now = Date.now();
  const pending = engine.makeSession([q.id], 'practice', null, now - 100000);
  const completed = {...pending, answers:{[q.id]:q.answer}, checked:[q.id], endedAt:now - 90000};
  const newer = Array.from({length:50}, (_, index) => ({
    ...engine.makeSession([q.id], 'practice', null, now - 80000 + index * 1000),
    answers:{[q.id]:q.answer}, checked:[q.id], endedAt:now - 79500 + index * 1000,
  }));
  const progress = {[q.id]:{attempts:1,correct:1,wrong:false}};
  const incoming = {format:'zhiquan.learning-backup',version:1,subjects:{options:{
    practice:{active:pending,progress:{},history:newer,saved:[]},
    course:{last:subject.LESSONS[0].id,done:[]},
  }}};
  await page.goto('/');
  await page.evaluate(({key, completed, progress}) => {
    localStorage.setItem(key, JSON.stringify({active:null,progress,history:[completed],saved:[]}));
    history.replaceState(null, '', '/#history');
  }, {key:subject.practiceKey, completed, progress});
  await page.reload();
  const importOnce = async () => {
    await page.locator('#import-records').setInputFiles({name:'old.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(incoming))});
    await page.getByRole('button', {name:'合并保存',exact:true}).click();
    await expect(page.locator('.record-status')).toContainText('已合并');
  };
  await importOnce();
  expect((await read(page)).history.some(s => s.id === pending.id)).toBe(false);
  expect((await read(page)).closedSessionIds).toContain(pending.id);
  await page.reload();
  await page.getByRole('button', {name:'随机刷题',exact:true}).click();
  const drill = (await read(page)).active;
  await page.getByRole('button', {name:'学习记录',exact:true}).click();
  await importOnce();
  const after = await read(page);
  expect(after.active).toEqual(drill);
  expect(after.suspended ?? null).toBeNull();
  expect(after.closedSessionIds).toContain(pending.id);
  expect(after.history).toHaveLength(50);
  expect(after.progress).toEqual(progress);
});
