/**
 * Vidéos du site.
 * - [data-loop-video] : vidéo d'ambiance muette, en boucle. La source n'est chargée qu'à l'approche de
 *   l'écran ; lecture seulement quand elle est visible. Deux formats possibles : data-src (unique) ou
 *   data-src-wide / data-src-tall (16/9 sur grand écran, verticale sur téléphone).
 *   « Réduire les animations » activé : pas de lecture automatique, un bouton Lecture est proposé.
 * - [data-video-sound] (dans le même [data-video]) : active / coupe le son de cette vidéo.
 * - [data-film-open] avec data-film-src : ouvre le film en grand, avec le son et les commandes.
 */
import { stopScroll, startScroll } from './smooth-scroll.js';

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const tall = () => window.matchMedia('(max-width: 767px)').matches;
const pick = (v) => v.dataset.src || (tall() ? v.dataset.srcTall : v.dataset.srcWide) || v.dataset.srcWide || v.dataset.srcTall;
const posterOf = (v) => (tall() ? v.dataset.posterTall : v.dataset.posterWide) || v.getAttribute('poster');

function setSource(v) {
  const src = pick(v);
  if (!src || v.dataset.current === src) return;
  const time = v.currentTime || 0;
  v.dataset.current = src;
  const poster = posterOf(v);
  if (poster) v.poster = poster;
  v.src = src;
  v.load();
  if (time) v.addEventListener('loadedmetadata', () => { v.currentTime = Math.min(time, v.duration || time); }, { once: true });
}

const label = (btn, muted) => {
  btn.setAttribute('aria-pressed', String(!muted));
  btn.setAttribute('aria-label', muted ? 'Activer le son' : 'Couper le son');
  btn.classList.toggle('is-on', !muted);
};

export function initVideos(root = document) {
  const cleanups = [];
  const videos = [...root.querySelectorAll('video[data-loop-video]')];
  if (videos.length) {
    const visible = new Set();
    const play = (v) => {
      if (reduce() && !v.dataset.userPlay) return;
      const p = v.play();
      if (p) p.catch(() => v.closest('[data-video]')?.classList.add('is-paused'));
    };
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) { setSource(v); visible.add(v); play(v); }
      else { visible.delete(v); v.pause(); }
    }), { rootMargin: '200px 0px' });
    videos.forEach((v) => {
      v.muted = true; v.loop = true; v.playsInline = true;
      v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
      const poster = posterOf(v);
      if (poster) v.poster = poster;
      io.observe(v);
      const box = v.closest('[data-video]');
      v.addEventListener('playing', () => { box?.classList.remove('is-paused'); box?.classList.add('is-playing'); });
      v.addEventListener('pause', () => { box?.classList.add('is-paused'); box?.classList.remove('is-playing'); });
      if (reduce()) box?.classList.add('is-paused');
    });
    const mq = window.matchMedia('(max-width: 767px)');
    const swap = () => videos.forEach((v) => { if (v.dataset.current && !v.dataset.src) { setSource(v); if (visible.has(v)) play(v); } });
    mq.addEventListener('change', swap);
    const onVis = () => videos.forEach((v) => (document.hidden ? v.pause() : visible.has(v) && play(v)));
    document.addEventListener('visibilitychange', onVis);
    cleanups.push(() => { io.disconnect(); mq.removeEventListener('change', swap); document.removeEventListener('visibilitychange', onVis); videos.forEach((v) => v.pause()); });

    root.querySelectorAll('[data-video]').forEach((box) => {
      const v = box.querySelector('video[data-loop-video]');
      if (!v) return;
      const sound = box.querySelector('[data-video-sound]');
      if (sound) {
        label(sound, true);
        sound.addEventListener('click', () => {
          v.muted = !v.muted;
          if (!v.muted) { v.dataset.userPlay = '1'; if (v.paused) play(v); }
          label(sound, v.muted);
        });
        v.addEventListener('volumechange', () => label(sound, v.muted));
      }
      const toggle = box.querySelector('[data-video-play]');
      if (toggle) toggle.addEventListener('click', () => { v.dataset.userPlay = '1'; setSource(v); if (v.paused) play(v); else v.pause(); });
    });
  }

  root.querySelectorAll('[data-film-open][data-film-src]').forEach((btn) => {
    const open = () => openFilm(btn.dataset.filmSrc, btn.dataset.filmTitle || btn.textContent.trim(), btn, btn.dataset.filmPoster);
    btn.addEventListener('click', open);
    cleanups.push(() => btn.removeEventListener('click', open));
  });
  return { destroy: () => { cleanups.splice(0).forEach((fn) => fn()); closeFilm(); } };
}

// --- Film en grand (une seule <dialog> pour tout le site) ---
let dialog;
let trigger = null;
function build() {
  dialog = document.createElement('dialog');
  dialog.className = 'dds-film';
  dialog.innerHTML = `
    <div class="dds-film_frame"><video class="dds-film_video" controls playsinline preload="auto"></video></div>
    <button type="button" class="dds-film_close" aria-label="Fermer le film"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9"/></svg></button>`;
  document.body.append(dialog);
  dialog.querySelector('.dds-film_close').addEventListener('click', () => closeFilm());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) closeFilm(); });
  dialog.addEventListener('close', () => {
    const v = dialog.querySelector('video');
    v.pause();
    document.documentElement.classList.remove('dds-film-open');
    startScroll();
    trigger?.focus?.({ preventScroll: true });
    trigger = null;
  });
}

export function openFilm(src, title, from, poster) {
  if (!dialog) build();
  trigger = from || document.activeElement;
  const v = dialog.querySelector('video');
  dialog.setAttribute('aria-label', title || 'Film');
  if (poster) v.poster = poster;
  if (v.getAttribute('src') !== src) v.src = src;
  else v.currentTime = 0;
  document.documentElement.classList.add('dds-film-open');
  stopScroll();
  dialog.showModal();
  v.focus({ preventScroll: true });
  const p = v.play();
  if (p) p.catch(() => {});
}

export function closeFilm() {
  if (dialog?.open) dialog.close();
}
