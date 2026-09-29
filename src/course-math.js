// Educational models only. Prices are per underlying unit; no fees or dividends.
export const intrinsic = (type, spot, strike) => Math.max(type === 'call' ? spot - strike : strike - spot, 0);
export function expiryProfit(type, side, spot, strike, premium, units = 10000) {
  return (intrinsic(type, spot, strike) - premium) * (side === 'long' ? 1 : -1) * units;
}
export function strategyProfit(strategy, spot, units = 10000) {
  // All legs share an underlying, expiry and unit. Fixed illustrative premiums.
  const call = k => intrinsic('call', spot, k);
  const put = k => intrinsic('put', spot, k);
  const values = {
    stock: spot - 3,
    covered: spot - 3 + .10 - call(3.2),
    protective: spot - 3 + put(2.8) - .08,
    bull: call(3) - call(3.3) - .09,
    straddle: call(3) + put(3) - .24,
    collar: spot - 3 + put(2.8) - .08 - call(3.2) + .10,
  };
  if (!(strategy in values)) throw new RangeError('Unknown strategy');
  return values[strategy] * units;
}
const density = x => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
export function normalCDF(x) {
  // Integral series: Phi(x) = 1/2 + phi(x) * (x + x^3/3 + x^5/15 + ...).
  // Positive terms avoid internal cancellation; |x| >= 8 is a negligible tail.
  if (x <= -8) return 0;
  if (x >= 8) return 1;
  let term = x, sum = x;
  for (let odd = 3; odd < 401; odd += 2) {
    term *= x * x / odd;
    sum += term;
    if (Math.abs(term) <= Math.abs(sum) * Number.EPSILON) break;
  }
  return Math.min(1, Math.max(0, .5 + density(x) * sum));
}
export function blackScholes({ type = 'call', spot = 3, strike = 3, days = 30, volatility = .25, rate = .02 } = {}) {
  if (!['call', 'put'].includes(type) || ![spot, strike, days, volatility, rate].every(Number.isFinite) || spot <= 0 || strike <= 0 || days < 0 || volatility <= 0) throw new RangeError('Invalid pricing input');
  if (days === 0) return { price: intrinsic(type, spot, strike), delta: null, gamma: null, theta: null, vega: null, rho: null };
  const t = days / 365, root = Math.sqrt(t), discount = Math.exp(-rate * t);
  const d1 = (Math.log(spot / strike) + (rate + volatility * volatility / 2) * t) / (volatility * root);
  const d2 = d1 - volatility * root;
  const call = type === 'call';
  const price = call ? spot * normalCDF(d1) - strike * discount * normalCDF(d2) : strike * discount * normalCDF(-d2) - spot * normalCDF(-d1);
  const thetaCommon = -spot * density(d1) * volatility / (2 * root);
  return {
    price: Math.max(0, price),
    delta: call ? normalCDF(d1) : normalCDF(d1) - 1,
    gamma: density(d1) / (spot * volatility * root),
    // Per calendar day elapsed; vega/rho per one percentage point (not 1%).
    theta: (thetaCommon + (call ? -rate * strike * discount * normalCDF(d2) : rate * strike * discount * normalCDF(-d2))) / 365,
    vega: spot * density(d1) * root / 100,
    rho: (call ? strike * t * discount * normalCDF(d2) : -strike * t * discount * normalCDF(-d2)) / 100,
  };
}
