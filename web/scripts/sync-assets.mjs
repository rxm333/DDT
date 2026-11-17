// Copie les scripts du site (site-scripts/dist), les modèles 3D et les polices dans public/site-scripts/.
// Ils sont servis par le site lui-même : plus de lien jsDelivr figé sur un commit à mettre à jour à la main.
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const from = fileURLToPath(new URL('../../site-scripts/', import.meta.url));
const to = fileURLToPath(new URL('../public/site-scripts/', import.meta.url));
rmSync(to, { recursive: true, force: true });
mkdirSync(to, { recursive: true });
for (const dir of ['dist', 'models', 'fonts', 'assets']) {
  if (!existsSync(from + dir)) throw new Error(`site-scripts/${dir} introuvable : lancer « npm run build » dans site-scripts`);
  cpSync(from + dir, to + dir, { recursive: true, filter: (p) => !p.endsWith('.map') });
}
console.log('site-scripts copiés dans public/site-scripts/');
