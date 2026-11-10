import { $, $$ } from '../core/env.js';

/**
 * Personnaliseur (page /personnalisation).
 *
 * Le markup Webflow porte tout : boutons radio natifs (navigation clavier aux flèches,
 * lecteurs d'écran), champs texte et prix dans data-price. Ce module se contente de :
 * - recalculer le total et les résumés de chaque étape ;
 * - sauvegarder la création dans l'URL (lien partageable) et la restaurer ;
 * - émettre « dds:customizer-change » pour le futur visualiseur 3D ([data-customizer-viewer]).
 */

const BASE_PRICE = 249;
const euros = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
const price = (el) => Number(el.dataset.price) || 0;
const labelOf = (input) =>
  input.dataset.label ||
  input.getAttribute('aria-label') ||
  input.closest('label')?.querySelector('.cfg_choice-name')?.textContent.trim() ||
  input.value;

function zonesLabel(n) {
  if (!n) return 'Aucune';
  return n === 1 ? '1 zone' : `${n} zones`;
}

export function initCustomizer(root = document) {
  const app = $('[data-customizer]', root);
  if (!app) return null;

  const base = Number(app.dataset.basePrice) || BASE_PRICE;
  const totalEl = $('[data-cfg-total]', app);
  const status = $('[data-cfg-status]', app);
  const order = $('[data-cfg-order]', app);
  const save = $('[data-cfg-save]', app);
  const steps = $$('[data-cfg-step]', app);
  const radios = () => $$('input[type="radio"]', app);
  const zones = () => $$('[data-cfg-zone]', app);

  let announceTimer = 0;
  const announce = (message, delay = 0) => {
    if (!status) return;
    clearTimeout(announceTimer);
    announceTimer = setTimeout(() => {
      status.textContent = '';
      // Laisse le temps au lecteur d'écran de voir le changement
      requestAnimationFrame(() => (status.textContent = message));
    }, delay);
  };

  const state = () => {
    const s = {};
    radios().filter((r) => r.checked).forEach((r) => (s[r.name] = r.value));
    zones().forEach((z) => {
      const v = z.value.trim();
      if (v) s[z.name] = v;
    });
    return s;
  };

  const total = () =>
    base +
    radios().filter((r) => r.checked).reduce((sum, r) => sum + price(r), 0) +
    zones().filter((z) => z.value.trim()).reduce((sum, z) => sum + price(z), 0);

  const update = ({ silent = false } = {}) => {
    // Valeur affichée à côté de chaque légende (ex. « Teinte du cuir : Blanc os »)
    $$('[data-cfg-label]', app).forEach((el) => {
      const checked = $(`input[name="${el.dataset.cfgLabel}"]:checked`, app);
      if (checked) el.textContent = labelOf(checked);
    });

    // Résumé dans l'en-tête de chaque étape
    steps.forEach((step) => {
      const out = $('[data-cfg-summary]', step);
      if (!out) return;
      const parts = [];
      const seen = new Set();
      $$('input[type="radio"]', step).forEach((r) => {
        if (seen.has(r.name)) return;
        seen.add(r.name);
        const checked = $(`input[name="${r.name}"]:checked`, step);
        if (checked) parts.push(labelOf(checked));
      });
      const stepZones = $$('[data-cfg-zone]', step);
      if (stepZones.length) parts.push(zonesLabel(stepZones.filter((z) => z.value.trim()).length));
      out.textContent = parts.join(' · ');
    });

    const amount = total();
    const formatted = euros.format(amount);
    if (totalEl) totalEl.textContent = formatted;

    const config = state();
    if (order) {
      order.dataset.price = String(amount);
      order.dataset.config = JSON.stringify(config);
    }
    if (!silent) announce(`Total : ${formatted} TTC`, 600);
    app.dispatchEvent(new CustomEvent('dds:customizer-change', { bubbles: true, detail: { config, total: amount } }));
  };

  const restore = () => {
    const params = new URLSearchParams(window.location.search);
    if (!params.toString()) return;
    params.forEach((value, name) => {
      const radio = radios().find((r) => r.name === name && r.value === value);
      if (radio) radio.checked = true;
      const zone = zones().find((z) => z.name === name);
      if (zone) zone.value = value.slice(0, Number(zone.maxLength) > 0 ? zone.maxLength : 40);
    });
  };

  const shareUrl = () => {
    const params = new URLSearchParams(state());
    const url = new URL(window.location.href);
    url.search = params.toString();
    url.hash = '';
    return url.toString();
  };

  app.addEventListener('change', (event) => {
    if (event.target.matches('input')) update();
  });
  app.addEventListener('input', (event) => {
    if (event.target.matches('[data-cfg-zone]')) update();
  });

  save?.addEventListener('click', async () => {
    const url = shareUrl();
    try {
      window.history.replaceState(window.history.state, '', url);
    } catch {
      /* URL non modifiable (iframe, file://) : on garde le lien pour le presse-papiers */
    }
    try {
      await navigator.clipboard.writeText(url);
      announce('Lien de votre création copié dans le presse-papiers.');
    } catch {
      announce('Votre création est enregistrée dans l’adresse de la page : ajoutez-la à vos favoris pour la retrouver.');
    }
    save.dataset.saved = 'true';
  });

  restore();
  update({ silent: true });

  return { state, total, shareUrl, update };
}
