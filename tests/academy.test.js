import test from 'node:test';
import assert from 'node:assert/strict';
import { SUBJECTS } from '../src/subjects.js';
import { QUESTIONS } from '../src/questions.js';
import { FUND_QUESTIONS } from '../src/fund-questions.js';
import { createExamEngine, isCorrect, questionType, paperSize } from '../src/engine.js';
import { bondMetrics, hedgeMetrics } from '../src/academy-visuals.js';
import { collectBackup, validateBackup, mergeRecords, importBackup } from '../src/learning-records.js';

test('eight banks have consistent chapters, answer formats, lesson links and per-item provenance',()=>{
  assert.equal(Object.keys(SUBJECTS).length,8);
  assert.equal(Object.values(SUBJECTS).reduce((n,s)=>n+s.QUESTIONS.length,0),2454);
  assert.equal(Object.values(SUBJECTS).reduce((n,s)=>n+s.LESSONS.length,0),95);
  let recalled=0,samples=0;
  for(const s of Object.values(SUBJECTS)) {
    const ids=new Set(),lessons=new Set(s.LESSONS.map(l=>l.id));
    for(const q of s.QUESTIONS) {
      assert.ok(!ids.has(q.id),q.id);ids.add(q.id);
      assert.ok(s.CHAPTERS[q.chapter],q.id);assert.ok(s.SOURCES[q.source],q.id);
      assert.ok(q.stem&&q.explanation,q.id);
      assert.equal(new Set(q.options).size,q.options.length,q.id);
      assert.ok(q.options.length>=2&&q.options.length<=4,q.id);
      const answers=Array.isArray(q.answer)?q.answer:[q.answer];
      assert.ok(answers.length&&answers.every(a=>Number.isInteger(a)&&a>=0&&a<q.options.length),q.id);
      assert.equal(new Set(answers).size,answers.length,q.id);
      assert.equal(questionType(q)==='multiple',Array.isArray(q.answer),q.id);
      if(q.lessonId)assert.ok(lessons.has(q.lessonId),q.id);
      assert.match(s.SOURCES[q.source].url,/^https:\/\//);
      if(['recall','sample'].includes(q.sourceKind)) {
        assert.ok(Number.isInteger(q.year)&&q.year<=2026,q.id);
        assert.ok(Number.isInteger(q.sourceQuestion)&&q.sourceQuestion>0,q.id);
        assert.ok(q.examSession&&q.reviewNote&&q.lessonId,q.id);
        assert.equal(s.SOURCES[q.source].subject,s.id,q.id);
        if(q.sourceKind==='recall')recalled++;else samples++;
      }
    }
    for(const l of s.LESSONS){assert.ok(s.CHAPTERS[l.practice]||l.practice===0,l.id);assert.ok(l.sections.length>=(s.isAcademy?4:1),l.id);}
  }
  assert.equal(recalled,54);assert.equal(samples,10);
});

test('every old question and its answer remains byte-for-byte compatible',()=>{
  for(const [id,bank] of Object.entries({options:QUESTIONS,...FUND_QUESTIONS})) {
    const updated=new Map(SUBJECTS[id].QUESTIONS.map(q=>[q.id,q]));
    for(const q of bank)assert.deepEqual(updated.get(q.id),q);
    assert.ok(updated.size>bank.length);
  }
});

test('all configured papers have exact quotas, no duplicates and correct perfect scores',()=>{
 for(const s of Object.values(SUBJECTS)) {
   const engine=createExamEngine(s),map=new Map(s.QUESTIONS.map(q=>[q.id,q]));
   for(const [id,profile] of Object.entries(s.PROFILES))for(let n=0;n<20;n++){
     const ids=engine.makePaper(s.QUESTIONS,id),session=engine.makeSession(ids,'exam',id);
     assert.equal(ids.length,paperSize(profile));assert.equal(new Set(ids).size,ids.length);
     if(profile.typeQuotas)for(const [type,count] of Object.entries(profile.typeQuotas))assert.equal(ids.filter(q=>questionType(map.get(q))===type).length,count);
     session.answers=Object.fromEntries(ids.map(id=>[id,map.get(id).answer]));
     assert.ok(engine.validSession(session,s.QUESTIONS));
     const grade=engine.grade(session,s.QUESTIONS);assert.equal(grade.score,100);assert.equal(grade.passed,true);
   }
 }
});

test('multi-select requires all and only the right answers; duplicate, foreign and malformed selections cannot restore',()=>{
 const subject=SUBJECTS.securities2,q=subject.QUESTIONS.find(q=>Array.isArray(q.answer)),engine=createExamEngine(subject);
 assert.ok(isCorrect([...q.answer].reverse(),q));
 assert.equal(isCorrect(q.answer.slice(0,1),q),false);
 assert.equal(isCorrect([...q.answer,(q.answer.at(-1)+1)%4],q),false);
 assert.equal(isCorrect(q.answer[0],q),false);
 const session=engine.makeSession([q.id],'practice');session.answers[q.id]=[...q.answer];assert.ok(engine.validSession(session,subject.QUESTIONS));
 for(const answer of [[],[0,0],[4],[-1],['1'],{},1]){
   session.answers[q.id]=answer;assert.equal(engine.validSession(session,subject.QUESTIONS),false);
 }
 const single=subject.QUESTIONS.find(q=>!Array.isArray(q.answer));
 session.ids=[single.id];session.answers={[single.id]:[single.answer]};assert.equal(engine.validSession(session,subject.QUESTIONS),false);
});

test('weighted futures scores pass at exactly 60 even with only 50 correct questions',()=>{
 const s=SUBJECTS.futures2,e=createExamEngine(s),ids=e.makePaper(s.QUESTIONS,'standard'),session=e.makeSession(ids,'exam','standard');
 const map=new Map(s.QUESTIONS.map(q=>[q.id,q]));
 // 30 multi-select × 1 + 20 comprehensive × 1.5 = 60.
 for(const id of ids)if(['multiple','case'].includes(questionType(map.get(id))))session.answers[id]=map.get(id).answer;
 assert.deepEqual([e.grade(session,s.QUESTIONS).correct,e.grade(session,s.QUESTIONS).score,e.grade(session,s.QUESTIONS).passed],[50,60,true]);
 delete session.answers[ids.find(id=>questionType(map.get(id))==='multiple')];
 assert.equal(e.grade(session,s.QUESTIONS).score,59);assert.equal(e.grade(session,s.QUESTIONS).passed,false);
});

const formulas={
 'delta-position':v=>v.d*v.n*10000*.02,'gamma-adjust':v=>.4+.2*v.move,
 'vega-position':v=>200*v.n,'theta-position':v=>-60*v.n,'rho-position':v=>15*v.n,
 'put-insurance':v=>.2+v.premium,'covered-upside':v=>.3+v.premium,'credit-spread':v=>.5-v.credit,
 'net-assets':v=>v.assets-v.debt,'fee-rate':v=>v.base*.006/365,'subscription-units':v=>v.amount/1.01/1.25,
 'redemption-net':v=>v.shares*1.2*.995,'cash-distribution':v=>v.shares*.08,'expense-impact':v=>(v.nav-2)/1000,
 'reinvest-shares':v=>v.shares*.05/1.25,'holding-return':v=>(v.change+.03)/1.5*100,
 postmoney:v=>v.pre+500,stake:v=>500/(v.pre+500)*100,'enterprise-bridge':v=>v.ev+100-300,
 dpi:v=>v.distributed/2000,rvpi:v=>v.residual/2000,tvpi:v=>(600+v.residual)/2000,
 'cash-waterfall':v=>v.profit*.2,'cash-call':v=>3000-v.paid,
 discount:v=>v.cash/1.05,duration:v=>-v.duration*.002*100,'nominal-value':v=>v.price*10*v.n,
 margin:v=>v.nominal*.08,pnl:v=>-v.drop*10*v.n,basis:v=>v.spot-4050,
 'index-fair':v=>v.spot*(1+(.04-.02)*.5),'call-profit':v=>Math.max(v.spot-100,0)-5,
};
test('480 additional calculation variants recompute independently with explicit units',()=>{
 let count=0;
 for(const s of Object.values(SUBJECTS))for(const q of s.QUESTIONS.filter(q=>q.variantFamily)){
   const c=q.calculation,expected=Math.round(formulas[c.family](c.inputs)*10000)/10000;
   assert.equal(c.expected,expected,q.id);assert.equal(q.options[q.answer],`${expected}${c.unit}`,q.id);count++;
 }
 assert.equal(count,480);
});

test('bond and hedge teaching models agree with discounted cashflows and independent cash accounting',()=>{
 for(const y of [0,.01,.03,.04,.1]){
   const m=bondMetrics(y),closed=y===0?115:3*(1-(1+y)**-5)/y+100*(1+y)**-5;
   assert.ok(Math.abs(m.price-closed)<1e-9);
   const h=1e-5,finite=-(bondMetrics(y+h).price-bondMetrics(y-h).price)/(2*h*m.price);
   assert.ok(Math.abs(finite-m.modified)<1e-6);
 }
 assert.equal(bondMetrics(.03).price,100);
 for(const spot of [3200,4000,4800])for(const basis of [-100,-50,0,100]){
   const m=hedgeMetrics(spot,basis);assert.equal(m.pnl,4050-(spot-basis));assert.equal(m.effective,4050+basis);
 }
});

function storage() {
 const values=new Map();return {getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)};
}
test('backups validate, merge without double counting, preserve local sessions and reject invalid data',()=>{
 const store=storage(),s=SUBJECTS.securities2,e=createExamEngine(s),q=s.QUESTIONS.find(q=>Array.isArray(q.answer));
 const a=e.makeSession([q.id],'practice'),local={practice:{active:a,progress:{[q.id]:{attempts:2,correct:1,wrong:false}},history:[]},course:{last:s.LESSONS[0].id,done:[s.LESSONS[0].id]}};
 const incoming={practice:{active:null,progress:{[q.id]:{attempts:3,correct:1,wrong:true}},history:[]},course:{last:s.LESSONS[1].id,done:[s.LESSONS[1].id]}};
 const merged=mergeRecords(local,incoming);assert.equal(merged.practice.progress[q.id].attempts,3);assert.equal(merged.practice.active,a);assert.equal(merged.course.done.length,2);
 store.setItem(s.practiceKey,JSON.stringify(local.practice));store.setItem(s.courseKey,JSON.stringify(local.course));
 importBackup({[s.id]:incoming},store);const data=collectBackup(store),validated=validateBackup(JSON.parse(JSON.stringify(data)));
 assert.equal(validated[s.id].practice.active.id,a.id);assert.equal(validated[s.id].practice.progress[q.id].attempts,3);
 assert.throws(()=>validateBackup({format:'other',version:1,subjects:{}}));
 const bad=structuredClone(data);bad.subjects[s.id].practice.active.answers[q.id]=[0,0];assert.throws(()=>validateBackup(bad));
 const injected=structuredClone(data);injected.subjects[s.id].practice.active.id='x" onclick="alert(1)';assert.throws(()=>validateBackup(injected));
 const before=store.getItem(s.practiceKey),write=store.setItem;let calls=0;
 store.setItem=(key,value)=>{if(++calls===2)throw new Error('quota');return write(key,value);};
 assert.throws(()=>importBackup({[s.id]:incoming},store));assert.equal(store.getItem(s.practiceKey),before);
 store.setItem=write;store.setItem(s.practiceKey,'{broken');
 importBackup({[s.id]:incoming},store);assert.equal(JSON.parse(store.getItem(s.practiceKey)).progress[q.id].attempts,3);
});
