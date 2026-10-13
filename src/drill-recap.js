import { esc, letters, sourceLabel } from './academy-views.js';
import { isCorrect, validSession } from './engine.js';
export const RECAP_LIMIT = 20;

/** Read-only projection: never score, mutate sessions, or inspect an unfinished exam. */
export function recentDrillAnswers(subject, session, history = []) {
 const bank = subject.QUESTIONS, byId = new Map(bank.map(q => [q.id,q]));
 const valid = s => { try { return validSession(s,bank,subject); } catch { return false; } };
 const past = (Array.isArray(history) ? history.slice(0,50) : [])
  .filter(s => s?.mode === 'practice' && Number.isFinite(s.endedAt) && s.endedAt >= s.startedAt &&
   (s.drill || s.title === `${subject.short} · 随机刷题`) && valid(s))
  .sort((a,b) => b.endedAt-a.endedAt);
 const current = session?.drill && session.mode === 'practice' && !session.endedAt && valid(session) ? [session] : [];
 const seen = new Set(), records = [];
 for (const s of [...current,...past]) {
  for (const id of [...s.checked].reverse()) {
   const key = `${s.id}:${id}`;
   if (seen.has(key)) continue;
   seen.add(key);
   const question = byId.get(id), answer = s.answers[id];
   records.push({question,answer:Array.isArray(answer)?[...answer]:answer,correct:isCorrect(answer,question)});
   if (records.length === RECAP_LIMIT) return records;
  }
 }
 return records;
}
function storedHistory(subject) {
 try {
  const raw = globalThis.localStorage?.getItem(subject.practiceKey);
  return raw && raw.length <= 2_000_000 ? JSON.parse(raw)?.history || [] : [];
 } catch { return []; }
}
const answerText = (q,answer) => (Array.isArray(answer)?answer:[answer]).map(i => `${letters(i)}. ${q.options[i]}`).join('；');
export function drillRecapView(subject, session, history = storedHistory(subject)) {
 const records = recentDrillAnswers(subject,session,history);
 return `<details class="drill-recap"><summary><span class="recap-icon" aria-hidden="true">↶</span><span><strong>回看已答题</strong><small>不打断当前题，不重复计分</small></span><span class="recap-count">${records.length} 条</span></summary><div class="recap-body"><p class="recap-caption">最近 ${RECAP_LIMIT} 条已确认的随机练习，最新在前。仅含当前科目、本机保存的记录；未提交答案不会出现在这里。</p>${records.length ? records.map(({question:q,answer,correct},i) => `<details class="recap-item" name="recent-drill-answer"><summary><span class="recap-result ${correct?'recap-right':'recap-wrong'}">${correct?'答对':'待巩固'}</span><span>${esc(q.topic)}</span><span class="recap-order">${i+1}</span></summary><div class="recap-detail"><h3>${esc(q.stem)}</h3><p class="recap-answer"><b>你的选择</b>${esc(answerText(q,answer))}</p><p class="recap-answer"><b>正确答案</b>${esc(answerText(q,q.answer))}</p><p>${esc(q.explanation)}</p>${q.rationales?.length === q.options.length ? `<div class="recap-rationales">${q.rationales.map((r,n) => `<p><b>${letters(n)}</b>${esc(r)}</p>`).join('')}</div>` : ''}<div class="recap-reference"><span>${sourceLabel(q)}</span><code>${esc(q.id)}</code>${q.referenceSection?`<span>${esc(q.referenceSection)}</span>`:''}${subject.SOURCES[q.source]?.url?`<a href="${esc(subject.SOURCES[q.source].url)}" target="_blank" rel="noopener noreferrer">核对参考依据 ↗</a>`:''}</div></div></details>`).join('') : '<p class="recap-empty">先完成一道题。之后可随时展开这里，重读之前的解析。</p>'}</div></details>`;
}
// Number shortcuts belong to the live question, not to the read-only recap.
export function isolateRecapShortcut(event) {
 if (!event.ctrlKey && !event.metaKey && !event.altKey && /^[1-4]$/.test(event.key) && event.target?.closest?.('.drill-recap')) event.stopPropagation();
}
if (typeof document !== 'undefined') document.addEventListener('keydown',isolateRecapShortcut,true);
