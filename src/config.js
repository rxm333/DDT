/**
 * Configuration centrale : sélecteurs Webflow (Client-First) et réglages d'animation.
 * Tous les sélecteurs pointent vers les classes / data-attributes posés dans Webflow.
 */
export const SELECTORS = {
  navbar: {
    wrapper: '.navbar_wrapper',
    component: '[data-navbar="component"]',
    toggle: '[data-navbar="toggle"]',
    menu: '[data-navbar="menu"]',
    line: '.navbar_menu-line',
    // Éléments du menu qui apparaissent en cascade à l'ouverture
    menuItems: '.navbar_link-list > li, .navbar_menu-content > .navbar_divider, .navbar_info-col',
    magnetic: '.navbar_button',
    // Emblème (groupe SVG du logo) qui tourne sur lui-même au scroll
    emblem: '[data-navbar="emblem"]',
  },
  // Survol « texte qui roule »
  roll: ['.product-card_button', '.navbar_link'],
  marquee: {
    section: '.section_atelier',
    list: '.atelier_marquee-list',
  },
};

/** Apparitions au scroll. Les éléments déjà visibles au chargement ne sont pas animés. */
export const REVEALS = {
  // Titres découpés en lignes, qui montent depuis un masque
  splitHeadings: ['.collection_heading', '.atelier_heading'],
  // Éléments simples (montée + fondu)
  fadeUp: ['.collection_intro', '.atelier_text', '.atelier_link', '.atelier_marquee', '.atelier_controls', '.footer_panel'],
  // Groupes animés en cascade
  stagger: ['.collection_item'],
  // Parallaxe douce (scrub) — lié au scroll
  parallax: [{ selector: '.footer_wordmark', from: { yPercent: 35 }, to: { yPercent: 0 } }],
};

export const SMOOTH_SCROLL = {
  lerp: 0.1, // inertie : plus petit = plus doux
  wheelMultiplier: 1,
  anchorDuration: 1.2,
  anchorExtraOffset: 24, // px sous la navbar flottante
};

export const NAVBAR = {
  autoHide: false, // la barre reste toujours visible
  autoHideThreshold: 120, // px avant de commencer à masquer (si autoHide)
  emblemDegPerPx: 0.36, // rotation de l'emblème : 360° tous les 1000 px de scroll
  emblemSmoothing: 0.35, // inertie du suivi (s)
};

export const MARQUEE = {
  velocityBoost: true, // accélère le défilement selon la vitesse de scroll
  maxBoost: 3, // vitesse max = 1 + maxBoost
};
