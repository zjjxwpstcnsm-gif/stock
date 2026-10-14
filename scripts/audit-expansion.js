// Reproducible structural/lexical screening. Flags require editorial review;
// lexical similarity is not semantic proof, nor evidence of factual correctness.
import {writeFileSync} from 'node:fs';
import {SUBJECTS} from '../src/subjects.js';
import {FUND_OUTLINE} from '../src/fund-outline-data.js';
const batch='2026-10-14-expansion';
const normalize=s=>s.normalize('NFKC').toLowerCase().replace(/[0-9]+(?:[.,][0-9]+)*/g,'#').replace(/[\s\p{P}\p{S}]/gu,'');
const grams=s=>{const t=normalize(s);return new Set(Array.from({length:Math.max(t.length-2,0)},(_,i)=>t.slice(i,i+3)));};
const all=Object.values(SUBJECTS).flatMap(s=>s.QUESTIONS.map(q=>({...q,subjectId:s.id})));
const fresh=all.filter(q=>q.editorialBatch===batch),freshIds=new Set(fresh.map(q=>q.id));
const errors=[],exact=[],numericNormalized=[],similar=[],reusedOptions=[];
const stems=new Map(),normalized=new Map(),options=new Map();
for(const q of all){
 for(const [map,key,target] of [[stems,q.stem,exact],[normalized,normalize(q.stem),numericNormalized],[options,q.options.map(x=>x.normalize('NFKC').replace(/[\s\p{P}\p{S}]/gu,'')).sort().join('|'),reusedOptions]]){
  if(map.has(key)){for(const other of map.get(key))if(freshIds.has(q.id)||freshIds.has(other))target.push([other,q.id]);map.get(key).push(q.id);}else map.set(key,[q.id]);
 }
}
const vector=all.map(q=>grams(q.stem)), index=new Map();
for(let i=0;i<all.length;i++)for(const gram of vector[i]){if(!index.has(gram))index.set(gram,[]);index.get(gram).push(i);}
for(let i=0;i<all.length;i++){
 if(!freshIds.has(all[i].id))continue;
 const counts=new Map();for(const gram of vector[i])for(const j of index.get(gram))if(j!==i&&(!freshIds.has(all[j].id)||j<i))counts.set(j,(counts.get(j)||0)+1);
 for(const [j,n] of counts){const union=vector[i].size+vector[j].size-n,score=n/union,containment=n/Math.min(vector[i].size,vector[j].size);
  if(score>=.32||(containment>=.65&&n>=12))similar.push({a:all[j].id,b:all[i].id,jaccard:+score.toFixed(3),containment:+containment.toFixed(3)});
 }
}
for(const q of fresh){
 const s=SUBJECTS[q.subjectId];
 const check=(ok,rule)=>{if(!ok)errors.push({id:q.id,rule});};
 check(q.sourceKind==='original','original attribution');check(!q.variantFamily,'no generated variant family');
 check(q.options.length===4&&new Set(q.options).size===4,'four distinct options');
 check(q.rationales?.length===4&&q.rationales.every(r=>typeof r==='string'&&r.length>=15),'four substantive option reasons');
 check(new Set(q.rationales||[]).size===4,'distinct option reasons');
 check(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4,'valid answer index');
 check(q.explanation===q.rationales?.[q.answer],'answer explanation correspondence');
 check(Boolean(s.SOURCES[q.source]),'registered source');check(q.referenceSection?.length>=3,'specific reference section');
 check(Boolean(s.CHAPTERS[q.chapter]),'existing chapter');
 check(s.LESSONS.some(l=>l.id===q.lessonId&&l.practice===q.chapter),'lesson matches practice chapter');
 if(q.outlineCodes){const codes=new Set((FUND_OUTLINE[q.subjectId]||[]).map(o=>o.code));check(q.outlineCodes.every(code=>codes.has(code)),'real official objective codes');}
}
const coverage=Object.fromEntries(Object.entries(SUBJECTS).map(([id,s])=>{
 const added=s.QUESTIONS.filter(q=>q.editorialBatch===batch),outline=FUND_OUTLINE[id];
 return [id,{total:s.QUESTIONS.length,added:added.length,addedTopics:new Set(added.map(q=>q.topic)).size,addedChapters:new Set(added.map(q=>q.chapter)).size,answerPositions:[0,1,2,3].map(a=>added.filter(q=>q.answer===a).length),...(outline?{officialObjectives:outline.length,mappedBefore:new Set(s.QUESTIONS.filter(q=>q.editorialBatch!==batch).flatMap(q=>q.outlineCodes||[])).size,mappedAfter:new Set(s.QUESTIONS.flatMap(q=>q.outlineCodes||[])).size}: {})}];
}));
const report={batch,baseline:2892,target:5784,total:all.length,added:fresh.length,method:'Digit-normalized exact stems; Chinese/Latin character trigram Jaccard >=0.32 or containment >=0.65 with >=12 shared trigrams. Cross-subject pairs included. Flags are editorial candidates, not automatic duplicate verdicts.',coverage,errors,exact,numericNormalized,similar:similar.sort((a,b)=>b.jaccard-a.jaccard),reusedOptions};
const path=process.argv[2]||'docs/expansion-audit.json';writeFileSync(path,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({path,total:all.length,added:fresh.length,errors:errors.length,exact:exact.length,numericNormalized:numericNormalized.length,similar:similar.length,reusedOptions:reusedOptions.length,coverage},null,2));
if(errors.length||exact.length||numericNormalized.length)process.exitCode=1;
