import test from 'node:test';
import assert from 'node:assert/strict';
import { SUBJECTS } from '../src/subjects.js';
import { RULE_REVIEW_BATCH, RULE_REVIEW_QUESTIONS, RULE_REVIEW_SOURCES } from '../src/rule-review-questions.js';

const all = Object.values(RULE_REVIEW_QUESTIONS).flat();
const question = (subject, number) => all.find(q => q.id === `${subject}-rule-review-${String(number).padStart(3, '0')}`);

test('24 distinct rule applications have complete rationales, original provenance and scoped legal references', () => {
  assert.equal(all.length, 24);
  assert.equal(new Set(all.map(q => q.id)).size, 24);
  assert.equal(new Set(all.map(q => q.stem)).size, 24);
  assert.equal(new Set(all.map(q => q.topic)).size, 24);
  for (const [subjectId, questions] of Object.entries(RULE_REVIEW_QUESTIONS)) {
    assert.equal(questions.length, ['securities2', 'futures2'].includes(subjectId) ? 12 : 0);
    const subject = SUBJECTS[subjectId];
    assert.ok(subject, subjectId);
    for (const q of questions) {
      assert.ok(subject.CHAPTERS[q.chapter], q.id);
      assert.ok(subject.LESSONS.some(l => l.id === q.lessonId), q.id);
      assert.equal(q.type, 'single');
      assert.equal(q.options.length, 4);
      assert.equal(new Set(q.options).size, 4, q.id);
      assert.equal(q.rationales.length, 4);
      assert.ok(q.rationales.every(r => r.length >= 20), q.id);
      assert.ok(q.stem.length >= 55, q.id);
      assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4, q.id);
      assert.equal(q.explanation, q.rationales[q.answer], q.id);
      assert.equal(q.reviewedAt, '2026-10-14');
      assert.equal(q.editorialBatch, RULE_REVIEW_BATCH);
      assert.equal(q.sourceKind, 'original');
      assert.match(q.origin, /原创.*非真题/);
      assert.match(q.referenceSection, /《.+》.*第[一二三四五六七八九十百零]+条/);
      assert.ok(RULE_REVIEW_SOURCES[q.source], q.id);
      assert.ok(subject.SOURCES[q.source], `${q.id}: source must be integrated`);
      assert.equal(subject.QUESTIONS.filter(other => other.id === q.id).length, 1, `${q.id}: include exactly once`);
      assert.ok(!q.year && !q.examSession && !q.sourceQuestion && !q.variantFamily, q.id);
      assert.ok(!subject.QUESTIONS.some(other => other.id !== q.id && other.stem === q.stem), q.id);
    }
  }
});

test('law coverage spans distinct chapters and avoids an answer-position shortcut', () => {
  for (const [id, minimumChapters] of [['securities2', 6], ['futures2', 5]]) {
    const qs = RULE_REVIEW_QUESTIONS[id];
    assert.ok(new Set(qs.map(q => q.chapter)).size >= minimumChapters);
    assert.deepEqual([0, 1, 2, 3].map(answer => qs.filter(q => q.answer === answer).length), [3, 3, 3, 3]);
  }
  for (const source of Object.values(RULE_REVIEW_SOURCES)) {
    assert.equal(source.kind, 'official');
    assert.match(source.url, /^https:\/\/(www\.)?(sipf\.com\.cn|cfachina\.org|csrc\.gov\.cn|samr\.gov\.cn)\//);
  }
});

test('boundary quantities are independently recalculated rather than rounded into the wrong rule', () => {
  const underwriting = question('securities2', 4);
  const u = underwriting.ruleCheck;
  assert.equal(u.sold / u.offered, 0.7);
  assert.equal(u.threshold, 0.7);
  assert.equal(u.sold / u.offered < u.threshold, u.failsQuantityTest);
  assert.equal(u.failsQuantityTest, false);
  assert.match(underwriting.options[underwriting.answer], /恰好达到70%/);

  const shortSwing = question('securities2', 5).ruleCheck;
  assert.equal(shortSwing.statutoryMonths, 6);
  assert.ok(shortSwing.monthsBetween < shortSwing.statutoryMonths);

  const report = question('securities2', 7).ruleCheck;
  assert.deepEqual([report.annualMonths, report.interimMonths], [4, 2]);

  const stake = question('securities2', 8).ruleCheck;
  assert.ok(stake.fromPercent >= 5);
  assert.equal(stake.toPercent - stake.fromPercent, stake.deltaPercentagePoints);
  assert.equal(stake.deltaPercentagePoints, 1);

  const solicitation = question('securities2', 9).ruleCheck;
  assert.equal(solicitation.minimumPercent, 1);
  assert.equal(solicitation.stakePercent, solicitation.minimumPercent);
  assert.ok(solicitation.stakePercent >= solicitation.minimumPercent);
});

test('retention regimes and event-reporting units stay distinct', () => {
  const aml = question('securities2', 11);
  assert.equal(aml.ruleCheck.minimumYears, 10);
  assert.equal(aml.ruleCheck.effectiveDate, '2025-01-01');
  assert.match(aml.options[aml.answer], /业务关系结束后.*交易结束后.*十年/);
  const retention = question('futures2', 7);
  assert.deepEqual([retention.ruleCheck.operatorYears, retention.ruleCheck.serviceYears], [20, 10]);
  assert.match(retention.options[retention.answer], /经营机构至少二十年.*服务机构至少十年/);
  const report = question('futures2', 6);
  assert.deepEqual(report.ruleCheck, {kind: 'eventReport', days: 5, unit: '日', trigger: '事件发生'});
  assert.match(report.options[report.answer], /事件发生之日起五日内.*书面报告/);
  assert.doesNotMatch(report.options[report.answer], /工作日/);
});

test('the 2026 published company rule is not treated as effective before 2027-01-01', () => {
  const q = question('futures2', 11);
  const facts = q.ruleCheck;
  const published = Date.parse(`${facts.published}T00:00:00Z`);
  const asOf = Date.parse(`${facts.asOf}T00:00:00Z`);
  const effective = Date.parse(`${facts.effective}T00:00:00Z`);
  assert.ok(published < asOf);
  assert.ok(asOf < effective);
  assert.equal(asOf >= effective, facts.effectiveAtReview);
  assert.match(q.options[q.answer], /已公布、尚未施行/);
  assert.match(q.referenceSection, /第八十五条/);
});

test('scope exceptions cannot disappear from the difficult legal cases', () => {
  const revoked = question('securities2', 3);
  assert.match(revoked.stem, /已发行但尚未上市/);
  assert.match(revoked.options[revoked.answer], /能证明无过错的除外/);
  const service = question('securities2', 6);
  assert.match(service.stem, /与证券发行无关/);
  assert.match(service.options[service.answer], /实际开展工作.*公开后五日/);
  const closeout = question('futures2', 4);
  assert.match(closeout.rationales.join(''), /不能扩展为破产主体全部资产/);
  const cancellation = question('futures2', 8);
  assert.match(cancellation.options[cancellation.answer], /报告并公告.*重大过错/);
});
