import { gsap } from '../core/gsap.js';
import { $$, MQ } from '../core/env.js';
import { BUTTONS } from '../config.js';

/**
 * Boutons : remplissage circulaire qui part du curseur, reflet lumineux, pression,
 * flèche qui glisse et attraction magnétique douce (souris uniquement).
 * Le JS prépare le markup et suit la position du pointeur ; toutes les transitions
 * sont en CSS (transform / opacity), donc fluides et sans coût au survol.
 */
export function initButtons() {
  const buttons = [];
  for (const [variant, selectors] of Object.entries(BUTTONS.variants)) {
    $$(selectors.join(',')).forEach((el) => {
      if (enhance(el, variant)) buttons.push(el);
    });
  }

  const mm = gsap.matchMedia();
  mm.add(`${MQ.finePointer} and ${MQ.motionOK}`, () => {
    const cleanups = $$(BUTTONS.magnetic.join(','))
      .filter((el) => el.classList.contains('dds-btn'))
      .map((el) => magnetic(el, BUTTONS.magneticStrength));
    return () => cleanups.forEach((fn) => fn());
  });

  return { buttons, mm };
}

function enhance(el, variant) {
  if (el.classList.contains('dds-btn')) return false;
  el.classList.add('dds-btn', `dds-btn--${variant}`);

  const fill = document.createElement('span');
  fill.className = 'dds-btn__fill';
  fill.setAttribute('aria-hidden', 'true');
  el.prepend(fill);

  // Position d'entrée / de sortie du pointeur → origine du cercle de remplissage
  const place = (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    // Diamètre suffisant pour couvrir le bouton depuis n'importe quel point
    const d = 2 * Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y));
    el.style.setProperty('--dds-x', `${x}px`);
    el.style.setProperty('--dds-y', `${y}px`);
    el.style.setProperty('--dds-d', `${d}px`);
  };
  el.addEventListener('pointerenter', place);
  el.addEventListener('pointerleave', place);
  // Clavier : le cercle part du centre
  el.addEventListener('focus', () => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--dds-x', `${r.width / 2}px`);
    el.style.setProperty('--dds-y', `${r.height / 2}px`);
    el.style.setProperty('--dds-d', `${Math.hypot(r.width, r.height)}px`);
  });
  return true;
}

function magnetic(el, strength) {
  const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
  const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
  let rect = null;
  const onEnter = () => (rect = el.getBoundingClientRect());
  const onMove = (e) => {
    if (!rect) return;
    xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
    yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const onLeave = () => {
    rect = null;
    xTo(0);
    yTo(0);
  };
  el.addEventListener('pointerenter', onEnter);
  el.addEventListener('pointermove', onMove, { passive: true });
  el.addEventListener('pointerleave', onLeave);
  return () => {
    el.removeEventListener('pointerenter', onEnter);
    el.removeEventListener('pointermove', onMove);
    el.removeEventListener('pointerleave', onLeave);
    gsap.set(el, { clearProps: 'x,y' });
  };
}
