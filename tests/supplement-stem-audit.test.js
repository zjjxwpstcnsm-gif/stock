import test from 'node:test';
import assert from 'node:assert/strict';
import {SUPPLEMENT} from '../src/supplement-questions.js';
// Independently read all numbers from the visible stems, not stored calculation inputs.
const models={
'delta-position':([u,n,d,ds])=>u*n*d*ds,
'gamma-adjust':([d,g,s])=>d+g*s,
'vega-position':([v,n,s,t])=>v*n*(t-s),
 'theta-position':([t,n,d])=>t*n*d,
 'rho-position':([r,n,dr])=>r*n*dr,
 'put-insurance':([s,k,p])=>s+p-k,
 'covered-upside':([s,k,p])=>k+p-s,
 'credit-spread':([w,c])=>w-c,
 'net-assets':([a,l])=>a-l,
 'fee-rate':([a,f,d])=>a*f/100/d,
 'subscription-units':([a,f,n])=>a/(1+f/100)/n,
 'redemption-net':([s,n,f])=>s*n*(1-f/100),
 'cash-distribution':([s,d])=>s*d,
 'expense-impact':([a,f,s])=>(a-f)/s,
 'reinvest-shares':([s,d,n])=>s*d/n,
 'holding-return':([a,b,d])=>(b+d-a)/a*100,
 postmoney:([p,c])=>p+c,
 stake:([p,c])=>c/(p+c)*100,
 'enterprise-bridge':([v,c,d])=>v+c-d,
 dpi:([p,d])=>d/p,
 rvpi:([p,r])=>r/p,
 tvpi:([p,d,r])=>(d+r)/p,
 'cash-waterfall':([c,p,f])=>(c-p)*f/100,
 'cash-call':([c,p])=>c-p,
 discount:([c,r])=>c/(1+r/100),
 duration:([d,y])=>-d*y,
 'nominal-value':([p,u,n])=>p*u*n,
 margin:([v,r])=>v*r/100,
 pnl:([n,u,p,q])=>n*u*(q-p),
 basis:([s,f])=>s-f,
 'index-fair':([s,r,q,t])=>s*(1+(r-q)/100*t),
 'call-profit':([k,p,s])=>Math.max(s-k,0)-p,
};
test('480 displayed numeric stems independently solve to the selected answers and walkthrough results',()=>{
let checked=0, failures=[];
for(const bank of Object.values(SUPPLEMENT))for(const q of bank){
 const key=q.id.replace(/^\w+-drill-/,'').replace(/-\d+$/,'');
 const nums=[...q.stem.matchAll(/[−-]?\d+(?:\.\d+)?/g)].map(m=>Number(m[0].replace('−','-')));
 const computed=Math.round(models[key](nums)*1e4)/1e4;
 const correct=Number(q.options[q.answer].match(/[-−]?\d+(\.\d+)?/)[0].replace('−','-'));
 if(Math.abs(computed-correct)>1e-7)failures.push({id:q.id,computed,correct,nums});
 if(!q.explanation.includes('＝'+q.options[q.answer]+'。'))failures.push({id:q.id,error:'no final answer'});
 checked++;
}
assert.equal(checked,480);assert.deepEqual(failures,[]);
});
