// Teaching units follow the official 2026 chapter and section numbers.
// Existing five introductory modules retain their IDs and saved progress.
import { FUND_OUTLINE } from './fund-outline-data.js';
import { LAW_UNITS } from './fund-law-units.js';
import { INVESTMENT_UNITS } from './fund-investment-units.js';
import { EQUITY_UNITS } from './fund-equity-units.js';
export const FUND_UNITS = { fund1:LAW_UNITS, fund2:INVESTMENT_UNITS, fund3:EQUITY_UNITS };
export const FUND_EXTRA_QUESTIONS = {};
export const FUND_EXTRA_LESSONS = {};
for (const [subject, units] of Object.entries(FUND_UNITS)) {
 const questions=[],lessons=[];
 for (const [index,unit] of units.entries()) {
  const officialChapter=index+1, chapter=officialChapter+5;
  const lessonId=`${subject}-syllabus-${officialChapter}`;
  const unitQuestions=unit.questions.trim().split('\n').map((row,n)=>{
   const [scope,stem,right,b,c,d,explanation]=row.split('|');
   if (!explanation || ![right,b,c,d].every(Boolean)) throw new Error(`Invalid ${subject}/${officialChapter}: ${row}`);
   const options=[right,b,c,d],answer=(n+officialChapter)%4;
   for(let i=0;i<answer;i++) options.unshift(options.pop());
   return {id:`${subject}-s${officialChapter}-${String(n+1).padStart(2,'0')}`,chapter,scope,lessonId,topic:unit.title,stem,options,answer,explanation,source:`outline${subject.at(-1)}`,origin:'原创模拟 · 非真题',sourceKind:'original'};
  });
  questions.push(...unitQuestions);
  const objectives=FUND_OUTLINE[subject].filter(o=>Number(o.code.split('.')[0])===officialChapter);
  const first=unitQuestions[0];
  const extraSources=subject==='fund1' ? ['fundLaw',...(officialChapter===4?['assessment']:[])] : subject==='fund2' && [15,18].includes(officialChapter)?['salesFees']:subject==='fund3' && officialChapter===4?['qualified']:[];
  if(subject==='fund2' && [2,13].includes(officialChapter))extraSources.push('operations');
  if(subject==='fund2' && officialChapter===17)extraSources.push('reports');
  lessons.push({id:lessonId,short:unit.title,title:unit.title,intro:unit.intro,takeaway:unit.takeaway,stage:'2026大纲逐章',minutes:Math.max(10,unit.sections.length*4),practice:chapter,sources:[`outline${subject.at(-1)}`,'update',...extraSources],officialChapter,objectives,
   sections:unit.sections.map(([scope,title,text])=>({scope,title,html:`${text.split('\n').map(p=>`<p>${p}</p>`).join('')}`})),
   pitfall:unit.pitfall,check:{question:first.stem,options:first.options,answer:first.answer,explanation:first.explanation}});
 }
 FUND_EXTRA_QUESTIONS[subject]=questions;FUND_EXTRA_LESSONS[subject]=lessons;
}
export function outlineCoverage(subject) {
 return FUND_OUTLINE[subject].map(objective=>{
  const lesson=FUND_EXTRA_LESSONS[subject].find(l=>l.officialChapter===Number(objective.code.split('.')[0]));
  const scope=objective.code.substring(0,objective.code.lastIndexOf('.'));
  return {...objective,lessonId:lesson?.id,section:lesson?.sections.find(s=>s.scope===scope)?.title,questionCount:FUND_EXTRA_QUESTIONS[subject].filter(q=>q.scope===scope).length};
 });
}
