import { blackScholes, intrinsic, expiryProfit, strategyProfit } from './course-math.js';

const fmt = (n, digits = 2) => (Math.abs(n) < .5 * 10 ** -digits ? 0 : n).toLocaleString('zh-CN', { minimumFractionDigits: digits, maximumFractionDigits: digits });
const signed = (n, digits = 2) => `${n >= .5 * 10 ** -digits ? '+' : ''}${fmt(n, digits)}`;
const sample = (min, max, fn) => Array.from({ length: 121 }, (_, i) => { const x = min + (max - min) * i / 120; return [x, fn(x)]; });
const chartColors = ['#245fe0', '#be6518', '#16705b'];
const state = {
  payoff: { position: 'long-call', spot: 3.2, premium: .12 },
  decay: { elapsed: 60 },
  pricing: { type: 'call', spot: 3, days: 30, volatility: 25, rate: 2 },
  delta: { type: 'call', metric: 'delta', days: 30, spot: 3 },
  greeks: { type: 'call', metric: 'theta', days: 30, volatility: 25, rate: 2 },
  protection: { strategy: 'covered', spot: 3.3 },
  strategy: { strategy: 'bull', spot: 3.3 },
};
function chart({ id, title, desc, series, xLabel, yLabel, xTicks, marker, yDigits = 2 }) {
  const all = series.flatMap(s => s.points);
  const xs = all.map(p => p[0]), ys = all.map(p => p[1]);
  const xMin = Math.min(...xs), xMax = Math.max(...xs);
  const low = Math.min(0, ...ys), high = Math.max(0, ...ys);
  const pad = Math.max((high - low) * .12, .00001);
  const yMin = low < 0 ? low - pad : 0, yMax = high > 0 ? high + pad : 0;
  const ySpan = yMax - yMin || 1;
  const W = 560, H = 320, L = 70, R = 24, T = 43, B = 53;
  const x = v => L + (v - xMin) / (xMax - xMin) * (W - L - R);
  const y = v => H - B - (v - yMin) / ySpan * (H - T - B);
  const path = points => points.map(([a, b], i) => `${i ? 'L' : 'M'}${x(a).toFixed(2)},${y(b).toFixed(2)}`).join(' ');
  return `<figure class="lesson-chart"><div class="chart-legend">${series.map((s, i) => `<span><i style="background:${chartColors[i]}"></i>${s.name}</span>`).join('')}</div><svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${title}</title><desc id="${id}-desc">${desc}</desc>
    <text x="${L}" y="21" class="axis-title">${yLabel}</text>
    ${Array.from({ length: 5 }, (_, i) => { const v = yMin + ySpan * i / 4; return `<line x1="${L}" y1="${y(v)}" x2="${W - R}" y2="${y(v)}" stroke="#e2e8f1"/><text x="${L - 9}" y="${y(v) + 5}" text-anchor="end">${fmt(v, yDigits)}</text>`; }).join('')}
    <line x1="${L}" y1="${y(0)}" x2="${W - R}" y2="${y(0)}" stroke="#7b8ca5" stroke-dasharray="4 4"/>
    ${(xTicks || [xMin, (xMin + xMax) / 2, xMax]).map(v => `<text x="${x(v)}" y="${H - B + 23}" text-anchor="middle">${fmt(v, Number.isInteger(xMax) && xMax > 6 ? 0 : 2)}</text>`).join('')}
    ${series.map((s, i) => `<path d="${path(s.points)}" fill="none" stroke="${chartColors[i]}" stroke-width="3" stroke-linecap="round"/>`).join('')}
    ${marker ? `<line x1="${x(marker[0])}" y1="${T}" x2="${x(marker[0])}" y2="${H - B}" stroke="#52657f" stroke-dasharray="4 4"/><circle cx="${x(marker[0])}" cy="${y(marker[1])}" r="5" fill="${chartColors[0]}" stroke="white" stroke-width="2"/>` : ''}
    <text x="${W / 2}" y="${H - 5}" text-anchor="middle" class="axis-title">${xLabel}</text></svg><figcaption>${desc}</figcaption></figure>`;
}
const metricNames = { delta: 'Delta', gamma: 'Gamma', theta: 'Theta', vega: 'Vega', rho: 'Rho' };
const metricUnits = { delta: '元 / 份，每 1 元标的变动', gamma: 'Delta 变化 / 元', theta: '元 / 份 / 自然日', vega: '元 / 份 / IV 百分点', rho: '元 / 份 / 利率百分点' };
function range(lab, key, label, min, max, step, unit, digits = 0) {
  return `<label class="lab-range" for="${lab}-${key}"><span>${label}<output for="${lab}-${key}" id="${lab}-${key}-value">${fmt(state[lab][key], digits)}${unit}</output></span><input id="${lab}-${key}" type="range" min="${min}" max="${max}" step="${step}" value="${state[lab][key]}" data-lab-param="${key}" data-digits="${digits}" data-unit="${unit}"><span class="range-bounds"><small>${min}${unit}</small><small>${max}${unit}</small></span></label>`;
}
function select(lab, key, label, entries) {
  return `<label class="lab-select" for="${lab}-${key}">${label}<select id="${lab}-${key}" data-lab-param="${key}">${entries.map(([v, text]) => `<option value="${v}" ${state[lab][key] === v ? 'selected' : ''}>${text}</option>`).join('')}</select></label>`;
}
const typeSelect = lab => select(lab, 'type', '期权类型（多头）', [['call', '买入认购 Call'], ['put', '买入认沽 Put']]);
const stat = (label, value) => `<div><span>${label}</span><strong>${value}</strong></div>`;
const stats = html => `<div class="lab-stats" aria-live="polite">${html}</div>`;
const strategies = {
  covered: { name: '备兑', legs: '现货成本 3.00 + 卖 K=3.20 认购，收 0.10', limits: '最大收益 3,000 元；最大损失 29,000 元；平衡点 2.90。' },
  protective: { name: '保险', legs: '现货成本 3.00 + 买 K=2.80 认沽，付 0.08', limits: '最大损失 2,800 元；上涨收益无理论上限；平衡点 3.08。' },
  bull: { name: '牛市认购价差', legs: '买 K=3.00 认购付 0.14 + 卖 K=3.30 认购收 0.05', limits: '最大收益 2,100 元；最大损失 900 元；平衡点 3.09。' },
  straddle: { name: '买入跨式', legs: '买 K=3.00 认购 + 买 K=3.00 认沽，合计付 0.24', limits: '最大损失 2,400 元；平衡点 2.76 / 3.24；上涨收益无理论上限。' },
  collar: { name: '领口', legs: '现货成本 3.00 + 买 K=2.80 认沽付 0.08 + 卖 K=3.20 认购收 0.10', limits: '最大收益 2,200 元；最大损失 1,800 元；平衡点 2.98。' },
};
export function labView(lab) {
  let controls = '', title = '', subtitle = '';
  if (lab === 'payoff') {
    title = '四种头寸，亲手换一换'; subtitle = 'K = 3.00 元 · M = 10,000 份 / 张 · 无费用';
    controls = select(lab, 'position', '持仓方向', [['long-call', '买入认购'], ['short-call', '卖出认购'], ['long-put', '买入认沽'], ['short-put', '卖出认沽']]) + range(lab, 'spot', '到期标的价', 1.8, 4.2, .01, ' 元', 2) + range(lab, 'premium', '初始权利金 / 份', .02, .50, .01, ' 元', 2);
  } else if (lab === 'decay') {
    title = '平值期权的时间价值衰减'; subtitle = 'S = K = 3.00 · σ = 25% · r = 0 · 无分红欧式认购';
    controls = range(lab, 'elapsed', '已过去的自然日', 0, 90, 1, ' 天');
  } else if (lab === 'pricing') {
    title = '定价实验：一次改变一个输入'; subtitle = 'K = 3.00 · 无分红欧式 Black–Scholes 教学模型';
    controls = typeSelect(lab) + range(lab, 'spot', '当前标的价', 2, 4, .01, ' 元', 2) + range(lab, 'days', '剩余自然日', 1, 180, 1, ' 天') + range(lab, 'volatility', '年化隐含波动率', 10, 80, 1, '%') + range(lab, 'rate', '年化无风险利率', 0, 8, .1, '%', 1);
  } else if (lab === 'delta') {
    title = 'Delta / Gamma 随标的价格怎样变化？'; subtitle = 'K = 3.00 · σ = 25% · r = 2% · 无分红欧式模型';
    controls = typeSelect(lab) + select(lab, 'metric', '观察指标', [['delta', 'Delta · 方向敏感度'], ['gamma', 'Gamma · Delta 的变化']]) + range(lab, 'days', '剩余自然日', 1, 180, 1, ' 天') + range(lab, 'spot', '当前标的价', 2, 4, .01, ' 元', 2);
  } else if (lab === 'greeks') {
    title = 'Theta / Vega / Rho 随剩余时间怎样变化？'; subtitle = 'S = K = 3.00 · 多头指标 · 卖方头寸反号';
    controls = typeSelect(lab) + select(lab, 'metric', '观察指标', [['theta', 'Theta · 时间'], ['vega', 'Vega · 波动率'], ['rho', 'Rho · 利率']]) + range(lab, 'days', '剩余自然日', 1, 180, 1, ' 天') + range(lab, 'volatility', '年化隐含波动率', 10, 80, 1, '%') + range(lab, 'rate', '年化无风险利率', 0, 8, .1, '%', 1);
  } else {
    title = lab === 'protection' ? '把保护和代价画在一起' : '把各条腿加起来，看组合损益';
    subtitle = '每腿 10,000 份 · 同标的、同到期日 · 示例权利金 · 无费用';
    const entries = (lab === 'protection' ? ['covered', 'protective'] : ['bull', 'straddle', 'collar']).map(k => [k, strategies[k].name]);
    controls = select(lab, 'strategy', '选择策略', entries) + range(lab, 'spot', '到期标的价', 1.8, 4.2, .01, ' 元', 2);
  }
  return `<section class="lesson-lab" data-lab="${lab}" aria-label="${title}"><div class="lab-heading"><span class="eyebrow">交互图解 · 拖动滑块观察</span><h2>${title}</h2><p>${subtitle}</p></div><div class="lab-controls">${controls}</div><div class="lab-output">${labOutput(lab)}</div><p class="lab-disclaimer">原创计算图 · 参数为教学假设，非实时行情或交易建议。</p></section>`;
}
function labOutput(lab) {
  const s = state[lab];
  if (lab === 'payoff') {
    const [side, type] = s.position.split('-');
    const fn = spot => expiryProfit(type, side, spot, 3, s.premium);
    const balance = type === 'call' ? 3 + s.premium : 3 - s.premium;
    const profit = fn(s.spot);
    const loss = side === 'long' ? `${fmt(s.premium * 10000, 0)} 元` : type === 'call' ? '理论无上限' : `${fmt((3 - s.premium) * 10000, 0)} 元`;
    return stats(stat('当前到期净损益 / 张', `${signed(profit, 0)} 元`) + stat('到期盈亏平衡点', `${fmt(balance)} 元`) + stat('最大损失 / 张', loss)) + chart({ id: lab, title: '期权到期净损益曲线', desc: '蓝线含初始权利金；虚线为零损益。点表示当前滑块价格；显示区间不是风险上限。', series: [{ name: '到期净损益', points: sample(1.8, 4.2, fn) }], marker: [s.spot, profit], xTicks: [1.8, 2.4, 3, 3.6, 4.2], xLabel: '到期标的价格（元 / 份）', yLabel: '净损益（元 / 张）', yDigits: 0 });
  }
  if (lab === 'decay') {
    const fn = elapsed => blackScholes({ days: 90 - elapsed, rate: 0 }).price;
    const price = fn(s.elapsed);
    return stats(stat('剩余时间', `${90 - s.elapsed} 天`) + stat('时间价值 / 份', `${fmt(price, 4)} 元`) + stat('示例内在价值', '0 元')) + chart({ id: lab, title: '平值认购时间价值衰减曲线', desc: '标的、波动率和利率保持不变。从还剩 90 天到到期，时间价值最终降到零。', series: [{ name: '理论时间价值', points: sample(0, 90, fn) }], marker: [s.elapsed, price], xTicks: [0, 30, 60, 90], xLabel: '已经过的自然日（向右更接近到期）', yLabel: '时间价值（元 / 份）', yDigits: 2 });
  }
  if (lab === 'pricing') {
    const inputs = { ...s, volatility: s.volatility / 100, rate: s.rate / 100 };
    const value = blackScholes(inputs);
    return stats(stat('理论权利金 / 份', `${fmt(value.price, 4)} 元`) + stat('理论权利金 / 张', `${fmt(value.price * 10000)} 元`) + stat('当前 Delta', fmt(value.delta, 4))) + chart({ id: lab, title: '理论期权价格与到期行权价值', desc: '蓝线为当前剩余时间的理论价格；橙线为同一标的价格下的到期行权价值，两条线均未扣初始权利金。', series: [{ name: '到期前理论价格', points: sample(2, 4, spot => blackScholes({ ...inputs, spot }).price) }, { name: '到期行权价值', points: sample(2, 4, spot => intrinsic(s.type, spot, 3)) }], marker: [s.spot, value.price], xTicks: [2, 2.5, 3, 3.5, 4], xLabel: '标的价格（元 / 份）', yLabel: '期权价值（元 / 份）' });
  }
  if (lab === 'delta' || lab === 'greeks') {
    const inputs = { type: s.type, spot: s.spot || 3, days: s.days, volatility: (s.volatility || 25) / 100, rate: (s.rate ?? 2) / 100 };
    const values = blackScholes(inputs);
    const m = s.metric, value = values[m];
    const bySpot = lab === 'delta';
    const fn = n => blackScholes({ ...inputs, [bySpot ? 'spot' : 'days']: n })[m];
    return stats(stat(`当前 ${metricNames[m]} / 份`, signed(value, 5)) + stat('读数单位', metricUnits[m]) + stat(bySpot ? '当前标的价' : '当前剩余时间', bySpot ? `${fmt(s.spot)} 元` : `${s.days} 天`)) + chart({ id: lab, title: `${metricNames[m]} 敏感度曲线`, desc: bySpot ? '同一条曲线保持剩余期限不变。缩短期限后观察近平值区间；这些指标不是获利概率。' : '横轴向右表示剩余时间更多。所有点固定标的、IV 和利率；Theta 为每日，Vega / Rho 为每个百分点。', series: [{ name: `${metricNames[m]}（多头）`, points: sample(bySpot ? 2 : 1, bySpot ? 4 : 180, fn) }], marker: [bySpot ? s.spot : s.days, value], xTicks: bySpot ? [2, 2.5, 3, 3.5, 4] : [1, 60, 120, 180], xLabel: bySpot ? '标的价格（元 / 份）' : '剩余自然日（向左更接近到期）', yLabel: `${metricNames[m]}（单位见读数）`, yDigits: bySpot ? 2 : 4 });
  }
  const strategy = strategies[s.strategy], fn = spot => strategyProfit(s.strategy, spot);
  const series = [{ name: strategy.name, points: sample(1.8, 4.2, fn) }];
  if (lab === 'protection' || s.strategy === 'collar') series.push({ name: '仅持有 ETF', points: sample(1.8, 4.2, spot => strategyProfit('stock', spot)) });
  return `<p class="lab-legs">${strategy.legs}</p>` + stats(stat('当前到期净损益', `${signed(fn(s.spot), 0)} 元`) + stat('到期标的价', `${fmt(s.spot)} 元`)) + chart({ id: lab, title: `${strategy.name}到期净损益`, desc: `${strategy.limits}曲线按相同数量持有至到期计算，显示区间不限制真实价格。`, series, marker: [s.spot, fn(s.spot)], xTicks: [1.8, 2.4, 3, 3.6, 4.2], xLabel: '到期标的价格（元 / 份）', yLabel: '组合净损益（元）', yDigits: 0 });
}
export function handleLabInput(target) {
  const lab = target.closest('[data-lab]')?.dataset.lab;
  const key = target.dataset.labParam;
  if (!lab || !key || !(key in state[lab])) return false;
  state[lab][key] = target.type === 'range' ? Number(target.value) : target.value;
  const label = document.getElementById(`${lab}-${key}-value`);
  if (label) label.textContent = `${fmt(Number(target.value), Number(target.dataset.digits))}${target.dataset.unit}`;
  target.closest('[data-lab]').querySelector('.lab-output').innerHTML = labOutput(lab);
  return true;
}
export function diagramView(kind) {
  if (kind === 'rights') return `<figure class="rights-diagram"><figcaption>把“方向”和“身份”分成两步看</figcaption><div class="rights-grid"><div class="rights-title">认购 Call <small>按约定价买标的</small></div><div class="rights-title">认沽 Put <small>按约定价卖标的</small></div><div><span class="soft-badge">买方 · 付权利金</span><strong>有权买入</strong><p>有利可行权，不利可放弃</p></div><div><span class="soft-badge">买方 · 付权利金</span><strong>有权卖出</strong><p>有利可行权，不利可放弃</p></div><div><span class="soft-badge">卖方 · 收权利金</span><strong>有义务卖出</strong><p>被指派时准备证券</p></div><div><span class="soft-badge">卖方 · 收权利金</span><strong>有义务买入</strong><p>被指派时准备资金</p></div></div></figure>`;
  return `<figure class="lifecycle-diagram"><figcaption>一份权利仓的三条去向</figcaption><div class="lifecycle-start">买入开仓 <span>付权利金，取得权利仓</span></div><div class="lifecycle-branches"><div><b>① 到期前卖出平仓</b><p>收到平仓款<br>结束期权持仓</p></div><div><b>② 按规定申报行权</b><p>准备钱 / 券<br>完成交收，形成现货变化</p></div><div><b>③ 到期未行权</b><p>权利失效<br>原支付权利金不会退回</p></div></div><p>期权可交易时可平仓；沪市 ETF 的行权则受欧式合约与券商申报要求约束。</p></figure>`;
}
