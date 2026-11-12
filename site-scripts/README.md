# Dame de Tours — scripts du site (JS & CSS externes)

Scripts du site Webflow **Dame de Tours**, hébergés hors de Webflow (GitHub + jsDelivr).
Aucune interaction Webflow ni webflow.js n'est utilisée pour les animations.

| Fichier | Poids | gzip |
|---|---|---|
| `dist/dame-de-tours.min.js` | 207 Ko | ~75 Ko |
| `dist/dame-de-tours.min.css` | 32 Ko | ~7 Ko |
| `dist/hero-3d.min.js` (chargé à la demande) | 703 Ko | ~181 Ko |

Stack : **Lenis 1.3** (smooth scroll) + **GSAP 3.15** (core, ScrollTrigger, SplitText — gratuits), build **Vite 8**.

---

## Ce que fait le script

| Module | Rôle |
|---|---|
| `smooth-scroll` | Lenis piloté par le ticker GSAP (une seule boucle rAF, synchro ScrollTrigger). Scroll tactile natif. Ancres internes avec décalage sous la navbar + déplacement du focus. Désactivé si « réduire les animations ». |
| `navbar` | Ouverture du menu vers le bas (hauteur 0 → auto), burger → croix, liens en cascade. Fermeture : Échap (focus rendu au bouton), clic extérieur, sortie du focus, clic sur un lien. Mise à jour de `aria-expanded` / `aria-label`. Masquage au scroll vers le bas, retour au scroll vers le haut ou au focus clavier. |
| `hover` | « Texte qui roule » sur `.product-card_button` et `.navbar_link` (markup préparé en JS, transition 100 % CSS). Boutons magnétiques sur `.navbar_button` (souris uniquement). |
| `reveal` | Titres découpés en lignes masquées (SplitText), montée + fondu des blocs, cartes produit en cascade, parallaxe du wordmark du footer. Les éléments visibles au chargement ne sont jamais masqués. |
| `marquee` | Pause du défilement de l'atelier hors écran + accélération douce selon la vitesse de scroll (`playbackRate` des animations CSS). |
| `main.css` | Styles Lenis, soulignements animés des liens, survol complet de la carte produit (état « Survol » de Figma), zoom image, transitions des boutons. |

### Performance
- Animations limitées à `transform` / `opacity` (pas de reflow), survols en CSS pur.
- Une seule boucle `requestAnimationFrame` (ticker GSAP) pour Lenis, ScrollTrigger et les tweens.
- Écouteurs `passive`, écouteurs du menu attachés seulement quand il est ouvert.
- `IntersectionObserver` pour couper le marquee hors écran.
- `gsap.matchMedia()` : tout s'annule proprement si la préférence d'animation change.

### Accessibilité
- `prefers-reduced-motion: reduce` → scroll natif, menu instantané, aucune apparition, aucune transition décorative.
- La copie du texte qui roule est ignorée par les lecteurs d'écran (`content: … / ""`).
- SplitText ajoute automatiquement `aria-label` sur le titre et masque les lignes découpées.

---

## Installation & build

```bash
npm install
npm run build   # → dist/
npm test        # test de fumée (jsdom) : init, navbar, aria, Échap, focus, ancres
npm run dev     # rebuild automatique à chaque modification
```

## Hébergement (GitHub + jsDelivr)

Ce dossier fait partie du monorepo https://github.com/rxm333/DDT (voir le README à la racine).
Le dépôt doit rester **public** : jsDelivr ne sert que des dépôts publics. Le dossier `dist/` est versionné.

Les fichiers sont servis depuis `site-scripts/` :
- `https://cdn.jsdelivr.net/gh/rxm333/DDT@<commit>/site-scripts/dist/dame-de-tours.min.css`
- `https://cdn.jsdelivr.net/gh/rxm333/DDT@<commit>/site-scripts/dist/dame-de-tours.min.js`
- la 3D (`dist/hero-3d.min.js`) et les modèles (`models/`) sont chargés par le script, à côté de lui.

Ne jamais pointer vers `@main` : avec un identifiant de commit, le cache CDN est permanent
et rien ne change en production sans mise à jour volontaire de l'URL dans Webflow.

**Publier une nouvelle version**
1. `npm run build` puis `npm test` (dans `site-scripts/`) ;
2. incrémenter `VERSION` dans `src/main.js` (lisible dans la console : `DDS.version`) ;
3. commit + push ;
4. dans Webflow, *Site settings → Custom code*, remplacer l'identifiant de commit dans les deux URLs, puis publier.

> Les anciens commits restent servis : un site publié avec une ancienne URL continue de fonctionner.

## Intégration Webflow

**Head code** (en plus du favicon, de `og:site_name` et de la vérification Google)
```html
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rxm333/DDT@<commit>/site-scripts/dist/dame-de-tours.min.css">
```

**Footer code**
```html
<script defer src="https://cdn.jsdelivr.net/gh/rxm333/DDT@<commit>/site-scripts/dist/dame-de-tours.min.js"></script>
```

Le script ne tourne que sur le site publié / la prévisualisation, pas dans le canvas du Designer.

### Modules (v1.16)
| Module | Rôle |
|---|---|
| `transitions` | Transitions de page Barba (navbar et footer fixes, `<head>` synchronisé, réinitialisation par page). |
| `hero3d-loader` + `hero3d/` | Échiquier 3D de l'accueil et visualiseur 3D des fiches collection (Three.js, chargé à la demande). |
| `logo-spin` | Emblème de la navbar qui tourne au scroll (planche de 120 vues). |
| `article` / `news` | Modèle d'article CMS (sommaire, partage, date FR, temps de lecture) et listes d'actualités (tri, limite, liens). |
| `product`, `customizer` | Fiches produit (galerie, quantité) et personnaliseur actuel côté site. |
| `swiper`, `forms`, `accordion`, `reveal`, `marquee`, `hover`, `navbar`, `smooth-scroll` | Interactions générales. |

---

## Contrat avec le markup Webflow

| Élément | Sélecteur attendu |
|---|---|
| Navbar | `[data-navbar="component"]`, `[data-navbar="toggle"]`, `[data-navbar="menu"]`, `.navbar_menu-line`, combo `.is-open` |
| Texte qui roule | `.product-card_button` (texte dans un `<span>`), `.navbar_link` |
| Magnétique | `.navbar_button` |
| Marquee | `.section_atelier`, `.atelier_marquee-list` (animation CSS dans l'embed `global-styles_custom`) |
| Apparitions | voir `REVEALS` dans `src/config.js` |

Pour ajouter un effet à un nouvel élément : ajouter son sélecteur dans `src/config.js`, puis `npm run build`.

## API publique

```js
window.DDS.lenis          // instance Lenis (null en mouvement réduit)
window.DDS.navbar.open()  // .close(), .toggle(), .isOpen
window.DDS.scrollTo(el)   // scroll animé + focus
window.DDS.stopScroll()   // ex. ouverture d'une modale panier
window.DDS.startScroll()
```
