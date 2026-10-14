// Use on a stable source snapshot before CI/publication; never alters question content.
import {readFileSync,writeFileSync} from 'node:fs';
import {SUBJECTS} from '../src/subjects.js';
import {EXPANSION_QUESTIONS} from '../src/expansion-questions.js';
const release=JSON.parse(readFileSync('src/release.json','utf8'));
const total=Object.values(SUBJECTS).reduce((n,s)=>n+s.QUESTIONS.length,0),added=Object.values(EXPANSION_QUESTIONS).flat().length;
const complete=process.argv.includes('--complete');
if(complete&&total<5784)throw Error(`Cannot mark doubling complete: ${total} < 5784`);
Object.assign(release,{version:'2026-10-14.2',questionCount:total,newExpansionQuestions:added,expansionTarget:5784,expansionStatus:complete?'complete':'in-progress'});
writeFileSync('src/release.json',JSON.stringify(release,null,2)+'\n');
const html=readFileSync('index.html','utf8').replace(/95章系统课程、\d+道训练题/,`95章系统课程、${total}道训练题`);
writeFileSync('index.html',html);
console.log({total,added,status:release.expansionStatus});
