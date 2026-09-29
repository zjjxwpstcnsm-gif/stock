import { SUBJECT, subjectOptions } from './subjects.js';
import { fundHome, fundGuide, fundResources, fundCoverage, fundYearOptions } from './fund-views.js';
import { createExamEngine, remainingSeconds, shuffle, updateProgress } from './engine.js';
const { BANK_VERSION, CHAPTERS, PROFILES, SOURCES, QUESTIONS } = SUBJECT;
const { makePaper, makeSession, grade, validSession } = createExamEngine(SUBJECT);
import { courseView, courseHash, syncCourseHash, handleCourseAction, handleCourseChange, handleLabInput } from './course.js';

const app = document.querySelector('#app');
const KEY = SUBJECT.practiceKey;
const qmap = new Map(QUESTIONS.map(q => [q.id, q]));
let storageWarning = '';
let state = load();
const hashView = () => syncCourseHash() ? 'course' : SUBJECT.isFund && ['#resources','#coverage'].includes(location.hash) ? location.hash.slice(1) : 'home';
let view = hashView();
let result = null;
let reviewFilter = 'all';
let practiceChapter = 0;
let practiceCount = 10;
let practiceSource = 'all', practiceYear = 0, recallYear = 0, coverageChapter = 0;
let wrongChapter = 0;
let modalAction = null;
const icons = {
  exam: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  book: '<path d="M12 5v15M3 4c3-1 6 0 9 2 3-2 6-3 9-2v15c-3-1-6 0-9 2-3-2-6-3-9-2z"/>',
  wrong: '<path d="M4 4h16v13H9l-5 4zM12 8v4M12 15h.01"/>',
  chart: '<path d="M4 3v17h17M8 15v-4M13 15V7M18 15V4"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  flag: '<path d="M5 21V4M5 4c5-4 9 4 15 0v10c-6 4-10-4-15 0"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
};
const icon = (name) => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.exam}</svg>`;
const esc = v => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const letter = n => n == null ? '未作答' : 'ABCD'[n];
const date = n => new Date(n).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false });
const btn = (text, action, extra = '', cls = '') => `<button class="${cls}" data-action="${action}" ${extra}>${text}</button>`;
const totalFor = p => Object.values(p.quotas).reduce((a, b) => a + b, 0);
function load() {
  const empty = { active: null, progress: {}, history: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') throw new Error();
    const progress = {};
    for (const q of QUESTIONS) {
      const p = data.progress?.[q.id];
      if (p && Number.isInteger(p.attempts) && p.attempts > 0 && Number.isInteger(p.correct) && p.correct >= 0 && p.correct <= p.attempts && typeof p.wrong === 'boolean') progress[q.id] = p;
    }
    const active = validSession(data.active, QUESTIONS) ? data.active : null;
    if (data.active && !active) storageWarning = '旧的未完成答卷无法恢复，已保留有效练习记录。请重新组卷。';
    const history = (Array.isArray(data.history) ? data.history : []).filter(s => validSession(s, QUESTIONS) && Number.isFinite(s.endedAt)).slice(0, 50);
    return { active, progress, history };
  } catch {
    storageWarning = '当前无法读取本地记录。你仍可练习，但请勿依赖刷新恢复。';
    return empty;
  }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch { storageWarning = '浏览器未能保存记录；本次作答仍在内存中，关闭或刷新页面可能丢失。'; }
}
function wrongIds() { return QUESTIONS.filter(q => state.progress[q.id]?.wrong).map(q => q.id); }
function sourceLink(q) {
 const source=SOURCES[q.source];
 return `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${esc(source.title)}</a>${q.sourceKind==='recall' ? ` · 来源页面第 ${q.sourceQuestion} 题 · ${q.examSession}<p>${esc(q.reviewNote)}</p>${q.id.startsWith('fund1-') ? `<p>规则核对：<a href="${SOURCES.fundLaw.url}" target="_blank" rel="noopener noreferrer">证券投资基金法</a>；数值题依明确题设计算。</p>` : ''}` : ''}`;
}
const filteredPractice = (chapter=practiceChapter) => QUESTIONS.filter(q=>(!chapter || q.chapter===chapter) && (practiceSource==='all' || q.sourceKind===practiceSource) && (!practiceYear || q.year===practiceYear));

function render() {
  const focused = document.activeElement?.id;
  const current = view === 'quiz' ? 'home' : view === 'result' ? 'history' : view;
  const links = [['home', 'exam', '模拟考试'], ['course', 'book', '系统教程'], ['practice', 'book', '专项练习'], ['wrong', 'wrong', '错题本'], ['history', 'chart', '学习记录'], ['guide', 'info', '考试说明']];
  if (SUBJECT.isFund) links.splice(2, 0, ['coverage', 'chart', '大纲清单'], ['resources', 'info', '真题资料']);
  document.title = SUBJECT.isFund ? `${SUBJECT.short} · ${SUBJECT.name} · 知权` : view === 'course' ? '期权系统教程 · 知权' : '知权 · 证券考试练习';
  app.innerHTML = `<div class="shell">
    <aside class="sidebar">
      <a href="#" class="brand" data-action="nav" data-view="home"><span class="brand-icon">知</span><span>知权<span class="brand-en">STOCK ACADEMY</span></span></a>
      <label class="subject-picker" for="subject-select">切换考试科目<select id="subject-select">${subjectOptions()}</select></label><div class="nav-label">我的学习空间</div>
      <nav aria-label="主导航">${links.map(([key, img, name]) => `<button data-action="nav" data-view="${key}" class="nav-item ${current === key ? 'active' : ''}" ${current === key ? 'aria-current="page"' : ''}>${icon(img)}<span>${name}</span>${key === 'wrong' && wrongIds().length ? `<span class="nav-count">${wrongIds().length}</span>` : ''}</button>`).join('')}</nav>
      <div class="sidebar-note"><span class="tiny-label">当前科目</span><strong>${SUBJECT.isFund ? '中国大陆基金从业资格' : SUBJECT.name}</strong><p>${SUBJECT.isFund ? SUBJECT.name : '个人投资者开户知识'}</p><span class="soft-badge">免费 · 无需登录</span></div>
      <div class="sidebar-bottom">每一道题，都多懂一点。<a href="https://github.com/zjjxwpstcnsm-gif/stock" target="_blank" rel="noopener noreferrer">GitHub 开源项目 ${icon('chevron')}</a></div>
    </aside>
    <div class="workspace">
      <header class="topbar"><div><span class="breadcrumb">证券考试练习</span><span class="separator">/</span><strong>${SUBJECT.short}</strong></div><span class="version">规则核对 2026.09.29</span></header>
      ${storageWarning ? `<div role="status" class="warning">${esc(storageWarning)}</div>` : ''}
      <main id="main" tabindex="-1">${view === 'course' ? courseView() : view === 'quiz' ? quizView() : view === 'practice' ? practiceView() : view === 'wrong' ? wrongView() : view === 'history' ? historyView() : view === 'coverage' ? fundCoverage(SUBJECT,coverageChapter) : view === 'resources' ? fundResources(SUBJECT,recallYear) : view === 'guide' ? guideView() : view === 'result' ? resultView() : homeView()}</main>
      <footer>独立学习项目 · ${SUBJECT.isFund ? '原创模拟与回忆题分列 · 模拟成绩不作为资格凭证' : '模拟成绩不作为开户凭证'}<span>记录仅保存在当前浏览器</span></footer>
    </div>
  </div><dialog id="confirm-dialog" aria-labelledby="dialog-title"><h2 id="dialog-title"></h2><p id="dialog-text"></p><div class="dialog-actions">${btn('返回', 'cancel-dialog', '', 'secondary')}${btn('确认', 'confirm-dialog', 'id="confirm-button"', 'primary')}</div></dialog>`;
  if (focused) document.getElementById(focused)?.focus({ preventScroll: true });
  const answerGrid = document.querySelector('.answer-grid');
  const currentCell = answerGrid?.querySelector('[aria-current="step"]');
  if (currentCell && answerGrid.scrollHeight > answerGrid.clientHeight) {
    // Keep the current number visible in a long practice session without moving the page.
    answerGrid.scrollTop += currentCell.getBoundingClientRect().top - answerGrid.getBoundingClientRect().top
      - (answerGrid.clientHeight - currentCell.offsetHeight) / 2;
  }
  document.querySelector('#confirm-dialog').addEventListener('cancel', () => { modalAction = null; });
}

function heading(eyebrow, title, desc, action = '') { return `<div class="page-heading"><div><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${desc}</p></div>${action}</div>`; }
function resumeBanner() {
  const a = state.active;
  if (!a) return '';
  return `<div class="resume-banner"><div>${icon('clock')}<span><strong>有一份未完成的${a.mode === 'exam' ? '模拟卷' : '练习'}</strong> · 已答 ${Object.keys(a.answers).length} / ${a.ids.length} 题${a.mode === 'exam' ? '，计时继续' : ''}</span></div>${btn('继续作答', 'resume', '', 'secondary small')}</div>`;
}
function homeView() {
  if (SUBJECT.isFund) return fundHome(SUBJECT, Object.keys(state.progress).length, resumeBanner());
  const attempted = Object.keys(state.progress).length;
  const examHistory = state.history.filter(s => s.mode === 'exam');
  const recent = examHistory[0];
  return `${heading('OPTIONS KNOWLEDGE TEST', '把知识练熟，再从容开考。', '按上交所 2026 年业务指南配置，练习个人期权开户知识。')}${resumeBanner()}
    <div class="home-grid"><section>
      <div class="featured"><div class="featured-copy"><span class="featured-label">综合考试 · 一次覆盖三级知识</span><h2>30 分钟，检验你的准备。</h2><p>期权基础、备兑与保险、买入和卖出策略。<br>按章节比例随机抽题，交卷后查看完整解析。</p><div class="exam-metrics"><div><strong>20<span> 题</span></strong><small>单项选择</small></div><div><strong>30<span> 分钟</span></strong><small>限时作答</small></div><div><strong>70<span> 分</span></strong><small>且各部分 ≥ 60%</small></div></div>${btn('开始综合模拟', 'start-exam', 'data-profile="comprehensive"', 'light-primary')}</div><div class="featured-number" aria-hidden="true"><span>TEST</span>01<div>综合能力自测</div></div></div>
      <div class="section-title"><h2>分级模拟</h2><span>针对对应交易权限的知识范围</span></div>
      <div class="level-grid">${['level1', 'level2', 'level3'].map((id, i) => {const p = PROFILES[id]; return `<article class="level-card"><span class="level-number">0${i + 1}</span><span class="level-tag">LEVEL ${i + 1}</span><h3>${p.name}</h3><p>${p.tag}</p><div class="card-meta">${totalFor(p)} 题<span>20 分钟</span><span>70 分合格</span></div>${btn('开始模拟', 'start-exam', `data-profile="${id}"`, 'secondary full')}</article>`;}).join('')}</div>
      <div class="rule-note">${icon('info')}<p>综合卷按 <strong>6＋4＋5＋5</strong> 抽题。总分达标之外，三个部分至少答对 <strong>6 / 10、3 / 5、3 / 5</strong> 题。${btn('查看规则依据', 'nav', 'data-view="guide"', 'text-button')}</p></div>
    </section><aside class="right-column"><section class="panel progress-panel"><div class="section-title"><h2>学习进度</h2><span>本机记录</span></div><div class="progress-overview"><div class="progress-ring" style="--progress:${attempted / QUESTIONS.length * 100}%"><div><strong>${attempted}</strong><span>/ ${QUESTIONS.length} 题</span></div></div><p>已练习题目<br><span>一步一步，补齐知识点</span></p></div>${Object.entries(CHAPTERS).map(([ch, c]) => {const qs = QUESTIONS.filter(q => q.chapter === Number(ch)); const done = qs.filter(q => state.progress[q.id]).length; return `<div class="chapter-progress"><div><span>${c.short}</span><small>${done} / ${qs.length}</small></div><div class="bar"><span style="width:${done / qs.length * 100}%"></span></div></div>`;}).join('')}${btn('开始专项练习', 'nav', 'data-view="practice"', 'secondary full')}</section>
    <section class="panel compact"><div class="section-title"><h2>最近模拟</h2>${icon('chart')}</div>${recent ? `<strong class="recent-score">${grade(recent, QUESTIONS).score}<small> 分</small></strong><p>${esc(recent.title)} · ${date(recent.endedAt)}</p>${btn('查看成绩与解析', 'open-result', `data-id="${recent.id}"`, 'text-button')}` : '<div class="empty-small">还没有模拟成绩<p>完成第一份模拟卷，找到需要巩固的部分。</p></div>'}</section>
    <div class="course-entry"><span class="eyebrow">从知识到练习</span><h2>先把期权系统学一遍</h2><p>12 章原创教程，从权利与义务，到损益、Greeks 和组合风险。</p><div class="entry-tags"><span>互动曲线</span><span>计算示例</span><span>章末自测</span></div>${btn('进入系统教程 →', 'nav', 'data-view="course"', 'secondary full')}</div></aside></div>`;
}

function practiceView() {
  const candidates = filteredPractice();
  return `${heading('FOCUSED PRACTICE', '专项练习', '按章节巩固知识，确认答案后立即查看解析。')}${resumeBanner()}<div class="practice-grid"><section class="panel"><h2>选择练习范围</h2>${SUBJECT.isFund ? `<div class="fund-filter-row"><label for="practice-source">题目来源<select id="practice-source"><option value="all" ${practiceSource==='all'?'selected':''}>全部来源</option><option value="original" ${practiceSource==='original'?'selected':''}>原创模拟</option><option value="recall" ${practiceSource==='recall'?'selected':''}>历年回忆题 · 重述</option></select></label><label for="practice-year">回忆题年份<select id="practice-year" ${practiceSource!=='recall'?'disabled':''}>${fundYearOptions(SUBJECT,practiceYear)}</select></label></div>` : ''}<div class="chapter-picker">${btn(`<strong>全部章节</strong><span>覆盖${Object.keys(CHAPTERS).length}个知识模块</span><b>${filteredPractice(0).length} 题</b>`, 'pick-chapter', `data-chapter="0" aria-pressed="${practiceChapter === 0}"`, practiceChapter === 0 ? 'chapter-option selected' : 'chapter-option')}${Object.entries(CHAPTERS).map(([ch, c]) => btn(`<strong>${c.name}</strong><span>${c.desc}</span><b>${filteredPractice(Number(ch)).length} 题</b>`, 'pick-chapter', `data-chapter="${ch}" aria-pressed="${practiceChapter === Number(ch)}"`, practiceChapter === Number(ch) ? 'chapter-option selected' : 'chapter-option')).join('')}</div></section><aside class="panel practice-settings"><span class="eyebrow">本次练习</span><h2>${practiceChapter ? CHAPTERS[practiceChapter].short : '全部章节'}</h2><label for="practice-count">题目数量</label><select id="practice-count"><option value="10" ${practiceCount === 10 ? 'selected' : ''}>随机 10 题</option><option value="20" ${practiceCount === 20 ? 'selected' : ''}>随机 20 题</option><option value="0" ${practiceCount === 0 ? 'selected' : ''}>全部 ${candidates.length} 题（顺序）</option></select><ul class="check-list"><li>不限时，随时继续</li><li>确认后查看答案与解析</li><li>自动记录练习与错题</li></ul>${btn('开始练习', 'start-practice', candidates.length ? '' : 'disabled', 'primary full')}<p class="practice-match" role="status">${candidates.length ? `匹配 ${candidates.length} 题 · 本次 ${practiceCount ? Math.min(practiceCount,candidates.length) : candidates.length} 题` : '此章节／年份暂无匹配题，请调整筛选。'}</p><p class="muted">${SUBJECT.isFund ? '原创模拟与回忆题分别标注；均非官方原卷。' : '原创单选练习，不是官方原卷。'}</p></aside></div>`;
}

function questionList(qs) {
  return `<div class="question-list">${qs.map(q => `<article class="list-question"><div class="question-badges"><span>${CHAPTERS[q.chapter].short}</span><span>${esc(q.topic)}</span></div><h3>${esc(q.stem)}</h3><details><summary>查看答案与解析</summary><p><strong>正确答案 ${letter(q.answer)} · ${esc(q.options[q.answer])}</strong></p><p>${esc(q.explanation)}</p><div class="source">${esc(q.origin)} · 参考依据：${sourceLink(q)}</div></details></article>`).join('')}</div>`;
}
function wrongView() {
  const all = wrongIds();
  const qs = all.map(id => qmap.get(id)).filter(q => !wrongChapter || q.chapter === wrongChapter);
  return `${heading('LEARN FROM MISTAKES', '错题本', '保留最近一次答错的题目；重新答对后自动移出。', qs.length ? btn(`重练这 ${qs.length} 题`, 'start-wrong', '', 'primary') : '')}<div class="filter-row"><label for="wrong-chapter">章节</label><select id="wrong-chapter"><option value="0">全部章节（${all.length}）</option>${Object.entries(CHAPTERS).map(([ch, c]) => `<option value="${ch}" ${wrongChapter === Number(ch) ? 'selected' : ''}>${c.name}</option>`).join('')}</select></div>${qs.length ? questionList(qs) : `<section class="empty-state">${icon('check')}<h2>${all.length ? '这个章节暂时没有错题' : '错题本还是空的'}</h2><p>在练习或模拟中答错的题目，会自动出现在这里。</p>${btn('去专项练习', 'nav', 'data-view="practice"', 'primary')}</section>`}`;
}

function historyView() {
  const exam = state.history.filter(s => s.mode === 'exam');
  const passed = exam.filter(s => grade(s, QUESTIONS).passed).length;
  return `${heading('YOUR LEARNING RECORD', '学习记录', '回看最近 50 次已完成的模拟和练习。记录仅保存在本机。')}<div class="stats-row"><div><span>完成模拟</span><strong>${exam.length}<small> 次</small></strong></div><div><span>模拟达标</span><strong>${passed}<small> 次</small></strong></div><div><span>当前错题</span><strong>${wrongIds().length}<small> 题</small></strong></div></div>${state.history.length ? `<section class="panel history-list">${state.history.map(s => {const g = grade(s, QUESTIONS); return `<div class="history-row"><div class="history-icon">${icon(s.mode === 'exam' ? 'exam' : 'book')}</div><div class="history-name"><strong>${esc(s.title)}</strong><span>${date(s.endedAt)} · ${g.total} 题${s.auto ? ' · 到时交卷' : ''}</span></div><div class="history-score"><strong>${g.score}</strong><span>${s.mode === 'exam' ? '分' : '% 正确'}</span></div><span class="status ${g.passed === true ? 'success' : g.passed === false ? 'fail' : ''}">${g.passed === null ? '练习完成' : g.passed ? '模拟达标' : '尚未达标'}</span>${btn('查看解析', 'open-result', `data-id="${s.id}"`, 'secondary small')}</div>`;}).join('')}</section>` : '<div class="empty-state"><h2>还没有已完成的记录</h2><p>提交模拟卷或结束一组练习后，可以在这里查看。</p></div>'}`;
}

function quizView() {
  const s = state.active;
  if (!s) { view = 'home'; return homeView(); }
  const q = qmap.get(s.ids[s.index]);
  const selected = s.answers[q.id];
  const revealed = s.mode === 'practice' && s.checked.includes(q.id);
  const answered = Object.keys(s.answers).length;
  return `<div class="quiz-top"><div>${btn('返回学习空间', 'nav', 'data-view="home"', 'text-button')}<h1>${esc(s.title)}</h1><p>${s.mode === 'exam' ? '答案在交卷后显示 · 离开页面仍继续计时' : '不限时 · 确认答案后查看解析'}</p></div><div class="timer ${s.mode === 'exam' && remainingSeconds(s) <= 300 ? 'urgent' : ''}">${icon('clock')}<div><span>${s.mode === 'exam' ? '剩余时间' : '练习模式'}</span><strong id="timer-value">${s.mode === 'exam' ? formatTime(remainingSeconds(s)) : '不限时'}</strong></div></div></div><div class="quiz-grid"><section class="panel question-panel"><div class="question-top"><div class="question-badges"><span class="blue">单选题</span><span>${CHAPTERS[q.chapter].short}</span><span>${esc(q.topic)}</span></div><span class="question-counter">${String(s.index + 1).padStart(2, '0')}<small> / ${s.ids.length}</small></span></div>${SUBJECT.isFund ? `<p class="question-origin">${esc(q.origin)}${q.year ? ` · ${q.examSession}` : ''}</p>` : ''}<h2 class="question-stem" id="question-title" tabindex="-1">${esc(q.stem)}</h2><div class="options" role="radiogroup" aria-labelledby="question-title">${q.options.map((o, i) => `<button id="option-${i}" role="radio" aria-checked="${selected === i}" ${revealed ? 'disabled' : ''} class="option ${selected === i ? 'selected' : ''} ${revealed && i === q.answer ? 'correct' : ''} ${revealed && selected === i && i !== q.answer ? 'incorrect' : ''}" data-action="answer" data-answer="${i}"><span class="option-letter">${letter(i)}</span><span>${esc(o)}</span>${revealed && i === q.answer ? icon('check') : ''}</button>`).join('')}</div>
      ${revealed ? `<div class="explanation ${selected === q.answer ? 'correct-explanation' : ''}" role="status"><strong>${selected === q.answer ? '回答正确' : '再巩固一下'} · 正确答案 ${letter(q.answer)}</strong><p>${esc(q.explanation)}</p><div class="source">${q.origin} · 参考依据：${sourceLink(q)}</div></div>` : ''}
      <div class="question-bottom">${btn(`${icon('flag')}${s.marked.includes(q.id) ? '已标记' : '标记此题'}`, 'mark', `id="mark-button" aria-pressed="${s.marked.includes(q.id)}"`, 'text-button')}<span class="keyboard-hint">键盘 1–4 选择 · ← → 切题</span></div><div class="question-actions">${btn('上一题', 'previous', s.index === 0 ? 'disabled' : '', 'secondary')}<span class="save-indicator">${storageWarning ? '记录未能持久保存' : '作答自动保存'}</span>${s.mode === 'practice' && !revealed ? btn('确认答案', 'check', selected == null ? 'disabled' : '', 'primary') : s.index < s.ids.length - 1 ? btn('下一题', 'next', '', 'primary') : btn(s.mode === 'exam' ? '检查并交卷' : '结束练习', 'submit', '', 'primary')}</div></section><aside class="panel answer-panel"><div class="section-title"><h2>答题卡</h2><span>${answered} / ${s.ids.length}</span></div><div class="bar"><span style="width:${answered / s.ids.length * 100}%"></span></div><div class="answer-grid">${s.ids.map((id, i) => btn(String(i + 1), 'jump', `data-index="${i}" aria-label="第 ${i + 1} 题${s.answers[id] != null ? '，已答' : '，未答'}${s.marked.includes(id) ? '，已标记' : ''}" ${i === s.index ? 'aria-current="step"' : ''}`, `answer-cell ${s.answers[id] != null ? 'answered' : ''} ${i === s.index ? 'current' : ''} ${s.marked.includes(id) ? 'marked' : ''}`)).join('')}</div><div class="legend"><span><i></i>未答</span><span><i class="filled"></i>已答</span><span><i class="flagged"></i>标记</span></div>${s.mode === 'exam' ? `<div class="answer-rules"><strong>合格要求</strong><p>总分 ≥ ${PROFILES[s.profile].pass} 分${PROFILES[s.profile].sectional ? '<br>第一部分 ≥ 6 / 10<br>第二、三部分各 ≥ 3 / 5' : ''}</p></div>` : '<p class="muted">确认后计入练习记录，未确认的选择可修改。</p>'}${btn(s.mode === 'exam' ? '提交试卷' : '结束练习', 'submit', '', 'primary full')}</aside></div>`;
}

function resultView() {
  if (!result) return historyView();
  const g = grade(result, QUESTIONS);
  const isExam = result.mode === 'exam';
  const rows = g.rows.filter(r => reviewFilter !== 'wrong' || !r.correct);
  return `${heading('REVIEW & REFLECT', isExam ? '模拟完成，看看你的掌握情况。' : '练习完成，再巩固一步。', `${esc(result.title)} · ${date(result.endedAt)}${result.auto ? ' · 到时自动交卷' : ''}`, btn('返回学习空间', 'nav', 'data-view="home"', 'secondary'))}
    <section class="result-summary ${g.passed === false ? 'not-passed' : ''}"><div class="big-score">${g.score}<span>${isExam ? '/ 100 分' : '% 正确率'}</span></div><div class="result-message"><span class="status ${g.passed === false ? 'fail' : 'success'}">${isExam ? g.passed ? '本次模拟达标' : '本次尚未达标' : '本次练习完成'}</span><h2>${g.passed === false ? g.score >= PROFILES[result.profile]?.pass && !g.sectionPass ? '总分达标，还需巩固薄弱部分。' : '找到薄弱点，就是进步的起点。' : '理解每一个答案，比记住分数更重要。'}</h2><p>答对 ${g.correct} / ${g.total} 题 · ${g.total - g.correct} 道${isExam ? '错误或未答' : '错题'}${isExam ? ' · 模拟成绩不具有正式考试效力' : ''}</p></div></section>
    ${isExam ? `<div class="section-results">${g.sections.map(s => `<div class="panel"><span>${SUBJECT.isFund ? SUBJECT.short : ['', '第一部分 · 基础与备兑保险', '第二部分 · 买入开仓', '第三部分 · 卖出开仓'][s.level]}</span><strong>${s.correct}<small> / ${s.total} 题</small></strong><p>${PROFILES[result.profile].sectional ? `${s.correct / s.total >= .6 ? '已达' : '未达'}分项 60% 要求` : `正确率 ${Math.round(s.correct / s.total * 100)}%`}</p></div>`).join('')}</div>` : ''}
    <div class="section-title review-heading"><h2>逐题解析</h2><div class="segmented">${btn(`全部 ${g.total}`, 'review-filter', `data-filter="all" aria-pressed="${reviewFilter === 'all'}"`, reviewFilter === 'all' ? 'selected' : '')}${btn(`错题 ${g.total - g.correct}`, 'review-filter', `data-filter="wrong" aria-pressed="${reviewFilter === 'wrong'}"`, reviewFilter === 'wrong' ? 'selected' : '')}</div></div><div class="review-list">${rows.length ? rows.map(r => {const q = qmap.get(r.id); const n = result.ids.indexOf(r.id) + 1; return `<article class="panel review-question"><div class="question-badges"><span class="${r.correct ? 'green' : 'red'}">${r.correct ? '正确' : r.answer == null ? '未作答' : '错误'}</span><span>${CHAPTERS[q.chapter].short}</span><span>${esc(q.topic)}</span></div><h3>${n}. ${esc(q.stem)}</h3><div class="review-options">${q.options.map((o, i) => `<p class="${i === q.answer ? 'right-answer' : i === r.answer ? 'wrong-answer' : ''}"><b>${letter(i)}</b>${esc(o)}${i === q.answer ? '<span>正确答案</span>' : i === r.answer ? '<span>你的选择</span>' : ''}</p>`).join('')}</div><div class="explanation"><p>${esc(q.explanation)}</p><div class="source">${esc(q.origin)} · 参考依据：${sourceLink(q)}</div></div></article>`;}).join('') : '<div class="empty-state"><h2>这次没有错题</h2><p>可以再做一套随机模拟卷，检验掌握是否稳定。</p></div>'}</div>`;
}

function guideView() {
  if (SUBJECT.isFund) return fundGuide(SUBJECT);
  return `${heading('RULES & REFERENCES', '考试说明与资料来源', '把正式考试规则、历史样卷和本站练习清楚地区分。')}<section class="panel prose"><span class="soft-badge">模拟范围：上交所个人投资者</span><h2>模拟卷怎么配置？</h2><p>题量、章节配比、计时及合格条件依据上交所 2026 年修订的《证券公司股票期权经纪业务指南》。下表是本站实际执行的配置，不是银河官网练习测试的配置。</p><div class="table-scroll"><table><thead><tr><th>模拟类型</th><th>题量 / 分值</th><th>时间</th><th>章节配比</th><th>合格要求</th></tr></thead><tbody><tr><td>一级</td><td>20 题 × 5 分</td><td>20 分钟</td><td>第一章 12 + 第二章 8</td><td>≥ 70 分</td></tr><tr><td>二级</td><td>10 题 × 10 分</td><td>20 分钟</td><td>第三章 10</td><td>≥ 70 分</td></tr><tr><td>三级</td><td>10 题 × 10 分</td><td>20 分钟</td><td>第四章 10</td><td>≥ 70 分</td></tr><tr><td>综合</td><td>20 题 × 5 分</td><td>30 分钟</td><td>第一章 6 + 第二章 4 + 第三章 5 + 第四章 5</td><td>≥ 70 分且三个部分各 ≥ 60%</td></tr></tbody></table></div><p><strong>综合卷分项：</strong>第一、二章合为第一部分，至少对 6 / 10；第三章、第四章各为一部分，各至少对 3 / 5。总分 70 分但某部分不达标，仍不合格。</p><p><strong>题型：</strong>本站采用公开历史样卷的四选一单项选择题。2026 年指南明确上述配置，但该考试配置条款没有单独重述题型；本站题型依据与配置依据已分别列出。</p><p><strong>范围：</strong>本版暂未配置深交所考试、期货开户考试、证券从业考试，也不模拟营业部身份核验。正式逐级考试须按顺序通过，本站为学习需要开放全部级别；考试通过也不代表已经取得交易权限。银河证券实际办理以其当次通知及适当性审核为准。</p></section>
    <section class="panel prose"><h2>题库与作答说明</h2><ul><li>当前 ${QUESTIONS.length} 道独立编写的练习题，逐题提供解析和知识参考。不是历年真题、泄露题库或交易所官方原卷。</li><li>章节题量：${Object.entries(CHAPTERS).map(([ch, c]) => `${c.short} ${QUESTIONS.filter(q => q.chapter === Number(ch)).length} 道`).join('、')}。每套模拟卷内部不重复抽题。</li><li>本次在原 100 题上新增 250 道知识与情景题、150 道计算案例；含 Greeks 与组合风险拓展内容，不承诺与正式题库逐题对应。原有题号和答案保持兼容。</li><li>模拟卷交卷前不显示答案。倒计时按截止时间计算，刷新、切换页面或退出浏览器后仍继续；再次打开过期答卷会自动交卷。</li><li>章节练习确认答案后计入记录。提前结束时，只统计已确认的题目；模拟卷未作答的题目按错误计。</li><li>最近答错的题进入错题本；重新答对自动移出。仅查看解析不会移除错题。记录仅存于当前浏览器，清除浏览器数据会丢失。</li><li>计算题以题干假设为准；到期理论损益不等同于实际成交或行权后的标的收益。涉及实时参数的规则，应以交易所与经营机构公告为准。</li></ul></section><section class="panel prose"><h2>资料来源</h2><div class="sources">${Object.values(SOURCES).map(s => `<article><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.title}</a><p>${s.note}</p></article>`).join('')}</div><p class="muted">规则核验日期：2026-09-29 · 题库版本：${BANK_VERSION}</p></section>`;
}

function navigate(next) {
  view = next;
  const hash = next === 'course' ? courseHash() : ['resources','coverage'].includes(next) ? `#${next}` : '';
  if (location.hash !== hash) history.pushState(null, '', location.pathname + location.search + hash);
  render(); window.scrollTo({ top: 0, behavior: 'instant' }); document.querySelector('#main')?.focus({ preventScroll: true });
}
const courseCallbacks = { render, navigate, practice: chapter => { practiceChapter = chapter; practiceSource='all'; practiceYear=0; navigate('practice'); } };
function dialog(title, text, action, label = '确认') {
  modalAction = action;
  document.querySelector('#dialog-title').textContent = title;
  document.querySelector('#dialog-text').textContent = text;
  document.querySelector('#confirm-button').textContent = label;
  document.querySelector('#confirm-dialog').showModal();
}
function startSession(session) {
  const start = () => {
    session.startedAt = Date.now();
    session.deadline = session.mode === 'exam' ? session.startedAt + PROFILES[session.profile].minutes * 60000 : null;
    state.active = session; save(); navigate('quiz');
  };
  if (state.active) dialog('开始新的作答？', '已有未完成的答卷。开始后将替换它；已记录的练习与历史成绩仍会保留。', start, '替换并开始');
  else start();
}
function finish(auto = false) {
  const s = state.active;
  if (!s) return;
  const completed = { ...s, endedAt: Date.now(), auto };
  if (s.mode === 'practice') {
    completed.ids = s.ids.filter(id => s.checked.includes(id));
    if (!completed.ids.length) { state.active = null; save(); navigate('practice'); return; }
    completed.answers = Object.fromEntries(completed.ids.map(id => [id, s.answers[id]]));
    completed.checked = [...completed.ids];
    completed.marked = s.marked.filter(id => completed.ids.includes(id));
    completed.index = 0;
  } else state.progress = updateProgress(state.progress, grade(s, QUESTIONS).rows);
  state.history = [completed, ...state.history].slice(0, 50);
  state.active = null;
  result = completed;
  reviewFilter = 'all';
  save();
  navigate('result');
}
function formatTime(seconds) { return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`; }
function tick() {
  if (state.active?.mode !== 'exam') return;
  const seconds = remainingSeconds(state.active);
  if (seconds <= 0) { modalAction = null; finish(true); return; }
  const timer = document.querySelector('#timer-value');
  if (timer) { timer.textContent = formatTime(seconds); timer.closest('.timer').classList.toggle('urgent', seconds <= 300); }
}

app.addEventListener('click', e => {
  const target = e.target.closest('[data-action]');
  if (!target || target.disabled) return;
  e.preventDefault();
  const { action } = target.dataset;
  if (state.active?.mode === 'exam' && remainingSeconds(state.active) <= 0) { tick(); return; }
  const s = state.active;
  if (handleCourseAction(target, courseCallbacks)) return;
  if (action === 'nav') navigate(target.dataset.view);
  else if (action === 'resume') navigate('quiz');
  else if (action === 'start-exam') { const profile = target.dataset.profile; startSession(makeSession(makePaper(QUESTIONS, profile), 'exam', profile)); }
  else if (action === 'recall-practice') { practiceChapter=0;practiceSource='recall';practiceYear=Number(target.dataset.year)||0;practiceCount=0;navigate('practice'); }
  else if (action === 'pick-chapter') { practiceChapter = Number(target.dataset.chapter); render(); }
  else if (action === 'start-practice') {
    let qs = filteredPractice();
    if (!qs.length) return;
    if (practiceCount) qs = shuffle(qs).slice(0, practiceCount);
    const next = makeSession(qs.map(q => q.id), 'practice');
    next.title = `${practiceChapter ? CHAPTERS[practiceChapter].short : '全章节'}${practiceSource==='recall' ? ` · ${practiceYear||'历年'}回忆题` : ''}练习`;
    startSession(next);
  } else if (action === 'start-wrong') {
    const ids = wrongIds().filter(id => !wrongChapter || qmap.get(id).chapter === wrongChapter);
    if (!ids.length) return;
    const next = makeSession(shuffle(ids), 'practice'); next.title = '错题重练'; startSession(next);
  } else if (action === 'answer' && s) {
    const id = s.ids[s.index];
    if (s.checked.includes(id)) return;
    s.answers[id] = Number(target.dataset.answer); save(); render();
  } else if (action === 'check' && s?.mode === 'practice') {
    const id = s.ids[s.index];
    if (s.answers[id] == null || s.checked.includes(id)) return;
    s.checked.push(id);
    state.progress = updateProgress(state.progress, [{ id, correct: s.answers[id] === qmap.get(id).answer }]);
    save(); render();
  } else if (['next', 'previous', 'jump'].includes(action) && s) {
    s.index = action === 'jump' ? Number(target.dataset.index) : Math.min(s.ids.length - 1, Math.max(0, s.index + (action === 'next' ? 1 : -1)));
    save(); render(); document.querySelector('#question-title')?.focus();
  } else if (action === 'mark' && s) {
    const id = s.ids[s.index]; s.marked = s.marked.includes(id) ? s.marked.filter(x => x !== id) : [...s.marked, id]; save(); render();
  } else if (action === 'submit' && s) {
    const unanswered = s.ids.length - Object.keys(s.answers).length;
    dialog(s.mode === 'exam' ? '确认提交试卷？' : '结束本次练习？', s.mode === 'exam' ? `${unanswered ? `还有 ${unanswered} 题未作答，将按错误计分。` : '全部题目已作答。'}交卷后不能修改答案。` : `将统计已确认的 ${s.checked.length} 题，未确认的题目不计入本次结果。`, () => finish(), s.mode === 'exam' ? '确认交卷' : '结束练习');
  } else if (action === 'confirm-dialog') { const fn = modalAction; modalAction = null; document.querySelector('#confirm-dialog').close(); fn?.(); }
  else if (action === 'cancel-dialog') { modalAction = null; document.querySelector('#confirm-dialog').close(); }
  else if (action === 'open-result') { result = state.history.find(h => h.id === target.dataset.id); reviewFilter = 'all'; navigate('result'); }
  else if (action === 'review-filter') { reviewFilter = target.dataset.filter; render(); }
});
app.addEventListener('change', e => {
  if (e.target.id === 'subject-select') {
    const url = new URL(location.href);
    if (e.target.value === 'options') url.searchParams.delete('subject');
    else url.searchParams.set('subject', e.target.value);
    url.hash = ''; location.assign(url); return;
  }
  if (handleCourseChange(e.target, courseCallbacks)) return;
  if (e.target.id === 'practice-count') { practiceCount = Number(e.target.value);render(); }
  if (e.target.id === 'practice-source') { practiceSource=e.target.value;practiceYear=0;render(); }
  if (e.target.id === 'practice-year') { practiceYear=Number(e.target.value);render(); }
  if (e.target.id === 'recall-year') { recallYear=Number(e.target.value);render(); }
  if (e.target.id === 'coverage-chapter') { coverageChapter=Number(e.target.value);render(); }
  if (e.target.id === 'wrong-chapter') { wrongChapter = Number(e.target.value); render(); }
});
app.addEventListener('input', e => { if (e.target.type === 'range') handleLabInput(e.target); });
document.addEventListener('keydown', e => {
  if (view !== 'quiz' || document.querySelector('dialog[open]') || e.ctrlKey || e.metaKey || e.altKey || ['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;
  if (/^[1-4]$/.test(e.key)) { e.preventDefault(); document.querySelector(`#option-${Number(e.key) - 1}`)?.click(); }
  if (e.key === 'ArrowRight') { e.preventDefault(); const s = state.active; if (s && s.index < s.ids.length - 1) document.querySelector(`[data-action="jump"][data-index="${s.index + 1}"]`)?.click(); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); const s = state.active; if (s && s.index > 0) document.querySelector(`[data-action="jump"][data-index="${s.index - 1}"]`)?.click(); }
});
window.addEventListener('storage', e => { if (e.key === KEY) { state = load(); render(); tick(); } });
window.addEventListener('hashchange', () => {
  view = hashView(); render(); window.scrollTo(0, 0);
  document.querySelector('#main')?.focus({ preventScroll: true });
});
document.addEventListener('visibilitychange', tick);
render();
tick();
setInterval(tick, 500);
