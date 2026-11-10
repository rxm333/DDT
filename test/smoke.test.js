// Test de fumée : charge le bundle buildé dans jsdom avec le markup Webflow réel
// (navbar, carte produit, marquee) et vérifie l'initialisation + l'accessibilité du menu.
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const bundle = readFileSync(new URL('../dist/dame-de-tours.min.js', import.meta.url), 'utf8');

const html = `<!doctype html><html><head></head><body>
<header class="navbar_wrapper">
  <nav class="navbar_component" aria-label="Navigation principale" data-navbar="component">
    <div class="navbar_bar">
      <button type="button" class="navbar_button" id="navbar-toggle" aria-expanded="false" aria-controls="navbar-menu" aria-label="Ouvrir le menu" data-navbar="toggle">
        <span class="navbar_menu-icon" aria-hidden="true"><span class="navbar_menu-line"></span><span class="navbar_menu-line"></span></span>
      </button>
      <a class="navbar_logo-link" href="/" aria-label="Dame de Tours — Accueil"></a>
      <a class="navbar_button" href="#" aria-label="Panier, 1 article" data-navbar="cart"></a>
    </div>
    <div class="navbar_menu" id="navbar-menu" data-navbar="menu">
      <div class="navbar_divider is-inset"></div>
      <div class="navbar_menu-content">
        <ul class="navbar_link-list" role="list"><li><a class="navbar_link" href="/">Accueil</a></li><li><a class="navbar_link" href="#collection">Collection Ancolie</a></li></ul>
        <div class="navbar_divider"></div>
        <div class="navbar_infos"><div class="navbar_info-col"><a class="navbar_info-link" href="#">Instagram</a></div></div>
      </div>
    </div>
  </nav>
</header>
<main class="main-wrapper">
  <section class="section_collection" id="collection"><h2 class="collection_heading">Collection Ancolie</h2>
    <article class="product-card_component"><h3><a class="product-card_link" href="/ancolie-blanc">Blanc</a></h3><span class="product-card_button" aria-hidden="true"><span>Voir le produit</span></span></article>
  </section>
  <section class="section_atelier"><div class="atelier_marquee"><ul class="atelier_marquee-list" aria-label="Photos"><li class="atelier_marquee-item"><img src="https://x.test/a.webp" alt="A"></li></ul><ul class="atelier_marquee-list" aria-hidden="true"><li class="atelier_marquee-item"><img src="https://x.test/a.webp" alt=""></li></ul></div><input type="checkbox" class="atelier_pause-input"></section>
  <section class="section_prod-hero">
    <div data-gallery=""><div data-product-viewer="ancolie-blanc"><img data-gallery-main="" src="https://x.test/vue.webp" alt="Vue A"></div>
      <ul><li><button type="button" data-gallery-thumb="" aria-pressed="true" data-alt="Vue A"><img src="https://x.test/vue.webp" alt=""></button></li>
      <li><button type="button" data-gallery-thumb="" aria-pressed="false" data-alt="Vue B"><img src="https://x.test/b.webp" alt=""></button></li></ul></div>
    <div data-qty="blanc"><button type="button" data-qty-minus="">−</button><input type="number" value="1" min="1" max="3" data-qty-input=""><button type="button" data-qty-plus="">+</button></div>
    <button type="button" class="prod-buy_add" data-cart="add" data-product="blanc" data-quantity="1"><span>Ajouter au panier</span></button>
  </section>
  <section class="section_cfg"><div class="cfg_component" data-customizer="">
    <div class="cfg_panel"><div class="cfg_steps">
      <details class="cfg_step" data-cfg-step="plateau" open="open"><summary><span data-cfg-summary="plateau"></span></summary><div>
        <fieldset><legend>Revêtement</legend>
          <label class="cfg_choice"><input type="radio" name="plateau" value="couleur-unie" checked="checked"><span class="cfg_choice-name">Couleur unie</span></label>
          <label class="cfg_choice"><input type="radio" name="plateau" value="votre-image" data-price="20"><span class="cfg_choice-name">Votre image</span></label></fieldset>
        <fieldset><legend><span>Teinte du cuir</span><span data-cfg-label="cuir"></span></legend>
          <input class="cfg_swatch" type="radio" name="cuir" value="noir" aria-label="Noir">
          <input class="cfg_swatch" type="radio" name="cuir" value="blanc-os" aria-label="Blanc os" checked="checked"></fieldset></div></details>
      <details class="cfg_step" data-cfg-step="inscription"><summary><span data-cfg-summary="inscription"></span></summary><div>
        <label for="z1">Zone 1</label><input type="text" id="z1" name="inscription-1" maxlength="40" data-cfg-zone="inscription" data-price="6">
        <label for="z2">Zone 2</label><input type="text" id="z2" name="inscription-2" maxlength="40" data-cfg-zone="inscription" data-price="6"></div></details>
    </div><div class="cfg_total"><span data-cfg-total="">249,00 €</span>
      <button type="button" class="cfg_order" data-cfg-order="" data-cart="add" data-product="sur-mesure"><span>Passer ma commande</span></button>
      <button type="button" class="cfg_save" data-cfg-save=""><span>Sauvegarder ma création</span></button>
      <p class="sr-only" role="status" data-cfg-status=""></p></div></div></div></section>
</main>
</body></html>`;

const errors = [];
const dom = new JSDOM(html, { runScripts: 'outside-only', pretendToBeVisual: true, url: 'https://damedetours.example/' });
const { window } = dom;

// APIs absentes de jsdom
window.matchMedia = (q) => ({ matches: q.includes('no-preference'), media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
window.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
window.Element.prototype.getAnimations = () => [];
window.scrollTo = () => {};
window.scroll = () => {};
window.console.error = (...a) => errors.push(a.join(' '));

window.eval(bundle);
window.document.dispatchEvent(new window.Event('DOMContentLoaded'));

const { document } = window;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

assert.equal(errors.length, 0, `Erreurs à l'initialisation : ${errors.join(' | ')}`);
assert.ok(window.DDS?.version, 'API window.DDS exposée');
assert.ok(window.DDS.lenis, 'Lenis initialisé');
assert.ok(document.documentElement.classList.contains('lenis'), 'classe .lenis sur <html>');

// Texte qui roule
const btn = document.querySelector('.product-card_button');
assert.ok(btn.hasAttribute('data-dds-roll'), 'bouton préparé pour le roll');
assert.equal(btn.querySelector('.dds-roll__text').dataset.text, 'Voir le produit');
assert.equal(btn.getAttribute('aria-hidden'), 'true', 'repère visuel masqué (le lien du titre porte l’accessibilité)');
assert.ok(btn.classList.contains('dds-btn') && btn.classList.contains('dds-btn--ghost'), 'bouton contour amélioré');
assert.equal(btn.querySelector('.dds-sr').textContent, 'Voir le produit', 'libellé lisible d’un seul tenant');
assert.equal(btn.querySelector('.dds-roll').getAttribute('aria-hidden'), 'true', 'lettres décoratives masquées');
assert.equal(btn.querySelectorAll('.dds-roll__char').length, 'Voir le produit'.length, 'une lettre par span');
const addSolid = document.querySelector('[data-cart="add"][data-product="blanc"]');
assert.ok(addSolid.classList.contains('dds-btn--solid'), 'bouton plein amélioré');

// Navbar
const toggle = document.querySelector('[data-navbar="toggle"]');
const menu = document.querySelector('[data-navbar="menu"]');
assert.ok(menu.hasAttribute('data-lenis-prevent'), 'menu exclu de Lenis');

toggle.click();
assert.equal(toggle.getAttribute('aria-expanded'), 'true');
assert.equal(toggle.getAttribute('aria-label'), 'Fermer le menu');
assert.ok(menu.classList.contains('is-open'), 'menu ouvert');

document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
assert.equal(toggle.getAttribute('aria-expanded'), 'false', 'Échap ferme le menu');
assert.equal(toggle.getAttribute('aria-label'), 'Ouvrir le menu');
assert.equal(document.activeElement, toggle, 'focus rendu au bouton');
await wait(900);
assert.ok(!menu.classList.contains('is-open'), 'menu masqué après l’animation de fermeture');

// Clic extérieur
toggle.click();
const PointerCtor = window.PointerEvent || window.MouseEvent;
document.querySelector('main').dispatchEvent(new PointerCtor('pointerdown', { bubbles: true }));
assert.equal(toggle.getAttribute('aria-expanded'), 'false', 'clic extérieur ferme le menu');

// Ancre interne : pas d'erreur, l'URL est mise à jour
document.querySelector('a[href="#collection"]').click();
assert.equal(window.location.hash, '#collection');

// Fiche produit : galerie
const thumbs = document.querySelectorAll('[data-gallery-thumb]');
const mainImg = document.querySelector('[data-gallery-main]');
thumbs[1].click();
assert.equal(mainImg.getAttribute('src'), 'https://x.test/b.webp', 'image principale changée');
assert.equal(mainImg.alt, 'Vue B', 'alt de l’image principale mis à jour');
assert.equal(thumbs[0].getAttribute('aria-pressed'), 'false');
assert.equal(thumbs[1].getAttribute('aria-pressed'), 'true');

// Fiche produit : quantité
const qty = document.querySelector('[data-qty-input]');
const minusB = document.querySelector('[data-qty-minus]');
const plusB = document.querySelector('[data-qty-plus]');
const addB = document.querySelector('[data-cart="add"][data-product="blanc"]');
assert.ok(minusB.disabled, '− désactivé au minimum');
plusB.click(); plusB.click(); plusB.click();
assert.equal(qty.value, '3', 'quantité bornée au maximum');
assert.ok(plusB.disabled, '+ désactivé au maximum');
assert.equal(addB.dataset.quantity, '3', 'quantité transmise au bouton panier');

// Marquee pilotable
const track = document.querySelector('.atelier_marquee');
assert.ok(track.classList.contains('is-draggable'), 'marquee pris en main par le JS');
assert.equal(track.querySelector('img').draggable, false, 'images non glissables nativement');

// Personnaliseur
const fmt = (t) => t.replace(/\s/g, ' ');
const cfgTotal = document.querySelector('[data-cfg-total]');
assert.equal(fmt(cfgTotal.textContent), '249,00 €', 'total de base');
assert.equal(document.querySelector('[data-cfg-summary="plateau"]').textContent, 'Couleur unie · Blanc os', 'résumé étape 01');
assert.equal(document.querySelector('[data-cfg-label="cuir"]').textContent, 'Blanc os', 'teinte affichée');
assert.equal(document.querySelector('[data-cfg-summary="inscription"]').textContent, 'Aucune', 'aucune inscription');
const img = document.querySelector('input[value="votre-image"]');
img.checked = true; img.dispatchEvent(new window.Event('change', { bubbles: true }));
const noir = document.querySelector('input[value="noir"]');
noir.checked = true; noir.dispatchEvent(new window.Event('change', { bubbles: true }));
const z1 = document.getElementById('z1');
z1.value = 'Pour Léa'; z1.dispatchEvent(new window.Event('input', { bubbles: true }));
assert.equal(fmt(cfgTotal.textContent), '275,00 €', 'total : base + image + 1 zone');
assert.equal(document.querySelector('[data-cfg-summary="plateau"]').textContent, 'Votre image · Noir');
assert.equal(document.querySelector('[data-cfg-summary="inscription"]').textContent, '1 zone');
const orderB = document.querySelector('[data-cfg-order]');
assert.equal(orderB.dataset.price, '275');
assert.deepEqual(JSON.parse(orderB.dataset.config), { plateau: 'votre-image', cuir: 'noir', 'inscription-1': 'Pour Léa' });
assert.ok(orderB.classList.contains('dds-btn--solid'), 'bouton commande amélioré');
const url = window.DDS.customizer.shareUrl();
assert.ok(url.includes('plateau=votre-image') && url.includes('cuir=noir'), 'lien de sauvegarde');

assert.equal(errors.length, 0, `Erreurs : ${errors.join(' | ')}`);
console.log('✓ Test de fumée OK — init, roll, navbar (aria, Échap, focus, clic extérieur), ancres, fiche produit (galerie, quantité), personnaliseur (total, résumés, sauvegarde)');
window.close();
