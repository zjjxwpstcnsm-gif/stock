import { esc } from './academy-views.js';
import { CLINIC_BATCH } from './clinic-questions.js';
// Short comparisons complement, not replace, the linked systematic lessons.
export const CONCEPT_PAIRS = {
 options:[
  ['到期价值','只看到期履约带来的价值，不包含最初权利金。','净损益','将到期价值与权利金收支、适用费用合并，才知道赚亏。',3],
  ['敏感度','Delta、Vega等描述其他条件不变时的局部估计。','实际收益','多个输入共同变化，还有交易成本；方向正确不保证盈利。',8],
  ['履约金额','实物履约按合约行权价乘实际合约单位计算。','最大净损失','还需计入头寸方向和已收付权利金，不能直接用履约金额替代。',5]],
 fund1:[
  ['申购成立','依基金法第六十六条，交付申购款时成立。','申购生效','登记机构确认基金份额后生效，不是同一个时点。',1],
  ['赎回总额','以适用份额净值乘赎回份额，得到扣费前金额。','净到账额','还要依具体规则扣除适用费用；不要直接对份数扣金额。',3],
  ['出席条件','关注参加大会者代表多少基金份额。','表决门槛','关注赞成票占参加大会表决权的比例，并区分一般与特别事项。',4]],
 fund2:[
  ['名义年利率','报价约定，不一定等于一年实际复利增长率。','有效年利率','把年内复利次数计入；先统一利率和期间。',1],
  ['麦考利久期','债券现金流现值的时间加权平均。','修正久期','在对应复利口径下转换，描述小幅收益率变动的价格敏感度。',2],
  ['跟踪偏离','某期收益相对基准的差异。','跟踪误差','一组主动收益的标准差；先明确频率与年化假设。',6]],
 fund3:[
  ['增资','认购新增股份，资金进入公司并扩大总股份。','老股转让','资金给出售股东，本身不增加公司股份总数。',1],
  ['非参与型优先','常见教学约定是在优先清算额与转股分配中择一。','参与型优先','题设可在优先取回后再参与剩余分配；上限和顺序以合同为准。',2],
  ['随售权','满足约定条件时，可选择跟随出售。','拖售权','满足约定条件时，可要求其他股东共同出售；不能只看名称不读条款。',7]],
 securities1:[
  ['票息率','决定合同票息相对面值的比例。','到期收益率','联系当前价格与未来现金流的折现率，两者未必相同。',1],
  ['百分点','两个百分比数值之差的单位。','基点','一个基点等于0.01个百分点；不要把两种单位混算。',4],
  ['一级发行','新增发行融资时，募集资金进入发行主体。','二级转让','通常是已有证券在投资者之间转移，价款支付给卖方。',8]],
 securities2:[
  ['发行注册','不构成监管对投资价值或收益的保证。','投资判断','仍需评价风险与价值，不能用注册决定代替分析。',1],
  ['表达异议','按规定书面提出理由并履行披露程序。','无过错抗辩','是责任认定中的条件判断，不是提出异议后自动免责。',2],
  ['客户财产','与证券公司自有财产分离，不属于公司破产财产。','依法冻结边界','不能把隔离原则扩张为客户因自身债务也永不受依法执行。',7]],
 futures1:[
  ['报价方向','先明确是一单位外币值多少本币，还是相反。','利率位置','同一模型中分子分母必须跟随报价方向，不能机械套公式。',1],
  ['账户权益','反映结算盈亏、手续费及出入金后的账户资金权益。','可用资金','按题设再扣保证金占用及其他冻结，不能等同账户权益。',5],
  ['单腿涨跌','多头与空头的损益方向不同。','价差损益','分别算两腿并乘合约单位，再扣适用成本；套利不是无风险标签。',6]],
 futures2:[
  ['主协议净额结算','法律对符合条件的终止净额结算规定了特定保护。','任意债权抵销','不能从该保护推出所有债务都能随意抵销。',1],
  ['账户实名','核对名义开户主体的真实身份。','控制关系报备','关注账户背后的实际控制关系，实名不能代替报备。',3],
  ['代为履约','以规定方式保障结算完成。','向违约者追偿','代为履约不自动免除违约者责任，自有资金垫付可依法追偿。',7]],
};
export function conceptClinic(subject) {
 const bank = subject.QUESTIONS.filter(q=>q.editorialBatch===CLINIC_BATCH);
 if (!bank.length) return '';
 return `<section class="concept-clinic" aria-labelledby="clinic-heading"><header><p class="eyebrow">CONCEPT NOTES · 概念辨析</p><h2 id="clinic-heading">看起来相近，判断却不同。</h2><p>每组分清两个概念，再用一道情景题检验。本科新增 ${bank.length} 道原创辨析，已加入随机题库。</p></header><div class="concept-pairs">${(CONCEPT_PAIRS[subject.id]||[]).map(([a,at,b,bt,n],i)=>{const q=bank[n-1];return `<details class="concept-pair"><summary><span class="concept-number">0${i+1}</span><strong>${esc(a)}<em>与</em>${esc(b)}</strong><span class="concept-expand" aria-hidden="true">＋</span></summary><div class="concept-content"><div class="concept-columns"><section><h3>${esc(a)}</h3><p>${esc(at)}</p></section><section><h3>${esc(b)}</h3><p>${esc(bt)}</p></section></div><div class="concept-actions"><button class="secondary small" data-action="practice-one" data-id="${esc(q.id)}">用一道题检验 ↗</button><button class="text-button" data-action="course-open" data-lesson="${esc(q.lessonId)}">回到系统讲解</button></div></div></details>`;}).join('')}</div><details class="clinic-library"><summary>查看本科 ${bank.length} 道新题的考点</summary><div class="clinic-topics">${bank.map(q=>`<button data-action="practice-one" data-id="${esc(q.id)}">${esc(q.topic)}<span aria-hidden="true">↗</span></button>`).join('')}</div></details><p class="clinic-boundary">辨析卡是导读，不替代完整课程、有效规则或合同。<a href="https://github.com/zjjxwpstcnsm-gif/stock/blob/main/docs/clinic-audit.md" target="_blank" rel="noopener noreferrer">查看依据与复算范围 ↗</a></p></section>`;
}
