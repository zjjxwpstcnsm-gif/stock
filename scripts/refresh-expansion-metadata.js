// Use on a stable source snapshot before CI/publication; never alters question content.
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {SUBJECTS} from '../src/subjects.js';
import {EXPANSION_QUESTIONS} from '../src/expansion-questions.js';
const release=JSON.parse(readFileSync('src/release.json','utf8'));
const total=Object.values(SUBJECTS).reduce((n,s)=>n+s.QUESTIONS.length,0),added=Object.values(EXPANSION_QUESTIONS).flat().length;
const explicitFundObjectives=['fund1','fund2','fund3'].reduce((n,id)=>n+new Set(SUBJECTS[id].QUESTIONS.flatMap(q=>q.outlineCodes||[])).size,0);
const complete=process.argv.includes('--complete');
if(complete){
 assert.ok(total>=5784&&added>=2892,`Cannot mark doubling complete: ${total} total/${added} new`);
 const records=['independent','derivatives','integration'].flatMap(name=>{
  const m=JSON.parse(readFileSync(`docs/expansion-${name}-review.json`,'utf8'));return m.accepted||m.questions;
 });
 assert.equal(records.length,added,'all new content must be accepted');
 const byId=new Map(records.map(r=>[r.id,r]));assert.equal(byId.size,records.length,'duplicate acceptance IDs');
 for(const q of Object.values(EXPANSION_QUESTIONS).flat()){
  assert.equal(byId.get(q.id)?.sha256,createHash('sha256').update(JSON.stringify(q)).digest('hex'),`unaccepted/changed ${q.id}`);
  assert.match(q.reviewNote,/AI辅助/);assert.doesNotMatch(q.reviewNote,/人工编写|手工编写/);
 }
 assert.equal(JSON.parse(readFileSync('docs/expansion-attribution-migration.json','utf8')).independentVerification,'passed','migration needs separate verification');
 if(existsSync('docs/expansion-chapter-migration.json'))assert.equal(JSON.parse(readFileSync('docs/expansion-chapter-migration.json','utf8')).independentVerification,'passed','chapter correction needs separate verification');
}
Object.assign(release,{version:'2026-10-14.2',questionCount:total,baselineExplicitFundObjectives:31,explicitFundObjectives,newExpansionQuestions:added,expansionTarget:5784,expansionStatus:complete?'complete':'in-progress'});
writeFileSync('src/release.json',JSON.stringify(release,null,2)+'\n');
const html=readFileSync('index.html','utf8').replace(/95章系统课程、\d+道训练题/,`95章系统课程、${total}道训练题`);
writeFileSync('index.html',html);
console.log({total,added,status:release.expansionStatus});
