import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {SUBJECTS} from '../src/subjects.js';
import {FUND_OUTLINE} from '../src/fund-outline-data.js';
import {createExamEngine} from '../src/engine.js';
import {createDrill} from '../src/drill-engine.js';
const baseline=JSON.parse(readFileSync(new URL('./fixtures/pre-expansion-2892.json',import.meta.url)));
const batch='2026-10-14-expansion';
const digest=data=>createHash('sha256').update(JSON.stringify(data)).digest('hex');
test('all 2892 pre-expansion questions remain byte-for-byte intact and in stable order',()=>{
 let count=0;
 for(const [id,previous] of Object.entries(baseline.subjects)){
  const old=SUBJECTS[id].QUESTIONS.slice(0,previous.count);
  assert.equal(digest(old),previous.fullHash,id);
  assert.equal(digest(old.map(q=>[q.id,q.options,q.answer])),previous.recordHash,id);
  count+=old.length;
 }
 assert.equal(count,2892);
});
test('new expansion questions have four distinct explained options and valid provenance',()=>{
 const ids=new Set(),stems=new Set();
 for(const s of Object.values(SUBJECTS))for(const q of s.QUESTIONS){
  assert.ok(!ids.has(q.id),q.id);ids.add(q.id);
  if(q.editorialBatch!==batch)continue;
  assert.ok(!stems.has(q.stem),q.id);stems.add(q.stem);
  assert.equal(q.sourceKind,'original',q.id);assert.match(q.origin,/原创/);
  assert.ok(!q.variantFamily&&!q.year&&!q.sourceQuestion,q.id);
  assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4,q.id);
  assert.equal(q.rationales.length,4);assert.equal(new Set(q.rationales).size,4,q.id);
  assert.ok(q.rationales.every(r=>r.length>=15),q.id);
  assert.equal(q.explanation,q.rationales[q.answer],q.id);
  assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4,q.id);
  assert.ok(s.SOURCES[q.source]?.url.startsWith('https://'),q.id);
  assert.ok(q.referenceSection?.length>=3,q.id);
  assert.ok(s.LESSONS.some(l=>l.id===q.lessonId&&l.practice===q.chapter),q.id);
  if(q.outlineCodes){const codes=new Set(FUND_OUTLINE[s.id]?.map(o=>o.code)||[]);assert.ok(q.outlineCodes.every(code=>codes.has(code)),q.id);}
 }
});
test('expanded random-practice pool includes every old and new question with no setup',()=>{
 for(const s of Object.values(SUBJECTS)){
  const ids=s.QUESTIONS.map(q=>q.id),plan=createDrill(ids,{endless:true,instant:true});
  assert.deepEqual(new Set(plan.drill.pool),new Set(ids));
  assert.equal(plan.drill.endless,true);assert.equal(plan.drill.instant,true);
  const session=createExamEngine(s).makeSession(plan.ids,'practice');
  assert.ok(createExamEngine(s).validSession(session,s.QUESTIONS));
 }
});

test('release objective metrics preserve baseline and count explicit codes per subject',()=>{
 const release=JSON.parse(readFileSync(new URL('../src/release.json',import.meta.url)));
 assert.equal(release.baselineExplicitFundObjectives,31);
 assert.equal(release.explicitFundObjectives,['fund1','fund2','fund3'].reduce((n,id)=>n+new Set(SUBJECTS[id].QUESTIONS.flatMap(q=>q.outlineCodes||[])).size,0));
});
