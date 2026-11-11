import { $, prefersReducedMotion } from '../core/env.js';

/**
 * Emblème de la navbar qui tourne sur lui-même au scroll (repris de l'ancien site damedetours.com).
 *
 * Une planche de 120 vues (10 × 12, tour complet en 3D) remplace le dessin de l'emblème dans le SVG
 * du logo ; l'anneau et le nom restent vectoriels. La vitesse de défilement donne de l'élan à la
 * rotation, qui ralentit d'elle-même puis revient de face (vue 0) ou de dos (vue 60).
 * Avec « réduire les animations », rien ne change : le logo vectoriel reste tel quel.
 */

const SPRITE = 'https://cdn.prod.website-files.com/6af31f817b16f50a57d74331/6af4520c7d140d5067cbc59c_logo-sprite-112-10x12.webp';
const COLS = 10;
const FRAMES = 120;
const CELL = 112; // px d'une vue dans la planche
const REST = [0, 60];
// Placement dans le viewBox du logo (194 × 34) : vue carrée centrée sur l'anneau (17, 17).
const VIEWBOX = { w: 194, h: 34 };
const BOX = { cx: 17, cy: 17, size: 33 };

const wrap = (f) => ((f % FRAMES) + FRAMES) % FRAMES;
const shortest = (from, to) => {
  let d = to - from;
  while (d > FRAMES / 2) d -= FRAMES;
  while (d < -FRAMES / 2) d += FRAMES;
  return d;
};

export function initLogoSpin() {
  if (prefersReducedMotion()) return null;
  const link = $('.navbar_logo-link');
  const svg = link && $('.navbar_logo', link);
  if (!svg || !svg.querySelector('g > path')) return null;

  const canvas = document.createElement('canvas');
  canvas.className = 'navbar_logo-spin';
  canvas.setAttribute('aria-hidden', 'true');
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const sprite = new Image();

  let frame = 0;
  let drawn = -1;
  let velocity = 0;
  let last = window.scrollY;
  let raf = 0;
  let prevT = 0;

  const layout = () => {
    const l = link.getBoundingClientRect();
    const s = svg.getBoundingClientRect();
    if (!s.width) return;
    const k = s.width / VIEWBOX.w;
    const size = BOX.size * k;
    canvas.style.left = `${s.left - l.left + (BOX.cx - BOX.size / 2) * k}px`;
    canvas.style.top = `${s.top - l.top + (BOX.cy - BOX.size / 2) * (s.height / VIEWBOX.h)}px`;
    canvas.style.width = canvas.style.height = `${size}px`;
    const px = Math.max(1, Math.round(size * Math.min(window.devicePixelRatio || 1, 3)));
    if (canvas.width !== px) {
      canvas.width = canvas.height = px;
      drawn = -1;
    }
    draw();
  };

  const draw = () => {
    const i = wrap(Math.round(frame));
    if (i === drawn) return;
    drawn = i;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(sprite, (i % COLS) * CELL, Math.floor(i / COLS) * CELL, CELL, CELL, 0, 0, canvas.width, canvas.height);
  };

  const tick = (t) => {
    const k = prevT ? Math.min((t - prevT) / (1000 / 60), 3) : 1;
    prevT = t;
    const y = window.scrollY;
    // Un saut brutal (ancre, changement de page) donne un élan plafonné, pas une toupie folle.
    const delta = Math.max(-400, Math.min(400, y - last));
    last = y;
    velocity = Math.max(-6, Math.min(6, velocity + delta * 0.008));
    frame += velocity * k;
    velocity *= Math.pow(0.92, k);
    if (Math.abs(velocity) < 0.01) velocity = 0;

    let settled = false;
    if (velocity === 0) {
      const current = wrap(frame);
      const d = REST.map((r) => shortest(current, r)).reduce((a, b) => (Math.abs(b) < Math.abs(a) ? b : a));
      if (Math.abs(d) < 0.3) {
        frame = current + d;
        settled = true;
      } else {
        frame += d * (1 - Math.pow(0.92, k));
      }
    }
    draw();
    raf = settled ? 0 : requestAnimationFrame(tick);
    if (settled) prevT = 0;
  };

  const wake = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  let ro = null;
  const start = () => {
    link.classList.add('is-spin');
    link.appendChild(canvas);
    layout();
    ro = new ResizeObserver(layout);
    ro.observe(svg);
    last = window.scrollY;
    window.addEventListener('scroll', wake, { passive: true });
  };

  // Pas de sprite.decode() : dans un onglet en arrière-plan, la promesse peut rester en attente indéfiniment.
  sprite.onload = () => !ro && start();
  // La planche n'est pas utile au premier affichage : on la charge une fois la page prête.
  const load = () => {
    sprite.src = SPRITE;
  };
  const idle = () => (window.requestIdleCallback ? requestIdleCallback(load, { timeout: 2500 }) : setTimeout(load, 600));
  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle, { once: true });

  return {
    destroy() {
      window.removeEventListener('scroll', wake);
      cancelAnimationFrame(raf);
      ro?.disconnect();
      canvas.remove();
      link.classList.remove('is-spin');
    },
  };
}
