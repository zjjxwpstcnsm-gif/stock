import { EXPANSION_QUESTIONS, EXPANSION_SOURCES } from './expansion-questions.js';
import { FUND_COVERAGE_QUESTIONS, FUND_COVERAGE_SOURCES } from './coverage-fund-questions.js';
import { COVERAGE_POLISH_QUESTIONS, COVERAGE_POLISH_SOURCES } from './coverage-polish-questions.js';
import { RULE_REVIEW_QUESTIONS, RULE_REVIEW_SOURCES } from './rule-review-questions.js';
import { CALCULATION_SOURCES } from './calculation-walkthroughs.js';
import { CLINIC_QUESTIONS, CLINIC_SOURCES } from './clinic-questions.js';
import { WORKSHOP_QUESTIONS, WORKSHOP_SOURCES } from './workshop-questions.js';
import { PRECISION_QUESTIONS, PRECISION_SOURCES } from './precision-questions.js';
import * as optionsConfig from './config.js';
import { QUESTIONS } from './questions.js';
import { LESSONS, COURSE_SOURCES } from './course-data.js';
import { FUND_CONFIGS } from './fund-config.js';
import { FUND_QUESTIONS } from './fund-questions.js';
import { FUND_LESSONS } from './fund-course-data.js';
import { ACADEMY_CONFIGS, ACADEMY_QUESTIONS, ACADEMY_LESSONS } from './academy-data.js';
import { SUPPLEMENT } from './supplement-questions.js';
import { VERIFIED_QUESTIONS, VERIFIED_SOURCES } from './verified-questions.js';
import { CASEBOOK_QUESTIONS } from './casebook-questions.js';
import { CASEBOOK_SOURCES } from './content-quality.js';
const expanded = (id, bank) => [...bank, ...SUPPLEMENT[id], ...VERIFIED_QUESTIONS[id], ...CASEBOOK_QUESTIONS[id], ...PRECISION_QUESTIONS[id], ...WORKSHOP_QUESTIONS[id], ...CLINIC_QUESTIONS[id], ...RULE_REVIEW_QUESTIONS[id], ...(FUND_COVERAGE_QUESTIONS[id] || []), ...EXPANSION_QUESTIONS[id], ...(COVERAGE_POLISH_QUESTIONS[id] || [])];
const upgrade = config => ({
  ...config,
  BANK_VERSION: `${config.id || 'options'}-2026-10-17.1`,
  COMPATIBLE_BANK_VERSIONS: [...config.COMPATIBLE_BANK_VERSIONS, `${config.id || 'options'}-2026-10-03.1`, `${config.id || 'options'}-2026-10-13.1`, `${config.id || 'options'}-2026-10-13.2`, `${config.id || 'options'}-2026-10-13.3`, `${config.id || 'options'}-2026-10-13.4`, `${config.id || 'options'}-2026-10-14.1`, `${config.id || 'options'}-2026-10-14.2`, `${config.id || 'options'}-2026-10-17.1`],
  SOURCES: {...config.SOURCES, ...VERIFIED_SOURCES,...CASEBOOK_SOURCES,...PRECISION_SOURCES,...WORKSHOP_SOURCES,...CLINIC_SOURCES,...CALCULATION_SOURCES,...RULE_REVIEW_SOURCES,...FUND_COVERAGE_SOURCES,...EXPANSION_SOURCES,...COVERAGE_POLISH_SOURCES},
});
export const SUBJECTS = {
  options: { ...upgrade(optionsConfig), id:'options', isFund:false, family:'期权开户', name:'股票 / ETF 期权', short:'期权开户', QUESTIONS:expanded('options',QUESTIONS), LESSONS, COURSE_SOURCES, practiceKey:'zhiquan.practice.v1', courseKey:'zhiquan.course.v1' },
  ...Object.fromEntries(Object.entries(FUND_CONFIGS).map(([id,c])=>[id,{...upgrade(c),family:'基金从业',QUESTIONS:expanded(id,FUND_QUESTIONS[id]),LESSONS:FUND_LESSONS[id],COURSE_SOURCES:{},practiceKey:`zhiquan.${id}.practice.v1`,courseKey:`zhiquan.${id}.course.v1`}])),
  ...Object.fromEntries(Object.entries(ACADEMY_CONFIGS).map(([id,c])=>[id,{...upgrade(c),SOURCES:{...c.SOURCES,...VERIFIED_SOURCES,...CASEBOOK_SOURCES,...PRECISION_SOURCES,...WORKSHOP_SOURCES,...CLINIC_SOURCES,...CALCULATION_SOURCES,...RULE_REVIEW_SOURCES,...FUND_COVERAGE_SOURCES,...EXPANSION_SOURCES,...COVERAGE_POLISH_SOURCES},QUESTIONS:expanded(id,ACADEMY_QUESTIONS[id]),LESSONS:ACADEMY_LESSONS[id],practiceKey:`zhiquan.${id}.practice.v1`,courseKey:`zhiquan.${id}.course.v1`}])),
};
const requested = new URLSearchParams(typeof location === 'undefined' ? '' : location.search).get('subject');
export const SUBJECT = Object.hasOwn(SUBJECTS,requested) ? SUBJECTS[requested] : SUBJECTS.options;
export const subjectOptions = () => [...new Set(Object.values(SUBJECTS).map(s=>s.family))].map(family=>`<optgroup label="${family}">${Object.values(SUBJECTS).filter(s=>s.family===family).map(s=>`<option value="${s.id}" ${s.id===SUBJECT.id?'selected':''}>${s.name}</option>`).join('')}</optgroup>`).join('');
