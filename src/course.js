import { SUBJECT } from './subjects.js';
import { fundDiagramView, handleFundLabInput } from './fund-visuals.js';
const { LESSONS, COURSE_SOURCES, SOURCES, CHAPTERS } = SUBJECT;
import { labView, diagramView as optionsDiagramView, handleLabInput as handleOptionsLabInput } from './course-charts.js';
const diagramView = id => SUBJECT.isFund ? fundDiagramView(id) : optionsDiagramView(id);
const handleLabInput = target => handleFundLabInput(target) || handleOptionsLabInput(target);

const KEY = SUBJECT.courseKey;
const validId = id => LESSONS.some(l => l.id === id);
let warning = '';
let progress = loadProgress();
let selected = progress.last || LESSONS[0].id;
const answers = new Map();
function loadProgress() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || '{}');
    return { last: validId(data?.last) ? data.last : LESSONS[0].id, done: Array.isArray(data?.done) ? [...new Set(data.done.filter(validId))] : [] };
  } catch { warning = '阅读进度暂时无法保存，仍可阅读教程和使用图解。'; return { last: LESSONS[0].id, done: [] }; }
}
function saveProgress() {
  try { localStorage.setItem(KEY, JSON.stringify(progress)); }
  catch { warning = '阅读进度暂时无法保存，仍可阅读教程和使用图解。'; }
}
export function courseHash() { return `#course/${selected}`; }
export function syncCourseHash() {
  const match = /^#course\/([a-z-]+)$/.exec(location.hash);
  if (match && validId(match[1])) selected = match[1];
  return location.hash === '#course' || !!match;
}
const num = i => String(i + 1).padStart(2, '0');
export function courseView() {
  const index = LESSONS.findIndex(l => l.id === selected), lesson = LESSONS[index];
  const done = progress.done.includes(selected);
  const choice = answers.get(selected);
  const sourceList = lesson.sources.map(id => COURSE_SOURCES[id] || SOURCES[id]);
  return `<div class="page-heading"><div><span class="eyebrow">${SUBJECT.isFund ? 'FUND QUALIFICATION · CORE CONCEPTS' : 'OPTIONS · FROM FIRST PRINCIPLES'}</span><h1>${SUBJECT.isFund ? SUBJECT.short + '系统教程' : '期权系统教程'}</h1><p>${LESSONS.length} 章循序学习 · 互动图解 · ${SUBJECT.isFund ? SUBJECT.name + '（核心导学）' : '从概念走到计算与风险'}</p></div><span class="course-progress">已读 <strong>${progress.done.length}</strong> / ${LESSONS.length} 章</span></div>
  ${warning ? `<p class="warning" role="status">${warning}</p>` : ''}
  <div class="course-layout"><aside class="course-toc"><div class="toc-heading"><strong>学习目录</strong><span>约 ${LESSONS.reduce((sum, l) => sum + l.minutes, 0)} 分钟</span></div><nav aria-label="教程章节">${LESSONS.map((l, i) => `<a href="#course/${l.id}" data-action="course-open" data-lesson="${l.id}" class="toc-link ${l.id === selected ? 'selected' : ''}" ${l.id === selected ? 'aria-current="page"' : ''}><span>${num(i)}</span><div>${l.short}<small>${l.stage} · ${l.minutes} 分钟</small></div>${progress.done.includes(l.id) ? '<b aria-label="已读">✓</b>' : ''}</a>`).join('')}</nav><p>${SUBJECT.isFund ? '对照2026大纲学习核心概念。完整范围与新增规范请查阅官方大纲。' : '基础入门 → 价格与 Greeks<br>→ 组合策略 → 风险与复习'}</p></aside>
  <div class="course-reader"><label class="mobile-chapter" for="course-chapter">跳转章节<select id="course-chapter">${LESSONS.map((l, i) => `<option value="${l.id}" ${l.id === selected ? 'selected' : ''}>${num(i)} · ${l.short}${progress.done.includes(l.id) ? ' ✓' : ''}</option>`).join('')}</select></label>
    <article class="lesson-article"><header class="lesson-header"><span class="eyebrow">CHAPTER ${num(index)} <span> / ${LESSONS.length} · ${lesson.stage} · ${lesson.minutes} 分钟</span></span><h2 id="lesson-title" tabindex="-1">${lesson.title}</h2><p>${lesson.intro}</p></header><div class="lesson-takeaway"><span>本章抓住一句话</span><strong>${lesson.takeaway}</strong></div>
    ${lesson.sections.map((s, i) => `<section class="lesson-section"><h3><span>${i + 1}</span>${s.title}</h3>${s.html}</section>${i === 0 && lesson.diagram ? diagramView(lesson.diagram) : ''}${i === 1 && lesson.lab ? labView(lesson.lab) : ''}`).join('')}
    <aside class="lesson-pitfall"><strong>容易混淆</strong><p>${lesson.pitfall}</p></aside>
    <section class="lesson-check" aria-labelledby="check-title"><span class="eyebrow">读完，确认一下</span><h3 id="check-title">${lesson.check.question}</h3><div class="check-options">${lesson.check.options.map((o, i) => `<button data-action="course-answer" data-choice="${i}" aria-pressed="${choice === i}" class="${choice === i ? 'chosen' : ''}"><span>${'ABC'[i]}</span>${o}</button>`).join('')}</div>${choice !== undefined ? `<div class="check-feedback" role="status"><strong>${choice === lesson.check.answer ? '回答正确' : `再想一步 · 正确选项 ${'ABC'[lesson.check.answer]}`}</strong><p>${lesson.check.explanation}</p></div>` : '<p class="check-hint">选择后显示解析；自测不计入模拟考试成绩。</p>'}</section>
    <section class="lesson-sources"><h3>继续查阅</h3><p>原创讲解与数值示例；${SUBJECT.isFund ? '官方大纲用于定位考点范围，不代表协会提供或认可本站讲解。' : '以下资料用于核对概念与业务边界。'}核对日期：2026-09-29。</p><ul>${sourceList.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.title} ↗</a></li>`).join('')}</ul>${lesson.sources.some(s => ['delta', 'gamma', 'theta', 'vega', 'rho', 'model', 'pricing'].includes(s)) ? '<p>OIC 资料用于一般估值理论；不将美股的交易、行权或交收制度套用于 A 股 ETF 期权。</p>' : ''}</section>
    <div class="lesson-complete"><button class="${done ? 'secondary' : 'primary'}" data-action="course-complete" aria-pressed="${done}">${done ? '✓ 已读完本章' : '标记本章已读'}</button><button class="secondary" data-action="course-practice" data-chapter="${lesson.practice}">练习：${lesson.practice ? CHAPTERS[lesson.practice].short : '全部章节'} →</button></div>
    <nav class="lesson-pagination" aria-label="章节翻页">${index > 0 ? `<a href="#course/${LESSONS[index - 1].id}" data-action="course-open" data-lesson="${LESSONS[index - 1].id}"><small>← 上一章</small><strong>${LESSONS[index - 1].short}</strong></a>` : '<span></span>'}${index < LESSONS.length - 1 ? `<a href="#course/${LESSONS[index + 1].id}" data-action="course-open" data-lesson="${LESSONS[index + 1].id}"><small>下一章 →</small><strong>${LESSONS[index + 1].short}</strong></a>` : '<button class="text-button" data-action="nav" data-view="home">去模拟考试 →</button>'}</nav></article>
  </div></div>`;
}
export function handleCourseAction(target, { render, navigate, practice }) {
  const action = target.dataset.action;
  if (!action?.startsWith('course-')) return false;
  if (action === 'course-open' && validId(target.dataset.lesson)) {
    selected = target.dataset.lesson;
    progress.last = selected; saveProgress(); navigate('course');
    document.getElementById('lesson-title')?.focus({ preventScroll: true });
  } else if (action === 'course-complete') {
    progress.done = progress.done.includes(selected) ? progress.done.filter(x => x !== selected) : [...progress.done, selected];
    progress.last = selected; saveProgress();
    const top = window.scrollY; render(); window.scrollTo(0, top);
    document.querySelector('[data-action="course-complete"]')?.focus({ preventScroll: true });
  } else if (action === 'course-answer') {
    const answer = Number(target.dataset.choice);
    answers.set(selected, answer);
    const top = window.scrollY; render(); window.scrollTo(0, top);
    document.querySelector(`[data-action="course-answer"][data-choice="${answer}"]`)?.focus({ preventScroll: true });
  } else if (action === 'course-practice') practice(Number(target.dataset.chapter));
  return true;
}
export function handleCourseChange(target, callbacks) {
  if (target.id === 'course-chapter') return handleCourseAction({ dataset: { action: 'course-open', lesson: target.value } }, callbacks);
  return handleLabInput(target);
}
export { handleLabInput };
