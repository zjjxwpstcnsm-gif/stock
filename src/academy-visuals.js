// Small, deterministic teaching models. All rates and units are explicit;
// these are hypothetical illustrations, not prices or trading advice.
export function bondMetrics(yieldRate,couponRate=.03,years=5,face=100) {
  let price=0,weighted=0;
  for(let t=1;t<=years;t++) {
    const cash=face*couponRate+(t===years?face:0),pv=cash/(1+yieldRate)**t;
    price+=pv;weighted+=t*pv;
  }
  return {price,macaulay:weighted/price,modified:weighted/price/(1+yieldRate)};
}
export function hedgeMetrics(spot,basis,entryFuture=4050) {
  const exitFuture=spot-basis,pnl=entryFuture-exitFuture;
  return {spot,basis,exitFuture,pnl,effective:spot+pnl};
}
const parameters={bond:{yield:4},hedge:{spot:4000,basis:-50}};
const round=n=>n.toFixed(2),number=n=>n.toLocaleString('zh-CN',{maximumFractionDigits:2});
function graph(title,minX,maxX,minY,maxY,series,xLabel,yLabel,marker) {
  const x=v=>65+(v-minX)/(maxX-minX)*555,y=v=>230-(v-minY)/(maxY-minY)*190;
  const paths=series.map(s=>`<path d="${Array.from({length:81},(_,i)=>{const a=minX+(maxX-minX)*i/80;return `${i?'L':'M'}${x(a).toFixed(2)},${y(s.value(a)).toFixed(2)}`;}).join(' ')}" fill="none" stroke="${s.color}" stroke-width="3"/>`).join('');
  const point=marker?`<path d="M${x(marker.x)} 230V${y(marker.y)}" fill="none" stroke="#688f7b" stroke-dasharray="4 5"/><circle class="current-model-point" cx="${x(marker.x)}" cy="${y(marker.y)}" r="6" fill="#285f47" stroke="white" stroke-width="2"><title>当前题设：${number(marker.x)}，${number(marker.y)}</title></circle>`:'';
  return `<svg viewBox="0 0 660 290" role="img" aria-label="${title}"><title>${title}</title>${Array.from({length:5},(_,i)=>{const value=minY+(maxY-minY)*i/4;return `<path d="M65 ${y(value)}H620" stroke="#e5eeeb"/><text x="53" y="${y(value)+5}" text-anchor="end">${number(value)}</text>`;}).join('')}<path d="M65 40V230H620" fill="none" stroke="#bdcecc"/>${paths}${point}<text x="65" y="252">${number(minX)}</text><text x="620" y="252" text-anchor="end">${number(maxX)}</text><text x="340" y="277" text-anchor="middle">${xLabel}</text><text x="65" y="23">${yLabel}</text></svg><div class="academy-chart-legend">${series.map(s=>`<span><i style="background:${s.color}"></i>${s.label}</span>`).join('')}${marker?'<span>● 当前题设位置</span>':''}</div>`;
}
function bondOutput() {
 const yieldPercent=parameters.bond.yield,m=bondMetrics(yieldPercent/100);
 return `<div class="academy-lab-stats" aria-live="polite"><div><span>债券理论价格</span><strong>${round(m.price)} 元</strong></div><div><span>麦考利久期</span><strong>${round(m.macaulay)} 年</strong></div><div><span>修正久期</span><strong>${round(m.modified)}</strong></div></div>${graph('收益率与债券价格的反向关系',0,10,65,120,[{label:'五年期、年息3%的题设债券',color:'#367e69',value:v=>bondMetrics(v/100).price}],'到期收益率 / %','价格 / 元',{x:yieldPercent,y:m.price})}<p class="academy-lab-formula">P = Σ [3 / (1 + y)<sup>t</sup>] + 100 / (1 + y)<sup>5</sup>，t = 1…5。当前 y = ${round(yieldPercent)}%。每一笔现金流先折现，再相加。</p><p>收益率上升，未来现金流的折现价值下降。修正久期给出局部敏感度；变化较大时，还需要凸性等信息。</p>`;
}
function hedgeOutput() {
 const p=parameters.hedge,m=hedgeMetrics(p.spot,p.basis);
 return `<div class="academy-lab-stats" aria-live="polite"><div><span>到期现货售价</span><strong>${number(m.spot)}</strong></div><div><span>期货平仓价格</span><strong>${number(m.exitFuture)}</strong></div><div><span>卖方期货损益</span><strong>${m.pnl>0?'+':''}${number(m.pnl)}</strong></div><div><span>套保后有效售价</span><strong>${number(m.effective)}</strong></div></div>${graph('套保抵消价格变动，仍保留基差风险',3200,4800,3100,4900,[{label:'未套保的现货售价',color:'#96a5b5',value:v=>v},{label:'完全匹配的卖出套保售价',color:'#367e69',value:()=>m.effective}],'到期现货价格 / 元每吨','售价 / 元每吨',{x:m.spot,y:m.effective})}<p class="academy-lab-formula">有效售价 = S₁ + (F₀ − F₁) = F₀ + (S₁ − F₁) = 4,050 + ${m.basis<0?'('+m.basis+')':m.basis} = ${number(m.effective)} 元/吨。</p><p>改变现货价格，观察相反的期货损益；再改变基差，观察套保售价移动。完全匹配、忽略费税和滑点的题设下，价格风险转化为基差风险。</p>`;
}
const control=(id,label,value,min,max,step,unit)=>`<label for="${id}">${label}<output id="${id}-value">${number(value)}${unit}</output><input id="${id}" type="range" value="${value}" min="${min}" max="${max}" step="${step}" data-academy-lab><span>${min}${unit} — ${max}${unit}</span></label>`;
export function academyVisual(lessonId) {
 if(lessonId==='securities1-5')return `<section class="academy-lab" data-model="bond"><span class="eyebrow">EXPLORE THE RELATIONSHIP</span><h3>拖动收益率，把折现看清楚。</h3><p>面值100元，票息3%，剩余5年，每年年末付息、到期还本，忽略违约、税费与流动性溢价。</p><div class="academy-lab-controls">${control('bond-yield','题设到期收益率',parameters.bond.yield,0,10,.1,'%')}</div><div id="academy-lab-output">${bondOutput()}</div></section>`;
 if(lessonId==='futures1-4')return `<section class="academy-lab" data-model="hedge"><span class="eyebrow">EXPLORE THE RELATIONSHIP</span><h3>价格变化被抵消，基差风险仍在。</h3><p>生产者已按4,050元/吨卖出期货，为同数量、同品种现货做卖出套保。结果单位均为元/吨；本例忽略费用、税与执行偏差。</p><div class="academy-lab-controls">${control('hedge-spot','到期现货价格',parameters.hedge.spot,3200,4800,10,'元/吨')}${control('hedge-basis','到期基差（现货 − 期货）',parameters.hedge.basis,-100,100,5,'元/吨')}</div><div id="academy-lab-output">${hedgeOutput()}</div></section>`;
 return '';
}
export function handleAcademyInput(target) {
 if(!target.matches('[data-academy-lab]'))return false;
 const [model,key]=target.id.split('-');
 const value=Number(target.value),min=Number(target.min),max=Number(target.max);
 if(!parameters[model]||!Number.isFinite(value)||value<min||value>max)return false;
 parameters[model][key]=value;
 document.getElementById(`${target.id}-value`).textContent=number(value)+(model==='bond'?'%':'元/吨');
 document.getElementById('academy-lab-output').innerHTML=model==='bond'?bondOutput():hedgeOutput();
 return true;
}
