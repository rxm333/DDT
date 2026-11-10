import { $ } from '../core/env.js';

/**
 * Charge le héros 3D (bundle séparé, Three.js) seulement s'il y a un emplacement
 * [data-hero-viewer] sur la page et que l'appareil s'y prête. Le fichier est servi
 * depuis le même dossier que ce bundle (même commit sur jsDelivr).
 */
const SRC = (() => {
  const s = document.currentScript?.src || '';
  return s ? s.replace(/[^/]*$/, 'hero-3d.min.js') : '';
})();

export function loadHero3d() {
  const slot = $('[data-hero-viewer]');
  const viewer = $('[data-model-viewer] [data-viewer-stage], [data-model-viewer] .col-viewer_stage');
  if (!slot && !viewer) return null;
  const section = slot?.closest('.section_hero');
  const reveal = () => section?.classList.add('is-hero-in'); // le texte du héros s'affiche quoi qu'il arrive
  if (!SRC || navigator.connection?.saveData) return reveal(), null;
  const s = document.createElement('script');
  s.onerror = reveal;
  s.src = SRC;
  s.async = true;
  s.crossOrigin = 'anonymous';
  document.head.append(s);
  return s;
}
