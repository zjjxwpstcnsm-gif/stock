import test from 'node:test';
import assert from 'node:assert/strict';
import { SUBJECTS } from '../src/subjects.js';
import { FUND_OUTLINE } from '../src/fund-outline-data.js';
import { FUND_COVERAGE_QUESTIONS, FUND_COVERAGE_SOURCES, FUND_COVERAGE_BATCH } from '../src/coverage-fund-questions.js';

const all = Object.values(FUND_COVERAGE_QUESTIONS).flat();
const byId = id => all.find(q => q.id === id);

test('30 original fund cases have stable identities, substantive option-level reasons and valid lesson links', () => {
  assert.equal(all.length, 30);
  assert.equal(new Set(all.map(q => q.id)).size, 30);
  assert.equal(new Set(all.map(q => q.stem)).size, 30);
  for (const [subjectId, questions] of Object.entries(FUND_COVERAGE_QUESTIONS)) {
    assert.equal(questions.length, 10);
    const subject = SUBJECTS[subjectId];
    const answerCounts = [0, 0, 0, 0];
    for (const q of questions) {
      assert.match(q.id, new RegExp(`^${subjectId}-coverage-\\d{3}$`));
      assert.equal(q.editorialBatch, FUND_COVERAGE_BATCH);
      assert.equal(q.reviewedAt, '2026-10-14');
      assert.equal(q.sourceKind, 'original');
      assert.match(q.origin, /原创.*非真题/);
      assert.ok(!q.year && !q.sourceQuestion && !q.variantFamily, q.id);
      assert.equal(q.options.length, 4);
      assert.equal(new Set(q.options).size, 4);
      assert.equal(q.rationales.length, 4);
      assert.equal(new Set(q.rationales).size, 4, q.id);
      assert.ok(q.rationales.every(r => r.length >= 25), q.id);
      assert.ok(q.stem.length >= 45, q.id);
      assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4);
      assert.equal(q.explanation, q.rationales[q.answer]);
      answerCounts[q.answer]++;
      assert.ok(subject.CHAPTERS[q.chapter], q.id);
      assert.ok(subject.LESSONS.some(l => l.id === q.lessonId && l.practice === q.chapter), q.id);
      assert.ok(!subject.QUESTIONS.some(other => other.id !== q.id && other.stem === q.stem), q.id);
      assert.ok(FUND_COVERAGE_SOURCES[q.source], q.id);
      assert.ok(q.referenceSection.length >= 5 && q.reviewNote.length >= 30, q.id);
    }
    assert.deepEqual(answerCounts, [3, 3, 2, 2]);
  }
  for (const source of Object.values(FUND_COVERAGE_SOURCES)) {
    assert.ok(source.title && source.note);
    assert.equal(new URL(source.url).protocol, 'https:');
    assert.ok(['official', 'reference', 'editorial'].includes(source.kind));
  }
});

test('explicit mappings cite 31 real competencies, without expanding a chapter into assumed coverage', () => {
  const counts = {};
  for (const [id, questions] of Object.entries(FUND_COVERAGE_QUESTIONS)) {
    const valid = new Map(FUND_OUTLINE[id].map(o => [o.code, o]));
    const seen = new Set();
    for (const q of questions) {
      assert.ok(q.outlineCodes.length > 0 && q.outlineCodes.length <= 2, q.id);
      assert.equal(new Set(q.outlineCodes).size, q.outlineCodes.length);
      for (const code of q.outlineCodes) {
        assert.ok(valid.has(code), `${q.id}: ${code}`);
        assert.equal(Number(code.split('.')[0]) + 5, q.chapter, q.id);
        seen.add(code);
      }
    }
    counts[id] = seen.size;
    assert.ok(seen.size < valid.size, 'A targeted batch must not masquerade as full competency coverage');
  }
  assert.deepEqual(counts, {fund1:10, fund2:10, fund3:11});
  assert.equal(Object.values(counts).reduce((a,b) => a+b, 0), 31);
  assert.equal(Object.values(FUND_OUTLINE).reduce((n,o) => n+o.length, 0), 413);
});

// Independent arithmetic, deliberately outside the question construction code.
const solve = {
  liquidation: ([assets, units, allUnits]) => assets / allUnits * units,
  activeShare: ([p, b]) => p.reduce((sum,w,i) => sum + Math.abs(w-b[i]), 0) * 50,
  tailMean: losses => losses.reduce((sum,x) => sum+x, 0) / losses.length,
  brinson: ([w,b,rp,rb]) => w.reduce((sum,x,i) => sum+x*rp[i]-b[i]*rb[i],0)*100,
  shortfall: ([desired,filled,decision,execution,close,fees]) => {
    const paperGain = desired*(close-decision);
    const actualGain = filled*(close-execution)-fees;
    return paperGain-actualGain;
  },
  swapNet: ([notional,fixed,floating,period]) => notional*floating*period-notional*fixed*period,
  conversionPremium: ([face,strike,spot,price]) => (price/(face/strike*spot)-1)*100,
  durationConvexity: ([duration,convexity,yieldMove]) => (-duration*yieldMove+convexity*yieldMove*yieldMove/2)*100,
  secondaryCash: ([price,uncalled]) => price+uncalled,
  ventureDilution: ([investment,multiple,exitValue,retention]) => investment*multiple/(exitValue*retention)*100,
  ratchetIncrement: ([investment,oldPrice,newPrice]) => investment/newPrice-investment/oldPrice,
  fcffEquity: ([cashFlow,wacc,debt,cash]) => cashFlow/wacc+cash-debt,
  wholeFundCarry: ([capital,returned,newCash,rate]) => Math.max(0,newCash-Math.max(0,capital-returned))*rate,
  capitalAccount: ([opening,contribution,profit,loss,fee,distribution]) => opening+contribution+profit-loss-fee-distribution,
};
test('all 14 numerical cases are recomputed and agree with the chosen displayed option', () => {
  const numerical = all.filter(q => q.coverageCalculation);
  assert.equal(numerical.length, 14);
  assert.equal(new Set(numerical.map(q => q.coverageCalculation.kind)).size, 14);
  for (const q of numerical) {
    const c = q.coverageCalculation;
    assert.equal(typeof solve[c.kind], 'function', q.id);
    const actual = solve[c.kind](c.inputs);
    assert.ok(Math.abs(actual-c.expected) < 1e-9, `${q.id}: ${actual}`);
    const text = q.options[q.answer].replaceAll('−','-');
    const value = Number(text.match(/-?\d+(?:\.\d+)?/)[0]);
    assert.ok(Math.abs(value-actual) < .005001, `${q.id}: ${text}`);
    assert.ok(text.includes(c.unit), q.id);
  }
});

test('fixed-case checks protect the displayed business assumptions, signs and independent results', () => {
  // Values below were computed directly from the displayed scenarios, not copied
  // from coverageCalculation.inputs. Keep this separate from metadata-based checks.
  const checks = [
    ['fund1-coverage-008', 900*(60/600), ['900万元','600万份','60万份']],
    ['fund2-coverage-001', (10+20+30)/2, ['50%/20%/30%','60%/40%/0%']],
    ['fund2-coverage-002', (8+9+10+13+20)/5, ['100个','最差5%']],
    ['fund2-coverage-003', (60*.2+40*0)-(40*.15+60*.05), ['60%/40%','40%/60%','20%/0%','15%/5%']],
    ['fund2-coverage-004', 600*.1+400*.3+6, ['1000股','600股','10.10元','10.30元']],
    ['fund2-coverage-005', 100-75, ['5000万元','3%','4%','0.5年','不交换本金']],
    ['fund2-coverage-007', (104/80-1)*100, ['100元','10元/股','8元','104元']],
    ['fund2-coverage-010', -5+.15, ['修正久期为5','凸性为30','1个百分点']],
    ['fund3-coverage-003', 800+300, ['800万元','300万元','不折现']],
    ['fund3-coverage-004', (4000/20000)/.8*100, ['1000万元','4倍','2亿元','80%']],
    ['fund3-coverage-005', 125-100, ['1000万元','10元/股','8元/股']],
    ['fund3-coverage-006', 12000-3000+500, ['1200万元','10%','3000万元','500万元']],
    ['fund3-coverage-009', Math.max(0,300+600-1000)*.2, ['1000万元','300万元','600万元','整体分配']],
    ['fund3-coverage-010', 500+100+80-30-10-120, ['500万元','100万元','80万元','30万元','10万元','120万元']],
  ];
  for (const [id, expected, premises] of checks) {
    const q = byId(id);
    assert.ok(Math.abs(expected-q.coverageCalculation.expected)<1e-9, id);
    for (const premise of premises) assert.ok(q.stem.includes(premise), `${id}: ${premise}`);
  }
  const brinson = byId('fund2-coverage-003');
  const breakdown = brinson.options[brinson.answer].replaceAll('−','-').match(/-?\d+(?:\.\d+)?/g).map(Number);
  assert.deepEqual(breakdown, [3, 2, -1, 2]);
  assert.equal(breakdown[1]+breakdown[2]+breakdown[3], breakdown[0]);
  const esg = byId('fund2-coverage-008');
  assert.equal(90*.8+30*.2, 78);
  assert.equal(90*.2+30*.8, 42);
  assert.match(esg.options[esg.answer], /甲78分、乙42分/);
});

test('boundary cases retain the specific law, context and model caveats', () => {
  const chosen = id => {const q=byId(id);return q.options[q.answer];};
  assert.match(chosen('fund1-coverage-003'), /会计师事务所审计.*公告.*备案/);
  assert.match(chosen('fund1-coverage-005'), /至少.*50%/);
  assert.match(chosen('fund1-coverage-009'), /超过50%/);
  assert.match(chosen('fund1-coverage-010'), /业务关系结束后至少保存十年/);
  assert.match(byId('fund3-coverage-008').stem, /已符合其他适用规则允许的不托管条件/);
  assert.match(byId('fund2-coverage-009').explanation, /不对某一具体业绩报告的准确性提供保证/);
  assert.match(byId('fund3-coverage-006').stem, /不参与上述经营现金流的富余现金/);
  assert.match(byId('fund3-coverage-009').stem, /无门槛收益、无追赶/);
});
