import { esc } from './academy-views.js';
const names = {
 '2026-10-17-coverage-polish':'大纲查漏应用',
 '2026-10-14-expansion':'原创应用题扩充（AI辅助）',
 '2026-10-14-rule-review':'法条应用与时效',
 '2026-10-14-calculation-review':'既有计算题分步复核',
 '2026-10-13-clinic':'概念辨析',
 '2026-10-13-workshop':'情景研判',
 '2026-10-13-precision':'易错精练',
 '2026-10-13':'情景精练',
};
export function editorialBatches(subject) {
 return [...new Set(subject.QUESTIONS.map(q=>q.editorialBatch).filter(Boolean))].sort().reverse().map(id=>({
  id,name:names[id] || (id.startsWith('2026-10-14')?'大纲薄弱点应用':'编辑审校'),
  count:subject.QUESTIONS.filter(q=>q.editorialBatch===id).length,
 }));
}
export function currentContent(subject) {
 const batches=editorialBatches(subject).filter(b=>b.id.slice(0,10)>='2026-10-14'&&!b.id.includes('calculation'));
 if(!batches.length)return '';
 return `<section class="content-update panel" aria-label="本轮内容补强"><div><span class="eyebrow">理解边界，再做判断</span><h2>${subject.isFund?'沿着大纲，检验具体判断。':'把知识，放回具体情境。'}</h2><p>${subject.isFund?'本轮补充条款条件、决策步骤与综合计算；已明确对应的大纲编号可在逐条清单中查看。':'本轮补充交易判断、风险边界与适用条件；法规题注明依据及版本。'}均为原创应用题，答案后可对照四项解析和依据。新增扩充由AI辅助编写并经另一轮AI复核，结合官方来源与计算检查；不属于官方真题或专家认证。</p></div><div class="content-update-actions">${batches.map(b=>`<button class="secondary" data-action="workbench-filter" data-batch="${esc(b.id)}">${esc(b.name)} · ${b.count} 题</button>`).join('')}${subject.isFund?'<button class="text-button" data-action="nav" data-view="coverage">查看逐条对应与待核验范围 →</button>':''}</div></section>`;
}
