import { cp, mkdir, rm, writeFile, readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

async function filesIn(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await filesIn(path));
    else files.push(path);
  }
  return files.sort();
}
const files = ['index.html', 'favicon.svg', ...await filesIn('src')];
const hash = createHash('sha256');
for (const file of files) hash.update(file).update(await readFile(file));
const version = hash.digest('hex').slice(0, 12);
await rm('dist', { recursive: true, force: true });
await mkdir('dist');
for (const path of ['index.html', 'favicon.svg', 'src']) await cp(path, `dist/${path}`, { recursive: true });
// Version the complete module graph, not just app.js: an old cached dependency
// must never be paired with a new entry module after a Pages deployment.
for (const path of files.filter(path => path.endsWith('.js'))) {
  const text = await readFile(path, 'utf8');
  const rewritten = text.replace(/((?:from\s+|import\s*(?:\(\s*)?)['"])(\.{1,2}\/[^'"\s]+\.js)(?:\?[^'"]*)?(['"])/g,
    (_match, prefix, specifier, quote) => `${prefix}${specifier}?v=${version}${quote}`);
  await writeFile(`dist/${path}`, rewritten);
}
const html = (await readFile('index.html', 'utf8')).replace(/((?:src|href)=")(\.\/src\/[^"?]+\.(?:js|css))(?:\?[^"]*)?(")/g,
  (_match, prefix, path, quote) => `${prefix}${path}?v=${version}${quote}`);
await writeFile('dist/index.html', html);
await writeFile('dist/version.json', JSON.stringify({ assetVersion: version }) + '\n');
await writeFile('dist/.nojekyll', '');
console.log(`Built static site to dist/ (asset version ${version})`);
