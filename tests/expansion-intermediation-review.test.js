// Independent reconstruction from the reviewed question premises, not eval of author expressions.
import test from 'node:test';
import assert from 'node:assert/strict';
import {EXPANSION_INTERMEDIATION_QUESTIONS as B} from '../src/expansion-intermediation.js';
const q=n=>B.securities1.find(x=>x.id===`securities1-expansion-intermed-${String(n).padStart(4,'0')}`);
test('bank ledger scenarios preserve assets, liabilities and funding-source boundaries',()=>{
 const cases=[[4,1000-300,/300万元.*700万元/],[5,90,/90亿元/],[6,10+20-25,/准备金30，库存5.*存款175/],[8,(98+10)-(100+10),/准备金增加10.*负2/],[9,100-(104-8),/权益变为4.*没有/],[10,(100-20)-(30-20),/总额80、准备10、净额70/],[11,5-(20-15),/权益0.*负债80/]];
 for(const[n,v,re]of cases){assert.equal(q(n).expansionCalculation.expected,v);assert.match(q(n).options[q(n).answer],re);}
 assert.equal(-60,-64+4);assert.match(q(2).options[q(2).answer],/贷款资产减60，存款负债减64，权益增4/);
 assert.equal(50-20,30);assert.equal(100+25,125);assert.equal(200-25,175);
 assert.equal(100-5-15,95-15);assert.match(q(1).options[q(1).answer],/甲减少100万元，乙不变/);
 assert.match(q(20).options[q(20).answer],/银行存款总额不变.*融资公司/);
});
test('risk-weighted and unweighted capital denominators are not interchangeable',()=>{
 assert.equal(5/50,.1);assert.ok(5/150<.04);assert.ok(Math.abs(q(12).expansionCalculation.expected-100*5/150)<1e-10);
 assert.equal((13-10)-(13-12),2);assert.equal(q(14).expansionCalculation.expected,2);
 assert.match(q(14).options[q(14).answer],/实际资本和准备金均不.*增加/);
});
test('central-bank liabilities reconcile fiscal flows, reverse repos and reserve averaging',()=>{
 const cases=[[15,50-30+20,/准备金40.*财政存款30/],[16,100-40,/证券100、准备金60、逆回购负债40/],[17,-100-(-20-50+10),/减少40/],[18,(5*80-100-90-80)/2,/65亿元/]];
 for(const[n,v,re]of cases){assert.equal(q(n).expansionCalculation.expected,v);assert.match(q(n).options[q(n).answer],re);}
 assert.equal((50-30+20)+(20+30-20),70);assert.equal(60+40,100);
 assert.equal(100+90+80+65+65,400);assert.match(q(18).stem,/没有另设每日最低额/);
 assert.match(q(19).options[q(19).answer],/准备金增100，贷款减100，客户存款净变动0/);
});

test('funding allocation and credit models are independently recomputed from distinct premises',()=>{
 const cases=[[21,100*(.05-.04),/1%的内部利差/],[22,100*(50*.02+50*.04*2)/150,/3.33%/],[23,800*.4*.01,/3.2万元/],[26,200*.02-250*.008,/增加2亿元/],[27,120/2,/104.5降至60/],[28,(200-110)/2,/由10升45/],[29,120/130,/0.92倍/],[30,100*50/1500,/3.33%/],[31,100+20,/120万元/],[32,8/100*100,/16%降至8%/],[33,15*.2,/损失3亿元.*资本2亿元/],[34,130-120+10,/甲20万元，乙10万元/]];
 for(const[n,v,re]of cases){assert.ok(Math.abs(q(n).expansionCalculation.expected-v)<1e-10);assert.match(q(n).options[q(n).answer],re);}
 assert.ok(Math.abs((.9+.1*.5)*110-104.5)<1e-10);assert.equal(.5*110,55);assert.equal(120-110,10);
 assert.equal(8-20*.5,-2);assert.equal(5-15*.2,2);assert.equal(130-120,10);
 assert.match(q(24).options[q(24).answer],/不限制合同提现权/);assert.match(q(25).options[q(25).answer],/全存续期资产负债净现值/);
});

test('payment cycles, queue bypass and loss pools follow their explicit noninterchangeable definitions',()=>{
 assert.deepEqual([2-10+8,0-8+10,0-8+8],[0,2,0]);assert.equal(q(35).expansionCalculation.expected,0);assert.match(q(35).options[q(35).answer],/A0、B2、C0/);
 assert.ok(5<8&&5>=3);assert.equal(q(36).expansionCalculation.expected,5-3);assert.match(q(36).options[q(36).answer],/8万元仍排队/);
 assert.equal(q(37).expansionCalculation.expected,(120*2+60)/24);assert.match(q(37).options[q(37).answer],/12.5万元/);
 assert.equal(q(38).expansionCalculation.expected,50-Math.min(45,50*.75));assert.match(q(38).referenceSection,/40.77/);
 assert.equal(q(40).expansionCalculation.expected,900*.02+60);assert.match(q(40).options[q(40).answer],/78万元/);
 assert.match(q(34).stem,/报告日均财务困难/);assert.match(q(39).options[q(39).answer],/80万元持续资金需求/);
});

test('securitisation principal timing, support exhaustion and pool factors are reconstructed independently',()=>{
 const repayments=[[1,20],[2,30],[4,50]],wal=repayments.reduce((s,[t,p])=>s+t*p,0)/100;
 assert.equal(wal,2.8);assert.equal(q(56).expansionCalculation.expected,wal);
 const ioBefore=10/1.05+10/1.05**2,ioAfter=10/1.05,poBefore=100/1.05**2,poAfter=100/1.05;
 assert.ok(ioAfter<ioBefore&&poAfter>poBefore);assert.match(q(57).options[q(57).answer],/IO.*减少.*PO.*增加/);
 let support=20;const pac=[30,25].map(total=>{const planned=Math.min(10,total),toSupport=Math.min(support,total-planned);support-=toSupport;return total-toSupport;});
 assert.deepEqual(pac,[10,25]);assert.equal(q(58).expansionCalculation.expected,pac[1]);
 const principal=1000*(.8-.75),interest=1000*.8*.06/12;assert.ok(Math.abs(principal+interest-54)<1e-10);assert.equal(q(60).expansionCalculation.expected,54);
});
test('covered-bond recovery, dynamic coupons and retention shapes do not double count claims',()=>{
 const residual=100-80,recovery=80+residual*.2;assert.equal(recovery,84);assert.equal(q(62).expansionCalculation.expected,recovery);
 const before=(50*.08+50*.04)/100,after=50*.04/50;assert.equal(before,.06);assert.equal(after,.04);assert.equal(q(65).expansionCalculation.expected,after*100);
 assert.equal(4+2,6);assert.equal(-2+2,0);assert.equal(q(66).expansionCalculation.expected,0);assert.match(q(66).options[q(66).answer],/A本金减2，Z本金增2/);
 const vertical=4*.05,horizontal=Math.min(4,5);assert.equal(vertical,.2);assert.equal(horizontal,4);assert.equal(q(67).expansionCalculation.expected,vertical);assert.match(q(67).options[q(67).answer],/甲0.2.*乙4/);
});
test('prepayment ageing and inverse floater preserve principal bases and interest conservation',()=>{
 const smm=(88-40)/(1000-40)*100,psa=Math.min(.2*20,6)*1.5;
 const current=(6-75*.06)/25*100,next=(6-75*.07)/25*100;
 assert.equal(smm,5);assert.equal(psa,6);assert.equal(current,6);assert.ok(Math.abs(next-3)<1e-9);
 for(const[n,v]of [[68,smm],[69,psa],[70,current]])assert.equal(q(n).expansionCalculation.expected,v);
 assert.ok(Math.abs(75*.07+25*next/100-6)<1e-9);assert.ok(Math.abs(next-current+3)<1e-9);
 assert.equal(80-65,15);assert.equal(80/1000,.08);
 assert.match(q(71).options[q(71).answer],/甲先付B，乙先付A/);
 assert.match(q(72).options[q(72).answer],/15万元损失支持/);
});
test('bond contract cases separate TIPS principal floor, coupons, strips and use-of-proceeds',()=>{
 assert.equal(1040*.02/2,10.4);assert.equal(960*.02/2,9.6);assert.equal(Math.max(1000,960),1000);
 for(const[n,v]of [[73,10.4],[74,9.6],[79,20]])assert.equal(q(n).expansionCalculation.expected,v);
 assert.equal(4*2+1,9);assert.equal(70-50,20);assert.equal(6-3,3);
 assert.match(q(74).options[q(74).answer],/本金1000.*9.60/);
 assert.match(q(77).options[q(77).answer],/买齐最后一期票息组件/);
 assert.match(q(80).options[q(80).answer],/不能重复认领/);
 assert.match(q(81).options[q(81).answer],/先赎回后测试/);
});
test('syndicate groups and borrowing-base cash conversions retain separate eligibility constraints',()=>{
 const cases=[[86,20*.4],[89,25/100>.2?100:25],[90,(100-20)*.8-(70-20)],[91,50*.8-40*.5]];
 for(const[n,v]of cases)assert.equal(q(n).expansionCalculation.expected,v);
 assert.equal(500*.4,200);assert.equal(100*.8-70,10);assert.equal(14-10,4);
 assert.equal([2,1,1].filter(n=>n===1).length,2);assert.ok(12-2>=8&&12-2<20);
 assert.match(q(87).options[q(87).answer],/美元和欧元两组/);
 assert.match(q(93).options[q(93).answer],/原100天/);
 assert.match(q(94).options[q(94).answer],/乙触及.*甲不能/);
 assert.match(q(95).options[q(95).answer],/担保权不因此自动解除/);
});
test('leasing and repo retain distinct user, owner, income and principal obligations',()=>{
 assert.match(q(96).options[q(96).answer],/拒绝受领.*及时通知/);
 assert.match(q(97).options[q(97).answer],/甲.*不当然停止.*乙.*减免/);
 assert.match(q(100).options[q(100).answer],/甲归出租人.*乙.*承租/);
 assert.match(q(103).options[q(103).answer],/甲仍.*乙不/);
 assert.match(q(104).options[q(104).answer],/同一ISIN/);
 assert.match(q(107).options[q(107).answer],/30天后.*不再/);
 assert.match(q(108).options[q(108).answer],/另行取得.*证券/);
 assert.match(q(109).options[q(109).answer],/仍为100/);
 const repurchase=101-2-.01;assert.ok(Math.abs(repurchase-98.99)<1e-9);assert.ok(Math.abs(q(110).expansionCalculation.expected-repurchase)<1e-9);
 const trades=[[3,10],[4,60],[5,20],[6,10]],total=trades.reduce((s,[,v])=>s+v,0);let cumulative=0;const median=trades.find(([,v])=>(cumulative+=v)>=total/2)[0];
 assert.equal(median,4);assert.equal(trades.reduce((s,[r,v])=>s+r*v,0)/total,4.3);assert.match(q(111).options[q(111).answer],/^4%/);
});
