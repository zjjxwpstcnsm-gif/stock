import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {SUBJECTS} from '../src/subjects.js';
import {EXPANSION_FUND_GOVERNANCE_QUESTIONS as governance} from '../src/expansion-fund-governance.js';
import {EXPANSION_INVESTMENT_QUESTIONS as investment} from '../src/expansion-investment.js';
import {EXPANSION_DERIVATIVES_QUESTIONS as derivativesBank} from '../src/expansion-derivatives.js';
import {EXPANSION_REGULATION_QUESTIONS as regulation} from '../src/expansion-regulation.js';
const general=JSON.parse(readFileSync(new URL('../docs/expansion-independent-review.json',import.meta.url)));
const derivatives=JSON.parse(readFileSync(new URL('../docs/expansion-derivatives-review.json',import.meta.url)));
const integration=JSON.parse(readFileSync(new URL('../docs/expansion-integration-review.json',import.meta.url)));
const accepted=[...general.accepted,...derivatives.questions,...integration.accepted];
const all=Object.values(SUBJECTS).flatMap(s=>s.QUESTIONS),byId=new Map(all.map(q=>[q.id,q]));
const hash=q=>createHash('sha256').update(JSON.stringify(q)).digest('hex');
test('each accepted question matches its independently reviewed content fingerprint',()=>{
 assert.equal(new Set(accepted.map(q=>q.id)).size,accepted.length,'review manifests must not double-count IDs');
 for(const row of accepted){assert.ok(byId.has(row.id),row.id);assert.equal(hash(byId.get(row.id)),row.sha256,`${row.id}: changed after independent review; rereview required`);}
});
test('a completed doubling release requires 5784 total and an accepted fingerprint for every new question',()=>{
 const release=JSON.parse(readFileSync(new URL('../src/release.json',import.meta.url)));
 const added=all.filter(q=>q.editorialBatch==='2026-10-14-expansion');
 if(release.expansionStatus!=='complete'){assert.equal(release.expansionStatus,'in-progress');return;}
 assert.ok(all.length>=5784);assert.ok(added.length>=2892);
 assert.equal(added.length,accepted.length);
 assert.deepEqual(new Set(added.map(q=>q.id)),new Set(accepted.map(q=>q.id)));
 assert.equal(release.questionCount,all.length);
 const attribution=JSON.parse(readFileSync(new URL('../docs/expansion-attribution-migration.json',import.meta.url)));
 assert.equal(attribution.independentVerification,'passed','attribution migration requires separate verification');
 for(const q of added){assert.match(q.reviewNote,/AI辅助/);assert.doesNotMatch(q.reviewNote,/人工编写|手工编写/);}
});

test('accepted question source links still match the separately reviewed source records',()=>{
 const registry=Object.assign({},...Object.values(SUBJECTS).map(s=>s.SOURCES));
 for(const manifest of [general,derivatives,integration]){
  const sources=manifest.sources||manifest.acceptedSourceSnapshots;
  for(const row of manifest.accepted||manifest.questions){const q=byId.get(row.id);assert.ok(sources[q.source],`${q.id}: missing reviewed source`);assert.equal(registry[q.source].url,sources[q.source].url,`${q.id}: reviewed source URL changed`);}
 }
});


test('attribution-only migration remains reversible and preserves every other question field',()=>{
 const path=new URL('../docs/expansion-attribution-migration.json',import.meta.url);
 if(!existsSync(path))return;
 const proof=JSON.parse(readFileSync(path)),groups=new Map(proof.groups.map(g=>[g.path,g]));
 const expectedGroups=new Map([
  ['src/expansion-fund-governance.js',governance],['src/expansion-investment.js',investment],
  ['src/expansion-derivatives.js',derivativesBank],['src/expansion-regulation.js',regulation]
 ].map(([path,bank])=>[path,Object.values(bank).flat().map(q=>q.id)]));
 assert.equal(proof.groups.length,expectedGroups.size);
 assert.deepEqual(new Set(groups.keys()),new Set(expectedGroups.keys()));
 assert.deepEqual(new Set(proof.changes.map(c=>c.id)),new Set([...expectedGroups.values()].flat()),'migration must include every question in all four modules');
 for(const [path,ids] of expectedGroups){
  assert.equal(groups.get(path).count,ids.length,`${path}: group count`);
  const changes=proof.changes.filter(c=>c.group===path);
  assert.equal(changes.length,ids.length,`${path}: change count`);
  assert.deepEqual(new Set(changes.map(c=>c.id)),new Set(ids),`${path}: complete ID membership`);
 }
 assert.equal(new Set(proof.changes.map(c=>c.id)).size,proof.changes.length);
 for(const row of proof.changes){
  const q=byId.get(row.id),g=groups.get(row.group);assert.ok(q&&g,row.id);
  assert.equal(q.reviewNote,g.newNote);assert.equal(hash(q),row.afterSha256);
  assert.ok(Number.isInteger(row.oldNoteIndex)&&row.oldNoteIndex>=0&&row.oldNoteIndex<g.oldNotes.length);
  assert.equal(hash({...q,reviewNote:g.oldNotes[row.oldNoteIndex]}),row.beforeSha256,`${row.id}: cannot reconstruct previous accepted object`);
  const content={...q};delete content.reviewNote;assert.equal(hash(content),row.contentWithoutNoteSha256);
  assert.equal(accepted.find(r=>r.id===row.id)?.sha256,row.afterSha256);
 }
});
test('bounded financing chapter correction preserves all question content and prior acceptance hashes',()=>{
 const path=new URL('../docs/expansion-chapter-migration.json',import.meta.url);if(!existsSync(path))return;
 const proof=JSON.parse(readFileSync(path));assert.equal(proof.changes.length,18);
 const ids=Array.from({length:18},(_,i)=>`securities1-expansion-intermed-${String(i+84).padStart(4,'0')}`);
 assert.deepEqual(new Set(proof.changes.map(c=>c.id)),new Set(ids));
 const release=JSON.parse(readFileSync(new URL('../src/release.json',import.meta.url)));
 if(release.expansionStatus==='complete')assert.equal(proof.independentVerification,'passed');
 for(const row of proof.changes){const q=byId.get(row.id);assert.equal(hash(q),row.afterSha256);assert.equal(hash({...q,...row.oldFields}),row.beforeSha256);
  assert.deepEqual(row.newFields,{chapter:1,lessonId:'securities1-1',scope:'证券基础.1'});
  for(const[k,v]of Object.entries(row.newFields))assert.equal(q[k],v);
  const content={...q};for(const k of['chapter','lessonId','scope'])delete content[k];assert.equal(hash(content),row.contentWithoutClassificationSha256);
  assert.equal(accepted.find(a=>a.id===row.id).sha256,row.afterSha256);
 }
});
