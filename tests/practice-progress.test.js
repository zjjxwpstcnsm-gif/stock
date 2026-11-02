import test from 'node:test';
import assert from 'node:assert/strict';
import { chapterProgress, practiceChapters } from '../src/practice-progress.js';

const subject = {
  CHAPTERS: {1: {name: '第一章', desc: '基础'}, 2: {name: '第二章', desc: '进阶'}, 3: {name: '空章', desc: ''}},
  QUESTIONS: [{id: 'a', chapter: 1}, {id: 'b', chapter: 1}, {id: 'c', chapter: 2}],
};
const record = (attempts = 1, wrong = false) => ({attempts, correct: wrong ? 0 : attempts, wrong});

test('fresh subjects and empty chapters have finite zero progress', () => {
  const {all, chapters} = chapterProgress(subject);
  assert.deepEqual(all, {total: 3, done: 0, remaining: 3, wrong: 0, percent: 0});
  assert.deepEqual(chapters.get(3), {total: 0, done: 0, remaining: 0, wrong: 0, percent: 0});
  assert.equal(chapterProgress(subject, null).all.done, 0);
});

test('progress counts unique current questions, not attempts, retired IDs or another subject', () => {
  const progress = {a: record(12), c: record(3, true), retired: record(20), otherSubject: record()};
  const before = structuredClone(progress);
  const {all, chapters} = chapterProgress(subject, progress);
  assert.deepEqual(all, {total: 3, done: 2, remaining: 1, wrong: 1, percent: 66.7});
  assert.deepEqual(chapters.get(1), {total: 2, done: 1, remaining: 1, wrong: 0, percent: 50});
  assert.equal(chapters.get(2).percent, 100);
  assert.equal(chapters.get(2).wrong, 1);
  assert.deepEqual(progress, before);
});

test('duplicate bank IDs do not inflate coverage', () => {
  const duplicate = {...subject, QUESTIONS: [...subject.QUESTIONS, subject.QUESTIONS[0]]};
  assert.equal(chapterProgress(duplicate, {a: record()}).all.total, 3);
  assert.equal(chapterProgress(duplicate, {a: record()}).chapters.get(1).done, 1);
});

test('invalid records are ignored using the same constraints as app load', () => {
  for (const invalid of [null, {}, record(0), record(-1), record(1.5), {...record(), attempts: '1'},
    {...record(), correct: -1}, {...record(), correct: 2}, {...record(), wrong: 'true'}]) {
    assert.equal(chapterProgress(subject, {a: invalid}).all.done, 0);
  }
});

test('new questions increase the denominator without dropping previous progress', () => {
  const expanded = {...subject, QUESTIONS: [...subject.QUESTIONS, {id: 'new', chapter: 2}]};
  const stats = chapterProgress(expanded, {c: record()}).chapters.get(2);
  assert.equal(stats.done, 1);
  assert.equal(stats.remaining, 1);
  assert.equal(stats.percent, 50);
});

test('100 percent requires every question, and corrections only change the wrong count', () => {
  const questions = Array.from({length: 10000}, (_, i) => ({id: String(i), chapter: 1}));
  const progress = Object.fromEntries(questions.slice(1).map(q => [q.id, record()]));
  const large = {...subject, QUESTIONS: questions};
  assert.equal(chapterProgress(large, progress).all.percent, 99.9);
  progress['0'] = record(1, true);
  assert.equal(chapterProgress(large, progress).all.percent, 100);
  assert.equal(chapterProgress(large, progress).all.wrong, 1);
  progress['0'] = record(2);
  assert.equal(chapterProgress(large, progress).all.done, 10000);
  assert.equal(chapterProgress(large, progress).all.wrong, 0);
});

test('all chapters are rendered, including untouched modules beyond the home preview', () => {
  const many = {CHAPTERS: Object.fromEntries(Array.from({length: 23}, (_, i) => [i + 1, {name: `模块${i + 1}`}])) , QUESTIONS: [{id: 'last', chapter: 23}]};
  const html = practiceChapters(many, {last: record()}, 23, id => many.QUESTIONS.filter(q => !id || q.chapter === id));
  assert.equal((html.match(/data-action="pick-chapter"/g) || []).length, 24);
  assert.match(html, /id="practice-chapter-23"[^>]+aria-pressed="true"/);
  assert.match(html, /已练 1 \/ 1 题/);
  assert.match(html, /已练完 · 100%/);
  assert.match(html, /暂无题目 · 0%/);
  assert.doesNotMatch(html, /NaN|Infinity/);
});

test('filters only change matched counts, never chapter coverage or availability of the selector', () => {
  const html = practiceChapters(subject, {a: record(5, true)}, 1, () => []);
  assert.match(html, /匹配 0 题/);
  assert.match(html, /已练 1 \/ 2 题/);
  assert.match(html, /练习中 · 50%/);
  assert.match(html, /未练 1 题/);
  assert.match(html, /待纠正 1 题/);
  assert.doesNotMatch(html, /disabled/);
});

test('chapter labels and descriptions are escaped, and bars have accompanying text', () => {
  const unsafe = {...subject, CHAPTERS: {1: {name: '<img onerror="bad">', desc: "<script>&'"}}};
  const html = practiceChapters(unsafe, {}, 0, () => []);
  assert.doesNotMatch(html, /<img|<script>/);
  assert.match(html, /&lt;img onerror=&quot;bad&quot;&gt;/);
  assert.match(html, /aria-hidden="true"/);
  assert.match(html, /尚未开始 · 0%/);
});
