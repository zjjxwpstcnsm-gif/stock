// Reproducible structural/lexical screening. Flags require editorial review;
// lexical similarity is not semantic proof, nor evidence of factual correctness.
import {writeFileSync,readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {SUBJECTS} from '../src/subjects.js';
import {FUND_OUTLINE} from '../src/fund-outline-data.js';
const batch='2026-10-14-expansion';
const normalize=s=>s.normalize('NFKC').toLowerCase().replace(/[0-9]+(?:[.,][0-9]+)*/g,'#').replace(/[零〇一二三四五六七八九十百千万亿两点壹贰叁肆伍陆柒捌玖拾佰仟]+(?=万元|亿元|元|年|月|日|天|个|项|倍|手|份|人|笔|次|层|档|成|%)/g,'#').replace(/[\s\p{P}\p{S}]/gu,'');
assert.equal(normalize('本金三点五万元，期限五个工作日'),normalize('本金28.7万元，期限15个工作日'),'numeric screening must recognize Chinese and Arabic unit-bearing values');
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
const reviewRecords=['docs/expansion-independent-review.json','docs/expansion-derivatives-review.json','docs/expansion-integration-review.json'].flatMap(path=>{
 if(!existsSync(path))return [];const data=JSON.parse(readFileSync(path,'utf8'));return data.accepted||data.questions||[];
});
const rawQuestions=new Map(Object.values(SUBJECTS).flatMap(s=>s.QUESTIONS.map(q=>[q.id,q])));
const acceptedIds=new Set(),reviewMismatches=[];
for(const r of reviewRecords){const q=rawQuestions.get(r.id);const hash=q&&createHash('sha256').update(JSON.stringify(q)).digest('hex');
 if(hash===r.sha256)acceptedIds.add(r.id);else reviewMismatches.push(r.id);
}
const coverage=Object.fromEntries(Object.entries(SUBJECTS).map(([id,s])=>{
 const added=s.QUESTIONS.filter(q=>q.editorialBatch===batch),outline=FUND_OUTLINE[id],accepted=added.filter(q=>acceptedIds.has(q.id));
 const baselineCodes=new Set(s.QUESTIONS.filter(q=>q.editorialBatch!==batch).flatMap(q=>q.outlineCodes||[]));
 const acceptedCodes=[...new Set(accepted.flatMap(q=>q.outlineCodes||[]))].sort();
 return [id,{total:s.QUESTIONS.length,added:added.length,independentlyAccepted:accepted.length,acceptedByChapter:Object.fromEntries([...new Set(accepted.map(q=>q.chapter))].sort((a,b)=>a-b).map(c=>[c,accepted.filter(q=>q.chapter===c).length])),authoredTopicLabels:new Set(added.map(q=>q.topic)).size,addedChapters:new Set(added.map(q=>q.chapter)).size,answerPositions:[0,1,2,3].map(a=>added.filter(q=>q.answer===a).length),correctOptionUniquelyLongest:added.filter(q=>q.options.every((o,i)=>i===q.answer||o.length<q.options[q.answer].length)).length,correctOptionUniquelyShortest:added.filter(q=>q.options.every((o,i)=>i===q.answer||o.length>q.options[q.answer].length)).length,correctOptionLengthFlags:added.filter(q=>q.options[q.answer].length>=1.5*Math.max(...q.options.filter((_,i)=>i!==q.answer).map(o=>o.length))).map(q=>({id:q.id,lengths:q.options.map(o=>o.length),ratio:Number((q.options[q.answer].length/Math.max(...q.options.filter((_,i)=>i!==q.answer).map(o=>o.length))).toFixed(2))})),...(outline?{officialObjectives:outline.length,mappedBefore:new Set(s.QUESTIONS.filter(q=>q.editorialBatch!==batch).flatMap(q=>q.outlineCodes||[])).size,mappedAfterDraft:new Set(s.QUESTIONS.flatMap(q=>q.outlineCodes||[])).size,mappedAfterAccepted:new Set(s.QUESTIONS.filter(q=>q.editorialBatch!==batch||acceptedIds.has(q.id)).flatMap(q=>q.outlineCodes||[])).size,acceptedExpansionObjectiveCodes:acceptedCodes,newlyExplicitObjectiveCodes:acceptedCodes.filter(code=>!baselineCodes.has(code)),newlyExplicitObjectives:acceptedCodes.filter(code=>!baselineCodes.has(code)).length}: {})}];
}));
const report={batch,baseline:2892,target:5784,total:all.length,added:fresh.length,independentlyAccepted:fresh.filter(q=>acceptedIds.has(q.id)).length,reviewMismatches,optionLengthCaution:'Length ratios are screening clues, not proof of an invalid question. Editorial review must improve plausible parallel alternatives without padding or creating a reverse shortest-answer cue.',coverageCaution:'Unique topic labels are author labels, not a count of independent knowledge points. Objective codes measure explicit question-to-syllabus mapping, not full mastery or complete objective treatment.',method:'Arabic digits and Chinese numerals immediately before numeric units normalized in stems; Chinese/Latin character trigram Jaccard >=0.32 or containment >=0.65 with >=12 shared trigrams. Cross-subject pairs included. Flags are editorial candidates, not automatic duplicate verdicts.',coverage,errors,exact,numericNormalized,similar:similar.sort((a,b)=>b.jaccard-a.jaccard),reusedOptions};
// Auditable syllabus-to-question map, with accepted and pending evidence kept separate.
const objectiveMap=Object.fromEntries(Object.entries(FUND_OUTLINE).map(([subject,objectives])=>[subject,objectives.map(objective=>{
 const matching=SUBJECTS[subject].QUESTIONS.filter(q=>q.outlineCodes?.includes(objective.code));
 return {...objective,baselineQuestionIds:matching.filter(q=>q.editorialBatch!==batch).map(q=>q.id),acceptedNewQuestionIds:matching.filter(q=>q.editorialBatch===batch&&acceptedIds.has(q.id)).map(q=>q.id),pendingNewQuestionIds:matching.filter(q=>q.editorialBatch===batch&&!acceptedIds.has(q.id)).map(q=>q.id)};
})]));
const chapterMap=Object.fromEntries(Object.entries(SUBJECTS).map(([subject,s])=>[subject,Object.entries(s.CHAPTERS).map(([chapter,definition])=>({chapter:Number(chapter),title:typeof definition==='string'?definition:definition.title||definition.name,baseline:s.QUESTIONS.filter(q=>q.chapter===Number(chapter)&&q.editorialBatch!==batch).length,acceptedNew:s.QUESTIONS.filter(q=>q.chapter===Number(chapter)&&q.editorialBatch===batch&&acceptedIds.has(q.id)).length,pendingNew:s.QUESTIONS.filter(q=>q.chapter===Number(chapter)&&q.editorialBatch===batch&&!acceptedIds.has(q.id)).length}))]));
writeFileSync('docs/expansion-coverage-map.json',JSON.stringify({batch,meaning:'Explicit mappings only; an unmapped objective is not proof of no relevant old questions. Mapping does not establish full coverage or mastery. Pending questions are not accepted evidence.',officialFundObjectives:objectiveMap,allSubjectPracticeChapters:chapterMap},null,2)+'\n');
const path=process.argv[2]||'docs/expansion-audit.json';writeFileSync(path,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({path,total:all.length,added:fresh.length,errors:errors.length,exact:exact.length,numericNormalized:numericNormalized.length,similar:similar.length,reusedOptions:reusedOptions.length,coverage},null,2));
if(errors.length||exact.length||numericNormalized.length||reviewMismatches.length)process.exitCode=1;
