import test from 'node:test';
import assert from 'node:assert/strict';
import {SUBJECTS} from '../src/subjects.js';
import {createExamEngine} from '../src/engine.js';
import {createDrill} from '../src/drill-engine.js';
import {studyHome} from '../src/study-home.js';
import {focusedDrillView} from '../src/drill-views.js';
import {collectBackup,validateBackup,mergeRecords} from '../src/learning-records.js';
for(const subject of Object.values(SUBJECTS))test(`${subject.id}: focused view offers questions, not configuration`,()=>{
 const plan=createDrill(subject.QUESTIONS.map(q=>q.id),{endless:true,instant:true});
 const session={...createExamEngine(subject).makeSession(plan.ids,'practice'),drill:plan.drill};
 const question=subject.QUESTIONS.find(q=>q.id===session.ids[0]);
 const html=focusedDrillView({session,question,subject,correct:0,bookmark:'',explanation:'PRIVATE_EXPLANATION',warning:''});
 assert.ok(html.includes('id="question-title"'));assert.ok(!/<select|<input|drill-count|drill-settings|PRIVATE_EXPLANATION/.test(html));
 const home=studyHome(subject,{active:null,progress:{},history:[],saved:[]},{done:[],last:subject.LESSONS[0].id},'');
 assert.ok(home.includes('开始随机刷题'));assert.ok(home.includes(subject.QUESTIONS.length+' 道本科题目'));
});
test('suspended timed exam survives export, validation and merge without changing deadline',()=>{
 const s=SUBJECTS.options,e=createExamEngine(s),exam=e.makeSession(e.makePaper(s.QUESTIONS,'comprehensive'),'exam','comprehensive');
 const plan=createDrill(s.QUESTIONS.map(q=>q.id),{endless:true});const active={...e.makeSession(plan.ids,'practice'),drill:plan.drill};
 const practice={active,suspended:exam,progress:{},history:[],saved:[]};
 const data=collectBackup({getItem:key=>key===s.practiceKey?JSON.stringify(practice):null});
 const parsed=validateBackup(data);assert.deepEqual(parsed.options.practice.suspended,exam);
 const merged=mergeRecords(parsed.options,parsed.options);assert.deepEqual(merged.practice.suspended,exam);assert.deepEqual(merged.practice.active,active);
 data.subjects.options.practice.suspended={invalid:true};assert.throws(()=>validateBackup(data),/暂存答卷/);
});
