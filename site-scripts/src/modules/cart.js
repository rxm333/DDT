import { $, $$, prefersReducedMotion } from '../core/env.js';
import { createClient, shopifyConfig } from './shopify.js';

/**
 * Panier Shopify (API Storefront).
 *
 * Contrat avec le markup des pages (posé dans Webflow) :
 *  - [data-cart="add"][data-product="<clé>"][data-quantity="<n>"] : bouton « Ajouter au panier ».
 *    La clé est traduite en handle Shopify par SHOPIFY.products (config.js), ou via data-handle /
 *    data-variant sur le bouton.
 *  - [data-navbar="cart"] (et [data-cart="open"]) : ouvre le panneau panier, affiche le nombre d'articles.
 *  - [data-cart-price="<clé>"] (ou .prod-hero_price de la fiche) : prix mis à jour depuis Shopify.
 *
 * Le panneau est créé en JS, hors du conteneur Barba : il reste en place d'une page à l'autre.
 * L'identifiant du panier est gardé dans le navigateur (localStorage) ; le paiement se fait sur
 * la page Shopify (checkoutUrl). Émet « dds:cart-change » (detail.cart) sur document.
 */

const STORAGE_KEY = 'dds-cart:id';
const MAX_QTY = 10;

const ERRORS = {
  NOT_CONFIGURED: 'La boutique en ligne ouvre bientôt : la commande n’est pas encore possible.',
  NETWORK: 'Connexion impossible. Vérifiez votre réseau et réessayez.',
  UNKNOWN_PRODUCT: 'Ce jeu n’est pas encore disponible à la commande en ligne.',
  SOLD_OUT: 'Ce jeu est épuisé pour le moment.',
  DEFAULT: 'Une erreur est survenue. Réessayez dans un instant.',
};

const WARNINGS = {
  MERCHANDISE_NOT_ENOUGH_STOCK: 'Stock insuffisant : la quantité a été ajustée au maximum disponible.',
  MERCHANDISE_OUT_OF_STOCK: ERRORS.SOLD_OUT,
};

const ICONS = {
  close:
    '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
};

/** 199 € (entier) ou 12,50 € — comme les prix écrits sur le site. */
export function formatMoney(money) {
  if (!money) return '';
  const amount = Number(money.amount);
  const whole = Number.isInteger(amount);
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: money.currencyCode || 'EUR',
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(amount);
}

/** Valeur sûre dans un sélecteur d'attribut entre guillemets. */
const attr = (value) => String(value).replace(/["\\]/g, '\\$&');

const articles = (n) => (n > 1 ? `${n} articles` : `${n} article`);

const storage = {
  get() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  },
  set(id) {
    try {
      if (id) localStorage.setItem(STORAGE_KEY, id);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* stockage indisponible : le panier dure le temps de la page */
    }
  },
};

const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
};

function buildDrawer() {
  const dialog = el('dialog', 'cart_drawer');
  dialog.id = 'dds-cart';
  dialog.setAttribute('aria-labelledby', 'dds-cart-title');
  dialog.setAttribute('data-lenis-prevent', '');
  dialog.innerHTML = `
    <div class="cart_panel">
      <div class="cart_header">
        <h2 class="cart_title" id="dds-cart-title">Panier <span class="cart_count" data-cart-count></span></h2>
        <button type="button" class="cart_close" data-cart-close aria-label="Fermer le panier">${ICONS.close}</button>
      </div>
      <p class="cart_message" data-cart-message role="status" aria-live="polite"></p>
      <div class="cart_body">
        <ul class="cart_lines" role="list" data-cart-lines></ul>
        <div class="cart_empty" data-cart-empty>
          <p class="cart_empty-text">Votre panier est vide.</p>
          <a class="cart_empty-link" href="/#collection" data-cart-close>Découvrir la collection</a>
        </div>
      </div>
      <div class="cart_footer" data-cart-footer>
        <div class="cart_subtotal"><span>Sous-total</span><span data-cart-subtotal></span></div>
        <p class="cart_note">TTC. Frais de livraison calculés à l’étape suivante.</p>
        <a class="cart_checkout" href="#" data-cart-checkout data-barba-prevent="self"><span>Commander</span></a>
        <p class="cart_secure">Paiement sécurisé par Shopify</p>
      </div>
    </div>`;
  return dialog;
}

export function initCart({ lenis, navbar } = {}) {
  const config = shopifyConfig();
  const client = createClient(config);
  if (!config.configured) {
    console.info('[DDS] Panier : boutique Shopify non configurée (SHOPIFY.domain / SHOPIFY.token dans config.js).');
  }

  const dialog = buildDrawer();
  document.body.append(dialog);
  const ui = {
    count: $('[data-cart-count]', dialog),
    message: $('[data-cart-message]', dialog),
    lines: $('[data-cart-lines]', dialog),
    empty: $('[data-cart-empty]', dialog),
    footer: $('[data-cart-footer]', dialog),
    subtotal: $('[data-cart-subtotal]', dialog),
    checkout: $('[data-cart-checkout]', dialog),
  };

  let cart = null;
  let queue = Promise.resolve();
  let pending = 0;

  /** Les opérations sur le panier s'enchaînent une par une (pas de réponses croisées). */
  const run = (task) => {
    pending += 1;
    dialog.setAttribute('aria-busy', 'true');
    const next = queue.then(task);
    queue = next
      .catch(() => {})
      .finally(() => {
        pending -= 1;
        if (!pending) dialog.removeAttribute('aria-busy');
      });
    return next;
  };

  // ---------- Messages ----------
  let messageTimer = 0;
  function say(text, tone = 'info') {
    clearTimeout(messageTimer);
    ui.message.dataset.tone = tone;
    ui.message.textContent = '';
    requestAnimationFrame(() => (ui.message.textContent = text));
    if (tone === 'info') messageTimer = setTimeout(() => (ui.message.textContent = ''), 5000);
  }
  function fail(error) {
    console.error('[DDS] Panier :', error);
    say(ERRORS[error?.code] || ERRORS.DEFAULT, 'error');
  }
  function warn(warnings) {
    const w = warnings?.[0];
    if (w) say(WARNINGS[w.code] || w.message, 'warning');
  }

  // ---------- Icône de la navbar ----------
  function renderTriggers() {
    const n = cart?.totalQuantity || 0;
    $$('[data-navbar="cart"], [data-cart="open"]').forEach((trigger) => {
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.setAttribute('aria-controls', dialog.id);
      trigger.setAttribute('aria-label', n ? `Panier, ${articles(n)}` : 'Panier, vide');
      if (trigger.matches('[data-navbar="cart"]')) {
        let badge = $('.navbar_cart-count', trigger);
        if (!badge) {
          badge = el('span', 'navbar_cart-count');
          badge.setAttribute('aria-hidden', 'true');
          trigger.append(badge);
        }
        badge.textContent = n > 99 ? '99+' : String(n);
        badge.hidden = !n;
      }
    });
  }

  // ---------- Contenu du panneau ----------
  function renderLine(line) {
    const v = line.merchandise || {};
    const product = v.product || {};
    const image = v.image || product.featuredImage;
    const title = product.title || 'Article';

    const li = el('li', 'cart_line');
    li.dataset.lineId = line.id;

    if (image?.url) {
      const img = el('img', 'cart_line-image');
      img.src = image.url;
      img.alt = '';
      img.loading = 'lazy';
      img.width = 120;
      img.height = 120;
      li.append(img);
    } else {
      li.append(el('span', 'cart_line-image is-empty'));
    }

    const info = el('div', 'cart_line-info');
    info.append(el('p', 'cart_line-title', title));
    if (v.title && v.title !== 'Default Title') info.append(el('p', 'cart_line-variant', v.title));
    if (line.quantity > 1 && v.price) info.append(el('p', 'cart_line-unit', `${formatMoney(v.price)} l’unité`));
    if (v.availableForSale === false) info.append(el('p', 'cart_line-alert', 'Épuisé : retirez-le pour commander.'));

    const actions = el('div', 'cart_line-actions');
    const qty = el('div', 'cart_qty');
    qty.setAttribute('role', 'group');
    qty.setAttribute('aria-label', `Quantité, ${title}`);
    const minus = el('button', 'cart_qty-button');
    minus.type = 'button';
    minus.dataset.cartAction = 'decrease';
    minus.setAttribute('aria-label', line.quantity <= 1 ? `Retirer ${title}` : 'Diminuer la quantité');
    minus.innerHTML = '<span aria-hidden="true">−</span>';
    const input = el('input', 'cart_qty-input');
    input.type = 'number';
    input.min = '0';
    input.max = String(MAX_QTY);
    input.inputMode = 'numeric';
    input.value = String(line.quantity);
    input.dataset.cartAction = 'set';
    input.setAttribute('aria-label', 'Quantité');
    const plus = el('button', 'cart_qty-button');
    plus.type = 'button';
    plus.dataset.cartAction = 'increase';
    plus.setAttribute('aria-label', 'Augmenter la quantité');
    plus.innerHTML = '<span aria-hidden="true">+</span>';
    plus.disabled = line.quantity >= MAX_QTY;
    qty.append(minus, input, plus);

    const remove = el('button', 'cart_remove', 'Retirer');
    remove.type = 'button';
    remove.dataset.cartAction = 'remove';
    remove.setAttribute('aria-label', `Retirer ${title} du panier`);
    actions.append(qty, remove);
    info.append(actions);

    li.append(info, el('p', 'cart_line-price', formatMoney(line.cost?.totalAmount)));
    return li;
  }

  function render() {
    // Garde le focus sur le même contrôle après le re-rendu
    const active = document.activeElement;
    const focusLine = dialog.contains(active) ? active.closest('[data-line-id]')?.dataset.lineId : null;
    const focusAction = focusLine ? active.dataset.cartAction : null;

    const lines = cart?.lines?.nodes || [];
    const n = cart?.totalQuantity || 0;
    ui.lines.replaceChildren(...lines.map(renderLine));
    ui.count.textContent = n ? `(${n})` : '';
    ui.empty.hidden = lines.length > 0;
    ui.footer.hidden = lines.length === 0;
    ui.subtotal.textContent = formatMoney(cart?.cost?.subtotalAmount);
    const blocked = lines.some((l) => l.merchandise?.availableForSale === false);
    if (cart?.checkoutUrl && !blocked) {
      ui.checkout.href = cart.checkoutUrl;
      ui.checkout.removeAttribute('aria-disabled');
    } else {
      ui.checkout.removeAttribute('href');
      ui.checkout.setAttribute('aria-disabled', 'true');
    }
    renderTriggers();

    if (focusLine) {
      const row = $(`[data-line-id="${attr(focusLine)}"]`, ui.lines);
      const target = row && $(`[data-cart-action="${focusAction}"]`, row);
      if (target && !target.disabled) target.focus({ preventScroll: true });
      else $('[data-cart-close]', dialog).focus({ preventScroll: true });
    }
    document.dispatchEvent(new CustomEvent('dds:cart-change', { detail: { cart } }));
  }

  function setCart(next) {
    cart = next || null;
    storage.set(cart?.id || null);
    render();
    return cart;
  }

  // ---------- Opérations ----------
  async function resolveMerchandise(button) {
    if (button.dataset.variant) return button.dataset.variant;
    const key = button.dataset.product;
    const handle = button.dataset.handle || config.products[key];
    if (!handle) throw Object.assign(new Error(`Produit inconnu : ${key}`), { code: 'UNKNOWN_PRODUCT' });
    const product = await client.product(handle);
    if (!product) throw Object.assign(new Error(`Produit introuvable dans Shopify : ${handle}`), { code: 'UNKNOWN_PRODUCT' });
    const variants = product.variants?.nodes || [];
    const variant = variants.find((v) => v.availableForSale) || variants[0];
    if (!variant) throw Object.assign(new Error(`Produit sans variante : ${handle}`), { code: 'UNKNOWN_PRODUCT' });
    if (!variant.availableForSale) throw Object.assign(new Error(`Épuisé : ${handle}`), { code: 'SOLD_OUT' });
    return variant.id;
  }

  const isMissingCart = (error) => error?.userErrors?.some((e) => (e.field || []).includes('cartId'));

  function add({ merchandiseId, quantity = 1, attributes }) {
    const lines = [{ merchandiseId, quantity: Math.max(1, Math.min(MAX_QTY, Number(quantity) || 1)) }];
    if (attributes?.length) lines[0].attributes = attributes;
    return run(async () => {
      let result;
      if (cart?.id) {
        try {
          result = await client.addLines(cart.id, lines);
        } catch (error) {
          if (!isMissingCart(error)) throw error;
          result = await client.createCart(lines); // panier expiré entre-temps
        }
      } else {
        result = await client.createCart(lines);
      }
      setCart(result.cart);
      return { cart, warnings: result.warnings };
    });
  }

  function updateLine(lineId, quantity) {
    const q = Math.max(0, Math.min(MAX_QTY, Math.round(Number(quantity)) || 0));
    return run(async () => {
      if (!cart?.id) return cart;
      const result = q
        ? await client.updateLines(cart.id, [{ id: lineId, quantity: q }])
        : await client.removeLines(cart.id, [lineId]);
      setCart(result.cart);
      warn(result.warnings);
      return cart;
    }).catch((error) => {
      fail(error);
      render(); // remet la quantité affichée à la valeur réelle
    });
  }

  function refresh() {
    const id = storage.get();
    if (!config.configured || !id) return Promise.resolve(setCart(null));
    return run(async () => setCart(await client.getCart(id))).catch((error) => {
      console.error('[DDS] Panier :', error);
      render();
    });
  }

  // ---------- Ouverture / fermeture ----------
  const root = document.documentElement;
  function open() {
    if (dialog.open) return;
    navbar?.close?.();
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    root.classList.add('is-cart-open');
    lenis?.stop?.();
    requestAnimationFrame(() => dialog.classList.add('is-visible'));
  }

  function close() {
    if (!dialog.open || dialog.classList.contains('is-closing')) return;
    const finish = () => {
      dialog.classList.remove('is-closing');
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
      root.classList.remove('is-cart-open');
      ui.message.textContent = '';
      lenis?.start?.();
    };
    dialog.classList.remove('is-visible');
    if (prefersReducedMotion()) return finish();
    dialog.classList.add('is-closing');
    const panel = $('.cart_panel', dialog);
    let done = false;
    const once = () => {
      if (done) return;
      done = true;
      finish();
    };
    panel.addEventListener('transitionend', once, { once: true });
    setTimeout(once, 500); // filet si la transition n'a pas lieu
  }

  // Échap : fermeture animée plutôt que la fermeture sèche du navigateur
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    close();
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) return close(); // clic sur le fond
    if (event.target.closest('[data-cart-close]')) return close();
    const checkout = event.target.closest('[data-cart-checkout]');
    if (checkout && checkout.getAttribute('aria-disabled') === 'true') {
      event.preventDefault();
      return;
    }
    const button = event.target.closest('button[data-cart-action]');
    const row = button?.closest('[data-line-id]');
    if (!row) return;
    const line = cart?.lines?.nodes.find((l) => l.id === row.dataset.lineId);
    if (!line) return;
    const action = button.dataset.cartAction;
    if (action === 'increase') updateLine(line.id, line.quantity + 1);
    else if (action === 'decrease') updateLine(line.id, line.quantity - 1);
    else if (action === 'remove') updateLine(line.id, 0);
  });
  dialog.addEventListener('change', (event) => {
    const input = event.target.closest('input[data-cart-action="set"]');
    const row = input?.closest('[data-line-id]');
    if (row) updateLine(row.dataset.lineId, input.value);
  });

  // ---------- Boutons des pages (délégation : fonctionne après chaque transition Barba) ----------
  async function onAdd(button) {
    if (button.getAttribute('aria-busy') === 'true') return;
    button.setAttribute('aria-busy', 'true');
    button.classList.add('is-loading');
    try {
      const merchandiseId = await resolveMerchandise(button);
      const { warnings } = await add({ merchandiseId, quantity: button.dataset.quantity });
      open();
      if (warnings?.length) warn(warnings);
      else say('Ajouté au panier.');
    } catch (error) {
      fail(error);
      open();
    } finally {
      button.removeAttribute('aria-busy');
      button.classList.remove('is-loading');
    }
  }

  document.addEventListener('click', (event) => {
    const addButton = event.target.closest('[data-cart="add"]');
    if (addButton && !addButton.closest('[data-customizer]')) {
      event.preventDefault();
      if (!addButton.disabled) onAdd(addButton);
      return;
    }
    const trigger = event.target.closest('[data-navbar="cart"], [data-cart="open"]');
    if (trigger) {
      event.preventDefault();
      open();
    }
  });

  // Prix et disponibilité des fiches produit, lus dans Shopify
  async function syncPage(scope = document) {
    renderTriggers();
    if (!config.configured) return;
    const buttons = $$('[data-cart="add"]', scope).filter((b) => !b.closest('[data-customizer]') && !b.dataset.variant);
    await Promise.all(
      buttons.map(async (button) => {
        const key = button.dataset.product;
        const handle = button.dataset.handle || config.products[key];
        if (!handle) return;
        try {
          const product = await client.product(handle);
          if (!product) return console.warn(`[DDS] Panier : produit « ${handle} » introuvable dans Shopify.`);
          const variants = product.variants?.nodes || [];
          const variant = variants.find((v) => v.availableForSale) || variants[0];
          if (!variant) return;
          const prices = [
            ...$$(`[data-cart-price="${attr(key)}"]`, scope),
            ...(button.closest('.prod-buy_panel')?.parentElement ? $$('.prod-hero_price', button.closest('.prod-buy_panel').parentElement) : []),
          ];
          new Set(prices).forEach((p) => (p.textContent = formatMoney(variant.price)));
          const soldOut = !variant.availableForSale;
          button.disabled = soldOut;
          button.classList.toggle('is-sold-out', soldOut);
          const holder = button.parentElement;
          let note = $('.cart_sold-out', holder);
          if (soldOut && !note) {
            note = el('p', 'cart_sold-out', 'Épuisé pour le moment');
            note.id = `dds-sold-out-${key}`;
            button.after(note);
            button.setAttribute('aria-describedby', note.id);
          } else if (!soldOut && note) {
            note.remove();
            button.removeAttribute('aria-describedby');
          }
        } catch (error) {
          console.warn('[DDS] Panier : prix non mis à jour', error);
        }
      })
    );
  }

  // Retour depuis la page de paiement (cache « page précédente ») ou autre onglet : on relit le panier
  window.addEventListener('pageshow', (event) => event.persisted && refresh());
  window.addEventListener('storage', (event) => event.key === STORAGE_KEY && refresh());

  render();
  refresh();

  return {
    open,
    close,
    refresh,
    syncPage,
    add,
    get cart() {
      return cart;
    },
    get configured() {
      return config.configured;
    },
  };
}
