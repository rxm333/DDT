import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { loadBoard, loadPieces, buildPieces, MODEL_SCALE, reduceMotion } from './index.js';

/**
 * Visualiseur 3D de la page collection ([data-model-viewer] + [data-viewer-stage]).
 *
 * - Plateau de l'atelier (La Chute des Anges, Blanc ou Noir) avec ses 32 pièces en place.
 * - Glisser (souris ou doigt) pour faire pivoter, flèches du clavier quand la scène a le focus,
 *   rotation lente au repos (désactivée si « réduire les animations »).
 * - Au doigt, un glissement vertical fait défiler la page : seule la rotation horizontale est captée.
 * - Les boutons de modèle (module model-viewer) émettent « dds:viewer-model » : on change de plateau
 *   en fondu (lumière qui baisse puis remonte), chaque plateau n'est chargé qu'une fois.
 * - L'image du modèle reste affichée tant que la 3D n'est pas prête, et sert de secours sans WebGL.
 * - Rendu uniquement quand quelque chose bouge, suspendu hors écran ou onglet caché.
 */

const BOARD_OF = { 'la-chute-des-anges': 'la-chute-des-anges', blanc: 'blanc', noir: 'noir' };
const EXPOSURE = 0.8;
const ELEVATION = THREE.MathUtils.degToRad(30);
const START_AZ = THREE.MathUtils.degToRad(45);

export async function mountViewer(viewer) {
  const stage = viewer.querySelector('[data-viewer-stage], .col-viewer_stage');
  if (!stage || viewer.dataset.viewer3d) return null;
  const image = stage.querySelector('[data-viewer-image], .col-viewer_image');
  const titleEl = viewer.querySelector('[data-viewer-title]');
  const firstBtn = viewer.querySelector('[data-viewer-model][aria-pressed="true"]') || viewer.querySelector('[data-viewer-model]');
  let current = firstBtn?.dataset.viewerModel || 'la-chute-des-anges';

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    return null; // pas de WebGL : l'image reste
  }
  viewer.dataset.viewer3d = 'loading';
  stage.classList.add('is-loading');

  const mobile = window.matchMedia('(max-width: 767px)').matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  const canvas = renderer.domElement;
  canvas.className = 'col-viewer_canvas';
  canvas.tabIndex = 0;
  canvas.setAttribute('role', 'img');
  const label = () =>
    canvas.setAttribute('aria-label', `Vue 3D de l'échiquier ${titleEl?.textContent.trim() || ''}. Faites glisser, ou utilisez les flèches du clavier, pour le faire pivoter.`);
  label();
  stage.append(canvas);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.4;
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 200);

  const key = new THREE.DirectionalLight('#ffeedd', 1.9);
  key.position.set(-6, 11, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048);
  Object.assign(key.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 1, far: 30 });
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  scene.add(key);
  const rim = new THREE.DirectionalLight('#c9a3ff', 0.7);
  rim.position.set(7, 4, -9);
  scene.add(rim);
  scene.add(new THREE.HemisphereLight('#bfbcc8', '#141217', 0.28));

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: 0.32 }));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Pièces (une seule fois) + premier plateau
  let active = null; // { board, full, bottom, height }
  let first;
  try {
    let set;
    [set, first] = await Promise.all([loadPieces(), loadBoard(BOARD_OF[current] || 'la-chute-des-anges')]);
    scene.add(...buildPieces(set.geos, { materials: set.materials, scale: MODEL_SCALE, ornaments: false }));
  } catch (err) {
    console.warn('[DDS] Visualiseur 3D indisponible :', err);
    canvas.remove();
    renderer.dispose();
    stage.classList.remove('is-loading');
    delete viewer.dataset.viewer3d;
    return null;
  }

  function setBoard(b) {
    if (active) scene.remove(active.board);
    active = b;
    scene.add(b.board);
    ground.position.y = b.bottom - 0.001;
    renderer.shadowMap.needsUpdate = true;
    fit();
  }

  // ---------- Caméra en orbite ----------
  const orbit = { az: START_AZ, el: ELEVATION, v: 0, dist: 20, target: new THREE.Vector3(0, 0.35, 0) };
  const fit = () => {
    const w = stage.clientWidth || 1;
    const h = stage.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // Sphère englobante du plateau et des pièces : tient dans l'image quel que soit l'angle
    const r = (active?.full || 10) * 0.62;
    const vfov = THREE.MathUtils.degToRad(camera.fov) / 2;
    const hfov = Math.atan(Math.tan(vfov) * camera.aspect);
    orbit.dist = Math.max((r / Math.sin(vfov)) * 0.84, (r / Math.sin(hfov)) * 0.98);
  };
  const place = () => {
    const { az, el, dist, target } = orbit;
    camera.position.set(target.x + Math.sin(az) * Math.cos(el) * dist, target.y + Math.sin(el) * dist, target.z + Math.cos(az) * Math.cos(el) * dist);
    camera.lookAt(target);
  };

  // ---------- Interaction ----------
  const still = reduceMotion();
  let lastInput = performance.now();
  let drag = null;
  const K = 0.0075;
  canvas.addEventListener('pointerdown', (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), moved: false, touch: e.pointerType !== 'mouse' };
    orbit.v = 0;
  });
  window.addEventListener(
    'pointermove',
    (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      if (!drag.moved) {
        if (drag.touch && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 6) return void (drag = null); // défilement vertical
        if (Math.hypot(dx, dy) < 3) return;
        drag.moved = true;
        stage.classList.add('is-dragging');
        try {
          canvas.setPointerCapture(e.pointerId);
        } catch {
          /* déjà relâché */
        }
      }
      const now = performance.now();
      orbit.az -= dx * K;
      if (!drag.touch) orbit.el = THREE.MathUtils.clamp(orbit.el + dy * 0.004, THREE.MathUtils.degToRad(12), THREE.MathUtils.degToRad(70));
      orbit.v = (-dx * K) / Math.max((now - drag.t) / 1000, 0.008);
      drag.x = e.clientX;
      drag.y = e.clientY;
      drag.t = now;
      lastInput = now;
      play();
    },
    { passive: true },
  );
  const up = () => {
    if (!drag) return;
    if (performance.now() - drag.t > 120 || still) orbit.v = 0;
    drag = null;
    stage.classList.remove('is-dragging');
    lastInput = performance.now();
    play();
  };
  window.addEventListener('pointerup', up);
  window.addEventListener('pointercancel', up);

  // Clavier : ← → pour pivoter, ↑ ↓ pour incliner, Début pour revenir à la vue de départ
  const aim = { az: null, el: null };
  canvas.addEventListener('keydown', (e) => {
    const step = THREE.MathUtils.degToRad(e.shiftKey ? 45 : 15);
    const base = { az: aim.az ?? orbit.az, el: aim.el ?? orbit.el };
    if (e.key === 'ArrowLeft') aim.az = base.az + step;
    else if (e.key === 'ArrowRight') aim.az = base.az - step;
    else if (e.key === 'ArrowUp') aim.el = THREE.MathUtils.clamp(base.el + step / 2, THREE.MathUtils.degToRad(12), THREE.MathUtils.degToRad(70));
    else if (e.key === 'ArrowDown') aim.el = THREE.MathUtils.clamp(base.el - step / 2, THREE.MathUtils.degToRad(12), THREE.MathUtils.degToRad(70));
    else if (e.key === 'Home') Object.assign(aim, { az: START_AZ + Math.round((orbit.az - START_AZ) / (Math.PI * 2)) * Math.PI * 2, el: ELEVATION });
    else return;
    e.preventDefault();
    orbit.v = 0;
    lastInput = performance.now();
    play();
  });

  // ---------- Changement de plateau ----------
  const fade = { from: 0, to: EXPOSURE, t0: performance.now(), dur: 0.7, then: null };
  const fadeTo = (to, dur, then) => Object.assign(fade, { from: renderer.toneMappingExposure, to, t0: performance.now(), dur, then });
  let pending = null;
  viewer.addEventListener('dds:viewer-model', async (e) => {
    const name = BOARD_OF[e.detail?.model];
    if (!name || name === current) return;
    current = name;
    label();
    const token = (pending = {});
    stage.classList.add('is-loading');
    const loading = loadBoard(name);
    fadeTo(0, 0.25, null);
    play();
    try {
      const b = await loading;
      if (token !== pending) return;
      const swap = () => {
        setBoard(b);
        stage.classList.remove('is-loading');
        fadeTo(EXPOSURE, 0.5, null);
      };
      if (fade.to === 0 && performance.now() - fade.t0 < fade.dur * 1000) fade.then = swap;
      else swap();
      play();
    } catch (err) {
      console.warn('[DDS] Plateau indisponible :', err);
      stage.classList.remove('is-loading');
      fadeTo(EXPOSURE, 0.3, null);
      play();
    }
  });

  // ---------- Boucle (à la demande) ----------
  let raf = 0;
  let visible = true;
  let last = performance.now();
  const frame = (now) => {
    raf = 0;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    let busy = false;

    // fondu de lumière
    const k = Math.min((now - fade.t0) / 1000 / fade.dur, 1);
    renderer.toneMappingExposure = fade.from + (fade.to - fade.from) * (1 - (1 - k) ** 3);
    if (k < 1) busy = true;
    else if (fade.then) {
      const then = fade.then;
      fade.then = null;
      then();
      busy = true;
    }

    // élan après un lancer, cibles clavier, rotation au repos
    if (!drag) {
      if (Math.abs(orbit.v) > 0.002) {
        orbit.az += orbit.v * dt;
        orbit.v *= Math.exp(-dt * 3.2);
        busy = true;
      }
      const ease = 1 - Math.exp(-dt * 8);
      if (aim.az !== null) {
        orbit.az += (aim.az - orbit.az) * ease;
        if (Math.abs(aim.az - orbit.az) < 0.001) aim.az = null;
        busy = true;
      }
      if (aim.el !== null) {
        orbit.el += (aim.el - orbit.el) * ease;
        if (Math.abs(aim.el - orbit.el) < 0.001) aim.el = null;
        busy = true;
      }
      if (!still && now - lastInput > 2500 && document.activeElement !== canvas) {
        orbit.az += dt * THREE.MathUtils.degToRad(5) * Math.min((now - lastInput - 2500) / 1500, 1);
        busy = true;
      }
    } else busy = true;

    place();
    renderer.render(scene, camera);
    if (busy && visible && !document.hidden) raf = requestAnimationFrame(frame);
  };
  const play = () => {
    if (!raf && visible && !document.hidden) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  };

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) play();
  });
  io.observe(stage);
  document.addEventListener('visibilitychange', play);
  const ro = new ResizeObserver(() => {
    fit();
    play();
  });
  ro.observe(stage);

  // Préchauffage (shaders, textures, ombre), puis apparition
  setBoard(first);
  place();
  try {
    await renderer.compileAsync(scene, camera);
  } catch {
    /* compilation au premier rendu */
  }
  renderer.shadowMap.needsUpdate = true;
  renderer.render(scene, camera);
  viewer.dataset.viewer3d = 'ready';
  viewer.classList.add('is-3d');
  stage.classList.remove('is-loading');
  stage.classList.add('is-ready');
  if (image) image.setAttribute('aria-hidden', 'true'); // la scène 3D porte désormais la description
  fadeTo(EXPOSURE, still ? 0.01 : 0.9, null);
  lastInput = performance.now();
  play();

  return { scene, camera, renderer, get model() { return current; } };
}

export function bootViewers() {
  const viewers = [...document.querySelectorAll('[data-model-viewer]')].filter((v) => v.querySelector('[data-viewer-stage], .col-viewer_stage'));
  if (!viewers.length) return;
  window.DDSViewer3D = { instances: [] };
  viewers.forEach((v) => {
    // Démarre quand le visualiseur approche de l'écran
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const api = await mountViewer(v);
        if (api) window.DDSViewer3D.instances.push(api);
      },
      { rootMargin: '300px' },
    );
    io.observe(v);
  });
}
