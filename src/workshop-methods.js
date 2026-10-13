import { esc } from './academy-views.js';
import { WORKSHOP_BATCH } from './workshop-questions.js';
export const CASE_METHODS = {
 options: {title:'先画到期价值，再算净损益。',steps:[['确定头寸','为每条腿标出认购／认沽、买入／卖出、行权价、数量及单位；不要只凭策略名称判断方向。'],['分开两本账','先算到期履约价值，再扣支付的权利金、加收到的权利金；成交往返则按真实收支扣除双边费用。'],['检查边界','取标的低于、介于及高于行权价的情形验证。到期损失有限，不代表盘中无需保证金与流动性管理。']]},
 fund1: {title:'先辨认是谁的钱，再判断谁的义务。',steps:[['确认财产归属','把基金财产与管理人、托管人的固有财产分开，不同基金也分别看待。不要用“同一家公司”消除利益边界。'],['拆开义务与结果','信息申报、托管监督、勤勉管理各有主体与程序。正常市场亏损不自动等于失职；盈利也不能豁免违规。'],['核对费用口径','申购总额、净申购额、份额是不同量；先读题设费率与计费方式。分红同时影响净值与现金，不能重复计算。']]},
 fund2: {title:'让收益、风险和时间使用同一把尺。',steps:[['对齐量纲','统一年化期间、收益基准与百分数单位。分清名义与实际收益、主动收益与绝对收益。'],['选择模型','先列模型适用前提，再代数值。复合收益用连乘；负相关组合仍需看风险贡献；增长模型要求必要收益率大于增长率。'],['回到定义','最大回撤要看峰值先于谷值；买卖报价不是中间价；风险调整比率不能随意替换分子或分母。']]},
 fund3: {title:'沿着资金流向，读懂估值与分配。',steps:[['识别现金流入谁','增资款进入公司，老股转让款进入出售股东。先分清股权价值与融资额，再计算稀释。'],['确认估值桥接','企业价值、债务、非经营现金按同一交易口径调整；TVPI使用同一投资者口径的实缴、已分配及剩余净值。'],['按合同排瀑布','先写本金、门槛、追赶与分成顺序。参与型与非参与型不能混算；题设费率、清算条款不是市场统一规则。']]},
 securities1: {title:'先从定义出发，再用常识检查数量级。',steps:[['还原报价单位','每百元净价加应计利息得到全价，再按面值规模换算；市盈率先把利润转换成每股收益。'],['拆出风险补偿','CAPM中的Beta乘市场风险溢价，不是整个市场收益。久期先将基点换成小数，并保留价格与收益率的反向关系。'],['承认模型边界','VaR不是最大损失保证；优先受偿不等于无风险。公式给出条件下的估计，不应转化为收益承诺。']]},
 securities2: {title:'按“主体—行为—条件—责任”读法规题。',steps:[['找准行为主体','普通投资者与专业投资者、证券公司与咨询机构的责任安排不能机械互换。先确定题中关系。'],['定位行为与例外','内幕推荐、虚假申撤单、选择性披露要回到具体行为与法定条件；注意“原则上”及明示的法定例外。'],['核对程序和条号','签免责书不自动取代适当性履职；参加调解不等于承认全部责任。先读对应条文，再评价选项的绝对化措辞。']]},
 futures1: {title:'两条腿分别记账，最后才合并。',steps:[['方向先于数值','多头涨价盈利、空头涨价亏损；各腿都乘张数与合约单位。结算价、平仓价、合约价值与盈亏要区分。'],['从实物敞口出发','采购套保用期货盈利抵减采购价，销售套保用期货盈亏调整售价；数量匹配不自动消除基差风险。'],['核对模型与资金','最小方差比率包含相关系数和波动率比例；简单持有成本不混用连续复利。追加保证金看缺口，不是再付一遍总额。']]},
 futures2: {title:'把资金保护和交易者权利分开核对。',steps:[['识别资金边界','客户保证金、权利金与机构自有资金分离。临时周转、内部批准或事后归还不是一般性豁免。'],['区分权利与程序','查询记录、资料保密、适当性及调解各有对应条件。参加调解不等于当然认责，客户沉默也不是出售资料的许可。'],['分清制度层次','持仓未平不等于不做当日结算；法人自身内控不由开户审核替代。主协议与单笔确认应作为约定体系理解。']]},
};
export function caseMethodView(subject, {compact = false} = {}) {
  const method = CASE_METHODS[subject.id];
  if (!method) return '';
  return `<details class="case-method ${compact ? 'case-method-compact' : ''}"><summary><span class="method-tag">解题方法</span><strong>${esc(method.title)}</strong><span aria-hidden="true">＋</span></summary><div class="method-steps">${method.steps.map(([title, text], index) => `<section><span>${String(index + 1).padStart(2, '0')}</span><div><h3>${esc(title)}</h3><p>${esc(text)}</p></div></section>`).join('')}</div><p class="method-boundary">教学推理框架，不替代原文、交易协议或完整教材。规则按题目注明的参考版本核对。</p></details>`;
}
export function workshopDesk(subject) {
  const bank = subject.QUESTIONS.filter(q => q.editorialBatch === WORKSHOP_BATCH);
  if (!bank.length) return '';
  return `<section class="workshop-desk" aria-labelledby="workshop-heading"><header><div><span class="eyebrow">CASE WORKSHOP · 2026.10.13</span><h2 id="workshop-heading">不止答对，还要说得清。</h2><p>本科新增 ${bank.length} 道情景研判，每题含逐项辨析与参考定位。原创训练，不是真题。</p></div><a class="text-button" href="https://github.com/zjjxwpstcnsm-gif/stock/blob/main/docs/workshop-audit.md" target="_blank" rel="noopener noreferrer">审校范围 ↗</a></header>${caseMethodView(subject)}<div class="workshop-topics" aria-label="本次新增考点">${bank.map(q => `<button data-action="practice-one" data-id="${esc(q.id)}">${esc(q.topic)}<span aria-hidden="true">↗</span></button>`).join('')}</div><p class="workshop-caption">点考点定位单题；新题也已自动加入随机刷题，无需额外设置。</p></section>`;
}
