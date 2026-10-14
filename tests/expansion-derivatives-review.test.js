// Independent reconstruction from the visible, reviewed first-batch stems.
// Deliberately do not evaluate the author's expression strings.
import test from 'node:test';
import assert from 'node:assert/strict';
import {EXPANSION_DERIVATIVES_QUESTIONS as B} from '../src/expansion-derivatives.js';
const call=(s,k)=>Math.max(s-k,0),put=(s,k)=>Math.max(k-s,0);
const cases={
 options:[
 [3,.09*12000-.1*10000,/多付80/,['0.09','12000','0.10','10000']],
 [4,put(2.72,2.8)*5000,/400元/,['5000','2.80','2.72']],
 [7,5-3,/2张/,['已成交3张','总量改为5张']],
 [9,(.12*2+.14*3)*10000,/6600/,['0.12','2张','0.14','3张']],
 [10,-.02,/−0.02/,['净收入至少0.02']],
 [14,(.21*2+.24*2-.2*4)*10000+20,/1020/,['0.20','0.21','0.24','全单费用20']],
 [15,.27-.3,/净亏0.03.*0.20/,['0.27','0.30']],
 [17,Math.floor(2500/820),/3张/,['2500','800','每张开平双边合计费用20']],
 [24,6000-4000,/\+2000.*10000/,['+6000','−4000']],
 [27,(.212-.2)/(.02),/^0.6$/,['2.99','3.01','0.200','0.212']],
 [28,.6*(10*.01),/0.06/,['0.6','10元','1%']],
 [38,.04/.01,/4元/,['0.04','1个百分点']],
 [43,100+3-98,/行权价98、保费3/,['100元','5元','不超过3元']],
 [44,98+2-(100+4),/^−4$/,['成本100','认沽费4','行权价98','分红2']],
 [47,Math.min(5,4.5)+.1-5,/4.60.*5元/,['成本5元','4.50','0.10']],
 [48,2*12500,/2张调整/,['25000','1500','12500','750']],
 [52,[80,100,130].reduce((n,s,i)=>n+[.2,.6,.2][i]*(call(s,100)+put(s,100)-12),0),/^−2$/,['成本12','80概率20%','100概率60%','130概率20%']],
 [55,call(100,90)-2*call(100,100)+call(100,110)-3,/前者\+7，后者−3/,['90和110','卖100','成本3']],
 [56,call(150,90)-2*call(150,100)+call(150,120)-3,/毛价值.*−10/,['90和120','卖100','净支付3']],
 [57,put(101,90)-put(101,95)-call(101,105)+call(101,110)+2,/盈利2/,['90认沽','95认沽','105认购','110认购','S=101']],
 [63,-Math.min(-2000+800,1500-1000),/1200/,['亏2000','赚800','赚1500','亏1000']],
 [67,20-5,/15万元/,['20万元','T+1','18万元','5万元']],
 [69,5-8,/−3元/,['实值5元','8元费用']],
 [70,call(100.8,100),/^0.8$/,['100.8','行权价100']],
 ],
 futures1:[
 [6,1-(.5*(-2)**2+.5*2**2)/(.5*(-10)**2+.5*10**2),/100降至4.*96%/,['−10或+10','−2或+2']],
 [7,2000*10-2*10000,/相等.*20000/,['每手10吨','每手10000千克','2000','报价2']],
 [9,100+10,/110手/,['各开10手','100手']],
 [13,3*50/10,/15手/,['3手','每手50吨','每手10吨']],
 [15,(104-105)*50*10,/扣减500/,['临时价105','更正为104','50手','乘数10']],
 [16,99-100,/昨结算100.*下降1/,['结算价100','收盘98','结算99']],
 [17,11.9-10-3,/亏损1.1/,['期初权益10','期末11.9','入金3']],
 [19,(12+1-11)-(12-8),/从4万元降至2万元.*减少2/,['12万元','8万元','盈利1万元','11万元']],
 [25,(4000-50)-(4000-120),/70元/,['4000','−50','−120']],
 [31,500*.8/25,/16手/,['500万元','25万元','80%']],
 [35,6-3-2-2,/亏1元/,['毛收益6','手续费3','滑点2','融资成本2']],
 [43,put(480,500),/500−480=20/,['执行价500','期货480','现货490']],
 [44,2000-60,/1940/,['行权价2000','保险费60']],
 [49,(2000*5/10000)/(1000*5/10000),/两倍/,['市值1000','市值2000','久期5']],
 [50,(100+3*2)-(103+1*2),/105低于现粮106/,['现粮每吨100元','凭证103元','每月收费1元','每月储存费3元','两个月后']],
 [56,100-100,/总量不变/,['增加100','减少100','无生产']],
 [64,100-100*.2,/80万元/,['100万元','折扣20%']],
 ],
};
test('first 150 derivatives questions: 41 encoded calculations independently reconstructed from their displayed premises',()=>{
 let count=0;
 for(const [s,checks] of Object.entries(cases))for(const [n,computed,display,premises] of checks){
  const q=B[s].find(q=>q.id===`${s}-expansion-deriv-${String(n).padStart(4,'0')}`);
  assert.ok(q,q?.id);for(const token of premises)assert.ok(q.stem.includes(token),`${q.id}: ${token}`);
  assert.ok(Math.abs(computed-q.expansionCalculation.expected)<1e-8,`${q.id}: ${computed}`);
  assert.match(q.options[q.answer],display,q.id);count++;
 }
 assert.equal(count,41);
 assert.equal(Object.values(B).flat().filter(q=>Number(q.id.slice(-4))<=75&&q.expansionCalculation).length,41);
});
test('derivatives constraint choices and payoff regions are independently checked',()=>{
 const candidates=[[96,2],[98,3],[100,4]];
 assert.deepEqual(candidates.filter(([k,p])=>100+p-k<=5&&p<=3),[[98,3]]);
 const coverageChoices=[[2,10000,600],[3,10000,600],[2,12500,750]];
 assert.deepEqual(coverageChoices.filter(([n,u,p])=>n*u===25000&&n*p<=1500),[[2,12500,750]]);
 const butterfly=s=>call(s,90)-2*call(s,100)+call(s,110)-3;
 assert.equal(butterfly(100),7);assert.equal(butterfly(120),-3);
 const asymmetric=s=>call(s,90)-2*call(s,100)+call(s,120)-3;
 for(const s of [120,130,150,200])assert.equal(asymmetric(s),-13);
 assert.equal(Math.min(-2000+800,1500-1000),-1200);
 assert.equal(20-5,15); // T+1 receipts cannot finance T when prepayment/netting prohibited.
});

// Batch B: arithmetic reconstructed from question premises, never eval(author expression).
const secondChecks={
 options:[
 [77,2*10-(14+4),/净收2/,['14','10','4']],
 [82,(20-0)/(120-80)*100-40,/0.5.*借入40/,['120','80','K=100']],
 [92,Math.sqrt(((.2**2*.5)+(.3**2*1))/2/.75),/0.02.*0.09/,['半年','20%','一年30%','0.75']],
 [94,20-(2*2+4*4),/A两份、B四份/,['Gamma=6','Vega=20','(1,2)','(1,4)']],
 ],
 futures1:[
 [77,(110-100)*.95,/9.5元/,['100','110','0.95']],
 [79,(100+5)*1.04,/109.2/,['100元','5元','预付','1.04']],
 [80,100*.01,/多1元/,['赚100','亏100','1%']],
 [81,(-3-5)*10,/亏80/,['每手10','5元','−3元']],
 [83,.5-2,/−1.5/,['亏2万元','0.5万元']],
 [94,1000-600,/400吨/,['1000吨','600吨']],
 [98,(101-100.8)-(99-98.5),/A.*0.2.*0.5/,['101','100.8','99','98.5']],
 [99,76/.95,/80元/,['76元','0.95']],
 [100,(102*.98+1.2)*(1000000/100),/1011600/,['102','0.98','1.2','100万元']],
 [104,1000000*(.06-.04)/2/(1+.06/2),/9708.74/,['100万元','半年','6%','4%']],
 [107,Math.max(-.01,0)+.01+.03+.01,/5%/,['max(L,0)+1%','3%','L=−1%']],
 [113,1.2*7,/8.40/,['1.20美元','7.00人民币']],
 [114,1.25-40/10000,/1.2460/,['1.2500','−40','0.0001']],
 [115,1.249-50/10000,/1.2440/,['1.2490','−50','0.0001']],
 [123,[10,-10].reduce((a,v)=>a+Math.max(v,0)/2,0),/5万元/,['等概率','+10','−10']],
 [125,[[10,-10],[-10,10]].reduce((a,v)=>a+Math.max(v[0]+v[1],0)/2,0),/^0万元$/,['同一净额组','等概率']],
 [126,Math.max(70-90,0),/^0万元$/,['70万元','90万元']],
 [127,Math.max(65-20,0)-30,/15万元/,['20万元','65','30']],
 [132,100*(1-.1)-80*(1-.25),/30万元/,['100万元','10%','80万元','25%']],
 ]
};
test('second derivatives batch: 23 distinct calculations reconstructed independently',()=>{
 let count=0;
 for(const[s,checks]of Object.entries(secondChecks))for(const[n,computed,display,premises]of checks){
 const q=B[s].find(q=>q.id===`${s}-expansion-deriv-${String(n).padStart(4,'0')}`);
 for(const p of premises)assert.ok(q.stem.includes(p),`${q.id}: ${p}`);
 assert.ok(Math.abs(computed-q.expansionCalculation.expected)<1e-8,q.id);
 assert.match(q.options[q.answer],display,q.id);count++;
 }
 assert.equal(count,23);
 for(const s of [0,79,90,95,100,105,110,150])assert.ok(call(s,90)-2*call(s,100)+call(s,110)>=0);
 assert.equal(.5*120-40,20);assert.equal(.5*80-40,0);
 assert.equal(6-2-4,0);assert.equal(20-2*2-4*4,0);
 assert.ok(Math.abs((1.2-.9)/(1.1-.9)-1.5)<1e-12);
});

test('third derivatives checkpoint: independent six calculation reconstructions',()=>{
 const checks=[
 [156,1000*1.4-1000*.8,/600万元/,['1000万元Beta为1.4','1000万元Beta为0.8']],
 [159,110*.1,/11万元/,['100升至110万元','第二季股价回报10%']],
 [160,(102-2)/10,/10手/,['毛重102吨','包装重2吨','每手交付10吨']],
 [161,100-100*.2,/80吨/,['湿货100吨','含水率20%']],
 [163,3+2-4,/至少需5天.*短1天/,['运输3天','检验2天','仅4天']],
 [164,(100-20)-(50-15),/45吨/,['登记100吨','提货20吨','50吨质押','解除其中15吨']],
 ];
 for(const[n,v,r,parts]of checks){const q=B.futures1[n-1];for(const p of parts)assert.ok(q.stem.includes(p),q.id);assert.equal(q.expansionCalculation.expected,v);assert.match(q.options[q.answer],r,q.id);}
});

test('fourth derivatives checkpoint: thirteen independently reconstructed calculations',()=>{
 const checks=[
 [171,(5*100-90+110)/5,/104/,['5日','100','90','110']],
 [172,.25*108+.75*100,/102/,['0.25','0.75','100','108']],
 [179,100-100/(1+.8/.2),/80/,['0.8','0.2']],
 [181,100*(98-80)/(100-80),/K为90/,['80至100','收盘98']],
 [184,Math.max(112-109,Math.abs(112-100),Math.abs(109-100)),/12/,['昨收100','最高112','最低109']],
 [185,(100+110*9)/10-108,/109.*低1/,['100元1手','110元9手','108元']],
 [187,20+100+10-85-25,/20/,['库存20','产量100','进口10','使用85','出口25']],
 [188,(100-10)*6,/540/,['100万公顷','10万公顷','6吨']],
 [189,22/125*100,/17.6%/,['20升至22','100升至125']],
 [191,30+12-2-8,/32万吨/,['30万吨','新销售12','取消2','装运8']],
 [199,100-80,/多贡献20/,['收入100','成本80','固定成本30']],
 [200,.5*120*2+.5*80*3,/240万元/,['各半','120吨','80吨']],
 [202,.9*1.03*100,/92.7%/,['下降10%','增加3%']],
 ];
 for(const[n,v,r,parts]of checks){const q=B.futures1[n-1];for(const p of parts)assert.ok(q.stem.includes(p),`${q.id}: ${p}`);assert.ok(Math.abs(q.expansionCalculation.expected-v)<1e-8,q.id);assert.match(q.options[q.answer],r,q.id);}
 assert.equal(B.futures1.slice(170,202).filter(q=>q.expansionCalculation).length,13);
});

test('fifth derivatives checkpoint: eight option calculations and payoff equivalence',()=>{
 const checks=[
 [101,Math.max(20,(.6*0+.4*40)/1.05),/价值20/,['K=100','当前标的80','1.05','0.6']],
 [103,(5-.2)-(4.75-.05),/4.80.*4.70/,['5元','0.20','4.75','0.05']],
 [104,Math.max(50*50+700-3000,0),/200元/,['50股','700元','3000元']],
 [108,4-(9.8-6),/3.8.*0.2/,['净付4','净收6','现价9.8']],
 [111,(16-10)-((12-10)+(13-10)),/遗漏1/,['价值10','价值12','价值13','价值16']],
 [112,(5.5-2*5+4.6)/1**2,/0.10/,['99、100、101','4.60、5.00、5.50']],
 [115,.5*100+.2*110-.2*100-.5*100,/赚2/,['卖空0.5股','卖空0.2股','买回0.2股']],
 [116,.04+4/1000,/0.044/,['1000','0.04','−4']],
 ];
 for(const[n,v,r,parts]of checks){const q=B.options[n-1];for(const p of parts)assert.ok(q.stem.includes(p),`${q.id}: ${p}`);assert.ok(Math.abs(q.expansionCalculation.expected-v)<1e-8,q.id);assert.match(q.options[q.answer],r,q.id);}
 assert.equal((.6*100+.4*60)/1.05,80); // Risk-neutral stock values also consistent.
 for(const s of[0,90,100,105,110,120,200])assert.equal(call(s,100)-call(s,110),-Math.max(110-s,0)+Math.max(100-s,0)+10);
 const backspread=s=>2*Math.max(90-s,0)-Math.max(100-s,0)+2;
 assert.equal(backspread(90),-8);assert.equal(backspread(0),82);
 for(let s=0;s<=200;s++)assert.ok(backspread(s)>=-8);
 assert.equal(Math.abs(220-100)-120,0);assert.ok(Math.abs(0-100)-120<0);
});

test('sixth derivatives checkpoint: seven calculations reconstructed from contracts',()=>{
 const checks=[
 [207,6-(2+3),/复制成本5低于Z报价6/,['X=2','Y=3','Z=6']],
 [208,(2*100-4*40)/40,/再买1手A/,['分别40和100','买2个组合']],
 [209,50+4,/54/,['50','显示4']],
 [211,80*(1-.4)-40,/8万元/,['80万元','40%','现金40万元','折扣10%']],
 [212,(7.2-7)*1000000/7.2,/27777.78/,['100万美元','7.00','7.20']],
 [214,(30*4-20*3.5)/10,/5%/,['30天','前20天','3.5%']],
 [215,(4*3+5)/4,/4.25%/,['3天','1天']],
 ];
 for(const[n,v,r,parts]of checks){const q=B.futures1[n-1];for(const p of parts)assert.ok(q.stem.includes(p),`${q.id}: ${p}`);assert.ok(Math.abs(q.expansionCalculation.expected-v)<1e-8,q.id);assert.match(q.options[q.answer],r,q.id);}
 // Independent feasibility: minimum cash48 with issuer32, haircut-adjusted availability90.
 assert.equal(48+32,80);assert.equal(32/80,.4);assert.ok(32<=100*.9);
 assert.ok(47/(1-.4)<80); // Less than48 cash cannot reach80 under issuer cap.
});

test('seventh derivatives checkpoint: twelve independent calculations and execution constraints',()=>{
 const checks=[
 [220,1+1,/2手/,['99元1手','98元1手','97元10手']],
 [222,20-7,/13手/,['总量20手','累计成交7手']],
 [223,5*6/10,/3手/,['甲6手','乙4手','新来5手']],
 [224,101-98,/净支付3，最多3组/,['101有8手','98有3手']],
 [228,9/(100*1.8),/5%/,['本金100','1.80','现值为9']],
 [230,30*10/30,/10bp/,['30天','剩余10天','30bp']],
 [232,100-100.4,/−0.40%/,['100.40']],
 [233,Math.round(((1244+1245)/2)/10)/100,/1.24%/,['1.244%','1.245%']],
 [234,(.3-.8+1)-(.5-.8+.2),/B.*0.50.*−0.10/,['0.30和0.50','1.00和0.20']],
 [235,2*100-3*102+106,/2、−3、1/,['1、2、4个月','100、102、106']],
 [237,(100-40)*(1-.25),/45万元/,['100万元','40万元','25%']],
 [238,10+2-12,/合计价值仍为12/,['现值12','现值10','现金2']],
 ];
 for(const[n,v,r,parts]of checks){const q=B.futures1[n-1];for(const p of parts)assert.ok(q.stem.includes(p),`${q.id}: ${p}`);assert.ok(Math.abs(q.expansionCalculation.expected-v)<1e-8,q.id);assert.match(q.options[q.answer],r,q.id);}
 assert.equal(Math.min(8,3),3);assert.equal(2-3+1,0);assert.equal(2*1-3*2+4,0);
 assert.ok(1/7.1<1/7);assert.equal(10-2,8); // Reciprocal bid/ask and DV01-matched steepener.
 assert.equal(B.futures1.slice(218,239).filter(q=>q.expansionCalculation).length,12);
});

test('eighth derivatives checkpoint: eleven independent calculations and option identities',()=>{
 const checks=[
 [240,(5-3)-5+5,/合计净收2/,['买入价3','结算价5','已收2']],
 [241,(4-3)*100,/支付100元/,['由4降至3','乘数100']],
 [242,.96*(105-100),/4.80/,['F=105','K=100','0.96']],
 [244,1000*.5*(Math.max(.02-.04,0)+Math.max(.06-.04,0)),/10万元/,['1000万元','2%、6%']],
 [248,1000*3*(.036-.03),/18万元/,['3%','3.6%','1000万元']],
 [250,(150+150+0)/3-90,/至少为10/,['均为150','不低于0']],
 [253,Math.max(95-90,0)-(Math.max(95-100,0)-Math.max(90-100,0)),/付5.*相减只得0/,['A=95','B=90']],
 [254,100*.4/20,/卖4手A、买2手B/,['100单位','0.4','每手10单位','每手20单位']],
 [257,100*(1-.4),/60万元/,['拍卖价40%','100万元','55%']],
 [258,12-8,/买方向卖方支付4万元/,['现值12万元','现值8万元']],
 [261,1000*(1-2/100),/980万元/,['1000万元','100个成分','2个']],
 ];
 for(const[n,v,r,parts]of checks){const q=B.futures1[n-1];for(const p of parts)assert.ok(q.stem.includes(p),`${q.id}: ${p}`);assert.ok(Math.abs(q.expansionCalculation.expected-v)<1e-8,q.id);assert.match(q.options[q.answer],r,q.id);}
 for(const L of[-.01,0,.03,.05,.1])assert.ok(Math.abs(Math.max(L-.04,0)-Math.max(.04-L,0)-(L-.04))<1e-12);
 assert.ok(8*.95<8*.98);assert.equal(100*.4-4*10,0);assert.equal(-100*.4+2*20,0);
 for(const[a,b]of[[1,9],[4,4],[.01,100]]){const A=(a+b)/2,G=Math.sqrt(a*b);for(const K of[0,2,10]){assert.ok(call(A,K)>=call(G,K));assert.ok(Math.max(K-A,0)<=Math.max(K-G,0));}}
 assert.equal(B.futures1.slice(239,261).filter(q=>q.expansionCalculation).length,11);
});

test('ninth derivatives checkpoint: eleven independent calculations and data-field constraints',()=>{
 const checks=[
 [265,90-83,/\(0,7\)/,['昨高100昨低90','今高104今低83']],
 [268,95+(97-95)/2*4,/颈线为99/,['t=0,95','t=2,97','t=4收盘98']],
 [269,120-(120-80)*.618,/95.28/,['80到120','61.8%']],
 [272,Math.max(110-105,100-90),/^10；/,['A=110、B=105','A=100、B=90']],
 [274,2*1+1*8,/共10元/,['昨仓2手','今仓4手','平昨每手1元','平今每手8元']],
 [275,9-6,/3手/,['100元累计6手','101元累计9手']],
 [278,6+6-10,/需求合计12万元/,['可用10万元','保证金6万元']],
 [279,10-3,/仍缺7万/,['库存120万','可提取3万','需10万']],
 [280,10*4,/5份A加10份B/,['24小时各需5MW','4个峰时小时各多需10MW']],
 [281,1000000*.002-2500,/买方收500元/,['名义100万元','0.2%','2500元']],
 [282,10*.9*.95,/8.55万元/,['10万元','0.90','0.95']],
 ];
 for(const[n,v,r,parts]of checks){const q=B.futures1[n-1];for(const p of parts)assert.ok(q.stem.includes(p),`${q.id}: ${p}`);assert.ok(Math.abs(q.expansionCalculation.expected-v)<1e-8,q.id);assert.match(q.options[q.answer],r,q.id);}
 assert.deepEqual([100,Math.max(110,108),Math.min(90,95),98],[100,110,90,98]);
 assert.ok(95>90&&95<100);assert.equal(104-99,5);assert.ok(104>=100&&104<=105&&99>=98&&99<=100);
 assert.equal(5*24+10*4,160);assert.equal(B.futures1.slice(261,284).filter(q=>q.expansionCalculation).length,11);
});

test('replacement cases distinguish two-level assignment and unchanged-value rating triggers',()=>{
 const a=B.options[61],q=B.futures1[138];
 assert.match(a.stem,/先进先出/);assert.equal(Math.min(40,50),40);assert.match(a.options[a.answer],/甲分到40张，乙此次为0张/);
 assert.equal(Math.max(60-0,0)-40,20);assert.equal(q.expansionCalculation.expected,20);
 assert.match(q.stem,/正敞口一直为60万元/);assert.match(q.options[q.answer],/追加20万元.*门槛触发/);
});

test('opening basket and exercised open interest use their defined counting bases',()=>{
 const a=B.options[118],b=B.options[121];
 assert.equal((110+90)/2,100);assert.equal((100+90)/2,95);
 assert.equal(a.expansionCalculation.expected,100);assert.match(a.options[a.answer],/^100/);
 assert.equal(100-20,80);assert.equal(b.expansionCalculation.expected,80);assert.match(b.options[b.answer],/80张/);
});

test('COT aggregation and delivery tail calculations preserve reporting and physical units',()=>{
 const checks=[[285,1000*(.6-.4),/200手/],[286,(1000-800)-(1000-750),/多头200、空头250/],[288,70-50,/多头剩余20/],[291,1000-80*10,/200万元/],[292,100-99.2,/时间选择权/]];
 for(const[n,v,re]of checks){const q=B.futures1[n-1];assert.ok(Math.abs(q.expansionCalculation.expected-v)<1e-8,q.id);if(n!==285)assert.match(q.options[q.answer],re);}
 assert.equal(Math.min(70,50),50);assert.ok(106>=90&&106<=110&&106>103);assert.ok(106+.1>105);
});

test('centered hedge regression is not the reciprocal reverse regression',()=>{
 const f=[-1,0,1],s=[-1,1,0],dot=(a,b)=>a.reduce((v,x,i)=>v+x*b[i],0);
 assert.equal(f.reduce((a,b)=>a+b,0),0);assert.equal(s.reduce((a,b)=>a+b,0),0);
 const hedge=dot(s,f)/dot(f,f),reverse=dot(s,f)/dot(s,s);
 assert.equal(hedge,.5);assert.equal(1/reverse,2);
 const error=h=>s.reduce((v,x,i)=>v+(x-h*f[i])**2,0);
 assert.equal(error(hedge),1.5);assert.equal(error(1/reverse),6);
 // The covariance/variance expression requires the centered premise (or an intercept).
 assert.match(B.futures1[94].stem,/中心化/);
});
test('natural revenue hedge, index trigger, vega units and reset dates are independent calculations',()=>{
 const h=(90*120-120*80)/40;
 assert.equal(h,30);assert.equal(9600+20*h,10800-20*h);
 const expected=[h,100*Math.max(100-90,0),(10000/40)*(625-400),(100+900)/2];
 for(let i=0;i<4;i++)assert.equal(B.futures1[293+i].expansionCalculation.expected,expected[i]);
 assert.equal(100*Math.max(100-110,0),0);assert.equal((10+30)/2,20);assert.notEqual(Math.sqrt(500),20);
 assert.ok(Math.abs(1000*(96/80-1)-B.options[122].expansionCalculation.expected)<1e-8);
 assert.match(B.options[122].options[B.options[122].answer],/^200元$/);
 assert.match(B.futures1[296].options[B.futures1[296].answer],/K甲=500，K乙=20/);
});

test('SSE current operational cases reconstruct quantities without changing contract units',()=>{
 const q=n=>B.options[n-1];
 const checks=[[126,Math.min(7-3,9-2)-2,2],[129,4*(1-.02),3.92],[138,5000+Math.max(.18,.12)*10000,6800],[143,100-70,30],[144,6+2+3,11]];
 for(const[n,v,w]of checks){assert.ok(Math.abs(v-w)<1e-9);assert.ok(Math.abs(q(n).expansionCalculation.expected-v)<1e-9,q(n).id);}
 assert.equal(5*12000,6*10000);assert.notEqual(12000,10000);assert.notEqual(5,6);
 assert.equal(10000-8000,2000);assert.equal(10000-6000,4000);assert.equal(10000+2000,12000);
 assert.equal(Math.max(3-4,0),0);assert.equal(5-Math.max(4-3,0),4);
 assert.match(q(132).options[q(132).answer],/不能用于新备兑/);
 assert.match(q(134).options[q(134).answer],/4张备兑.*无保证金/);
});
test('SSE operation guards distinguish contract halt, market stop, and delayed activation',()=>{
 const q=n=>B.options[n-1];
 assert.match(q(128).options[q(128).answer],/无效.*重新/);
 assert.match(q(136).options[q(136).answer],/整笔无效/);
 assert.match(q(137).options[q(137).answer],/不能重构.*跨式尚存续/);
 assert.match(q(140).options[q(140).answer],/尚未开放/);
 assert.match(q(141).stem,/调整.*日终持仓已归零/);
 assert.match(q(141).options[q(141).answer],/次日摘牌/);
 assert.match(q(145).options[q(145).answer],/手动、客户自设、券商默认/);
});
test('covered-call recovery cap includes the cost of buying back the written option',()=>{
 const q=B.options[46];assert.match(q.rationales[1],/内在价值0.50.*0.10.*不足/);
 assert.ok(Math.abs(call(5,4.5)-.1-.4)<1e-9);
 for(const s of [0,4,4.5,5,50])assert.ok(s-call(s,4.5)+.1-5<=-.4+1e-9);
});
