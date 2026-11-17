// Prix et disponibilité lus dans Shopify au moment de la construction (pour les données Google).
// Jeton Storefront PUBLIC (le même que celui du site, voir site-scripts/src/config.js).
// Sans réseau (ou en cas d'erreur), on garde le prix écrit dans la page et on n'annonce pas la disponibilité.
const SHOP = { domain: '7btbwv-j0.myshopify.com', token: '2654378ee987411f015efcbdd396cc34', api: '2026-04' };

let promise;
export function shopifyProducts(handles) {
  promise ??= (async () => {
    try {
      const q = `query { ${handles.map((h, i) => `p${i}: product(handle: "${h}") { handle availableForSale priceRange { minVariantPrice { amount currencyCode } } }`).join(' ')} }`;
      const res = await fetch(`https://${SHOP.domain}/api/${SHOP.api}/graphql.json`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'X-Shopify-Storefront-Access-Token': SHOP.token },
        body: JSON.stringify({ query: q }),
        signal: AbortSignal.timeout(8000),
      });
      const { data } = await res.json();
      const out = {};
      for (const p of Object.values(data || {})) {
        if (p) out[p.handle] = { available: p.availableForSale, price: Number(p.priceRange.minVariantPrice.amount).toFixed(2), currency: p.priceRange.minVariantPrice.currencyCode };
      }
      console.log(`[shopify] prix : ${Object.entries(out).map(([h, p]) => `${h.replace('jeux-echecs-dame-de-tours-', '')} ${p.price} ${p.currency}${p.available ? '' : ' (épuisé)'}`).join(' · ')}`);
      return out;
    } catch (e) {
      console.warn(`[shopify] prix non récupérés (${e.message}) : prix de la page utilisés`);
      return {};
    }
  })();
  return promise;
}
