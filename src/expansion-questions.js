// Explicitly authored batches. Aggregation creates no question variants.
import {EXPANSION_FUND_GOVERNANCE_QUESTIONS as governance,EXPANSION_FUND_GOVERNANCE_SOURCES as governanceSources} from './expansion-fund-governance.js';
import {EXPANSION_INVESTMENT_QUESTIONS as investment,EXPANSION_INVESTMENT_SOURCES as investmentSources} from './expansion-investment.js';
import {EXPANSION_DERIVATIVES_QUESTIONS as derivatives,EXPANSION_DERIVATIVES_SOURCES as derivativesSources} from './expansion-derivatives.js';
import {EXPANSION_REGULATION_QUESTIONS as regulation,EXPANSION_REGULATION_SOURCES as regulationSources} from './expansion-regulation.js';
import {EXPANSION_INTERMEDIATION_QUESTIONS as intermediation,EXPANSION_INTERMEDIATION_SOURCES as intermediationSources} from './expansion-intermediation.js';
export const EXPANSION_QUESTIONS=Object.fromEntries(['options','fund1','fund2','fund3','securities1','securities2','futures1','futures2'].map(id=>[id,[...(governance[id]||[]),...(investment[id]||[]),...(derivatives[id]||[]),...(regulation[id]||[]),...(intermediation[id]||[])]]));
export const EXPANSION_SOURCES={...governanceSources,...investmentSources,...derivativesSources,...regulationSources,...intermediationSources};
