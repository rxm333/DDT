import { gsap } from '../core/gsap.js';
import { $$, MQ } from '../core/env.js';
import { SELECTORS } from '../config.js';

/**
 * Survols :
 *  1. « Texte qui roule » : chaque lettre monte et sa copie arrive par le bas, en cascade.
 *     Le JS découpe le libellé ; la transition est 100 % CSS (transform, aucun coût JS au survol).
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

  // Texte lu par les lecteurs d'écran, d'un seul tenant
  const sr = document.createElement('span');
  sr.className = 'dds-sr';
  sr.textContent = text;

  // Copie visuelle découpée en lettres : chacune monte avec un léger décalage
  const mask = document.createElement('span');
  mask.className = 'dds-roll';
  mask.setAttribute('aria-hidden', 'true');
  const label = document.createElement('span');
  label.className = 'dds-roll__text';
  label.dataset.text = text;
  Array.from(text).forEach((char, i) => {
    const c = document.createElement('span');
    c.className = 'dds-roll__char';
    c.style.setProperty('--i', String(i));
    c.textContent = char === ' ' ? '\u00a0' : char;
    label.append(c);
  });
  mask.append(label);
  host.replaceChildren(sr, mask);
  el.style.setProperty('--dds-chars', String(text.length));
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
