import test from 'node:test';
import assert from 'node:assert/strict';
import {createDrill,advanceDrill,validDrill,MAX_BATCH} from '../src/drill-engine.js';
import {drillNextButton,drillStatus} from '../src/drill-views.js';
import {SUBJECTS} from '../src/subjects.js';
import {createExamEngine,updateProgress} from '../src/engine.js';
import {collectBackup,validateBackup} from '../src/learning-records.js';
const asSession=(plan)=>({...plan,mode:'practice',checked:[...plan.ids]});
const sequence=(n)=>Array.from({length:n},(_,i)=>'q'+i);
const rng=()=>{let seed=17;return ()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};};
test('shuffle bag validates empty/duplicate IDs, counts and random source',()=>{
 for(const ids of [[],['a','a'],[null],[1],'a'])assert.throws(()=>createDrill(ids));
 for(const batchSize of [0,-1,201,Infinity,NaN,1.5,'10'])assert.throws(()=>createDrill(['a'],{batchSize}));
 assert.throws(()=>createDrill(['a'],{endless:'yes'}));assert.throws(()=>createDrill(['a','b'],{},()=>1));
 assert.equal(MAX_BATCH,200);
});
test('a cycle visits every question exactly once and trims only the final batch',()=>{
 const ids=sequence(23),original=[...ids],random=rng();let p=createDrill(ids,{batchSize:10},random);const seen=[];
 for(const size of [10,10,3]){assert.equal(p.ids.length,size);assert.equal(p.drill.cycle,1);seen.push(...p.ids);p=advanceDrill(asSession(p),size,random);}
 assert.deepEqual(new Set(seen),new Set(ids));assert.equal(new Set(seen).size,23);assert.equal(p.drill.cycle,2);assert.equal(p.drill.answered,23);assert.deepEqual(ids,original);
});
test('cycle boundary never repeats the previous item when more than one exists',()=>{
 let p=createDrill(sequence(4),{batchSize:1,endless:true},()=>0);let last;
 for(let i=0;i<100;i++){assert.notEqual(p.ids[0],last);last=p.ids[0];p=advanceDrill(asSession(p),1,()=>0);}
});
test('singleton and oversized requested batch continue safely and bounded',()=>{
 let p=createDrill(['a'],{batchSize:200,endless:true});
 for(let i=0;i<1000;i++){assert.deepEqual(p.ids,['a']);assert.equal(p.drill.remaining.length,0);assert.equal(p.drill.batches,i);p=advanceDrill(asSession(p),1);}
 assert.equal(p.drill.answered,1000);assert.equal(p.drill.correct,1000);assert.equal(p.drill.pool.length,1);
});
test('2000 batches do not grow the bag or lose cumulative accuracy',()=>{
 const ids=sequence(53),random=rng();let p=createDrill(ids,{batchSize:7,endless:true},random),answered=0;
 for(let i=0;i<2000;i++){answered+=p.ids.length;p=advanceDrill(asSession(p),0,random);assert.ok(p.ids.length+p.drill.remaining.length<=ids.length);assert.equal(p.drill.pool.length,53);}
 assert.equal(p.drill.answered,answered);assert.equal(p.drill.correct,0);assert.equal(p.drill.batches,2000);
});
test('resume preserves queued order, totals and does not mutate prior state',()=>{
 const random=rng(),p=createDrill(sequence(20),{batchSize:3,endless:true},random);const before=JSON.stringify(p);
 const next=advanceDrill(asSession(p),2,random);assert.deepEqual(next.ids,p.drill.remaining.slice(0,3));assert.equal(next.drill.answered,3);assert.equal(next.drill.correct,2);assert.equal(JSON.stringify(p),before);
 const restored=JSON.parse(JSON.stringify(asSession(next)));assert.ok(validDrill(restored,new Set(sequence(20))));
});
test('every subject supports valid random sessions and JSON backup validation',()=>{
 for(const s of Object.values(SUBJECTS)){
  const e=createExamEngine(s),plan=createDrill(s.QUESTIONS.map(q=>q.id),{batchSize:20,endless:true});
  const session={...e.makeSession(plan.ids,'practice'),drill:plan.drill};assert.ok(e.validSession(session,s.QUESTIONS),s.id);
  const fake={getItem:key=>key===s.practiceKey?JSON.stringify({active:session,history:[],progress:{},saved:[]}):null};
  const decoded=validateBackup(collectBackup(fake));assert.deepEqual(decoded[s.id].practice.active.drill,plan.drill);
 }
});
test('tampered infinite metadata never restores but legacy sessions still do',()=>{
 const s=SUBJECTS.options,e=createExamEngine(s),p=createDrill(s.QUESTIONS.slice(0,6).map(q=>q.id),{batchSize:2}),base={...e.makeSession(p.ids,'practice'),drill:p.drill};
 for(const patch of [{pool:['bad']},{pool:[p.ids[0],p.ids[0]]},{remaining:[p.ids[0]]},{batchSize:0},{correct:1},{cycle:0},{endless:1},{schema:999}])assert.equal(e.validSession({...base,drill:{...base.drill,...patch}},s.QUESTIONS),false,JSON.stringify(patch));
 assert.ok(e.validSession(e.makeSession(p.ids,'practice'),s.QUESTIONS));assert.equal(validDrill({...base,mode:'exam'},new Set(p.drill.pool)),false);
});
test('partial completion can requeue unfinished IDs without duplicating answered IDs',()=>{
 const p=createDrill(sequence(10),{batchSize:4},rng());const completed={...asSession(p),ids:[p.ids[0]],checked:[p.ids[0]],drill:{...p.drill,remaining:[...p.ids.slice(1),...p.drill.remaining]}};
 assert.ok(validDrill(completed,new Set(sequence(10))));const next=advanceDrill(completed,1);assert.deepEqual(next.ids.slice(0,3),p.ids.slice(1));assert.ok(!next.ids.includes(p.ids[0]));
});
test('UI has one continuous next action and explicit multi-select confirmation',()=>{
 const p=createDrill(['a','b'],{batchSize:10}),s={...asSession(p),index:1,answers:{a:0,b:1}};
 assert.match(drillNextButton({...s,checked:[],answers:{}},false,true),/提交多选答案/);
 assert.match(drillNextButton({...s,checked:[],answers:{}},false,true),/disabled/);
 assert.match(drillNextButton(s,false,false),/选择后即显示解析/);
 assert.match(drillNextButton(s,true),/下一题/);
 assert.match(drillNextButton({...s,drill:{...s.drill,endless:true}},true),/下一题/);
 assert.doesNotMatch(drillNextButton(s,true),/下一组|完成本组|配置/);
 assert.match(drillStatus(s,1),/50%/);
});
