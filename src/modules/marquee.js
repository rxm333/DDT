import { gsap } from '../core/gsap.js';
import { $$, prefersReducedMotion } from '../core/env.js';
import { SELECTORS, MARQUEE } from '../config.js';

/**
 * Marquee de l'atelier. L'animation elle-même reste en CSS (Webflow, embed global-styles_custom).
 * Ce module ajoute :
 *  - la pause quand la section est hors écran (économie GPU / batterie) ;
 *  - une accélération douce liée à la vitesse du scroll (Lenis), via l'API Web Animations
 *    (playbackRate des animations CSS) : pas de recalcul de style, pas de layout.
 */
export function initMarquee({ lenis } = {}) {
  const sections = $$(SELECTORS.marquee.section);
  if (!sections.length) return;

  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle('is-offscreen', !e.isIntersecting)),
    { rootMargin: '100px 0px' }
  );
  sections.forEach((s) => io.observe(s));

  if (!MARQUEE.velocityBoost || !lenis || prefersReducedMotion()) return;

  const getAnimations = () =>
    sections.flatMap((s) => $$(SELECTORS.marquee.list, s)).flatMap((el) => el.getAnimations?.() ?? []);

  const state = { rate: 1 };
  let animations = [];
  const apply = () => {
    if (!animations.length) animations = getAnimations();
    animations.forEach((a) => (a.playbackRate = state.rate));
  };

  lenis.on('scroll', ({ velocity }) => {
    if (sections.every((s) => s.classList.contains('is-offscreen'))) return;
    const target = 1 + Math.min(Math.abs(velocity) / 12, MARQUEE.maxBoost);
    gsap.to(state, { rate: target, duration: 0.25, ease: 'power2.out', overwrite: true, onUpdate: apply });
    gsap.to(state, { rate: 1, duration: 1.2, ease: 'power3.out', delay: 0.25, onUpdate: apply });
  });
}
