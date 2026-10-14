import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {SUBJECTS} from '../src/subjects.js';
import {SUPPLEMENT} from '../src/supplement-questions.js';
import {calculationWalkthrough} from '../src/calculation-walkthroughs.js';
const baseline=JSON.parse(readFileSync(new URL('./fixtures/record-compatibility.json',import.meta.url)));
test('all 2838 existing IDs, option meanings and answer indices are unchanged',()=>{
 let count=0;
 for(const [id,snapshot] of Object.entries(baseline.subjects)){
  const old=SUBJECTS[id].QUESTIONS.slice(0,snapshot.count);
  const actual=createHash('sha256').update(JSON.stringify(old.map(q=>[q.id,q.options,q.answer]))).digest('hex');
  assert.equal(actual,snapshot.recordHash,id);count+=old.length;
 }
 assert.equal(count,2838);
});
test('480 existing numeric variants now show substituted derivations and honest model provenance',()=>{
 const all=Object.values(SUPPLEMENT).flat();assert.equal(all.length,480);
 for(const q of all){
  assert.equal(q.source,'calculationAudit');assert.ok(q.curriculumSource);
  assert.equal(q.reviewedAt,'2026-10-14');assert.match(q.explanation,/分步复算：/);
  assert.ok(q.explanation.includes(`＝${q.options[q.answer]}。`),q.id);
  assert.ok(!q.explanation.includes('undefined')&&!q.explanation.includes('NaN'),q.id);
  assert.match(q.referenceSection,/题设假定/);assert.ok(q.variantFamily);
 }
 assert.throws(()=>calculationWalkthrough('unsupported',{},0,''),/Missing walkthrough/);
});
test('covered-call breakeven states a strike above the breakeven, ensuring a zero-profit point exists',()=>{
 const q=SUBJECTS.options.QUESTIONS.find(q=>q.id==='c2-007');
 assert.match(q.stem,/3\.20/);assert.equal(q.options[q.answer],'2.92 元');
 const cost=3,strike=3.2,premium=.08,spot=2.92;
 assert.ok(Math.abs(spot-cost+premium-Math.max(spot-strike,0))<1e-10);
});
test('long straddle states the nonnegative-price lower-bound condition',()=>{
 const q=SUBJECTS.options.QUESTIONS.find(q=>q.id==='c3-068');
 assert.match(q.stem,/权利金总支出小于共同行权价/);
 const strike=100,premium=10,payoff=s=>Math.abs(s-strike)-premium;
 assert.equal(payoff(strike-premium),0);assert.equal(payoff(strike+premium),0);
 // A premium above K makes the theoretical lower solution negative and unreachable.
 assert.ok(100-120<0);
});
test('corrected rule references expose the precise version and separate recall attribution',()=>{
 const q=SUBJECTS.securities2.QUESTIONS.find(q=>q.id==='securities2-clinic-001');
 assert.equal(q.source,'clinicIpoRegistration');assert.match(q.stem,/首次公开发行/);assert.match(q.referenceSection,/第九条/);
 for(const id of ['futures2-verified-fut2025class-2','futures2-verified-fut2025b-2']){
  const q=SUBJECTS.futures2.QUESTIONS.find(q=>q.id===id);
  assert.equal(q.sourceKind,'recall');assert.ok(q.sourceQuestion);assert.ok(q.referenceUrl.includes('c1654011'));
  assert.match(q.explanation,/2027-01-01/);assert.match(q.stem,/2019年修订/);assert.equal(q.reviewedAt,'2026-10-14');
 }
});
test('two existing fund case references now cite the provision that actually contains the rule',()=>{
 const contract=SUBJECTS.fund1.QUESTIONS.find(q=>q.id==='fund1-casebook-007');
 assert.match(contract.referenceSection,/第六十条第一款/);assert.equal(contract.explanation,contract.rationales[contract.answer]);
 const registration=SUBJECTS.fund1.QUESTIONS.find(q=>q.id==='fund1-casebook-017');
 assert.equal(registration.source,'operations');assert.match(registration.referenceSection,/第四条第二款/);
 assert.equal(registration.explanation,registration.rationales[registration.answer]);
 for(const q of [contract,registration])assert.equal(q.reviewedAt,'2026-10-14');
});
