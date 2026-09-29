import { test } from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS } from '../src/questions.js';

// Independent content audit: production serves static rows; this computes their answers
// from recorded inputs, using cashflows rather than trusting the stored answer index.
const terminal = (type, spot, strike) => Math.max(type === 'call' ? spot - strike : strike - spot, 0);
function recalculate({kind, args}) {
  const a = args.map(v => v === 'call' || v === 'put' ? v : Number(v));
  switch (kind) {
    case 'premium': case 'notional': case 'tick_value': return a[0]*a[1]*a[2];
    case 'intrinsic': return terminal(...a);
    case 'time_value': return a[3]-terminal(a[0],a[1],a[2]);
    case 'adjust_strike': return a[0]*a[1]/a[2];
    case 'round_trip': return a[0]*a[2]*a[3]-a[1]*a[2]*a[3];
    case 'long_position': return a[0]+a[1]-a[2];
    case 'percentage_points': return a[1]-a[0];
    case 'purchase_cost': return a[0]*a[1]*a[2]+a[3]*a[2];
    case 'covered_payoff': {
      const [cost,strike,premium,spot,unit,n] = a;
      return ((spot-cost)+premium-terminal('call',spot,strike))*unit*n;
    }
    case 'protective_payoff': {
      const [cost,strike,premium,spot,unit,n] = a;
      return ((spot-cost)-premium+terminal('put',spot,strike))*unit*n;
    }
    case 'covered_count': case 'margin_capacity': return Math.floor(a[0]/a[1]);
    case 'covered_breakeven': return a[0]-a[2];
    case 'protective_floor': return a[0]*a[2]*a[3];
    case 'covered_max_profit': return (a[1]-a[0]+a[2])*a[3]*a[4];
    case 'protective_max_loss': return (a[0]+a[2]-a[1])*a[3]*a[4];
    case 'partial_hedge': {
      const [cost,strike,premium,spot,shares,unit,n] = a;
      const stock = (spot-cost)*shares;
      return stock+terminal('put',spot,strike)*unit*n-premium*unit*n;
    }
    case 'rolling_cash': return (a[0]-a[1]+a[2])*a[3]*a[4];
    case 'protective_delta': return a[0]+a[1]*a[2]*a[3];
    case 'long_payoff': return (terminal(a[0],a[3],a[1])-a[2])*a[4]*a[5];
    case 'short_payoff': return (a[2]-terminal(a[0],a[3],a[1]))*a[4]*a[5];
    case 'long_breakeven': return a[1]+(a[0]==='call'?1:-1)*(a[2]+a[3]/a[4]);
    case 'short_breakeven': return a[1]+(a[0]==='call'?1:-1)*(a[2]-a[3]/a[4]);
    case 'long_close': return (a[1]-a[0])*a[2]*a[3]-a[4];
    case 'short_close': return (a[0]-a[1])*a[2]*a[3]-a[4];
    case 'delta_cash': case 'theta_cash': return a[0]*a[1]*a[2]*a[3];
    case 'new_delta': return a[0]+a[1]*a[2];
    case 'vega_cash': case 'rho_cash': return a[0]*(a[2]-a[1])*a[3]*a[4];
    case 'long_straddle': {
      const [strike,callCost,putCost,spot,unit,n] = a;
      return (terminal('call',spot,strike)+terminal('put',spot,strike)-callCost-putCost)*unit*n;
    }
    case 'exercise_cash': return a[0]*a[1]*a[2];
    case 'long_max_loss': return a[0]*a[1]*a[2]+a[3];
    case 'leverage': return a[0]*a[1]/a[2];
    case 'long_put_max_profit': return (a[0]-a[1])*a[2]*a[3];
    case 'call_margin': {
      const [p,s,k,u] = a;
      const riskPart = .12*s-(k>s?k-s:0);
      return (p+(riskPart>.07*s?riskPart:.07*s))*u;
    }
    case 'put_margin': {
      const [p,s,k,u] = a;
      const riskPart = .12*s-(s>k?s-k:0);
      const perUnit = p+(riskPart>.07*k?riskPart:.07*k);
      return (perUnit<k?perUnit:k)*u;
    }
    case 'margin_gap': return Math.max(a[1]-a[0],0);
    case 'credit_spread': {
      const [t,low,high,credit,spot,u] = a;
      const sold = t==='call'?low:high;
      const bought = t==='call'?high:low;
      return (credit-terminal(t,spot,sold)+terminal(t,spot,bought))*u;
    }
    case 'assigned_cash': return a[0]*a[2]*a[3];
    case 'short_delta': return -a[0]*a[1]*a[2];
    case 'sequence_pnl': return a[0]*a[1]-a[2]*a[3];
    case 'frozen_gap': return Math.max(a[1]-(a[0]-a[2]),0);
    default: throw new Error(`Unreviewed calculation family: ${kind}`);
  }
}

test('all 150 added calculation answers independently recompute and have one correct option', () => {
  const cases = QUESTIONS.filter(q => q.calculation);
  assert.equal(cases.length, 150);
  assert.equal(new Set(cases.map(q => q.calculation.kind)).size, 45);
  assert.deepEqual([1,2,3,4].map(c => cases.filter(q => q.chapter===c).length), [40,30,40,40]);
  for (const q of cases) {
    const expected = recalculate(q.calculation);
    assert.ok(Number.isFinite(expected), q.id);
    const parsed = q.options.map(option => Number.parseFloat(option));
    assert.ok(parsed.every(Number.isFinite), q.id);
    const matches = parsed.flatMap((n,i) => Math.abs(n-expected)<.00001?[i]:[]);
    assert.deepEqual(matches, [q.answer], `${q.id} ${q.calculation.kind}: expected ${expected}, got ${q.options[q.answer]}`);
    assert.equal(new Set(parsed).size, 4, q.id);
    assert.ok(q.options.every(option => !option.includes('NaN') && !option.includes('Infinity')), q.id);
  }
});

test('expiry cases include profit, loss and break-even, not just changed numbers', () => {
  for (const kind of ['long_payoff','short_payoff']) {
    for (const type of ['call','put']) {
      const values = QUESTIONS.filter(q => q.calculation?.kind===kind && q.calculation.args[0]===type).map(q => recalculate(q.calculation));
      assert.ok(values.some(v=>v>1e-6) && values.some(v=>v< -1e-6) && values.some(v=>Math.abs(v)<1e-6), `${kind}/${type}`);
    }
  }
});
