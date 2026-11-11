import { $, $$ } from '../core/env.js';

/**
 * Listes d'actualités alimentées par le CMS ([data-news-list]) : accueil, page Actualités, « À lire ensuite ».
 * - liens : si Webflow ne mène pas à l'article, on reconstruit /actualites/<slug> ([data-article-slug]) ;
 * - dates affichées en français ([data-news-date] avec du texte) ;
 * - tri du plus récent au plus ancien (date lue sur [data-news-date]) ;
 * - limite d'affichage facultative (data-news-limit).
 */

const BASE = '/actualites';
const fmt = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

const parse = (value) => {
  const d = new Date(value || '');
  return Number.isNaN(d.getTime()) ? null : d;
};

function itemDate(item) {
  const el = $('[data-news-date]', item);
  if (!el) return 0;
  const d = parse(el.getAttribute('data-news-date')) || parse(el.dataset.newsRaw) || parse(el.textContent.trim());
  return d ? d.getTime() : 0;
}

function initList(list) {
  // Liens vers l'article
  $$('[data-article-slug]', list).forEach((a) => {
    const slug = a.getAttribute('data-article-slug');
    if (slug && !new URL(a.href, location.href).pathname.endsWith(`/${slug}`)) a.setAttribute('href', `${BASE}/${slug}`);
  });
  // Dates visibles en français (on garde la valeur d'origine pour le tri)
  $$('[data-news-date]', list).forEach((el) => {
    if (el.matches('a') || !el.textContent.trim()) return;
    const raw = el.dataset.newsRaw || el.textContent.trim();
    const d = parse(raw);
    if (!d) return;
    el.dataset.newsRaw = raw;
    el.textContent = fmt.format(d);
  });
  // Tri
  const items = Array.from(list.children).filter((el) => el.matches('[role="listitem"], .w-dyn-item'));
  if (items.length > 1) {
    items
      .map((item, i) => ({ item, t: itemDate(item), i }))
      .sort((a, b) => b.t - a.t || a.i - b.i)
      .forEach(({ item }) => list.append(item));
  }
  // Limite
  const limit = parseInt(list.getAttribute('data-news-limit'), 10);
  if (limit > 0) Array.from(list.children).slice(limit).forEach((el) => el.remove());
}

export function initNewsLists() {
  // Pendant une transition Barba, on ne traite que la nouvelle page (dernier conteneur).
  const containers = $$('[data-barba="container"]');
  const root = containers[containers.length - 1] || document;
  $$('[data-news-list]', root).forEach(initList);
}
