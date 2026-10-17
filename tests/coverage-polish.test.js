import test from 'node:test';
import assert from 'node:assert/strict';
import { SUBJECTS } from '../src/subjects.js';
import { FUND_OUTLINE } from '../src/fund-outline-data.js';
import { coverageIndex, coverageSummary, questionIdsForObjective } from '../src/coverage-views.js';
import { COVERAGE_POLISH_BATCH, COVERAGE_POLISH_QUESTIONS, COVERAGE_POLISH_SOURCES } from '../src/coverage-polish-questions.js';

const all = Object.values(COVERAGE_POLISH_QUESTIONS).flat();
const byId = id => all.find(q => q.id === id);
const chosen = id => { const q = byId(id); return q.options[q.answer]; };
const close = (actual, expected, label) => {
  if (Array.isArray(expected)) {
    assert.equal(actual.length, expected.length, label);
    expected.forEach((x, i) => close(actual[i], x, label));
  } else if (expected && typeof expected === 'object') {
    assert.deepEqual(Object.keys(actual).sort(), Object.keys(expected).sort(), label);
    for (const key of Object.keys(expected)) close(actual[key], expected[key], label);
  } else assert.ok(Math.abs(actual - expected) < 1e-9, `${label}: ${actual} != ${expected}`);
};

test('36 original cases have four substantive reasons, source locations and non-cycling balanced answers', () => {
  assert.equal(all.length, 36);
  assert.equal(new Set(all.map(q => q.id)).size, 36);
  const orders = [];
  for (const [id, questions] of Object.entries(COVERAGE_POLISH_QUESTIONS)) {
    assert.equal(questions.length, 12);
    const subject = SUBJECTS[id];
    const answerCounts = [0, 0, 0, 0];
    for (const [i, q] of questions.entries()) {
      assert.equal(q.id, `${id}-polish-${String(i + 1).padStart(3, '0')}`);
      assert.equal(q.editorialBatch, COVERAGE_POLISH_BATCH);
      assert.equal(q.reviewedAt, '2026-10-17');
      assert.equal(q.sourceKind, 'original');
      assert.match(q.origin, /原创.*非真题/);
      assert.ok(!q.year && !q.sourceQuestion && !q.variantFamily, q.id);
      assert.ok(q.stem.length >= 45, q.id);
      assert.equal(q.options.length, 4, q.id);
      assert.equal(new Set(q.options).size, 4, q.id);
      assert.equal(q.rationales.length, 4, q.id);
      assert.equal(new Set(q.rationales).size, 4, q.id);
      assert.ok(q.rationales.every(reason => reason.length >= 25), q.id);
      assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4, q.id);
      answerCounts[q.answer]++;
      assert.equal(q.explanation, q.rationales[q.answer], q.id);
      assert.ok(subject.CHAPTERS[q.chapter], q.id);
      assert.ok(subject.LESSONS.some(lesson => lesson.id === q.lessonId && lesson.practice === q.chapter), q.id);
      const source = subject.SOURCES[q.source];
      assert.ok(source?.title && source.note, `${q.id}: visible primary source`);
      assert.ok(['official', 'reference'].includes(source.kind), q.id);
      assert.equal(new URL(source.url).protocol, 'https:', q.id);
      assert.ok(q.referenceSection.length >= 15 && q.reviewNote.length >= 30, q.id);
      assert.ok(!q.referenceSource, 'Professional provenance must be visible through q.source');
    }
    assert.deepEqual(answerCounts, [3, 3, 3, 3]);
    const order = questions.map(q => q.answer).join('');
    assert.notEqual(order.slice(0, 4).repeat(3), order, 'No repeating four-answer cycle');
    orders.push(order);
  }
  assert.equal(new Set(orders).size, 3, 'Each subject has its own answer order');
  for (const source of Object.values(COVERAGE_POLISH_SOURCES)) {
    assert.ok(source.title && source.note.length > 25);
    assert.equal(new URL(source.url).protocol, 'https:');
  }
});

test('each new case directly fills one previously unmapped real objective and preserves existing order', () => {
  const expected = { fund1:[62, 74, 108], fund2:[92, 104, 153], fund3:[85, 97, 152] };
  let newMappings = 0;
  for (const [id, questions] of Object.entries(COVERAGE_POLISH_QUESTIONS)) {
    const subject = SUBJECTS[id];
    const oldQuestions = subject.QUESTIONS.filter(q => q.editorialBatch !== COVERAGE_POLISH_BATCH);
    const codes = new Set(FUND_OUTLINE[id].map(item => item.code));
    const previousCodes = new Set(oldQuestions.flatMap(q => q.outlineCodes || []));
    const newCodes = new Set();
    for (const q of questions) {
      assert.equal(q.outlineCodes.length, 1, q.id);
      const [code] = q.outlineCodes;
      assert.ok(codes.has(code), `${q.id}: exact official code`);
      assert.ok(!previousCodes.has(code), `${q.id}: previously unmapped`);
      assert.equal(q.chapter, Number(code.split('.')[0]) + 5, q.id);
      assert.equal(q.scope, code.slice(0, code.lastIndexOf('.')), q.id);
      assert.deepEqual(questionIdsForObjective(subject, code), [q.id]);
      newCodes.add(code);
    }
    assert.equal(newCodes.size, 12);
    newMappings += newCodes.size;
    assert.deepEqual(subject.QUESTIONS.slice(0, -12), oldQuestions, 'Append without reordering prior IDs');
    assert.deepEqual(subject.QUESTIONS.slice(-12), questions);
    const before = coverageSummary(coverageIndex({ ...subject, QUESTIONS:oldQuestions }));
    const after = coverageSummary(coverageIndex(subject));
    assert.deepEqual([before.mapped, after.mapped, after.total], expected[id]);
    assert.equal(after.questions - before.questions, 12);
    assert.ok(after.gaps > 0, 'A partial batch must not imply full syllabus coverage');
  }
  assert.equal(newMappings, 36);
});

// This guard catches copied stems and simple numeric substitutions, not semantic
// equivalence. The accompanying editorial table records the separate task review.
const normalStem = text => text.normalize('NFKC').toLowerCase()
  .replace(/[\d零〇一二两三四五六七八九十百千万亿]+(?:\.[\d]+)?/g, '#')
  .replace(/[\p{P}\p{S}\s]/gu, '');
test('new stems and numeric-normalized stems do not duplicate the complete pre-existing bank', () => {
  const old = Object.values(SUBJECTS).flatMap(s => s.QUESTIONS).filter(q => q.editorialBatch !== COVERAGE_POLISH_BATCH);
  assert.equal(new Set(all.map(q => normalStem(q.stem))).size, 36);
  const known = new Map(old.map(q => [normalStem(q.stem), q.id]));
  const allIds = Object.values(SUBJECTS).flatMap(s => s.QUESTIONS.map(q => q.id));
  assert.equal(new Set(allIds).size, allIds.length);
  for (const q of all) assert.ok(!known.has(normalStem(q.stem)), `${q.id} repeats ${known.get(normalStem(q.stem))}`);
});

const npv = (cash, rate) => cash.reduce((sum, flow, t) => sum + flow / ((1 + rate) ** t), 0);
function positiveIrr(cash) {
  let low = 0, high = 1;
  for (let i = 0; i < 100; i++) {
    const middle = (low + high) / 2;
    if (npv(cash, middle) > 0) low = middle;
    else high = middle;
  }
  return (low + high) / 2;
}
const solve = {
  overlap: ([weights, exposure]) => weights.reduce((sum, w, i) => sum + w * exposure[i], 0),
  forwardReplication: ([capital, one, two]) => (capital * (1 + two) ** 2) / (capital * (1 + one)) - 1,
  buybackEps: ([profit, shares, repurchase, price]) => [profit / shares, profit / (shares - repurchase), repurchase * price],
  discountCashFlows: ([cash, discount]) => cash.reduce((sum, flow, i) => sum + flow * discount[i], 0),
  couponTerminalWealth: ([price, cash, reinvest]) => [positiveIrr([-price, ...cash]), Math.sqrt((cash[0] * (1 + reinvest) + cash[1]) / price) - 1],
  parityArbitrage: p => p.call + p.pvStrike - p.spot - p.put,
  shortNetReturn: ([shares, sell, cover, dividend, cost, margin]) => {
    const profit = shares * (sell - cover - dividend) - cost;
    return [profit, profit / margin];
  },
  riskAdjustedRanks: ({ riskFree, a, b }) => [(a[0] - riskFree) / a[1], (b[0] - riskFree) / b[1], (a[0] - riskFree) / a[2], (b[0] - riskFree) / b[2]],
  layeredCarry: ([profit, first, second]) => { const afterFirst = profit - profit * first; return afterFirst - afterFirst * second; },
  primarySecondaryEquity: ([shares, price, newCapital, oldShares, oldPrice]) => [(newCapital / price + oldShares) / (shares + newCapital / price), newCapital, oldPrice],
  interimIrr: cash => positiveIrr(cash),
  dpiPrincipalIncluded: ([paid, capital, gains]) => (capital + gains) / paid,
  netResidualMultiples: ([, paid, distributed, assets, debt]) => [(assets - debt) / paid, (distributed + assets - debt) / paid],
  exitCashLedger: ([transfer, project]) => ({ fund:project, newLp:-transfer, oldLp:transfer, projectBuyer:-project }),
};

test('all 14 numerical models are independently recomputed, including interim-flow IRR', () => {
  const numerical = all.filter(q => q.polishCalculation);
  assert.equal(numerical.length, 14);
  assert.equal(new Set(numerical.map(q => q.polishCalculation.kind)).size, 14);
  for (const q of numerical) {
    const c = q.polishCalculation;
    assert.equal(typeof solve[c.kind], 'function', q.id);
    close(solve[c.kind](c.inputs), c.expected, q.id);
  }
});

test('fixed premises and displayed answers agree with a separate review of the original numbers', () => {
  const checks = [
    ['fund1-polish-004', .08, ['均分','8%','无需考虑杠杆'], /仍是8%/],
    ['fund2-polish-001', 110.25 / 104 - 1, ['4%','5%','104元','110.25元'], /净付104元.*净收110.25元.*6.01%/],
    ['fund2-polish-002', [10, 12.5, 2000], ['100万股','1000万元','20万股','利润不变'], /10元.*12.5元.*2000万元/],
    ['fund2-polish-003', 5 * .96 + 105 * .90, ['0.96','0.90','100元','票息5元'], /99.30元/],
    ['fund2-polish-004', [.1, Math.sqrt(120 / 100) - 1], ['100元','不计息账户','120元'], /仍为10%.*9.54%/],
    ['fund2-polish-005', 8 + 95 - 100 - 2, ['无分红','欧式','无费用','95元'], /卖出看涨.*借入95元.*买入股票和看跌/],
    ['fund2-polish-008', [500 * 2 - 500 - 100, .08], ['500股','5000元','100元借券费','每股1元'], /400元，8%/],
    ['fund2-polish-010', [.4, .7, .16, .07], ['收益10%','收益9%','Beta为0.5','无风险收益率2%'], /乙的Sharpe较高.*甲的Treynor较高/],
    ['fund3-polish-001', 20 - 4 - 3.2, ['利润为20万元','先取','再取','20%'], /12.80万元/],
    ['fund3-polish-005', [350 / 1250, 2000, 800], ['1000万股','每股8元','增资2000万元','100万股老股'], /28%.*2000万元/],
    ['fund3-polish-009', .1, ['实付100万元','一年实际收回30万元','两年再实际收回88万元'], /10%.*30\/1.10.*88\/1.10²/],
    ['fund3-polish-010', (45 + 15) / 100, ['实缴100万元','45万元','15万元'], /0.60倍/],
    ['fund3-polish-011', [70 / 120, 100 / 120], ['认缴200万元','实缴120万元','分配30万元','90万元','负债20万元'], /RVPI 0.5833倍，TVPI 0.8333倍/],
    ['fund3-polish-012', { fund:120, newLp:-80, oldLp:80, projectBuyer:-120 }, ['直接支付80万元','向基金支付120万元','尚未向LP分配'], /基金净流入120万元.*80万元是投资者转让收入/],
  ];
  for (const [id, result, premises, display] of checks) {
    const q = byId(id);
    close(result, q.polishCalculation.expected, id);
    for (const premise of premises) assert.ok(q.stem.includes(premise), `${id}: ${premise}`);
    assert.match(chosen(id), display, id);
  }
  close(npv([-100, 30, 88], .1), 0, 'IRR uses the actual interim payment');
  assert.ok(Math.abs(npv([-100, 30, 88], Math.sqrt(1.18) - 1)) > .1);
  for (const spot of [0, 1, 99, 100, 101, 175, 1000]) {
    close(spot + Math.max(100 - spot, 0) - Math.max(spot - 100, 0) - 100, 0, `parity terminal ${spot}`);
  }
});

test('regulatory and interpretation cases retain their specific scope and conditional boundaries', () => {
  assert.match(byId('fund1-polish-005').stem, /公募净值型基金/);
  assert.equal(byId('fund1-polish-005').source, 'polishBenchmark');
  assert.match(byId('fund1-polish-008').referenceSection, /第十条第三项/);
  assert.match(byId('fund1-polish-009').referenceSection, /第二款第二项/);
  assert.match(byId('fund1-polish-011').explanation, /应根据情况简化/);
  assert.match(byId('fund2-polish-011').stem, /相同特征的同一债券/);
  assert.equal(byId('fund2-polish-011').source, 'polishValuation');
  assert.match(byId('fund2-polish-012').explanation, /权利归属/);
  assert.match(byId('fund3-polish-004').stem, /这些约定有效/);
  assert.match(byId('fund3-polish-006').stem, /仍保留其余30%/);
  assert.match(byId('fund3-polish-008').referenceSection, /不采用征求意见稿/);
});
