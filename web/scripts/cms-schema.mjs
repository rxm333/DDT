// Génère les formulaires du Studio (studio/schemas/pages.generated.js) depuis src/data/editable.json.
// À relancer après scripts/cms-annotate.mjs : node scripts/cms-schema.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { plainText } from '../src/lib/cms-html.js';

const manifest = JSON.parse(readFileSync(new URL('../src/data/editable.json', import.meta.url), 'utf8'));
const OUT = new URL('../../studio/schemas/pages.generated.js', import.meta.url);
const typeName = (key) => 'page_' + key.replace(/[^a-z0-9]+/g, '_');
const short = (t, n = 140) => (t.length > n ? t.slice(0, n - 1) + '…' : t);

const ORDER = ['index', 'collection-ancolie', 'atelier', 'personnalisation', 'contact', 'actualites', 'ancolie-noir', 'ancolie-blanc', 'ancolie-la-chute-des-anges', 'conditions-generales-de-vente', 'livraison', 'remboursements', 'mentions-legales', 'confidentialite', 'conditions-utilisation', 'coordonnees'];
const rank = (k) => (ORDER.includes(k) ? ORDER.indexOf(k) : 99);
const docs = [...manifest.pages].sort((a, b) => rank(a.key) - rank(b.key)).map((p) => ({
  name: typeName(p.key),
  title: p.label,
  type: 'document',
  __group: p.group,
  __key: p.key,
  groups: [{ name: 'contenu', title: 'Contenu', default: true }, { name: 'google', title: 'Google' }],
  fieldsets: p.sections.map((s, i) => ({ name: s.name, title: s.title, options: { collapsible: true, collapsed: i > 0 } })),
  fields: [
    ...p.fields.map((f) => {
      const base = { name: f.name, title: f.label, fieldset: f.section, group: 'contenu' };
      if (f.type === 'image') {
        return { ...base, type: 'image', options: { hotspot: true }, description: `Laisser vide pour garder la photo actuelle (${f.src.split('/').pop()}).`,
          fields: [{ name: 'alt', type: 'string', title: 'Description de la photo', description: f.alt ? `Actuelle : « ${short(f.alt, 100)} »` : undefined }] };
      }
      const origin = `Texte d’origine : « ${short(plainText(f.original))} »`;
      if (f.kind === 'legal') return { ...base, type: 'texteLegal' };
      if (f.kind === 'rich') return { ...base, type: 'ligneRiche', description: origin };
      if (f.kind === 'long') return { ...base, type: 'text', rows: 3, description: origin };
      return { ...base, type: 'string', description: origin };
    }),
    { name: 'seoTitle', title: 'Titre pour Google', type: 'string', group: 'google', description: 'Vide = titre actuel de la page. Idéalement 50 à 60 caractères.' },
    { name: 'seoDescription', title: 'Description pour Google', type: 'text', rows: 3, group: 'google', description: 'Vide = description actuelle. Idéalement 120 à 155 caractères.' },
  ],
  preview: { prepare: () => ({ title: p.label }) },
}));

const header = `// FICHIER GÉNÉRÉ par web/scripts/cms-schema.mjs — ne pas modifier à la main.
// Un formulaire par page du site ; chaque champ correspond à un texte ou une photo de la page.
`;
writeFileSync(OUT, header + `export const pageDocs = ${JSON.stringify(docs, null, 1)};\n`);
console.log(`${docs.length} formulaires, ${docs.reduce((n, d) => n + d.fields.length, 0)} champs → studio/schemas/pages.generated.js`);
