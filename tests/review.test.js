import {EXPANSION_QUESTIONS} from '../src/expansion-questions.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import { SUBJECTS } from '../src/subjects.js';
import { CASEBOOK_QUESTIONS } from '../src/casebook-questions.js';
import { CASEBOOK_DATE, bankQuality, ruleStatus, POLICY_NOTICES } from '../src/content-quality.js';
import { reviewQueue, chapterMetrics, matchesLearningFilter, optionRationales, reviewWorkbench } from '../src/review-workbench.js';
import { createExamEngine, grade, validSession, isCorrect } from '../src/engine.js';
import { validateBackup, mergeRecords, collectBackup, importBackup } from '../src/learning-records.js';
const all=Object.values(CASEBOOK_QUESTIONS).flat();
const empty=()=>({active:null,progress:{},history:[],saved:[]});
const store=()=>{const m=new Map();return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)};};

test('160 independent case studies have four explicit rationales, scoped references and valid lessons',()=>{
 assert.equal(all.length,160);assert.equal(new Set(all.map(q=>q.stem)).size,160);
 for(const [id,qs] of Object.entries(CASEBOOK_QUESTIONS)){
  assert.equal(qs.length,20);const subject=SUBJECTS[id];
  for(const q of qs){
   assert.equal(q.sourceKind,'original');assert.equal(q.editorialBatch,CASEBOOK_DATE);
   assert.match(q.origin,/非真题/);assert.equal(q.options.length,4);assert.equal(q.rationales.length,4);
   assert.ok(q.rationales.every(r=>r.length>=10),q.id);assert.equal(q.explanation,q.rationales[q.answer],q.id);
   assert.equal(new Set(q.options).size,4,q.id);assert.ok(subject.SOURCES[q.source],q.id);
   assert.ok(subject.LESSONS.some(l=>l.id===q.lessonId),q.id);assert.ok(q.referenceSection.length>1);
   assert.ok(['foundation','applied','advanced'].includes(q.difficulty),q.id);
   assert.ok(!q.variantFamily&&!q.year&&!q.sourceQuestion,q.id);
  }
 }
});
// Independently written formula implementations, not the author's recorded result.
const operations={
 longCall:([s,k,p])=>Math.max(0,s-k)-p,
 sum:x=>x.reduce((a,b)=>a+b,0), product:x=>x.reduce((a,b)=>a*b,1),
 deltaGamma:([d,g,x])=>d*x+g*x*x/2,
 straddle:([s,k,cost])=>Math.abs(s-k)-cost,
 premium:([p,nav])=>(p/nav-1)*100,
 compoundReturn:([a,b])=>((1+a)*(1+b)-1)*100,
 sharpe:([r,rf,sd])=>(r-rf)/sd,
 weighted:([a,b,c,d])=>a*b+c*d,
 durationPct:([d,bp])=>-d*bp/100,
 stakePct:([pre,investment])=>investment/(pre+investment)*100,
 nonParticipating:([preference,stake,value])=>Math.max(Math.min(preference,value),stake*value),
 realReturn:([r,inflation])=>((1+r)/(1+inflation)-1)*100,
 recovery:([start,low])=>(start/low-1)*100,
 marginChange:([notional,oldRate,newRate])=>notional*(newRate-oldRate),
 buyHedge:([oldFutures,spot,newFutures])=>spot-(newFutures-oldFutures),
 hedgeRatio:([correlation,spotSD,futuresSD])=>correlation*spotSD/futuresSD,
 putSpread:([high,low,longCost,shortReceipt,spot])=>Math.max(high-spot,0)-Math.max(low-spot,0)-longCost+shortReceipt,
 betaHedge:([value,beta,contract])=>value*beta/contract,
};

test('all 27 new numeric audit cases are recomputed and agree with the displayed answer',()=>{
 const cases=all.filter(q=>q.auditCalculation);assert.equal(cases.length,27);
 for(const q of cases){
  const {operation,inputs,expected}=q.auditCalculation;assert.ok(operations[operation],q.id);
  const value=operations[operation](inputs);assert.ok(Math.abs(value-expected)<1e-9,q.id);
  const text=q.options[q.answer].replaceAll(',','').replaceAll('−','-');
  let displayed=Number(text.match(/-?\d+(?:\.\d+)?/)[0]);if(text.includes('亏损'))displayed=-displayed;
  assert.ok(Math.abs(displayed-value)<=.005001,q.id+': '+text);
 }
});

test('all eight subjects preserve the old bank version and report honest source counts',()=>{
 let originals=0,recalls=0,samples=0;
 for(const s of Object.values(SUBJECTS)){
  const m=bankQuality(s.QUESTIONS);assert.equal(m.casebook,20);assert.equal(m.detailed,48+(s.isFund?10:['securities2','futures2'].includes(s.id)?12:0)+EXPANSION_QUESTIONS[s.id].length);
  assert.equal(m.total,m.original+m.recall+m.sample);originals+=m.original;recalls+=m.recall;samples+=m.sample;
  assert.ok(s.COMPATIBLE_BANK_VERSIONS.some(v=>v.includes('2026-10-03')));
  assert.ok(s.BANK_VERSION.includes('2026-10-14'));
 }
 assert.equal(originals,2828+Object.values(EXPANSION_QUESTIONS).flat().length);assert.equal(recalls,54);assert.equal(samples,10);
});

test('learning filters compose source-independent saved, unseen, wrong, difficulty and batch state',()=>{
 const q=all[0],state=empty();
 assert.ok(matchesLearningFilter(q,state,'unseen',q.difficulty,CASEBOOK_DATE));
 assert.ok(!matchesLearningFilter(q,state,'saved'));state.saved=[q.id];
 assert.ok(matchesLearningFilter(q,state,'saved',q.difficulty,CASEBOOK_DATE));
 state.progress[q.id]={attempts:1,correct:0,wrong:true};
 assert.ok(matchesLearningFilter(q,state,'wrong'));assert.ok(!matchesLearningFilter(q,state,'unseen'));
 assert.ok(!matchesLearningFilter(q,state,'saved','unrated'));assert.ok(!matchesLearningFilter(q,state,'all','all','unknown'));
 assert.ok(matchesLearningFilter({id:'legacy'},empty(),'unseen','unrated'));
});

test('smart queue prioritizes wrong then unseen, separates variant families and round-robins chapters',()=>{
 const bank=[{id:'wrong',chapter:1},{id:'seen',chapter:1},...Array.from({length:8},(_,i)=>({id:'a'+i,chapter:1,variantFamily:'a'})),{id:'b',chapter:2},{id:'c',chapter:3}];
 const subject={QUESTIONS:bank},state=empty();state.progress={wrong:{attempts:1,correct:0,wrong:true},seen:{attempts:1,correct:1,wrong:false}};
 const selected=reviewQueue(subject,state,4,()=>.5);
 assert.equal(selected[0].id,'wrong');assert.ok(selected.some(q=>q.id==='b'));assert.ok(selected.some(q=>q.id==='c'));
 assert.ok(!selected.some(q=>q.id==='seen'));assert.equal(new Set(selected.map(q=>q.id)).size,4);
 const full=reviewQueue(subject,state,100,()=>.5);assert.equal(full.length,bank.length);assert.equal(full.at(-1).id,'seen');
 for(const count of [0,-1,NaN,Infinity])assert.deepEqual(reviewQueue(subject,state,count),[]);
});

test('smart queues remain unique with exact sizes for every full bank',()=>{
 for(const s of Object.values(SUBJECTS))for(let n=0;n<10;n++){
  const qs=reviewQueue(s,empty(),20);assert.equal(qs.length,20);assert.equal(new Set(qs.map(q=>q.id)).size,20);
  assert.ok(new Set(qs.map(q=>q.chapter)).size>=Math.min(3,Object.keys(s.CHAPTERS).length));
 }
});

test('chapter diagnostics distinguish distinct coverage from repeated-answer accuracy',()=>{
 const s=SUBJECTS.options,q=s.QUESTIONS[0],progress={[q.id]:{attempts:4,correct:3,wrong:true}};
 const m=chapterMetrics(s,progress).find(m=>m.id===q.chapter);
 assert.equal(m.attempted,1);assert.equal(m.attempts,4);assert.equal(m.wrong,1);assert.equal(m.accuracy,.75);assert.equal(m.coverage,1/m.total);
 const blank=chapterMetrics(s).find(m=>m.id===q.chapter);assert.equal(blank.accuracy,null);
});

test('bookmarks are optional in legacy backups, validated, merged idempotently and exported',()=>{
 const storage=store(),backup=collectBackup(storage),q=all[0],id='options';
 delete backup.subjects[id].practice.saved;
 assert.deepEqual(validateBackup(backup)[id].practice.saved,[]);
 backup.subjects[id].practice.saved=[q.id,q.id];const incoming=validateBackup(backup);
 assert.deepEqual(incoming[id].practice.saved,[q.id]);
 const local=validateBackup(collectBackup(storage))[id];const merged=mergeRecords(local,incoming[id]);
 assert.deepEqual(mergeRecords(merged,incoming[id]).practice.saved,[q.id]);
 importBackup(incoming,storage);assert.deepEqual(collectBackup(storage).subjects[id].practice.saved,[q.id]);
 backup.subjects[id].practice.saved=['missing'];assert.throws(()=>validateBackup(backup),/收藏/);
});

test('damaged checked or marked arrays never restore and cannot manufacture practice credit',()=>{
 const s=SUBJECTS.options,e=createExamEngine(s),q=s.QUESTIONS[0],session=e.makeSession([q.id],'practice');
 assert.ok(e.validSession(session,s.QUESTIONS));
 assert.equal(e.validSession({...session,checked:[q.id]},s.QUESTIONS),false);
 assert.equal(e.validSession({...session,marked:[q.id,q.id]},s.QUESTIONS),false);
 assert.equal(e.validSession({...session,answers:{[q.id]:q.answer},checked:[q.id,q.id]},s.QUESTIONS),false);
 assert.equal(e.validSession({...session,deadline:123},s.QUESTIONS),false);
 assert.equal(isCorrect([0,0],{answer:[0,1]}),false);
});

test('legacy exam grades use the original profile instead of current weights or pass conditions',()=>{
 const q={id:'a',chapter:1,answer:0,options:['正确','错误']},old={quotas:{1:1},points:50,minutes:10,pass:60},current={...old,points:100};
 const c={CHAPTERS:{1:{level:1}},PROFILES:{standard:current},LEGACY_PROFILES:{old:{standard:old}},COMPATIBLE_BANK_VERSIONS:['old','new']};
 const session={id:'example',title:'旧答卷',version:'old',ids:['a'],mode:'exam',profile:'standard',answers:{a:0},checked:[],marked:[],index:0,startedAt:1000,deadline:601000};
 assert.ok(validSession(session,[q],c));assert.equal(grade(session,[q],c).score,50);assert.equal(grade(session,[q],c).passed,false);
 assert.equal(grade({...session,version:'new'},[q],c).score,100);
 assert.equal(grade({...session,ids:[],mode:'practice'},[q],c).score,0);
});

test('rule snapshots distinguish publication from future commencement with explicit scope',()=>{
 const rule=POLICY_NOTICES.find(n=>n.id==='derivatives2026');
 assert.equal(rule.effective,'2026-11-16');assert.match(ruleStatus(rule,'2026-10-13'),/未施行/);
 assert.equal(ruleStatus(rule,'2026-11-16'),'核对时已施行');assert.match(rule.detail,/非标准化/);
});

test('review rendering escapes content, does not render answers in collections and supports complete chapters',()=>{
 const s=SUBJECTS.options,state=empty(),q=s.QUESTIONS.find(q=>q.rationales);state.saved=[q.id];
 const html=reviewWorkbench(s,state);assert.ok(html.includes('非掌握度'));assert.ok(!html.includes(q.rationales[1]));
 const injected=optionRationales({...q,options:['<script>x</script>',...q.options.slice(1)]},q.answer);
 assert.ok(!injected.includes('<script>'));assert.ok(injected.includes('&lt;script&gt;'));
 for(const item of s.QUESTIONS)state.progress[item.id]={attempts:1,correct:1,wrong:false};
 assert.ok(!reviewWorkbench(s,state).includes('data-status="unseen" aria-label="练习'));
});
