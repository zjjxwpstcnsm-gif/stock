import * as defaultConfig from './config.js';

export function shuffle(items, random = Math.random) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function makePaper(bank, profileId, random = Math.random, config = defaultConfig) {
  const { PROFILES } = config;
  const profile = PROFILES[profileId];
  if (!profile) throw new Error('未知考试类型');
  return Object.entries(profile.quotas).flatMap(([chapter, count]) => {
    const candidates = bank.filter(q => q.chapter === Number(chapter));
    if (candidates.length < count) throw new Error(`第 ${chapter} 章题量不足`);
    return shuffle(candidates, random).slice(0, count).map(q => q.id);
  });
}

export function grade(session, bank, config = defaultConfig) {
  const { CHAPTERS, PROFILES } = config;
  const byId = new Map(bank.map(q => [q.id, q]));
  const rows = session.ids.map(id => {
    const q = byId.get(id);
    return { id, chapter: q.chapter, level: CHAPTERS[q.chapter].level, answer: session.answers[id] ?? null, correct: session.answers[id] === q.answer };
  });
  const correct = rows.filter(r => r.correct).length;
  const profile = session.mode === 'exam' ? PROFILES[session.profile] : null;
  const score = profile ? correct * profile.points : Math.round(correct / rows.length * 100);
  const sections = [1, 2, 3].map(level => {
    const subset = rows.filter(r => r.level === level);
    return { level, total: subset.length, correct: subset.filter(r => r.correct).length };
  }).filter(s => s.total);
  const sectionPass = !profile?.sectional || sections.every(s => s.correct / s.total >= .6);
  return { rows, correct, total: rows.length, score, sections, sectionPass, passed: profile ? score >= profile.pass && sectionPass : null };
}

export function remainingSeconds(session, now = Date.now()) {
  return session.deadline ? Math.max(0, Math.ceil((session.deadline - now) / 1000)) : null;
}

export function makeSession(ids, mode, profile = null, now = Date.now(), config = defaultConfig) {
  const { BANK_VERSION, PROFILES } = config;
  return { id: `${now}-${Math.random().toString(36).slice(2, 10)}`, version: BANK_VERSION, ids, mode, profile, answers: {}, checked: [], marked: [], index: 0, startedAt: now, deadline: mode === 'exam' ? now + PROFILES[profile].minutes * 60000 : null, title: mode === 'exam' ? PROFILES[profile].name : '专项练习' };
}

export function validSession(value, bank, config = defaultConfig) {
  const { COMPATIBLE_BANK_VERSIONS, PROFILES } = config;
  if (!value || !COMPATIBLE_BANK_VERSIONS.includes(value.version) || !Array.isArray(value.ids) || !value.ids.length || !['exam', 'practice'].includes(value.mode)) return false;
  const ids = new Set(bank.map(q => q.id));
  if (new Set(value.ids).size !== value.ids.length || value.ids.some(id => !ids.has(id))) return false;
  if (!Number.isInteger(value.index) || value.index < 0 || value.index >= value.ids.length || !Number.isFinite(value.startedAt)) return false;
  if (!value.answers || typeof value.answers !== 'object' || Array.isArray(value.answers)) return false;
  if (Object.entries(value.answers).some(([id, answer]) => !value.ids.includes(id) || !Number.isInteger(answer) || answer < 0 || answer > 3)) return false;
  if (!['checked', 'marked'].every(k => Array.isArray(value[k]) && value[k].every(id => value.ids.includes(id)))) return false;
  if (value.mode === 'exam') {
    const p = (config.LEGACY_PROFILES?.[value.version] || PROFILES)[value.profile];
    if (!p || !Number.isFinite(value.deadline) || value.deadline !== value.startedAt + p.minutes * 60000) return false;
    if (value.ids.length !== Object.values(p.quotas).reduce((a, b) => a + b, 0)) return false;
    for (const [ch, count] of Object.entries(p.quotas)) if (value.ids.filter(id => bank.find(q => q.id === id).chapter === Number(ch)).length !== count) return false;
  }
  return true;
}

export function updateProgress(previous, rows) {
  const next = { ...previous };
  for (const row of rows) {
    const old = next[row.id] || { attempts: 0, correct: 0 };
    next[row.id] = { attempts: old.attempts + 1, correct: old.correct + Number(row.correct), wrong: !row.correct };
  }
  return next;
}

// Bind only the subject configuration; all scoring and restoration rules stay shared.
export function createExamEngine(config) {
  return {
    makePaper: (bank, profile, random) => makePaper(bank, profile, random, config),
    makeSession: (ids, mode, profile, now) => makeSession(ids, mode, profile, now, config),
    grade: (session, bank) => grade(session, bank, config),
    validSession: (session, bank) => validSession(session, bank, config),
  };
}
