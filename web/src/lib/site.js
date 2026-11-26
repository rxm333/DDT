// Informations de l'atelier, reprises dans les données structurées (Google) et le plan du site.
export const SITE = {
  name: 'Dame de Tours',
  url: (import.meta.env?.SITE || 'https://damedetours.com').replace(/\/$/, ''),
  logo: '/images/webclip-dame-de-tours-256.png',
  email: 'contact@damedetours.com',
  address: { street: '1 Route de la Girarderie', postalCode: '37300', city: 'Joué-lès-Tours', country: 'FR' },
  sameAs: [
    'https://www.instagram.com/damedetours',
    'https://www.tiktok.com/@damedetours',
    'https://www.youtube.com/channel/UClhxMgneIsT3sGcLNQX_IcA',
  ],
};

// Fiches produit : page → clé du panier (data-cart-price) et handle Shopify
export const PRODUCTS = {
  'ancolie-blanc': { key: 'blanc', handle: 'jeux-echecs-dame-de-tours-ancolie-blanc' },
  'ancolie-noir': { key: 'noir', handle: 'jeux-echecs-dame-de-tours-ancolie-noir' },
  'ancolie-la-chute-des-anges': { key: 'la-chute-des-anges', handle: 'jeux-echecs-dame-de-tours-ancolie-la-chute-des-anges' },
};

// Pages exclues du plan du site et marquées « noindex »
export const NOINDEX = new Set(['/404', '/ouverture']); // /ouverture : page des QR codes, doublon de /personnalisation

export const abs = (path) => (/^https?:/.test(path) ? path : SITE.url + (path === '/' ? '' : path));
