// Model derivations are editorial teaching material, not quotations from laws.
// Kept separate from the answer generators so existing option positions remain stable.
export const CALCULATION_SOURCES = {
 calculationAudit: {title:'知权 · 计算训练公式、单位与复算说明',url:'https://github.com/zjjxwpstcnsm-gif/stock/blob/main/docs/calculation-audit.md',kind:'editorial',note:'按题干明示假设编写的数学推导；不是法规条文、官方试题或统一业务参数。'},
};
const n = value => String(Math.round(value * 1000000) / 1000000);
export function calculationWalkthrough(family, v, result, unit) {
 const formulas = {
  'delta-position': () => `每张对应${n(v.d)}×10000份Delta等价敞口；${v.n}张乘标的变动0.02元：${n(v.d)}×10000×${v.n}×0.02`,
  'gamma-adjust': () => `先算Delta增量0.20×${n(v.move)}，再加初始Delta：0.40＋0.20×${n(v.move)}`,
  'vega-position': () => `波动率从20%到22%是2个百分点：100×2×${v.n}`,
  'theta-position': () => `每张每天减少20元，累计${v.n}张、3日：−20×3×${v.n}`,
  'rho-position': () => `每张每利率百分点30元，升0.5个百分点：30×0.5×${v.n}`,
  'put-insurance': () => `标的跌破行权价时，现货与认沽合计到期价值锁定为3.80元；成本4.00＋${n(v.premium)}，最大损失：4.00＋${n(v.premium)}−3.80`,
  'covered-upside': () => `到期现货与认购空头的合计收入上限为3.80元；扣现货成本、加已收权利金：3.80−3.50＋${n(v.premium)}`,
  'credit-spread': () => `两腿同时实值时履约价差损失最多0.50元，减去净收入：0.50−${n(v.credit)}`,
  'net-assets': () => `先从总资产扣除全部负债：${v.assets}−${v.debt}`,
  'fee-rate': () => `年费率0.60%换为0.006，按题设365天平均：${v.base}×0.006÷365`,
  'subscription-units': () => `外扣费用先除以1.01，净申购额${n(v.amount/1.01)}元，再除每份净值：${v.amount}÷1.01÷1.25`,
  'redemption-net': () => `赎回总额${n(v.shares*1.2)}元，扣其中0.50%的费用：${v.shares}×1.20×(1−0.005)`,
  'cash-distribution': () => `持有份额乘每份分红，基金净值一般需相应除息：${v.shares}×0.08`,
  'expense-impact': () => `计提后净资产${v.nav-2}万元，再除1000万份；分子分母的“万”抵消：(${v.nav}−2)÷1000`,
  'reinvest-shares': () => `先算可再投资现金${n(v.shares*.05)}元，再除再投资净值：${v.shares}×0.05÷1.25`,
  'holding-return': () => `价格变化${n(v.change)}元与现金分红0.03元合计后除初始净值，并转成百分比：(${n(v.change)}＋0.03)÷1.50×100%`,
  postmoney: () => `本题500万元是新发股权融资，全部进入公司：${v.pre}＋500`,
  stake: () => `新投资额除投后估值，转换成百分比：500÷(${v.pre}＋500)×100%`,
  'enterprise-bridge': () => `从企业价值过渡到股权价值，增加非经营现金、扣有息债务：${v.ev}＋100−300`,
  dpi: () => `仅用累计已分配价值与实缴资本比较：${v.distributed}÷2000`,
  rvpi: () => `剩余净资产价值与实缴资本比较：${v.residual}÷2000`,
  tvpi: () => `累计分配600万元与剩余价值相加，除同口径实缴：(${v.residual}＋600)÷2000`,
  'cash-waterfall': () => `返还2000万元本金后剩余利润为${v.profit}万元，按合同假设分20%：${v.profit}×0.20`,
  'cash-call': () => `认缴额扣已实缴额，不把未缴承诺当成可投资现金：3000−${v.paid}`,
  discount: () => `一年后的现金除以一年增长因子；折现而不是再计息：${v.cash}÷1.05`,
  duration: () => `收益率升0.2个百分点即0.002，价格变化比例取负，再转百分数：−${v.duration}×0.002×100%`,
  'nominal-value': () => `每吨价格乘每手吨数，再乘手数：${v.price}×10×${v.n}`,
  margin: () => `题设保证金率8%换成0.08：${v.nominal}×0.08`,
  pnl: () => `多头每吨损失${v.drop}元，按10吨/手和${v.n}手放大：−${v.drop}×10×${v.n}`,
  basis: () => `固定采用“现货−期货”的定义：${v.spot}−4050`,
  'index-fair': () => `净持有成本率4%−2%=2%，半年为1%，简单计息：${v.spot}×[1＋(0.04−0.02)×0.5]`,
  'call-profit': () => `先求到期内在价值，再扣已付权利金：max(${v.spot}−100,0)−5`,
 };
 if (!formulas[family]) throw new Error(`Missing walkthrough: ${family}`);
 return `${formulas[family]()}＝${result}${unit}。${['fee-rate','stake','discount'].includes(family)?'结果按题设保留四位小数；计算中不提前舍入。':''}`;
}
