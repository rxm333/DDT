// Import UNIQUE des articles d'origine (web/src/content/articles/*.json) dans Sanity.
// Lancé depuis GitHub (Actions → « Sanity : import des articles »), avec la clé SANITY_API_TOKEN.
// Sans risque à relancer : un article déjà présent dans Sanity n'est jamais écrasé.
import { createClient } from '@sanity/client';
import { parse } from 'node-html-parser';
import { readFileSync, readdirSync, createReadStream } from 'node:fs';
import { join, basename } from 'node:path';
import { randomUUID } from 'node:crypto';

const ROOT = new URL('../../web/', import.meta.url).pathname;
const token = process.env.SANITY_API_TOKEN;
if (!token) throw new Error('SANITY_API_TOKEN manquant (secret GitHub)');
const client = createClient({ projectId: 'bh9d2sfy', dataset: 'production', apiVersion: '2025-02-19', token, useCdn: false });

const key = () => randomUUID().replace(/-/g, '').slice(0, 12);
const uploaded = new Map();
async function upload(src) {
  const file = join(ROOT, 'public', src.replace(/^\//, '').split('?')[0]);
  if (!uploaded.has(file)) {
    const asset = await client.assets.upload('image', createReadStream(file), { filename: basename(file) });
    uploaded.set(file, asset._id);
  }
  return { _type: 'reference', _ref: uploaded.get(file) };
}

// HTML (p, h2, h3, blockquote, a, em, strong, figure/img) → Portable Text
function spans(node, marks = [], markDefs = []) {
  const out = [];
  for (const child of node.childNodes) {
    if (child.nodeType === 3) {
      const text = child.text;
      if (text) out.push({ _type: 'span', _key: key(), text, marks });
    } else if (child.nodeType === 1) {
      const tag = child.tagName.toLowerCase();
      if (tag === 'em' || tag === 'i') out.push(...spans(child, [...marks, 'em'], markDefs));
      else if (tag === 'strong' || tag === 'b') out.push(...spans(child, [...marks, 'strong'], markDefs));
      else if (tag === 'a') {
        const def = { _type: 'link', _key: key(), href: child.getAttribute('href') };
        markDefs.push(def);
        out.push(...spans(child, [...marks, def._key], markDefs));
      } else if (tag === 'br') out.push({ _type: 'span', _key: key(), text: '\n', marks });
      else out.push(...spans(child, marks, markDefs));
    }
  }
  return out;
}

async function toBlocks(html) {
  const blocks = [];
  for (const el of parse(html).childNodes) {
    if (el.nodeType !== 1) continue;
    const tag = el.tagName.toLowerCase();
    if (tag === 'figure') {
      for (const img of el.querySelectorAll('img')) {
        blocks.push({ _type: 'photo', _key: key(), asset: await upload(img.getAttribute('src')), alt: img.getAttribute('alt') || '', caption: el.querySelector('figcaption')?.text || undefined });
      }
      continue;
    }
    const style = { p: 'normal', h2: 'h2', h3: 'h3', blockquote: 'blockquote' }[tag] || 'normal';
    const markDefs = [];
    const children = spans(el, [], markDefs);
    if (children.length) blocks.push({ _type: 'block', _key: key(), style, markDefs, children });
  }
  return blocks;
}

const files = readdirSync(join(ROOT, 'src/content/articles')).filter((f) => f.endsWith('.json'));
for (const f of files) {
  const a = JSON.parse(readFileSync(join(ROOT, 'src/content/articles', f), 'utf8'));
  const id = `article-${a.slug}`;
  if (await client.getDocument(id)) {
    console.log(`= ${a.slug} : déjà dans Sanity, inchangé`);
    continue;
  }
  const doc = {
    _id: id,
    _type: 'article',
    title: a.title,
    slug: { _type: 'slug', current: a.slug },
    date: a.date,
    category: a.category,
    intro: a.intro,
    cover: { _type: 'image', asset: await upload(a.cover.src), alt: a.cover.alt },
    body: await toBlocks(a.body),
    cardText: a.card.text !== a.intro ? a.card.text : undefined,
    cta: a.cta ? { label: a.cta.label, href: a.cta.href } : undefined,
    product: a.product?.priceKey || '',
    seoTitle: a.seo?.title !== `${a.title} | Dame de Tours` ? a.seo?.title : undefined,
    seoDescription: a.seo?.description !== a.intro ? a.seo?.description : undefined,
  };
  await client.createIfNotExists(doc);
  console.log(`+ ${a.slug} : importé (${doc.body.length} blocs)`);
}
console.log('Import terminé.');
