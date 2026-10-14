# 证券基础：信用中介、银行账务与结算应用

日期：2026-10-14。范围经主任务确认，独立文件为`src/expansion-intermediation.js`；只扩充securities1，各主题使用既有章节1/2/5/6/8及对应lessonId；融资结构、债券现金流、证券化与风险按具体任务归属。题目为AI辅助逐题原创，逐项理由、数值和合同均独立设计；来源用于核验机制，不复制来源原题。不宣称人类专家审定，另一轮AI逐题复核和独立计算的接受状态另记。候选清单不计入新增数量。

## 当前接受状态

截至2026-10-14，共121题（0001–0121）全部经过另一轮AI内容复核、一手来源及独立计算核验后接受；56条数值元数据。最终合同10题组指纹为`76a85de15fb4fa755703dd6f5cf91e8e6bd4a10c3f91f6bd6429ae8a84081f1e`，其中0113–0121仅经授权调整章节三字段，正文未改。作者停止新增生产，已接受题对象冻结；并不代表人类专家认证或逐条官方大纲覆盖。下文各检查点是按时间保留的历史研究与修订记录，其中“待审”描述提交时状态，现行接受状态以本节及独立审计清单为准。

## 与现库及并行工作的边界

已直接与投资作者确认：其继续宏观政策传导、国际收支与统计；本模块只写机构微观账务、融资与支付机制。明确不复写已有的贷款发放双边资产负债、普通跨行付款重分配准备金、央行购债卖方银行/非银行的即时区别、银行长期债替换存款、M0/M1/M2嵌套、活期转定期、资本不足阻碍便宜资金传导等题。一般短债长投期限错配、同集团风险因子、法定权限/审批泛论也排除。若某候选仍只是在这些任务上换数或换银行名称，直接删去而不扩计。

## 已实际读取的一手来源与访问范围

1. BoE《Money creation in the modern economy》（2014 Q1，14页）：https://www.bankofengland.co.uk/-/media/boe/files/quarterly-bulletin/2014/money-creation-in-the-modern-economy.pdf 。实际读取第3–4页（报告印刷16–17页）还本与银行资产买卖的存款效应、第7页reflux，以及银行/央行/非银部门的账户边界。只采用稳定记账原理，不将英国旧货币占比、当年准备金供给制度或“准备金数量不直接约束”等条件化论断冒充全球统一规则。
2. BoE《Bank capital and liquidity》（2013 Q3，15页）：https://www.bankofengland.co.uk/-/media/boe/files/quarterly-bulletin/2013/bank-capital-and-liquidity.pdf 。已读取概述、资本作为融资而非资产、第6页账务、第9/12页资本质量与会计reserves和央行reserves的区别。文中旧已发生损失模型和当时“拟议”会计改革不作为现行会计规则；旧巴塞尔过渡期与具体比例不采用。
3. Fed《Federal Reserve liabilities》：https://www.federalreserve.gov/monetarypolicy/bst_frliabilities.htm 。实际读取第7–35行，准备金账户、央行贷款、票币兑换、财政账户、其他负债之间的变化。参数均由题设指定，不提供当前政策数值预测。
4. Fed《What is the difference between a bank’s liquidity and its capital?》：https://www.federalreserve.gov/faqs/cat_21427.htm 。实际读取第10–15行，快速支付能力与损失吸收权益的不同。
5. ECB Banking Supervision《Why do banks need capital?》（正文更新2025-07-21）：https://www.bankingsupervision.europa.eu/about/banking-supervision-explained/html/hold_capital.en.html 。读取第38–68行，资本资金来源、风险加权资产与多层约束。具体监管门槛只作题设模型，不冒充中国银行现行比例。
6. New York Fed《FAQs: Reverse Repurchase Agreement Operations》（正文2026-09-16）：https://www.newyorkfed.org/markets/rrp_faq.html 。实际读取第192–196、229–233行，临时交易证券仍列SOMA资产、准备金负债转为逆回购负债。检索摘要一度显示2026-03-23，按实际打开正文日期记录；不使用当前利率或额度出题。
7. Fed《Term Deposit Facility》：https://www.federalreserve.gov/monetarypolicy/tdf.htm 。实际读取第6–8行，期限内资金离开准备金账户但形成另一项央行债权。页面最后更新2019，作为机制例而非宣称当前操作规模。
8. Fed等机构《Interagency Policy Statement on Allowances for Credit Losses》：https://www.federalreserve.gov/frrs/guidance/interagency-policy-statement-on-allowances-for-credit-losses.htm 。读取第25–45行表外承诺、减值准备与核销，第149–153行未提款承诺的损失计量。明确为美国GAAP材料，仅用明示教学会计假设；不将其范围例外或计量细节等同于IFRS或中国准则。
9. ECB《Minimum reserves》：https://www.ecb.europa.eu/mopo/implement/mr/html/index.en.html 。已取得全文，并沿官方链接读取解释页 https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me/html/minimum_reserve_req.en.html 第38–45行；第40行明确维持期平均要求。正文更新2023-11-08；不用现行利率和实际维持期天数。
10. BIS FSI Occasional Paper10《Liquidity transfer pricing: a guide to better practice》：https://www.bis.org/publications/fsi-paper-10-liquidity-transfer-pricing-guide-better-practice 。已实际读取公开Executive summary，长期资产的边际匹配融资成本、稳定负债的流动性贡献、备用承诺成本。64页PDF未读取，不宣称全文核验；为研究指导，不当作中国强制规则。
11. BIS《General credit risk management》CRI10：https://www.bis.org/committees/bcbs/basel-consolidated-guidelines/module/cri/10 。已取得正文并读10.23–26、10.40–49、10.59–61，借款目的、还款来源、持续监测、表内外敞口。页面为整编指南展示，出题只采用稳定风险原理而非当地法律义务；仍会核对原始来源与页面版本说明。
12. IMF《Liberalizing Capital Movements: Some Analytical Issues》：https://www.imf.org/external/pubs/ft/issues/issues17/index.htm 。已取得全文，逆向选择与道德风险段落在具体案例编写前定位；不采用资本流动政策结论。

## 初筛后的候选目标

以下是待写/待复核候选，不是已完成题数。每项只拟一题，若再次查重不足独立则合并或撤去。

### 银行与非银行账务
1. 本金偿还与贷款核销对存款存量的不同影响，避免把已花出的存款随坏账一起删除
2. 一笔本息还款拆成贷款资产减少与利息收入，不能把全部回款当本金或利润
3. 银行从非银购买存量证券可以增加存款，贷款余额不增不代表存款必不增
4. 承诺额度与已经提款贷款分开，未提款不等于银行没有信用承诺
5. 同业债权在银行部门合并时抵销，避免将同一终端信贷在融资链条重复计算
6. 银行换取纸币及客户提现的两步账户变化，区分准备金、库存钞与公众持钞
7. 央行购债后收款人还贷款，可使广义存款回落而央行准备金仍存续
8. 非银行用既有存款放贷与银行贷记新存款不同，识别资金转移与货币发行能力边界
9. 利息资本化增加应收债权但没有收到现金，不能把展期账面收益当已清偿
10. 出售贷款而保留服务角色，服务费职能不自动等于仍持有全部贷款信用敞口

### 损失吸收与流动性
11. 银行资本是资金来源而非另一个现金资产账户，不能与资产相加
12. 获得央行贷款改善现金支付但不修复原有负权益，核对资产负债同时扩张
13. 债转股可以修复权益而没有新现金流入，与外部现金注资分开
14. 已计提准备后的核销不能再次扣同一笔资本损失
15. 折价急售满足提现同时可能吞噬资本，计算现金与权益的不同变化
16. 风险加权资本约束与非风险加权杠杆约束必须并行，低权重资产扩张仍可能触线
17. 风险迁移导致RWA增加可压缩资本缓冲，即使账面贷款未新增
18. 资本缓冲要求下调不等于实际资本或准备金到账
19. 总资本合格不替代高质量资本最低要求，不能任意用次级工具填普通股缺口
20. 会计资本中的reserves与央行准备金不是同一张表的同一科目
21. 银行资本扣除内部重复资本的原因，避免通过循环持股创造系统损失吸收能力（待额外核源）
22. 契约式资本工具在持续经营/处置阶段的损失吸收差别（与19再次去重，必要时合并）

### 央行操作与银行结算
23. 财政在央行账户的收支改变银行准备金，央行总资产可保持不变
24. 央行逆回购的负债替换并非同额出售资产出表
25. 央行总资产缩减不推出准备金一对一减少，还需其他负债变化
26. 央行定期存款与可用于当日结算的准备金分开，资产请求权不消失
27. 准备金平均维持要求与每日最低余额不同，按剩余天数安排额度
28. 同业市场融资与央行融资对全系统准备金的差别（须避免重写已有普通跨行结算）

### 信用中介与银行内部风险价格
29. 长期贷款采用隔夜平均资金成本会高估业务利润，需匹配期限边际资金成本
30. 承诺备用额度即使未用也会消耗备用流动性安排，不能只对已提款收费计风险
31. 稳定存款业务的内部流动性收益不等于集团凭空产生对外收入
32. 活期存款的行为期限模型不改变客户法律上可提现的选择，区分模型与合同约束
33. 净利息收入和经济价值使用不同期限的风险口径，不能以一个指标代替另一个（待IRRBB原文核验）
34. 存款利率传导比例与资产重定价共同决定银行息差，不把政策利率变化一比一套到全部存款（与宏观作者确认银行内部范围）
35. 高贷款利率可能筛走低风险借款人，借前逆向选择与机械提高收益率不同
36. 放贷后借款人改变项目风险属于事后激励问题，选择监控/约束而非仅查原评分
37. 抵押品或担保不能代替借款人主要还款现金流分析
38. 不良贷款率因新贷款分母扩张而降低，并不证明原有坏账得到清偿
39. 借新还旧或重组到期日不等于经营现金回收与信用质量已恢复
40. 银行自身外汇资产负债匹配后，未对冲借款人的汇率变化仍可传导成信用风险
41. 信用登记资料还用于发现现有债务总量，不能只把无历史违约当充足偿债能力
42. 贷款价格需要覆盖资金、经营与预期信用成本，比较名义利率不同的净经济贡献
43. 低净市场风险的回购匹配账簿仍会扩张毛资产并占用杠杆容量（与16去重，必要时合并）
44. 银行间直接债权链条的违约传染，不同于多个银行共同持有同一风险因子的相关损失

## 当前落盘状态

候选44项。第一稳定检查点已落盘20题，ID为securities1-expansion-intermed-0001至0020，13条数值核验记录。尚待另一轮AI逐题内容与来源复核；作者自检不冒充独立审计。两个导出为EXPANSION_INTERMEDIATION_QUESTIONS（securities1数组对象）和EXPANSION_INTERMEDIATION_SOURCES。章节较窄时不把候选数当硬配额。

## 第一检查点逐题目标及复算索引

- securities1-expansion-intermed-0001：本金偿还与坏账核销的存款差别；来源expansionIntermedMoney，报告印刷第16页：贷款还本销减存款；对照题设中的无付款核销
- securities1-expansion-intermed-0002：本息扣款需要拆分资产与收入；来源expansionIntermedMoney，报告印刷第16–17页：银行资产负债与还本；题设无预提利息的收入确认
- securities1-expansion-intermed-0003：贷款未增长仍可能发生存款创设；来源expansionIntermedMoney，报告印刷第17页：银行购买既有资产也能创设存款
- securities1-expansion-intermed-0004：未提款承诺与已发放贷款分栏；来源expansionIntermedACL，表外信用承诺与已融资资产；题设额度及提款分拆；作者复算 1000-300 = 700 万元
- securities1-expansion-intermed-0005：同业融资链条中的终端信贷去重；来源expansionIntermedMoney，报告银行部门资产负债边界；题设合并口径的内部债权抵销；作者复算 90 = 90 亿元
- securities1-expansion-intermed-0006：准备金换钞与客户提现不可并成一步；来源expansionIntermedFedLiabilities，Currency in circulation：银行兑换票币与公众提现的两步变化；作者复算 10+20-25 = 5 万元库存现金
- securities1-expansion-intermed-0007：出售贷款后保留服务职责不等于保留全部贷款风险；来源expansionIntermedLoanSale，Overview：贷款转让与服务角色可分开；合同有无追索决定保留信用损失
- securities1-expansion-intermed-0008：央行借款增加现金但不修复负权益；来源expansionIntermedLiquidity，资本为资产减负债；央行贷款的双边账务参见Fed liabilities；作者复算 (98+10)-(100+10) = -2 亿元权益
- securities1-expansion-intermed-0009：债转股改善资本不等于收到现金；来源expansionIntermedCapital，普通股作为损失吸收资金；题设债务转换的账务恒等式；作者复算 100-(104-8) = 4 亿元权益
- securities1-expansion-intermed-0010：已计提贷款核销不能重复扣损失；来源expansionIntermedACL，第42–45段：备抵抵减账面资产，核销冲减相关备抵；作者复算 (100-20)-(30-20) = 70 万元贷款净额
- securities1-expansion-intermed-0011：急售支付提现时区分交易损失与负债偿还；来源expansionIntermedCapital，急售资产的流动性改善与损失吸收：报告印刷第204–205页；作者复算 5-(20-15) = 0 亿元权益
- securities1-expansion-intermed-0012：零风险权重资产仍占用杠杆容量；来源expansionIntermedECB，风险加权资本与资本充足要求；杠杆口径参见BoE capital；作者复算 5/150*100 = 3.3333333333333335 %杠杆比率
- securities1-expansion-intermed-0013：银行外汇头寸匹配后仍有借款人汇率信用风险；来源expansionIntermedBorrowerFX，CRE20.92–20.93：个人借款人收入与贷款币种错配产生额外信用风险
- securities1-expansion-intermed-0014：下调资本要求释放空间不创造资本资产；来源expansionIntermedECB，资本最低要求、额外要求与缓冲层次；题设仅变化要求线；作者复算 (13-10)-(13-12) = 2 亿元监管空间增量
- securities1-expansion-intermed-0015：财政央行账户收支改变准备金负债结构；来源expansionIntermedFedLiabilities，Treasury General Account：财政收支与银行准备金；作者复算 50-30+20 = 40 亿元银行准备金
- securities1-expansion-intermed-0016：央行逆回购不能按普通卖断证券出表；来源expansionIntermedRRP，What are the mechanics of an ON RRP operation?；证券仍列SOMA资产；作者复算 100-40 = 60 亿元准备金
- securities1-expansion-intermed-0017：缩表金额不能直接当作准备金降幅；来源expansionIntermedFedLiabilities，The effect of balance-sheet changes：总资产与多种负债的账务约束；作者复算 -100-(-20-50+10) = -40 亿元准备金变动
- securities1-expansion-intermed-0018：平均准备金维持期的剩余日数安排；来源expansionIntermedReserveAverage，第40段：维持期平均要求；题设五日简化模型；作者复算 (80*5-100-90-80)/2 = 65 亿元每日余额
- securities1-expansion-intermed-0019：购债所得还贷后存款回流与准备金留存；来源expansionIntermedMoney，报告印刷第20–21页reflux及第24页QE：存款被用于还贷
- securities1-expansion-intermed-0020：非银行贷款增长不必创造银行存款；来源expansionIntermedMoney，银行与非银行部门账户边界；题设非银行以既有存款融资

### 首轮去重后的实质替换

0007原资本非现金、0013原总资本不能替普通股已撤去，不另计数量。0007改为贷款出售但保留服务职责时的信用合同与服务义务边界，明示没有追索、垫付、担保或次级风险保留；0013改为银行自身美元头寸匹配仍面临借款人币种错配传来的信用风险。0003仅替换一个相近误区干扰项。其余首20不动。

新增实际来源：
- OCC Mortgage Banking / Residential Lending https://www.occ.gov/topics/supervision-and-examination/credit/retail-credit/mortgage-banking-residential-lending.html 第156行，贷款与服务权持有/出售可分开组合；并读取235页Mortgage Banking手册 https://www.occ.gov/publications-and-resources/publications/comptrollers-handbook/files/mortgage-banking/pub-ch-mortgage-banking.pdf 印刷第12、48–49页及Servicing Recourse检索段，贷款风险保留来自合同。没有读取全书，不采用旧法定比例或出表规则。
- BCBS CRE20 https://www.bis.org/committees/bcbs/basel-framework/standard/cre/20/inforce/2023-01-01/published/2022-12-08 ，2023版本第20.92–20.93段，个人借款人贷款与收入币种错配及对冲定义。只用信用传导机制，不采用1.5倍权重或推为中国要求。

## 第二检查点：0021–0034

新增14题，累计34；第二段12条数值记录，累计25。首20对象逐项比较未变化。主要目标为匹配期限资金定价、分段摊还资金成本、备用额度储备净成本、无期限存款行为与合同、NII/EVE不同视窗、存款利率部分传导、借前筛选与借后激励、综合偿债、坏账率分母扩张、借新付息、风险权重迁移、直接同业两轮传染，以及抵押依赖贷款的回收方式条件。

### 本段来源补证

- BIS FSI Paper10 64页PDF已进一步实际取得并读取3.5–3.6.2（PDF第37–41页，印刷31–35页）及4.5–4.7（PDF第51–56页，印刷45–50页），不再仅限公开摘要。https://www.bis.org/publications/fsi-paper-10-liquidity-transfer-pricing-guide-better-practice.pdf 。摊还贷款题明确单利和本金年口径，不直接套原文样例数字。
- BCBS 2016 IRRBB原文51页PDF已实际读取第33–46段和附录2.1–2.2、3.4（PDF第11–15、39–43页）。https://www.bis.org/publications/201604-standards-interest-rate-risk-banking-book.pdf 。只核验收益与经济价值的范围、行为假设、受管理利率的响应，不采用2016历史监管冲击值或将其当当前中国法定限额。
- IMF Economic Issues17直接open两次出现Internal Error，但官方域名检索返回完整Adverse selection/Moral hazard段，实际读到借前类型筛选与借后有限责任风险承担。https://www.imf.org/external/pubs/ft/issues/issues17/index.htm 。原始项目、比例和收益均未复制。
- CRI10当前页面明确标为2026整编征求意见展示，原始底稿链接为2025年4月正式信用风险管理原则。已读10.23–26、10.29–31、10.40–49。正式底稿页面可访问 https://www.bis.org/publications/202504-guidelines-principles-management-credit-risk ，但19页PDF点击返回Internal Error，故不声称已取得完整正式PDF。题目使用稳定信用原理，不引用其作为当地强制要求。
- BIS Working Paper908 https://www.bis.org/publications/working-paper-908-contagion-accounting 实读Focus/Contribution/Abstract第535–546行；原文区分直接同业链与共同资产急售，未读41页全文。不把欧元区样本中直接传染较小的经验结果推广成不存在传染；0033全部回收率与违约阈值由题设定义。
- Fed ACL原文实际补读Collateral-Dependent Financial Assets第116–117段，依出售偿还时扣销售费、依经营偿还时不作该销售费调整；0034明示美国GAAP背景与简化计量，不当作中国准则测验。

### 第二段逐题索引

- securities1-expansion-intermed-0021：长期贷款内部盈利应扣匹配期限资金成本；3.5匹配期限边际资金成本；避免以隔夜成本评价长期贷款；作者复算 (0.05-0.04)*100 = 1 %内部利差
- securities1-expansion-intermed-0022：摊还贷款的资金成本按金额和占用年数归集；3.6.2：摊还贷款按现金流分段匹配资金，不按末日全额计费；作者复算 (50*.02*1+50*.04*2)/(50*1+50*2)*100 = 3.3333333333333335 %等效年资金率
- securities1-expansion-intermed-0023：备用额度的流动性成本不能只向已提款部分收费；4.5–4.7：未用额度导致或有流动性储备的持有成本；作者复算 (1000-200)*.4*(.04-.03) = 3.2 万元一年净持有成本
- securities1-expansion-intermed-0024：存款行为期限不改变客户即期提现权；第44–46段与附录3.4：无到期日存款的合同权利与行为假设
- securities1-expansion-intermed-0025：一年净息差稳定不能排除更长期经济价值损失；第33–34段：NII短中期收入视角与EVE剩余寿命现值视角
- securities1-expansion-intermed-0026：存款利率部分传导下的银行净利息收入变化；第41、46段：受管理存款利率的传导假设；附录2.2净利息收入；作者复算 200*.02-250*.4*.02 = 2 亿元一年净利息收入增量
- securities1-expansion-intermed-0027：提高贷款利率可能筛走低风险申请人；Adverse selection：利率变化导致申请人构成变化，项目类型在借款前已确定；作者复算 120*.5 = 60 单位货币提价后预期回款
- securities1-expansion-intermed-0028：放款后风险转移的股东和债权人激励不同；Moral hazard：融资后项目选择与有限责任产生风险转移激励；作者复算 .5*Math.max(200-110,0)+.5*Math.max(0-110,0) = 45 单位货币股东预期剩余
- securities1-expansion-intermed-0029：无历史逾期不能省略当前多头债务服务额；CRI10.25–10.26：还款历史、当前能力及信用登记的不同信息；作者复算 120/(100+30) = 0.9230769230769231 倍债务服务覆盖
- securities1-expansion-intermed-0030：新增正常贷款稀释不良率不等于旧坏账回收；CRI10持续监控原则；题设不良存量与贷款规模口径；作者复算 50/(1000+500)*100 = 3.3333333333333335 %期末不良率
- securities1-expansion-intermed-0031：新贷支付旧贷利息不能证明经营偿债恢复；CRI10.25与10.40–10.49：现金偿付来源及再融资后的持续信用分析；作者复算 100+20 = 120 万元期末贷款本金
- securities1-expansion-intermed-0032：信用迁移可在贷款余额不变时消耗资本缓冲；风险权重与资本比率；题设评级迁移改变权重而非余额；作者复算 8/(100*1)*100 = 8 %迁移后资本比率
- securities1-expansion-intermed-0033：没有直接持有首家银行债权也可能遭受第二轮损失；Focus/Abstract：直接同业债权链与共同资产渠道区别；原创两轮模型；作者复算 15*(1-.8) = 3 亿元第二轮信用损失
- securities1-expansion-intermed-0034：抵押依赖贷款以出售或经营回收时销售费处理不同；Collateral-Dependent Financial Assets第116–117段：出售与经营回收的销售费处理；作者复算 130-(120-10) = 20 万元甲贷款损失准备


第二段复核修订：0024将弱项改为“合同即期提现就必须全部即期重定价”的实际模型混淆；0029改为覆盖率倒置的1.08倍误判；0034明确报告日财务困难且已满足抵押依赖贷款定义，不把普通有抵押贷款泛化为该计量范围。以上三项按复核要求修改，其他第二段对象未动。

## 第三检查点：0035–0040

新增6题，累计40，新增5数值记录，累计30。未进入证券DvP、证券CCP、CSD托管层级范围；已直接和投资作者协调。

### 实际来源及适用边界

- BoE 2021《CHAPS Liquidity Saving Mechanism User Guide》15页PDF第7页第8–11段已读，匹配集合内付款同时结算。https://www.bankofengland.co.uk/-/media/boe/files/payments/liquidity-saving-mechanism-user-guide.pdf 。不用历史周期频率、额度或节省比例；0035全部结算限制由题设给定。
- ECB 2020《Information Guide for TARGET2 Users v14.0》221页PDF词汇表印刷第202页已读FIFO by-passing定义。https://www.ecb.europa.eu/paym/target/target2/profuse/nov_2020/shared/pdf/Information_Guide_for_TARGET2_users_v14.0.pdf 。历史TARGET2资料不冒充当前T2全套规则；0036为明确允许跳过但不允许拆笔的教学队列。
- Fed《Intraday Credit Policies》9-1014（网页第3790–3792行）实际读取：正余额置零，逐分钟无抵押负余额，分母为完整24小时。https://www.federalreserve.gov/frrs/regulations/ii-federal-reserve-intraday-credit-policies.htm 。不用费率/豁免/净借记限额，避免旧2011指南与现文分母口径混用。
- BCBS LCR40.1及40.77实读：总流入抵扣上限以总流出为基数。https://www.bis.org/committees/bcbs/basel-framework/standard/lcr/40/inforce/2019-12-15/published/2023-03-30 。0038明示75%模型且无例外，不代表完整中国监管计算。
- OCC《Accounts Receivable and Inventory Financing》78页PDF印刷第9页实际读取持续营运资金及循环额度clean-up段。https://www.occ.gov/publications-and-resources/publications/comptrollers-handbook/files/accts-rec-inventory-financing/pub-ch-accts-rec-inventory-financing.pdf 。历史手册只用于经营资金用途诊断，不使用其历史5–7年/30天等参数；0039明示原创20天合同条件。
- Fed ACL原文第64–66段补读共同风险特征变化、单独评价贷款移出组合；0040为明确模型边界下的准备对账，非完整会计估计建议。

### 第三段逐题索引

- securities1-expansion-intermed-0035：付款环路同时结算可释放流动性阻塞；第8–11段：匹配付款集合同时结算；题设只要求批后各户非负；作者复算 Math.max(10-8-2,0) = 0 万元所需新增资金
- securities1-expansion-intermed-0036：可跳过队首的付款队列不是自动拆单；词汇表FIFO by-passing：缺资金的首笔可跳过以尝试后续整笔付款；作者复算 5-3 = 2 万元剩余可用余额
- securities1-expansion-intermed-0037：昼间平均透支不能由正余额跨时抵销；9-1014：正余额置零后累计负余额，并以完整24小时折算；作者复算 (120*2+60*1)/24 = 12.5 万元平均未抵押透支
- securities1-expansion-intermed-0038：流动性流入抵扣上限约束净流出计算；LCR40.1、40.77：流入最多抵扣预期流出的75%，无题设豁免；作者复算 50-Math.min(45,50*.75) = 12.5 亿元净现金流出
- securities1-expansion-intermed-0039：循环额度低谷仍持续占用时应识别融资底座；印刷第9页：季节性额度清理与持续营运资金分层
- securities1-expansion-intermed-0040：贷款单独估损后不能继续留在原池重复计提；第64–66段：不再具有共同风险特征的资产单独评价，并移出组合估计；作者复算 (1000-100)*.02+60 = 78 万元合计损失准备

## 第四检查点：0041–0055，贸易融资本质与信用工具

新增15题，累计55；新增2个数值记录（0049、0051），累计32。每题四项解释均不少于15字，正确项长度相对于次长错误项未出现1.5倍线索。为逐题AI辅助原创，并非ICC/OCC题目翻写，也不声称人工审定。

### 教材归属与范围控制

项目证券基础第1章为金融市场与融资结构，包括货币市场、间接融资和信用链；第5章为债券、利率与信用工具。承兑、托收、应收融资和信用证用于辨认债务人、付款承诺、融资时点及信用风险，不考一般贸易报关、运输费用、Incoterms记忆或美国业务许可。0046的运输条件仅用于检验担保品控制，非物流实务知识测试；0054归第8章风险管理。所有特殊付款条件均在题干明示，不能泛化为全部法域的无例外法律结论。

查重范围包括src全题库及本模块：已有QDII信用证担保关联方资格题，与本批相符交单/独立保兑目标不同；已有保理企业股权投资范围题不涉及本批融资结构。排除一般“服务不兜底”独立题，只保留0044为选择额外信用承诺的具体合同决策；未写保理与福费廷名称对照、票据贴现通用公式、年度额度重复加总等边际较弱候选。0047的款项受让与履约交单资格，是不同权利的分拆；0048则考另开信用证的独立付款义务，两者不是仅换参与人。

### 一手来源实读及限制

1. OCC《Trade Finance and Services》Version1.1，2018-10-15更新，107页PDF：
   https://occ.gov/publications-and-resources/publications/comptrollers-handbook/files/trade-finance-services/pub-ch-trade-finance.pdf
   2026-10-14通过web全文读取，印刷第4–8、10、13–15、21–23、79–80、94–96页。其中承兑在印刷第6–7页，信用证单据独立及保兑第4页，备用第5页，保理第10页，供应链融资第13页，订单融资第8页，背对背/红条款第95页。旧版本仅核验稳定业务机制，不采用旧监管阈值、Fed可贴现资格、历史市场规模、预付“消除所有风险”等宽泛措辞；也不把商业信用证必然产生新增贷款作为结论。
2. 美国商务部国际贸易管理局《Trade Finance Guide 2022》40页PDF，第5章Documentary Collections，PDF第14–15页/印刷第12–13页：
   https://www.trade.gov/sites/default/files/2022-07/Trade_Finance_Guide_2022.pdf
   2026-10-14实际读取D/P、D/A、空运及直接记名运输文件控制边界。0046直接给出承运合同放货条件，避免把所有空运作统一不可控制的断言。
3. ICC Digital Library，King-Tak Fung《Distinguishing transfer and assignment》，DCInsight2008年第1期，Transfer v. assignment段：
   https://library.iccwbo.org/content/tfb/dcinsight/DCI_Vol14n1_TheLegalCorner.htm
   2026-10-14全文公开读取，仅使用收款权与交单履约权的区别。它是ICC刊载专家文章，不等同UCP完整正式规则；不抄录UCP条文，不采用文中已经过时的中国合同法/物权法/登记结论。0047明示款项让与有效，排除登记及跨法域冲突问题。
4. 美国国际贸易管理局《Financing for International Buyers》：
   https://www.trade.gov/financing-international-buyers
   2026-10-14读取网页关于境外买方融资与出口商现金收款结构；0055不考具体EXIM项目资格、担保比例或放款现行条件。

### 第四段逐题索引
- securities1-expansion-intermed-0041：银行承兑信用与申请人备款是两层关系；印刷第6–7页Acceptances与Banker’s Acceptances：承兑银行对到期持票人的付款承诺
- securities1-expansion-intermed-0042：信用证相符交单与货物质量争议分轨处理；印刷第4–5页Commercial Documentary Letters of Credit：银行审核单据而非实物货物
- securities1-expansion-intermed-0043：备用信用证不形成每笔货款的重复常规支付；印刷第5页Standby Letters of Credit：以申请人未履行基础义务为备用付款情形
- securities1-expansion-intermed-0044：选择信用增级时要核对保兑而非通知动作；印刷第4、14、79–80页：保兑的直接承诺与通知的认证传递角色
- securities1-expansion-intermed-0045：承兑交单把付款前的控制变成到期信用敞口；第5章Two Types of Documentary Collections：D/P与D/A交单条件和卖方信用暴露
- securities1-expansion-intermed-0046：托收控制单据不一定控制应收款背后的货物；第5章Key Points：空运或直接记名运输时，持有文件未必控制实物交付
- securities1-expansion-intermed-0047：受让信用证款项不等于成为第二受益人；Transfer v. assignment段：信用证款项受让权不包括履约及交单权
- securities1-expansion-intermed-0048：背对背信用证的资金支持不能自动抵销独立付款义务；印刷第94–95页Independent undertakings与back-to-back：以原证支持另开新证
- securities1-expansion-intermed-0049：装运前预支款需要在信用证结算时抵扣；印刷第95页red clause：装运前预支款由后续信用证款项偿还；作者复算 100-25 = 75 万元新增现金
- securities1-expansion-intermed-0050：到期保理承担信用风险却未必解决当前资金缺口；印刷第10页Factoring：discount factoring与maturity factoring付款时点不同
- securities1-expansion-intermed-0051：应收款稀释不能全部当成债务人无力偿付；印刷第8、10页：应收账款商业争议及dilution并非一般信用保险所承保的损失；作者复算 100-15 = 85 万元有效应收
- securities1-expansion-intermed-0052：反向保理拆开供应商到账日与买方付款日；印刷第13页Financial Supply Chain：已批准发票的供应商提前收款与买方到期支付
- securities1-expansion-intermed-0053：订单融资须分析应收款尚未形成的履约环节；印刷第8页Purchase Order Financing：生产履约与买方偿付两类前提
- securities1-expansion-intermed-0054：汇率稳定不能排除外债资金转移受限；印刷第21–23页：国家兑换转移限制与汇率价格风险分别分析
- securities1-expansion-intermed-0055：出口买方信贷的借款人不能按贷款款项收款人认定；Financing for International Buyers：买方取得贷款与出口商获得现金是同一融资的两端

第四段干扰项复核修订：0044用不可撤销通知与保兑、仅凭开证行账户资金偿付与独立信用承担的角色混淆替换弱项；0046改为正本空运单与可转让海运提单效力误认；0047改款项让与通知签收与信用证转让程序误认；0050区分承险、预支、购入生效与支付日；0055区分买方付款授权、资金收款人和违约后无追索条件下的债务人。题干与正确目标不变。

## 第五检查点：0056–0067，证券化现金流与信用结构

新增12题，累计67；新增7个数值记录，累计39。作者逐项计算，外部复核记录由另一轮AI独立维护。四项理由和选项长度结构均检查，无15字以下解析或正确项1.5倍长度线索。

### 独立目标及协调

全部归证券基础第6章“基金、资产证券化与金融产品”。已与投资作者直接核对，其未占用本段目标；避开其SPPI会计分类新段。排除已在投资模块出现的一般费用/利息/本金瀑布、次级先损公式、超额抵押/利差、循环转摊还、服务商垫款非担保以及提前偿还变慢延长期。0058新增支持档耗尽后的两期状态转换；0059新增支付时间顺序与信用损失分担的两个维度；0067对照垂直持有与水平首损相同金额的不同风险形状，而非再做一题单层损失穿透。

### 本段一手来源实读

- Fannie Mae 2023-05-01 Single-Family REMIC Prospectus，74页。实际读取印刷第11页WAC存续权重、第23页计息与利息转本金、第31–32页WAL和模型、附录A第A-1至A-4页AD/PAC/SUP/SEQ/IO/PO/Z。https://capitalmarkets.fanniemae.com/sites/g/files/koqyhd216/files/syndicated/mbs/remicpros/FNM_REMIC_Base_20230501.pdf 。不采用历史税法、适当性或政府担保的当前结论，结构条款均明示为教学合同。
- Freddie Mac UMBS/MBS Offering Circular，2019-04-30，91页PDF印刷第53页Pool Factors、Use of Factors实际读取。https://capitalmarkets.freddiemac.com/mbs/docs/umbs_mbs_oc_043019.pdf 。仅因子与付款数学，不采用历史付款日、发行资格或对所有ARM的泛化。本题排除负摊还与复杂调整。
- BIS 2026年3月Quarterly Review，The rise and risks of synthetic risk transfers，The economics of SRTs实际读取。https://www.bis.org/publications/qr-202603/rise-and-risks-synthetic-risk-transfers 。参考资产仍持有与通过保护合同转移信用层，不将监管资本减免当作无条件结论。
- BIS FSI Insights 71，41页PDF第27、68段实际读取。https://www.bis.org/publications/fsi-insight-71-post-gfc-securitisation-reforms-and-new-initiatives-comparative-analysis.pdf 。原旧链接/fsi/publ/insights71.pdf跳至HTML，已通过HTML的实际PDF链接取得全文；题目引用此最终PDF。只读双重追索、垂直/水平自留机制，不用不同法域最低比例及拟议监管变化。
- Fannie Mae Selling Guide A2-3.2-03 Remedies Framework正文实际读取，形成缺陷、陈述保证和对正常贷款也可提供补救。https://selling-guide.fanniemae.com/sel/a2-3.2-03/remedies-framework 。本题合同明确回购触发，不推导所有逾期必须回购或真实出售必定无任何义务。
- BCBS CRE43.2第12项实际读取，服务商信用、资金混同及lockbox安排。https://www.bis.org/committees/bcbs/basel-framework/standard/cre/43/inforce/2019-12-15/published/2019-12-15 。只核验归集风险，借款人向指定服务商付款的清偿效力由原创题干明确。

### 第五段逐题索引
- securities1-expansion-intermed-0056：本金加权平均寿命应排除票息与市场折现权重；印刷第31页Weighted Average Lives：以每次本金支付金额加权支付年限；作者复算 (20*1+30*2+50*4)/100 = 2.8 年WAL
- securities1-expansion-intermed-0057：同次提前还本对仅利息与仅本金份额作用相反；附录A第A-3至A-4页IO/PO；题设固定折现率下的提前偿还现金流分拆
- securities1-expansion-intermed-0058：计划摊还档的稳定性受剩余支持档容量约束；附录A第A-2页PAC与Support定义；原创两期计划及支持档耗尽后的合同分配；作者复算 25 = 25 万元第二期PAC收款
- securities1-expansion-intermed-0059：顺序还本不自动等于信用损失上的优先劣后；附录A第A-2页Sequential Pay：本金时间排序；信用损失分配另由题设约定
- securities1-expansion-intermed-0060：池因子差与月息要使用各自的本金基数；印刷第53页Use of Factors：原始本金乘因子差还本，前期余额计息；作者复算 1000*(.8-.75)+1000*.8*.06/12 = 54 万元本息合计
- securities1-expansion-intermed-0061：合成证券化转移信用层却不自动卖出贷款取得本金；The economics of SRTs：贷款所有权留在银行，通过有分层的信用保护转移部分风险
- securities1-expansion-intermed-0062：担保债券的双重追索只补剩余债权不重复收偿；第27段：covered bonds双重追索；题设短缺债权及回收率避免重复赔付；作者复算 80+(100-80)*.2 = 84 万元合计回收
- securities1-expansion-intermed-0063：贷款回购触发应区分原始陈述不实与后续经营违约；The Remedies Framework及正常贷款补救：形成缺陷的陈述保证责任不同于一般信用担保
- securities1-expansion-intermed-0064：借款人已清偿而服务商未划款时追索对象不能混淆；CRE43.2(12)：服务商回款混同及lockbox；借款人清偿效力以题设为准
- securities1-expansion-intermed-0065：单笔固定利率未重置但资产池加权票息仍会变化；印刷第11页WAC classes：高票息资产更早退出可改变剩余池加权票息；作者复算 (50*.04)/50*100 = 4 %下一期加权票息
- securities1-expansion-intermed-0066：递延档利息转本金时同一现金可定向偿还另一档；印刷第23页Accrual；附录第A-1、A-4页AD与Z：递延利息转本金及定向还本；作者复算 -2+2 = 0 万元两档本金净变动
- securities1-expansion-intermed-0067：同额风险自留的首损位置与同比例位置并不等价；第68段：垂直自留与水平首损；本题只比较风险形状，不判断法定比例是否满足；作者复算 4*.05 = 0.2 万元甲承担损失

0059复核修订：弱项改为用“A先还清、后来损失只落B”的事后现金流，误证两档共同存续时的首损义务；解释区分存续时间差与信用从属。其他第五段题对象未改。

来源定位补正：2026-10-14已实际再读OCC现行PDF封面第1页第25–27行，2025-03-20删除声誉风险引用的说明位于PDF封面，而非产品入口网页。本批不据此更新或概括贸易工具的合同机制。


## 第六检查点：证券化指标与合同状态5题（0068–0072）

2026-10-14完成。累计72题、42条数值元数据；此前0001–0067均已完成另一轮逐题、来源及独立计算复核，本批5题亦已完成另一轮逐题、来源及独立计算复核。追加前67题对象完整JSON比对相同。新5题四项理由均不少于15字，正确项长度无1.5倍次长项预警。排除投资作者已有的循环购买阶段变化、逾期垫付不等于信用保证、超额利差可用缓冲等目标，没有为扩量复写。

### 实际核验来源

- FHFA，Investment Portfolio Management Module（2013 Version1.0）：https://www.fhfa.gov/sites/default/files/2023-05/Investment_Portfolio_Management_Module_Final_Version_1_0-508.pdf 。实际取得92页PDF并读PDF第74–76页（附录印刷第26–28页）Prepayment Speeds，明确SMM分母扣计划本金，PSA以发放后贷款月龄爬坡；另读PDF第7–8页反向浮动利息方向。只采用稳定数学和结构机制，未采用2013年市场状况、LIBOR现行性或历史监管判断。原尝试Fannie托管的2007私人证券化月报，搜索摘要可见SMM定义但直接PDF打开失败，未将其加入题目来源，改用完整实际可读FHFA原文。
- Fannie Mae2023 REMIC基础说明书：前一批已列实际URL；本次补读印刷第32页Prepayment Models和附录A-1 NSJ、A-2 SJ及A-3 FLT/INV，核对PSA和触发是否保留状态，以及浮动/反向浮动结构。条款情景、两档本金及票息由本题原创设置；不搬用原文示例金额和联邦税收内容。
- BIS CRE40（2023-01-01生效版本）：https://www.bis.org/committees/bcbs/basel-framework/standard/cre/40/inforce/2023-01-01/published/2020-11-26 。已读取40.9、40.28–40.30；清仓回购须分别检查自愿性、余额规模与不提供信用增级，40.30明确实际起信用支持作用的处理。题目指定该框架作概念判断，不声称10%为所有市场、所有产品现行法定条件。

### 逐题独立目标与计算

- 0068：SMM先把实际收到本金88中的计划本金40剔除，提前还款48；分母1000−40=960，所以5%。同时检验分子分类与分母存量，非普通年化利率换参题。
- 0069：证券刚发行并不重置池中20个月龄贷款；100% PSA基准0.2%×20=4%，150% PSA为6%。模型假设不宣称能预测真实偿还。
- 0070：固定资产年利息6，F本金75按6%得4.5，I本金25分1.5即6%；r再升1个百分点，F多取0.75，由I分担，I票息降3个百分点。既核对金额守恒，也核对本金权重造成的反向杠杆。
- 0071：相同当期指标并不抹掉合同的永久触发历史，甲B优先、乙恢复A优先；题设把是否可逆完整列出，无须背专业缩写。
- 0072：剩余80/1000=8%只满足规模测试；支付80取得可回收65的资产，15差额有明确损失支持目的，不能只按清仓名称否认信用支持。

独立本地复算：分开直接重建48/960=0.05；按20月模型4%×1.5=6%；F与I现金利息4.5+1.5=6，r=6%后F5.25、I0.75仍共6，I率3%；永久/逐期状态检查分别为B/A。数值元数据只包含3项主计算，不以增加多项测试充当新增题量。

## 第七检查点：债券现金流与可持续融资9题（0073–0081）

2026-10-14完成。累计81题、45条数值元数据；0001–0072已获另一轮复核接受，本段9题也已获另一轮复核接受。追加前72题对象完整JSON比对相同。四项理由均不少于15字，正确项长度无1.5倍次长项预警。与投资作者明确划界：本段不考ESG金融资产SPPI分类、货币市场报价换算或浮息债报价利差。既有发行拍卖、重开债券与一般次级分层均不重复。

### 一手来源实际读取及限制

- 美国财政部TIPS产品机制：https://www.treasurydirect.gov/laws-and-regulations/auction-regulations-uoc/inflation-protected-securities/ 。实际读取固定票息率、按指数化本金半年付息、本金调整到期支付及原始面值底线。题目仅明确适用美国TIPS，不泛化为全部通胀债。
- 美国官方2025年度31 CFR Part356汇编：https://www.govinfo.gov/content/pkg/CFR-2025-title31-vol2/pdf/CFR-2025-title31-vol2-part356.pdf 。实际取得53页PDF，读取PDF第16页356.30(b)本金补足与最终利息基数不同，第17–18页356.31(b)(3)(iv)、(d)本金和利息组件不能互换、重组须全套剩余组件。单独eCFR356.30网页工具打开失败，未假称读取；用官方汇编与实际可读TreasuryDirect现行产品页交叉核验稳定机制，不涉及税制或历史最低面额。
- eCFR现行Appendix B：https://www.ecfr.gov/current/title-31/subtitle-B/chapter-II/subchapter-A/part-356/appendix-Appendix%20B%20to%20Part%20356 。实际读取III.A.1–3关于非季调CPI-U与每月第一天取第三个前月指数。页面抽取的日插值公式不用于题目，0075只用清楚的月首文字定义。
- 美国财政部STRIPS：https://www.treasurydirect.gov/marketable-securities/strips/ 。实际读取每次票息及本金分别为单次支付组件，以及重组需收齐全部剩余组件的段落。0076限定普通国债，不复制产品页对“fixed principal”列举TIPS的易混宽泛文字。
- ICMA《The Principles Guidance Handbook》，2025年6月，51页PDF：https://www.icmagroup.org/assets/documents/Sustainable-finance/2025-updates/The-Principles-Guidance-Handbook-June-2025.pdf 。实际读取1.1(a)(d)印刷第4页用途型与挂钩型结构；2.1.6–9及2.1.12印刷第12–13页重复认领与实际支出；2.2.4印刷第16页接续再融资；4.4.1–2印刷第34–35页激励应看幅度、时长及赎回；4.4.10印刷第38页观察日前赎回。自愿市场原则，不是全球强制法律。原创题干明确遵循框架或合同，不长段复制材料，不将绿色标签当评级担保。

### 独立目标及复算

- 0073：TIPS40美元指数本金调增继续留存，半年现金利息1040×2%÷2=10.40美元；区分债权存量和本期支付。
- 0074：到期本金不足原始面值补至1000，不保二级买价1080或历史高点1150；最后票息仍960×2%÷2=9.60美元。
- 0075：6月1日对应第三个前月3月CPI305，不取最新4月310或6月预测315；月首不使用简单平均。
- 0076：8笔利息加1笔本金形成9组件；末次同日支付不合并其不同权利身份。
- 0077：重组需缺失的末次利息证券；同日本金组件、现金或不完整重组不能替代。
- 0078：用途型绿色债审核项目资金分配，SLB审核目标及挂钩现金流；非SPPI会计判断。
- 0079：净募集70、实际合格支出50，待分配20；市值80不创造额外现金支出。
- 0080：同一60支出不能在甲乙同时未偿时重复认领；甲退出后符合条件的接续融资不被永久禁止。
- 0081：无罚赎回在目标测试之前可能削弱挂钩激励；检查时点与退出权，而非只比较50基点或假定一定赎回。

本地另用独立直接算式重建三条主数值：半年1%=1040/100=10.4；960/100=9.6；未使用募集70−50=20；组件8+1=9作为结构核对。不把额外核对数量充作题量。全批情景、四选项与四理由均为AI辅助逐题原创，接受状态以另一轮审计记录为准。

0079复核修订：把市值导致失格的弱干扰改为“余20万元暂存银行即可算完成项目分配”；解析明确临时管理与实际合格项目支出是不同状态，题干及其余选项不变。

## 第八检查点：融资组织与营运资产授信14题（0082–0095）

累计95题、49条数值元数据；0001–0081已接受，本段14题待审。前81题完整对象相同；源文件通过临时文件原子替换追加。全部四项理由长于15字，无正确项长度1.5倍次长项线索。本段不是同一额度公式换数，分别判断合同分组、机构主体、管理职责、服务与信用收入、权利拆分、分组成员构成、侧向授信和营运资产状态。

### 课程范围及访问限制

按本库证券基础主题课第1章融资结构、第2章金融中介机构安排，不宣称逐条覆盖官方考纲。2025官方大纲公告可检索确认2026年施行：https://www.sac.net.cn/pxzx/pxzdydg/202511/t20251110_68680.html ；移动入口搜索亦可见同公告，网页工具打开未得正文，普通读取返回HTTP567，未取到官方附件PDF。本批机制依据另行实际读取的一手原文，不以第三方题库或培训题例替代来源。

- 金融监管总局《银团贷款业务管理办法》金规〔2024〕14号，中国政府网完整转载：https://app.www.gov.cn/govdata/gov/202410/13/520499/article.html 。实际逐段读取第二、十五、十八、三十九、四十二至四十九条，并读第五十至六十一条确认转让及2024-11-01生效。总局原JS网页工具打开失败，用政府网完整官方转载；不采用2011旧指引的20%/50%份额。
- OCC《Asset-Based Lending》，Version1.1，80页PDF：https://www.occ.gov/publications-and-resources/publications/comptrollers-handbook/files/asset-based-lending/pub-ch-asset-based-lending.pdf 。实际读取PDF第4页（印刷3）循环融资；PDF第16–19页（印刷15–18）借款基础、应收账龄、cross-aging、存货折算；PDF第29页（印刷28）回款和库存监控；PDF第73–77页（印刷72–76）术语中两种covenant、两种block及不合格担保品。合同阈值全部题内明确，不采用书中历史常见比例、LIBOR示例或美国法定优先权作为中国通用规则。没有复制来源例题。

### 逐题差异目标与复算

- 0082：同一银团合同可含不同期限组别，组内一致不等于全银团一致；对应第二条。
- 0083：同一银行法人两分支不据此形成可收费银团服务；对应第二、四十五条，不是全银行部门终端信贷去重。
- 0084：分组统一代理与专门事务分工并存，同一事务须明确单一代理；对应十五、十八条。
- 0085：代理服务费100按真实服务及约定归属，不把承贷20%/80%直接套为费率分配；对应四十二至四十四条。
- 0086：部分转让40%须本金500×40%=200与应收息20×40%=8同时同比例转；不是可自由交易的STRIPS利息组件。
- 0087：实质替换旧优先受让目标，三个币种组中两组仅一家银行，违反第十八条最多一个单银行组别；整体两家不代替组内人数检验。
- 0088：银团外同项目新贷截留共同回款的损害，不能靠另签合同规避；对应三十九条。
- 0089：甲25/100=25%触发客户层面整体排除100，不能改全池25/300分母或只剔25；乙200不连带。
- 0090：回款20同时使基础减少16和贷款减少20；新空间80×80%−50=14，净恢复4而非20。
- 0091：库存40×50%=20退出，应收50×80%=40进入，基础净增20；同时防止重复登记并区分销售毛利10。
- 0092：12低于软阈值20需加强控制，新提2后10仍高于硬底线8；预警不等于单独禁止提款。
- 0093：无新交易、无清偿、无债务更新的重开发票不能把合同原始100天改0天。
- 0094：纯现金流下降导致比率6倍，持续季末维护约束触发；仅新增借债/分红时测试的合同无本次行动，不自动同判违约。
- 0095：担保资产范围与借款基础资格不同，超龄不计融资但未解除担保；不把不合格误作无负担。

作者另直接重算200/500=8/20=40%；甲客户25%高于20%；回款前基础80减贷款70=10，回款后64减50=14；资产换类40−20=20，销售毛利50−40=10不是同指标；新提后12−2=10。四数值元数据包括0086/0089/0090/0091，其余合同条件另作逻辑核对，所有题只计一次。

第八段复核修订：0087原同等条件优先受让与治理题已有目标相同，保留ID实换为分组银团最多一个单银行组别的结构检查，原优先目标不计新增；0093弱项改为“债务人签收重开发票就等于新债形成”的文件与真实债权状态混淆。其余对象未改。

## 第九检查点：融资租赁角色与风险6题（0096–0101）

累计101题、数值记录仍49。追加前95题完整对象已保存，除第八段复核指定0087/0093修订外不改其他题。本段四项理由及选项结构检查通过。与法规作者确认该租赁范围未占，与投资作者的租赁现金流SPPI分类分开；按最终课程迁移归本库第1章金融市场与融资结构，不扩成租赁会计或航空经营规则测试。

来源：市场监管总局刊载《中华人民共和国民法典》https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2023/art_60fb3863b7364b759123a42d1df568ca.html 。实际读取第735–759条。最高人民法院同法网页工具打开失败，改读另一可访问官方全文；未声称失败页面已读。第738条区分出租人与租赁物经营使用许可，第739–742条交付/索赔/租金，第750–751条保管维修和毁损，第757/759条到期产权。无跨国法域泛化，题设均为境内且列足例外条件。

- 0096：金融机构签购货合同但设备直接交承租人，后者可就严重不符拒收并及时通知出租人；不是错误把资金收款人当债务人。
- 0097：对供应商索赔通常不停止租金，但依赖出租人技能/干预选择有请求减免例外，双情景比对不是笼统合同独立口号。
- 0098：融资租赁占有期间维修由承租人承担，不由设备产权单独推定。
- 0099：已交付后可修复意外损坏，合同继续存续且无例外，停机不自动中止融资租金；与日常维修的行为责任不同。
- 0100：未约定到期归属且按补充方法仍无法确定时归出租人；象征性留购且租金履行完毕的另一合同归承租人，不能只用租金覆盖成本判断。
- 0101：依法从事融资租赁的出租人无需因此取得租赁物实际经营使用许可，航空企业已持许可；不把设备所有权、融资业务和运营资格混为一体。

## 第十检查点：债券回购合同及融资基准10题（0102–0111）

累计111题，50条数值元数据。此段新增10，前101题对象完全相同；此前0096–0101在本段提交时待审，现已与本段一并通过另一轮AI内容复核及主来源核验。本轮0082–0111合计30个目标，不因预计40而强行增加边际任务。选项结构与四理由最短长度检查通过。本段仅国际债券GMRA式回购经济机制，不涉及法规作者正在编写的2025中国股票质押式回购交易及登记流程。

### 实读来源及边界

1. ICMA《ERCC Guide to Best Practice in the European Repo Market》，March2025，171页PDF：https://www.icmagroup.org/assets/ERCC-Guide-to-Best-Practice-March-2025.pdf 。实际读取印刷第90–93页4.11及脚注15、4.15a/b、4.18/4.19；第96–97页4.25–4.28；第106页附录I12.3；第147–149页附录III1.1和1.3。页面首部1.2/1.7明确行业建议性质，非强制监管规范；题目把需要采用的合同安排完整写明。另读2025-03-06官网发布说明，确认版本；未采用旧2013/2015 FAQ的过时三方市场成员数量，未读取会员专有模板，也没有声称取得。全部情景与表达为原创，不复制报告例题。
2. 纽约联储研究人员文章《Who’s Borrowing and Lending in Repo Markets?》，2026-09-28：https://libertystreeteconomics.newyorkfed.org/2026/09/whos-borrowing-and-lending-in-repo-markets/ 。实际读取Cash, Collateral, and Repo Rates的特券稀缺机制；不考报告的规模、排名或政策结论。文末说明研究观点不代表联储政策立场，来源如实标reference。
3. 纽约联储《Additional Information about Reference Rates》：https://www.newyorkfed.org/markets/reference-rates/additional-information-about-reference-rates 。实际读取2026-10-05更新页Calculation Methodology for the EFFR and OBFR，美元金额加权中位数，及交易输入说明。本题原创四笔数据不冒充真实市场，不涉及FRN票息或货币市场报价年化方法。

### 独立任务

- 0102：特券1%低于GC4%可补偿指定证券稀缺性，选择工具不能只看现金利息，GC不保证取得指定券。
- 0103：再出售证券不解除正常票息补偿；发行人实际停付则补偿安排不变成信用保证。双条件区别于通常回购利息收益计算。
- 0104：到期等价返还可用同发行可互换批次，不要求原始批次，也不允许无约定换成任意等市值债券。
- 0105：存续期间许可替换仍要求信用及流动性质量，不是任意替换授权；与到期同发行返还为不同权利路径。
- 0106：开放期限不等于浮动计息；双方协商改价与按约单方终止各走不同条件，不能拒改价就认定永不终止。
- 0107：常青滚动到期日在有效通知后固定剩余30天，并非当天偿还，也不再向后延。
- 0108：mini close-out处理失败回购现金差额，并未实际取得另一现券合同需交付的证券；不能把经济结清当证券交付。
- 0109：底层摊还本金20转付与回购现金本金100独立记账，合同不允许自动抵减，不能因两者都叫本金就合并。
- 0110：buy/sell-back票息及延迟补偿在回购价一次性扣减，101−2−0.01=98.99；不能再付2重复补偿或把补偿方向加回价格。
- 0111：金额加权中位数与金额加权均值及笔数中位数三者区分。按3/4/5/6排序累计金额10/70/90/100，50落在4%交易；金额均值0.3+2.4+1+0.6=4.3%，笔数中位4.5%，均非本指标。此前普通中位数抗极值与VWAP金额均值各有旧题，本题新增金额分位定位而非复写任一算法。

本地独立重建唯一新增公式101−(2+0.01)=98.99；中位数按四段累计金额直接定位，不用作者公式eval。再核正常票息/发行人停付矩阵、固定利率/开放期限两个维度及常青有效通知状态切换。十题结构校验通过，无短理由或正确项长度明显线索。

0097自查删除题干“符合相应例外”的答案提示，改为具体事实“设备经核验不符合约定使用目的”；所考条款、答案及四理由不变，已单独通知复核。

0098/0099复核修订：0098题干明示制造质量保修仍存但不包日常保养，弱项换“在保修期就由供应商包日常维护”；0099弱项换“租金先停至保险理赔结束再决定”，区分保险损失处理与融资租金履行。其余字段不变。


第八至第十段接受状态：0082–0095于2026-10-14另一轮AI复核接受；0096–0111随后全部接受。原文核验涵盖银团办法、OCC资产基础贷款、民法典及ICMA/纽约联储所引机制，另由复核轮独立重建合同与数值测试。前111题现冻结，不因下面追加而改动。

## 第十一检查点：融资合同现金流与信用层次10题（0112–0121）

累计121题，56条数值元数据。追加前111题完整对象已快照并逐对象深比较不变。投资作者确认本段结构性从属、消极担保、交叉违约/加速、提款期、循环重提及浮息期内提前还款目标未占；全库题干与目标检索未发现相同推理任务。四选项逐项理由及长度检查通过；该轮不承诺增加题数以外的认证，等待另一轮内容复核。

### 已实际读取的主来源与限制

- 2026年Sempra向SEC提交的招股书：https://www.sec.gov/Archives/edgar/data/1032208/000119312526102174/d118076d424b2.htm 。实际读取基础招股书第14–15页Ranking、Holding Company Structure及母公司另有子公司债权时的限制。引用发行人自身对融资结构的披露，只作为机制实例，不评价其投资价值；题中公司与数值全为教学设定。
- CGAP/World Bank《Commercial Loan Agreements: A Technical Guide for Microfinance Institutions》，2006年公开PDF：https://documents1.worldbank.org/curated/en/212131468333850943/pdf/384110Loan0Agreements0OCT200601Public1.pdf 。实际读取印刷第2、9、14、16–20、22–24、34–35页。印刷页比PDF零基页码少7，即印刷34页位于pageno41。该指南明确面向普通法贷款，旧版建议并非中国现行强制规范。新题只用稳定金融机制，完整明示有效教学合同条款；不采用旧利率基准、市场标准利差、浮息/定息高低的笼统比较、上期费用收入确认说法或跨法域可执行性。所有应用情景、决策和干扰项均为AI辅助逐题原创，没有摘录长段文字或复制例题。

### 独立任务与跨库边界

- 0112：子公司先清90，剩10上划母公司清偿20债券，回收50%；不是同一发行人优先/次级排序。未假定财产合并，排除母公司对子公司债权及子公司保证。
- 0113：禁止未来设担保的合同承诺与现有资产担保权分开；不同于一般抵押物估值或资本保证题。
- 0114：未补救约束违约已产生加速权与实际作加速决定是两种触发状态；无须新增数字来重复违约标签。
- 0115：6月底提款期结束只终止新资金获取；已用本金固定2029年底偿还。不是浮息重定价期与发行期限的旧目标。
- 0116：同样借80还30后，循环额度100按余额50可再提50，非循环额度按累计80仅余20；区别0004首次未用额度记账及0090借款基础随应收资产收缩。
- 0117：银行实际锁定4%资金，提前收款只能以2%投资剩余60天，600万元负利差2万元；不是衍生品市值平仓，亦不把未来利润混作实际资金补偿。
- 0118：确定半年后用款，延期承诺费1.5对立即借款18息减6存款息=12，选择1.5；区别0023银行为承诺持流动性缓冲的供给侧成本，本题为借款人提款时点决策。
- 0119：首笔及合同生效满足不永久满足每笔提款条件，许可证后续过期须重新判断；不是金融业务经营许可有效性或公司授权的一般判断。
- 0120：建设期本金宽限包含在总期限内且利息另付，前2年各付36、第三至第六年各还150本金；不同于证券化Z类应计资本化，本题明确不资本化。
- 0121：未加速的90万元仍按正常率5%，逾期10按8%，30天总息(0.8+4.5)/12=0.4416667万元；关键是余额范围分层，不把全额贷款统一调至违约利率。

作者另用不同排列独立重算：子公司剩余100−90=10；循环未用原20加归还30=50；资金补偿600×4%/6−600×2%/6=2；等待费600×0.5%/2=1.5，立即提款净费600×(6%−2%)/2=12；宽限期年息36，四次本金各150；逾期分层月息(0.8+4.5)/12≈0.4416667。六个数值字段与上述独立算式相符，非数值题另核合同状态。

第十一段课程归属复核：0112–0121均归证券基础第1章金融市场与融资结构。经父任务确认，仅将尚未接受0113–0121的chapter/lessonId/scope三字段由2改为1；题干、四选项、四解析、来源及计算均未改变。第2章主要为宏观传导，故本段融资合同更适配第1章。

最终第十一段复核：0115及0119的末项已由复核轮重取确认改善，九题章节三字段diff独立核验准确；两来源相应原文和六类数值均已复核，0112–0121全部接受。

最终章节迁移：经父任务授权，0084–0101共18题仅由第2章迁至第1章，字段严格限chapter、lessonId、scope；题干、全部选项与理由、来源、计算及其余103题对象均保持不变。父任务与主审已留迁移前完整快照，迁移后由父任务独立深比较并固定新的接受指纹；此操作不增加题数。
