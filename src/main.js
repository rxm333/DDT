/**
 * Dame de Tours — point d'entrée.
 * Chargé depuis Webflow avec <script defer>. Aucune interaction Webflow / webflow.js n'est utilisée.
 */
import './styles/main.css';
import './styles/product.css';
import './styles/buttons.css';
import { ScrollTrigger } from './core/gsap.js';
import { initSmoothScroll, scrollToTarget, stopScroll, startScroll } from './modules/smooth-scroll.js';
import { initNavbar } from './modules/navbar.js';
import { initHover } from './modules/hover.js';
import { initReveal } from './modules/reveal.js';
import { initMarquee } from './modules/marquee.js';
import { initProduct } from './modules/product.js';
import { initButtons } from './modules/buttons.js';

const VERSION = '1.4.0';

function safe(name, fn) {
  try {
    return fn();
  } catch (error) {
    console.error(`[DDS] ${name} :`, error);
    return null;
  }
}

function boot() {
  if (window.DDS?.version) return; // déjà initialisé

  const lenis = safe('smooth-scroll', initSmoothScroll);
  const navbar = safe('navbar', () => initNavbar({ lenis }));
  safe('hover', initHover);
  safe('buttons', initButtons); // après le roll : il prépend le calque de remplissage
  safe('reveal', initReveal);
  safe('marquee', () => initMarquee({ lenis }));
  safe('product', initProduct);

  // Les positions changent quand images et polices arrivent
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  document.documentElement.classList.add('dds-ready');

  // API publique, utile pour le futur JS (panier, pages…)
  window.DDS = {
    version: VERSION,
    lenis,
    navbar,
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
