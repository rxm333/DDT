// Données structurées (schema.org, JSON-LD) : ce que Google peut afficher directement dans ses résultats.
import { SITE, PRODUCTS, abs } from './site.js';

const org = () => ({
  '@type': 'Organization',
  '@id': `${SITE.url}/#organisation`,
  name: SITE.name,
  url: SITE.url + '/',
  logo: abs(SITE.logo),
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street, postalCode: SITE.address.postalCode,
    addressLocality: SITE.address.city, addressCountry: SITE.address.country,
  },
  sameAs: SITE.sameAs,
  description: 'Atelier indépendant de Joué-lès-Tours (Touraine) qui conçoit, fabrique et assemble à la main des jeux d’échecs design et des échiquiers personnalisés.',
  areaServed: [{ '@type': 'Country', name: 'France' }, { '@type': 'Place', name: 'Union européenne' }],
  knowsAbout: ['Jeux d’échecs', 'Échiquiers personnalisés', 'Design de pièces d’échecs', 'Artisanat', 'Fabrication française'],
});

// Livraison et retours des jeux de la collection (pages /livraison, /remboursements, fiches produit) :
// affichés par Google sous le prix, et repris par les moteurs de réponse.
const shipping = {
  '@type': 'OfferShippingDetails',
  shippingRate: { '@type': 'MonetaryAmount', value: 0, currency: 'EUR' },
  shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'FR' },
  deliveryTime: {
    '@type': 'ShippingDeliveryTime',
    handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 3, unitCode: 'DAY' },
    transitTime: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 5, unitCode: 'DAY' },
  },
};
const returns = {
  '@type': 'MerchantReturnPolicy',
  applicableCountry: 'FR',
  returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
  merchantReturnDays: 14,
  returnMethod: 'https://schema.org/ReturnByMail',
  returnFees: 'https://schema.org/ReturnFeesCustomerResponsibility',
  merchantReturnLink: abs('/remboursements'),
};
// Caractéristiques communes aux échiquiers Ancolie (texte des fiches produit)
const ancolieFacts = {
  material: 'Bois, acier magnétique, cuir vegan, résine ABS',
  countryOfOrigin: { '@type': 'Country', name: 'France' },
  category: 'Jeux d’échecs',
  additionalProperty: [
    ['Pièces', '32 pièces exclusives, peintes et vernies à la main'],
    ['Aimantation', 'Plateau et pièces aimantés'],
    ['Plateau', 'Bois recouvert d’acier magnétique, cuir vegan imprimé, 64 clous ornementaux, 4 pieds en acier'],
    ['Édition', 'Exemplaire numéroté avec certificat d’authenticité'],
    ['Fabrication', 'Conçu, fabriqué et assemblé à Tours'],
  ].map(([name, value]) => ({ '@type': 'PropertyValue', name, value })),
};

const crumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
});

const text = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const imgs = (html) => [...new Set([...html.matchAll(/<img[^>]*src="(\/images\/[^"]+)"/g)].map((m) => abs(m[1])))];

/** Liste des blocs JSON-LD d'une page. */
export function jsonLd({ page, main, article, shopify }) {
  const out = [];
  const path = page.path;
  if (path === '/') {
    out.push(org(), { '@type': 'WebSite', '@id': `${SITE.url}/#site`, name: SITE.name, url: SITE.url + '/', inLanguage: 'fr-FR', publisher: { '@id': `${SITE.url}/#organisation` } });
  }
  const key = path.slice(1);
  if (PRODUCTS[key]) {
    const name = text(main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]);
    const priceText = main.match(new RegExp(`data-cart-price="${PRODUCTS[key].key}" class="prod-hero_price">([^<]*)<`))?.[1] || '';
    const live = shopify?.[PRODUCTS[key].handle];
    const price = live?.price ?? priceText.replace(/[^\d,]/g, '').replace(',', '.');
    const offer = { '@type': 'Offer', url: abs(path), priceCurrency: live?.currency || 'EUR', price, itemCondition: 'https://schema.org/NewCondition', seller: { '@id': `${SITE.url}/#organisation` }, shippingDetails: shipping, hasMerchantReturnPolicy: returns };
    if (live) offer.availability = live.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock';
    out.push(
      { '@type': 'Product', '@id': `${abs(path)}#produit`, name, description: page.description, image: imgs(main).slice(0, 8), brand: { '@type': 'Brand', name: SITE.name }, manufacturer: { '@id': `${SITE.url}/#organisation` }, ...ancolieFacts, offers: offer },
      crumbs([['Accueil', '/'], ['Collection Ancolie', '/collection-ancolie'], [name, path]]),
    );
    if (path !== '/') out.push(org());
  } else if (article) {
    out.push(
      {
        '@type': 'NewsArticle', headline: article.title, description: article.seo?.description || article.intro,
        image: [abs(article.cover.src)].filter(Boolean), datePublished: article.date, dateModified: article.updated || article.date,
        inLanguage: 'fr-FR', mainEntityOfPage: abs(path),
        author: { '@type': 'Organization', name: 'L’atelier Dame de Tours', url: SITE.url + '/' },
        publisher: { '@id': `${SITE.url}/#organisation` },
      },
      crumbs([['Accueil', '/'], ['Actualités', '/actualites'], [article.title, path]]),
      org(),
    );
  } else if (path === '/personnalisation') {
    // Échiquier sur mesure : prix de départ lu dans le texte « Le jeu de base est à 249 € TTC »
    // (modifiable dans Sanity), fabriqué à la commande.
    const from = main.match(/jeu de base est à\s*([\d\s ]+(?:,\d+)?)\s*€/i)?.[1].replace(/[\s ]/g, '').replace(',', '.');
    const product = {
      '@type': 'Product', name: 'Échiquier personnalisé Dame de Tours', description: page.description,
      image: imgs(main).slice(0, 8), brand: { '@type': 'Brand', name: SITE.name }, manufacturer: { '@id': `${SITE.url}/#organisation` },
      countryOfOrigin: { '@type': 'Country', name: 'France' }, category: 'Jeux d’échecs personnalisés',
    };
    if (from) product.offers = { '@type': 'Offer', url: abs(path), priceCurrency: 'EUR', price: from, availability: 'https://schema.org/MadeToOrder', itemCondition: 'https://schema.org/NewCondition', seller: { '@id': `${SITE.url}/#organisation` } };
    out.push(product, crumbs([['Accueil', '/'], ['Échiquier personnalisé', path]]), org());
  } else if (path === '/collection-ancolie') {
    out.push(
      {
        '@type': 'CollectionPage', '@id': `${abs(path)}#collection`, name: 'Collection Ancolie', url: abs(path), description: page.description, inLanguage: 'fr-FR',
        publisher: { '@id': `${SITE.url}/#organisation` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: Object.keys(PRODUCTS).map((key, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/${key}`) })),
        },
      },
      crumbs([['Accueil', '/'], ['Collection Ancolie', path]]),
      org(),
    );
  } else if (path === '/atelier') {
    out.push(
      { '@type': 'AboutPage', name: 'L’atelier Dame de Tours', url: abs(path), description: page.description, inLanguage: 'fr-FR', about: { '@id': `${SITE.url}/#organisation` } },
      crumbs([['Accueil', '/'], ['L’atelier', path]]),
      org(),
    );
  } else if (path !== '/') {
    const h1 = main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const name = h1 ? text(h1[1]) : page.title.split('|')[0].trim();
    out.push(crumbs([['Accueil', '/'], [name, path]]));
  }
  // Questions fréquentes : les volets qui suivent un titre id="…-faq-title" (texte visible sur la page)
  const faqAt = main.search(/id="[a-z-]*faq-title"/);
  if (faqAt > -1) {
    const qa = [...main.slice(faqAt).matchAll(/<summary[^>]*>[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?<\/summary>\s*<div class="prod-acc_content">([\s\S]*?)<\/div>/g)]
      .map(([, q, a]) => ({ '@type': 'Question', name: text(q), acceptedAnswer: { '@type': 'Answer', text: text(a.replace(/<\/?(a|em|strong|b|i)\b[^>]*>/g, '')) } }));
    if (qa.length) out.push({ '@type': 'FAQPage', mainEntity: qa });
  }
  if (!out.length) return '';
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': out }).replace(/</g, '\\u003c')}</script>`;
}
