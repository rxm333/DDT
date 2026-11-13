# Site Dame de Tours

Le site complet, en fichiers statiques (HTML, CSS, images). Il fonctionne chez n'importe quel hébergeur et ne dépend d'aucun service tiers pour ses pages.

## Contenu

| Élément | Fichiers |
|---|---|
| Pages | `index.html`, `collection-ancolie.html`, `ancolie-blanc.html`, `ancolie-noir.html`, `ancolie-la-chute-des-anges.html`, `atelier.html`, `personnalisation.html`, `contact.html`, `actualites.html`, pages légales, `404.html` |
| Articles | `actualites/<slug>.html` (3 articles) |
| Styles | `css/` (feuille du site), plus `site-scripts` (chargé depuis jsDelivr) |
| Scripts | `js/webflow.js` (menus, formulaires), `js/jquery-3.5.1.min.js`, plus `site-scripts` (transitions, 3D, articles…) |
| Images | `images/` |
| Guide de style | `style-guide.html` (référence des styles, non liée dans le site) |

Les liens internes pointent vers les fichiers `.html`. Les pages fonctionnent même ouvertes en local, sans serveur. Sur l'hébergeur, on pourra activer les adresses sans `.html` (`/atelier`).

## Ajouter un article

1. Dupliquer un fichier de `actualites/`, le renommer avec le nouveau slug (`actualites/mon-article.html`), puis modifier le titre, la description, l'image et le texte.
2. Ajouter sa carte dans les listes d'actualités de `index.html`, `atelier.html` et `actualites.html`, en copiant une carte existante (`<div role="listitem" class="news_item w-dyn-item">…`). Mettre à jour le lien, le `data-article-slug`, l'image, le titre et la date `data-news-date`.
3. Le tri par date et la limite à 3 articles (accueil, atelier) sont faits automatiquement par `site-scripts`.

## Scripts du site (`site-scripts`)

Chaque page charge une version figée sur un commit :
`https://cdn.jsdelivr.net/gh/rxm333/DDT@<commit>/site-scripts/dist/dame-de-tours.min.(css|js)`.

Pour publier une nouvelle version, voir [`../site-scripts/README.md`](../site-scripts/README.md). Il faut ensuite remplacer le commit dans toutes les pages :
```bash
sed -i -E 's#rxm333/DDT@[0-9a-f]{40}/site-scripts#rxm333/DDT@<nouveau-commit>/site-scripts#' site/*.html site/actualites/*.html
```

## À brancher avant la mise en ligne

| Fonction | État |
|---|---|
| Formulaires contact et newsletter | ⚠️ ils envoient encore vers l'ancien service. Il faut les relier au serveur du personnaliseur (envoi d'e-mails déjà en place). |
| Panier / paiement (« Ajouter au panier ») | ✅ relié à Shopify (API Storefront, voir `site-scripts/README.md`). ⚠️ Avant de faire pointer `damedetours.com` ici : donner à Shopify un domaine à lui (ex. `boutique.damedetours.com`), sinon le lien de paiement ne marche plus |
| Personnaliseur (page Personnalisation) | ⚠️ à intégrer (dépôt privé `rxm333/DDT-customizer`) |
| Adresses sans `.html`, redirections 301 depuis l'ancien site, `sitemap.xml`, `robots.txt` | ⚠️ à configurer chez l'hébergeur |
| Images de partage (`og:image`) | pointent vers `https://damedetours.com/images/…`, donc valides une fois le site sur ce domaine |
