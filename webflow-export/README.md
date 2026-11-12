# Export du site Webflow

Ce dossier accueille l'export du code du site (*Webflow → Designer → Export code*, fichier `.zip`).

## Mettre à jour l'export

1. Dans le Designer : menu **Export code** → **Prepare ZIP** → **Download ZIP** (un plan Webflow payant est nécessaire).
2. Vider ce dossier (sauf ce README), décompresser le zip ici : `index.html`, `css/`, `js/`, `images/`…
3. Exporter aussi le contenu du CMS : *CMS → Actualités → Export CSV*, à ranger dans `cms/actualites.csv`.
4. Commit avec la date de l'export, par exemple `export Webflow 2026-11-12`.

## Ce que l'export contient, et ce qu'il ne contient pas

Webflow exporte le **HTML/CSS des pages statiques** et les images. En revanche :

| Fonction | Dans l'export ? |
|---|---|
| Pages statiques (accueil, collection, fiches produit, atelier, contact, pages légales) | ✅ |
| Styles, images, polices, scripts `site-scripts` (chargés par URL) | ✅ |
| **CMS** : les articles, la page `/actualites`, « Nos actualités » de l'accueil | ❌ listes vides, pages d'articles non générées (contenu seulement en CSV) |
| **Formulaires** (contact, personnalisation) | ❌ plus envoyés : il faut un autre service de formulaires |
| SEO dynamique des articles, sitemap, redirections 301 | ❌ |
| Éditeur Webflow pour modifier les textes | ❌ |

**Recommandation** : garder Webflow comme hébergeur du site en production, et utiliser cet export comme
**sauvegarde versionnée** du design (historique, retour en arrière, base si un jour le site quitte Webflow).
Héberger l'export ailleurs (GitHub Pages, Netlify…) imposerait de reconstruire le blog, les formulaires
et le SEO dynamique.
