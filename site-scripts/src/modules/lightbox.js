/**
 * Visionneuse plein écran des photos (fiches produit).
 * - un clic (ou Entrée) sur une photo l'ouvre en grand ; ← → ou glisser pour passer à la suivante ;
 * - Échap, le bouton ✕ ou un clic sur le fond ferment ; le focus revient sur la photo d'origine.
 * Une seule <dialog> pour tout le site, créée au premier usage.
 */
let dialog;
let state = { items: [], index: 0, trigger: null };

const largest = (img) => {
  const set = (img.getAttribute('srcset') || '').split(',').map((s) => s.trim().split(/\s+/)).filter((p) => p[0]);
  if (!set.length) return img.currentSrc || img.src;
  return set.sort((a, b) => parseInt(b[1] || '0', 10) - parseInt(a[1] || '0', 10))[0][0];
};

/** Photo → élément de la visionneuse ({ src, alt }). */
export const itemOf = (img, alt) => ({ src: largest(img), alt: alt ?? img.getAttribute('alt') ?? '' });

function build() {
  dialog = document.createElement('dialog');
  dialog.className = 'dds-lightbox';
  dialog.setAttribute('aria-label', 'Photo agrandie');
  dialog.innerHTML = `
    <div class="dds-lightbox_stage">
      <img class="dds-lightbox_image" alt="" decoding="async">
    </div>
    <p class="dds-lightbox_caption" aria-live="polite"></p>
    <p class="dds-lightbox_count" aria-hidden="true"></p>
    <button type="button" class="dds-lightbox_btn is-close" aria-label="Fermer"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9"/></svg></button>
    <button type="button" class="dds-lightbox_btn is-prev" aria-label="Photo précédente"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg></button>
    <button type="button" class="dds-lightbox_btn is-next" aria-label="Photo suivante"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg></button>`;
  document.body.append(dialog);
  const img = dialog.querySelector('.dds-lightbox_image');
  const stage = dialog.querySelector('.dds-lightbox_stage');

  dialog.querySelector('.is-close').addEventListener('click', () => close());
  dialog.querySelector('.is-prev').addEventListener('click', () => go(-1));
  dialog.querySelector('.is-next').addEventListener('click', () => go(1));
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('is-lightbox-open');
      state.trigger?.focus?.({ preventScroll: true });
  });
  // Clic sur le fond (hors photo et boutons) : fermer
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog || e.target === stage) close();
  });

  // Glisser (doigt) pour changer de photo
  const swipe = { x: 0, y: 0, id: null, moved: false };
  stage.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    Object.assign(swipe, { x: e.clientX, y: e.clientY, id: e.pointerId, moved: false });
  });
  stage.addEventListener('pointerup', (e) => {
    if (e.pointerId !== swipe.id) return;
    const dx = e.clientX - swipe.x;
    const dy = e.clientY - swipe.y;
    swipe.id = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      swipe.moved = true;
      go(dx < 0 ? 1 : -1);
      setTimeout(() => (swipe.moved = false), 0);
    }
  });
}

function render() {
  const { items, index } = state;
  const item = items[index];
  const img = dialog.querySelector('.dds-lightbox_image');
  img.classList.remove('is-in');
  img.onload = () => img.classList.add('is-in');
  img.src = item.src;
  img.alt = item.alt;
  if (img.complete) img.classList.add('is-in');
  dialog.querySelector('.dds-lightbox_caption').textContent = item.alt;
  dialog.querySelector('.dds-lightbox_count').textContent = items.length > 1 ? `${index + 1} / ${items.length}` : '';
  dialog.classList.toggle('is-single', items.length < 2);
  // Précharge les voisines
  for (const d of [-1, 1]) {
    const n = items[(index + d + items.length) % items.length];
    if (n && n !== item) new Image().src = n.src;
  }
}

function go(step) {
  if (state.items.length < 2) return;
  state.index = (state.index + step + state.items.length) % state.items.length;
  render();
}

export function openLightbox(items, index = 0, trigger = null) {
  if (!items.length) return;
  if (!dialog) build();
  state = { items, index: Math.max(0, Math.min(index, items.length - 1)), trigger };
  render();
  document.documentElement.classList.add('is-lightbox-open');
  if (!dialog.open) dialog.showModal();
  dialog.querySelector('.is-close').focus({ preventScroll: true });
}

export function close() {
  if (dialog?.open) dialog.close();
}

/** Rend une photo cliquable (souris, clavier) pour ouvrir la visionneuse. */
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
