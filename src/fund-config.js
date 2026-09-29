export const FUND_SOURCES = {
  exam: { title: '中国证券投资基金业协会 · 2026年5月考试公告', url: 'https://www.amac.org.cn/fwdt/wyb/rygl/cyks/cykstz/202604/t20260427_27624.html', note: '考试形式：每科100道单选、每题1分、120分钟、60分合格。此公告使用2025大纲；大纲已另行更新。' },
  update: { title: '中国证券投资基金业协会 · 2026年度修订大纲通知', url: 'https://www.amac.org.cn/fwdt/wyb/rygl/cyks/cyksjcdg/jcksdg/202606/t20260630_27896.html', note: '2026-06-30发布，自2026年9月行业专场考试起启用。报考场次以其当次公告为准。' },
  outline1: { title: '科目一 · 2026年度官方考试大纲 PDF', url: 'https://www.amac.org.cn/xwfb/tzgg/202606/P020260630399995319242.pdf', note: '已下载核对。覆盖基础、法规、合规、职业道德与行业文化；包含2026年新增参考规范。' },
  outline2: { title: '科目二 · 2026年度官方考试大纲 PDF', url: 'https://www.amac.org.cn/xwfb/tzgg/202606/P020260630399995486150.pdf', note: '已下载核对。投资工具、组合、风险、业绩、运营与销售。' },
  outline3: { title: '科目三 · 2026年度官方考试大纲 PDF', url: 'https://www.amac.org.cn/xwfb/tzgg/202606/P020260630399995526911.pdf', note: '已下载核对。股权基金管理人、产品、募投管退、治理与运营。' },
  registration: { title: '中国证券投资基金业协会 · 从业资格管理服务指南', url: 'https://www.amac.org.cn/fwdt/wyb/rygl/cyryzggl/', note: '资格注册、科目组合及其他认定路径。通过考试不等于自动完成从业资格注册。' },
  notices: { title: '中国证券投资基金业协会 · 考试通知', url: 'https://www.amac.org.cn/fwdt/wyb/rygl/cyks/cykstz/', note: '查看当次报名、教材、大纲、准考证与成绩安排。' },
};
const names = ['基金基础知识与法律法规', '证券投资基金基础知识', '私募股权投资基金基础知识'];
const modules = [
  [['基金与金融市场','金融市场、基金分类、参与主体'],['法规与治理','监管、自律、财产独立、内部控制'],['职业道德与文化','信义义务、合规、廉洁、利益冲突'],['销售与运作','适当性、披露、募集与客户服务'],['净值与费用入门','净值、申购赎回、费率与收益']],
  [['投资工具与财务','财务报表、股票、债券与衍生品'],['组合、风险与运营','分散、业绩、估值、交易与清算'],['估值与财务计算','货币时间价值、净值和财务比率'],['收益与风险计算','收益率、Beta、Sharpe与久期'],['基金交易计算','申赎、分红、折溢价与跟踪偏离']],
  [['股权基金与募集','组织形式、信义义务、募集与设立'],['投资与投后管理','尽调、估值、交易条款与增值服务'],['退出、治理与运营','退出路径、分配、信息披露与托管'],['估值与出资计算','投前投后、持股、乘数法与实缴'],['业绩与分配计算','DPI、RVPI、TVPI、IRR与分配']],
];
export const FUND_CONFIGS = Object.fromEntries(names.map((name, i) => {
  const id = `fund${i+1}`;
  const version = `fund-${i+1}-2026-09-29.1`;
  return [id, {
    id, isFund:true, name, short:`基金从业 · 科目${['一','二','三'][i]}`, number:i+1,
    BANK_VERSION:version, COMPATIBLE_BANK_VERSIONS:[version], SOURCES:FUND_SOURCES,
    CHAPTERS:Object.fromEntries(modules[i].map(([title, desc], j) => [j+1,{name:title,short:title,desc,level:1}])),
    PROFILES:{standard:{name:`科目${['一','二','三'][i]}全真规格模拟`,tag:name,minutes:120,points:1,pass:60,quotas:{1:20,2:20,3:20,4:20,5:20},desc:'100题 · 120分钟 · 60分合格'}},
  }];
}));
