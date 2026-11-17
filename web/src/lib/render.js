// Petits gabarits HTML : {{x}} = texte échappé, {{{x}}} = HTML tel quel.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const esc = (v) =>
  String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function fill(tpl, vars) {
  return tpl
    .replace(/\{\{\{(\w+)\}\}\}/g, (_, k) => (vars[k] ?? ''))
    .replace(/\{\{(\w+)\}\}/g, (_, k) => esc(vars[k]));
}

// Empreinte d'un fichier de public/ : ?v=… change seulement quand le fichier change (cache long possible)
const cache = new Map();
export function version(publicPath) {
  if (!cache.has(publicPath)) {
    const file = join(process.cwd(), 'public', publicPath); // la construction se lance depuis web/
    cache.set(publicPath, createHash('sha256').update(readFileSync(file)).digest('hex').slice(0, 10));
  }
  return cache.get(publicPath);
}

// Lien actif de la nav / du pied de page (aria-current + w--current), comme dans l'export d'origine
export function markCurrent(html, paths) {
  for (const path of paths || []) {
    const re = new RegExp(`<a href="${path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"([^>]*?) class="([^"]*)"`, 'g');
    html = html.replace(re, `<a href="${path}"$1 aria-current="page" class="$2 w--current"`);
  }
  return html;
}

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
export function dateFr(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`; // comme Intl fr-FR (« 1 septembre 2026 »), déjà utilisé par le site
}

export const readingMinutes = (html) =>
  Math.max(1, Math.round(String(html).replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length / 200));
