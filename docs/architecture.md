# Architecture

## Vue d'ensemble

| Brique | Rôle | Hébergement |
|---|---|---|
| Site | Pages, CMS (actualités), SEO, formulaires, édition des textes | **Webflow** |
| Scripts du site (`site-scripts/`) | Comportements et styles ajoutés au site Webflow | **jsDelivr**, servi depuis ce dépôt GitHub (public) |
| Personnaliseur (`customizer/`) | Création, sauvegarde, commande, back-office | **Serveur Node** (ex. Vercel, Render, Railway, Fly.io) |
| Boutique | Paiement, commandes, clients, expéditions | **Shopify** |
| Export Webflow (`webflow-export/`) | Sauvegarde versionnée du design | Dépôt uniquement |

## Pourquoi le site reste sur Webflow

L'export de code Webflow ne contient ni le CMS (articles, listes d'actualités), ni les formulaires,
ni le SEO dynamique, ni l'éditeur de contenu. Héberger l'export ailleurs obligerait à reconstruire ces
fonctions. L'export sert donc de sauvegarde et d'historique, pas de site de production.

## Pourquoi le personnaliseur a besoin d'un serveur

Créer une commande Shopify avec un jeton d'administration, enregistrer des créations et protéger un
back-office ne peuvent pas se faire dans le navigateur (le jeton serait visible) ni sur un hébergement
statique (GitHub Pages, jsDelivr). Il faut un petit serveur qui garde les secrets et parle à Shopify.

## Liaison site ↔ personnaliseur ↔ Shopify

1. Sur le site, « Personnaliser » ouvre le personnaliseur (page dédiée ou intégration dans la page).
2. Le client compose son échiquier ; la création est enregistrée côté serveur (lien pour y revenir).
3. À la commande, le serveur crée un panier / une commande Shopify avec la personnalisation en
   propriétés de ligne (*line item properties*) ou en métachamps, puis redirige vers le paiement Shopify.
4. Les webhooks Shopify (commande payée, annulée…) mettent à jour le statut dans le back-office.

## Dépôt public : ce qui en découle

jsDelivr ne sert que des dépôts publics. Le code du personnaliseur peut y vivre **à condition qu'aucun
secret n'y soit écrit**. Si le fondateur préfère garder ce code privé, deux options :
- un second dépôt **privé** pour `customizer/`, ce dépôt restant public pour `site-scripts/` ;
- tout passer en privé et servir `site-scripts/` depuis un autre CDN (Cloudflare Pages, Vercel)
  au lieu de jsDelivr — il faudra alors changer les URLs dans Webflow.
