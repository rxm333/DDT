// Vérifie le système de pages modifiables, sans Sanity :
//  1. avec les textes d'origine comme valeurs, AUCUNE page ne change ;
//  2. une modification de chaque sorte de champ change bien la page, et seulement à cet endroit.
import { readFileSync } from 'node:fs';
import { applyEdits, initialValue, inlineToBlocks, richToBlocks } from '../src/lib/cms-html.js';

const manifest = JSON.parse(readFileSync(new URL('../src/data/editable.json', import.meta.url), 'utf8'));
let failures = 0;
const fail = (m) => { failures++; console.error('✗ ' + m); };

for (const p of manifest.pages) {
  const html = readFileSync(new URL(`../src/fragments/${p.key}.html`, import.meta.url), 'utf8').trim();
  const fields = Object.fromEntries(p.fields.map((f) => [f.name, f]));
  const values = Object.fromEntries(p.fields.map((f) => [f.name, initialValue(f)]));
  const changed = [];
  const out = applyEdits(html, fields, values, { onEdit: (k) => changed.push(k) });
  if (out !== html) fail(`${p.key} : modifiée alors que rien n'a changé (${changed.join(', ')})`);

  // Une modification par sorte de champ
  for (const kind of ['plain', 'long', 'rich', 'textonly', 'legal']) {
    const f = p.fields.find((x) => x.kind === kind);
    if (!f) continue;
    const v = kind === 'legal' ? [...richToBlocks(f.original), ...richToBlocks('<p>Paragraphe ajouté pour le test.</p><ul><li>Point A</li></ul>')]
      : kind === 'rich' ? inlineToBlocks(f.original + ' <em>ajout</em>')
      : 'Texte modifié pour le test';
    const edited = applyEdits(html, fields, { ...values, [f.name]: v });
    const marker = kind === 'legal' ? 'Paragraphe ajouté pour le test.' : kind === 'rich' ? '<em>ajout</em>' : 'Texte modifié pour le test';
    if (!edited.includes(marker)) fail(`${p.key} ${f.name} (${kind}) : la modification n'apparaît pas`);
    const lenDiff = edited.length - html.length;
    if (lenDiff > 400 || lenDiff < -Math.max(400, f.original.length + 50)) fail(`${p.key} ${f.name} (${kind}) : la page a trop changé (${lenDiff} caractères)`);
  }
  const img = p.fields.find((x) => x.type === 'image');
  if (img) {
    const edited = applyEdits(html, fields, { ...values, [img.name]: { url: 'https://cdn.sanity.io/images/x/y/test.jpg', alt: 'Photo test' } });
    if (!edited.includes('test.jpg?w=2000') || !edited.includes('alt="Photo test"')) fail(`${p.key} ${img.name} : la photo n'est pas remplacée`);
  }
}
console.log(failures ? `✗ ${failures} problème(s)` : `✓ ${manifest.pages.length} pages : intactes avec les textes d'origine, chaque sorte de modification appliquée`);
process.exit(failures ? 1 : 0);
