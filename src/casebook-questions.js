// Independent, original case studies; NOT official or recalled exam questions.
// Every option has a reason. Numeric cases are independently recomputed in tests.
export const CASEBOOK_QUESTIONS = {
  "options": [
    {
      "id": "options-casebook-001",
      "chapter": 1,
      "lessonId": "value",
      "topic": "实值不等于盈利",
      "stem": "某认购行权价3.00元，买入权利金0.18元，到期标的3.10元。忽略费税，每份净损益为？",
      "options": [
        "亏损0.08元",
        "盈利0.10元",
        "盈利0.28元",
        "不盈不亏"
      ],
      "answer": 0,
      "explanation": "到期价值0.10，减去已付0.18，净损益为−0.08元。",
      "type": "single",
      "source": "payoff",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "认购到期损益；题设独立计算",
      "rationales": [
        "到期价值0.10，减去已付0.18，净损益为−0.08元。",
        "0.10只是内在价值，尚未扣买入成本。",
        "权利金是支出，不能加到收益中。",
        "实值只说明行权价值为正，不等于达到盈亏平衡。"
      ],
      "conceptIds": [
        "实值不等于盈利"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "longCall",
        "inputs": [
          3.1,
          3,
          0.18
        ],
        "expected": -0.08
      }
    },
    {
      "id": "options-casebook-002",
      "chapter": 1,
      "lessonId": "contracts",
      "topic": "调整合约单位",
      "stem": "某ETF期权经历合约调整后，公告列明单位为10,200份。计算该合约两张的权利金总额，应采用哪个数量？",
      "options": [
        "固定20,000份",
        "10,200份",
        "2份",
        "20,400份"
      ],
      "answer": 3,
      "explanation": "以该具体合约公告的单位乘张数：10,200×2＝20,400份。",
      "type": "single",
      "source": "rules",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "合约调整与合约单位；数量为假设",
      "rationales": [
        "不能把标准合约常用单位套用到已调整合约。",
        "这是单张单位，漏乘两张。",
        "张与份是不同计量单位。",
        "以该具体合约公告的单位乘张数：10,200×2＝20,400份。"
      ],
      "conceptIds": [
        "调整合约单位"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "options-casebook-003",
      "chapter": 1,
      "lessonId": "contracts",
      "topic": "平仓与行权",
      "stem": "投资者持有1张认购权利仓，只希望卖掉合约、不取得ETF。与此目的匹配的指令是？",
      "options": [
        "行权申报",
        "卖出开仓",
        "卖出平仓",
        "买入开仓"
      ],
      "answer": 2,
      "explanation": "卖出平仓用于了结已有权利仓；成交后实现合约交易损益。",
      "type": "single",
      "source": "rules",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "foundation",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "交易指令与行权的区分",
      "rationales": [
        "行权处理的是按合约取得标的的权利。",
        "卖出开仓建立义务仓，不能混同了结原持仓。",
        "卖出平仓用于了结已有权利仓；成交后实现合约交易损益。",
        "买入开仓增加权利仓。"
      ],
      "conceptIds": [
        "平仓与行权"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "options-casebook-004",
      "chapter": 1,
      "lessonId": "value",
      "topic": "价差与流动性",
      "stem": "同一合约买一0.10、卖一0.16，屏幕最新成交0.13。立即主动买入1张时，最需要确认什么？",
      "options": [
        "最新价保证将来卖出价",
        "卖一价格与可成交数量",
        "必能按0.13买到",
        "买一就是买入成交价"
      ],
      "answer": 1,
      "explanation": "主动买入通常消耗卖方报价，还需确认盘口数量与滑点。",
      "type": "single",
      "source": "risk",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "流动性与执行风险",
      "rationales": [
        "任何历史成交价都不能保证将来的执行价格。",
        "主动买入通常消耗卖方报价，还需确认盘口数量与滑点。",
        "最新成交是历史成交，不保证仍有对应报价。",
        "买一是市场买方的报价，主动买入通常对手是卖方。"
      ],
      "conceptIds": [
        "价差与流动性"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "options-casebook-005",
      "chapter": 1,
      "lessonId": "basics",
      "topic": "欧式的含义",
      "stem": "沪市ETF期权为欧式行权。仅凭“欧式”二字，能推出哪项结论？",
      "options": [
        "行权时点受合约约定的到期日限制",
        "到期前不能卖出平仓",
        "该合约必须在欧洲交易",
        "到期所有实值仓位一定自动交收"
      ],
      "answer": 0,
      "explanation": "欧式描述行权风格；交易、平仓与交收安排应另查规则。",
      "type": "single",
      "source": "rules",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "foundation",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "欧式行权与交易、交收的区别",
      "rationales": [
        "欧式描述行权风格；交易、平仓与交收安排应另查规则。",
        "不能提前行权不等于不能提前交易平仓。",
        "名称不按交易地划分。",
        "不能从行权风格推导自动行权服务及钱券准备。"
      ],
      "conceptIds": [
        "欧式的含义"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "options-casebook-006",
      "chapter": 2,
      "lessonId": "covered-protective",
      "topic": "保护的时间边界",
      "stem": "持有ETF计划六个月后卖出，但保护性认沽一个月后到期。最重要的风险是？",
      "options": [
        "首月买过保险就永久锁住底价",
        "认沽到期后自动覆盖六个月",
        "认沽期限短可消除ETF所有风险",
        "剩余五个月的保护需要重新安排"
      ],
      "answer": 3,
      "explanation": "保护只在匹配数量、标的和有效期限内成立；到期后需要评估续保。",
      "type": "single",
      "source": "insurance",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "保险策略的标的、数量与期限匹配",
      "rationales": [
        "买入一期合约不会产生永久保障。",
        "没有题设支持自动续约。",
        "期限错配、成本和交易风险仍然存在。",
        "保护只在匹配数量、标的和有效期限内成立；到期后需要评估续保。"
      ],
      "conceptIds": [
        "保护的时间边界"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "options-casebook-007",
      "chapter": 2,
      "lessonId": "covered-protective",
      "topic": "部分保险",
      "stem": "持有20,000份ETF，只买1张单位10,000份的同标的认沽。其他条件匹配，最准确的描述是？",
      "options": [
        "认沽只有在买入两张后才有价值",
        "保险覆盖取决于权利金而非数量",
        "仅一半份额获得该认沽的到期保护",
        "全部20,000份均有同等保护"
      ],
      "answer": 2,
      "explanation": "名义保护数量10,000份，占现货20,000份的一半。",
      "type": "single",
      "source": "insurance",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "保护比例",
      "rationales": [
        "一张也可保护相应数量，不以凑齐总量为生效条件。",
        "数量由张数和单位决定，权利金决定成本。",
        "名义保护数量10,000份，占现货20,000份的一半。",
        "一张合约不能覆盖超过其单位的全部现货。"
      ],
      "conceptIds": [
        "部分保险"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "options-casebook-008",
      "chapter": 2,
      "lessonId": "covered-protective",
      "topic": "备兑下行",
      "stem": "ETF买入价4.00元，卖出完全匹配认购收到0.12元，到期ETF跌到3.00元且认购不行权。每份组合损益？",
      "options": [
        "0元",
        "−0.88元",
        "＋0.12元",
        "−1.12元"
      ],
      "answer": 1,
      "explanation": "现货损益−1.00，加已收权利金0.12，共−0.88元。",
      "type": "single",
      "source": "covered",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "备兑到期损益；假设无费税",
      "rationales": [
        "备兑并不保证本金安全。",
        "现货损益−1.00，加已收权利金0.12，共−0.88元。",
        "只计算了期权收入，忽略现货亏损。",
        "已收权利金应减轻亏损，而不是增加支出。"
      ],
      "conceptIds": [
        "备兑下行"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "sum",
        "inputs": [
          3,
          -4,
          0.12
        ],
        "expected": -0.88
      }
    },
    {
      "id": "options-casebook-009",
      "chapter": 2,
      "lessonId": "covered-protective",
      "topic": "备兑上涨封顶",
      "stem": "现货成本2.80元，备兑认购行权价3.00元，收到权利金0.06元。到期标的3.50元、足额履约且无费税，每份最大利润？",
      "options": [
        "0.26元",
        "0.76元",
        "0.06元",
        "0.20元"
      ],
      "answer": 0,
      "explanation": "备兑现货按3.00交付，利润3.00−2.80＋0.06＝0.26元。",
      "type": "single",
      "source": "covered",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "备兑利润上限",
      "rationales": [
        "备兑现货按3.00交付，利润3.00−2.80＋0.06＝0.26元。",
        "忽略了义务仓在上涨时放弃的现货增值。",
        "只算了权利金，漏掉现货成本与交付价之差。",
        "漏计收到的0.06元权利金。"
      ],
      "conceptIds": [
        "备兑上涨封顶"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "sum",
        "inputs": [
          3,
          -2.8,
          0.06
        ],
        "expected": 0.26
      }
    },
    {
      "id": "options-casebook-010",
      "chapter": 3,
      "lessonId": "delta-gamma",
      "topic": "Delta的多空符号",
      "stem": "持有认沽空头，该认沽多头Delta为−0.35。仅反转同一合约的持仓方向，每份空头Delta为？",
      "options": [
        "−0.35",
        "＋1.35",
        "0",
        "＋0.35"
      ],
      "answer": 3,
      "explanation": "空头对多头的价格敏感度取相反数，因此为＋0.35。",
      "type": "single",
      "source": "greeks1",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "Delta与持仓方向",
      "rationales": [
        "这是多头Delta，漏掉持仓方向。",
        "空头Delta应取多头Delta的相反数，不能机械加1。",
        "看跌名称不代表空头没有方向暴露。",
        "空头对多头的价格敏感度取相反数，因此为＋0.35。"
      ],
      "conceptIds": [
        "Delta的多空符号"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "options-casebook-011",
      "chapter": 3,
      "lessonId": "delta-gamma",
      "topic": "二阶近似",
      "stem": "每份期权Delta=0.40、Gamma=0.20/元，标的上涨0.10元，其余不变。用Delta-Gamma二阶近似，期权价格约增加？",
      "options": [
        "0.060元",
        "0.0041元",
        "0.041元",
        "0.042元"
      ],
      "answer": 2,
      "explanation": "ΔV≈0.40×0.10＋0.5×0.20×0.10²＝0.041元。",
      "type": "single",
      "source": "greeks1",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "advanced",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "Delta-Gamma泰勒近似",
      "rationales": [
        "错误地将Gamma项当作标的一次变化。",
        "该结果将正确近似变动的小数点缩小了十倍。",
        "ΔV≈0.40×0.10＋0.5×0.20×0.10²＝0.041元。",
        "Gamma二阶项漏乘了1/2。"
      ],
      "conceptIds": [
        "二阶近似"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "deltaGamma",
        "inputs": [
          0.4,
          0.2,
          0.1
        ],
        "expected": 0.041
      }
    },
    {
      "id": "options-casebook-012",
      "chapter": 3,
      "lessonId": "delta-gamma",
      "topic": "Delta中性不等于无风险",
      "stem": "组合当前Delta合计为0，但Gamma和Vega均不为0。可作出哪项判断？",
      "options": [
        "无需再平衡即可永久对冲",
        "仍面临较大价格变化及波动率变化的风险",
        "所有市场路径下均不盈不亏",
        "Gamma也必为0"
      ],
      "answer": 1,
      "explanation": "Delta中性只抵消当前一阶方向暴露，其他敏感度和随行情改变的Delta仍存在。",
      "type": "single",
      "source": "pricing",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "advanced",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "Greeks为局部风险指标",
      "rationales": [
        "Delta会因行情、时间等变化而改变。",
        "Delta中性只抵消当前一阶方向暴露，其他敏感度和随行情改变的Delta仍存在。",
        "局部一阶中性不等于所有状态无损益。",
        "不同阶敏感度不能相互替代。"
      ],
      "conceptIds": [
        "Delta中性不等于无风险"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "options-casebook-013",
      "chapter": 3,
      "lessonId": "theta-vega-rho",
      "topic": "隐波下降与方向",
      "stem": "买入认购后标的小涨，但隐含波动率显著下降。期权仍可能下跌的合理原因是？",
      "options": [
        "Vega和Theta影响可能超过Delta收益",
        "认购只由标的方向决定",
        "认购的Vega必为负",
        "隐波变化只能影响认沽"
      ],
      "answer": 0,
      "explanation": "应综合方向、波动率和时间变化；标的小涨不保证认购上涨。",
      "type": "single",
      "source": "pricing",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "多因素价格变化",
      "rationales": [
        "应综合方向、波动率和时间变化；标的小涨不保证认购上涨。",
        "期权受多项输入影响。",
        "常见普通期权多头Vega通常为正，不是必为负。",
        "认购和认沽都受隐含波动率影响。"
      ],
      "conceptIds": [
        "隐波下降与方向"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "options-casebook-014",
      "chapter": 3,
      "lessonId": "theta-vega-rho",
      "topic": "Vega计量",
      "stem": "题设整个组合Vega=80元/波动率百分点，隐波由25%降至22.5%，局部近似损益为？",
      "options": [
        "−2元",
        "＋200元",
        "−2,000元",
        "−200元"
      ],
      "answer": 3,
      "explanation": "下降2.5个百分点，80×(−2.5)＝−200元。",
      "type": "single",
      "source": "greeks2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "Vega单位；题设为组合总量",
      "rationales": [
        "把百分点变动误作比例变动−0.025，单位不匹配。",
        "下降时正Vega组合价值减少。",
        "将2.5个百分点错误放大十倍。",
        "下降2.5个百分点，80×(−2.5)＝−200元。"
      ],
      "conceptIds": [
        "Vega计量"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "product",
        "inputs": [
          80,
          -2.5
        ],
        "expected": -200
      }
    },
    {
      "id": "options-casebook-015",
      "chapter": 3,
      "lessonId": "strategies",
      "topic": "跨式的成本门槛",
      "stem": "同执行价100的认购与认沽各买1份，总权利金9。到期标的106，无费税，多头跨式净损益？",
      "options": [
        "＋15",
        "0",
        "−3",
        "＋6"
      ],
      "answer": 2,
      "explanation": "两腿到期总价值为6，扣成本9，净亏损3。",
      "type": "single",
      "source": "spreads",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "跨式组合到期损益",
      "rationales": [
        "权利金是支出，不能加到收益中。",
        "波动方向正确也须越过成本门槛。",
        "两腿到期总价值为6，扣成本9，净亏损3。",
        "这是到期价值，尚未扣总成本。"
      ],
      "conceptIds": [
        "跨式的成本门槛"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "straddle",
        "inputs": [
          106,
          100,
          9
        ],
        "expected": -3
      }
    },
    {
      "id": "options-casebook-016",
      "chapter": 4,
      "lessonId": "risk",
      "topic": "卖方保证金边界",
      "stem": "义务仓建立时缴纳保证金2万元。对最终亏损上限，哪项判断正确？",
      "options": [
        "补缴保证金后风险归零",
        "不能仅用初始保证金认定最大亏损",
        "最大亏损永远2万元",
        "最大亏损等于收到权利金"
      ],
      "answer": 1,
      "explanation": "保证金是履约保障，不是总损失上限，还可能追加或强平。",
      "type": "single",
      "source": "risk",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "foundation",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "保证金与经济损失",
      "rationales": [
        "补缴改善保证金充足程度，不消除市场风险。",
        "保证金是履约保障，不是总损失上限，还可能追加或强平。",
        "初始保证金不封顶合约义务。",
        "权利金通常是卖方最大收益而非最大亏损。"
      ],
      "conceptIds": [
        "卖方保证金边界"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "options-casebook-017",
      "chapter": 4,
      "lessonId": "risk",
      "topic": "认沽空头损失边界",
      "stem": "只考虑到期损益，某非负ETF认沽K=3.00，收权利金0.08，每份最大损失为？",
      "options": [
        "2.92元",
        "无限大",
        "0.08元",
        "3.08元"
      ],
      "answer": 0,
      "explanation": "ETF最低按0计，到期损失上限3.00−0.08＝2.92元；不含费税。",
      "type": "single",
      "source": "payoff",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "非负标的认沽空头到期损益",
      "rationales": [
        "ETF最低按0计，到期损失上限3.00−0.08＝2.92元；不含费税。",
        "题设标的非负，认沽空头不同于裸卖认购。",
        "收到权利金不是最大损失。",
        "收到的权利金应冲减而不是增加损失。"
      ],
      "conceptIds": [
        "认沽空头损失边界"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "sum",
        "inputs": [
          3,
          -0.08
        ],
        "expected": 2.92
      }
    },
    {
      "id": "options-casebook-018",
      "chapter": 4,
      "lessonId": "risk",
      "topic": "止损的执行风险",
      "stem": "某义务仓设置止损触发价后遇到跳空和流动性不足。正确的风险认识是？",
      "options": [
        "止损触发价就是保证成交价",
        "设置止损后不再需要保证金",
        "止损能让卖方损失绝对封顶",
        "实际成交可能差于触发价，甚至暂时无法成交"
      ],
      "answer": 3,
      "explanation": "触发条件与实际成交是两件事，需要考虑跳空、盘口和滑点。",
      "type": "single",
      "source": "risk",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "订单执行与极端风险",
      "rationales": [
        "触发价格不是执行承诺。",
        "止损委托不能替代保证金制度。",
        "没有成交保证时不能据此宣称损失绝对封顶。",
        "触发条件与实际成交是两件事，需要考虑跳空、盘口和滑点。"
      ],
      "conceptIds": [
        "止损的执行风险"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "options-casebook-019",
      "chapter": 4,
      "lessonId": "strategies",
      "topic": "价差保护的适用条件",
      "stem": "用另一张期权保护裸卖仓位，想直接套用“行权价差减净收入”的到期最大损失公式，首先应核对？",
      "options": [
        "只要都叫认沽，期限可以任意",
        "只看券商初始保证金",
        "同标的、同到期、方向和单位均按价差结构匹配",
        "只要两份合约价格相近"
      ],
      "answer": 2,
      "explanation": "该到期公式依赖正确匹配的价差结构及相同计量口径。",
      "type": "single",
      "source": "spreads",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "advanced",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "价差边界与组合匹配",
      "rationales": [
        "期限错配使同一到期损失公式失去前提。",
        "保证金不是策略终值计算的替代。",
        "该到期公式依赖正确匹配的价差结构及相同计量口径。",
        "价格相近不能证明保护关系。"
      ],
      "conceptIds": [
        "价差保护的适用条件"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "options-casebook-020",
      "chapter": 1,
      "lessonId": "lifecycle",
      "topic": "到期准备",
      "stem": "认购权利仓接近到期且处于实值，账户现金不足支付行权款。最稳妥的认识是？",
      "options": [
        "所有券商的协议行权细节完全相同",
        "应提前核对行权方式、截止时间及钱券要求",
        "实值必然自动到账利润，无需操作",
        "已支付权利金就已支付行权价款"
      ],
      "answer": 1,
      "explanation": "实值不等于已完成行权交收，应依合约、规则及经营机构约定安排。",
      "type": "single",
      "source": "exercise",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "行权申报与交收准备",
      "rationales": [
        "具体服务约定和操作应向经营机构确认。",
        "实值不等于已完成行权交收，应依合约、规则及经营机构约定安排。",
        "能否自动处理、是否具备钱券条件不能仅凭实值判断。",
        "权利金购买权利，不是购买标的的全部价款。"
      ],
      "conceptIds": [
        "到期准备"
      ],
      "editorialBatch": "2026-10-13"
    }
  ],
  "fund1": [
    {
      "id": "fund1-casebook-001",
      "chapter": 6,
      "lessonId": "fund1-syllabus-1",
      "topic": "直接融资辨析",
      "stem": "企业发行债券，由基金认购。与企业向银行贷款相比，这次融资最适合归为？",
      "options": [
        "直接融资",
        "间接融资",
        "基金份额赎回",
        "财政拨款"
      ],
      "answer": 0,
      "explanation": "企业通过证券向资金提供者融资，属于直接融资；基金作为投资中介不改变该证券融资关系。",
      "type": "single",
      "source": "outline1",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场与融资关系",
      "rationales": [
        "企业通过证券向资金提供者融资，属于直接融资；基金作为投资中介不改变该证券融资关系。",
        "银行贷款是典型间接融资，不能只因存在基金机构就作此判断。",
        "债券认购不是赎回基金份额。",
        "没有政府预算拨款这一题设。"
      ],
      "conceptIds": [
        "直接融资辨析"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund1-casebook-002",
      "chapter": 7,
      "lessonId": "fund1-syllabus-2",
      "topic": "基金财产独立",
      "stem": "基金管理公司因自身债务被清算。对其管理基金的独立财产，应如何处理？",
      "options": [
        "优先偿还管理人的办公租金",
        "自动变成托管人的自有资金",
        "全部归管理公司的股东",
        "不因管理人破产而当然并入其清算财产"
      ],
      "answer": 3,
      "explanation": "基金法第五条确立基金财产独立；管理人清算不当然使其成为清算财产。",
      "type": "single",
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第五条",
      "rationales": [
        "管理人固有债务不能任意以基金财产清偿。",
        "托管不等于取得资产所有权。",
        "基金财产不能任意归入管理公司股东财产。",
        "基金法第五条确立基金财产独立；管理人清算不当然使其成为清算财产。"
      ],
      "conceptIds": [
        "基金财产独立"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund1-casebook-003",
      "chapter": 8,
      "lessonId": "fund1-syllabus-3",
      "topic": "禁止跨基金抵销",
      "stem": "同一管理人管理A、B两只基金。A的一笔债权与B的一笔债务，能否只因管理人相同而抵销？",
      "options": [
        "可以，只要净额不为负",
        "可以，只需营销部门口头同意",
        "不能，据此抵销不符合基金财产独立要求",
        "可以，因为会计人员相同"
      ],
      "answer": 2,
      "explanation": "基金法第六条禁止不同基金财产的债权债务相互抵销。",
      "type": "single",
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第六条",
      "rationales": [
        "净额大小不改变禁止抵销的要求。",
        "内部口头同意不能替代法律要求。",
        "基金法第六条禁止不同基金财产的债权债务相互抵销。",
        "共用人员不能抹去不同基金的法律和财产边界。"
      ],
      "conceptIds": [
        "禁止跨基金抵销"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund1-casebook-004",
      "chapter": 9,
      "lessonId": "fund1-syllabus-4",
      "topic": "托管复核职责",
      "stem": "某公募基金每日净值由管理人计算。托管人相关职责最准确的是？",
      "options": [
        "仅保管现金，不必监督投资",
        "复核、审查管理人计算的净值和申赎价格",
        "替基金承诺净值不下降",
        "代替所有投资者决定买卖"
      ],
      "answer": 1,
      "explanation": "基金法第三十六条列明净值及申赎价格复核审查职责。",
      "type": "single",
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第三十六条",
      "rationales": [
        "托管职责还包括法定监督等要求。",
        "基金法第三十六条列明净值及申赎价格复核审查职责。",
        "托管人的监督与保管职责并不构成本金或收益保证。",
        "投资决策和投资者选择不由托管职责一概替代。"
      ],
      "conceptIds": [
        "托管复核职责"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund1-casebook-005",
      "chapter": 9,
      "lessonId": "fund1-syllabus-4",
      "topic": "违规指令尚未执行",
      "stem": "托管人发现尚未执行的投资指令违反基金合同约定，应采取什么措施？",
      "options": [
        "拒绝执行、立即通知管理人并及时报告监管部门",
        "先执行再等年报时解释",
        "只要管理人签字即可执行",
        "只通知基金销售人员"
      ],
      "answer": 0,
      "explanation": "基金法第三十七条对尚未执行的违规指令规定拒绝、通知与报告。",
      "type": "single",
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第三十七条",
      "rationales": [
        "基金法第三十七条对尚未执行的违规指令规定拒绝、通知与报告。",
        "不能有意执行已识别的违规指令。",
        "签字不能使违反基金合同的指令合法化。",
        "销售人员不是法定通知报告对象的替代。"
      ],
      "conceptIds": [
        "违规指令尚未执行"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund1-casebook-006",
      "chapter": 9,
      "lessonId": "fund1-syllabus-4",
      "topic": "违规指令已生效",
      "stem": "托管人发现依据交易程序已经生效的投资指令违法。与尚未执行的情形相比，应注意什么？",
      "options": [
        "事后直接把已生效交易当作不存在",
        "因为已经生效所以无需处理",
        "只记入个人笔记不报告",
        "立即通知管理人并及时报告，不能虚构已拒绝执行"
      ],
      "answer": 3,
      "explanation": "第三十七条区分已生效指令；应通知并报告，而不是假称事前拦截成功。",
      "type": "single",
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第三十七条",
      "rationales": [
        "交易撤销须依规则，不能单方假设不存在。",
        "已经生效不免除后续职责。",
        "私人笔记不能替代通知和监管报告。",
        "第三十七条区分已生效指令；应通知并报告，而不是假称事前拦截成功。"
      ],
      "conceptIds": [
        "违规指令已生效"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund1-casebook-007",
      "chapter": 10,
      "lessonId": "fund1-syllabus-5",
      "topic": "合同成立与生效",
      "stem": "投资人交纳认购款，基金后续才依法办理基金备案。以下区分何者恰当？",
      "options": [
        "收到第一笔款就等于备案完成",
        "成立与生效在所有情况下毫无区别",
        "认购交款涉及合同成立，依法备案涉及合同生效",
        "成立与生效都只看销售海报发布日期"
      ],
      "answer": 2,
      "explanation": "基金法第六十条第一款区分交纳认购款时合同成立与依法办理备案后的生效；第五十九条规定的是募集资金专户存放与禁止提前动用。",
      "type": "single",
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-14",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第六十条第一款（来源条号于2026-10-14校正）",
      "rationales": [
        "收到认购款不代表法定备案手续已完成。",
        "应识别不同法律节点，不宜合并记忆。",
        "基金法第六十条第一款区分交纳认购款时合同成立与依法办理备案后的生效；第五十九条规定的是募集资金专户存放与禁止提前动用。",
        "宣传日期不是这两个法律节点。"
      ],
      "conceptIds": [
        "合同成立与生效"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund1-casebook-008",
      "chapter": 10,
      "lessonId": "fund1-syllabus-5",
      "topic": "募集失败",
      "stem": "某公募基金募集未达到法定条件。管理人是否可以把已募资金永久留作下一只基金的资金？",
      "options": [
        "可以，只要没有产生投资亏损",
        "不可以，应依法律要求处理返还等责任",
        "可以，机构相同就可通用",
        "可以，只需修改基金名称"
      ],
      "answer": 1,
      "explanation": "基金法第六十条规定募集失败的返还与相关责任，不能随意转给另一只产品。",
      "type": "single",
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第六十条",
      "rationales": [
        "是否亏损不是任意留存认购资金的依据。",
        "基金法第六十条规定募集失败的返还与相关责任，不能随意转给另一只产品。",
        "同一机构不代表同一基金财产。",
        "改名不能替代重新履行法定程序。"
      ],
      "conceptIds": [
        "募集失败"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund1-casebook-009",
      "chapter": 10,
      "lessonId": "fund1-syllabus-5",
      "topic": "持有人大会边界",
      "stem": "持有人大会拟要求基金经理明天必须买入某只股票。哪项判断正确？",
      "options": [
        "持有人大会不得直接参与或干涉投资管理活动",
        "持有人大会可以直接替代每日交易决策",
        "人数过半即可免除一切投资限制",
        "大额持有人可越过基金合同下单"
      ],
      "answer": 0,
      "explanation": "基金法第四十九条限制持有人大会直接参与或干涉投资管理。",
      "type": "single",
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第四十九条",
      "rationales": [
        "基金法第四十九条限制持有人大会直接参与或干涉投资管理。",
        "法定治理权不等于日常投资管理权。",
        "表决不能免除法律和合同限制。",
        "大额持有人身份不等于交易指令权限。"
      ],
      "conceptIds": [
        "持有人大会边界"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund1-casebook-010",
      "chapter": 11,
      "lessonId": "fund1-syllabus-6",
      "topic": "合规责任分工",
      "stem": "业务负责人称“合规部门签过字，业务线就不再承担管理责任”。最合适的判断是？",
      "options": [
        "正确，合规意见可以转移所有责任",
        "正确，只要项目盈利",
        "正确，只有监管部门负责任",
        "错误，业务职责与合规监督不能互相替代"
      ],
      "answer": 3,
      "explanation": "业务线须履行自身职责，合规审查不是免责或责任转移工具。",
      "type": "single",
      "source": "outline1",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "合规管理与内部控制职责分工",
      "rationales": [
        "监督审查与业务管理责任并不相同。",
        "结果盈利不能倒推过程合规。",
        "机构与个人均可能承担相应职责。",
        "业务线须履行自身职责，合规审查不是免责或责任转移工具。"
      ],
      "conceptIds": [
        "合规责任分工"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund1-casebook-011",
      "chapter": 11,
      "lessonId": "fund1-syllabus-6",
      "topic": "风险分类交叉",
      "stem": "基金为应对集中赎回被迫折价卖出债券。最准确的理解是？",
      "options": [
        "资产账面盈利就不会有流动性风险",
        "风险分类在任何情景下绝对互斥",
        "流动性压力可能转化为价格损失，多种风险可相互影响",
        "只可能是汇率风险"
      ],
      "answer": 2,
      "explanation": "现金需求与可变现能力不匹配，会因折价处置形成价格损失。",
      "type": "single",
      "source": "outline1",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "风险分类与流动性管理",
      "rationales": [
        "账面价值与短期可用现金是不同概念。",
        "风险可能同时存在并传导。",
        "现金需求与可变现能力不匹配，会因折价处置形成价格损失。",
        "题设是同币种赎回与资产变现，不涉及外币折算风险。"
      ],
      "conceptIds": [
        "风险分类交叉"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund1-casebook-012",
      "chapter": 12,
      "lessonId": "fund1-syllabus-7",
      "topic": "未公开信息",
      "stem": "研究员得知基金尚未公开的大额交易计划，向亲友暗示提前买入。即便本人没有交易，应如何判断？",
      "options": [
        "只要交易获利就合法",
        "仍可能违反未公开信息使用及保密要求",
        "未亲自买入就一定合法",
        "亲友关系当然豁免"
      ],
      "answer": 1,
      "explanation": "基金法第二十条禁止利用职务未公开信息交易或明示、暗示他人相关交易。",
      "type": "single",
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第二十条",
      "rationales": [
        "盈亏不能决定行为合规与否。",
        "基金法第二十条禁止利用职务未公开信息交易或明示、暗示他人相关交易。",
        "禁止行为并不限于本人账户交易。",
        "亲友关系不会自动豁免相关禁止。"
      ],
      "conceptIds": [
        "未公开信息"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund1-casebook-013",
      "chapter": 12,
      "lessonId": "fund1-syllabus-7",
      "topic": "利益冲突",
      "stem": "基金经理参与关联方交易审批且存在利益冲突。最合适的做法是？",
      "options": [
        "识别披露冲突，并按制度落实审查、回避等措施",
        "只向一名同事口头提及即可",
        "只要收益好就隐去关联关系",
        "通过个人账户绕开流程"
      ],
      "answer": 0,
      "explanation": "利益冲突管理需要实质识别、披露和按适用制度处理，不是形式报备。",
      "type": "single",
      "source": "outline1",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "利益冲突与忠实勤勉义务",
      "rationales": [
        "利益冲突管理需要实质识别、披露和按适用制度处理，不是形式报备。",
        "私人谈话未必满足制度要求。",
        "预期收益不构成隐瞒的理由。",
        "绕开流程可能增加违规和输送利益风险。"
      ],
      "conceptIds": [
        "利益冲突"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund1-casebook-014",
      "chapter": 12,
      "lessonId": "fund1-syllabus-7",
      "topic": "研究独立性",
      "stem": "基金销售人员要求分析师删去风险因素，以便完成销售目标。分析师更恰当的处理是？",
      "options": [
        "把销量作为唯一评价标准",
        "让客户自行发现风险即可",
        "只保留支持上涨的材料",
        "保持客观审慎，保留有依据的重要风险说明"
      ],
      "answer": 3,
      "explanation": "客观专业判断不能让位于销售任务，应充分提示有依据的重要风险。",
      "type": "single",
      "source": "outline1",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "职业道德：专业审慎与客观独立",
      "rationales": [
        "销售目标不能替代投资者利益与专业判断。",
        "机构不能把应尽的说明义务全部转给客户。",
        "选择性披露容易产生误导。",
        "客观专业判断不能让位于销售任务，应充分提示有依据的重要风险。"
      ],
      "conceptIds": [
        "研究独立性"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund1-casebook-015",
      "chapter": 13,
      "lessonId": "fund1-syllabus-8",
      "topic": "廉洁从业",
      "stem": "供应商以私人旅游回报基金工作人员的业务倾斜。对“没有现金就不是利益输送”的说法，应怎样理解？",
      "options": [
        "只有银行转账才受约束",
        "只要供应商自愿就无风险",
        "非现金利益也可能形成利益输送与廉洁风险",
        "旅游不属于任何利益"
      ],
      "answer": 2,
      "explanation": "非现金好处同样可能影响独立判断，应按廉洁与利益冲突制度处理。",
      "type": "single",
      "source": "outline1",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "廉洁从业与行业文化",
      "rationales": [
        "廉洁风险不以特定支付方式为限。",
        "对方自愿并不消除受托职责和合规要求。",
        "非现金好处同样可能影响独立判断，应按廉洁与利益冲突制度处理。",
        "旅游安排可能具有经济利益。"
      ],
      "conceptIds": [
        "廉洁从业"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund1-casebook-016",
      "chapter": 13,
      "lessonId": "fund1-syllabus-8",
      "topic": "长期考核",
      "stem": "评价基金管理工作的专业性，哪种方法比单看本月销量更恰当？",
      "options": [
        "收益高即可忽略风格漂移",
        "结合风险、合规及长期投资者利益评价",
        "只看新基金首发规模",
        "只看单日净值排名"
      ],
      "answer": 1,
      "explanation": "应综合风险与长期投资者利益，避免单一短期指标扭曲受托行为。",
      "type": "single",
      "source": "outline1",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "行业文化与长期投资者利益",
      "rationales": [
        "高收益不能替代契约约束与合规。",
        "应综合风险与长期投资者利益，避免单一短期指标扭曲受托行为。",
        "规模不等同于投资者的长期回报。",
        "单日排名不能体现长期和风险维度。"
      ],
      "conceptIds": [
        "长期考核"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund1-casebook-017",
      "chapter": 10,
      "lessonId": "fund1-syllabus-5",
      "topic": "信息披露底线",
      "stem": "公募基金宣传称“监管已注册，因此未来收益得到监管保证”。哪项纠正最准确？",
      "options": [
        "注册不构成对投资价值或市场前景的保证",
        "注册等于保本承诺",
        "收益只在第一年有保证",
        "只有大额投资者享有该保证"
      ],
      "answer": 0,
      "explanation": "《公开募集证券投资基金运作管理办法》第四条第二款明确，募集注册不表明证监会对投资价值、市场前景或收益作实质性判断或保证；基金法第五十五条只规定注册后方可发售等事项。",
      "type": "single",
      "source": "operations",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-14",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "公开募集证券投资基金运作管理办法第四条第二款（来源于2026-10-14校正）",
      "rationales": [
        "《公开募集证券投资基金运作管理办法》第四条第二款明确，募集注册不表明证监会对投资价值、市场前景或收益作实质性判断或保证；基金法第五十五条只规定注册后方可发售等事项。",
        "注册程序并非保本机制。",
        "题设不存在第一年保证这一规则。",
        "注册不为任何金额档位提供收益担保。"
      ],
      "conceptIds": [
        "信息披露底线"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund1-casebook-018",
      "chapter": 7,
      "lessonId": "fund1-syllabus-2",
      "topic": "基金与存款",
      "stem": "客户把基金份额当作银行存款，要求按存款方式保证本金。应首先解释？",
      "options": [
        "在银行买到的基金就是存款",
        "托管银行会无条件补齐亏损",
        "只要名称含稳健就无本金风险",
        "基金份额承担相应投资风险，不等同于存款债权"
      ],
      "answer": 3,
      "explanation": "购买渠道不改变产品法律性质，基金份额应按基金风险收益特征理解。",
      "type": "single",
      "source": "outline1",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "基金、存款与财产风险",
      "rationales": [
        "银行代销不使基金转化为银行存款。",
        "托管职责不构成无条件赔偿承诺。",
        "名称不是风险不存在的证明。",
        "购买渠道不改变产品法律性质，基金份额应按基金风险收益特征理解。"
      ],
      "conceptIds": [
        "基金与存款"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund1-casebook-019",
      "chapter": 5,
      "lessonId": "fund-nav",
      "topic": "分红不是额外盈利",
      "stem": "题设持有1,000份，分红前净值1.50元，每份现金分红0.10元，无市场变化、费税。分红后基金市值加现金为？",
      "options": [
        "1,400元",
        "1,000元",
        "1,500元",
        "1,600元"
      ],
      "answer": 2,
      "explanation": "净值理论降为1.40，市值1,400加现金100仍为1,500元。",
      "type": "single",
      "source": "outline1",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "分红除息与总财富；独立假设计算",
      "rationales": [
        "忽略收到的100元现金。",
        "份额数量不是资产总价值。",
        "净值理论降为1.40，市值1,400加现金100仍为1,500元。",
        "把分红当作不减少净值的额外财富。"
      ],
      "conceptIds": [
        "分红不是额外盈利"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "product",
        "inputs": [
          1000,
          1.5
        ],
        "expected": 1500
      }
    },
    {
      "id": "fund1-casebook-020",
      "chapter": 4,
      "lessonId": "fund-service",
      "topic": "销售适当性",
      "stem": "客户愿意签署“自担风险”声明，销售人员能否据此省略必要的客户了解、产品了解与匹配程序？",
      "options": [
        "可以，只要客户预测会赚钱",
        "不能，风险声明不替代适用的适当性义务",
        "可以，签名后机构完全免责",
        "可以，只核对姓名即可"
      ],
      "answer": 1,
      "explanation": "应履行适用的适当性义务，不能用一纸声明取代了解与匹配。",
      "type": "single",
      "source": "outline1",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "基金销售适当性与投资者保护",
      "rationales": [
        "主观盈利预期不能替代风险承受能力判断。",
        "应履行适用的适当性义务，不能用一纸声明取代了解与匹配。",
        "签字并不消除机构法定职责。",
        "仅核对姓名不能评估适当性。"
      ],
      "conceptIds": [
        "销售适当性"
      ],
      "editorialBatch": "2026-10-13"
    }
  ],
  "fund2": [
    {
      "id": "fund2-casebook-001",
      "chapter": 6,
      "lessonId": "fund2-syllabus-1",
      "topic": "契约型基金",
      "stem": "契约型基金投资者与基金管理公司的普通股股东，最重要的区别是？",
      "options": [
        "持有基金份额不等于持有管理公司的股权",
        "二者享有完全相同的公司表决权",
        "基金亏损必须由管理公司股东自动补足",
        "买基金即成为托管银行股东"
      ],
      "answer": 0,
      "explanation": "基金份额权利来源于基金法律关系和合同，不等于管理公司的公司股权。",
      "type": "single",
      "source": "outline2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "foundation",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第1章：契约型基金；按题设与一般理论分析",
      "rationales": [
        "基金份额权利来源于基金法律关系和合同，不等于管理公司的公司股权。",
        "基金持有人权利与公司股东权利对象不同。",
        "正常市场损失不存在股东当然补足义务。",
        "托管和销售等关系不会自动产生银行股权。"
      ],
      "conceptIds": [
        "契约型基金"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund2-casebook-002",
      "chapter": 7,
      "lessonId": "fund2-syllabus-2",
      "topic": "ETF折溢价",
      "stem": "ETF二级市场价格1.08元，同口径每份净资产参考值1.00元。忽略时点偏差，溢价率为？",
      "options": [
        "7.41%",
        "108%",
        "−8%",
        "8%"
      ],
      "answer": 3,
      "explanation": "溢价率＝(1.08−1.00)÷1.00＝8%，以净资产参考值为分母。",
      "type": "single",
      "source": "outline2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第2章：ETF折溢价；按题设与一般理论分析",
      "rationales": [
        "以市场价格为分母不是此题的溢价定义。",
        "108%是价格与净值之比，未减1。",
        "价格高于净值，属于正溢价而非折价。",
        "溢价率＝(1.08−1.00)÷1.00＝8%，以净资产参考值为分母。"
      ],
      "conceptIds": [
        "ETF折溢价"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "premium",
        "inputs": [
          1.08,
          1
        ],
        "expected": 8
      }
    },
    {
      "id": "fund2-casebook-003",
      "chapter": 8,
      "lessonId": "fund2-syllabus-3",
      "topic": "几何收益率",
      "stem": "资产第一年涨20%，第二年跌20%，没有外部现金流。两年累计收益率是？",
      "options": [
        "＋4%",
        "−20%",
        "−4%",
        "0%"
      ],
      "answer": 2,
      "explanation": "复合增长因子1.20×0.80＝0.96，所以累计−4%。",
      "type": "single",
      "source": "outline2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第3章：几何收益率；按题设与一般理论分析",
      "rationales": [
        "复合结果低于初始值，不是盈利。",
        "只计算第二年，遗漏第一年。",
        "复合增长因子1.20×0.80＝0.96，所以累计−4%。",
        "简单相加忽略第二年的收益基数变化。"
      ],
      "conceptIds": [
        "几何收益率"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "compoundReturn",
        "inputs": [
          0.2,
          -0.2
        ],
        "expected": -4
      }
    },
    {
      "id": "fund2-casebook-004",
      "chapter": 9,
      "lessonId": "fund2-syllabus-4",
      "topic": "增长模型的适用条件",
      "stem": "用P=D1/(r−g)给股票估值时，r=8%、永久增长率g=9%。对算出的负价格，应怎样处理？",
      "options": [
        "证明公司一定在明天破产",
        "识别模型前提失效，不能把负值当成有效估值",
        "认定股票市价必然为负",
        "改取绝对值就是正确估值"
      ],
      "answer": 1,
      "explanation": "恒定增长股利模型要求折现率大于永久增长率；本题不满足收敛前提。",
      "type": "single",
      "source": "outline2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "advanced",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第4章：增长模型的适用条件；按题设与一般理论分析",
      "rationales": [
        "模型不适用不能直接推断具体破产日期。",
        "恒定增长股利模型要求折现率大于永久增长率；本题不满足收敛前提。",
        "数学代入结果不能越过模型适用条件。",
        "取绝对值没有估值理论依据。"
      ],
      "conceptIds": [
        "增长模型的适用条件"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund2-casebook-005",
      "chapter": 10,
      "lessonId": "fund2-syllabus-5",
      "topic": "净价全价",
      "stem": "债券净价98元，应计利息1.50元，按每百元面值报价、无其他调整。全价为？",
      "options": [
        "99.50元",
        "96.50元",
        "98元",
        "1.50元"
      ],
      "answer": 0,
      "explanation": "全价＝净价＋应计利息＝99.50元。",
      "type": "single",
      "source": "outline2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第5章：净价全价；按题设与一般理论分析",
      "rationales": [
        "全价＝净价＋应计利息＝99.50元。",
        "应计利息应加回，而非扣除。",
        "净价不包含应计利息。",
        "只保留利息，漏掉债券净价。"
      ],
      "conceptIds": [
        "净价全价"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "sum",
        "inputs": [
          98,
          1.5
        ],
        "expected": 99.5
      }
    },
    {
      "id": "fund2-casebook-006",
      "chapter": 11,
      "lessonId": "fund2-syllabus-6",
      "topic": "套保不等于投机方向",
      "stem": "股票基金用股指期货减少市场下跌风险。最典型的操作方向是？",
      "options": [
        "继续买入同向股指期货以降低Beta",
        "买更多股票即可对冲系统风险",
        "无论持仓都固定卖出一手",
        "卖出与现货风险匹配的股指期货"
      ],
      "answer": 3,
      "explanation": "现货多头风险通常用匹配数量的期货空头对冲；应核对Beta、规模和基差风险。",
      "type": "single",
      "source": "outline2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第6章：套保不等于投机方向；按题设与一般理论分析",
      "rationales": [
        "同向期货多头通常增加而非降低市场暴露。",
        "增加同向股票不必然降低系统风险。",
        "套保数量须按暴露与合约参数计算。",
        "现货多头风险通常用匹配数量的期货空头对冲；应核对Beta、规模和基差风险。"
      ],
      "conceptIds": [
        "套保不等于投机方向"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund2-casebook-007",
      "chapter": 12,
      "lessonId": "fund2-syllabus-7",
      "topic": "另类投资流动性",
      "stem": "基金持有尚未上市的项目股权，账面估值上升但短期无买家。最需要避免的认识是？",
      "options": [
        "评估退出渠道及时间",
        "对未实现价值保持审慎",
        "把账面升值直接当作可用于赎回的现金",
        "同时关注估值与流动性"
      ],
      "answer": 2,
      "explanation": "账面升值不意味着可立即变现，不能直接用它支付现金赎回。",
      "type": "single",
      "source": "outline2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第7章：另类投资流动性；按题设与一般理论分析",
      "rationales": [
        "退出渠道与时间是需要评估的，不是错误做法。",
        "对未实现价值审慎是合理做法。",
        "账面升值不意味着可立即变现，不能直接用它支付现金赎回。",
        "估值与流动性共同分析是合理做法，不是应避免的认识。"
      ],
      "conceptIds": [
        "另类投资流动性"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund2-casebook-008",
      "chapter": 13,
      "lessonId": "fund2-syllabus-8",
      "topic": "业绩比较基准",
      "stem": "股票型基金为了显得收益更好，事后把原基准换成表现最差的无关指数。主要问题是？",
      "options": [
        "基准必须永远与基金收益相等",
        "基准缺乏适配和一致性，容易造成选择性展示",
        "任何基准都可在期末随意选",
        "只要收益为正就无需基准"
      ],
      "answer": 1,
      "explanation": "基准应与投资目标、范围和策略匹配，不能以事后挑选扭曲评价。",
      "type": "single",
      "source": "outline2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第8章：业绩比较基准；按题设与一般理论分析",
      "rationales": [
        "基准是比较对象，不要求每期完全相等。",
        "基准应与投资目标、范围和策略匹配，不能以事后挑选扭曲评价。",
        "随意挑选不利于可比、客观评价。",
        "绝对收益为正也可能落后于适当基准。"
      ],
      "conceptIds": [
        "业绩比较基准"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund2-casebook-009",
      "chapter": 14,
      "lessonId": "fund2-syllabus-9",
      "topic": "分散化的边界",
      "stem": "两只股票的相关系数小于1，组成组合通常能降低某些风险。这是否表示系统性风险一定被完全消除？",
      "options": [
        "不表示，分散并不保证消除共同市场风险",
        "表示，买两只就完全无风险",
        "表示，只要各占50%",
        "表示，相关系数低就保证正收益"
      ],
      "answer": 0,
      "explanation": "分散有助于降低非系统性风险，但共同市场因素仍可能影响组合。",
      "type": "single",
      "source": "outline2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第9章：分散化的边界；按题设与一般理论分析",
      "rationales": [
        "分散有助于降低非系统性风险，但共同市场因素仍可能影响组合。",
        "两只资产不构成无风险保证。",
        "等权不是系统风险消除的充分条件。",
        "较低相关性不保证收益为正。"
      ],
      "conceptIds": [
        "分散化的边界"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund2-casebook-010",
      "chapter": 15,
      "lessonId": "fund2-syllabus-10",
      "topic": "最佳执行",
      "stem": "评价交易执行质量，只选择佣金最低的券商是否充分？",
      "options": [
        "充分，佣金就是全部交易成本",
        "充分，市场冲击没有经济影响",
        "充分，是否成交无关紧要",
        "不充分，还要考虑价格、冲击、速度及成交可能性等"
      ],
      "answer": 3,
      "explanation": "最佳执行关注综合结果；最低显性佣金未必意味着最低总成本。",
      "type": "single",
      "source": "outline2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第10章：最佳执行；按题设与一般理论分析",
      "rationales": [
        "滑点和冲击等隐性成本也存在。",
        "大单对价格的影响可能构成重要成本。",
        "成交可能性和及时性也影响投资目标。",
        "最佳执行关注综合结果；最低显性佣金未必意味着最低总成本。"
      ],
      "conceptIds": [
        "最佳执行"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund2-casebook-011",
      "chapter": 16,
      "lessonId": "fund2-syllabus-11",
      "topic": "VaR的解释",
      "stem": "某组合一天99% VaR为100万元。哪项解读最恰当？",
      "options": [
        "每天必然损失100万元",
        "未来100天一定恰有一天超损",
        "在模型与假设成立时，损失超过100万元的概率约为1%",
        "最大损失被保证限制在100万元"
      ],
      "answer": 2,
      "explanation": "VaR是特定模型、期间和置信水平下的损失分位数，不是绝对上限。",
      "type": "single",
      "source": "outline2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "advanced",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第11章：VaR的解释；按题设与一般理论分析",
      "rationales": [
        "分位数不等于每日确定损失。",
        "概率不是有限样本中确定发生的次数。",
        "VaR是特定模型、期间和置信水平下的损失分位数，不是绝对上限。",
        "尾部损失可能远超VaR。"
      ],
      "conceptIds": [
        "VaR的解释"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund2-casebook-012",
      "chapter": 17,
      "lessonId": "fund2-syllabus-12",
      "topic": "Sharpe口径一致",
      "stem": "基金年收益8%，年无风险利率2%，年化波动率15%。按标准教学公式，Sharpe比率为？",
      "options": [
        "4.00",
        "0.40",
        "0.53",
        "2.50"
      ],
      "answer": 1,
      "explanation": "Sharpe＝(8%−2%)÷15%＝0.40；各量须采用一致年化口径。",
      "type": "single",
      "source": "outline2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第12章：Sharpe口径一致；按题设与一般理论分析",
      "rationales": [
        "百分数处理放大十倍。",
        "Sharpe＝(8%−2%)÷15%＝0.40；各量须采用一致年化口径。",
        "0.53漏减无风险利率。",
        "倒置了风险和超额收益的比值。"
      ],
      "conceptIds": [
        "Sharpe口径一致"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "sharpe",
        "inputs": [
          0.08,
          0.02,
          0.15
        ],
        "expected": 0.4
      }
    },
    {
      "id": "fund2-casebook-013",
      "chapter": 18,
      "lessonId": "fund2-syllabus-13",
      "topic": "申购与确认",
      "stem": "投资者在销售端提交申购申请后看到“受理成功”。是否等于份额已最终确认？",
      "options": [
        "不等于，应以规定流程和登记确认结果为准",
        "等于，申请数量永久不可变化",
        "等于，受理时屏幕净值一定就是成交净值",
        "等于，后续无需核对费用和有效性"
      ],
      "answer": 0,
      "explanation": "受理申请与最终确认不是同一步，需依适用规则和产品约定核对。",
      "type": "single",
      "source": "outline2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第13章：申购与确认；按题设与一般理论分析",
      "rationales": [
        "受理申请与最终确认不是同一步，需依适用规则和产品约定核对。",
        "受理并不保证全部申请有效及全部确认。",
        "屏幕展示净值未必是该申请适用的确认净值。",
        "费用、有效申请及确认结果仍需核对。"
      ],
      "conceptIds": [
        "申购与确认"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund2-casebook-014",
      "chapter": 19,
      "lessonId": "fund2-syllabus-14",
      "topic": "清算与交收",
      "stem": "交易后系统算出各方应收应付款券，随后才实际划转。前一步与后一步的关系是？",
      "options": [
        "前后都是发行注册",
        "算出净额就必然完成资金划转",
        "交收一定发生在交易之前",
        "前者侧重清算确定义务，后者侧重交收履行义务"
      ],
      "answer": 3,
      "explanation": "清算确认应收应付等，交收则按规则完成钱券划转；两环节应区分。",
      "type": "single",
      "source": "outline2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "foundation",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第14章：清算与交收；按题设与一般理论分析",
      "rationales": [
        "这是交易后处理，不是证券发行注册。",
        "账务计算不等于实际完成划转。",
        "不能把一般交易后处理的时间顺序倒置。",
        "清算确认应收应付等，交收则按规则完成钱券划转；两环节应区分。"
      ],
      "conceptIds": [
        "清算与交收"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund2-casebook-015",
      "chapter": 20,
      "lessonId": "fund2-syllabus-15",
      "topic": "净值估值责任",
      "stem": "某停牌股票没有当日成交价，基金是否可永远机械沿用停牌前收盘价？",
      "options": [
        "可以，由销售人员指定最高价格",
        "可以，把该资产价值一律记为零",
        "不可以，应按适用估值政策与公允价值要求评估",
        "可以，因为没有交易就绝无价值变化"
      ],
      "answer": 2,
      "explanation": "缺少最新报价时仍要依规则、估值政策及可用信息审慎估值。",
      "type": "single",
      "source": "outline2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第15章：净值估值责任；按题设与一般理论分析",
      "rationales": [
        "销售目标不能决定公允价值。",
        "没有成交也不意味着资产价值必为零。",
        "缺少最新报价时仍要依规则、估值政策及可用信息审慎估值。",
        "停牌不意味着经济价值冻结。"
      ],
      "conceptIds": [
        "净值估值责任"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund2-casebook-016",
      "chapter": 21,
      "lessonId": "fund2-syllabus-16",
      "topic": "分配与可分配利润",
      "stem": "基金本期净值上涨，是否就可以只凭上涨幅度任意承诺现金分红？",
      "options": [
        "可以，先借款分红即可忽略限制",
        "不可以，还须核对可供分配利润及法律、合同条件",
        "可以，净值涨幅就是分红现金",
        "可以，无须考虑未实现损益"
      ],
      "answer": 1,
      "explanation": "分配须符合适用规则和合同，并核对利润及现金等条件。",
      "type": "single",
      "source": "outline2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第16章：分配与可分配利润；按题设与一般理论分析",
      "rationales": [
        "融资不能替代分配资格与合同约束。",
        "分配须符合适用规则和合同，并核对利润及现金等条件。",
        "净值变化不等于可分配现金。",
        "已实现与未实现项目应按适用口径区分。"
      ],
      "conceptIds": [
        "分配与可分配利润"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund2-casebook-017",
      "chapter": 22,
      "lessonId": "fund2-syllabus-17",
      "topic": "重大事项披露",
      "stem": "重要投资风险已经明确，仅因尚未到年报日就不作必要披露，最主要的问题是？",
      "options": [
        "把定期披露误当作全部披露义务，忽略适用临时披露要求",
        "任何信息都只能在年报披露",
        "净值未跌就永远不用披露",
        "私下告诉一名大客户即可替代公开披露"
      ],
      "answer": 0,
      "explanation": "定期报告不能替代依法应及时履行的重大事项等临时披露义务。",
      "type": "single",
      "source": "outline2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第17章：重大事项披露；按题设与一般理论分析",
      "rationales": [
        "定期报告不能替代依法应及时履行的重大事项等临时披露义务。",
        "信息披露存在不同类型和时点要求。",
        "是否应披露不能只看当时净值涨跌。",
        "选择性告知不能替代应有的公平披露。"
      ],
      "conceptIds": [
        "重大事项披露"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund2-casebook-018",
      "chapter": 23,
      "lessonId": "fund2-syllabus-18",
      "topic": "历史业绩展示",
      "stem": "销售材料只展示历史最高的一年，不说明完整区间、风险和比较口径。主要风险是？",
      "options": [
        "只要数字曾经出现就一定合规",
        "高收益数据可以替代风险揭示",
        "业绩越好越不必说明费用",
        "选择性展示可能误导投资者"
      ],
      "answer": 3,
      "explanation": "真实数字也可能因截取区间、缺少口径或风险说明而产生误导。",
      "type": "single",
      "source": "outline2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第18章：历史业绩展示；按题设与一般理论分析",
      "rationales": [
        "单个数字真实不代表整体表达充分、客观。",
        "历史业绩不能替代风险提示。",
        "费用口径仍影响可比性及投资者理解。",
        "真实数字也可能因截取区间、缺少口径或风险说明而产生误导。"
      ],
      "conceptIds": [
        "历史业绩展示"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund2-casebook-019",
      "chapter": 14,
      "lessonId": "fund2-syllabus-9",
      "topic": "组合Beta",
      "stem": "组合60%配置Beta=1.2的资产，40%配置Beta=0.5的资产，权重与口径一致。组合Beta为？",
      "options": [
        "1.70",
        "0.72",
        "0.92",
        "0.85"
      ],
      "answer": 2,
      "explanation": "组合Beta按权重加总：0.6×1.2＋0.4×0.5＝0.92。",
      "type": "single",
      "source": "outline2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第9章：组合Beta；按题设与一般理论分析",
      "rationales": [
        "组合Beta必须按投资权重加权，不能直接相加。",
        "只算了第一项资产的贡献。",
        "组合Beta按权重加总：0.6×1.2＋0.4×0.5＝0.92。",
        "简单平均忽略60%与40%的不同权重。"
      ],
      "conceptIds": [
        "组合Beta"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "weighted",
        "inputs": [
          0.6,
          1.2,
          0.4,
          0.5
        ],
        "expected": 0.92
      }
    },
    {
      "id": "fund2-casebook-020",
      "chapter": 10,
      "lessonId": "fund2-syllabus-5",
      "topic": "久期单位",
      "stem": "债券修正久期4年，收益率上升25个基点。只用久期近似，价格约变化？",
      "options": [
        "−0.1%",
        "−1%",
        "−100%",
        "＋1%"
      ],
      "answer": 1,
      "explanation": "25个基点＝0.0025，ΔP/P≈−4×0.0025＝−1%。",
      "type": "single",
      "source": "outline2",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第5章：久期单位；按题设与一般理论分析",
      "rationales": [
        "基点换算少了一个数量级。",
        "25个基点＝0.0025，ΔP/P≈−4×0.0025＝−1%。",
        "将基点误当成百分点或比例，会严重放大结果。",
        "收益率上升时普通债券久期近似价格下跌。"
      ],
      "conceptIds": [
        "久期单位"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "durationPct",
        "inputs": [
          4,
          25
        ],
        "expected": -1
      }
    }
  ],
  "fund3": [
    {
      "id": "fund3-casebook-001",
      "chapter": 6,
      "lessonId": "fund3-syllabus-1",
      "topic": "承诺与现金",
      "stem": "LP认缴1,000万元，按通知已实缴300万元。基金当前可用现金是否可直接按1,000万元计？",
      "options": [
        "不可以，未实缴承诺不等于已到账资金",
        "可以，签约即视为现金到账",
        "可以，只要管理人已经登记",
        "可以，认缴与实缴永远相等"
      ],
      "answer": 0,
      "explanation": "认缴承诺与实际到账须区分；还要扣除已支出等才能确认可用现金。",
      "type": "single",
      "source": "outline3",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第1章：承诺与现金；具体条款按题设，不视为行业统一标准",
      "rationales": [
        "认缴承诺与实际到账须区分；还要扣除已支出等才能确认可用现金。",
        "合同承诺不能替代资金划转。",
        "管理人登记不改变资金事实。",
        "出资方式和时间可能使两者不同。"
      ],
      "conceptIds": [
        "承诺与现金"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund3-casebook-002",
      "chapter": 7,
      "lessonId": "fund3-syllabus-2",
      "topic": "管理人登记边界",
      "stem": "某私募管理人宣称“已经登记，所以协会保证本基金收益”。应如何判断？",
      "options": [
        "登记等于协会承担全部亏损",
        "备案后项目估值一定真实",
        "登记可免除后续合规义务",
        "登记不构成协会对投资能力或收益的保证"
      ],
      "answer": 3,
      "explanation": "登记是相关管理制度的一环，不能被包装成投资价值或收益担保。",
      "type": "single",
      "source": "outline3",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第2章：管理人登记边界；具体条款按题设，不视为行业统一标准",
      "rationales": [
        "登记不产生正常投资亏损由协会补足的义务。",
        "估值仍需依据事实和适用政策，不能从备案直接推定。",
        "登记之后仍应持续履行适用义务。",
        "登记是相关管理制度的一环，不能被包装成投资价值或收益担保。"
      ],
      "conceptIds": [
        "管理人登记边界"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund3-casebook-003",
      "chapter": 7,
      "lessonId": "fund3-syllabus-2",
      "topic": "受托职责与外包",
      "stem": "管理人把部分运营工作外包后，声称任何运营问题都不再与自己有关。主要错误是？",
      "options": [
        "外包后基金合同自动失效",
        "只要服务便宜就完成了全部职责",
        "外包不当然免除管理人的尽调、监督和受托责任",
        "使用服务机构本身必然违法"
      ],
      "answer": 2,
      "explanation": "可外包事项的选择与监督仍须依规则和合同管理，不能一概转移责任。",
      "type": "single",
      "source": "outline3",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第2章：受托职责与外包；具体条款按题设，不视为行业统一标准",
      "rationales": [
        "外包不会当然使合同失效。",
        "低费用不能替代服务质量和风险监督。",
        "可外包事项的选择与监督仍须依规则和合同管理，不能一概转移责任。",
        "应判断可外包范围和规则，不能一概断言违法。"
      ],
      "conceptIds": [
        "受托职责与外包"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund3-casebook-004",
      "chapter": 8,
      "lessonId": "fund3-syllabus-3",
      "topic": "有限合伙责任边界",
      "stem": "不考虑法律另有规定的例外，有限合伙企业中普通合伙人承担何种责任？",
      "options": [
        "只承担本年度管理费金额",
        "对合伙企业债务承担无限连带责任",
        "仅以认缴出资额为限",
        "不承担任何企业债务责任"
      ],
      "answer": 1,
      "explanation": "一般有限合伙结构中普通合伙人承担无限连带责任，应与有限合伙人区分。",
      "type": "single",
      "source": "outline3",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "foundation",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第3章：有限合伙责任边界；具体条款按题设，不视为行业统一标准",
      "rationales": [
        "管理费不是债务责任上限。",
        "一般有限合伙结构中普通合伙人承担无限连带责任，应与有限合伙人区分。",
        "这是有限合伙人通常的责任限制，不能套给普通合伙人。",
        "担任普通合伙人不等于无责任。"
      ],
      "conceptIds": [
        "有限合伙责任边界"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund3-casebook-005",
      "chapter": 8,
      "lessonId": "fund3-syllabus-3",
      "topic": "穿透识别",
      "stem": "通过层层产品或代持安排把不符合条件的资金拼成一笔大额认购，其核心合规问题是？",
      "options": [
        "不能以形式上的大额金额规避应适用的投资者识别与资格要求",
        "金额合并后自动豁免所有要求",
        "只要账户名称不同就无需核查",
        "合同写了自愿就能消除问题"
      ],
      "answer": 0,
      "explanation": "应按适用规则识别投资者与资金，不能用拼单或代持规避准入条件。",
      "type": "single",
      "source": "outline3",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第3章：穿透识别；具体条款按题设，不视为行业统一标准",
      "rationales": [
        "应按适用规则识别投资者与资金，不能用拼单或代持规避准入条件。",
        "大额形式不能替代实质资格审查。",
        "账户名称不构成识别义务豁免。",
        "自愿不能替代法定要求。"
      ],
      "conceptIds": [
        "穿透识别"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund3-casebook-006",
      "chapter": 9,
      "lessonId": "fund3-syllabus-4",
      "topic": "公开宣传与私募",
      "stem": "以面向不特定公众的直播推广特定私募基金并接受认购，主要问题是什么？",
      "options": [
        "直播天然属于非公开渠道",
        "只要设置关注按钮就属于特定对象",
        "只要没有纸质广告就不算宣传",
        "可能违反私募非公开募集及投资者适当性要求"
      ],
      "answer": 3,
      "explanation": "应关注是否面向不特定对象、是否推介具体产品以及适用募集程序。",
      "type": "single",
      "source": "outline3",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第4章：公开宣传与私募；具体条款按题设，不视为行业统一标准",
      "rationales": [
        "直播技术形式不能自动证明非公开。",
        "关注操作不能替代法定筛选及资格程序。",
        "线上和线下均可能构成推介。",
        "应关注是否面向不特定对象、是否推介具体产品以及适用募集程序。"
      ],
      "conceptIds": [
        "公开宣传与私募"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund3-casebook-007",
      "chapter": 9,
      "lessonId": "fund3-syllabus-4",
      "topic": "风险揭示的作用",
      "stem": "募集人员解释“签风险揭示书，就是允许管理人挪用资金”。正确回应是？",
      "options": [
        "正确，只要以后补回",
        "正确，合同可以排除所有法律责任",
        "风险揭示说明投资风险，不授权挪用或其他违规行为",
        "正确，签字后可任意使用资金"
      ],
      "answer": 2,
      "explanation": "风险承担不能理解为允许管理人违反受托职责或挪用资产。",
      "type": "single",
      "source": "outline3",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第4章：风险揭示的作用；具体条款按题设，不视为行业统一标准",
      "rationales": [
        "事后补回不使行为当然合规。",
        "合同不能任意排除法定禁止和责任。",
        "风险承担不能理解为允许管理人违反受托职责或挪用资产。",
        "签字不等于放弃一切法定保护。"
      ],
      "conceptIds": [
        "风险揭示的作用"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund3-casebook-008",
      "chapter": 10,
      "lessonId": "fund3-syllabus-5",
      "topic": "投前投后稀释",
      "stem": "题设投前估值8,000万元，新投入2,000万元全部为增资，无其他稀释。新投资人投后持股？",
      "options": [
        "2.5%",
        "20%",
        "25%",
        "80%"
      ],
      "answer": 1,
      "explanation": "投后估值10,000，持股2,000÷10,000＝20%。",
      "type": "single",
      "source": "outline3",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第5章：投前投后稀释；具体条款按题设，不视为行业统一标准",
      "rationales": [
        "比例换算数量级错误。",
        "投后估值10,000，持股2,000÷10,000＝20%。",
        "25%使用了投前估值作分母。",
        "80%是原股东剩余比例。"
      ],
      "conceptIds": [
        "投前投后稀释"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "stakePct",
        "inputs": [
          8000,
          2000
        ],
        "expected": 20
      }
    },
    {
      "id": "fund3-casebook-009",
      "chapter": 10,
      "lessonId": "fund3-syllabus-5",
      "topic": "老股转让与增资",
      "stem": "新投资者向创始人支付1,000万元购买老股，不向公司增资。忽略税费，公司现金直接变化是？",
      "options": [
        "不因这笔老股转让而直接增加",
        "增加1,000万元",
        "减少1,000万元",
        "增加2,000万元"
      ],
      "answer": 0,
      "explanation": "价款付给老股东而非公司，应区分老股转让和新股增资。",
      "type": "single",
      "source": "outline3",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第5章：老股转让与增资；具体条款按题设，不视为行业统一标准",
      "rationales": [
        "价款付给老股东而非公司，应区分老股转让和新股增资。",
        "把股东收到的款项误记为公司融资。",
        "题设也没有公司付款。",
        "既混淆资金接收方又重复计算。"
      ],
      "conceptIds": [
        "老股转让与增资"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund3-casebook-010",
      "chapter": 10,
      "lessonId": "fund3-syllabus-5",
      "topic": "尽调不等于保证",
      "stem": "财务尽调未发现重大问题，能否保证项目未来一定盈利？",
      "options": [
        "能，未发现就等于不存在任何风险",
        "能，可省略商业及法律尽调",
        "能，未来所有风险转给审计师",
        "不能，尽调降低信息风险但不保证未来经营结果"
      ],
      "answer": 3,
      "explanation": "尽调受范围、时点和信息条件限制，未来经营和市场风险仍然存在。",
      "type": "single",
      "source": "outline3",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第5章：尽调不等于保证；具体条款按题设，不视为行业统一标准",
      "rationales": [
        "未发现问题不等于证明所有风险不存在。",
        "不同领域的尽调不能互相完全替代。",
        "服务机构责任应依法依约判断，不等于全部经营风险转移。",
        "尽调受范围、时点和信息条件限制，未来经营和市场风险仍然存在。"
      ],
      "conceptIds": [
        "尽调不等于保证"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund3-casebook-011",
      "chapter": 10,
      "lessonId": "fund3-syllabus-5",
      "topic": "优先清算权条款",
      "stem": "题设投资人投入100万元，约定1倍非参与型优先清算权，可选先收100万元或按20%股权分配；退出可分配400万元。其选择结果是？",
      "options": [
        "180万元",
        "400万元",
        "100万元",
        "80万元"
      ],
      "answer": 2,
      "explanation": "比较优先100与按股80，选100；非参与型不再叠加分余款。",
      "type": "single",
      "source": "outline3",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "advanced",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第5章：优先清算权条款；具体条款按题设，不视为行业统一标准",
      "rationales": [
        "180错误地同时享有优先和参与分配。",
        "条款没有给予投资人全部退出款。",
        "比较优先100与按股80，选100；非参与型不再叠加分余款。",
        "按股80低于可选的优先100。"
      ],
      "conceptIds": [
        "优先清算权条款"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "nonParticipating",
        "inputs": [
          100,
          0.2,
          400
        ],
        "expected": 100
      }
    },
    {
      "id": "fund3-casebook-012",
      "chapter": 11,
      "lessonId": "fund3-syllabus-6",
      "topic": "投后预警",
      "stem": "被投企业收入上升，但应收账款增速更快且经营现金流持续为负。投后管理最应关注？",
      "options": [
        "只检查公司宣传海报",
        "收入质量、回款与资金链压力",
        "只要收入增长就无需关注现金流",
        "应收账款自动等于现金"
      ],
      "answer": 1,
      "explanation": "收入与现金流偏离提示回款、收入确认或营运资本等风险，应进一步核查。",
      "type": "single",
      "source": "outline3",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第6章：投后预警；具体条款按题设，不视为行业统一标准",
      "rationales": [
        "宣传材料不能替代财务和经营监控。",
        "收入与现金流偏离提示回款、收入确认或营运资本等风险，应进一步核查。",
        "增长不排除资金紧张或收入质量问题。",
        "应收未收与现金到账不同。"
      ],
      "conceptIds": [
        "投后预警"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund3-casebook-013",
      "chapter": 11,
      "lessonId": "fund3-syllabus-6",
      "topic": "重大事项与治理",
      "stem": "被投企业拟进行大额关联担保。基金应如何履行投后管理职责？",
      "options": [
        "按投资协议、章程与法律核对审批和信息权，评估风险",
        "认为入股后再无权了解重大事项",
        "要求员工绕过所有公司治理程序",
        "仅凭创始人口头说没事即可"
      ],
      "answer": 0,
      "explanation": "治理参与要依据合同和法定权限，并审查担保及关联风险。",
      "type": "single",
      "source": "outline3",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第6章：重大事项与治理；具体条款按题设，不视为行业统一标准",
      "rationales": [
        "治理参与要依据合同和法定权限，并审查担保及关联风险。",
        "投资人可能具有信息、表决等约定权利。",
        "基金也不能任意越过治理和法律边界。",
        "重大事项不宜仅依口头保证。"
      ],
      "conceptIds": [
        "重大事项与治理"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund3-casebook-014",
      "chapter": 12,
      "lessonId": "fund3-syllabus-7",
      "topic": "退出不等于上市保证",
      "stem": "项目商业计划以IPO退出为唯一成功路径。投资经理最应补充？",
      "options": [
        "把IPO申请等同上市成功",
        "认定排队时间就是确定退出日",
        "把账面估值当作已实现退出款",
        "评估并购、转让等备选退出与时间不确定性"
      ],
      "answer": 3,
      "explanation": "退出渠道、监管审核、估值和市场条件具有不确定性，应考虑备选及压力情景。",
      "type": "single",
      "source": "outline3",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第7章：退出不等于上市保证；具体条款按题设，不视为行业统一标准",
      "rationales": [
        "申请不等于获准发行上市。",
        "流程时间无法当然保证最终退出日。",
        "账面估值不是实际回收现金。",
        "退出渠道、监管审核、估值和市场条件具有不确定性，应考虑备选及压力情景。"
      ],
      "conceptIds": [
        "退出不等于上市保证"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund3-casebook-015",
      "chapter": 12,
      "lessonId": "fund3-syllabus-7",
      "topic": "转让价款分期",
      "stem": "基金已签股权转让协议，对方承诺分三年付款。衡量已实现现金回收时，应采用？",
      "options": [
        "只按新闻稿公布金额",
        "忽略买方信用与履约风险",
        "实际到账及合同义务的清晰区分",
        "把三年全部承诺款直接当成已分配现金"
      ],
      "answer": 2,
      "explanation": "签约应收款与现金到账、向LP分配属于不同环节，需分别跟踪。",
      "type": "single",
      "source": "outline3",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第7章：转让价款分期；具体条款按题设，不视为行业统一标准",
      "rationales": [
        "披露金额不替代会计与资金事实。",
        "分期付款增加信用及履约风险评估需求。",
        "签约应收款与现金到账、向LP分配属于不同环节，需分别跟踪。",
        "未来价款不等于已经回收并分配。"
      ],
      "conceptIds": [
        "转让价款分期"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund3-casebook-016",
      "chapter": 13,
      "lessonId": "fund3-syllabus-8",
      "topic": "投资决策权限",
      "stem": "投资委员会拟批准超出基金合同投资范围的项目。最恰当的做法是？",
      "options": [
        "隐去项目分类后直接打款",
        "先判断是否允许变更及所需程序，不因投委会同意就直接投资",
        "投委会表决即可排除合同约束",
        "只要收益预期高就可以突破"
      ],
      "answer": 1,
      "explanation": "内部决策权限不能当然突破法律和基金合同，应先核对变更与批准机制。",
      "type": "single",
      "source": "outline3",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第8章：投资决策权限；具体条款按题设，不视为行业统一标准",
      "rationales": [
        "隐瞒性质增加合规和受托责任风险。",
        "内部决策权限不能当然突破法律和基金合同，应先核对变更与批准机制。",
        "内部表决不是合同和法律豁免。",
        "预期收益不能替代权限边界。"
      ],
      "conceptIds": [
        "投资决策权限"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund3-casebook-017",
      "chapter": 13,
      "lessonId": "fund3-syllabus-8",
      "topic": "关键人士条款",
      "stem": "合同约定关键人士离任触发暂停新增投资，关键人士已离任。管理人应首先？",
      "options": [
        "识别触发条件并执行合同要求的通知、暂停与后续程序",
        "认为人员变化与合同无关",
        "在通知前加速投完资金以规避",
        "只修改官网简历即可"
      ],
      "answer": 0,
      "explanation": "关键人士条款是合同治理机制，应按约核对并履行触发后的措施。",
      "type": "single",
      "source": "outline3",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第8章：关键人士条款；具体条款按题设，不视为行业统一标准",
      "rationales": [
        "关键人士条款是合同治理机制，应按约核对并履行触发后的措施。",
        "题设已经明确存在相关条款。",
        "规避条款目的可能损害投资者利益。",
        "官网修改不能替代约定程序。"
      ],
      "conceptIds": [
        "关键人士条款"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund3-casebook-018",
      "chapter": 14,
      "lessonId": "fund3-syllabus-9",
      "topic": "TVPI不是年化收益",
      "stem": "某基金DPI=0.6、RVPI=0.9，同一口径下TVPI=1.5。以下哪项解读准确？",
      "options": [
        "所有本金已以现金返还",
        "年化收益率必为50%",
        "剩余0.9倍已全部到账LP",
        "总价值为实缴资本的1.5倍，不等于年化收益50%"
      ],
      "answer": 3,
      "explanation": "TVPI是价值倍数，不包含时间分布；年化收益需进一步分析现金流。",
      "type": "single",
      "source": "outline3",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第9章：TVPI不是年化收益；具体条款按题设，不视为行业统一标准",
      "rationales": [
        "DPI只有0.6倍，不能推出本金已全部现金返还。",
        "缺少持有时间和现金流时点不能换算年化。",
        "RVPI代表剩余价值而非已分配现金。",
        "TVPI是价值倍数，不包含时间分布；年化收益需进一步分析现金流。"
      ],
      "conceptIds": [
        "TVPI不是年化收益"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund3-casebook-019",
      "chapter": 14,
      "lessonId": "fund3-syllabus-9",
      "topic": "IRR现金流时点",
      "stem": "两个项目都投入100万元、最终收回150万元。一个一年回收，另一个三年回收，无中间现金流。关于IRR正确的是？",
      "options": [
        "三年回收项目IRR一定更高",
        "仅看150万元即可计算两者相同年化值",
        "一年回收项目的IRR更高",
        "因为回收倍数相同，IRR必相同"
      ],
      "answer": 2,
      "explanation": "现金流越早回收，题设下年化回报越高；IRR考虑时间价值。",
      "type": "single",
      "source": "outline3",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第9章：IRR现金流时点；具体条款按题设，不视为行业统一标准",
      "rationales": [
        "相同终值更晚获得通常使年化回报更低。",
        "年化计算必须考虑期限。",
        "现金流越早回收，题设下年化回报越高；IRR考虑时间价值。",
        "相同倍数不代表相同年化回报。"
      ],
      "conceptIds": [
        "IRR现金流时点"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "fund3-casebook-020",
      "chapter": 14,
      "lessonId": "fund3-syllabus-9",
      "topic": "管理费基数",
      "stem": "基金合同约定投资期按认缴规模、退出期按未退出投资成本计费。进入退出期后应怎样计算？",
      "options": [
        "只由管理人临时口头决定",
        "按合同约定切换基数并核对期间、费率和调整项目",
        "继续永远使用认缴规模",
        "统一采用所有基金都适用的固定比例"
      ],
      "answer": 1,
      "explanation": "题设明确了阶段性基数，需按约执行；费率和期间也须匹配。",
      "type": "single",
      "source": "outline3",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "大纲第9章：管理费基数；具体条款按题设，不视为行业统一标准",
      "rationales": [
        "口头决定不能当然替代合同及变更程序。",
        "题设明确了阶段性基数，需按约执行；费率和期间也须匹配。",
        "忽略阶段切换违反题设约定。",
        "费用安排不应被当作不变的行业统一参数。"
      ],
      "conceptIds": [
        "管理费基数"
      ],
      "editorialBatch": "2026-10-13"
    }
  ],
  "securities1": [
    {
      "id": "securities1-casebook-001",
      "chapter": 1,
      "lessonId": "securities1-1",
      "topic": "发行市场与流通市场",
      "stem": "甲从乙手中买入一只已上市股票，发行公司没有新发行股份。这笔交易主要发生在？",
      "options": [
        "二级市场",
        "一级发行市场",
        "银行信贷市场",
        "公司增资环节"
      ],
      "answer": 0,
      "explanation": "已有证券在投资者间转让属于二级市场交易。",
      "type": "single",
      "source": "securitiesOutline",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "foundation",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场基础知识 · 发行市场与流通市场；本站情景与题设",
      "rationales": [
        "已有证券在投资者间转让属于二级市场交易。",
        "公司没有在本次交易中向投资者发行新股。",
        "交易标的是股票而非贷款。",
        "股票转让不等于发行人收到增资款。"
      ],
      "conceptIds": [
        "发行市场与流通市场"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities1-casebook-002",
      "chapter": 1,
      "lessonId": "securities1-1",
      "topic": "融资期限与工具",
      "stem": "企业为三个月后的原料采购筹措短期周转资金。比较工具时首先应考虑？",
      "options": [
        "股票融资必然有三个月到期日",
        "所有债券只能用于长期融资",
        "融资成本越低越不需要考虑期限",
        "资金期限、现金流和融资工具期限相匹配"
      ],
      "answer": 3,
      "explanation": "期限错配会产生再融资和流动性压力，成本并不是唯一决策维度。",
      "type": "single",
      "source": "securitiesOutline",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场基础知识 · 融资期限与工具；本站情景与题设",
      "rationales": [
        "普通股没有约定的三个月还本期限。",
        "债务工具可以有不同期限。",
        "低成本不能消除到期资金缺口。",
        "期限错配会产生再融资和流动性压力，成本并不是唯一决策维度。"
      ],
      "conceptIds": [
        "融资期限与工具"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities1-casebook-003",
      "chapter": 2,
      "lessonId": "securities1-2",
      "topic": "货币政策传导",
      "stem": "政策利率下降后，某信用风险恶化企业的融资利率反而上升。合理解释是？",
      "options": [
        "政策利率就是每家企业贷款利率",
        "信用状况不会影响融资成本",
        "信用利差扩大可能超过基准利率下降",
        "所有借款利率必须机械地同步下降"
      ],
      "answer": 2,
      "explanation": "融资成本包括基准利率和信用、流动性等溢价，各部分可能反向变化。",
      "type": "single",
      "source": "securitiesOutline",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场基础知识 · 货币政策传导；本站情景与题设",
      "rationales": [
        "政策利率并非具体借款合同利率。",
        "违约风险通常会影响融资溢价。",
        "融资成本包括基准利率和信用、流动性等溢价，各部分可能反向变化。",
        "传导受信用、期限等因素影响，不是固定一比一关系。"
      ],
      "conceptIds": [
        "货币政策传导"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities1-casebook-004",
      "chapter": 2,
      "lessonId": "securities1-2",
      "topic": "实际利率近似",
      "stem": "名义一年收益率4%，同期物价上涨6%。按Fisher关系计算实际收益率约为？",
      "options": [
        "−6%",
        "−1.89%",
        "＋10%",
        "＋2%"
      ],
      "answer": 1,
      "explanation": "实际收益率=1.04/1.06−1≈−1.89%；简单相减−2%仅为近似。",
      "type": "single",
      "source": "securitiesOutline",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场基础知识 · 实际利率近似；本站情景与题设",
      "rationales": [
        "忽略了名义收益4%。",
        "实际收益率=1.04/1.06−1≈−1.89%；简单相减−2%仅为近似。",
        "不能把通胀与名义收益相加。",
        "物价涨幅高于名义收益，购买力下降。"
      ],
      "conceptIds": [
        "实际利率近似"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "realReturn",
        "inputs": [
          0.04,
          0.06
        ],
        "expected": -1.8867924528301883
      }
    },
    {
      "id": "securities1-casebook-005",
      "chapter": 3,
      "lessonId": "securities1-3",
      "topic": "结算机构的边界",
      "stem": "股票登记结算机构完成交收，是否说明其认可投资价值？",
      "options": [
        "不说明；登记结算不等于投资价值担保",
        "说明该股票不会跌",
        "说明发行人的利润已经获担保",
        "说明该笔交易没有任何风险"
      ],
      "answer": 0,
      "explanation": "基础设施处理登记与交收，并不替投资者保证证券价格或发行人盈利。",
      "type": "single",
      "source": "securitiesOutline",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场基础知识 · 结算机构的边界；本站情景与题设",
      "rationales": [
        "基础设施处理登记与交收，并不替投资者保证证券价格或发行人盈利。",
        "股价仍然受到市场与经营影响。",
        "履行结算职责不等于担保经营业绩。",
        "交收完成与市场风险消失不是同一回事。"
      ],
      "conceptIds": [
        "结算机构的边界"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities1-casebook-006",
      "chapter": 3,
      "lessonId": "securities1-3",
      "topic": "信息披露与投资选择",
      "stem": "企业按要求完整披露了一项高风险投资。对投资者而言，正确的是？",
      "options": [
        "披露完成即意味着收益有保证",
        "所有投资者都必须买入",
        "只要公开披露，就无需理解风险",
        "披露有助于判断，但不代表该投资适合每个人"
      ],
      "answer": 3,
      "explanation": "信息披露解决信息可得性，适合程度还取决于风险承受力、目标和价格等。",
      "type": "single",
      "source": "securitiesOutline",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场基础知识 · 信息披露与投资选择；本站情景与题设",
      "rationales": [
        "发行人完成信息披露，不构成未来投资收益的承诺。",
        "信息公开不构成购买义务。",
        "风险揭示必须结合自身情况理解。",
        "信息披露解决信息可得性，适合程度还取决于风险承受力、目标和价格等。"
      ],
      "conceptIds": [
        "信息披露与投资选择"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities1-casebook-007",
      "chapter": 4,
      "lessonId": "securities1-4",
      "topic": "除息与总财富",
      "stem": "持有100股，除息前每股10元，每股现金分红1元。仅作理论除息、忽略税费和行情，除息后总财富？",
      "options": [
        "降至900元",
        "增至2,000元",
        "仍为1,000元",
        "增至1,100元"
      ],
      "answer": 2,
      "explanation": "理论股价9元，股票900元加现金100元，合计1,000元。",
      "type": "single",
      "source": "securitiesOutline",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场基础知识 · 除息与总财富；本站情景与题设",
      "rationales": [
        "只看股票市值，没有计入现金股利。",
        "分红并不凭空使财富翻倍。",
        "理论股价9元，股票900元加现金100元，合计1,000元。",
        "漏掉除息参考价格的调整。"
      ],
      "conceptIds": [
        "除息与总财富"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "product",
        "inputs": [
          100,
          10
        ],
        "expected": 1000
      }
    },
    {
      "id": "securities1-casebook-008",
      "chapter": 4,
      "lessonId": "securities1-4",
      "topic": "市盈率适用性",
      "stem": "公司本期每股收益为负。直接用负市盈率与盈利公司比较“越小越便宜”，主要问题是？",
      "options": [
        "市盈率不受盈利口径影响",
        "负盈利使常规市盈率排序失去通常的经济含义",
        "负市盈率一定代表无风险套利",
        "负数越大绝对越便宜"
      ],
      "answer": 1,
      "explanation": "需分析亏损原因、可比盈利与其他估值指标，不能把负数机械排在最便宜。",
      "type": "single",
      "source": "securitiesOutline",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场基础知识 · 市盈率适用性；本站情景与题设",
      "rationales": [
        "每股收益是市盈率的分母，口径很关键。",
        "需分析亏损原因、可比盈利与其他估值指标，不能把负数机械排在最便宜。",
        "估值指标异常不等于存在可执行无风险收益。",
        "负值大小不能直接沿用正盈利公司的解释。"
      ],
      "conceptIds": [
        "市盈率适用性"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities1-casebook-009",
      "chapter": 4,
      "lessonId": "securities1-4",
      "topic": "每股指标与拆股",
      "stem": "公司一拆二，暂不考虑经营变化和市场重估。哪项最可能保持不变？",
      "options": [
        "投资者按原持股比例对应的权益价值",
        "单股价格",
        "单股收益",
        "流通股数"
      ],
      "answer": 0,
      "explanation": "拆股改变股数和每股口径，不会仅因拆股改变原持股比例对应的经济权益。",
      "type": "single",
      "source": "securitiesOutline",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场基础知识 · 每股指标与拆股；本站情景与题设",
      "rationales": [
        "拆股改变股数和每股口径，不会仅因拆股改变原持股比例对应的经济权益。",
        "理论每股价格相应降低。",
        "总盈利不变时，每股收益随股数增加而降低。",
        "一拆二会增加股份数量。"
      ],
      "conceptIds": [
        "每股指标与拆股"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities1-casebook-010",
      "chapter": 5,
      "lessonId": "securities1-5",
      "topic": "票面利率与到期收益率",
      "stem": "同一固定利率债券，合同现金流不变而市场成交价下降。其他因素相同时，到期收益率如何变动？",
      "options": [
        "下降",
        "等于票面利率不变",
        "必定归零",
        "上升"
      ],
      "answer": 3,
      "explanation": "用更低价格买入相同未来现金流，隐含到期收益率提高。",
      "type": "single",
      "source": "securitiesOutline",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场基础知识 · 票面利率与到期收益率；本站情景与题设",
      "rationales": [
        "这与债券价格和收益率反向关系相反。",
        "票息由合同决定，到期收益率还取决于买入价格。",
        "价格下跌不能推出到期收益率为零。",
        "用更低价格买入相同未来现金流，隐含到期收益率提高。"
      ],
      "conceptIds": [
        "票面利率与到期收益率"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities1-casebook-011",
      "chapter": 5,
      "lessonId": "securities1-5",
      "topic": "可赎回债券再投资风险",
      "stem": "利率显著下降时，可赎回债券发行人按约提前赎回。债券投资者主要新增哪类压力？",
      "options": [
        "票面利率自动永久上调",
        "不再承担任何机会成本",
        "收回资金后可能只能以更低利率再投资",
        "确定获得无限资本利得"
      ],
      "answer": 2,
      "explanation": "赎回将原高票息现金流提前终止，低利率环境中再投资收益可能降低。",
      "type": "single",
      "source": "securitiesOutline",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场基础知识 · 可赎回债券再投资风险；本站情景与题设",
      "rationales": [
        "提前赎回不是永久调高票息。",
        "再投资回报变化本身就影响机会成本。",
        "赎回将原高票息现金流提前终止，低利率环境中再投资收益可能降低。",
        "赎回条款可能限制价格上涨空间。"
      ],
      "conceptIds": [
        "可赎回债券再投资风险"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities1-casebook-012",
      "chapter": 5,
      "lessonId": "securities1-5",
      "topic": "信用评级的局限",
      "stem": "两只债券评级相同，但担保结构、期限和成交活跃度不同。正确认识是？",
      "options": [
        "评级只要给出就不会调整",
        "相同评级不代表风险和合理价格完全相同",
        "评级相同就必须同价",
        "评级机构承诺按面值兑付"
      ],
      "answer": 1,
      "explanation": "评级侧重信用判断，还需考虑期限、条款、流动性及评级变化。",
      "type": "single",
      "source": "securitiesOutline",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场基础知识 · 信用评级的局限；本站情景与题设",
      "rationales": [
        "评级可随信息和信用状况变化。",
        "评级侧重信用判断，还需考虑期限、条款、流动性及评级变化。",
        "现金流期限、利率和交易流动性会影响定价。",
        "评级意见不是偿付保证。"
      ],
      "conceptIds": [
        "信用评级的局限"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities1-casebook-013",
      "chapter": 6,
      "lessonId": "securities1-6",
      "topic": "ETF交易价格与净值",
      "stem": "某ETF价格较基金份额净值高5%。只看价格涨幅评价基金投资管理收益，主要遗漏了？",
      "options": [
        "二级市场溢价变化的影响",
        "该ETF的总份额必然翻倍",
        "基金净值不再有意义",
        "投资者无需承担交易成本"
      ],
      "answer": 0,
      "explanation": "价格收益还可能包含折溢价变化，应与净值收益区分。",
      "type": "single",
      "source": "securitiesOutline",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场基础知识 · ETF交易价格与净值；本站情景与题设",
      "rationales": [
        "价格收益还可能包含折溢价变化，应与净值收益区分。",
        "溢价比例不能推出份额数量变化。",
        "净值仍反映单位份额资产价值。",
        "折溢价和交易成本都可能影响投资结果。"
      ],
      "conceptIds": [
        "ETF交易价格与净值"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities1-casebook-014",
      "chapter": 6,
      "lessonId": "securities1-6",
      "topic": "资产证券化现金流",
      "stem": "资产支持证券的还款主要依赖一组应收款，原始权益人知名度很高。分析重点应是？",
      "options": [
        "只看原始权益人的广告知名度",
        "认定证券化会消除基础资产违约",
        "只比较证券票面编号",
        "基础资产质量、现金流和交易结构"
      ],
      "answer": 3,
      "explanation": "风险来自现金流、增信、隔离与分层等安排，知名度不能替代尽调。",
      "type": "single",
      "source": "securitiesOutline",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场基础知识 · 资产证券化现金流；本站情景与题设",
      "rationales": [
        "品牌并非债务支付机制。",
        "证券化可重新分配风险，但不能凭空消除违约。",
        "编号本身不决定偿付能力。",
        "风险来自现金流、增信、隔离与分层等安排，知名度不能替代尽调。"
      ],
      "conceptIds": [
        "资产证券化现金流"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities1-casebook-015",
      "chapter": 7,
      "lessonId": "securities1-7",
      "topic": "期货与远期现金流",
      "stem": "企业用期货套保，在最终经济风险降低的同时，仍可能发生哪种资金压力？",
      "options": [
        "期货浮亏必然导致现货同步现金到账",
        "远期和期货每日现金流安排必相同",
        "期货每日结算的追加保证金需求",
        "只要用于套保就绝不需要现金"
      ],
      "answer": 2,
      "explanation": "现货经济收益可能尚未实现，期货逐日盯市却可能要求即时现金。",
      "type": "single",
      "source": "securitiesOutline",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场基础知识 · 期货与远期现金流；本站情景与题设",
      "rationales": [
        "现货市值变化不等于同期已经到账。",
        "场外远期与期货的现金流及担保安排需分别看合同。",
        "现货经济收益可能尚未实现，期货逐日盯市却可能要求即时现金。",
        "套保目的不能取消结算义务。"
      ],
      "conceptIds": [
        "期货与远期现金流"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities1-casebook-016",
      "chapter": 7,
      "lessonId": "securities1-7",
      "topic": "互换名义本金",
      "stem": "某单币种利率互换名义本金1亿元，双方只交换约定利息差额。名义本金表示？",
      "options": [
        "双方各自最大损失必为1亿元",
        "利息计算基数，不等于必然交换1亿元本金",
        "一定在每个付息日互付1亿元",
        "合约当前公允价值必为1亿元"
      ],
      "answer": 1,
      "explanation": "题设约定用名义本金计算利息，不能据此推出本金交换或价值上限。",
      "type": "single",
      "source": "securitiesOutline",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场基础知识 · 互换名义本金；本站情景与题设",
      "rationales": [
        "风险敞口不能简单等同名义本金。",
        "题设约定用名义本金计算利息，不能据此推出本金交换或价值上限。",
        "与题设只交换利息差额相矛盾。",
        "合约价值取决于未来净现金流及折现。"
      ],
      "conceptIds": [
        "互换名义本金"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities1-casebook-017",
      "chapter": 8,
      "lessonId": "securities1-8",
      "topic": "相关系数与分散化",
      "stem": "两资产预期收益相同、波动率相同，相关系数由0.9降至0.2。等权组合的其他条件不变时？",
      "options": [
        "组合方差下降",
        "每个资产自身波动率必须下降",
        "组合预期收益必上升",
        "组合风险必降到零"
      ],
      "answer": 0,
      "explanation": "组合协方差项减小，因此等权组合方差下降。",
      "type": "single",
      "source": "securitiesOutline",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场基础知识 · 相关系数与分散化；本站情景与题设",
      "rationales": [
        "组合协方差项减小，因此等权组合方差下降。",
        "相关系数描述共同变动，并不要求单资产波动率改变。",
        "预期收益是权重加权，不因相关系数直接改变。",
        "相关系数0.2不能推出组合风险为零。"
      ],
      "conceptIds": [
        "相关系数与分散化"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities1-casebook-018",
      "chapter": 8,
      "lessonId": "securities1-8",
      "topic": "VaR的含义",
      "stem": "模型给出“1日99% VaR为100万元”。在模型与估计成立的前提下，哪项解读正确？",
      "options": [
        "每日最多亏100万元",
        "一年只会亏100万元",
        "99%的交易都能盈利",
        "超过100万元损失仍可能发生，VaR不是最坏损失上限"
      ],
      "answer": 3,
      "explanation": "VaR是给定置信度与期限的损失分位数，尾部超越依然可能发生。",
      "type": "single",
      "source": "securitiesOutline",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "advanced",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场基础知识 · VaR的含义；本站情景与题设",
      "rationales": [
        "分位数不等于绝对上限。",
        "一天风险度量不等于全年累计亏损。",
        "99%置信度不是盈利概率。",
        "VaR是给定置信度与期限的损失分位数，尾部超越依然可能发生。"
      ],
      "conceptIds": [
        "VaR的含义"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities1-casebook-019",
      "chapter": 8,
      "lessonId": "securities1-8",
      "topic": "预期损失与尾部",
      "stem": "相比仅给出损失分位点的VaR，预期损失ES主要补充什么信息？",
      "options": [
        "所有盈利交易的平均收益",
        "资产当前市盈率",
        "越过相应分位点后的平均尾部损失",
        "保证永远不发生尾部事件"
      ],
      "answer": 2,
      "explanation": "ES关注尾部损失的严重程度，仍依赖模型、数据和假设。",
      "type": "single",
      "source": "securitiesOutline",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "advanced",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场基础知识 · 预期损失与尾部；本站情景与题设",
      "rationales": [
        "盈利交易平均收益不是尾部损失。",
        "市盈率是估值指标而非尾部风险指标。",
        "ES关注尾部损失的严重程度，仍依赖模型、数据和假设。",
        "风险度量不会阻止极端事件。"
      ],
      "conceptIds": [
        "预期损失与尾部"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities1-casebook-020",
      "chapter": 8,
      "lessonId": "securities1-8",
      "topic": "回撤后的回本收益",
      "stem": "组合先从100跌到80，无外部现金流。要回到100，需上涨多少？",
      "options": [
        "10%",
        "25%",
        "20%",
        "80%"
      ],
      "answer": 1,
      "explanation": "需要增加20，以80为基数，20/80＝25%。",
      "type": "single",
      "source": "securitiesOutline",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "金融市场基础知识 · 回撤后的回本收益；本站情景与题设",
      "rationales": [
        "上涨10%只能到88。",
        "需要增加20，以80为基数，20/80＝25%。",
        "下跌和回升使用的分母不同。",
        "80是当前价值，不是所需收益率。"
      ],
      "conceptIds": [
        "回撤后的回本收益"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "recovery",
        "inputs": [
          100,
          80
        ],
        "expected": 25
      }
    }
  ],
  "securities2": [
    {
      "id": "securities2-casebook-001",
      "chapter": 1,
      "lessonId": "securities2-1",
      "topic": "注册不是价值保证",
      "stem": "已获注册的证券发行后经营不佳，投资者认为“注册机关保证收益”。正确理解是？",
      "options": [
        "注册不代表对投资价值或收益作保证",
        "发行注册等同国家承担还本付息",
        "注册后不再需要披露风险",
        "经营亏损只能由注册机关弥补"
      ],
      "answer": 0,
      "explanation": "证券法第二十四条明确，注册不表示对投资价值或收益作实质判断或保证。",
      "type": "single",
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第二十四条",
      "rationales": [
        "证券法第二十四条明确，注册不表示对投资价值或收益作实质判断或保证。",
        "发行人和投资风险不能因注册转由国家承担。",
        "注册不取消持续信息披露义务。",
        "注册不是对公司经营结果的赔偿承诺。"
      ],
      "conceptIds": [
        "注册不是价值保证"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities2-casebook-002",
      "chapter": 1,
      "lessonId": "securities2-1",
      "topic": "信息披露可理解性",
      "stem": "发行文件没有明显假数字，却把关键限制写得极其晦涩。对披露质量，最准确的要求是？",
      "options": [
        "只要数字真实就绝对合格",
        "越难理解越体现专业",
        "可以把关键限制只放在私聊中",
        "还须简明清晰、通俗易懂，不得误导或重大遗漏"
      ],
      "answer": 3,
      "explanation": "证券法第七十八条不仅要求真实准确完整，也要求表达可理解。",
      "type": "single",
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第七十八条",
      "rationales": [
        "真实只是披露质量的一个维度。",
        "晦涩可能阻碍投资者理解重要信息。",
        "应依法公开披露的信息不能仅私下提供。",
        "证券法第七十八条不仅要求真实准确完整，也要求表达可理解。"
      ],
      "conceptIds": [
        "信息披露可理解性"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities2-casebook-003",
      "chapter": 2,
      "lessonId": "securities2-2",
      "topic": "债券持有人会议",
      "stem": "公开发行公司债券后，需要协调持有人的共同利益。哪项制度与此直接相关？",
      "options": [
        "普通债券持有人直接经营公司",
        "债券发行后不再存在权利保护安排",
        "债券持有人会议和债券受托管理人",
        "所有债权人自动变成公司股东"
      ],
      "answer": 2,
      "explanation": "证券法第九十二条规定公开发行公司债券的持有人会议及受托管理安排。",
      "type": "single",
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第九十二条",
      "rationales": [
        "监督保护机制不等于直接经营企业。",
        "募集和存续期间都要考虑持有人权益。",
        "证券法第九十二条规定公开发行公司债券的持有人会议及受托管理安排。",
        "持有债券形成债权，不当然取得股东身份。"
      ],
      "conceptIds": [
        "债券持有人会议"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities2-casebook-004",
      "chapter": 2,
      "lessonId": "securities2-2",
      "topic": "有偿征集表决权",
      "stem": "某征集人公开承诺向每名委托表决权的股东付费。该做法的主要法律问题是？",
      "options": [
        "只看最终投票是否通过",
        "禁止有偿或变相有偿公开征集股东权利",
        "只要钱少就不受限制",
        "表决权征集一律无需披露"
      ],
      "answer": 1,
      "explanation": "证券法第九十条禁止有偿或变相有偿公开征集股东权利。",
      "type": "single",
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第九十条",
      "rationales": [
        "程序合法性不由投票结果替代。",
        "证券法第九十条禁止有偿或变相有偿公开征集股东权利。",
        "金额小不能当然排除禁止规定。",
        "依法征集需披露征集文件等。"
      ],
      "conceptIds": [
        "有偿征集表决权"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities2-casebook-005",
      "chapter": 3,
      "lessonId": "securities2-3",
      "topic": "业务隔离",
      "stem": "证券公司为提高效率，拟混合操作经纪、自营和资产管理业务。最重要的合规要求是？",
      "options": [
        "业务分开办理并采取有效隔离措施",
        "只要利润增长即可混合操作",
        "客户同意后可取消所有隔离",
        "各部门共用名称就等于有效隔离"
      ],
      "answer": 0,
      "explanation": "证券法第一百二十八条要求分开办理、防范公司与客户及不同客户间利益冲突。",
      "type": "single",
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第一百二十八条",
      "rationales": [
        "证券法第一百二十八条要求分开办理、防范公司与客户及不同客户间利益冲突。",
        "盈利不能代替内部控制。",
        "客户同意不能免除法定的机构管理义务。",
        "隔离需落实到权限、信息、流程等，不仅是名称。"
      ],
      "conceptIds": [
        "业务隔离"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities2-casebook-006",
      "chapter": 3,
      "lessonId": "securities2-3",
      "topic": "客户资产独立",
      "stem": "证券公司破产，其客户的交易结算资金和证券原则上如何处理？",
      "options": [
        "自动用于支付证券公司办公费用",
        "全部转为证券公司股东权益",
        "只要保管在券商就归券商所有",
        "不属于证券公司的破产财产"
      ],
      "answer": 3,
      "explanation": "证券法第一百三十一条将客户资金和证券与证券公司自有财产隔离。",
      "type": "single",
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第一百三十一条",
      "rationales": [
        "证券公司债务不能任意以客户资产清偿。",
        "客户资产不因破产转成公司股东财产。",
        "托管或经纪关系不等于资产所有权转移。",
        "证券法第一百三十一条将客户资金和证券与证券公司自有财产隔离。"
      ],
      "conceptIds": [
        "客户资产独立"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities2-casebook-007",
      "chapter": 3,
      "lessonId": "securities2-3",
      "topic": "委托未成交仍需留痕",
      "stem": "客户的买入委托未成交，工作人员拟直接删除记录。正确做法是？",
      "options": [
        "客户口头说不追究即可全部删掉",
        "只保留盈利交易即可",
        "未成交委托也应按规定保存",
        "只有成交才需要保存"
      ],
      "answer": 2,
      "explanation": "证券法第一百三十二条要求证券买卖委托不论是否成交均按规定保存。",
      "type": "single",
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第一百三十二条",
      "rationales": [
        "法定留存义务不能简单用口头免责排除。",
        "留存不是按盈亏挑选。",
        "证券法第一百三十二条要求证券买卖委托不论是否成交均按规定保存。",
        "未成交记录仍反映委托和执行过程。"
      ],
      "conceptIds": [
        "委托未成交仍需留痕"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities2-casebook-008",
      "chapter": 4,
      "lessonId": "securities2-4",
      "topic": "全权经纪委托",
      "stem": "客户说“我不懂，你替我决定股票种类、数量和价格”，证券公司办理经纪业务时应？",
      "options": [
        "只在盈利时可以接受",
        "不能接受这种全权决定交易的委托",
        "拿到密码就可以全权决定",
        "只要客户签字就绝对合法"
      ],
      "answer": 1,
      "explanation": "证券法第一百三十四条禁止在经纪业务中接受全权委托决定证券买卖。",
      "type": "single",
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第一百三十四条",
      "rationales": [
        "是否盈利不决定委托是否合法。",
        "证券法第一百三十四条禁止在经纪业务中接受全权委托决定证券买卖。",
        "获取密码不产生法定业务豁免。",
        "书面同意不改变该业务禁止性规定。"
      ],
      "conceptIds": [
        "全权经纪委托"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities2-casebook-009",
      "chapter": 4,
      "lessonId": "securities2-4",
      "topic": "适当性资料缺失",
      "stem": "投资者拒绝提供证券公司明示要求的必要信息，仍要求立即销售。机构应如何处理？",
      "options": [
        "告知后果，并按规定拒绝销售或服务",
        "替其填写一份高风险测评",
        "默认财富无限且专业",
        "仅删除风险提示后继续销售"
      ],
      "answer": 0,
      "explanation": "证券法第八十八条明确拒绝提供或未按要求提供信息时的告知及拒绝服务安排。",
      "type": "single",
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第八十八条",
      "rationales": [
        "证券法第八十八条明确拒绝提供或未按要求提供信息时的告知及拒绝服务安排。",
        "代填掩盖真实状况，不符合了解客户要求。",
        "不能用假设替代真实信息。",
        "删掉风险提示会进一步削弱保护。"
      ],
      "conceptIds": [
        "适当性资料缺失"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities2-casebook-010",
      "chapter": 4,
      "lessonId": "securities2-4",
      "topic": "普通投资者举证保护",
      "stem": "普通投资者与证券公司发生纠纷，关于证券公司的举证要求，哪项正确？",
      "options": [
        "只要称客户自负盈亏就无需举证",
        "所有相关证明都只能由客户提供",
        "只提交产品宣传海报就必然免责",
        "应证明行为合规且不存在误导、欺诈等情形"
      ],
      "answer": 3,
      "explanation": "证券法第八十九条规定证券公司相应举证义务，不能证明时承担相应赔偿责任。",
      "type": "single",
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第八十九条",
      "rationales": [
        "风险自担不能取代机构行为合规的证明。",
        "法律对普通投资者设置了特定保护。",
        "宣传海报不能当然证明完整销售服务过程。",
        "证券法第八十九条规定证券公司相应举证义务，不能证明时承担相应赔偿责任。"
      ],
      "conceptIds": [
        "普通投资者举证保护"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities2-casebook-011",
      "chapter": 4,
      "lessonId": "securities2-4",
      "topic": "调解请求",
      "stem": "普通投资者提出与证券公司证券业务纠纷的调解请求。证券公司能否仅因嫌麻烦拒绝？",
      "options": [
        "只有亏损超过本金才能申请",
        "必须先签放弃索赔书才可申请",
        "不能，据证券法相关保护规定不得拒绝该调解请求",
        "可以，调解对机构永远无约束"
      ],
      "answer": 2,
      "explanation": "证券法第九十四条对普通投资者提出的此类调解请求规定证券公司不得拒绝。",
      "type": "single",
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第九十四条",
      "rationales": [
        "法条并未以亏损超过本金作为这一请求的条件。",
        "申请调解不当然要求先放弃索赔。",
        "证券法第九十四条对普通投资者提出的此类调解请求规定证券公司不得拒绝。",
        "不能忽略普通投资者业务纠纷的特别规定。"
      ],
      "conceptIds": [
        "调解请求"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities2-casebook-012",
      "chapter": 5,
      "lessonId": "securities2-5",
      "topic": "禁止收益承诺",
      "stem": "证券公司称“股票亏了全部由我们补偿”，用以吸引经纪客户。正确认识是？",
      "options": [
        "只承诺补亏、不承诺收益就没问题",
        "不得对证券买卖收益或损失赔偿作此承诺",
        "只要写进广告就具有合规性",
        "客户是专业投资者时可任意保证"
      ],
      "answer": 1,
      "explanation": "证券法第一百三十五条同时禁止收益承诺与证券买卖损失赔偿承诺。",
      "type": "single",
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第一百三十五条",
      "rationales": [
        "补亏也是法律列举禁止的承诺。",
        "证券法第一百三十五条同时禁止收益承诺与证券买卖损失赔偿承诺。",
        "广告形式不能使禁止行为合法。",
        "客户分类不构成任意承诺的依据。"
      ],
      "conceptIds": [
        "禁止收益承诺"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities2-casebook-013",
      "chapter": 5,
      "lessonId": "securities2-5",
      "topic": "承销核查",
      "stem": "证券公司承销时发现发行文件有重大遗漏，应如何对待？",
      "options": [
        "依法核查并纠正，不能仅以发行人盖章替代核查",
        "发行人签字后承销商即可免除核查",
        "只要发行成功便无须核查",
        "发行人付了费用就必须原样照发"
      ],
      "answer": 0,
      "explanation": "证券法第二十九条要求核查公开发行募集文件，发现虚假等不得开展销售，已销售须停止并纠正。",
      "type": "single",
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第二十九条",
      "rationales": [
        "证券法第二十九条要求核查公开发行募集文件，发现虚假等不得开展销售，已销售须停止并纠正。",
        "盖章不是中介法定责任的替代。",
        "发行结果不能追溯免除过程责任。",
        "商业收费不能突破法定义务。"
      ],
      "conceptIds": [
        "承销核查"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities2-casebook-014",
      "chapter": 6,
      "lessonId": "securities2-6",
      "topic": "自营账户出借",
      "stem": "证券公司打算把自营账户借给合作方交易以提高使用率。哪项判断正确？",
      "options": [
        "只要双方关系良好即可",
        "只要限制单日交易额即可合法",
        "合作方承诺兜底即可合法",
        "不得将自营账户借给他人使用"
      ],
      "answer": 3,
      "explanation": "证券法第一百二十九条明确禁止证券公司出借自营账户。",
      "type": "single",
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第一百二十九条",
      "rationales": [
        "关系好不能替代法定业务边界。",
        "额度限制不能排除禁止行为。",
        "兜底承诺不使账户出借合法。",
        "证券法第一百二十九条明确禁止证券公司出借自营账户。"
      ],
      "conceptIds": [
        "自营账户出借"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities2-casebook-015",
      "chapter": 6,
      "lessonId": "securities2-6",
      "topic": "交易确认真实性",
      "stem": "内部系统记录的客户证券余额与实际持仓不符。机构应？",
      "options": [
        "等客户发现后再决定是否处理",
        "把差额直接归为客户投资损失",
        "核查差异并纠正，确保对账信息真实一致",
        "只修改截图让客户看不出差异"
      ],
      "answer": 2,
      "explanation": "证券法第一百三十三条要求对账单真实、账面证券余额与实际持有一致。",
      "type": "single",
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第一百三十三条",
      "rationales": [
        "机构应履行自己的记录和核对义务。",
        "系统差异不能未经核查就当作市场损失。",
        "证券法第一百三十三条要求对账单真实、账面证券余额与实际持有一致。",
        "修改外观不能解决真实账务问题。"
      ],
      "conceptIds": [
        "交易确认真实性"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities2-casebook-016",
      "chapter": 7,
      "lessonId": "securities2-7",
      "topic": "内幕信息转告",
      "stem": "知情人不亲自交易，只在信息公开前建议朋友买入相关证券。该行为应如何评价？",
      "options": [
        "只有收到咨询费才被禁止",
        "仍属于法律禁止的行为范围",
        "本人没交易就完全不受限制",
        "只要朋友盈利就合法"
      ],
      "answer": 1,
      "explanation": "证券法第五十三条不仅禁止自买卖，也禁止泄露或建议他人买卖相关证券。",
      "type": "single",
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第五十三条",
      "rationales": [
        "是否收费不改变信息公开前的禁止要求。",
        "证券法第五十三条不仅禁止自买卖，也禁止泄露或建议他人买卖相关证券。",
        "不得仅以本人未交易排除适用。",
        "盈亏不是此项禁止的豁免条件。"
      ],
      "conceptIds": [
        "内幕信息转告"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities2-casebook-017",
      "chapter": 7,
      "lessonId": "securities2-7",
      "topic": "诱使过度交易",
      "stem": "经纪人员只为多收佣金，反复诱导客户做没有必要的短线买卖。主要违反哪项要求？",
      "options": [
        "不得为牟取佣金诱使客户不必要地买卖证券",
        "只要每笔手续费公示就完全合法",
        "盈利交易永远不可能侵害客户",
        "只需让客户签自愿交易即可排除一切责任"
      ],
      "answer": 0,
      "explanation": "证券法第五十七条将此种损害客户利益的行为列为禁止事项。",
      "type": "single",
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第五十七条",
      "rationales": [
        "证券法第五十七条将此种损害客户利益的行为列为禁止事项。",
        "费用公示与交易必要性、真实意愿是不同层面。",
        "短期盈亏不能替代行为合法性判断。",
        "形式签字不能当然掩盖诱导事实。"
      ],
      "conceptIds": [
        "诱使过度交易"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities2-casebook-018",
      "chapter": 7,
      "lessonId": "securities2-7",
      "topic": "虚假申撤单",
      "stem": "交易者不以成交为目的，大量申报后迅速撤销，意图影响市场价格。风险性质是什么？",
      "options": [
        "只要未成交就绝不可能违法",
        "所有撤单行为都天然违法",
        "只属于普通成交价差风险",
        "涉嫌操纵证券市场"
      ],
      "answer": 3,
      "explanation": "证券法第五十五条将不以成交为目的、频繁或大量申撤作为操纵手段之一，需结合事实认定。",
      "type": "single",
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第五十五条",
      "rationales": [
        "操纵的认定不以每笔申报必须成交为前提。",
        "正常撤单不能与有操纵目的的行为混同。",
        "题设涉及交易行为合法性而不仅是市场波动。",
        "证券法第五十五条将不以成交为目的、频繁或大量申撤作为操纵手段之一，需结合事实认定。"
      ],
      "conceptIds": [
        "虚假申撤单"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities2-casebook-019",
      "chapter": 8,
      "lessonId": "securities2-8",
      "topic": "客户信息查询",
      "stem": "客户申请查询自己的委托和交易记录，机构以“内部资料”为由一概拒绝。应如何看待？",
      "options": [
        "只有机构盈利后才提供查询",
        "只给最终余额即可代替一切查询",
        "应建立查询制度，保障客户查询与其服务相关的重要信息",
        "账户信息不属于客户可以了解的范围"
      ],
      "answer": 2,
      "explanation": "证券法第一百三十七条要求客户可查询账户、委托、交易等重要信息。",
      "type": "single",
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第一百三十七条",
      "rationales": [
        "机构盈利与查询权无关。",
        "最终余额不能替代法定的信息查询范围。",
        "证券法第一百三十七条要求客户可查询账户、委托、交易等重要信息。",
        "客户对自己账户相关信息具有法定查询保障。"
      ],
      "conceptIds": [
        "客户信息查询"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "securities2-casebook-020",
      "chapter": 8,
      "lessonId": "securities2-8",
      "topic": "合规证据完整性",
      "stem": "复核发现一份客户投诉材料可能对机构不利。应采取什么措施？",
      "options": [
        "只保留有利部分并声称完整",
        "如实保留相关记录并开展调查处理",
        "销毁不利记录以减少争议",
        "倒签委托书补齐形式"
      ],
      "answer": 1,
      "explanation": "证券法第一百三十七条禁止隐匿、伪造、篡改或毁损相关信息，应保全事实证据。",
      "type": "single",
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第一百三十七条",
      "rationales": [
        "选择性留存会破坏证据完整性。",
        "证券法第一百三十七条禁止隐匿、伪造、篡改或毁损相关信息，应保全事实证据。",
        "销毁不利记录可能进一步违法。",
        "倒签不能真实还原原始委托。"
      ],
      "conceptIds": [
        "合规证据完整性"
      ],
      "editorialBatch": "2026-10-13"
    }
  ],
  "futures1": [
    {
      "id": "futures1-casebook-001",
      "chapter": 1,
      "lessonId": "futures1-1",
      "topic": "价格发现的边界",
      "stem": "市场形成了远月期货价格。以下解读哪项准确？",
      "options": [
        "它反映当前信息与交易定价，不是未来现货价格的保证",
        "未来现货必与今天远月报价完全相等",
        "交易所承诺按该价收购所有现货",
        "期货价格不包含预期"
      ],
      "answer": 0,
      "explanation": "未来价格可能随新信息变化，价格发现不是预测保证。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "期货基础知识 · 价格发现的边界；假设明确的教学情景",
      "rationales": [
        "未来价格可能随新信息变化，价格发现不是预测保证。",
        "当前远月报价不保证未来实现的现货价格。",
        "合约交易价格不是无限收购承诺。",
        "预期是影响期货定价的因素之一。"
      ],
      "conceptIds": [
        "价格发现的边界"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures1-casebook-002",
      "chapter": 1,
      "lessonId": "futures1-1",
      "topic": "套保评价口径",
      "stem": "企业套保期货账户亏损，但现货销售收入上升、综合利润更稳定。如何评价？",
      "options": [
        "只要期货亏损就说明套保失败",
        "应抛开现货只比期货收益率",
        "期货端必须每期盈利才叫套保",
        "应结合现货和期货整体目标，不单看期货盈亏"
      ],
      "answer": 3,
      "explanation": "套保目的是管理综合风险，需对照风险敞口、预算和总体现金流。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "期货基础知识 · 套保评价口径；假设明确的教学情景",
      "rationales": [
        "一端损益可以被另一端抵消。",
        "忽略被套保风险会错判策略效果。",
        "对冲工具并不要求单边永远盈利。",
        "套保目的是管理综合风险，需对照风险敞口、预算和总体现金流。"
      ],
      "conceptIds": [
        "套保评价口径"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures1-casebook-003",
      "chapter": 2,
      "lessonId": "futures1-2",
      "topic": "最小变动价值",
      "stem": "假设合约单位5吨/手、最小变动价位2元/吨。1手波动一跳的金额？",
      "options": [
        "5元",
        "0.4元",
        "10元",
        "2元"
      ],
      "answer": 2,
      "explanation": "一跳金额＝2元/吨×5吨/手＝10元/手。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "期货基础知识 · 最小变动价值；假设明确的教学情景",
      "rationales": [
        "只看了合约单位，漏乘价位。",
        "不应以价位除合约单位。",
        "一跳金额＝2元/吨×5吨/手＝10元/手。",
        "只看了价格跳动，漏乘单位。"
      ],
      "conceptIds": [
        "最小变动价值"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "product",
        "inputs": [
          5,
          2
        ],
        "expected": 10
      }
    },
    {
      "id": "futures1-casebook-004",
      "chapter": 2,
      "lessonId": "futures1-2",
      "topic": "到期交割资格",
      "stem": "自然人持有商品期货接近交割月。为避免误用其他品种规则，首先应核对？",
      "options": [
        "只看合约简称无需看月份",
        "该交易所、该品种的持仓期限与交割资格规则",
        "所有商品期货自然人均可任意实物交割",
        "股票交收规则可直接套用"
      ],
      "answer": 1,
      "explanation": "不同合约和参与者的交割及限仓规则需逐项核对，不应泛化。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "期货基础知识 · 到期交割资格；假设明确的教学情景",
      "rationales": [
        "交割月份影响持仓期限与准备事项。",
        "不同合约和参与者的交割及限仓规则需逐项核对，不应泛化。",
        "不能把所有品种和参与者归为同一规则。",
        "股票与商品期货的交收制度不同。"
      ],
      "conceptIds": [
        "到期交割资格"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures1-casebook-005",
      "chapter": 3,
      "lessonId": "futures1-3",
      "topic": "结算价不同于收盘价",
      "stem": "持仓过夜的期货合约收盘价和当日结算价不同。按当日无负债结算制度，日终结算通常依据？",
      "options": [
        "当日结算价",
        "任意挑选对客户有利的价格",
        "只看最后一笔委托价",
        "下一日开盘价"
      ],
      "answer": 0,
      "explanation": "期货和衍生品法第三十九条明确按结算价进行当日结算。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "foundation",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "期货基础知识 · 结算价不同于收盘价；假设明确的教学情景",
      "rationales": [
        "期货和衍生品法第三十九条明确按结算价进行当日结算。",
        "结算有规则，不能任意选择。",
        "委托价不是当日法定结算基准。",
        "下一日开盘价尚未形成且不属于当日结算价。"
      ],
      "conceptIds": [
        "结算价不同于收盘价"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures1-casebook-006",
      "chapter": 3,
      "lessonId": "futures1-3",
      "topic": "保证金比例提升",
      "stem": "持仓名义金额保持50万元，保证金比例由10%提高到14%。仅此变化增加占用资金多少？",
      "options": [
        "7万元",
        "5万元",
        "20万元",
        "2万元"
      ],
      "answer": 3,
      "explanation": "新增占用＝50×(14%−10%)＝2万元。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "期货基础知识 · 保证金比例提升；假设明确的教学情景",
      "rationales": [
        "7万元是调整后的总占用，不是新增量。",
        "5万元是调整前占用。",
        "把4个百分点误当40个百分点。",
        "新增占用＝50×(14%−10%)＝2万元。"
      ],
      "conceptIds": [
        "保证金比例提升"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "marginChange",
        "inputs": [
          50,
          0.1,
          0.14
        ],
        "expected": 2
      }
    },
    {
      "id": "futures1-casebook-007",
      "chapter": 3,
      "lessonId": "futures1-3",
      "topic": "资金使用率",
      "stem": "权益10万元，持仓占用保证金8万元，无其他占用。可用资金为？",
      "options": [
        "10万元",
        "18万元",
        "2万元",
        "8万元"
      ],
      "answer": 2,
      "explanation": "可用资金按题设＝权益10−保证金8＝2万元。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "期货基础知识 · 资金使用率；假设明确的教学情景",
      "rationales": [
        "账户权益还须扣除已占用保证金，不能全部用于开仓。",
        "不能将已占用资金再加到可用资金上。",
        "可用资金按题设＝权益10−保证金8＝2万元。",
        "8万元是已占用而非可用。"
      ],
      "conceptIds": [
        "资金使用率"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "sum",
        "inputs": [
          10,
          -8
        ],
        "expected": 2
      }
    },
    {
      "id": "futures1-casebook-008",
      "chapter": 4,
      "lessonId": "futures1-4",
      "topic": "买入套保基差",
      "stem": "定义基差b=现货−期货。买入套保开仓期货100，平仓时现货108、期货105；数量匹配无费用。有效采购价？",
      "options": [
        "113",
        "103",
        "108",
        "105"
      ],
      "answer": 1,
      "explanation": "期货盈利5，采购支出108减5＝103，也等于开仓期货100＋期末基差3。",
      "type": "single",
      "source": "futuresExam",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "期货基础知识 · 买入套保基差；假设明确的教学情景",
      "rationales": [
        "期货盈利应冲减而非增加采购成本。",
        "期货盈利5，采购支出108减5＝103，也等于开仓期货100＋期末基差3。",
        "忽略了期货对冲盈利。",
        "期货平仓价不是综合现货采购价。"
      ],
      "conceptIds": [
        "买入套保基差"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "buyHedge",
        "inputs": [
          100,
          108,
          105
        ],
        "expected": 103
      }
    },
    {
      "id": "futures1-casebook-009",
      "chapter": 4,
      "lessonId": "futures1-4",
      "topic": "卖出套保基差",
      "stem": "定义基差b=现货−期货，卖出套保数量匹配，其余相同。期末基差比预期更强，对有效销售价格一般有何影响？",
      "options": [
        "提高",
        "降低",
        "永远没有影响",
        "使现货销量自动翻倍"
      ],
      "answer": 0,
      "explanation": "有效售价＝开仓期货价＋期末基差；基差增大提高售价。",
      "type": "single",
      "source": "futuresExam",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "期货基础知识 · 卖出套保基差；假设明确的教学情景",
      "rationales": [
        "有效售价＝开仓期货价＋期末基差；基差增大提高售价。",
        "这是买入套保成本方向的混淆。",
        "套保仍保留基差风险。",
        "基差变化不决定现货数量。"
      ],
      "conceptIds": [
        "卖出套保基差"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures1-casebook-010",
      "chapter": 4,
      "lessonId": "futures1-4",
      "topic": "交叉套保",
      "stem": "企业原材料没有对应期货，使用相关品种套保。相较完全匹配的设想，尤其应关注？",
      "options": [
        "只要历史相关就永久完全对冲",
        "只需要比较合约名称长度",
        "现货与期货数量不必换算单位",
        "两者价格关系变化及对冲比例偏差"
      ],
      "answer": 3,
      "explanation": "相关关系和相对波动可能变化，应估计比例并检验残余风险。",
      "type": "single",
      "source": "futuresExam",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "advanced",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "期货基础知识 · 交叉套保；假设明确的教学情景",
      "rationales": [
        "历史相关不能保证未来完全一致。",
        "名称无关定量风险敞口。",
        "不同单位和合约乘数必须统一。",
        "相关关系和相对波动可能变化，应估计比例并检验残余风险。"
      ],
      "conceptIds": [
        "交叉套保"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures1-casebook-011",
      "chapter": 4,
      "lessonId": "futures1-4",
      "topic": "最小方差套保比例",
      "stem": "给定相关系数0.8，现货价格变化标准差15、期货价格变化标准差12。最小方差套保比例h*为？",
      "options": [
        "0.8",
        "1.25",
        "1.0",
        "0.64"
      ],
      "answer": 2,
      "explanation": "h*=ρσS/σF＝0.8×15/12＝1.0，手数还需换算合约单位。",
      "type": "single",
      "source": "futuresExam",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "advanced",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "期货基础知识 · 最小方差套保比例；假设明确的教学情景",
      "rationales": [
        "最小方差套保比率还需要乘现货与期货的波动率之比。",
        "仅计算标准差比，遗漏相关系数。",
        "h*=ρσS/σF＝0.8×15/12＝1.0，手数还需换算合约单位。",
        "颠倒了两者标准差之比。"
      ],
      "conceptIds": [
        "最小方差套保比例"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "hedgeRatio",
        "inputs": [
          0.8,
          15,
          12
        ],
        "expected": 1
      }
    },
    {
      "id": "futures1-casebook-012",
      "chapter": 5,
      "lessonId": "futures1-5",
      "topic": "跨期价差符号",
      "stem": "定义价差为近月减远月，预计从20收窄到5，且采取一比一价差头寸。方向应是？",
      "options": [
        "同时卖两个合约",
        "卖近月、买远月",
        "买近月、卖远月",
        "同时买两个合约"
      ],
      "answer": 1,
      "explanation": "做空该价差由卖近买远构成，价差下降带来正损益。",
      "type": "single",
      "source": "futuresExam",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "期货基础知识 · 跨期价差符号；假设明确的教学情景",
      "rationales": [
        "双卖同样没有构成指定价差结构。",
        "做空该价差由卖近买远构成，价差下降带来正损益。",
        "买近卖远是做多所定义价差。",
        "双买是双重方向多头，不是价差空头。"
      ],
      "conceptIds": [
        "跨期价差符号"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures1-casebook-013",
      "chapter": 5,
      "lessonId": "futures1-5",
      "topic": "套利的执行风险",
      "stem": "模型显示跨市场价差超过理论区间，交易员准备分两步建仓。仍需注意什么？",
      "options": [
        "一腿成交另一腿失败、费用和资金限制",
        "模型有正价差就保证实际盈利",
        "第一腿成交后第二腿价格不会变",
        "理论无套利关系可免除保证金"
      ],
      "answer": 0,
      "explanation": "理论关系依赖假设，执行、流动性与融资条件会改变可实现收益。",
      "type": "single",
      "source": "futuresExam",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "期货基础知识 · 套利的执行风险；假设明确的教学情景",
      "rationales": [
        "理论关系依赖假设，执行、流动性与融资条件会改变可实现收益。",
        "账面机会不等于可同时成交的净收益。",
        "异步成交暴露于行情变化。",
        "套利头寸仍需满足账户及保证金约束。"
      ],
      "conceptIds": [
        "套利的执行风险"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures1-casebook-014",
      "chapter": 6,
      "lessonId": "futures1-6",
      "topic": "认沽价差损益",
      "stem": "同到期认沽，买K=100支付8、卖K=90收3，各1份。到期标的85，无费用，组合净利润？",
      "options": [
        "10",
        "15",
        "−5",
        "5"
      ],
      "answer": 3,
      "explanation": "到期两腿净价值(100−85)−(90−85)=10，减净成本5，利润5。",
      "type": "single",
      "source": "futuresExam",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "期货基础知识 · 认沽价差损益；假设明确的教学情景",
      "rationales": [
        "10为到期组合价值，尚未扣成本。",
        "遗漏卖出低行权价认沽的负现金流。",
        "−5是净初始支出而非最终利润。",
        "到期两腿净价值(100−85)−(90−85)=10，减净成本5，利润5。"
      ],
      "conceptIds": [
        "认沽价差损益"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "putSpread",
        "inputs": [
          100,
          90,
          8,
          3,
          85
        ],
        "expected": 5
      }
    },
    {
      "id": "futures1-casebook-015",
      "chapter": 6,
      "lessonId": "futures1-6",
      "topic": "期权卖方尾部",
      "stem": "卖出期权策略连续多月赚取小额权利金，是否可仅凭胜率断言风险小？",
      "options": [
        "收到权利金能覆盖任意损失",
        "没有历史亏损就不用压力测试",
        "不能，还要评估少数亏损的幅度、杠杆和尾部情景",
        "胜率超过一半就不可能亏损"
      ],
      "answer": 2,
      "explanation": "高胜率可能伴随低频大额损失，应观察损益分布和极端风险。",
      "type": "single",
      "source": "futuresExam",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "期货基础知识 · 期权卖方尾部；假设明确的教学情景",
      "rationales": [
        "权利金有限，合约义务可能造成更大损失。",
        "历史样本未出现不代表未来不可能。",
        "高胜率可能伴随低频大额损失，应观察损益分布和极端风险。",
        "胜率不包含单次盈亏大小。"
      ],
      "conceptIds": [
        "期权卖方尾部"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures1-casebook-016",
      "chapter": 7,
      "lessonId": "futures1-7",
      "topic": "股指期货Beta对冲",
      "stem": "股票组合市值1,200万元、Beta=1.2，期货每手名义金额120万元。只求一阶市场风险中和，应卖出多少手的理论值？",
      "options": [
        "1.2手",
        "12手",
        "10手",
        "14.4手"
      ],
      "answer": 1,
      "explanation": "手数＝1,200×1.2/120＝12，实际执行还需考虑跟踪、取整及基差。",
      "type": "single",
      "source": "futuresExam",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "期货基础知识 · 股指期货Beta对冲；假设明确的教学情景",
      "rationales": [
        "Beta不是合约手数。",
        "手数＝1,200×1.2/120＝12，实际执行还需考虑跟踪、取整及基差。",
        "按合约名义金额折算后，还需要乘组合的Beta。",
        "没有按每手名义金额正确换算。"
      ],
      "conceptIds": [
        "股指期货Beta对冲"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "betaHedge",
        "inputs": [
          1200,
          1.2,
          120
        ],
        "expected": 12
      }
    },
    {
      "id": "futures1-casebook-017",
      "chapter": 7,
      "lessonId": "futures1-7",
      "topic": "持有成本与收益",
      "stem": "其他条件相同，股指期货定价模型中的预计现金股息增加，对理论期货价格的方向性影响是？",
      "options": [
        "下降",
        "上升",
        "完全无影响",
        "必然降至零"
      ],
      "answer": 0,
      "explanation": "持有现货取得的股息抵减净持有成本，通常降低理论期货价。",
      "type": "single",
      "source": "futuresExam",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "期货基础知识 · 持有成本与收益；假设明确的教学情景",
      "rationales": [
        "持有现货取得的股息抵减净持有成本，通常降低理论期货价。",
        "将持有收益误作为额外成本。",
        "现金流收益是持有成本模型的重要输入。",
        "方向变化不意味着价格归零。"
      ],
      "conceptIds": [
        "持有成本与收益"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures1-casebook-018",
      "chapter": 8,
      "lessonId": "futures1-8",
      "topic": "供需数据与预期差",
      "stem": "库存数据低于上月，但市场此前预期降幅更大，公布后价格下跌。合理解释是？",
      "options": [
        "库存下降必须导致每次上涨",
        "公开数据不可能影响价格",
        "只要库存下降就不存在其他因素",
        "价格可能反映数据相对预期的变化，而非只看环比方向"
      ],
      "answer": 3,
      "explanation": "价格综合供需、预期与风险溢价，实际数据偏离预期可改变定价。",
      "type": "single",
      "source": "futuresExam",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "期货基础知识 · 供需数据与预期差；假设明确的教学情景",
      "rationales": [
        "单一指标不产生机械必然关系。",
        "公开信息可能更新参与者预期。",
        "宏观、供给、资金等也会作用。",
        "价格综合供需、预期与风险溢价，实际数据偏离预期可改变定价。"
      ],
      "conceptIds": [
        "供需数据与预期差"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures1-casebook-019",
      "chapter": 9,
      "lessonId": "futures1-9",
      "topic": "净额与敞口",
      "stem": "同一有效净额结算协议下，交易A对我有利价值80、B对我不利价值50。暂不计抵押和其他调整，简单净替代成本为？",
      "options": [
        "80",
        "−50",
        "30",
        "130"
      ],
      "answer": 2,
      "explanation": "净值80−50＝30；能否风险计量净额仍需满足法律与协议条件。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "期货基础知识 · 净额与敞口；假设明确的教学情景",
      "rationales": [
        "只考虑一笔正价值而忽略协议内负价值。",
        "净头寸须合并两项相反敞口，不能只考虑B而忽略A。",
        "净值80−50＝30；能否风险计量净额仍需满足法律与协议条件。",
        "130是绝对值总和，不是净值。"
      ],
      "conceptIds": [
        "净额与敞口"
      ],
      "editorialBatch": "2026-10-13",
      "auditCalculation": {
        "operation": "sum",
        "inputs": [
          80,
          -50
        ],
        "expected": 30
      }
    },
    {
      "id": "futures1-casebook-020",
      "chapter": 9,
      "lessonId": "futures1-9",
      "topic": "中央对手方的边界",
      "stem": "场外交易转为中央对手方集中结算后，最准确的风险判断是？",
      "options": [
        "合约价格从此不再波动",
        "对手方风险管理方式改变，但市场和流动性风险不会自动消失",
        "所有经济风险都转为零",
        "不再需要保证金和抵押品"
      ],
      "answer": 1,
      "explanation": "集中结算改变风险承接与管理安排，仍须处理价格波动、资金和集中度等风险。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "期货基础知识 · 中央对手方的边界；假设明确的教学情景",
      "rationales": [
        "结算方式不固定市场价格。",
        "集中结算改变风险承接与管理安排，仍须处理价格波动、资金和集中度等风险。",
        "结算制度不是消除所有经济风险的工具。",
        "集中结算通常仍有履约保障机制。"
      ],
      "conceptIds": [
        "中央对手方的边界"
      ],
      "editorialBatch": "2026-10-13"
    }
  ],
  "futures2": [
    {
      "id": "futures2-casebook-001",
      "chapter": 1,
      "lessonId": "futures2-1",
      "topic": "期货与衍生品的法定区分",
      "stem": "在期货和衍生品法的定义中，标准化期权合约交易属于哪类？",
      "options": [
        "期货交易",
        "仅因叫期权就必属法定衍生品交易而非期货交易",
        "存款业务",
        "证券现货买卖"
      ],
      "answer": 0,
      "explanation": "该法第三条把期货合约和标准化期权合约作为期货交易的标的；定义不同于泛称的金融衍生工具。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "foundation",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第三条",
      "rationales": [
        "该法第三条把期货合约和标准化期权合约作为期货交易的标的；定义不同于泛称的金融衍生工具。",
        "需要依具体法律定义，不能只看名称。",
        "期权权利义务不是存款合同。",
        "标准化期权不等同标的现货交易。"
      ],
      "conceptIds": [
        "期货与衍生品的法定区分"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures2-casebook-002",
      "chapter": 1,
      "lessonId": "futures2-1",
      "topic": "已公布不等于已施行",
      "stem": "题设日期为2026年10月13日。证监会已公布的《衍生品交易监督管理办法（试行）》将于2026年11月16日起施行，应标记为？",
      "options": [
        "已施行五个月",
        "已经失效",
        "仍然只是未定稿征求意见稿",
        "已公布、尚未施行"
      ],
      "answer": 3,
      "explanation": "公布与施行是不同时间节点；题设日期早于2026年11月16日。",
      "type": "single",
      "source": "derivatives2026",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "2026年5月15日发布通知；明确施行日2026-11-16",
      "rationales": [
        "不能把公布日当作施行日。",
        "没有题设支持已经失效。",
        "已正式公布的办法不同于此前征求意见稿。",
        "公布与施行是不同时间节点；题设日期早于2026年11月16日。"
      ],
      "conceptIds": [
        "已公布不等于已施行"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures2-casebook-003",
      "chapter": 2,
      "lessonId": "futures2-2",
      "topic": "注册资本口径更新",
      "stem": "核对历史题时看到“期货公司最低注册资本3000万元”。按期货和衍生品法第六十条规定的法定基础下限，应选？",
      "options": [
        "100万元且无需实缴",
        "只看旧样卷答案，不必读现行法",
        "1亿元且为实缴货币资本，并注意监管可提高最低限额",
        "一律3000万元且可全部认缴"
      ],
      "answer": 2,
      "explanation": "第六十条列明不低于1亿元、实缴货币资本，同时授权基于审慎监管提高最低限额。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第六十条；区别历史题口径",
      "rationales": [
        "与法定基础下限不符。",
        "历史题需要标记规则变更，不能机械背旧答案。",
        "第六十条列明不低于1亿元、实缴货币资本，同时授权基于审慎监管提高最低限额。",
        "旧口径不能直接替代后施行法律。"
      ],
      "conceptIds": [
        "注册资本口径更新"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures2-casebook-004",
      "chapter": 2,
      "lessonId": "futures2-2",
      "topic": "交易咨询许可",
      "stem": "机构只有一般工商登记，未获相关核准，却经营期货交易咨询业务。应如何判断？",
      "options": [
        "客户自称专业就能替代机构许可",
        "工商登记不能替代所需的期货业务核准",
        "只要在名称里写咨询就不受监管",
        "只收会员费就不构成经营"
      ],
      "answer": 1,
      "explanation": "第六十三条禁止未经核准经营或变相经营期货交易咨询等业务。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第六十三条",
      "rationales": [
        "客户身份不会为机构创设业务许可。",
        "第六十三条禁止未经核准经营或变相经营期货交易咨询等业务。",
        "业务实质而非名称决定监管适用。",
        "收费名目不能当然改变经营实质。"
      ],
      "conceptIds": [
        "交易咨询许可"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures2-casebook-005",
      "chapter": 2,
      "lessonId": "futures2-2",
      "topic": "程序化交易要求",
      "stem": "企业通过程序自动下达期货交易指令，认为“不是人工操作就无需报备”。正确认识是？",
      "options": [
        "应遵守监管规定并向期货交易场所报告，不得扰乱正常秩序",
        "程序下单一律不受规则约束",
        "只有盈利的程序需要报告",
        "报告后就可以影响系统安全"
      ],
      "answer": 0,
      "explanation": "第二十一条对程序化交易明确报告、系统安全与交易秩序要求。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第二十一条",
      "rationales": [
        "第二十一条对程序化交易明确报告、系统安全与交易秩序要求。",
        "技术手段不能使交易脱离监管。",
        "报告义务不以盈利为条件。",
        "报告不是扰乱秩序的豁免。"
      ],
      "conceptIds": [
        "程序化交易要求"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures2-casebook-006",
      "chapter": 3,
      "lessonId": "futures2-3",
      "topic": "账户实名",
      "stem": "交易者准备借朋友的期货账户交易。最恰当的处理是？",
      "options": [
        "双方私下同意就可不受限制",
        "只要亏损自己承担就合法",
        "只换登录密码就变成本人账户",
        "以本人真实身份按规定开户，不违规借用他人账户"
      ],
      "answer": 3,
      "explanation": "第十八条实行实名制，并禁止违规出借或借用期货账户。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第十八条",
      "rationales": [
        "私下同意不能当然排除实名管理。",
        "承担盈亏不等于账户使用合规。",
        "密码变化不改变开户主体。",
        "第十八条实行实名制，并禁止违规出借或借用期货账户。"
      ],
      "conceptIds": [
        "账户实名"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures2-casebook-007",
      "chapter": 3,
      "lessonId": "futures2-3",
      "topic": "明确具体的委托",
      "stem": "客户向经纪机构说“差不多就买点”，却没有明确合约、数量等。应如何处理？",
      "options": [
        "以销售人员猜测代替客户委托",
        "先做大额交易再补写指令",
        "澄清并取得明确、具体、全面的交易指令",
        "由经纪人员任意决定所有要素"
      ],
      "answer": 2,
      "explanation": "第二十条要求交易指令明确、具体、全面，应消除关键要素歧义。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第二十条",
      "rationales": [
        "猜测不是可核验的有效委托。",
        "事后补写不能还原真实授权。",
        "第二十条要求交易指令明确、具体、全面，应消除关键要素歧义。",
        "经纪执行不能任意替代客户作出决定。"
      ],
      "conceptIds": [
        "明确具体的委托"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures2-casebook-008",
      "chapter": 3,
      "lessonId": "futures2-3",
      "topic": "客户查询权",
      "stem": "客户要查询保证金余额与交易记录，机构一概拒绝。哪项正确？",
      "options": [
        "保证金余额属于不得向本人提供的商业秘密",
        "交易者有权查询这些与接受服务有关的重要信息",
        "只有公司股东可以查询",
        "客户必须先同意销户"
      ],
      "answer": 1,
      "explanation": "第五十四条列明委托记录、交易记录和保证金余额等查询权。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第五十四条",
      "rationales": [
        "为客户信息保密不是对本人拒绝查询的理由。",
        "第五十四条列明委托记录、交易记录和保证金余额等查询权。",
        "客户不是必须成为公司股东才有查询权。",
        "查询不以销户为前提。"
      ],
      "conceptIds": [
        "客户查询权"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures2-casebook-009",
      "chapter": 4,
      "lessonId": "futures2-4",
      "topic": "保证金用途",
      "stem": "期货公司拟短期挪用客户保证金支付自有办公租金，下周补回。该做法？",
      "options": [
        "不符合客户资金分开管理和禁止违规挪用的要求",
        "只要一周内补回就合法",
        "租金是必要支出因此可以",
        "客户没提出异议就可以"
      ],
      "answer": 0,
      "explanation": "第四十条要求保证金等与自有资金分开并禁止违规挪用，短期使用也不因此合法。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第四十条",
      "rationales": [
        "第四十条要求保证金等与自有资金分开并禁止违规挪用，短期使用也不因此合法。",
        "补回时间不能自动消除违规事实。",
        "自有运营支出不能任意使用客户保证金。",
        "沉默不构成法定资金用途的豁免。"
      ],
      "conceptIds": [
        "保证金用途"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures2-casebook-010",
      "chapter": 4,
      "lessonId": "futures2-4",
      "topic": "追加与强平程序",
      "stem": "客户保证金低于约定标准，机构已经依约通知，客户在约定时间内既未追加也未自行平仓。下一步按约可采取？",
      "options": [
        "当然免除客户全部交易亏损",
        "永久不再要求保证金",
        "将盈利客户资金补给该客户",
        "强行平仓"
      ],
      "answer": 3,
      "explanation": "第四十一条规定通知后未按约追加或自行平仓时，按约强行平仓。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第四十一条",
      "rationales": [
        "程序处理不能消除已产生的市场损益。",
        "不满足保证金要求不能变成永久豁免。",
        "不能跨客户任意挪用资金。",
        "第四十一条规定通知后未按约追加或自行平仓时，按约强行平仓。"
      ],
      "conceptIds": [
        "追加与强平程序"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures2-casebook-011",
      "chapter": 4,
      "lessonId": "futures2-4",
      "topic": "违约后的追偿",
      "stem": "机构动用自有资金完成违约客户的结算后，能否依法向该客户追偿？",
      "options": [
        "只能向无关客户追偿",
        "必须把客户欠款当作赠与",
        "可以依法追偿",
        "只要先完成结算就永久放弃追偿"
      ],
      "answer": 2,
      "explanation": "第四十二条对结算参与人用风险准备金或自有资金完成交易者结算后的依法追偿作了规定。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第四十二条",
      "rationales": [
        "无关客户不因此承担该违约债务。",
        "履约垫付并非当然赠与。",
        "第四十二条对结算参与人用风险准备金或自有资金完成交易者结算后的依法追偿作了规定。",
        "先履行结算不等于免除违约责任。"
      ],
      "conceptIds": [
        "违约后的追偿"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures2-casebook-012",
      "chapter": 5,
      "lessonId": "futures2-5",
      "topic": "拒绝提供适当性资料",
      "stem": "交易者拒绝提供明示要求的必要信息，却签“风险自担”要求立即交易。机构应？",
      "options": [
        "默认其为专业交易者",
        "告知后果，并按规定拒绝提供服务",
        "只凭免责书即可完全豁免适当性",
        "替客户编造资料后开户"
      ],
      "answer": 1,
      "explanation": "第五十条明确真实信息要求及拒绝提供信息后的告知、拒绝服务安排。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第五十条",
      "rationales": [
        "专业分类需符合规定，不是默认标签。",
        "第五十条明确真实信息要求及拒绝提供信息后的告知、拒绝服务安排。",
        "免责文字不能取代法定义务。",
        "资料编造使了解客户失去真实性。"
      ],
      "conceptIds": [
        "拒绝提供适当性资料"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures2-casebook-013",
      "chapter": 5,
      "lessonId": "futures2-5",
      "topic": "专业分类的边界",
      "stem": "专业交易者认为身份认证等于所有品种自动获准交易。正确理解是？",
      "options": [
        "分类与具体业务准入、授权及风险控制要求须分别核对",
        "专业身份等于所有交易权限",
        "专业身份使所有规则失效",
        "专业交易者不承担任何交易后果"
      ],
      "answer": 0,
      "explanation": "第五十一条规定分类；不能据此推导免除具体业务的其他规则与要求。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第五十、五十一条；分类不替代具体准入",
      "rationales": [
        "第五十一条规定分类；不能据此推导免除具体业务的其他规则与要求。",
        "分类不是全部业务授权凭证。",
        "法律和业务规则并未因分类一概失效。",
        "交易者仍须按合同和规则承担交易结果。"
      ],
      "conceptIds": [
        "专业分类的边界"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures2-casebook-014",
      "chapter": 5,
      "lessonId": "futures2-5",
      "topic": "普通交易者争议举证",
      "stem": "普通交易者与期货经营机构发生纠纷，机构称“仅由客户证明我们违法”。该说法？",
      "options": [
        "完全准确，机构从不负举证义务",
        "只适用于大额客户",
        "机构销售额高就无需举证",
        "不准确，机构应证明自身行为合规且无误导欺诈等"
      ],
      "answer": 3,
      "explanation": "第五十一条明确此类纠纷中的机构举证要求，不能证明时须承担相应赔偿责任。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第五十一条",
      "rationales": [
        "忽略了法律对普通交易者的特别保护。",
        "不能把法定保护简单按成交金额取消。",
        "销售规模不是举证豁免理由。",
        "第五十一条明确此类纠纷中的机构举证要求，不能证明时须承担相应赔偿责任。"
      ],
      "conceptIds": [
        "普通交易者争议举证"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures2-casebook-015",
      "chapter": 6,
      "lessonId": "futures2-6",
      "topic": "主协议整体性",
      "stem": "依法采用主协议开展衍生品交易。主协议、补充协议和具体交易约定之间是什么关系？",
      "options": [
        "只有文件标题为合同的部分有效",
        "可任意挑选有利交易履行而忽略其余",
        "共同组成有法律约束力的完整单一协议",
        "每份确认书必使主协议自动失效"
      ],
      "answer": 2,
      "explanation": "第三十二条规定主协议与相关补充、具体约定共同构成单一协议。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第三十二条",
      "rationales": [
        "效力取决于实际法律关系，不只是标题。",
        "单一协议关系不能等同任意选择履行。",
        "第三十二条规定主协议与相关补充、具体约定共同构成单一协议。",
        "确认书与主协议应结合解释，不是自动替代。"
      ],
      "conceptIds": [
        "主协议整体性"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures2-casebook-016",
      "chapter": 6,
      "lessonId": "futures2-6",
      "topic": "终止净额结算条件",
      "stem": "双方依法以主协议开展衍生品交易，发生约定终止事由。依协议对全部交易盈亏净额结算的认识应是？",
      "options": [
        "净额结算保证任何情况下都无经济损失",
        "需符合法律与约定条件，不能简单理解为任意跨主体抵销",
        "可把所有不相关客户资金放进同一净额",
        "有主协议就不必核对终止条件"
      ],
      "answer": 1,
      "explanation": "第三十五条规定依法采用主协议、发生约定情形时依约终止并净额结算。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "advanced",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第三十五条",
      "rationales": [
        "净额机制不消除市场或信用损失。",
        "第三十五条规定依法采用主协议、发生约定情形时依约终止并净额结算。",
        "净额范围受协议主体和法律约束。",
        "触发条件是条文的重要前提。"
      ],
      "conceptIds": [
        "终止净额结算条件"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures2-casebook-017",
      "chapter": 7,
      "lessonId": "futures2-7",
      "topic": "违规行为报告",
      "stem": "从业机构发现禁止的交易行为，担心影响客户关系而不报告。正确做法是？",
      "options": [
        "依法及时向监管机构报告",
        "只要客户承诺改正就永远不报",
        "删掉监控记录即可结案",
        "只有交易者已被法院判决后才能报告"
      ],
      "answer": 0,
      "explanation": "第二十九条规定相关机构及从业人员发现禁止交易行为应及时报告。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第二十九条",
      "rationales": [
        "第二十九条规定相关机构及从业人员发现禁止交易行为应及时报告。",
        "客户承诺不能当然替代报告义务。",
        "删记录会破坏事实与监督机制。",
        "及时报告不要求先取得刑事判决。"
      ],
      "conceptIds": [
        "违规行为报告"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures2-casebook-018",
      "chapter": 7,
      "lessonId": "futures2-7",
      "topic": "客户信息保密",
      "stem": "员工将客户交易计划卖给外部机构获取报酬。哪项正确？",
      "options": [
        "只要未说客户姓名就必然合法",
        "收款金额较少就不受限制",
        "交易计划不是值得保护的信息",
        "违反依法保密和不得非法买卖提供客户信息的要求"
      ],
      "answer": 3,
      "explanation": "第五十五条要求依法保护交易者信息及知悉的商业秘密，不能非法交易信息。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第五十五条",
      "rationales": [
        "可识别性、信息实质和保密义务不能只按是否出现姓名判断。",
        "金额小不当然使信息交易合法。",
        "客户交易安排可能涉及重要信息及商业秘密。",
        "第五十五条要求依法保护交易者信息及知悉的商业秘密，不能非法交易信息。"
      ],
      "conceptIds": [
        "客户信息保密"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures2-casebook-019",
      "chapter": 8,
      "lessonId": "futures2-8",
      "topic": "调解与普通交易者",
      "stem": "普通交易者就期货业务纠纷向经营机构提出调解请求，机构能否一概拒绝？",
      "options": [
        "只要合同写不调解就可任意拒绝",
        "只有已经清算的客户才可提出",
        "不得拒绝该调解请求",
        "调解一定只能由机构主动申请"
      ],
      "answer": 2,
      "explanation": "第五十六条明确普通交易者提出此类调解请求时经营机构不得拒绝。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第五十六条",
      "rationales": [
        "格式约定不能当然排除强制保护。",
        "不存在题设所称清算前提。",
        "第五十六条明确普通交易者提出此类调解请求时经营机构不得拒绝。",
        "法律保护并不以机构主动申请为前提。"
      ],
      "conceptIds": [
        "调解与普通交易者"
      ],
      "editorialBatch": "2026-10-13"
    },
    {
      "id": "futures2-casebook-020",
      "chapter": 8,
      "lessonId": "futures2-8",
      "topic": "企业内部风控",
      "stem": "企业称期货交易由一名经验丰富员工负责，因此不需内部控制制度。哪项正确？",
      "options": [
        "只有亏损之后才需要建立制度",
        "法人和非法人组织应建立与交易类型、规模、目的相适应的内控及风控制度",
        "员工有经验就自动替代制度",
        "只要用于套保就不需授权与限额"
      ],
      "answer": 1,
      "explanation": "第五十二条明确组织交易者的内控和风控要求，经验不能代替制度。",
      "type": "single",
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创情景精练 · 非真题",
      "difficulty": "applied",
      "reviewedAt": "2026-10-13",
      "reviewNote": "按列示参考与题设独立编写；不是出处原题，也不是官方审定答案。",
      "referenceSection": "第五十二条",
      "rationales": [
        "制度应在风险发生前发挥控制作用。",
        "第五十二条明确组织交易者的内控和风控要求，经验不能代替制度。",
        "个人经验难以替代授权、监督和职责分离。",
        "套保同样需要与目的和规模相适应的制度。"
      ],
      "conceptIds": [
        "企业内部风控"
      ],
      "editorialBatch": "2026-10-13"
    }
  ]
};
