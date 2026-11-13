import { SHOPIFY } from '../config.js';

/**
 * Client minimal de l'API Storefront de Shopify (GraphQL, appelée depuis le navigateur).
 *
 * Seules les opérations utiles au panier : lire un produit par son handle, créer un panier,
 * ajouter / modifier / retirer des lignes. Le paiement se fait sur la page Shopify (cart.checkoutUrl).
 *
 * La configuration vient de SHOPIFY (config.js) ; window.DDS_SHOPIFY peut la compléter
 * (pratique pour tester une boutique sans recompiler, ex. sur la préprod).
 */

export class ShopifyError extends Error {
  constructor(message, { code, userErrors } = {}) {
    super(message);
    this.name = 'ShopifyError';
    this.code = code;
    this.userErrors = userErrors || [];
  }
}

export function shopifyConfig() {
  const extra = typeof window !== 'undefined' && window.DDS_SHOPIFY ? window.DDS_SHOPIFY : {};
  const cfg = { ...SHOPIFY, ...extra, products: { ...SHOPIFY.products, ...(extra.products || {}) } };
  cfg.domain = String(cfg.domain || '')
    .replace(/^https?:\/\//, '')
    .replace(/\/+$/, '');
  cfg.configured = Boolean(cfg.domain && cfg.token);
  return cfg;
}

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
  lines(first: 100) {
    nodes {
      id
      quantity
      attributes { key value }
      cost { totalAmount { amount currencyCode } }
      merchandise {
        ... on ProductVariant {
          id
          title
          availableForSale
          price { amount currencyCode }
          image { url(transform: { maxWidth: 240 }) altText }
          product { title handle featuredImage { url(transform: { maxWidth: 240 }) altText } }
        }
      }
    }
  }
`;

const MUTATION_TAIL = `
  userErrors { field message code }
  warnings { code message }
`;

export function createClient(config = shopifyConfig()) {
  const endpoint = `https://${config.domain}/api/${config.apiVersion}/graphql.json`;
  const context = `@inContext(country: ${config.country || 'FR'}, language: ${config.language || 'FR'})`;
  const productCache = new Map();

  async function request(query, variables = {}) {
    if (!config.configured) throw new ShopifyError('Boutique non configurée', { code: 'NOT_CONFIGURED' });
    let response;
    try {
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Shopify-Storefront-Access-Token': config.token,
        },
        body: JSON.stringify({ query, variables }),
      });
    } catch (error) {
      throw new ShopifyError('Connexion à la boutique impossible', { code: 'NETWORK' });
    }
    if (!response.ok) throw new ShopifyError(`Erreur boutique (${response.status})`, { code: `HTTP_${response.status}` });
    const json = await response.json();
    if (json.errors?.length) {
      throw new ShopifyError(json.errors.map((e) => e.message).join(' · '), { code: 'GRAPHQL' });
    }
    return json.data;
  }

  /** Lance une erreur si la mutation a renvoyé des userErrors ; sinon renvoie { cart, warnings }. */
  function unwrap(payload) {
    if (!payload) throw new ShopifyError('Réponse vide de la boutique', { code: 'EMPTY' });
    if (payload.userErrors?.length) {
      throw new ShopifyError(payload.userErrors.map((e) => e.message).join(' · '), {
        code: payload.userErrors[0].code || 'USER_ERROR',
        userErrors: payload.userErrors,
      });
    }
    return { cart: payload.cart, warnings: payload.warnings || [] };
  }

  return {
    config,

    /** Produit par handle (mis en cache pour la session de la page). */
    product(handle) {
      if (!productCache.has(handle)) {
        const query = `query Product($handle: String!) ${context} {
          product(handle: $handle) {
            id title handle availableForSale
            variants(first: 25) {
              nodes { id title availableForSale price { amount currencyCode } }
            }
          }
        }`;
        const promise = request(query, { handle }).then((d) => d.product);
        promise.catch(() => productCache.delete(handle)); // nouvel essai au prochain appel
        productCache.set(handle, promise);
      }
      return productCache.get(handle);
    },

    async getCart(id) {
      const query = `query Cart($id: ID!) ${context} { cart(id: $id) { ${CART_FIELDS} } }`;
      const data = await request(query, { id });
      return data.cart; // null si le panier a expiré ou a été payé
    },

    async createCart(lines) {
      const query = `mutation CartCreate($input: CartInput!) ${context} {
        cartCreate(input: $input) { cart { ${CART_FIELDS} } ${MUTATION_TAIL} }
      }`;
      const input = { lines, buyerIdentity: { countryCode: config.country || 'FR' } };
      return unwrap((await request(query, { input })).cartCreate);
    },

    async addLines(cartId, lines) {
      const query = `mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) ${context} {
        cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } ${MUTATION_TAIL} }
      }`;
      return unwrap((await request(query, { cartId, lines })).cartLinesAdd);
    },

    async updateLines(cartId, lines) {
      const query = `mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) ${context} {
        cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } ${MUTATION_TAIL} }
      }`;
      return unwrap((await request(query, { cartId, lines })).cartLinesUpdate);
    },

    async removeLines(cartId, lineIds) {
      const query = `mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) ${context} {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } ${MUTATION_TAIL} }
      }`;
      return unwrap((await request(query, { cartId, lineIds })).cartLinesRemove);
    },
  };
}
