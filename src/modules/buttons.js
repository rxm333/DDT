import { $$ } from '../core/env.js';
import { BUTTONS } from '../config.js';

/**
 * Boutons : léger agrandissement au survol, pression au clic, texte qui roule lettre par lettre
 * (préparé par modules/hover.js). Le JS se contente de poser les classes de variante ;
 * tout le reste est en CSS (transform uniquement, donc fluide).
 */
export function initButtons() {
  const buttons = [];
  for (const [variant, selectors] of Object.entries(BUTTONS.variants)) {
    $$(selectors.join(',')).forEach((el) => {
      if (el.classList.contains('dds-btn')) return;
      el.classList.add('dds-btn', `dds-btn--${variant}`);
      buttons.push(el);
    });
  }
  return { buttons };
}
