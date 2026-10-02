import { SUBJECTS } from './subjects.js';
import { createExamEngine } from './engine.js';
const FORMAT = 'zhiquan.learning-backup';
const emptyPractice = () => ({active:null,progress:{},history:[]});
const emptyCourse = subject => ({last:subject.LESSONS[0].id,done:[]});

export function validateBackup(data) {
  if (!data || data.format!==FORMAT || data.version!==1 || !data.subjects || typeof data.subjects!=='object' || Array.isArray(data.subjects)) throw new Error('这不是知权导出的学习记录文件。');
  const subjects={};
  for (const [id,record] of Object.entries(data.subjects)) {
    const subject=Object.hasOwn(SUBJECTS,id)?SUBJECTS[id]:null;
    if (!subject || !record || typeof record!=='object') throw new Error('备份包含无法识别的科目。');
    const p=record.practice||emptyPractice(),course=record.course||emptyCourse(subject),{validSession}=createExamEngine(subject);
    if (!p.progress || typeof p.progress!=='object' || Array.isArray(p.progress) || !Array.isArray(p.history) || p.history.length>50) throw new Error(`${subject.name}的记录格式不完整。`);
    const progress={},ids=new Set(subject.QUESTIONS.map(q=>q.id));
    for (const [questionId,value] of Object.entries(p.progress)) {
      if (!ids.has(questionId) || !value || !Number.isSafeInteger(value.attempts) || value.attempts<=0 || !Number.isSafeInteger(value.correct) || value.correct<0 || value.correct>value.attempts || typeof value.wrong!=='boolean') throw new Error(`${subject.name}包含无效的作答记录。`);
      progress[questionId]={attempts:value.attempts,correct:value.correct,wrong:value.wrong};
    }
    if (p.active && !validSession(p.active,subject.QUESTIONS)) throw new Error(`${subject.name}的未完成答卷不兼容。`);
    if (p.history.some(s=>!validSession(s,subject.QUESTIONS)||!Number.isFinite(s.endedAt))) throw new Error(`${subject.name}包含无法恢复的历史答卷。`);
    const lessonIds=new Set(subject.LESSONS.map(l=>l.id));
    if (!Array.isArray(course.done) || course.done.some(l=>!lessonIds.has(l)) || !lessonIds.has(course.last)) throw new Error(`${subject.name}包含无效的阅读进度。`);
    subjects[id]={practice:{active:p.active||null,progress,history:p.history},course:{last:course.last,done:[...new Set(course.done)]}};
  }
  if (!Object.keys(subjects).length) throw new Error('备份中没有可导入的科目记录。');
  return subjects;
}

export function collectBackup(storage=localStorage) {
  const subjects={};
  for (const subject of Object.values(SUBJECTS)) {
    subjects[subject.id]={practice:JSON.parse(storage.getItem(subject.practiceKey)||'null')||emptyPractice(),course:JSON.parse(storage.getItem(subject.courseKey)||'null')||emptyCourse(subject)};
  }
  const data={format:FORMAT,version:1,exportedAt:new Date().toISOString(),subjects};
  validateBackup(data);
  return data;
}

// Prefer the record with more attempts; adding two backups would double count
// the same work. Preserve an ongoing local session and merge history by ID.
export function mergeRecords(local,incoming) {
  const progress={...local.practice.progress};
  for (const [id,p] of Object.entries(incoming.practice.progress)) if (!progress[id] || p.attempts>progress[id].attempts) progress[id]=p;
  const history=[...new Map([...incoming.practice.history,...local.practice.history].map(s=>[s.id,s])).values()].sort((a,b)=>b.endedAt-a.endedAt).slice(0,50);
  return {
    practice:{active:local.practice.active||incoming.practice.active,progress,history},
    course:{last:incoming.course.last,done:[...new Set([...local.course.done,...incoming.course.done])]},
  };
}

export function importBackup(subjects,storage=localStorage) {
  const before=new Map(),writes=[];
  for (const [id,record] of Object.entries(subjects)) {
    const s=SUBJECTS[id];
    let local;
    try {
      const candidate={practice:JSON.parse(storage.getItem(s.practiceKey)||'null')||emptyPractice(),course:JSON.parse(storage.getItem(s.courseKey)||'null')||emptyCourse(s)};
      local=validateBackup({format:FORMAT,version:1,subjects:{[id]:candidate}})[id];
    } catch { local={practice:emptyPractice(),course:emptyCourse(s)}; }
    const merged=mergeRecords(local,record);
    for (const [key,value] of [[s.practiceKey,merged.practice],[s.courseKey,merged.course]]) {
      before.set(key,storage.getItem(key));writes.push([key,JSON.stringify(value)]);
    }
  }
  try { for (const [key,value] of writes) storage.setItem(key,value); }
  catch (error) {
    for (const [key,value] of before) { if(value===null)storage.removeItem(key);else storage.setItem(key,value); }
    throw error;
  }
}

export function downloadBackup() {
  const data=collectBackup(),blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download=`zhiquan-learning-${data.exportedAt.slice(0,10)}.json`;a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
