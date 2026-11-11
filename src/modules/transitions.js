import barba from '@barba/core';
import { gsap, ScrollTrigger } from '../core/gsap.js';
import { $, $$, prefersReducedMotion } from '../core/env.js';
import { TRANSITIONS as T } from '../config.js';

/**
 * Transitions de page avec Barba : seul le contenu (<main data-barba="container">) change.
 * La navbar, hors du conteneur, ne bouge jamais : un rideau plein écran passe sous elle.
 *
 * À chaque navigation :
 *  - sortie : le rideau monte et recouvre la page (titre du lien au centre), le contenu recule ;
 *  - échange : <title>, métadonnées SEO, data-wf-page, liens actifs (navbar + footer), retour en haut ;
 *  - entrée : les modules sont réinitialisés, le rideau se retire vers le haut, le contenu remonte ;
 *  - accessibilité : le focus est placé sur le titre principal (annoncé par les lecteurs d'écran) ;
 *  - Webflow (formulaires…) est réinitialisé.
 * Sans conteneur Barba sur la page, ou en cas d'erreur, la navigation reste classique.
 */
export function initTransitions({ lenis, navbar, destroyPage, initPage }) {
  if (!$(T.wrapper) || !$(T.container)) return null;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  const reduce = () => prefersReducedMotion();
  const curtain = createCurtain();
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
        name: 'dds-curtain',
        async leave({ current, trigger }) {
          navbar?.close?.();
          navbar?.lock?.(true);
          lenis?.stop();
          const label =
            trigger && typeof trigger === 'object'
              ? (trigger.getAttribute('aria-label') || trigger.querySelector('.dds-sr')?.textContent || trigger.textContent || '').replace(/\s+/g, ' ').trim()
              : '';
          if (reduce()) {
            await gsap.to(current.container, { autoAlpha: 0, duration: 0.2 });
            gsap.set(persistent(), { autoAlpha: 0 });
            return destroyPage();
          }
          curtain.label.textContent = label.length > 2 && label.length < 40 ? label : '';
          const C = T.curtain;
          const tl = gsap.timeline();
          tl.set(curtain.el, { yPercent: 101, autoAlpha: 1 })
            .set(curtain.label, { autoAlpha: 0, yPercent: 40 })
            .set(curtain.line, { scaleX: 0 })
            .to(curtain.el, { yPercent: 0, duration: C.cover, ease: 'power4.inOut' }, 0)
            .to(current.container, { y: -C.contentShift, scale: 0.985, autoAlpha: 0.35, duration: C.cover, ease: 'power3.in' }, 0)
            .to(curtain.label, { autoAlpha: 1, yPercent: 0, duration: 0.5, ease: 'expo.out' }, C.cover * 0.6)
            .to(curtain.line, { scaleX: 1, duration: 0.6, ease: 'expo.out' }, C.cover * 0.65);
          await tl;
          gsap.set(persistent(), { autoAlpha: 0 });
          destroyPage();
        },
        beforeEnter({ next }) {
          syncHead(next.html);
          updateCurrentLinks(next.url?.href || location.href);
          window.scrollTo(0, 0);
          lenis?.scrollTo(0, { immediate: true, force: true });
          if (!reduce()) gsap.set(next.container, { y: T.curtain.contentShift * 1.2 });
          else gsap.set(next.container, { autoAlpha: 0 });
          initPage(next.container);
        },
        async enter({ next }) {
          lenis?.resize();
          ScrollTrigger.refresh();
          gsap.set(persistent(), { autoAlpha: 1, clearProps: 'opacity,visibility' });
          if (reduce()) {
            await gsap.to(next.container, { autoAlpha: 1, duration: 0.25, clearProps: 'opacity,visibility' });
            return;
          }
          const C = T.curtain;
          const tl = gsap.timeline();
          tl.to([curtain.label, curtain.line], { autoAlpha: 0, yPercent: -30, duration: 0.35, ease: 'power2.in' }, 0)
            .to(curtain.el, { yPercent: -101, duration: C.reveal, ease: 'power4.inOut' }, 0.15)
            .to(next.container, { y: 0, duration: C.reveal + 0.35, ease: 'expo.out', clearProps: 'transform' }, 0.3)
            .set(curtain.el, { autoAlpha: 0, yPercent: 101 });
          await tl;
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

// --- Rideau de transition (hors du conteneur, sous la navbar) ---
function createCurtain() {
  const el = document.createElement('div');
  el.className = 'dds-curtain';
  el.setAttribute('aria-hidden', 'true');
  const label = document.createElement('span');
  label.className = 'dds-curtain__label';
  const line = document.createElement('span');
  line.className = 'dds-curtain__line';
  el.append(label, line);
  document.body.append(el);
  gsap.set(el, { yPercent: 101 }); // position gérée uniquement par GSAP
  return { el, label, line };
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
    const raw = a.getAttribute('href');
    if (!raw || raw.startsWith('#') || /^(mailto|tel|javascript):/i.test(raw)) return;
    let p;
    try {
      const u = new URL(raw, location.href);
      if (u.origin !== location.origin) return;
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
