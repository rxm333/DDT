// Textes et photos des pages modifiables dans Sanity.
//
// Chaque texte modifiable porte data-t="tN" dans src/fragments/, chaque photo data-i="iN"
// (posés par scripts/cms-annotate.mjs). src/data/editable.json décrit ces champs ; le Studio en
// est généré. À la construction, seuls les champs MODIFIÉS dans Sanity remplacent le HTML d'origine :
// une page qu'on n'a pas touchée reste identique, octet pour octet.
import { parse } from 'node-html-parser';

// ---------------------------------------------------------------- HTML → Portable Text
const INLINE = new Set(['a', 'em', 'i', 'strong', 'b', 'br']);
let keySeq = 0;
const key = () => `k${(keySeq++).toString(36)}`;

function spans(node, marks, markDefs, out) {
  for (const child of node.childNodes) {
    if (child.nodeType === 3) {
      const text = child.text.replace(/\s+/g, ' ');
      if (text) out.push({ _type: 'span', _key: key(), text, marks });
      continue;
    }
    if (child.nodeType !== 1) continue;
    const tag = child.tagName.toLowerCase();
    const cls = child.getAttribute('class') || '';
    if (/\bsr-only\b/.test(cls)) continue; // « (nouvel onglet) » : regénéré automatiquement
    if (tag === 'br') out.push({ _type: 'span', _key: key(), text: '\n', marks });
    else if (tag === 'em' || tag === 'i') spans(child, [...marks, 'em'], markDefs, out);
    else if (tag === 'strong' || tag === 'b') spans(child, [...marks, 'strong'], markDefs, out);
    else if (tag === 'a') {
      const def = { _type: 'link', _key: key(), href: child.getAttribute('href') || '' };
      markDefs.push(def);
      spans(child, [...marks, def._key], markDefs, out);
    } else spans(child, marks, markDefs, out);
  }
  return out;
}

function tidy(children) {
  // Espaces en début / fin de bloc et autour des retours à la ligne : sans effet à l'écran
  const out = children.filter((s) => s.text !== '');
  if (out.length) {
    out[0].text = out[0].text.replace(/^ +/, '');
    out[out.length - 1].text = out[out.length - 1].text.replace(/ +$/, '');
  }
  for (let i = 0; i < out.length; i++) {
    if (out[i].text === '\n') {
      if (out[i - 1]) out[i - 1].text = out[i - 1].text.replace(/ +$/, '');
      if (out[i + 1]) out[i + 1].text = out[i + 1].text.replace(/^ +/, '');
    }
  }
  return out.filter((s) => s.text !== '');
}

const block = (el, style = 'normal', extra = {}) => {
  const markDefs = [];
  const children = tidy(spans(el, [], markDefs, []));
  return children.length ? { _type: 'block', _key: key(), style, markDefs, children, ...extra } : null;
};

/** Une seule ligne de texte (titre, paragraphe…) → un bloc Portable Text. */
export function inlineToBlocks(html) {
  const b = block(parse(`<p>${html}</p>`).firstChild);
  return b ? [b] : [];
}

/** Texte de plusieurs paragraphes (pages légales) → blocs Portable Text. */
export function richToBlocks(html) {
  const blocks = [];
  for (const el of parse(html).childNodes) {
    if (el.nodeType === 3) {
      if (el.text.trim()) blocks.push(block(parse(`<p>${el.text}</p>`).firstChild));
      continue;
    }
    if (el.nodeType !== 1) continue;
    const tag = el.tagName.toLowerCase();
    if (tag === 'ul' || tag === 'ol') {
      for (const li of el.querySelectorAll(':scope > li')) blocks.push(block(li, 'normal', { listItem: tag === 'ol' ? 'number' : 'bullet', level: 1 }));
    } else blocks.push(block(el, { h2: 'h2', h3: 'h3', h4: 'h3', blockquote: 'blockquote' }[tag] || 'normal'));
  }
  return blocks.filter(Boolean);
}

// ---------------------------------------------------------------- Portable Text → HTML
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const isExternal = (href) => /^https?:\/\//.test(href) && !/^https?:\/\/([a-z0-9-]+\.)?damedetours\.com/.test(href);

function inlineHtml(b, { linkClass } = {}) {
  const defs = Object.fromEntries((b.markDefs || []).map((d) => [d._key, d]));
  return (b.children || [])
    .map((s) => {
      let html = esc(s.text).replace(/\n/g, '<br>');
      for (const m of s.marks || []) {
        if (m === 'em') html = `<em>${html}</em>`;
        else if (m === 'strong') html = `<strong>${html}</strong>`;
        else if (defs[m]?._type === 'link') {
          const href = defs[m].href || '#';
          const ext = isExternal(href);
          html = `<a href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}${linkClass ? ` class="${linkClass}"` : ''}>${html}${ext && linkClass === 'legal_link' ? '<span class="sr-only">(nouvel onglet)</span>' : ''}</a>`;
        }
      }
      return html;
    })
    .join('');
}

/** Blocs → HTML des pages légales (mêmes classes que la mise en page d'origine). */
export function legalHtml(blocks) {
  let html = '';
  let list = null;
  for (const b of blocks || []) {
    const kind = b.listItem === 'number' ? 'ol' : b.listItem ? 'ul' : null;
    if (list && list !== kind) { html += `</${list}>`; list = null; }
    if (kind && !list) { html += kind === 'ol' ? '<ol role="list" class="legal_list is-ordered">' : '<ul role="list" class="legal_list">'; list = kind; }
    const inner = inlineHtml(b, { linkClass: 'legal_link' });
    if (kind) html += `<li>${inner}</li>`;
    else if (b.style === 'h2' || b.style === 'h3') html += `<h3 class="legal_subheading">${inner}</h3>`;
    else html += `<p class="legal_text">${inner}</p>`;
  }
  if (list) html += `</${list}>`;
  return html;
}

/** Forme comparable d'un texte (sans identifiants ni espaces superflus) : pour savoir s'il a été modifié. */
export function canonical(blocks) {
  return JSON.stringify(
    (blocks || []).map((b) => {
      const defs = Object.fromEntries((b.markDefs || []).map((d) => [d._key, d.href]));
      const text = (b.children || []).map((s) => `${(s.marks || []).map((m) => defs[m] ?? m).sort().join('+')}:${s.text}`).join('|');
      return [b.style || 'normal', b.listItem || '', text.replace(/\s+/g, ' ').trim()];
    }),
  );
}

export const plainText = (html) =>
  parse(`<p>${html}</p>`).firstChild.text.replace(/\s+/g, ' ').trim();

// ---------------------------------------------------------------- Remplacement dans une page
// Les positions viennent de l'analyse du fragment ; on remplace de la fin vers le début pour ne pas les décaler.
function openTagEnd(src, start) {
  let q = null;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (q) { if (c === q) q = null; }
    else if (c === '"' || c === "'") q = c;
    else if (c === '>') return i + 1;
  }
  return -1;
}

/**
 * fields : { tN: { kind, original }, iN: { … } } (src/data/editable.json)
 * values : { tN: valeur Sanity, iN: { url, alt } }
 */
export function applyEdits(html, fields, values, { onEdit } = {}) {
  if (!values) return html;
  const root = parse(html, { comment: true });
  const edits = [];
  for (const el of root.querySelectorAll('[data-t]')) {
    const k = el.getAttribute('data-t');
    const f = fields[k];
    const v = values[k];
    if (!f || v == null || v === '') continue;
    let inner = null;
    if (f.kind === 'plain' || f.kind === 'long') {
      if (String(v).replace(/\s+/g, ' ').trim() !== plainText(f.original)) inner = esc(String(v).trim()).replace(/\n/g, '<br>');
    } else if (f.kind === 'textonly') {
      if (String(v).replace(/\s+/g, ' ').trim() !== f.text) edits.push({ el, textonly: String(v).trim() });
      continue;
    } else if (f.kind === 'rich') {
      if (canonical(v) !== canonical(inlineToBlocks(f.original))) inner = (v || []).map((b) => inlineHtml(b, { linkClass: f.linkClass })).join('<br>');
    } else if (f.kind === 'legal') {
      if (canonical(v) !== canonical(richToBlocks(f.original))) inner = legalHtml(v);
    }
    if (inner != null) edits.push({ el, inner });
  }
  for (const el of root.querySelectorAll('img[data-i]')) {
    const v = values[el.getAttribute('data-i')];
    if (v?.url) edits.push({ el, img: v });
  }
  // Remplacements par position dans le texte source
  const ops = [];
  for (const e of edits) {
    const [start, end] = e.el.range;
    const tagEnd = openTagEnd(html, start);
    if (e.img) {
      let tag = html.slice(start, tagEnd)
        .replace(/\s(?:srcset|sizes)="[^"]*"/g, '')
        .replace(/\ssrc="[^"]*"/, ` src="${esc(`${e.img.url}?w=2000&fit=max&auto=format`)}"`);
      if (e.img.alt) tag = /\salt="/.test(tag) ? tag.replace(/\salt="[^"]*"/, ` alt="${esc(e.img.alt)}"`) : tag.replace(/<img/, `<img alt="${esc(e.img.alt)}"`);
      ops.push([start, tagEnd, tag]);
    } else if (e.textonly != null) {
      // Seul le texte change ; les icônes et éléments décoratifs restent en place
      const texts = e.el.childNodes.filter((n) => n.nodeType === 3 && n.text.trim());
      texts.forEach((t, i) => {
        const [ts, te] = t.range;
        const raw = html.slice(ts, te);
        const lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
        ops.push([ts, te, i === 0 ? lead + esc(e.textonly) + trail : lead.slice(0, 1)]);
      });
    } else {
      const close = end - `</${e.el.rawTagName}>`.length;
      ops.push([tagEnd, close, e.inner]);
    }
    onEdit?.(e.el.getAttribute('data-t') || e.el.getAttribute('data-i'));
  }
  ops.sort((a, b) => b[0] - a[0]);
  for (const [s, en, rep] of ops) html = html.slice(0, s) + rep + html.slice(en);
  return html;
}

/** Valeur de départ d'un champ dans Sanity : le texte actuel de la page. */
export function initialValue(f) {
  if (f.type === 'image') return undefined; // vide = photo actuelle
  if (f.kind === 'legal') return richToBlocks(f.original);
  if (f.kind === 'rich') return inlineToBlocks(f.original);
  if (f.kind === 'textonly') return f.text;
  return plainText(f.original);
}
