/**
 * Galerie plein écran des photos (fiches produit).
 * - La photo est toujours entière (contenue dans l'écran, jamais rognée).
 * - Changer de photo : flèches, miniatures, ← →, glisser au doigt (hors zoom).
 * - Zoomer : boutons + / −, molette, double-clic ou double tape (à l'endroit visé), pincement, touches + − 0.
 *   Zoomée, la photo se déplace en la faisant glisser (souris ou doigt) ; elle ne sort jamais du cadre.
 * - Fermer : Échap, bouton ✕, clic sur le fond ; le focus revient sur la photo d'origine.
 * Une seule <dialog> pour tout le site, créée au premier usage.
 */
let dialog;
let ui;
let state = { items: [], index: 0, trigger: null };
const view = { s: 1, x: 0, y: 0 }; // zoom et décalage (px) de la photo affichée
const MAX = 4;
const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const largest = (img) => {
  const set = (img.getAttribute('srcset') || '').split(',').map((s) => s.trim().split(/\s+/)).filter((p) => p[0]);
  if (!set.length) return img.currentSrc || img.src;
  return set.sort((a, b) => parseInt(b[1] || '0', 10) - parseInt(a[1] || '0', 10))[0][0];
};
const smallest = (img) => {
  const set = (img.getAttribute('srcset') || '').split(',').map((s) => s.trim().split(/\s+/)).filter((p) => p[0]);
  if (!set.length) return img.currentSrc || img.src;
  return set.sort((a, b) => parseInt(a[1] || '0', 10) - parseInt(b[1] || '0', 10))[0][0];
};

/** Photo → élément de la galerie ({ src, thumb, alt }). */
export const itemOf = (img, alt) => ({ src: largest(img), thumb: smallest(img), alt: alt ?? img.getAttribute('alt') ?? '' });

const ICON = {
  close: '<path d="M3.5 3.5l9 9M12.5 3.5l-9 9"/>',
  prev: '<path d="M10 3L5 8l5 5"/>',
  next: '<path d="M6 3l5 5-5 5"/>',
  plus: '<path d="M8 3.5v9M3.5 8h9"/>',
  minus: '<path d="M3.5 8h9"/>',
};
const icon = (name) => `<svg viewBox="0 0 16 16" aria-hidden="true">${ICON[name]}</svg>`;

function build() {
  dialog = document.createElement('dialog');
  dialog.className = 'dds-lightbox';
  dialog.setAttribute('aria-label', 'Galerie photos');
  dialog.innerHTML = `
    <div class="dds-lightbox_bar">
      <p class="dds-lightbox_count" aria-hidden="true"></p>
      <div class="dds-lightbox_tools" role="group" aria-label="Zoom">
        <button type="button" class="dds-lightbox_btn" data-act="out" aria-label="Dézoomer">${icon('minus')}</button>
        <button type="button" class="dds-lightbox_zoom" data-act="reset" aria-label="Taille d’origine">100 %</button>
        <button type="button" class="dds-lightbox_btn" data-act="in" aria-label="Zoomer">${icon('plus')}</button>
      </div>
      <button type="button" class="dds-lightbox_btn is-close" data-act="close" aria-label="Fermer la galerie">${icon('close')}</button>
    </div>
    <div class="dds-lightbox_stage">
      <div class="dds-lightbox_frame"><img class="dds-lightbox_image" alt="" decoding="async" draggable="false"></div>
      <span class="dds-lightbox_spinner" aria-hidden="true"></span>
      <button type="button" class="dds-lightbox_btn is-nav is-prev" data-act="prev" aria-label="Photo précédente">${icon('prev')}</button>
      <button type="button" class="dds-lightbox_btn is-nav is-next" data-act="next" aria-label="Photo suivante">${icon('next')}</button>
    </div>
    <div class="dds-lightbox_foot">
      <p class="dds-lightbox_caption"></p>
      <div class="dds-lightbox_thumbs" role="group" aria-label="Choisir une photo"></div>
    </div>
    <p class="dds-lightbox_live sr-only" aria-live="polite"></p>`;
  document.body.append(dialog);
  ui = {
    stage: dialog.querySelector('.dds-lightbox_stage'),
    frame: dialog.querySelector('.dds-lightbox_frame'),
    img: dialog.querySelector('.dds-lightbox_image'),
    count: dialog.querySelector('.dds-lightbox_count'),
    caption: dialog.querySelector('.dds-lightbox_caption'),
    thumbs: dialog.querySelector('.dds-lightbox_thumbs'),
    zoom: dialog.querySelector('.dds-lightbox_zoom'),
    zin: dialog.querySelector('[data-act="in"]'),
    zout: dialog.querySelector('[data-act="out"]'),
    live: dialog.querySelector('.dds-lightbox_live'),
  };

  dialog.addEventListener('click', (e) => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (act === 'close') return close();
    if (act === 'prev') return go(-1);
    if (act === 'next') return go(1);
    if (act === 'in') return zoomBy(1.6);
    if (act === 'out') return zoomBy(1 / 1.6);
    if (act === 'reset') return zoomTo(view.s > 1.01 ? 1 : 2);
    const thumb = e.target.closest('[data-index]');
    if (thumb) return show(Number(thumb.dataset.index));
    // Clic sur le fond (hors photo, barre et miniatures) : fermer
    if (!drag.moved && (e.target === dialog || e.target === ui.stage || e.target === ui.frame)) close();
  });
  dialog.addEventListener('keydown', (e) => {
    if (e.target.closest('.dds-lightbox_thumbs') && (e.key === 'Enter' || e.key === ' ')) return;
    const k = e.key;
    if (k === 'ArrowLeft') { e.preventDefault(); go(-1); }
    else if (k === 'ArrowRight') { e.preventDefault(); go(1); }
    else if (k === '+' || k === '=') { e.preventDefault(); zoomBy(1.6); }
    else if (k === '-' || k === '_') { e.preventDefault(); zoomBy(1 / 1.6); }
    else if (k === '0') { e.preventDefault(); zoomTo(1); }
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('is-lightbox-open');
    state.trigger?.focus?.({ preventScroll: true });
  });

  // Molette : zoom vers le pointeur (le trackpad pincé envoie aussi ctrl + molette)
  ui.stage.addEventListener('wheel', (e) => {
    e.preventDefault();
    const k = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0025));
    zoomTo(view.s * k, e.clientX, e.clientY, true);
  }, { passive: false });

  // Double-clic / double tape : zoom ×2,5 à l'endroit visé, ou retour à 100 %
  let lastTap = 0;
  ui.frame.addEventListener('dblclick', (e) => toggleZoom(e.clientX, e.clientY));

  // Pointeurs : glisser (déplacement si zoomé, sinon changement de photo au doigt), pincement
  const pts = new Map();
  const drag = { x: 0, y: 0, vx: 0, vy: 0, ox: 0, oy: 0, moved: false, pinch: null, startX: 0, startY: 0, type: '' };
  ui.stage.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button')) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    ui.stage.setPointerCapture(e.pointerId);
    drag.moved = false;
    drag.type = e.pointerType;
    if (pts.size === 2) {
      const [a, b] = [...pts.values()];
      drag.pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), s: view.s };
    } else {
      Object.assign(drag, { x: e.clientX, y: e.clientY, startX: e.clientX, startY: e.clientY, ox: view.x, oy: view.y, pinch: null });
    }
  });
  ui.stage.addEventListener('pointermove', (e) => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 2 && drag.pinch) {
      const [a, b] = [...pts.values()];
      zoomTo(drag.pinch.s * (Math.hypot(a.x - b.x, a.y - b.y) / drag.pinch.d), (a.x + b.x) / 2, (a.y + b.y) / 2, true);
      drag.moved = true;
      return;
    }
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
    if (view.s > 1.01) {
      dialog.classList.add('is-panning');
      setView(view.s, drag.ox + dx, drag.oy + dy, true);
    } else if (drag.type !== 'mouse') {
      // Au doigt, sans zoom : la photo suit le doigt horizontalement
      ui.frame.style.transition = 'none';
      ui.frame.style.transform = `translate3d(${dx}px, 0, 0)`;
    }
  });
  const end = (e) => {
    if (!pts.has(e.pointerId)) return;
    pts.delete(e.pointerId);
    dialog.classList.remove('is-panning');
    if (pts.size) { drag.pinch = null; const [p] = [...pts.values()]; Object.assign(drag, { startX: p.x, startY: p.y, ox: view.x, oy: view.y }); return; }
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (view.s <= 1.01 && drag.type !== 'mouse' && !drag.pinch) {
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3 && state.items.length > 1) go(dx < 0 ? 1 : -1, dx);
      else setView(1, 0, 0);
    }
    // Double tape (doigt)
    if (drag.type !== 'mouse' && !drag.moved && e.type === 'pointerup') {
      const now = performance.now();
      if (now - lastTap < 300) { toggleZoom(e.clientX, e.clientY); lastTap = 0; } else lastTap = now;
    }
    if (view.s < 1) zoomTo(1);
    setTimeout(() => (drag.moved = false), 0);
  };
  ui.stage.addEventListener('pointerup', end);
  ui.stage.addEventListener('pointercancel', end);

  window.addEventListener('resize', () => dialog.open && setView(view.s, view.x, view.y));
}

// ---------- Zoom et déplacement ----------
// Taille de la photo affichée à 100 % (contenue dans la scène)
function fitted() {
  const box = ui.stage.getBoundingClientRect();
  const w = ui.img.naturalWidth || box.width;
  const h = ui.img.naturalHeight || box.height;
  const k = Math.min(box.width / w, box.height / h);
  return { box, w: w * k, h: h * k };
}
function setView(s, x, y, instant = false) {
  const { box, w, h } = fitted();
  s = Math.min(MAX, Math.max(1, s));
  const mx = Math.max(0, (w * s - box.width) / 2);
  const my = Math.max(0, (h * s - box.height) / 2);
  view.s = s;
  view.x = Math.min(mx, Math.max(-mx, x));
  view.y = Math.min(my, Math.max(-my, y));
  ui.frame.style.transition = instant || reduce() ? 'none' : '';
  ui.frame.style.transform = `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.s})`;
  dialog.classList.toggle('is-zoomed', view.s > 1.01);
  ui.zoom.textContent = `${Math.round(view.s * 100)} %`;
  ui.zout.disabled = view.s <= 1.001;
  ui.zin.disabled = view.s >= MAX - 0.001;
}
// Zoom vers un point de l'écran (cx, cy) : ce point reste sous le pointeur
function zoomTo(s, cx, cy, instant = false) {
  s = Math.min(MAX, Math.max(1, s));
  const box = ui.stage.getBoundingClientRect();
  const px = (cx ?? box.left + box.width / 2) - (box.left + box.width / 2);
  const py = (cy ?? box.top + box.height / 2) - (box.top + box.height / 2);
  const r = s / view.s;
  setView(s, px - (px - view.x) * r, py - (py - view.y) * r, instant);
}
const zoomBy = (k) => zoomTo(view.s * k);
const toggleZoom = (cx, cy) => zoomTo(view.s > 1.01 ? 1 : 2.5, cx, cy);

// ---------- Photos ----------
function renderThumbs() {
  const { items } = state;
  ui.thumbs.replaceChildren(
    ...items.map((item, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'dds-lightbox_thumb';
      b.dataset.index = String(i);
      b.setAttribute('aria-label', `Photo ${i + 1} sur ${items.length}${item.alt ? ` : ${item.alt}` : ''}`);
      const t = document.createElement('img');
      t.src = item.thumb || item.src;
      t.alt = '';
      t.loading = 'lazy';
      t.decoding = 'async';
      b.append(t);
      return b;
    }),
  );
}

function render(direction = 0) {
  const { items, index } = state;
  const item = items[index];
  const img = ui.img;
  dialog.classList.add('is-loading');
  img.classList.remove('is-in');
  ui.frame.style.setProperty('--from', direction ? `${direction > 0 ? 40 : -40}px` : '0px');
  img.onload = () => {
    dialog.classList.remove('is-loading');
    setView(1, 0, 0, true);
    requestAnimationFrame(() => img.classList.add('is-in'));
  };
  img.src = item.src;
  img.alt = item.alt;
  if (img.complete && img.naturalWidth) img.onload();
  setView(1, 0, 0, true);
  ui.count.textContent = items.length > 1 ? `${index + 1} / ${items.length}` : '';
  ui.caption.textContent = item.alt;
  ui.live.textContent = `Photo ${index + 1} sur ${items.length}${item.alt ? ` : ${item.alt}` : ''}`;
  dialog.classList.toggle('is-single', items.length < 2);
  ui.thumbs.querySelectorAll('.dds-lightbox_thumb').forEach((t, i) => {
    const on = i === index;
    t.classList.toggle('is-active', on);
    if (on) t.setAttribute('aria-current', 'true');
    else t.removeAttribute('aria-current');
    if (on) t.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce() ? 'auto' : 'smooth' });
  });
  // Précharge les voisines
  for (const d of [-1, 1]) {
    const n = items[(index + d + items.length) % items.length];
    if (n && n !== item) new Image().src = n.src;
  }
}

function show(index) {
  if (index === state.index) return;
  const dir = index > state.index ? 1 : -1;
  state.index = index;
  render(dir);
}

function go(step, from) {
  if (state.items.length < 2) return;
  state.index = (state.index + step + state.items.length) % state.items.length;
  render(from ? -Math.sign(from) : step);
}

export function openLightbox(items, index = 0, trigger = null) {
  if (!items.length) return;
  if (!dialog) build();
  state = { items, index: Math.max(0, Math.min(index, items.length - 1)), trigger };
  document.documentElement.classList.add('is-lightbox-open');
  if (!dialog.open) dialog.showModal();
  renderThumbs();
  render();
  dialog.querySelector('.is-close').focus({ preventScroll: true });
}

export function close() {
  if (dialog?.open) dialog.close();
}

/** Rend une photo cliquable (souris, clavier) pour ouvrir la galerie. */
export function makeZoomable(img, open, { generic = false } = {}) {
  if (img.dataset.lightbox) return;
  img.dataset.lightbox = '';
  img.setAttribute('tabindex', '0');
  img.setAttribute('role', 'button');
  img.setAttribute('aria-haspopup', 'dialog');
  const label = generic ? '' : img.getAttribute('alt');
  img.setAttribute('aria-label', label ? `Agrandir la photo : ${label}` : 'Agrandir la photo'); // generic : la photo change (galerie)
  img.addEventListener('click', () => open(img));
  img.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open(img);
    }
  });
}
