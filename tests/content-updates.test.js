import test from 'node:test';
import assert from 'node:assert/strict';
import {SUBJECTS} from '../src/subjects.js';
import {editorialBatches,currentContent} from '../src/content-updates.js';
test('reviewed case shortcuts expose precise per-subject batches without leaking answers',()=>{
 for(const s of Object.values(SUBJECTS)){
  const batches=editorialBatches(s),html=currentContent(s);
  assert.equal(new Set(batches.map(b=>b.id)).size,batches.length);
  for(const b of batches)assert.equal(b.count,s.QUESTIONS.filter(q=>q.editorialBatch===b.id).length);
  if(['fund1','fund2','fund3','securities2','futures2'].includes(s.id)){
   assert.ok(html.includes('本轮内容补强'));assert.ok(html.includes('原创应用题'));
   assert.ok(!html.includes('<select'));assert.ok(!html.includes('<input'));
   for(const q of s.QUESTIONS)assert.ok(!html.includes(q.explanation));
  }else assert.equal(html,'');
 }
});
