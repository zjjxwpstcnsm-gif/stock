import { SUBJECT, subjectOptions } from './subjects.js';
import { fundGuide, fundCoverage } from './fund-views.js';
import { learningHome, catalogView, resourcesView, academyGuide, searchView, yearOptions, letters, sourceLabel } from './academy-views.js';
import { TYPE_NAMES } from './academy-data.js';
import { CONTENT_DATE } from './academy-sources.js';
import { validateBackup, importBackup, downloadBackup } from './learning-records.js';
import { createExamEngine, remainingSeconds, shuffle, updateProgress, isCorrect, questionType, paperSize } from './engine.js';
const { BANK_VERSION, CHAPTERS, PROFILES, SOURCES, QUESTIONS } = SUBJECT;
const { makePaper, makeSession, grade, validSession } = createExamEngine(SUBJECT);
import { courseView, courseHash, syncCourseHash, handleCourseAction, handleCourseChange, handleLabInput, courseProgress, refreshCourseProgress, applyReaderPreferences } from './course.js';

const app = document.querySelector('#app');
const KEY = SUBJECT.practiceKey;
const qmap = new Map(QUESTIONS.map(q => [q.id, q]));
let storageWarning = '';
let state = load();

let result = null;
let reviewFilter = 'all';
let practiceChapter = 0;
let practiceCount = 10;
let practiceSource = 'all', practiceYear = 0, recallYear = 0, coverageChapter = 0;
let wrongChapter = 0;
let practiceType = 'all', practiceQuery = '', practiceQuestion = null;
let searchQuery = '', searchScope = 'current', searchType = 'all', searchLimit = 20;
let recordStatus = '';
const hasAnswer = (answer,index) => Array.isArray(answer) ? answer.includes(index) : answer === index;
function hashView() {
  if (syncCourseHash()) return 'course';
  const [route,params] = location.hash.slice(1).split('?');
  const query = new URLSearchParams(params || '');
  if(route==='search') searchQuery=(query.get('q')||'').slice(0,100);
  if(route==='practice') practiceQuestion=qmap.has(query.get('question'))?query.get('question'):null;
  return ['practice','wrong','history','guide','catalog','search','resources',...(SUBJECT.isFund?['coverage']:[])].includes(route) ? route : 'home';
}
let view = hashView();
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
const letter = letters;
const date = n => new Date(n).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false });
const btn = (text, action, extra = '', cls = '') => `<button class="${cls}" data-action="${action}" ${extra}>${text}</button>`;
const totalFor = paperSize;
function load() {
  storageWarning='';
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
  try { localStorage.setItem(KEY, JSON.stringify(state));storageWarning=''; }
  catch { storageWarning = '浏览器未能保存记录；本次作答仍在内存中，关闭或刷新页面可能丢失。'; }
}
function wrongIds() { return QUESTIONS.filter(q => state.progress[q.id]?.wrong).map(q => q.id); }
function sourceLink(q) {
  const source=SOURCES[q.source];
  return `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${esc(source.title)}</a>${['recall','sample'].includes(q.sourceKind) ? ` · 来源页面第 ${q.sourceQuestion} 题 · ${esc(q.examSession)}<p>${esc(q.reviewNote)}</p>` : ''}`;
}
const filteredPractice = (chapter=practiceChapter) => QUESTIONS.filter(q=>(!chapter || q.chapter===chapter) && (practiceSource==='all' || (q.sourceKind||'original')===practiceSource) && (!practiceYear || q.year===practiceYear) && (practiceType==='all' || questionType(q)===practiceType) && (!practiceQuestion || q.id===practiceQuestion) && (!practiceQuery || `${q.stem} ${q.topic} ${q.options.join(' ')}`.toLowerCase().includes(practiceQuery.toLowerCase())));

function render() {
  const focused = document.activeElement?.id;
  const current = view === 'quiz' ? 'home' : view === 'result' ? 'history' : view;
  const links = [['home', 'exam', '模拟考试'], ['course', 'book', '系统教程'], ['practice', 'book', '专项练习'], ['wrong', 'wrong', '错题本'], ['history', 'chart', '学习记录'], ['guide', 'info', '考试说明']];
  links.splice(2,0,['resources','info','真题资料']);
  if (SUBJECT.isFund) links.splice(2, 0, ['coverage', 'chart', '大纲清单']);
  links.push(['catalog','book','课程全景']);
  document.title = `${SUBJECT.short} · 知权金融研习`;
  app.innerHTML = `<div class="shell">
    <aside class="sidebar">
      <a href="#" class="brand" data-action="nav" data-view="home"><span class="brand-icon">知</span><span>知权<span class="brand-en">STOCK ACADEMY</span></span></a>
      <label class="subject-picker" for="subject-select">切换考试科目<select id="subject-select">${subjectOptions()}</select></label><div class="nav-label">我的学习空间</div>
      <nav aria-label="主导航">${links.map(([key, img, name]) => `<button data-action="nav" data-view="${key}" class="nav-item ${current === key ? 'active' : ''}" ${current === key ? 'aria-current="page"' : ''}>${icon(img)}<span>${name}</span>${key === 'wrong' && wrongIds().length ? `<span class="nav-count">${wrongIds().length}</span>` : ''}</button>`).join('')}</nav>
      <div class="sidebar-note"><span class="tiny-label">当前科目</span><strong>${SUBJECT.family}</strong><p>${SUBJECT.name}</p><span class="soft-badge">${QUESTIONS.length} 道题 · ${SUBJECT.LESSONS.length} 章</span></div>
      <div class="sidebar-bottom">每一道题，都多懂一点。<a href="https://github.com/zjjxwpstcnsm-gif/stock" target="_blank" rel="noopener noreferrer">GitHub 开源项目 ${icon('chevron')}</a></div>
    </aside>
    <div class="workspace">
      <header class="topbar"><div class="breadcrumb-trail"><span class="breadcrumb">学习空间</span><span class="separator">/</span><strong>${SUBJECT.short}</strong></div><form id="topbar-search" class="topbar-search"><label class="sr-only" for="global-search">搜索理论、题目与考点</label><input type="search" id="global-search" name="query" maxlength="100" placeholder="搜索理论、题目与考点"><button type="submit" aria-label="搜索">⌕</button></form><span class="version">内容核对 ${CONTENT_DATE}</span></header>
      ${storageWarning ? `<div role="status" class="warning">${esc(storageWarning)}</div>` : ''}
      <main id="main" tabindex="-1">${view === 'course' ? courseView() : view === 'quiz' ? quizView() : view === 'practice' ? practiceView() : view === 'wrong' ? wrongView() : view === 'history' ? historyView() : view === 'coverage' ? fundCoverage(SUBJECT,coverageChapter) : view === 'resources' ? resourcesView(SUBJECT,recallYear) : view === 'catalog' ? catalogView() : view === 'search' ? searchView(searchQuery,searchScope,SUBJECT,searchType,searchLimit) : view === 'guide' ? guideView() : view === 'result' ? resultView() : homeView()}</main>
      <footer>独立学习项目 · 原创训练与来源题分列 · 模拟成绩仅用于学习<span>记录仅保存在当前浏览器</span></footer>
    </div>
  </div><dialog id="confirm-dialog" aria-labelledby="dialog-title"><h2 id="dialog-title"></h2><p id="dialog-text"></p><div class="dialog-actions">${btn('返回', 'cancel-dialog', '', 'secondary')}${btn('确认', 'confirm-dialog', 'id="confirm-button"', 'primary')}</div></dialog>`;
  applyReaderPreferences();
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
function homeView() { return learningHome(SUBJECT,state,courseProgress(),resumeBanner(),grade); }

function practiceView() {
  const candidates = filteredPractice();
  return `${heading('FOCUSED PRACTICE', '专项练习', '按章节、来源和题型巩固知识，确认答案后立即查看解析。')}${resumeBanner()}${practiceQuestion?`<div class="located-question" role="status"><span>已从搜索定位 1 道题，可以直接开始练习。</span>${btn('清除定位','clear-location','','text-button')}</div>`:''}<div class="practice-grid"><section class="panel"><h2>选择练习范围</h2><div class="practice-filters"><label for="practice-source">题目来源<select id="practice-source"><option value="all" ${practiceSource==='all'?'selected':''}>全部来源</option><option value="original" ${practiceSource==='original'?'selected':''}>原创训练</option><option value="recall" ${practiceSource==='recall'?'selected':''}>历年回忆题 · 重述</option><option value="sample" ${practiceSource==='sample'?'selected':''}>历史样卷 · 重述</option></select></label><label for="practice-year">来源年份<select id="practice-year" ${!['recall','sample'].includes(practiceSource)?'disabled':''}>${yearOptions(SUBJECT,practiceYear)}</select></label><label for="practice-type">题型<select id="practice-type"><option value="all">全部题型</option>${Object.entries(TYPE_NAMES).filter(([type])=>QUESTIONS.some(q=>questionType(q)===type)).map(([type,label])=>`<option value="${type}" ${practiceType===type?'selected':''}>${label}</option>`).join('')}</select></label></div><form id="practice-search" class="practice-keyword"><label class="sr-only" for="practice-query">筛选考点关键词</label><input id="practice-query" name="query" type="search" value="${esc(practiceQuery)}" placeholder="输入考点关键词筛选" maxlength="100"><button class="secondary" type="submit">筛选</button></form><div class="chapter-picker">${btn(`<strong>全部章节</strong><span>覆盖${Object.keys(CHAPTERS).length}个知识模块</span><b>${filteredPractice(0).length} 题</b>`, 'pick-chapter', `data-chapter="0" aria-pressed="${practiceChapter === 0}"`, practiceChapter === 0 ? 'chapter-option selected' : 'chapter-option')}${Object.entries(CHAPTERS).map(([ch,c])=>btn(`<strong>${esc(c.name)}</strong><span>${esc(c.desc)}</span><b>${filteredPractice(Number(ch)).length} 题</b>`,'pick-chapter',`data-chapter="${ch}" aria-pressed="${practiceChapter===Number(ch)}"`,practiceChapter===Number(ch)?'chapter-option selected':'chapter-option')).join('')}</div></section><aside class="panel practice-settings"><span class="eyebrow">本次练习</span><h2>${practiceChapter ? CHAPTERS[practiceChapter].short : '全部章节'}</h2><label for="practice-count">题目数量</label><select id="practice-count"><option value="10" ${practiceCount===10?'selected':''}>随机 10 题</option><option value="20" ${practiceCount===20?'selected':''}>随机 20 题</option><option value="0" ${practiceCount===0?'selected':''}>全部 ${candidates.length} 题（顺序）</option></select><ul class="check-list"><li>不限时，随时继续</li><li>确认后查看答案与解析</li><li>自动记录练习与错题</li><li>多选须选全正确项</li></ul>${btn('开始练习','start-practice',candidates.length?'':'disabled','primary full')}<p class="practice-match" role="status">${candidates.length?`匹配 ${candidates.length} 题 · 本次 ${practiceCount?Math.min(practiceCount,candidates.length):candidates.length} 题`:'此章节／年份暂无匹配题，请调整筛选。'}</p><p class="muted">原创、参数变式与来源题分别标注；均非官方原卷。</p></aside></div>`;
}

function questionList(qs) {
  return `<div class="question-list">${qs.map(q => `<article class="list-question"><div class="question-badges"><span>${CHAPTERS[q.chapter].short}</span><span>${esc(q.topic)}</span></div><h3>${esc(q.stem)}</h3><details><summary>查看答案与解析</summary><p><strong>正确答案 ${letter(q.answer)} · ${(Array.isArray(q.answer)?q.answer:[q.answer]).map(a=>esc(q.options[a])).join('；')}</strong></p><p>${esc(q.explanation)}</p><div class="source">${esc(q.origin)} · 参考依据：${sourceLink(q)}</div></details></article>`).join('')}</div>`;
}
function wrongView() {
  const all = wrongIds();
  const qs = all.map(id => qmap.get(id)).filter(q => !wrongChapter || q.chapter === wrongChapter);
  return `${heading('LEARN FROM MISTAKES', '错题本', '保留最近一次答错的题目；重新答对后自动移出。', qs.length ? btn(`重练这 ${qs.length} 题`, 'start-wrong', '', 'primary') : '')}<div class="filter-row"><label for="wrong-chapter">章节</label><select id="wrong-chapter"><option value="0">全部章节（${all.length}）</option>${Object.entries(CHAPTERS).map(([ch, c]) => `<option value="${ch}" ${wrongChapter === Number(ch) ? 'selected' : ''}>${c.name}</option>`).join('')}</select></div>${qs.length ? questionList(qs) : `<section class="empty-state">${icon('check')}<h2>${all.length ? '这个章节暂时没有错题' : '错题本还是空的'}</h2><p>在练习或模拟中答错的题目，会自动出现在这里。</p>${btn('去专项练习', 'nav', 'data-view="practice"', 'primary')}</section>`}`;
}

function historyView() {
  const exam = state.history.filter(s => s.mode === 'exam');
  const passed = exam.filter(s => grade(s, QUESTIONS).passed).length;
  return `${heading('YOUR LEARNING RECORD', '学习记录', '回看最近 50 次已完成的模拟和练习。记录仅保存在本机。')}<div class="backup-tools panel"><div><strong>把学习进度带到下一台设备</strong><p>导出全部科目记录，导入时合并进度并保留本机未完成答卷。</p></div>${btn('导出学习记录','export-records','','secondary')}<label class="secondary import-label" for="import-records">导入记录<input id="import-records" type="file" accept="application/json,.json" class="sr-only"></label><p class="record-status" role="status">${esc(recordStatus)}</p></div><div class="stats-row"><div><span>完成模拟</span><strong>${exam.length}<small> 次</small></strong></div><div><span>模拟达标</span><strong>${passed}<small> 次</small></strong></div><div><span>当前错题</span><strong>${wrongIds().length}<small> 题</small></strong></div></div>${state.history.length ? `<section class="panel history-list">${state.history.map(s => {const g = grade(s, QUESTIONS); return `<div class="history-row"><div class="history-icon">${icon(s.mode === 'exam' ? 'exam' : 'book')}</div><div class="history-name"><strong>${esc(s.title)}</strong><span>${date(s.endedAt)} · ${g.total} 题${s.auto ? ' · 到时交卷' : ''}</span></div><div class="history-score"><strong>${g.score}</strong><span>${s.mode === 'exam' ? '分' : '% 正确'}</span></div><span class="status ${g.passed === true ? 'success' : g.passed === false ? 'fail' : ''}">${g.passed === null ? '练习完成' : g.passed ? '模拟达标' : '尚未达标'}</span>${btn('查看解析', 'open-result', `data-id="${esc(s.id)}"`, 'secondary small')}</div>`;}).join('')}</section>` : '<div class="empty-state"><h2>还没有已完成的记录</h2><p>提交模拟卷或结束一组练习后，可以在这里查看。</p></div>'}`;
}

function quizView() {
  const s = state.active;
  if (!s) { view = 'home'; return homeView(); }
  const q = qmap.get(s.ids[s.index]);
  const selected = s.answers[q.id];
  const revealed = s.mode === 'practice' && s.checked.includes(q.id);
  const answered = Object.keys(s.answers).length;
  return `<div class="quiz-top"><div>${btn('返回学习空间', 'nav', 'data-view="home"', 'text-button')}<h1>${esc(s.title)}</h1><p>${s.mode === 'exam' ? '答案在交卷后显示 · 离开页面仍继续计时' : '不限时 · 确认答案后查看解析'}</p></div><div class="timer ${s.mode === 'exam' && remainingSeconds(s) <= 300 ? 'urgent' : ''}">${icon('clock')}<div><span>${s.mode === 'exam' ? '剩余时间' : '练习模式'}</span><strong id="timer-value">${s.mode === 'exam' ? formatTime(remainingSeconds(s)) : '不限时'}</strong></div></div></div><div class="quiz-grid"><section class="panel question-panel"><div class="question-top"><div class="question-badges"><span class="blue">${TYPE_NAMES[questionType(q)]}</span><span>${CHAPTERS[q.chapter].short}</span><span>${esc(q.topic)}</span></div><span class="question-counter">${String(s.index + 1).padStart(2, '0')}<small> / ${s.ids.length}</small></span></div><p class="question-origin">${sourceLabel(q)}${q.year?` · ${esc(q.examSession)}`:''}</p><h2 class="question-stem" id="question-title" tabindex="-1">${esc(q.stem)}</h2><p class="answer-instruction">${Array.isArray(q.answer)?'选择所有正确项；再次点击可取消。多选、少选、错选均不得分。':questionType(q)==='judge'?'请选择正确或错误。':'请选择一个最合适的答案。'}</p><div class="options" role="${Array.isArray(q.answer)?'group':'radiogroup'}" aria-labelledby="question-title">${q.options.map((o, i) => `<button id="option-${i}" role="${Array.isArray(q.answer)?'checkbox':'radio'}" aria-checked="${hasAnswer(selected,i)}" ${revealed ? 'disabled' : ''} class="option ${hasAnswer(selected,i) ? 'selected' : ''} ${revealed && hasAnswer(q.answer,i) ? 'correct' : ''} ${revealed && hasAnswer(selected,i) && !hasAnswer(q.answer,i) ? 'incorrect' : ''}" data-action="answer" data-answer="${i}"><span class="option-letter">${letter(i)}</span><span>${esc(o)}</span>${revealed && hasAnswer(q.answer,i) ? icon('check') : ''}</button>`).join('')}</div>
      ${revealed ? `<div class="explanation ${isCorrect(selected,q) ? 'correct-explanation' : ''}" role="status"><strong>${isCorrect(selected,q) ? '回答正确' : '再巩固一下'} · 正确答案 ${letter(q.answer)}</strong><p>${esc(q.explanation)}</p><div class="source">${q.origin} · 参考依据：${sourceLink(q)}</div></div>` : ''}
      <div class="question-bottom">${btn(`${icon('flag')}${s.marked.includes(q.id) ? '已标记' : '标记此题'}`, 'mark', `id="mark-button" aria-pressed="${s.marked.includes(q.id)}"`, 'text-button')}<span class="keyboard-hint">键盘 1–4 选择 · ← → 切题</span></div><div class="question-actions">${btn('上一题', 'previous', s.index === 0 ? 'disabled' : '', 'secondary')}<span class="save-indicator">${storageWarning ? '记录未能持久保存' : '作答自动保存'}</span>${s.mode === 'practice' && !revealed ? btn('确认答案', 'check', selected == null ? 'disabled' : '', 'primary') : s.index < s.ids.length - 1 ? btn('下一题', 'next', '', 'primary') : btn(s.mode === 'exam' ? '检查并交卷' : '结束练习', 'submit', '', 'primary')}</div></section><aside class="panel answer-panel"><div class="section-title"><h2>答题卡</h2><span>${answered} / ${s.ids.length}</span></div><div class="bar"><span style="width:${answered / s.ids.length * 100}%"></span></div><div class="answer-grid">${s.ids.map((id, i) => btn(String(i + 1), 'jump', `data-index="${i}" aria-label="第 ${i + 1} 题${s.answers[id] != null ? '，已答' : '，未答'}${s.marked.includes(id) ? '，已标记' : ''}" ${i === s.index ? 'aria-current="step"' : ''}`, `answer-cell ${s.answers[id] != null ? 'answered' : ''} ${i === s.index ? 'current' : ''} ${s.marked.includes(id) ? 'marked' : ''}`)).join('')}</div><div class="legend"><span><i></i>未答</span><span><i class="filled"></i>已答</span><span><i class="flagged"></i>标记</span></div>${s.mode === 'exam' ? `<div class="answer-rules"><strong>合格要求</strong><p>总分 ≥ ${PROFILES[s.profile].pass} 分${PROFILES[s.profile].sectional ? '<br>第一部分 ≥ 6 / 10<br>第二、三部分各 ≥ 3 / 5' : ''}</p></div>` : '<p class="muted">确认后计入练习记录，未确认的选择可修改。</p>'}${btn(s.mode === 'exam' ? '提交试卷' : '结束练习', 'submit', '', 'primary full')}</aside></div>`;
}

function resultView() {
  if (!result) return historyView();
  const g = grade(result, QUESTIONS);
  const isExam = result.mode === 'exam';
  const rows = g.rows.filter(r => reviewFilter !== 'wrong' || !r.correct);
  return `${heading('REVIEW & REFLECT', isExam ? '模拟完成，看看你的掌握情况。' : '练习完成，再巩固一步。', `${esc(result.title)} · ${date(result.endedAt)}${result.auto ? ' · 到时自动交卷' : ''}`, btn('返回学习空间', 'nav', 'data-view="home"', 'secondary'))}
    <section class="result-summary ${g.passed === false ? 'not-passed' : ''}"><div class="big-score">${g.score}<span>${isExam ? '/ 100 分' : '% 正确率'}</span></div><div class="result-message"><span class="status ${g.passed === false ? 'fail' : 'success'}">${isExam ? g.passed ? '本次模拟达标' : '本次尚未达标' : '本次练习完成'}</span><h2>${g.passed === false ? g.score >= PROFILES[result.profile]?.pass && !g.sectionPass ? '总分达标，还需巩固薄弱部分。' : '找到薄弱点，就是进步的起点。' : '理解每一个答案，比记住分数更重要。'}</h2><p>答对 ${g.correct} / ${g.total} 题 · ${g.total - g.correct} 道${isExam ? '错误或未答' : '错题'}${isExam ? ' · 模拟成绩不具有正式考试效力' : ''}</p></div></section>
    ${isExam ? `<div class="section-results">${g.sections.map(s => `<div class="panel"><span>${SUBJECT.id!=='options' ? SUBJECT.short : ['', '第一部分 · 基础与备兑保险', '第二部分 · 买入开仓', '第三部分 · 卖出开仓'][s.level]}</span><strong>${s.correct}<small> / ${s.total} 题</small></strong><p>${PROFILES[result.profile].sectional ? `${s.correct / s.total >= .6 ? '已达' : '未达'}分项 60% 要求` : `正确率 ${Math.round(s.correct / s.total * 100)}%`}</p></div>`).join('')}</div>` : ''}
    <div class="section-title review-heading"><h2>逐题解析</h2><div class="segmented">${btn(`全部 ${g.total}`, 'review-filter', `data-filter="all" aria-pressed="${reviewFilter === 'all'}"`, reviewFilter === 'all' ? 'selected' : '')}${btn(`错题 ${g.total - g.correct}`, 'review-filter', `data-filter="wrong" aria-pressed="${reviewFilter === 'wrong'}"`, reviewFilter === 'wrong' ? 'selected' : '')}</div></div><div class="review-list">${rows.length ? rows.map(r => {const q = qmap.get(r.id); const n = result.ids.indexOf(r.id) + 1; return `<article class="panel review-question"><div class="question-badges"><span class="${r.correct ? 'green' : 'red'}">${r.correct ? '正确' : r.answer == null ? '未作答' : '错误'}</span><span>${CHAPTERS[q.chapter].short}</span><span>${esc(q.topic)}</span></div><h3>${n}. ${esc(q.stem)}</h3><div class="review-options">${q.options.map((o, i) => `<p class="${hasAnswer(q.answer,i) ? 'right-answer' : hasAnswer(r.answer,i) ? 'wrong-answer' : ''}"><b>${letter(i)}</b>${esc(o)}${hasAnswer(q.answer,i) ? '<span>正确答案</span>' : hasAnswer(r.answer,i) ? '<span>你的选择</span>' : ''}</p>`).join('')}</div><div class="explanation"><p>${esc(q.explanation)}</p><div class="source">${esc(q.origin)} · 参考依据：${sourceLink(q)}</div></div></article>`;}).join('') : '<div class="empty-state"><h2>这次没有错题</h2><p>可以再做一套随机模拟卷，检验掌握是否稳定。</p></div>'}</div>`;
}

function guideView() {
  if (SUBJECT.isFund) return fundGuide(SUBJECT);
  if (SUBJECT.isAcademy) return academyGuide(SUBJECT);
  return `${heading('RULES & REFERENCES', '考试说明与资料来源', '把正式考试规则、历史样卷和本站练习清楚地区分。')}<section class="panel prose"><span class="soft-badge">模拟范围：上交所个人投资者</span><h2>模拟卷怎么配置？</h2><p>题量、章节配比、计时及合格条件依据上交所 2026 年修订的《证券公司股票期权经纪业务指南》。下表是本站实际执行的配置，不是银河官网练习测试的配置。</p><div class="table-scroll"><table><thead><tr><th>模拟类型</th><th>题量 / 分值</th><th>时间</th><th>章节配比</th><th>合格要求</th></tr></thead><tbody><tr><td>一级</td><td>20 题 × 5 分</td><td>20 分钟</td><td>第一章 12 + 第二章 8</td><td>≥ 70 分</td></tr><tr><td>二级</td><td>10 题 × 10 分</td><td>20 分钟</td><td>第三章 10</td><td>≥ 70 分</td></tr><tr><td>三级</td><td>10 题 × 10 分</td><td>20 分钟</td><td>第四章 10</td><td>≥ 70 分</td></tr><tr><td>综合</td><td>20 题 × 5 分</td><td>30 分钟</td><td>第一章 6 + 第二章 4 + 第三章 5 + 第四章 5</td><td>≥ 70 分且三个部分各 ≥ 60%</td></tr></tbody></table></div><p><strong>综合卷分项：</strong>第一、二章合为第一部分，至少对 6 / 10；第三章、第四章各为一部分，各至少对 3 / 5。总分 70 分但某部分不达标，仍不合格。</p><p><strong>题型：</strong>本站采用公开历史样卷的四选一单项选择题。2026 年指南明确上述配置，但该考试配置条款没有单独重述题型；本站题型依据与配置依据已分别列出。</p><p><strong>范围：</strong>期权科目聚焦沪市个人投资者知识，不配置深交所期权开户考试。其他从业科目可在课程全景切换。正式逐级考试须按顺序通过，本站为学习需要开放全部级别；考试通过也不代表已经取得交易权限。银河证券实际办理以其当次通知及适当性审核为准。</p></section>
    <section class="panel prose"><h2>题库与作答说明</h2><ul><li>当前 ${QUESTIONS.length} 道题，包含 ${QUESTIONS.filter(q=>q.sourceKind!=='sample').length} 道原创训练与 ${QUESTIONS.filter(q=>q.sourceKind==='sample').length} 道公开历史样卷重述。逐题提供解析和参考，来源题与原创题分别标注，不作为当前官方原卷。</li><li>章节题量：${Object.entries(CHAPTERS).map(([ch, c]) => `${c.short} ${QUESTIONS.filter(q => q.chapter === Number(ch)).length} 道`).join('、')}。每套模拟卷内部不重复抽题。</li><li>含 Greeks、组合风险与显式假设的计算变式。题量不等于独立知识点数量，不承诺与正式题库逐题对应。原有题号和答案保持兼容。</li><li>模拟卷交卷前不显示答案。倒计时按截止时间计算，刷新、切换页面或退出浏览器后仍继续；再次打开过期答卷会自动交卷。</li><li>章节练习确认答案后计入记录。提前结束时，只统计已确认的题目；模拟卷未作答的题目按错误计。</li><li>最近答错的题进入错题本；重新答对自动移出。仅查看解析不会移除错题。记录仅存于当前浏览器，清除浏览器数据会丢失。</li><li>计算题以题干假设为准；到期理论损益不等同于实际成交或行权后的标的收益。涉及实时参数的规则，应以交易所与经营机构公告为准。</li></ul></section><section class="panel prose"><h2>资料来源</h2><div class="sources">${Object.values(SOURCES).filter(s=>!s.subject||s.subject===SUBJECT.id).map(s => `<article><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.title}</a><p>${esc(s.note||[s.publisher,s.session,'公开来源题，详见逐题档案'].filter(Boolean).join(' · '))}</p></article>`).join('')}</div><p class="muted">内容核对日期：${CONTENT_DATE} · 题库版本：${BANK_VERSION}</p></section>`;
}

function navigate(next) {
  view = next;
  const hash = next==='course'?courseHash():next==='search'?`#search${searchQuery?'?q='+encodeURIComponent(searchQuery):''}`:next==='practice'?`#practice${practiceQuestion?'?question='+encodeURIComponent(practiceQuestion):''}`:next==='result'?'#history':['resources','coverage','wrong','history','guide','catalog'].includes(next)?`#${next}`:'';
  if (location.hash !== hash) history.pushState(null, '', location.pathname + location.search + hash);
  render(); window.scrollTo({ top: 0, behavior: 'instant' }); document.querySelector('#main')?.focus({ preventScroll: true });
}
const courseCallbacks = { render, navigate, practice: chapter => { practiceChapter = chapter; practiceSource='all'; practiceYear=0;practiceType='all';practiceQuery='';practiceQuestion=null; navigate('practice'); } };
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
  else if(action==='quick-practice'||action==='daily-practice') {
    practiceChapter=Number(target.dataset.chapter)||0;practiceCount=10;practiceSource='all';practiceYear=0;practiceType='all';practiceQuery='';practiceQuestion=null;navigate('practice');
  } else if(action==='clear-location') {practiceQuestion=null;navigate('practice');}
  else if(action==='search-term') {searchQuery=target.dataset.term;searchScope='all';searchLimit=20;navigate('search');}
  else if(action==='search-more') {searchLimit+=20;const top=scrollY;render();scrollTo(0,top);}
  else if(action==='export-records') {
    try {downloadBackup();recordStatus='已导出全部科目的学习记录。';}
    catch {recordStatus='导出失败：本机记录可能损坏或无法访问。';}
    render();
  }
  else if (action === 'resume') navigate('quiz');
  else if (action === 'start-exam') { const profile = target.dataset.profile; startSession(makeSession(makePaper(QUESTIONS, profile), 'exam', profile)); }
  else if (action === 'recall-practice') { practiceChapter=0;practiceSource=target.dataset.source||'recall';practiceYear=Number(target.dataset.year)||0;practiceCount=0;practiceType='all';practiceQuestion=null;practiceQuery='';navigate('practice'); }
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
    const choice=Number(target.dataset.answer);
    if(Array.isArray(qmap.get(id).answer)) {
      const choices=Array.isArray(s.answers[id])?s.answers[id]:[];
      const next=choices.includes(choice)?choices.filter(a=>a!==choice):[...choices,choice].sort();
      if(next.length)s.answers[id]=next;else delete s.answers[id];
    } else s.answers[id]=choice;
    save(); render(); document.querySelector(`#option-${choice}`)?.focus({preventScroll:true});
  } else if (action === 'check' && s?.mode === 'practice') {
    const id = s.ids[s.index];
    if (s.answers[id] == null || s.checked.includes(id)) return;
    s.checked.push(id);
    state.progress = updateProgress(state.progress, [{ id, correct: isCorrect(s.answers[id],qmap.get(id)) }]);
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
async function readBackup(file) {
  if(!file)return;
  try {
    if(file.size>10*1024*1024)throw new Error('文件超过10MB，请选择知权导出的JSON备份。');
    const incoming=validateBackup(JSON.parse(await file.text()));
    const subjectCount=Object.keys(incoming).length,questionCount=Object.values(incoming).reduce((sum,s)=>sum+Object.keys(s.practice.progress).length,0);
    dialog('合并学习记录',`这份备份包含 ${subjectCount} 个科目、${questionCount} 道已练题目。将合并阅读进度与历史记录，同一道题保留作答次数较多的记录，本机正在作答的答卷优先保留。`,()=>{
      try {importBackup(incoming);state=load();refreshCourseProgress();recordStatus='已合并学习记录。';render();tick();}
      catch {recordStatus='无法保存导入记录，请检查浏览器可用空间。';render();}
    },'合并保存');
  } catch(error) {recordStatus=error instanceof SyntaxError?'文件不是有效JSON，请选择导出的学习记录。':error.message;render();}
}
app.addEventListener('submit', e=>{
  const form=e.target;if(!['topbar-search','knowledge-search','practice-search'].includes(form.id))return;
  e.preventDefault();
  const query=String(new FormData(form).get('query')||'').trim().slice(0,100);
  if(form.id==='practice-search'){practiceQuery=query;practiceQuestion=null;render();}
  else {searchQuery=query;searchLimit=20;navigate('search');}
});
app.addEventListener('change', e => {
  if (e.target.id === 'subject-select') {
    const url = new URL(location.href);
    if (e.target.value === 'options') url.searchParams.delete('subject');
    else url.searchParams.set('subject', e.target.value);
    url.hash = ''; location.assign(url); return;
  }
  if(e.target.id==='import-records') {readBackup(e.target.files[0]);return;}
  if (handleCourseChange(e.target, courseCallbacks)) return;
  if(e.target.id==='search-scope'){searchScope=e.target.value;searchLimit=20;render();}
  if(e.target.id==='search-type'){searchType=e.target.value;searchLimit=20;render();}
  if(e.target.id==='practice-type'){practiceType=e.target.value;practiceQuestion=null;render();}
  if (e.target.id === 'practice-count') { practiceCount = Number(e.target.value);render(); }
  if (e.target.id === 'practice-source') { practiceSource=e.target.value;practiceYear=0;practiceQuestion=null;render(); }
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
document.querySelector('.skip').addEventListener('click',e=>{
  e.preventDefault();const main=document.getElementById('main');main?.focus({preventScroll:true});main?.scrollIntoView({block:'start'});
});
window.addEventListener('popstate', () => { view=hashView();render();window.scrollTo(0,0); });
window.addEventListener('hashchange', () => {
  view = hashView(); render(); window.scrollTo(0, 0);
  document.querySelector('#main')?.focus({ preventScroll: true });
});
document.addEventListener('visibilitychange', tick);
render();
tick();
setInterval(tick, 500);
