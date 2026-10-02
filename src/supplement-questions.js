// Calculation drills use explicit hypothetical inputs. Parameter variants are
// labelled separately; they are not additional exam recollections.
export const SUPPLEMENT={options:[],fund1:[],fund2:[],fund3:[],securities1:[],securities2:[],futures1:[],futures2:[]};
const clean=x=>Math.round(x*10000)/10000;
function family(subject,key,chapter,topic,lessonId,source,make){
 for(let i=1;i<=10;i++){
  const {stem,value,unit='',explanation,inputs}=make(i),right=clean(value);
  const step=Math.max(.1,Math.abs(right)*.1),values=[right,clean(right+step),clean(right+2*step),clean(right-step)];
  const offset=i%4,options=values.map(v=>`${v}${unit}`);
  SUPPLEMENT[subject].push({id:`${subject}-drill-${key}-${i}`,chapter,topic,lessonId,source,stem,options:[...options.slice(offset),...options.slice(0,offset)],answer:(4-offset)%4,explanation,sourceKind:'original',origin:'原创计算训练 · 参数变式',type:'single',calculation:{family:key,inputs,expected:right,unit},variantFamily:key});
 }
}
family('options','delta-position',3,'Delta与头寸','delta-gamma','greeks1',i=>{const d=.1+i*.04,n=i+1;return {stem:`题设每张单位10000份，持有${n}张认购多头，Delta=${d.toFixed(2)}。其他条件不变，标的上涨0.02元，采用Delta局部近似，头寸市值约增加多少元？`,value:d*n*10000*.02,unit:'元',inputs:{d,n},explanation:`ΔV≈Delta×标的变动×合约单位×张数＝${d.toFixed(2)}×0.02×10000×${n}。这是局部近似，不包含Gamma等影响。`};});
family('options','gamma-adjust',3,'Gamma与Delta','delta-gamma','greeks1',i=>({stem:`题设初始Delta=0.40，Gamma=0.20/元，标的上涨${(i*.01).toFixed(2)}元。只用Gamma局部近似，新的Delta约为多少？`,value:.4+.2*i*.01,inputs:{move:i*.01},explanation:`新Delta≈0.40＋0.20×${(i*.01).toFixed(2)}；这里不计算期权价格。`}));
family('options','vega-position',3,'波动率敏感度','theta-vega-rho','greeks2',i=>({stem:`题设每张Vega=100元/波动率百分点，持有${i+1}张期权多头。隐含波动率从20%升至22%，只用Vega局部近似，头寸约增加多少元？`,value:200*(i+1),unit:'元',inputs:{n:i+1},explanation:`升幅为2个百分点，头寸变化≈100×2×${i+1}。不能将2个百分点误用为0.02个题设计量单位。`}));
family('options','theta-position',3,'时间敏感度','theta-vega-rho','greeks2',i=>({stem:`题设每张Theta=−20元/日，持有${i+1}张期权多头，经过3日。其余条件不变，采用Theta近似，头寸变化多少元？`,value:-60*(i+1),unit:'元',inputs:{n:i+1},explanation:`变化≈−20×3×${i+1}。本题按日计量，负号代表时间流逝导致模型价值减少。`}));
family('options','rho-position',3,'利率敏感度','theta-vega-rho','greeks2',i=>({stem:`题设认购多头每张Rho=30元/利率百分点，持有${i+1}张。利率上升0.5个百分点，其余条件不变，Rho局部近似变化多少元？`,value:15*(i+1),unit:'元',inputs:{n:i+1},explanation:`变化≈30×0.5×${i+1}。百分点与比例须按题设计量口径转换。`}));
family('options','put-insurance',2,'保险策略','covered-protective','insurance',i=>({stem:`题设每份现货买入价4.00元，保护性认沽行权价3.80元，权利金${(.05+i*.01).toFixed(2)}元，全部持有至到期，忽略费用且完全匹配。组合每份最大到期损失多少元？`,value:4-3.8+.05+i*.01,unit:'元',inputs:{premium:.05+i*.01},explanation:`每份最大到期损失＝现货成本−行权价＋认沽成本＝4−3.8＋${(.05+i*.01).toFixed(2)}。` }));
family('options','covered-upside',2,'备兑上界','covered-protective','covered',i=>({stem:`每份现货成本3.50元，备兑认购行权价3.80元，收到权利金${(.06+i*.01).toFixed(2)}元。完全匹配并持有至到期，忽略费用，每份最大到期利润多少元？`,value:.3+.06+i*.01,unit:'元',inputs:{premium:.06+i*.01},explanation:`最大利润＝行权价−现货成本＋权利金＝3.8−3.5＋${(.06+i*.01).toFixed(2)}；现货下跌风险依然存在。`}));
family('options','credit-spread',4,'卖方价差','risk','spreads',i=>({stem:`题设卖出低行权价认沽并买入更低行权价认沽作为保护，两行权价差0.50元，每份净收权利金${(.05+i*.01).toFixed(2)}元。完全匹配、同到期、忽略费用，每份最大到期损失多少元？`,value:.5-(.05+i*.01),unit:'元',inputs:{credit:.05+i*.01},explanation:`认沽信用价差最大到期损失＝行权价间距−净收到权利金。此上界不等于盘中保证金或交收资金上限。`}));

for(const subject of ['fund1','fund2']){
 const chapter=subject==='fund1'?5:3,lessonId=subject==='fund1'?'fund-nav':'fund-financial-math',source=`outline${subject.at(-1)}`;
 family(subject,'net-assets',chapter,'净资产',lessonId,source,i=>({stem:`题设基金总资产${1000+i*100}万元，负债${50+i*10}万元。未发生其他调整，净资产是多少万元？`,value:950+i*90,unit:'万元',inputs:{assets:1000+i*100,debt:50+i*10},explanation:`净资产＝总资产−负债＝${1000+i*100}−${50+i*10}。净资产总额不同于单位净值。`}));
 family(subject,'fee-rate',5,'题设费用',subject==='fund1'?'fund-nav':'fund-transactions',source,i=>({stem:`题设基金计费净资产${i*100}万元，年费率0.60%，按365天每天计提，基数保持不变。当天费用约为多少万元？（四位小数）`,value:i*100*.006/365,unit:'万元',inputs:{base:i*100},explanation:`题设日费用＝计费基数×0.60%÷365＝${i*100}×0.006÷365，按题设保留四位小数；不代表所有产品的实际费率与计费基数。`}));
 family(subject,'subscription-units',5,'申购份额',subject==='fund1'?'fund-nav':'fund-transactions',source,i=>({stem:`题设申购金额${(i+1)*1010}元，外扣申购费率1%，净值1.25元，无其他费用及中间舍入，确认多少份？`,value:(i+1)*800,unit:'份',inputs:{amount:(i+1)*1010},explanation:`净申购额＝${(i+1)*1010}÷1.01；份额＝净申购额÷1.25，先除去外扣费用再除净值。`}));
 family(subject,'redemption-net',5,'赎回到账',subject==='fund1'?'fund-nav':'fund-transactions',source,i=>({stem:`题设赎回${i*500}份，净值1.20元，赎回费率0.50%，无其他费用，净到账多少元？`,value:i*500*1.2*.995,unit:'元',inputs:{shares:i*500},explanation:`到账＝份额×净值×(1−赎回费率)＝${i*500}×1.2×0.995。实际费用应查产品约定。`}));
 family(subject,'cash-distribution',5,'现金分红',subject==='fund1'?'fund-nav':'fund-transactions',source,i=>({stem:`题设投资者持有${i*1000}份基金，每份分红0.08元，选择现金分红，忽略费用和税，获得多少元现金？`,value:i*80,unit:'元',inputs:{shares:i*1000},explanation:`现金分红＝份额×每份分红＝${i*1000}×0.08。分红不是凭空创造总财富，通常伴随净值调整。`}));
 family(subject,'expense-impact',5,'费率与净资产',subject==='fund1'?'fund-nav':'fund-transactions',source,i=>({stem:`题设基金计提费用前净资产${1000+i*100}万元，确认当期费用2万元，份额1000万份，无其他变化。计提后的每份净值是多少元？`,value:(998+i*100)/1000,unit:'元',inputs:{nav:1000+i*100},explanation:`费用减少净资产，单位净值＝(${1000+i*100}−2)÷1000。不要把万份和份混用。`}));
 family(subject,'reinvest-shares',5,'分红再投资',subject==='fund1'?'fund-nav':'fund-transactions',source,i=>({stem:`题设持有${i*1000}份，每份分红0.05元，以题设再投资净值1.25元转为份额，无费税和中间舍入，新增多少份？`,value:i*40,unit:'份',inputs:{shares:i*1000},explanation:`新增份额＝原份额×每份分红÷再投资净值＝${i*1000}×0.05÷1.25。`}));
 family(subject,'holding-return',subject==='fund1'?5:4,'持有期收益',subject==='fund1'?'fund-nav':'fund-risk-math',source,i=>({stem:`题设一份基金期初净值1.50元，期末净值${(1.5+i*.03).toFixed(2)}元，期间现金分红0.03元且不再投，忽略费税，持有期收益率多少？`,value:(i*.03+.03)/1.5*100,unit:'%',inputs:{change:i*.03},explanation:`收益率＝(期末净值−期初净值＋现金分红)÷期初净值，注意分母使用初始成本。`}));
}
for(const [key,make] of [
 ['postmoney',i=>({stem:`题设投前股权估值${i*500}万元，新投资人出资500万元，无其他股权变动。投后估值多少万元？`,value:(i+1)*500,unit:'万元',inputs:{pre:i*500},explanation:'投后股权价值＝投前股权价值＋新增权益投资；债务融资不应直接按同一方式增加股权价值。'})],
 ['stake',i=>({stem:`题设投前股权估值${i*500}万元，新增股权投资500万元，无其他稀释，新投资人的投后持股比例约多少？（四位小数）`,value:100/(i+1),unit:'%',inputs:{pre:i*500},explanation:`投后持股＝500÷(${i*500}＋500)，分母是投后而非投前估值。`})],
 ['enterprise-bridge',i=>({stem:`题设企业价值${1000+i*100}万元，现金100万元，有息债务300万元，无其他调整，股权价值多少万元？`,value:800+i*100,unit:'万元',inputs:{ev:1000+i*100},explanation:'股权价值＝企业价值＋现金−有息债务。营运资本是否另调应看估值口径和交易约定。'})],
 ['dpi',i=>({stem:`题设实缴资本2000万元，累计已分配${i*300}万元，无剩余分配计入，同口径DPI是多少倍？`,value:i*300/2000,unit:'倍',inputs:{distributed:i*300},explanation:'DPI＝累计分配÷实缴资本，仅反映已实现分配，不包含剩余估值。'})],
 ['rvpi',i=>({stem:`题设实缴2000万元，剩余净资产价值${i*200}万元，未分配估值同口径，RVPI是多少倍？`,value:i/10,unit:'倍',inputs:{residual:i*200},explanation:'RVPI＝剩余净价值÷实缴资本，剩余价值不是已兑现收益。'})],
 ['tvpi',i=>({stem:`题设实缴2000万元，已分配600万元，剩余价值${i*200}万元，同口径TVPI是多少倍？`,value:(600+i*200)/2000,unit:'倍',inputs:{residual:i*200},explanation:'TVPI＝(分配＋剩余价值)÷实缴资本＝DPI＋RVPI。'})],
 ['cash-waterfall',i=>({stem:`题设唯一可分配现金${2000+i*100}万元，先返还LP本金2000万元，剩余利润20%给管理人，不设门槛追赶税费，业绩报酬多少万元？`,value:i*20,unit:'万元',inputs:{profit:i*100},explanation:'按题设先还本金，再将剩余利润乘20%；真实分配须依合同，不能推广成所有基金标准。'})],
 ['cash-call',i=>({stem:`题设LP认缴3000万元，已实缴${i*200}万元，无转让豁免和其他调整，未缴承诺多少万元？`,value:3000-i*200,unit:'万元',inputs:{paid:i*200},explanation:'未缴承诺＝认缴−已实缴；未缴承诺不是基金现有现金。'})],
])family('fund3',key,['dpi','rvpi','tvpi','cash-waterfall'].includes(key)?5:4,'估值与现金流', ['dpi','rvpi','tvpi','cash-waterfall'].includes(key)?'fund-performance':'fund-valuation','outline3',make);

for(const subject of ['securities1','futures1']){
 const future=subject==='futures1',source=future?'futuresLaw':'securitiesOutline',ch=future?7:5;
 family(subject,'discount',ch,'现金流现值',`${subject}-${ch}`,source,i=>({stem:`题设一年后收到${100+i*20}元，年折现率5%，无其他现金流，现值约多少元？（四位小数）`,value:(100+i*20)/1.05,unit:'元',inputs:{cash:100+i*20},explanation:`现值＝未来现金流÷(1＋折现率)＝${100+i*20}÷1.05。`}));
 family(subject,'duration',ch,'久期近似',`${subject}-${ch}`,source,i=>({stem:`题设修正久期${i*.5}年，收益率上升0.2个百分点，只用久期局部近似，债券价格变化率是多少？`,value:-i*.5*.002*100,unit:'%',inputs:{duration:i*.5},explanation:`价格变化率≈−修正久期×收益率变动＝−${i*.5}×0.002。以百分数表示须再乘100。`}));
 family(subject,'nominal-value',future?2:7,'合约单位',`${subject}-${future?2:7}`,source,i=>({stem:`题设期货价格${3000+i*50}元/吨，每手10吨，交易${i+1}手，名义合约价值多少元？`,value:(3000+i*50)*10*(i+1),unit:'元',inputs:{price:3000+i*50,n:i+1},explanation:'名义价值＝价格×合约单位×手数；这不是保证金也不是最大损失。'}));
 family(subject,'margin',future?3:7,'题设保证金',`${subject}-${future?3:7}`,source,i=>({stem:`题设期货名义价值${i*50000}元，保证金率8%，不设其他加收，占用保证金多少元？`,value:i*4000,unit:'元',inputs:{nominal:i*50000},explanation:'保证金＝题设名义价值×8%；实际比例和加收应查机构与品种规则。'}));
 family(subject,'pnl',future?3:7,'期货盈亏',`${subject}-${future?3:7}`,source,i=>({stem:`题设买入${i+1}手期货，单位10吨，价格从4000元/吨降至${4000-i*10}元/吨，忽略费税，平仓损益多少元？`,value:-i*10*10*(i+1),unit:'元',inputs:{drop:i*10,n:i+1},explanation:'买方损益＝(平仓价−开仓价)×单位×手数，本题价格下跌产生负损益。'}));
 family(subject,'basis',future?4:7,'基差',`${subject}-${future?4:7}`,source,i=>({stem:`题设现货${4000+i*10}元/吨，期货4050元/吨，以现货减期货定义基差，基差多少元/吨？`,value:i*10-50,unit:'元/吨',inputs:{spot:4000+i*10},explanation:'按题设基差＝现货−期货，不要混用反向定义。'}));
 family(subject,'index-fair',future?7:7,'持有成本',`${subject}-7`,source,i=>({stem:`题设指数${3000+i*100}点，无风险利率4%、股息率2%、期限0.5年，采用简单持有成本，理论期货价多少点？`,value:(3000+i*100)*1.01,unit:'点',inputs:{spot:3000+i*100},explanation:'F＝S×[1＋(r−q)T]＝S×1.01，本题使用简单持有成本而非连续复利。'}));
 family(subject,'call-profit',future?6:7,'认购损益',`${subject}-${future?6:7}`,source,i=>({stem:`题设认购行权价100元，权利金5元，到期标的价格${100+i*2}元，每份净损益多少元？（忽略费税）`,value:i*2-5,unit:'元',inputs:{spot:100+i*2},explanation:'多头认购到期损益＝max(S−K,0)−权利金；内在价值为正仍可能净亏损。'}));
}
