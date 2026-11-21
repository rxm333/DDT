// /llms.txt : résumé factuel du site pour les moteurs de réponse IA (ChatGPT, Perplexity, Claude,
// Gemini, Google AI Overviews…). Format proposé sur llmstxt.org : titre, résumé, puis liens commentés.
// Généré à chaque construction : prix lus dans Shopify, actualités lues dans Sanity, pages du site.
import pages from '../data/pages.json';
import { getArticles } from '../lib/content.js';
import { shopifyProducts } from '../lib/shopify.js';
import { SITE, PRODUCTS, abs, NOINDEX } from '../lib/site.js';

const LEGAL = ['/conditions-generales-de-vente', '/conditions-utilisation', '/confidentialite', '/mentions-legales', '/livraison', '/remboursements', '/coordonnees'];
const ORDER = ['/', '/collection-ancolie', '/ancolie-blanc', '/ancolie-noir', '/ancolie-la-chute-des-anges', '/personnalisation', '/atelier', '/actualites', '/contact', '/ouverture'];
const euros = (p) => (p ? `${Number(p.price).toLocaleString('fr-FR', { minimumFractionDigits: Number(p.price) % 1 ? 2 : 0 })} € TTC` : '');

export async function GET() {
  const [articles, shop] = await Promise.all([getArticles(), shopifyProducts(Object.values(PRODUCTS).map((p) => p.handle))]);
  const byPath = Object.fromEntries(pages.map((p) => [p.path, p]));
  const link = (path, extra = '') => {
    const p = byPath[path];
    return `- [${p.title.replace(/\s*\|\s*Dame de Tours$/, '')}](${abs(path)}) : ${p.description}${extra}`;
  };
  const price = (key) => {
    const p = shop[PRODUCTS[key].handle];
    return p ? ` Prix : ${euros(p)}${p.available ? '' : ' (épuisé)'}.` : '';
  };
  const main = ORDER.filter((path) => byPath[path] && !NOINDEX.has(path)).map((path) => link(path, PRODUCTS[path.slice(1)] ? price(path.slice(1)) : ''));
  const news = articles.map((a) => `- [${a.title}](${abs(`/actualites/${a.slug}`)}) (${a.date}) : ${a.seo?.description || a.intro}`);
  const legal = LEGAL.filter((path) => byPath[path]).map((path) => link(path));

  const body = `# ${SITE.name}

> ${SITE.name} est un atelier indépendant installé à Joué-lès-Tours, en Touraine (France), qui conçoit, fabrique et assemble à la main des jeux d’échecs contemporains : la collection Ancolie, en série limitée, et des échiquiers entièrement personnalisés, composés en ligne avec un aperçu 3D.

## L’essentiel

- Atelier : ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, France. Contact : ${SITE.email}.
- Chaque jeu est conçu, fabriqué et assemblé à Tours ; les pièces sont peintes et vernies à la main.
- Collection Ancolie (première collection, disponible depuis le 1er septembre 2026) : Ancolie Blanc, Ancolie Noir et Ancolie « La Chute des Anges », édition limitée inspirée de l’œuvre de Gustave Doré « La Chute des anges rebelles ».
- Chaque échiquier Ancolie : plateau en bois recouvert d’acier magnétique, surface en cuir vegan imprimé en haute définition, 64 clous ornementaux, 4 pieds en acier ; 32 pièces exclusives en résine ABS, aimantées, peintes et vernies à la main ; exemplaire numéroté avec certificat d’authenticité ; boîte aimantée noire.
- Livraison offerte dans toute la France, en 3 à 5 jours ouvrés pour la collection ; expédition aussi vers les pays de l’Union européenne desservis.
- Échiquier personnalisé : composé en ligne en neuf étapes (damier, teintes, clous, angles, style des pièces : Ancolie, classiques, minimalistes ou traditionnelles), avec votre image imprimée sur le plateau, un texte (prénom, date, dédicace) ou un logo. Aperçu 3D et prix mis à jour en direct ; bon à tirer validé avant fabrication ; fabrication d’environ une semaine après validation et paiement.
- Cadeaux et entreprises : anniversaire, mariage, départ, club d’échecs, cadeau d’entreprise ou série à un logo.
- Retours : 14 jours pour les produits non personnalisés ; les créations personnalisées sont fermes après validation du bon à tirer.
- Réseaux : ${SITE.sameAs.join(', ')}.

## Pages principales

${main.join('\n')}

## Actualités

${news.join('\n')}

## Informations pratiques

${legal.join('\n')}
`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
