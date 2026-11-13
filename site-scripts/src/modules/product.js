import { $, $$ } from '../core/env.js';
import { loadHero3d } from './hero3d-loader.js';

/**
 * Fiche produit : galerie (miniatures → image principale) et sélecteur de quantité.
 * La miniature [data-gallery-model="<plateau>"] affiche le rendu 3D dans [data-product-viewer] :
 * le bundle 3D (Three.js) n'est téléchargé qu'au premier clic. Revenir à une photo met la
 * scène en pause (data-viewer-paused) sans la détruire : un nouveau clic la ré-affiche aussitôt.
 * « dds:gallery-change » est émis à chaque changement de vue.
 */

function initGallery(gallery) {
  const main = $('[data-gallery-main]', gallery) || $('[data-product-viewer] img', gallery);
  const thumbs = $$('[data-gallery-thumb]', gallery);
  if (!main || !thumbs.length) return;

  // Garde la miniature choisie visible dans la rangée qui défile (sans faire bouger la page).
  const reveal = (thumb) => {
    const row = thumb.closest('ul, ol, [role="list"]');
    if (!row || row.scrollWidth <= row.clientWidth) return;
    const r = row.getBoundingClientRect();
    const t = thumb.getBoundingClientRect();
    const pad = 4;
    if (t.left < r.left + pad) row.scrollLeft += t.left - r.left - pad;
    else if (t.right > r.right - pad) row.scrollLeft += t.right - r.right + pad;
  };

  const stage = main.closest('[data-product-viewer]') || main.parentElement;
  const setMain = (thumb) => {
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
  };
  const press = (thumb) => {
    thumbs.forEach((t) => t.setAttribute('aria-pressed', String(t === thumb)));
    reveal(thumb);
  };
  const changed = (thumb, mode) =>
    gallery.dispatchEvent(new CustomEvent('dds:gallery-change', { bubbles: true, detail: { index: thumbs.indexOf(thumb), src: main.src, mode } }));

  // ---------- Vue 3D ----------
  let hint = null;
  const show3d = (thumb) => {
    press(thumb);
    // Image de secours (et d'attente) : la vue de trois quarts, la plus proche de la 3D
    const photo = thumbs.find((t) => !('galleryModel' in t.dataset));
    if (photo) setMain(photo);
    gallery.setAttribute('data-model-viewer', '');
    gallery.dataset.viewerDefault = thumb.dataset.galleryModel || '';
    gallery.dataset.viewerName = $('h1')?.textContent.trim() || '';
    gallery.dataset.viewerFit = '1.32'; // l'échiquier entier, coins compris, dans le cadre
    stage.setAttribute('data-viewer-stage', '');
    main.setAttribute('data-viewer-image', ''); // le visualiseur la masque aux lecteurs d'écran une fois la 3D prête
    stage.classList.add('is-3d-on');
    if (!hint) {
      hint = document.createElement('p');
      hint.className = 'prod-hero_3d-hint';
      hint.setAttribute('aria-hidden', 'true'); // la scène porte sa propre description
      hint.textContent = 'Faites glisser pour pivoter';
      stage.append(hint);
      const used = () => stage.classList.contains('is-ready') && stage.classList.add('was-dragged');
      stage.addEventListener('pointerdown', used);
      stage.addEventListener('keydown', used);
    }
    if (gallery.dataset.viewer3d) {
      // Déjà monté (ou en cours) : on relance simplement le rendu
      delete gallery.dataset.viewerPaused;
      if (gallery.dataset.viewer3d === 'ready') main.setAttribute('aria-hidden', 'true');
      gallery.dispatchEvent(new CustomEvent('dds:viewer-resume'));
    } else {
      delete gallery.dataset.viewerPaused;
      stage.classList.add('is-loading');
      const script = loadHero3d();
      if (!script) stage.classList.remove('is-loading'); // économie de données ou bundle introuvable : la photo reste
      else script.addEventListener?.('error', () => stage.classList.remove('is-loading'), { once: true });
    }
    changed(thumb, '3d');
  };
  const hide3d = () => {
    if (!stage.classList.contains('is-3d-on')) return;
    stage.classList.remove('is-3d-on');
    gallery.dataset.viewerPaused = '';
    main.removeAttribute('aria-hidden');
  };

  const select = (thumb) => {
    if ('galleryModel' in thumb.dataset) return show3d(thumb);
    hide3d();
    setMain(thumb);
    press(thumb);
    changed(thumb, 'image');
  };

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => select(thumb));
    thumb.addEventListener('focus', () => reveal(thumb));
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
