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
  },
  // Survol « texte qui roule »
  roll: ['.product-card_button', '.navbar_link', '.button', '.prod-buy_add', '.cfg_order'],
  marquee: {
    section: '.section_atelier',
    track: '.atelier_marquee',
    list: '.atelier_marquee-list',
    pause: '.atelier_pause-input',
  },
};

/** Apparitions au scroll. Les éléments déjà visibles au chargement ne sont pas animés. */
export const REVEALS = {
  // Titres découpés en lignes, qui montent depuis un masque
  splitHeadings: ['.collection_heading', '.atelier_heading', '.atelier-manifesto_quote'],
  // Éléments simples (montée + fondu)
  fadeUp: ['.collection_intro', '.atelier_text', '.atelier_link', '.atelier_marquee', '.atelier_controls', '.footer_panel', '.atelier-wide_figure', '.atelier-step', '.atelier-manifesto_text', '.atelier-meet_content', '.atelier-meet_figure', '.atelier-cta_component'],
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
};

/**
 * Boutique Shopify (API Storefront, voir modules/shopify.js et modules/cart.js).
 *
 * Le jeton Storefront est PUBLIC par conception : il ne permet que de lire le catalogue et de gérer
 * un panier. Il peut donc vivre dans ce dépôt public. Ne jamais mettre ici un jeton Admin (shpat_…).
 *
 * - domain : domaine Shopify de la boutique (xxx.myshopify.com)
 * - token  : « Jeton d'accès public » de l'application Headless (canal de vente)
 * - products : data-product des boutons « Ajouter au panier » → handle du produit dans Shopify
 *   (le handle est la fin de l'adresse du produit dans l'admin : …/products/<handle>).
 *   Un bouton peut aussi porter data-handle="…" ou data-variant="gid://shopify/ProductVariant/…".
 */
export const SHOPIFY = {
  domain: '7btbwv-j0.myshopify.com',
  token: '2654378ee987411f015efcbdd396cc34',
  apiVersion: '2026-04',
  country: 'FR',
  language: 'FR',
  products: {
    noir: 'jeux-echecs-dame-de-tours-ancolie-noir',
    blanc: 'jeux-echecs-dame-de-tours-ancolie-blanc',
    'la-chute-des-anges': 'jeux-echecs-dame-de-tours-ancolie-la-chute-des-anges',
  },
};

/** Accordéons <details> animés. */
SELECTORS.accordion = ['.prod-acc_item', '.cfg_step'];

export const MARQUEE = {
  duration: 40, // secondes pour faire défiler une liste complète (vitesse de croisière)
  friction: 2.2, // retour à la vitesse de croisière après un lancer (plus grand = plus rapide)
  maxFling: 4000, // élan maximal au lâcher, px/s
  velocityBoost: true, // accélère un peu le défilement pendant le scroll de la page
  boostFactor: 6,
  maxBoost: 3, // accélération max = 3 × la vitesse de croisière
};

/** Boutons : variantes de remplissage et attraction magnétique (voir modules/buttons.js). */
export const BUTTONS = {
  variants: {
    // Fond lilas : remplissage lilas clair + reflet
    solid: ['.button:not(.is-secondary)', '.prod-buy_add', '.cfg_order'],
    // Contour : remplissage lilas plein, texte qui passe en encre
    ghost: ['.button.is-secondary', '.product-card_button'],
  },
};

/** Transitions de page (Barba). La navbar et le footer restent hors du conteneur : ils ne bougent pas. */
export const TRANSITIONS = {
  wrapper: '[data-barba="wrapper"]',
  container: '[data-barba="container"]',
  persistent: ['.footer_component', 'footer'], // estompés pendant l'échange pour éviter un saut visuel
  // Pages chargées normalement (formulaires Webflow protégés : la vérification anti-spam doit se charger)
  // Personnalisation : le personnaliseur (iframe) et son pont démarrent sur une page fraîche
  reload: ['/contact', '/contact.html', '/personnalisation', '/personnalisation.html'],
  leave: { duration: 0.4, y: -20 },
  enter: { duration: 0.7, y: 28 },
};
