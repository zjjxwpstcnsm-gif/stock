import { WORKSHOP_BATCH } from './workshop-questions.js';
import { workshopDesk } from './workshop-methods.js';
import { PRECISION_BATCH } from './precision-questions.js';
import { shuffle } from './engine.js';
import { DIFFICULTIES, CASEBOOK_DATE, POLICY_NOTICES, bankQuality, ruleStatus } from './content-quality.js';
const esc = v => String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const button = (label,action,attributes='',cls='secondary') => `<button class="${cls}" data-action="${action}" ${attributes}>${label}</button>`;

export function matchesLearningFilter(q,state,status='all',difficulty='all',batch='all') {
  const p=state.progress?.[q.id],saved=new Set(state.saved||[]);
  const statusMatches=status==='all'||(status==='unseen'&&!p?.attempts)||(status==='wrong'&&p?.wrong)||(status==='saved'&&saved.has(q.id));
  return Boolean(statusMatches&&(difficulty==='all'||(q.difficulty||'unrated')===difficulty)&&(batch==='all'||q.editorialBatch===batch));
}
export function chapterMetrics(subject,progress={}) {
  return Object.entries(subject.CHAPTERS).map(([id,ch])=>{
    const qs=subject.QUESTIONS.filter(q=>q.chapter===Number(id));
    const records=qs.map(q=>progress[q.id]).filter(p=>p?.attempts>0);
    const attempts=records.reduce((n,p)=>n+p.attempts,0),correct=records.reduce((n,p)=>n+p.correct,0);
    return {id:Number(id),name:ch.short,total:qs.length,attempted:records.length,wrong:records.filter(p=>p.wrong).length,attempts,correct,accuracy:attempts?correct/attempts:null,coverage:qs.length?records.length/qs.length:0};
  });
}
// Wrong answers first, then unseen items, then previously answered items.
// Round-robin chapters within each tier; the actual IDs never repeat.
// We do not infer mastery or forgetting dates from a single correct answer.
export function reviewQueue(subject,state,count=10,random=Math.random) {
  const bank=subject.QUESTIONS,progress=state.progress||{};
  const tiers=[bank.filter(q=>progress[q.id]?.wrong),bank.filter(q=>!progress[q.id]?.attempts),bank.filter(q=>progress[q.id]?.attempts&&!progress[q.id]?.wrong)];
  const out=[],limit=Math.min(bank.length,Number.isFinite(count)?Math.max(0,Math.floor(count)):0),families=new Set();
  for(const tier of tiers) {
    const groups=new Map();
    for(const q of shuffle(tier,random)) {
      if(!groups.has(q.chapter))groups.set(q.chapter,[]);
      groups.get(q.chapter).push(q);
    }
    const deferred=[];
    while(groups.size && out.length<limit) for(const [chapter,qs] of groups) {
      const q=qs.shift();if(!qs.length)groups.delete(chapter);
      if(q.variantFamily&&families.has(q.variantFamily))deferred.push(q);
      else {out.push(q);if(q.variantFamily)families.add(q.variantFamily);}
      if(out.length>=limit)break;
    }
    // Keep the wrong-first promise even when a wrong tier contains variants.
    for(const q of deferred) {if(out.length>=limit)break;out.push(q);}
    if(out.length>=limit)break;
  }
  return out;
}
export function ruleNoticeView(subject) {
  const notices=POLICY_NOTICES.filter(n=>n.subjects.includes(subject.id));
  if(!notices.length)return '';
  return `<section class="panel policy-notices"><div class="section-title"><h2>规则时效提醒</h2><span>核对快照 ${CASEBOOK_DATE}</span></div>${notices.map(n=>`<article><div class="policy-line"><span class="soft-badge">${ruleStatus(n)}</span><span>施行日 ${n.effective}</span></div><h3>${esc(n.title)}</h3><p>${esc(n.detail)}</p><p class="muted">${esc(n.note)}</p><a href="${esc(n.source)}" target="_blank" rel="noopener noreferrer">查看官方依据 ↗</a></article>`).join('')}<p class="muted">这是注明核对日期的规则提示，不是实时法规监控。临近考试或办理业务，请再核对官方通知。</p></section>`;
}
export function qualitySummary(subject) {
  const m=bankQuality(subject.QUESTIONS);
  return `<section class="panel quality-summary"><div class="section-title"><h2>题库质量档案</h2><span>数量不等于独立考点</span></div><div class="quality-counts"><div><strong>${m.casebook}</strong><span>情景精练题</span></div><div><strong>${m.recall}</strong><span>回忆题重述</span></div><div><strong>${m.sample}</strong><span>历史样卷重述</span></div></div><p>情景精练、易错精练与新增研判题均为<strong>原创，不是真题</strong>，逐项解释选项、列明参考定位与题设。${m.labeledVariants} 道已有参数变式使用家族标记，属于 ${m.original} 道原创训练的一部分。</p><details><summary>查看核验范围与内容边界</summary><p>逐项解析 ${m.detailed} 题，其中情景题 ${m.casebook} 题，另含易错精练 ${subject.QUESTIONS.filter(q=>q.editorialBatch===PRECISION_BATCH).length} 题，以及情景研判 ${subject.QUESTIONS.filter(q=>q.editorialBatch===WORKSHOP_BATCH).length} 题。情景题编辑批次：${CASEBOOK_DATE}。本次进行了来源核对、答案与选项一致性检查、计算重新求值及结构测试；未宣称全库经过独立专家审定，也不以题量宣称大纲细目完全覆盖。</p><p>回忆题不是官方试卷；历史样卷不是现行真题。来源题保留年份、页内题号和规则提示。旧内容的核对日期与本批次分开保留。</p></details><div class="quality-actions">${button('练习情景精练 20 题 →','workbench-filter',`data-batch="${CASEBOOK_DATE}"`)}${button('练习易错精练 12 题 →','workbench-filter',`data-batch="${PRECISION_BATCH}"`)}${button('查阅来源题档案','nav','data-view="resources"','text-button')}</div></section>`;
}
export function reviewWorkbench(subject,state,savedLimit=12) {
  const bank=subject.QUESTIONS,metrics=chapterMetrics(subject,state.progress),attempted=metrics.reduce((n,m)=>n+m.attempted,0),wrong=metrics.reduce((n,m)=>n+m.wrong,0);
  const savedSet=new Set(state.saved||[]),saved=bank.filter(q=>savedSet.has(q.id)),remaining=bank.length-attempted;
  const weak=[...metrics].sort((a,b)=>b.wrong-a.wrong||a.coverage-b.coverage||a.id-b.id);
  const renderRows=rows=>rows.map(m=>`<div class="review-chapter-row"><div><strong>${esc(m.name)}</strong><small>练过 ${m.attempted} / ${m.total} 题${m.attempts?` · 累计作答 ${m.attempts} 次`:''}</small></div><div class="chapter-meter"><div class="bar"><span style="width:${m.coverage*100}%"></span></div><small>${m.accuracy===null?'尚未作答':`作答正确率 ${Math.round(m.accuracy*100)}%`}</small></div><span class="${m.wrong?'review-wrong-count':'muted'}">${m.wrong?`${m.wrong} 题待纠正`:'暂无错题'}</span>${button('去练习','workbench-filter',`data-chapter="${m.id}" data-status="${m.wrong?'wrong':m.coverage<1?'unseen':'all'}" aria-label="练习${esc(m.name)}"`,'text-button')}</div>`).join('');
  return `<div class="page-heading"><div><span class="eyebrow">REVIEW WITH INTENTION</span><h1>复习工作台</h1><p>先修正理解，再拓展边界。下一组练什么，由你的作答记录决定。</p></div>${button('学习记录与备份','nav','data-view="history"','secondary')}</div>
  <section class="review-hero"><div><span class="eyebrow">YOUR NEXT SMALL STEP</span><h2>${wrong?'把还不稳的知识，重新理顺。':attempted?'沿着已学的，继续往前。':'从一组题开始，建立自己的学习地图。'}</h2><p>${wrong?`优先重练最近答错的 ${wrong} 道题，再补尚未练过的章节。`:'按章节分散选择，不让一种题型反复占满练习。'}已作答的题不会冒充未练新题。</p><div class="review-hero-actions">${button('开始智能复习 · 10 题 →','start-review','','primary')}${state.active?button('继续未完成答卷','resume','','secondary'):''}</div><small>选题顺序：最近答错 → 未练 → 已练；不预测考试分数。</small></div><div class="review-coverage"><strong>${Math.round(attempted/bank.length*100)}<span>%</span></strong><span>题目练习覆盖率</span><p>${attempted} / ${bank.length} 道，非掌握度</p></div></section>
  <div class="review-actions-grid">${[[wrong,'待纠正','最近一次答错的题','wrong'],[remaining,'尚未练过','从新知识开始补齐','unseen'],[saved.length,'我的收藏','重要的题，随时回来','saved']].map(([n,title,desc,status])=>`<button class="panel review-action-card" data-action="workbench-filter" data-status="${status}"><span>${title}<span aria-hidden="true">↗</span></span><strong>${n}<small> 道</small></strong><p>${desc}</p></button>`).join('')}</div>
  <section class="panel review-chapters"><div class="section-title"><h2>章节诊断</h2><span>错题优先 · 不以一次答对判定掌握</span></div><div class="review-chapter-list">${renderRows(weak.slice(0,6))}</div>${weak.length>6?`<details class="more-chapters"><summary>展开其余 ${weak.length-6} 个章节</summary>${renderRows(weak.slice(6))}</details>`:''}</section>
  <div class="review-bottom-grid"><section class="panel saved-questions"><div class="section-title"><h2>我的收藏</h2><span>${saved.length} 道 · 仅本机</span></div>${saved.length?`<div class="saved-list">${saved.slice(0,savedLimit).map(q=>`<article><div><span class="tiny-label">${esc(subject.CHAPTERS[q.chapter].short)} · ${esc(DIFFICULTIES[q.difficulty||'unrated'])}</span><h3><button data-action="practice-one" data-id="${q.id}" class="saved-question-link">${esc(q.stem)}</button></h3></div>${button('移除','save-question',`data-id="${q.id}" aria-label="移除收藏：${esc(q.topic)}"`,'text-button')}</article>`).join('')}</div>${saved.length>savedLimit?button(`再显示 ${Math.min(12,saved.length-savedLimit)} 道`,'saved-more','','secondary full'):''}`:'<div class="saved-empty"><span aria-hidden="true">☆</span><h3>为值得再想一遍的题，留个位置。</h3><p>答题时点击“收藏此题”，就能在这里找到；与答卷内临时标记分开保存。</p></div>'}</section>${qualitySummary(subject)}</div>${workshopDesk(subject)}${ruleNoticeView(subject)}`;
}
export function optionRationales(q,answer) {
  if(!q.rationales || q.rationales.length!==q.options.length)return '';
  const selected=Array.isArray(answer)?answer:[answer],correct=Array.isArray(q.answer)?q.answer:[q.answer];
  return `<details class="option-rationales"><summary>逐项辨析 · 为什么其他选项不成立？</summary><div>${q.options.map((o,i)=>`<article class="${correct.includes(i)?'rationale-correct':selected.includes(i)?'rationale-selected':''}"><div><b>${'ABCD'[i]}</b><strong>${esc(o)}</strong><span>${correct.includes(i)?'正确项':selected.includes(i)?'你的选择':'干扰项'}</span></div><p>${esc(q.rationales[i])}</p></article>`).join('')}</div></details>`;
}
