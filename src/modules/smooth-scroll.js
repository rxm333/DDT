import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../core/gsap.js';
import { prefersReducedMotion, $ } from '../core/env.js';
import { SELECTORS, SMOOTH_SCROLL } from '../config.js';

let lenis = null;

const raf = (time) => lenis?.raf(time * 1000);

/**
 * Smooth scroll Lenis, piloté par le ticker GSAP pour rester synchronisé avec ScrollTrigger
 * (une seule boucle requestAnimationFrame pour tout le site).
 * Désactivé si l'utilisateur demande moins d'animations : on garde le scroll natif.
 */
export function initSmoothScroll() {
  if (!prefersReducedMotion()) {
    lenis = new Lenis({
      autoRaf: false,
      lerp: SMOOTH_SCROLL.lerp,
      wheelMultiplier: SMOOTH_SCROLL.wheelMultiplier,
      smoothWheel: true,
      syncTouch: false, // le scroll tactile reste natif (meilleur ressenti et perf sur mobile)
      stopInertiaOnNavigate: true,
      respectReducedMotion: true,
      anchors: false, // ancres gérées ci-dessous (offset navbar + focus)
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
  }

  // Capture : passe avant le scroll jQuery de webflow.js, qui ne doit pas s'exécuter en double
  document.addEventListener('click', onAnchorClick, { capture: true });

  // Arrivée sur la page avec une ancre (#section)
  if (location.hash.length > 1) {
    const target = getHashTarget(location.hash);
    if (target) requestAnimationFrame(() => scrollToTarget(target, { immediate: true }));
  }

  return lenis;
}

export const getLenis = () => lenis;
export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();

function getHashTarget(hash) {
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

function getOffset() {
  const nav = $(SELECTORS.navbar.component);
  return (nav ? nav.getBoundingClientRect().bottom : 0) + SMOOTH_SCROLL.anchorExtraOffset;
}

function onAnchorClick(event) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const link = event.target.closest?.('a[href*="#"]');
  if (!link || link.target === '_blank') return;

  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin || url.pathname !== location.pathname || url.hash.length < 2) return;

  const target = getHashTarget(url.hash);
  if (!target) return;

  event.preventDefault();
  event.stopPropagation();
  scrollToTarget(target);
  history.pushState(null, '', url.hash);
}

/** Scroll vers une cible, puis déplace le focus dessus (lecteurs d'écran, clavier). */
export function scrollToTarget(target, { immediate = false } = {}) {
  const moveFocus = () => {
    if (!target.matches('a, button, input, select, textarea, [tabindex]')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  };

  if (lenis) {
    lenis.scrollTo(target, {
      offset: -getOffset(),
      duration: SMOOTH_SCROLL.anchorDuration,
      immediate,
      onComplete: moveFocus,
    });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY - getOffset();
    window.scrollTo({ top, behavior: 'auto' });
    moveFocus();
  }
}
