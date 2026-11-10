/** Helpers d'environnement partagés. */

export const MQ = {
  motionOK: '(prefers-reduced-motion: no-preference)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
  finePointer: '(hover: hover) and (pointer: fine)',
};

const mqlCache = new Map();
const mql = (query) => {
  if (!mqlCache.has(query)) mqlCache.set(query, window.matchMedia(query));
  return mqlCache.get(query);
};

export const prefersReducedMotion = () => mql(MQ.reducedMotion).matches;
export const hasFinePointer = () => mql(MQ.finePointer).matches;

export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

/** true si l'élément est (au moins en partie) dans le viewport au moment de l'appel. */
export const isInViewport = (el, margin = 0) => {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight - margin && r.bottom > 0;
};
