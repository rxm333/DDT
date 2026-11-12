// Bundle 3D (Three.js) chargé à la demande : héros de l'accueil + visualiseur de la page collection.
// window.DDS3D.boot() / destroy() sont appelés par les transitions de page (Barba).
import { bootHero, destroyHero } from './index.js';
import { bootViewers, destroyViewers } from './viewer.js';

const boot = () => {
  bootHero();
  bootViewers();
};
window.DDS3D = {
  boot,
  destroy() {
    destroyHero();
    destroyViewers();
  },
};
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();
