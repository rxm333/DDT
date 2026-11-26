// Contrôles après « npm run build » : chaque page est complète pour Google et n'a plus de vieux liens.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? (['site-scripts', 'images', 'studio'].includes(f) ? [] : walk(join(d, f))) : [join(d, f)]));
const pages = walk(DIST).filter((f) => f.endsWith('.html') && !f.endsWith('style-guide.html'));
const errors = [];
const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');

for (const file of pages) {
  const rel = file.slice(DIST.length);
  const html = readFileSync(file, 'utf8');
  const fail = (msg) => errors.push(`${rel} : ${msg}`);
  if (!/<html[^>]*lang="fr"/.test(html)) fail('lang="fr" manquant');
  if (!/<title>[^<]{10,}<\/title>/.test(html)) fail('titre manquant ou trop court');
  if (!/<meta content="[^"]{50,}" name="description">/.test(html)) fail('description manquante ou trop courte');
  if (!/<link rel="canonical" href="https:\/\/[^"]+">/.test(html)) fail('adresse canonique manquante');
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) fail(`${(html.match(/<h1[\s>]/g) || []).length} titres <h1> (1 attendu)`);
  if (/cdn\.jsdelivr\.net/.test(html)) fail('lien jsDelivr restant');
  if (/\{\{|\}\}/.test(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ''))) fail('jeton de gabarit non rempli');
  for (const [, href] of html.matchAll(/href="([^"#?]*)/g)) {
    if (/^(https?:|mailto:|tel:|$)/.test(href)) continue;
    if (/\.html$/.test(href)) fail(`lien en .html : ${href}`);
    else if (!href.startsWith('/')) fail(`lien relatif : ${href}`);
    else {
      const target = href === '/' ? 'index.html' : href.slice(1);
      if (!existsSync(join(DIST, target)) && !existsSync(join(DIST, target + '.html'))) fail(`lien cassé : ${href}`);
    }
  }
  for (const [, src] of html.matchAll(/(?:src|srcset)="(\/[^"\s,]+)/g)) {
    if (!existsSync(join(DIST, src.split('?')[0]))) fail(`fichier introuvable : ${src}`);
  }
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(json); } catch { fail('JSON-LD invalide'); }
  }
  const noindex = html.includes('<meta name="robots" content="noindex">');
  if (rel !== '404.html' && !noindex) {
    const path = rel === 'index.html' ? '' : '/' + rel.replace(/\.html$/, '');
    if (!sitemap.includes(`/${path.slice(1)}</loc>`) && !(path === '' && sitemap.includes('.com</loc>'))) fail('absente du plan du site');
  }
}
if (errors.length) {
  console.error(`✗ ${errors.length} problème(s) :\n  ` + [...new Set(errors)].join('\n  '));
  process.exit(1);
}
console.log(`✓ ${pages.length} pages vérifiées (titre, description, canonique, h1, liens, images, JSON-LD, plan du site)`);
