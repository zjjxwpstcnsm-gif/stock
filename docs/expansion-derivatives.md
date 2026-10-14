# 衍生品原创应用题扩充审校记录

审校日期：2026-10-14。编写文件：`src/expansion-derivatives.js`。

## 范围与状态

首批150题：股票/ETF期权75题、期货基础75题。逐题手工编写情景、四个选项和四项理由，加载器只设置元数据及旋转答案位置，不生成参数或措辞变体。题号分别为`options-expansion-deriv-0001`至`0075`、`futures1-expansion-deriv-0001`至`0075`。与旧题语义重叠的审查正在进行；修订保留题号，不把修订增加计数。此记录不宣称覆盖全部大纲或已经完成专家认证。

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

## 访问限制与未采纳依据

- 上交所现行有效目录页 https://www.sse.com.cn/lawandrules/sselawsrules2025/option/c/c_20250610_10781448.shtml 可访问，显示2015年发布文件及DOCX链接；本次未读取DOCX全文。因此不以此目录页给新题具体规则、时间或参数背书。
- OIC `/strategies/all-strategies/bull-call-spread` 抓取不可用，`/strategies/all-strategies/protective-put` 返回404。未将这两个页面标记为已核验来源；策略计算由题干逐腿现金流独立推导。
- CME `/education/courses/introduction-to-treasuries/the-basics-of-treasury-futures.html` 和 `/education/courses/introduction-to-futures/understanding-futures-contract-specifications.html` 抓取不可用。国债、单位、交割算式仅采用题设明确的教学模型，不声称从这两个页面读到了业务规则。

## 数值复核与加载检查

每道数值题的`expansionCalculation`保留纯算术表达式、独立指定结果和单位。核验过程分别检查：报价单位→每份/每张/总额；时点→增量或累计现金流；方向→多空符号；成本→收入与净损益；合约→到期、执行价、单位匹配。脚本重新运算所有表达式并以绝对误差1e-8比较，不将计算程序生成的参数变式当新增题。

当前首批34个数值检查均通过。例：市价穿透盘口为2×0.12×10000+3×0.14×10000=6600；股票目标Beta从1到−0.2需卖(1+0.2)×600/60=12手；保证金提高后可用资金变动=(12+1−11)−(12−8)=−2万元；最小整数预算floor(2500/(800+20))=3张。修订后数字清单以下方逐题元数据为准。

所有题均有4个选项、4项独立理由、唯一正确索引、有效科目章节/课ID、来源、定位、原创标记及日期。答案位置只随题序轮转，不改选项与理由配对。没有修改旧题、共享测试、集成文件或执行提交推送。

## 逐题学习任务索引

下表由当前手工题目元数据列出，便于审查语义重叠；每行是一个已编写问题，不等同于互不重叠的官方能力点。是否作为新的独立决策任务接受，以独立审查为准。


### options

- options-expansion-deriv-0001：代码相似但交付标的不同；章节1；课contracts；expansionDerivCases
- options-expansion-deriv-0002：同名合约的调整标记；章节1；课contracts；expansionDerivCases
- options-expansion-deriv-0003：报价低不代表总支出低；章节1；课contracts；expansionDerivCases；复算 .09*12000-.10*10000 = 80 元
- options-expansion-deriv-0004：每份价格与现金行权价值；章节1；课contracts；expansionDerivCases；复算 (2.8-2.72)*5000 = 400 元
- options-expansion-deriv-0005：日历日与交易日倒计时；章节1；课contracts；expansionDerivCases
- options-expansion-deriv-0006：撤单回报前的重复下单；章节1；课lifecycle；expansionDerivCases
- options-expansion-deriv-0007：部分成交后的剩余委托；章节1；课lifecycle；expansionDerivCases；复算 5-3 = 2 张
- options-expansion-deriv-0008：买入平仓与买入开仓标志；章节1；课lifecycle；expansionDerivCases
- options-expansion-deriv-0009：市价单穿透盘口；章节1；课lifecycle；expansionDerivCases；复算 (2*.12+3*.14)*10000 = 6600 元
- options-expansion-deriv-0010：限价单的成交边界；章节1；课lifecycle；expansionDerivCases
- options-expansion-deriv-0011：到期后交收形成的新风险；章节1；课lifecycle；expansionDerivCases
- options-expansion-deriv-0012：现金结算不产生证券所有权；章节1；课lifecycle；expansionDerivCases
- options-expansion-deriv-0013：权利到期与服务申请期限；章节1；课lifecycle；expansionDerivCases
- options-expansion-deriv-0014：最后成交价的估值陈旧性；章节1；课value；expansionDerivCases
- options-expansion-deriv-0015：内在价值不等于退出收益；章节1；课value；expansionDerivCases；复算 .27-.30 = -0.03 元/份
- options-expansion-deriv-0016：负时间价值报价的核验顺序；章节1；课value；expansionDerivCases
- options-expansion-deriv-0017：权利金与最大可承受亏损预算；章节1；课value；expansionDerivCases；复算 Math.floor(2500/(800+20)) = 3 张
- options-expansion-deriv-0018：平价检验中的到期错配；章节3；课pricing；expansionDerivParity
- options-expansion-deriv-0019：复制现货遗漏行权价现金；章节3；课pricing；expansionDerivParity
- options-expansion-deriv-0020：折现行权价的符号；章节3；课pricing；expansionDerivParity
- options-expansion-deriv-0021：除息现值不能重复扣除；章节3；课pricing；expansionDerivParity
- options-expansion-deriv-0022：买卖价差下的套利假象；章节3；课pricing；expansionDerivParity
- options-expansion-deriv-0023：箱式组合的贴现比较；章节3；课pricing；expansionDerivParity
- options-expansion-deriv-0024：按绝对值汇总导致假风险；章节3；课delta-gamma；expansionDerivDelta；复算 6000-4000 = 2000 份
- options-expansion-deriv-0025：Delta对冲后标的上涨；章节3；课delta-gamma；expansionDerivDelta
- options-expansion-deriv-0026：不同标的Delta不能直接净额；章节3；课delta-gamma；expansionDerivDelta
- options-expansion-deriv-0027：Delta不是收益保证概率；章节3；课delta-gamma；expansionDerivDelta
- options-expansion-deriv-0028：百分比变化与绝对变化；章节3；课delta-gamma；expansionDerivDelta；复算 .6*10*.01 = 0.06 元/份
- options-expansion-deriv-0029：同Delta不同Gamma的压力风险；章节3；课delta-gamma；expansionDerivGamma
- options-expansion-deriv-0030：近到期平值的监测频率；章节3；课delta-gamma；expansionDerivGamma
- options-expansion-deriv-0031：负Gamma再平衡的交易方向；章节3；课delta-gamma；expansionDerivGamma
- options-expansion-deriv-0032：股票无法消除Gamma；章节3；课delta-gamma；expansionDerivGamma
- options-expansion-deriv-0033：局部二阶近似适用范围；章节3；课delta-gamma；expansionDerivGamma
- options-expansion-deriv-0034：净Vega为零的期限错配；章节3；课theta-vega-rho；expansionDerivVega
- options-expansion-deriv-0035：事件落在不同到期窗内；章节3；课theta-vega-rho；expansionDerivVega
- options-expansion-deriv-0036：历史波动与隐含波动的用途；章节3；课theta-vega-rho；expansionDerivVega
- options-expansion-deriv-0037：跨行权价单一隐波的遗漏；章节3；课theta-vega-rho；expansionDerivVega
- options-expansion-deriv-0038：波动率单位归一；章节3；课theta-vega-rho；expansionDerivVega；复算 .04*100 = 4 元/波动率小数单位
- options-expansion-deriv-0039：周末Theta不是固定收费；章节3；课theta-vega-rho；expansionDerivTheta
- options-expansion-deriv-0040：时间价值衰减的非线性；章节3；课theta-vega-rho；expansionDerivTheta
- options-expansion-deriv-0041：备兑后卖出现货的保护缺口；章节2；课covered-protective；expansionDerivCases
- options-expansion-deriv-0042：一部分现货已被另项承诺占用；章节2；课covered-protective；expansionDerivCases
- options-expansion-deriv-0043：保护认沽高于现价并非无成本保本；章节2；课covered-protective；expansionDerivCases；复算 3+.25-3.10 = 0.15 元/份最大净损失
- options-expansion-deriv-0044：预期分红的保护底线口径；章节2；课covered-protective；expansionDerivCases；复算 98+2-100-4 = -4 元/份
- options-expansion-deriv-0045：以不同ETF认沽替代精确保险；章节2；课covered-protective；expansionDerivCases
- options-expansion-deriv-0046：滚动卖购的损失记账；章节2；课covered-protective；expansionDerivCases；复算 600-900+700 = 400 元
- options-expansion-deriv-0047：股价回本价与备兑最大收益冲突；章节2；课covered-protective；expansionDerivCases；复算 4.5+.1-5 = -0.4 元/份最高净损益
- options-expansion-deriv-0048：已保护资产追加买入后的比例；章节2；课covered-protective；expansionDerivCases
- options-expansion-deriv-0049：认购比率价差的尾部裸露；章节3；课strategies；expansionDerivCases
- options-expansion-deriv-0050：价差腿单位不同的名义匹配；章节3；课strategies；expansionDerivCases
- options-expansion-deriv-0051：领口的成本来源；章节3；课strategies；expansionDerivCases
- options-expansion-deriv-0052：跨式方向正确但幅度不足；章节3；课strategies；expansionDerivCases；复算 Math.max(108-100,0)+Math.max(100-108,0)-12 = -4 元/份
- options-expansion-deriv-0053：宽跨低成本的代价；章节3；课strategies；expansionDerivCases
- options-expansion-deriv-0054：日历价差不等于到期同日价差；章节3；课strategies；expansionDerivCases
- options-expansion-deriv-0055：蝶式中间执行价的峰值；章节3；课strategies；expansionDerivCases；复算 Math.max(100-90,0)-2*Math.max(100-100,0)+Math.max(100-110,0)-3 = 7 元/份
- options-expansion-deriv-0056：蝴蝶外侧的损益核对；章节3；课strategies；expansionDerivCases；复算 Math.max(120-90,0)-2*Math.max(120-100,0)+Math.max(120-110,0)-3 = -3 元/份
- options-expansion-deriv-0057：铁鹰内区间与信用收入；章节3；课strategies；expansionDerivCases；复算 2-Math.max(95-101,0)+Math.max(90-101,0)-Math.max(101-105,0)+Math.max(101-110,0) = 2 元/份
- options-expansion-deriv-0058：平仓短腿后策略风险改变；章节3；课strategies；expansionDerivCases
- options-expansion-deriv-0059：权利金收入并非可全部消费资金；章节4；课risk；expansionDerivCases
- options-expansion-deriv-0060：保证金折扣与最大损失边界；章节4；课risk；expansionDerivCases
- options-expansion-deriv-0061：报价中断时的风险估值；章节4；课risk；expansionDerivCases
- options-expansion-deriv-0062：同一尾部暴露的假分散；章节4；课risk；expansionDerivCases
- options-expansion-deriv-0063：固定止损金额与跳空穿越；章节4；课risk；expansionDerivCases
- options-expansion-deriv-0064：按胜率选择卖方策略的遗漏；章节4；课risk；expansionDerivCases
- options-expansion-deriv-0065：策略止盈后仍残留挂单；章节4；课risk；expansionDerivCases
- options-expansion-deriv-0066：交易授权与风险限额独立；章节4；课risk；expansionDerivCases
- options-expansion-deriv-0067：压力损失与可用现金的双约束；章节4；课risk；expansionDerivCases
- options-expansion-deriv-0068：风险指标越界的升级处理；章节4；课risk；expansionDerivCases
- options-expansion-deriv-0069：微小实值与行权净收益；章节1；课lifecycle；expansionDerivCases；复算 5-8 = -3 元
- options-expansion-deriv-0070：结算平均价与收盘价错用；章节1；课lifecycle；expansionDerivCases；复算 100.8-100 = 0.8 元/单位
- options-expansion-deriv-0071：美式与欧式模型混用；章节1；课lifecycle；expansionDerivCases
- options-expansion-deriv-0072：外部行情与机构截止时点；章节1；课lifecycle；expansionDerivCases
- options-expansion-deriv-0073：模型波动率负值的数据校验；章节3；课pricing；expansionDerivCases
- options-expansion-deriv-0074：同期限认购执行价单调性；章节3；课pricing；expansionDerivCases
- options-expansion-deriv-0075：同一损益采用两次汇率换算；章节3；课pricing；expansionDerivCases

### futures1

- futures1-expansion-deriv-0001：已锁采购价后再次买入套保；章节1；课futures1-1；expansionDerivCases
- futures1-expansion-deriv-0002：销售价与原料价同时浮动；章节1；课futures1-1；expansionDerivCases
- futures1-expansion-deriv-0003：不确定订单与过度套保；章节1；课futures1-1；expansionDerivCases
- futures1-expansion-deriv-0004：库存融资与价格风险分离；章节1；课futures1-1；expansionDerivCases
- futures1-expansion-deriv-0005：价格发现与单一大单冲击；章节1；课futures1-1；expansionDerivCases
- futures1-expansion-deriv-0006：套保损失与经营收益的合并评价；章节1；课futures1-1；expansionDerivCases
- futures1-expansion-deriv-0007：不同报价单位的合约价值；章节2；课futures1-2；expansionDerivCases；复算 2000*10-2*10000 = 0 元差额
- futures1-expansion-deriv-0008：最小价位约束与合法限价；章节2；课futures1-2；expansionDerivCases
- futures1-expansion-deriv-0009：开仓双方与持仓量增加；章节2；课futures1-2；expansionDerivCases；复算 100+10 = 110 手
- futures1-expansion-deriv-0010：开平换手与持仓量不变；章节2；课futures1-2；expansionDerivCases
- futures1-expansion-deriv-0011：成交量累计不能当存量；章节2；课futures1-2；expansionDerivCases
- futures1-expansion-deriv-0012：交易年份省略造成错月风险；章节2；课futures1-2；expansionDerivCases
- futures1-expansion-deriv-0013：小型合约替代的数量换算；章节2；课futures1-2；expansionDerivCases；复算 3*50/10 = 15 手
- futures1-expansion-deriv-0014：组合委托部分成交的敞口；章节2；课futures1-2；expansionDerivCases
- futures1-expansion-deriv-0015：跨日平仓不能重复扣历史盈亏；章节3；课futures1-3；expansionDerivMTM；复算 103-105 = -2 元/单位
- futures1-expansion-deriv-0016：收盘涨而当日盯市亏损；章节3；课futures1-3；expansionDerivMTM；复算 99-100 = -1 点
- futures1-expansion-deriv-0017：存取款与投资损益分离；章节3；课futures1-3；expansionDerivMTM；复算 10+3-1-.1 = 11.9 万元
- futures1-expansion-deriv-0018：保证金释放不是新增利润；章节3；课futures1-3；expansionDerivMTM
- futures1-expansion-deriv-0019：价格盈利与提保同时发生；章节3；课futures1-3；expansionDerivMTM；复算 (12+1-11)-(12-8) = -2 万元
- futures1-expansion-deriv-0020：期现最终抵销却需途中补资；章节3；课futures1-3；expansionDerivMTM
- futures1-expansion-deriv-0021：保证金不足的时间期限；章节3；课futures1-3；expansionDerivMTM
- futures1-expansion-deriv-0022：连续涨停对空头止损的阻碍；章节3；课futures1-3；expansionDerivMTM
- futures1-expansion-deriv-0023：仓库地区变更的基差敞口；章节4；课futures1-4；expansionDerivBasis
- futures1-expansion-deriv-0024：品质升水改变套保结果；章节4；课futures1-4；expansionDerivBasis
- futures1-expansion-deriv-0025：预期基差与实际基差的预算偏差；章节4；课futures1-4；expansionDerivBasis；复算 (4000-50)-(4000-120) = 70 元/单位
- futures1-expansion-deriv-0026：固定基差采购合同锁住哪一层；章节4；课futures1-4；expansionDerivBasis
- futures1-expansion-deriv-0027：提前终止采购改变套保性质；章节4；课futures1-4；expansionDerivBasis
- futures1-expansion-deriv-0028：套保期与合约月选择；章节4；课futures1-4；expansionDerivBasis
- futures1-expansion-deriv-0029：负相关资产的套保方向；章节4；课futures1-4；expansionDerivBasis
- futures1-expansion-deriv-0030：套保比率估计窗口失效；章节4；课futures1-4；expansionDerivBasis
- futures1-expansion-deriv-0031：按数量而非价值套保的单位错误；章节4；课futures1-4；expansionDerivBasis；复算 500*.8/25 = 16 手
- futures1-expansion-deriv-0032：整数取整后的剩余风险；章节4；课futures1-4；expansionDerivBasis
- futures1-expansion-deriv-0033：价差定义反转后的方向；章节5；课futures1-5；expansionDerivCases
- futures1-expansion-deriv-0034：同吨数跨品种忽略加工收率；章节5；课futures1-5；expansionDerivCases
- futures1-expansion-deriv-0035：正毛价差覆盖不了双腿费用；章节5；课futures1-5；expansionDerivCases；复算 6-3-2-2 = -1 元/单位
- futures1-expansion-deriv-0036：现金套利的仓储容量约束；章节5；课futures1-5；expansionDerivCases
- futures1-expansion-deriv-0037：反向套利的融券可得性；章节5；课futures1-5；expansionDerivCases
- futures1-expansion-deriv-0038：统计套利止损与均值变化；章节5；课futures1-5；expansionDerivCases
- futures1-expansion-deriv-0039：价差小风险与毛头寸大风险；章节5；课futures1-5；expansionDerivCases
- futures1-expansion-deriv-0040：两市场合约不可直接交付；章节5；课futures1-5；expansionDerivCases
- futures1-expansion-deriv-0041：期货期权行权生成的仓位；章节6；课futures1-6；expansionDerivCases
- futures1-expansion-deriv-0042：采购商选择保险而非锁价；章节6；课futures1-6；expansionDerivCases
- futures1-expansion-deriv-0043：期货认沽参照期货价格；章节6；课futures1-6；expansionDerivCases；复算 Math.max(500-480,0) = 20 元/单位
- futures1-expansion-deriv-0044：销售底价与保险费的净口径；章节6；课futures1-6；expansionDerivCases；复算 2000-60 = 1940 元/单位
- futures1-expansion-deriv-0045：低权利金不等于低保险缺口；章节6；课futures1-6；expansionDerivCases
- futures1-expansion-deriv-0046：目标Beta为负时的手数；章节7；课futures1-7；expansionDerivCases；复算 (1-(-.2))*600/60 = 12 手
- futures1-expansion-deriv-0047：组合市值变化后的套保重估；章节7；课futures1-7；expansionDerivCases
- futures1-expansion-deriv-0048：离散分红与连续股息率口径；章节7；课futures1-7；expansionDerivCases
- futures1-expansion-deriv-0049：债券久期相同但DV01不同；章节7；课futures1-7；expansionDerivCases；复算 (2000*5*.0001)/(1000*5*.0001) = 2 倍
- futures1-expansion-deriv-0050：关键期限风险被总久期掩盖；章节7；课futures1-7；expansionDerivCases
- futures1-expansion-deriv-0051：转换因子不是可交割券市价；章节7；课futures1-7；expansionDerivCases
- futures1-expansion-deriv-0052：最便宜可交割券切换的影响；章节7；课futures1-7；expansionDerivCases
- futures1-expansion-deriv-0053：出口收汇的报价方向；章节7；课futures1-7；expansionDerivCases
- futures1-expansion-deriv-0054：倒数汇率涨跌误读；章节7；课futures1-7；expansionDerivCases
- futures1-expansion-deriv-0055：外币利润与本币回报分离；章节7；课futures1-7；expansionDerivCases
- futures1-expansion-deriv-0056：库存增加但低于预期；章节8；课futures1-8；expansionDerivCases
- futures1-expansion-deriv-0057：可交割库存与社会库存区别；章节8；课futures1-8；expansionDerivCases
- futures1-expansion-deriv-0058：产能与实际产量混同；章节8；课futures1-8；expansionDerivCases
- futures1-expansion-deriv-0059：连续合约跳空与可交易收益；章节8；课futures1-8；expansionDerivCases
- futures1-expansion-deriv-0060：复权价格用于成交的偏差；章节8；课futures1-8；expansionDerivCases
- futures1-expansion-deriv-0061：修订数据造成前视偏差；章节8；课futures1-8；expansionDerivCases
- futures1-expansion-deriv-0062：参数搜索后的样本外验证；章节8；课futures1-8；expansionDerivCases
- futures1-expansion-deriv-0063：同一风险因子的假多策略；章节8；课futures1-8；expansionDerivCases
- futures1-expansion-deriv-0064：抵押品折扣后的可用担保；章节9；课futures1-9；expansionDerivCases；复算 100*(1-.2) = 80 万元
- futures1-expansion-deriv-0065：抵押品与风险同向恶化；章节9；课futures1-9；expansionDerivCases
- futures1-expansion-deriv-0066：名义本金与重置成本区别；章节9；课futures1-9；expansionDerivCases
- futures1-expansion-deriv-0067：不同法律实体净额的边界；章节9；课futures1-9；expansionDerivCases
- futures1-expansion-deriv-0068：压力测试概率的误读；章节9；课futures1-9；expansionDerivCases
- futures1-expansion-deriv-0069：VaR时间尺度与持仓变现期；章节9；课futures1-9；expansionDerivCases
- futures1-expansion-deriv-0070：交易与核算由同一人控制；章节9；课futures1-9；expansionDerivCases
- futures1-expansion-deriv-0071：远期现金流净额不等于风险消失；章节9；课futures1-9；expansionDerivCases
- futures1-expansion-deriv-0072：最后交易日与首次通知日区别；章节2；课futures1-2；expansionDerivRoll
- futures1-expansion-deriv-0073：移仓不是延长原合同；章节2；课futures1-2；expansionDerivRoll
- futures1-expansion-deriv-0074：现金结算仍有最后结算现金流；章节2；课futures1-2；expansionDerivRoll
- futures1-expansion-deriv-0075：移仓价差与双腿执行计划；章节2；课futures1-2；expansionDerivRoll
