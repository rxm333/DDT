import { gsap } from '../core/gsap.js';
import { $, $$, prefersReducedMotion } from '../core/env.js';
import { SELECTORS, MARQUEE } from '../config.js';

/**
 * Marquee de l'atelier, pilotable à la souris et au doigt.
 *
 * - Défile tout seul, en boucle infinie (les listes sont dupliquées pour couvrir l'écran).
 * - On l'attrape et on le fait glisser dans les deux sens ; au lâcher, il garde l'élan,
 *   puis reprend sa vitesse de croisière dans le sens du dernier geste.
 * - Le scroll de la page (Lenis) l'accélère un peu.
 * - Le bouton « Mettre en pause » arrête le défilement automatique (WCAG 2.2.2) ;
 *   le glisser reste possible. Hors écran, rien ne tourne.
 * - Mouvement réduit : pas de JS, la bande devient un simple défilement horizontal natif (CSS).
 */
export function initMarquee({ lenis } = {}) {
  const sections = $$(SELECTORS.marquee.section);
  if (!sections.length || prefersReducedMotion()) return null;
  return sections.map((section) => create(section, lenis)).filter(Boolean);
}

function create(section, lenis) {
  const track = $(SELECTORS.marquee.track, section);
  const source = track && $(SELECTORS.marquee.list, track);
  if (!track || !source) return null;

  track.classList.add('is-draggable');
  $$('img', track).forEach((img) => (img.draggable = false));

  // Copies décoratives : assez pour couvrir l'écran + une longueur de liste
  const lists = () => $$(SELECTORS.marquee.list, track);
  const fill = () => {
    const needed = Math.ceil((track.clientWidth * 2) / Math.max(source.offsetWidth, 1)) + 1;
    while (lists().length < needed) {
      const clone = source.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.removeAttribute('aria-label');
      $$('img', clone).forEach((img) => {
        img.alt = '';
        img.draggable = false;
      });
      track.append(clone);
    }
  };

  let period = 0; // distance entre le début de deux listes (largeur + espacement)
  const measure = () => {
    fill();
    const [a, b] = lists();
    period = b ? b.offsetLeft - a.offsetLeft : a.offsetWidth;
  };
  measure();

  const pause = $(SELECTORS.marquee.pause, section);
  const cruise = () => (period / MARQUEE.duration) * (pause?.checked ? 0 : 1); // px/s

  const state = { x: 0, v: -cruise(), dir: -1, boost: 0 };
  let visible = true;
  let drag = null;

  const render = () => {
    if (!period) return;
    state.x = gsap.utils.wrap(-period, 0, state.x);
    const t = `translate3d(${state.x}px, 0, 0)`;
    lists().forEach((l) => (l.style.transform = t));
  };

  const tick = (_, deltaMs) => {
    if (!visible || drag) return;
    const dt = Math.min(deltaMs, 64) / 1000;
    const target = state.dir * (cruise() + state.boost);
    // L'élan du lâcher retombe doucement vers la vitesse de croisière
    state.v += (target - state.v) * (1 - Math.exp(-dt * MARQUEE.friction));
    state.x += state.v * dt;
    render();
  };
  gsap.ticker.add(tick);

  // ---------- Glisser ----------
  const onDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, last: e.clientX, t: performance.now(), v: 0, moved: false };
  };
  const onMove = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.last;
    if (!drag.moved) {
      // Geste plutôt vertical sur écran tactile : on laisse la page défiler
      if (Math.abs(e.clientY - drag.y) > Math.abs(e.clientX - drag.x) && Math.abs(e.clientY - drag.y) > 6) {
        drag = null;
        return;
      }
      if (Math.abs(e.clientX - drag.x) < 4) return;
      drag.moved = true;
      track.classList.add('is-dragging');
      try {
        track.setPointerCapture(e.pointerId);
      } catch {
        /* pointeur déjà relâché */
      }
    }
    const now = performance.now();
    const dt = Math.max(now - drag.t, 1) / 1000;
    drag.v = drag.v * 0.6 + (dx / dt) * 0.4; // vitesse lissée, px/s
    drag.last = e.clientX;
    drag.t = now;
    state.x += dx;
    render();
  };
  const onUp = (e) => {
    if (!drag || (e.pointerId !== undefined && e.pointerId !== drag.id)) return;
    if (drag.moved) {
      // Le dernier geste décide du sens ; l'élan est plafonné pour rester lisible
      const v = performance.now() - drag.t > 120 ? 0 : drag.v;
      if (Math.abs(v) > 30) state.dir = Math.sign(v);
      state.v = gsap.utils.clamp(-MARQUEE.maxFling, MARQUEE.maxFling, v);
    }
    track.classList.remove('is-dragging');
    drag = null;
  };
  track.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onUp);

  // ---------- Scroll de la page : petite accélération ----------
  if (lenis && MARQUEE.velocityBoost) {
    lenis.on('scroll', ({ velocity }) => {
      if (!visible) return;
      const boost = Math.min(Math.abs(velocity) * MARQUEE.boostFactor, cruise() * MARQUEE.maxBoost);
      gsap.to(state, { boost, duration: 0.25, ease: 'power2.out', overwrite: true });
      gsap.to(state, { boost: 0, duration: 1.2, ease: 'power3.out', delay: 0.25 });
    });
  }

  // ---------- Hors écran / redimensionnement ----------
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        visible = entry.isIntersecting;
        section.classList.toggle('is-offscreen', !visible);
      }),
    { rootMargin: '100px 0px' }
  );
  io.observe(section);

  const ro = new ResizeObserver(() => {
    measure();
    render();
  });
  ro.observe(track);
  // Les images en lazy-load changent les largeurs
  $$('img', source).forEach((img) => img.complete || img.addEventListener('load', measure, { once: true }));

  render();

  return {
    state,
    destroy() {
      gsap.ticker.remove(tick);
      io.disconnect();
      ro.disconnect();
      track.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      track.classList.remove('is-draggable', 'is-dragging');
      lists().forEach((l) => (l.style.transform = ''));
    },
  };
}
