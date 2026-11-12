# Architecture

## Vue d'ensemble

| Brique | Rôle | Hébergement |
|---|---|---|
| Site (`site/`) | Pages, articles, images, SEO | Hébergement statique, déployé depuis ce dépôt |
| Scripts du site (`site-scripts/`) | Transitions, 3D, articles, fiches produit… | **jsDelivr**, servi depuis ce dépôt GitHub (public) |
| Personnaliseur (dépôt privé `rxm333/DDT-customizer`) | Création, sauvegarde, devis, commande, back-office | **Serveur Node** sur Hostinger, déployé depuis GitHub |
| Boutique | Paiement, commandes, clients, expéditions | **Shopify** |

Le site est entièrement dans ce dépôt : toute modification passe par GitHub. Il ne dépend d'aucun éditeur de site en ligne.

## Ce que le serveur doit apporter au site statique

Un site statique ne sait pas envoyer d'e-mail ni garder un secret. Ces fonctions passent par le serveur du personnaliseur, qui envoie déjà des e-mails et parle déjà à Shopify :
- formulaires de contact et de newsletter ;
- ajout au panier et paiement Shopify ;
- personnalisation, sauvegarde et back-office.

## Pourquoi le personnaliseur a besoin d'un serveur

Créer un produit ou une commande Shopify avec un jeton d'administration, enregistrer des créations et protéger un back-office ne peuvent pas se faire dans le navigateur (le jeton serait visible), ni sur un hébergement statique. Le serveur garde les secrets dans ses variables d'environnement.

## Dépôts

- `rxm333/DDT` (**public**, nécessaire pour jsDelivr) : site et scripts. Aucun secret.
- `rxm333/DDT-customizer` (**privé**) : personnaliseur et back-office.
