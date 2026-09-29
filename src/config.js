export const BANK_VERSION = '2026-09-29.1';
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
  xueqiu: { title: '用户提供的雪球题目链接', url: 'https://www.xueqiu.com/9465897807/256370486', note: '参考线索，当前未能读取正文，未收录或验证该文题目与答案。' },
};
