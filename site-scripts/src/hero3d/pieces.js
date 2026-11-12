import * as THREE from 'three';

/**
 * Pièces provisoires, modélisées en code (profils tournés + tête de cavalier extrudée).
 * Elles seront remplacées par les modèles 3D de l'atelier (glTF) : il suffira de fournir
 * une géométrie par type, même échelle (1 unité = 1 case), base posée en y = 0.
 */

const SEG = 56;

/** Arc de cercle (centre cx, cy ; angles en degrés) pour les profils. */
function arc(cx, cy, r, a0, a1, n = 10) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const a = THREE.MathUtils.degToRad(a0 + ((a1 - a0) * i) / n);
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return pts;
}

function lathe(profile) {
  const pts = profile.map(([x, y]) => new THREE.Vector2(Math.max(x, 0.0001), y));
  const geo = new THREE.LatheGeometry(pts, SEG);
  geo.computeVertexNormals();
  return geo;
}

/** Socle commun : galette, moulures, départ du fût. */
function base(r = 0.34, top = 0.2) {
  return [
    [0, 0],
    [r, 0],
    [r + 0.01, 0.025],
    ...arc(r - 0.02, 0.06, 0.035, -30, 90, 6),
    [r - 0.05, 0.1],
    ...arc(r - 0.07, 0.13, 0.03, -90, 90, 6),
    [r - 0.11, top - 0.02],
    [r - 0.13, top],
  ];
}

function pawn() {
  return lathe([
    ...base(0.29, 0.17),
    [0.12, 0.3],
    [0.095, 0.42],
    ...arc(0.1, 0.45, 0.04, -90, 90, 6),
    [0.075, 0.5],
    ...arc(0, 0.6, 0.12, -60, 90, 14),
  ]);
}

function rook() {
  return lathe([
    ...base(0.33, 0.2),
    [0.17, 0.34],
    [0.15, 0.6],
    ...arc(0.18, 0.63, 0.03, -90, 90, 6),
    [0.22, 0.68],
    [0.235, 0.86],
    [0.17, 0.86],
    [0.17, 0.8],
    [0, 0.8],
  ]);
}

function bishop() {
  return lathe([
    ...base(0.32, 0.2),
    [0.15, 0.36],
    [0.1, 0.66],
    ...arc(0.14, 0.69, 0.035, -90, 90, 6),
    [0.09, 0.74],
    ...arc(0, 0.86, 0.14, -55, 50, 12),
    [0.04, 1.0],
    ...arc(0, 1.03, 0.04, -60, 90, 8),
  ]);
}

function queen() {
  return lathe([
    ...base(0.35, 0.22),
    [0.17, 0.4],
    [0.11, 0.82],
    ...arc(0.15, 0.85, 0.035, -90, 90, 6),
    [0.11, 0.9],
    [0.22, 1.06],
    [0.18, 1.08],
    ...arc(0, 1.08, 0.11, 0, 70, 8),
    ...arc(0, 1.2, 0.05, -70, 90, 8),
  ]);
}

function king() {
  return lathe([
    ...base(0.36, 0.22),
    [0.18, 0.42],
    [0.12, 0.88],
    ...arc(0.16, 0.91, 0.035, -90, 90, 6),
    [0.12, 0.96],
    [0.2, 1.1],
    [0.16, 1.14],
    [0.08, 1.16],
    [0, 1.17],
  ]);
}

/** Cavalier : socle tourné + tête en silhouette extrudée. */
function knightHead() {
  const s = new THREE.Shape();
  const p = [
    [-0.16, 0.0], [0.17, 0.0], [0.16, 0.18], [0.1, 0.34], [0.17, 0.44], [0.27, 0.48], [0.31, 0.53],
    [0.29, 0.58], [0.18, 0.6], [0.12, 0.68], [0.07, 0.76], [0.04, 0.73], [-0.02, 0.78], [-0.1, 0.72],
    [-0.17, 0.6], [-0.21, 0.42], [-0.21, 0.22],
  ];
  s.moveTo(...p[0]);
  p.slice(1).forEach((q) => s.lineTo(...q));
  s.closePath();
  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.22,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.035,
    bevelSegments: 4,
    curveSegments: 6,
  });
  geo.translate(0, 0, -0.11);
  geo.rotateY(-Math.PI / 2); // le museau regarde vers l'avant de la pièce (axe z)
  return geo;
}

export function createGeometries() {
  const knightBase = lathe([...base(0.33, 0.2), [0.17, 0.3], [0.17, 0.32], [0, 0.32]]);
  return {
    pawn: [pawn()],
    rook: [rook()],
    bishop: [bishop()],
    queen: [queen()],
    king: [king()],
    knight: [knightBase, { geometry: knightHead(), y: 0.27 }],
  };
}

/** Petits ornements : créneaux de la tour, couronne de la dame, croix du roi. */
export function decorate(type, mat) {
  const g = new THREE.Group();
  if (type === 'rook') {
    const geo = new THREE.BoxGeometry(0.09, 0.08, 0.07);
    for (let i = 0; i < 6; i++) {
      const m = new THREE.Mesh(geo, mat);
      const a = (i / 6) * Math.PI * 2;
      m.position.set(Math.cos(a) * 0.2, 0.9, Math.sin(a) * 0.2);
      m.rotation.y = -a;
      g.add(m);
    }
  }
  if (type === 'queen') {
    const geo = new THREE.SphereGeometry(0.028, 12, 8);
    for (let i = 0; i < 8; i++) {
      const m = new THREE.Mesh(geo, mat);
      const a = (i / 8) * Math.PI * 2;
      m.position.set(Math.cos(a) * 0.2, 1.08, Math.sin(a) * 0.2);
      g.add(m);
    }
  }
  if (type === 'king') {
    const v = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.2, 0.05), mat);
    v.position.y = 1.26;
    const h = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.05, 0.05), mat);
    h.position.y = 1.29;
    g.add(v, h);
  }
  return g;
}
