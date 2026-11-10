import { gsap, ScrollTrigger, SplitText } from '../core/gsap.js';
import { $$, MQ, isInViewport } from '../core/env.js';
import { REVEALS } from '../config.js';

/**
 * Apparitions au scroll (une seule fois), uniquement si l'utilisateur accepte les animations.
 * - Les éléments déjà visibles au chargement ne sont pas cachés : aucun flash, aucun contenu masqué si le JS tarde.
 * - Seuls transform et opacity sont animés (pas de reflow).
 * - gsap.matchMedia annule tout proprement si la préférence « réduire les animations » change.
 */
export function initReveal() {
  const mm = gsap.matchMedia();

  mm.add(MQ.motionOK, () => {
    const belowFold = (el) => !isInViewport(el, 40);

    // 1. Titres : lignes qui montent depuis un masque
    $$(REVEALS.splitHeadings.join(',')).filter(belowFold).forEach((heading) => {
      SplitText.create(heading, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'dds-line',
        autoSplit: true, // re-découpe proprement après chargement des polices / redimensionnement
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.09,
            scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
          }),
      });
    });

    // 2. Éléments simples
    $$(REVEALS.fadeUp.join(',')).filter(belowFold).forEach((el) => {
      gsap.from(el, {
        y: 32,
        autoAlpha: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });

    // 3. Groupes en cascade (cartes produit…), regroupés par ScrollTrigger.batch
    REVEALS.stagger.forEach((selector) => {
      const targets = $$(selector).filter(belowFold);
      if (!targets.length) return;
      gsap.set(targets, { y: 48, autoAlpha: 0 });
      ScrollTrigger.batch(targets, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, autoAlpha: 1, duration: 1.1, ease: 'expo.out', stagger: 0.1, overwrite: true }),
      });
    });

    // 4. Parallaxe liée au scroll
    REVEALS.parallax.forEach(({ selector, from, to }) => {
      $$(selector).forEach((el) => {
        gsap.fromTo(el, from, {
          ...to,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom 85%', scrub: true },
        });
      });
    });
  });

  return mm;
}
