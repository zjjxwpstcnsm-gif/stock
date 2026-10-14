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
 assert.match(selected(58),/回报不足.*价格可能偏高/);
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
