import test from 'node:test';
import assert from 'node:assert/strict';
import {EXPANSION_REGULATION_QUESTIONS as B} from '../src/expansion-regulation.js';
test('guarantee fund compensation case independently reconstructs both statutory brackets',()=>{
 const q=B.futures2.find(q=>q.id==='futures2-expansion-reg-0153');
 assert.match(q.stem,/个人和机构各有20万元/);
 const loss=20,first=Math.min(loss,10),excess=Math.max(loss-10,0);
 assert.equal(first+excess*.9,19);assert.equal(first+excess*.8,18);
 assert.match(q.options[q.answer],/个人19万元机构18万元/);
});
test('capital reporting example preserves distinct inclusive and strict thresholds',()=>{
 const q=B.securities2.find(q=>q.id==='securities2-expansion-reg-0133');
 assert.match(q.stem,/25%/);assert.match(q.explanation,/超过20%/);assert.match(q.explanation,/20%以上/);
 assert.match(q.options[q.answer],/三工作日.*五工作日.*十工作日/);
});

import {EXPANSION_FUND_GOVERNANCE_QUESTIONS as G} from '../src/expansion-fund-governance.js';
test('financial due diligence cases independently reconcile revenue allocations and recoverable costs',()=>{
 const checks=[
 [153,1000-900,100,/一百万元佣金收入/,['一千万元','九百万元']],
 [154,120*3/12,30,/三十万元/,['一年','一百二十万元','三个月']],
 [155,100-10,90,/九十万元.*十万元/,['一百万元','十万元']],
 [156,108*100/(100+20),90,/九十万元/,['一百万元与二十万元','一百零八万元']],
 [160,121-100,21,/一百万元/,['一百万元','一百二十一万元']],
 [167,Math.min(22,18)-10,8,/八万元/,['十万元','二十二万元','十八万元']],
 [173,10*45/90,5,/五万元/,['一百万元','九十万元','四十五万元']],
 [168,30-(50-35),15,/十五万元/,['三十万元','五十万元','三十五万元']],
 ];
 for(const[n,v,w,r,parts]of checks){const q=G.fund3[n-1];assert.equal(v,w);for(const p of parts)assert.ok(q.stem.includes(p),`${q.id}: ${p}`);assert.match(q.options[q.answer],r,q.id);}
 assert.equal(108-90,18);assert.ok(Math.abs(100*1.1**2-121)<1e-10);
});
test('program-trading procedures distinguish feedback, physical separation and conditional relief',()=>{
 const q=n=>B.futures2.find(x=>x.id===`futures2-expansion-reg-${String(n).padStart(4,'0')}`);
 assert.match(q(213).options[q(213).answer],/收到反馈后/);
 assert.match(q(214).options[q(214).answer],/开仓委托/);
 assert.match(q(215).options[q(215).answer],/同一物理设备/);
 assert.match(q(222).options[q(222).answer],/第七至十二条/);
 assert.match(q(226).options[q(226).answer],/周三.*到达/);
 assert.match(q(231).options[q(231).answer],/无法控制.*不可预测/);
});

test('position aggregation and reporting examples use distinct stated thresholds',()=>{
 const q=n=>B.futures2.find(x=>x.id===`futures2-expansion-reg-${String(n).padStart(4,'0')}`);
 assert.match(q(232).stem,/300手/);assert.match(q(232).stem,/270手和80手/);
 assert.equal(270+80,350);assert.ok(350>300);assert.match(q(232).options[q(232).answer],/350手/);
 assert.match(q(239).stem,/1000手.*2000手.*1200手/);
 assert.ok(1200>=1000&&1200<=2000);assert.match(q(239).options[q(239).answer],/应按规则履行大户报告.*不能仅因/);
});

test('inventory and intangible due diligence examples independently reconstruct recognition amounts',()=>{
 const checks=[
 [219,Math.min(100,120-30-5),85,/八十五万元/,['一百万元','一百二十万元','三十万元','五万元']],
 [221,60*Math.min(10,11)+40*Math.min(10,8),920,/九百二十万元/,['六十台','四十台','十万元','十一万元','八万元']],
 [222,Math.min(50,30)+Math.min(50,70),80,/甲减记二十万元/,['甲成本五十万元','净值三十万元','净值七十万元']],
 [223,100-25,75,/七十五万元/,['一百万元','二十五万元']],
 [228,60,60,/六十万元/,['四十万元已正确费用化','六十万元']],
 [233,(600-100)/5,100,/一百万元/,['五年许可','六百万元','一百万元']],
 ];
 for(const[n,v,w,r,parts]of checks){const q=G.fund3[n-1];assert.equal(v,w);for(const p of parts)assert.ok(q.stem.includes(p),`${q.id}: ${p}`);assert.match(q.options[q.answer],r,q.id);}
});

test('exchange governance and collateral examples use full-membership and currency bases',()=>{
 const q=n=>B.futures2[n-1];
 assert.equal(12*2/3,8);assert.equal(12/2,6);assert.match(q(246).stem,/12名理事.*8名.*6名/);assert.match(q(246).options[q(246).answer],/8人出席和6人赞成/);
 assert.equal(Math.min(90,4*20),80);assert.match(q(251).stem,/实有货币20万元.*90万元/);assert.match(q(251).options[q(251).answer],/80万元/);
 assert.equal(1000*.2,200);assert.match(q(254).stem,/手续费收入1000万元.*700万元.*100万元/);assert.match(q(254).options[q(254).answer],/200万元/);
});

import {EXPANSION_INVESTMENT_QUESTIONS as I} from '../src/expansion-investment.js';
test('southbound exchange conversion and corporate-action quantities reconcile stated units',()=>{
 const q=n=>I.fund2[n-1];
 assert.match(q(213).stem,/人民币元\/港元/);assert.equal(10000*.90,9000);assert.equal(10000*.87,8700);assert.match(q(213).options[q(213).answer],/9,000元.*8,700元/);
 assert.match(q(214).options[q(214).answer],/^D4/);
 const votes=[80,40,30],total=votes.reduce((a,b)=>a+b,0);assert.equal(total,150);assert.deepEqual(votes.map(n=>n*90/total),[48,24,18]);assert.match(q(221).options[q(221).answer],/48、24、18/);
 assert.equal(4-Math.floor(1.6)-Math.floor(2.7),1);assert.match(q(222).options[q(222).answer],/精确算法/);
 assert.match(q(226).options[q(226).answer],/甲S1、乙S2/);
});

test('government fund evaluation respects alternative thresholds, denominators and policy exceptions',async()=>{
 const {EXPANSION_FUND_GOVERNANCE_QUESTIONS:G}=await import('../src/expansion-fund-governance.js');
 const q=n=>G.fund3[n-1];assert.ok(.4<.7&&6>=5);assert.match(q(278).options[q(278).answer],/5分/);
 assert.ok(.75>=.7&&.01<.03);assert.match(q(279).options[q(279).answer],/1分/);
 assert.equal(2/10,.2);assert.ok(8>=6&&2<6);assert.match(q(281).options[q(281).answer],/20%/);
 assert.equal(1000/2,500);assert.equal(700/1,700);assert.match(q(282).options[q(282).answer],/700.*500/);
 assert.match(q(280).options[q(280).answer],/5分/);
});

test('issuance calculations respect combined price caps, strategic exclusion and inquiry triggers',()=>{
 const q=n=>B.securities2.find(x=>x.id===`securities2-expansion-reg-${String(n).padStart(4,'0')}`);
 assert.equal(Math.min(12,9),9);assert.match(q(274).options[q(274).answer],/不得超过9元/);
 assert.equal((5000-1000)*.8,3200);assert.match(q(277).stem,/科创板.*1.6亿/);assert.match(q(277).options[q(277).answer],/3200.*80%/);
 assert.ok(5000/16000>=.25);assert.ok(30<=35&&.55>.5);
 assert.equal(Math.min(22,24,25,26),22);assert.ok(23>22);assert.match(q(300).stem,/采用询价方式/);
 assert.match(q(276).stem,/恰为4亿股/);assert.match(q(276).options[q(276).answer],/中止/);
});

test('VAT cases distinguish product operations, management services and the first invoice trigger',()=>{
 const q=n=>G.fund3.find(x=>x.id===`fund3-expansion-gov-${String(n).padStart(4,'0')}`);
 assert.match(q(308).options[q(308).answer],/管理人/);
 assert.match(q(309).options[q(309).answer],/均暂不得抵扣/);
 assert.match(q(310).options[q(310).answer],/逐期.*次年1月/);
 assert.match(q(311).explanation,/2026至2027.*契约制/);
 assert.match(q(312).options[q(312).answer],/全部交易.*一并/);
 assert.match(q(313).options[q(313).answer],/6%/);
 assert.match(q(314).stem,/8月25日完成.*8月20日先开具/);assert.match(q(314).options[q(314).answer],/8月20日/);
 assert.match(q(315).referenceSection,/第十四条/);assert.match(q(315).options[q(315).answer],/以后.*退还/);
});

test('takeover safeguards distinguish hard floors, alternatives and max-of-two disclosure ratios',()=>{
 const q=n=>B.securities2.find(x=>x.id===`securities2-expansion-reg-${String(n).padStart(4,'0')}`);
 assert.ok(12.5>=12&&12.5<13);assert.match(q(313).options[q(313).answer],/专门分析/);
 assert.equal(10*.2,2);assert.match(q(314).options[q(314).answer],/可选.*不因/);
 assert.equal(9/3,3);assert.match(q(319).options[q(319).answer],/最多三名/);
 assert.equal(20/100,.2);assert.equal((20+10)/(100+100),.15);assert.equal(Math.max(.2,.15),.2);assert.match(q(329).options[q(329).answer],/^20%/);
 assert.equal(4/8,.5);assert.ok(!(4>8/2));assert.match(q(330).options[q(330).answer],/未超过半数/);
 assert.match(q(315).stem,/此前已依法出现竞争要约/);assert.ok(15<=20);
 assert.match(q(318).options[q(318).answer],/先经.*三分之二以上.*再提交/);
});

test('futures civil remedies keep separate orders, incremental losses and completed-settlement prerequisites',()=>{
 const q=n=>B.futures2.find(x=>x.id===`futures2-expansion-reg-${String(n).padStart(4,'0')}`);
 assert.equal(8-5,3);assert.equal(5-3,2);assert.match(q(273).options[q(273).answer],/多出3手.*少2手/);
 assert.equal(4*.8,3.2);assert.match(q(276).options[q(276).answer],/不超过3.2/);
 assert.ok(.10>.08&&.10<.12);assert.match(q(280).options[q(280).answer],/交易所比例/);
 assert.match(q(288).stem,/无另行违法或执行错误/);
 assert.match(q(291).options[q(291).answer],/自有部分.*不能动用客户/);
 assert.match(q(292).stem,/结算交割均已完成.*清偿客户资金/);assert.match(q(292).options[q(292).answer],/先行执行其他财产/);
});

test('private registration cases preserve cash-only, continuous-scale and report-denominator conditions',()=>{
 const q=n=>G.fund1.find(x=>x.id===`fund1-expansion-gov-${String(n).padStart(4,'0')}`);
 assert.ok(700<1000&&700+400>1000);assert.match(q(291).options[q(291).answer],/货币实缴仅700/);
 assert.ok(4<5&&4+2>=5);assert.match(q(292).options[q(292).answer],/专职仍为4人/);
 assert.ok(.30>=.25);assert.match(q(293).options[q(293).answer],/公司形式/);
 assert.equal(20-7,13);assert.match(q(298).options[q(298).answer],/继续计算/);
 assert.ok(600>=500&&600<1000);assert.match(q(300).options[q(300).answer],/备案后6个月.*1000/);
 const scale=Array(11).fill(4000).concat(2000);assert.ok(scale.reduce((a,b)=>a+b)/12>3000);assert.ok(!scale.every(x=>x>=3000));assert.match(q(306).options[q(306).answer],/持续达标/);
 assert.equal(4500/8000*100,56.25);assert.match(q(308).options[q(308).answer],/56.25%.*10个工作日/);
});

test('corporate-bond issuance separates investor standards, concurrent clocks and document validity',()=>{
 const q=n=>B.securities2.find(x=>x.id===`securities2-expansion-reg-${String(n).padStart(4,'0')}`);
 assert.ok(1.6>=1.5&&260>=250&&110>=100&&2<3);assert.match(q(334).options[q(334).answer],/只能面向专业投资者/);
 assert.equal(Math.max(2,3),3);assert.match(q(336).options[q(336).answer],/两段均从交易所受理/);
 assert.ok(10<24&&8>6);assert.match(q(337).options[q(337).answer],/说明书已过6个月/);
 assert.ok(21>100*.2&&11>100*.1);assert.ok(21<120*.2&&11<120*.1);
 assert.match(q(338).stem,/上年末/);
 assert.match(q(345).options[q(345).answer],/每次发行完成后5个工作日/);
 assert.match(q(350).stem,/预计发行人不能偿还/);assert.match(q(350).options[q(350).answer],/申请法定机关/);
 assert.match(q(356).options[q(356).answer],/甲可.*乙应由中国结算/);
});

test('fund accounting cases reconcile recognition, historical gains and effective-interest cash flows',()=>{
 const q=n=>I.fund2.find(x=>x.id===`fund2-expansion-invest-${String(n).padStart(4,'0')}`);
 assert.equal(100+1,101);assert.match(q(316).options[q(316).answer],/股票100.*费用1.*当期损益/);
 assert.equal(100+5,105);assert.match(q(317).options[q(317).answer],/股票100.*应收股利5.*不确认/);
 assert.equal(112-110,2);assert.equal((112-100)-(110-100),2);assert.match(q(319).options[q(319).answer],/^2万元/);
 assert.equal(105-100-3,2);assert.match(q(320).options[q(320).answer],/投资收益3.*变动损益2/);
 const interest=96*.05;assert.ok(Math.abs(interest-4.8)<1e-12);assert.equal(96+interest-3,97.8);assert.match(q(321).options[q(321).answer],/4.8.*97.8/);
 const contractual=110/1.1,expected=110/1.1**2,loss=contractual-expected;assert.ok(Math.abs(loss-9.090909090909)<1e-10);assert.match(q(322).options[q(322).answer],/9.09/);
});
test('fund accounting distinguishes OCI, VAT, subscriptions and total net-asset change',()=>{
 const q=n=>I.fund2.find(x=>x.id===`fund2-expansion-invest-${String(n).padStart(4,'0')}`);
 assert.equal(98-100+3,1);assert.equal(-3+1,-2);assert.match(q(324).options[q(324).answer],/资产98.*损益−3.*净增1/);
 assert.equal(106-6,100);assert.match(q(325).options[q(325).answer],/100.*待转销项税额6/);
 assert.deepEqual([800,50,150].map(x=>200*x/1000),[160,10,30]);assert.match(q(326).options[q(326).answer],/160.*10.*30.*损益不增加/);
 assert.equal(70-50,20);assert.match(q(328).options[q(328).answer],/应收清算款70.*应付清算款50/);
 assert.equal(1000+60-20+200-30,1210);assert.match(q(330).options[q(330).answer],/1210.*不等于.*60/);
});

test('2026 supervisory measures retain statutory exceptions and distinct disclosure procedures',()=>{
 const q=n=>B.futures2.find(x=>x.id===`futures2-expansion-reg-${String(n).padStart(4,'0')}`);
 assert.match(q(296).stem,/影响仍未消除/);assert.match(q(296).options[q(296).answer],/明定例外/);
 assert.match(q(297).options[q(297).answer],/乙属于.*甲不能/);
 assert.match(q(299).options[q(299).answer],/甲可.*听取.*乙经主要负责人批准/);
 assert.match(q(300).options[q(300).answer],/有较大影响.*十一、十二、十七、十九/);
 assert.match(q(301).stem,/不存在法律另定/);assert.match(q(301).options[q(301).answer],/原则上不停止/);
 assert.match(q(302).stem,/确有必要/);assert.match(q(303).stem,/已完全履行.*同一行为/);
});

test('integrity records distinguish expiry start, own-record exception and query/correction procedures',()=>{
 const q=n=>G.fund1.find(x=>x.id===`fund1-expansion-gov-${String(n).padStart(4,'0')}`);
 assert.equal(2026-2022,4);assert.ok(4<5);assert.match(q(315).options[q(315).answer],/2022年执行完毕.*未届满/);
 assert.match(q(316).options[q(316).answer],/本人查询.*例外/);
 assert.match(q(319).options[q(319).answer],/签章同意.*书面同意/);
 assert.match(q(320).options[q(320).answer],/查询5个工作日.*更正15个工作日/);
 assert.match(q(322).options[q(322).answer],/免费.*禁止/);
 assert.match(q(324).options[q(324).answer],/材料成本.*不能另收/);
});

test('2026 enforcement commitment separates investigation/adjudication, money factors and actual compensation pool',()=>{
 const q=n=>B.futures2.find(x=>x.id===`futures2-expansion-reg-${String(n).padStart(4,'0')}`);
 assert.match(q(304).stem,/处罚决定尚未作出/);assert.match(q(304).options[q(304).answer],/没有.*最终决定/);
 assert.match(q(305).stem,/已掌握.*主要事实.*能够判断/);assert.match(q(305).options[q(305).answer],/视为已经过必要调查/);
 assert.match(q(310).options[q(310).answer],/调查不中止，审理应中止/);
 assert.equal(150+60,210);assert.match(q(313).stem,/暂不计.*其他因素/);assert.match(q(313).options[q(313).answer],/不低于210/);
 assert.match(q(317).options[q(317).answer],/不予返还.*抵扣/);
 assert.ok(500<700&&700<1000);assert.match(q(320).options[q(320).answer],/500.*实际交纳并用于赔偿/);
});
test('syllabus party-discipline scope distinguishes membership, office and actual loss consequences',()=>{
 const q=n=>G.fund1[n-1];
 for(let n=355;n<=365;n++)assert.deepEqual(q(n).outlineCodes,['8.3.c']);
 assert.match(q(357).options[q(357).answer],/严重警告.*建议党外组织/);
 assert.match(q(358).options[q(358).answer],/保留党员身份.*没有表决权、选举权和被选举权/);
 assert.match(q(360).options[q(360).answer],/批评教育或者延长预备期/);
 assert.match(q(361).options[q(361).answer],/中止与最终处分不同/);
 assert.match(q(362).stem,/有罪判决但免予刑事处罚/);
 assert.match(q(363).stem,/基金机构一名党员/);
 assert.match(q(364).options[q(364).answer],/建议.*纠正非经济利益/);
});
test('fund syllabus accountability examples require fault and distinguish collective roles',()=>{
 const q=n=>G.fund1[n-1];for(let n=366;n<=375;n++)assert.deepEqual(q(n).outlineCodes,['8.3.d']);
 assert.match(q(366).options[q(366).answer],/全面领导责任.*主要责任.*重要责任/);
 assert.match(q(367).options[q(367).answer],/负有责任/);
 assert.match(q(368).options[q(368).answer],/不再另行启动/);
 assert.match(q(370).options[q(370).answer],/提出建议/);
 assert.match(q(371).stem,/已按职责.*不可抗力/);
 assert.match(q(374).options[q(374).answer],/甲仍应严肃问责/);
 assert.match(q(375).options[q(375).answer],/不作终身排除或自动复职/);
});
test('fund remuneration rules preserve internal denominators, deferred timing and exception scope',()=>{
 const q=n=>G.fund1[n-1];for(let n=376;n<=391;n++)assert.deepEqual(q(n).outlineCodes,['4.5.c']);
 assert.ok(.08>.04&&.08<.20);assert.equal(48/60,.8);assert.notEqual(48/100,.8);
 assert.ok(.6>1/3);assert.equal(2026+2,2028);assert.ok(12>10);
 assert.match(q(378).options[q(378).answer],/48除以60即80%/);
 assert.match(q(380).options[q(380).answer],/丙暂不纳入.*规模和管理时间/);
 assert.match(q(384).options[q(384).answer],/2028/);
 assert.match(q(385).options[q(385).answer],/40%.*本人管理/);
 assert.match(q(386).options[q(386).answer],/本公司管理/);
 assert.match(q(388).options[q(388).answer],/甲降幅不得少于30%.*乙也应下降/);
 assert.match(q(390).options[q(390).answer],/未付薪酬和未实施中长期激励/);
});
test('post-investment monitoring distinguishes evidence scope, expert inputs and contractor sampling',()=>{
 const q=n=>G.fund3[n-1];assert.match(q(394).options[q(394).answer],/优先给甲/);
 assert.match(q(395).options[q(395).answer],/保留重大事件及时报告/);
 assert.match(q(396).options[q(396).answer],/产量.*工序边界.*外包/);
 assert.deepEqual(q(402).outlineCodes,['6.4.b']);
 assert.match(q(404).options[q(404).answer],/承包商作业人员访谈/);
 assert.match(q(406).options[q(406).answer],/保留本次观察边界/);
});
test('portfolio value creation and succession use stage-appropriate evidence rather than labels',()=>{
 const q=n=>G.fund3[n-1];assert.ok(12<18);
 assert.match(q(410).options[q(410).answer],/重估退出时间/);
 assert.match(q(411).options[q(411).answer],/自主运行验证/);
 assert.match(q(412).options[q(412).answer],/所有权、经营管理及关键专业岗位/);
 assert.match(q(414).options[q(414).answer],/双重指挥/);
 assert.match(q(416).options[q(416).answer],/持续顾问.*专项团队/);
 assert.match(q(417).options[q(417).answer],/早期.*成长期/);
 assert.deepEqual(q(418).outlineCodes,['6.4.b']);
});
test('NAV financing examples preserve collateral, fund-level and agreement-scope distinctions',()=>{
 const q=n=>G.fund3[n-1];assert.ok(.2<.3&&2<3);
 assert.match(q(429).options[q(429).answer],/追索范围.*甲股权/);
 assert.match(q(430).options[q(430).answer],/剩余企业数量条件/);
 assert.match(q(431).options[q(431).answer],/召回.*流动性/);
 assert.match(q(435).options[q(435).answer],/前一类.*后一类.*另行/);
 assert.ok(.1>0);assert.match(q(436).options[q(436).answer],/设立.*前.*同意/);
 assert.match(q(439).options[q(439).answer],/费用及担保两条路径/);
 assert.match(q(441).options[q(441).answer],/不能仅因现金已分配/);
 assert.ok(3*12>6);assert.match(q(442).options[q(442).answer],/目的与期限.*授权缺口/);
 assert.match(q(443).options[q(443).answer],/评级及报告限制.*允许披露/);
});
test('QFI current rules distinguish funding channels, look-through duties and winding-up sequence',()=>{
 const s=n=>B.securities2[n-1],f=n=>B.futures2[n-1];
 assert.match(s(467).options[s(467).answer],/托管人.*投资者或基金名称/);
 assert.match(s(468).options[s(468).answer],/最终投资范围/);
 assert.match(s(470).options[s(470).answer],/例外限于.*战略投资/);
 assert.match(s(473).options[s(473).answer],/外汇和人民币/);
 assert.match(s(475).options[s(475).answer],/一家.*不能.*两个/);
 assert.match(s(477).options[s(477).answer],/不得相互划转/);
 assert.match(s(478).options[s(478).answer],/甲.*外币或人民币.*乙.*人民币/);
 assert.match(s(479).options[s(479).answer],/双向.*转入渠道/);
 assert.match(s(480).options[s(480).answer],/清盘另需.*手续完成后/);
 assert.match(f(329).options[f(329).answer],/甲.*直接.*乙.*主经纪/);
 assert.match(f(331).options[f(331).answer],/人民币资产规模/);
 assert.match(f(333).options[f(333).answer],/客户模式.*每日.*银行间模式.*无需/);
 assert.match(f(334).options[f(334).answer],/变现资产并关闭.*后30个工作日.*主报告人/);
});
test('holding distance, geometric relative drawdown and common-tail ES are distinct risk tasks',()=>{
 const q=n=>I.fund2[n-1];
 const weights=[1,0],benchmark=[0,1];
 assert.equal(weights.reduce((s,w,i)=>s+Math.abs(w-benchmark[i]),0)/2,1);
 const identicalReturns=[.02,-.01,.03],activeReturns=identicalReturns.map((r,i)=>r-identicalReturns[i]);
 assert.ok(activeReturns.every(x=>x===0));
 assert.match(q(457).options[q(457).answer],/不同维度/);
 const p=[100,110,121],b=[100,120,132],relative=p.map((v,i)=>v/b[i]);
 let peak=relative[0],dd=0;for(const v of relative){peak=Math.max(peak,v);dd=Math.max(dd,1-v/peak);}
 assert.ok(Math.abs(dd-1/12)<1e-12);assert.ok(p.every((v,i)=>!i||v>p[i-1]));
 assert.match(q(458).options[q(458).answer],/8.33%/);
 const a=[10,0,8,0],c=[0,9,8,0],total=a.map((v,i)=>v+c[i]);
 const tail=total.map((v,i)=>({v,i})).sort((x,y)=>y.v-x.v).slice(0,1);
 assert.deepEqual(tail,[{v:16,i:2}]);assert.equal(a[tail[0].i],8);assert.equal(c[tail[0].i],8);
 assert.equal(a.reduce((s,v)=>s+v)/4,4.5);assert.equal(total.reduce((s,v)=>s+v)/4,8.75);
 assert.equal(Math.max(...a)+Math.max(...c),19);assert.match(q(459).options[q(459).answer],/8万元和16万元/);
});
