import * as optionsConfig from './config.js';
import { QUESTIONS } from './questions.js';
import { LESSONS, COURSE_SOURCES } from './course-data.js';
import { FUND_CONFIGS } from './fund-config.js';
import { FUND_QUESTIONS } from './fund-questions.js';
import { FUND_LESSONS } from './fund-course-data.js';
import { ACADEMY_CONFIGS, ACADEMY_QUESTIONS, ACADEMY_LESSONS } from './academy-data.js';
import { SUPPLEMENT } from './supplement-questions.js';
import { VERIFIED_QUESTIONS, VERIFIED_SOURCES } from './verified-questions.js';
const expanded = (id, bank) => [...bank, ...SUPPLEMENT[id], ...VERIFIED_QUESTIONS[id]];
const upgrade = config => ({
  ...config,
  BANK_VERSION: `${config.id || 'options'}-2026-10-03.1`,
  COMPATIBLE_BANK_VERSIONS: [...config.COMPATIBLE_BANK_VERSIONS, `${config.id || 'options'}-2026-10-03.1`],
  SOURCES: {...config.SOURCES, ...VERIFIED_SOURCES},
});
export const SUBJECTS = {
  options: { ...upgrade(optionsConfig), id:'options', isFund:false, family:'期权开户', name:'股票 / ETF 期权', short:'期权开户', QUESTIONS:expanded('options',QUESTIONS), LESSONS, COURSE_SOURCES, practiceKey:'zhiquan.practice.v1', courseKey:'zhiquan.course.v1' },
  ...Object.fromEntries(Object.entries(FUND_CONFIGS).map(([id,c])=>[id,{...upgrade(c),family:'基金从业',QUESTIONS:expanded(id,FUND_QUESTIONS[id]),LESSONS:FUND_LESSONS[id],COURSE_SOURCES:{},practiceKey:`zhiquan.${id}.practice.v1`,courseKey:`zhiquan.${id}.course.v1`}])),
  ...Object.fromEntries(Object.entries(ACADEMY_CONFIGS).map(([id,c])=>[id,{...c,SOURCES:{...c.SOURCES,...VERIFIED_SOURCES},QUESTIONS:expanded(id,ACADEMY_QUESTIONS[id]),LESSONS:ACADEMY_LESSONS[id],practiceKey:`zhiquan.${id}.practice.v1`,courseKey:`zhiquan.${id}.course.v1`}])),
};
const requested = new URLSearchParams(typeof location === 'undefined' ? '' : location.search).get('subject');
export const SUBJECT = Object.hasOwn(SUBJECTS,requested) ? SUBJECTS[requested] : SUBJECTS.options;
export const subjectOptions = () => [...new Set(Object.values(SUBJECTS).map(s=>s.family))].map(family=>`<optgroup label="${family}">${Object.values(SUBJECTS).filter(s=>s.family===family).map(s=>`<option value="${s.id}" ${s.id===SUBJECT.id?'selected':''}>${s.name}</option>`).join('')}</optgroup>`).join('');
