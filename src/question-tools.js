import { esc, letters } from './academy-views.js';
import { DIFFICULTIES } from './content-quality.js';

export const questionPath = (subject, question) => `?subject=${encodeURIComponent(subject.id)}#practice?question=${encodeURIComponent(question.id)}`;
/** Only public question metadata; never read storage, answers, name or device data. */
export function correctionUrl(subject, question) {
  const url = new URL('https://github.com/zjjxwpstcnsm-gif/stock/issues/new');
  url.searchParams.set('title', `[题目核对] ${question.id}`);
  url.searchParams.set('body', `科目：${subject.name}\n题号：${question.id}\n题库版本：${subject.BANK_VERSION}\n考点：${question.topic}\n定位：https://zjjxwpstcnsm-gif.github.io/stock/${questionPath(subject, question)}\n\n问题描述（请自行补充）：\n\n建议修正及依据（可选）：\n\n请勿填写个人账户、交易记录或其他隐私。此页面仅预填草稿，需你在 GitHub 登录后自行提交。`);
  return url.href;
}
export function questionTools(subject, question) {
  return `<div class="question-trace"><div><span class="trace-label">题目档案</span><code>${esc(question.id)}</code>${question.difficulty ? `<span class="trace-difficulty">${esc(DIFFICULTIES[question.difficulty] || '未标难度')} · 教学标注</span>` : ''}</div><div class="trace-links"><a href="${esc(questionPath(subject, question))}" target="_blank" rel="noopener noreferrer" aria-label="打开此题固定链接">固定链接 ↗</a><a href="${esc(correctionUrl(subject, question))}" target="_blank" rel="noopener noreferrer" aria-label="反馈此题，打开 GitHub 草稿，需自行提交">反馈此题 ↗</a></div></div>`;
}
/** Caller must only render this after explicit confirmation. */
export function misconceptionView(question, answer) {
  if (!question.rationales || question.rationales.length !== question.options.length) return '';
  const selected = Array.isArray(answer) ? answer : [answer];
  const correct = Array.isArray(question.answer) ? question.answer : [question.answer];
  const wrong = selected.filter(i => Number.isInteger(i) && i >= 0 && i < question.options.length && !correct.includes(i));
  const missed = correct.filter(i => !selected.includes(i));
  if (!wrong.length && !missed.length) return '';
  return `<aside class="misconception" aria-label="本题易错点"><h3>这一处，值得再想一遍。</h3>${wrong.map(i => `<p><b>你选的 ${letters(i)}：</b>${esc(question.rationales[i])}</p>`).join('')}${missed.length && Array.isArray(question.answer) ? `<p><b>还漏选了 ${letters(missed)}。</b>多选题须选全正确项；展开逐项辨析，对照每一个条件。</p>` : ''}</aside>`;
}
