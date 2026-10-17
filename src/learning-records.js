import { SUBJECTS } from './subjects.js';
import { createExamEngine } from './engine.js';
const FORMAT = 'zhiquan.learning-backup';
const RECOVERY_FORMAT = 'zhiquan.local-recovery';
const RECOVERY_PREFIX = 'zhiquan.local-recovery.v1.';
const emptyPractice = () => ({active:null,suspended:null,progress:{},history:[],saved:[]});
const emptyCourse = subject => ({last:subject.LESSONS[0].id,done:[]});
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const validProgress = value => isRecord(value) && Number.isSafeInteger(value.attempts) && value.attempts > 0 && Number.isSafeInteger(value.correct) && value.correct >= 0 && value.correct <= value.attempts && typeof value.wrong === 'boolean';
const validSessionId = value => typeof value === 'string' && value.length <= 100 && /^[a-zA-Z0-9_-]+$/.test(value);

// Used by local restoration; external backups reject malformed markers below.
export const restoreClosedSessionIds = value => [...new Set(Array.isArray(value)?value:[])].filter(validSessionId);

export function validateBackup(data) {
  if (!data || data.format!==FORMAT || data.version!==1 || !data.subjects || typeof data.subjects!=='object' || Array.isArray(data.subjects)) throw new Error('这不是知权导出的学习记录文件。');
  const subjects={};
  for (const [id,record] of Object.entries(data.subjects)) {
    const subject=Object.hasOwn(SUBJECTS,id)?SUBJECTS[id]:null;
    if (!subject || !isRecord(record)) throw new Error('备份包含无法识别的科目。');
    const p=record.practice||emptyPractice(),course=record.course||emptyCourse(subject),{validSession}=createExamEngine(subject);
    if (!p.progress || typeof p.progress!=='object' || Array.isArray(p.progress) || !Array.isArray(p.history) || p.history.length>50) throw new Error(`${subject.name}的记录格式不完整。`);
    const progress={},ids=new Set(subject.QUESTIONS.map(q=>q.id));
    for (const [questionId,value] of Object.entries(p.progress)) {
      if (!ids.has(questionId) || !validProgress(value)) throw new Error(`${subject.name}包含无效的作答记录。`);
      progress[questionId]={attempts:value.attempts,correct:value.correct,wrong:value.wrong};
    }
    const saved=p.saved??[];
    if(!Array.isArray(saved)||saved.length>ids.size||saved.some(id=>!ids.has(id))) throw new Error(`${subject.name}包含无效收藏。`);
    const closedSessionIds=p.closedSessionIds??[];
    if(!Array.isArray(closedSessionIds)||closedSessionIds.some(id=>!validSessionId(id)))throw new Error(`${subject.name}包含无效的已完成答卷标记。`);
    if (p.active && !validSession(p.active,subject.QUESTIONS)) throw new Error(`${subject.name}的未完成答卷不兼容。`);
    if (p.suspended && !validSession(p.suspended,subject.QUESTIONS)) throw new Error(`${subject.name}的暂存答卷不兼容。`);
    if (p.history.some(s=>!validSession(s,subject.QUESTIONS)||!Number.isFinite(s.endedAt))) throw new Error(`${subject.name}包含无法恢复的历史答卷。`);
    const lessonIds=new Set(subject.LESSONS.map(l=>l.id));
    if (!Array.isArray(course.done) || course.done.some(l=>!lessonIds.has(l)) || !lessonIds.has(course.last)) throw new Error(`${subject.name}包含无效的阅读进度。`);
    subjects[id]={practice:{active:p.active||null,...(p.suspended?{suspended:p.suspended}:{}),progress,history:p.history,saved:[...new Set(saved)],...(closedSessionIds.length?{closedSessionIds:[...new Set(closedSessionIds)]}:{})},course:{last:course.last,done:[...new Set(course.done)]}};
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
  const completed=new Map([...incoming.practice.history,...local.practice.history].map(s=>[s.id,s]));
  const history=[...completed.values()].sort((a,b)=>b.endedAt-a.endedAt).slice(0,50);
  // Remember only actual completed/pending conflicts. These small markers outlive
  // the recent-50 history limit, so importing the same older backup stays safe.
  const conflicts=[local.practice.active,local.practice.suspended,incoming.practice.active,incoming.practice.suspended].filter(s=>s&&completed.has(s.id)).map(s=>s.id);
  const closed=new Set([...(local.practice.closedSessionIds||[]),...(incoming.practice.closedSessionIds||[]),...conflicts]);
  const pending=session=>session&&!completed.has(session.id)&&!closed.has(session.id)?session:null;
  const localSessions=[local.practice.active,local.practice.suspended].map(pending).filter(Boolean);
  const preferLocal=session=>pending(session)&&(localSessions.find(s=>s.id===session.id)||session);
  // An earlier export must not resurrect a finished attempt and count it twice.
  const active=pending(local.practice.active)||preferLocal(incoming.practice.active)||null;
  // Keep both local slots first, then use a free slot for an incoming answer sheet.
  // A session exported while active may now be suspended locally; keep one copy.
  const suspended=[local.practice.suspended,incoming.practice.active,incoming.practice.suspended].map(preferLocal).find(s=>s&&s.id!==active?.id)||null;
  return {
    practice:{active,...(suspended?{suspended}:{}),progress,history,saved:[...new Set([...(local.practice.saved||[]),...(incoming.practice.saved||[])])],...(closed.size?{closedSessionIds:[...closed]}:{})},
    course:{last:incoming.course.last,done:[...new Set([...local.course.done,...incoming.course.done])]},
  };
}

function recoverLocal(subject,practiceRaw,courseRaw) {
  let practice,course,damaged=false;
  try { practice=JSON.parse(practiceRaw)??emptyPractice();if(!isRecord(practice))damaged=true; }
  catch { practice=emptyPractice();damaged=true; }
  try { course=JSON.parse(courseRaw)??emptyCourse(subject);if(!isRecord(course))damaged=true; }
  catch { course=emptyCourse(subject);damaged=true; }
  try {
    const record=validateBackup({format:FORMAT,version:1,subjects:{[subject.id]:{practice,course}}})[subject.id];
    return {record,damaged};
  } catch { damaged=true; }

  // Local damage must not turn unrelated valid progress into an empty record.
  // Only external backups use the all-or-nothing validator above.
  const p=isRecord(practice)?practice:{},c=isRecord(course)?course:{};
  const ids=new Set(subject.QUESTIONS.map(q=>q.id)),lessons=new Set(subject.LESSONS.map(l=>l.id));
  const {validSession}=createExamEngine(subject);
  const progress=Object.fromEntries(Object.entries(isRecord(p.progress)?p.progress:{}).filter(([id,value])=>ids.has(id)&&validProgress(value)).map(([id,value])=>[id,{attempts:value.attempts,correct:value.correct,wrong:value.wrong}]));
  return {damaged,record:{
    practice:{
      active:validSession(p.active,subject.QUESTIONS)?p.active:null,
      suspended:validSession(p.suspended,subject.QUESTIONS)?p.suspended:null,
      progress,
      history:(Array.isArray(p.history)?p.history:[]).filter(s=>validSession(s,subject.QUESTIONS)&&Number.isFinite(s.endedAt)).slice(0,50),
      saved:[...new Set(Array.isArray(p.saved)?p.saved:[])].filter(id=>ids.has(id)),
      closedSessionIds:restoreClosedSessionIds(p.closedSessionIds),
    },
    course:{last:lessons.has(c.last)?c.last:subject.LESSONS[0].id,done:[...new Set(Array.isArray(c.done)?c.done:[])].filter(id=>lessons.has(id))},
  }};
}

function recoverySnapshot(previousRaw,practiceRaw,courseRaw) {
  const capturedAt=new Date().toISOString();
  let snapshots=[];
  if(previousRaw!==null) {
    try {
      const previous=JSON.parse(previousRaw);
      if(previous?.format!==RECOVERY_FORMAT||previous.version!==1||!Array.isArray(previous.snapshots))throw new Error();
      snapshots=previous.snapshots;
    } catch {
      // Never replace an unreadable older recovery copy without keeping its bytes.
      snapshots=[{capturedAt,recoveryRaw:previousRaw}];
    }
  }
  snapshots.push({capturedAt,practiceRaw,courseRaw});
  return JSON.stringify({format:RECOVERY_FORMAT,version:1,snapshots});
}

export function importBackup(subjects,storage=localStorage) {
  const incoming=validateBackup({format:FORMAT,version:1,subjects});
  const before=new Map(),writes=[],recoveredSubjects=[],recoveryKeys=[];
  for (const [id,record] of Object.entries(incoming)) {
    const s=SUBJECTS[id];
    let practiceRaw,courseRaw;
    try {
      practiceRaw=storage.getItem(s.practiceKey);courseRaw=storage.getItem(s.courseKey);
    } catch(error) { throw new Error('无法读取本机学习记录，导入已停止；原记录未被覆盖。',{cause:error}); }
    const local=recoverLocal(s,practiceRaw,courseRaw);
    if(local.damaged) {
      const key=`${RECOVERY_PREFIX}${id}`,previousRaw=storage.getItem(key);
      before.set(key,previousRaw);writes.push([key,recoverySnapshot(previousRaw,practiceRaw,courseRaw)]);
      recoveredSubjects.push(id);recoveryKeys.push(key);
    }
    const merged=mergeRecords(local.record,record);
    before.set(s.practiceKey,practiceRaw);before.set(s.courseKey,courseRaw);
    for (const [key,value] of [[s.practiceKey,merged.practice],[s.courseKey,merged.course]]) {
      writes.push([key,JSON.stringify(value)]);
    }
  }
  const written=[];
  try { for (const [key,value] of writes) { storage.setItem(key,value);written.push(key); } }
  catch (error) {
    let rollbackFailed=false;
    for (const key of written.reverse()) {
      // A failed restoration must not delete the only surviving original copy.
      if(rollbackFailed&&recoveryKeys.includes(key))continue;
      const value=before.get(key);
      try { if(value===null)storage.removeItem(key);else storage.setItem(key,value); }
      catch { rollbackFailed=true; }
    }
    if(rollbackFailed)throw new Error('导入未完成，部分本机记录未能自动恢复；请保留原备份文件后重试。',{cause:error});
    throw error;
  }
  return {recoveredSubjects,recoveryKeys};
}

export function listRecoveryCopyKeys(storage) {
  try {
    const target=storage??globalThis.localStorage;
    return Object.keys(SUBJECTS).map(id=>`${RECOVERY_PREFIX}${id}`).filter(key=>target.getItem(key)!==null);
  } catch { return []; }
}

export function collectRecoveryCopies(keys,storage=localStorage) {
  const allowed=new Map(Object.keys(SUBJECTS).map(id=>[`${RECOVERY_PREFIX}${id}`,id]));
  if(!Array.isArray(keys)||!keys.length||keys.some(key=>!allowed.has(key)))throw new Error('没有可导出的原记录副本。');
  const copies=[...new Set(keys)].map(key=>{
    const raw=storage.getItem(key);
    if(raw===null)throw new Error('原记录副本已不存在，请保留已有导出文件。');
    try {
      const data=JSON.parse(raw);
      if(data?.format!==RECOVERY_FORMAT||data.version!==1||!Array.isArray(data.snapshots))throw new Error();
      return {subject:allowed.get(key),snapshots:data.snapshots};
    } catch { return {subject:allowed.get(key),recoveryRaw:raw}; }
  });
  return {format:'zhiquan.recovery-originals',version:1,exportedAt:new Date().toISOString(),notice:'这是导入前的本机原记录副本，保留原始字符串供恢复使用；不是可直接导入的学习记录备份。',copies};
}

function downloadJSON(data,filename) {
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download=filename;a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

export function downloadBackup() {
  const data=collectBackup();
  downloadJSON(data,`zhiquan-learning-${data.exportedAt.slice(0,10)}.json`);
}

export function downloadRecoveryCopies(keys,storage=localStorage) {
  const data=collectRecoveryCopies(keys,storage);
  downloadJSON(data,`zhiquan-recovery-originals-${data.exportedAt.slice(0,10)}.json`);
}
