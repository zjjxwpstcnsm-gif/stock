// Independent editorial questions. No question in this batch is an official exam original.
export const PRECISION_BATCH = "2026-10-13-precision";
export const PRECISION_SOURCES = {
  "precisionMath": {
    "title": "原创精练：明示假设、定义与独立复算记录",
    "url": "https://github.com/zjjxwpstcnsm-gif/stock/blob/main/docs/precision-audit.md",
    "kind": "editorial",
    "note": "本项目计算与情景推理说明，非官方题目或官方审定。"
  }
};
export const PRECISION_QUESTIONS = {
  "options": [
    {
      "id": "options-precision-001",
      "chapter": 3,
      "lessonId": "payoffs",
      "topic": "实值不等于盈利",
      "type": "single",
      "stem": "一份认购期权行权价3.00元，买入权利金0.18元，到期标的价3.10元。不计费用，每单位净损益是多少？",
      "options": [
        "-0.08元",
        "0.10元",
        "0.08元",
        "-0.18元"
      ],
      "answer": 0,
      "explanation": "到期内在价值为3.10−3.00=0.10元；扣除已付0.18元，净损益为−0.08元。实值描述行权价值，不等于投资盈利。",
      "rationales": [
        "到期内在价值为3.10−3.00=0.10元；扣除已付0.18元，净损益为−0.08元。实值描述行权价值，不等于投资盈利。",
        "0.10元是到期内在价值，尚未扣除买入时支付的权利金。",
        "扣除权利金后是亏损而不是盈利，符号不能反转。",
        "只有到期没有行权价值时，才损失全部权利金。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "实值不等于盈利"
      ],
      "precisionCalculation": {
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
      "id": "options-precision-002",
      "chapter": 3,
      "lessonId": "delta-gamma",
      "topic": "Delta与Gamma近似",
      "type": "single",
      "stem": "某期权Delta=0.4，Gamma=0.2/元。标的上涨0.10元，其他条件不变。使用二阶近似，期权价格变化约多少？",
      "options": [
        "0.060元",
        "0.041元",
        "0.040元",
        "0.042元"
      ],
      "answer": 1,
      "explanation": "二阶近似ΔV≈Delta×ΔS+0.5×Gamma×(ΔS)²=0.4×0.10+0.5×0.2×0.10²=0.041元；这是局部估算，并非精确定价。",
      "rationales": [
        "Gamma项应使用价格变化的平方，不能按线性项直接相加。",
        "二阶近似ΔV≈Delta×ΔS+0.5×Gamma×(ΔS)²=0.4×0.10+0.5×0.2×0.10²=0.041元；这是局部估算，并非精确定价。",
        "这是只使用Delta的一阶估算，遗漏题目要求的Gamma项。",
        "Gamma二阶项需要乘以二分之一，不能直接加Gamma×价格变化平方。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "Delta与Gamma近似"
      ],
      "precisionCalculation": {
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
      "id": "options-precision-003",
      "chapter": 3,
      "lessonId": "theta-vega-rho",
      "topic": "Vega报价单位",
      "type": "single",
      "stem": "某认购期权Vega为0.015元/波动率百分点。隐含波动率由20%升至23%，其他条件不变，一阶近似价格增加多少？",
      "options": [
        "0.345元",
        "0.005元",
        "0.045元",
        "0.00045元"
      ],
      "answer": 2,
      "explanation": "20%到23%是增加3个百分点，因此ΔV≈0.015×3=0.045元。必须先核对Vega对应的是百分点还是小数单位。",
      "rationales": [
        "23是新的波动率水平，不是本次变化量，不能乘整个水平。",
        "Vega敏感度应乘以波动率变动量，而不是除以变动量。",
        "20%到23%是增加3个百分点，因此ΔV≈0.015×3=0.045元。必须先核对Vega对应的是百分点还是小数单位。",
        "这把3个百分点错误换成0.03后，又使用按百分点报价的Vega，单位不一致。"
      ],
      "source": "pricing",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "OIC Understanding Options Greeks：Vega；题干已明示单位",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "Vega报价单位"
      ],
      "precisionCalculation": {
        "operation": "product",
        "inputs": [
          0.015,
          3
        ],
        "expected": 0.045
      }
    },
    {
      "id": "options-precision-004",
      "chapter": 3,
      "lessonId": "theta-vega-rho",
      "topic": "Theta的日计单位",
      "type": "single",
      "stem": "某期权当前Theta=-0.006元/自然日。固定其他因素，按Theta不变的一阶近似估算经过3日的价格变化。",
      "options": [
        "0.018元",
        "-0.002元",
        "-0.006元",
        "-0.018元"
      ],
      "answer": 3,
      "explanation": "按题设每日变化−0.006元，三日约为−0.018元。真实Theta会随时间和行情变化，不能把此近似理解为固定扣费。",
      "rationales": [
        "负Theta表示题设时间流逝方向的价格下降，不能忽略负号。",
        "按日敏感度应乘以经过天数，而不是除以三。",
        "这只计算了一个自然日，遗漏剩余两个自然日。",
        "按题设每日变化−0.006元，三日约为−0.018元。真实Theta会随时间和行情变化，不能把此近似理解为固定扣费。"
      ],
      "source": "pricing",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "OIC Understanding Options Greeks：Theta；固定敏感度的教学近似",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "Theta的日计单位"
      ],
      "precisionCalculation": {
        "operation": "product",
        "inputs": [
          -0.006,
          3
        ],
        "expected": -0.018
      }
    },
    {
      "id": "options-precision-005",
      "chapter": 2,
      "lessonId": "covered-protective",
      "topic": "备兑上限的合并核算",
      "type": "single",
      "stem": "以每股10元持有股票，同时卖出行权价11元的认购，收权利金0.4元/股；数量完全匹配。到期股价14元，不计费用分红，组合每股利润是多少？",
      "options": [
        "1.4元",
        "4.4元",
        "0.4元",
        "3.4元"
      ],
      "answer": 0,
      "explanation": "股票赚4元，认购空头损失3元，另收权利金0.4元，合计1.4元；备兑限制上涨收益，并未消除股票下跌风险。",
      "rationales": [
        "股票赚4元，认购空头损失3元，另收权利金0.4元，合计1.4元；备兑限制上涨收益，并未消除股票下跌风险。",
        "此数忽略了被卖出的认购在上涨时产生的履约损失。",
        "权利金不是整个组合收益，股票还保留到行权价之间的涨幅。",
        "股票买入成本和认购履约损失必须合并计算，不能只截取部分现金流。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "备兑上限的合并核算"
      ],
      "precisionCalculation": {
        "operation": "covered",
        "inputs": [
          10,
          11,
          0.4,
          14
        ],
        "expected": 1.4
      }
    },
    {
      "id": "options-precision-006",
      "chapter": 2,
      "lessonId": "covered-protective",
      "topic": "保护性认沽的净损失",
      "type": "single",
      "stem": "以每股10元买股票，同时每股付0.3元买入行权价9元的认沽；数量匹配。到期股价6元，不计费用分红，组合每股净损益是多少？",
      "options": [
        "2.7元",
        "-1.3元",
        "-1.0元",
        "-4.3元"
      ],
      "answer": 1,
      "explanation": "股票损益为−4元，认沽行权收入为3元，再扣0.3元权利金，净损益−1.3元。保护下限需计入保险成本。",
      "rationales": [
        "这是仅认沽腿的净收益，不是股票加期权的组合损益。",
        "股票损益为−4元，认沽行权收入为3元，再扣0.3元权利金，净损益−1.3元。保护下限需计入保险成本。",
        "这个数漏掉了购买认沽付出的0.3元权利金。",
        "此数忽略了认沽在标的下跌时的3元内在价值。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "保护性认沽的净损失"
      ],
      "precisionCalculation": {
        "operation": "protective",
        "inputs": [
          10,
          9,
          0.3,
          6
        ],
        "expected": -1.3
      }
    },
    {
      "id": "options-precision-007",
      "chapter": 3,
      "lessonId": "strategies",
      "topic": "认购价差最大收益",
      "type": "single",
      "stem": "同到期日买入行权价3.0元认购付0.25元，卖出行权价3.4元认购收0.08元，数量相同。不计费用，持有至到期最大每单位利润是多少？",
      "options": [
        "0.17元",
        "0.57元",
        "0.23元",
        "0.40元"
      ],
      "answer": 2,
      "explanation": "价差宽度0.4元；初始净支出0.25−0.08=0.17元，最大净利润为0.4−0.17=0.23元。",
      "rationales": [
        "0.17元是建立组合的净支出，也是本题最大损失，而非最大收益。",
        "净支出应从到期现金流扣除，不能作为收入加上。",
        "价差宽度0.4元；初始净支出0.25−0.08=0.17元，最大净利润为0.4−0.17=0.23元。",
        "0.40元是最大到期现金流，尚未扣除初始净权利金支出。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "认购价差最大收益"
      ],
      "precisionCalculation": {
        "operation": "callSpread",
        "inputs": [
          3,
          3.4,
          0.25,
          0.08
        ],
        "expected": 0.23
      }
    },
    {
      "id": "options-precision-008",
      "chapter": 3,
      "lessonId": "strategies",
      "topic": "跨式盈亏平衡",
      "type": "single",
      "stem": "买入相同行权价100元的认购和认沽，权利金分别8元、6元，持有到期且不计费用。两侧盈亏平衡价为？",
      "options": [
        "94元和108元",
        "100元和114元",
        "92元和106元",
        "86元和114元"
      ],
      "answer": 3,
      "explanation": "总成本14元；跨式到期净损益=|标的价−100|−14，因此平衡点为100±14。波动方向不限，但幅度必须覆盖成本。",
      "rationales": [
        "分别使用单条腿权利金会遗漏同时持有另一条腿的成本。",
        "标的到期价等于行权价时两腿均无内在价值，仍亏14元。",
        "这把两条腿权利金分别作为组合成本，未合并净支出。",
        "总成本14元；跨式到期净损益=|标的价−100|−14，因此平衡点为100±14。波动方向不限，但幅度必须覆盖成本。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "跨式盈亏平衡"
      ]
    },
    {
      "id": "options-precision-009",
      "chapter": 4,
      "lessonId": "risk",
      "topic": "保证金与最大损失",
      "type": "single",
      "stem": "某投资者卖出一份无保护的认购，交易系统暂时占用保证金8000元。仅据此，哪项推断成立？",
      "options": [
        "保证金不是最大亏损上限，后续可能追加",
        "最多亏8000元",
        "收过权利金后不再需要保证金",
        "只要不平仓就不会形成任何资金压力"
      ],
      "answer": 0,
      "explanation": "保证金是履约担保，不是对最终损失的封顶。无保护认购空头在标的大幅上涨时面临持续扩大的风险，具体担保规则另行适用。",
      "rationales": [
        "保证金是履约担保，不是对最终损失的封顶。无保护认购空头在标的大幅上涨时面临持续扩大的风险，具体担保规则另行适用。",
        "占用保证金金额不限制合约本身的履约损失，也不免除追加要求。",
        "收取权利金和提供履约担保是不同的现金流与义务。",
        "盯市、追加担保及风险处置可能在到期前发生，不能等同于只在平仓时承担风险。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "认购空头净损益=权利金−max(到期标的价−行权价,0)；保证金为履约担保，非损失封顶",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "保证金与最大损失"
      ]
    },
    {
      "id": "options-precision-010",
      "chapter": 3,
      "lessonId": "value",
      "topic": "内在价值拆分",
      "type": "single",
      "stem": "一份认沽的行权价4元，标的现价3.7元，期权价格0.42元。按价格=内在价值+时间价值拆分，时间价值是多少？",
      "options": [
        "0.72元",
        "0.12元",
        "0.30元",
        "0.42元"
      ],
      "answer": 1,
      "explanation": "认沽内在价值max(4−3.7,0)=0.30元，时间价值为0.42−0.30=0.12元；拆分时须先辨认认购或认沽。",
      "rationales": [
        "时间价值需要扣除内在价值，而不是把二者相加。",
        "认沽内在价值max(4−3.7,0)=0.30元，时间价值为0.42−0.30=0.12元；拆分时须先辨认认购或认沽。",
        "0.30元是本题认沽的内在价值，不是时间价值。",
        "只有内在价值为零时，整个权利金才都归入该拆分下的时间价值。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "内在价值拆分"
      ],
      "precisionCalculation": {
        "operation": "putTime",
        "inputs": [
          4,
          3.7,
          0.42
        ],
        "expected": 0.12
      }
    },
    {
      "id": "options-precision-011",
      "chapter": 3,
      "lessonId": "delta-gamma",
      "topic": "Delta对冲方向",
      "type": "single",
      "stem": "持有认购多头，其合计Delta等价于多持有600股标的。仅用标的股票做局部Delta中性对冲，应如何调整？",
      "options": [
        "买入600份相同认购",
        "保持不动，因为Delta中性等于不交易",
        "卖出或卖空600股标的",
        "再买入600股标的"
      ],
      "answer": 2,
      "explanation": "认购多头合计Delta为+600股，要使初始净Delta为零，需加入−600股Delta。实际能否卖空及借券成本需另行考虑。",
      "rationales": [
        "新增同方向期权会进一步增加正Delta，且份数不等于股票股数。",
        "是否中性取决于合计敏感度，题设已有明确的正Delta暴露。",
        "认购多头合计Delta为+600股，要使初始净Delta为零，需加入−600股Delta。实际能否卖空及借券成本需另行考虑。",
        "继续买入会把正Delta从600扩大为1200，而不是抵消。"
      ],
      "source": "pricing",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "OIC Understanding Options Greeks：Delta；股票Delta每股为1",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "Delta对冲方向"
      ]
    },
    {
      "id": "options-precision-012",
      "chapter": 1,
      "lessonId": "contracts",
      "topic": "合约单位与费用",
      "type": "single",
      "stem": "买入2张期权，权利金报价0.12元/份，每张合约10000份；开仓手续费3元/张。总现金支出是多少？",
      "options": [
        "2400元",
        "1206元",
        "0.24元",
        "2406元"
      ],
      "answer": 3,
      "explanation": "权利金=2×10000×0.12=2400元，手续费=2×3=6元，总支出2406元。本题合约单位已给定，不能默认所有合约单位相同。",
      "rationales": [
        "此数仅包含权利金，未计题目明确给出的手续费。",
        "两张合约都要支付权利金，不能只计一张的报价金额。",
        "报价按每份计，必须乘以每张合约包含的份数。",
        "权利金=2×10000×0.12=2400元，手续费=2×3=6元，总支出2406元。本题合约单位已给定，不能默认所有合约单位相同。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "合约单位与费用"
      ],
      "precisionCalculation": {
        "operation": "premiumCost",
        "inputs": [
          2,
          10000,
          0.12,
          3
        ],
        "expected": 2406
      }
    }
  ],
  "fund1": [
    {
      "id": "fund1-precision-001",
      "chapter": 2,
      "lessonId": "fund-law",
      "topic": "财产独立与清算",
      "type": "single",
      "stem": "基金管理人进入破产清算。对于依法独立的基金财产，何种处理符合《证券投资基金法》？",
      "options": [
        "不因管理人破产而列入其清算财产",
        "与管理人办公楼一并偿债",
        "自动归基金管理人股东所有",
        "必须先用于补足管理人经营亏损"
      ],
      "answer": 0,
      "explanation": "基金财产独立于管理人、托管人的固有财产。管理人破产不改变基金财产的独立性，不能以管理人自有债务侵占基金财产。",
      "rationales": [
        "基金财产独立于管理人、托管人的固有财产。管理人破产不改变基金财产的独立性，不能以管理人自有债务侵占基金财产。",
        "管理人自有财产与基金财产法律归属不同，不能混为清算资产。",
        "股东身份不会把基金持有人的财产利益转变为股东所有权。",
        "基金财产不能用于填补与其无关的管理人自营经营亏损。"
      ],
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券投资基金法》第5条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "财产独立与清算"
      ]
    },
    {
      "id": "fund1-precision-002",
      "chapter": 2,
      "lessonId": "fund-law",
      "topic": "禁止跨财产抵销",
      "type": "single",
      "stem": "某基金对甲公司拥有债权，而管理人以自有名义欠甲公司债务。甲建议两者直接抵销。应如何判断？",
      "options": [
        "只要基金暂时盈利即可抵销",
        "不得把基金债权与管理人固有债务抵销",
        "同一管理人管理即可自由抵销",
        "只要甲公司同意就可抵销"
      ],
      "answer": 1,
      "explanation": "基金财产债权不得与管理人、托管人固有财产债务相互抵销；不同基金财产之间的债权债务也不得混同抵销。",
      "rationales": [
        "基金是否盈利与能否承担管理人自有债务没有这种因果关系。",
        "基金财产债权不得与管理人、托管人固有财产债务相互抵销；不同基金财产之间的债权债务也不得混同抵销。",
        "管理人身份相同不消灭基金财产与固有财产的独立边界。",
        "相对方同意不能排除法律对基金财产独立性的约束。"
      ],
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券投资基金法》第6条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "禁止跨财产抵销"
      ]
    },
    {
      "id": "fund1-precision-003",
      "chapter": 2,
      "lessonId": "fund-law",
      "topic": "执行前发现违法指令",
      "type": "single",
      "stem": "托管人发现管理人的投资指令违反法律和基金合同，且指令尚未执行。正确的处理是？",
      "options": [
        "仅在年度报告中披露即可",
        "自行改成托管人偏好的投资品种",
        "拒绝执行，立即通知管理人并及时报告监管机构",
        "先执行再等持有人投诉"
      ],
      "answer": 2,
      "explanation": "对尚未执行的违法、违规或违约投资指令，托管人应拒绝执行，立即通知管理人，并及时向国务院证券监督管理机构报告。",
      "rationales": [
        "年度披露不能替代拒绝执行、立即通知和及时报告的要求。",
        "托管监督不等于取得基金投资决策权，不能随意改写投资策略。",
        "对尚未执行的违法、违规或违约投资指令，托管人应拒绝执行，立即通知管理人，并及时向国务院证券监督管理机构报告。",
        "托管人发现违法指令后不能以服从委托为由先实施违法行为。"
      ],
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券投资基金法》第37条第1款",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "执行前发现违法指令"
      ]
    },
    {
      "id": "fund1-precision-004",
      "chapter": 2,
      "lessonId": "fund-law",
      "topic": "已生效指令的监督",
      "type": "single",
      "stem": "一项投资指令已依交易程序生效后，托管人才发现其违反基金合同。按法定监督职责，应如何处理？",
      "options": [
        "托管人可以单方面宣布已生效交易无效",
        "既已生效便不再负有报告义务",
        "等基金年度审计时再决定是否告知",
        "立即通知管理人并及时向监管机构报告"
      ],
      "answer": 3,
      "explanation": "已经依交易程序生效的指令不能简单套用“执行前拒绝”的流程；第37条要求托管人立即通知管理人，并及时向监管机构报告。",
      "rationales": [
        "托管监督职责本身不赋予单方面否定已依程序生效交易的权力。",
        "生效不等于合法，事后发现问题仍应履行通知与报告职责。",
        "事后核查不能替代法律规定的立即通知与及时报告。",
        "已经依交易程序生效的指令不能简单套用“执行前拒绝”的流程；第37条要求托管人立即通知管理人，并及时向监管机构报告。"
      ],
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券投资基金法》第37条第2款",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "已生效指令的监督"
      ]
    },
    {
      "id": "fund1-precision-005",
      "chapter": 3,
      "lessonId": "fund-ethics",
      "topic": "公平对待不同基金",
      "type": "single",
      "stem": "同一管理人为了让新基金的排名好看，故意让老基金承接不利成交。最直接的问题是什么？",
      "options": [
        "不公平对待所管理的不同基金财产",
        "只有老基金发生亏损时才构成问题",
        "属于管理人可以自由安排的内部调剂",
        "只要新基金投资者受益就应认可"
      ],
      "answer": 0,
      "explanation": "管理人不得不公平对待其管理的不同基金财产，不能用一个基金的利益为另一个基金的业绩或营销目标让步。",
      "rationales": [
        "管理人不得不公平对待其管理的不同基金财产，不能用一个基金的利益为另一个基金的业绩或营销目标让步。",
        "公平义务不能以是否已形成账面亏损作为唯一判断条件。",
        "不同基金独立核算，不能用所谓内部调剂掩盖利益输送。",
        "部分客户受益不能正当化对另一基金持有人的不公平待遇。"
      ],
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券投资基金法》第20条第2项",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "公平对待不同基金"
      ]
    },
    {
      "id": "fund1-precision-006",
      "chapter": 3,
      "lessonId": "fund-ethics",
      "topic": "最低收益承诺",
      "type": "single",
      "stem": "公募基金经理向客户出具书面承诺：若本基金年收益不足5%，由管理人补足。对此应如何判断？",
      "options": [
        "只对专业投资者承诺便当然合规",
        "不得违规承诺收益或承担损失",
        "写成书面文件就属于有效的合规披露",
        "只要基金经理有信心就可以承诺"
      ],
      "answer": 1,
      "explanation": "基金管理人不得违规向基金份额持有人承诺收益或承担损失；书面化和管理人愿意承担，并不会使该承诺合规。",
      "rationales": [
        "投资者身份不能当然豁免管理人的此项禁止性要求。",
        "基金管理人不得违规向基金份额持有人承诺收益或承担损失；书面化和管理人愿意承担，并不会使该承诺合规。",
        "书面形式不能消除承诺收益行为本身的合规问题。",
        "投资信心不能取代产品风险属性和法定行为边界。"
      ],
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券投资基金法》第20条第4项",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "最低收益承诺"
      ]
    },
    {
      "id": "fund1-precision-007",
      "chapter": 11,
      "lessonId": "fund1-syllabus-6",
      "topic": "股东干预投资",
      "type": "single",
      "stem": "基金管理人的大股东要求基金经理购买关联企业股票，为该企业托底。基金经理应首先坚持什么？",
      "options": [
        "只要股东持股过半就必须执行",
        "先交易，再通过内部会议补办合规手续",
        "拒绝不当干预，坚持持有人利益优先",
        "优先满足大股东的资本运作目标"
      ],
      "answer": 2,
      "explanation": "管理人的股东和实际控制人不得在法定治理职权外干预经营管理、损害持有人利益；管理人还须履行忠实、谨慎、勤勉义务。",
      "rationales": [
        "公司控制权不意味着可以绕过法律和基金合同不当干预投资。",
        "事后补手续不能使不当干预或利益输送自动合法化。",
        "管理人的股东和实际控制人不得在法定治理职权外干预经营管理、损害持有人利益；管理人还须履行忠实、谨慎、勤勉义务。",
        "大股东的自身融资或市值目标不能凌驾于基金持有人利益之上。"
      ],
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券投资基金法》第9、21、23条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "股东干预投资"
      ]
    },
    {
      "id": "fund1-precision-008",
      "chapter": 9,
      "lessonId": "fund1-syllabus-4",
      "topic": "持有人权利与日常投资",
      "type": "single",
      "stem": "某基金份额持有人要求以个人持有份额为依据，直接向基金交易员下达买卖指令。正确说法是？",
      "options": [
        "每位持有人均可直接支配自己的比例资产",
        "持有超过一份即可取代基金经理",
        "不能下单就意味着没有任何治理权利",
        "持有人有法定权利，但不能据此直接指挥日常投资"
      ],
      "answer": 3,
      "explanation": "持有人依法享有收益分配、信息获取、会议表决等权利；持有人大会也不得直接参与或干涉基金投资管理活动，个人更无当然下单权限。",
      "rationales": [
        "开放式基金份额并非持有人可以分别向基金交易员下单的独立账户。",
        "份额所有权不等于基金投资管理业务的执行资格和授权。",
        "持有人仍有法律和基金合同规定的表决、诉讼等权益。",
        "持有人依法享有收益分配、信息获取、会议表决等权利；持有人大会也不得直接参与或干涉基金投资管理活动，个人更无当然下单权限。"
      ],
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券投资基金法》第46、49条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "持有人权利与日常投资"
      ]
    },
    {
      "id": "fund1-precision-009",
      "chapter": 9,
      "lessonId": "fund1-syllabus-4",
      "topic": "托管不是投资接管",
      "type": "single",
      "stem": "管理人拟以“有托管人保管”为由不再履行净值计算和信息披露职责。正确判断是？",
      "options": [
        "托管并不免除管理人自身的法定职责",
        "托管人存在就可取消管理人的会计核算",
        "所有职责均由持有人大会亲自执行",
        "只有出现净值差错后管理人才有职责"
      ],
      "answer": 0,
      "explanation": "管理人承担基金会计、净值计算和规定的信息披露职责；托管人的复核和监督职责不是对管理人职责的替代。",
      "rationales": [
        "管理人承担基金会计、净值计算和规定的信息披露职责；托管人的复核和监督职责不是对管理人职责的替代。",
        "保管、复核与基金会计核算职责有分工，不能相互替代。",
        "持有人大会是治理安排，不承担日常会计、估值和运营执行。",
        "法定职责持续存在，不能等到发生差错才开始承担。"
      ],
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券投资基金法》第19、36条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "托管不是投资接管"
      ]
    },
    {
      "id": "fund1-precision-010",
      "chapter": 2,
      "lessonId": "fund-law",
      "topic": "管理人与托管人的独立",
      "type": "single",
      "stem": "同一机构希望同时担任同一只公募基金的管理人与托管人，认为可以减少对接成本。依法应如何处理？",
      "options": [
        "由同一法人的不同部门承担便当然满足要求",
        "不得由同一机构同时担任管理人与托管人",
        "经过市场部门批准即可兼任",
        "只要基金规模较小就可兼任"
      ],
      "answer": 1,
      "explanation": "法律要求基金托管人与基金管理人不得为同一机构，且不得相互出资或者持有股份；运营便利不能替代独立制衡。",
      "rationales": [
        "法人内部分工不使同一机构变成法律上不同的管理人与托管人。",
        "法律要求基金托管人与基金管理人不得为同一机构，且不得相互出资或者持有股份；运营便利不能替代独立制衡。",
        "市场部门审批不是法律规定的豁免，不改变独立性要求。",
        "题述禁止并不以基金规模小作为当然例外。"
      ],
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券投资基金法》第35条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "管理人与托管人的独立"
      ]
    },
    {
      "id": "fund1-precision-011",
      "chapter": 10,
      "lessonId": "fund1-syllabus-5",
      "topic": "募集期间资金保管",
      "type": "single",
      "stem": "公募基金仍在募集期间，销售负责人建议先动用认购资金购买债券“提高资金效率”。应如何判断？",
      "options": [
        "认购人数量达到一半即可动用",
        "销售机构可先借用并于验资前归还",
        "募集期间资金存入专门账户，不得动用",
        "只要买的是债券就可提前投资"
      ],
      "answer": 2,
      "explanation": "公募基金募集期间的资金应当存入专门账户，在募集行为结束前不得动用，不能因为拟投资的是债券就提前使用。",
      "rationales": [
        "达到部分人数不等于募集行为已经结束，也不是动用资金的法定依据。",
        "募集资金不能用于销售机构周转，事后归还不消除占用问题。",
        "公募基金募集期间的资金应当存入专门账户，在募集行为结束前不得动用，不能因为拟投资的是债券就提前使用。",
        "资金用途看似稳健也不能排除募集期间不得动用的要求。"
      ],
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券投资基金法》第59条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "募集期间资金保管"
      ]
    },
    {
      "id": "fund1-precision-012",
      "chapter": 3,
      "lessonId": "fund-ethics",
      "topic": "财产用于第三人利益",
      "type": "single",
      "stem": "管理人把基金交易中知悉的未公开信息提供给朋友用于抢先交易，基金当期净值并未下降。最恰当的判断是？",
      "options": [
        "基金暂时未亏损便不存在违规风险",
        "朋友不是员工所以管理人不受约束",
        "只要不索取报酬就可以分享",
        "不得利用职务便利及未公开信息为第三人谋利"
      ],
      "answer": 3,
      "explanation": "管理人不得利用基金财产或职务便利为持有人以外的人牟利，也不得泄露职务中获知的未公开信息并利用或示意他人交易；是否当期亏损不是免责标准。",
      "rationales": [
        "禁止利用和泄露未公开信息不以基金已发生账面损失为前提。",
        "提供信息的管理人仍受法定职责和禁止性规定约束。",
        "为第三人谋利或违规泄露并不以收取报酬作为唯一成立条件。",
        "管理人不得利用基金财产或职务便利为持有人以外的人牟利，也不得泄露职务中获知的未公开信息并利用或示意他人交易；是否当期亏损不是免责标准。"
      ],
      "source": "fundLaw",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券投资基金法》第20条第3、6项",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "财产用于第三人利益"
      ]
    }
  ],
  "fund2": [
    {
      "id": "fund2-precision-001",
      "chapter": 3,
      "lessonId": "fund-financial-math",
      "topic": "连乘收益率",
      "type": "single",
      "stem": "一项投资首年亏损20%，次年盈利25%，中间没有资金流入流出。两年累计收益率是多少？",
      "options": [
        "0%",
        "5%",
        "-5%",
        "2.5%"
      ],
      "answer": 0,
      "explanation": "累计收益按连乘计算：(1−20%)×(1+25%)−1=0。百分比对应不同的期初基数，不能直接相加。",
      "rationales": [
        "累计收益按连乘计算：(1−20%)×(1+25%)−1=0。百分比对应不同的期初基数，不能直接相加。",
        "把−20%和25%直接相加忽略了两期收益率基数不同。",
        "累计收益应由净值连乘确定，不能按涨跌数字大小简单相减。",
        "这是两期收益率的算术平均，也不是累计收益率。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "连乘收益率"
      ],
      "precisionCalculation": {
        "operation": "compoundReturn",
        "inputs": [
          -0.2,
          0.25
        ],
        "expected": 0
      }
    },
    {
      "id": "fund2-precision-002",
      "chapter": 3,
      "lessonId": "fund-financial-math",
      "topic": "几何年化收益率",
      "type": "single",
      "stem": "无中途现金流的投资两年由100万元变为121万元，几何年化收益率是多少？",
      "options": [
        "1.1%",
        "10%",
        "10.5%",
        "21%"
      ],
      "answer": 1,
      "explanation": "设年化收益r，则100×(1+r)²=121，所以r=√1.21−1=10%。21%是两年累计收益，并非每年收益。",
      "rationales": [
        "1.1是累计净值比的平方根，其减一后应是0.1即10%。",
        "设年化收益r，则100×(1+r)²=121，所以r=√1.21−1=10%。21%是两年累计收益，并非每年收益。",
        "把累计收益21%除以两年忽略了复利效应。",
        "21%是两年累计收益，未做年化转换。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "几何年化收益率"
      ],
      "precisionCalculation": {
        "operation": "annualized",
        "inputs": [
          100,
          121,
          2
        ],
        "expected": 10
      }
    },
    {
      "id": "fund2-precision-003",
      "chapter": 4,
      "lessonId": "fund-risk-math",
      "topic": "夏普比率单位匹配",
      "type": "single",
      "stem": "同一年度口径下，组合收益率9%，无风险收益率3%，组合收益率标准差12%。夏普比率是多少？",
      "options": [
        "2.00",
        "6.00",
        "0.50",
        "0.75"
      ],
      "answer": 2,
      "explanation": "夏普比率=(9%−3%)/12%=0.50。分子是超额收益，分母是组合总波动，期限与数据频率必须一致。",
      "rationales": [
        "2.00把标准差除以超额收益，颠倒了定义。",
        "6个百分点是超额收益，不是已经除以风险的比率。",
        "夏普比率=(9%−3%)/12%=0.50。分子是超额收益，分母是组合总波动，期限与数据频率必须一致。",
        "0.75直接用9%除以12%，没有扣除无风险收益率。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "夏普比率单位匹配"
      ],
      "precisionCalculation": {
        "operation": "sharpe",
        "inputs": [
          0.09,
          0.03,
          0.12
        ],
        "expected": 0.5
      }
    },
    {
      "id": "fund2-precision-004",
      "chapter": 10,
      "lessonId": "fund2-syllabus-5",
      "topic": "修正久期近似",
      "type": "single",
      "stem": "某债券修正久期为4，收益率上升50个基点。忽略凸性，债券价格百分比变化约为？",
      "options": [
        "2%",
        "-200%",
        "-0.02%",
        "-2%"
      ],
      "answer": 3,
      "explanation": "ΔP/P≈−修正久期×Δy=−4×0.005=−2%。50个基点等于0.5个百分点，而不是50%。",
      "rationales": [
        "收益率上升时按久期近似价格下跌，方向不能反转。",
        "基点必须先转为收益率小数，50bp=0.005。",
        "−0.02作为小数表示−2%，转百分数不能再缩小100倍。",
        "ΔP/P≈−修正久期×Δy=−4×0.005=−2%。50个基点等于0.5个百分点，而不是50%。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "修正久期近似"
      ],
      "precisionCalculation": {
        "operation": "durationPct",
        "inputs": [
          4,
          50
        ],
        "expected": -2
      }
    },
    {
      "id": "fund2-precision-005",
      "chapter": 4,
      "lessonId": "fund-risk-math",
      "topic": "独立风险的分散",
      "type": "single",
      "stem": "两项资产收益率标准差均为20%，相关系数为0，组合各持有50%。组合标准差约为？",
      "options": [
        "14.14%",
        "20.00%",
        "10.00%",
        "0.00%"
      ],
      "answer": 0,
      "explanation": "组合方差=0.5²×0.2²+0.5²×0.2²=0.02，开方约0.1414。相关系数为零并不意味着各自风险消失。",
      "rationales": [
        "组合方差=0.5²×0.2²+0.5²×0.2²=0.02，开方约0.1414。相关系数为零并不意味着各自风险消失。",
        "直接加权平均标准差未利用不完全相关所带来的分散效应。",
        "遗漏其中一项资产对组合方差的贡献会低估风险。",
        "不相关不是收益互相完全抵消，正方差仍然存在。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "独立风险的分散"
      ],
      "precisionCalculation": {
        "operation": "portfolioSD",
        "inputs": [
          0.5,
          0.2,
          0.5,
          0.2,
          0
        ],
        "expected": 14.14213562373095
      }
    },
    {
      "id": "fund2-precision-006",
      "chapter": 20,
      "lessonId": "fund2-syllabus-15",
      "topic": "净资产与份额净值",
      "type": "single",
      "stem": "基金总资产1.03亿元，总负债300万元，存续份额8000万份。未作其他调整时，每份基金净值是多少？",
      "options": [
        "0.80元",
        "1.25元",
        "1.2875元",
        "1.325元"
      ],
      "answer": 1,
      "explanation": "基金净资产=10300−300=10000万元；份额净值=10000万/8000万=1.25元。负债应扣除，不能只用总资产除份额。",
      "rationales": [
        "把份额除以净资产会颠倒净值定义，单位也不正确。",
        "基金净资产=10300−300=10000万元；份额净值=10000万/8000万=1.25元。负债应扣除，不能只用总资产除份额。",
        "这是总资产除以份额的结果，未扣除300万元负债。",
        "负债应该从总资产中扣除，而不是加回总资产。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "净资产与份额净值"
      ],
      "precisionCalculation": {
        "operation": "nav",
        "inputs": [
          10300,
          300,
          8000
        ],
        "expected": 1.25
      }
    },
    {
      "id": "fund2-precision-007",
      "chapter": 7,
      "lessonId": "fund2-syllabus-2",
      "topic": "ETF溢价分母",
      "type": "single",
      "stem": "某ETF交易价格1.02元，参考份额净值1.00元。不考虑时点差异，溢价率是多少？",
      "options": [
        "-2%",
        "102%",
        "2%",
        "1.96%"
      ],
      "answer": 2,
      "explanation": "以份额净值为分母，溢价率=(1.02/1.00−1)×100%=2%。实际比较还要注意参考净值的时点与可交易性。",
      "rationales": [
        "市场价格高于净值是溢价，不是折价。",
        "价格与净值之比为102%，溢价率还需减去100%。",
        "以份额净值为分母，溢价率=(1.02/1.00−1)×100%=2%。实际比较还要注意参考净值的时点与可交易性。",
        "这以市场价格为分母，不是题设ETF溢价率的常用定义。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "ETF溢价分母"
      ],
      "precisionCalculation": {
        "operation": "premium",
        "inputs": [
          1.02,
          1
        ],
        "expected": 2
      }
    },
    {
      "id": "fund2-precision-008",
      "chapter": 17,
      "lessonId": "fund2-syllabus-12",
      "topic": "跟踪偏离与跟踪误差",
      "type": "single",
      "stem": "基金每个观测期都比基准少赚固定的0.1个百分点。仅按主动收益序列的标准差定义跟踪误差，正确的是？",
      "options": [
        "平均偏离和跟踪误差必然都是0.1个百分点",
        "跟踪误差为零说明每期都完全复制基准收益",
        "只要有落后，标准差就不可能为零",
        "平均偏离为负，但标准差型跟踪误差可为零"
      ],
      "answer": 3,
      "explanation": "主动收益恒定为−0.1个百分点，其均值为负，但围绕均值没有波动，所以标准差为零。跟踪误差不等于平均落后幅度。",
      "rationales": [
        "主动收益的均值和标准差是两个不同统计量，不能直接等同。",
        "固定落后同样可以使标准差为零，必须同时关注平均偏离。",
        "标准差衡量离散程度，不直接衡量序列数值是否等于零。",
        "主动收益恒定为−0.1个百分点，其均值为负，但围绕均值没有波动，所以标准差为零。跟踪误差不等于平均落后幅度。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "跟踪偏离与跟踪误差"
      ]
    },
    {
      "id": "fund2-precision-009",
      "chapter": 10,
      "lessonId": "fund2-syllabus-5",
      "topic": "债券净价与全价",
      "type": "single",
      "stem": "债券每百元面值净价99.20元，应计利息1.30元。按全价=净价+应计利息，买入结算全价为？",
      "options": [
        "100.50元",
        "97.90元",
        "99.20元",
        "101.30元"
      ],
      "answer": 0,
      "explanation": "全价是在净价基础上加应计利息，所以99.20+1.30=100.50元。净价报价不代表结算时可以忽略应计利息。",
      "rationales": [
        "全价是在净价基础上加应计利息，所以99.20+1.30=100.50元。净价报价不代表结算时可以忽略应计利息。",
        "应计利息应加到净价中，而不是从净价中减去。",
        "这是报价净价，还没有计入结算需要支付的应计利息。",
        "题设净价不等于面值100元，不能直接用面值加利息替代。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "债券净价与全价"
      ],
      "precisionCalculation": {
        "operation": "sum",
        "inputs": [
          99.2,
          1.3
        ],
        "expected": 100.5
      }
    },
    {
      "id": "fund2-precision-010",
      "chapter": 14,
      "lessonId": "fund2-syllabus-9",
      "topic": "组合Beta加权",
      "type": "single",
      "stem": "组合中股票A权重60%、Beta为1.2；股票B权重40%、Beta为0.7。相对同一市场基准，组合Beta是多少？",
      "options": [
        "0.72",
        "1.00",
        "0.95",
        "1.90"
      ],
      "answer": 1,
      "explanation": "组合Beta可按资产价值权重线性加权：0.6×1.2+0.4×0.7=1.00；此处不同于标准差的加权方法。",
      "rationales": [
        "只计算了股票A的贡献，遗漏股票B的风险暴露。",
        "组合Beta可按资产价值权重线性加权：0.6×1.2+0.4×0.7=1.00；此处不同于标准差的加权方法。",
        "这是把两个Beta简单平均，忽略题设60%与40%的实际权重。",
        "直接相加Beta未考虑资金在资产之间的配置比例。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "组合Beta加权"
      ],
      "precisionCalculation": {
        "operation": "weighted",
        "inputs": [
          0.6,
          1.2,
          0.4,
          0.7
        ],
        "expected": 1
      }
    },
    {
      "id": "fund2-precision-011",
      "chapter": 17,
      "lessonId": "fund2-syllabus-12",
      "topic": "时间加权与新增资金",
      "type": "single",
      "stem": "某账户期初100万元，第一期升至110万元后立即新增90万元，第二期末总值180万元。按外部现金流处分段连乘，累计时间加权收益率是多少？",
      "options": [
        "0%",
        "-10%",
        "-1%",
        "80%"
      ],
      "answer": 2,
      "explanation": "第一期收益10%；新增资金后第二期期初为200万元，第二期收益−10%。时间加权收益=(1.1×0.9−1)×100%=−1%，不把外部投入当作盈利。",
      "rationales": [
        "10%和−10%不可直接相加，分段收益必须按净值比连乘。",
        "这只是第二期收益率，遗漏第一期表现。",
        "第一期收益10%；新增资金后第二期期初为200万元，第二期收益−10%。时间加权收益=(1.1×0.9−1)×100%=−1%，不把外部投入当作盈利。",
        "180相对100的增长包含90万元新增资金，不能全部作为投资收益。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "时间加权与新增资金"
      ],
      "precisionCalculation": {
        "operation": "compoundReturn",
        "inputs": [
          0.1,
          -0.1
        ],
        "expected": -1
      }
    },
    {
      "id": "fund2-precision-012",
      "chapter": 23,
      "lessonId": "fund2-syllabus-18",
      "topic": "外扣法申购份额",
      "type": "single",
      "stem": "按外扣法，申购金额10100元，申购费率1%，当日基金净值1元，不考虑舍入。申购份额是多少？",
      "options": [
        "9999份",
        "10100份",
        "10001份",
        "10000份"
      ],
      "answer": 3,
      "explanation": "净申购金额=10100/(1+1%)=10000元，申购份额=10000/1=10000份。外扣法不能直接用金额乘以1−费率替代。",
      "rationales": [
        "10100×99%=9999是简单扣率法计算，不符合题设外扣法。",
        "此数未扣除题目明确要求计算的申购费用。",
        "不能任意调整费用基数；外扣法须先除以1+申购费率。",
        "净申购金额=10100/(1+1%)=10000元，申购份额=10000/1=10000份。外扣法不能直接用金额乘以1−费率替代。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "外扣法申购份额"
      ],
      "precisionCalculation": {
        "operation": "subscription",
        "inputs": [
          10100,
          0.01,
          1
        ],
        "expected": 10000
      }
    }
  ],
  "fund3": [
    {
      "id": "fund3-precision-001",
      "chapter": 4,
      "lessonId": "fund-valuation",
      "topic": "投前与投后估值",
      "type": "single",
      "stem": "某企业投前股权估值8000万元，投资人新投入2000万元，全部为增资且没有其他稀释安排。新增投资者持股比例是多少？",
      "options": [
        "20%",
        "25%",
        "80%",
        "16.67%"
      ],
      "answer": 0,
      "explanation": "投后估值=8000+2000=10000万元，新增投资者比例=2000/10000=20%。若存在老股转让或期权池安排，需要另行重算。",
      "rationales": [
        "投后估值=8000+2000=10000万元，新增投资者比例=2000/10000=20%。若存在老股转让或期权池安排，需要另行重算。",
        "2000/8000以投前估值为分母，不是新增股东占投后股权的比例。",
        "80%是原股东在本轮增资后的合计持股比例。",
        "本题没有额外一轮融资，不应重复把2000万元加到分母。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "投前与投后估值"
      ],
      "precisionCalculation": {
        "operation": "stakePct",
        "inputs": [
          8000,
          2000
        ],
        "expected": 20
      }
    },
    {
      "id": "fund3-precision-002",
      "chapter": 4,
      "lessonId": "fund-valuation",
      "topic": "老股转让不增加公司现金",
      "type": "single",
      "stem": "投资者向原股东支付3000万元购买其20%股权，全部为老股转让。仅由此交易，公司收到多少增资现金？",
      "options": [
        "15000万元",
        "0万元",
        "3000万元",
        "600万元"
      ],
      "answer": 1,
      "explanation": "价款支付给转让老股的股东，而非注入公司，因此公司由此收到的增资现金为零。股权交易估值与公司融资额必须分开。",
      "rationales": [
        "15000万元可作为本次简单比例隐含估值，但不是公司收到的现金。",
        "价款支付给转让老股的股东，而非注入公司，因此公司由此收到的增资现金为零。股权交易估值与公司融资额必须分开。",
        "老股转让款由原股东收取，不是公司新增实收资金。",
        "成交价乘股权比例并不构成公司的增资现金流。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "老股转让不增加公司现金"
      ],
      "precisionCalculation": {
        "operation": "sum",
        "inputs": [
          0
        ],
        "expected": 0
      }
    },
    {
      "id": "fund3-precision-003",
      "chapter": 5,
      "lessonId": "fund-performance",
      "topic": "DPI已实现分配",
      "type": "single",
      "stem": "基金累计实缴资本8000万元，累计向投资人分配2400万元，期末剩余净值7200万元。DPI是多少？",
      "options": [
        "1.20倍",
        "3.33倍",
        "0.30倍",
        "0.90倍"
      ],
      "answer": 2,
      "explanation": "DPI=累计已分配金额/累计实缴资本=2400/8000=0.30倍。剩余净值不放进DPI分子，分母也不是认缴承诺。",
      "rationales": [
        "(2400+7200)/8000是总价值倍数TVPI，不是DPI。",
        "8000/2400颠倒了DPI的分子和分母。",
        "DPI=累计已分配金额/累计实缴资本=2400/8000=0.30倍。剩余净值不放进DPI分子，分母也不是认缴承诺。",
        "7200/8000是剩余价值倍数RVPI，不是已分配倍数。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "DPI已实现分配"
      ],
      "precisionCalculation": {
        "operation": "ratio",
        "inputs": [
          2400,
          8000
        ],
        "expected": 0.3
      }
    },
    {
      "id": "fund3-precision-004",
      "chapter": 5,
      "lessonId": "fund-performance",
      "topic": "TVPI与未实现价值",
      "type": "single",
      "stem": "基金实缴1亿元，累计分配0.4亿元，期末剩余净值0.9亿元。TVPI是多少？",
      "options": [
        "0.40倍",
        "0.90倍",
        "1.90倍",
        "1.30倍"
      ],
      "answer": 3,
      "explanation": "TVPI=(累计分配+剩余净值)/实缴资本=(0.4+0.9)/1=1.30倍。其中0.9亿元尚未分配，不能把TVPI全部理解为落袋现金。",
      "rationales": [
        "这只计算DPI，遗漏了TVPI包含的期末剩余价值。",
        "这只计算RVPI，遗漏了已向投资人分配的现金。",
        "不能把实缴本金再重复加进已经包含本金属性的剩余净值。",
        "TVPI=(累计分配+剩余净值)/实缴资本=(0.4+0.9)/1=1.30倍。其中0.9亿元尚未分配，不能把TVPI全部理解为落袋现金。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "TVPI与未实现价值"
      ],
      "precisionCalculation": {
        "operation": "tvpi",
        "inputs": [
          0.4,
          0.9,
          1
        ],
        "expected": 1.3
      }
    },
    {
      "id": "fund3-precision-005",
      "chapter": 5,
      "lessonId": "fund-performance",
      "topic": "认缴并非实缴分母",
      "type": "single",
      "stem": "投资人认缴10000万元，累计已实缴4000万元，累计获分配2000万元。按实缴口径DPI应是多少？",
      "options": [
        "0.50倍",
        "0.20倍",
        "2.00倍",
        "0.40倍"
      ],
      "answer": 0,
      "explanation": "DPI使用实际投入资本为分母，2000/4000=0.50倍。未被调用的认缴金额不等于已经流出的投资现金。",
      "rationales": [
        "DPI使用实际投入资本为分母，2000/4000=0.50倍。未被调用的认缴金额不等于已经流出的投资现金。",
        "2000/10000误用了认缴承诺作分母，混淆承诺和现金投入。",
        "4000/2000颠倒了已分配金额与实缴资本。",
        "4000/10000衡量的是认缴被实缴的比例，并非DPI。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "认缴并非实缴分母"
      ],
      "precisionCalculation": {
        "operation": "ratio",
        "inputs": [
          2000,
          4000
        ],
        "expected": 0.5
      }
    },
    {
      "id": "fund3-precision-006",
      "chapter": 5,
      "lessonId": "fund-performance",
      "topic": "IRR与倍数的时间维度",
      "type": "single",
      "stem": "两项投资均只在初始投入100万元、退出收回200万元；甲1年退出，乙4年退出，无其他现金流。正确比较为？",
      "options": [
        "回报倍数不同，因为持有年数不同",
        "两者回报倍数相同，甲的年化IRR更高",
        "两者年化IRR都为100%",
        "乙持有更久，所以年化IRR更高"
      ],
      "answer": 1,
      "explanation": "两者投资回报倍数都是2倍。甲IRR为100%，乙为2的四次方根减1，约18.92%；同样的终值倍数不代表相同的时间效率。",
      "rationales": [
        "倍数本身不包含持有期限，期限影响年化指标。",
        "两者投资回报倍数都是2倍。甲IRR为100%，乙为2的四次方根减1，约18.92%；同样的终值倍数不代表相同的时间效率。",
        "IRR取决于现金流发生时间，四年翻倍不能按一年翻倍计算。",
        "在同样投入和回收倍数下，等待更久会降低年化回报率。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "IRR与倍数的时间维度"
      ]
    },
    {
      "id": "fund3-precision-007",
      "chapter": 14,
      "lessonId": "fund3-syllabus-9",
      "topic": "管理费计提基数",
      "type": "single",
      "stem": "合同明确某年管理费按认缴1亿元的1.5%计提；当年已实缴6000万元、投资余额5000万元。忽略其他调整，年管理费是多少？",
      "options": [
        "75万元",
        "15万元",
        "150万元",
        "90万元"
      ],
      "answer": 2,
      "explanation": "本题合同明确基数为认缴1亿元，所以管理费=10000×1.5%=150万元。不同基金或期间的基数可能不同，不能擅自改为实缴或投资余额。",
      "rationales": [
        "这是投资余额乘费率，题干并未采用该费用基数。",
        "1.5%应换成0.015，不能误写成0.0015。",
        "本题合同明确基数为认缴1亿元，所以管理费=10000×1.5%=150万元。不同基金或期间的基数可能不同，不能擅自改为实缴或投资余额。",
        "这是6000万元实缴额乘费率，不符合本题明确的合同基数。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "管理费计提基数"
      ],
      "precisionCalculation": {
        "operation": "product",
        "inputs": [
          10000,
          0.015
        ],
        "expected": 150
      }
    },
    {
      "id": "fund3-precision-008",
      "chapter": 14,
      "lessonId": "fund3-syllabus-9",
      "topic": "优先回报不等于保本",
      "type": "single",
      "stem": "基金合同设置分配顺序：先返还投资本金，再在可分配现金范围内分配门槛收益。应如何理解？",
      "options": [
        "门槛收益写进合同就必定到账",
        "优先回报越高，资产实际风险越低",
        "只要先返本就意味着本金不会损失",
        "这是现金分配次序，不当然构成保本收益承诺"
      ],
      "answer": 3,
      "explanation": "分配瀑布规定可分配现金如何在投资人和管理人之间分配；若资产不足，门槛收益可能无法取得，不能把优先分配顺序直接宣传成保本。",
      "rationales": [
        "合同分配顺序仍受实际可分配现金约束，不能保证投资资产足够。",
        "收益分配条款不直接改变底层资产经营、估值和退出风险。",
        "返本顺序不等于存在足额本金或由某方无条件兜底。",
        "分配瀑布规定可分配现金如何在投资人和管理人之间分配；若资产不足，门槛收益可能无法取得，不能把优先分配顺序直接宣传成保本。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "优先回报不等于保本"
      ]
    },
    {
      "id": "fund3-precision-009",
      "chapter": 14,
      "lessonId": "fund3-syllabus-9",
      "topic": "明示瀑布的业绩报酬",
      "type": "single",
      "stem": "仅按本题约定：可分配现金130万元，先向投资人返还100万元本金，再分配10万元优先回报；余下部分管理人提取20%，无追补条款。管理人此次分得多少？",
      "options": [
        "4万元",
        "6万元",
        "26万元",
        "20万元"
      ],
      "answer": 0,
      "explanation": "扣除本金100和优先回报10，剩余20万元；按剩余的20%计提，管理人分得4万元。本题无追补，不可套用其他基金合同。",
      "rationales": [
        "扣除本金100和优先回报10，剩余20万元；按剩余的20%计提，管理人分得4万元。本题无追补，不可套用其他基金合同。",
        "30万元总增值中还包括优先回报10万元，不能直接对全部增值计提。",
        "对全部可分配现金计提会把返还本金也错误作为分成基数。",
        "20万元是剩余待分现金，不是管理人按20%获得的份额。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "明示瀑布的业绩报酬"
      ],
      "precisionCalculation": {
        "operation": "waterfall",
        "inputs": [
          130,
          100,
          10,
          0.2
        ],
        "expected": 4
      }
    },
    {
      "id": "fund3-precision-010",
      "chapter": 2,
      "lessonId": "fund-diligence",
      "topic": "收入真实性交叉验证",
      "type": "single",
      "stem": "尽调团队只有企业自行制作的销售汇总表。要更可靠地检验收入真实性，最合理的下一步是？",
      "options": [
        "只抽取金额最大的一个成功客户",
        "交叉核验合同、履约证据、回款及必要的外部确认",
        "销售汇总表有负责人签名即可结束",
        "只看下一年收入预测是否更高"
      ],
      "answer": 1,
      "explanation": "单一内部报表不足以独立验证交易真实性。应根据业务特点勾稽合同、交付或服务履约、发票、资金流和必要的客户确认，并分析异常差异。",
      "rationales": [
        "仅选单一成功样本可能遗漏系统性问题，样本需考虑风险与代表性。",
        "单一内部报表不足以独立验证交易真实性。应根据业务特点勾稽合同、交付或服务履约、发票、资金流和必要的客户确认，并分析异常差异。",
        "签名不能代替对交易发生、完整性及资金流的独立验证。",
        "未来预测不是验证过去收入真实存在的证据。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "收入真实性交叉验证"
      ]
    },
    {
      "id": "fund3-precision-011",
      "chapter": 4,
      "lessonId": "fund-valuation",
      "topic": "估值倍数不是现金回收",
      "type": "single",
      "stem": "基金持有项目的账面公允价值由1亿元升至1.5亿元，但未出售股权且未收到分红。下列说法正确的是？",
      "options": [
        "基金已经收到0.5亿元退出款",
        "上调后未来退出不再有任何风险",
        "账面价值增加不等于已实现现金分配",
        "DPI必然立即增加0.5倍"
      ],
      "answer": 2,
      "explanation": "估值上调是未实现价值变化，既不自动产生退出现金，也不当然增加DPI；是否能实现该价值仍取决于后续交易和经营。",
      "rationales": [
        "没有出售或分红现金流，不能把估值差额当作实际收款。",
        "估值可能回落，流动性、经营和交易风险仍然存在。",
        "估值上调是未实现价值变化，既不自动产生退出现金，也不当然增加DPI；是否能实现该价值仍取决于后续交易和经营。",
        "DPI分子是累计实际分配，账面估值上调不是已分配现金。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "估值倍数不是现金回收"
      ]
    },
    {
      "id": "fund3-precision-012",
      "chapter": 11,
      "lessonId": "fund3-syllabus-6",
      "topic": "投后监督与经营边界",
      "type": "single",
      "stem": "投资协议赋予投资人董事席位、重大事项同意权及定期报告权。投后管理最合适的做法是？",
      "options": [
        "直接把企业账户资金调入基金自用",
        "投入资金后完全无需持续跟踪",
        "绕过董事会直接撤销所有经营合同",
        "在约定治理框架内监督经营、识别风险并跟踪整改"
      ],
      "answer": 3,
      "explanation": "投后管理应使用合法、约定的治理和信息权利，持续跟踪经营与风险；既非放任不管，也不当然取得越过公司治理的无限经营指挥权。",
      "rationales": [
        "投资者治理权不意味着可随意挪用被投企业资产。",
        "定期报告、风险识别和监督属于投后管理的重要内容。",
        "协议中具体权利不能被扩大为任意越过治理程序的全面处置权。",
        "投后管理应使用合法、约定的治理和信息权利，持续跟踪经营与风险；既非放任不管，也不当然取得越过公司治理的无限经营指挥权。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "投后监督与经营边界"
      ]
    }
  ],
  "securities1": [
    {
      "id": "securities1-precision-001",
      "chapter": 5,
      "lessonId": "securities1-5",
      "topic": "一年期债券现值",
      "type": "single",
      "stem": "债券一年后一次支付本金100元和利息5元；适用年折现率为5%，无其他现金流或风险溢价。当前理论价值为？",
      "options": [
        "100元",
        "105元",
        "95元",
        "110元"
      ],
      "answer": 0,
      "explanation": "一年后的合计现金流为105元，现值=105/(1+5%)=100元。未来收到的利息不能不经折现就直接加到当前价值。",
      "rationales": [
        "一年后的合计现金流为105元，现值=105/(1+5%)=100元。未来收到的利息不能不经折现就直接加到当前价值。",
        "105元是未来到期现金流，尚未折算成当前价值。",
        "不能简单从面值扣减利率，必须把全部到期现金流按折现因子处理。",
        "利息只支付一次，不能在本金和现金流中重复计算。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "一年期债券现值"
      ],
      "precisionCalculation": {
        "operation": "pv",
        "inputs": [
          105,
          0.05,
          1
        ],
        "expected": 100
      }
    },
    {
      "id": "securities1-precision-002",
      "chapter": 5,
      "lessonId": "securities1-5",
      "topic": "当期收益率",
      "type": "single",
      "stem": "债券面值100元，年票息4元，当前净价80元。仅按年票息/买入价格计算的当期收益率为？",
      "options": [
        "20%",
        "5%",
        "4%",
        "25%"
      ],
      "answer": 1,
      "explanation": "当期收益率=4/80=5%。它只衡量票息与当前价格的比例，不包括到期价格回归、再投资等，不能直接当作到期收益率。",
      "rationales": [
        "20是面值与价格的金额差，不能用来代替年票息。",
        "当期收益率=4/80=5%。它只衡量票息与当前价格的比例，不包括到期价格回归、再投资等，不能直接当作到期收益率。",
        "4%是票面利率，分母为面值100元，不是买入价格80元。",
        "25%反映80到100的价差相对买价，并不是年票息收益率。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "当期收益率"
      ],
      "precisionCalculation": {
        "operation": "ratioPct",
        "inputs": [
          4,
          80
        ],
        "expected": 5
      }
    },
    {
      "id": "securities1-precision-003",
      "chapter": 2,
      "lessonId": "securities1-2",
      "topic": "实际收益率",
      "type": "single",
      "stem": "名义年收益率8%，同期通货膨胀率3%。按精确费雪关系计算，实际年收益率约为？",
      "options": [
        "11.00%",
        "2.67%",
        "4.85%",
        "5.00%"
      ],
      "answer": 2,
      "explanation": "实际收益=(1.08/1.03−1)×100%≈4.85%。8%−3%=5%仅是一阶近似，题目要求精确关系。",
      "rationales": [
        "通胀削弱购买力，不能与名义收益简单相加。",
        "将名义收益率除以通胀率不符合实际收益率的定义。",
        "实际收益=(1.08/1.03−1)×100%≈4.85%。8%−3%=5%仅是一阶近似，题目要求精确关系。",
        "名义收益直接减通胀是近似式，不是题设要求的精确换算。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "实际收益率"
      ],
      "precisionCalculation": {
        "operation": "realReturn",
        "inputs": [
          0.08,
          0.03
        ],
        "expected": 4.854368932038833
      }
    },
    {
      "id": "securities1-precision-004",
      "chapter": 8,
      "lessonId": "securities1-8",
      "topic": "回本所需涨幅",
      "type": "single",
      "stem": "某投资净值从100降至60。忽略费用，从60回到100需要上涨约多少？",
      "options": [
        "40.00%",
        "60.00%",
        "166.67%",
        "66.67%"
      ],
      "answer": 3,
      "explanation": "回本涨幅=(100/60−1)×100%≈66.67%。亏损40%之后的基数已降为60，不能以同样的40%涨幅回本。",
      "rationales": [
        "跌幅以100为基数，回升幅度以60为基数，两者不能直接等同。",
        "60是当前净值水平，并不是从该水平回本所需的收益率。",
        "100/60为回升后的净值倍数，收益率还须减去1。",
        "回本涨幅=(100/60−1)×100%≈66.67%。亏损40%之后的基数已降为60，不能以同样的40%涨幅回本。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "回本所需涨幅"
      ],
      "precisionCalculation": {
        "operation": "recovery",
        "inputs": [
          100,
          60
        ],
        "expected": 66.66666666666667
      }
    },
    {
      "id": "securities1-precision-005",
      "chapter": 4,
      "lessonId": "securities1-4",
      "topic": "总市值与流通市值",
      "type": "single",
      "stem": "某公司股价10元，总股本1亿股，其中流通股6000万股。总市值是多少？",
      "options": [
        "10亿元",
        "6亿元",
        "4亿元",
        "16亿元"
      ],
      "answer": 0,
      "explanation": "总市值=股价×总股本=10×1亿=10亿元。6亿元是题设流通股对应市值，不是全体股份对应的总市值。",
      "rationales": [
        "总市值=股价×总股本=10×1亿=10亿元。6亿元是题设流通股对应市值，不是全体股份对应的总市值。",
        "该数用流通股本计算，属于流通市值而非总市值。",
        "该数仅对应总股本中非流通部分，不能代表全体股份。",
        "流通股已包含在总股本中，不能把两者重复相加。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "总市值与流通市值"
      ],
      "precisionCalculation": {
        "operation": "product",
        "inputs": [
          10,
          1
        ],
        "expected": 10
      }
    },
    {
      "id": "securities1-precision-006",
      "chapter": 8,
      "lessonId": "securities1-8",
      "topic": "系统性与非系统性风险",
      "type": "single",
      "stem": "组合从单只股票扩展到多个行业的许多股票，但总体仍随市场大幅波动。最合理的解释是？",
      "options": [
        "市场下跌说明分散组合与集中组合完全等价",
        "分散有助降低个别风险，但不消除市场系统性风险",
        "只要超过十只股票就不应再有任何风险",
        "分散投资一定提高对每只股票的判断准确度"
      ],
      "answer": 1,
      "explanation": "跨公司、跨行业持仓可以减少部分特有风险；共同宏观冲击仍可能影响多数股票，分散不等于消灭市场整体风险。",
      "rationales": [
        "共同下跌不能证明所有风险特征相同，特有风险仍可能已被降低。",
        "跨公司、跨行业持仓可以减少部分特有风险；共同宏观冲击仍可能影响多数股票，分散不等于消灭市场整体风险。",
        "持仓数量本身不保证风险为零，相关性和共同因子仍重要。",
        "分散改变的是风险组合，不会自动提升对每家公司的预测能力。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "系统性与非系统性风险"
      ]
    },
    {
      "id": "securities1-precision-007",
      "chapter": 1,
      "lessonId": "securities1-1",
      "topic": "一级与二级市场资金流",
      "type": "single",
      "stem": "甲投资者通过交易所买入乙投资者持有的已上市股票。只考虑本笔二级市场交易，发行公司是否直接获得新增股权融资款？",
      "options": [
        "公司获得成交价款的一半",
        "只要股价上涨，公司账上现金必然等额增加",
        "通常不获得，本笔买价支付给卖方投资者",
        "公司获得全部成交价款"
      ],
      "answer": 2,
      "explanation": "普通二级市场买卖是在投资者之间转让现有股份，买价支付给卖方；不能把每笔二级市场成交额都当作发行人的新增融资。",
      "rationales": [
        "题设没有任何向发行人支付一半成交款的安排或依据。",
        "市场估值变化与公司收到现金是不同概念，不能机械对应。",
        "普通二级市场买卖是在投资者之间转让现有股份，买价支付给卖方；不能把每笔二级市场成交额都当作发行人的新增融资。",
        "这混淆了发行新股募集资金与现有股份二级市场转让。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "一级与二级市场资金流"
      ]
    },
    {
      "id": "securities1-precision-008",
      "chapter": 5,
      "lessonId": "securities1-5",
      "topic": "票面利率与市场利率",
      "type": "single",
      "stem": "固定票息债券发行后，市场要求收益率下降，其他条件不变。合理的价格方向是？",
      "options": [
        "债券价格下降，因为利息变少",
        "票面利率自动下降到市场收益率",
        "价格和折现率之间不存在关系",
        "债券现值通常上升，票面利率本身不因此改变"
      ],
      "answer": 3,
      "explanation": "固定现金流采用更低折现率计算时现值上升。票面利率是合同约定，市场收益率变化并不自动重写票面利率。",
      "rationales": [
        "题设固定票息没有减少，折现率下降通常提高而非降低现值。",
        "固定票息合同与市场要求收益率是不同层次的概念。",
        "现值本身就是未来现金流与适用折现率共同决定的。",
        "固定现金流采用更低折现率计算时现值上升。票面利率是合同约定，市场收益率变化并不自动重写票面利率。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "票面利率与市场利率"
      ]
    },
    {
      "id": "securities1-precision-009",
      "chapter": 4,
      "lessonId": "securities1-4",
      "topic": "非经常损益与市盈率",
      "type": "single",
      "stem": "一家公司因出售资产取得一次性大额收益，其他条件未变，按当期净利润计算的市盈率明显下降。最稳妥的解读是？",
      "options": [
        "应区分可持续经营利润与一次性收益后再判断",
        "市盈率下降必然意味着主营业务显著改善",
        "所有出售资产所得都可以每年重复实现",
        "仅凭市盈率下降即可排除任何估值风险"
      ],
      "answer": 0,
      "explanation": "一次性收益会抬高当期利润、压低静态市盈率；这不自动表示持续盈利能力增强，也不自动构成估值便宜的结论。",
      "rationales": [
        "一次性收益会抬高当期利润、压低静态市盈率；这不自动表示持续盈利能力增强，也不自动构成估值便宜的结论。",
        "当期利润可能来自非经常事项，不能直接归因于主业改善。",
        "一次性交易收益的可重复性需要具体论证，不能直接外推。",
        "单一比率不足以排除盈利质量、杠杆、流动性和经营风险。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "非经常损益与市盈率"
      ]
    },
    {
      "id": "securities1-precision-010",
      "chapter": 8,
      "lessonId": "securities1-8",
      "topic": "流动性与信用的区别",
      "type": "single",
      "stem": "某债券发行人正常付息，但二级市场买卖价差显著扩大、卖出难度上升。最直接反映哪种风险上升？",
      "options": [
        "必然获得更高且无风险的收益",
        "市场流动性风险",
        "已经发生确定的本金违约",
        "票面利率被市场强制调低"
      ],
      "answer": 1,
      "explanation": "难以快速以合理价格成交、买卖价差扩大，首先体现流动性风险。信用风险还须结合偿债能力及违约可能性另行判断。",
      "rationales": [
        "流动性补偿不是无风险保证，价格和退出仍存在不确定性。",
        "难以快速以合理价格成交、买卖价差扩大，首先体现流动性风险。信用风险还须结合偿债能力及违约可能性另行判断。",
        "卖出困难不等于发行人已到期拒绝或无法偿还本金。",
        "价差和成交困难本身不改变固定合同票息。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "流动性与信用的区别"
      ]
    },
    {
      "id": "securities1-precision-011",
      "chapter": 8,
      "lessonId": "securities1-8",
      "topic": "损失后的杠杆变化",
      "type": "single",
      "stem": "自有资金100万元、借款100万元共同持有200万元资产。资产下跌10%，借款金额不变，不计利息费用。自有权益收益率是多少？",
      "options": [
        "-5%",
        "10%",
        "-20%",
        "-10%"
      ],
      "answer": 2,
      "explanation": "资产减少20万元至180万元，扣除借款100万元后权益80万元，权益收益率=(80−100)/100=−20%。借款扩大了权益对资产价格的敏感度。",
      "rationales": [
        "损失应除以自有权益而不是把资产收益再减半。",
        "资产下跌且债务不变会损害权益，不能得出正收益。",
        "资产减少20万元至180万元，扣除借款100万元后权益80万元，权益收益率=(80−100)/100=−20%。借款扩大了权益对资产价格的敏感度。",
        "−10%是资产收益率，未考虑只有100万元自有权益承担20万元损失。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "损失后的杠杆变化"
      ],
      "precisionCalculation": {
        "operation": "leveredReturn",
        "inputs": [
          100,
          100,
          -0.1
        ],
        "expected": -20
      }
    },
    {
      "id": "securities1-precision-012",
      "chapter": 8,
      "lessonId": "securities1-8",
      "topic": "算术均值不等于复利增长",
      "type": "single",
      "stem": "无外部资金流，投资第一年收益50%、第二年亏损50%。两年累计收益率是多少？",
      "options": [
        "0%",
        "-50%",
        "25%",
        "-25%"
      ],
      "answer": 3,
      "explanation": "(1+50%)×(1−50%)−1=−25%。收益率算术均值为零，但复利终值只有初值的75%，体现波动对几何增长的影响。",
      "rationales": [
        "正负50%基数不同，不能直接相加求累计复利收益。",
        "这只计算第二期跌幅，遗漏第一年的上涨。",
        "终值是初值的75%，相对于初值是损失25%而不是盈利。",
        "(1+50%)×(1−50%)−1=−25%。收益率算术均值为零，但复利终值只有初值的75%，体现波动对几何增长的影响。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "算术均值不等于复利增长"
      ],
      "precisionCalculation": {
        "operation": "compoundReturn",
        "inputs": [
          0.5,
          -0.5
        ],
        "expected": -25
      }
    }
  ],
  "securities2": [
    {
      "id": "securities2-precision-001",
      "chapter": 5,
      "lessonId": "securities2-5",
      "topic": "代销与包销剩余风险",
      "type": "single",
      "stem": "承销协议约定证券公司代发行人发售证券，期限届满将未售出证券退还发行人。该安排属于？",
      "options": [
        "代销",
        "余额包销",
        "全额包销",
        "证券公司自营做市的当然形式"
      ],
      "answer": 0,
      "explanation": "代销在承销期结束时将未售出证券退还发行人；包销则包括全额购入或期末购入剩余证券。区分关键是未售出部分的承担安排。",
      "rationales": [
        "代销在承销期结束时将未售出证券退还发行人；包销则包括全额购入或期末购入剩余证券。区分关键是未售出部分的承担安排。",
        "余额包销要求承销期结束后证券公司购入未售出证券，不是退回。",
        "全额包销由证券公司按约定购入全部承销证券，与代为销售不同。",
        "承销协议的销售与剩余证券安排不能直接等同于二级市场做市。"
      ],
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券法》第26条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "代销与包销剩余风险"
      ]
    },
    {
      "id": "securities2-precision-002",
      "chapter": 5,
      "lessonId": "securities2-5",
      "topic": "承销中的披露核查",
      "type": "single",
      "stem": "证券公司已开始承销，后发现公开发行募集文件存在重大遗漏。符合职责的处理是？",
      "options": [
        "等发行完成再修改历史网页即可",
        "立即停止销售，并采取纠正措施",
        "继续卖完，只提醒机构客户",
        "全部责任归发行人，承销商不用处理"
      ],
      "answer": 1,
      "explanation": "证券公司对公开发行募集文件负有核查职责；发现虚假记载、误导性陈述或重大遗漏，不得销售，已销售的须立即停止并采取纠正措施。",
      "rationales": [
        "事后修改不能替代发现问题时立即停止销售的要求。",
        "证券公司对公开发行募集文件负有核查职责；发现虚假记载、误导性陈述或重大遗漏，不得销售，已销售的须立即停止并采取纠正措施。",
        "区别提醒不能替代停止销售与纠正措施，亦不能豁免核查责任。",
        "发行人的责任不消灭承销证券公司独立承担的法定核查职责。"
      ],
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券法》第29条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "承销中的披露核查"
      ]
    },
    {
      "id": "securities2-precision-003",
      "chapter": 4,
      "lessonId": "securities2-4",
      "topic": "客户信息保密",
      "type": "single",
      "stem": "证券公司员工拟把客户交易明细出售给外部营销公司。最直接触及哪项义务？",
      "options": [
        "只要客户是专业投资者就可公开其明细",
        "只出售不免费分享便不算提供信息",
        "对投资者信息依法保密，不得非法出售或提供",
        "员工个人出售与所在机构的保密义务无关"
      ],
      "answer": 2,
      "explanation": "证券交易场所、证券公司等机构及其工作人员应依法对投资者信息保密，不得非法买卖、提供或公开投资者信息。",
      "rationales": [
        "专业身份不使个人交易明细丧失依法受保护的属性。",
        "出售是法律明确关注的非法买卖行为，付费不使其合法。",
        "证券交易场所、证券公司等机构及其工作人员应依法对投资者信息保密，不得非法买卖、提供或公开投资者信息。",
        "法条既约束相关机构，也明确约束其工作人员。"
      ],
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券法》第41条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "客户信息保密"
      ]
    },
    {
      "id": "securities2-precision-004",
      "chapter": 4,
      "lessonId": "securities2-4",
      "topic": "收费项目公开",
      "type": "single",
      "stem": "证券公司计划收取一项证券交易服务费用，但认为收费标准属于商业秘密，不向客户公开。正确说法是？",
      "options": [
        "收费只要金额不大就不用公开",
        "只向投诉过的客户公布即可",
        "所有收费都必须为零",
        "收费应合理，并公开收费项目、标准及管理办法"
      ],
      "answer": 3,
      "explanation": "证券交易收费必须合理，并公开收费项目、收费标准和管理办法。商业秘密不能作为隐匿应公开收费规则的理由。",
      "rationales": [
        "是否公开不取决于金额大小，法定透明要求持续适用。",
        "被动向少数客户解释不等于履行面向适用客户的公开义务。",
        "法律要求合理和公开，并不等于一概禁止收费。",
        "证券交易收费必须合理，并公开收费项目、收费标准和管理办法。商业秘密不能作为隐匿应公开收费规则的理由。"
      ],
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券法》第43条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "收费项目公开"
      ]
    },
    {
      "id": "securities2-precision-005",
      "chapter": 7,
      "lessonId": "securities2-7",
      "topic": "内幕信息公开前交易",
      "type": "single",
      "stem": "某人非法获取尚未公开且对证券价格有重大影响的信息，在信息公开前交易相关证券。核心法律风险是？",
      "options": [
        "利用未公开内幕信息进行证券交易",
        "未担任上市公司高管就不受内幕交易约束",
        "只要最终亏损就当然没有内幕交易问题",
        "交易金额小就可以自由使用内幕信息"
      ],
      "answer": 0,
      "explanation": "内幕信息知情人和非法获取内幕信息的人，在信息公开前不得买卖有关证券、泄露信息或建议他人交易。合法获知与非法获取都不能成为利用内幕交易的理由。",
      "rationales": [
        "内幕信息知情人和非法获取内幕信息的人，在信息公开前不得买卖有关证券、泄露信息或建议他人交易。合法获知与非法获取都不能成为利用内幕交易的理由。",
        "非法获取内幕信息者也在法律禁止的主体范围内。",
        "交易盈亏不把利用未公开内幕信息的行为自动变为合规。",
        "金额大小不能被自行创造为使用内幕信息交易的许可。"
      ],
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券法》第50、52、53条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "内幕信息公开前交易"
      ]
    },
    {
      "id": "securities2-precision-006",
      "chapter": 7,
      "lessonId": "securities2-7",
      "topic": "编造传播虚假信息",
      "type": "single",
      "stem": "某网络账号编造上市公司重大事项并传播，扰乱证券市场，声称自己没有买卖该股所以无关证券规则。正确判断是？",
      "options": [
        "转发数量不大时就必然没有任何义务",
        "未持仓不当然排除编造、传播虚假信息的法律风险",
        "没有股票账户就可任意编造公司公告",
        "只要写“仅供参考”就能免除责任"
      ],
      "answer": 1,
      "explanation": "法律禁止编造、传播虚假或误导性信息扰乱证券市场；是否自己持有相关证券，并不是可以编造信息的许可条件。",
      "rationales": [
        "传播规模可能影响事实判断，但不能据此创设任意传播虚假信息的权利。",
        "法律禁止编造、传播虚假或误导性信息扰乱证券市场；是否自己持有相关证券，并不是可以编造信息的许可条件。",
        "账户状态不使编造传播扰乱市场的信息成为合法行为。",
        "通用免责声明不能消除信息内容虚假及扰乱市场的实际问题。"
      ],
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券法》第56条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "编造传播虚假信息"
      ]
    },
    {
      "id": "securities2-precision-007",
      "chapter": 4,
      "lessonId": "securities2-4",
      "topic": "为佣金诱导频繁交易",
      "type": "single",
      "stem": "客户并无相应投资需要，证券公司人员为增加佣金收入诱导其频繁买卖。应如何评价？",
      "options": [
        "只要客户偶尔盈利就无需关注诱导过程",
        "佣金属于合法收入，所以任何增佣手段都合法",
        "涉嫌违背客户意愿并诱导不必要交易",
        "交易均由客户点击确认就必然合规"
      ],
      "answer": 2,
      "explanation": "证券公司及从业人员不得以牟取佣金收入为目的，诱使客户进行不必要的证券买卖。交易数量多不自动证明符合客户利益。",
      "rationales": [
        "收益结果不能替代对动机、必要性、客户利益和行为规范的审查。",
        "收费收入可合法，不代表获取收费的所有行为均合规。",
        "证券公司及从业人员不得以牟取佣金收入为目的，诱使客户进行不必要的证券买卖。交易数量多不自动证明符合客户利益。",
        "形式上的点击不当然消除以佣金为目的诱使不必要交易的行为风险。"
      ],
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券法》第57条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "为佣金诱导频繁交易"
      ]
    },
    {
      "id": "securities2-precision-008",
      "chapter": 4,
      "lessonId": "securities2-4",
      "topic": "未经委托买卖",
      "type": "single",
      "stem": "证券公司员工认为某客户会喜欢一只股票，在没有客户授权的情况下直接替其买入。正确说法是？",
      "options": [
        "事后上涨就视为事前已授权",
        "员工以往判断准确就可以免授权",
        "只要金额低于账户余额就能直接下单",
        "不得违背客户意愿或未经委托擅自买卖"
      ],
      "answer": 3,
      "explanation": "证券公司及从业人员不得违背客户意愿买卖证券，也不得在未受客户委托时擅自以客户名义买卖。预测客户偏好不等于取得授权。",
      "rationales": [
        "盈利不会倒推产生事前委托，授权与交易结果是不同问题。",
        "历史判断能力不能替代客户的合法委托和授权程序。",
        "账户有余额只说明资金存在，并不授权员工任意投资。",
        "证券公司及从业人员不得违背客户意愿买卖证券，也不得在未受客户委托时擅自以客户名义买卖。预测客户偏好不等于取得授权。"
      ],
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券法》第57条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "未经委托买卖"
      ]
    },
    {
      "id": "securities2-precision-009",
      "chapter": 4,
      "lessonId": "securities2-4",
      "topic": "证券账户出借",
      "type": "single",
      "stem": "投资者以收取租金为目的把证券账户违法出借给他人使用。下列认识正确的是？",
      "options": [
        "出借方和违法借用方均不能以双方同意作为当然免责",
        "账户所有人同意后就不受任何规则限制",
        "只要不交易亏损，账户出借就合法",
        "只约束借用方，出借方永远不受约束"
      ],
      "answer": 0,
      "explanation": "任何单位和个人不得违反规定出借自己的证券账户或借用他人的证券账户。双方合同同意不能排除监管规则。",
      "rationales": [
        "任何单位和个人不得违反规定出借自己的证券账户或借用他人的证券账户。双方合同同意不能排除监管规则。",
        "账户实名和使用规则不因私下同意就全部失效。",
        "是否亏损不是违法出借或借用账户的合法性判断标准。",
        "条文同时涉及违规出借自身账户和违规借用他人账户。"
      ],
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券法》第58条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "证券账户出借"
      ]
    },
    {
      "id": "securities2-precision-010",
      "chapter": 1,
      "lessonId": "securities2-1",
      "topic": "披露语言清晰",
      "type": "single",
      "stem": "上市公司披露一项重大事项，数字本身无误，但用含混晦涩表述掩盖关键风险。对此应如何评价？",
      "options": [
        "仅需向少数分析师口头解释即可",
        "真实准确之外，还应完整、简明清晰、通俗易懂",
        "只要数字能对上，语言是否误导不重要",
        "专业名词越多就越符合披露要求"
      ],
      "answer": 1,
      "explanation": "信息披露义务人的信息应真实、准确、完整，简明清晰、通俗易懂。数字没有算错并不代表全文不存在误导或关键遗漏。",
      "rationales": [
        "向少数人的解释不能替代面向市场的法定信息披露。",
        "信息披露义务人的信息应真实、准确、完整，简明清晰、通俗易懂。数字没有算错并不代表全文不存在误导或关键遗漏。",
        "披露质量要求不仅限于算术一致，还包括清晰表达和避免误导。",
        "专业用语不应成为妨碍投资者理解关键信息的工具。"
      ],
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券法》第78条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "披露语言清晰"
      ]
    },
    {
      "id": "securities2-precision-011",
      "chapter": 1,
      "lessonId": "securities2-1",
      "topic": "自愿披露也受规范",
      "type": "single",
      "stem": "某信息不是法定强制披露事项，公司自愿发布时夸大预期收益，可能误导投资者。正确判断为？",
      "options": [
        "只要不称为公告就可以任意夸大",
        "夸大后及时删帖就能抹去传播影响",
        "自愿披露也不得虚假、误导或与依法披露相冲突",
        "凡非强制披露内容均无需真实准确"
      ],
      "answer": 2,
      "explanation": "信息披露义务人可以自愿披露与投资决策有关的信息，但自愿披露不能误导投资者，也不得与依法披露的信息相冲突。",
      "rationales": [
        "发布形式或标题不能当然规避信息内容对应的法律要求。",
        "删除不是对原发布行为和已产生误导的当然免责。",
        "信息披露义务人可以自愿披露与投资决策有关的信息，但自愿披露不能误导投资者，也不得与依法披露的信息相冲突。",
        "自愿发布不会将与投资决策有关的信息变成不受约束的宣传。"
      ],
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券法》第84条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "自愿披露也受规范"
      ]
    },
    {
      "id": "securities2-precision-012",
      "chapter": 3,
      "lessonId": "securities2-3",
      "topic": "发现禁止交易行为的报告",
      "type": "single",
      "stem": "证券交易所发现涉嫌法律禁止的证券交易行为，认为已在内部备忘录记录便不必报告。正确处理是？",
      "options": [
        "仅做内部留痕即可完全履责",
        "只有最终法院判决违法后才能报告",
        "等客户自行报案后再决定是否记录",
        "及时向证券监督管理机构报告"
      ],
      "answer": 3,
      "explanation": "证券交易所、证券公司、登记结算机构等发现法律禁止的证券交易行为，应及时向证券监督管理机构报告，内部留痕不替代法定报告。",
      "rationales": [
        "内部记录可以辅助追踪，但不能替代法定对外报告职责。",
        "发现涉嫌禁止行为时的报告与最终司法认定属于不同程序环节。",
        "不能把本机构法定职责完全转移给客户。",
        "证券交易所、证券公司、登记结算机构等发现法律禁止的证券交易行为，应及时向证券监督管理机构报告，内部留痕不替代法定报告。"
      ],
      "source": "securitiesLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《证券法》第61条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "发现禁止交易行为的报告"
      ]
    }
  ],
  "futures1": [
    {
      "id": "futures1-precision-001",
      "chapter": 4,
      "lessonId": "futures1-4",
      "topic": "卖出套保有效售价",
      "type": "single",
      "stem": "企业持有现货，按期货4000元/吨卖出套保；到平仓时现货3900元/吨、期货3850元/吨。数量匹配，不计费用，有效售价为？",
      "options": [
        "4050元/吨",
        "3750元/吨",
        "3900元/吨",
        "4000元/吨"
      ],
      "answer": 0,
      "explanation": "期货空头获利4000−3850=150元/吨，与现货售价3900合并，有效售价4050元/吨。要使用空头损益方向，不能从售价再扣盈利。",
      "rationales": [
        "期货空头获利4000−3850=150元/吨，与现货售价3900合并，有效售价4050元/吨。要使用空头损益方向，不能从售价再扣盈利。",
        "此数把期货套保盈利从现货售价中扣掉，符号相反。",
        "这是仅现货售价，未合并期货平仓损益。",
        "期货开仓价并非任何基差变化下都可实现的最终有效售价。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "卖出套保有效售价"
      ],
      "precisionCalculation": {
        "operation": "sellHedge",
        "inputs": [
          4000,
          3900,
          3850
        ],
        "expected": 4050
      }
    },
    {
      "id": "futures1-precision-002",
      "chapter": 4,
      "lessonId": "futures1-4",
      "topic": "买入套保有效成本",
      "type": "single",
      "stem": "企业拟采购现货，期货为3000元/吨时买入套保；采购时现货3150元/吨、期货3120元/吨。数量匹配，不计费用，有效采购成本为？",
      "options": [
        "3000元/吨",
        "3030元/吨",
        "3270元/吨",
        "3150元/吨"
      ],
      "answer": 1,
      "explanation": "期货多头盈利3120−3000=120元/吨，抵减现货支出3150元，有效成本3030元/吨。合并后仍受平仓基差影响。",
      "rationales": [
        "开仓期货价并不是存在基差时的必然最终采购成本。",
        "期货多头盈利3120−3000=120元/吨，抵减现货支出3150元，有效成本3030元/吨。合并后仍受平仓基差影响。",
        "期货盈利应降低采购净成本，不能再加到现货支出上。",
        "只看采购价会漏掉用于对冲的期货盈利。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "买入套保有效成本"
      ],
      "precisionCalculation": {
        "operation": "buyHedge",
        "inputs": [
          3000,
          3150,
          3120
        ],
        "expected": 3030
      }
    },
    {
      "id": "futures1-precision-003",
      "chapter": 4,
      "lessonId": "futures1-4",
      "topic": "基差走强的方向",
      "type": "single",
      "stem": "约定基差=现货价−期货价。基差由−30元/吨变为10元/吨。正确判断是？",
      "options": [
        "基差走强20元/吨",
        "现货和期货必然同时上涨40元/吨",
        "基差走强40元/吨",
        "基差走弱40元/吨"
      ],
      "answer": 2,
      "explanation": "按题设定义，新基差减旧基差=10−(−30)=40元/吨，基差增加称为走强。须固定基差定义，不能换成期货减现货。",
      "rationales": [
        "计算跨越零点的变化时，必须从10减去负30。",
        "只知道价差变化，无法唯一推出两种价格各自的绝对变化。",
        "按题设定义，新基差减旧基差=10−(−30)=40元/吨，基差增加称为走强。须固定基差定义，不能换成期货减现货。",
        "从负30升至正10是增加而不是减少，方向表述反了。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "基差走强的方向"
      ]
    },
    {
      "id": "futures1-precision-004",
      "chapter": 2,
      "lessonId": "futures1-2",
      "topic": "最小变动价位的金额",
      "type": "single",
      "stem": "某期货每手10吨，最小变动价位2元/吨。持有3手多头，价格上涨1个最小变动价位，不计费用，盈利多少？",
      "options": [
        "6元",
        "20元",
        "600元",
        "60元"
      ],
      "answer": 3,
      "explanation": "每手一个价位价值=10×2=20元；3手合计60元。每吨报价、每手规模与持仓手数需同时纳入。",
      "rationales": [
        "此数只乘了价位和手数，遗漏每手10吨的合约乘数。",
        "这是1手的变动价值，而题设持仓为3手。",
        "每手吨数只需计入一次，不能重复放大10倍。",
        "每手一个价位价值=10×2=20元；3手合计60元。每吨报价、每手规模与持仓手数需同时纳入。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "最小变动价位的金额"
      ],
      "precisionCalculation": {
        "operation": "product",
        "inputs": [
          10,
          2,
          3
        ],
        "expected": 60
      }
    },
    {
      "id": "futures1-precision-005",
      "chapter": 3,
      "lessonId": "futures1-3",
      "topic": "每日盯市基准",
      "type": "single",
      "stem": "一手昨仓多头合约乘数10，开仓价100，昨日结算价105，今日结算价103。只计算今日持仓盯市损益、不计费用，结果为？",
      "options": [
        "-20元",
        "30元",
        "20元",
        "-2元"
      ],
      "answer": 0,
      "explanation": "对本题昨日已结算的持仓，今日盯市=(103−105)×10=−20元；开仓以来累计损益与今日损益不是同一个口径。",
      "rationales": [
        "对本题昨日已结算的持仓，今日盯市=(103−105)×10=−20元；开仓以来累计损益与今日损益不是同一个口径。",
        "这是按今日结算价相对开仓价计算的累计损益，不是今日单日盯市。",
        "多头在结算价由105降至103时亏损，不能写成盈利。",
        "报价差为−2，但需乘以题设合约乘数10。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "每日盯市基准"
      ],
      "precisionCalculation": {
        "operation": "markToMarket",
        "inputs": [
          105,
          103,
          10
        ],
        "expected": -20
      }
    },
    {
      "id": "futures1-precision-006",
      "chapter": 3,
      "lessonId": "futures1-3",
      "topic": "保证金比例调高",
      "type": "single",
      "stem": "合约名义金额固定为50万元，保证金比例由8%升到12%。不考虑账户盈亏和其他资金，所需保证金增加多少？",
      "options": [
        "20万元",
        "2万元",
        "6万元",
        "4万元"
      ],
      "answer": 1,
      "explanation": "新增保证金=50万×(12%−8%)=2万元。保证金调整是资金占用变化，不等同于合约交易亏损。",
      "rationales": [
        "比例差为4个百分点即0.04，不能误作0.4。",
        "新增保证金=50万×(12%−8%)=2万元。保证金调整是资金占用变化，不等同于合约交易亏损。",
        "6万元是调整后的总保证金，而不是增加额。",
        "4万元是原来需要的保证金，不是本次增量。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "保证金比例调高"
      ],
      "precisionCalculation": {
        "operation": "marginChange",
        "inputs": [
          50,
          0.08,
          0.12
        ],
        "expected": 2
      }
    },
    {
      "id": "futures1-precision-007",
      "chapter": 4,
      "lessonId": "futures1-4",
      "topic": "实物数量套保手数",
      "type": "single",
      "stem": "企业有500吨待售现货，每手期货对应10吨，按数量1:1完全卖出套保且不作其他风险调整。应卖出多少手？",
      "options": [
        "5手",
        "5000手",
        "50手",
        "500手"
      ],
      "answer": 2,
      "explanation": "数量匹配手数=500吨/(10吨/手)=50手。若存在质量、交割地点、月份或相关性差异，实际方案还需进一步评估。",
      "rationales": [
        "按每手10吨，5手只覆盖50吨，并未覆盖全部500吨。",
        "应以现货数量除以合约规模，而不是相乘。",
        "数量匹配手数=500吨/(10吨/手)=50手。若存在质量、交割地点、月份或相关性差异，实际方案还需进一步评估。",
        "现货吨数不能直接当作期货手数，需除以每手规模。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "实物数量套保手数"
      ],
      "precisionCalculation": {
        "operation": "ratio",
        "inputs": [
          500,
          10
        ],
        "expected": 50
      }
    },
    {
      "id": "futures1-precision-008",
      "chapter": 7,
      "lessonId": "futures1-7",
      "topic": "股指期货Beta套保",
      "type": "single",
      "stem": "股票组合市值1200万元，对目标指数Beta=1.2；每手该股指期货名义金额72万元。按Beta对冲公式，应卖出多少手？",
      "options": [
        "16.67手",
        "24手",
        "10手",
        "20手"
      ],
      "answer": 3,
      "explanation": "空头手数=组合价值×Beta/每手期货价值=1200×1.2/72=20手。该近似对冲指数系统性暴露，并不消除全部个股风险。",
      "rationales": [
        "此数只按市值匹配，遗漏了组合Beta=1.2的风险调整。",
        "Beta只应乘在组合价值上一次，不能在计算中重复放大。",
        "按题设规模，10手只提供目标套保名义金额的一半。",
        "空头手数=组合价值×Beta/每手期货价值=1200×1.2/72=20手。该近似对冲指数系统性暴露，并不消除全部个股风险。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "股指期货Beta套保"
      ],
      "precisionCalculation": {
        "operation": "betaHedge",
        "inputs": [
          1200,
          1.2,
          72
        ],
        "expected": 20
      }
    },
    {
      "id": "futures1-precision-009",
      "chapter": 5,
      "lessonId": "futures1-5",
      "topic": "跨期价差合并损益",
      "type": "single",
      "stem": "同品种期货买近月4000、卖远月4100，均1手，乘数10；后以近月4050、远月4130同时平仓，不计费用。组合利润是多少？",
      "options": [
        "200元",
        "800元",
        "500元",
        "-200元"
      ],
      "answer": 0,
      "explanation": "近月多头盈利(4050−4000)×10=500元，远月空头亏损(4100−4130)×10=−300元，净利润200元。",
      "rationales": [
        "近月多头盈利(4050−4000)×10=500元，远月空头亏损(4100−4130)×10=−300元，净利润200元。",
        "把远月空头在价格上涨时的亏损误算成盈利，会错误相加成800元。",
        "只计近月多头，没有计入远月空头的亏损。",
        "两条腿按持仓方向合并后是盈利200元，不能颠倒价差方向。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "跨期价差合并损益"
      ],
      "precisionCalculation": {
        "operation": "calendarSpread",
        "inputs": [
          4000,
          4100,
          4050,
          4130,
          10
        ],
        "expected": 200
      }
    },
    {
      "id": "futures1-precision-010",
      "chapter": 6,
      "lessonId": "futures1-6",
      "topic": "认沽买方到期损益",
      "type": "single",
      "stem": "买入一份认沽，行权价100，权利金5，到期标的价80。所有金额按单位报价，不计费用，买方净收益为？",
      "options": [
        "-5元",
        "15元",
        "20元",
        "25元"
      ],
      "answer": 1,
      "explanation": "到期内在价值=max(100−80,0)=20，扣除已付权利金5，净收益15元。期权买方的到期收益与净利润需区分。",
      "rationales": [
        "本题认沽到期为实值，不能忽略20元的行权价值。",
        "到期内在价值=max(100−80,0)=20，扣除已付权利金5，净收益15元。期权买方的到期收益与净利润需区分。",
        "20元是到期行权价值，尚未扣除买入期权的权利金。",
        "权利金是买方支出，不能加到行权收入里。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "认沽买方到期损益"
      ],
      "precisionCalculation": {
        "operation": "longPut",
        "inputs": [
          80,
          100,
          5
        ],
        "expected": 15
      }
    },
    {
      "id": "futures1-precision-011",
      "chapter": 8,
      "lessonId": "futures1-8",
      "topic": "盯市盈利与流动性需求",
      "type": "single",
      "stem": "现货与期货组合最终对冲方向正确，但期货腿短期亏损需要追加保证金，现货收益暂未变现。突出反映何种问题？",
      "options": [
        "期货一时亏损即可证明套保逻辑必然错误",
        "现货未变现收益可自动直接充作全部保证金",
        "经济套保并不消除期间现金流和融资压力",
        "最终对冲有效就永远无需准备现金"
      ],
      "answer": 2,
      "explanation": "组合最终损益抵消不代表两条腿现金流同时到账。期货追加保证金可能先发生，现货未变现时仍需管理流动性储备。",
      "rationales": [
        "套保通常看组合而非单条腿，并须区分暂时和最终结果。",
        "实际可接受担保品及资金划转有规则，不能把未实现收益视为到账资金。",
        "组合最终损益抵消不代表两条腿现金流同时到账。期货追加保证金可能先发生，现货未变现时仍需管理流动性储备。",
        "期间追加保证金是独立的现金流需求，不能等到最终结算才考虑。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "盯市盈利与流动性需求"
      ]
    },
    {
      "id": "futures1-precision-012",
      "chapter": 8,
      "lessonId": "futures1-8",
      "topic": "名义敞口与保证金回报",
      "type": "single",
      "stem": "某期货持仓名义金额100万元，初始保证金10万元；有利方向变动1%，名义金额计算口径保持不变，不计费用，收益相对初始保证金为？",
      "options": [
        "1%",
        "100%",
        "0.1%",
        "10%"
      ],
      "answer": 3,
      "explanation": "持仓收益=100万元×1%=1万元；相对初始保证金10万元为10%。这不代表资产本身上涨10%，反向变动同样会放大保证金口径损失。",
      "rationales": [
        "1%是标的或名义敞口口径的变动，分母不是初始保证金。",
        "盈利1万元相对10万元保证金是十分之一，而不是全部本金。",
        "使用保证金作为分母时杠杆放大敏感度，不能反向缩小。",
        "持仓收益=100万元×1%=1万元；相对初始保证金10万元为10%。这不代表资产本身上涨10%，反向变动同样会放大保证金口径损失。"
      ],
      "source": "precisionMath",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "题干明示假设；公式与复算见精练审校说明",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "名义敞口与保证金回报"
      ],
      "precisionCalculation": {
        "operation": "marginReturn",
        "inputs": [
          100,
          10,
          0.01
        ],
        "expected": 10
      }
    }
  ],
  "futures2": [
    {
      "id": "futures2-precision-001",
      "chapter": 4,
      "lessonId": "futures2-4",
      "topic": "保证金形式的法律边界",
      "type": "single",
      "stem": "有人称期货交易保证金在法律上只能是现金，任何情况下都不能提交其他担保品。下列判断正确的是？",
      "options": [
        "法律还允许符合规定的高流动性证券等形式",
        "法律只允许人民币现钞",
        "投资者可自行决定任何收藏品都作保证金",
        "所有客户的任何股票都必须按市价全额接受"
      ],
      "answer": 0,
      "explanation": "《期货和衍生品法》第22条允许现金、国债、股票、基金份额、标准仓单等流动性强的证券，以及规定的其他财产；具体可用范围仍须符合业务规则。",
      "rationales": [
        "《期货和衍生品法》第22条允许现金、国债、股票、基金份额、标准仓单等流动性强的证券，以及规定的其他财产；具体可用范围仍须符合业务规则。",
        "法条明确列有符合要求的非现金担保形式，不能概括为仅现钞。",
        "法律允许规定形式并不等于可自行提交任何缺乏规则支持的物品。",
        "法律列举不代表无准入、折扣、额度或业务规则限制。"
      ],
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《期货和衍生品法》第22条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "保证金形式的法律边界"
      ]
    },
    {
      "id": "futures2-precision-002",
      "chapter": 4,
      "lessonId": "futures2-4",
      "topic": "当日无负债结算价格",
      "type": "single",
      "stem": "工作人员把“当日无负债结算”解释为一律按当日收盘最后一笔价格计算。依法最准确的纠正是？",
      "options": [
        "只在合约到期时才需要结算",
        "法律规定按照当日结算价进行结算",
        "结算价和收盘价在法律上永远完全相同",
        "应始终按客户最初开仓价逐日重新结算"
      ],
      "answer": 1,
      "explanation": "期货交易实行当日无负债结算，结算机构应按照当日结算价及时结算；结算价的业务计算规则不能被直接等同于最后成交价。",
      "rationales": [
        "这与法律明确规定的当日无负债结算制度不符。",
        "期货交易实行当日无负债结算，结算机构应按照当日结算价及时结算；结算价的业务计算规则不能被直接等同于最后成交价。",
        "不同品种的规则可能区分结算价和收盘价，不能一概等同。",
        "当日无负债结算并非每天都重新用原始开仓价重复计算累计损益。"
      ],
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《期货和衍生品法》第39条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "当日无负债结算价格"
      ]
    },
    {
      "id": "futures2-precision-003",
      "chapter": 4,
      "lessonId": "futures2-4",
      "topic": "客户保证金与自有资金",
      "type": "single",
      "stem": "期货经营机构想把客户保证金暂时转入自营账户，月底前归还。正确判断是？",
      "options": [
        "保证金进入机构账户后就变为机构自有收入",
        "只有客户投诉后才需分开存放",
        "应与自有资金分开、专户存放，不得违规挪用",
        "短期占用且月底归还即不受约束"
      ],
      "answer": 2,
      "explanation": "经营机构收取的交易者保证金、权利金应与自有资金分开并专户存放，不得违反规定挪用；临时占用和计划归还不能使挪用合法。",
      "rationales": [
        "收取客户保证金不使担保财产变为机构可以自由支配的经营收入。",
        "资金隔离义务持续存在，不以投诉或损失发生为触发前提。",
        "经营机构收取的交易者保证金、权利金应与自有资金分开并专户存放，不得违反规定挪用；临时占用和计划归还不能使挪用合法。",
        "占用期限和事后返还不是违规挪用的当然豁免条件。"
      ],
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《期货和衍生品法》第40条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "客户保证金与自有资金"
      ]
    },
    {
      "id": "futures2-precision-004",
      "chapter": 4,
      "lessonId": "futures2-4",
      "topic": "追加保证金时限",
      "type": "single",
      "stem": "客户保证金不足，有人称所有期货品种一律享有固定三天补足期。依法应怎样理解？",
      "options": [
        "法律对所有情况都无条件规定三天宽限",
        "只要投资者拒绝通知，机构就不得处理",
        "机构可以完全不依规定和约定任意平仓",
        "按规定通知，并依约定及业务规则及时补足或自行平仓"
      ],
      "answer": 3,
      "explanation": "法律要求保证金不足时通知追加或自行平仓；未按规定、约定及时处理的，依规则采取强行平仓等措施。不能编造适用于所有品种的统一三天宽限期。",
      "rationales": [
        "题述统一三天并非法条给出的普遍标准，实际应查适用规则与合同。",
        "拒绝接收不自动免除保证金义务，风险处置须按适用规则进行。",
        "风险处置同样受法律、业务规则和合同约束，不是无限裁量。",
        "法律要求保证金不足时通知追加或自行平仓；未按规定、约定及时处理的，依规则采取强行平仓等措施。不能编造适用于所有品种的统一三天宽限期。"
      ],
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《期货和衍生品法》第41条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "追加保证金时限"
      ]
    },
    {
      "id": "futures2-precision-005",
      "chapter": 4,
      "lessonId": "futures2-4",
      "topic": "交割不只实物",
      "type": "single",
      "stem": "下列关于期货合约交割的说法，哪项符合法律框架？",
      "options": [
        "可采用实物交割或按规定进行现金交割",
        "所有期货合约均须把实物送到仓库",
        "现金交割是经纪机构可随意替客户决定的",
        "只要现金交割，就不再存在任何价格风险"
      ],
      "answer": 0,
      "explanation": "法律同时规定实物交割和现金交割；具体适用方式由合约与业务规则决定，不能因为名称是期货就认为必须运送实物。",
      "rationales": [
        "法律同时规定实物交割和现金交割；具体适用方式由合约与业务规则决定，不能因为名称是期货就认为必须运送实物。",
        "现金交割也是法律认可的交割方式，不是所有合约都运送实物。",
        "具体方式受合约与业务规则约束，不能由机构任意更改。",
        "现金交割方式不意味着合约在到期前没有价格波动和损益风险。"
      ],
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《期货和衍生品法》第44、45条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "交割不只实物"
      ]
    },
    {
      "id": "futures2-precision-006",
      "chapter": 3,
      "lessonId": "futures2-3",
      "topic": "从业人员私下受托",
      "type": "single",
      "stem": "客户希望绕开期货经营机构正式渠道，私下请从业人员接受委托交易。从业人员应如何处理？",
      "options": [
        "盈利后补录为机构业务即可合规",
        "不得私下接受交易者委托进行期货交易",
        "客户自愿付费就可以私下接单",
        "仅为亲友交易即可当然豁免"
      ],
      "answer": 1,
      "explanation": "期货经营机构从业人员不得私下接受交易者委托进行期货交易。客户自愿、亲友关系或工作人员经验丰富，都不能取代正式业务规范。",
      "rationales": [
        "事后补录不能抹去绕开正式渠道私下接受委托的原始行为。",
        "期货经营机构从业人员不得私下接受交易者委托进行期货交易。客户自愿、亲友关系或工作人员经验丰富，都不能取代正式业务规范。",
        "双方愿意不排除法律对从业人员私下受托的禁止。",
        "亲友关系本身并不是法条列明的任意私下受托交易许可。"
      ],
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《期货和衍生品法》第69条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "从业人员私下受托"
      ]
    },
    {
      "id": "futures2-precision-007",
      "chapter": 5,
      "lessonId": "futures2-5",
      "topic": "不得承诺本金不损失",
      "type": "single",
      "stem": "期货经营机构销售人员为争取客户，承诺账户本金绝不受损，亏损由机构全额补偿。正确判断是？",
      "options": [
        "只有书面承诺受限制，口头承诺均允许",
        "只向大额客户承诺便没有问题",
        "不得向交易者保证本金不受损失或最低收益",
        "只要客户签署风险揭示就可同时保本承诺"
      ],
      "answer": 2,
      "explanation": "《期货和衍生品法》禁止期货经营机构向交易者作出本金不受损失或最低收益的承诺；营销目标不能替代如实风险揭示。",
      "rationales": [
        "法条针对承诺行为，不能自行把口头形式全部排除。",
        "交易规模不是该禁止性规定的当然豁免条件。",
        "《期货和衍生品法》禁止期货经营机构向交易者作出本金不受损失或最低收益的承诺；营销目标不能替代如实风险揭示。",
        "风险揭示签字不能使相反的保本或最低收益承诺自动合法。"
      ],
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《期货和衍生品法》第78条第1项",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "不得承诺本金不损失"
      ]
    },
    {
      "id": "futures2-precision-008",
      "chapter": 3,
      "lessonId": "futures2-3",
      "topic": "未送达指令与虚假报告",
      "type": "single",
      "stem": "经营机构收到客户委托后未将指令送至交易场所，却出具已成交的报告。哪项判断正确？",
      "options": [
        "只要机构内部模拟出相同价格就视为成交",
        "客户看不到账外处理便不存在违规",
        "最终向客户支付盈利即可免除全部责任",
        "未按规定送达指令及虚假交易报告均有违法风险"
      ],
      "answer": 3,
      "explanation": "经营机构不得提供虚假成交回报或账户报告，也不得不按规定将交易者指令送达交易场所。本案同时涉及交易执行与记录真实性。",
      "rationales": [
        "内部模拟记录不能替代真实送达与依法成交。",
        "客户是否及时发现不改变真实执行和如实报告义务。",
        "事后付款不把虚假交易报告和未按规定送达指令变成合规。",
        "经营机构不得提供虚假成交回报或账户报告，也不得不按规定将交易者指令送达交易场所。本案同时涉及交易执行与记录真实性。"
      ],
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《期货和衍生品法》第78条第5、6项",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "未送达指令与虚假报告"
      ]
    },
    {
      "id": "futures2-precision-009",
      "chapter": 1,
      "lessonId": "futures2-1",
      "topic": "交易所与交易者的角色",
      "type": "single",
      "stem": "某期货交易所拟以自有资金参与自己组织的期货交易，声称更懂规则所以安全。正确判断是？",
      "options": [
        "交易所不得直接或间接参与期货交易",
        "交易所了解市场就可以自营获利",
        "只要通过关联账户参与就不算参与",
        "交易所只须不亏损就可参与"
      ],
      "answer": 0,
      "explanation": "期货交易所组织和监督交易、实行自律管理；法律明确规定交易所不得直接或间接参与期货交易，角色不能混同。",
      "rationales": [
        "期货交易所组织和监督交易、实行自律管理；法律明确规定交易所不得直接或间接参与期货交易，角色不能混同。",
        "熟悉规则不能消除组织监督角色与参与交易之间的法律边界。",
        "法律同时禁止直接和间接参与，不能借关联账户规避。",
        "交易结果不是是否允许交易所参与期货交易的判断标准。"
      ],
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《期货和衍生品法》第85条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "交易所与交易者的角色"
      ]
    },
    {
      "id": "futures2-precision-010",
      "chapter": 4,
      "lessonId": "futures2-4",
      "topic": "中央对手方职责",
      "type": "single",
      "stem": "期货结算机构作为中央对手方承担的核心职责是什么？",
      "options": [
        "只提供行情显示而不参与结算",
        "成为结算参与人的共同对手方，净额结算并提供集中履约保障",
        "保证每一位交易者的投资收益为正",
        "替交易者决定买卖方向和仓位"
      ],
      "answer": 1,
      "explanation": "中央对手方介入结算、成为共同交易对手方，实施净额结算并为集中履约提供保障；这不同于保证交易者投资本金不亏损。",
      "rationales": [
        "行情服务并非中央对手方介入与净额结算职责的替代。",
        "中央对手方介入结算、成为共同交易对手方，实施净额结算并为集中履约提供保障；这不同于保证交易者投资本金不亏损。",
        "集中履约保障并不承诺投资收益，也不消除市场价格风险。",
        "结算职责不等于取得客户投资决策权。"
      ],
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《期货和衍生品法》第93条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "中央对手方职责"
      ]
    },
    {
      "id": "futures2-precision-011",
      "chapter": 1,
      "lessonId": "futures2-1",
      "topic": "异常交易措施的解除",
      "type": "single",
      "stem": "交易所因异常情况依规则采取紧急措施，异常情况已经消失。依法应如何处理？",
      "options": [
        "只有所有投资者书面同意后才能解除",
        "异常消失后可无条件继续扩大限制",
        "及时取消相关紧急措施",
        "紧急措施一经采取就永久保留"
      ],
      "answer": 2,
      "explanation": "紧急措施应服务于异常情况处置；异常情况消失后，期货交易所应及时取消措施，不能将应急状态无条件长期化。",
      "rationales": [
        "法律并未把全体交易者一致书面同意设为解除的普遍前提。",
        "扩大限制仍需有规则依据，不能脱离异常处置目的任意实施。",
        "紧急措施应服务于异常情况处置；异常情况消失后，期货交易所应及时取消措施，不能将应急状态无条件长期化。",
        "应急措施与异常状态有关，法律要求异常消失后及时取消。"
      ],
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《期货和衍生品法》第87条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "异常交易措施的解除"
      ]
    },
    {
      "id": "futures2-precision-012",
      "chapter": 8,
      "lessonId": "futures2-8",
      "topic": "记录真实与留存",
      "type": "single",
      "stem": "经营机构为掩盖差错，计划删除委托记录并把成交记录改成更有利的价格。下列判断正确的是？",
      "options": [
        "只要客户最终没有亏损就可以改写记录",
        "业务负责人签字即可授权销毁事实",
        "电子记录不属于应当保护的业务资料",
        "不得隐匿、伪造、篡改或毁损依法应保存的记录"
      ],
      "answer": 3,
      "explanation": "期货经营机构等应妥善保存有关业务和内部管理资料，任何人不得隐匿、伪造、篡改或毁损。差错更正须保留真实可追溯记录，而非重写事实。",
      "rationales": [
        "记录真实性要求不以客户损益为唯一判断条件。",
        "内部授权不能排除依法保存资料及禁止篡改的要求。",
        "业务资料的电子形式不使其脱离依法保存及真实性要求。",
        "期货经营机构等应妥善保存有关业务和内部管理资料，任何人不得隐匿、伪造、篡改或毁损。差错更正须保留真实可追溯记录，而非重写事实。"
      ],
      "source": "futuresLawReview",
      "sourceKind": "original",
      "origin": "原创易错精练 · 非真题",
      "difficulty": "applied",
      "editorialBatch": "2026-10-13-precision",
      "reviewedAt": "2026-10-13",
      "referenceSection": "《期货和衍生品法》第117条",
      "reviewNote": "题干与解析为本项目编写；法规题按所列条文核对，计算题按明示假设复算。非官方命题或官方审定；实际业务适用最新规则与合同。",
      "conceptIds": [
        "记录真实与留存"
      ]
    }
  ]
};
