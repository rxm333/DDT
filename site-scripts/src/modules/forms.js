// Formulaires : textes d'aide (placeholder) gérés via data-placeholder, suppression du « Example Text »
// posé par défaut par l'export Webflow, et envoi des formulaires du site (newsletter, contact).
import { initSiteForms } from './site-forms.js';

export function initForms(root = document) {
  root.querySelectorAll('input, textarea').forEach((el) => {
    if (el.dataset.placeholder !== undefined) el.placeholder = el.dataset.placeholder;
    else if (el.getAttribute('placeholder') === 'Example Text') el.removeAttribute('placeholder');
  });
  initSiteForms(root);
}
