/**
 * Origine des visites, jointe aux commandes.
 * Le paiement Shopify ne voit pas le parcours sur damedetours.com (« Aucun détail de conversion ») :
 * le site retient, pour la visite en cours, d'où vient le visiteur (moteur de recherche, réseau social,
 * assistant IA, campagne utm_…, QR code…) et sa page d'arrivée. Ces informations sont jointes au panier
 * (« attributs » du panier) et apparaissent dans la commande Shopify, rubrique « Informations supplémentaires ».
 * Aucune donnée personnelle, aucun service extérieur ; conservé seulement le temps de la visite (sessionStorage).
 */
const KEY = 'dds-origin';

const SOURCES = [
  [/(^|\.)google\./, 'Google'],
  [/(^|\.)bing\.com$/, 'Bing'],
  [/(^|\.)(duckduckgo\.com|qwant\.com|ecosia\.org|search\.yahoo\.com|yandex\.)/, 'Moteur de recherche'],
  [/(^|\.)(chatgpt\.com|chat\.openai\.com)$/, 'ChatGPT'],
  [/(^|\.)perplexity\.ai$/, 'Perplexity'],
  [/(^|\.)claude\.ai$/, 'Claude'],
  [/(^|\.)gemini\.google\.com$/, 'Gemini'],
  [/(^|\.)copilot\.microsoft\.com$/, 'Copilot'],
  [/(^|\.)(instagram\.com)$/, 'Instagram'],
  [/(^|\.)(facebook\.com|fb\.com|messenger\.com)$/, 'Facebook'],
  [/(^|\.)tiktok\.com$/, 'TikTok'],
  [/(^|\.)pinterest\./, 'Pinterest'],
  [/(^|\.)(linkedin\.com|lnkd\.in)$/, 'LinkedIn'],
  [/(^|\.)(youtube\.com|youtu\.be)$/, 'YouTube'],
  [/(^|\.)(x\.com|twitter\.com|t\.co)$/, 'X (Twitter)'],
];
const OWN = /(^|\.)damedetours\.com$|myshopify\.com$/;

const clip = (s, n = 120) => String(s || '').slice(0, n);

function detect() {
  const params = new URLSearchParams(location.search);
  const utm = ['utm_source', 'utm_medium', 'utm_campaign'].map((k) => params.get(k)).filter(Boolean);
  let host = '';
  try { host = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, '') : ''; } catch { /* référent illisible */ }
  const external = host && !OWN.test(host);
  const named = external && SOURCES.find(([re]) => re.test(host))?.[1];

  let source;
  if (params.get('gclid') || params.get('gbraid') || params.get('wbraid')) source = 'Google Ads';
  else if (params.get('srsltid') && (!host || /(^|\.)google\./.test(host))) source = 'Google (fiche produit dans les résultats)';
  else if (params.get('fbclid') && !utm.length) source = named || 'Facebook / Instagram';
  else if (utm.length) source = `Campagne : ${params.get('utm_source') || '?'}${params.get('utm_medium') ? ` / ${params.get('utm_medium')}` : ''}`;
  else if (location.pathname.replace(/\/$/, '') === '/ouverture' && !external) source = 'QR code (page Bienvenue)';
  else if (named) source = named;
  else if (external) source = `Site : ${host}`;
  else source = 'Accès direct (adresse tapée, favori ou application)';

  return {
    source: clip(source),
    campaign: clip(params.get('utm_campaign')),
    // Mot-clé : Google ne le transmet pas en référencement naturel ; présent pour les annonces Google Ads
    // si l'adresse finale contient « utm_term={keyword} », ou pour un lien étiqueté à la main.
    keyword: clip(params.get('utm_term') || params.get('keyword')),
    landing: clip(location.pathname + (params.get('utm_content') ? ` (${params.get('utm_content')})` : ''), 200),
    referrer: external ? clip(host) : '',
    at: new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short', timeZone: 'Europe/Paris' }),
  };
}

/** À l'arrivée sur le site : retient l'origine de la visite (la première page vue compte). */
export function captureOrigin() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    sessionStorage.setItem(KEY, JSON.stringify(detect()));
  } catch { /* stockage indisponible (navigation privée stricte) : pas d'origine */ }
}

/** Attributs du panier Shopify (visibles dans la commande, « Informations supplémentaires »). */
export function originAttributes() {
  let o = null;
  try { o = JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch { /* rien */ }
  if (!o) o = detect();
  return [
    ['Origine de la visite', o.source],
    ['Campagne', o.campaign],
    ['Mot-clé', o.keyword],
    ['Site précédent', o.referrer],
    ['Page d’arrivée', o.landing],
    ['Arrivée sur le site', o.at],
  ].filter(([, value]) => value).map(([key, value]) => ({ key, value }));
}
