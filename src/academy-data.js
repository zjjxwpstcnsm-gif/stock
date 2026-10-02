import { SECURITIES_UNITS } from './securities-curriculum.js';
import { FUTURES_UNITS } from './futures-curriculum.js';
import { ACADEMY_SOURCES } from './academy-sources.js';
export const TEACHING_UNITS={...SECURITIES_UNITS,...FUTURES_UNITS};
export const TYPE_NAMES={single:'单选题',multiple:'多选题',judge:'判断题',case:'综合题'};
const combinations=['仅Ⅰ正确','仅Ⅱ正确','Ⅰ和Ⅱ均正确','Ⅰ和Ⅱ均不正确'];
const html=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const ACADEMY_QUESTIONS={},ACADEMY_LESSONS={};
for(const [subject,units] of Object.entries(TEACHING_UNITS)){
 const source=subject.startsWith('securities')?'securitiesOutline':'futuresLaw';
 const bank=[],lessons=[];
 for(const [index,u] of units.entries()){
  const chapter=index+1,lessonId=`${subject}-${chapter}`;
  const add=(type,key,stem,options,answer,explanation,conceptIds)=>bank.push({id:`${subject}-${chapter}-${key}`,chapter,lessonId,topic:u.title,type,stem,options,answer,explanation,source,sourceKind:'original',origin:'原创练习 · 非真题',conceptIds});
  // Different task formats revisit the same concepts; counts do not imply
  // independent syllabus points. The topic/format is exposed in the interface.
  for(let n=0;n<8;n++){
   const a=n%u.rows.length,b=(n+1+Math.floor(n/u.rows.length))%u.rows.length;
   const t1=n%3!==0,t2=n%4<2;
   const first=u.rows[a],second=u.rows[b];
   add('single',`s${n+1}`,`关于${first[0]}与${second[0]}，判断以下两项表述：\nⅠ．${first[t1?1:2]}。\nⅡ．${second[t2?1:2]}。`,combinations,t1?(t2?2:0):(t2?1:3),`Ⅰ${t1?'正确':'错误'}，Ⅱ${t2?'正确':'错误'}。${first[1]}；${second[1]}。`,[first[0],second[0]]);
  }
  u.rows.forEach((r,n)=>{
   const truth=n%2===0;
   add('judge',`j${n+1}`,`判断正误：${r[truth?1:2]}。`,['正确','错误'],truth?0:1,`${r[1]}。不能把相近概念或适用条件混为一谈。`,[r[0]]);
  });
  for(let n=0;n<4;n++){
   const a=u.rows[n%u.rows.length],b=u.rows[(n+1)%u.rows.length];
   const raw=[a[1],b[1],a[2],b[2]],offset=(chapter+n)%4;
   const options=[...raw.slice(offset),...raw.slice(0,offset)];
   add('multiple',`m${n+1}`,`关于${a[0]}与${b[0]}，哪些表述成立？（多选）`,options,[0,1].map(i=>(i-offset+4)%4).sort(),`${a[1]}；${b[1]}。本题须选全所有正确项，多选、少选或错选不得分。`,[a[0],b[0]]);
   const r=u.rows[(n+2)%u.rows.length],p=u.rows[(n+3)%u.rows.length];
   const first=n%2===0,second=n<2;
   add('case',`c${n+1}`,`情景：${r[3]}。会议上两位同事提出以下意见：\nⅠ．${r[first?1:2]}。\nⅡ．${p[second?1:2]}。\n哪项判断恰当？`,combinations,first?(second?2:0):(second?1:3),`应分别判断意见与适用条件。${r[1]}；${p[1]}。${u.pitfall}`,[r[0],p[0]]);
  }
  const first=bank.find(q=>q.chapter===chapter&&q.type==='single');
  const sources=subject.startsWith('securities')?['securitiesOutline','securitiesLaw']:['futuresLaw','futuresExam'];
  const table=`<div class="table-scroll"><table><thead><tr><th>知识点</th><th>正确理解</th><th>易错表述</th></tr></thead><tbody>${u.rows.map(r=>`<tr><td>${html(r[0])}</td><td>${html(r[1])}</td><td>${html(r[2])}</td></tr>`).join('')}</tbody></table></div>`;
  lessons.push({id:lessonId,short:u.title,title:u.title,intro:u.intro,takeaway:u.rows[0][1],stage:'概念 · 案例 · 辨析',minutes:12,practice:chapter,sources,pitfall:u.pitfall,
   sections:[{title:'从问题到原理',html:`<p>${html(u.framework)}</p>`},{title:'建立知识结构',html:table},{title:'一步一步看案例',html:`<div class="worked-example"><span>应用案例</span><p>${html(u.example)}</p></div>`},{title:'把判断迁移到工作中',html:`<p>${u.rows.slice(0,3).map(r=>`遇到“${html(r[3])}”，先识别${html(r[0])}：${html(r[1])}。`).join('</p><p>')}</p><p>复习时按“主体—行为—条件—程序—责任”确认规则；计算时先统一本金、期间、单位与费用。数字、期限、例外和新增规范，应回到当次大纲与有效原文核对。</p>`}],
   check:{question:first.stem,options:first.options,answer:first.answer,explanation:first.explanation}});
 }
 ACADEMY_QUESTIONS[subject]=bank;ACADEMY_LESSONS[subject]=lessons;
}
const metadata={
 securities1:{name:'金融市场基础知识',short:'证券 · 金融基础',family:'证券水平评价',number:1},
 securities2:{name:'证券市场基本法律法规',short:'证券 · 法律法规',family:'证券水平评价',number:2},
 futures1:{name:'期货基础知识',short:'期货 · 基础知识',family:'期货从业',number:1},
 futures2:{name:'期货法律法规',short:'期货 · 法律法规',family:'期货从业',number:2},
};
export const ACADEMY_CONFIGS=Object.fromEntries(Object.entries(metadata).map(([id,m])=>{
 const future=id.startsWith('futures'),version=`${id}-2026-10-03.1`;
 return [id,{...m,id,isFund:false,isAcademy:true,BANK_VERSION:version,COMPATIBLE_BANK_VERSIONS:[version],SOURCES:ACADEMY_SOURCES,COURSE_SOURCES:{},
  CHAPTERS:Object.fromEntries(TEACHING_UNITS[id].map((u,i)=>[i+1,{name:u.title,short:u.title,desc:u.intro,level:1}])),
  PROFILES:{standard:{name:`${m.name}综合模拟`,tag:future?'四种题型 · 按官方介绍分值':'四种题型 · 教学配比',minutes:future?100:120,points:future?null:100/120,pass:60,quotas:{},typeQuotas:{single:60,multiple:30,judge:20,case:future?20:10},typePoints:future?{single:.5,multiple:1,judge:.5,case:1.5}:null,desc:future?'130题 · 100分钟 · 100分制':'120题 · 120分钟 · 正确率60%'}}}];
}));
