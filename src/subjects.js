import * as optionsConfig from './config.js';
import { QUESTIONS } from './questions.js';
import { LESSONS, COURSE_SOURCES } from './course-data.js';
import { FUND_CONFIGS } from './fund-config.js';
import { FUND_QUESTIONS } from './fund-questions.js';
import { FUND_LESSONS } from './fund-course-data.js';
export const SUBJECTS = {
  options: { ...optionsConfig, id:'options', isFund:false, name:'股票 / ETF 期权', short:'期权开户', QUESTIONS, LESSONS, COURSE_SOURCES, practiceKey:'zhiquan.practice.v1', courseKey:'zhiquan.course.v1' },
  ...Object.fromEntries(Object.entries(FUND_CONFIGS).map(([id,c])=>[id,{...c,QUESTIONS:FUND_QUESTIONS[id],LESSONS:FUND_LESSONS[id],COURSE_SOURCES:{},practiceKey:`zhiquan.${id}.practice.v1`,courseKey:`zhiquan.${id}.course.v1`}]))
};
const requested = new URLSearchParams(location.search).get('subject');
export const SUBJECT = SUBJECTS[requested] || SUBJECTS.options;
export const subjectOptions = () => Object.values(SUBJECTS).map(s=>`<option value="${s.id}" ${s.id===SUBJECT.id?'selected':''}>${s.isFund ? `基金从业 · 科目${['','一','二','三'][s.number]}｜` : ''}${s.name}</option>`).join('');
