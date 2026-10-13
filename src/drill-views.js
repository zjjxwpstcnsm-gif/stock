import { questionTools, misconceptionView } from './question-tools.js';
import { caseMethodView } from './workshop-methods.js';
import { esc, letters, sourceLabel } from './academy-views.js';
import { isCorrect, questionType } from './engine.js';
import { TYPE_NAMES } from './academy-data.js';
const has = (answer, i) => Array.isArray(answer) ? answer.includes(i) : answer === i;

export function drillStatus(session, correct) {
  const d = session.drill;
  if (!d) return '';
  const answered = d.answered + session.checked.length;
  return `<div class="drill-status" aria-label="本轮刷题统计"><span>已答 <strong>${answered}</strong> 题</span><span>正确率 <strong>${answered ? Math.round((d.correct + correct) / answered * 100) + '%' : '—'}</strong></span><span class="drill-untimed">不限时</span></div>`;
}
export function drillNextButton(session, revealed, multi = false) {
  if (!session.drill) return '';
  if (!revealed) return multi ? `<button class="primary" data-action="check" ${session.answers[session.ids[session.index]] == null ? 'disabled' : ''}>提交多选答案</button>` : '<span class="drill-select-hint">选择后即显示解析</span>';
  return '<button class="primary" data-action="drill-next">下一题 <span aria-hidden="true">›</span></button>';
}

/** No setup form, answer grid, count picker or hidden round boundary in the user journey. */
export function focusedDrillView({session: s, question: q, subject, correct, bookmark, explanation, warning}) {
  const selected = s.answers[q.id], revealed = s.checked.includes(q.id), multi = Array.isArray(q.answer);
  const right = isCorrect(selected, q);
  return `<div class="focus-drill">
    <header class="focus-drill-heading"><div><button class="text-button drill-back" data-action="nav" data-view="home">‹ 返回学习空间</button><h1>随机刷题 <span>${esc(subject.short)}</span></h1></div><button class="secondary small" data-action="submit">结束练习</button></header>
    ${drillStatus(s, correct)}
    <section class="focus-question panel" aria-labelledby="question-title">
      <div class="focus-question-meta"><div class="question-badges"><span class="blue">${TYPE_NAMES[questionType(q)]}</span><span>${esc(subject.CHAPTERS[q.chapter].short)}</span></div><span class="focus-question-number">第 ${s.drill.answered + s.index + 1} 题</span></div>
      <p class="question-origin">${sourceLabel(q)}${q.year ? ` · ${esc(q.examSession)}` : ''}</p>
      <h2 class="question-stem" id="question-title" tabindex="-1">${esc(q.stem)}</h2>
      <p class="answer-instruction">${multi ? '选择所有正确项，再提交答案。再次点击可取消选择。' : questionType(q) === 'judge' ? '选择正确或错误，立即查看解析。' : '选择一个最合适的答案，立即查看解析。'}</p>
      <div class="options" role="${multi ? 'group' : 'radiogroup'}" aria-labelledby="question-title">${q.options.map((o, i) => `<button id="option-${i}" role="${multi ? 'checkbox' : 'radio'}" aria-checked="${has(selected, i)}" ${revealed ? 'disabled' : ''} class="option ${has(selected, i) ? 'selected' : ''} ${revealed && has(q.answer, i) ? 'correct' : ''} ${revealed && has(selected, i) && !has(q.answer, i) ? 'incorrect' : ''}" data-action="answer" data-answer="${i}"><span class="option-letter">${letters(i)}</span><span>${esc(o)}</span>${revealed && has(q.answer, i) ? '<span class="option-result" aria-label="正确选项">✓</span>' : revealed && has(selected, i) ? '<span class="option-result" aria-label="选错">×</span>' : ''}</button>`).join('')}</div>
      ${revealed ? `<section class="explanation ${right ? 'correct-explanation' : ''}" role="status" id="answer-feedback" tabindex="-1"><div class="feedback-heading"><span class="feedback-symbol" aria-hidden="true">${right ? '✓' : '!'}</span><strong>${right ? '回答正确' : '再巩固一下'}</strong><span>正确答案 ${letters(q.answer)}</span></div><p>${esc(q.explanation)}</p></section>${misconceptionView(q, selected)}<div class="focus-evidence">${explanation}${q.editorialBatch === '2026-10-13-workshop' ? caseMethodView(subject, {compact:true}) : ''}</div>` : ''}
      <div class="focus-question-tools">${bookmark}<span class="keyboard-hint">1–4 选择${revealed ? ' · Enter 下一题' : ''}</span></div>
      ${questionTools(subject, q)}
      <div class="question-actions"><span class="save-indicator">${warning ? '记录未能保存，请勿关闭页面' : '进度已自动保存'}</span>${drillNextButton(s, revealed, multi)}</div>
    </section>
    <p class="focus-note">当前科目 ${subject.QUESTIONS.length} 道题，一轮内不重复，刷完后重新随机。<br>答案不会自动跳走，读懂后再继续。</p>
  </div>`;
}
