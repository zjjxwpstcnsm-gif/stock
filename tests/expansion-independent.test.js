// Independent checks built from the visible authored scenarios, not from author-supplied expected metadata.
// These assertions protect reviewed cases; they do not certify unreviewed questions or the whole bank.
import test from 'node:test';
import assert from 'node:assert/strict';
import {EXPANSION_INVESTMENT_QUESTIONS as BANK} from '../src/expansion-investment.js';
const get=n=>{
 const id=`fund2-expansion-invest-${String(n).padStart(4,'0')}`;
 const q=BANK.fund2.find(x=>x.id===id);
 assert.ok(q,id);return q;
};
const selected=n=>{const q=get(n);return q.options[q.answer];};
const within=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<=t,`${a} != ${b}`);

test('investment numerical answers agree with independent visible-stem arithmetic',()=>{
 const cases=[
  [5,(200+50)/(100+50),1.6666666666666667,['200万元','100万元','50万元'],/由2降至约1\.67/],
  [7,1200/((100+300)/2),6,['1200万元','100万元','300万元'],/^6次$/],
  [8,600/200,3,['600万元','200万元'],/^3次$/],
  [10,90/30,3,['90万元','30万元','EBIT'],/^3倍$/],
  [13,80/((600+1000)/2)*100,10,['80万元','600万元','1000万元'],/^10%$/],
  [22,108/1.1,98.18181818181817,['100万元','108万元','10%'],/98\.18万元/],
  [24,110.24/(1.04*1.06),100,['110.24万元','4%','6%'],/^100万元$/],
  [25,[-2,1,3,4,80].sort((a,b)=>a-b)[2],3,['−2%','1%','3%','4%','80%'],/中位数3%/],
  [26,.8*2+.2*(-18),-2,['80%','2%','20%','−18%'],/^−2%和2%$/],
  [27,Math.sqrt(.0004)*100,2,['0.0004'],/^2%$/],
  [28,Math.sqrt(((-1-1)**2+(3-1)**2)/(2-1)),Math.sqrt(8),['−1%','3%','n−1'],/^2\.83%$/],
  [38,6/.08,75,['永久每年末支付6元','8%','无赎回和转换'],/^75元$/],
  [72,20-(5+10),5,['20%','5%','10%','其余锁定'],/15%.*5个百分点/],
 ];
 for(const [n,computed,expected,premises,label] of cases){
  const q=get(n);within(computed,expected);
  for(const s of premises)assert.ok(q.stem.includes(s),`${q.id}: ${s}`);
  assert.match(selected(n),label,q.id);
 }
 // The wrong arithmetic-average distractor is numerically correct but not the requested robust location.
 within((-2+1+3+4+80)/5,17.2);
 assert.ok(get(25).options.includes('算术均值17.2%'));
});

test('negative equity, z-scores, and discount timing preserve economic and unit interpretation',()=>{
 within(-20/-100*100,20);
 assert.match(get(16).stem,/平均净资产为−100万元.*净亏损20万元/);
 assert.match(selected(16),/负权益.*另查偿债/);
 assert.match(selected(17),/资产周转率分母.*平均资产/);
 assert.match(get(23).stem,/同一正折现率/);
 assert.match(selected(23),/更高.*提前一年/);
 within((10-6)/2,2);within((12-8)/4,1);
 assert.match(selected(30),/甲为2，乙为1/);
 within(120/(1.1**2),99.17355371900825);
 assert.match(selected(36),/除以1\.1的平方/);
 assert.match(get(45).stem,/付息频率.*相同|同.*付息频率/);
 assert.match(get(45).stem,/无.*含权|不含.*期权|无.*期权/);
 assert.match(get(46).stem,/不违约/);
});

test('normal-tail, CAPM gap and VaR backtest calculations are recomputed independently',()=>{
 const z=(2-6)/4;within(z,-1);
 // Abramowitz-Stegun erf approximation, independent of supplied CDF value.
 const erf=x=>{const s=Math.sign(x);x=Math.abs(x);const t=1/(1+.3275911*x);return s*(1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-x*x));};
 const probability=.5*(1+erf(z/Math.SQRT2))*100;
 within(probability,15.8655254,.00001);
 assert.match(selected(29),/^15\.87%$/);
 within(6-9,-3);
 assert.match(selected(58),/回报低于必要回报.*价格可能偏高/);
 within(250*(1-.99),2.5);
 within(20/250*100,8);
 assert.match(get(76).stem,/250.*20次/);
 assert.match(selected(76),/检验超限频率.*模型和数据/);
});

test('reviewed fund mapping fixes reflect the task actually asked',()=>{
 assert.deepEqual(get(19).outlineCodes,['3.2.a']); // cash-flow analysis, not an allegation of fraud
 assert.deepEqual(get(29).outlineCodes,['3.4.b']); // explicitly normal CDF
 assert.deepEqual(get(30).outlineCodes,['3.4.a']); // general standardization, not normality
});

test('securities numerical cases use the visible cash-flow, shares and voting bases',()=>{
 const q=n=>BANK.securities1.find(x=>x.id===`securities1-expansion-invest-${String(n).padStart(4,'0')}`);
 const selected=n=>{const x=q(n);return x.options[x.answer];};
 const cases=[
  [4,800*10,8000,['800万股新股','200万股老股','每股10元'],/^8000万元$/],
  [15,100/(1000*(1+1/5))*100,8.333333333333334,['1000万股','100万股','每5股配1股','甲放弃认购'],/8\.33%/],
  [17,40/400*100,10,['实际发行在外400万股','40万股'],/^10%$/],
  [26,120-10-20,90,['120万元','服务费10万元','利息20万元'],/^90万元$/],
  [42,(100*10+200*9.8)/300,9.866666666666667,['10元有100股','9.8元有200股','卖出300股'],/^9\.87元$/],
 ];
 for(const[n,result,want,premises,pattern]of cases){within(result,want);for(const p of premises)assert.ok(q(n).stem.includes(p),`${q(n).id}: ${p}`);assert.match(selected(n),pattern);}
 within(10/(10+90)*100,10);within((10*5)/(10*5+90)*100,35.714285714285715);
 assert.match(q(16).stem,/A类10万股.*B类90万股.*A类每股5票.*B类每股1票/);
 assert.equal(selected(16),'10%和35.71%');
 within(-2/4,-.5);within(-2/8,-.25);assert.match(selected(38),/负分子.*增加波动.*比率变高/);
 // Difference holds for any positive starting capital sufficient to make both withdrawals.
 for(const capital of[100,200,1000])within(((capital*1.2-10)*.8-10)-((capital*.8-10)*1.2-10),4);
 assert.match(selected(39),/下跌后提款.*随后上涨/);
 assert.match(q(34).stem,/无抵押.*无其他合约净额抵销/);
 assert.match(q(41).stem,/多头100万元、空头100万元/);
});

test('second investment batch preserves visible cash-flow, fee and probability arithmetic',()=>{
 const cases=[
  [86,Math.max(104-100,0)-6,-2,['104元','100元','6元','忽略交易费'],/行权取回4元.*亏2元/],
  [88,100*(-.03)+2-1,-2,['100万元','跌3%','分红2万元','融资付款1万元'],/^支付2万元$/],
  [91,100+40-60+10,90,['现金100万元','净流入40万元','净流出60万元','净流入10万元'],/90万元.*60万元/],
  [96,110/.06,1833.3333333333335,['价值=稳定净营运收入/资本化率','100升至110万元','5%升至6%'],/2000降至约1833万元/],
  [105,(1200/1000-1)*100,20,['1000点到1200点','500点到750点'],/甲20%、乙50%/],
  [116,2*Math.max(1000*.001,5),10,['总额2000元','每笔按0.1%','至少5元','两笔各1000元'],/一笔5元、两笔合计10元/],
  [124,(-6)/(-10)*100,60,['基金收益−6%','基准−10%'],/跌幅是基准的60%.*并非取得正收益/],
  [137,.9*.9*100,81,['各有90%','相互独立'],/同时达成为81%/],
 ];
 for(const[n,result,want,premises,label]of cases){within(result,want);for(const p of premises)assert.ok(get(n).stem.includes(p),`${get(n).id}: ${p}`);assert.match(selected(n),label);}
 within(100/.05,2000);within((750/500-1)*100,50);within(Math.max(2000*.001,5),5);
 assert.deepEqual(get(127).outlineCodes,['11.1.a']);assert.deepEqual(get(137).outlineCodes,['3.4.a']);
});

test('BHB and BF complete-weight allocation totals agree but sector allocations can differ',()=>{
 const q=get(128);assert.match(q.stem,/权重各和为1/);assert.match(q.stem,/Σ\(wp−wb\)rb/);assert.match(q.stem,/Σ\(wp−wb\)\(rb−Rb\)/);
 for(const [wp,wb,rb] of [ [[.7,.3],[.4,.6],[.12,-.03]], [[.2,.3,.5],[.1,.6,.3],[-.05,.08,.11]] ]){
  const Rb=wb.reduce((v,w,i)=>v+w*rb[i],0);
  const bhb=wp.map((w,i)=>(w-wb[i])*rb[i]);
  const bf=wp.map((w,i)=>(w-wb[i])*(rb[i]-Rb));
  within(bhb.reduce((a,b)=>a+b,0),bf.reduce((a,b)=>a+b,0));
  assert.ok(bhb.some((x,i)=>Math.abs(x-bf[i])>1e-6));
 }
 assert.match(selected(128),/差额为Rb×Σ\(wp−wb\)=0/);
});

test('structured-note and repo cases rebuild capped payoff, collateral bases and amortizing principal',()=>{
 const getSec=n=>BANK.securities1.find(x=>x.id===`securities1-expansion-invest-${String(n).padStart(4,'0')}`);
 const cases=[
  [45,Math.min(20*.8,12),12,['80%','最高12%','涨20%'],/^12%$/],
  [54,(100-90)/90*100,11.11111111111111,['市值100万元','借现金90万元','以现金为分母'],/^10%和约11.11%$/],
  [55,90-95*.9,4.5,['余额90万元','跌到95万元','不超过抵押市值90%'],/^4.5万元$/],
  [57,Math.max(25-20,0),5,['损失25万元','次级本金20万元','无其他缓冲'],/^5万元$/],
  [62,100*.8*102/100,81.6,['面额100万元','因子0.8','报价102','不计应计利息与费用'],/^81.6万元$/],
 ];
 for(const[n,value,want,premises,pattern]of cases){within(value,want);const q=getSec(n);for(const p of premises)assert.ok(q.stem.includes(p),`${q.id}: ${p}`);assert.match(q.options[q.answer],pattern);}
 within((100-90)/100*100,10);within(4-5,-1);
 assert.match(getSec(56).stem,/等额借款全额融资.*同一期间、同一计息基数/);
 assert.match(getSec(53).stem,/只受托管理抵押品和办理结算，不承接买卖双方债务/);
});

test('SZSE 2026 scenarios recompute price bounds, auction ties and official statistical bases',()=>{
 const sec=n=>BANK.securities1.find(x=>x.id===`securities1-expansion-invest-${String(n).padStart(4,'0')}`);
 const cases=[
 [65,800-500,300,['五个价位','500股','第六档','1000股','800股'],/500股.*300股撤销/],
 [69,Math.max(2*1.02,2+10*.01),2.1,['2元','0.01元','102%','十跳'],/^2.10元$/],
 [87,(10*100+10.2*300)/(100+300),10.15,['前一分钟','10元100股','10.20元300股','含最后一笔'],/^10.15元$/],
 [93,30+15+10,55,['30万股','15万股','10万股','50万股'],/55万股/],
 [95,(12-10)/10*100,20,['最高12元','最低10元','前收盘11元'],/^20%$/],
 ];
 for(const[n,value,want,premises,label]of cases){within(value,want);const q=sec(n);for(const p of premises)assert.ok(q.stem.includes(p),`${q.id}: ${p}`);assert.match(q.options[q.answer],label);}
 const maxVolume=[[10,600],[10.1,900],[10.2,700]].sort((a,b)=>b[1]-a[1])[0][0];within(maxVolume,10.1);assert.match(sec(73).options[sec(73).answer],/^10.10元/);
 assert.ok(Math.abs(10.1-10.08)<Math.abs(10-10.08));assert.match(sec(74).options[sec(74).answer],/^10.10元/);
 within(Math.max(10*.8,9),9);within(Math.min(10*1.2,11),11);assert.match(sec(79).options[sec(79).answer],/^9元至11元$/);
 assert.ok(20<30&&240>=200);assert.match(sec(76).options[sec(76).answer],/^达标/);
 assert.ok(1<30&&10<200);assert.match(sec(80).options[sec(80).answer],/^不能/);
 assert.match(sec(82).stem,/收盘价10元.*限价9.90元/);assert.match(sec(82).options[sec(82).answer],/无效/);
});

test('company governance retained-profit, reserve and voting constraints use visible bases',async()=>{
 const {EXPANSION_FUND_GOVERNANCE_QUESTIONS:g}=await import('../src/expansion-fund-governance.js');const q3=n=>g.fund3.find(q=>+q.id.slice(-4)===n);const q1=n=>g.fund1.find(q=>+q.id.slice(-4)===n);
 within((100-20)*(1-.1),72);assert.match(q3(132).stem,/一百万元.*二十万元/);assert.match(q3(132).options[q3(132).answer],/七十二万元/);
 within(400-1000*.25,150);assert.match(q3(137).stem,/一千万元.*四百万元.*二百万元/);assert.match(q3(137).options[q3(137).answer],/一百五十万元/);
 assert.ok(9000<10000&&1200>1000);assert.match(q1(90).stem,/净资产八千万元、总资产一亿元/);assert.match(q1(90).options[q1(90).answer],/金额未超过总资产.*数量超过/);
 assert.match(q3(133).stem,/本公司股份/);assert.match(q3(133).options[q3(133).answer],/不得分配利润/);
 assert.match(q3(114).options[q3(114).answer],/决议作出之日起九十日/);assert.match(q3(121).options[q3(121).answer],/不足三名.*股东会/);
});

test('treasury auction allocations and caps are recomputed independently',()=>{
 const q=n=>BANK.securities1.find(x=>+x.id.slice(-4)===n);
 within(12*18/(18+6),9);within(12*6/(18+6),3);assert.match(q(97).stem,/12亿元.*18亿元和6亿元/);assert.match(q(97).options[q(97).answer],/甲9亿元、乙3亿元/);
 within(600*.1,60);within(600*.35,210);assert.match(q(102).options[q(102).answer],/单一标位上限60亿元/);
 within(Math.min(20*.5,6),6);assert.match(q(103).stem,/中标20亿元.*最低承销额6亿元/);assert.equal(q(103).options[q(103).answer],'6亿元');
 within(Math.max(1.8,1.85,1.9),1.9);assert.match(q(98).options[q(98).answer],/最高中标利率1.90%/);
 assert.match(q(99).options[q(99).answer],/票息统一2%，甲按面值，乙按其标位利率与票息折算价格/);
 assert.match(q(100).stem,/题设.*2027年7月15日.*续发行.*合并上市/);assert.match(q(100).options[q(100).answer],/沿用.*原到期日/);
});

test('private asset-management gates use separate bases and aggregate intermediate tiers',async()=>{
 const {EXPANSION_FUND_GOVERNANCE_QUESTIONS:g}=await import('../src/expansion-fund-governance.js');const q=n=>g.fund1.find(x=>+x.id.slice(-4)===n);
 assert.ok(520>=500&&260<300);assert.match(q(139).stem,/三年投资经历.*五百二十万元.*二百六十万元/);assert.match(q(139).options[q(139).answer],/五百万元.*备选/);
 within(800/10000,.08);within(1500/10000,.15);assert.match(q(155).stem,/开放退出期.*一亿元.*八百万元.*一千五百万元/);assert.match(q(155).options[q(155).answer],/受限资产比例未超二成.*未达一成/);
 assert.ok(6000/10000>.5&&15000/10000>1.2);assert.match(q(159).stem,/一亿元.*六千万元.*一亿五千万元/);assert.match(q(159).options[q(159).answer],/百分之一百二十/);
 within((6000+3000)/4000,2.25);assert.match(q(164).stem,/优先级六千万元、中间级三千万元、劣后级四千万元/);assert.match(q(164).options[q(164).answer],/中间级计入优先级.*超过二比一/);
 assert.match(q(170).options[q(170).answer],/单一计划可不设份额.*集合计划.*均等份额/);
});

test('online IPO and greenshoe cases respect separate quotas and actual cash',()=>{
 const q=n=>BANK.securities1.find(x=>+x.id.slice(-4)===n);
 within(80000*5/20,20000);assert.match(q(117).stem,/5个交易日.*8万元/);assert.match(q(117).options[q(117).answer],/2万元/);
 within(8000-5000,3000);assert.match(q(120).options[q(120).answer],/超过的3000股无效/);
 within(1000*10-6000,4000);assert.match(q(121).stem,/中签1000股.*10元.*6000元/);assert.match(q(121).options[q(121).answer],/不足的4000元对应部分/);
 within(150-90,60);assert.match(q(124).stem,/150万股.*90万股/);assert.match(q(124).options[q(124).answer],/60万股/);
 within(Math.min(10,9.7),9.7);assert.match(q(128).stem,/发行价10元.*前收盘价9.70元/);assert.match(q(128).options[q(128).answer],/9.70元/);
 assert.match(q(116).options[q(116).answer],/5000股.*不因申购甲而扣减/);
});

test('macroeconomic statistics use current monetary nesting and correct survey denominators',()=>{
 const q=n=>BANK.securities1.find(x=>+x.id.slice(-4)===n);const checks=[
 [157,20+.5*60,50,/20%.*60%.*20%/,/指数为50/],
 [158,-(52-48)*.15,-.6,/48升至52/,/拉低PMI 0.6/],
 [159,52*.4+54*.6,53.2,/生产指数为52.*指数为54.*40%.*60%/,/53.2/],
 [161,80/(900+80)*100,8.16326530612245,/就业900人、失业100人.*20名/,/约8.16%/],
 [166,110/100*100,110,/现价GDP为110.*不变价GDP为100/,/缩减指数为110/],
 [167,120/1.2-90/.9,0,/出口120、进口90.*1.20.*0.90/,/^0，/],
 [169,(109.2/104-1)*100,5,/修订为104.*109.2/,/增速为5%/]];
 for(const[n,v,w,stem,answer]of checks){within(v,w);assert.match(q(n).stem,stem);assert.match(q(n).options[q(n).answer],answer);}
 assert.match(q(153).stem,/均按账面价值成交/);assert.match(q(154).stem,/不含该长期债/);assert.match(q(154).options[q(154).answer],/存款负债减少20万元、长期债负债增加20万元/);
 assert.match(q(156).stem,/2025口径/);assert.match(q(156).options[q(156).answer],/M1减少20万元，M2不变/);
 assert.match(q(162).stem,/30岁/);assert.match(q(170).stem,/可比统计口径.*必要季节调整/);
});

test('private-equity valuation distinguishes current inputs, market selection and exercise cash',async()=>{
 const{EXPANSION_FUND_GOVERNANCE_QUESTIONS:g}=await import('../src/expansion-fund-governance.js');const q=n=>g.fund3.find(x=>+x.id.slice(-4)===n);
 within(100*7.2,720);assert.match(q(177).stem,/一百万美元.*7.20.*6.80.*7.00/);assert.equal(q(177).options[q(177).answer],'七百二十万元');
 within(60000/4000,15);assert.match(q(186).stem,/六亿元.*六千万元.*四千万元/);assert.equal(q(186).options[q(186).answer],'十五倍');
 assert.ok(100-6<98-1);assert.match(q(187).stem,/不存在主要市场.*一百万元.*六万元.*九十八万元.*一万元/);assert.match(q(187).options[q(187).answer],/选乙市场.*九十八万元.*非扣费后/);
 within(14000-4000,10000);assert.match(q(192).stem,/账面资产一亿元.*公允价值为一点四亿元.*四千万元/);assert.equal(q(192).options[q(192).answer],'一亿元');
 within((900+10*1)*9/(90+10),81.9);assert.match(q(194).stem,/九百万元.*九十万股.*十万股.*一元.*九万股/);assert.equal(q(194).options[q(194).answer],'八十一点九万元');
 assert.match(q(184).options[q(184).answer],/主要市场甲的一百万元/);assert.match(q(196).options[q(196).answer],/整体应列第三层次/);
});

test('exchangeable bonds require sufficient physical shares and separate settlement scopes',()=>{
 const q=n=>BANK.securities1.find(x=>+x.id.slice(-4)===n);
 within(1000/8,125);within(1000/8-100,25);assert.match(q(172).stem,/未偿面额1000万元.*10元降到8元.*100万股/);assert.match(q(172).options[q(172).answer],/125万股.*市值较高不能替代股票数量/);
 assert.match(q(174).options[q(174).answer],/不能仅凭期限超过10年排除/);assert.match(q(179).options[q(179).answer],/逐笔全额.*不作为中央对手方或提供交收担保/);assert.match(q(181).options[q(181).answer],/中债登开实名账户.*直接持有/);
});

test('GIPS report scopes and firm-asset bases remain explicit',()=>{
 within(80+20+30,130);assert.match(get(174).stem,/80万元.*20万元.*30万元.*40万元/);assert.match(selected(174),/^130万元/);
 assert.deepEqual(get(168).outlineCodes,['12.7.c']);assert.deepEqual(get(169).outlineCodes,['12.7.c']);assert.match(get(180).stem,/GIPS报告必需项目/);
 assert.match(get(183).stem,/其他账户.*完整管理.*七月/);assert.match(get(186).stem,/不计算每日收益/);assert.match(selected(186),/估值.*分段收益.*保留/);
 assert.match(get(189).stem,/年末有6个账户.*4个账户完整全年/);assert.match(selected(189),/年末数量6应披露.*内部离散度可豁免/);assert.match(get(190).stem,/去年/);
});

test('negotiated equity clauses retain caps, sale capacity and cumulative waterfall',async()=>{
 const{EXPANSION_FUND_GOVERNANCE_QUESTIONS:g}=await import('../src/expansion-fund-governance.js');const q=n=>g.fund3.find(x=>+x.id.slice(-4)===n);
 const firstA=Math.min(30*2/3,6), firstB=30/3, excess=30-firstA-firstB;within(firstA,6);within(firstB+excess,24);assert.match(q(198).stem,/三十万股.*二比一.*六万股.*三十万股.*迭代/);assert.equal(q(198).options[q(198).answer],'甲六万股、乙二十四万股');
 within(30*20/(20+80),6);within(30-6,24);assert.match(q(206).stem,/总共只收三十万股/);assert.equal(q(206).options[q(206).answer],'基金售六万股，创始人售二十四万股');
 within(5+4,9);assert.match(q(210).options[q(210).answer],/合并为9%/);within(Math.min(200,300-200),100);within(200-100,100);assert.match(q(214).options[q(214).answer],/基金再收一百万元.*余一百万元归普通股/);
 within(10*(100+200/10)/(100+40),60/7);assert.match(q(215).stem,/旧价十元.*一百万股.*二百万元.*四十万股/);assert.equal(q(215).options[q(215).answer],'八点五七元');assert.deepEqual(q(204).outlineCodes,['5.4.f']);
});

test('active-bond and conditional-timing cases use visible benchmark and state assumptions',()=>{
 within((-3*.01)-(-5*.01),.02);assert.match(get(191).stem,/久期3.*久期5.*上升1个百分点/);assert.match(selected(191),/正2个百分点/);
 within((100/1.03)/(100/1.04**2)-1,.0500970873786408);assert.match(get(192).stem,/一年期零息利率3%、两年期4%.*年复利.*一年后卖出/);assert.match(selected(192),/约5.01%/);
 within(Math.sqrt(10**2+10**2-2*1*10*10),0);within(Math.sqrt(5**2+10**2),Math.sqrt(125));assert.match(get(193).stem,/同一观察期间及年化口径/);assert.match(selected(193),/甲为0.*乙约11.18%/);
 within(2/8,.25);assert.match(get(194).stem,/忽略费用.*固定权重线性/);assert.match(selected(194),/25%主动策略加75%同基准/);
 assert.match(get(196).stem,/基金及市场超额收益/);assert.match(get(197).stem,/期初事前已公开/);assert.match(selected(199),/Zrm²/);assert.match(get(202).stem,/穿透到底层后也永久不得持有/);
});

test('replacement VaR questions independently rebuild quantiles and joint-risk increment',()=>{
 const states=[{p:.92,a:0,b:0},{p:.04,a:100,b:0},{p:.04,a:0,b:100}];
 const quantile=f=>{let p=0;for(const s of [...states].sort((a,b)=>f(a)-f(b))){p+=s.p;if(p>=.95-1e-12)return f(s);}throw Error('missing quantile');};
 assert.equal(quantile(s=>s.a),0);assert.equal(quantile(s=>s.b),0);assert.equal(quantile(s=>s.a+s.b),100);
 assert.match(get(146).stem,/92%.*4%仅甲.*4%仅乙.*首次达到95%/);assert.match(selected(146),/单只各为0.*合并为100万元/);
 within(24-30,-6);assert.match(get(151).stem,/相同持有期、置信度及估值口径.*30万元.*24万元.*9万元/);assert.match(selected(151),/−6万元/);
});

test('impairment and provisions use distinct recovery bases and recognition thresholds',async()=>{
 const{EXPANSION_FUND_GOVERNANCE_QUESTIONS:g}=await import('../src/expansion-fund-governance.js');const q=n=>g.fund3.find(x=>+x.id.slice(-4)===n);const s=n=>q(n).options[q(n).answer];
 within(900-Math.max(700,820),80);assert.match(q(237).stem,/九百万元.*七百万元.*八百二十万元/);assert.equal(s(237),'八十万元');
 within(1000-200,800);assert.match(q(241).stem,/一千万元.*二百万元.*七百五十万元.*已计入资产成本/);assert.match(s(241),/八百与七百五十/);
 const loss=800+200-750;within(loss,250);within(Math.min(loss,200),200);within(loss-Math.min(loss,200),50);assert.match(s(243),/先抵商誉二百万元.*其他资产/);
 within((500-200)/3,100);assert.match(q(248).stem,/五百万元.*减值二百万元.*三年、残值为零.*直线法/);assert.equal(s(248),'一百万元');
 assert.match(s(250),/五百万元预计负债与四百万元补偿资产/);assert.equal(s(253),'八十万元');assert.match(q(253).stem,/八十万元.*二十万元.*三十万元/);
 assert.match(s(235),/甲乙组成一个资产组，丙.*单项资产/);assert.match(s(244),/剔除重复违约风险.*其他未计入风险/);assert.match(q(256).explanation,/应披露/);
});

test('sponsor rules retain current observation windows, discretionary remediation and profit basis',async()=>{
 const{EXPANSION_REGULATION_QUESTIONS:r}=await import('../src/expansion-regulation.js');const q=n=>r.securities2.find(x=>+x.id.slice(-4)===n);const s=n=>q(n).options[q(n).answer];
 assert.ok(18>12&&24<36);assert.match(s(223),/十二月.*三十六月/);assert.match(s(226),/乙可限期整改/);
 within(Math.min(2000,-1000),-1000);assert.match(q(244).stem,/首次公开发行股票并上市.*2000万元.*负1000万元/);assert.match(s(244),/孰低.*负1000万元/);
 assert.match(s(239),/两者均须法定代表人和代表人.*业务内核/);assert.match(s(245),/还同时要求.*未在此次募集文件披露/);assert.match(s(246),/与本项目无关人员/);
});

test('2026 fund sales fees keep category, duration and fee-source boundaries separate',async()=>{
 const{EXPANSION_FUND_GOVERNANCE_QUESTIONS:g}=await import('../src/expansion-fund-governance.js');const q=n=>g.fund1.find(x=>+x.id.slice(-4)===n);const s=n=>q(n).options[q(n).answer];
 assert.ok(.7<=.8&&.4<=.5&&.4>.3);assert.match(q(214).stem,/0.7%、0.4%、0.4%/);assert.match(s(214),/指数基金0.4%/);
 const floor=d=>d<7?1.5:d<30?1:d<180?.5:0;assert.deepEqual([6,7,30].map(floor),[1.5,1,.5]);assert.match(s(217),/1.5%和1%.*0.5%/);
 assert.match(s(216),/后端费可以免.*销售服务费不得继续收/);assert.match(s(219),/十万元全部计入基金财产/);assert.match(s(222),/机构客户债券基金.*15%/);
 within(300-80,220);assert.match(q(228).stem,/三百万元.*八十万元.*二百二十万元/);assert.match(s(228),/维护费总额.*管理费净额/);
 assert.match(s(225),/同期商业银行活期存款利率/);assert.match(s(229),/管理人与托管人应接入.*机构投资者可以/);assert.match(s(230),/12个月.*新发售产品直接/);
});

test('Swift cases retain settlement direction, identifiers and directional RMA permission',()=>{
 assert.match(selected(227),/MT541.*收券对付款/);assert.match(selected(228),/持仓看MT535.*变动看MT536/);
 assert.match(selected(230),/同一UTI贯穿链条/);assert.match(selected(231),/非联网BIC.*没有.*接入权/);
 assert.match(get(235).stem,/新的MT578.*NEWM/);assert.match(selected(235),/补齐本方匹配结算指令/);assert.match(selected(236),/乙授予甲.*相反方向/);
});

test('sales-institution thresholds and merger phases use the applicable subjects',async()=>{
 const{EXPANSION_FUND_GOVERNANCE_QUESTIONS:g}=await import('../src/expansion-fund-governance.js');const q=n=>g.fund1.find(x=>+x.id.slice(-4)===n);const s=n=>q(n).options[q(n).answer];
 assert.ok(22>=20);within(18*.5,9);assert.ok(8<9);assert.match(q(231).stem,/22名.*18人.*8人/);assert.match(s(231),/总人数达标.*比例不足/);
 assert.ok(120>=100&&4<5);assert.match(q(233).stem,/3个完整.*120亿元.*4名/);assert.match(s(233),/至少5名.*缺1名/);
 within(2000-1800,200);assert.match(q(234).stem,/六千万元.*一千八百万元/);assert.match(s(234),/未达到二千万元/);
 within(6-2,4);assert.ok(4<5);assert.match(q(242).stem,/6亿元.*2亿元/);assert.match(s(242),/4亿元.*未达5亿元/);
 assert.match(q(244).stem,/尚未满6个月/);assert.match(q(247).stem,/并非总经理/);assert.match(s(247),/董事长应离任审计.*两名应离任审查/);assert.match(s(248),/不得低于管理人/);
});

test('QDII bases and money-fund thresholds use separate legal populations',()=>{
 within(520/1000,.52);within(520/(1000+540),26/77);assert.match(get(239).stem,/1000万元.*520万元.*540万元/);assert.match(selected(239),/52%.*50%/);
 within((40+10*2+50)/1000,.11);assert.match(get(240).stem,/普通股40万股.*每份代表2股.*10万份.*50万股.*1000万股/);assert.match(selected(240),/110万股即11%/);
 within(12+11,23);assert.match(selected(246),/23%.*20%/);within(10+2-3,9);assert.match(selected(248),/周末10万份.*周一9万份/);
 assert.ok(110<=120&&250>240);assert.match(selected(251),/250天.*240天/);assert.match(selected(252),/甲暂停申购.*乙限期降低负偏离/);
 assert.ok(52>50&&80>60&&150>120&&25<30);assert.match(selected(253),/60天.*120天.*30%/);
 within(80+90,170);within(1*200-170,30);assert.match(get(254).stem,/准备金1亿元.*80亿、90亿元.*公允价值.*50亿元/);assert.match(selected(254),/占用170亿元.*剩余30亿元/);
 assert.match(selected(255),/董事会批准.*事先.*托管人同意.*披露/);assert.match(selected(256),/先用风险准备金.*不足.*固有资金/);
});

test('REIT diligence thresholds retain per-asset denominator and pre-transfer operating authority',async()=>{
 const{EXPANSION_FUND_GOVERNANCE_QUESTIONS:g}=await import('../src/expansion-fund-governance.js');const q=n=>g.fund1.find(x=>+x.id.slice(-4)===n);const s=n=>q(n).options[q(n).answer];
 within(7+5,12);within((7+5)*.2,2.4);assert.ok(12>10);assert.match(q(249).stem,/完整自然年度.*7%和5%.*20%/);assert.match(s(249),/该中心合计12%/);
 assert.match(q(252).stem,/甲持有90%.*不决定运营.*乙持有10%并决定/);assert.match(s(252),/乙符合.*运营管理权限/);assert.match(q(252).explanation,/权属转移前/);
 assert.ok(12>10&&1<10);assert.match(q(256).stem,/合并范围外.*项目公司.*12%.*原始权益人.*1%/);assert.match(s(256),/诚信和财务.*代偿风险/);
 assert.match(q(264).explanation,/已签.*拟签|拟签.*已签/);assert.deepEqual(q(249).outlineCodes,['5.1.g']);
});

test('monetary redistribution and external accounts distinguish flows, valuation and classification',()=>{
 const q=n=>BANK.securities1.find(x=>+x.id.slice(-4)===n);const s=n=>q(n).options[q(n).answer];
 within(-100*.8+100*.2,-60);within(-100*.2+100*.8,60);assert.match(q(183).stem,/减少100万元.*增加100万元.*0.8和0.2/);assert.match(s(183),/减少60万元/);
 within(40-70,-30);assert.match(q(191).stem,/顺差40亿元.*支出70亿元/);assert.match(s(191),/逆差30亿元/);
 within(30-8-25,-3);assert.match(q(192).stem,/储蓄30.*储蓄−8.*投资25/);assert.match(s(192),/−3.*22低于投资25/);
 within(-100+20-50,-130);assert.match(q(194).stem,/−100亿元.*顺差20亿元.*损失50亿元.*其他量变及统计误差均为零/);assert.match(s(194),/−130亿元/);
 within(100*1.1-100,10);within(100-100*1.1,-10);assert.match(q(195).stem,/外币本币价格上涨10%/);assert.match(s(195),/甲变为\+10，乙变为−10/);
 assert.match(s(197),/股权负债.*不等于.*合同债务/);assert.match(q(197).referenceSection,/5.21.*5.23/);assert.match(q(198).stem,/留存收益9亿元.*没有现金汇出/);assert.match(s(198),/投资收益.*股权再投资/);
 within(130-100,30);assert.match(q(200).stem,/经济所有权均未转给工厂/);assert.match(s(200),/服务出口30万元/);assert.ok(8<10&&12>10);assert.match(s(201),/不能仅按12%.*应看投票权/);assert.match(s(202),/甲涉及资本转移.*乙属于其他量变/);
});

test('venture-tax cases distinguish categories, deduction bases and qualifying measurement windows',async()=>{
 const{EXPANSION_FUND_GOVERNANCE_QUESTIONS:g}=await import('../src/expansion-fund-governance.js');const q=n=>g.fund3.find(x=>+x.id.slice(-4)===n);const s=n=>q(n).options[q(n).answer];
 within(Math.max(100-130,0),0);assert.match(q(286).stem,/100万元.*130万元.*股息20万元/);assert.match(s(286),/转让所得按零.*不结转.*股息.*20万元/);
 assert.match(q(287).stem,/已扣.*余额200万元.*管理费20万元.*报酬30万元/);assert.match(s(287),/200万元.*不再.*扣除/);
 within(200*.7,140);within(140-100,40);assert.match(s(289),/抵至零.*40万元不结转/);assert.match(s(288),/甲适用20%.*乙.*5%至35%/);
 assert.ok(250<=300&&4500<=5000&&4800<=5000);assert.match(q(297).stem,/2026年.*250人.*4500万元.*4800万元/);assert.match(s(297),/三项均符合.*300人.*5000万元/);
 within(2000+800,2800);assert.match(q(303).stem,/6个月.*2000万元.*800万元/);assert.match(s(303),/2800万元.*实际6个月/);
 within((20+100)/(200+300),.24);assert.match(q(304).stem,/研发20万元.*费用200万元.*研发100万元.*费用300万元/);assert.match(s(304),/120除以500为24%/);
 within((2026-2024)*12+1-3,22);assert.match(s(305),/2024年3月.*2026年1月尚不足2年/);
 within(200/800,.25);within(1000*(200/800)*.7,175);assert.match(q(306).stem,/实缴1000万元.*实缴200万元.*实缴800万元.*认缴比例40%/);assert.match(s(306),/25%.*70%.*175万元/);
});

test('statistical validation scenarios rebuild uncertainty, serial dependence and posterior bases',()=>{
 const q=n=>BANK.securities1.find(x=>+x.id.slice(-4)===n);const s=n=>q(n).options[q(n).answer];
 within(10/Math.sqrt(100),1);assert.match(get(257).stem,/100个独立同分布.*10%/);assert.match(selected(257),/10%是单日.*1%.*均值标准误/);
 // Construct a two-day joint distribution with marginal variances1 and correlation0.5.
 const joint=[[1,1,.375],[-1,-1,.375],[1,-1,.125],[-1,1,.125]];
 within(joint.reduce((a,[x,y,p])=>a+x*y*p,0),.5);within(joint.reduce((a,[x,y,p])=>a+(x+y)**2*p,0),3);assert.match(get(258).stem,/简单相加近似.*1%.*0.5/);assert.match(selected(258),/1.73%/);
 within(.99**250,.08105851616218128);assert.match(get(261).stem,/99%VaR.*每日真实超限概率恰为1%.*250.*相互独立/);assert.match(selected(261),/8.1%/);
 within(.02-.10,-.08);assert.match(selected(264),/−0.08%/);within(5/10,.5);assert.match(selected(265),/0.5%.*未达到/);
 const xs=[-1,0,1],ys=xs.map(x=>x*x),ex=xs.reduce((a,b)=>a+b,0)/3,ey=ys.reduce((a,b)=>a+b,0)/3;within(ex,0);within(ey,2/3);within(xs.reduce((a,x,i)=>a+(x-ex)*(ys[i]-ey),0)/3,0);within(ys.reduce((a,y)=>a+(y-ey)**2,0)/3,2/9);assert.notEqual(ys[0],ys[1]);assert.match(s(205),/零线性相关不代表相互独立/);
 within(2+.8*20,18);within(2/(1-.8),10);assert.match(s(207),/18和10/);within(.2+.5*2**2,2.2);within(.2+.5*(-2)**2,2.2);assert.match(s(208),/都为2.2/);
 const truePositive=10000*.01*.9,falsePositive=10000*.99*.05;within(truePositive,90);within(falsePositive,495);within(truePositive/(truePositive+falsePositive),2/13);assert.match(q(211).stem,/违约概率1%.*检出率90%.*误报率5%/);assert.match(s(211),/15.38%/);
 assert.match(s(212),/逐日计算甲减乙.*配对差值/);
 assert.match(q(204).stem,/同一置信水平|相同置信水平/);assert.match(q(206).stem,/独立同分布/);
});

test('service rules and shareholder inspection retain distinct clocks, entities and roles',async()=>{
 const{EXPANSION_FUND_GOVERNANCE_QUESTIONS:g}=await import('../src/expansion-fund-governance.js');const q=n=>g.fund1.find(x=>+x.id.slice(-4)===n);const s=n=>q(n).options[q(n).answer];
 const inspect=g.fund3.find(x=>x.id.endsWith('-0077'));assert.match(inspect.options[inspect.answer],/股东提出书面请求起15日内书面说明/);assert.doesNotMatch(inspect.explanation,/收到申请/);
 assert.match(s(273),/未有基金合同约定.*管理人支付/);assert.match(s(275),/分离职能.*冲突.*披露/);assert.match(s(276),/内部审计部门.*评估报告/);assert.match(s(277),/先承担赔偿.*追偿/);
 within(4*6,24);assert.ok(24>20);assert.match(q(280).stem,/从0增至24%.*每次6%/);assert.match(q(280).rationales[2],/决议日起算/);assert.match(s(280),/整体已超过20%/);
 assert.match(s(282),/运营报告.*3个月.*审计报告.*4个月/);assert.match(s(290),/登记和信息系统.*不.*扩大到估值/);
});

test('2026 benchmark rules distinguish deferred dates, disclosure and signed objective effects',()=>{
 assert.match(get(269).stem,/2026年2月已获注册.*3月1日时尚未完成募集/);assert.match(selected(269),/施行日统一起算/);assert.match(get(270).referenceSection,/2026年10月/);
 assert.match(selected(272),/定性或定量/);assert.match(get(273).stem,/无其他.*重大实质性影响/);assert.match(selected(273),/生效前30日/);assert.deepEqual(get(273).outlineCodes,['17.4.a']);
 within(3-1-(-2),4);assert.match(get(277).stem,/3个百分点.*贡献\+1.*贡献−2/);assert.match(selected(277),/4个百分点/);
 assert.match(get(279).stem,/2026年10月/);assert.match(selected(279),/前者.*9月.*后者.*2027年3月/);
 for(const n of[280,281,282,283])assert.match(get(n).stem,/已公布.*不考虑后续修订.*2027年3月/);
 assert.match(selected(280),/可不披露旧基准.*注明.*原因/);assert.match(selected(282),/新的评价起始日.*保留.*结果/);assert.match(selected(283),/门类.*不足.*大类/);
});

test('foreign settlement separates contract layers, exception scope and timestamp events',()=>{
 assert.match(get(284).stem,/适用15c6-1\(a\).*成交时.*T\+3.*无.*豁免/);assert.match(selected(284),/较长交收约定不解除.*同日/);
 assert.match(get(285).stem,/基础股票没有美国过户设施.*凭证有美国过户设施/);assert.match(selected(285),/独立证券.*单独/);
 assert.match(get(286).stem,/客户合同本身无其他豁免.*未约定不同交收日/);assert.match(selected(286),/境外执行合同可豁免.*客户合同仍/);
 assert.ok(17*60>16*60+30);assert.match(get(287).stem,/17时.*初始购买人.*普通二级/);assert.match(selected(287),/前者.*T\+2.*后者.*T\+1/);
 assert.match(selected(288),/甲.*T\+4.*乙.*T\+2/);assert.match(selected(289),/书面流程.*替代路径/);assert.match(selected(290),/技术可行.*尽早.*交易日/);
 assert.match(selected(291),/两种推断均不足.*设计和执行/);assert.match(get(292).stem,/T日完成.*T\+2才收到/);assert.match(selected(292),/收取日期和时间/);
 assert.match(selected(293),/实际参与分工.*清算经纪商/);assert.ok(8<10);assert.match(selected(294),/不可.*执行和交收渠道/);assert.match(selected(295),/未一律强制联动.*托管安排/);
 for(let n=284;n<=295;n++)assert.deepEqual(get(n).outlineCodes,['14.4.b']);
});

test('private-equity filing keeps investor and fund bases, separate maturities and investment-date status',async()=>{
 const{EXPANSION_FUND_GOVERNANCE_QUESTIONS:g}=await import('../src/expansion-fund-governance.js');const q=n=>g.fund3.find(x=>+x.id.slice(-4)===n),s=n=>q(n).options[q(n).answer];
 for(let n=316;n<=341;n++)assert.match(q(n).stem,/适用2023年备案指引的新设基金规则/);
 assert.ok(50<100&&1000>100);assert.match(q(316).stem,/首期实缴50万元.*保险资金/);assert.match(s(316),/甲不能.*乙属明列例外/);
 within(4000*.2,800);within(10000*.2,2000);assert.ok(900>800);assert.match(s(322),/800万元上限/);assert.deepEqual(q(322).outlineCodes,['4.4.d']);
 assert.ok(35>=30&&20<30);assert.match(s(324),/收益比例合格.*亏损.*不足30%/);
 const gap=(y1,m1,y2,m2)=>(y2-y1)*12+m2-m1;within(gap(2030,12,2031,4),4);within(gap(2030,8,2030,12),4);assert.ok(4<6);assert.match(s(327),/两侧差额均未达到6个月/);
 within(1+2.8,3.8);assert.ok(2.8<=1*3&&3.8>1*3);assert.match(s(330),/新增2.8亿元不超过原认缴3倍/);
 within(600+500,1100);assert.ok(Math.max(600,500)<1000);assert.match(s(331),/至少一名.*1000万元.*合计不足/);
 within((6500+500)/10000,.7);assert.match(s(333),/计入合理税费预留达到70%/);assert.match(s(334),/实缴至少1000万元.*托管/);assert.match(s(338),/预计.*清算开始10个工作日/);
 assert.ok(59<60&&8*12>60);assert.match(q(340).stem,/投资时均未上市/);assert.match(s(340),/甲可计为早期.*乙不能.*后来证书/);
});

test('manager change distinguishes voting population, separate conditions and reporting procedure',async()=>{
 const{EXPANSION_FUND_GOVERNANCE_QUESTIONS:g}=await import('../src/expansion-fund-governance.js');const q=n=>g.fund3.find(x=>+x.id.slice(-4)===n),s=n=>q(n).options[q(n).answer];
 within(6/8,.75);within(6/10,.6);assert.ok(.6<2/3&&.75>2/3);assert.match(q(342).stem,/10名.*8人.*6人.*总份额60%/);assert.match(s(342),/基金份额达到三分之二/);
 assert.match(s(343),/甲可适用同控例外.*乙不能/);assert.match(s(344),/不能因此豁免暂停备案/);
 assert.match(s(345),/原管理人10个工作日.*系统.*新管理人确认/);assert.match(s(347),/甲可免.*乙须公证或/);
 assert.match(q(349).stem,/5个工作日.*20个工作日/);assert.match(s(349),/逾期缺受理材料应恢复/);assert.match(s(350),/原或新管理人.*生效文书/);
 assert.match(s(352),/不单独设定民事关系/);assert.match(s(353),/不属于.*管理人变更/);
 for(const n of[345,346,347,354])assert.deepEqual(q(n).outlineCodes,['9.7.b']);
});

test('attribution and style rebuild linking, currency cancellation, notional contribution and convex constraints',()=>{
 within(.4*(.12-.10)*100,.8);within((.6-.4)*(.12-.10)*100,.4);within(.6*(.12-.10)*100,1.2);assert.match(selected(296),/1.2.*不再额外/);assert.match(get(296).options[1],/再次加入总超额/);
 const allocation=3*1.05+1*1.10,selection=2*1.05+4*1.10;within(allocation,4.25);within(selection,6.5);within(allocation+selection,(1.1**2-1.05**2)*100);assert.match(get(297).stem,/C=C1×\(1\+b2\)\+C2×\(1\+p1\)/);assert.match(selected(297),/4.25.*6.50.*10.75/);
 within((1.1/1.05-1)*100,100/21);within(((1.1*1.2)/(1.05*1.2)-1)*100,100/21);within(((1.1*1.2)-(1.05*1.2))*100,6);assert.match(get(298).stem,/无外部现金流.*无另行对冲/);assert.match(selected(298),/4.76%/);
 within((0-.5)*2,-1);assert.match(get(299).stem,/期初敞口的一阶即期效应.*忽略远期溢价/);assert.match(selected(299),/−1个百分点/);
 within(9-7,2);within(6-1,5);assert.match(get(300).stem,/连续复利/);assert.match(selected(300),/B.*5%.*A.*2%/);
 within((101-100)/100*100,1);assert.match(get(302).stem,/无现金流、费用或交易/);assert.match(selected(302),/价格来源差异/);
 within(10/200,.05);within(200/1000,.2);within((10/200)*(200/1000)*100,1);assert.match(selected(303),/1个百分点/);assert.deepEqual(get(303).outlineCodes,['12.3.a']);
 within(7-5,2);within(8-7,1);within(8.6-8,.6);within(2+1+.6,8.6-5);assert.match(selected(304),/1个百分点.*8%减政策组合7%/);
 for(let i=0;i<=100;i++){const w=i/100;assert.ok(w*1+(1-w)*3>=1&&w*1+(1-w)*3<=3);}within(2*1-1*3,-1);assert.match(get(305).stem,/非负.*和为1.*不设截距/);assert.match(selected(305),/1%到3%/);
 const variance=xs=>{const mean=xs.reduce((a,b)=>a+b,0)/xs.length;return xs.reduce((a,b)=>a+(b-mean)**2,0)/xs.length;};within(variance([2,2]),0);within(variance([-3,3]),9);assert.match(selected(306),/选A.*残差恒定/);
 assert.match(selected(307),/月收益变动.*不能据此拆年度收益/);assert.match(get(308).stem,/同一观察期.*久期显著长/);assert.match(selected(308),/期限敏感度.*不等于实际持有/);
 for(let n=305;n<=308;n++)assert.deepEqual(get(n).outlineCodes,['12.4.a']);
});

test('trade finance distinguishes undertaking, document control, payment date and net valid debt',async()=>{
 const{EXPANSION_INTERMEDIATION_QUESTIONS:b}=await import('../src/expansion-intermediation.js');const q=n=>b.securities1.find(x=>+x.id.slice(-4)===n),s=n=>q(n).options[q(n).answer];
 within(100-25,75);assert.match(q(49).stem,/最高付款额100万元.*预支25万元.*先归还.*忽略利息费用/);assert.match(s(49),/^75万元/);
 within(100-15,85);assert.match(q(51).stem,/100万元.*15万元.*不保.*退货稀释/);assert.match(s(51),/85万元.*不能.*索赔/);
 assert.match(q(46).stem,/允许买方凭身份证明提货.*不要求提交/);assert.match(s(46),/扣单不能阻止/);assert.match(q(47).stem,/仅转让款项.*未.*转让.*未.*代交单/);assert.match(s(47),/不自动带来交单权/);
 assert.match(q(50).stem,/只在原到期日.*付购买价.*不预付/);assert.match(s(50),/当前采购仍需提前融资/);assert.match(q(55).stem,/买方.*贷款.*买方授权.*无回购或信用担保/);assert.match(s(55),/境外买方.*不改变/);
});

test('2026 arbitration separates court and tribunal stages, award location and receipt deadlines',async()=>{
 const{EXPANSION_FUND_GOVERNANCE_QUESTIONS:b}=await import('../src/expansion-fund-governance.js');const q=n=>b.fund3.find(x=>+x.id.slice(-4)===n),s=n=>q(n).options[q(n).answer];
 assert.match(s(367),/提示并记录/);assert.match(q(370).stem,/均尚未.*作出决定或裁定/);assert.match(s(370),/人民法院/);assert.match(s(371),/放弃.*继续审理/);
 assert.match(s(376),/机构其他组成人员集体/);assert.match(s(379),/甲.*撤回.*乙.*缺席/);assert.match(s(381),/不予补正.*记录/);assert.match(s(383),/双方签收.*及时作出裁决/);
 assert.match(q(388).stem,/2026年5月8日.*9月1日/);assert.ok(new Date('2026-09-01')>new Date('2026-08-08'));assert.match(s(388),/收到裁决书起三个月/);
 assert.match(s(389),/终结撤销程序/);assert.match(s(390),/恢复执行/);assert.match(q(391).stem,/甲国.*乙国/);assert.match(s(391),/甲国程序法.*甲国仲裁地/);assert.match(q(392).stem,/中华人民共和国境内/);assert.match(s(392),/直接.*外国法院/);
 for(let n=366;n<=393;n++)assert.deepEqual(q(n).outlineCodes,['9.8.a']);
});

test('administrative penalties preserve evidence safeguards and separate submission clocks',async()=>{
 const{EXPANSION_REGULATION_QUESTIONS:b}=await import('../src/expansion-regulation.js');const q=n=>b.securities2.find(x=>+x.id.slice(-4)===n),s=n=>q(n).options[q(n).answer];
 assert.match(s(357),/五年|5年/);assert.match(s(360),/录音内容文字记录/);assert.match(s(361),/技术方法.*步骤.*提供人/);assert.match(s(366),/二十四小时|24小时/);
 assert.match(s(368),/说明或录音录像/);assert.match(s(375),/委托第三方.*不解除/);assert.match(s(376),/须当事人同意.*不当然/);
 assert.ok(4<=5&&12<=15);assert.match(q(371).stem,/第4日.*第12日/);assert.match(s(371),/五日|5日/);assert.match(s(373),/甲应重新送达告知书.*乙.*例外/);
});

test('2026 accounting interpretations distinguish conditional returns, payment roles and currency-transition scope',()=>{
 for(let n=331;n<=344;n++)assert.match(get(n).stem,/2026年/);
 assert.match(get(332).stem,/真实有效.*概率极低/);assert.match(selected(332),/仍须纳入/);assert.match(get(333).stem,/多年累积.*调整前后均为基本借贷/);assert.match(selected(333),/所有合同情景.*全存续期/);assert.deepEqual(get(334).outlineCodes,['15.4.a']);
 const mayDerecognize=(irrevocable,noCashAccess,immaterialSettlementRisk)=>irrevocable&&noCashAccess&&immaterialSettlementRisk;assert.equal(mayDerecognize(true,false,false),false);assert.equal(mayDerecognize(true,true,true),true);assert.match(get(335).stem,/不能撤销.*仍可支取.*是否足额/);assert.match(selected(335),/不能/);assert.match(selected(336),/自身金融资产终止确认/);
 assert.match(get(338).stem,/借款人自己持次级.*无实际能力出售/);assert.match(selected(338),/一般金融资产及无追索权/);assert.match(selected(339),/甲可.*乙不能/);
 assert.match(selected(340),/偿债目的下缺乏/);assert.match(selected(341),/合法间接能力.*正常延迟/);assert.match(selected(342),/不能证明.*可.*调整.*估计/);assert.match(selected(343),/间隔与通胀/);
 assert.match(get(344).stem,/两例均已确认相关货币缺乏可兑换性/);assert.match(selected(344),/甲调整期初留存收益.*乙调整累计报表折算差额/);
});

test('penalty discretion uses highest amount and independent acts without copying percentage-point drills',async()=>{
 const{EXPANSION_REGULATION_QUESTIONS:b}=await import('../src/expansion-regulation.js');const q=n=>b.securities2.find(x=>+x.id.slice(-4)===n),s=n=>q(n).options[q(n).answer];
 within(1000*.3,300);within(1000*.6,600);assert.notEqual(100+(1000-100)*.3,300);assert.match(q(378).stem,/100万至1000万元.*未作上下浮动/);assert.match(s(378),/300万、600万元/);
 within(30+50,80);assert.match(q(390).stem,/两个.*独立.*30万元、50万元/);assert.match(s(390),/累计.*80万元/);
 assert.match(q(379).referenceSection,/第二十二条第一款/);assert.match(s(379),/移送文书.*没收违法所得.*罚款缴纳/);assert.match(s(381),/^单位注销免予处罚/);
 assert.match(s(382),/甲.*减轻.*乙.*从轻/);assert.match(s(386),/不再作为.*从重/);assert.match(s(391),/较轻的新规定/);assert.match(q(392).stem,/新规生效后继续.*较重/);assert.match(s(392),/适用新规定/);assert.match(s(393),/证监会主要负责人批准或者集体讨论/);assert.match(s(394),/不再.*行政罚款.*不能.*全部消失/);
});

test('fund accounting handbook reconstructs moving cost, FX, refund liability and ledger totals',()=>{
 const remainingCost=1000-(1000/100)*40,stockCost=remainingCost+900,shares=100-40+60;within(remainingCost,600);within(stockCost,1500);within(stockCost/shares,12.5);assert.match(get(345).stem,/先卖40股，再买60股/);assert.match(selected(345),/1500元和12.5元/);
 for(const n of[350,351])assert.match(get(n).stem,/人民币为记账本位币/);assert.match(get(350).stem,/按公允价值损益计量/);within(10*7.1-10*7,1);assert.match(selected(351),/汇兑收益.*份额不重定/);
 within(120-110,10);within(20-(120-110),10);assert.match(get(354).stem,/尚未补券/);assert.match(selected(354),/负债降至10.*估值收益10/);assert.match(selected(353),/甲调整.*成本.*乙计入.*投资收益/);
 within(2+3*2/3,4);within(3*1/3,1);assert.match(selected(357),/甲承担4、乙承担1/);within(100.01-50-50,.01);assert.match(selected(358),/给乙补0.01/);
 within(12-3,9);assert.match(get(359).stem,/无退款权.*不会带来以后期间收益/);assert.match(selected(359),/未摊9万元.*当期费用/);assert.match(selected(360),/利润表仍反映60/);assert.match(get(361).stem,/重要前期差错/);assert.match(selected(361),/年初或比较项目/);
});

test('investor education separates public scope, dedicated staffing and retained working records',async()=>{
 const{EXPANSION_FUND_GOVERNANCE_QUESTIONS:b}=await import('../src/expansion-fund-governance.js');const q=n=>b.fund1.find(x=>+x.id.slice(-4)===n),s=n=>q(n).options[q(n).answer];
 assert.match(s(342),/查阅及应用.*技能/);assert.match(s(344),/认知水平和实际需要/);assert.match(s(345),/及时主动答疑/);assert.match(s(347),/独立于销售或营销费用/);assert.match(q(348).stem,/上一年度利润同比增长20%/);assert.match(s(348),/不得低于上一年度公司利润增幅/);
 for(const n of[347,348,349,353])assert.match(q(n).stem,/公募基金管理人/);assert.match(s(351),/变更后5个工作日/);assert.match(q(352).stem,/外部专家讲师.*未配备.*专职/);assert.match(s(352),/仍须配备.*专职人员/);
 assert.match(q(353).stem,/不含另有较长法定保存期/);assert.match(s(353),/保留.*工作记录.*协调/);assert.match(s(354),/自建专区不等于.*国家级认定/);
});

test('tax cases independently compute inherited basis, FIFO, natural-month bands and distinct taxable events',()=>{
 within(100-70,30);assert.match(get(365).stem,/2026年10月/);assert.match(selected(365),/70万元.*30万元/);
 const batches=[{quantity:100,months:14},{quantity:100,days:20}];let left=120,tax=0;for(const b of batches){const sold=Math.min(left,b.quantity);tax+=sold*(b.months>12?0:.2);left-=sold;}within(tax,4);assert.equal(left,0);assert.match(selected(368),/^4元/);assert.match(get(368).stem,/境内上市A股/);
 const start=new Date('2026-03-16T00:00:00Z'),delivery=new Date('2026-04-16T00:00:00Z'),last=new Date(delivery-86400000),monthEnd=new Date(start);monthEnd.setUTCMonth(monthEnd.getUTCMonth()+1);monthEnd.setUTCDate(monthEnd.getUTCDate()-1);assert.equal(last.toISOString(),monthEnd.toISOString());assert.equal((delivery-start)/86400000,31);within(1000*.2,200);assert.match(selected(372),/一个月以内含一个月.*200元/);
 within(1900000*.001*.5,950);assert.match(selected(374),/950元/);within(1000*8,8000);assert.match(selected(375),/8000元/);
 within(Math.min(8000,12000)*.2,1600);assert.match(selected(377),/8000元.*1600元/);within(13200*.03,396);assert.match(selected(379),/396元/);
 const c=BANK.securities1.find(x=>x.id==='securities1-expansion-invest-0213');within(100-60,40);assert.match(c.options[c.answer],/40元.*境内存托/);
 assert.match(selected(362),/不得结转.*下一会计年度/);assert.match(selected(363),/36个月/);assert.match(selected(366),/交易收入.*免税.*票息.*新发债息/);assert.match(selected(367),/老券续发行.*至债券到期/);
 assert.match(selected(378),/不按领取计税/);assert.match(selected(380),/甲.*当年.*乙.*次年汇算/);assert.match(selected(381),/年度限额内据实扣除/);for(let n=362;n<=381;n++)assert.deepEqual(get(n).outlineCodes,['16.2.a']);
});

test('2026 insider interpretation applies current alternative thresholds and aggregate fine limits',async()=>{
 const{EXPANSION_REGULATION_QUESTIONS:b}=await import('../src/expansion-regulation.js');const q=(k,n)=>b[k].find(x=>+x.id.slice(-4)===n),s=(k,n)=>q(k,n).options[q(k,n).answer];
 assert.match(q('securities2',398).stem,/2026年8月1日.*8月2日.*8月4日/);assert.ok(new Date('2026-08-01')>new Date('2026-07-27'));assert.match(s('securities2',398),/形成后但知悉前/);
 assert.ok(120>=100&&8<50);assert.match(s('futures2',321),/保证金.*100万元.*不以利润.*同时/);assert.ok(60>=50&&60<100);assert.match(s('futures2',322),/法定知情人身份/);
 assert.match(s('futures2',323),/两年内三次.*本身/);assert.ok(200<1000&&550>=500);assert.match(s('futures2',324),/500万元特别严重/);
 within(80*1,80);within(80*5,400);assert.match(s('futures2',327),/总额.*80万至400万元/);assert.match(s('futures2',326),/两次未经处理/);assert.match(s('futures2',328),/乙.*违法所得/);
 for(const[k,a,z]of[['securities2',395,398],['futures2',321,328]])for(let n=a;n<=z;n++){assert.equal(q(k,n).chapter,7);assert.equal(q(k,n).lessonId,`${k}-7`);}
});

test('securities civil liability separates admission, causation, loss cutoffs and limitation effects',async()=>{
 const{EXPANSION_REGULATION_QUESTIONS:b}=await import('../src/expansion-regulation.js');const q=n=>b.securities2.find(x=>+x.id.slice(-4)===n),s=n=>q(n).options[q(n).answer];
 assert.match(s(399),/不能仅因尚无行政处罚/);assert.match(s(400),/前提重大变化未及时更正/);assert.match(s(401),/下周一/);assert.match(s(402),/期限届满后的首个交易日/);assert.match(s(405),/不具有重大性.*不等于.*行政/);
 assert.match(s(407),/否定交易因果关系/);assert.match(s(408),/赞成票.*除外/);assert.match(s(410),/甲.*应认定无过错.*乙.*综合判断/);
 within(10000+120,10120);assert.match(q(415).stem,/1万元.*120元.*500元/);assert.match(s(415),/10120元/);
 const cutoff=hit=>Math.max(10,Math.min(hit,30));assert.equal(cutoff(6),10);assert.equal(cutoff(Infinity),30);assert.match(s(416),/第10个交易日.*第30个交易日/);
 within(300*(12-10)+700*(12-9),2700);assert.match(q(418).stem,/12元.*1000股.*10元.*300股.*700股.*9元.*7元/);assert.match(s(418),/2700元/);
 assert.match(s(420),/两产品分别算.*同一产品.*合并.*排序/);assert.match(s(421),/被告举证/);assert.match(s(422),/其他连带责任人/);for(let n=399;n<=422;n++)assert.equal(q(n).chapter,7);
});

test('multi-asset decisions rebuild balance sheets, CPPI states and Euler risk contributions',()=>{
 const stock=150*1.2,equity=stock-50,target=equity*1.5;within(target-stock,15);assert.match(selected(383),/再买股票15.*新增借款15/);
 const afterRisk=60*.9,wealth=afterRisk+40,exposure=3*Math.max(wealth-80,0);within(afterRisk-exposure,12);within(exposure,42);assert.match(selected(386),/12万元.*54.*42/);
 within(60*.6+40,76);within(80-(60*.6+40),4);assert.match(selected(387),/76万元.*4万元/);within(3*Math.max(80-80,0),0);assert.match(selected(388),/仍为80/);
 within(Math.min(140,3*(140-80)),140);assert.match(selected(389),/140.*现金0/);within(3*(110-Math.max(80,120*.8)),42);within(3*(110-Math.max(80,110*.8)),66);assert.match(selected(390),/42万元.*66万元/);
 const c1=.4*.15,c2=.6*.05;within(c1,.06);within(c2,.03);within(c1/(c1+c2),2/3);assert.match(selected(391),/6个百分点.*3个百分点.*三分之二/);
 const w=.2/(.1+.2);within((w*.1)**2,((1-w)*.2)**2);assert.match(get(392).stem,/非负权重满仓/);assert.match(selected(392),/甲三分之二.*乙三分之一/);
 const cov=[[1,.8,0],[.8,1,0],[0,0,1]],risk=cov.map(row=>row.reduce((a,b)=>a+b,0)/9);within(risk[0]/risk[2],1.8);within(risk[1]/risk[2],1.8);assert.match(selected(393),/甲乙.*较多.*丙较少/);
 // Construct a positive-definite covariance matrix showing that positive holdings can have negative contributions.
 const sigma=Math.sqrt(.25*(.014+.0044-2*.006));within(sigma,.04);assert.ok(.014*.0044-.006**2>0);within(.5*(.5*.014-.5*.006)/sigma,.05);within(.5*(-.5*.006+.5*.0044)/sigma,-.01);assert.match(get(394).stem,/正权重多头/);assert.match(selected(394),/负贡献.*100%/);
 within(.03*.04-.04*.03,0);assert.ok(.03*.08-.04*.03>0);assert.match(selected(395),/从乙.*给甲/);
 within((1+(.1/.1)*.2)*(1+(.1/.2)*(-.1))-1,.14);within(.75*((1+.2)*(1-.1)-1),.06);assert.match(selected(396),/14%.*1倍.*0.5倍/);within(.5*.4,.2);assert.match(selected(397),/20%/);
 within(100/120,5/6);within(95/100,.95);assert.match(selected(399),/83.33%.*95%/);within(100*8/80,10);assert.match(selected(400),/^10/);
 within(.1*.8,.08);within(.2*.8,.16);assert.match(selected(401),/均值8%.*标准差16%.*不改变.*相关系数/);within(200+8+8*.9,215.2);within(200+8+8*.7,213.6);assert.match(selected(402),/215.2万元/);
 assert.match(get(404).stem,/一次固定给付.*无违约无期权.*麦考利久期均等于H/);assert.match(selected(404),/乙.*集中/);assert.match(selected(405),/预期收益未进入/);
});

test('margin trading keeps distinct price, quantity, haircut and withdrawal bases',async()=>{
 const{EXPANSION_REGULATION_QUESTIONS:b}=await import('../src/expansion-regulation.js');const q=n=>b.securities2.find(x=>+x.id.slice(-4)===n),s=n=>q(n).options[q(n).answer];
 assert.match(q(435).stem,/最新成交价10元/);assert.match(q(435).stem,/9.80元/);assert.ok(9.8<10);assert.match(s(435),/低于最新成交价10/);
 assert.match(q(439).stem,/1月19日前/);assert.match(s(439),/存量合约及展期.*原规定.*新合约.*100%/);
 assert.match(s(440),/公募.*100%.*私募.*120%/);
 assert.match(q(443).stem,/800股/);assert.match(q(443).stem,/1200股/);assert.equal(1200-800,400);assert.match(s(443),/800股.*400股/);
 assert.match(q(445).stem,/浮盈10万元/);assert.match(q(445).stem,/浮亏4万元/);within(10*.6-4,2);assert.match(s(445),/增加2万元/);assert.notEqual((10-4)*.6,2);
 assert.match(q(446).stem,/280万元/);assert.match(q(446).stem,/债务及相关费用合计100万元/);within(280/100,2.8);assert.ok(280/100<3);assert.ok((280+100)/100>3);assert.match(s(446),/现金证券口径只有280%/);assert.equal((280+20)/100,3);assert.ok(!((280+20)/100>3));
});

test('money-market, horizon and FRN cases use stated denominators and cash-flow dates',()=>{
 const sec=n=>BANK.securities1.find(x=>+x.id.slice(-4)===n),ss=n=>sec(n).options[sec(n).answer];
 assert.match(get(406).stem,/180\/360/);assert.match(get(406).stem,/180\/365/);const discountPrice=100*(1-.06*180/360),ra=(100-discountPrice)/discountPrice,rb=.062*180/365;within(discountPrice,97);assert.ok(ra>rb);within(ra,.030927835051546393);within(rb,.030575342465753424);assert.match(selected(406),/3.09%.*3.06%/);
 const bid=100*(1-.04*90/360),ask=100*(1-.038*90/360);within(bid,99);within(ask,99.05);within(ask-bid,.05);assert.match(selected(407),/99.00.*99.05/);
 assert.match(get(410).stem,/同币种.*无违约无期权/);assert.match(get(410).stem,/全价/);const d1=100/105,d2=(100-6*d1)/106;within(6*d1+106*d2,100);within(d2,.8894878706199462);assert.match(selected(410),/0.88949/);assert.notEqual(d2,1/1.06**2);
 // Independent fixed cash-flow construction with Macaulay duration exactly5:
 // PV weights5/9 at t1 and4/9 at t10; compare horizon wealth under one permanent small yield change.
 const y=.04,pv=[[1,100*5/9],[10,100*4/9]],cf=pv.map(([t,v])=>[t,v*(1+y)**t]);within(pv.reduce((a,[t,v])=>a+t*v,0)/100,5);
 const terminal=(h,r)=>cf.reduce((a,[t,c])=>a+c*(1+r)**(h-t),0);
 assert.ok(terminal(3,y+1e-6)<terminal(3,y));assert.ok(terminal(7,y+1e-6)>terminal(7,y));assert.match(selected(411),/甲.*价格损失.*乙.*再投资/);
 within(.2*1+.8*3,2.6);assert.match(selected(412),/2.6年/);assert.match(get(413).stem,/不允许借款/);assert.equal(50-10,40);assert.equal(100+10,110);assert.match(selected(413),/^40单位/);assert.match(selected(414),/调向4年/);
 assert.match(sec(216).stem,/36000美元.*40天.*50天/);within(36000*(.03*40+.06*50)/360,420);assert.match(ss(216),/^420美元/);
 within(Math.max(0,.001-.0015),0);assert.match(ss(217),/^0%/);const quarterlyFactor=1+(.001-.0015)*90/360;assert.ok(quarterlyFactor>0&&quarterlyFactor<1);assert.ok(100/quarterlyFactor**8>100);assert.match(ss(221),/面值现值可高于面值/);
 assert.match(ss(218),/首个日历日/);assert.match(ss(220),/spread仍为原定0.12%.*价格计算/);
});

test('APT applications rebuild priced exposures, zero-cost replication and unit changes',()=>{
 within(2+1*4+0*3,6);within(2+1*4+1*3,9);assert.match(selected(417),/甲为6%.*乙为9%/);
 assert.match(get(418).stem,/卖空所得可全部自由用于买入且无需额外保证金/);within(100-50-50,0);
 for(const[f1,f2]of[[0,0],[.3,-.2],[-.1,.7]]){const net=100*(1.08+.5*f1+.5*f2)-50*(1.06+f1)-50*(1.08+f2);within(net,1);}
 assert.match(selected(418),/初始净投入0.*各状态净收1元/);within((4-3)*(-2),-2);assert.match(selected(420),/−2个百分点.*差1个百分点/);
 const weights=[1,-1,1],beta=[[1,1],[0,1],[0,0]];within(weights.reduce((a,b)=>a+b),1);within(beta.reduce((a,b,i)=>a+weights[i]*b[0],0),1);within(beta.reduce((a,b,i)=>a+weights[i]*b[1],0),0);assert.match(selected(423),/1、−1、1.*\(1,0\)/);
 const oldBeta=2,oldF=.03,oldPremium=.04,newBeta=oldBeta/100,newF=100*oldF,newPremium=100*oldPremium;within(newBeta*newF,oldBeta*oldF);within(newBeta*newPremium,oldBeta*oldPremium);assert.match(selected(424),/β′=β\/100、λ′=100λ/);
 assert.match(selected(415),/未固定因子数量和身份/);assert.match(selected(422),/核对载荷和经济关联/);assert.match(selected(431),/消除研究私益/);
 for(let n=415;n<=424;n++)assert.deepEqual(get(n).outlineCodes,['9.2.c']);for(let n=425;n<=431;n++)assert.deepEqual(get(n).outlineCodes,['9.3.a']);assert.deepEqual(get(432).outlineCodes,['9.3.b']);
});

test('loan contracts distinguish entity cash pools, draw availability and timed funding costs',async()=>{
 const{EXPANSION_INTERMEDIATION_QUESTIONS:b}=await import('../src/expansion-intermediation.js');const q=n=>b.securities1.find(x=>+x.id.slice(-4)===n),s=n=>q(n).options[q(n).answer];
 assert.match(q(112).stem,/分别清算且不合并财产.*没有对乙的贷款债权.*不为甲的债券担保/);const subsidiaryResidual=Math.max(100-90,0);within(Math.min(20,subsidiaryResidual),10);assert.match(s(112),/^10万元/);
 assert.match(s(113),/限制未来设担保.*不列作已取得/);assert.match(s(114),/触发A，不触发B/);assert.match(q(114).stem,/超过50万元.*100万元.*尚未行使/);
 assert.match(s(115),/7月余款不能再提.*2029年底/);within(100-(80-30),50);within(100-80,20);assert.match(s(116),/甲50万元、乙20万元/);
 within(600*(.04-.02)*(90-30)/360,2);assert.match(s(117),/^2万元/);within(600*.005*.5,1.5);within(600*(.06-.02)*.5,12);assert.match(s(118),/1.5万元.*12万元/);
 assert.match(s(119),/尚不满足提款条件/);within(600*.06,36);const amortization=600/(6-2);within(amortization,150);within(600-4*amortization,0);assert.match(s(120),/各列36万元利息.*第6年/);
 within((10*.08+90*.05)*30/360,.44166666666666665);assert.match(s(121),/0.4417万元.*10万元按8%.*90万元仍按5%/);assert.match(q(121).stem,/未被加速.*不计复利/);
});

test('investment policy and joint risk cases preserve budgets, sets and probability paths',()=>{
 assert.match(get(441).stem,/年末先按扣费前财富收1%管理费，再付生活费/);const r=(100*1.02+4)/.99/100-1;within(r,.07070707070707072);within(100*(1+r)*.99-4,102);assert.match(selected(441),/^7.07%/);assert.ok(100*1.07*.99-4<102);
 within(200*.1,20);within(50/200,.25);assert.match(selected(444),/合适载体.*重新审议/);
 within(.5*(-.1)+.5*.02,-.04);within(.2*(-.1)+.8*(-.08),-.084);assert.match(selected(447),/4%.*8.4%/);
 within(.1*(1-.2),.08);within(.1*(1+.2),.12);assert.ok(.11>.08&&.11<.12);assert.match(selected(452),/8%至12%.*未触/);
 assert.match(get(453).stem,/原问题已求得全局最优.*新问题仍可行/);const objective=w=>.1*w-.05*w*w,full=Array.from({length:1001},(_,i)=>objective(i/1000)),restricted=Array.from({length:601},(_,i)=>objective(i/1000));within(Math.max(...full),.05);within(Math.max(...restricted),.042);assert.ok(Math.max(...restricted)<=Math.max(...full));assert.match(selected(453),/缩小可行集不能提高/);
 within(.5*.08+.5*.06,.07);within(Math.sqrt(.25*.1**2+.25*.12**2+2*.25*(-1)*.1*.12),.01);assert.match(selected(454),/收益7%.*波动1%.*改善/);
 const C=[[1,-.9,-.9],[-.9,1,-.9],[-.9,-.9,1]],w=[1/3,1/3,1/3];const variance=C.reduce((s,row,i)=>s+row.reduce((t,c,j)=>t+w[i]*c*w[j],0),0);within(variance,-.8/3);assert.ok(variance<0);within(1+2*(-.9),-.8);assert.match(selected(455),/拒绝.*半正定/);
 const terminal=[];for(const a of[1.5,.5])for(const b of[1.5,.5])terminal.push(100*a*b);assert.deepEqual(terminal,[225,75,75,25]);within(terminal.reduce((a,b)=>a+b,0)/4,100);assert.match(selected(456),/期望为100万元/);assert.match(get(456).stem,/每年独立.*各50%/);
});
