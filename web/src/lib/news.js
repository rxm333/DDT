// Cartes d'actualités : générées à la construction (triées, limitées) dans chaque [data-news-list].
import cardTpl from '../templates/news-card.html?raw';
import indexCardTpl from '../templates/news-index-card.html?raw';
import { fill, dateFr } from './render.js';

const card = (a, tpl) =>
  fill(tpl.trim(), {
    slug: a.slug, title: a.title, text: a.card.text, image: a.card.image, alt: a.card.alt,
    dateIso: a.date, dateLabel: dateFr(a.date),
  });

export function cards(articles, { index = false, limit = 0, exclude } = {}) {
  let list = articles.filter((a) => a.slug !== exclude);
  if (limit > 0) list = list.slice(0, limit);
  return list.map((a) => card(a, index ? indexCardTpl : cardTpl)).join('');
}

/** Remplit les <!--news--> laissés par la conversion, selon la variante et la limite de chaque liste. */
export function fillNewsLists(html, articles, exclude) {
  return html.replace(/(<div([^>]*)data-news-list=""([^>]*)>)<!--news-->/g, (m, open, a, b) => {
    const attrs = a + b;
    const limit = parseInt(attrs.match(/data-news-limit="(\d+)"/)?.[1] || '0', 10);
    return open + cards(articles, { index: /news-index_list/.test(attrs), limit, exclude });
  });
}
