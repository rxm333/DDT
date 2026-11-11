/**
 * Dame de Tours — point d'entrée.
 * Chargé depuis Webflow avec <script defer>. Aucune interaction Webflow / webflow.js n'est utilisée.
 */
import './styles/main.css';
import './styles/product.css';
import './styles/buttons.css';
import './styles/customizer.css';
import { ScrollTrigger } from './core/gsap.js';
import { initSmoothScroll, scrollToTarget, stopScroll, startScroll } from './modules/smooth-scroll.js';
import { initNavbar } from './modules/navbar.js';
import { initHover, initRoll } from './modules/hover.js';
import { initReveal } from './modules/reveal.js';
import { initMarquee } from './modules/marquee.js';
import { initProduct } from './modules/product.js';
import { initButtons } from './modules/buttons.js';
import { initCustomizer } from './modules/customizer.js';
import { initAccordions } from './modules/accordion.js';
import { loadHero3d } from './modules/hero3d-loader.js';
import { initModelViewers } from './modules/model-viewer.js';
import { initSwipers } from './modules/swiper.js';
import { initAnnounce } from './modules/announce.js';
import { initForms } from './modules/forms.js';
import { initTransitions } from './modules/transitions.js';
import { initLogoSpin } from './modules/logo-spin.js';

const VERSION = '1.14.3';

function safe(name, fn) {
  try {
    return fn();
  } catch (error) {
    console.error(`[DDS] ${name} :`, error);
    return null;
  }
}

// --- Modules propres au contenu de la page (réinitialisés à chaque transition Barba) ---
let cleanups = [];
const deferred = [];
const runDeferred = () => deferred.splice(0).forEach((fn) => fn());
let lenis = null;
const api = {};

function initPage({ defer = false } = {}) {
  const c = [];
  safe('roll', () => initRoll());
  safe('buttons', initButtons);
  const reveal = safe('reveal', initReveal);
  if (reveal) c.push(() => reveal.revert());
  const marquees = safe('marquee', () => initMarquee({ lenis }));
  (marquees || []).forEach((m) => c.push(() => m?.destroy?.()));
  safe('product', initProduct);
  safe('accordions', initAccordions);
  // La 3D (chargement, compilation des shaders) est lourde : pendant une transition, on la lance
  // seulement une fois la nouvelle page affichée, pour ne pas saccader l'animation d'entrée.
  if (defer) deferred.push(() => safe('hero3d', loadHero3d));
  else safe('hero3d', loadHero3d);
  c.push(() => window.DDS3D?.destroy());
  safe('model-viewer', initModelViewers);
  safe('swiper', initSwipers);
  safe('forms', initForms);
  api.customizer = safe('customizer', initCustomizer);
  cleanups = c;
}

function destroyPage() {
  cleanups.splice(0).forEach((fn) => safe('nettoyage', fn));
  // Filet de sécurité : plus aucun déclencheur de scroll de l'ancienne page
  ScrollTrigger.getAll().forEach((st) => st.kill());
}

function boot() {
  if (window.DDS?.version) return; // déjà initialisé

  // --- Éléments persistants (hors conteneur Barba) : une seule fois ---
  lenis = safe('smooth-scroll', initSmoothScroll);
  safe('announce', initAnnounce);
  const navbar = safe('navbar', () => initNavbar({ lenis }));
  safe('logo-spin', initLogoSpin);
  safe('hover', initHover); // texte qui roule (navbar, footer) + boutons magnétiques

  initPage();
  const barba = safe('transitions', () => initTransitions({ lenis, navbar, destroyPage, initPage: () => initPage({ defer: true }), runDeferred }));

  // Les positions changent quand images et polices arrivent
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  document.documentElement.classList.add('dds-ready');

  // API publique, utile pour le futur JS (panier, pages…)
  window.DDS = {
    version: VERSION,
    lenis,
    navbar,
    barba,
    get customizer() {
      return api.customizer;
    },
    scrollTo: scrollToTarget,
    stopScroll,
    startScroll,
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
