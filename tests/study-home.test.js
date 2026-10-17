import test from 'node:test';
import assert from 'node:assert/strict';
import { SUBJECTS } from '../src/subjects.js';
import { studyHome } from '../src/study-home.js';

const empty = () => ({ active: null, suspended: null, progress: {}, history: [], saved: [] });
const home = (s, state = empty(), reading = { last: s.LESSONS[0].id, done: [] }) => studyHome(s, state, reading, '');
const section = (html, name) => html.match(new RegExp(`<section class="${name}"[\\s\\S]*?</section>`))[0];

test('each subject resumes unfinished reading and retains the final chapter after all chapters are read', () => {
  for (const s of Object.values(SUBJECTS)) {
    const [first, second, third] = s.LESSONS;
    const start = section(home(s), 'reading-invitation');
    assert.match(start, /开始阅读/);
    assert.ok(start.includes(`data-lesson="${first.id}"`));

    // An opened later chapter remains the recommendation even with an earlier gap.
    const reading = { last: third.id, done: [first.id] };
    const before = JSON.stringify(reading);
    const resumed = section(home(s, empty(), reading), 'reading-invitation');
    assert.ok(resumed.includes(`data-lesson="${third.id}"`));
    assert.match(resumed, /继续阅读/);
    assert.equal(JSON.stringify(reading), before);

    const gap = section(home(s, empty(), { last: third.id, done: [first.id, third.id] }), 'reading-invitation');
    assert.ok(gap.includes(`data-lesson="${second.id}"`));
    assert.match(gap, /阅读未读章节/);

    const last = s.LESSONS.at(-1);
    const completed = section(home(s, empty(), { last: last.id, done: s.LESSONS.map(l => l.id) }), 'reading-invitation');
    assert.ok(completed.includes(`data-lesson="${last.id}"`));
    assert.match(completed, /全部章节已读/);
    assert.match(completed, /回看本章/);
    assert.doesNotMatch(completed, /开始阅读|继续阅读/);
  }
});

test('a parked random session is described as continuing and stays a direct entry', () => {
  const state = empty();
  state.active = { mode: 'exam' };
  state.suspended = { drill: { endless: true } };
  const before = JSON.stringify(state);
  const invitation = section(home(SUBJECTS.options, state), 'practice-invitation');
  assert.match(invitation, /data-action="nav" data-view="drill"[^>]*>继续随机刷题/);
  assert.doesNotMatch(invitation, /<input|<select|开始随机刷题/);
  assert.equal(JSON.stringify(state), before);
});

test('home statistics distinguish subject coverage, repeated answers and retained recent records', () => {
  const s = SUBJECTS.options, state = empty(), q = s.QUESTIONS[0];
  state.progress[q.id] = { attempts: 4, correct: 3, wrong: true };
  state.progress['outside-this-subject'] = { attempts: 99, correct: 99, wrong: false };
  state.history = Array.from({ length: 50 }, () => ({}));
  const html = home(s, state), metrics = section(html, 'desk-progress');
  assert.match(metrics, /class="attempted-count">1</);
  assert.match(metrics, /累计作答 4 次，答对 3 次/);
  assert.match(metrics, /<strong>75%/);
  assert.match(metrics, /data-view="wrong"><strong>1</);
  assert.match(metrics, /data-view="history"><strong>50</);
  assert.match(metrics, /最近完成记录/);
  assert.match(html, /不代表掌握度/);
  assert.match(html, /最多保留 50 份/);
  assert.match(html, /1 道待纠正/);
});

test('the home review entry uses real wrong and unseen states without introducing setup controls', () => {
  const s = SUBJECTS.options, state = empty(), q = s.QUESTIONS[0];
  state.progress[q.id] = { attempts: 1, correct: 0, wrong: true };
  const wrong = section(home(s, state), 'desk-review');
  assert.match(wrong, /有 1 道题待纠正/);
  assert.match(wrong, /data-action="start-review"[^>]*>开始复习 · 10 题/);
  assert.doesNotMatch(wrong, /<input|<select/);

  state.progress[q.id] = { attempts: 2, correct: 1, wrong: false };
  const unseen = section(home(s, state), 'desk-review');
  assert.ok(unseen.includes(`还有 ${s.QUESTIONS.length - 1} 道题尚未练过`));
  assert.doesNotMatch(unseen, /有 1 道题待纠正/);

  for (const item of s.QUESTIONS) state.progress[item.id] = { attempts: 1, correct: 1, wrong: false };
  const covered = section(home(s, state), 'desk-review');
  assert.match(covered, /本科题目已全部练过/);
  assert.doesNotMatch(covered, /尚未练过/);
});
