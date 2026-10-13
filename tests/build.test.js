import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,cpSync,mkdirSync,writeFileSync,readFileSync,rmSync,readdirSync,existsSync,appendFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname,resolve} from 'node:path';
import {execFileSync} from 'node:child_process';

test('static build versions HTML and all relative imports together, reproducibly',()=>{
 const root=mkdtempSync(join(tmpdir(),'zhiquan-build-'));
 try {
  for(const path of ['index.html','favicon.svg','src'])cpSync(path,join(root,path),{recursive:true});
  mkdirSync(join(root,'scripts'));cpSync('scripts/build.js',join(root,'scripts/build.js'));
  writeFileSync(join(root,'package.json'),'{"type":"module"}');
  const build=()=>{execFileSync(process.execPath,['scripts/build.js'],{cwd:root});return JSON.parse(readFileSync(join(root,'dist/version.json'),'utf8')).assetVersion;};
  const version=build();assert.match(version,/^[a-f0-9]{12}$/);
  const html=readFileSync(join(root,'dist/index.html'),'utf8');
  assert.ok(html.includes('app.js?v='+version));assert.ok(html.includes('studio.css?v='+version));
  let imports=0;
  for(const path of readdirSync(join(root,'dist/src')).filter(p=>p.endsWith('.js'))){
   const source=readFileSync(join(root,'dist/src',path),'utf8');
   for(const match of source.matchAll(/(?:from\s+|import\s*\(\s*)['"](\.{1,2}\/[^'"\s]+\.js)(\?[^'"]*)?['"]/g)){
    imports++;assert.equal(match[2],'?v='+version,path+' -> '+match[1]);
    assert.ok(existsSync(resolve(root,'dist/src',dirname(path),match[1])));
   }
  }
  assert.ok(imports>20);assert.equal(build(),version);
  appendFileSync(join(root,'src/studio.css'),'\n/* change */\n');assert.notEqual(build(),version);
 } finally {rmSync(root,{recursive:true,force:true});}
});
