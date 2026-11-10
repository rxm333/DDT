import barba from '@barba/core';
import { gsap, ScrollTrigger } from '../core/gsap.js';
import { $, $$, prefersReducedMotion } from '../core/env.js';
import { TRANSITIONS as T } from '../config.js';

/**
 * Transitions de page avec Barba : seul le contenu (<main data-barba="container">) change.
 * La navbar, hors du conteneur, ne bouge jamais ; le footer est simplement estompé pendant l'échange.
 *
 * À chaque navigation :
 *  - sortie : fondu + léger glissement vers le haut, menu mobile refermé ;
 *  - échange : <title>, métadonnées SEO, data-wf-page, liens actifs (navbar + footer), retour en haut ;
 *  - entrée : les modules de la page sont réinitialisés, puis fondu + glissement depuis le bas ;
 *  - accessibilité : le focus est placé sur le titre principal (annoncé par les lecteurs d'écran) ;
 *  - Webflow (formulaires…) est réinitialisé.
 * Sans conteneur Barba sur la page, ou en cas d'erreur, la navigation reste classique.
 */
export function initTransitions({ lenis, navbar, destroyPage, initPage }) {
  if (!$(T.wrapper) || !$(T.container)) return null;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  const reduce = () => prefersReducedMotion();
  const persistent = () => $$(T.persistent.join(',')).filter((el) => !el.closest(T.container));
  const samePageHash = (url) => url.pathname === location.pathname && url.search === location.search;

  barba.init({
    preventRunning: true,
    timeout: 10000,
    prevent: ({ el, href }) => {
      if (!el || el.closest('[data-barba-prevent]') || el.hasAttribute('download')) return true;
      if (el.target && el.target !== '_self') return true;
      let url;
      try {
        url = new URL(href, location.href);
      } catch {
        return true;
      }
      if (url.origin !== location.origin) return true;
      if (samePageHash(url)) return true; // ancres de la page : gérées par le défilement doux
      if (/\.(pdf|zip|jpe?g|png|webp|svg|glb|mp4)$/i.test(url.pathname)) return true;
      return T.reload.some((p) => url.pathname.replace(/\/$/, '') === p);
    },
    transitions: [
      {
        name: 'dds-fade',
        async leave({ current }) {
          navbar?.close?.();
          navbar?.lock?.(true);
          lenis?.stop();
          const d = reduce() ? 0 : T.leave.duration;
          await Promise.all([
            gsap.to(current.container, { autoAlpha: 0, y: reduce() ? 0 : T.leave.y, duration: d, ease: 'power2.in' }),
            gsap.to(persistent(), { autoAlpha: 0, duration: d, ease: 'power2.in' }),
          ]);
          destroyPage();
        },
        beforeEnter({ next }) {
          syncHead(next.html);
          updateCurrentLinks(next.url?.href || location.href);
          window.scrollTo(0, 0);
          lenis?.scrollTo(0, { immediate: true, force: true });
          gsap.set(next.container, { autoAlpha: 0, y: reduce() ? 0 : T.enter.y });
          initPage(next.container);
        },
        async enter({ next }) {
          lenis?.resize();
          ScrollTrigger.refresh();
          const d = reduce() ? 0 : T.enter.duration;
          await Promise.all([
            gsap.to(next.container, { autoAlpha: 1, y: 0, duration: d, ease: 'expo.out', clearProps: 'transform,opacity,visibility' }),
            gsap.to(persistent(), { autoAlpha: 1, duration: d, ease: 'power2.out', clearProps: 'opacity,visibility' }),
          ]);
        },
        after({ next }) {
          lenis?.start();
          navbar?.lock?.(false);
          reinitWebflow();
          ScrollTrigger.refresh();
          // Lien vers une ancre d'une autre page (/page#section)
          if (location.hash.length > 1) {
            const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
            if (target) window.DDS?.scrollTo?.(target, { immediate: true });
          }
          focusPage(next.container);
        },
      },
    ],
  });

  return barba;
}

// --- <head> : titre et métadonnées de la nouvelle page ---
const META = [
  'meta[name="description"]',
  'meta[property="og:title"]',
  'meta[property="og:description"]',
  'meta[property="og:image"]',
  'meta[property="og:url"]',
  'meta[name="twitter:title"]',
  'meta[name="twitter:description"]',
  'meta[name="twitter:image"]',
  'meta[name="robots"]',
  'link[rel="canonical"]',
];
function syncHead(html) {
  if (!html) return;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  document.title = doc.title;
  META.forEach((sel) => {
    const now = document.head.querySelector(sel);
    const next = doc.head.querySelector(sel);
    if (next && now) now.replaceWith(next.cloneNode(true));
    else if (next) document.head.append(next.cloneNode(true));
    else now?.remove();
  });
  // Identifiant de page Webflow (formulaires, interactions)
  const wfPage = doc.documentElement.getAttribute('data-wf-page');
  if (wfPage) document.documentElement.setAttribute('data-wf-page', wfPage);
  const lang = doc.documentElement.getAttribute('lang');
  if (lang) document.documentElement.setAttribute('lang', lang);
}

// --- Liens actifs des éléments persistants (navbar, footer) ---
function updateCurrentLinks(href) {
  const path = new URL(href, location.href).pathname.replace(/\/$/, '') || '/';
  $$('a[href]').forEach((a) => {
    if (a.closest(T.container)) return; // les liens du contenu viennent déjà à jour de Webflow
    let p;
    try {
      const u = new URL(a.getAttribute('href'), location.href);
      if (u.origin !== location.origin || (u.hash && u.pathname === location.pathname && a.getAttribute('href').startsWith('#'))) return;
      p = u.pathname.replace(/\/$/, '') || '/';
    } catch {
      return;
    }
    const on = p === path;
    a.classList.toggle('w--current', on);
    if (on) a.setAttribute('aria-current', 'page');
    else if (a.getAttribute('aria-current') === 'page') a.removeAttribute('aria-current');
  });
}

// --- Webflow (formulaires…) : réinitialisation après échange du contenu ---
function reinitWebflow() {
  const wf = window.Webflow;
  if (!wf) return;
  try {
    wf.destroy();
    wf.ready();
    wf.require?.('ix2')?.init();
  } catch (err) {
    console.warn('[DDS] Réinitialisation Webflow :', err);
  }
}

// --- Focus sur le titre de la nouvelle page (annonce aux lecteurs d'écran) ---
function focusPage(container) {
  const target = container.querySelector('h1') || container;
  const hadTabindex = target.hasAttribute('tabindex');
  if (!hadTabindex) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  if (!hadTabindex) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
}
