import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {SUBJECTS} from '../src/subjects.js';
import {CLINIC_BATCH,CLINIC_QUESTIONS} from '../src/clinic-questions.js';
import {CONCEPT_PAIRS,conceptClinic} from '../src/concept-clinic.js';
import {recentDrillAnswers,drillRecapView,isolateRecapShortcut} from '../src/drill-recap.js';
import {createDrill} from '../src/drill-engine.js';
import {createExamEngine} from '../src/engine.js';
const all=Object.values(CLINIC_QUESTIONS).flat();
// Independent evaluators: do not import any answer-producing function from the bank.
const formulas={
 parity:([s,k,c])=>c-s+k, upperBreakEven:([k,p])=>k+p,
 synthetic:([s,k,p])=>Math.max(s-k,0)-Math.max(k-s,0)-p,
 greeks:([v,dv,t,days])=>v*dv+t*days, securedPut:([k,p,u])=>(k-p)*u,
 exerciseCash:([k,u])=>k*u, bearPut:([h,l,paid,received])=>h-l-paid+received,
 dailyFee:([nav,r,days])=>nav*r/days, redemption:([n,nav,r])=>n*nav-n*nav*r,
 vote:([yes,attend])=>100*yes/attend, effectiveRate:([r,n])=>100*(Math.pow(1+r/n,n)-1),
 modifiedDuration:([d,y])=>d/(1+y), currencyReturn:([asset,fx])=>100*(asset+fx+asset*fx),
 correlation:([cov,a,b])=>cov/a/b, alpha:([rp,rf,rm,beta])=>100*(rp-rf-beta*(rm-rf)),
 trackingError:([daily,n])=>Math.sqrt(daily*daily*n), mixedEquity:([pre,primary,secondary])=>100*(primary+secondary)/(pre+primary),
 participating:([pref,stake,available])=>Math.min(pref,available)+stake*Math.max(available-pref,0),
 uncalled:([committed,paid,now])=>committed-paid-now, clawback:([paid,entitled])=>Math.max(0,paid-entitled),
 diluted:([old,pool,newShares])=>100*newShares/(old+pool+newShares),
 bond:([face,coupon,y,n])=>Array.from({length:n},(_,i)=>(coupon+(i===n-1?face:0))/Math.pow(1+y,i+1)).reduce((a,b)=>a+b,0),
 rights:([old,price,newShares,subscription])=>(old*price+newShares*subscription)/(old+newShares),
 repo:([principal,r,days,year])=>principal*r*(days/year), spread:([a,b])=>10000*(a-b),
 expectedLoss:([ead,pd,lgd])=>ead*pd*lgd, fxForward:([spot,domestic,foreign,t])=>spot*(1+domestic*t)/(1+foreign*t),
 priceLimit:([settle,r])=>settle+settle*r, straddle:([s,k,c,p])=>Math.abs(s-k)-c-p,
 targetBeta:([current,target,value,price,multiplier])=>(current-target)*value/(price*multiplier),
 available:([prior,pnl,fee,margin])=>prior+pnl-fee-margin,
 calendar:([near0,far0,near1,far1,unit])=>((near1-far1)-(near0-far0))*unit,
};
function randomSession(subject,ids=subject.QUESTIONS.map(q=>q.id),now=1000){
 const plan=createDrill(ids,{batchSize:20,endless:true,instant:true},()=>.99999);
 return {...createExamEngine(subject).makeSession(plan.ids,'practice',null,now),drill:plan.drill,title:`${subject.short} · 随机刷题`};
}
function confirm(session,subject,id=session.ids[0],wrong=false){const q=subject.QUESTIONS.find(q=>q.id===id);session.answers[id]=wrong?(Array.isArray(q.answer)?[q.answer[0]]:(q.answer+1)%q.options.length):q.answer;session.checked.push(id);return q;}

test('64 new cases are balanced, independently worded, fully explained and transparently sourced',()=>{
 assert.equal(all.length,64);
 for(const subject of Object.values(SUBJECTS)){
  const bank=CLINIC_QUESTIONS[subject.id];assert.equal(bank.length,8);
  assert.deepEqual([0,1,2,3].map(i=>bank.filter(q=>q.answer===i).length),[2,2,2,2]);
  for(const q of bank){
   assert.equal(q.editorialBatch,CLINIC_BATCH);assert.equal(q.sourceKind,'original');assert.match(q.origin,/非真题/);
   assert.equal(q.rationales.length,4);assert.ok(q.rationales.every(r=>r.length>=10));assert.equal(q.explanation,q.rationales[q.answer]);
   assert.equal(new Set(q.options).size,4);assert.equal(subject.QUESTIONS.filter(other=>other.stem===q.stem).length,1);
   assert.ok(subject.LESSONS.some(l=>l.id===q.lessonId));assert.ok(subject.CHAPTERS[q.chapter]);assert.ok(subject.SOURCES[q.source]);
   assert.equal(q.reviewedAt,'2026-10-13');assert.ok(q.referenceSection.length>=8);assert.ok(!q.year&&!q.sourceQuestion&&!q.variantFamily);
  }
 }
});
test('32 new numerical cases independently recompute their stored AND displayed answers',()=>{
 const audited=all.filter(q=>q.clinicCalculation);assert.equal(audited.length,32);
 for(const q of audited){const {kind,inputs,expected}=q.clinicCalculation,actual=formulas[kind](inputs);
  assert.ok(Math.abs(actual-expected)<1e-8,`${q.id}: ${actual} != ${expected}`);
  const text=q.options[q.answer].replaceAll(',','').replaceAll('−','-');const shown=Number(text.match(/-?\d+(?:\.\d+)?/)[0]);
  assert.ok(Math.abs(actual-shown)<=.005001,`${q.id}: ${actual} != displayed ${shown}`);
 }
});
test('models preserve boundary cases and dimensional relationships',()=>{
 assert.equal(formulas.straddle([100,100,6,4]),-10);assert.equal(formulas.synthetic([2,3,.06]),-1.06);
 assert.equal(formulas.currencyReturn([.1,0]),10);assert.equal(formulas.targetBeta([.3,.3,80000000,4000,200]),0);
 assert.equal(formulas.clawback([10,20]),0);assert.equal(formulas.participating([200,.2,100]),100);
 assert.equal(formulas.uncalled([100,40,60]),0);assert.equal(formulas.calendar([100,106,103,109,10]),0);
 assert.equal(formulas.fxForward([7,.03,.03,.5]),7);assert.equal(formulas.expectedLoss([100,0,.6]),0);
 assert.equal(formulas.vote([300,600]),50);assert.equal(formulas.trackingError([.2,1]),.2);
});
test('24 comparison cards point to the intended existing lesson and one independently answerable case',()=>{
 assert.equal(Object.values(CONCEPT_PAIRS).flat().length,24);
 for(const subject of Object.values(SUBJECTS)){
  const view=conceptClinic(subject);assert.equal((view.match(/class="concept-pair"/g)||[]).length,3);
  assert.equal((view.match(/data-action="course-open"/g)||[]).length,3);assert.ok(!/<input|<select/.test(view));
  for(const [a,at,b,bt,n] of CONCEPT_PAIRS[subject.id]){const q=CLINIC_QUESTIONS[subject.id][n-1];assert.ok(q);assert.ok(a&&b&&at.length>10&&bt.length>10);assert.ok(view.includes(`data-lesson="${q.lessonId}"`));}
  for(const q of CLINIC_QUESTIONS[subject.id])assert.ok(!view.includes(q.explanation));
 }
});
test('recap includes only confirmed practice, never an unsubmitted answer or an unfinished exam',()=>{
 const subject=SUBJECTS.options,s=randomSession(subject);const first=confirm(s,subject),unconfirmed=subject.QUESTIONS.find(q=>q.id===s.ids[1]);s.answers[unconfirmed.id]=unconfirmed.answer;
 const engine=createExamEngine(subject),exam=engine.makeSession(engine.makePaper(subject.QUESTIONS,'comprehensive'),'exam','comprehensive',1000);
 exam.answers[exam.ids[0]]=subject.QUESTIONS.find(q=>q.id===exam.ids[0]).answer;
 const result=recentDrillAnswers(subject,s,[exam]);assert.equal(result.length,1);assert.equal(result[0].question.id,first.id);
 const html=drillRecapView(subject,s,[exam]);assert.ok(html.includes(first.explanation));assert.ok(!html.includes(unconfirmed.explanation));assert.ok(!html.includes('data-action="answer"'));
 assert.deepEqual(recentDrillAnswers(subject,exam,[]),[]);
});
test('recap survives hidden batch boundaries, sorts recent history, deduplicates and caps at 20',()=>{
 const subject=SUBJECTS.options,past=randomSession(subject,subject.QUESTIONS.slice(0,20).map(q=>q.id));
 for(const id of past.ids)confirm(past,subject,id);past.endedAt=2000;
 const current=randomSession(subject,subject.QUESTIONS.slice(20,40).map(q=>q.id),3000),q=confirm(current,subject);
 const before=JSON.stringify([past,current]);const records=recentDrillAnswers(subject,current,[past,past]);
 assert.equal(records.length,20);assert.equal(records[0].question.id,q.id);assert.equal(records[1].question.id,past.checked.at(-1));assert.equal(JSON.stringify([past,current]),before);
 const stripped={...past};delete stripped.drill;assert.equal(recentDrillAnswers(subject,null,[stripped]).length,20);
 const general={...stripped,title:'专项练习'};assert.equal(recentDrillAnswers(subject,null,[general]).length,0);
});
test('recap rejects malformed, foreign-subject or incompatible records and missing storage safely',()=>{
 const subject=SUBJECTS.fund2,s=randomSession(subject);confirm(s,subject);
 const invalid={...s,checked:[...s.checked,'unknown']};assert.deepEqual(recentDrillAnswers(subject,invalid,[null,{},s]),[]);
 assert.deepEqual(recentDrillAnswers(SUBJECTS.options,s,[]),[]);
 assert.deepEqual(recentDrillAnswers(subject,{...s,version:'unknown'},[]),[]);
 assert.match(drillRecapView(subject,null,null),/先完成一道题/);
});
test('multi-select recap requires explicit confirmation and does not alias the mutable answer array',()=>{
 const subject=SUBJECTS.futures1,q=subject.QUESTIONS.find(q=>Array.isArray(q.answer)&&q.answer.length>1),s=randomSession(subject,[q.id]);
 s.answers[q.id]=[q.answer[0]];assert.equal(recentDrillAnswers(subject,s).length,0);
 s.checked=[q.id];const [r]=recentDrillAnswers(subject,s);assert.equal(r.correct,false);r.answer.push(99);assert.deepEqual(s.answers[q.id],[q.answer[0]]);
 s.answers[q.id]=[...q.answer];assert.equal(recentDrillAnswers(subject,s)[0].correct,true);
});
test('number shortcuts are isolated while focus is in recap; native Enter and browser shortcuts are untouched',()=>{
 let calls=0;const event={key:'1',target:{closest:()=>true},stopPropagation:()=>calls++};
 isolateRecapShortcut(event);assert.equal(calls,1);
 isolateRecapShortcut({...event,key:'Enter'});isolateRecapShortcut({...event,ctrlKey:true});isolateRecapShortcut({...event,target:{closest:()=>false}});assert.equal(calls,1);
});
test('release metadata is tied to actual clinic content and keeps the previous bank version restorable',()=>{
 const release=JSON.parse(readFileSync(new URL('../src/release.json',import.meta.url)));
 assert.equal(release.newClinicQuestions,all.length);assert.equal(release.newClinicNumericAuditCases,32);assert.equal(release.conceptComparisons,24);
 for(const s of Object.values(SUBJECTS)){assert.ok(s.COMPATIBLE_BANK_VERSIONS.includes(`${s.id}-2026-10-13.3`));assert.ok(s.COMPATIBLE_BANK_VERSIONS.includes(s.BANK_VERSION));}
});
