// Run only after the complete content batch is accepted and authors have frozen edits.
// This is an attribution-only migration, never permission to refresh changed answers.
import {readFileSync,writeFileSync,existsSync,renameSync,unlinkSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const apply=process.argv.includes('--apply');
const specs=[
 ['fund-governance','FUND_GOVERNANCE','AI辅助逐题原创；已由另一轮AI内容复核并核对列明官方来源。大纲映射不表示充分覆盖；虚构教学案例，不是官方真题或人类专家审定。'],
 ['investment','INVESTMENT','AI辅助逐题原创；已由另一轮AI内容复核并核对列明来源，计算题另行复算。大纲映射不表示完整覆盖；数字和合同条件限于题设，不是官方真题或人类专家审定。'],
 ['derivatives','DERIVATIVES','AI辅助逐题原创；已由另一轮AI内容复核并核对列明原理来源，计算题另行复算。报价、合同和数字为明示教学假设，不代表统一业务规则，不是人类专家审定。'],
 ['regulation','REGULATION','AI辅助逐题原创；已由另一轮AI内容复核，核对官方法源、主体、触发条件和适用范围。法律为参考依据，不是官方试题、考试回忆或人类专家审定。']
];
const paths=['docs/expansion-independent-review.json','docs/expansion-derivatives-review.json','docs/expansion-integration-review.json'];
const manifestBackups=new Map(paths.map(p=>[p,readFileSync(p,'utf8')]));
const manifests=paths.map(p=>JSON.parse(manifestBackups.get(p)));
const records=manifests.flatMap(m=>m.accepted||m.questions);
assert.equal(new Set(records.map(r=>r.id)).size,records.length,'duplicate acceptance IDs');
const accepted=new Map(records.map(r=>[r.id,r]));
const hash=q=>createHash('sha256').update(JSON.stringify(q)).digest('hex');
const withoutNote=q=>{const c={...q};delete c.reviewNote;return c;};
const originalFiles=new Map(),before=new Map(),groups=[];
for(const[name,key,note]of specs){
 const path=`src/expansion-${name}.js`,text=readFileSync(path,'utf8');
 originalFiles.set(path,text);
 const bank=(await import(`../${path}?before=${Date.now()}`))[`EXPANSION_${key}_QUESTIONS`];
 const questions=Object.values(bank).flat();
 const oldNotes=[...new Set(questions.map(q=>q.reviewNote))];
 assert.ok(oldNotes.some(note=>!note.includes('AI辅助')),'already migrated; do not repeat');
 for(const q of questions){assert.equal(accepted.get(q.id)?.sha256,hash(q),`unaccepted/changed ${q.id}`);before.set(q.id,q);}
 groups.push({path,key,oldNotes,newNote:note,count:questions.length});
}
const intermediation=(await import('../src/expansion-intermediation.js')).EXPANSION_INTERMEDIATION_QUESTIONS;
for(const q of Object.values(intermediation).flat())assert.equal(accepted.get(q.id)?.sha256,hash(q),`unaccepted ${q.id}`);
assert.ok(records.length>=2892,'target not yet reached');
assert.equal(records.length,before.size+Object.values(intermediation).flat().length,'unexpected acceptance scope');
if(!apply){console.log(JSON.stringify({ready:true,attributionChanges:before.size,alreadyAccurate:records.length-before.size,groups}));process.exit(0);}
const evidencePath='docs/expansion-attribution-migration.json';assert.ok(!existsSync(evidencePath),'migration already exists');
const changes=[],written=new Map();
const atomicWrite=(path,text)=>{const temp=path+'.attribution-tmp';try{writeFileSync(temp,text);renameSync(temp,path);written.set(path,text);}finally{if(existsSync(temp))unlinkSync(temp);}};
try{
 for(const g of groups){const old=originalFiles.get(g.path);assert.equal(readFileSync(g.path,'utf8'),old,'author changed file during freeze');let updated=old;for(const oldNote of g.oldNotes){const needle=JSON.stringify(oldNote).replace(/^"|"$/g,"'");assert.equal(updated.split(needle).length,2,`${g.path}: unique attribution literal`);updated=updated.replace(needle,`'${g.newNote}'`);}atomicWrite(g.path,updated.replace('Each row is manually authored','Each row is AI-assisted and individually authored'));}
 for(const g of groups){
  const bank=(await import(`../${g.path}?after=${Date.now()}`))[`EXPANSION_${g.key}_QUESTIONS`];
  for(const q of Object.values(bank).flat()){
   const old=before.get(q.id);assert.ok(old,q.id);assert.deepEqual(withoutNote(q),withoutNote(old),`non-attribution change ${q.id}`);
   const restored={...q,reviewNote:old.reviewNote};assert.equal(hash(restored),accepted.get(q.id).sha256,`old object not reproducible ${q.id}`);
   changes.push({id:q.id,group:g.path,oldNoteIndex:g.oldNotes.indexOf(old.reviewNote),beforeSha256:hash(old),afterSha256:hash(q),contentWithoutNoteSha256:hash(withoutNote(q))});
  }
  if(g.key==='DERIVATIVES')manifests[1].subjectHashes=Object.fromEntries(Object.entries(bank).map(([id,qs])=>[id,hash(qs)]));
 }
 assert.equal(changes.length,before.size);

const byId=new Map(changes.map(c=>[c.id,c]));
for(let i=0;i<manifests.length;i++){
 for(const r of manifests[i].accepted||manifests[i].questions){const change=byId.get(r.id);if(change){assert.equal(r.sha256,change.beforeSha256);r.sha256=change.afterSha256;r.attributionMigration=evidencePath;}}
 assert.equal(readFileSync(paths[i],'utf8'),manifestBackups.get(paths[i]),'reviewer changed manifest during freeze');
 atomicWrite(paths[i],JSON.stringify(manifests[i],null,2)+'\n');
}
atomicWrite(evidencePath,JSON.stringify({createdAt:new Date().toISOString(),scope:'Only reviewNote changed; not a new content acceptance. Full previous objects are reversibly reconstructed from current objects and the recorded oldNote.',independentVerification:'pending',groups,changes},null,2)+'\n');
}catch(error){
 for(const[p,ourText]of [...written]){
  assert.equal(readFileSync(p,'utf8'),ourText,`concurrent edit to ${p}; stop without overwriting`);
  const backup=originalFiles.get(p)??manifestBackups.get(p);
  if(backup!==undefined)atomicWrite(p,backup);else if(p===evidencePath)unlinkSync(p);
 }
 throw error;
}
console.log(JSON.stringify({changed:changes.length,evidencePath,independentVerification:'pending'}));
