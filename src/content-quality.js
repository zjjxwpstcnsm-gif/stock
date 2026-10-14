// Reference dates are scoped to the listed editorial batch, never to the entire bank.
export const CASEBOOK_DATE = '2026-10-13';
export const DIFFICULTIES = {foundation:'基础辨析',applied:'情景应用',advanced:'进阶推导',unrated:'未标难度'};
export const CASEBOOK_SOURCES = {
  securitiesLawReview: {title:'中国证券投资者保护基金公司 · 证券法（2019修订）全文',url:'https://www.sipf.com.cn/flfg/2020/03/12865.shtml',kind:'official',note:'本次法律情景题逐题列明条号；法律文本是参考依据，不是题目出处。核对日2026-10-13。'},
  futuresLawReview: {title:'中国期货业协会 · 期货和衍生品法全文',url:'https://www.cfachina.org/governmentrules/lawsandregulations/202204/t20220421_26911.html',kind:'official',note:'本次核对实名制、保证金、结算、交易者保护等条文；不可沿用历史样卷已变化的规则数字。'},
  derivatives2026: {title:'证监会 · 衍生品交易监督管理办法（试行）发布说明',url:'https://www.csrc.gov.cn/csrc/c100028/c7632835/content.shtml',kind:'official',note:'2026-05-15公布，2026-11-16施行。公布日期不等于施行日期，适用范围不等同所有期权交易。'},
};
export const POLICY_NOTICES = [
  {id:'futures-companies-2026',subjects:['futures2'],title:'期货公司管理新办法：2027年起施行',published:'2026-09-11',effective:'2027-01-01',verified:'2026-10-14',source:'https://www.csrc.gov.cn/csrc/c101953/c7658242/content.shtml',detail:'证监会第235号令已公布，施行日为2027年1月1日。2026年10月核对题目时，不能将新办法条号与旧办法混用。',note:'对照题所依据版本、施行时间及配套实施公告；本提示不是实时更新。'},
  {id:'derivatives2026',subjects:['futures1','futures2','options'],title:'衍生品新规：分清公布与施行',published:'2026-05-15',effective:'2026-11-16',verified:CASEBOOK_DATE,source:CASEBOOK_SOURCES.derivatives2026.url,detail:'范围为期货交易以外的互换、远期、非标准化期权及其组合。不能直接套到所有场内标准化期权。',note:'核对时尚未施行；届时仍需检查配套通知与过渡安排。'},
  {id:'futures-capital',subjects:['futures2'],title:'历史样卷的注册资本数字不可机械沿用',effective:'2022-08-01',verified:CASEBOOK_DATE,source:CASEBOOK_SOURCES.futuresLawReview.url,detail:'期货和衍生品法第六十条规定期货公司注册资本基础下限为1亿元、实缴货币资本，并允许审慎监管提高最低限额。',note:'2016年样卷有3000万元旧口径。历史答案与当前适用规则须分开。'},
];
// A site has no live legal-status feed. Show a dated verification, not a claim
// that a rule is still current whenever somebody opens the page in the future.
export function ruleStatus(rule, referenceDate=CASEBOOK_DATE) {
  return rule.effective>referenceDate?'已公布 · 核对时未施行':'核对时已施行';
}
export function bankQuality(bank) {
  return {
    total:bank.length,
    original:bank.filter(q=>!['sample','recall'].includes(q.sourceKind)).length,
    recall:bank.filter(q=>q.sourceKind==='recall').length,
    sample:bank.filter(q=>q.sourceKind==='sample').length,
    labeledVariants:bank.filter(q=>q.variantFamily).length,
    casebook:bank.filter(q=>q.editorialBatch===CASEBOOK_DATE).length,
    detailed:bank.filter(q=>q.rationales?.length===q.options.length).length,
  };
}
