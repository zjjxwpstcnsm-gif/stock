const wrap = (title, body, caption) => `<figure class="fund-diagram"><figcaption><strong>${title}</strong><span>${caption}</span></figcaption>${body}</figure>`;
const card = (name,text) => `<div><strong>${name}</strong><p>${text}</p></div>`;
function calculator(type,label,min,max,value,step) {
 return `<label class="fund-lab-label" for="fund-lab-${type}">${label}<input type="range" id="fund-lab-${type}" data-fund-lab="${type}" min="${min}" max="${max}" step="${step}" value="${value}"></label><div id="fund-lab-output" aria-live="polite">${output(type,value)}</div>`;
}
function output(type,value) {
 const v=Number(value);
 if(type==='nav') return `<div class="fund-lab-result"><span>总资产130万元 − 负债${v}万元</span><strong>${((130-v)/100).toFixed(2)} <small>元 / 份</small></strong><span>总份额100万份 · 负债越多，同等资产下净值越低</span></div>`;
 if(type==='duration') {
  const change=-4*v, x=150+change*20;
  return `<div class="fund-lab-result"><span>修正久期4 · 收益率变化${v.toFixed(2)}个百分点</span><strong>${change>0?'+':''}${change.toFixed(2)}<small>% 价格近似变化</small></strong></div><svg viewBox="0 0 300 55" role="img" aria-label="价格变化为${change.toFixed(2)}%，以零为中心"><line x1="25" y1="25" x2="275" y2="25" stroke="#b7c6dd" stroke-width="4"/><line x1="150" y1="8" x2="150" y2="42" stroke="#64748b"/><line x1="150" y1="25" x2="${x}" y2="25" stroke="#245fe0" stroke-width="8"/><circle cx="${x}" cy="25" r="6" fill="#142f56"/><text x="25" y="52" font-size="12">下跌</text><text x="146" y="53" font-size="12">0</text><text x="252" y="52" font-size="12">上涨</text></svg>`;
 }
 const ratio=v/(800+v)*100;
 return `<div class="fund-lab-result"><span>投前800万元 ＋ 新增资${v}万元 ＝ 投后${800+v}万元</span><strong>${ratio.toFixed(2)}<small>% 新投资者持股</small></strong></div><div class="fund-share-bar" role="img" aria-label="新投资者${ratio.toFixed(2)}%，原股东${(100-ratio).toFixed(2)}%"><span style="width:${ratio}%"></span></div><p>蓝色：新增投资者 · 浅蓝：原股东。纯增资、同股同权、无其他稀释。</p>`;
}
export function fundDiagramView(id) {
 if(id==='fund-roles') return wrap('一笔基金投资，三类主要角色',`<div class="fund-diagram-grid">${card('投资者','持有份额，分享收益并承担风险')}${card('管理人','依约投资，勤勉履行受托职责')}${card('托管人','资产保管、复核与监督等职责')}</div>`,'管理与托管相互制约；专业管理不提供保本保证。');
 if(id==='fund-lifecycle') return wrap('募、投、管、退：持续的受托过程',`<ol class="fund-steps">${['募：适当性、合同、出资安排','投：尽调、估值、决策与交割','管：治理、经营监测与增值服务','退：处置项目、现金回收与分配'].map(x=>`<li>${x}</li>`).join('')}</ol>`,'披露与风险管理贯穿全过程，退出也可能失败。');
 if(id==='fund-waterfall') return wrap('一个明确假设的分配例子',`<div class="fund-diagram-grid">${card('可分配现金 1500万','先返还LP本金1000万')}${card('剩余利润 500万','20%归管理人：100万')}${card('LP合计 1400万','本金1000万＋利润400万')}</div>`,'不含门槛、追赶、税费与其他条款；实际分配依合同。');
 if(id==='fund-nav') return wrap('拖动负债，观察单位净值',calculator('nav','负债（万元）',0,50,10,1),'演示固定资产和份额下的会计关系，不是净值预测。');
 if(id==='fund-duration') return wrap('收益率与债券价格的反向关系',calculator('duration','收益率变化（百分点）',-1,1,.5,.05),'一阶久期近似，未计凸性；仅用于学习方向和尺度。');
 if(id==='fund-ownership') return wrap('增加投入，持股比例怎样变化？',calculator('ownership','增资额（万元）',100,800,200,50),'持股比例＝新增资 ÷ 投后估值。');
 return '';
}
export function handleFundLabInput(target) {
 const type=target.dataset.fundLab;
 if(!type)return false;
 document.querySelector('#fund-lab-output').innerHTML=output(type,target.value);
 return true;
}
