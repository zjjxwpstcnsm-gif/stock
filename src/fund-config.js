import { FUND_UNITS } from './fund-curriculum.js';
import { RECALL_SOURCES } from './fund-recall-data.js';
export const FUND_SOURCES = {
  ...RECALL_SOURCES,
  operations:{title:'证监会 · 公开募集证券投资基金运作管理办法',url:'https://www.csrc.gov.cn/csrc/c106256/c1653978/content.shtml',note:'公募分类、募集、申赎等一般规则，特殊品种还应查专项规定。'},
  reports:{title:'证监会 · 2026年公募基金定期报告内容与格式准则',url:'https://www.csrc.gov.cn/csrc/c101954/c7619929/content.shtml',note:'年报、中期报告与季报的现行编制要求。'},
  fundLaw: {title: '《中华人民共和国证券投资基金法》现行修正文本',url:'https://scjgj.beijing.gov.cn/cxfw/flfgcxfw/qyjgl/202006/t20200621_1929570.html',note:'核对持有人大会、合同终止、基金财产及信息披露等制度。'},
  assessment: {title:'基金管理公司绩效考核管理指引（2026）',url:'https://fg.amac.org.cn/governmentrules_3854/zcgz_zlgz/zlgz_gmjj/zlgz_gmjj_zhl/202606/t20260616_27835.html',note:'科目一新增参考规范，学习长期考核、薪酬与投资者利益的关系。'},
  salesFees: {title:'《公开募集证券投资基金销售费用管理规定》（2025年修订）',url:'https://www.csrc.gov.cn/csrc/c101954/c7606091/content.shtml',note:'2026年起施行；费率、豁免及存量安排须核对原文，历史题设不代表现行标准。'},
  qualified: {title:'证监会 · 私募合格投资者规则说明',url:'https://www.csrc.gov.cn/shenzhen/c105614/c1575332/content.shtml',note:'单只基金投资金额与资产／收入条件，注意法定例外和禁止拆分。'},
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
  const oldVersion = `fund-${i+1}-2026-09-29.1`;
  const version = `fund-${i+1}-2026-09-29.2`;
  const units=FUND_UNITS[id];
  const quotas=Object.fromEntries([...modules[i].map((_,j)=>[j+1,4]),...units.map((_,j)=>[j+6,Math.floor(80/units.length)+(j<80%units.length?1:0)])]);
  const legacy={name:`科目${['一','二','三'][i]}全真规格模拟`,minutes:120,points:1,pass:60,quotas:{1:20,2:20,3:20,4:20,5:20}};
  return [id, {
    id, isFund:true, name, short:`基金从业 · 科目${['一','二','三'][i]}`, number:i+1,
    BANK_VERSION:version, COMPATIBLE_BANK_VERSIONS:[oldVersion,version], LEGACY_PROFILES:{[oldVersion]:{standard:legacy}}, SOURCES:FUND_SOURCES,
    CHAPTERS:Object.fromEntries([...modules[i].map(([title, desc], j) => [j+1,{name:title,short:title,desc,level:1}]),...units.map((unit,j)=>[j+6,{name:`大纲第${j+1}章 · ${unit.title}`,short:unit.title,desc:unit.intro,level:1}])]),
    PROFILES:{standard:{name:`科目${['一','二','三'][i]}全真规格模拟`,tag:name,minutes:120,points:1,pass:60,quotas,desc:'100题 · 120分钟 · 60分合格'}},
  }];
}));
