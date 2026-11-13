import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
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
const FULL_DEFAULT = BOARD + FRAME * 2;
const FULL = FULL_DEFAULT; // plateau provisoire
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
export const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  g.userData.mats = [top, side, cornerMat, studMat];
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

export function buildPieces(geos, { materials, scale = PIECE_SCALE, ornaments = true } = {}) {
  const mats = materials || {
    white: new THREE.MeshPhysicalMaterial({ color: COLORS.white, roughness: 0.5, clearcoat: 0.3, clearcoatRoughness: 0.4 }),
    black: new THREE.MeshPhysicalMaterial({ color: COLORS.black, roughness: 0.32, clearcoat: 0.6, clearcoatRoughness: 0.25 }),
  };
  const pieces = [];
  const make = (type, color, file, rank) => {
    const g = new THREE.Group();
    const mat = mats[color].clone(); // une matière par pièce : fondu d'apparition individuel (même shader)
    geos[type].forEach((part) => {
      const geometry = part.geometry || part;
      const m = new THREE.Mesh(geometry, mat);
      if (part.matrix) {
        m.matrixAutoUpdate = false;
        m.matrix.copy(part.matrix);
      }
      if (part.y) m.position.y = part.y;
      m.castShadow = true;
      m.receiveShadow = true;
      g.add(m);
    });
    if (ornaments) {
      const deco = decorate(type, mat);
      deco.traverse((o) => (o.castShadow = true));
      g.add(deco);
    }
    g.position.set(file - 3.5, 0, rank - 3.5);
    g.scale.setScalar(scale);
    if (type === 'knight') g.rotation.y = color === 'white' ? 0 : Math.PI;
    const height = geos[type].reduce((h, part) => Math.max(h, part.height || 0), 0) * scale || 1.6;
    g.userData = { type, color, file, rank, home: g.position.clone(), mat, baseScale: scale, height };
    pieces.push(g);
  };
  for (let f = 0; f < 8; f++) {
    make(BACK[f], 'white', f, 0);
    make('pawn', 'white', f, 1);
    make('pawn', 'black', f, 6);
    make(BACK[f], 'black', f, 7);
  }
  // Ordre d'arrivée : une vague qui balaie le plateau de gauche à droite, à l'écran
  const yaw = THREE.MathUtils.degToRad(WORLD_YAW);
  const screenX = (p) => p.position.x * Math.cos(yaw) + p.position.z * Math.sin(yaw);
  pieces.sort((a, b) => screenX(a) - screenX(b));
  return pieces;
}

// ---------- Courbes ----------
const clamp01 = (t) => Math.min(Math.max(t, 0), 1);
const easeOutCubic = (t) => 1 - (1 - t) ** 3;
const easeOutQuint = (t) => 1 - (1 - t) ** 5;
const easeOutQuart = (t) => 1 - (1 - t) ** 4;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// ---------- Modèles de l'atelier (glTF, compression meshopt) ----------
const MODELS = (() => {
  const src = document.currentScript?.src || document.querySelector('script[src*="hero-3d.min.js"]')?.src || '';
  return src ? src.replace(/dist\/[^/]*$/, 'models/') : '';
})();
export const MODEL_SCALE = 0.25; // modèles en centimètres : case de 4 cm → 1 unité
const PIECE_FILES = ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king'];

let gltfLoader = null;
const loadGltf = (file) => {
  gltfLoader ||= new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  return gltfLoader.loadAsync(MODELS + file);
};
const boardCache = new Map();
let piecesPromise = null;

/**
 * Plateau de l'atelier : mis à l'échelle, centré, dessus du damier en y = 0.
 * Le modèle chargé est mis en cache ; chaque appel renvoie une copie indépendante (géométries et
 * matières partagées). Un même objet ne peut appartenir qu'à une scène : sans copie, un visualiseur
 * qui finit de charger après une navigation « volait » le plateau du héros (pièces sans plateau).
 */
export function loadBoard(name) {
  return loadBoardSource(name).then((b) => {
    const board = b.board.clone();
    board.userData = { ...b.board.userData };
    return { ...b, board };
  });
}

function loadBoardSource(name) {
  if (!MODELS) return Promise.reject(new Error('dossier des modèles introuvable'));
  if (!boardCache.has(name)) {
    boardCache.set(
      name,
      loadGltf(`plateau-${name}.glb`).then((gltf) => {
        const board = new THREE.Group();
        const model = gltf.scene;
        model.scale.setScalar(MODEL_SCALE);
        board.add(model);
        model.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(model);
        const c = box.getCenter(new THREE.Vector3());
        model.position.x -= c.x;
        model.position.z -= c.z;
        model.updateMatrixWorld(true);
        const ray = new THREE.Raycaster(new THREE.Vector3(0.5, 50, 0.5), new THREE.Vector3(0, -1, 0));
        const hit = ray.intersectObject(model, true)[0];
        const top = hit ? hit.point.y : box.max.y;
        model.position.y -= top;
        const mats = [];
        model.traverse((o) => {
          if (!o.isMesh) return;
          o.castShadow = true;
          o.receiveShadow = true;
          [].concat(o.material).forEach((m) => !mats.includes(m) && mats.push(m));
        });
        board.userData.mats = mats;
        return { board, full: box.max.x - box.min.x, bottom: box.min.y - top, height: box.max.y - top };
      }),
    );
  }
  return boardCache.get(name);
}

/** Géométries des six pièces (base en y = 0, pivot centré) et matières ivoire / noir. */
export function loadPieces() {
  if (!MODELS) return Promise.reject(new Error('dossier des modèles introuvable'));
  piecesPromise ||= Promise.all(PIECE_FILES.map((t) => loadGltf(`piece-${t}.glb`))).then((pieceGltfs) => {
    const geos = {};
    pieceGltfs.forEach((g, i) => {
      let mesh = null;
      g.scene.traverse((o) => (o.isMesh && !mesh ? (mesh = o) : null));
      // Géométrie quantifiée gardée telle quelle (normales précalculées) : on reporte la matrice
      // du nœud et on recentre le pivot (base de la pièce en y = 0) sans toucher aux sommets.
      g.scene.updateMatrixWorld(true);
      const geometry = mesh.geometry;
      geometry.computeBoundingBox();
      const bb = geometry.boundingBox.clone().applyMatrix4(mesh.matrixWorld);
      const matrix = new THREE.Matrix4()
        .makeTranslation(-(bb.min.x + bb.max.x) / 2, -bb.min.y, -(bb.min.z + bb.max.z) / 2)
        .multiply(mesh.matrixWorld);
      geos[PIECE_FILES[i]] = [{ geometry, matrix, height: bb.max.y - bb.min.y }];
    });
    return { geos, materials: pieceMaterials() };
  });
  return piecesPromise;
}

export const pieceMaterials = () => ({
  white: new THREE.MeshPhysicalMaterial({ color: '#d9cfc2', roughness: 0.32, metalness: 0.02, clearcoat: 0.25, clearcoatRoughness: 0.3 }), // ivoire, pas blanc pur
  black: new THREE.MeshPhysicalMaterial({ color: '#0a0a0c', roughness: 0.2, metalness: 0.25, clearcoat: 0.6, clearcoatRoughness: 0.2 }),
});

async function loadReal() {
  if (!MODELS) return null;
  const [b, p] = await Promise.all([loadBoard('la-chute-des-anges'), loadPieces()]);
  return { ...b, ...p };
}

export async function mount(container) {
  if (!container || container.dataset.hero3d) return null;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    container.closest('.section_hero')?.classList.add('is-hero-in'); // pas de WebGL : le texte s'affiche
    return null;
  }
  container.dataset.hero3d = 'true';
  const section = container.closest('.section_hero') || container.parentElement;
  section.classList.add('has-hero-3d');

  const mobile = window.matchMedia('(max-width: 767px)').matches;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const EXPOSURE = 0.78;
  renderer.toneMappingExposure = EXPOSURE;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const canvas = renderer.domElement;
  canvas.className = 'hero_canvas';
  container.append(canvas);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.38;

  const camera = new THREE.PerspectiveCamera(24, 1, 0.1, 100);

  // Lumières : clé chaude en haut à gauche, contre-jour blanc discret (sans teinte violette)
  const key = new THREE.DirectionalLight('#ffeedd', 1.9);
  key.position.set(-6, 11, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048);
  Object.assign(key.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 1, far: 30 });
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  scene.add(key);
  const rim = new THREE.DirectionalLight('#ffffff', 0.7);
  rim.position.set(7, 4, -9);
  scene.add(rim);
  scene.add(new THREE.HemisphereLight('#c4c4c4', '#141414', 0.28));

  // Ombre portée du plateau sur un sol invisible
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: 0.35 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -THICK - 0.001;
  ground.receiveShadow = true;

  const world = new THREE.Group();
  let real = null;
  try {
    real = await loadReal();
  } catch (err) {
    console.warn('[DDS] Modèles 3D indisponibles, échiquier provisoire :', err);
  }
  let FULL = FULL_DEFAULT;
  let board;
  let pieces;
  if (real) {
    board = real.board;
    FULL = real.full;
    ground.position.y = real.bottom - 0.001;
    pieces = buildPieces(real.geos, { materials: real.materials, scale: MODEL_SCALE, ornaments: false });
  } else {
    board = buildBoard(Math.min(renderer.capabilities.maxTextureSize, mobile ? 1024 : 2048));
    pieces = buildPieces(createGeometries());
  }
  const boardMats = board.userData.mats;
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
    camera.zoom = 1;
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
    view.shift = shift;
    view.w = w;
    view.h = h;
    camera.setViewOffset(w, h, 0, shift, w, h);
    camera.updateProjectionMatrix();
  };
  fit();

  // ---------- Intro ----------
  // 1. la toile s'éclaire en fondu, le plateau monte à peine pendant que la caméra s'approche ;
  // 2. les pièces sont posées une à une, comme par la main d'un joueur : elles arrivent d'au-dessus,
  //    depuis le côté de leur camp, légèrement inclinées, ralentissent, se redressent et se posent
  //    avec un infime tassement ; leur ombre se resserre à l'approche du plateau ;
  //    ordre de mise en place : rois et dames d'abord, puis vers les tours, puis les pions ;
  // 3. puis le texte du héros apparaît (classes posées sur la section, transitions en CSS).
  const still = reduceMotion();
  const T = { board: 1.8, start: 1.05, file: 0.11, pawns: 0.5, piece: 1.05, camera: 3.6 };
  pieces.forEach((p) => {
    const u = p.userData;
    const fromCentre = Math.floor(Math.abs(u.file - 3.5)); // 0 (roi, dame) → 3 (tours)
    const pawn = u.type === 'pawn';
    const leftFirst = u.file < 4 ? 0 : 0.045; // les deux mains ne posent pas exactement en même temps
    u.t0 = T.start + (pawn ? T.pawns : 0) + fromCentre * T.file * (pawn ? 0.75 : 1) + leftFirst + (u.color === 'black' ? 0.07 : 0);
    u.side = u.color === 'white' ? -1 : 1; // côté du joueur (z) d'où vient la main
    u.baseQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), u.type === 'knight' && u.color === 'black' ? Math.PI : 0);
  });
  const introEnd = Math.max(...pieces.map((p) => p.userData.t0)) + T.piece;
  const TEXT_AT = T.start + T.pawns + 0.2;

  const halos = [];

  const X = new THREE.Vector3(1, 0, 0);
  const tiltQ = new THREE.Quaternion();
  let introDone = false;
  const LAND = 1; // la pièce arrive à vitesse nulle au moment du contact
  const pose = (t) => {
    pieces.forEach((p) => {
      const u = p.userData;
      const k = clamp01((t - u.t0) / T.piece);
      p.visible = k > 0;
      if (!p.visible) return;
      const a = clamp01(k / LAND); // trajet de la main
      const go = 1 - easeOutCubic(a); // 1 → 0, ralentit fort avant le contact
      const down = 1 - easeOutQuart(a);
      p.position.set(u.home.x, u.home.y + 1.35 * down, u.home.z + 0.7 * u.side * go);
      // inclinaison de la pièce tenue entre les doigts, qui se redresse avant de toucher
      tiltQ.setFromAxisAngle(X, 0.26 * u.side * go * go);
      p.quaternion.copy(tiltQ).multiply(u.baseQ);
      p.scale.setScalar(u.baseScale); // aucun rebond ni tassement : la pièce se pose, c'est tout
      // apparition en fondu bref, tant que la pièce est encore haute
      const o = easeOutCubic(clamp01(a / 0.3));
      const fading = o < 1;
      if (u.mat.transparent !== fading) {
        u.mat.transparent = fading;
        u.mat.needsUpdate = true;
      }
      u.mat.opacity = o;
    });
    if (!introDone && t >= introEnd) {
      introDone = true;
      halos.forEach((m) => world.remove(m));
      // Plus rien ne bouge dans la scène (seule la caméra se déplace) : l'ombre est figée
      renderer.shadowMap.autoUpdate = false;
      renderer.shadowMap.needsUpdate = true;
    }
  };

  let textShown = false;
  const showText = () => {
    if (textShown) return;
    textShown = true;
    section.classList.add('is-hero-in');
  };
  if (still) showText();

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
  const SPIN_MAX = 2.2; // rad/s, élan maximal après un lancer
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
    // Sensibilité modérée + élan lissé et plafonné : un geste vif fait tourner le plateau,
    // sans jamais le transformer en toupie.
    const k = 0.004;
    spin.yaw += dx * k;
    spin.tilt = THREE.MathUtils.clamp(spin.tilt + dy * 0.002, -0.15, 0.18);
    const inst = (dx * k) / Math.max((now - d.t) / 1000, 0.016);
    spin.v = THREE.MathUtils.clamp(spin.v * 0.6 + inst * 0.4, -SPIN_MAX, SPIN_MAX);
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

  // Résolution adaptative : si l'image n'arrive plus à suivre (machine modeste, écran très dense),
  // on baisse un peu la définition plutôt que de laisser l'animation saccader.
  const dpr = { max: Math.min(window.devicePixelRatio || 1, 1.5), cur: 0, avg: 1 / 60, n: 0, jank: [], raised: false };
  // L'intro démarre en définition prudente ; si tout est fluide ensuite, on remonte d'un cran (une fois)
  dpr.cur = Math.min(dpr.max, 1.25);
  renderer.setPixelRatio(dpr.cur);
  const lower = () => {
    dpr.raised = true; // on ne remonte plus après avoir dû baisser
    if (dpr.cur <= 1) return;
    dpr.cur = Math.max(1, Math.round((dpr.cur - 0.25) * 4) / 4);
    renderer.setPixelRatio(dpr.cur);
    fit();
    dpr.n = 0;
    dpr.jank.length = 0;
  };
  const adapt = (raw) => {
    if (raw > 1) return; // onglet repris : on ignore
    const now = performance.now();
    // À-coups répétés (images de plus de 50 ms) : 3 en moins de 3 s → on allège
    if (raw > 0.05) {
      dpr.jank.push(now);
      while (dpr.jank.length && now - dpr.jank[0] > 3000) dpr.jank.shift();
      if (dpr.jank.length >= 3) return lower();
    }
    dpr.avg += (Math.min(raw, 0.1) - dpr.avg) * 0.05;
    if (++dpr.n >= 90 && dpr.avg > 1 / 45) return lower(); // cadence moyenne sous 45 i/s
    if (introDone && !dpr.raised && dpr.cur < dpr.max && dpr.n >= 240 && dpr.avg < 1 / 57 && !dpr.jank.length) {
      dpr.raised = true;
      dpr.cur = Math.min(dpr.max, dpr.cur + 0.25);
      renderer.setPixelRatio(dpr.cur);
      fit();
      dpr.n = 0;
    }
  };

  const frame = () => {
    raf = 0;
    clock.update();
    const raw = clock.getDelta();
    // Pendant l'intro, un à-coup ponctuel ne fait pas sauter l'animation : le temps ralentit un instant
    const dt = Math.min(raw, introDone ? 0.1 : 1 / 30);
    adapt(raw);
    elapsed += dt;
    pose(still ? introEnd : elapsed);
    pointer.sx += (pointer.x - pointer.sx) * Math.min(dt * 3, 1);
    pointer.sy += (pointer.y - pointer.sy) * Math.min(dt * 3, 1);
    if (elapsed >= TEXT_AT) showText();
    const settle = still ? 1 : easeInOutCubic(clamp01(elapsed / T.camera));
    const idle = still ? 0 : Math.sin(Math.max(elapsed - T.camera, 0) * 0.45) * 0.03 * easeOutCubic(clamp01((elapsed - T.camera) / 2));
    // Lent mouvement de caméra en arc pendant l'entrée, qui se pose en douceur (pas de zoom)
    // Entrée du plateau : il monte depuis le bas du cadre en pivotant légèrement, sans fondu
    // ni changement de lumière ; il ralentit longuement avant de se poser à sa place.
    const enter = still ? 1 : easeOutQuint(clamp01(elapsed / T.board));
    camera.setViewOffset(view.w, view.h, 0, view.shift - (1 - enter) * view.h * 0.85, view.w, view.h);
    camera.updateProjectionMatrix();
    const az = view.azimuth + idle + pointer.sx * 0.06 * settle - 0.45 * (1 - enter);
    const el = view.elevation + pointer.sy * 0.025 * settle + 0.06 * (1 - enter);
    // Élan après un lancer, puis l'inclinaison revient doucement
    if (!spin.drag) {
      spin.yaw += spin.v * dt;
      spin.v *= Math.exp(-dt * 4.5);
      if (!spin.drag) spin.tilt *= Math.exp(-dt * 1.5);
    }
    // On tourne la caméra autour du plateau (et non le plateau) : la scène reste immobile et l'ombre n'est pas recalculée
    place(az - spin.yaw, el + spin.tilt);
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

  // Préchauffage, toile encore invisible : shaders compilés en parallèle (sans bloquer la page),
  // textures envoyées à la carte graphique, puis une image de rodage avec toutes les pièces visibles
  // (ombres comprises). L'intro démarre ensuite sans à-coup de compilation.
  canvas.style.opacity = '0';
  pose(introEnd - 0.001);
  halos.forEach((m) => ((m.visible = true), (m.material.opacity = 0.001)));
  place(view.azimuth, view.elevation);
  try {
    board.traverse((o) => o.isMesh && [].concat(o.material).forEach((m) => Object.values(m).forEach((v) => v?.isTexture && renderer.initTexture(v))));
    await renderer.compileAsync(scene, camera);
    // variante « en fondu » des matières des pièces, pour qu'aucun shader ne se compile pendant l'intro
    const pm = new Set(pieces.map((p) => p.userData.mat));
    pm.forEach((m) => ((m.transparent = true), (m.needsUpdate = true)));
    await renderer.compileAsync(scene, camera);
    renderer.render(scene, camera);
    pm.forEach((m) => ((m.transparent = false), (m.needsUpdate = true)));
  } catch {
    /* compilation à la volée au premier rendu */
  }
  renderer.render(scene, camera);
  halos.forEach((m) => (m.visible = false));
  introDone = false;
  renderer.shadowMap.autoUpdate = true;
  clock.update();
  elapsed = still ? introEnd : 0;
  requestAnimationFrame(() => {
    canvas.style.transition = 'none'; // pas de fondu : le plateau entre par le mouvement
    canvas.style.opacity = '1';
    frame();
    play();
  });

  return {
    scene,
    camera,
    renderer,
    pieces,
    // Positionne l'intro à un instant donné (contrôle visuel, tests)
    seek(t) {
      cancelAnimationFrame(raf);
      raf = 0;
      elapsed = t;
      clock.update();
      pose(t);
      renderer.render(scene, camera);
    },
    replay() {
      elapsed = 0;
      introDone = false;
      renderer.shadowMap.autoUpdate = true;
      halos.forEach((m) => world.add(m));
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
      renderer.forceContextLoss(); // libère le contexte WebGL (navigation sans rechargement)
      canvas.remove();
      section.classList.remove('has-hero-3d');
      delete container.dataset.hero3d;
    },
  };
}

// Démarrage (seulement si la page a un héros 3D) — rappelé après chaque transition de page
let heroGeneration = 0;
export async function bootHero() {
  const el = document.querySelector('[data-hero-viewer]');
  window.DDSHero3D ||= { mount, instance: null };
  if (!el || el.dataset.hero3d) return;
  const gen = heroGeneration;
  const api = await mount(el);
  if (api && (!el.isConnected || gen !== heroGeneration)) return api.destroy(); // page quittée pendant le chargement
  window.DDSHero3D.instance = api;
}
export function destroyHero() {
  heroGeneration++;
  window.DDSHero3D?.instance?.destroy();
  if (window.DDSHero3D) window.DDSHero3D.instance = null;
}
