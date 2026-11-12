# Personnaliseur Dame de Tours

Plateforme qui permet au client de :
1. **personnaliser** son échiquier (visuel, finitions, options) ;
2. **enregistrer** sa création et y revenir plus tard ;
3. **passer commande** : la commande est créée dans **Shopify** avec le détail de la personnalisation ;
4. côté atelier, consulter les commandes personnalisées dans un **back-office**.

> Ce dossier attend le code réalisé par le fondateur. Il sera intégré ici, relu et documenté.

## Organisation prévue

```
customizer/
├── app/            interface client (le personnaliseur intégré au site ou ouvert depuis celui-ci)
├── admin/          back-office des commandes personnalisées (accès protégé)
├── server/         API : sauvegarde des créations, création des commandes Shopify, webhooks
├── shared/         types et règles communes (options, prix, validations)
├── .env.example    liste des variables nécessaires, sans valeurs
└── README.md
```

L'organisation finale suivra le code reçu (framework, base de données) : on l'adaptera sans tout réécrire.

## Variables d'environnement (exemples)

| Variable | Rôle |
|---|---|
| `SHOPIFY_STORE_DOMAIN` | `xxx.myshopify.com` |
| `SHOPIFY_ADMIN_API_TOKEN` | jeton de l'application Shopify (création de commandes) — **secret** |
| `SHOPIFY_WEBHOOK_SECRET` | vérification des webhooks Shopify — **secret** |
| `DATABASE_URL` | base où sont stockées les créations — **secret** |
| `ADMIN_*` | accès au back-office — **secret** |

Les valeurs ne sont jamais commitées : `.env` (local) ou réglages de l'hébergeur (production).

## Avant la mise en ligne

- [ ] aucune clé ni mot de passe dans le code (le dépôt est public)
- [ ] back-office protégé (authentification, pas seulement une URL cachée)
- [ ] prix recalculé côté serveur (jamais celui envoyé par le navigateur)
- [ ] webhooks Shopify signés et vérifiés
- [ ] images envoyées par les clients : taille et format contrôlés
- [ ] données personnelles : mentions dans la politique de confidentialité, durée de conservation
- [ ] accessibilité du parcours (clavier, lecteurs d'écran, contrastes) comme le reste du site
