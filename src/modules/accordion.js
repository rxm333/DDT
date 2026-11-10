import { $$, prefersReducedMotion } from '../core/env.js';
import { SELECTORS } from '../config.js';

/**
 * Accordéons <details>/<summary> animés (fiche produit, personnaliseur).
 *
 * Le HTML reste natif : sans JS, tout s'ouvre et se ferme normalement.
 * Le JS anime la hauteur du <details> (ouverture et fermeture) avec l'API Web Animations,
 * et gère lui-même l'ouverture exclusive des groupes (attribut name), pour que l'élément
 * qui se ferme s'anime aussi au lieu de disparaître d'un coup.
 */
const OPEN = { duration: 520, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' };
const CLOSE = { duration: 380, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' };

export function initAccordions(root = document) {
  const items = $$(SELECTORS.accordion.join(','), root);
  items.forEach((details) => {
    if (details.dataset.ddsAccordion) return;
    const summary = details.querySelector(':scope > summary');
    if (!summary) return;
    details.dataset.ddsAccordion = '';
    // Le JS prend le relais de l'exclusivité native, pour animer aussi la fermeture
    const group = details.getAttribute('name');
    if (group) {
      details.dataset.accordionGroup = group;
      details.removeAttribute('name');
    }
    const content = summary.nextElementSibling;
    let anim = null;

    const run = (from, to, opts, done) => {
      anim?.cancel();
      if (typeof details.animate !== 'function') {
        done?.();
        return;
      }
      details.style.overflow = 'hidden';
      const frames = [{ height: `${from}px` }, { height: `${to}px` }];
      anim = details.animate(frames, opts);
      if (content) content.animate([{ opacity: to > from ? 0 : 1 }, { opacity: to > from ? 1 : 0 }], { ...opts, duration: opts.duration * 0.8 });
      anim.onfinish = () => {
        anim = null;
        details.style.overflow = '';
        done?.();
      };
      anim.oncancel = () => {
        anim = null;
      };
    };

    const close = () => {
      if (!details.open) return;
      if (prefersReducedMotion()) {
        details.open = false;
        return;
      }
      const from = details.offsetHeight;
      const to = summary.offsetHeight + borderY(details);
      details.classList.add('is-closing');
      run(from, to, CLOSE, () => {
        details.open = false;
        details.classList.remove('is-closing');
      });
    };

    const open = () => {
      // Ferme les autres membres du groupe, en animation
      if (details.dataset.accordionGroup) {
        items
          .filter((d) => d !== details && d.dataset.accordionGroup === details.dataset.accordionGroup && d.open)
          .forEach((d) => d.ddsClose?.());
      }
      if (prefersReducedMotion()) {
        details.open = true;
        return;
      }
      const from = details.offsetHeight;
      details.open = true;
      const to = details.offsetHeight;
      run(from, to, OPEN);
    };

    details.ddsClose = close;
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      if (details.classList.contains('is-closing') || !details.open) {
        details.classList.remove('is-closing');
        open();
      } else {
        close();
      }
    });
  });
  return items;
}

function borderY(el) {
  const cs = getComputedStyle(el);
  return (parseFloat(cs.borderTopWidth) || 0) + (parseFloat(cs.borderBottomWidth) || 0);
}
