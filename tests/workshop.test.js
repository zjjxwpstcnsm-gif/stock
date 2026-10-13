import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {SUBJECTS} from '../src/subjects.js';
import {WORKSHOP_QUESTIONS, WORKSHOP_BATCH} from '../src/workshop-questions.js';
import {CASE_METHODS,caseMethodView,workshopDesk} from '../src/workshop-methods.js';
import {questionPath,correctionUrl,questionTools,misconceptionView} from '../src/question-tools.js';
import {createExamEngine} from '../src/engine.js';
import {createDrill} from '../src/drill-engine.js';
import {focusedDrillView} from '../src/drill-views.js';
const all=Object.values(WORKSHOP_QUESTIONS).flat();
// Intentionally independent from the authored data and explanations.
const formulas={
 callSpread:([s,l,h,p,c])=>Math.max(s-l,0)-Math.max(s-h,0)-p+c,
 protectiveLoss:([s,p,k])=>s+p-k,
 putCreditLoss:([h,l,c,p])=>h-l-c+p,
 netDelta:([a,b,c,d,e,f])=>a*b*c-d*e*f,
 timeValue:([s,k,p,u])=>(p-Math.max(s-k,0))*u,
 roundTrip:([buy,sell,a,b])=>sell-buy-a-b,
 subscription:([amount,rate,nav])=>amount/(1+rate)/nav,
 distribution:([units,nav,cash])=>units*(nav-cash)+units*cash,
 realReturn:([nominal,inflation])=>((1+nominal)/(1+inflation)-1)*100,
 zeroYield:([pv,fv,years])=>((fv/pv)**(1/years)-1)*100,
 negativeCorrelation:([w1,s1,w2,s2])=>Math.abs(w1*s1-w2*s2)*100,
 ratio:([a,b])=>a/b,
 spreadCost:([bid,ask,qty])=>(ask-bid)*qty,
 gordon:([div,g,r])=>div*(1+g)/(r-g),
 linkedReturn:rs=>(rs.reduce((value,r)=>value*(1+r),1)-1)*100,
 maxDrawdown:values=>{let peak=values[0],worst=0;for(const v of values){peak=Math.max(peak,v);worst=Math.max(worst,(peak-v)/peak);}return worst*100;},
 dilution:([old,newStake])=>old*(1-newStake)*100,
 secondaryCash:()=>0,
 equityBridge:([ev,debt,cash])=>ev-debt+cash,
 managementFee:([base,rate])=>base*rate,
 tvpi:([paid,distributed,nav])=>(distributed+nav)/paid,
 nonParticipating:([preference,stake,total])=>Math.min(total,Math.max(preference,stake*total)),
 carry:([cash,paid,rate])=>Math.max(0,cash-paid)*rate,
 dirtyPrice:([clean,accrued,face])=>(clean+accrued)*face/100,
 capm:([rf,rm,beta])=>(rf+beta*(rm-rf))*100,
 weightedReturn:([w1,r1,w2,r2])=>(w1*r1+w2*r2)*100,
 pe:([profit,shares,price])=>price/(profit/shares),
 durationBps:([duration,bps])=>-duration*bps/100,
 compound:([principal,rate,years])=>principal*(1+rate)**years,
 futurePnl:([entry,settle,unit,qty,direction])=>(settle-entry)*unit*qty*direction,
 marginGap:([equity,required])=>Math.max(0,required-equity),
 longHedge:([open,cash,close])=>cash-(close-open),
 hedgeCount:([rho,s,f,exposure,unit])=>rho*s/f*exposure/unit,
 calendarPnl:([near0,far0,near1,far1,unit])=>(near1-near0+far0-far1)*unit,
 putIntrinsic:([strike,underlying,unit])=>Math.max(strike-underlying,0)*unit,
 simpleCarry:([spot,r,q,t])=>spot*(1+(r-q)*t),
 swapNet:([principal,fixed,floating,period])=>principal*(floating-fixed)*period,
};
test('64 independent workshop questions have valid curriculum, source, rationale and balanced answer mapping',()=>{
 assert.equal(all.length,64);assert.equal(new Set(all.map(q=>q.stem)).size,64);
 for(const [id,bank] of Object.entries(WORKSHOP_QUESTIONS)){
  const s=SUBJECTS[id];assert.equal(bank.length,8);assert.deepEqual([0,1,2,3].map(i=>bank.filter(q=>q.answer===i).length),[2,2,2,2]);
  for(const q of bank){
   assert.equal(q.editorialBatch,WORKSHOP_BATCH);assert.equal(q.sourceKind,'original');assert.match(q.origin,/非真题/);
   assert.equal(q.rationales.length,4);assert.equal(new Set(q.options).size,4);assert.equal(q.explanation,q.rationales[q.answer]);
   assert.ok(q.rationales.every(r=>r.length>=10),q.id);assert.ok(s.CHAPTERS[q.chapter],q.id);assert.ok(s.LESSONS.some(l=>l.id===q.lessonId),q.id);
   assert.ok(s.SOURCES[q.source],q.id);assert.ok(q.referenceSection.length>=8,q.id);assert.equal(q.reviewedAt,'2026-10-13');assert.ok(!q.year&&!q.variantFamily&&!q.sourceQuestion);
   assert.equal(s.QUESTIONS.filter(other=>other.stem===q.stem).length,1,q.id);
  }
 }
});
test('38 authored numeric answers independently recompute, including the displayed rounded answer',()=>{
 const audited=all.filter(q=>q.workshopCalculation);assert.equal(audited.length,38);
 for(const q of audited){
  const {kind,inputs,expected}=q.workshopCalculation;assert.equal(typeof formulas[kind],'function',q.id);
  const actual=formulas[kind](inputs);const tolerance=kind==='realReturn'?.005001:1e-9;
  assert.ok(Math.abs(actual-expected)<tolerance,`${q.id}: ${actual} != ${expected}`);
  const displayed=Number(q.options[q.answer].match(/-?\d+(?:\.\d+)?/)[0]);
  assert.ok(Math.abs(actual-displayed)<=.005001,`${q.id}: displayed ${displayed}, computed ${actual}`);
 }
});
test('numeric models also respect economic boundaries, not just the authored fixture',()=>{
 assert.equal(formulas.callSpread([1,3,3.4,.24,.09]),-.15);
 assert.ok(Math.abs(formulas.callSpread([9,3,3.4,.24,.09])-.25)<1e-9);
 assert.equal(formulas.negativeCorrelation([1/3,.2,2/3,.1]),0);
 assert.equal(formulas.maxDrawdown([100,105,120]),0);assert.equal(formulas.maxDrawdown([100,80,90,40]),60);
 assert.equal(formulas.nonParticipating([200,.2,100]),100);assert.equal(formulas.carry([200,300,.2]),0);
 assert.equal(formulas.marginGap([20,9.5]),0);assert.equal(formulas.putIntrinsic([4800,5000,5]),0);
});
test('question links retain subject and ID, correction drafts contain only public metadata',()=>{
 for(const s of Object.values(SUBJECTS)){
  const q=WORKSHOP_QUESTIONS[s.id][0],path=questionPath(s,q),url=new URL(correctionUrl(s,q));
  assert.equal(path,`?subject=${s.id}#practice?question=${q.id}`);assert.equal(url.origin,'https://github.com');assert.equal(url.pathname,'/zjjxwpstcnsm-gif/stock/issues/new');
  assert.ok(url.searchParams.get('body').includes(s.BANK_VERSION));assert.ok(url.searchParams.get('body').includes(q.id));
  assert.ok(!url.searchParams.get('body').includes(q.explanation));assert.match(url.searchParams.get('body'),/自行提交/);
  assert.ok(questionTools(s,q).includes('noopener noreferrer'));
 }
 const src=readFileSync(new URL('../src/question-tools.js',import.meta.url),'utf8');assert.ok(!/localStorage|sessionStorage|fetch\(|sendBeacon/.test(src));
});
test('all eight subjects get a three-stage method and eight non-spoiling workshop topic links',()=>{
 for(const s of Object.values(SUBJECTS)){
  assert.equal(CASE_METHODS[s.id].steps.length,3);assert.equal((workshopDesk(s).match(/data-action="practice-one"/g)||[]).length,8);
  assert.ok(caseMethodView(s).includes('解题方法'));assert.ok(!workshopDesk(s).includes(WORKSHOP_QUESTIONS[s.id][0].explanation));
 }
});
test('focused random practice never leaks reasoning before confirmation and explains the selected mistake after it',()=>{
 const s=SUBJECTS.options,q=WORKSHOP_QUESTIONS.options[0],plan=createDrill(s.QUESTIONS.map(q=>q.id),{endless:true,instant:true});
 const session={...createExamEngine(s).makeSession([q.id],'practice'),drill:plan.drill};
 const args={session,question:q,subject:s,correct:0,bookmark:'',explanation:'DETAILED_EVIDENCE',warning:''};
 const before=focusedDrillView(args);assert.ok(!before.includes(q.explanation));assert.ok(!before.includes('DETAILED_EVIDENCE'));assert.ok(!before.includes('case-method'));assert.ok(!before.includes('misconception'));assert.ok(!/<input|<select/.test(before));
 const wrong=(q.answer+1)%4;session.answers[q.id]=wrong;session.checked=[q.id];const after=focusedDrillView(args);
 assert.ok(after.includes(q.rationales[wrong]));assert.ok(after.includes('DETAILED_EVIDENCE'));assert.ok(after.includes('case-method'));assert.ok(after.includes('id="answer-feedback"'));assert.equal(misconceptionView(q,q.answer),'');
 const multi={...q,answer:[0,1]};assert.ok(misconceptionView(multi,[0]).includes('还漏选了 B'));
});
test('public metadata, original count and bank versions match the integrated bank',()=>{
 const release=JSON.parse(readFileSync(new URL('../src/release.json',import.meta.url),'utf8'));const total=Object.values(SUBJECTS).reduce((n,s)=>n+s.QUESTIONS.length,0);
 assert.equal(total,2774);assert.equal(release.questionCount,total);assert.equal(release.newWorkshopQuestions,64);assert.equal(release.newWorkshopNumericAuditCases,38);
 assert.ok(readFileSync(new URL('../index.html',import.meta.url),'utf8').includes(`${total}道`));
 for(const s of Object.values(SUBJECTS)){assert.equal(s.BANK_VERSION,`${s.id}-2026-10-13.3`);assert.ok(s.COMPATIBLE_BANK_VERSIONS.includes(`${s.id}-2026-10-13.2`));}
});
