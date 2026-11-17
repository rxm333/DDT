// Lecture des articles publiés dans Sanity (jeu de données public : aucune clé nécessaire).
// Le texte (Portable Text) est transformé en HTML identique à celui de l'ancien site.
import { toHTML, escapeHTML } from '@portabletext/to-html';

export const SANITY = { projectId: 'bh9d2sfy', dataset: 'production', apiVersion: '2025-02-19' };

const QUERY = `*[_type == "article" && defined(slug.current) && !(_id in path("drafts.**"))] | order(date desc){
  "slug": slug.current, title, category, date, intro, cardText, cta, product, seoTitle, seoDescription, _updatedAt,
  "cover": { "url": cover.asset->url, "alt": cover.alt },
  body[]{ ..., _type == "photo" => { "url": asset->url, alt, caption } }
}`;

// Cartes « Le jeu présenté » (mêmes textes qu'avant)
const PRODUCT_CARDS = {
  blanc: { name: 'Ancolie Blanc', detail: 'Collection Ancolie', image: '/images/ancolie-blanc.webp', href: '/ancolie-blanc', priceKey: 'blanc', price: '199 €' },
  noir: { name: 'Ancolie Noir', detail: 'Collection Ancolie', image: '/images/ancolie-noir.webp', href: '/ancolie-noir', priceKey: 'noir', price: '199 €' },
  'la-chute-des-anges': { name: 'La Chute des Anges', detail: 'Collection Ancolie · Série limitée', image: '/images/ancolie-la-chute-des-anges.webp', href: '/ancolie-la-chute-des-anges', priceKey: 'la-chute-des-anges', price: '199 €' },
};

const img = (url, w) => (url ? `${url}?w=${w}&fit=max&auto=format` : '');
const attr = (v) => escapeHTML(String(v ?? ''));

const components = {
  types: {
    photo: ({ value }) =>
      `<figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img src="${attr(img(value.url, 1600))}" alt="${attr(value.alt)}" loading="lazy"></div>${value.caption ? `<figcaption>${escapeHTML(value.caption)}</figcaption>` : ''}</figure>`,
  },
  marks: {
    link: ({ children, value }) => {
      // Autre site : nouvel onglet (comme le lien Instagram d'origine)
      const href = value?.href || '#';
      const ext = /^https?:\/\//.test(href) && !/^https?:\/\/([a-z0-9-]+\.)?damedetours\.com/.test(href);
      return `<a href="${attr(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}>${children}</a>`;
    },
  },
  block: {
    normal: ({ children }) => `<p>${children}</p>`,
    h2: ({ children }) => `<h2>${children}</h2>`,
    h3: ({ children }) => `<h3>${children}</h3>`,
    blockquote: ({ children }) => `<blockquote>${children}</blockquote>`,
  },
};

export const ptToHtml = (blocks) => toHTML(blocks || [], { components });

export async function fetchSanityArticles() {
  const url = `https://${SANITY.projectId}.api.sanity.io/v${SANITY.apiVersion}/data/query/${SANITY.dataset}?query=${encodeURIComponent(QUERY)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`Sanity ${res.status}`);
  const { result } = await res.json();
  return result.map((d) => ({
    slug: d.slug,
    title: d.title,
    category: d.category || '',
    date: d.date,
    updated: d._updatedAt?.slice(0, 10),
    intro: d.intro || '',
    cover: { src: img(d.cover?.url, 1920), alt: d.cover?.alt || '' },
    body: ptToHtml(d.body),
    cta: d.cta?.label && d.cta?.href ? { label: d.cta.label, href: d.cta.href } : null,
    product: PRODUCT_CARDS[d.product] || null,
    card: { text: d.cardText || d.intro || '', image: img(d.cover?.url, 960), alt: d.cover?.alt || '' },
    seo: { title: d.seoTitle || `${d.title} | Dame de Tours`, description: d.seoDescription || d.intro, ogImage: d.cover?.url ? `${d.cover.url}?w=1200&h=630&fit=crop&auto=format` : null },
  }));
}

// ---------------------------------------------------------------- Pages du site (textes et photos modifiés)
const query = async (q, params = {}) => {
  const qs = new URLSearchParams({ query: q, ...Object.fromEntries(Object.entries(params).map(([k, v]) => [`$${k}`, JSON.stringify(v)])) });
  const res = await fetch(`https://${SANITY.projectId}.api.sanity.io/v${SANITY.apiVersion}/data/query/${SANITY.dataset}?${qs}`, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`Sanity ${res.status}`);
  return (await res.json()).result;
};

/** { 'index': { t1: …, i6: { url, alt }, seoTitle, seoDescription }, … } — fiches publiées seulement. */
export async function fetchPageEdits() {
  const docs = await query('*[_id in path("page-*")]');
  const refs = new Set();
  for (const d of docs) for (const v of Object.values(d)) if (v?._type === 'image' && v.asset?._ref) refs.add(v.asset._ref);
  const assets = refs.size ? Object.fromEntries((await query('*[_id in $ids]{_id, url}', { ids: [...refs] })).map((a) => [a._id, a.url])) : {};
  const out = {};
  for (const d of docs) {
    const values = {};
    for (const [k, v] of Object.entries(d)) {
      if (k.startsWith('_')) continue;
      values[k] = v?._type === 'image' ? (v.asset?._ref ? { url: assets[v.asset._ref], alt: v.alt } : null) : v;
    }
    out[d._id.replace(/^page-/, '')] = values;
  }
  return out;
}
