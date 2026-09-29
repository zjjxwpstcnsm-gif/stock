import test from 'node:test';
import assert from 'node:assert/strict';
import { blackScholes, expiryProfit, strategyProfit } from '../src/course-math.js';
import { LESSONS, COURSE_SOURCES } from '../src/course-data.js';
import { SOURCES, CHAPTERS } from '../src/config.js';

const near = (actual, expected, tolerance = 1e-6) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} differs from ${expected}`);
test('European model matches benchmark and put-call parity; expiry has no time value', () => {
  const args = { spot: 100, strike: 100, days: 365, volatility: .2, rate: .05 };
  const call = blackScholes(args), put = blackScholes({ ...args, type: 'put' });
  near(call.price, 10.45058357, .0001);
  near(put.price, 5.57352602, .0001);
  near(call.price - put.price, 100 - 100 * Math.exp(-.05));
  near(blackScholes({ ...args, spot: 110, days: 0 }).price, 10);
  near(blackScholes({ ...args, type: 'put', spot: 110, days: 0 }).price, 0);
  assert.equal(blackScholes({ ...args, days: 0 }).gamma, null);
  assert.throws(() => blackScholes({ days: -1 }), RangeError);
});
test('Greeks independently match repricing: per share, elapsed day and percentage point units', () => {
  for (const type of ['call', 'put']) {
    const a = { type, spot: 3.05, strike: 3, days: 60, volatility: .3, rate: .02 };
    const g = blackScholes(a), h = .001;
    const up = blackScholes({ ...a, spot: a.spot + h }).price, down = blackScholes({ ...a, spot: a.spot - h }).price;
    near(g.delta, (up - down) / (2 * h), .00003);
    near(g.gamma, (up + down - 2 * g.price) / h ** 2, .0002);
    near(g.theta, (blackScholes({ ...a, days: a.days - h }).price - blackScholes({ ...a, days: a.days + h }).price) / (2 * h), .000001);
    near(g.vega, (blackScholes({ ...a, volatility: a.volatility + h }).price - blackScholes({ ...a, volatility: a.volatility - h }).price) / (2 * h) / 100, .000001);
    near(g.rho, (blackScholes({ ...a, rate: a.rate + h }).price - blackScholes({ ...a, rate: a.rate - h }).price) / (2 * h) / 100, .000001);
  }
});
test('all exposed model input extremes remain finite and have valid ordinary option signs', () => {
  for (const type of ['call', 'put']) for (const spot of [2, 3, 4]) for (const days of [1, 30, 180]) for (const volatility of [.1, .8]) for (const rate of [0, .08]) {
    const g = blackScholes({ type, spot, days, volatility, rate });
    assert.ok(Object.values(g).every(Number.isFinite));
    assert.ok(g.price >= 0 && g.gamma >= 0 && g.vega >= 0);
    assert.ok(type === 'call' ? g.delta >= 0 && g.delta <= 1 && g.rho >= 0 : g.delta >= -1 && g.delta <= 0 && g.rho <= 0);
  }
});
test('illustrated four-position and strategy profits agree with independent cashflows and limits', () => {
  near(expiryProfit('call', 'long', 3.2, 3, .12), 800);
  near(expiryProfit('call', 'short', 3.2, 3, .12), -800);
  near(expiryProfit('put', 'long', 2.8, 3, .12), 800);
  near(expiryProfit('put', 'short', 0, 3, .12), -28800);
  near(strategyProfit('covered', 3.6), 3000);
  near(strategyProfit('covered', 0), -29000);
  near(strategyProfit('protective', 1.5), -2800);
  near(strategyProfit('protective', 3.6), 5200);
  near(strategyProfit('bull', 0), -900);
  near(strategyProfit('bull', 9), 2100);
  near(strategyProfit('bull', 3.09), 0);
  near(strategyProfit('straddle', 3.1), -1400);
  near(strategyProfit('straddle', 2.76), 0);
  near(strategyProfit('straddle', 3.24), 0);
  near(strategyProfit('collar', 0), -1800);
  near(strategyProfit('collar', 9), 2200);
  near(strategyProfit('collar', 2.98), 0);
});
test('all chapters have unique links, valid practice destinations and resolvable references', () => {
  assert.equal(LESSONS.length, 12);
  assert.equal(new Set(LESSONS.map(l => l.id)).size, LESSONS.length);
  const sources = { ...SOURCES, ...COURSE_SOURCES };
  for (const lesson of LESSONS) {
    assert.ok(/^[a-z-]+$/.test(lesson.id));
    assert.ok(lesson.practice === 0 || CHAPTERS[lesson.practice]);
    assert.ok(lesson.check.answer >= 0 && lesson.check.answer < lesson.check.options.length);
    assert.ok(lesson.sources.length);
    for (const source of lesson.sources) assert.ok(sources[source]?.url.startsWith('https://'), `${lesson.id}: ${source}`);
  }
});
