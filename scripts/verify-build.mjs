import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { redirects } from '../src/data/redirects.mjs';

const root = path.resolve('dist');
const base = (process.env.BASE_PATH || '/website').replace(/\/$/,'');
const site = process.env.SITE_URL || 'https://ejmeitz.github.io';
const origin = new URL(site).origin;
async function walk(dir) { return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]))).flat(); }
const files = await walk(root);
const pages = files.filter(f=>f.endsWith('.html'));
const errors=[];
const exists = async p => { try { await access(p); return true; } catch { return false; } };
for (const file of pages) {
  const html=await readFile(file,'utf8');
  const relative=path.relative(root,file).replaceAll('\\','/');
  if (!/<html[^>]*lang="en"/.test(html)) errors.push(`${relative}: missing language`);
  if (!/<title>.+?<\/title>/.test(html)) errors.push(`${relative}: missing title`);
  if (!html.includes('name="viewport"')) errors.push(`${relative}: missing viewport`);
  if (/(mailto:|@gmail\.com|@andrew\.cmu\.edu|612[\s-]?272)/i.test(html)) errors.push(`${relative}: private contact details exposed`);
  if (/(googletagmanager|google-analytics|goatcounter|\/views["'])/i.test(html)) errors.push(`${relative}: unexpected analytics`);
  for (const match of html.matchAll(/<(?:a|link|script|img|source|video)\b[^>]*?\s(?:href|src)="([^"]+)"/g)) {
    const value=match[1].replaceAll('&amp;','&');
    if (/^(data:|mailto:|tel:|#)/.test(value)) continue;
    const current = new URL(`${base}/${relative.replace(/index\.html$/,'')}`,site);
    const target=new URL(value,current);
    if (target.origin!==origin) continue;
    if (base && target.pathname!==base && !target.pathname.startsWith(`${base}/`)) { errors.push(`${relative}: escapes base path: ${value}`); continue; }
    const local=path.join(root,decodeURIComponent(target.pathname.slice(base.length)));
    const resolved = path.extname(local) ? local : path.join(local,'index.html');
    if (!(await exists(resolved))) errors.push(`${relative}: missing target: ${value}`);
    else if(target.hash && resolved.endsWith('.html')) {
      const dest = await readFile(resolved,'utf8');
      if (!dest.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`)) errors.push(`${relative}: missing anchor: ${value}`);
    }
  }
}
for (const [oldPath,target] of Object.entries(redirects)) {
  const html = await readFile(path.join(root,oldPath,'index.html'),'utf8');
  assert.ok(html.includes(`url=${base}/${target}`),`Redirect ${oldPath} has wrong base`);
}
const robots=await readFile(path.join(root,'robots.txt'),'utf8');
assert.ok(robots.includes(`${origin}${base}/sitemap-index.xml`),'Incorrect sitemap location');
const index=await readFile(path.join(root,'index.html'),'utf8');
assert.ok(index.includes(`rel="canonical" href="${origin}${base}/"`),'Incorrect homepage canonical');
assert.ok(!files.some(f=>/\.docx$|resume\.pdf$/i.test(f)),'Private document unexpectedly included');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Verified ${pages.length} HTML pages: local links, anchors, legacy redirects, hosting base, canonical, sitemap, and privacy checks passed.`);
