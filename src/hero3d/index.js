import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createGeometries, decorate } from './pieces.js';

/**
 * Héros de l'accueil : échiquier 3D (Three.js) dont les pièces se posent une à une au chargement.
 *
 * Chargé à la demande par le bundle principal, uniquement si la page contient [data-hero-viewer].
 * Plateau et pièces sont provisoires (modélisés en code) : ils seront remplacés par les modèles
 * de l'atelier via window.DDSHero3D.useModels(...) ou en modifiant createGeometries().
 *
 * Accessibilité / performance :
 * - le canvas est décoratif (conteneur aria-hidden) ;
 * - « réduire les animations » : pas d'intro ni de mouvement, une seule image rendue ;
 * - rendu suspendu hors écran et quand l'onglet est caché ;
 * - sans WebGL, rien ne s'affiche et la page reste intacte.
 */

const BOARD = 8; // cases
const FRAME = 0.78; // largeur du cadre
const FULL = BOARD + FRAME * 2;
const THICK = 0.34;
const COLORS = {
  light: '#aeaba5',
  dark: '#323136',
  frame: '#2a292e',
  frameVein: '#55535b',
  line: '#d9d6cf',
  white: '#d6d3cb',
  black: '#17161a',
  stud: '#8a6a43',
};
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Textures procédurales (marbre léger) ----------
function marble(ctx, x, y, w, h, base, vein, density) {
  ctx.fillStyle = base;
  ctx.fillRect(x, y, w, h);
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.strokeStyle = vein;
  for (let i = 0; i < density; i++) {
    ctx.globalAlpha = 0.08 + Math.random() * 0.18;
    ctx.lineWidth = 0.6 + Math.random() * 2.2;
    ctx.beginPath();
    let px = x + Math.random() * w;
    let py = y + Math.random() * h;
    ctx.moveTo(px, py);
    for (let k = 0; k < 6; k++) {
      px += (Math.random() - 0.3) * w * 0.35;
      py += (Math.random() - 0.5) * h * 0.35;
      ctx.lineTo(px, py);
    }
    ctx.stroke();
  }
  ctx.restore();
  ctx.globalAlpha = 1;
}

function boardTexture(size) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const u = size / FULL;
  marble(ctx, 0, 0, size, size, COLORS.frame, COLORS.frameVein, 90);
  const o = FRAME * u;
  for (let r = 0; r < BOARD; r++) {
    for (let f = 0; f < BOARD; f++) {
      const light = (r + f) % 2 === 0;
      marble(ctx, o + f * u, o + r * u, u + 0.5, u + 0.5, light ? COLORS.light : COLORS.dark, light ? '#8f8b85' : '#77747e', 7);
    }
  }
  // Filet clair autour du damier
  ctx.strokeStyle = COLORS.line;
  ctx.lineWidth = Math.max(2, u * 0.035);
  ctx.strokeRect(o - u * 0.12, o - u * 0.12, BOARD * u + u * 0.24, BOARD * u + u * 0.24);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

// ---------- Scène ----------
function buildBoard(maxTex) {
  const g = new THREE.Group();
  const top = new THREE.MeshStandardMaterial({ map: boardTexture(maxTex), roughness: 0.55, metalness: 0.05 });
  const side = new THREE.MeshStandardMaterial({ color: COLORS.frame, roughness: 0.6 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(FULL, THICK, FULL), [side, side, top, side, side, side]);
  body.position.y = -THICK / 2;
  body.receiveShadow = true;
  body.castShadow = true;
  g.add(body);

  // Coins sombres et clous ornementaux
  const cornerMat = new THREE.MeshStandardMaterial({ color: '#0f0f12', roughness: 0.35, metalness: 0.2 });
  const studMat = new THREE.MeshStandardMaterial({ color: COLORS.stud, roughness: 0.3, metalness: 0.9 });
  const corner = new THREE.BoxGeometry(FRAME * 0.92, THICK + 0.05, FRAME * 0.92);
  const stud = new THREE.CylinderGeometry(0.06, 0.06, 0.03, 16);
  const h = FULL / 2 - FRAME * 0.46;
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => {
    const m = new THREE.Mesh(corner, cornerMat);
    m.position.set(sx * h, -THICK / 2 + 0.025, sz * h);
    m.castShadow = true;
    g.add(m);
  });
  const n = 14;
  for (let i = 0; i < n; i++) {
    const t = -BOARD / 2 + ((i + 0.5) / n) * BOARD;
    [[t, h], [t, -h], [h, t], [-h, t]].forEach(([x, z]) => {
      const m = new THREE.Mesh(stud, studMat);
      m.position.set(x, 0.015, z);
      g.add(m);
    });
  }
  return g;
}

const WORLD_YAW = 45;
const PIECE_SCALE = 1.32;
const BACK = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

function buildPieces(geos) {
  const mats = {
    white: new THREE.MeshPhysicalMaterial({ color: COLORS.white, roughness: 0.5, clearcoat: 0.3, clearcoatRoughness: 0.4 }),
    black: new THREE.MeshPhysicalMaterial({ color: COLORS.black, roughness: 0.32, clearcoat: 0.6, clearcoatRoughness: 0.25 }),
  };
  const pieces = [];
  const make = (type, color, file, rank) => {
    const g = new THREE.Group();
    geos[type].forEach((part) => {
      const geometry = part.geometry || part;
      const m = new THREE.Mesh(geometry, mats[color]);
      if (part.y) m.position.y = part.y;
      m.castShadow = true;
      m.receiveShadow = true;
      g.add(m);
    });
    const deco = decorate(type, mats[color]);
    deco.traverse((o) => (o.castShadow = true));
    g.add(deco);
    g.position.set(file - 3.5, 0, rank - 3.5);
    if (type === 'knight') g.rotation.y = color === 'white' ? 0 : Math.PI;
    g.userData = { type, color, file, rank, home: g.position.clone() };
    pieces.push(g);
  };
  for (let f = 0; f < 8; f++) {
    make(BACK[f], 'white', f, 0);
    make('pawn', 'white', f, 1);
    make('pawn', 'black', f, 6);
    make(BACK[f], 'black', f, 7);
  }
  // Ordre d'arrivée : pions en vague, puis tours → rois, en alternant les couleurs
  const rankOrder = { pawn: 0, rook: 1, knight: 2, bishop: 3, queen: 4, king: 5 };
  pieces.sort((a, b) => {
    const A = a.userData;
    const B = b.userData;
    return rankOrder[A.type] - rankOrder[B.type] || Math.abs(A.file - 3.5) - Math.abs(B.file - 3.5) || (A.color < B.color ? -1 : 1);
  });
  return pieces;
}

// ---------- Courbes ----------
const clamp01 = (t) => Math.min(Math.max(t, 0), 1);
const easeOutCubic = (t) => 1 - (1 - t) ** 3;
const easeOutQuint = (t) => 1 - (1 - t) ** 5;
const easeOutBack = (t, s = 1.6) => 1 + (s + 1) * (t - 1) ** 3 + s * (t - 1) ** 2;

export function mount(container) {
  if (!container || container.dataset.hero3d) return null;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    return null; // pas de WebGL : on laisse le héros tel quel
  }
  container.dataset.hero3d = 'true';
  const section = container.closest('.section_hero') || container.parentElement;
  section.classList.add('has-hero-3d');

  const mobile = window.matchMedia('(max-width: 767px)').matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const canvas = renderer.domElement;
  canvas.className = 'hero_canvas';
  container.append(canvas);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.55;

  const camera = new THREE.PerspectiveCamera(24, 1, 0.1, 100);

  // Lumières : clé chaude en haut à gauche, contre-jour lilas discret
  const key = new THREE.DirectionalLight('#fff4e8', 2.4);
  key.position.set(-6, 11, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048);
  Object.assign(key.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 1, far: 30 });
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  scene.add(key);
  const rim = new THREE.DirectionalLight('#c9a3ff', 0.9);
  rim.position.set(7, 4, -9);
  scene.add(rim);
  scene.add(new THREE.HemisphereLight('#bfbcc8', '#141217', 0.35));

  // Ombre portée du plateau sur un sol invisible
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: 0.35 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -THICK - 0.001;
  ground.receiveShadow = true;

  const world = new THREE.Group();
  const board = buildBoard(Math.min(renderer.capabilities.maxTextureSize, mobile ? 1024 : 2048));
  const pieces = buildPieces(createGeometries());
  world.add(ground, board, ...pieces);
  world.rotation.y = THREE.MathUtils.degToRad(WORLD_YAW); // blancs au fond à gauche, noirs devant à droite
  scene.add(world);

  // ---------- Cadrage (calé sur la maquette) ----------
  // Le plateau, coins compris, doit tenir dans une boîte exprimée en fractions du héros :
  // coin du fond vers 22 % de la hauteur, coin avant vers 88 %, toute la largeur au plus.
  const FRAME_BOX = mobile ? { top: 0.3, bottom: 0.74, maxW: 1.08 } : { top: 0.22, bottom: 0.88, maxW: 0.98 };
  const target = new THREE.Vector3(0, 0, 0);
  const view = { azimuth: 0, elevation: THREE.MathUtils.degToRad(31), dist: 20 };
  const place = (az, el) => {
    const d = view.dist;
    camera.position.set(Math.sin(az) * Math.cos(el) * d, Math.sin(el) * d + target.y, Math.cos(az) * Math.cos(el) * d);
    camera.lookAt(target);
  };
  const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([x, z]) => new THREE.Vector3((x * FULL) / 2, 0, (z * FULL) / 2));
  const project = () => {
    const rot = new THREE.Matrix4().makeRotationY(THREE.MathUtils.degToRad(WORLD_YAW));
    camera.updateMatrixWorld();
    const pts = corners.map((c) => c.clone().applyMatrix4(rot).project(camera));
    const xs = pts.map((p) => (p.x + 1) / 2);
    const ys = pts.map((p) => (1 - p.y) / 2);
    return { w: Math.max(...xs) - Math.min(...xs), top: Math.min(...ys), bottom: Math.max(...ys) };
  };
  const fit = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.clearViewOffset();
    camera.updateProjectionMatrix();
    const wantH = FRAME_BOX.bottom - FRAME_BOX.top;
    for (let i = 0; i < 5; i++) {
      place(view.azimuth, view.elevation);
      const b = project();
      view.dist *= Math.max(b.w / FRAME_BOX.maxW, (b.bottom - b.top) / wantH);
    }
    place(view.azimuth, view.elevation);
    const b = project();
    // Décale l'image (sans changer la perspective) pour poser le plateau à la bonne hauteur
    const shift = ((b.top + b.bottom) / 2 - (FRAME_BOX.top + FRAME_BOX.bottom) / 2) * h;
    camera.setViewOffset(w, h, 0, shift, w, h);
    camera.updateProjectionMatrix();
  };
  fit();

  // ---------- Intro : le plateau arrive, puis les pièces se posent une à une ----------
  const still = reduceMotion();
  const T = { board: 1.3, start: 0.85, stagger: 0.055, drop: 0.7 };
  const introEnd = T.start + pieces.length * T.stagger + T.drop + 0.2;
  pieces.forEach((p, i) => (p.userData.t0 = T.start + i * T.stagger));

  const pose = (t) => {
    const b = easeOutQuint(clamp01(t / T.board));
    board.position.y = -1.4 * (1 - b);
    board.rotation.y = 0.35 * (1 - b);
    ground.material.opacity = 0.35 * b;
    pieces.forEach((p) => {
      const k = clamp01((t - p.userData.t0) / T.drop);
      p.visible = k > 0;
      const fall = easeOutCubic(Math.min(k / 0.72, 1)); // chute
      const land = clamp01((k - 0.62) / 0.38); // petit tassement à l'atterrissage
      const squash = k < 0.62 ? 1 : 1 - 0.1 * Math.sin(land * Math.PI) * (1 - land * 0.4);
      p.position.y = p.userData.home.y + 2.6 * (1 - fall);
      p.scale.set(2 - squash, squash, 2 - squash).multiplyScalar(PIECE_SCALE * (0.92 + 0.08 * easeOutBack(Math.min(k * 1.4, 1))));
      p.rotation.x = 0;
    });
  };

  // ---------- Mouvement au repos + parallaxe souris ----------
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const onPointer = (e) => {
    const r = section.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
  };
  if (fine && !still) window.addEventListener('pointermove', onPointer, { passive: true });

  // ---------- Rotation du plateau au glisser (clic maintenu / doigt) ----------
  const spin = { yaw: 0, tilt: 0, v: 0, drag: null };
  const onDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    spin.drag = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), moved: false };
    spin.v = 0;
  };
  const onMove = (e) => {
    const d = spin.drag;
    if (!d || e.pointerId !== d.id) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 6 && e.pointerType !== 'mouse') {
        spin.drag = null; // geste vertical au doigt : la page défile
        return;
      }
      if (Math.hypot(dx, dy) < 3) return;
      d.moved = true;
      container.classList.add('is-dragging');
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        /* déjà relâché */
      }
    }
    const now = performance.now();
    const k = 0.0065;
    spin.yaw += dx * k;
    spin.tilt = THREE.MathUtils.clamp(spin.tilt + dy * 0.003, -0.18, 0.22);
    spin.v = (dx * k) / Math.max((now - d.t) / 1000, 0.008);
    d.x = e.clientX;
    d.y = e.clientY;
    d.t = now;
    play();
  };
  const onUp = () => {
    if (!spin.drag) return;
    if (performance.now() - spin.drag.t > 120 || still) spin.v = 0;
    spin.drag = null;
    container.classList.remove('is-dragging');
    play();
  };
  canvas.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onUp);

  let visible = true;
  let raf = 0;
  const clock = new THREE.Timer();
  let elapsed = still ? introEnd : 0;

  const frame = () => {
    raf = 0;
    clock.update();
    const dt = Math.min(clock.getDelta(), 0.1);
    elapsed += dt;
    pose(still ? introEnd : elapsed);
    pointer.sx += (pointer.x - pointer.sx) * Math.min(dt * 3, 1);
    pointer.sy += (pointer.y - pointer.sy) * Math.min(dt * 3, 1);
    const settle = easeOutCubic(clamp01((elapsed - T.start) / 2.5));
    const idle = still ? 0 : Math.sin(elapsed * 0.45) * 0.035 * settle;
    const az = view.azimuth + idle + pointer.sx * 0.07 * settle - 0.12 * (1 - settle);
    const el = view.elevation + pointer.sy * 0.03 * settle + 0.08 * (1 - settle);
    // Élan après un lancer, puis l'inclinaison revient doucement
    if (!spin.drag) {
      spin.yaw += spin.v * dt;
      spin.v *= Math.exp(-dt * 3.2);
      if (!spin.drag) spin.tilt *= Math.exp(-dt * 1.5);
    }
    world.rotation.y = THREE.MathUtils.degToRad(WORLD_YAW) + spin.yaw;
    place(az, el + spin.tilt);
    renderer.render(scene, camera);
    const moving = spin.drag || Math.abs(spin.v) > 0.002 || Math.abs(spin.tilt) > 0.002;
    if ((!still || moving) && visible && !document.hidden) raf = requestAnimationFrame(frame);
  };
  const play = () => {
    if (!raf && visible && !document.hidden) {
      clock.update();
      raf = requestAnimationFrame(frame);
    }
  };

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) play();
  });
  io.observe(section);
  document.addEventListener('visibilitychange', play);
  const ro = new ResizeObserver(() => {
    fit();
    if (still) frame();
  });
  ro.observe(container);

  canvas.style.opacity = '0';
  requestAnimationFrame(() => {
    canvas.style.opacity = '1';
    frame();
    play();
  });

  return {
    scene,
    camera,
    renderer,
    pieces,
    replay() {
      elapsed = 0;
      play();
    },
    destroy() {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      document.removeEventListener('visibilitychange', play);
      renderer.dispose();
      canvas.remove();
      section.classList.remove('has-hero-3d');
      delete container.dataset.hero3d;
    },
  };
}

// Démarrage automatique
const boot = () => {
  const el = document.querySelector('[data-hero-viewer]');
  const api = mount(el);
  window.DDSHero3D = { mount, instance: api };
};
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();
