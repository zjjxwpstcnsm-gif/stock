import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist');
for (const p of ['index.html', 'favicon.svg', 'src']) await cp(p, `dist/${p}`, { recursive: true });
await writeFile('dist/.nojekyll', '');
console.log('Built static site to dist/');
