# Site Dame de Tours — version Astro

Astro fabrique les pages HTML du site à partir de gabarits et de contenus. Le résultat (`dist/`) est
un site statique : aucun serveur à faire tourner, aussi rapide que l'ancien.

| Dossier | Rôle |
|---|---|
| `src/layouts/Base.astro` | Squelette commun : `<head>` (titre, description, canonique, données Google), nav, pied de page, scripts |
| `src/partials/` | HTML partagé repris tel quel de l'ancien site (head, nav, pied de page, styles globaux) |
| `src/fragments/` | Contenu (`<main>`) de chaque page fixe, repris tel quel |
| `src/data/pages.json` | Titre, description, image de partage de chaque page fixe |
| `src/content/articles/` | Articles (en attendant Sanity) |
| `src/templates/` | Gabarits HTML des articles et des cartes d'actualités |
| `src/lib/` | Données Google (`seo.js`), atelier (`site.js`), prix Shopify au moment de la construction |
| `public/` | Images, CSS, polices, `.htaccess` (adresses sans `.html`, preprod masqué à Google) |

Les scripts du site (`../site-scripts/dist`, modèles 3D, polices) sont copiés dans `public/site-scripts/`
à chaque construction : plus de lien jsDelivr figé sur un commit.

## Commandes

```bash
npm install
npm run dev      # aperçu local sur http://localhost:4321
npm run build    # construit dist/
npm test         # contrôles : titre, description, canonique, un seul h1, liens, images, JSON-LD, plan du site
```

## Mise en ligne

Le workflow `.github/workflows/site-astro.yml` construit le site à chaque modification de `web/` ou de
`site-scripts/` sur `main`, et publie `dist/` sur la branche **deploy**. Hostinger déploie cette branche.

## Historique

`scripts/import-static.py` a converti l'ancien site statique (`../site/`) une fois. Il n'est plus à relancer.
Après conversion, ajout manuel : un `<h1>` masqué sur `fragments/personnalisation.html` (la page n'en avait pas).
