// Formulaires Webflow : textes d'aide (placeholder) gérés depuis Webflow via data-placeholder,
// et suppression du « Example Text » que Webflow pose par défaut sur les champs.
export function initForms(root = document) {
  root.querySelectorAll('input, textarea').forEach((el) => {
    if (el.dataset.placeholder !== undefined) el.placeholder = el.dataset.placeholder;
    else if (el.getAttribute('placeholder') === 'Example Text') el.removeAttribute('placeholder');
  });
}
