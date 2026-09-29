export const BANK_VERSION = '2026-09-29.2';
// 本次仅追加题目，旧题内容和答案索引由测试锁定，允许继续旧答卷。
// 如以后修改已有题目或答案，须移除受影响的旧版本，不能盲目放宽兼容。
export const COMPATIBLE_BANK_VERSIONS = ['2026-09-29.1', BANK_VERSION];
export const CHAPTERS = {
  1: { name: '期权基础知识', short: '基础知识', level: 1, desc: '认购与认沽、合约要素、价值与交易规则' },
  2: { name: '备兑开仓与保险策略', short: '备兑与保险', level: 1, desc: '持仓保护、备兑收益与风险、行权准备' },
  3: { name: '买入开仓策略', short: '买入开仓', level: 2, desc: '买方损益、盈亏平衡、杠杆与敏感性' },
  4: { name: '卖出开仓策略', short: '卖出开仓', level: 3, desc: '卖方义务、保证金、平仓与风险控制' },
};
export const PROFILES = {
  comprehensive: { name: '综合模拟卷', tag: '覆盖一至三级', minutes: 30, points: 5, pass: 70, quotas: { 1: 6, 2: 4, 3: 5, 4: 5 }, sectional: true, desc: '20 题 · 三个部分分别达标' },
  level1: { name: '一级模拟卷', tag: '基础 · 备兑 · 保险', minutes: 20, points: 5, pass: 70, quotas: { 1: 12, 2: 8 }, desc: '20 题 · 期权入门与持仓保护' },
  level2: { name: '二级模拟卷', tag: '买入开仓', minutes: 20, points: 10, pass: 70, quotas: { 3: 10 }, desc: '10 题 · 买方策略与损益' },
  level3: { name: '三级模拟卷', tag: '卖出开仓', minutes: 20, points: 10, pass: 70, quotas: { 4: 10 }, desc: '10 题 · 卖方策略与风险' },
};
export const SOURCES = {
  guide: { title: '上交所 · 证券公司股票期权经纪业务指南（2026年修订）', url: 'https://www.sse.com.cn/lawandrules/guide/options/c/c_20260609_10821175.shtml', note: '考试配置的主要依据。官方 DOCX 第三章第三节（五）（六），已于 2026-09-29 下载核对。' },
  rules: { title: '上交所 · 股票期权试点交易规则', url: 'https://www.sse.com.cn/lawandrules/sselawsrules2025/option/c/c_20250610_10781448.shtml', note: '合约、交易、行权和风险控制规则。具体品种参数以合约公告为准。' },
  education: { title: '上交所 · 期权学苑', url: 'https://edu.sse.com.cn/college/qqxytj/', note: '概念与策略补充学习入口；本站练习题为独立编写，并非从此页面抽取的原题。' },
  sample1: { title: '国新证券 · 上交所历史样卷（一）', url: 'https://www.crsec.com.cn/content/details1515310378502545409_1570599284636491778.html', note: '2015 年历史样卷，用于核对四选一题型与基础考点；旧题量不用于当前组卷。' },
  sample2: { title: '国新证券 · 上交所历史样卷（二）', url: 'https://www.crsec.com.cn/content/details1515310378502545409_1570600632220229633.html', note: '2015 年历史样卷，用于对照买方损益考点。' },
  galaxy: { title: '银河证券 · 期权练习入口', url: 'https://www.chinastock.com.cn/newsite/cgs-services/stockOption/stockOptionDescription.html?type=optionTest', note: '券商学习测试与正式开户考试不同；本站不采用其练习合格线。' },
  pricing: { title: 'OIC · 期权定价输入与 Greeks', url: 'https://www.optionseducation.org/advancedconcepts/understanding-options-greeks', note: '一般估值理论补充；不将美股交易、行权制度套用于 A 股 ETF 期权。计算与模型题采用题设假定。' },
  greeks1: { title: '深交所投教 · Delta 与 Gamma', url: 'https://investor.szse.cn/index/update/t20230103_598090.html', note: '采用一般风险指标定义，不采用深市考试配置。金额题明确每份/每张与局部近似口径。' },
  greeks2: { title: '深交所投教 · Vega、Theta 与 Rho', url: 'https://investor.szse.cn/index/update/t20230116_598311.html', note: '一般敏感度知识；计算题明确按每日、每个利率或波动率百分点计量，并区分多空符号。' },
  covered: { title: '深交所投教 · 备兑策略', url: 'https://www.szse.cn/www/investor/index/update/t20221213_597824.html', note: '仅作为一般策略损益的知识参考；沪市锁定、交收等操作以上交所规则及经营机构约定为准。' },
  insurance: { title: '深交所投教 · 保险策略', url: 'https://www.szse.cn/www/investor/index/update/t20221212_597783.html', note: '现货加认沽的一般损益原理；本站另行设置成本、保护比例、期限与费用情景。' },
  payoff: { title: '深交所投教 · 期权四种基本交易', url: 'https://www.szse.cn/www/investor/institute/rules/t20221206_597693.html', note: '一般权利、义务与到期损益原理；所有数值案例由本站独立设置，不是该资料的原题。' },
  exercise: { title: '上交所 · 行权及交收规则', url: 'https://www.sse.com.cn/lawandrules/sselawsrules2025/option/c/c_20250610_10781448.shtml', note: '第五章行权，结合 2026 年经纪业务指南和实际经营机构的钱券、协议行权服务要求。' },
  risk: { title: '深交所投教 · 风险控制能力提升方法', url: 'https://investor.szse.cn/institute/rules/t20230203_598566.html', note: '一般风险管理原理，关注极端损失、资金压力与执行风险；不用于判断任何策略必赚或必亏。' },
  spreads: { title: '深交所投教 · 组合策略风险场景', url: 'https://www.szse.cn/www/investor/institute/rules/t20230203_598565.html', note: '组合损益拓展练习；到期净损失边界不等于盘中保证金或交收资金上限，也不保证正式考试必考。' },
  xueqiu: { title: '用户提供的雪球题目链接', url: 'https://xueqiu.com/9465897807/256370486', note: '2026-09-29 核查：搜索索引可见文章标题；带 www 地址返回 HTTP 567 访问提示，不带 www 返回 WAF 校验脚本，未取得可核验正文。因此未将该文标作已收录或已验证的真题来源。' },
};
