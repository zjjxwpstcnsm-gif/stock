import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SUBJECTS } from '../src/subjects.js';
import { FUND_OUTLINE } from '../src/fund-outline-data.js';
import { coverageIndex, coverageSummary, filterCoverage, questionIdsForObjective, fundCoverage } from '../src/coverage-views.js';

const question = (id, extra = {}) => ({
  id, chapter: 6, scope: '1.1', lessonId: 'fund1-syllabus-1',
  topic: '金融市场', stem: `训练场景 ${id}`, options: ['选项甲', '选项乙', '选项丙', '选项丁'],
  answer: 0, explanation: '解析内容不应在覆盖页泄露', origin: '原创情景训练', ...extra,
});
const fixture = (questions = []) => ({ ...SUBJECTS.fund1, QUESTIONS: questions });
const byCode = (rows, code = '1.1.a') => rows.find(row => row.code === code);

test('all three subjects retain every official requirement and exact lesson/source positioning', () => {
  for (const id of ['fund1', 'fund2', 'fund3']) {
    const rows = coverageIndex(SUBJECTS[id]);
    assert.equal(rows.length, FUND_OUTLINE[id].length);
    assert.deepEqual(rows.map(row => row.code), FUND_OUTLINE[id].map(row => row.code));
    for (const row of rows) {
      assert.ok(row.lessonId && row.section && row.page > 0);
      assert.equal(row.practiceChapter, Number(row.code.split('.')[0]) + 5);
      assert.ok(row.directQuestions.every(q => q.outlineCodes.includes(row.code)));
      assert.ok(row.sectionQuestions.every(q => q.scope === row.scope));
      assert.ok(row.sectionQuestions.every(q => !row.directQuestions.some(direct => direct.id === q.id)));
    }
  }
});

test('chapter, scope, lesson and keyword similarity never imply direct objective coverage', () => {
  const subject = fixture([
    question('same-scope', { stem: FUND_OUTLINE.fund1[0].text }),
    question('wrong-shape', { outlineCodes: '1.1.a' }),
    question('section-only', { outlineCodes: ['1.1'] }),
    question('unknown-code', { outlineCodes: ['1.1.zz'] }),
  ]);
  const rows = coverageIndex(subject);
  assert.equal(byCode(rows).directQuestions.length, 0);
  assert.equal(byCode(rows).sectionQuestions.length, 4);
  assert.deepEqual(coverageSummary(rows), { total: 108, mapped: 0, gaps: 108, questions: 0, checked: 0, wrong: 0 });
  assert.deepEqual(questionIdsForObjective(subject, '1.1.zz'), []);
  assert.deepEqual(questionIdsForObjective(subject, '1.1'), []);
});

test('shared mappings count objectives separately while question totals and practice IDs are deduplicated', () => {
  const first = question('first', { outlineCodes: ['1.1.a', '1.1.a', '1.1.b', 'invalid'] });
  const second = question('second', { outlineCodes: ['1.1.b'] });
  const subject = fixture([first, second, first]);
  const rows = coverageIndex(subject);
  assert.equal(byCode(rows).directQuestions.length, 1);
  assert.equal(byCode(rows, '1.1.b').directQuestions.length, 2);
  assert.deepEqual(coverageSummary(rows), { total: 108, mapped: 2, gaps: 106, questions: 2, checked: 0, wrong: 0 });
  assert.deepEqual(questionIdsForObjective(subject, '1.1.b'), ['first', 'second']);
});

test('only recorded attempts count; current correctness is not represented as mastery', () => {
  const subject = fixture([
    question('first', { outlineCodes: ['1.1.a', '1.1.b'] }),
    question('second', { outlineCodes: ['1.1.b'] }),
    question('third', { outlineCodes: ['1.1.c'] }),
  ]);
  const progress = Object.freeze({
    first: Object.freeze({ attempts: 2, correct: 1, wrong: true }),
    second: Object.freeze({ attempts: 1, correct: 1, wrong: false }),
    third: Object.freeze({ attempts: 0, correct: 0, wrong: true }),
  });
  const before = JSON.stringify({ subject, progress });
  const rows = coverageIndex(subject, progress);
  assert.deepEqual(coverageSummary(rows), { total: 108, mapped: 3, gaps: 105, questions: 3, checked: 2, wrong: 1 });
  assert.equal(byCode(rows, '1.1.b').checkedQuestions.length, 2);
  assert.equal(byCode(rows, '1.1.c').wrongQuestions.length, 0);
  assert.equal(JSON.stringify({ subject, progress }), before);
  const html = fundCoverage(subject, 1, { progress });
  assert.match(html, /不能等同于掌握率/);
  assert.match(html, /对应题已作答 2 \/ 2/);
  assert.doesNotMatch(html, /已掌握|掌握率\s*\d/);
});

test('keyword, chapter and coverage filters combine and distinguish gaps from unseen questions', () => {
  const subject = fixture([
    question('first', { outlineCodes: ['1.1.a'], stem: '客户选择产品的情景 ALPHA' }),
    question('second', { outlineCodes: ['1.1.b'] }),
    question('third', { outlineCodes: ['2.1.a'], chapter: 7, scope: '2.1' }),
  ]);
  const rows = coverageIndex(subject, { first: { attempts: 1, wrong: true } });
  assert.equal(filterCoverage(rows, { status: 'mapped' }).length, 3);
  assert.equal(filterCoverage(rows, { status: 'gaps' }).length, 105);
  assert.equal(filterCoverage(rows, { status: 'unseen' }).length, 2);
  assert.deepEqual(filterCoverage(rows, { status: 'wrong' }).map(row => row.code), ['1.1.a']);
  assert.deepEqual(filterCoverage(rows, { chapter: '1', status: 'mapped', query: '客户 alpha' }).map(row => row.code), ['1.1.a']);
  assert.equal(filterCoverage(rows, { chapter: 2, query: '客户' }).length, 0);
  assert.deepEqual(filterCoverage(rows, { query: '2.1.a' }).map(row => row.code), ['2.1.a']);
  assert.equal(filterCoverage(rows, { status: 'gaps', query: '客户选择产品' }).length, 0);
});

test('coverage page shows stems, real gaps and independent broad-practice counts without revealing answers', () => {
  const subject = fixture([
    question('mapped', { outlineCodes: ['1.1.a'], stem: '唯一情景预览题干' }),
    question('broad'),
  ]);
  const html = fundCoverage(subject, 1);
  assert.match(html, /直接对应 1 题/);
  assert.match(html, /同节另有 1 题，仅作拓展/);
  assert.match(html, /暂无已核验对应题/);
  assert.match(html, /唯一情景预览题干/);
  assert.match(html, /data-action="coverage-practice" data-code="1\.1\.a"/);
  assert.match(html, /data-action="practice-one" data-id="mapped"/);
  assert.match(html, /data-action="course-open" data-lesson="fund1-syllabus-1" data-scope="1\.1"/);
  assert.match(html, /\.pdf#page=2/);
  assert.match(html, /data-action="quick-practice" data-chapter="6"/);
  assert.doesNotMatch(html, /选项甲|解析内容不应在覆盖页泄露/);
  assert.doesNotMatch(html, /<table/);
});

test('complete objective and section identifiers match exactly rather than chapter-number suffixes', () => {
  const rows = coverageIndex(SUBJECTS.fund2);
  assert.deepEqual(filterCoverage(rows, { query: '4.1.b' }).map(row => row.code), ['4.1.b']);
  assert.deepEqual(filterCoverage(rows, { query: '4.1.B' }).map(row => row.code), ['4.1.b']);
  assert.ok(filterCoverage(rows, { query: '4.1' }).every(row => row.scope === '4.1'));
  assert.equal(filterCoverage(rows, { chapter: 14, query: '4.1.b' }).length, 0);
});

test('rendering escapes dynamic text and safely normalizes invalid view filters', () => {
  const subject = fixture([question('q"<tag>', { outlineCodes: ['1.1.a'], stem: '<img src=x onerror="alert(1)">' })]);
  const html = fundCoverage(subject, -100, { query: '"><script>', status: 'invalid' });
  assert.match(html, /value="&quot;&gt;&lt;script&gt;"/);
  assert.match(html, /没有符合条件的大纲要求/);
  assert.doesNotMatch(html, /<script>|<img/);
  const preview = fundCoverage(subject, 1);
  assert.match(preview, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
  assert.match(preview, /data-id="q&quot;&lt;tag&gt;"/);
  assert.equal(fundCoverage(SUBJECTS.options), '');
  assert.deepEqual(coverageIndex(SUBJECTS.options), []);
  assert.deepEqual(questionIdsForObjective(SUBJECTS.options, '1.1.a'), []);
});

test('zero explicit mappings remain a useful, honest, fully navigable coverage page', () => {
  const html = fundCoverage(fixture([question('broad')]), 0, { status: 'gaps' });
  assert.equal((html.match(/class="coverage-objective needs-mapping"/g) || []).length, 108);
  assert.equal((html.match(/data-action="coverage-practice"/g) || []).length, 0);
  assert.match(html, /先读本节并对照教材、原文自查/);
  assert.match(html, /旧题可能已涉及这些要求，但尚未逐题建立可核验映射/);
  assert.match(html, /显示 108 \/ 108 条要求/);
  assert.match(html, /只[有]标注到完整大纲编号/);
});
