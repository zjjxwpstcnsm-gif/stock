import test from 'node:test';
import assert from 'node:assert/strict';
import {SUBJECTS} from '../src/subjects.js';
import {PRECISION_QUESTIONS,PRECISION_BATCH} from '../src/precision-questions.js';
const all=Object.values(PRECISION_QUESTIONS).flat();
const formulas={
 longCall:([s,k,p])=>Math.max(s-k,0)-p,
 longPut:([s,k,p])=>Math.max(k-s,0)-p,
 deltaGamma:([d,g,x])=>d*x+g*x*x/2,
 sum:a=>a.reduce((s,x)=>s+x,0),product:a=>a.reduce((p,x)=>p*x,1),
 covered:([purchase,strike,premium,spot])=>spot-purchase-Math.max(spot-strike,0)+premium,
 protective:([purchase,strike,premium,spot])=>spot-purchase+Math.max(strike-spot,0)-premium,
 callSpread:([low,high,cost,receipt])=>high-low-cost+receipt,
 putTime:([strike,spot,price])=>price-Math.max(strike-spot,0),
 premiumCost:([count,multiplier,quote,fee])=>count*(multiplier*quote+fee),
 compoundReturn:([a,b])=>((1+a)*(1+b)-1)*100,
 annualized:([start,end,years])=>(Math.pow(end/start,1/years)-1)*100,
 sharpe:([r,rf,sigma])=>(r-rf)/sigma,
 durationPct:([d,bp])=>-d*(bp/10000)*100,
 portfolioSD:([w1,s1,w2,s2,rho])=>Math.sqrt((w1*s1)**2+(w2*s2)**2+2*w1*w2*s1*s2*rho)*100,
 nav:([assets,liabilities,units])=>(assets-liabilities)/units,
 premium:([price,nav])=>(price/nav-1)*100,
 weighted:([w1,b1,w2,b2])=>w1*b1+w2*b2,
 subscription:([amount,rate,nav])=>amount/(1+rate)/nav,
 stakePct:([pre,investment])=>investment/(pre+investment)*100,
 ratio:([a,b])=>a/b,ratioPct:([a,b])=>a/b*100,
 tvpi:([distributed,residual,paid])=>(distributed+residual)/paid,
 waterfall:([cash,principal,preference,rate])=>Math.max(0,cash-principal-preference)*rate,
 pv:([future,r,years])=>future/Math.pow(1+r,years),
 realReturn:([r,i])=>((1+r)/(1+i)-1)*100,
 recovery:([start,low])=>(start/low-1)*100,
 leveredReturn:([equity,debt,r])=>(equity+debt)*r/equity*100,
 sellHedge:([open,spot,close])=>spot+open-close,
 buyHedge:([open,spot,close])=>spot-close+open,
 markToMarket:([previous,today,multiplier])=>(today-previous)*multiplier,
 marginChange:([notional,oldRate,newRate])=>notional*(newRate-oldRate),
 betaHedge:([value,beta,contractValue])=>value*beta/contractValue,
 calendarSpread:([openNear,openFar,closeNear,closeFar,multiplier])=>(closeNear-openNear+openFar-closeFar)*multiplier,
 marginReturn:([notional,margin,change])=>notional*change/margin*100,
};
test('96 distinct original questions, 12 per subject, with complete scoped rationales',()=>{
 assert.equal(all.length,96);assert.equal(new Set(all.map(q=>q.stem)).size,96);
 for(const [id,qs] of Object.entries(PRECISION_QUESTIONS)){
  const subject=SUBJECTS[id];assert.equal(qs.length,12);
  for(const q of qs){
   assert.equal(q.editorialBatch,PRECISION_BATCH);assert.equal(q.sourceKind,'original');assert.match(q.origin,/非真题/);
   assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.equal(q.rationales.length,4);
   assert.ok(q.rationales.every(r=>r.length>=10),q.id);assert.equal(q.explanation,q.rationales[q.answer]);
   assert.ok(subject.CHAPTERS[q.chapter]);assert.ok(subject.LESSONS.some(l=>l.id===q.lessonId));assert.ok(subject.SOURCES[q.source]);
   assert.ok(!q.year&&!q.variantFamily&&!q.sourceQuestion);assert.match(q.reviewedAt,/^2026-10-13$/);
   assert.ok(!subject.QUESTIONS.some(other=>other.id!==q.id&&other.stem===q.stem),q.id);
  }
 }
});
test('all 44 new calculations are independently recomputed and match the displayed option',()=>{
 const qs=all.filter(q=>q.precisionCalculation);assert.equal(qs.length,44);
 for(const q of qs){
  const a=q.precisionCalculation;assert.equal(typeof formulas[a.operation],'function',q.id);
  const actual=formulas[a.operation](a.inputs);assert.ok(Math.abs(actual-a.expected)<1e-9,`${q.id}: ${actual}`);
  const match=q.options[q.answer].match(/-?\d+(?:\.\d+)?/);assert.ok(match,q.id);
  assert.ok(Math.abs(Number(match[0])-actual)<=.005001,`${q.id}: ${q.options[q.answer]} vs ${actual}`);
 }
});
test('full bank contains 2838 questions with 64 source-based items retained and compatible versions',()=>{
 const sizes={options:638,fund1:332,fund2:395,fund3:337,securities1:313,securities2:244,futures1:332,futures2:247};
 let total=0,recall=0,sample=0;
 for(const [id,s] of Object.entries(SUBJECTS)){
  assert.equal(s.QUESTIONS.length,sizes[id]);assert.equal(new Set(s.QUESTIONS.map(q=>q.id)).size,s.QUESTIONS.length);
  assert.ok(s.COMPATIBLE_BANK_VERSIONS.includes(`${id}-2026-10-13.1`));assert.ok(s.COMPATIBLE_BANK_VERSIONS.includes(s.BANK_VERSION));
  for(const q of s.QUESTIONS){assert.ok(s.SOURCES[q.source],q.id);if(q.sourceKind==='recall')recall++;if(q.sourceKind==='sample')sample++;}
  total+=s.QUESTIONS.length;
 }
 assert.equal(total,2838);assert.equal(recall,54);assert.equal(sample,10);
});
