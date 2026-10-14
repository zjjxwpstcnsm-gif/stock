# 衍生品原创应用题扩充审校记录

审校日期：2026-10-14。编写文件：`src/expansion-derivatives.js`。

## 范围与状态

目前共442题（options145、futures1297），150条计算元数据。全部442题已完成另一轮内容、来源与数值复核；options0124–0145共22题接受时，旧420题对象逐项比对完全未变。其后options0047一项弱干扰按复核要求单独修订并已重新接受，累计442题保持不变。69题选项质量回修及后来旧题实质替换均只计原题，不增加数量。题目为AI辅助逐题原创情景、四个选项和四项理由；加载器只设置元数据及旋转答案位置，不生成参数或措辞变体。另一轮AI内容复核结合一手来源与独立计算核验，不代表人类专家审定，也不宣称覆盖全部大纲。新增22题原reviewNote已明确AI辅助；全模块统一归属说明迁移现已完成，并经另一轮独立验证仅reviewNote变化。当前逐题哈希以接受清单为准，文内历史检查点的组哈希表示其当时对象，旧新关系见归属迁移证据。

旧库期权已大量覆盖基础损益、Greeks、普通备兑/保险、保证金和单腿平仓。本批优先补足订单与成交状态、合同识别、估值约束、隐波曲面、现金时点、企业经营敞口和风险治理。独立审查指出的一般概念重述必须改为新的决策问题，不能以增加人名、数值或背景计作新任务。

题内费用、报价、单位、期限、合同安排均为教学假设；涉及境外或特殊结算时明确写入题干。不从OIC或CME材料推导中国交易所准入、期限、费率或交割参数。正文来源是一般原理的交叉核验，不是复制其题目或例题。自编现金流/订单案例使用editorial来源，避免将自设参数冒充官方规则。

## 实际读取的第一方来源

以下网页均于2026-10-14通过网页工具实际打开并取得正文，只有注明例外的访问未取得正文。不会把可访问目录等同于附件规则已核实。

- OIC / OCC：Delta，https://www.optionseducation.org/advancedconcepts/delta 。核对多空符号和局部估计；不用Delta直接断言真实获利概率。
- OIC / OCC：Gamma，https://www.optionseducation.org/advancedconcepts/gamma 。核对Delta变化、现货零Gamma和同条件下近到期平值敏感性；不声称局部二阶近似对大幅变动精确。
- OIC / OCC：Theta，https://www.optionseducation.org/advancedconcepts/theta 。实际取得正文第78–92行，包括非线性和不同时间处理惯例；自然日/交易日口径由题干明示。
- OIC / OCC：Vega，https://www.optionseducation.org/advancedconcepts/vega 。实际取得第77–84行；核对隐波输入、单位和敏感度。分期限/分行权价的冲击情景为原创延伸，不是网页原题。
- OIC / OCC：Put/Call Parity，https://www.optionseducation.org/advancedconcepts/put-call-parity 。核对同标的/执行价/到期匹配、现金资产、利率及分红、套利的交易成本和借贷限制。
- CME：Mark-to-Market，https://www.cmegroup.com/education/courses/introduction-to-futures/mark-to-market 。核对每日结算基准和账户资金约束；不采用其中境外合约的历史结算时点作为现行中国规则。
- CME：Learn about Basis: Grains，https://www.cmegroup.com/education/courses/introduction-to-grains-and-oilseeds/learn-about-basis-grains 。核对现货减期货定义及运输、品质、地区供需影响。数值题是独立现金流，不复用网页例题。
- CME：Understanding Futures Expiration & Contract Roll，https://www.cmegroup.com/education/courses/introduction-to-futures/understanding-futures-expiration-contract-roll 。取得第27–47行，核对平仓、移仓和到期处置。首次通知日的具体安排由题设指定，不声称这篇文章规定所有品种相同日期。
- CME：Understanding FX Quote Conventions，https://www.cmegroup.com/education/courses/introduction-to-fx/understanding-fx-quote-conventions 。核对基准币、报价币及期现报价可能不同。这里只作为币种口径交叉核查，题内币种和数字为原创。
- CME：Open Interest，https://www.cmegroup.com/education/courses/introduction-to-futures/open-interest 。核对成交量为流量、未平仓为存量的区别。题内明确单边统计，开平组合按买卖双方现金/持仓恒等式独立推导，不照搬网页简化人物例子。

- CME：Calculating the Dollar Value of a Basis Point，https://www.cmegroup.com/trading/interest-rates/files/Calculating_the_Dollar_Value_of_a_Basis_Point.pdf 。实际取得两页正文。第1页说明DV01为局部敏感度且随利率改变；第2页Method #2给出市值×修正久期×0.0001，以及期货DV01从CTD及转换因子映射。旧样例年份不当作当前合约参数。
- CME：Treasury Analytics User Guide，https://www.cmegroup.com/tools-information/quikstrike/quikstrike-treasury-analytics-user-guide.html 。实际取得Vocabulary中CTD、Yield、DV01及Conversion Factor；本批只用所列定义和题设交割公式，不采用页面中任何未交叉核验的相对回购排序表述。
- BIS / BCBS：CRE52，https://www.bis.org/committees/bcbs/basel-framework/standard/cre/52/inforce/2023-01-01/published/2020-03-27 。取得并定位52.3–52.12：当前重置成本、抵押折扣、合法净额及非负下界。采用2023生效历史版本支持稳定概念，不将其称为中国企业规则或最新资本参数。
- BIS / BCBS：SRP32，https://www.bis.org/committees/bcbs/basel-framework/standard/srp/32/inforce/2023-01-01/published/2020-03-27 。取得并定位32.3抵押残余风险、32.20当前与未来敞口、32.21压力检验、32.23独立审查及32.24(1)不利相关风险。2026汇编搜索结果明确为征求意见稿，未将该草案作为现行规则依据。

## 首轮独立审查后的实质修订

被指出重复的题号保留，但改变决策任务：options0008改为已指派义务与可交易持仓的状态对账；0010改为负净支付组合限价；0011改为行权资产重复确认；0014改为整笔订单执行缺口；0018改为非对称借贷的可执行套利区间；0027改为双侧扰动提取Delta；0043改为预算与最大损失双约束；0046改为借出证券T+2召回与认购T+1交付错配；0048改为调整合约整数匹配；0052改为主观情景期望值；0055合并峰值与尾部比较、0056改不等距结构；0060改为压力网格漏检；0063改为互斥联合情景汇总；0067改为不可预支收款的具体过桥资金时序。0041补足锁定证券的合法转换流程，0017费用明确每张，0023债券终值明确10元，0030补足隐波及其他条件相同。

futures0006改为方差下降与均值的区别；0015改为临时结算价更正的增量对账；0017改为剔除外部入金识别真实损益；0020改为未承诺授信可得性；0046改为负Beta目标越权；0056改为内部转库的总量重复统计。0050明示DV01符号，0065明示银行为抵押接收方和风险衡量主体。新补的CME/BIS来源有逐题引用定位。以上修订不增加任何题目计数。

## 访问限制与未采纳依据

- 上交所现行有效目录页 https://www.sse.com.cn/lawandrules/sselawsrules2025/option/c/c_20250610_10781448.shtml 可访问，显示2015年发布文件及DOCX链接；本次未读取DOCX全文。因此不以此目录页给新题具体规则、时间或参数背书。
- OIC `/strategies/all-strategies/bull-call-spread` 抓取不可用，`/strategies/all-strategies/protective-put` 返回404。未将这两个页面标记为已核验来源；策略计算由题干逐腿现金流独立推导。
- CME `/education/courses/introduction-to-treasuries/the-basics-of-treasury-futures.html` 和 `/education/courses/introduction-to-futures/understanding-futures-contract-specifications.html` 抓取不可用。国债、单位、交割算式仅采用题设明确的教学模型，不声称从这两个页面读到了业务规则。

## 数值复核与加载检查

每道数值题的`expansionCalculation`保留纯算术表达式、独立指定结果和单位。核验过程分别检查：报价单位→每份/每张/总额；时点→增量或累计现金流；方向→多空符号；成本→收入与净损益；合约→到期、执行价、单位匹配。脚本重新运算所有表达式并以绝对误差1e-8比较，不将计算程序生成的参数变式当新增题。

当前首批40个数值检查均通过；另用不读取题内表达式的独立现金流重构复核40个答案，并核对长蝶式外侧结果和保险方案的全部约束。例：市价穿透盘口为2×0.12×10000+3×0.14×10000=6600；临时结算价更正仅补记(104−105)×50×10=−500元；保证金提高后可用资金变动=(12+1−11)−(12−8)=−2万元；最小整数预算floor(2500/(800+20))=3张。修订后数字清单以下方逐题元数据为准。

所有题均有4个选项、4项独立理由、唯一正确索引、有效科目章节/课ID、来源、定位、原创标记及日期。答案位置只随题序轮转，不改选项与理由配对。没有修改旧题、共享测试、集成文件或执行提交推送。

## 逐题学习任务索引

下表由当前AI辅助原创题目元数据列出，便于审查语义重叠；每行是一个已编写问题，不等同于互不重叠的官方能力点。是否作为新的独立决策任务接受，以独立审查为准。


## 第二批实际读取来源与范围

- CFA Institute 2026 Pricing and Valuation of Options：https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/pricing-valuation-options 。取得公开Introduction、Summary；支持欧式无套利边界及复制。American/European权利包含关系由题设合同权利集合独立论证，不声称该欧式阅读规定美国业务操作。
- CFA Institute 2026 Valuing a Derivative Using a One-Period Binomial Model：https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/valuing-derivative-one-period-binomial-model 。取得正文第232–253行，核对复制组合、风险中性与实际概率区分。二期再平衡问题的现金流为题设独立推导。
- CFA Institute 2026 Pricing and Valuation of Forward Commitments：https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/pricing-and-valuation-of-forward-commitments 。取得公开Introduction、Summary，区分定价/估值、FRA与互换复制。以上三个页面的会员完整课程未读取，未声称看过其官方习题。
- CME What is Contango and Backwardation：https://www.cmegroup.com/education/courses/introduction-to-precious-metals/what-is-contango-and-backwardation 。取得第27–34行，核验资金、仓储及保持生产的库存便利价值。题内不假定任何曲线必然稳定或代表确定未来现货。
- BIS 2026 Uncovering FX settlement risk：https://www.bis.org/publications/qr-202606/uncovering-fx-settlement-risk-new-measures-2025-bis-triennial-survey 。取得第544–560行，核验本金风险、PvP与CCP的不同、重置及流动性风险、价值日匹配净额。未使用统计金额构造参数变式。

第二批强调无套利输入诊断、合约价值与交割价区分、有限风险对冲工具的可解性、进口商品双币种暴露、CTD实际交割成本、互换现金流时点，以及外汇交收和抵押安排的具体决策。不是高级或境外规则考试大纲全覆盖承诺。

第二批审查实质修订：期权0097改为动态对冲频率与成本权衡，0098改为固定隐波偏导与联合扰动斜率；期货0095改为反向回归不能直接倒置，0107改贷款零地板与互换负浮息错配，0112改计息惯例错配，0124改EE与PFE额度用途，0140改异步收盘的时间对齐，0164改仓单注销及部分解除质押后的状态数量，0168改逐批验收不能用合并均值替代。0077/0081修正干扰项与损益措辞。修订均不增加计数。

当前69条数值元数据通过重新运算；已接受239题的独立数值回归由审查方另维护。新增仓单可用量以货权台账独立重构：未注销80吨=自由30吨+原质押50吨；释放15吨后自由45吨。

## 第三小批来源及核验

2026-10-14实际取得CME Moving Averages的Calculating/Using章节、CME Oscillators的MACD/RSI章节、CME Fixing prices、CME Grains Volatility的Weather/Inputs段，以及Fidelity ATR和Bollinger Bands的Description/Calculation正文。来源URL保存在src中并随题引用。只核验定义和计算口径，不采用来源中技术图形必然预测或所有振荡指标固定有界的泛化表述；不复制原网页例题。

USDA ERS Feed Grains Database Documentation取得Data Items第98–116行、Marketing Years第169–185行，支持供应/使用、收获面积、残差及统计年度的定义。另尝试USDA FAS Export Sales Reporting Program页面与2025-12 WASDE PDF均未取得正文，因此未作为已核验来源；未装运订单题是明示存量流转的原创模型。农业分析数字均非实际最新预测值。

0171–0202共32个新任务：滚动与递推实现、交叉事件而非状态、指标数据频率及确认时点、MACD参照基准、RSI边界、区间位置、波峰配对、波动带宽与跳空、VWAP与图形尺度；供需平衡、收获面积、相对库存、营销年度、订单履约状态、残差解释、品质用途、天气阶段、贸易通道、年度价格、饲料构成和生产决策。

新增13个数值答案独立重构核对：滚动窗口增加20/5=4；EMA向108移动8的四分之一；涨幅强度占比0.8/(0.8+0.2)=80%；区间18/20=90%；隔夜至最高差12大于日内3；市场总成交1090/10=109，比买价108高1；总供给130减总使用110为20；收获90×6=540；22/125=17.6%；未装运总承诺42扣取消2及装运8为32；开工亏10对比停工亏30，改善20；两种产销情景收入均240；原100支出先降至90再增加其3%成为92.7。均不依赖作者表达式求期望答案。

## 第四小批来源、边界与计算

OIC Options Exercise FAQ实际读取股息与指派通知时差问答（约150–163行）；公司行动FAQ实际读取takeover交付物（85–89）、全现金交付（125–142）、spin-offs篮子（171–173）。未读取其链接的OCC具体memo，不将美国机制推作境内统一参数。0114原停牌题因与旧库同任务已删除实换：卖开对手为买平时的集中分配存续义务；新OIC Options Assignment FAQ末段124–127明确区分原成交对手与行权分配池。

CME Understanding SOFR Futures取得参考期定义51–65、复合结算133–158、100减利率159–163、SR1最终平均193–199，以及后文已知/未知利率混合段；不使用文中交易时间、张数、费用等当作中国规则。BIS 2016 NDF正文定义支持单笔差额结算，所有币种、名义与换算按原创题设；未采用历史市场规模或政策判断。CME Treasury Analytics ICS工具正文取得Components及Statistics，支持腿数比与风险比的区别。

第四小批15项数值独立复核：美式立即取得20，对比下一期40仅40%可能、折现为15.238；两退出路径4.80与4.70差0.10；篮子市值3200减总行权3000为200；认沽价差补现金后的支出3.8与认购价差4相差0.2；联合增值6相对单项2+3多1；两相邻价格斜率0.4和0.5相差0.1；股票对冲卖收72买付70净2；方差阈值0.04另加费用对应0.004；跨月复制成本5对报价6差1；2个国债组合净敏感度−40需1手A补40；完整有符号价差基准50增加4为54；发行人债券最多占40%使现金至少80×60%=48，已有40故需补8；NDF先产生20万元人民币再除7.2为27777.7778美元；剩余利率日预算50分10天为5%；三天4%加一天5%的日数均值4.25%。另逐段核验认沽反向比率最低−8在90、零价82，跨式负根不在定义域。当前97条数值元数据检查全部通过。

## 第五小批来源与新增决策

期货0219–0239共21题：订单转限价、保护档位、触发数据字段、隐藏量、比例分配、隐含组合盘口、本机条件依赖、原子仅减仓；NDF参考汇率与实际换汇价差、公允互换率、预测与折现曲线分工、参考期风险权重、双边倒数报价、负利率报价、取整顺序；融资后CTD排序、不等距月份蝶式、曲线陡峭交易方向、抵押后剩余回收、切换补偿对账、保证金与交割款分离。所有执行及现金流约定均在题干明确，不把境外可用功能冒充境内通用规则。

2026-10-14实际读取：
- CME Futures Order Types：https://www.cmegroup.com/education/courses/futures-trading-mechanics-and-regulation/futures-order-types ，Market Order第34–37、Stop Order第49–55行；只核验具体订单机制。
- CME How CME Group Ag Markets Operate：https://www.cmegroup.com/education/articles-and-reports/overview-what-makes-ags-markets-work ，Central Limit Order Book及Matching Algorithms第42–53行；题目纯比例由题设指定，未采用历史40%混合分配参数。
- CME Implied Options on Globex PDF：https://www.cmegroup.com/education/files/implied-options-overview-agriculture.pdf ，第4–5页真实单腿和价差生成隐含订单。2016资料仅支持组合机制，未声称历史产品清单、激活时限仍有效。
- CME Get to know Treasuries CTD：https://www.cmegroup.com/education/courses/introduction-to-treasuries/get-to-know-treasuries-ctd ，Carry/Net basis/IRR第50–60行；未使用2017样例。它明确最高IRR一般对应CTD，未采纳另一工具页可疑的反向表述。
- CME Emerging Market Discounting and Price Alignment Transition：https://www.cmegroup.com/trading/interest-rates/files/emerging-market-discounting-and-price-alignment-transition-detailed-deck.pdf ，第8–9页预测/折现、第12页现金补偿公式。2021文件标注Pending Regulatory Approval，只核验模型机制，不当作现行已实施公告。
- CME Yield Curve Spread Trades：https://www.cmegroup.com/education/files/yield-curve-spread-trades.pdf ，第2页DV01及前后期限交易方向。2013研究未被用作收益保证、固定腿数比或非负利率假设的依据。

新增数字按业务另行重构：止损保护内两档各1手合计2；隐藏订单总量20扣成交7余13；同价甲占60%分5手得3；买A付101卖B收98净付3且3手瓶颈；浮动腿现值9除固定年金180得5%；未定日占三分之一使30bp冲击成为10bp；100减100.40为负0.40%；精确均值1.2445最终两位取1.24；A净持有成本0.20加毛基差0.30得0.50，B净持有收益0.60扣毛基差0.50得−0.10；不等距组合水平和期限加权均归零；抵押后60债权回收15，最终损失45；新现值10加补偿2恰还原旧12。逐题元数据的计算只作可复现说明，未用公式批量生成题目。

## 第六小批来源与机制边界

期货0240–0261共22题：期货式期权三环节现金流与买方流动性、期货期权平价与固定输入敏感度、cap分期正部和cap/floor复制、互换期权方向/双期限/年金/嵌入空头；平均观察值下界与数量权重、平均方式单调关系、价差期权非线性及双月Delta、仓储使用选择；CDS参考实体和履约对手、拍卖最终值、预付款、实物交付、未违约市值与存续名义因子。非线性支付及合同流程与原普通单腿期权题区分，均不作为特定境外准入或操作规则考试。

2026-10-14实际读取新增来源：
- CME Money Calculations for CME-cleared Futures and Options：https://www.cmegroup.com/clearing/files/CME-Money-Calculations-Futures-and-Options.pdf ，第7页Futures-Style的逐日变动与移除时权利金，第8页行权形成期货/现金结算。2015历史说明，题设明确现金流，并未套用其历史合约列表。另取得ICE 2007 Option Margin Overview，发现不同产品处理不宜概括为同一规则，因此题目严格限于明示的CME式教学模型。
- CFA Valuation of Contingent Claims：https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/valuation-contingent-claims ，公开Summary第265–279行；只用期货/利率期权、caplet、swaption方向及可赎回债分解，未读取会员课程。
- ICE Dated Brent Average Price Options：https://www.ice.com/products/26535747 ，Option Style、Expiry实际取得，算术平均定义在第91行。CME Energy Average Price Options直接打开失败，搜索返回了索引正文，但其中平均/净损益泛化措辞未经调和，不用它给题目背书；平均数比较由明示数学假设独立推导。
- CME Trading Energy Calendar Spread Options：https://www.cmegroup.com/articles/whitepapers/trading-energy-calendar-spread-options.html ，第26–42行两个月份之差及正部支付。未采纳其例子中确定滚动获利、便利收益符号等未充分限定表述。
- CFA Credit Default Swaps：https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/credit-default-swaps ，公开Summary第243–249、256行用于参考实体和结算。预付方向的摘要表述未直接采纳，以以下研究的现金流现值独立交叉核验。
- Federal Reserve FEDS 2022-023，Antulio Bomfim，Credit Default Swaps：https://www.federalreserve.gov/econres/feds/files/2022023pap.pdf ，第4节Basic Mechanics、第5节Uses、第7.2节Valuing Upfront Payments。保护买方收到保护腿、支付票息腿；前者现值12大于后者8时，买方另付4使签约价值归零。研究工作论文不是监管规则或作者以外机构背书。
- ISDA Standard CDS Contract Converter Specification（2009）：https://www.cdsmodel.com/assets/cds-model/docs/ISDA%20Standard%20CDS%20Contract%20Converter%20Specification%20-%20Sept%204,%202009.pdf ，Outputs下Cash Settlement Amount、Upfront及Accrued Premium，核对预付与应计款的口径；历史模型不当作所有当前合同强制规则。

新增数值以题设独立重构：期货式买方先累计收2，行权付5再收期货5，净2；期权从4到3每点100故买方付100；欧式期货多认购空认沽的到期净差期望5乘0.96为4.8；利率上限第二个半年赔1000万元的1%为10；互换期权每期利差0.6%乘剩余年金3和本金1000为18；平均第三次最低0仍给均价100，执行90所以至少10；两个虚值单腿都零而价差期权付5；价差Delta拆成A正40和B负40，对应卖4手A、买2手B；CDS拍卖剩余40%由保护补60%；保护现值12减票息现值8需买方补4；等权100项退出2项，存续名义980万元。现金记录与数学支付各自检查，不将收入直接当利润。

## 第七小批：图表字段、执行约束和存续现金流

0262–0284共23题。目标为跨周期OHLC、实体与昨收比较、OBV统计口径、原始DM与ADX、三角边界、动态斜颈线、回撤基准、未回补完整缺口、事件柱真实时长、同步价差序列的极值重建；交易日映射、平今昨库存和费用、累计深度差分、订单与客户身份、净价和腿价双约束、待成交并发资金；库存提取流量、电力基荷峰荷组合；CDS应计调账、存续条件票息、不同票息的反向合约和历史事件覆盖差。

2026-10-14实际读取CME Chart Types的OHLC、Line Charts、Time/Trade-Based Charts；Trend and Continuation Patterns的Triangles；Technical Patterns: Reversals的Head and Shoulders；Fibonacci Retracements and Extensions的Trading Ratios及Fibonacci Analysis。四个URL均在新增来源表中。只采纳图表定义与明示策略计算，不声称形态必然产生预测收益。回撤比例以题设61.8%为准，未采用正文孤立62.8%措辞；斜颈线来自题设方程而非把网页水平线示意当唯一规则。

Fidelity OBV https://www.fidelity.com/learning-center/trading-investing/technical-analysis/technical-indicator-guide/obv 第243–262行核验收盘赋号算法；DMI https://www.fidelity.com/learning-center/trading-investing/technical-analysis/technical-indicator-guide/DMI 第253–266行核验DM方向筛选和平滑标准化。题设特别区分原始DM与最终DI，不把二者名称混用。

EIA The Basics of Underground Natural Gas Storage https://www.eia.gov/naturalgas/storage/basics/ 实际取得Storage Measures第95–113行；只用存量与每日deliverability，不用2015市场数量或法定参数。CME Energy Market and Risk Management with Options https://www.cmegroup.com/education/courses/introduction-to-energy/introduction-to-power/energy-market-and-risk-management-with-options 取得Futures Hedging Example，题内负荷和覆盖时段为原创。先前EIA energyexplained存储旧路径和CME unique-nature-of-electricity路径未取得正文，已用以上正式可读页替代。

CDS应计款采用已读ISDA转换器第3页；存续票息及不同票息反向合约采用Fed工作论文第6及7.3节。信用事件起点题全部依自设合同，不主张统一回溯期；ISDA Big Bang网页本次直接打开未取得正文，因此没有把搜索索引中的历史60/90日规则写入题目。

独立重构新增数值：原始DM比较上扩4与下扩7，仅保留7；斜颈线每期升1，第4期99；从120回吐40×61.8%为95.28；平昨两手2元加平今一手8元共10；累计盘口9扣前档6得3；并发保证金12对可用10缺2；每日供气10对提取上限3缺7；峰荷10MW覆盖4小时为40MWh且需10份峰时合约；CDS预付2000减应计2500为净收500；条件固定费用10×存续0.9×折现0.95为8.55。另逐字段检查OHLC，逐小时检查基荷/峰荷匹配。


## 跨科深查后的三项实质替换

2026-10-14保留ID替换options0062、futures10139、futures10272，不增加题目数量。0062改为两层指派分配：清算层随机不把券商客户层的明示FIFO改为比例分配。实际重读OIC Options Assignment FAQ第85–86、94–104行，未把境外机制当中国规则。0139改为评级触发担保门槛下降，市值不变仍追加20万元；新增实际读取BIS LQY10.45及10.102，https://www.bis.org/committees/bcbs/basel-consolidated-guidelines/module/lqy/10 ，仅用合同触发风险原理。0272改为同步两腿先相减、后取极值：两时点价差5和10，最高10，不能拼接不同时间的最高A110与最低B90为20。0266两项干扰改为把强度阈值当方向交叉、把ADX高位当超卖反转，以及误换方向线和强度线用途；0270以今最低103不高于昨最高105判定完整缺口不成立，不推断未知的昨日最低。


## 第八小批：期权公司行动与到期流程

0117–0122共6题：股东并购对价选择与期权默认交付物、要约未生效时不能固定现金估值、异步成分股开盘结算、停止交易后至参考确定前的风险窗口、盘后有效指令导致单腿指派、行权导致未平仓量减少但无平仓成交。未通过增加参数变体扩题。

2026-10-14重新读取OIC Splits, Mergers, Spinoffs & Bankruptcies FAQ第143–153行，区分并购选择和要约生效；读取OIC Equity vs. Index Options的AM & PM Settlement第137–143行，只采用交易与结算参考时点可分离的一般机制。该页早先“指数期权只能到期行权”的概括与后文American vs European不一致，未采用这一概括。

新增实际读取Cboe六页PDF Settlement of Standard, A.M.-Settled S&P 500 Index Options（2024年7月17日版），https://cdn.cboe.com/resources/spx/Settlement_of_Standard_AM_Settled_SP_500_Index_Options.pdf ，第1–2页详细说明SOQ取各股官方开盘价、不锚定同一时刻，并可能超出盘中指数高低范围。第5页说明可用相应开盘交易匹配；没有把历史统计或单一实际产品时点推广为所有市场规则。案例使用简化两股平均，110和90平均100，不能换成最后一股开盘时的即时95。

OIC Options Exercise FAQ第105–121行用于盘后指令窗口与exercise-by-exception并非绝对自动；所有时点由题干明示。实际读取OIC 2025年10月Open Interest: Why It Matters，https://www.optionseducation.org/news/open-interest-why-it-matters 第81–92行，尤其83行的行权指派移除OI。prd-web域同路径失败，www正式页已取得正文；未采用文章示例中交易人字母指代错误。未平仓100减行权20为80，不能买卖两端重复扣。

另取得OIC UnderstandingAssignment_2.pdf三页，但未新增引用其SPX标的等不准确概括；盘后风险只依已交叉读取的FAQ及明示条件。


## 第九小批：持仓报表、基准成交与交割选择

0285–0293共9题。COT四题分别区分Delta等价重估与实际成交流、分方向残差与未知交易者身份、主体重分类与交易、跨作物年度配对后的非线性分类聚合。TAS与普通限价在未知基准下的价格约束不同；SMP明确取消原挂单后入单仍会向第三方成交；Treasury基差头寸的风险配比与实际交付面额产生delivery tail；固定当日发票后仍可选择交付时点；最后区分动态报单带拒绝与每日涨跌限及全市场停牌。

新增实际读取来源（2026-10-14）：
- CFTC Explanatory Notes，https://www.cftc.gov/MarketReports/CommitmentsofTraders/ExplanatoryNotes/index.htm ，第66–70行期货等价、第83行未报告残差、第104–105行旧/新作物年度分类。原网页含历史市场名单和样例，题目未采用为当前市场清单；全部数字自设。
- CFTC Disaggregated Explanatory Notes，https://www.cftc.gov/MarketReports/CommitmentsofTraders/DisaggregatedExplanatoryNotes/index.htm ，第82–85行分类变化及106–108行“分类交易者而非逐笔活动”的边界。没有使用页面2009年过渡安排当作现行安排。
- CME Trading at Settlement for Metals Futures，https://www.cmegroup.com/education/articles-and-reports/trade-at-settlement-for-metals ，Example of a TAS transaction第41–46行，明确相对尚未知结算价；不照搬现行品种月份、档位、最低大宗量。
- CME FAQ: Globex Self-Match Prevention Functionality，https://www.cmegroup.com/solutions/market-access/globex/trade-on-globex/faq-self-match.html ，第2问取消resting或incoming及继续处理入单。案例排除隐含订单，不声称相同SMP适用所有隐含撮合；来源第10问明确存在适用边界。
- CME Treasury Futures Basis Spreads，https://www.cmegroup.com/education/files/treasury-futures-basis-spreads.pdf ，实际取得21页2024版PDF，第8–9页Wild Card固定发票窗口；第11–12页Delivery Tail，风险配比变成实际一对一面额交付。题设时间是教学假定，不宣称统一美国或中国交割日程。只求当前买券交付差额，不将0.8错误说成全程期货利润。
- CME Understanding Price Limits and Circuit Breakers，https://www.cmegroup.com/education/articles-and-reports/understanding-price-limits-and-circuit-breakers ，What are price limits、What is velocity logic与What is price banding。只采用控制层次原理，题设90–110与99–103不是任何现行品种参数。

作者逐项复算：1000张认购乘Delta变化0.2得到200手等价增加；未报告方向残差200和250，净多−50；旧年多70、新年空50合并为spreading50及剩多20；面值1000万元交80×10万元后留200万元；当前发票100扣现券99.2为局部0.8。另逐步走SMP队列，自己的100卖单撤后由第三方101成交；价格106在日范围内但在动态带外。


## 选项质量复修一：30题

2026-10-14经复核方先撤回指纹后，修订options0012、0015、0036、0040、0053、0054、0056、0072、0074、0080、0081、0083、0087、0088、0090、0095、0100、0105、0110、0113，以及futures10001、0002、0003、0019、0020、0026、0027、0028、0046、0047。逐对象比较确认仅修改options、rationales、explanation三个字段；题干、答案位置、原计算元数据、主题与来源均未变，其他题对象不变。

主要改进是移除直接违背题干或夸张的干扰，加入真实近邻误区：零支付区与低成本、日历价差强制同期估值、零高端斜率不等于零支付、机构截止与本机时点、欧式较晚固定现金、数值截断不能修复无套利、低Vega正反向敏感度、残差硬分摊、现金交付后误用收购方股价等。数值题0015、0110和期货0019统一比较相同输出字段，不让正确项独有第二段结论。0053只断言两个执行价之间均零支付，不把未限定对称翼宽的结构误说成两边必然需要更远移动。

自动长度指标是复查入口，不是内容质量证明。本次20个期权和10个期货候选修改后不再符合“正确选项长度至少次长1.5倍”条件；仍须另一轮内容重读。期货0104暂建议保留数值格式：正确“约9708.74元”比整数干扰更长来自折现后的合理精度，不是额外解释信息，不能为了消除数值位数标记改造答案。其余39个文字长度候选继续分批申请撤回和审读；其中第二组20题与末组19题均已完成获准修订；仍待逐题复核结论。

## 选项质量复修二：20题

经另一轮复核先撤回原接受记录后，仅修改期货0050、0058、0059、0060、0062、0067、0078、0086、0093、0095、0096、0108、0117、0120、0121、0130、0136、0138、0140、0142的选项、逐项理由与由理由派生的解析。初轮修订保留题干、答案位置、来源、学习目标、章节和计算元数据，逐对象比较确认仅上述20题的三类字段改变。随后独立复核发现0095原题未明确中心化，因此另获授权补足题干：两变量均中心化、方差非零、相关非零且非完全相关，避免无截距目标应使用原点矩而非协方差的条件缺口，也避免反向零斜率无倒数。同步将干扰改为已中心化即保证倒数等同。此修订未增加题量，其余题对象不变。

本组主要消除靠夸张常识即可排除的干扰，改为真实近似条件或流程误用：平行DV01误代曲线扭转、年化数量转换后遗漏投产、手续费不能修复拼接、测试集再次参与选参、会计合并误代法律净额、过去分红的重复计入、现金结算误代存储复制、数量匹配误代均价观察窗口、中心化误代回归方向、百分比回归遗漏价值尺度、重置与未付款混同、应收等值误代实际已交付、日合计与周合计混同、无实际损失误代无历史暴露、每日VM误代零平仓时长等。四项理由均检查达到结构要求。自动长度指标只作为复查入口，本组重写后未触发正确项至少为次长1.5倍的候选条件；仍须内容复核确认，不能据此宣称干扰质量已获独立接受。

## 选项质量复修三：19题

经另一轮复核撤回原记录后，仅修改期货0146、0147、0148、0152、0155、0166、0167、0169、0174、0178、0182、0183、0189、0194、0199、0207、0251、0263、0278的选项、逐项理由及派生解析。逐对象字段差异确认只涉及这19题的上述字段；最新0095条件修订没有被覆盖。其余题干、来源、答案位置和计算元数据保留。全部139条作者计算表达式再次自检通过，该检查不是另一轮独立复算的替代。

具体改善包括：账户分开不能增加盘口容量、补记累积涨跌不能恢复缺报期间真实路径、给负价格加常数会改变收益含义、先成交一腿不使参考报价自动有效、反向成交不能改成纠错撤销、发票与信用销售不等于到账、品牌认可与保险受理不同、交叉事件须配对同时点均线、绝对金额和跳数都不自动成为相对动量、背离需固定峰值配对、产能与天气阶段条件不能直接迁移等。数值题0183、0189、0199以同口径并列结果比较，去掉仅正确选项附带长解释的形式线索；完整概念理由保留在四项解析。0207四项均为具体交易动作及复制检验；0251加入按1.8倍放大仍不能同时匹配10%/90%两天权重的实质误区；0278区分后续计划撤单与事前确定互斥。

目前全模块只余期货0104一个正确项长度候选，来自折现答案9708.74相对整数答案的位数差异，已提出数值格式豁免而非为追求零候选改造数值。长度扫描不衡量唯一性、可信度和难度，最终仍以逐题四项内容复核为准。

## 0050跨科目标重叠的实质替换

原0050总DV01与关键期限分布的识别，与基金二投资0044属于同一核心决策。经复核撤回后保留0050题号，改为交割章节的交付凭证低费持有权：裸粮100加两月储存6共106；凭证103加持证费2共105。不是给旧久期题改数字，原学习目标、题干、选项、理由、来源及章节均已替换，总题量仍415。逐对象差异确认只有0050变化，其他414题保持。新增一条计算元数据，目前140条，待独立复算。

新来源实际取得USDA ERS 2013年文章Solving the Commodity Markets’ Non-Convergence Puzzle正文，https://ers.usda.gov/amber-waves/2013/august/solving-the-commodity-markets-non-convergence-puzzle 。第102–104、127–134行说明到期交付凭证与现粮的持有成本可不同，凭证持有人可保留较低费用安排；第164–166行区分两类储存收费。题设明确境外教学机制、两月用粮、不能把现粮直接转换到优惠费率，无需记忆任何现行合约参数。只采用权利与成本比较，不采用文中关于所有现金结算都保证收敛、期货零违约风险等可能被过度概括的推论。

## 饱和章节之后的小批新增：5题

新增options0123、futures10294–0297，独立决策各一题，不按新数字或产品标签拆分旧任务。0050替换仍只占一个题号，此处五题才计增量。新旧对象对比确认原415题未变化；目前420题、145条作者计算元数据，新五题另待内容及独立计算复核。

- 0294：产量与价格联合变化时，直接从两状态总收入反求套保数量30吨。两情景9600+20h与10800−20h，在h=30时均10200。与原0200“乘积期望不能拆成均值乘积”不同，本题要求求解收入稳定的交易量；不重复一般最小方差回归题。实际读取USDA ERS《Hedging in Futures》8页PDF，第3页Rh公式和第5–6页自然对冲，https://ers.usda.gov/sites/default/files/_laserfiche/publications/40946/51066_aer774h.pdf?v=67053 。历史报告中推荐比例、旧交易所名单和零违约风险简化均不采用。
- 0295：合同仅由天气指数触发，两个情景检验“无经营损失仍支付”和“有经营损失却不支付”。实际取得CME三页fact card第2页指数结算定义，https://www.cmegroup.com/trading/weather/files/weather-fact-card.pdf 。题内公式、阈值、无损失证明及无赔款上限条款都是原创设定，不泛称所有保险必须证明损失，也不采用历史城市名单。
- 0296：Vega名义量不是方差支付系数；从给定偏导2a×20=10000得a=250，准确支付56250，不能只用50000线性近似或把10000直接乘方差差。实际读取Cboe用户指南OTC-Like Volatility / Vega Conventions第20–29行，https://www.cboe.com/document/tech-spec/content/technical-specifications/sp-500-variance-futures-variance-calculator-user-guide/background/otc-like-volatility--vega-conventions 。其第25行说明以波动率偏导转换交易量；图片公式链接返回Cache miss，未宣称读取该图片，题内完整明示简化支付并独立求导。
- 0297：风险中性概率及零利率下，方差互换与波动率互换分别要求不同期望为零，执行值500与20；不能先对期望开平方得到22.36。
- options0123：三个月后重设平值基准，六个月的收益率支付从S1=80而非今日100起算，支付200元；不同于固定执行价认购仅变换价格数字。

后两题实际读取Cboe 2024白皮书第6–7页第3节与表4，https://cdn.cboe.com/resources/membership/Options_on_VX_Futures_Whitepaper.pdf 。只采用方差/波动率互换的支付和公允执行值定义、远期起始期权的收益率支付；不采用表中未进一步核验的近似估值公式，不把产品历史参数当现行规则。全部数值与场景原创。检索现有题目未见方差互换、波动率互换或未来重设执行价的相同决策题，仍由复核方判定独立性。

### options

- options-expansion-deriv-0001：代码相似但交付标的不同；章节1；课contracts；expansionDerivCases；案例A1：题设合约识别及报价口径
- options-expansion-deriv-0002：同名合约的调整标记；章节1；课contracts；expansionDerivCases；案例A1：题设合约识别及报价口径
- options-expansion-deriv-0003：报价低不代表总支出低；章节1；课contracts；expansionDerivCases；案例A1：题设合约识别及报价口径；复算 .09*12000-.10*10000 = 80 元
- options-expansion-deriv-0004：每份价格与现金行权价值；章节1；课contracts；expansionDerivCases；案例A1：题设合约识别及报价口径；复算 (2.8-2.72)*5000 = 400 元
- options-expansion-deriv-0005：日历日与交易日倒计时；章节1；课contracts；expansionDerivCases；案例A1：题设合约识别及报价口径
- options-expansion-deriv-0006：撤单回报前的重复下单；章节1；课lifecycle；expansionDerivCases；案例A2：题设委托、成交及交收条件
- options-expansion-deriv-0007：部分成交后的剩余委托；章节1；课lifecycle；expansionDerivCases；案例A2：题设委托、成交及交收条件；复算 5-3 = 2 张
- options-expansion-deriv-0008：部分指派后的义务状态核对；章节1；课lifecycle；expansionDerivCases；案例A2：题设委托、成交及交收条件
- options-expansion-deriv-0009：市价单穿透盘口；章节1；课lifecycle；expansionDerivCases；案例A2：题设委托、成交及交收条件；复算 (2*.12+3*.14)*10000 = 6600 元
- options-expansion-deriv-0010：净支付为负的组合限价；章节1；课lifecycle；expansionDerivCases；案例A2：题设委托、成交及交收条件；复算 -.02 = -0.02 元/份最高净支付
- options-expansion-deriv-0011：行权状态流水的重复计数；章节1；课lifecycle；expansionDerivCases；案例A2：题设委托、成交及交收条件
- options-expansion-deriv-0012：现金结算不产生证券所有权；章节1；课lifecycle；expansionDerivCases；案例A2：题设委托、成交及交收条件
- options-expansion-deriv-0013：权利到期与服务申请期限；章节1；课lifecycle；expansionDerivCases；案例A2：题设委托、成交及交收条件
- options-expansion-deriv-0014：整笔订单执行缺口的基准；章节1；课value；expansionDerivCases；案例A3：独立构造的价值分解及可执行报价；复算 (2*(.21-.20)+2*(.24-.20))*10000+20 = 1020 元
- options-expansion-deriv-0015：内在价值不等于退出收益；章节1；课value；expansionDerivCases；案例A3：独立构造的价值分解及可执行报价；复算 .27-.30 = -0.03 元/份
- options-expansion-deriv-0016：负时间价值报价的核验顺序；章节1；课value；expansionDerivCases；案例A3：独立构造的价值分解及可执行报价
- options-expansion-deriv-0017：权利金与最大可承受亏损预算；章节1；课value；expansionDerivCases；案例A3：独立构造的价值分解及可执行报价；复算 Math.floor(2500/(800+20)) = 3 张
- options-expansion-deriv-0018：非对称融资条件下的平价检验；章节3；课pricing；expansionDerivParity；Put/Call Parity：匹配条件、现金头寸与交易摩擦；案例A4
- options-expansion-deriv-0019：复制现货遗漏行权价现金；章节3；课pricing；expansionDerivParity；Put/Call Parity：匹配条件、现金头寸与交易摩擦；案例A4
- options-expansion-deriv-0020：折现行权价的符号；章节3；课pricing；expansionDerivParity；Put/Call Parity：匹配条件、现金头寸与交易摩擦；案例A4
- options-expansion-deriv-0021：除息现值不能重复扣除；章节3；课pricing；expansionDerivParity；Put/Call Parity：匹配条件、现金头寸与交易摩擦；案例A4
- options-expansion-deriv-0022：买卖价差下的套利假象；章节3；课pricing；expansionDerivParity；Put/Call Parity：匹配条件、现金头寸与交易摩擦；案例A4
- options-expansion-deriv-0023：箱式组合的贴现比较；章节3；课pricing；expansionDerivParity；Put/Call Parity：匹配条件、现金头寸与交易摩擦；案例A4
- options-expansion-deriv-0024：按绝对值汇总导致假风险；章节3；课delta-gamma；expansionDerivDelta；Delta：有符号头寸、局部估计与动态调整；案例A5；复算 6000-4000 = 2000 份
- options-expansion-deriv-0025：Delta对冲后标的上涨；章节3；课delta-gamma；expansionDerivDelta；Delta：有符号头寸、局部估计与动态调整；案例A5
- options-expansion-deriv-0026：不同标的Delta不能直接净额；章节3；课delta-gamma；expansionDerivDelta；Delta：有符号头寸、局部估计与动态调整；案例A5
- options-expansion-deriv-0027：由双侧重估提取局部Delta；章节3；课delta-gamma；expansionDerivDelta；Delta：有符号头寸、局部估计与动态调整；案例A5；复算 (.212-.200)/(3.01-2.99) = 0.6 Delta
- options-expansion-deriv-0028：百分比变化与绝对变化；章节3；课delta-gamma；expansionDerivDelta；Delta：有符号头寸、局部估计与动态调整；案例A5；复算 .6*10*.01 = 0.06 元/份
- options-expansion-deriv-0029：同Delta不同Gamma的压力风险；章节3；课delta-gamma；expansionDerivGamma；Gamma：曲率、再平衡和近到期风险；案例A6
- options-expansion-deriv-0030：近到期平值的监测频率；章节3；课delta-gamma；expansionDerivGamma；Gamma：曲率、再平衡和近到期风险；案例A6
- options-expansion-deriv-0031：负Gamma再平衡的交易方向；章节3；课delta-gamma；expansionDerivGamma；Gamma：曲率、再平衡和近到期风险；案例A6
- options-expansion-deriv-0032：股票无法消除Gamma；章节3；课delta-gamma；expansionDerivGamma；Gamma：曲率、再平衡和近到期风险；案例A6
- options-expansion-deriv-0033：局部二阶近似适用范围；章节3；课delta-gamma；expansionDerivGamma；Gamma：曲率、再平衡和近到期风险；案例A6
- options-expansion-deriv-0034：净Vega为零的期限错配；章节3；课theta-vega-rho；expansionDerivVega；Vega：期限分层、波动率曲面与估值输入；案例A7
- options-expansion-deriv-0035：事件落在不同到期窗内；章节3；课theta-vega-rho；expansionDerivVega；Vega：期限分层、波动率曲面与估值输入；案例A7
- options-expansion-deriv-0036：历史波动与隐含波动的用途；章节3；课theta-vega-rho；expansionDerivVega；Vega：期限分层、波动率曲面与估值输入；案例A7
- options-expansion-deriv-0037：跨行权价单一隐波的遗漏；章节3；课theta-vega-rho；expansionDerivVega；Vega：期限分层、波动率曲面与估值输入；案例A7
- options-expansion-deriv-0038：波动率单位归一；章节3；课theta-vega-rho；expansionDerivVega；Vega：期限分层、波动率曲面与估值输入；案例A7；复算 .04*100 = 4 元/波动率小数单位
- options-expansion-deriv-0039：周末Theta不是固定收费；章节3；课theta-vega-rho；expansionDerivTheta；Theta：模型时间约定与价格分解；案例A8
- options-expansion-deriv-0040：时间价值衰减的非线性；章节3；课theta-vega-rho；expansionDerivTheta；Theta：模型时间约定与价格分解；案例A8
- options-expansion-deriv-0041：锁定证券处置的前置核验；章节2；课covered-protective；expansionDerivCases；案例A9：题设备兑、保险、分红及成本合并
- options-expansion-deriv-0042：一部分现货已被另项承诺占用；章节2；课covered-protective；expansionDerivCases；案例A9：题设备兑、保险、分红及成本合并
- options-expansion-deriv-0043：双约束保险方案选择；章节2；课covered-protective；expansionDerivCases；案例A9：题设备兑、保险、分红及成本合并；复算 100+3-98 = 5 元/份最大净损失
- options-expansion-deriv-0044：预期分红的保护底线口径；章节2；课covered-protective；expansionDerivCases；案例A9：题设备兑、保险、分红及成本合并；复算 98+2-100-4 = -4 元/份
- options-expansion-deriv-0045：以不同ETF认沽替代精确保险；章节2；课covered-protective；expansionDerivCases；案例A9：题设备兑、保险、分红及成本合并
- options-expansion-deriv-0046：借出证券召回与认购交付错配；章节2；课covered-protective；expansionDerivCases；案例A9：题设备兑、保险、分红及成本合并
- options-expansion-deriv-0047：股价回本价与备兑最大收益冲突；章节2；课covered-protective；expansionDerivCases；案例A9：题设备兑、保险、分红及成本合并；复算 4.5+.1-5 = -0.4 元/份最高净损益
- options-expansion-deriv-0048：保险单位和保费的整数选择；章节2；课covered-protective；expansionDerivCases；案例A9：题设备兑、保险、分红及成本合并；复算 2*12500 = 25000 精确覆盖份数
- options-expansion-deriv-0049：认购比率价差的尾部裸露；章节3；课strategies；expansionDerivCases；案例A10：明确同标的、同到期、相同单位的组合现金流
- options-expansion-deriv-0050：价差腿单位不同的名义匹配；章节3；课strategies；expansionDerivCases；案例A10：明确同标的、同到期、相同单位的组合现金流
- options-expansion-deriv-0051：领口的成本来源；章节3；课strategies；expansionDerivCases；案例A10：明确同标的、同到期、相同单位的组合现金流
- options-expansion-deriv-0052：跨式的主观情景期望损益；章节3；课strategies；expansionDerivCases；案例A10：明确同标的、同到期、相同单位的组合现金流；复算 .2*20+.6*0+.2*30-12 = -2 元/份期望净损益
- options-expansion-deriv-0053：宽跨低成本的代价；章节3；课strategies；expansionDerivCases；案例A10：明确同标的、同到期、相同单位的组合现金流
- options-expansion-deriv-0054：日历价差不等于到期同日价差；章节3；课strategies；expansionDerivCases；案例A10：明确同标的、同到期、相同单位的组合现金流
- options-expansion-deriv-0055：长蝶式峰值与外侧的对照验证；章节3；课strategies；expansionDerivCases；案例A10：明确同标的、同到期、相同单位的组合现金流；复算 Math.max(100-90,0)-2*Math.max(100-100,0)+Math.max(100-110,0)-3 = 7 中间价净利润
- options-expansion-deriv-0056：不等距蝶式的尾端净额；章节3；课strategies；expansionDerivCases；案例A10：明确同标的、同到期、相同单位的组合现金流；复算 (100-90)-(120-100)-3 = -13 元/份高价尾端损益
- options-expansion-deriv-0057：铁鹰内区间与信用收入；章节3；课strategies；expansionDerivCases；案例A10：明确同标的、同到期、相同单位的组合现金流；复算 2-Math.max(95-101,0)+Math.max(90-101,0)-Math.max(101-105,0)+Math.max(101-110,0) = 2 元/份
- options-expansion-deriv-0058：平仓短腿后策略风险改变；章节3；课strategies；expansionDerivCases；案例A10：明确同标的、同到期、相同单位的组合现金流
- options-expansion-deriv-0059：权利金收入并非可全部消费资金；章节4；课risk；expansionDerivCases；案例A11：题设资金、履约和风险治理
- options-expansion-deriv-0060：压力网格遗漏中间亏损峰值；章节4；课risk；expansionDerivCases；案例A11：题设资金、履约和风险治理
- options-expansion-deriv-0061：报价中断时的风险估值；章节4；课risk；expansionDerivCases；案例A11：题设资金、履约和风险治理
- options-expansion-deriv-0062：清算随机不等于客户层也按比例指派；章节4；课risk；expansionDerivAssignment；FAQ首段：清算层随机分配与经营机构获准的客户分配方法是不同环节；FIFO条件由题设指定
- options-expansion-deriv-0063：相互排斥情景的损失汇总；章节4；课risk；expansionDerivCases；案例A11：题设资金、履约和风险治理；复算 Math.max(2000-800,1000-1500) = 1200 元
- options-expansion-deriv-0064：按胜率选择卖方策略的遗漏；章节4；课risk；expansionDerivCases；案例A11：题设资金、履约和风险治理
- options-expansion-deriv-0065：策略止盈后仍残留挂单；章节4；课risk；expansionDerivCases；案例A11：题设资金、履约和风险治理
- options-expansion-deriv-0066：交易授权与风险限额独立；章节4；课risk；expansionDerivCases；案例A11：题设资金、履约和风险治理
- options-expansion-deriv-0067：价差交收的过桥资金时序；章节4；课risk；expansionDerivCases；案例A11：题设资金、履约和风险治理；复算 20-5 = 15 万元
- options-expansion-deriv-0068：风险指标越界的升级处理；章节4；课risk；expansionDerivCases；案例A11：题设资金、履约和风险治理
- options-expansion-deriv-0069：微小实值与行权净收益；章节1；课lifecycle；expansionDerivCases；案例A12：题设特殊行权和结算条款；复算 5-8 = -3 元
- options-expansion-deriv-0070：结算平均价与收盘价错用；章节1；课lifecycle；expansionDerivCases；案例A12：题设特殊行权和结算条款；复算 100.8-100 = 0.8 元/单位
- options-expansion-deriv-0071：美式与欧式模型混用；章节1；课lifecycle；expansionDerivCases；案例A12：题设特殊行权和结算条款
- options-expansion-deriv-0072：外部行情与机构截止时点；章节1；课lifecycle；expansionDerivCases；案例A12：题设特殊行权和结算条款
- options-expansion-deriv-0073：模型波动率负值的数据校验；章节3；课pricing；expansionDerivCases；案例A13：题设估值输入与理论边界
- options-expansion-deriv-0074：同期限认购执行价单调性；章节3；课pricing；expansionDerivCases；案例A13：题设估值输入与理论边界
- options-expansion-deriv-0075：同一损益采用两次汇率换算；章节3；课pricing；expansionDerivCases；案例A13：题设估值输入与理论边界
- options-expansion-deriv-0076：认购价差价格超过折现宽度；章节3；课pricing；expansionDerivOptionValue；公开Summary：无套利价格边界与复制；题设欧式、无摩擦模型
- options-expansion-deriv-0077：凸性检验与负成本蝶式；章节3；课pricing；expansionDerivOptionValue；公开Summary：无套利价格边界与复制；题设欧式、无摩擦模型；复算 2*10-14-4 = 2 元初始净收入
- options-expansion-deriv-0078：欧式认沽现值下界与立即行权值；章节3；课pricing；expansionDerivOptionValue；公开Summary：无套利价格边界与复制；题设欧式、无摩擦模型
- options-expansion-deriv-0079：认购高于现货的支配套利；章节3；课pricing；expansionDerivOptionValue；公开Summary：无套利价格边界与复制；题设欧式、无摩擦模型
- options-expansion-deriv-0080：欧式期限单调性的反例条件；章节3；课pricing；expansionDerivOptionValue；公开Summary：无套利价格边界与复制；题设欧式、无摩擦模型
- options-expansion-deriv-0081：美式权利集合与欧式比较；章节3；课pricing；expansionDerivOptionValue；公开Summary：无套利价格边界与复制；题设欧式、无摩擦模型
- options-expansion-deriv-0082：单期复制的股票和现金腿；章节3；课pricing；expansionDerivBinomial；公开Summary：单期复制、无风险组合与风险中性定价；复算 .5*100-40 = 10 元复制初始成本
- options-expansion-deriv-0083：二叉模型的无套利增长区间；章节3；课pricing；expansionDerivBinomial；公开Summary：单期复制、无风险组合与风险中性定价
- options-expansion-deriv-0084：主观上涨概率与复制价格分离；章节3；课pricing；expansionDerivBinomial；公开Summary：单期复制、无风险组合与风险中性定价
- options-expansion-deriv-0085：三个状态对两种资产复制的限制；章节3；课pricing；expansionDerivBinomial；公开Summary：单期复制、无风险组合与风险中性定价
- options-expansion-deriv-0086：二期模型中的自融资调整；章节3；课pricing；expansionDerivBinomial；公开Summary：单期复制、无风险组合与风险中性定价
- options-expansion-deriv-0087：不合法市场价格的隐波求解；章节3；课pricing；expansionDerivOptionValue；公开Summary：定价输入与价格边界；数值诊断条件由题设给出
- options-expansion-deriv-0088：低Vega区域的隐波不稳定；章节3；课pricing；expansionDerivOptionValue；公开Summary：定价输入与价格边界；数值诊断条件由题设给出
- options-expansion-deriv-0089：隐波区间不能伪装单点成交；章节3；课pricing；expansionDerivOptionValue；公开Summary：定价输入与价格边界；数值诊断条件由题设给出
- options-expansion-deriv-0090：同执行价看涨看跌隐波的可比性；章节3；课pricing；expansionDerivOptionValue；公开Summary：定价输入与价格边界；数值诊断条件由题设给出
- options-expansion-deriv-0091：远期平值与现货平值区别；章节3；课pricing；expansionDerivOptionValue；公开Summary：定价输入与价格边界；数值诊断条件由题设给出
- options-expansion-deriv-0092：方差时间插值与波动率平均；章节3；课pricing；expansionDerivOptionValue；公开Summary：定价输入与价格边界；数值诊断条件由题设给出；复算 Math.sqrt((.02+.09)/2/.75) = 0.27080128015453203 年化波动率
- options-expansion-deriv-0093：同时中和Gamma和Vega的可解性；章节3；课delta-gamma；expansionDerivCases；案例B2：题设多风险因子线性系统与风险归因
- options-expansion-deriv-0094：可解双风险对冲的方向核验；章节3；课delta-gamma；expansionDerivCases；案例B2：题设多风险因子线性系统与风险归因；复算 20-2*2-4*4 = 0 剩余Vega
- options-expansion-deriv-0095：模型归因残差不能直接认定舞弊；章节3；课delta-gamma；expansionDerivCases；案例B2：题设多风险因子线性系统与风险归因
- options-expansion-deriv-0096：外币期权Delta对冲后的汇率敞口；章节3；课delta-gamma；expansionDerivCases；案例B2：题设多风险因子线性系统与风险归因
- options-expansion-deriv-0097：动态对冲频率与执行成本权衡；章节4；课risk；expansionDerivCases；案例B3：题设报告阈值、账户限制和执行预算
- options-expansion-deriv-0098：冻结隐波的Delta与总价格斜率；章节4；课risk；expansionDerivCases；案例B3：题设报告阈值、账户限制和执行预算
- options-expansion-deriv-0099：平仓容量与对冲容量的差别；章节4；课risk；expansionDerivCases；案例B3：题设报告阈值、账户限制和执行预算
- options-expansion-deriv-0100：隔夜风险限额与日内合规的区别；章节4；课risk；expansionDerivCases；案例B3：题设报告阈值、账户限制和执行预算
- options-expansion-deriv-0101：美式节点须比较继续持有与立即行权；章节3；课pricing；expansionDerivCases；案例D1：明示二叉模型中的美式最优停止；行权权利原理见OIC Exercise；复算 Math.max(100-80,(.6*0+.4*40)/1.05) = 20 当前节点期权价值
- options-expansion-deriv-0102：指派通知晚于分红权利确定时点；章节1；课lifecycle；expansionDerivExercise；FAQ：提前行权、分红归属、通知和停牌；合同细节为题设
- options-expansion-deriv-0103：提前处置比较可实现净现金而非中价；章节1；课lifecycle；expansionDerivExercise；FAQ：提前行权、分红归属、通知和停牌；合同细节为题设；复算 (5-.20)-(4.75-.05) = 0.1 行权路径多得净现金
- options-expansion-deriv-0104：证券与现金交付篮子的实值判断；章节1；课contracts；expansionDerivAdjust；FAQ：并购调整交付物、全现金交付及分拆篮子；全部参数是题设；复算 Math.max(50*50+700-30*100,0) = 200 元/张内在价值
- options-expansion-deriv-0105：全现金交付确定后的股票波动输入；章节1；课contracts；expansionDerivAdjust；FAQ：并购调整交付物、全现金交付及分拆篮子；全部参数是题设
- options-expansion-deriv-0106：分拆篮子期权的第二证券风险；章节1；课contracts；expansionDerivAdjust；FAQ：并购调整交付物、全现金交付及分拆篮子；全部参数是题设
- options-expansion-deriv-0107：由平价关系检验同要素Greeks一致性；章节3；课pricing；expansionDerivParity；Put/Call Parity：对匹配欧式期权恒等式求导及终值复制；原创检验
- options-expansion-deriv-0108：认购价差与认沽价差加现金的同终值比较；章节3；课pricing；expansionDerivParity；Put/Call Parity：对匹配欧式期权恒等式求导及终值复制；原创检验；复算 4-(9.8-6) = 0.2 同终值初始成本差
- options-expansion-deriv-0109：跨式下侧代数根可能不在价格域；章节3；课payoffs；expansionDerivCases；案例D2：非负标的域、比率结构及逐段收益；不重复普通价差代数变式
- options-expansion-deriv-0110：认沽反向比率结构的中段最大亏损；章节3；课payoffs；expansionDerivCases；案例D2：非负标的域、比率结构及逐段收益；不重复普通价差代数变式
- options-expansion-deriv-0111：联合压力重估不能简单相加单因素变化；章节3；课delta-gamma；expansionDerivGamma；Gamma：局部曲率、非线性联合情景及到期不可微边界；原创重估表；复算 (16-10)-((12-10)+(13-10)) = 1 联合变化相对单项和的差
- options-expansion-deriv-0112：由对称价格重估提取Gamma；章节3；课delta-gamma；expansionDerivGamma；Gamma：局部曲率、非线性联合情景及到期不可微边界；原创重估表；复算 (5.50-2*5+4.60)/(1*1) = 0.1 Gamma近似值
- options-expansion-deriv-0113：到期折点处不存在唯一普通导数；章节3；课delta-gamma；expansionDerivGamma；Gamma：局部曲率、非线性联合情景及到期不可微边界；原创重估表
- options-expansion-deriv-0114：卖出开仓的对手买平不消除指派义务；章节1；课lifecycle；expansionDerivAssignment；FAQ末段When I sell an option to open：成交对手可为买入平仓，存续空头进入指派分配池
- options-expansion-deriv-0115：同一终点下动态对冲现金流不同；章节3；课delta-gamma；expansionDerivCases；案例D3：原创动态对冲现金流及Gamma-Theta近似模型；参数均明示；复算 .5*100+.2*110-.2*100-.5*100 = 2 股票对冲现金盈亏
- options-expansion-deriv-0116：含交易费的Gamma收支平衡方差；章节3；课delta-gamma；expansionDerivCases；案例D3：原创动态对冲现金流及Gamma-Theta近似模型；参数均明示；复算 .04+4/1000 = 0.044 回本实现方差
- options-expansion-deriv-0117：并购对价选择不能直接附着于未行权认购；章节1；课contracts；expansionDerivAdjust；FAQ Election merger：非选择股东对应交付物；行权与股东选择为不同程序，具体截止以题设为准
- options-expansion-deriv-0118：收购要约公告不等于期权已经变为固定现金；章节1；课contracts；expansionDerivAdjust；FAQ Tender or exchange offer：要约本身与随后生效的合并调整分别判断
- options-expansion-deriv-0119：开盘结算篮子不必等于最后一只股票开盘时的指数；章节1；课lifecycle；expansionDerivSOQ；第1–2页：SOQ使用各股官方开盘价，不等于某一共同时间的即时指数；题设简化两股等权；复算 (110+90)/2 = 100 开盘结算指数
- options-expansion-deriv-0120：期权停止交易与最终市场风险截止不是同一时点；章节4；课risk；expansionDerivIndexSettlement；AM & PM Settlement：题设周四停交易、周五开盘确定支付、下周一到账；风险确定与资金到账分开
- options-expansion-deriv-0121：收盘虚值价差仍有盘后单腿指派窗口；章节4；课risk；expansionDerivExercise；Options Exercise FAQ Exercise by exception及截止程序；题设盘后仍允许提交有效行权指令
- options-expansion-deriv-0122：没有平仓成交也可因行权减少未平仓量；章节1；课lifecycle；expansionDerivOpenInterest；正文第83行：行权并指派的合约也从未平仓量移除；题设无其他交易或更正；复算 100-20 = 80 张未平仓量
- options-expansion-deriv-0123：远期起始认购按未来重设价衡量涨幅；章节3；课payoffs；expansionDerivVolProducts；PDF第7页表4 Forward Starting Option (ATM)：未来起始日重设基准，按该日之后收益率支付；不使用近似定价式；复算 1000*Math.max(96/80-1,0) = 200 元未来起始认购支付

### futures1

- futures1-expansion-deriv-0001：已锁采购价后再次买入套保；章节1；课futures1-1；expansionDerivCases；案例F1：采购、销售与风险转移的明示条件
- futures1-expansion-deriv-0002：销售价与原料价同时浮动；章节1；课futures1-1；expansionDerivCases；案例F1：采购、销售与风险转移的明示条件
- futures1-expansion-deriv-0003：不确定订单与过度套保；章节1；课futures1-1；expansionDerivCases；案例F1：采购、销售与风险转移的明示条件
- futures1-expansion-deriv-0004：库存融资与价格风险分离；章节1；课futures1-1；expansionDerivCases；案例F1：采购、销售与风险转移的明示条件
- futures1-expansion-deriv-0005：价格发现与单一大单冲击；章节1；课futures1-1；expansionDerivCases；案例F1：采购、销售与风险转移的明示条件
- futures1-expansion-deriv-0006：套保风险降低的方差衡量；章节1；课futures1-1；expansionDerivCases；案例F1：采购、销售与风险转移的明示条件；复算 1-(.5*4+.5*4)/(.5*100+.5*100) = 0.96 方差下降比例
- futures1-expansion-deriv-0007：不同报价单位的合约价值；章节2；课futures1-2；expansionDerivCases；案例F2：题设合约规格、交易计数和订单控制；复算 2000*10-2*10000 = 0 元差额
- futures1-expansion-deriv-0008：最小价位约束与合法限价；章节2；课futures1-2；expansionDerivCases；案例F2：题设合约规格、交易计数和订单控制
- futures1-expansion-deriv-0009：开仓双方与持仓量增加；章节2；课futures1-2；expansionDerivCases；案例F2：题设合约规格、交易计数和订单控制；复算 100+10 = 110 手
- futures1-expansion-deriv-0010：开平换手与持仓量不变；章节2；课futures1-2；expansionDerivCases；案例F2：题设合约规格、交易计数和订单控制
- futures1-expansion-deriv-0011：成交量累计不能当存量；章节2；课futures1-2；expansionDerivCases；案例F2：题设合约规格、交易计数和订单控制
- futures1-expansion-deriv-0012：交易年份省略造成错月风险；章节2；课futures1-2；expansionDerivCases；案例F2：题设合约规格、交易计数和订单控制
- futures1-expansion-deriv-0013：小型合约替代的数量换算；章节2；课futures1-2；expansionDerivCases；案例F2：题设合约规格、交易计数和订单控制；复算 3*50/10 = 15 手
- futures1-expansion-deriv-0014：组合委托部分成交的敞口；章节2；课futures1-2；expansionDerivCases；案例F2：题设合约规格、交易计数和订单控制
- futures1-expansion-deriv-0015：临时结算价更正的增量入账；章节3；课futures1-3；expansionDerivMTM；Mark-to-Market：结算与资金变动；所有制度参数均由题设给出；复算 (104-105)*50*10 = -500 元增量
- futures1-expansion-deriv-0016：收盘涨而当日盯市亏损；章节3；课futures1-3；expansionDerivMTM；Mark-to-Market：结算与资金变动；所有制度参数均由题设给出；复算 99-100 = -1 点
- futures1-expansion-deriv-0017：权益增长中的外部入金剔除；章节3；课futures1-3；expansionDerivMTM；Mark-to-Market：结算与资金变动；所有制度参数均由题设给出；复算 11.9-10-3 = -1.1 万元净交易结果
- futures1-expansion-deriv-0018：保证金释放不是新增利润；章节3；课futures1-3；expansionDerivMTM；Mark-to-Market：结算与资金变动；所有制度参数均由题设给出
- futures1-expansion-deriv-0019：价格盈利与提保同时发生；章节3；课futures1-3；expansionDerivMTM；Mark-to-Market：结算与资金变动；所有制度参数均由题设给出；复算 (12+1-11)-(12-8) = -2 万元
- futures1-expansion-deriv-0020：套保流动性备用额度的可靠性；章节3；课futures1-3；expansionDerivMTM；Mark-to-Market：结算与资金变动；所有制度参数均由题设给出
- futures1-expansion-deriv-0021：保证金不足的时间期限；章节3；课futures1-3；expansionDerivMTM；Mark-to-Market：结算与资金变动；所有制度参数均由题设给出
- futures1-expansion-deriv-0022：连续涨停对空头止损的阻碍；章节3；课futures1-3；expansionDerivMTM；Mark-to-Market：结算与资金变动；所有制度参数均由题设给出
- futures1-expansion-deriv-0023：仓库地区变更的基差敞口；章节4；课futures1-4；expansionDerivBasis；Learn about Basis: Grains：地区、品质、期限与期现匹配
- futures1-expansion-deriv-0024：品质升水改变套保结果；章节4；课futures1-4；expansionDerivBasis；Learn about Basis: Grains：地区、品质、期限与期现匹配
- futures1-expansion-deriv-0025：预期基差与实际基差的预算偏差；章节4；课futures1-4；expansionDerivBasis；Learn about Basis: Grains：地区、品质、期限与期现匹配；复算 (4000-50)-(4000-120) = 70 元/单位
- futures1-expansion-deriv-0026：固定基差采购合同锁住哪一层；章节4；课futures1-4；expansionDerivBasis；Learn about Basis: Grains：地区、品质、期限与期现匹配
- futures1-expansion-deriv-0027：提前终止采购改变套保性质；章节4；课futures1-4；expansionDerivBasis；Learn about Basis: Grains：地区、品质、期限与期现匹配
- futures1-expansion-deriv-0028：套保期与合约月选择；章节4；课futures1-4；expansionDerivBasis；Learn about Basis: Grains：地区、品质、期限与期现匹配
- futures1-expansion-deriv-0029：负相关资产的套保方向；章节4；课futures1-4；expansionDerivBasis；Learn about Basis: Grains：地区、品质、期限与期现匹配
- futures1-expansion-deriv-0030：套保比率估计窗口失效；章节4；课futures1-4；expansionDerivBasis；Learn about Basis: Grains：地区、品质、期限与期现匹配
- futures1-expansion-deriv-0031：按数量而非价值套保的单位错误；章节4；课futures1-4；expansionDerivBasis；Learn about Basis: Grains：地区、品质、期限与期现匹配；复算 500*.8/25 = 16 手
- futures1-expansion-deriv-0032：整数取整后的剩余风险；章节4；课futures1-4；expansionDerivBasis；Learn about Basis: Grains：地区、品质、期限与期现匹配
- futures1-expansion-deriv-0033：价差定义反转后的方向；章节5；课futures1-5；expansionDerivCases；案例F5：价差定义、转换关系和可执行套利成本
- futures1-expansion-deriv-0034：同吨数跨品种忽略加工收率；章节5；课futures1-5；expansionDerivCases；案例F5：价差定义、转换关系和可执行套利成本
- futures1-expansion-deriv-0035：正毛价差覆盖不了双腿费用；章节5；课futures1-5；expansionDerivCases；案例F5：价差定义、转换关系和可执行套利成本；复算 6-3-2-2 = -1 元/单位
- futures1-expansion-deriv-0036：现金套利的仓储容量约束；章节5；课futures1-5；expansionDerivCases；案例F5：价差定义、转换关系和可执行套利成本
- futures1-expansion-deriv-0037：反向套利的融券可得性；章节5；课futures1-5；expansionDerivCases；案例F5：价差定义、转换关系和可执行套利成本
- futures1-expansion-deriv-0038：统计套利止损与均值变化；章节5；课futures1-5；expansionDerivCases；案例F5：价差定义、转换关系和可执行套利成本
- futures1-expansion-deriv-0039：价差小风险与毛头寸大风险；章节5；课futures1-5；expansionDerivCases；案例F5：价差定义、转换关系和可执行套利成本
- futures1-expansion-deriv-0040：两市场合约不可直接交付；章节5；课futures1-5；expansionDerivCases；案例F5：价差定义、转换关系和可执行套利成本
- futures1-expansion-deriv-0041：期货期权行权生成的仓位；章节6；课futures1-6；expansionDerivCases；案例F6：期货期权及企业采购保险的明示合同
- futures1-expansion-deriv-0042：采购商选择保险而非锁价；章节6；课futures1-6；expansionDerivCases；案例F6：期货期权及企业采购保险的明示合同
- futures1-expansion-deriv-0043：期货认沽参照期货价格；章节6；课futures1-6；expansionDerivCases；案例F6：期货期权及企业采购保险的明示合同；复算 Math.max(500-480,0) = 20 元/单位
- futures1-expansion-deriv-0044：销售底价与保险费的净口径；章节6；课futures1-6；expansionDerivCases；案例F6：期货期权及企业采购保险的明示合同；复算 2000-60 = 1940 元/单位
- futures1-expansion-deriv-0045：低权利金不等于低保险缺口；章节6；课futures1-6；expansionDerivCases；案例F6：期货期权及企业采购保险的明示合同
- futures1-expansion-deriv-0046：模型负Beta目标与套保授权冲突；章节7；课futures1-7；expansionDerivCases；案例F7：股指、利率、外汇的明示简化模型
- futures1-expansion-deriv-0047：组合市值变化后的套保重估；章节7；课futures1-7；expansionDerivCases；案例F7：股指、利率、外汇的明示简化模型
- futures1-expansion-deriv-0048：离散分红与连续股息率口径；章节7；课futures1-7；expansionDerivCases；案例F7：股指、利率、外汇的明示简化模型
- futures1-expansion-deriv-0049：债券久期相同但DV01不同；章节7；课futures1-7；expansionDerivDV01；第2页 Method #2: Modified Duration；题设平行小变动；复算 (2000*5*.0001)/(1000*5*.0001) = 2 倍
- futures1-expansion-deriv-0050：交付凭证的低费持有权不能当作裸现粮；章节3；课futures1-3；expansionDerivDeliveryInstrument；Why Did Convergence Fail及Storage Fees：交付凭证低费储存权与现粮不同；数字与期限均为教学假设；复算 (100+3*2)-(103+1*2) = 1 元/吨选择持证的两月总成本节省
- futures1-expansion-deriv-0051：转换因子不是可交割券市价；章节7；课futures1-7；expansionDerivTreasury；Vocabulary：CTD、Yield、Conversion Factor；公式依题设
- futures1-expansion-deriv-0052：最便宜可交割券切换的影响；章节7；课futures1-7；expansionDerivDV01；第2页 Calculating the DV01 of a U.S. Treasury Futures Contract
- futures1-expansion-deriv-0053：出口收汇的报价方向；章节7；课futures1-7；expansionDerivFX；Identifying Currencies、Currency Pairs；题设人民币/美元报价
- futures1-expansion-deriv-0054：倒数汇率涨跌误读；章节7；课futures1-7；expansionDerivFX；Identifying Currencies、Currency Pairs；题设人民币/美元报价
- futures1-expansion-deriv-0055：外币利润与本币回报分离；章节7；课futures1-7；expansionDerivFX；Identifying Currencies、Currency Pairs；题设人民币/美元报价
- futures1-expansion-deriv-0056：内部转库与总供应重复统计；章节8；课futures1-8；expansionDerivCases；案例F8：数据可得性、预测验证和可执行回测；复算 100-100 = 0 万吨总库存变化
- futures1-expansion-deriv-0057：可交割库存与社会库存区别；章节8；课futures1-8；expansionDerivCases；案例F8：数据可得性、预测验证和可执行回测
- futures1-expansion-deriv-0058：产能与实际产量混同；章节8；课futures1-8；expansionDerivCases；案例F8：数据可得性、预测验证和可执行回测
- futures1-expansion-deriv-0059：连续合约跳空与可交易收益；章节8；课futures1-8；expansionDerivCases；案例F8：数据可得性、预测验证和可执行回测
- futures1-expansion-deriv-0060：复权价格用于成交的偏差；章节8；课futures1-8；expansionDerivCases；案例F8：数据可得性、预测验证和可执行回测
- futures1-expansion-deriv-0061：修订数据造成前视偏差；章节8；课futures1-8；expansionDerivCases；案例F8：数据可得性、预测验证和可执行回测
- futures1-expansion-deriv-0062：参数搜索后的样本外验证；章节8；课futures1-8；expansionDerivCases；案例F8：数据可得性、预测验证和可执行回测
- futures1-expansion-deriv-0063：同一风险因子的假多策略；章节8；课futures1-8；expansionDerivCases；案例F8：数据可得性、预测验证和可执行回测
- futures1-expansion-deriv-0064：抵押品折扣后的可用担保；章节9；课futures1-9；expansionDerivCCR；CRE52.5、52.10–11：非现金抵押折扣；题设折扣并非监管参数；复算 100*(1-.2) = 80 万元
- futures1-expansion-deriv-0065：抵押品与风险同向恶化；章节9；课futures1-9；expansionDerivCredit；SRP32.3抵押缓释残余风险；32.24(1)不利相关风险
- futures1-expansion-deriv-0066：名义本金与重置成本区别；章节9；课futures1-9；expansionDerivCCR；CRE52.3、52.10：当前重置成本；不计算完整违约风险暴露
- futures1-expansion-deriv-0067：不同法律实体净额的边界；章节9；课futures1-9；expansionDerivCCR；CRE52.7–8：有效净额协议和法律可执行性；题设跨实体条件
- futures1-expansion-deriv-0068：压力测试概率的误读；章节9；课futures1-9；expansionDerivCredit；SRP32.20–21：当前/未来敞口及压力测试；情景概率由题设区分
- futures1-expansion-deriv-0069：VaR时间尺度与持仓变现期；章节9；课futures1-9；expansionDerivCredit；SRP32.20–21：当前/未来敞口及压力测试；情景概率由题设区分
- futures1-expansion-deriv-0070：交易与核算由同一人控制；章节9；课futures1-9；expansionDerivCredit；SRP32.23：独立审查、数据、估值及流程；企业场景为原创治理应用
- futures1-expansion-deriv-0071：远期现金流净额不等于风险消失；章节9；课futures1-9；expansionDerivCases；案例F9末：题设条件性收款与确定付款
- futures1-expansion-deriv-0072：最后交易日与首次通知日区别；章节2；课futures1-2；expansionDerivRoll；Understanding Futures Expiration & Contract Roll：到期处置和移仓
- futures1-expansion-deriv-0073：移仓不是延长原合同；章节2；课futures1-2；expansionDerivRoll；Understanding Futures Expiration & Contract Roll：到期处置和移仓
- futures1-expansion-deriv-0074：现金结算仍有最后结算现金流；章节2；课futures1-2；expansionDerivRoll；Understanding Futures Expiration & Contract Roll：到期处置和移仓
- futures1-expansion-deriv-0075：移仓价差与双腿执行计划；章节2；课futures1-2；expansionDerivRoll；Understanding Futures Expiration & Contract Roll：到期处置和移仓
- futures1-expansion-deriv-0076：远期约定价格不会随估值改写；章节7；课futures1-7；expansionDerivForward；公开Summary：合约定价与存续期价值，题设无摩擦模型
- futures1-expansion-deriv-0077：远期替换价差的贴现时点；章节7；课futures1-7；expansionDerivForward；公开Summary：合约定价与存续期价值，题设无摩擦模型；复算 (110-100)*.95 = 9.5 元当前价值
- futures1-expansion-deriv-0078：远期估值只包含剩余现金收益；章节7；课futures1-7；expansionDerivForward；公开Summary：合约定价与存续期价值，题设无摩擦模型
- futures1-expansion-deriv-0079：预付仓储费的融资成本；章节7；课futures1-7；expansionDerivForward；公开Summary：合约定价与存续期价值，题设无摩擦模型；复算 (100+5)*1.04 = 109.2 元/单位
- futures1-expansion-deriv-0080：远期与期货现金流路径的利息差；章节7；课futures1-7；expansionDerivForward；公开Summary：合约定价与存续期价值，题设无摩擦模型；复算 100*1.01-100 = 1 元终值差额
- futures1-expansion-deriv-0081：负期货价格下的绝对损益；章节7；课futures1-7；expansionDerivForward；公开Summary：合约定价与存续期价值，题设无摩擦模型；复算 (-3-5)*10 = -80 元/手
- futures1-expansion-deriv-0082：结算后市值归零不抹去累计损益；章节7；课futures1-7；expansionDerivForward；公开Summary：合约定价与存续期价值，题设无摩擦模型
- futures1-expansion-deriv-0083：全额资金化期货的收益组成；章节7；课futures1-7；expansionDerivForward；公开Summary：合约定价与存续期价值，题设无摩擦模型；复算 -2+.5 = -1.5 万元组合损益
- futures1-expansion-deriv-0084：便利收益不是可支付的现金股息；章节5；课futures1-5；expansionDerivCarry；Contango/Backwardation正文：融资、仓储、便利收益；原创约束案例
- futures1-expansion-deriv-0085：消费品反向套利的供货约束；章节5；课futures1-5；expansionDerivCarry；Contango/Backwardation正文：融资、仓储、便利收益；原创约束案例
- futures1-expansion-deriv-0086：不可经济储存商品的模型边界；章节5；课futures1-5；expansionDerivCarry；Contango/Backwardation正文：融资、仓储、便利收益；原创约束案例
- futures1-expansion-deriv-0087：升水结构不保证未来现货上涨；章节5；课futures1-5；expansionDerivCarry；Contango/Backwardation正文：融资、仓储、便利收益；原创约束案例
- futures1-expansion-deriv-0088：季节性跨月价差的错基准；章节5；课futures1-5；expansionDerivCarry；Contango/Backwardation正文：融资、仓储、便利收益；原创约束案例
- futures1-expansion-deriv-0089：卷动收益与曲线未来变化；章节5；课futures1-5；expansionDerivCarry；Contango/Backwardation正文：融资、仓储、便利收益；原创约束案例
- futures1-expansion-deriv-0090：原料与汇率双变量的未套保部分；章节4；课futures1-4；expansionDerivCases；案例B4：多因素经营敞口、现金流日期与最小方差定义
- futures1-expansion-deriv-0091：销售提价传导对净敞口的影响；章节4；课futures1-4；expansionDerivCases；案例B4：多因素经营敞口、现金流日期与最小方差定义
- futures1-expansion-deriv-0092：自动调价滞后留下时间风险；章节4；课futures1-4；expansionDerivCases；案例B4：多因素经营敞口、现金流日期与最小方差定义
- futures1-expansion-deriv-0093：平均价采购与单日到期对冲；章节4；课futures1-4；expansionDerivCases；案例B4：多因素经营敞口、现金流日期与最小方差定义
- futures1-expansion-deriv-0094：分批确定价格的剩余敞口台账；章节4；课futures1-4；expansionDerivCases；案例B4：多因素经营敞口、现金流日期与最小方差定义；复算 1000-600 = 400 吨未点价敞口
- futures1-expansion-deriv-0095：反向回归斜率不能直接倒置套保；章节4；课futures1-4；expansionDerivCases；案例B4：多因素经营敞口、现金流日期与最小方差定义
- futures1-expansion-deriv-0096：回归收益率比率与价格比率混用；章节4；课futures1-4；expansionDerivCases；案例B4：多因素经营敞口、现金流日期与最小方差定义
- futures1-expansion-deriv-0097：价格敞口对冲不能保险实物毁损；章节4；课futures1-4；expansionDerivCases；案例B4：多因素经营敞口、现金流日期与最小方差定义
- futures1-expansion-deriv-0098：最便宜可交割不是现券价最低；章节7；课futures1-7；expansionDerivDV01；第2页CTD、转换因子与风险匹配；所有报价均为题设值；复算 (101-100.8)-(99-98.5) = -0.3 A减B的净成本差
- futures1-expansion-deriv-0099：转换因子映射期货DV01；章节7；课futures1-7；expansionDerivDV01；第2页CTD、转换因子与风险匹配；所有报价均为题设值；复算 76/.95 = 80 元/基点
- futures1-expansion-deriv-0100：国债期货全价交割金额的规模；章节7；课futures1-7；expansionDerivDV01；第2页CTD、转换因子与风险匹配；所有报价均为题设值；复算 (102*.98+1.2)*1000000/100 = 1011600 元/手
- futures1-expansion-deriv-0101：票息不由期货名义票面支付；章节7；课futures1-7；expansionDerivDV01；第2页CTD、转换因子与风险匹配；所有报价均为题设值
- futures1-expansion-deriv-0102：利率大幅变化下的凸性残差；章节7；课futures1-7；expansionDerivDV01；第2页CTD、转换因子与风险匹配；所有报价均为题设值
- futures1-expansion-deriv-0103：已知票息与债券远期持有成本；章节7；课futures1-7；expansionDerivDV01；第2页CTD、转换因子与风险匹配；所有报价均为题设值
- futures1-expansion-deriv-0104：FRA提前结算的折现调整；章节7；课futures1-7；expansionDerivForward；公开Introduction/Summary：FRA、互换与复制；结算约定全部题设；复算 1000000*(.06-.04)*.5/(1+.06*.5) = 9708.73786407767 元
- futures1-expansion-deriv-0105：FRA保护借款利率的收付方向；章节7；课futures1-7；expansionDerivForward；公开Introduction/Summary：FRA、互换与复制；结算约定全部题设
- futures1-expansion-deriv-0106：摊还贷款与固定名义互换错配；章节7；课futures1-7；expansionDerivForward；公开Introduction/Summary：FRA、互换与复制；结算约定全部题设
- futures1-expansion-deriv-0107：贷款零利率地板与互换负浮息；章节7；课futures1-7；expansionDerivForward；公开Introduction/Summary：FRA、互换与复制；结算约定全部题设；复算 Math.max(-.01,0)+.01+.03-(-.01) = 0.05 综合年化成本
- futures1-expansion-deriv-0108：互换重置日与付款日不同；章节7；课futures1-7；expansionDerivForward；公开Introduction/Summary：FRA、互换与复制；结算约定全部题设
- futures1-expansion-deriv-0109：期初零价值不等于互换免费无风险；章节7；课futures1-7；expansionDerivForward；公开Introduction/Summary：FRA、互换与复制；结算约定全部题设
- futures1-expansion-deriv-0110：互换已付息与剩余市值重复计入；章节7；课futures1-7；expansionDerivForward；公开Introduction/Summary：FRA、互换与复制；结算约定全部题设
- futures1-expansion-deriv-0111：互换净票息与提前终止价区别；章节7；课futures1-7；expansionDerivForward；公开Introduction/Summary：FRA、互换与复制；结算约定全部题设
- futures1-expansion-deriv-0112：名义利率相等但计息惯例不同；章节7；课futures1-7；expansionDerivForward；公开Introduction/Summary：FRA、互换与复制；结算约定全部题设
- futures1-expansion-deriv-0113：交叉汇率的单位链条；章节7；课futures1-7；expansionDerivFX；Currency Pairs：基础币/报价币；原创交叉汇率和点数约定；复算 1.2*7 = 8.4 人民币/欧元
- futures1-expansion-deriv-0114：外汇远期点数的尺度；章节7；课futures1-7；expansionDerivFX；Currency Pairs：基础币/报价币；原创交叉汇率和点数约定；复算 1.25-40*.0001 = 1.246 美元/欧元
- futures1-expansion-deriv-0115：负远期点的双边可执行报价；章节7；课futures1-7；expansionDerivFX；Currency Pairs：基础币/报价币；原创交叉汇率和点数约定；复算 1.2490-50*.0001 = 1.244 美元/欧元可执行买价
- futures1-expansion-deriv-0116：交叉货币风险不能按本币金额相消；章节7；课futures1-7；expansionDerivFX；Currency Pairs：基础币/报价币；原创交叉汇率和点数约定
- futures1-expansion-deriv-0117：外汇本金交付后的信用风险；章节9；课futures1-9；expansionDerivFXRisk；BIS 2026 FX settlement risk：本金风险、PvP、重置和流动性
- futures1-expansion-deriv-0118：PvP仍留下未到款的流动性问题；章节9；课futures1-9；expansionDerivFXRisk；BIS 2026 FX settlement risk：本金风险、PvP、重置和流动性
- futures1-expansion-deriv-0119：外汇掉期的两次本金交换；章节9；课futures1-9；expansionDerivFXRisk；BIS 2026 FX settlement risk：本金风险、PvP、重置和流动性
- futures1-expansion-deriv-0120：交收净额必须匹配价值日；章节9；课futures1-9；expansionDerivFXRisk；BIS 2026 FX settlement risk：本金风险、PvP、重置和流动性
- futures1-expansion-deriv-0121：取消截止后至收币前的风险窗口；章节9；课futures1-9；expansionDerivFXRisk；BIS 2026 FX settlement risk：本金风险、PvP、重置和流动性
- futures1-expansion-deriv-0122：负市值不等于未来没有对手风险；章节9；课futures1-9；expansionDerivCCR；CRE52.3–12：当前重置成本与潜在未来暴露；案例B5
- futures1-expansion-deriv-0123：预期敞口与预期市值取正的次序；章节9；课futures1-9；expansionDerivCCR；CRE52.3–12：当前重置成本与潜在未来暴露；案例B5；复算 (.5*Math.max(10,0)+.5*Math.max(-10,0)) = 5 万元EE
- futures1-expansion-deriv-0124：平均敞口与分位信用额度的用途；章节9；课futures1-9；expansionDerivCCR；CRE52.3–12：当前重置成本与潜在未来暴露；案例B5
- futures1-expansion-deriv-0125：同情景净额与逐笔敞口相加；章节9；课futures1-9；expansionDerivCCR；CRE52.3–12：当前重置成本与潜在未来暴露；案例B5；复算 .5*Math.max(10-10,0)+.5*Math.max(-10+10,0) = 0 万元净额组EE
- futures1-expansion-deriv-0126：超额抵押的当前敞口下界；章节9；课futures1-9；expansionDerivCCR；CRE52.3–12：当前重置成本与潜在未来暴露；案例B5；复算 Math.max(70-90,0) = 0 万元当前重置成本
- futures1-expansion-deriv-0127：抵押门槛与实际应追缴额；章节9；课futures1-9；expansionDerivCCR；CRE52.14–19：门槛、最低划转额、独立抵押；具体合同阈值由题设给出；复算 Math.max(65-20,0)-30 = 15 万元追加抵押
- futures1-expansion-deriv-0128：最低划转额不是永远免交的扣减；章节9；课futures1-9；expansionDerivCCR；CRE52.14–19：门槛、最低划转额、独立抵押；具体合同阈值由题设给出
- futures1-expansion-deriv-0129：单向抵押协议的保护方向；章节9；课futures1-9；expansionDerivCCR；CRE52.14–19：门槛、最低划转额、独立抵押；具体合同阈值由题设给出
- futures1-expansion-deriv-0130：初始保证金与变动保证金的用途；章节9；课futures1-9；expansionDerivCCR；CRE52.14–19：门槛、最低划转额、独立抵押；具体合同阈值由题设给出
- futures1-expansion-deriv-0131：保证金风险期与剩余期限区分；章节9；课futures1-9；expansionDerivCCR；CRE52.14–19：门槛、最低划转额、独立抵押；具体合同阈值由题设给出
- futures1-expansion-deriv-0132：抵押市价和折扣同时变化；章节9；课futures1-9；expansionDerivCredit；SRP32.3、32.17、32.23：抵押品实现、操作和估值风险；原创协议案例；复算 100*.9-80*.75 = 30 万元认可担保减少
- futures1-expansion-deriv-0133：抵押争议中的无争议金额履行；章节9；课futures1-9；expansionDerivCredit；SRP32.3、32.17、32.23：抵押品实现、操作和估值风险；原创协议案例
- futures1-expansion-deriv-0134：不可及时变现抵押的资金错觉；章节9；课futures1-9；expansionDerivCredit；SRP32.3、32.17、32.23：抵押品实现、操作和估值风险；原创协议案例
- futures1-expansion-deriv-0135：每日补保仍留下盘中缺口；章节9；课futures1-9；expansionDerivCredit；SRP32.3、32.17、32.23：抵押品实现、操作和估值风险；原创协议案例
- futures1-expansion-deriv-0136：交易压缩的风险收益边界；章节9；课futures1-9；expansionDerivCredit；SRP32.3、32.17、32.23：抵押品实现、操作和估值风险；原创协议案例
- futures1-expansion-deriv-0137：新对手承接不等于原对手自动解除；章节9；课futures1-9；expansionDerivCredit；SRP32.3、32.17、32.23：抵押品实现、操作和估值风险；原创协议案例
- futures1-expansion-deriv-0138：报价中值与实际平仓成本；章节9；课futures1-9；expansionDerivCredit；SRP32.3、32.17、32.23：抵押品实现、操作和估值风险；原创协议案例
- futures1-expansion-deriv-0139：评级触发条款会在市值不变时追加抵押；章节9；课futures1-9；expansionDerivLiquidity；LQY10.45及10.102：评级触发的追加抵押需求；题设约定门槛与立即补足；复算 (60-0)-40 = 20 万元评级触发追加抵押
- futures1-expansion-deriv-0140：异步收盘造成虚假领先关系；章节8；课futures1-8；expansionDerivCases；案例B6：原创期货回测、数据和可执行性审查
- futures1-expansion-deriv-0141：用当前保证金回填全部历史；章节8；课futures1-8；expansionDerivCases；案例B6：原创期货回测、数据和可执行性审查
- futures1-expansion-deriv-0142：随机打散时间序列的验证误区；章节8；课futures1-8；expansionDerivCases；案例B6：原创期货回测、数据和可执行性审查
- futures1-expansion-deriv-0143：全样本标准化的未来信息；章节8；课futures1-8；expansionDerivCases；案例B6：原创期货回测、数据和可执行性审查
- futures1-expansion-deriv-0144：一根K线同时触发止盈止损；章节8；课futures1-8；expansionDerivCases；案例B6：原创期货回测、数据和可执行性审查
- futures1-expansion-deriv-0145：限价触及不保证回测成交；章节8；课futures1-8；expansionDerivCases；案例B6：原创期货回测、数据和可执行性审查
- futures1-expansion-deriv-0146：多策略重复使用同一盘口容量；章节8；课futures1-8；expansionDerivCases；案例B6：原创期货回测、数据和可执行性审查
- futures1-expansion-deriv-0147：缺失行情填零收益的低波动假象；章节8；课futures1-8；expansionDerivCases；案例B6：原创期货回测、数据和可执行性审查
- futures1-expansion-deriv-0148：负价格使对数收益不可直接使用；章节8；课futures1-8；expansionDerivCases；案例B6：原创期货回测、数据和可执行性审查
- futures1-expansion-deriv-0149：主动买入成交不等于新增多仓；章节2；课futures1-2；expansionDerivCases；案例B7：题设撮合指令、报价有效性和交易记录
- futures1-expansion-deriv-0150：全成或撤与部分成交的业务约束；章节2；课futures1-2；expansionDerivCases；案例B7：题设撮合指令、报价有效性和交易记录
- futures1-expansion-deriv-0151：修改数量后的排队优先级；章节2；课futures1-2；expansionDerivCases；案例B7：题设撮合指令、报价有效性和交易记录
- futures1-expansion-deriv-0152：仅供参考报价不能锁定套利；章节2；课futures1-2；expansionDerivCases；案例B7：题设撮合指令、报价有效性和交易记录
- futures1-expansion-deriv-0153：成交确认中的收付视角反转；章节2；课futures1-2；expansionDerivCases；案例B7：题设撮合指令、报价有效性和交易记录
- futures1-expansion-deriv-0154：交易回报重复与持仓重建；章节2；课futures1-2；expansionDerivCases；案例B7：题设撮合指令、报价有效性和交易记录
- futures1-expansion-deriv-0155：撤销成交与另做反向交易的区别；章节2；课futures1-2；expansionDerivCases；案例B7：题设撮合指令、报价有效性和交易记录
- futures1-expansion-deriv-0156：等金额多空不等于市场Beta中性；章节7；课futures1-7；expansionDerivForward；公开Summary：现金流复制及互换；新增风险因子由题设明确；复算 1000*1.4-1000*.8 = 600 万元Beta加权净敞口
- futures1-expansion-deriv-0157：不同浮动基准的互换基差；章节7；课futures1-7；expansionDerivForward；公开Summary：现金流复制及互换；新增风险因子由题设明确
- futures1-expansion-deriv-0158：股票总回报互换的分红遗漏；章节7；课futures1-7；expansionDerivForward；公开Summary：现金流复制及互换；新增风险因子由题设明确
- futures1-expansion-deriv-0159：重置名义金额后的回报基数；章节7；课futures1-7；expansionDerivForward；公开Summary：现金流复制及互换；新增风险因子由题设明确；复算 110*.1 = 11 万元第二季回报
- futures1-expansion-deriv-0160：包装毛重不能当合格交割净重；章节2；课futures1-2；expansionDerivCases；案例B8：原创实物交割约定；数量、时间及单证以题设为准；复算 (102-2)/10 = 10 手
- futures1-expansion-deriv-0161：干物质量口径的数量换算；章节2；课futures1-2；expansionDerivCases；案例B8：原创实物交割约定；数量、时间及单证以题设为准；复算 100*(1-.2) = 80 吨干物质
- futures1-expansion-deriv-0162：仓单有效期早于交割日；章节2；课futures1-2；expansionDerivCases；案例B8：原创实物交割约定；数量、时间及单证以题设为准
- futures1-expansion-deriv-0163：检验和运输并行条件的关键路径；章节2；课futures1-2；expansionDerivCases；案例B8：原创实物交割约定；数量、时间及单证以题设为准；复算 3+2-4 = 1 天时间缺口
- futures1-expansion-deriv-0164：仓单部分注销与质押释放的可用量；章节2；课futures1-2；expansionDerivCases；案例B8：原创实物交割约定；数量、时间及单证以题设为准；复算 100-20-(50-15) = 45 吨可交割仓单
- futures1-expansion-deriv-0165：期货结束不自动结束仓储计费；章节2；课futures1-2；expansionDerivCases；案例B8：原创实物交割约定；数量、时间及单证以题设为准
- futures1-expansion-deriv-0166：可选择交割地点与买方物流预算；章节2；课futures1-2；expansionDerivCases；案例B8：原创实物交割约定；数量、时间及单证以题设为准
- futures1-expansion-deriv-0167：提货权取得与现货销售回款不同；章节2；课futures1-2；expansionDerivCases；案例B8：原创实物交割约定；数量、时间及单证以题设为准
- futures1-expansion-deriv-0168：逐批品质门槛不能用合并均值替代；章节2；课futures1-2；expansionDerivCases；案例B8：原创实物交割约定；数量、时间及单证以题设为准
- futures1-expansion-deriv-0169：运输保险与交割合格性的区别；章节2；课futures1-2；expansionDerivCases；案例B8：原创实物交割约定；数量、时间及单证以题设为准
- futures1-expansion-deriv-0170：补足差额现金不等于完成实物交割；章节2；课futures1-2；expansionDerivCases；案例B8：原创实物交割约定；数量、时间及单证以题设为准
- futures1-expansion-deriv-0171：移动平均更新必须移出旧观测；章节8；课futures1-8；expansionDerivMA；Calculating Moving Average：滚动窗口、指数平滑；案例C1；复算 (5*100-90+110)/5 = 104 价格单位
- futures1-expansion-deriv-0172：EMA递推中的新旧权重；章节8；课futures1-8；expansionDerivMA；Calculating Moving Average：滚动窗口、指数平滑；案例C1；复算 .25*108+.75*100 = 102 EMA价格单位
- futures1-expansion-deriv-0173：EMA初始化差异与预热窗口；章节8；课futures1-8；expansionDerivMA；Calculating Moving Average：滚动窗口、指数平滑；案例C1
- futures1-expansion-deriv-0174：均线多头排列与新发生上穿不同；章节8；课futures1-8；expansionDerivMA；Calculating Moving Average：滚动窗口、指数平滑；案例C1
- futures1-expansion-deriv-0175：指标周期数与实际时间跨度；章节8；课futures1-8；expansionDerivMA；Calculating Moving Average：滚动窗口、指数平滑；案例C1
- futures1-expansion-deriv-0176：未完成K线信号与收盘确认；章节8；课futures1-8；expansionDerivMA；Calculating Moving Average：滚动窗口、指数平滑；案例C1
- futures1-expansion-deriv-0177：MACD零轴与信号线的不同比较；章节8；课futures1-8；expansionDerivOsc；MACD、RSI与背离；全部算式和配对时点按题设
- futures1-expansion-deriv-0178：MACD跨品种比较的价格尺度；章节8；课futures1-8；expansionDerivOsc；MACD、RSI与背离；全部算式和配对时点按题设
- futures1-expansion-deriv-0179：RSI使用平均上涨和下跌幅度；章节8；课futures1-8；expansionDerivOsc；MACD、RSI与背离；全部算式和配对时点按题设；复算 100-100/(1+.8/.2) = 80 RSI
- futures1-expansion-deriv-0180：全平窗口的RSI零除约定；章节8；课futures1-8；expansionDerivOsc；MACD、RSI与背离；全部算式和配对时点按题设
- futures1-expansion-deriv-0181：区间位置与当日阴阳线可并存；章节8；课futures1-8；expansionDerivOsc；MACD、RSI与背离；全部算式和配对时点按题设；复算 100*(98-80)/(100-80) = 90 K值
- futures1-expansion-deriv-0182：背离判断必须配对同一价格波峰；章节8；课futures1-8；expansionDerivOsc；MACD、RSI与背离；全部算式和配对时点按题设
- futures1-expansion-deriv-0183：布林上下轨扩张与中心不变；章节8；课futures1-8；expansionDerivBands；Description/Calculation：上下轨的均值与标准差分解
- futures1-expansion-deriv-0184：真实波幅不能遗漏隔夜缺口；章节8；课futures1-8；expansionDerivATR；Calculation：真实波幅取当日区间及相对昨收的最大值；复算 Math.max(112-109,Math.abs(112-100),Math.abs(109-100)) = 12 价格单位TR
- futures1-expansion-deriv-0185：VWAP基准不是逐笔价格等权平均；章节8；课futures1-8；expansionDerivFix；Fixing price：成交量加权与明确窗口；原创基准比较；复算 (100*1+110*9)/10-108 = 1 元低于窗口VWAP
- futures1-expansion-deriv-0186：等距对数刻度与等额涨幅不同；章节8；课futures1-8；expansionDerivCases；案例C2：图表坐标与价格数据解释；数学尺度由题设明确
- futures1-expansion-deriv-0187：供需平衡中的期末库存残值；章节8；课futures1-8；expansionDerivGrains；Data Items：供给、使用、库存、收获面积和营销年度；案例C3；复算 20+100+10-85-25 = 20 万吨期末库存
- futures1-expansion-deriv-0188：收获面积不能替换为播种面积；章节8；课futures1-8；expansionDerivGrains；Data Items：供给、使用、库存、收获面积和营销年度；案例C3；复算 (100-10)*6 = 540 万吨产量
- futures1-expansion-deriv-0189：库存增加但库存使用比下降；章节8；课futures1-8；expansionDerivGrains；Data Items：供给、使用、库存、收获面积和营销年度；案例C3；复算 22/125*100 = 17.6 新库存使用比百分数
- futures1-expansion-deriv-0190：营销年度与日历年度的需求错配；章节8；课futures1-8；expansionDerivGrains；Data Items：供给、使用、库存、收获面积和营销年度；案例C3
- futures1-expansion-deriv-0191：未装运销售承诺与实际出口的关系；章节8；课futures1-8；expansionDerivGrains；Data Items：供给、使用、库存、收获面积和营销年度；案例C3；复算 30+12-2-8 = 32 万吨未装运量
- futures1-expansion-deriv-0192：残差饲用量不能当直接观测需求；章节8；课futures1-8；expansionDerivGrains；Data Items：供给、使用、库存、收获面积和营销年度；案例C3
- futures1-expansion-deriv-0193：总产量不变而食用品质供给下降；章节8；课futures1-8；expansionDerivCrop；Weather、Price of Inputs、Other factors：分层供需渠道；原创情景
- futures1-expansion-deriv-0194：同样降雨在不同作物阶段的解释；章节8；课futures1-8；expansionDerivCrop；Weather、Price of Inputs、Other factors：分层供需渠道；原创情景
- futures1-expansion-deriv-0195：出口受限的内外市场分化；章节8；课futures1-8；expansionDerivCrop；Weather、Price of Inputs、Other factors：分层供需渠道；原创情景
- futures1-expansion-deriv-0196：农户年度均价不是年末可成交现价；章节8；课futures1-8；expansionDerivGrains；Data Items：农户年度均价、动物单位和用途差异；原创分析
- futures1-expansion-deriv-0197：牲畜头数相同不代表饲料需求相同；章节8；课futures1-8；expansionDerivGrains；Data Items：农户年度均价、动物单位和用途差异；原创分析
- futures1-expansion-deriv-0198：共同土地约束下的相对种植收益；章节8；课futures1-8；expansionDerivCases；案例C4：原创受约束生产、收入风险及供需识别模型
- futures1-expansion-deriv-0199：加工停产决策不能只看含固定成本利润；章节8；课futures1-8；expansionDerivCases；案例C4：原创受约束生产、收入风险及供需识别模型；复算 100-80 = 20 元/吨相对停产现金改善
- futures1-expansion-deriv-0200：产量价格相关时的预期收入；章节8；课futures1-8；expansionDerivCases；案例C4：原创受约束生产、收入风险及供需识别模型；复算 .5*120*2+.5*80*3 = 240 万元预期销售收入
- futures1-expansion-deriv-0201：价格数量同降与需求移动的识别；章节8；课futures1-8；expansionDerivCases；案例C4：原创受约束生产、收入风险及供需识别模型
- futures1-expansion-deriv-0202：需求弹性与支出变化不能混同；章节8；课futures1-8；expansionDerivCases；案例C4：原创受约束生产、收入风险及供需识别模型；复算 .9*1.03*100 = 92.7 新支出占原支出百分数
- futures1-expansion-deriv-0203：采购合同价格上限改变局部套保量；章节4；课futures1-4；expansionDerivCases；案例D4：含价格上限、保底付款和数量选择权的实体合同风险映射
- futures1-expansion-deriv-0204：最低付款数量与实际耗用量不同；章节4；课futures1-4；expansionDerivCases；案例D4：含价格上限、保底付款和数量选择权的实体合同风险映射
- futures1-expansion-deriv-0205：买方数量选择权使成交量依赖价格；章节4；课futures1-4；expansionDerivCases；案例D4：含价格上限、保底付款和数量选择权的实体合同风险映射
- futures1-expansion-deriv-0206：期转现配对中实物买方的期货方向；章节5；课futures1-5；expansionDerivCases；案例D5：期现配对、跨月恒等与执行后的风险净额；规则均为题设
- futures1-expansion-deriv-0207：跨月价差三角关系的中间月份抵销；章节5；课futures1-5；expansionDerivCases；案例D5：期现配对、跨月恒等与执行后的风险净额；规则均为题设；复算 6-(2+3) = 1 复制价差偏离
- futures1-expansion-deriv-0208：固定比例组合后的残余DV01微调；章节7；课futures1-7；expansionDerivICS；ICS Components/Statistics：交易腿数比与DV01权重分离；题设组合；复算 (2*100-4*40)/40 = 1 需额外买A手数
- futures1-expansion-deriv-0209：净变动报价与有符号价差水平；章节7；课futures1-7；expansionDerivICS；ICS Components/Statistics：交易腿数比与DV01权重分离；题设组合；复算 50+4 = 54 完整价差水平
- futures1-expansion-deriv-0210：货权已转让的延后定价销售；章节9；课futures1-9；expansionDerivCases；案例D6：实体延后定价的信用暴露与组合担保变化
- futures1-expansion-deriv-0211：抵押折扣合格仍须满足发行人集中上限；章节9；课futures1-9；expansionDerivCases；案例D6：实体延后定价的信用暴露与组合担保变化；复算 80*(1-.4)-40 = 8 万元最少新增现金
- futures1-expansion-deriv-0212：NDF差额从报价币换为结算币；章节7；课futures1-7；expansionDerivNDF；NDF差额结算定义；报价、名义币及换算公式全部由题设明确；复算 (7.2-7)*1000000/7.2 = 27777.77777777778 美元应收NDF差额
- futures1-expansion-deriv-0213：100减利率报价下的套保方向；章节7；课futures1-7；expansionDerivSOFR；Price=100 minus rate、已知与未定参考期、日数加权、最终结算精度；所有条款均题设
- futures1-expansion-deriv-0214：月平均期货中的未实现利率反推；章节7；课futures1-7；expansionDerivSOFR；Price=100 minus rate、已知与未定参考期、日数加权、最终结算精度；所有条款均题设；复算 (30*4-20*3.5)/10 = 5 剩余十天隐含年利率百分数
- futures1-expansion-deriv-0215：隔夜利率观测需按覆盖自然日加权；章节7；课futures1-7；expansionDerivSOFR；Price=100 minus rate、已知与未定参考期、日数加权、最终结算精度；所有条款均题设；复算 (4*3+5)/4 = 4.25 四日平均年利率百分数
- futures1-expansion-deriv-0216：后置复合利率与期初已知期限利率不同；章节7；课futures1-7；expansionDerivSOFR；Price=100 minus rate、已知与未定参考期、日数加权、最终结算精度；所有条款均题设
- futures1-expansion-deriv-0217：最终结算精度不必等于交易最小价位；章节7；课futures1-7；expansionDerivSOFR；Price=100 minus rate、已知与未定参考期、日数加权、最终结算精度；所有条款均题设
- futures1-expansion-deriv-0218：利率期货月份标签与实际风险窗口；章节7；课futures1-7；expansionDerivSOFR；Price=100 minus rate、已知与未定参考期、日数加权、最终结算精度；所有条款均题设
- futures1-expansion-deriv-0219：市价转限价订单不持续追逐下一档；章节2；课futures1-2；expansionDerivOrders；Market Order：市价转限价的剩余数量处理；明确的教学订单规则
- futures1-expansion-deriv-0220：止损保护范围限定可成交档位；章节2；课futures1-2；expansionDerivOrders；Stop Order：触发价、保护边界和可执行盘口分别核对；复算 1+1 = 2 保护范围内可立即成交手数
- futures1-expansion-deriv-0221：触发依据是成交还是报价必须按约定；章节2；课futures1-2；expansionDerivOrders；Stop Order：触发价、保护边界和可执行盘口分别核对
- futures1-expansion-deriv-0222：冰山单显示量不能替代总未成交量；章节2；课futures1-2；expansionDerivCases；案例E1：显式假设下的隐藏量、分配、条件单驻留及原子减仓；复算 20-7 = 13 总未成交手数
- futures1-expansion-deriv-0223：按比例撮合不等于排队第一全拿；章节2；课futures1-2；expansionDerivMatching；Matching Algorithms：题设纯按数量比例、无需舍入的同价分配；复算 5*6/(6+4) = 3 甲获配手数
- futures1-expansion-deriv-0224：隐含价差报价需要正确取两边盘口；章节5；课futures1-5；expansionDerivImplied；第4–5页Implied IN/OUT；题设线性组合的可执行价格与最小腿容量；复算 101-98 = 3 每组净支付价格
- futures1-expansion-deriv-0225：本机条件单未送交易所时的断线处理；章节9；课futures1-9；expansionDerivCases；案例E2：条件单驻留位置与交易引擎原子执行规则
- futures1-expansion-deriv-0226：引擎原子仅减仓限制的并发退出；章节9；课futures1-9；expansionDerivCases；案例E2：条件单驻留位置与交易引擎原子执行规则
- futures1-expansion-deriv-0227：NDF定盘对冲仍留下实际兑换基差；章节7；课futures1-7；expansionDerivNDF；差额结算参考汇率与实际换汇渠道；题设明确两种定价来源
- futures1-expansion-deriv-0228：公允互换固定利率由现值相等求解；章节7；课futures1-7；expansionDerivForward；公开Summary：互换由分期现金流估值；题设固定年金与浮动腿现值；复算 9/(100*1.8) = 0.05 公允年固定利率
- futures1-expansion-deriv-0229：预测曲线变动不能只改折现因子；章节7；课futures1-7；expansionDerivCurves；第8–9页：预测曲线产生现金流，折现曲线产生现值；显式简化估值模型
- futures1-expansion-deriv-0230：参考期走过后的利率敏感度缩减；章节7；课futures1-7；expansionDerivSOFR；已实现与未实现日数混合；参考利率敏感度按剩余权重衰减；复算 30*10/30 = 10 全月平均上升bp
- futures1-expansion-deriv-0231：倒数汇率的买卖价需要对调；章节7；课futures1-7；expansionDerivFX；报价币种转换；双边可执行报价取倒数必须交换买卖方向
- futures1-expansion-deriv-0232：利率期货价格超过100的含义；章节7；课futures1-7；expansionDerivSOFR；100减利率报价、题设允许负参考利率；平均的最终取整规则；复算 100-100.4 = -0.4 隐含年利率百分数
- futures1-expansion-deriv-0233：平均结算只在指定最后一步舍入；章节7；课futures1-7；expansionDerivSOFR；100减利率报价、题设允许负参考利率；平均的最终取整规则；复算 Math.round((1.244+1.245)/2*100)/100 = 1.24 最终结算利率百分数
- futures1-expansion-deriv-0234：融资差异可推翻交割券毛基差排序；章节7；课futures1-7；expansionDerivCTD；Carry=票息收入−融资成本；Net basis=Basis−Carry，均按同一口径与期限；复算 (.3-(.8-1))-(.5-(.8-.2)) = 0.6 A净基差高于B的数值
- futures1-expansion-deriv-0235：不等距月份蝶式不能照搬一负二加一；章节5；课futures1-5；expansionDerivCases；案例E3：期限间距不相等时，对水平与线性斜率同时中性的价差构造；复算 2*100-3*102+106 = 0 线性期限价格下组合值
- futures1-expansion-deriv-0236：收益率曲线变陡不等于买入长期债；章节7；课futures1-7；expansionDerivCurveTrade；第2页Steepener的短期限多、长期限空；风险权重按题设匹配
- futures1-expansion-deriv-0237：抵押回收后只能对剩余债权计算回收率；章节9；课futures1-9；expansionDerivCases；案例E4：明确清偿顺序下的抵押实现与剩余无担保回收；复算 (100-40)*(1-.25) = 45 万元最终信用损失
- futures1-expansion-deriv-0238：折现方法切换的现金补偿与新估值分开；章节7；课futures1-7；expansionDerivCurves；第12页Cash Compensation Mechanism；原现值减新现值的题设切换补偿；复算 10+2-12 = 0 切换时整体价值变化
- futures1-expansion-deriv-0239：可退还履约保证金不是远期货款预付；章节7；课futures1-7；expansionDerivForward；远期价值的现金流复制；已付保证金不抵扣仍存续的交割价
- futures1-expansion-deriv-0240：期货式期权行权的三笔现金流核对；章节6；课futures1-6；expansionDerivMoney；第7页Futures-Style与第8页行权产生的期货；题设每价格点一元；复算 (5-3)-5+5 = 2 元全流程净现金流
- futures1-expansion-deriv-0241：期货式期权多头也需要变动结算现金；章节6；课futures1-6；expansionDerivMoney；第7页Futures-Style与第8页行权产生的期货；题设每价格点一元；复算 (4-3)*100 = 100 元买方当日应付变动结算
- futures1-expansion-deriv-0242：期货期权平价须折现整个到期价差；章节6；课futures1-6；expansionDerivContingent；Summary第265、272行：欧式期货期权的风险中性折现；题设确定利率与同日结算；复算 .96*(105-100) = 4.8 认购减认沽当前价值
- futures1-expansion-deriv-0243：固定期货分布时升息可同时压低两类期权现值；章节6；课futures1-6；expansionDerivContingent；Summary第265、272行：欧式期货期权的风险中性折现；题设确定利率与同日结算
- futures1-expansion-deriv-0244：逐季利率上限不能改成全年平均后赔付；章节9；课futures1-9；expansionDerivContingent；Summary第273–278行：分期caplet、floorlet及互换期权；条款与数值均题设；复算 1000*.5*(Math.max(.02-.04,0)+Math.max(.06-.04,0)) = 10 万元两期cap赔付
- futures1-expansion-deriv-0245：同执行利率上限与下限的逐期复制；章节9；课futures1-9；expansionDerivContingent；Summary第273–278行：分期caplet、floorlet及互换期权；条款与数值均题设
- futures1-expansion-deriv-0246：互换期权的支付固定方向需对应风险；章节9；课futures1-9；expansionDerivContingent；Summary第273–278行：分期caplet、floorlet及互换期权；条款与数值均题设
- futures1-expansion-deriv-0247：互换期权的两段期限分别进入估值；章节9；课futures1-9；expansionDerivContingent；Summary第273–278行：分期caplet、floorlet及互换期权；条款与数值均题设
- futures1-expansion-deriv-0248：互换期权行权价值要乘剩余年金现值；章节9；课futures1-9；expansionDerivContingent；Summary第273–278行：分期caplet、floorlet及互换期权；条款与数值均题设；复算 1000*3*(.036-.03) = 18 万元互换期权现金结算
- futures1-expansion-deriv-0249：可赎回债中的互换期权空头识别；章节9；课futures1-9；expansionDerivContingent；Summary第273–278行：分期caplet、floorlet及互换期权；条款与数值均题设
- futures1-expansion-deriv-0250：已固定的平均观察值可锁定正支付下界；章节6；课futures1-6；expansionDerivAverage；Expiry的平均参考价；原创明确平均公式与未定观察边界；复算 (150+150+0)/3-90 = 10 最低到期支付
- futures1-expansion-deriv-0251：按日等权期权不能覆盖不均匀采购权重；章节6；课futures1-6；expansionDerivAverage；Expiry的平均参考价；原创明确平均公式与未定观察边界
- futures1-expansion-deriv-0252：平均方式改变对认购认沽的影响不对称；章节6；课futures1-6；expansionDerivCases；案例F1：同一正价格路径上算术均值不低于几何均值；逐路径支付比较
- futures1-expansion-deriv-0253：价差期权不是两份单腿期权的简单相减；章节6；课futures1-6；expansionDerivCSO；Calendar spread options第26–42行；先形成价差再取正部；复算 Math.max(95-90,0)-(Math.max(95-100,0)-Math.max(90-100,0)) = 5 两种支付的差
- futures1-expansion-deriv-0254：日历价差期权的Delta要拆回两个月份；章节6；课futures1-6；expansionDerivCSO；Calendar spread options第26–42行；先形成价差再取正部；复算 100*.4/20 = 2 需买B期货手数
- futures1-expansion-deriv-0255：可选仓储使用权含有价差选择权；章节5；课futures1-5；expansionDerivCases；案例F2：储存能力的使用选择权与不可撤销远期交易的区别
- futures1-expansion-deriv-0256：信用保护的参考实体与履约对手不能混淆；章节9；课futures1-9；expansionDerivCDS；Summary第243–249行：参考实体、保护对手与指定拍卖结算
- futures1-expansion-deriv-0257：拍卖结算回收价与后来实际清偿不同；章节9；课futures1-9；expansionDerivCDS；Summary第243–249行：参考实体、保护对手与指定拍卖结算；复算 100*(1-.4) = 60 万元拍卖结算金额
- futures1-expansion-deriv-0258：固定票息低于公允保护成本时的预付款；章节9；课futures1-9；expansionDerivCDSModel；第7.2节Valuing Upfront Payments；保护腿与固定票息腿的初始现值平衡；复算 12-8 = 4 万元保护买方预付款
- futures1-expansion-deriv-0259：CDS实物结算不能同时保留交付债券；章节9；课futures1-9；expansionDerivCDSModel；第4节Basic Mechanics：实物结算的交付资产与面值付款
- futures1-expansion-deriv-0260：信用事件未发生也可形成保护市值收益；章节9；课futures1-9；expansionDerivCDSModel；第4节Basic Mechanics：实物结算的交付资产与面值付款
- futures1-expansion-deriv-0261：指数CDS成分结算后持续计费的名义因子；章节9；课futures1-9；expansionDerivCases；案例F3：明确按存续成分计费的指数CDS名义本金因子；复算 1000*(1-2/100) = 980 万元下季存续计费名义
- futures1-expansion-deriv-0262：合并K线须保留起点终点和区间极值；章节8；课futures1-8；expansionDerivCharts；OHLC与Candlestick定义；原创相邻窗口合成和比较基准
- futures1-expansion-deriv-0263：阳线与相对昨收下跌可以同时出现；章节8；课futures1-8；expansionDerivCharts；OHLC与Candlestick定义；原创相邻窗口合成和比较基准
- futures1-expansion-deriv-0264：OBV增加不能读成逐笔净主动买入；章节8；课futures1-8；expansionDerivOBV；Description/Calculation：按收盘方向对全日量赋号，不是主动成交分类
- futures1-expansion-deriv-0265：高低同时外扩时原始DM只留较强方向；章节8；课futures1-8；expansionDerivDMI；Calculation：原始DM只保留较大正方向；ADX单独度量强度；复算 90-83 = 7 原始负向DM
- futures1-expansion-deriv-0266：ADX增强不自动意味着上升趋势；章节8；课futures1-8；expansionDerivDMI；Calculation：原始DM只保留较大正方向；ADX单独度量强度
- futures1-expansion-deriv-0267：上边界水平而低点抬高的形态识别；章节8；课futures1-8；expansionDerivTriangle；Triangles：根据上下边界变化识别，不将形态分类当确定预测
- futures1-expansion-deriv-0268：斜颈线确认要比较当期延伸值；章节8；课futures1-8；expansionDerivReversal；Head and Shoulders：原创斜颈线协议，按当期直线水平判断是否穿越；复算 95+(97-95)/(2-0)*4 = 99 t=4颈线水平
- futures1-expansion-deriv-0269：回撤比例要从正确行情锚点量取；章节8；课futures1-8；expansionDerivFibonacci；Fibonacci Analysis：从本段上涨高点扣除指定幅度，不预测支撑成功；复算 120-(120-80)*.618 = 95.28 回撤参考价
- futures1-expansion-deriv-0270：高开与日内仍保留完整缺口不同；章节8；课futures1-8；expansionDerivCharts；Reading Gaps、Line Charts和Trade-Based Charts；题设明确识别口径
- futures1-expansion-deriv-0271：逐笔数量图的每根柱不代表固定分钟；章节8；课futures1-8；expansionDerivCharts；Reading Gaps、Line Charts和Trade-Based Charts；题设明确识别口径
- futures1-expansion-deriv-0272：价差最高值不能拼接不同时刻的腿价极值；章节8；课futures1-8；expansionDerivCharts；Bar Charts的区间极值含义；原创同步双腿路径，先相减再取价差极值；复算 Math.max(110-105,100-90) = 10 同步价差最高值
- futures1-expansion-deriv-0273：跨午夜成交应按业务交易日归集；章节2；课futures1-2；expansionDerivCases；案例G1：明示交易日映射、今昨仓费用、累计盘口及订单身份
- futures1-expansion-deriv-0274：平今平昨的费用选择受可平库存约束；章节2；课futures1-2；expansionDerivCases；案例G1：明示交易日映射、今昨仓费用、累计盘口及订单身份；复算 2*1+1*8 = 10 元最少平仓手续费
- futures1-expansion-deriv-0275：累计盘口深度不能逐档重复相加；章节2；课futures1-2；expansionDerivCases；案例G1：明示交易日映射、今昨仓费用、累计盘口及订单身份；复算 9-6 = 3 101元本档原挂量
- futures1-expansion-deriv-0276：逐笔委托条数不等于独立交易者人数；章节2；课futures1-2；expansionDerivMatching；Central Limit Order Book：Market by Order表示委托记录，不提供最终经济客户身份
- futures1-expansion-deriv-0277：组合净价正确不使无效腿价自动有效；章节2；课futures1-2；expansionDerivCases；案例G2：组合净价与各腿分配价格必须同时满足明示约束
- futures1-expansion-deriv-0278：两笔待成交开仓单必须合看资金承诺；章节3；课futures1-3；expansionDerivCases；案例G3：未成交开仓委托的并发资金承诺，明确无互斥或自动撤销条件；复算 6+6-10 = 2 万元同时成交的资金缺口
- futures1-expansion-deriv-0279：储气足够不代表寒潮当天可全部供出；章节8；课futures1-8；expansionDerivGasStorage；Storage Measures：working gas库存和每日deliverability分开；复算 10-3 = 7 万立方米当日供气缺口
- futures1-expansion-deriv-0280：基础负荷与峰时增量应分块覆盖；章节4；课futures1-4；expansionDerivPower；Futures Hedging Example：电力负荷按小时覆盖；本题两个可组合交付块；复算 10*4 = 40 MWh峰时新增用电量
- futures1-expansion-deriv-0281：正预付报价仍可能对应净收现金；章节9；课futures1-9；expansionDerivCDSConverter；第3页Cash Settlement Amount = Notional × Upfront − Accrued Premium；题设符号正为买方付；复算 1000000*.002-2500 = -500 元净现金结算款，正为买方付
- futures1-expansion-deriv-0282：固定保护费也需按存续条件形成期望现金流；章节9；课futures1-9；expansionDerivCDSModel；第6节估值与第7.3节不同票息对冲的违约时点残余；复算 10*.9*.95 = 8.55 万元保护费腿现值
- futures1-expansion-deriv-0283：不同票息的反向CDS不产生无风险固定年金；章节9；课futures1-9；expansionDerivCDSModel；第6节估值与第7.3节不同票息对冲的违约时点残余
- futures1-expansion-deriv-0284：名义相反但信用事件覆盖区间不同；章节9；课futures1-9；expansionDerivCases；案例G4：明确事件覆盖起点的两份信用保护；不主张任何统一回溯期
- futures1-expansion-deriv-0285：期货等价持仓增加不一定代表实际新买单；章节8；课futures1-8；expansionDerivCOT；Open Interest第68–69行：期权按交易所Delta转期货等价；变化可来自重估而非成交；复算 1000*(.6-.4) = 200 手等价多头增加量
- futures1-expansion-deriv-0286：未报告持仓残差不能直接贴上散户标签；章节8；课futures1-8；expansionDerivCOT；Nonreportable Positions第83行：分方向从总OI扣已报告量，类别和人数未知；复算 (1000-800)-(1000-750) = -50 手未报告部分净多头
- futures1-expansion-deriv-0287：交易者重分类可造成类别持仓迁移；章节8；课futures1-8；expansionDerivCOTClass；Trader Classification第82–85行及Potential Limitations第106–108行；分类变化不等于持仓交易
- futures1-expansion-deriv-0288：跨作物年度价差分类不满足逐列简单相加；章节8；课futures1-8；expansionDerivCOT；Old and Other Futures第104–105行：分桶后匹配与合并后匹配的spread列不可直接相加；复算 70-50 = 20 手合并后未配对多头
- futures1-expansion-deriv-0289：TAS价差限额不构成绝对采购价格上限；章节2；课futures1-2；expansionDerivTAS；Example of a TAS transaction第41–46行：成交价差已定，但绝对结算价尚未知
- futures1-expansion-deriv-0290：自成交保护取消原挂单后新单仍可能对外成交；章节2；课futures1-2；expansionDerivSMP；FAQ第2问：题设采用取消原挂单并继续处理新单的模式，排除隐含订单
- futures1-expansion-deriv-0291：风险对冲数量不等于交割时现券数量全部匹配；章节7；课futures1-7；expansionDerivDeliveryOptions；PDF第11–12页The Delivery Tail：CF/DV01配比与每手实物面额是一对不同约束；复算 1000-80*10 = 200 万元交割后剩余债券面值
- futures1-expansion-deriv-0292：定价后申报窗口赋予交割卖方时间选择；章节7；课futures1-7；expansionDerivDeliveryOptions；PDF第8–9页Wild Card：当日申报的发票金额固定，现金券仍可变；不将局部交付差额当全程利润；复算 100-99.2 = 0.8 每单位当前购券交付局部差额
- futures1-expansion-deriv-0293：每日涨跌限内订单仍可能触及动态价格带；章节3；课futures1-3；expansionDerivPriceControls；What are price limits及What is price banding：单笔订单拒绝与全市场价格限幅是不同检查
- futures1-expansion-deriv-0294：自然对冲下不能按平均产量机械卖期货；章节4；课futures1-4；expansionDerivFarmHedge；PDF第3页Rh现金流及第5–6页随机产量价格负相关；原创两状态收入稳定问题；复算 (90*120-120*80)/(120-80) = 30 吨收入稳定套保量
- futures1-expansion-deriv-0295：指数天气支付不以企业损失证明为计量上限；章节9；课futures1-9；expansionDerivWeather；第2页天气合约以指数决定现金结算；原创指数支付与企业实际损失的配对情景；复算 100*Math.max(100-90,0) = 1000 元情景甲的指数支付
- futures1-expansion-deriv-0296：方差名义量与Vega名义量不能混乘；章节9；课futures1-9；expansionDerivVarianceUnits；第25行以波动率偏导把Vega转换为方差单位；支付函数与波动点单位均由题设完整给出；复算 (10000/(2*20))*(25**2-20**2) = 56250 元方差互换准确支付
- futures1-expansion-deriv-0297：方差执行值开平方不等于波动率互换公允执行值；章节9；课futures1-9；expansionDerivVolProducts；PDF第6页表4：方差互换以E[σ²]、波动率互换以E[σ]确定零初值执行值；概率与零利率均为题设；复算 (10**2+30**2)/2 = 500 方差点的甲公允执行值


## 第十六检查点：沪市期权操作边界22题（0124–0145）

2026-10-14完成。累计442题；原420对象与新增前完整JSON逐项比对相同。新题四理由均不少于15字，正确项长度未达到次长项1.5倍预警线。5条新数值元数据，另有交收数量与对冲类型的独立核对。该项结构检查不代替另一轮内容复核。

### 实际来源与访问情况

1. 2026指南发布页：https://www.sse.com.cn/lawandrules/guide/options/c/c_20260609_10821175.shtml ，2026-06-09公布生效。证券公司指南附件：https://www.sse.com.cn/lawandrules/guide/options/c/10821175/files/5d2b20b52ad7470bbe5ca4b3854494df.docx 。网页工具不支持DOCX；普通HTTPS下载超时，使用同一官方地址HTTP取得175KB原文件，解压word/document.xml读取55771字正文。实际读取第五章限仓限购、第七及八章备兑不足、第九章合并行权、第十章协议行权、第十一章客户结算；未声称逐页审阅全文附件表格。示例金额、个案阈值、比如10:00等不当统一规则出题。
2. 组合指引现行目录：https://www.sse.com.cn/lawandrules/sselawsrules2025/option/c/c_20250610_10781452.shtml ，附件：https://www.sse.com.cn/lawandrules/sselawsrules2025/option/c/10781452/files/d75962ef0f37436fa39e066fba679edc.docx 。同样用普通HTTP取得并解压全文，实际读第3–27条。采用第4条相等保证金分支、第5/15条自动解除与重构限制、第7条数量不足整笔无效、第14条停牌/停市边界。第17–19条并非因正文存在就已经实施。
3. 交易规则现行目录：https://www.sse.com.cn/lawandrules/sselawsrules2025/option/c/c_20250610_10781448.shtml ，附件：https://www.sse.com.cn/lawandrules/sselawsrules2025/option/c/10781448/files/0c0f89e74e9c4a5b9aa3a7acafdf5119.docx 。实际取得并读取第14、48、51–52、66、108、110–113条。其2015发布通知有后续更新，不能整体当作2026功能清单；组合业务启用及暂缓边界用专项规则与当前服务页补核。
4. 现行办理页：https://one.sse.com.cn/onething/qqtz/ ，实际读取行权交收及风险管理，第214–231、258–262行。确认合并申报条件和单边平仓暂不实施；不用其一般介绍代替其他准入和收费专项规则。

### 目标独立性与复算

旧库虽有到期日买入可行权、停牌不停止行权、经济组合不自动获保证金优惠、拆组合检查单腿保证金、普通日终净额等题，本批考的是不同的操作条件或状态转换。未以更换一组执行价重出策略盈亏。监管作者已确认未占限额变更存量超限、平仓不恢复单日开仓额度及限购成本口径三个目标。

- 0124：执行价相对关系符合，单腿虚值不直接否定合并申报资格；不推导投资上应行权。
- 0125：5×12000=6×10000的经济数量相等，不能替代同单位、逐张一比一接口条件。
- 0126：净认购4、净认沽7，初始最多4组；先申报2组后第二笔5组仅2有效。不是旧超量平仓整笔无效。
- 0127：异常重复输入清算时合并先处理，再按剩余合约检查普通申报；题设说明前端本应拦截。
- 0128：特殊顺延下旧行权回执无效，新的实际行权日须重办；不是一般停牌继续行权。
- 0129：4元NAV×98%=3.92；4.10为旧市价，不能替代净值基数。
- 0130：交收10000中实际8000可交，停牌缺口2000现金处理，不能当然改变全笔。
- 0131：锁定解锁改变用途状态，不改变原当日买入限制；明示非日内回转标的。
- 0132：10000在位+2000在途可支持12000已有备兑；在途不得用于新增备兑。
- 0133：今天10000应交减6000普通证券需消耗4000备兑证券，下月原义务继续，产生缺口。
- 0134：权利仓4先冲3普通义务仓，再冲1备兑，最后4张均备兑；区别仅求净张数。
- 0135：仍锁定的组合成分排除于普通日终对冲，新增相反普通仓不自动拆组合。
- 0136：构建4组缺一腿1张整笔无效，区别合并行权的部分有效机制。
- 0137：周三E，周一E−2价差已解除且当月不可重构，跨式尚待E日解除；无特殊公告。
- 0138：两腿保证金同为5000时附加较高结算价1800，合计6800；不能取较低1200。
- 0139：普通成分停牌可收解除指令，临时停市例外；不是成交能否继续。
- 0140：正文包含专用接口不代表已实施；当前服务页明确单边平仓暂不实施。
- 0141：调整合约日终持仓为零则次日摘牌，即使原到期日尚未到；只影响相应调整合约，不能扩大成全品种摘牌或恢复旧条款。
- 0142：限额调整所致合法存量超限与前端失效违规超限须区分，原合法持仓保留不使旧开仓限额继续有效。
- 0143：100单日额度减已成交开仓70余30；平仓50不恢复累计额度。
- 0144：限购成本6+待成交2+新单3=11万元，跌价市值3不替代成本6。
- 0145：手动、客户自设、券商默认的适用优先级，不能对同一持仓盲目累加策略输出。

第十六检查点复核小修：0124末干扰改为只检查执行价不同而漏认沽高于认购的方向条件；0125引用定位补正为同单位、一张认购配一张认沽；0131末干扰改为混淆已解除的备兑冻结与仍存在的当日买入卖出限制。其他19题对象未改。

自查实质替换：0141原“涨停平仓优先”与旧c1-097同目标，未计作独立新增；原ID已改为第14条调整合约零持仓次日摘牌的挂牌生命周期任务。新引用实际已读取，其他21对象未动。

期权0047单项质量回修（2026-10-14）：将“买方放弃以保护卖方”替换为“买回认购解除封顶，但误认为原权利金足以支付回购款”的实际现金流误判；只改该错项及理由。标的5元时回购内在价值0.50元，原收0.10元，差额0.40元，原题最高损益与其余字段均不变，不新增题量。
