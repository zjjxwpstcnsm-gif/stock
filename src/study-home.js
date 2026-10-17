import { currentContent } from './content-updates.js';
import { conceptClinic } from './concept-clinic.js';
import { workshopDesk } from './workshop-methods.js';
import { esc } from './academy-views.js';
import { paperSize } from './engine.js';
const button = (text, action, data = '', cls = 'secondary') => `<button class="${cls}" data-action="${action}" ${data}>${text}</button>`;

/** The home is a study desk, not a KPI dashboard. All figures are local, real records. */
export function studyHome(subject, state, reading, resume) {
  const bank = subject.QUESTIONS;
  const records = bank.map(q => state.progress[q.id]).filter(p => p?.attempts > 0);
  const attempted = records.length;
  const attempts = records.reduce((n, p) => n + p.attempts, 0);
  const correct = records.reduce((n, p) => n + p.correct, 0);
  const wrong = bank.filter(q => state.progress[q.id]?.wrong).length;
  const historical = bank.filter(q => ['sample', 'recall'].includes(q.sourceKind)).length;
  const lessons = subject.LESSONS;
  const done = new Set(lessons.filter(l => reading.done.includes(l.id)).map(l => l.id));
  const last = lessons.find(l => l.id === reading.last);
  const allRead = done.size === lessons.length;
  const continuing = last && !done.has(last.id);
  const next = (continuing && last) || lessons.find(l => !done.has(l.id)) || last || lessons[0];
  const readingLabel = allRead ? '回看本章' : continuing && (done.size || next !== lessons[0]) ? '继续阅读' : done.size ? '阅读未读章节' : '开始阅读';
  const readingContext = allRead ? '全部章节已读，可回看巩固。' : continuing && (done.size || next !== lessons[0]) ? '接着上次打开的章节读。' : done.size ? `还有 ${lessons.length - done.size} 章未读，从这里接着读。` : '从概念开始，按章节逐步理解。';
  const remaining = bank.length - attempted;
  const reviewSize = Math.min(10, bank.length);
  const reviewTitle = wrong ? '先把错题，重新理顺。' : remaining ? '接着学，还没练过的知识。' : '回到熟悉的题，再想一遍。';
  const reviewCopy = wrong ? `当前有 ${wrong} 道题待纠正。先练错题，再补未练和已练题。` : attempted ? remaining ? `当前没有待纠正错题，还有 ${remaining} 道题尚未练过。下一组优先从未练题里选。` : '本科题目已全部练过。按章节分散复习，确认理解是否稳定。' : `按章节分散选择 ${reviewSize} 道题，确认答案后看解析。完成后，错题会留在复习工作台。`;
  const profileId = subject.id === 'options' ? 'comprehensive' : 'standard';
  const profile = subject.PROFILES[profileId];
  const rate = attempts ? Math.round(correct / attempts * 100) : null;
  const chapters = Object.entries(subject.CHAPTERS).map(([id, ch]) => {
    const questions = bank.filter(q => q.chapter === Number(id));
    return {id, ch, total: questions.length, done: questions.filter(q => state.progress[q.id]?.attempts > 0).length, wrong: questions.filter(q => state.progress[q.id]?.wrong).length};
  });
  return `<div class="study-home">
    <header class="desk-heading"><div><p class="desk-subject">${esc(subject.family)}<span>/</span>${esc(subject.name)}</p><h1>把每一次选择，变成理解。</h1><p>学懂原理，练习判断。按自己的节奏，往前一步。</p></div>${button('浏览全部科目', 'nav', 'data-view="catalog"', 'text-button')}</header>
    ${resume}
    <div class="desk-focus">
      <section class="practice-invitation" aria-labelledby="invitation-title">
        <div class="invitation-tab"><span class="practice-symbol" aria-hidden="true">↝</span>随机刷题</div>
        <h2 id="invitation-title">现在，<br>专心做好这一题。</h2>
        <p>不必选范围，也不必设题数。<br>从${esc(subject.short)}直接开始，作答后就能看解析。</p>
        ${button(state.active?.drill || state.suspended?.drill ? '继续随机刷题' : '开始随机刷题', 'nav', 'data-view="drill"', 'primary invitation-start')}
        <div class="invitation-foot"><span>随时停下，进度自动保存</span><span>${bank.length} 道本科题目</span></div>
      </section>
      <section class="reading-invitation" aria-labelledby="reading-title">
        <div class="reading-caption"><span>系统教程</span><span>已读 ${done.size} / ${lessons.length} 章</span></div>
        <div class="reading-page"><span class="lesson-number">${allRead ? '回看' : ''}第 ${lessons.indexOf(next) + 1} 章</span><h2 id="reading-title">${esc(next.title)}</h2><p>${esc(next.intro)}</p></div>
        <p class="reading-context">${readingContext}</p>
        <div class="reading-footer"><span>约 ${next.minutes} 分钟</span>${button(readingLabel, 'course-open', `data-lesson="${next.id}"`, 'secondary')}</div>
      </section>
    </div>
    <section class="desk-progress" aria-label="本科目学习概览"><div><strong><span class="attempted-count">${attempted}</span><small> / ${bank.length} 题</small></strong><span>已练题目</span></div><div role="group" aria-label="累计作答 ${attempts} 次，答对 ${correct} 次"><strong>${rate === null ? '—' : rate + '%'}<small>${attempts ? '' : ' 尚未作答'}</small></strong><span>累计正确率</span></div><button data-action="nav" data-view="wrong"><strong>${wrong}<small> 道</small></strong><span>待纠正错题 <span aria-hidden="true">›</span></span></button><button data-action="nav" data-view="history"><strong>${state.history.length}<small> 份</small></strong><span>最近完成记录 <span aria-hidden="true">›</span></span></button></section>
    <p class="desk-progress-note">已练题目按题目去重，不代表掌握度；正确率按作答次数统计。最近记录最多保留 50 份。</p>
    <div class="desk-lower"><section class="desk-chapters"><div class="desk-section-heading"><div><h2>逐章，练扎实。</h2><p>先理解知识之间的联系，再检验每个判断。</p></div>${button('查看全部章节', 'nav', 'data-view="practice"', 'text-button')}</div><div class="desk-chapter-list">${chapters.slice(0, 6).map(({id, ch, total, done, wrong: chapterWrong}) => `<button class="desk-chapter" data-action="quick-practice" data-chapter="${id}"><span class="chapter-index" aria-hidden="true">${String(id).padStart(2, '0')}</span><span class="desk-chapter-name"><strong>${esc(ch.name)}</strong><span>${done ? `已练 ${done} / ${total} 题` : `${total} 道练习题`}${chapterWrong ? ` <span class="desk-chapter-wrong">${chapterWrong} 道待纠正</span>` : ''}</span></span><span class="desk-chapter-progress" aria-hidden="true"><i style="width:${total ? done / total * 100 : 0}%"></i></span><span aria-hidden="true">›</span></button>`).join('')}</div>${chapters.length > 6 ? `<p class="desk-more">本科共 ${chapters.length} 个练习模块，其余章节在专项练习中。</p>` : ''}</section>
    <aside class="desk-tools"><section class="desk-review"><div class="desk-tool-icon" aria-hidden="true">◎</div><h2>${reviewTitle}</h2><p>${reviewCopy}</p><div class="desk-review-actions">${button(`开始复习 · ${reviewSize} 题`, 'start-review', '', 'secondary')}${button('进入复习工作台', 'nav', 'data-view="review"', 'text-button')}</div></section><section class="desk-sources"><h2>每一道来源题，都有出处。</h2><p>本科收录 ${historical} 道${subject.id === 'options' ? '历史样卷' : '回忆真题'}重述。来源题与原创训练分别标注，不冒充官方原卷。</p>${button('查看真题资料', 'nav', 'data-view="resources"', 'text-button')}</section></aside></div>
    ${currentContent(subject)}
    ${conceptClinic(subject)}
    ${workshopDesk(subject)}
    <section class="desk-exam"><div><h2>准备好了，再做一份模拟。</h2><p>${esc(profile.name)}<span>${paperSize(profile)} 题</span><span>${profile.minutes} 分钟</span></p><small>模拟成绩不具有正式考试效力；具体合格要求见考试说明。</small></div>${button(subject.id === 'options' ? '开始综合模拟' : '开始本科模拟', 'start-exam', `data-profile="${profileId}"`, 'primary')}${subject.id === 'options' ? `<div class="desk-exam-levels">${['level1','level2','level3'].map(id => button(`${subject.PROFILES[id].name} · ${paperSize(subject.PROFILES[id])} 题`, 'start-exam', `data-profile="${id}"`, 'text-button')).join('')}</div>` : ''}</section>
    <div class="desk-bottom"><span>学习记录仅保存在当前浏览器。</span>${button('导出学习记录', 'export-records', '', 'text-button')}</div>
  </div>`;
}
