// Repère les textes et photos modifiables de chaque page (src/fragments/*.html) :
//  - pose data-t="tN" sur chaque texte et data-i="iN" sur chaque photo (identifiants stables : ceux
//    déjà posés sont gardés, les nouveaux prennent la suite) ;
//  - écrit src/data/editable.json, d'où sont générés les formulaires du Studio (scripts/cms-schema.mjs).
// À relancer après avoir ajouté du contenu dans un fragment : node scripts/cms-annotate.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { parse } from 'node-html-parser';
import { plainText } from '../src/lib/cms-html.js';

const DIR = new URL('../src/fragments/', import.meta.url).pathname;
const OUT = new URL('../src/data/editable.json', import.meta.url).pathname;

// Libellés des pages dans le Studio (et rangement : pages, fiches produit, pages légales)
export const PAGES = {
  index: ['Accueil', 'pages'],
  'collection-ancolie': ['Collection Ancolie', 'pages'],
  atelier: ['L’atelier', 'pages'],
  personnalisation: ['Personnalisation', 'pages'],
  contact: ['Contact', 'pages'],
  actualites: ['Actualités (page liste)', 'pages'],
  'ancolie-blanc': ['Ancolie Blanc', 'produits'],
  'ancolie-noir': ['Ancolie Noir', 'produits'],
  'ancolie-la-chute-des-anges': ['La Chute des Anges', 'produits'],
  'mentions-legales': ['Mentions légales', 'legal'],
  confidentialite: ['Confidentialité', 'legal'],
  'conditions-generales-de-vente': ['Conditions générales de vente', 'legal'],
  'conditions-utilisation': ['Conditions d’utilisation', 'legal'],
  livraison: ['Livraison', 'legal'],
  remboursements: ['Remboursements', 'legal'],
  coordonnees: ['Coordonnées', 'legal'],
};

const LABELS = { h1: 'Grand titre', h2: 'Titre', h3: 'Sous-titre', h4: 'Petit titre', h5: 'Petit titre', h6: 'Petit titre', p: 'Paragraphe', li: 'Élément de liste', summary: 'Question', blockquote: 'Citation', figcaption: 'Légende', a: 'Lien', button: 'Bouton', label: 'Libellé', dt: 'Terme', dd: 'Valeur', th: 'En-tête', td: 'Case', legend: 'Titre du formulaire', option: 'Choix' };
const FORMAT = new Set(['a', 'em', 'i', 'strong', 'b', 'br']);
const SKIP_TAGS = new Set(['script', 'style', 'svg', 'template', 'noscript', 'iframe', 'select', 'textarea', 'input']);
const SKIP_ATTRS = ['data-cart-price', 'data-news-date', 'data-article-date', 'data-article-reading', 'data-news-list'];
const SKIP_CLOSEST = '[data-news-list], nav[aria-label="Fil d’Ariane"], .legal_sidebar, .legal-nav_component';

const isSkipped = (el) => SKIP_TAGS.has(el.tagName?.toLowerCase()) || SKIP_ATTRS.some((a) => el.hasAttribute?.(a));
const hiddenFrom = (el) => { for (let n = el; n && n.tagName; n = n.parentNode) if (n.getAttribute('aria-hidden') === 'true') return true; return false; };
const closest = (el, sel) => { try { return el.closest(sel); } catch { return null; } };
const hasText = (el) => el.text.replace(/\s+/g, '').length > 0;
const meaningful = (t) => t.length >= 2 && /[\p{L}]/u.test(t);
const elementKids = (el) => el.childNodes.filter((n) => n.nodeType === 1);
const directText = (el) => el.childNodes.some((n) => n.nodeType === 3 && n.text.trim());
// Mise en forme dans une phrase (gras, italique, lien au fil du texte). Un lien seul, sans texte autour
// (bouton, carte), est un élément à part : on le traite comme un texte distinct.
const onlyFormatting = (el) => directText(el) || el.childNodes.filter((n) => n.nodeType === 1).every((k) => k.tagName.toLowerCase() !== 'a')
  ? el.querySelectorAll('*').every((d) => FORMAT.has(d.tagName.toLowerCase()) && !SKIP_ATTRS.some((a) => d.hasAttribute(a)))
  : false;

function sectionOf(el, main) {
  let n = el;
  while (n.parentNode && n.parentNode !== main) n = n.parentNode;
  return n === main ? null : n;
}

function sectionTitle(sec, i) {
  const h = sec.querySelector('h1, h2, .sr-only');
  const t = h ? plainText(h.innerHTML) : '';
  if (t) return t.length > 60 ? t.slice(0, 57) + '…' : t;
  const cls = (sec.getAttribute('class') || '').split(' ')[0].replace(/^section_/, '').replace(/[-_]/g, ' ');
  return cls ? cls[0].toUpperCase() + cls.slice(1) : `Section ${i + 1}`;
}

// Insère un attribut dans la balise ouvrante (texte source modifié de la fin vers le début)
function withAttrs(src, inserts) {
  inserts.sort((a, b) => b.at - a.at);
  for (const { at, text } of inserts) src = src.slice(0, at) + text + src.slice(at);
  return src;
}
const tagNameEnd = (src, start) => { const m = /^<[a-zA-Z0-9-]+/.exec(src.slice(start)); return start + m[0].length; };

const manifest = { pages: [] };

for (const file of readdirSync(DIR).filter((f) => f.endsWith('.html')).sort()) {
  const key = file.replace(/\.html$/, '');
  if (!PAGES[key]) continue;
  const [label, group] = PAGES[key];
  let src = readFileSync(DIR + file, 'utf8');
  let root = parse(src, { comment: true });
  const main = root.querySelector('main');
  const used = [...src.matchAll(/data-[ti]="([ti])(\d+)"/g)].map((m) => Number(m[2]));
  let next = Math.max(0, ...used) + 1;
  const inserts = [];
  const byOriginal = new Map(); // même texte dans la page (ex. bandeau qui défile en double) → même champ
  for (const el of root.querySelectorAll('[data-t]')) byOriginal.set(el.innerHTML.trim(), el.getAttribute('data-t'));

  const mark = (el, attr, id) => { if (!el.hasAttribute(attr)) inserts.push({ at: tagNameEnd(src, el.range[0]), text: ` ${attr}="${id}"` }); };
  const units = [];

  if (group === 'legal') {
    // Pages légales : titre, date de mise à jour, introduction, puis chaque article (titre + texte complet)
    for (const el of main.querySelectorAll('h1.legal_title, p.legal_updated, .legal_intro, h2.legal_article-title, .legal_article-body')) units.push(el);
  } else {
    const walk = (el) => {
      for (const child of elementKids(el)) {
        if (isSkipped(child) || closest(child, SKIP_CLOSEST)) continue;
        if (child.tagName.toLowerCase() === 'img') { units.push(child); continue; }
        if (!hasText(child)) {
          for (const img of child.querySelectorAll('img')) if (!closest(img, SKIP_CLOSEST) && !units.includes(img)) units.push(img);
          continue;
        }
        const kids = elementKids(child);
        if (!kids.length || onlyFormatting(child)) units.push(child);
        else if (directText(child) && kids.every((k) => !hasText(k))) units.push(child); // texte + icône
        else walk(child);
      }
      for (const img of el.childNodes.filter((n) => n.nodeType === 1 && n.tagName.toLowerCase() === 'img')) if (!units.includes(img)) units.push(img);
    };
    walk(main);
  }

  const fields = [];
  const sections = new Map();
  const counters = new Map();
  for (const el of units) {
    const tag = el.tagName.toLowerCase();
    const sec = sectionOf(el, main) || main;
    if (!sections.has(sec)) sections.set(sec, { name: `s${sections.size + 1}`, title: sectionTitle(sec, sections.size) });
    const section = sections.get(sec).name;

    if (tag === 'img') {
      if (hiddenFrom(el)) continue;
      const id = el.getAttribute('data-i') || `i${next++}`;
      mark(el, 'data-i', id);
      const file = (el.getAttribute('src') || '').split('/').pop();
      fields.push({ name: id, type: 'image', section, label: `Photo${el.getAttribute('alt') ? ' : ' + el.getAttribute('alt').slice(0, 50) : ' (' + file + ')'}`, src: el.getAttribute('src'), alt: el.getAttribute('alt') || '' });
      continue;
    }
    const original = el.innerHTML.trim();
    const text = plainText(original);
    if (group !== 'legal' && !meaningful(text)) continue;
    if (byOriginal.has(original) && !el.hasAttribute('data-t')) { mark(el, 'data-t', byOriginal.get(original)); continue; }
    if (hiddenFrom(el) && !el.hasAttribute('data-t')) continue; // décor (numéros, doublons) : pas modifiable
    const id = el.getAttribute('data-t') || `t${next++}`;
    mark(el, 'data-t', id);
    byOriginal.set(original, id);
    if (fields.some((f) => f.name === id)) continue;

    let kind;
    if (group === 'legal') kind = tag === 'h1' || tag === 'h2' || tag === 'p' ? 'plain' : 'legal';
    else if (elementKids(el).length && !onlyFormatting(el)) kind = 'textonly';
    else if (elementKids(el).length) kind = 'rich';
    else kind = text.length > 90 || tag === 'p' ? 'long' : 'plain';

    let base = LABELS[tag] || 'Texte';
    if (group === 'legal') base = { h1: 'Titre de la page', p: 'Date de mise à jour', h2: 'Titre de l’article' }[tag] || (el.getAttribute('class')?.includes('legal_intro') ? 'Introduction' : 'Texte de l’article');
    if (el.getAttribute('class')?.includes('sr-only')) base += ' (invisible, lu par Google et les lecteurs d’écran)';
    const n = (counters.get(section + base) || 0) + 1;
    counters.set(section + base, n);
    const field = { name: id, kind, section, label: group === 'legal' ? base : `${base}${n > 1 ? ' ' + n : ''}`, original };
    if (kind === 'textonly') field.text = text;
    const link = el.querySelector('a[class]');
    if (kind === 'rich' && link) field.linkClass = link.getAttribute('class');
    fields.push(field);
  }

  if (inserts.length) {
    src = withAttrs(src, inserts);
    writeFileSync(DIR + file, src);
  }
  // Pages légales : un groupe de champs par article (titre + texte)
  let secList = [...sections.values()];
  if (group === 'legal') {
    let art = 0;
    secList = [{ name: 'entete', title: 'En-tête et introduction' }];
    for (const f of fields) {
      if (f.label === 'Titre de l’article') { art++; secList.push({ name: `a${art}`, title: `Article ${art} : ${plainText(f.original)}` }); }
      f.section = art ? `a${art}` : 'entete';
    }
  }
  manifest.pages.push({ key, label, group, sections: secList.filter((s) => fields.some((f) => f.section === s.name)), fields });
  console.log(`${key.padEnd(32)} ${String(fields.filter((f) => f.type !== 'image').length).padStart(3)} textes  ${String(fields.filter((f) => f.type === 'image').length).padStart(3)} photos`);
}
writeFileSync(OUT, JSON.stringify(manifest, null, 1) + '\n');
