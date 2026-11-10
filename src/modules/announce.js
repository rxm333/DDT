// Bandeau d'annonce en haut du site ([data-announce] dans l'en-tête).
// Le contenu est dans Webflow ; le JS ajoute seulement le bouton « Masquer » (amélioration progressive)
// et mémorise le choix pour ce navigateur, par annonce (la clé change avec la valeur de data-announce).

export function initAnnounce() {
  const bar = document.querySelector('[data-announce]');
  if (!bar) return null;
  const header = bar.closest('.navbar_wrapper') || bar.parentElement;
  const key = `dds-announce:${bar.dataset.announce || 'default'}`;
  const read = () => {
    try {
      return localStorage.getItem(key) === 'hidden';
    } catch {
      return false;
    }
  };
  const hide = () => {
    bar.hidden = true;
    header.classList.remove('has-announce');
  };
  if (read()) return hide(), null;

  // Décalage d'origine de la barre de navigation, repris sous le bandeau
  const top = getComputedStyle(header).top;
  if (top && top !== 'auto') header.style.setProperty('--dds-nav-top', top);
  header.classList.add('has-announce');

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'announce_close';
  btn.setAttribute('aria-label', "Masquer l'annonce");
  btn.innerHTML =
    '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
  btn.addEventListener('click', () => {
    hide();
    try {
      localStorage.setItem(key, 'hidden');
    } catch {
      /* stockage indisponible : masqué pour cette page seulement */
    }
    header.querySelector('a, button')?.focus({ preventScroll: true });
  });
  bar.append(btn);
  return { bar, hide };
}
