import { $, $$ } from '../core/env.js';

/**
 * Fiche produit : galerie (miniatures → image principale) et sélecteur de quantité.
 * Le visualiseur 3D viendra se brancher dans [data-product-viewer] ; il pourra
 * écouter l'événement « dds:gallery-change » émis à chaque changement de vue.
 */

function initGallery(gallery) {
  const main = $('[data-gallery-main]', gallery) || $('[data-product-viewer] img', gallery);
  const thumbs = $$('[data-gallery-thumb]', gallery);
  if (!main || !thumbs.length) return;

  const select = (thumb) => {
    const img = $('img', thumb);
    if (!img) return;
    main.removeAttribute('srcset');
    main.removeAttribute('sizes');
    if (img.getAttribute('srcset')) {
      main.setAttribute('srcset', img.getAttribute('srcset'));
      main.setAttribute('sizes', '(max-width: 991px) 100vw, 60vw');
    }
    main.src = img.currentSrc || img.src;
    main.alt = thumb.dataset.alt || '';
    thumbs.forEach((t) => t.setAttribute('aria-pressed', String(t === thumb)));
    gallery.dispatchEvent(new CustomEvent('dds:gallery-change', { bubbles: true, detail: { index: thumbs.indexOf(thumb), src: main.src } }));
  };

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => select(thumb));
  });
}

function initQuantity(group) {
  const input = $('[data-qty-input]', group);
  const minus = $('[data-qty-minus]', group);
  const plus = $('[data-qty-plus]', group);
  if (!input) return;

  const min = Number(input.min) || 1;
  const max = Number(input.max) || 10;
  const product = group.dataset.qty;
  const addButtons = product ? $$(`[data-cart="add"][data-product="${product}"]`) : [];

  const set = (value) => {
    const v = Math.min(max, Math.max(min, Math.round(Number(value)) || min));
    input.value = String(v);
    if (minus) minus.disabled = v <= min;
    if (plus) plus.disabled = v >= max;
    addButtons.forEach((b) => (b.dataset.quantity = String(v)));
  };

  minus?.addEventListener('click', () => set(Number(input.value) - 1));
  plus?.addEventListener('click', () => set(Number(input.value) + 1));
  input.addEventListener('change', () => set(input.value));
  set(input.value);
}

export function initProduct(root = document) {
  $$('[data-gallery]', root).forEach(initGallery);
  $$('[data-qty]', root).forEach(initQuantity);
}
