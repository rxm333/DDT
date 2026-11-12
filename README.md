# Dame de Tours — monorepo

Tout le code du site **Dame de Tours** (jeux d'échecs fabriqués à Tours) au même endroit.

| Dossier | Contenu | Où ça tourne |
|---|---|---|
| [`site-scripts/`](site-scripts/) | JavaScript et CSS du site : transitions, 3D, animations, articles, fiches produit… | Servi par **jsDelivr** depuis ce dépôt, chargé par Webflow |
| [`customizer/`](customizer/) | Plateforme du personnaliseur : interface client, enregistrement et passage de commande, liaison Shopify, back-office des commandes | Serveur dédié (à héberger, voir son README) |
| [`webflow-export/`](webflow-export/) | Export du code HTML/CSS du site Webflow | Archive et sauvegarde du design (voir son README) |
| [`docs/`](docs/) | Architecture, déploiement, décisions | — |

```
            Visiteur
               │
   ┌───────────▼────────────┐        ┌──────────────────────────────┐
   │  Site Webflow          │  JS    │  site-scripts/  (jsDelivr)   │
   │  pages, CMS, SEO,      │◄───────┤  transitions, 3D, articles…  │
   │  formulaires           │        └──────────────────────────────┘
   └───────────┬────────────┘
               │ « Personnaliser mon échiquier »
   ┌───────────▼────────────┐        ┌──────────────────────────────┐
   │  customizer/           │  API   │  Shopify                     │
   │  personnalisation,     ├───────►│  commande, paiement,         │
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
- Webflow charge toujours une version figée sur un commit : pousser sur `main` ne change rien en production
  tant que l'URL n'est pas mise à jour dans Webflow.
