import { FUND_SOURCES } from './fund-config.js';
import { FUND_UNITS, outlineCoverage } from './fund-curriculum.js';

const esc = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));
const STATUS_LABELS = {
  all: '全部要求',
  mapped: '有直接对应题',
  gaps: '尚待逐条核验',
  unseen: '对应题尚未全部练过',
  wrong: '对应题最近答错',
};
const uniqueQuestions = questions => [...new Map((questions || []).map(question => [question.id, question])).values()];
const attempted = record => Number.isFinite(record?.attempts) && record.attempts > 0;

/**
 * Exact editorial mappings are the only evidence of objective-level coverage.
 * A shared section, chapter, lesson, or topic is never promoted to a mapping.
 * Progress is read-only and reports attempts, not competency or exam readiness.
 */
export function coverageIndex(subject, progress = {}) {
  if (!FUND_UNITS[subject?.id]) return [];
  const questions = uniqueQuestions(subject.QUESTIONS);
  return outlineCoverage(subject.id).map(objective => {
    const chapter = Number(objective.code.split('.')[0]);
    const scope = objective.code.slice(0, objective.code.lastIndexOf('.'));
    const directQuestions = questions.filter(question => Array.isArray(question.outlineCodes) && question.outlineCodes.includes(objective.code));
    const directIds = new Set(directQuestions.map(question => question.id));
    const sectionQuestions = questions.filter(question => question.scope === scope && !directIds.has(question.id));
    const checkedQuestions = directQuestions.filter(question => attempted(progress?.[question.id]));
    const wrongQuestions = checkedQuestions.filter(question => progress[question.id].wrong === true);
    return {
      ...objective,
      chapter,
      scope,
      chapterTitle: FUND_UNITS[subject.id][chapter - 1].title,
      practiceChapter: chapter + 5,
      directQuestions,
      sectionQuestions,
      checkedQuestions,
      wrongQuestions,
      hasDirect: directQuestions.length > 0,
    };
  });
}

export function coverageSummary(rows) {
  const mapped = rows.filter(row => row.hasDirect).length;
  return {
    total: rows.length,
    mapped,
    gaps: rows.length - mapped,
    questions: new Set(rows.flatMap(row => row.directQuestions.map(question => question.id))).size,
    checked: new Set(rows.flatMap(row => row.checkedQuestions.map(question => question.id))).size,
    wrong: new Set(rows.flatMap(row => row.wrongQuestions.map(question => question.id))).size,
  };
}

export function filterCoverage(rows, { chapter = 0, status = 'all', query = '' } = {}) {
  const terms = String(query).trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return rows.filter(row => {
    if (Number(chapter) && row.chapter !== Number(chapter)) return false;
    if (status === 'mapped' && !row.hasDirect) return false;
    if (status === 'gaps' && row.hasDirect) return false;
    if (status === 'unseen' && (!row.hasDirect || row.checkedQuestions.length === row.directQuestions.length)) return false;
    if (status === 'wrong' && !row.wrongQuestions.length) return false;
    const searchable = [row.code, row.text, row.section, row.chapterTitle, ...row.directQuestions.flatMap(question => [question.topic, question.stem])].join(' ').toLocaleLowerCase();
    return terms.every(term => {
      // A complete identifier must not match a suffix (4.1.b is not 14.1.b).
      if (/^\d+\.\d+\.[a-z]+$/.test(term)) return row.code.toLowerCase() === term;
      if (/^\d+\.\d+$/.test(term)) return row.scope === term;
      return searchable.includes(term);
    });
  });
}

/** Returns only known, exact-mapped IDs, suitable for the existing session engine. */
export function questionIdsForObjective(subject, code) {
  return coverageIndex(subject).find(row => row.code === code)?.directQuestions.map(question => question.id) || [];
}

function questionPreview(question, progress) {
  const record = progress?.[question.id];
  const status = attempted(record) ? record.wrong ? '最近答错' : '最近答对' : '尚未作答';
  return `<li class="coverage-question-preview">
    <div><span>${esc(question.origin || '训练题')}</span><span>${status}</span></div>
    <p>${esc(question.stem)}</p>
    <button type="button" class="text-button" data-action="practice-one" data-id="${esc(question.id)}">单独练这题<span class="sr-only">：${esc(question.topic || question.id)}</span></button>
  </li>`;
}

function objectiveCard(subject, row, progress) {
  const direct = row.directQuestions.length;
  const source = FUND_SOURCES[`outline${subject.number || subject.id.slice(-1)}`];
  return `<article class="coverage-objective ${direct ? 'has-mapping' : 'needs-mapping'}" data-outline-code="${esc(row.code)}">
    <div class="coverage-objective-top">
      <span class="coverage-code">${esc(row.code)}</span>
      <span class="coverage-badge ${direct ? 'is-mapped' : 'is-gap'}">${direct ? `直接对应 ${direct} 题` : '暂无已核验对应题'}</span>
    </div>
    <h3>${esc(row.text)}</h3>
    <p class="coverage-section">${esc(row.section)}<span>同节另有 ${row.sectionQuestions.length} 题，仅作拓展</span></p>
    ${direct ? `<p class="coverage-attempts">对应题已作答 ${row.checkedQuestions.length} / ${direct}${row.wrongQuestions.length ? ` · <span>最近答错 ${row.wrongQuestions.length} 题</span>` : ''}</p>` : '<p class="coverage-gap-note">尚待逐题核验对应关系，旧题可能已涉及。先读本节并对照教材、原文自查。</p>'}
    <div class="coverage-objective-actions">
      ${direct ? `<button type="button" class="secondary" data-action="coverage-practice" data-code="${esc(row.code)}">练本条 ${direct} 题</button>` : ''}
      <a href="?subject=${esc(subject.id)}#course/${esc(row.lessonId)}" data-action="course-open" data-lesson="${esc(row.lessonId)}" data-scope="${esc(row.scope)}">读本节</a>
      <a href="${esc(source.url)}#page=${row.page}" target="_blank" rel="noopener noreferrer">原文 p.${row.page}<span class="sr-only">（新窗口）</span></a>
    </div>
    ${direct ? `<details class="coverage-matches"><summary>查看对应题目（${direct}）</summary><p class="coverage-preview-note">先看题干，开始作答后再核对答案与解析。</p><ol>${row.directQuestions.map(question => questionPreview(question, progress)).join('')}</ol></details>` : ''}
  </article>`;
}

/**
 * Drop-in coverage page. The parent owns filter state and existing session logic.
 * New hooks: #coverage-search, #coverage-query, #coverage-status,
 * data-action="coverage-reset", and data-action="coverage-practice" + data-code.
 * The existing #coverage-chapter, course-open and practice-one hooks are retained.
 */
export function fundCoverage(subject, chapter = 0, { query = '', status = 'all', progress = {} } = {}) {
  const units = FUND_UNITS[subject?.id];
  if (!units) return '';
  chapter = Number.isInteger(Number(chapter)) && Number(chapter) >= 0 && Number(chapter) <= units.length ? Number(chapter) : 0;
  query = String(query).trim().slice(0, 100);
  status = Object.hasOwn(STATUS_LABELS, status) ? status : 'all';
  const all = coverageIndex(subject, progress);
  const summary = coverageSummary(all);
  const filtered = filterCoverage(all, { chapter, query, status });
  const isFiltered = Boolean(chapter || query || status !== 'all');
  return `<div class="coverage-explorer">
    <div class="page-heading"><div><span class="eyebrow">SYLLABUS · QUESTION COVERAGE</span><h1>2026 大纲查漏清单</h1><p>${esc(subject.short)} · ${units.length} 章、${summary.total} 条官方考试要求</p></div></div>
    <section class="panel coverage-explainer" aria-labelledby="coverage-explainer-title">
      <h2 id="coverage-explainer-title">题目对应到哪里，哪些还待核验？</h2>
      <p>只有标注到完整大纲编号的题目，才计作“直接对应”。同章节、同小节的基础练习另列，不当作每条要求都已出题。</p>
      <p>旧题可能已涉及这些要求，但尚未逐题建立可核验映射。“尚待核验”不等于没有相关题目。</p>
      <p class="coverage-boundary">对应关系由本站编辑整理，并非官方认证。有对应题也不表示全部细目已测；作答记录不能等同于掌握率。教材细表、法规数字、期限与例外仍需核对原文。</p>
      <dl class="coverage-summary" aria-label="本科题库覆盖概况">
        <div><dt>有直接对应题的要求</dt><dd>${summary.mapped}<small> / ${summary.total} 条</small></dd></div>
        <div><dt>尚待逐条核验</dt><dd>${summary.gaps}<small> 条</small></dd></div>
        <div><dt>直接对应题已作答</dt><dd>${summary.checked}<small> / ${summary.questions} 题</small></dd></div>
        <div><dt>对应题最近答错</dt><dd>${summary.wrong}<small> 题</small></dd></div>
      </dl>
      <p class="coverage-count-note">本科概况不随筛选变化。一题可对应多条要求；上方题数按题号去重，条目内分别展示。</p>
    </section>
    <section class="panel coverage-controls" aria-label="筛选大纲要求">
      <form id="coverage-search" class="coverage-search">
        <label for="coverage-query">搜大纲、考点或题干</label>
        <div><input type="search" id="coverage-query" name="query" value="${esc(query)}" placeholder="例如：1.1.a、适当性、净值" maxlength="100"><button type="submit" class="secondary">查找</button></div>
      </form>
      <div class="coverage-selects">
        <label for="coverage-chapter">官方章节<select id="coverage-chapter"><option value="0">全部 ${units.length} 章</option>${units.map((unit, index) => `<option value="${index + 1}" ${chapter === index + 1 ? 'selected' : ''}>${index + 1}. ${esc(unit.title)}</option>`).join('')}</select></label>
        <label for="coverage-status">题目覆盖与作答<select id="coverage-status">${Object.entries(STATUS_LABELS).map(([value, label]) => `<option value="${value}" ${status === value ? 'selected' : ''}>${label}</option>`).join('')}</select></label>
      </div>
      <div class="coverage-filter-result"><p id="coverage-results" role="status" aria-live="polite">显示 ${filtered.length} / ${summary.total} 条要求${query ? ` · 关键词“${esc(query)}”` : ''}</p><button type="button" class="text-button" data-action="coverage-reset" ${isFiltered ? '' : 'disabled'}>重置筛选</button></div>
    </section>
    <div class="coverage-list">${units.map((unit, index) => {
      const number = index + 1;
      const rows = filtered.filter(row => row.chapter === number);
      if (!rows.length) return '';
      const mapped = rows.filter(row => row.hasDirect).length;
      return `<details class="panel coverage-chapter" ${isFiltered ? 'open' : ''}>
        <summary>第 ${number} 章 · ${esc(unit.title)}<span>当前 ${rows.length} 条要求 · ${mapped} 条有直接对应题 · ${rows.length - mapped} 条尚待逐条核验</span></summary>
        <div class="coverage-objectives">${rows.map(row => objectiveCard(subject, row, progress)).join('')}</div>
        <div class="coverage-chapter-practice"><p>也可练习本章综合题；章节关联不代表逐条测到了上述要求。</p><button type="button" class="text-button" data-action="quick-practice" data-chapter="${number + 5}">本章综合练习</button></div>
      </details>`;
    }).join('') || '<section class="panel coverage-empty"><h2>没有符合条件的大纲要求</h2><p>试试缩短关键词，或重置章节与作答筛选。</p><button type="button" class="secondary" data-action="coverage-reset">显示全部要求</button></section>'}</div>
  </div>`;
}
