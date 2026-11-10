import { gsap } from '../core/gsap.js';
import { $$, MQ } from '../core/env.js';
import { SELECTORS } from '../config.js';

/**
 * Survols :
 *  1. « Texte qui roule » : le libellé glisse vers le haut et sa copie arrive par le bas.
 *     Le JS prépare le markup, la transition est 100 % CSS (compositor, aucun coût JS au survol).
 *  2. Boutons magnétiques (icônes de la navbar) : souris uniquement, via gsap.quickTo.
 * Les soulignements animés et le zoom des images sont en CSS pur (voir styles/main.css).
 */
export function initHover() {
  $$(SELECTORS.roll.join(',')).forEach(enhanceRoll);

  const mm = gsap.matchMedia();
  mm.add(`${MQ.finePointer} and ${MQ.motionOK}`, () => {
    const cleanups = $$(SELECTORS.navbar.magnetic).map((el) => magnetic(el));
    return () => cleanups.forEach((fn) => fn());
  });
  return mm;
}

function enhanceRoll(el) {
  if (el.hasAttribute('data-dds-roll')) return;
  // Bouton Webflow : le texte est dans un <span> enfant ; lien : le texte est direct
  const host = el.children.length === 1 && el.firstElementChild.tagName === 'SPAN' ? el.firstElementChild : el;
  if (host.children.length) return; // contenu complexe : on n'y touche pas
  const text = host.textContent.trim();
  if (!text) return;

  const mask = document.createElement('span');
  mask.className = 'dds-roll';
  const label = document.createElement('span');
  label.className = 'dds-roll__text';
  label.dataset.text = text;
  label.textContent = text;
  mask.append(label);
  host.replaceChildren(mask);
  el.setAttribute('data-dds-roll', '');
}

function magnetic(el, strength = 0.28) {
  const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
  const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
  let rect = null;

  const onEnter = () => {
    rect = el.getBoundingClientRect();
  };
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
    gsap.set(el, { clearProps: 'transform' });
  };
}
