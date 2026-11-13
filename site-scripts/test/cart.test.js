// Test du panier : charge le bundle buildé dans jsdom avec une fausse API Storefront (fetch simulé)
// et vérifie l'ajout, la pastille, le panneau, les quantités, le retrait, la persistance et les erreurs.
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const bundle = readFileSync(new URL('../dist/dame-de-tours.min.js', import.meta.url), 'utf8');

const html = `<!doctype html><html><head></head><body>
<header class="navbar_wrapper"><nav data-navbar="component">
  <button type="button" data-navbar="toggle" aria-expanded="false"></button>
  <a class="navbar_button" href="#" aria-label="Panier, 1 article" data-navbar="cart"></a>
  <div data-navbar="menu"></div>
</nav></header>
<main>
  <div class="prod-hero_content">
    <p data-cart-price="noir" class="prod-hero_price">199 €</p>
    <p data-cart-price="blanc" class="product-card_price">199 €</p>
    <dt data-cart-price="noir blanc" class="col-hero_fact-value">199 €</dt>
    <p data-cart-price="inconnu" class="product-card_price">249 €</p>
    <div class="prod-buy_panel"><div class="prod-buy_cart" data-product="noir">
      <div data-qty="noir"><button type="button" data-qty-minus="">−</button><input type="number" value="1" min="1" max="10" data-qty-input=""><button type="button" data-qty-plus="">+</button></div>
      <button type="button" class="prod-buy_add" data-cart="add" data-product="noir" data-quantity="1"><span>Ajouter au panier</span></button>
    </div></div>
  </div>
  <button type="button" class="prod-buy_add" data-cart="add" data-product="blanc" data-quantity="1"><span>Ajouter au panier</span></button>
  <div class="ddt-personnaliseur-fullscreen"><iframe src="https://personnalisation-jeu-echecs.damedetours.com/?embed=1" title="Personnaliseur"></iframe></div>
  <button type="button" class="prod-buy_add" data-cart="add" data-product="inconnu" data-quantity="1"><span>Ajouter au panier</span></button>
</main>
</body></html>`;

// ---------- Fausse boutique ----------
const PRODUCTS = {
  'ancolie-noir': { id: 'gid://shopify/Product/1', title: 'Ancolie Noir', price: '219.0', available: true },
  'ancolie-blanc': { id: 'gid://shopify/Product/2', title: 'Ancolie Blanc', price: '199.0', available: false },
};
const variantId = (handle) => `gid://shopify/ProductVariant/${PRODUCTS[handle].id.split('/').pop()}`;
const byVariant = (id) => Object.entries(PRODUCTS).find(([h]) => variantId(h) === id);

const carts = new Map();
let nextLine = 1;
let nextCart = 1;
const calls = [];

function cartPayload(cart) {
  if (!cart) return null;
  let total = 0;
  let qty = 0;
  const nodes = cart.lines.map((l) => {
    const [handle, p] = byVariant(l.merchandiseId);
    const t = Number(p.price) * l.quantity;
    total += t;
    qty += l.quantity;
    return {
      id: l.id,
      quantity: l.quantity,
      attributes: l.attributes || [],
      cost: { totalAmount: { amount: String(t), currencyCode: 'EUR' } },
      merchandise: {
        id: l.merchandiseId,
        title: 'Default Title',
        availableForSale: p.available,
        price: { amount: p.price, currencyCode: 'EUR' },
        image: { url: `https://cdn.test/${handle}.webp`, altText: null },
        product: { title: p.title, handle, featuredImage: null },
      },
    };
  });
  const money = { amount: String(total), currencyCode: 'EUR' };
  return { id: cart.id, checkoutUrl: `https://boutique.test/cart/c/${cart.id.split('/').pop()}`, totalQuantity: qty, cost: { subtotalAmount: money, totalAmount: money }, lines: { nodes } };
}

function addTo(cart, lines) {
  for (const { merchandiseId, quantity, attributes = [] } of lines) {
    const existing = attributes.length ? null : cart.lines.find((l) => l.merchandiseId === merchandiseId && !l.attributes.length);
    if (existing) existing.quantity += quantity;
    else cart.lines.push({ id: `gid://shopify/CartLine/${nextLine++}`, merchandiseId, quantity, attributes });
  }
}

const ok = (data) => ({ ok: true, status: 200, json: async () => ({ data }) });
const missingCart = (key) => ok({ [key]: { cart: null, userErrors: [{ field: ['cartId'], message: 'The specified cart does not exist.', code: 'INVALID' }], warnings: [] } });

async function fakeFetch(url, init) {
  const { query, variables } = JSON.parse(init.body);
  const op = query.match(/^\s*(?:query|mutation)\s+(\w+)/)[1];
  calls.push({ url, op, token: init.headers['X-Shopify-Storefront-Access-Token'], variables });
  if (op === 'Product') {
    const p = PRODUCTS[variables.handle];
    if (!p) return ok({ product: null });
    const price = { amount: p.price, currencyCode: 'EUR' };
    return ok({ product: { id: p.id, title: p.title, handle: variables.handle, availableForSale: p.available, variants: { nodes: [{ id: variantId(variables.handle), title: 'Default Title', availableForSale: p.available, price }] } } });
  }
  if (op === 'Cart') return ok({ cart: cartPayload(carts.get(variables.id)) });
  if (op === 'CartCreate') {
    const cart = { id: `gid://shopify/Cart/c${nextCart++}`, lines: [] };
    addTo(cart, variables.input.lines);
    carts.set(cart.id, cart);
    return ok({ cartCreate: { cart: cartPayload(cart), userErrors: [], warnings: [] } });
  }
  const cart = carts.get(variables.cartId);
  if (op === 'CartLinesAdd') {
    if (!cart) return missingCart('cartLinesAdd');
    addTo(cart, variables.lines);
    return ok({ cartLinesAdd: { cart: cartPayload(cart), userErrors: [], warnings: [] } });
  }
  if (op === 'CartLinesUpdate') {
    for (const { id, quantity } of variables.lines) {
      const line = cart.lines.find((l) => l.id === id);
      line.quantity = Math.min(quantity, 4); // stock limité à 4
    }
    const warnings = variables.lines.some((l) => l.quantity > 4) ? [{ code: 'MERCHANDISE_NOT_ENOUGH_STOCK', message: 'Not enough stock' }] : [];
    return ok({ cartLinesUpdate: { cart: cartPayload(cart), userErrors: [], warnings } });
  }
  if (op === 'CartLinesRemove') {
    cart.lines = cart.lines.filter((l) => !variables.lineIds.includes(l.id));
    return ok({ cartLinesRemove: { cart: cartPayload(cart), userErrors: [], warnings: [] } });
  }
  throw new Error(`Opération inattendue : ${op}`);
}

// ---------- Page ----------
function openPage({ storage } = {}) {
  const errors = [];
  const dom = new JSDOM(html, { runScripts: 'outside-only', pretendToBeVisual: true, url: 'https://damedetours.example/ancolie-noir' });
  const { window } = dom;
  window.matchMedia = (q) => ({ matches: q.includes('reduce'), media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
  window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
  window.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
  window.Element.prototype.getAnimations = () => [];
  window.scrollTo = () => {};
  window.console.error = (...a) => errors.push(a.map(String).join(' '));
  window.console.info = () => {};
  window.fetch = fakeFetch;
  window.DDS_SHOPIFY = { domain: 'https://boutique-test.myshopify.com/', token: 'public-token', products: { noir: 'ancolie-noir', blanc: 'ancolie-blanc' } };
  if (storage) for (const [k, v] of Object.entries(storage)) window.localStorage.setItem(k, v);
  window.eval(bundle);
  window.document.dispatchEvent(new window.Event('DOMContentLoaded'));
  return { window, document: window.document, errors };
}

const flush = () => new Promise((r) => setTimeout(r, 30));
const text = (el) => el.textContent.replace(/\s/g, ' ').trim();

// 1. Chargement : pastille remise à zéro, prix et disponibilité lus dans Shopify
let { window, document, errors } = openPage();
await flush();
const cartLink = document.querySelector('[data-navbar="cart"]');
const drawer = document.getElementById('dds-cart');
assert.ok(drawer && drawer.tagName === 'DIALOG', 'panneau panier créé');
assert.equal(cartLink.getAttribute('aria-label'), 'Panier, vide', 'libellé « 1 article » codé en dur remplacé');
assert.equal(cartLink.getAttribute('aria-controls'), 'dds-cart');
assert.ok(cartLink.querySelector('.navbar_cart-count').hidden, 'pastille masquée quand le panier est vide');
assert.equal(text(document.querySelector('.prod-hero_price')), '219 €', 'prix de la fiche mis à jour depuis Shopify');
assert.equal(text(document.querySelector('[data-cart-price="blanc"]')), '199 €', 'prix d’une carte produit');
assert.equal(text(document.querySelector('[data-cart-price="noir blanc"]')), 'dès 199 €', 'plusieurs produits : le plus bas, avec « dès »');
assert.equal(text(document.querySelector('[data-cart-price="inconnu"]')), '249 €', 'produit non relié : prix du HTML gardé');
assert.ok([...document.querySelectorAll('[data-cart-price]')].every((n) => n.classList.contains('is-priced')), 'tous les prix révélés');
assert.deepEqual(Object.keys(JSON.parse(window.localStorage.getItem('dds-prices'))).sort(), ['blanc', 'noir'], 'prix gardés pour la visite suivante');
assert.equal(calls[0].url, 'https://boutique-test.myshopify.com/api/2026-04/graphql.json', 'URL Storefront');
assert.equal(calls[0].token, 'public-token', 'jeton public envoyé');
const blanc = document.querySelector('[data-product="blanc"]');
assert.ok(blanc.disabled, 'produit épuisé : bouton désactivé');
assert.equal(text(document.querySelector('.cart_sold-out')), 'Épuisé pour le moment');

// 2. Ouvrir le panier vide
cartLink.click();
assert.ok(drawer.open, 'clic sur l’icône : panneau ouvert');
assert.ok(document.documentElement.classList.contains('is-cart-open'));
assert.ok(!drawer.querySelector('[data-cart-empty]').hidden, 'état vide affiché');
assert.ok(drawer.querySelector('[data-cart-footer]').hidden, 'pas de pied « Commander » sur un panier vide');
drawer.dispatchEvent(new window.Event('cancel', { cancelable: true }));
assert.ok(!drawer.open, 'Échap ferme le panneau');

// 3. Ajouter 2 × Noir
document.querySelector('[data-qty-plus]').click();
const addNoir = document.querySelector('[data-cart="add"][data-product="noir"]');
addNoir.click();
await flush();
assert.ok(drawer.open, 'panneau ouvert après l’ajout');
const create = calls.find((c) => c.op === 'CartCreate');
assert.deepEqual(create.variables.input.lines, [{ merchandiseId: 'gid://shopify/ProductVariant/1', quantity: 2 }], 'panier créé avec la bonne variante et la quantité');
assert.equal(window.localStorage.getItem('dds-cart:id'), 'gid://shopify/Cart/c1', 'identifiant du panier gardé');
assert.equal(cartLink.getAttribute('aria-label'), 'Panier, 2 articles');
assert.equal(cartLink.querySelector('.navbar_cart-count').textContent, '2');
let lines = drawer.querySelectorAll('.cart_line');
assert.equal(lines.length, 1);
assert.equal(text(lines[0].querySelector('.cart_line-title')), 'Ancolie Noir');
assert.equal(lines[0].querySelector('.cart_line-variant'), null, '« Default Title » non affiché');
assert.equal(text(lines[0].querySelector('.cart_line-price')), '438 €');
assert.equal(text(drawer.querySelector('[data-cart-subtotal]')), '438 €');
assert.equal(drawer.querySelector('[data-cart-checkout]').getAttribute('href'), 'https://boutique.test/cart/c/c1', 'lien vers le paiement Shopify');
assert.equal(text(drawer.querySelector('.cart_title')), 'Panier (2)');

// 4. Quantité : +, stock limité (avertissement), −, retrait
lines[0].querySelector('[data-cart-action="increase"]').click();
await flush();
assert.equal(drawer.querySelector('.cart_qty-input').value, '3', 'quantité augmentée');
const input = drawer.querySelector('.cart_qty-input');
input.value = '9';
input.dispatchEvent(new window.Event('change', { bubbles: true }));
await flush();
await flush();
assert.equal(drawer.querySelector('.cart_qty-input').value, '4', 'quantité ramenée au stock');
assert.match(drawer.querySelector('[data-cart-message]').textContent, /Stock insuffisant/, 'avertissement de stock en français');
drawer.querySelector('[data-cart-action="remove"]').click();
await flush();
assert.equal(drawer.querySelectorAll('.cart_line').length, 0, 'ligne retirée');
assert.ok(!drawer.querySelector('[data-cart-empty]').hidden, 'retour à l’état vide');
assert.ok(cartLink.querySelector('.navbar_cart-count').hidden);

// 5. Produit inconnu : message clair, aucune requête panier
const before = calls.length;
document.querySelector('[data-product="inconnu"]').click();
await flush();
assert.equal(calls.length, before, 'aucun appel pour un produit non relié');
assert.match(drawer.querySelector('[data-cart-message]').textContent, /pas encore disponible/);
assert.equal(drawer.querySelector('[data-cart-message]').dataset.tone, 'error');
const consoleErrors = errors.length;
assert.ok(consoleErrors >= 1, 'erreur détaillée dans la console');
window.close();

// 6. Nouvelle page : le panier est relu ; panier expiré → nouveau panier créé à l'ajout
carts.get('gid://shopify/Cart/c1').lines.push({ id: 'gid://shopify/CartLine/99', merchandiseId: 'gid://shopify/ProductVariant/1', quantity: 1 });
({ window, document, errors } = openPage({ storage: { 'dds-cart:id': 'gid://shopify/Cart/c1' } }));
await flush();
assert.equal(document.querySelector('[data-navbar="cart"]').getAttribute('aria-label'), 'Panier, 1 article', 'panier retrouvé d’une page à l’autre');
carts.delete('gid://shopify/Cart/c1'); // expiré côté Shopify
document.querySelector('[data-cart="add"][data-product="noir"]').click();
await flush();
await flush();
assert.equal(window.localStorage.getItem('dds-cart:id'), 'gid://shopify/Cart/c2', 'panier expiré remplacé par un nouveau');
assert.equal(document.querySelector('[data-navbar="cart"]').getAttribute('aria-label'), 'Panier, 1 article');
assert.equal(errors.length, 0, `Erreurs : ${errors.join(' | ')}`);
window.close();

// 7. Panier payé / expiré au chargement : identifiant oublié
({ window, document, errors } = openPage({ storage: { 'dds-cart:id': 'gid://shopify/Cart/disparu' } }));
await flush();
assert.equal(window.localStorage.getItem('dds-cart:id'), null, 'identifiant d’un panier disparu effacé');
window.close();

// 7 bis. Personnaliseur intégré : « ddt:cart-add » envoyé par son cadre → panier Storefront
{
  const page = openPage();
  await flush();
  const frame = page.document.querySelector('iframe');
  const post = (data, origin = 'https://personnalisation-jeu-echecs.damedetours.com', source = frame.contentWindow) =>
    page.window.dispatchEvent(new page.window.MessageEvent('message', { data, origin, source }));
  const uuidA = '11111111-2222-3333-4444-555555555555';
  const uuidB = '66666666-7777-8888-9999-000000000000';
  const lineOf = (uuid) => page.window.DDS.cart.cart?.lines.nodes.find((l) => l.attributes.some((a) => a.key === '_ddt_project' && a.value === uuid));

  post({ type: 'ddt:cart-add', requestId: 'r0', item: { id: 1, quantity: 1, properties: { _ddt_project: uuidA } } }, 'https://ailleurs.example');
  await flush();
  assert.equal(lineOf(uuidA), undefined, 'message d’une autre origine ignoré');

  post({ type: 'ddt:cart-add', requestId: 'r1', item: { id: 1, quantity: 1, properties: { _ddt_project: uuidA, Projet: 'Mon jeu' } } });
  await flush(); await flush();
  const added = lineOf(uuidA);
  assert.ok(added, 'création ajoutée au panier Storefront');
  assert.deepEqual(added.attributes.map((a) => a.key).sort(), ['Projet', '_ddt_project'], 'propriétés transmises en attributs');
  const row = page.document.querySelector(`[data-line-id="${added.id}"]`);
  assert.equal(row.querySelector('.cart_qty'), null, 'quantité d’une création verrouillée');
  assert.equal(row.querySelector('.cart_line-variant').textContent, 'Création personnalisée');
  assert.ok(page.document.getElementById('dds-cart').open, 'panier ouvert après l’ajout');

  post({ type: 'ddt:cart-add', requestId: 'r2', item: { id: 1, quantity: 1, properties: { _ddt_project: uuidB } }, replaceProjectId: uuidA });
  await flush(); await flush(); await flush();
  assert.ok(lineOf(uuidB), 'nouvelle version ajoutée');
  assert.equal(lineOf(uuidA), undefined, 'ancienne version retirée');
  page.window.close();
}

// 8. Boutique non configurée : pas de requête, message « ouvre bientôt »
{
  const dom = new JSDOM(html, { runScripts: 'outside-only', pretendToBeVisual: true, url: 'https://damedetours.example/' });
  const w = dom.window;
  w.matchMedia = (q) => ({ matches: q.includes('reduce'), media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
  w.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
  w.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
  w.Element.prototype.getAnimations = () => [];
  w.scrollTo = () => {};
  w.console.info = () => {};
  w.console.error = () => {};
  w.DDS_SHOPIFY = { token: '' }; // boutique non configurée
  let fetched = false;
  w.fetch = async () => ((fetched = true), ok({}));
  w.eval(bundle);
  w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
  await flush();
  w.document.querySelector('[data-cart="add"][data-product="noir"]').click();
  await flush();
  assert.equal(fetched, false, 'aucune requête sans configuration');
  assert.match(w.document.querySelector('[data-cart-message]').textContent, /ouvre bientôt/);
  assert.equal(w.document.querySelector('.prod-hero_price').textContent, '199 €', 'prix du HTML conservé');
  w.close();
}

console.log('✓ Panier OK — prix et stock Shopify, ajout, pastille, panneau, quantités, stock limité, retrait, persistance, panier expiré, personnaliseur intégré, non configuré');
