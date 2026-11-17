// Plan du site pour Google : toutes les pages publiques (sauf 404), avec la date des articles.
import pages from '../data/pages.json';
import { getArticles } from '../lib/content.js';
import { abs, NOINDEX } from '../lib/site.js';

export async function GET() {
  const articles = await getArticles();
  const urls = [
    ...pages.filter((p) => !NOINDEX.has(p.path)).map((p) => ({ loc: abs(p.path) })),
    ...articles.map((a) => ({ loc: abs(`/actualites/${a.slug}`), lastmod: a.updated || a.date })),
  ];
  const body = urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`, {
    headers: { 'content-type': 'application/xml' },
  });
}
