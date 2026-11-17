// Crée / complète dans Sanity une fiche par page du site, remplie avec les textes actuels.
// Sans risque : ne remplit que les champs VIDES (setIfMissing) — un texte modifié n'est jamais écrasé.
// Lancé à chaque mise à jour du site par le workflow « Site Astro » (secret SANITY_API_TOKEN).
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { initialValue } from '../../web/src/lib/cms-html.js';

const token = process.env.SANITY_API_TOKEN;
if (!token) { console.log('SANITY_API_TOKEN absent : synchronisation des pages ignorée'); process.exit(0); }
const client = createClient({ projectId: 'bh9d2sfy', dataset: 'production', apiVersion: '2025-02-19', token, useCdn: false });
const manifest = JSON.parse(readFileSync(new URL('../../web/src/data/editable.json', import.meta.url), 'utf8'));
const typeName = (key) => 'page_' + key.replace(/[^a-z0-9]+/g, '_');

for (const p of manifest.pages) {
  const _id = `page-${p.key}`;
  const values = {};
  for (const f of p.fields) {
    const v = initialValue(f);
    if (v !== undefined && !(Array.isArray(v) && !v.length) && v !== '') values[f.name] = v;
  }
  const existing = await client.getDocument(_id);
  const missing = existing ? Object.keys(values).filter((k) => existing[k] === undefined) : Object.keys(values);
  if (!missing.length) { console.log(`= ${p.key}`); continue; }
  await client.transaction()
    .createIfNotExists({ _id, _type: typeName(p.key) })
    .patch(_id, (patch) => patch.setIfMissing(Object.fromEntries(missing.map((k) => [k, values[k]]))))
    .commit({ autoGenerateArrayKeys: true });
  console.log(`+ ${p.key} : ${missing.length} champ(s) rempli(s)`);
}
