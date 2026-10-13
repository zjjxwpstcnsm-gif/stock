const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function drillIntroduction() {
  return `<section class="drill-intro"><div><span class="eyebrow">A LITTLE PRACTICE, EVERY DAY</span><h2>随机遇见考点，<br>当场理解答案。</h2><p>从当前科目抽一组题，或开启无限续刷。<br>先作答，再看解析，按自己的节奏进入下一题。</p></div><div class="drill-steps" aria-label="刷题流程"><span><b>01</b>选择范围</span><span><b>02</b>点选即答</span><span><b>03</b>读懂解析</span></div></section>`;
}
export function drillSettings(count, endless, instant, size, chapter) {
  return `<aside class="panel practice-settings drill-settings"><span class="eyebrow">YOUR PRACTICE SESSION</span><h2>${esc(chapter)}</h2><div class="drill-mode" role="group" aria-label="刷题模式"><button data-action="drill-mode" data-endless="false" aria-pressed="${!endless}" class="${!endless?'selected':''}"><strong>随机 X 题</strong><span>一组一小步</span></button><button data-action="drill-mode" data-endless="true" aria-pressed="${endless}" class="${endless?'selected':''}"><strong>∞ 无限续刷</strong><span>随时暂停</span></button></div><label for="drill-count">${endless?'每组题数（自动分组保存）':'本组题数'}</label><div class="drill-count-row"><input id="drill-count" type="number" inputmode="numeric" min="1" max="200" step="1" value="${count}" aria-describedby="drill-count-help"><span>题 / 组</span></div><div class="drill-presets" role="group" aria-label="快捷题数">${[5,10,20,50].map(n=>`<button data-action="drill-count" data-count="${n}" aria-pressed="${count===n}" class="${count===n?'selected':''}">${n} 题</button>`).join('')}</div><p id="drill-count-help" class="muted">可输入 1–200。题池不足时只抽实际可用题。</p><label class="drill-instant" for="drill-instant"><input id="drill-instant" type="checkbox" ${instant?'checked':''}><span><strong>点选后立即显示答案</strong><small>单选 / 判断即答；多选仍需提交</small></span></label><button data-action="start-drill" class="primary full" ${size?'':'disabled'}>${endless?'开始无限刷题':'开始随机刷题'} <span aria-hidden="true">→</span></button><p class="practice-match" role="status">${size?`匹配 ${size} 道题 · 首组 ${Math.min(count,size)} 题`:'没有匹配题，请重置或调整筛选。'}</p><div class="drill-honesty"><strong>随机，不等于无限新题</strong><p>一轮内不重复；题池用尽后重新洗牌。无限模式可持续续刷，不在线生成未经核验的题目。开始后固定本次题池，错题状态变化不会中途移除题目。</p></div></aside>`;
}
export function drillStatus(session, correct) {
  const d = session.drill;
  if (!d) return '';
  const answered = d.answered + session.checked.length;
  const right = d.correct + correct;
  return `<section class="drill-status" aria-label="本轮刷题统计"><div><span>${d.endless?'∞ 无限续刷':'随机刷题'} · 第 ${d.cycle} 轮</span><strong>第 ${d.batches+1} 组 <small>· 题池 ${d.pool.length} 题</small></strong></div><div><span>累计已答</span><strong>${answered}<small> 题</small></strong></div><div><span>累计正确率</span><strong>${answered?Math.round(right/answered*100)+'%':'—'}</strong></div><div><span>本组已确认</span><strong>${session.checked.length}<small> / ${session.ids.length}</small></strong></div></section>`;
}
export function drillNextButton(session, revealed, multi = false) {
  if (!session.drill) return '';
  if (!revealed) return `<button class="primary" data-action="check" ${session.answers[session.ids[session.index]]==null?'disabled':''}>${multi?'提交多选答案':session.drill.instant?'选择一个答案':'确认答案'}</button>`;
  const missing = session.ids.some(id=>!session.checked.includes(id));
  const label = session.index < session.ids.length-1 ? '下一题' : missing ? '返回未答题' : session.drill.endless ? '下一组 · 继续刷题' : '完成本组';
  return `<button class="primary" data-action="drill-next">${label} <span aria-hidden="true">→</span></button>`;
}
