// Prix écrits dans la page au moment de la construction, depuis Shopify (même règle que cart.js) :
// le visiteur et Google voient d'emblée le vrai prix, plus « 199 € » écrit en dur puis corrigé.
import { PRODUCTS } from './site.js';

const handleOfKey = Object.fromEntries(Object.values(PRODUCTS).map((p) => [p.key, p.handle]));

export function formatMoney(amount, currency = 'EUR') {
  const n = Number(amount);
  const whole = Number.isInteger(n);
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency, minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: whole ? 0 : 2 }).format(n);
}

export function applyPrices(html, shopify) {
  if (!shopify || !Object.keys(shopify).length) return html;
  return html.replace(/(<(\w+)[^>]*\sdata-cart-price="([^"]+)"[^>]*>)([^<]*)(<\/\2>)/g, (m, open, tag, keys, text, close) => {
    const prices = keys.split(/\s+/).filter(Boolean).map((k) => shopify[handleOfKey[k]]);
    if (!prices.length || prices.some((p) => !p)) return m;
    const amounts = prices.map((p) => Number(p.price));
    const lowest = prices[amounts.indexOf(Math.min(...amounts))];
    const label = formatMoney(lowest.price, lowest.currency);
    return open + (prices.length > 1 && new Set(amounts).size > 1 ? `dès ${label}` : label) + close;
  });
}
