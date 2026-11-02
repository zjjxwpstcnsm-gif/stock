const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

const emptyProgress = () => ({ total: 0, done: 0, remaining: 0, wrong: 0, percent: 0 });
const validRecord = record => record && Number.isInteger(record.attempts) && record.attempts > 0
  && Number.isInteger(record.correct) && record.correct >= 0 && record.correct <= record.attempts
  && typeof record.wrong === 'boolean';

/** Read the existing subject records; never count repeat attempts as new questions.
 * Filters affect the practice pool, not the denominator of a chapter's progress.
 */
export function chapterProgress(subject, progress = {}) {
  const all = emptyProgress();
  const chapters = new Map(Object.keys(subject.CHAPTERS).map(id => [Number(id), emptyProgress()]));
  const seen = new Set();
  for (const question of subject.QUESTIONS) {
    if (seen.has(question.id)) continue;
    seen.add(question.id);
    const record = progress?.[question.id];
    const done = validRecord(record) ? 1 : 0;
    for (const summary of [all, chapters.get(question.chapter)].filter(Boolean)) {
      summary.total++;
      summary.done += done;
      summary.wrong += done && record.wrong ? 1 : 0;
    }
  }
  for (const summary of [all, ...chapters.values()]) {
    summary.remaining = summary.total - summary.done;
    // Never round an unfinished chapter up to 100%.
    summary.percent = !summary.total ? 0 : summary.done === summary.total ? 100
      : Math.min(99.9, Math.round(summary.done / summary.total * 1000) / 10);
  }
  return { all, chapters };
}

export function practiceChapters(subject, progress, selectedChapter, filteredQuestions) {
  const { all, chapters } = chapterProgress(subject, progress);
  const chapterCount = chapters.size;
  const rows = [
    { id: 0, name: '全部章节', desc: `覆盖${chapterCount}个知识模块`, summary: all },
    ...Object.entries(subject.CHAPTERS).map(([id, chapter]) => ({
      id: Number(id), name: chapter.name, desc: chapter.desc, summary: chapters.get(Number(id)),
    })),
  ];
  return `<div class="practice-progress-heading"><h3>章节练习进度</h3><span>全部 ${chapterCount} 个模块</span></div>
    <p class="practice-progress-note" id="practice-progress-note">进度按已记录题目去重，不代表掌握度；随机刷题、专项练习与已交模拟共用记录。进度不受筛选影响，「匹配」表示当前可练题量。</p>
    <div class="chapter-picker" tabindex="0" aria-label="可滚动的章节选择" aria-describedby="practice-progress-note">${rows.map(({ id, name, desc, summary }) => {
      const { total, done, remaining, wrong, percent } = summary;
      const status = !total ? '暂无题目' : !done ? '尚未开始' : remaining ? '练习中' : '已练完';
      const complete = total > 0 && remaining === 0;
      return `<button type="button" id="practice-chapter-${id}" class="chapter-option progress-chapter${selectedChapter === id ? ' selected' : ''}${complete ? ' is-complete' : ''}" data-action="pick-chapter" data-chapter="${id}" aria-pressed="${selectedChapter === id}">
        <strong>${escapeHtml(name)}</strong><span class="chapter-description">${escapeHtml(desc)}</span><b class="chapter-matched">匹配 ${filteredQuestions(id).length} 题</b>
        <span class="chapter-progress-meta"><span>已练 ${done} / ${total} 题</span><span class="chapter-progress-state">${status} · ${percent}%</span></span>
        <span class="chapter-progress-track" aria-hidden="true"><i style="width:${total ? done / total * 100 : 0}%"></i></span>
        <span class="chapter-progress-detail"><span>未练 ${remaining} 题</span><span class="${wrong ? 'chapter-progress-wrong' : ''}">待纠正 ${wrong} 题</span></span>
      </button>`;
    }).join('')}</div>`;
}
