import { $, $$ } from '../core/env.js';

/**
 * Enveloppe du visualiseur de la collection ([data-model-viewer]).
 * En attendant la 3D : les boutons de modèle changent le titre et l'image de la scène.
 * Le futur visualiseur 3D écoutera « dds:viewer-model » (detail.model = slug) et posera
 * la classe .is-3d sur l'enveloppe pour afficher l'indice « Faites pivoter ».
 */
export function initModelViewers(root = document) {
  return $$('[data-model-viewer]', root).map((viewer) => {
    const title = $('[data-viewer-title]', viewer);
    const image = $('[data-viewer-image]', viewer);
    const buttons = $$('[data-viewer-model]', viewer);

    const select = (btn) => {
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      if (title && btn.dataset.title) title.textContent = btn.dataset.title;
      if (image && btn.dataset.src && image.getAttribute('src') !== btn.dataset.src) {
        image.classList.add('is-swapping');
        const next = new Image();
        next.onload = next.onerror = () => {
          image.removeAttribute('srcset');
          image.src = btn.dataset.src;
          image.alt = btn.dataset.alt || '';
          requestAnimationFrame(() => image.classList.remove('is-swapping'));
        };
        next.src = btn.dataset.src;
      }
      viewer.dispatchEvent(new CustomEvent('dds:viewer-model', { bubbles: true, detail: { model: btn.dataset.viewerModel } }));
    };

    buttons.forEach((btn) => btn.addEventListener('click', () => select(btn)));
    return { viewer, select };
  });
}
