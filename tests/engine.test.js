import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { QUESTIONS } from '../src/questions.js';
import { BANK_VERSION, PROFILES, SOURCES } from '../src/config.js';
import { makePaper, makeSession, grade, remainingSeconds, validSession, updateProgress, shuffle } from '../src/engine.js';

test('500 unique questions have four distinct options, valid keys, explanations and references', () => {
  assert.equal(QUESTIONS.length, 500);
  assert.equal(new Set(QUESTIONS.map(q => q.id)).size, 500);
  assert.equal(new Set(QUESTIONS.map(q => q.stem)).size, 500);
  for (const q of QUESTIONS) {
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options).size, 4, q.id);
    assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer <= 3, q.id);
    assert.ok(q.explanation.length > 15 && q.topic && SOURCES[q.source], q.id);
  }
  assert.deepEqual([1, 2, 3, 4].map(c => QUESTIONS.filter(q => q.chapter === c).length), [150, 100, 125, 125]);
});

test('the original 100 question IDs, texts, options and answers remain unchanged', () => {
  const counts = {1:30, 2:20, 3:25, 4:25};
  const original = QUESTIONS.filter(q => Number(q.id.split('-')[1]) <= counts[q.chapter]);
  assert.equal(original.length, 100);
  assert.equal(createHash('sha256').update(JSON.stringify(original)).digest('hex'), 'e3ade52b35956fd74ea3fae052611ddece13f421b662ad7cb0444a80eb82fc34');
});

test('additive bank update keeps prior-version practice and exam sessions gradeable', () => {
  const counts = {1:30, 2:20, 3:25, 4:25};
  const original = QUESTIONS.filter(q => Number(q.id.split('-')[1]) <= counts[q.chapter]);
  for (const profile of Object.keys(PROFILES)) {
    const session = makeSession(makePaper(original, profile), 'exam', profile);
    session.version = '2026-09-29.1';
    for (const id of session.ids) session.answers[id] = original.find(q => q.id === id).answer;
    assert.ok(validSession(session, QUESTIONS));
    assert.equal(grade(session, QUESTIONS).score, 100);
    assert.deepEqual(grade(session, QUESTIONS), grade(session, original));
  }
  const practice = {...makeSession(['c1-001'], 'practice'), version:'2026-09-29.1'};
  assert.ok(validSession(practice, QUESTIONS));
  assert.equal(validSession({...practice, version:'unknown-future'}, QUESTIONS), false);
});

for (const [key, p] of Object.entries(PROFILES)) {
  test(`${key}: exact chapter quotas, score weights and no duplicates in 100 random papers`, () => {
    for (let i = 0; i < 100; i++) {
      const ids = makePaper(QUESTIONS, key);
      assert.equal(ids.length, new Set(ids).size);
      const counts = {};
      for (const id of ids) {const q = QUESTIONS.find(q => q.id === id); counts[q.chapter] = (counts[q.chapter] || 0) + 1;}
      assert.deepEqual(counts, p.quotas);
      assert.equal(ids.length * p.points, 100);
    }
  });
}

function answeredSession(profile, correctPerChapter) {
  const s = makeSession(makePaper(QUESTIONS, profile, () => .42), 'exam', profile, 10000);
  const counts = {};
  for (const id of s.ids) {
    const q = QUESTIONS.find(q => q.id === id);
    counts[q.chapter] = (counts[q.chapter] || 0) + 1;
    s.answers[id] = counts[q.chapter] <= (correctPerChapter[q.chapter] || 0) ? q.answer : (q.answer + 1) % 4;
  }
  return s;
}

test('comprehensive score 70 passes only when all sections meet 60%', () => {
  const s = answeredSession('comprehensive', {1: 4, 2: 2, 3: 3, 4: 5});
  const g = grade(s, QUESTIONS);
  assert.equal(g.score, 70);
  assert.equal(g.passed, true);
  assert.deepEqual(g.sections.map(s => s.correct), [6, 3, 5]);
});
test('even score 85 fails if one section has 2 out of 5', () => {
  const g = grade(answeredSession('comprehensive', {1: 6, 2: 4, 3: 2, 4: 5}), QUESTIONS);
  assert.equal(g.score, 85);
  assert.equal(g.sectionPass, false);
  assert.equal(g.passed, false);
});
test('section thresholds alone do not pass a 60-point paper', () => {
  const g = grade(answeredSession('comprehensive', {1: 4, 2: 2, 3: 3, 4: 3}), QUESTIONS);
  assert.equal(g.score, 60);
  assert.equal(g.sectionPass, true);
  assert.equal(g.passed, false);
});
test('unanswered exam questions receive zero and become reviewable errors', () => {
  const s = makeSession(makePaper(QUESTIONS, 'level1'), 'exam', 'level1');
  const g = grade(s, QUESTIONS);
  assert.equal(g.score, 0);
  assert.equal(g.rows.filter(r => r.answer === null).length, 20);
  assert.equal(g.passed, false);
});
test('level 2 boundary is exactly seven correct', () => {
  assert.equal(grade(answeredSession('level2', {3: 7}), QUESTIONS).passed, true);
  assert.equal(grade(answeredSession('level2', {3: 6}), QUESTIONS).passed, false);
});
test('absolute timer survives serialization, includes background time, and clamps at zero', () => {
  const s = makeSession(makePaper(QUESTIONS, 'comprehensive'), 'exam', 'comprehensive', 1000);
  const restored = JSON.parse(JSON.stringify(s));
  assert.equal(remainingSeconds(restored, 1000), 1800);
  assert.equal(remainingSeconds(restored, 61000), 1740);
  assert.equal(remainingSeconds(restored, 1801000), 0);
  assert.equal(remainingSeconds(restored, 2801000), 0);
});
test('restoration validates version, IDs, quotas, answer bounds and deadline', () => {
  const s = answeredSession('comprehensive', {1: 3, 2: 2, 3: 1, 4: 4});
  assert.ok(validSession(s, QUESTIONS));
  for (const bad of [ {...s, version:'old'}, {...s, ids:['invalid']}, {...s, index:-1}, {...s, deadline:NaN}, {...s, deadline:s.deadline + 1}, {...s, answers:{[s.ids[0]]:4}}, {...s, marked:['bad']}, {...s, ids:[...s.ids.slice(1),s.ids[1]]} ]) assert.equal(validSession(bad, QUESTIONS), false);
});
test('practice is untimed and has no official pass/fail result', () => {
  const s = makeSession(QUESTIONS.slice(0, 2).map(q => q.id), 'practice');
  assert.equal(s.version, BANK_VERSION);
  assert.equal(remainingSeconds(s), null);
  assert.equal(grade(s, QUESTIONS).passed, null);
  assert.ok(validSession(s, QUESTIONS));
});
test('wrong book removes a question after a correct retry, without erasing cumulative attempts', () => {
  const a = updateProgress({}, [{ id:'c1-001', correct:false }]);
  const b = updateProgress(a, [{ id:'c1-001', correct:true }]);
  assert.equal(a['c1-001'].wrong, true);
  assert.deepEqual(b['c1-001'], {attempts:2, correct:1, wrong:false});
});
test('representative payoff examples are independently checked', () => {
  const answer = id => { const q = QUESTIONS.find(q => q.id === id); return q.options[q.answer]; };
  assert.equal(answer('c1-026'), `${.05 * 10200 * 2} 元`);
  assert.equal(answer('c3-022'), `${Math.round((2.7 - 2.5 - .08) * 10000)} 元`);
  assert.equal(answer('c4-021'), `${3.5 * 10000 * 2} 元`);
  assert.equal(answer('c2-008'), `亏损 ${(3 - 2.5 - .1).toFixed(2)} 元`);
  assert.equal(answer('c2-019'), `亏损 ${(4 + .1 - Math.max(3.8, 3.2)).toFixed(2)} 元`);
});
test('shuffle does not mutate its input and preserves elements', () => {
  const input = [1,2,3,4];
  assert.deepEqual(shuffle(input, () => 0), [2,3,4,1]);
  assert.deepEqual(input, [1,2,3,4]);
});
test('insufficient bank cannot silently generate an undersized exam', () => {
  assert.throws(() => makePaper(QUESTIONS.slice(0, 2), 'comprehensive'), /题量不足/);
});
