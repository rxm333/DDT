# Dame de Tours — monorepo

Tout le code du site **Dame de Tours** (jeux d'échecs fabriqués à Tours) au même endroit.

| Dossier | Contenu | Où ça tourne |
|---|---|---|
| [`site/`](site/) | Le site complet : pages, articles, styles, images | Hébergement statique (voir son README) |
| [`site-scripts/`](site-scripts/) | JavaScript et CSS du site : transitions, 3D, animations, articles, fiches produit… | Servi par **jsDelivr** depuis ce dépôt, chargé par les pages de `site/` |
| [`customizer/`](customizer/) | Renvoi vers le personnaliseur : dépôt **privé** `rxm333/DDT-customizer` (interface, commandes, Shopify, back-office) | Serveur Node (Hostinger) |
| [`docs/`](docs/) | Architecture, déploiement, décisions | — |

```
            Visiteur
               │
   ┌───────────▼────────────┐        ┌──────────────────────────────┐
   │  site/                 │  JS    │  site-scripts/  (jsDelivr)   │
   │  pages, articles,      │◄───────┤  transitions, 3D, articles…  │
   │  images                │        └──────────────────────────────┘
   └───────────┬────────────┘
               │ « Personnaliser mon échiquier »
   ┌───────────▼────────────┐        ┌──────────────────────────────┐
   │  personnaliseur        │  API   │  Shopify                     │
   │  (DDT-customizer)      ├───────►│  commande, paiement,         │
   │  sauvegarde, back-office│       │  détail de la personnalisation│
   └────────────────────────┘        └──────────────────────────────┘
```

Détails : [`docs/architecture.md`](docs/architecture.md).

## Démarrer

```bash
cd site-scripts
npm install
npm run build   # → site-scripts/dist/
npm test
```

Mettre en ligne une nouvelle version des scripts : voir [`site-scripts/README.md`](site-scripts/README.md#hébergement-github--jsdelivr).

## Règles du dépôt

- **Dépôt public** (nécessaire pour jsDelivr) : aucun secret ne doit y entrer. Clés Shopify, mots de passe,
  accès à la base de données vont dans des variables d'environnement (`.env`, ignoré par Git) ou dans les
  réglages de l'hébergeur. Chaque projet fournit un `.env.example` sans valeurs.
- `site-scripts/dist/` est versionné exprès : c'est ce que sert jsDelivr.
- Les pages de `site/` chargent une version de `site-scripts` figée sur un commit : pousser sur `main` ne change
  rien en production tant que l'URL n'est pas mise à jour dans les pages (voir `site/README.md`).
