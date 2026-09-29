import { test } from 'node:test';
import assert from 'node:assert/strict';
import { FUND_CONFIGS, FUND_SOURCES } from '../src/fund-config.js';
import { FUND_QUESTIONS } from '../src/fund-questions.js';
import { FUND_LESSONS } from '../src/fund-course-data.js';
import { createExamEngine, remainingSeconds } from '../src/engine.js';

test('three isolated 100-question banks have valid options, chapter links and honest source labels', () => {
 const ids=new Set();
 for(const [subject, bank] of Object.entries(FUND_QUESTIONS)) {
  assert.equal(bank.length,100); assert.equal(new Set(bank.map(q=>q.stem)).size,100);
  assert.deepEqual([1,2,3,4,5].map(c=>bank.filter(q=>q.chapter===c).length),[20,20,20,20,20]);
  for(const q of bank){
   assert.ok(!ids.has(q.id));ids.add(q.id);
   assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4,q.id);
   assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4);
   assert.ok(q.explanation.length>20&&FUND_SOURCES[q.source]);assert.match(q.origin,/原创模拟.*非真题/);
  }
  const lessons=FUND_LESSONS[subject];assert.equal(lessons.length,5);
  for(const [i,l] of lessons.entries()){
   assert.equal(l.practice,i+1);assert.ok(l.sections.length>=3);
   assert.ok(l.sections.every(section=>section.title && section.html),l.id);
   assert.ok(l.sources.every(id=>FUND_SOURCES[id]));assert.ok(l.check.options[l.check.answer]);
  }
 }
 assert.equal(ids.size,300);
 assert.equal(Object.values(FUND_QUESTIONS).flat().filter(q=>q.calculation).length,120);
});

for(const [subject,config] of Object.entries(FUND_CONFIGS))test(`${subject}: full paper, exact 59/60/100 boundaries, 120-minute deadline and cross-subject rejection`,()=>{
 const bank=FUND_QUESTIONS[subject],engine=createExamEngine(config);
 const ids=engine.makePaper(bank,'standard');assert.equal(ids.length,100);assert.equal(new Set(ids).size,100);
 const s=engine.makeSession(ids,'exam','standard',1000);
 assert.equal(remainingSeconds(s,1000),7200);assert.equal(remainingSeconds(s,7201000),0);
 assert.ok(engine.validSession(s,bank));
 for(const correct of [59,60,100]){
  s.answers={};ids.slice(0,correct).forEach(id=>s.answers[id]=bank.find(q=>q.id===id).answer);
  const g=engine.grade(s,bank);assert.equal(g.score,correct);assert.equal(g.passed,correct>=60);assert.equal(g.sectionPass,true);
 }
 const other=Object.keys(FUND_CONFIGS).find(id=>id!==subject);
 assert.equal(createExamEngine(FUND_CONFIGS[other]).validSession(s,FUND_QUESTIONS[other]),false);
 assert.equal(engine.validSession({...s,version:'invalid'},bank),false);
 assert.throws(()=>engine.makePaper(bank.slice(0,99),'standard'),/题量不足/);
});

// Independent expectations for each family, evaluated from stored inputs rather than displayed answers.
const solve = {
 nav:([a,l,s])=>(a-l)/s,subscribe:([a,f,n])=>a/((1+f)*n),redeem:([s,n,f])=>s*n-s*n*f,
 dailyFee:([a,r,d])=>a/d*r,holdingReturn:([b,e,c])=>((e+c)/b-1)*100,
 fv:([p,r,n])=>{for(let i=0;i<n;i++)p+=p*r;return p;},pv:([f,r,n])=>{for(let i=0;i<n;i++)f/=1+r;return f;},
 pe:([p,e])=>p/e,currentRatio:([a,d])=>a/d,roe:([p,e])=>100*p/e,
 portfolioReturn:([w,a,b])=>100*(b+w*(a-b)),capm:([rf,b,m])=>100*(b*m+(1-b)*rf),sharpe:([r,rf,s])=>(r-rf)/s,
 duration:([d,y])=>100*d*y,drawdown:([p,t])=>100*(1-t/p),exDividend:([n,d])=>n-d,premium:([p,n])=>100*(p/n-1),
 postMoney:([p,i])=>p+i,ownership:([p,i])=>100/(p/i+1),equityBridge:([ev,d,c])=>ev-(d-c),multiple:([p,m])=>p*m,
 uncalled:([c,p])=>c-p,dpi:([p,d])=>d/p,rvpi:([p,r])=>r/p,tvpi:([p,d,r])=>d/p+r/p,
 irrOneYear:([p,r])=>100*(r-p)/p,carry:([c,p,r])=>p*r-c*r,
};
test('all 120 numerical cases recompute with correct units and exactly one valid choice',()=>{
 const kinds=new Set();
 for(const q of Object.values(FUND_QUESTIONS).flat().filter(q=>q.calculation)){
  const {kind,input,value,precision,unit}=q.calculation;kinds.add(kind);
  assert.ok(solve[kind],kind);const expected=solve[kind](input);
  assert.ok(Math.abs(value-expected)<1e-7,q.id);
  const formatted=`${expected.toFixed(precision)} ${unit}`;
  assert.equal(q.options[q.answer],formatted,q.id);
  assert.equal(q.options.filter(v=>v===formatted).length,1,q.id);
 }
 assert.equal(kinds.size,27);
});
