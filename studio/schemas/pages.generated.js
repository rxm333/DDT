// FICHIER GÉNÉRÉ par web/scripts/cms-schema.mjs — ne pas modifier à la main.
// Un formulaire par page du site ; chaque champ correspond à un texte ou une photo de la page.
export const pageDocs = [
 {
  "name": "page_index",
  "title": "Accueil",
  "type": "document",
  "__group": "pages",
  "__key": "index",
  "groups": [
   {
    "name": "contenu",
    "title": "Contenu",
    "default": true
   },
   {
    "name": "google",
    "title": "Google"
   }
  ],
  "fieldsets": [
   {
    "name": "s1",
    "title": "Dame de Tours",
    "options": {
     "collapsible": true,
     "collapsed": false
    }
   },
   {
    "name": "s2",
    "title": "Collection Ancolie",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "s3",
    "title": "L’atelier au cœur de la Touraine",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "s4",
    "title": "Nos actualités",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "s5",
    "title": "Les nouvelles de l’atelier, en avant-première",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   }
  ],
  "fields": [
   {
    "name": "t1",
    "title": "Texte (invisible, lu par Google et les lecteurs d’écran)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Dame de Tours »"
   },
   {
    "name": "t2",
    "title": "Paragraphe",
    "fieldset": "s1",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Déclinée en série limitée à partir de la Collection Ancolie, cette édition rend hommage à l’univers visionnaire de Gustave Doré. »"
   },
   {
    "name": "t3",
    "title": "Lien",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Créer le vôtre »"
   },
   {
    "name": "t4",
    "title": "Lien 2",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Voir la collection »"
   },
   {
    "name": "t5",
    "title": "Titre",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Collection Ancolie »"
   },
   {
    "name": "t6",
    "title": "Paragraphe",
    "fieldset": "s2",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Trois modèles, trois accords de bois, chacun façonné à la main, un par un. »"
   },
   {
    "name": "i7",
    "title": "Photo : Échiquier La Chute des Anges : plateau aux veines ",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-la-chute-des-anges.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier La Chute des Anges : plateau aux veines grises façon marbre, pièces noires et blanches. »"
     }
    ]
   },
   {
    "name": "t8",
    "title": "Lien",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « La Chute des Anges »"
   },
   {
    "name": "t9",
    "title": "Paragraphe 2",
    "fieldset": "s2",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Collection “Ancolie” »"
   },
   {
    "name": "i10",
    "title": "Photo : Échiquier Blanc : plateau blanc, damier noir et bl",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-blanc.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier Blanc : plateau blanc, damier noir et blanc, pièces noires et blanches. »"
     }
    ]
   },
   {
    "name": "t11",
    "title": "Lien 2",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Blanc »"
   },
   {
    "name": "i12",
    "title": "Photo : Échiquier Noir : plateau noir, damier noir et blan",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-noir.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier Noir : plateau noir, damier noir et blanc, pièces noires et blanches. »"
     }
    ]
   },
   {
    "name": "t13",
    "title": "Lien 3",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Noir »"
   },
   {
    "name": "t14",
    "title": "Titre",
    "fieldset": "s3",
    "group": "contenu",
    "type": "ligneRiche",
    "description": "Texte d’origine : « L’atelier au cœur de la Touraine »"
   },
   {
    "name": "t15",
    "title": "Paragraphe",
    "fieldset": "s3",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Installé au cœur de la Touraine, Dame de Tours est un atelier indépendant consacré à la création de jeux d’échecs contemporains. »"
   },
   {
    "name": "t16",
    "title": "Lien",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Découvrir l’atelier »"
   },
   {
    "name": "i17",
    "title": "Photo : Pièces d’échecs blanches sculptées sur un plateau,",
    "fieldset": "s3",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (atelier-pieces-blanches.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Pièces d’échecs blanches sculptées sur un plateau, en extérieur. »"
     }
    ]
   },
   {
    "name": "i18",
    "title": "Photo : Pose d’un damier bleu et blanc sur un plateau roug",
    "fieldset": "s3",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (perso-etape-sauvegarder.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Pose d’un damier bleu et blanc sur un plateau rouge, à l’atelier. »"
     }
    ]
   },
   {
    "name": "i19",
    "title": "Photo : L’artisan trace le plateau d’un échiquier à l’atel",
    "fieldset": "s3",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (perso-etape-atelier.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « L’artisan trace le plateau d’un échiquier à l’atelier. »"
     }
    ]
   },
   {
    "name": "i20",
    "title": "Photo : Échiquier vert et blanc orné de mousse végétale.",
    "fieldset": "s3",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (perso-etape-composer.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier vert et blanc orné de mousse végétale. »"
     }
    ]
   },
   {
    "name": "i21",
    "title": "Photo : Les lauréats de l’exposition artistique 2026 au ch",
    "fieldset": "s3",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (atelier-laureats-mothe-chandeniers.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Les lauréats de l’exposition artistique 2026 au château de la Mothe-Chandeniers, avec leur échiquie… »"
     }
    ]
   },
   {
    "name": "t22",
    "title": "Titre",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Nos actualités »"
   },
   {
    "name": "t23",
    "title": "Paragraphe",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Concours, lancements, expositions : les dernières nouvelles de Dame de Tours. »"
   },
   {
    "name": "t24",
    "title": "Lien",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Toutes les actualités »"
   },
   {
    "name": "t25",
    "title": "Paragraphe",
    "fieldset": "s5",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Newsletter »"
   },
   {
    "name": "t26",
    "title": "Titre",
    "fieldset": "s5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Les nouvelles de l’atelier, en avant-première »"
   },
   {
    "name": "t27",
    "title": "Paragraphe 2",
    "fieldset": "s5",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Nouvelles collections, événements et ouvertures d’atelier : soyez parmi les premiers informés. »"
   },
   {
    "name": "t28",
    "title": "Libellé",
    "fieldset": "s5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Adresse e-mail »"
   },
   {
    "name": "t29",
    "title": "Texte",
    "fieldset": "s5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « J’accepte de recevoir la newsletter de Dame de Tours. »"
   },
   {
    "name": "t30",
    "title": "Bouton",
    "fieldset": "s5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « S’inscrire »"
   },
   {
    "name": "t31",
    "title": "Paragraphe 3",
    "fieldset": "s5",
    "group": "contenu",
    "type": "ligneRiche",
    "description": "Texte d’origine : « Un e-mail de temps en temps, jamais de spam. Désinscription en un clic depuis chaque message. Politique de confidentialité »"
   },
   {
    "name": "t32",
    "title": "Texte 2",
    "fieldset": "s5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Merci ! Votre inscription est bien enregistrée. »"
   },
   {
    "name": "t33",
    "title": "Texte 3",
    "fieldset": "s5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « L’inscription n’a pas abouti. Vérifiez votre adresse e-mail puis réessayez. »"
   },
   {
    "name": "seoTitle",
    "title": "Titre pour Google",
    "type": "string",
    "group": "google",
    "description": "Vide = titre actuel de la page. Idéalement 50 à 60 caractères."
   },
   {
    "name": "seoDescription",
    "title": "Description pour Google",
    "type": "text",
    "rows": 3,
    "group": "google",
    "description": "Vide = description actuelle. Idéalement 120 à 155 caractères."
   }
  ],
  "preview": {}
 },
 {
  "name": "page_collection_ancolie",
  "title": "Collection Ancolie",
  "type": "document",
  "__group": "pages",
  "__key": "collection-ancolie",
  "groups": [
   {
    "name": "contenu",
    "title": "Contenu",
    "default": true
   },
   {
    "name": "google",
    "title": "Google"
   }
  ],
  "fieldsets": [
   {
    "name": "s1",
    "title": "Collection Ancolie",
    "options": {
     "collapsible": true,
     "collapsed": false
    }
   },
   {
    "name": "s2",
    "title": "Note de l’atelier",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "s3",
    "title": "Les trois modèles",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "s4",
    "title": "Les pièces",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "s5",
    "title": "Le plateau",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   }
  ],
  "fields": [
   {
    "name": "t1",
    "title": "Texte (invisible, lu par Google et les lecteurs d’écran)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Collection Ancolie »"
   },
   {
    "name": "t2",
    "title": "Paragraphe",
    "fieldset": "s1",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Première collection de Dame de Tours : trois échiquiers conçus et assemblés à Tours, en série limitée. »"
   },
   {
    "name": "t3",
    "title": "Terme",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « 3 modèles »"
   },
   {
    "name": "t4",
    "title": "Valeur",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « La Chute des Anges, Blanc, Noir »"
   },
   {
    "name": "t5",
    "title": "Terme 2",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Série limitée »"
   },
   {
    "name": "t6",
    "title": "Valeur 2",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Exemplaires numérotés et certifiés »"
   },
   {
    "name": "t7",
    "title": "Valeur 3",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Le jeu complet, plateau et 32 pièces »"
   },
   {
    "name": "t8",
    "title": "Lien",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Voir les modèles »"
   },
   {
    "name": "t9",
    "title": "Lien 2",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Créer le vôtre »"
   },
   {
    "name": "t10",
    "title": "Paragraphe 2",
    "fieldset": "s1",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « La Chute des Anges »"
   },
   {
    "name": "i11",
    "title": "Photo : Échiquier La Chute des Anges : plateau aux veines ",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-la-chute-des-anges.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier La Chute des Anges : plateau aux veines grises façon marbre, pièces noires et blanches. »"
     }
    ]
   },
   {
    "name": "i12",
    "title": "Photo (ancolie-la-chute-des-anges.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-la-chute-des-anges.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i13",
    "title": "Photo (ancolie-blanc.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-blanc.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "t14",
    "title": "Texte",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Blanc »"
   },
   {
    "name": "i15",
    "title": "Photo (ancolie-noir.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-noir.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "t16",
    "title": "Texte 2",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Noir »"
   },
   {
    "name": "i17",
    "title": "Photo (collection-ancolie-film.webp)",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (collection-ancolie-film.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "t18",
    "title": "Texte",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Voir le film · Collection Ancolie »"
   },
   {
    "name": "i19",
    "title": "Photo (lettre-feuille-dessous.svg)",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (lettre-feuille-dessous.svg).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i20",
    "title": "Photo (lettre-feuille.webp)",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (lettre-feuille.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "t21",
    "title": "Titre",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Note de l’atelier »"
   },
   {
    "name": "t22",
    "title": "Paragraphe",
    "fieldset": "s2",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « La collection Ancolie est née d’une fascination pour les formes qui s’élèvent, comme cette fleur dont les pétales semblent défier la gravit… »"
   },
   {
    "name": "t23",
    "title": "Paragraphe 2",
    "fieldset": "s2",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Les pièces dessinent un langage de couronnes, d’ornements et d’architectures célestes. Elles semblent venir d’un royaume oublié autant que … »"
   },
   {
    "name": "t24",
    "title": "Paragraphe 3",
    "fieldset": "s2",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Chaque échiquier associe des matériaux choisis pour leur durabilité, leur présence visuelle et leur capacité à traverser le temps. Le cuir … »"
   },
   {
    "name": "t25",
    "title": "Paragraphe 4",
    "fieldset": "s2",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Les lignes sont franches, les contrastes assumés. Chaque détail participe à la présence forte et raffinée de ce jeu. »"
   },
   {
    "name": "t26",
    "title": "Paragraphe 5",
    "fieldset": "s2",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « L’atelier Dame de Tours »"
   },
   {
    "name": "i27",
    "title": "Photo (cachet-cire-dame-de-tours.svg)",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (cachet-cire-dame-de-tours.svg).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "t28",
    "title": "Titre",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Les trois modèles »"
   },
   {
    "name": "t29",
    "title": "Paragraphe",
    "fieldset": "s3",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Chacun façonné à la main, un par un. »"
   },
   {
    "name": "i30",
    "title": "Photo : Échiquier La Chute des Anges de la collection Anco",
    "fieldset": "s3",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-la-chute-des-anges.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier La Chute des Anges de la collection Ancolie : plateau aux veines grises façon marbre, piè… »"
     }
    ]
   },
   {
    "name": "t31",
    "title": "Paragraphe 2",
    "fieldset": "s3",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Collection “Ancolie” »"
   },
   {
    "name": "i32",
    "title": "Photo : Échiquier Blanc de la collection Ancolie : plateau",
    "fieldset": "s3",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-blanc.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier Blanc de la collection Ancolie : plateau blanc, damier noir et blanc, pièces noires et bl… »"
     }
    ]
   },
   {
    "name": "i33",
    "title": "Photo : Échiquier Noir de la collection Ancolie : plateau ",
    "fieldset": "s3",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-noir.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier Noir de la collection Ancolie : plateau noir, damier noir et blanc, pièces noires et blan… »"
     }
    ]
   },
   {
    "name": "t34",
    "title": "Titre",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Les pièces »"
   },
   {
    "name": "i35",
    "title": "Photo : Tour, cavalier et fou blancs de la collection Anco",
    "fieldset": "s4",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-pieces-1.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Tour, cavalier et fou blancs de la collection Ancolie en gros plan. »"
     }
    ]
   },
   {
    "name": "i36",
    "title": "Photo : Roi, dame et pièces noires Ancolie alignés sur le ",
    "fieldset": "s4",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-pieces-2.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Roi, dame et pièces noires Ancolie alignés sur le damier. »"
     }
    ]
   },
   {
    "name": "i37",
    "title": "Photo : Roi et dame blancs Ancolie aux couronnes ornementé",
    "fieldset": "s4",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-pieces-3.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Roi et dame blancs Ancolie aux couronnes ornementées. »"
     }
    ]
   },
   {
    "name": "t38",
    "title": "Paragraphe",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « La collection porte le nom de l’ancolie, une fleur dont les pétales semblent défier la gravité. On retrouve cette verticalité dans les pièc… »"
   },
   {
    "name": "t39",
    "title": "Terme",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Nombre »"
   },
   {
    "name": "t40",
    "title": "Valeur",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « 32 pièces »"
   },
   {
    "name": "t41",
    "title": "Terme 2",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Matière »"
   },
   {
    "name": "t42",
    "title": "Valeur 2",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Résine ABS haute qualité »"
   },
   {
    "name": "t43",
    "title": "Terme 3",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Finition »"
   },
   {
    "name": "t44",
    "title": "Valeur 3",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Peintes et vernies à la main »"
   },
   {
    "name": "t45",
    "title": "Terme 4",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Fixation »"
   },
   {
    "name": "t46",
    "title": "Valeur 4",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Système d’aimantation discret : les pièces restent en place pendant la partie et le transport »"
   },
   {
    "name": "t47",
    "title": "Titre",
    "fieldset": "s5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Le plateau »"
   },
   {
    "name": "i48",
    "title": "Photo : Cases du plateau Ancolie en gros plan, surface en ",
    "fieldset": "s5",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-plateau-1.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Cases du plateau Ancolie en gros plan, surface en cuir vegan. »"
     }
    ]
   },
   {
    "name": "i49",
    "title": "Photo : Angle du plateau Ancolie et son clou ornemental.",
    "fieldset": "s5",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-plateau-2.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Angle du plateau Ancolie et son clou ornemental. »"
     }
    ]
   },
   {
    "name": "i50",
    "title": "Photo : Bordure du plateau Ancolie ornée de clous, pièces ",
    "fieldset": "s5",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-plateau-3.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Bordure du plateau Ancolie ornée de clous, pièces en arrière-plan. »"
     }
    ]
   },
   {
    "name": "t51",
    "title": "Paragraphe",
    "fieldset": "s5",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Le plateau repose sur une structure en bois recouverte d’une épaisse couche d’acier magnétique, qui retient les pièces. Sa surface est en c… »"
   },
   {
    "name": "t52",
    "title": "Terme",
    "fieldset": "s5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Structure »"
   },
   {
    "name": "t53",
    "title": "Valeur",
    "fieldset": "s5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Bois recouvert d’acier magnétique »"
   },
   {
    "name": "t54",
    "title": "Terme 2",
    "fieldset": "s5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Surface »"
   },
   {
    "name": "t55",
    "title": "Valeur 2",
    "fieldset": "s5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Cuir vegan haute qualité »"
   },
   {
    "name": "t56",
    "title": "Terme 3",
    "fieldset": "s5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Détails »"
   },
   {
    "name": "t57",
    "title": "Valeur 3",
    "fieldset": "s5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « 64 clous ornementaux »"
   },
   {
    "name": "t58",
    "title": "Terme 4",
    "fieldset": "s5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Pieds »"
   },
   {
    "name": "t59",
    "title": "Valeur 4",
    "fieldset": "s5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « 4 pieds en acier »"
   },
   {
    "name": "t60",
    "title": "Terme 5",
    "fieldset": "s5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Dimensions »"
   },
   {
    "name": "t61",
    "title": "Valeur 5",
    "fieldset": "s5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « 40 × 40 cm »"
   },
   {
    "name": "seoTitle",
    "title": "Titre pour Google",
    "type": "string",
    "group": "google",
    "description": "Vide = titre actuel de la page. Idéalement 50 à 60 caractères."
   },
   {
    "name": "seoDescription",
    "title": "Description pour Google",
    "type": "text",
    "rows": 3,
    "group": "google",
    "description": "Vide = description actuelle. Idéalement 120 à 155 caractères."
   }
  ],
  "preview": {}
 },
 {
  "name": "page_atelier",
  "title": "L’atelier",
  "type": "document",
  "__group": "pages",
  "__key": "atelier",
  "groups": [
   {
    "name": "contenu",
    "title": "Contenu",
    "default": true
   },
   {
    "name": "google",
    "title": "Google"
   }
  ],
  "fieldsets": [
   {
    "name": "s1",
    "title": "Fait à la main, en Touraine",
    "options": {
     "collapsible": true,
     "collapsed": false
    }
   },
   {
    "name": "s2",
    "title": "Atelier intro",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "s3",
    "title": "De l’idée à l’échiquier",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "s4",
    "title": "Atelier manifesto",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "s5",
    "title": "À la rencontre des joueurs",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "s6",
    "title": "La vie de l’atelier",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "s7",
    "title": "Imaginez votre propre échiquier",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   }
  ],
  "fields": [
   {
    "name": "i1",
    "title": "Photo : Les mains de l’atelier : assemblage d’un plateau, ",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (atelier-mains-peinture-assemblage.jpg).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Les mains de l’atelier : assemblage d’un plateau, peinture d’une pièce et finitions, à côté de pièc… »"
     }
    ]
   },
   {
    "name": "t2",
    "title": "Paragraphe",
    "fieldset": "s1",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « L’atelier Dame de Tours »"
   },
   {
    "name": "t3",
    "title": "Grand titre",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Fait à la main, en Touraine »"
   },
   {
    "name": "t4",
    "title": "Paragraphe 2",
    "fieldset": "s1",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Chaque jeu est dessiné, peint et assemblé dans notre atelier, pièce après pièce. »"
   },
   {
    "name": "i5",
    "title": "Photo : Un artisan de l’atelier trace à la main le dessin ",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (perso-etape-atelier.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Un artisan de l’atelier trace à la main le dessin d’un plateau. »"
     }
    ]
   },
   {
    "name": "t6",
    "title": "Légende",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Chaque plateau commence par un dessin, à la main. »"
   },
   {
    "name": "t7",
    "title": "Paragraphe",
    "fieldset": "s2",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Installé au cœur de la Touraine, Dame de Tours est un atelier indépendant consacré à la création de jeux d’échecs contemporains. »"
   },
   {
    "name": "t8",
    "title": "Paragraphe 2",
    "fieldset": "s2",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Chaque collection naît d’une rencontre entre design, artisanat et patrimoine, dans un univers inspiré par les architectures néo-médiévales,… »"
   },
   {
    "name": "t9",
    "title": "Élément de liste",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Conçu, fabriqué et assemblé à Tours »"
   },
   {
    "name": "t10",
    "title": "Élément de liste 2",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Pièces peintes et vernies à la main »"
   },
   {
    "name": "t11",
    "title": "Élément de liste 3",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Exemplaires numérotés et certifiés »"
   },
   {
    "name": "t12",
    "title": "Paragraphe",
    "fieldset": "s3",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Fait main »"
   },
   {
    "name": "t13",
    "title": "Titre",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « De l’idée à l’échiquier »"
   },
   {
    "name": "i14",
    "title": "Photo : Échiquier personnalisé rouge et bleu posé sur une ",
    "fieldset": "s3",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (atelier-echiquier-personnalise-jardin.jpg).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier personnalisé rouge et bleu posé sur une table en bois, au jardin. »"
     }
    ]
   },
   {
    "name": "t15",
    "title": "Sous-titre",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Le dessin »"
   },
   {
    "name": "t16",
    "title": "Paragraphe 2",
    "fieldset": "s3",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Tout commence par une idée, une œuvre, un lieu. Nous dessinons chaque plateau et chaque pièce à l’atelier, à la recherche de lignes franche… »"
   },
   {
    "name": "i17",
    "title": "Photo : Pièces blanches ornementales peintes à la main, po",
    "fieldset": "s3",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (atelier-pieces-blanches.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Pièces blanches ornementales peintes à la main, posées sur un échiquier. »"
     }
    ]
   },
   {
    "name": "t18",
    "title": "Sous-titre 2",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Les pièces »"
   },
   {
    "name": "t19",
    "title": "Paragraphe 3",
    "fieldset": "s3",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Elles sont réalisées en résine ABS haute qualité, puis peintes et vernies manuellement. Chaque détail est repris à la main afin d’obtenir u… »"
   },
   {
    "name": "i20",
    "title": "Photo : Mains qui rabattent le revêtement en cuir sur le b",
    "fieldset": "s3",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (perso-etape-sauvegarder.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Mains qui rabattent le revêtement en cuir sur le bord d’un plateau. »"
     }
    ]
   },
   {
    "name": "t21",
    "title": "Sous-titre 3",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Le plateau »"
   },
   {
    "name": "t22",
    "title": "Paragraphe 4",
    "fieldset": "s3",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Le plateau repose sur une structure mêlant un bois robuste et une épaisse couche d’acier magnétique. Sa surface est habillée d’un cuir véga… »"
   },
   {
    "name": "i23",
    "title": "Photo : Échiquier vert et blanc terminé, pièces en place.",
    "fieldset": "s3",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (perso-etape-composer.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier vert et blanc terminé, pièces en place. »"
     }
    ]
   },
   {
    "name": "t24",
    "title": "Sous-titre 4",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « L’assemblage »"
   },
   {
    "name": "t25",
    "title": "Paragraphe 5",
    "fieldset": "s3",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Conçu, fabriqué et assemblé à Tours, chaque jeu passe entre nos mains avant de partir. Chaque exemplaire est numéroté individuellement et a… »"
   },
   {
    "name": "t26",
    "title": "Paragraphe",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « « Des objets pensés pour durer, jouer et être transmis. » »"
   },
   {
    "name": "t27",
    "title": "Paragraphe 2",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Nous privilégions, lorsque cela est possible, un réseau de partenaires et de fournisseurs implantés dans notre région, afin de faire vivre … »"
   },
   {
    "name": "t28",
    "title": "Paragraphe",
    "fieldset": "s5",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Hors de l’atelier »"
   },
   {
    "name": "t29",
    "title": "Titre",
    "fieldset": "s5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « À la rencontre des joueurs »"
   },
   {
    "name": "t30",
    "title": "Paragraphe 2",
    "fieldset": "s5",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Le 30 juillet 2026, nous étions au château de la Mothe-Chandeniers pour exposer notre jeu d’échecs à l’effigie de ce lieu unique. Dame de T… »"
   },
   {
    "name": "i31",
    "title": "Photo : L’équipe Dame de Tours devant le château de la Mot",
    "fieldset": "s5",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (atelier-laureats-mothe-chandeniers.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « L’équipe Dame de Tours devant le château de la Mothe-Chandeniers, avec le diplôme et l’échiquier la… »"
     }
    ]
   },
   {
    "name": "t32",
    "title": "Légende",
    "fieldset": "s5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Château de la Mothe-Chandeniers, juillet 2026. »"
   },
   {
    "name": "i33",
    "title": "Photo : L’échiquier « La Mothe-Chandeniers », vert et blan",
    "fieldset": "s5",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (atelier-echiquier-mothe-chandeniers.jpg).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « L’échiquier « La Mothe-Chandeniers », vert et blanc, orné de lierre, posé sur une table en bois. »"
     }
    ]
   },
   {
    "name": "t34",
    "title": "Légende 2",
    "fieldset": "s5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « L’échiquier lauréat, créé pour le château. »"
   },
   {
    "name": "t35",
    "title": "Titre",
    "fieldset": "s6",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « La vie de l’atelier »"
   },
   {
    "name": "t36",
    "title": "Paragraphe",
    "fieldset": "s6",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Expositions, lancements, concours : les dernières nouvelles de Dame de Tours. »"
   },
   {
    "name": "t37",
    "title": "Lien",
    "fieldset": "s6",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Toutes les actualités »"
   },
   {
    "name": "t38",
    "title": "Titre",
    "fieldset": "s7",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Imaginez votre propre échiquier »"
   },
   {
    "name": "t39",
    "title": "Paragraphe",
    "fieldset": "s7",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « L’atelier Dame de Tours vous permet de réaliser votre propre jeu d’échecs personnalisé, sur la base du visuel de votre choix. »"
   },
   {
    "name": "t40",
    "title": "Lien",
    "fieldset": "s7",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Créer le vôtre »"
   },
   {
    "name": "t41",
    "title": "Lien 2",
    "fieldset": "s7",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Écrire à l’atelier »"
   },
   {
    "name": "seoTitle",
    "title": "Titre pour Google",
    "type": "string",
    "group": "google",
    "description": "Vide = titre actuel de la page. Idéalement 50 à 60 caractères."
   },
   {
    "name": "seoDescription",
    "title": "Description pour Google",
    "type": "text",
    "rows": 3,
    "group": "google",
    "description": "Vide = description actuelle. Idéalement 120 à 155 caractères."
   }
  ],
  "preview": {}
 },
 {
  "name": "page_personnalisation",
  "title": "Personnalisation",
  "type": "document",
  "__group": "pages",
  "__key": "personnalisation",
  "groups": [
   {
    "name": "contenu",
    "title": "Contenu",
    "default": true
   },
   {
    "name": "google",
    "title": "Google"
   }
  ],
  "fieldsets": [
   {
    "name": "s1",
    "title": "Sr only",
    "options": {
     "collapsible": true,
     "collapsed": false
    }
   },
   {
    "name": "s2",
    "title": "De votre idée à l’atelier",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "s3",
    "title": "Options et tarifs",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "s4",
    "title": "Un échiquier personnalisé, fabriqué à Tours",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   }
  ],
  "fields": [
   {
    "name": "t1",
    "title": "Grand titre (invisible, lu par Google et les lecteurs d’écran)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Échiquier personnalisé : créez votre jeu d’échecs sur mesure »"
   },
   {
    "name": "t2",
    "title": "Titre",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « De votre idée à l’atelier »"
   },
   {
    "name": "i3",
    "title": "Photo : Échiquier personnalisé aux pièces vertes et blanch",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (perso-etape-composer.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier personnalisé aux pièces vertes et blanches posé sur une nappe blanche. »"
     }
    ]
   },
   {
    "name": "t4",
    "title": "Sous-titre",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Composez en ligne »"
   },
   {
    "name": "t5",
    "title": "Paragraphe",
    "fieldset": "s2",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Neuf étapes et un aperçu 3D qui suit chacun de vos choix. »"
   },
   {
    "name": "i6",
    "title": "Photo : Mains décollant le film protecteur d’un plateau au",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (perso-etape-sauvegarder.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Mains décollant le film protecteur d’un plateau au damier bleu et blanc bordé de cuir rouge. »"
     }
    ]
   },
   {
    "name": "t7",
    "title": "Sous-titre 2",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Sauvegardez votre projet »"
   },
   {
    "name": "t8",
    "title": "Paragraphe 2",
    "fieldset": "s2",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Un lien personnel valable 180 jours, et votre projet envoyé à l’atelier. »"
   },
   {
    "name": "i9",
    "title": "Photo : Artisan de l’atelier travaillant à la main sur un ",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (perso-etape-atelier.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Artisan de l’atelier travaillant à la main sur un plateau. »"
     }
    ]
   },
   {
    "name": "t10",
    "title": "Sous-titre 3",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « L’atelier le fabrique »"
   },
   {
    "name": "t11",
    "title": "Paragraphe 3",
    "fieldset": "s2",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Plateau habillé, pièces peintes et vernies à la main, à Tours. »"
   },
   {
    "name": "t12",
    "title": "Titre",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Options et tarifs »"
   },
   {
    "name": "t13",
    "title": "Paragraphe",
    "fieldset": "s3",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Le jeu de base est à 249 € TTC. Chaque option s’ajoute au total, mis à jour à chaque choix. »"
   },
   {
    "name": "t14",
    "title": "Terme",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Plateau »"
   },
   {
    "name": "t15",
    "title": "Valeur",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Votre image sur le cuir »"
   },
   {
    "name": "t16",
    "title": "Terme 2",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Angles »"
   },
   {
    "name": "t17",
    "title": "Valeur 2",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Modèle sur mesure »"
   },
   {
    "name": "t18",
    "title": "Valeur 3",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « dès +40 € »"
   },
   {
    "name": "t19",
    "title": "Terme 3",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Pièces »"
   },
   {
    "name": "t20",
    "title": "Valeur 4",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « dès +115 € »"
   },
   {
    "name": "t21",
    "title": "Terme 4",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Aimantation »"
   },
   {
    "name": "t22",
    "title": "Valeur 5",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Jeu aimanté »"
   },
   {
    "name": "t23",
    "title": "Terme 5",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Pieds »"
   },
   {
    "name": "t24",
    "title": "Valeur 6",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Pieds métalliques »"
   },
   {
    "name": "t25",
    "title": "Terme 6",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Inscription texte »"
   },
   {
    "name": "t26",
    "title": "Valeur 7",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Par zone : 4 zones, 40 caractères, 20 cm de large au plus »"
   },
   {
    "name": "t27",
    "title": "Terme 7",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Signature & logo »"
   },
   {
    "name": "t28",
    "title": "Valeur 8",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Votre logo ou votre signature »"
   },
   {
    "name": "t29",
    "title": "Terme 8",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Damier, clous, pièces »"
   },
   {
    "name": "t30",
    "title": "Valeur 9",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Ancolie, classiques, minimalistes ou traditionnelles »"
   },
   {
    "name": "t31",
    "title": "Valeur 10",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Inclus »"
   },
   {
    "name": "t32",
    "title": "Titre",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Un échiquier personnalisé, fabriqué à Tours »"
   },
   {
    "name": "t33",
    "title": "Paragraphe",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Chaque échiquier personnalisé Dame de Tours est composé en ligne par vous, puis fabriqué à la main dans notre atelier de Joué-lès-Tours. Vo… »"
   },
   {
    "name": "t34",
    "title": "Paragraphe 2",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Le plateau peut porter votre propre image, imprimée sur le cuir, ainsi qu’un prénom, une date, une dédicace, votre signature ou votre logo.… »"
   },
   {
    "name": "t35",
    "title": "Paragraphe 3",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Avant toute fabrication, l’atelier vous soumet un bon à tirer à valider. Les pièces sont ensuite peintes et vernies à la main, le plateau h… »"
   },
   {
    "name": "t36",
    "title": "Paragraphe 4",
    "fieldset": "s4",
    "group": "contenu",
    "type": "ligneRiche",
    "description": "Texte d’origine : « Un jeu d’échecs personnalisé fait un cadeau unique : anniversaire, mariage, départ, club d’échecs ou cadeau d’entreprise à vos couleurs. Po… »"
   },
   {
    "name": "t50",
    "title": "Paragraphe 5",
    "fieldset": "s4",
    "group": "contenu",
    "type": "ligneRiche",
    "description": "Texte d’origine : « L’atelier a par exemple créé l’échiquier vert et blanc du château de la Mothe-Chandeniers, classé 1er de l’exposition artistique 2026 : voi… »"
   },
   {
    "name": "t37",
    "title": "Titre (invisible, lu par Google et les lecteurs d’écran)",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Questions fréquentes sur l’échiquier personnalisé »"
   },
   {
    "name": "t38",
    "title": "Sous-titre",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Combien coûte un échiquier personnalisé ? »"
   },
   {
    "name": "t39",
    "title": "Paragraphe 6",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Le jeu de base est à 249 € TTC, plateau et 32 pièces compris. Les options s’ajoutent au total : votre image sur le cuir (+20 €), des pièces… »"
   },
   {
    "name": "t40",
    "title": "Sous-titre 2",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Qu’est-ce qui est personnalisable sur l’échiquier ? »"
   },
   {
    "name": "t41",
    "title": "Paragraphe 7",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Le damier, les teintes du plateau, les clous, les angles, les pieds et le style des pièces, en neuf étapes. Vous pouvez aussi imprimer votr… »"
   },
   {
    "name": "t42",
    "title": "Sous-titre 3",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Quel est le délai de fabrication ? »"
   },
   {
    "name": "t43",
    "title": "Paragraphe 8",
    "fieldset": "s4",
    "group": "contenu",
    "type": "ligneRiche",
    "description": "Texte d’origine : « Environ une semaine de fabrication après la validation du bon à tirer et le paiement, puis le temps de livraison. Les délais restent indica… »"
   },
   {
    "name": "t44",
    "title": "Sous-titre 4",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Puis-je mettre ma photo ou le logo de mon entreprise ? »"
   },
   {
    "name": "t45",
    "title": "Paragraphe 9",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Oui. Votre image est imprimée sur le cuir du plateau (+20 €) et un logo ou une signature s’ajoute pour 6 €. Pour les entreprises, l’atelier… »"
   },
   {
    "name": "t46",
    "title": "Sous-titre 5",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Où l’échiquier est-il fabriqué ? »"
   },
   {
    "name": "t47",
    "title": "Paragraphe 10",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « En France, dans notre atelier de Joué-lès-Tours (Indre-et-Loire) : le plateau y est habillé et assemblé, les pièces peintes et vernies à la… »"
   },
   {
    "name": "t48",
    "title": "Sous-titre 6",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Puis-je modifier ou annuler ma commande ? »"
   },
   {
    "name": "t49",
    "title": "Paragraphe 11",
    "fieldset": "s4",
    "group": "contenu",
    "type": "ligneRiche",
    "description": "Texte d’origine : « Oui, tant que le bon à tirer n’est pas validé. Ensuite, la commande est ferme : un produit personnalisé n’ouvre pas de droit de rétractatio… »"
   },
   {
    "name": "t51",
    "title": "Sous-titre 7",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Mon projet est-il sauvegardé ? »"
   },
   {
    "name": "t52",
    "title": "Paragraphe 12",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Oui. À la fin de la composition, vous recevez un lien personnel valable 180 jours pour retrouver ou modifier votre échiquier, et votre proj… »"
   },
   {
    "name": "t53",
    "title": "Sous-titre 8",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Peut-on jouer avec, ou est-ce un objet de décoration ? »"
   },
   {
    "name": "t54",
    "title": "Paragraphe 13",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Les deux : l’échiquier est fait pour jouer comme pour être exposé. Ce n’est pas un jouet pour les jeunes enfants. »"
   },
   {
    "name": "seoTitle",
    "title": "Titre pour Google",
    "type": "string",
    "group": "google",
    "description": "Vide = titre actuel de la page. Idéalement 50 à 60 caractères."
   },
   {
    "name": "seoDescription",
    "title": "Description pour Google",
    "type": "text",
    "rows": 3,
    "group": "google",
    "description": "Vide = description actuelle. Idéalement 120 à 155 caractères."
   }
  ],
  "preview": {}
 },
 {
  "name": "page_contact",
  "title": "Contact",
  "type": "document",
  "__group": "pages",
  "__key": "contact",
  "groups": [
   {
    "name": "contenu",
    "title": "Contenu",
    "default": true
   },
   {
    "name": "google",
    "title": "Google"
   }
  ],
  "fieldsets": [
   {
    "name": "s1",
    "title": "Contacter l’atelier",
    "options": {
     "collapsible": true,
     "collapsed": false
    }
   }
  ],
  "fields": [
   {
    "name": "t1",
    "title": "Grand titre",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Contacter l’atelier »"
   },
   {
    "name": "t2",
    "title": "Paragraphe",
    "fieldset": "s1",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Une question sur un échiquier, une commande en cours ou un projet sur mesure ? Écrivez-nous : l’atelier vous répond personnellement sous 2 … »"
   },
   {
    "name": "t3",
    "title": "Paragraphe 2",
    "fieldset": "s1",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « E-mail »"
   },
   {
    "name": "t4",
    "title": "Lien",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « contact@damedetours.com »"
   },
   {
    "name": "t5",
    "title": "Paragraphe 3",
    "fieldset": "s1",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Commande »"
   },
   {
    "name": "t6",
    "title": "Paragraphe 4",
    "fieldset": "s1",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Pensez à indiquer votre numéro de commande dans votre message. »"
   },
   {
    "name": "t7",
    "title": "Libellé",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Nom »"
   },
   {
    "name": "t8",
    "title": "Texte",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « obligatoire »"
   },
   {
    "name": "t9",
    "title": "Libellé 2",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Numéro de téléphone »"
   },
   {
    "name": "t10",
    "title": "Libellé 3",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Numéro de commande »"
   },
   {
    "name": "t11",
    "title": "Libellé 4",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Votre message »"
   },
   {
    "name": "t12",
    "title": "Paragraphe 5",
    "fieldset": "s1",
    "group": "contenu",
    "type": "ligneRiche",
    "description": "Texte d’origine : « Vos informations servent uniquement à vous répondre. Voir notre politique de confidentialité »"
   },
   {
    "name": "t13",
    "title": "Bouton",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Envoyer le message »"
   },
   {
    "name": "t14",
    "title": "Titre",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Merci, votre message est bien parti. »"
   },
   {
    "name": "t15",
    "title": "Paragraphe 6",
    "fieldset": "s1",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « L’atelier vous répond personnellement sous 2 à 5 jours ouvrés, à l’adresse e-mail indiquée. »"
   },
   {
    "name": "t16",
    "title": "Paragraphe 7",
    "fieldset": "s1",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Le message n’a pas pu être envoyé. Vérifiez votre adresse e-mail puis réessayez, ou écrivez-nous directement à contact@damedetours.com. »"
   },
   {
    "name": "seoTitle",
    "title": "Titre pour Google",
    "type": "string",
    "group": "google",
    "description": "Vide = titre actuel de la page. Idéalement 50 à 60 caractères."
   },
   {
    "name": "seoDescription",
    "title": "Description pour Google",
    "type": "text",
    "rows": 3,
    "group": "google",
    "description": "Vide = description actuelle. Idéalement 120 à 155 caractères."
   }
  ],
  "preview": {}
 },
 {
  "name": "page_actualites",
  "title": "Actualités (page liste)",
  "type": "document",
  "__group": "pages",
  "__key": "actualites",
  "groups": [
   {
    "name": "contenu",
    "title": "Contenu",
    "default": true
   },
   {
    "name": "google",
    "title": "Google"
   }
  ],
  "fieldsets": [
   {
    "name": "s1",
    "title": "Actualités",
    "options": {
     "collapsible": true,
     "collapsed": false
    }
   }
  ],
  "fields": [
   {
    "name": "t1",
    "title": "Grand titre",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Actualités »"
   },
   {
    "name": "t2",
    "title": "Paragraphe",
    "fieldset": "s1",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Concours, lancements, expositions : les dernières nouvelles de l’atelier Dame de Tours. »"
   },
   {
    "name": "seoTitle",
    "title": "Titre pour Google",
    "type": "string",
    "group": "google",
    "description": "Vide = titre actuel de la page. Idéalement 50 à 60 caractères."
   },
   {
    "name": "seoDescription",
    "title": "Description pour Google",
    "type": "text",
    "rows": 3,
    "group": "google",
    "description": "Vide = description actuelle. Idéalement 120 à 155 caractères."
   }
  ],
  "preview": {}
 },
 {
  "name": "page_ancolie_noir",
  "title": "Ancolie Noir",
  "type": "document",
  "__group": "produits",
  "__key": "ancolie-noir",
  "groups": [
   {
    "name": "contenu",
    "title": "Contenu",
    "default": true
   },
   {
    "name": "google",
    "title": "Google"
   }
  ],
  "fieldsets": [
   {
    "name": "s1",
    "title": "Ancolie Noir",
    "options": {
     "collapsible": true,
     "collapsed": false
    }
   },
   {
    "name": "s2",
    "title": "Caractéristiques",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "s3",
    "title": "Coffret, livraison et sécurité",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "s4",
    "title": "Les autres finitions",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   }
  ],
  "fields": [
   {
    "name": "i1",
    "title": "Photo : Échiquier Ancolie Noir vu de trois quarts, pièces ",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-noir-vue.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier Ancolie Noir vu de trois quarts, pièces en place. »"
     }
    ]
   },
   {
    "name": "i2",
    "title": "Photo (ancolie-noir-vue.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-noir-vue.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i3",
    "title": "Photo (ancolie-noir-vue.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-noir-vue.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "t4",
    "title": "Texte",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « 3D »"
   },
   {
    "name": "i5",
    "title": "Photo (ancolie-noir-gravure.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-noir-gravure.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i6",
    "title": "Photo (ancolie-noir-dessus.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-noir-dessus.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i7",
    "title": "Photo (ancolie-noir-angle.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-noir-angle.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i8",
    "title": "Photo (ancolie-noir-dessous.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-noir-dessous.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i9",
    "title": "Photo (ancolie-noir-face.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-noir-face.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i10",
    "title": "Photo (ancolie-noir-coin.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-noir-coin.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i11",
    "title": "Photo (ancolie-pieces-blanches.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-pieces-blanches.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i12",
    "title": "Photo (ancolie-pieces-noires.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-pieces-noires.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "t13",
    "title": "Grand titre",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Ancolie Noir »"
   },
   {
    "name": "t14",
    "title": "Paragraphe",
    "fieldset": "s1",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Jeu d’échecs — Collection “Ancolie” »"
   },
   {
    "name": "t15",
    "title": "Paragraphe 2",
    "fieldset": "s1",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Dans sa version Noir, le jeu d’échecs Ancolie révèle toute sa profondeur. Les contrastes sont francs, les silhouettes se détachent, et son … »"
   },
   {
    "name": "t16",
    "title": "Texte 2",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Finition »"
   },
   {
    "name": "i17",
    "title": "Photo (ancolie-la-chute-des-anges.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-la-chute-des-anges.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "t18",
    "title": "Texte 3",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « La Chute des Anges »"
   },
   {
    "name": "i19",
    "title": "Photo (ancolie-blanc.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-blanc.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "t20",
    "title": "Texte 4",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Blanc »"
   },
   {
    "name": "i21",
    "title": "Photo (ancolie-noir.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-noir.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "t22",
    "title": "Texte 5",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Noir »"
   },
   {
    "name": "t23",
    "title": "Texte 6",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Ajouter au panier »"
   },
   {
    "name": "t24",
    "title": "Texte 7",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Conçu, fabriqué et assemblé à Tours »"
   },
   {
    "name": "t25",
    "title": "Texte 8",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Exemplaire numéroté et certifié »"
   },
   {
    "name": "t26",
    "title": "Texte 9",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Plateau et pièces aimantés »"
   },
   {
    "name": "t27",
    "title": "Titre",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Caractéristiques »"
   },
   {
    "name": "i28",
    "title": "Photo : Bord du plateau Ancolie Noir gravé « Dame de Tours",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-noir-gravure.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Bord du plateau Ancolie Noir gravé « Dame de Tours », pièces blanches en arrière-plan. »"
     }
    ]
   },
   {
    "name": "i29",
    "title": "Photo : Photo des pièces blanches Ancolie sur le plateau :",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-pieces-1.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Photo des pièces blanches Ancolie sur le plateau : tour, cavalier, fou. »"
     }
    ]
   },
   {
    "name": "i30",
    "title": "Photo : Pièces de la Collection Ancolie photographiées à l",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-pieces-2.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Pièces de la Collection Ancolie photographiées à l'atelier, détail des finitions. »"
     }
    ]
   },
   {
    "name": "i31",
    "title": "Photo : Pièces Ancolie en situation de jeu sur le plateau,",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-pieces-3.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Pièces Ancolie en situation de jeu sur le plateau, photo réelle. »"
     }
    ]
   },
   {
    "name": "t32",
    "title": "Terme",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Plateau »"
   },
   {
    "name": "t33",
    "title": "Valeur",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Bois durable recouvert d’acier magnétique »"
   },
   {
    "name": "t34",
    "title": "Terme 2",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Dimensions »"
   },
   {
    "name": "t35",
    "title": "Valeur 2",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « 40 × 40 cm »"
   },
   {
    "name": "t36",
    "title": "Terme 3",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Revêtement »"
   },
   {
    "name": "t37",
    "title": "Valeur 3",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Cuir vegan, résistant à l’abrasion, impression haute définition »"
   },
   {
    "name": "t38",
    "title": "Terme 4",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Finitions »"
   },
   {
    "name": "t39",
    "title": "Valeur 4",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « 64 clous ornementaux, 4 pieds en acier »"
   },
   {
    "name": "t40",
    "title": "Terme 5",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Pièces »"
   },
   {
    "name": "t41",
    "title": "Valeur 5",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « 32 pièces exclusives Dame de Tours, résine ABS peintes et vernies à la main »"
   },
   {
    "name": "t42",
    "title": "Terme 6",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Poids »"
   },
   {
    "name": "t43",
    "title": "Valeur 6",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Environ 3,8 kg »"
   },
   {
    "name": "t44",
    "title": "Titre (invisible, lu par Google et les lecteurs d’écran)",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Coffret, livraison et sécurité »"
   },
   {
    "name": "t45",
    "title": "Sous-titre",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Contenu du coffret »"
   },
   {
    "name": "t46",
    "title": "Élément de liste",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Un plateau d’échecs Ancolie Noir »"
   },
   {
    "name": "t47",
    "title": "Élément de liste 2",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Un set complet de 16 pièces blanches et 16 pièces noires »"
   },
   {
    "name": "t48",
    "title": "Élément de liste 3",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Un jeton Dame de Tours qui déterminera le joueur blanc »"
   },
   {
    "name": "t49",
    "title": "Élément de liste 4",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Deux sachets de rangement Dame de Tours »"
   },
   {
    "name": "t50",
    "title": "Élément de liste 5",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Un certificat d’authenticité avec le numéro de série de votre exemplaire »"
   },
   {
    "name": "t51",
    "title": "Élément de liste 6",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Une boîte aimantée noire à finition satinée »"
   },
   {
    "name": "t52",
    "title": "Élément de liste 7",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Un cadeau exclusif Dame de Tours pour les précommandes »"
   },
   {
    "name": "t53",
    "title": "Sous-titre 2",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Livraison »"
   },
   {
    "name": "t54",
    "title": "Paragraphe",
    "fieldset": "s3",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Livraison offerte dans toute la France, en 3 à 5 jours ouvrés. »"
   },
   {
    "name": "t55",
    "title": "Paragraphe 2",
    "fieldset": "s3",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Vous recevez un e-mail dès l’expédition de votre commande. »"
   },
   {
    "name": "t56",
    "title": "Paragraphe 3",
    "fieldset": "s3",
    "group": "contenu",
    "type": "ligneRiche",
    "description": "Texte d’origine : « Zones desservies, délais et suivi : consultez notre politique d’expédition. »"
   },
   {
    "name": "t57",
    "title": "Sous-titre 3",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Sécurité et utilisation »"
   },
   {
    "name": "t58",
    "title": "Paragraphe 4",
    "fieldset": "s3",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Certaines pièces présentent des éléments fins ou pointus pouvant provoquer des blessures en cas de mauvaise manipulation. »"
   },
   {
    "name": "t59",
    "title": "Élément de liste 8",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Tenir hors de portée des enfants de moins de 14 ans »"
   },
   {
    "name": "t60",
    "title": "Élément de liste 9",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Ne pas porter à la bouche »"
   },
   {
    "name": "t61",
    "title": "Élément de liste 10",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Ne pas utiliser comme projectile »"
   },
   {
    "name": "t62",
    "title": "Élément de liste 11",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Utiliser sur une surface stable et adaptée »"
   },
   {
    "name": "i63",
    "title": "Photo : Coffret Dame de Tours ouvert : échiquier Ancolie, ",
    "fieldset": "s3",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-coffret.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Coffret Dame de Tours ouvert : échiquier Ancolie, pièces et deux sachets de rangement. »"
     }
    ]
   },
   {
    "name": "t64",
    "title": "Titre",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Les autres finitions »"
   },
   {
    "name": "t65",
    "title": "Lien",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Voir toute la collection Ancolie »"
   },
   {
    "name": "i66",
    "title": "Photo : Échiquier La Chute des Anges : plateau aux veines ",
    "fieldset": "s4",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-la-chute-des-anges.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier La Chute des Anges : plateau aux veines grises façon marbre, pièces noires et blanches. »"
     }
    ]
   },
   {
    "name": "t67",
    "title": "Paragraphe",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Collection “Ancolie” »"
   },
   {
    "name": "i68",
    "title": "Photo : Échiquier Blanc : plateau blanc, damier noir et bl",
    "fieldset": "s4",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-blanc.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier Blanc : plateau blanc, damier noir et blanc, pièces noires et blanches. »"
     }
    ]
   },
   {
    "name": "i69",
    "title": "Photo : Échiquier personnalisé en 3D : damier bleu nuit et",
    "fieldset": "s4",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (personnaliseur-carte.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier personnalisé en 3D : damier bleu nuit et blanc, pièces bleues et argentées »"
     }
    ]
   },
   {
    "name": "t70",
    "title": "Texte",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « 26 teintes »"
   },
   {
    "name": "t71",
    "title": "Sous-titre",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Créez le vôtre »"
   },
   {
    "name": "t72",
    "title": "Paragraphe 2",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « dès 249 € »"
   },
   {
    "name": "t73",
    "title": "Paragraphe 3",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Plateau, damier, pièces, gravure : 9 étapes en ligne »"
   },
   {
    "name": "t74",
    "title": "Texte 2",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Ouvrir le personnaliseur »"
   },
   {
    "name": "seoTitle",
    "title": "Titre pour Google",
    "type": "string",
    "group": "google",
    "description": "Vide = titre actuel de la page. Idéalement 50 à 60 caractères."
   },
   {
    "name": "seoDescription",
    "title": "Description pour Google",
    "type": "text",
    "rows": 3,
    "group": "google",
    "description": "Vide = description actuelle. Idéalement 120 à 155 caractères."
   }
  ],
  "preview": {}
 },
 {
  "name": "page_ancolie_blanc",
  "title": "Ancolie Blanc",
  "type": "document",
  "__group": "produits",
  "__key": "ancolie-blanc",
  "groups": [
   {
    "name": "contenu",
    "title": "Contenu",
    "default": true
   },
   {
    "name": "google",
    "title": "Google"
   }
  ],
  "fieldsets": [
   {
    "name": "s1",
    "title": "Ancolie Blanc",
    "options": {
     "collapsible": true,
     "collapsed": false
    }
   },
   {
    "name": "s2",
    "title": "Caractéristiques",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "s3",
    "title": "Coffret, livraison et sécurité",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "s4",
    "title": "Les autres finitions",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   }
  ],
  "fields": [
   {
    "name": "i1",
    "title": "Photo : Échiquier Ancolie Blanc vu de trois quarts, pièces",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-blanc-vue.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier Ancolie Blanc vu de trois quarts, pièces en place. »"
     }
    ]
   },
   {
    "name": "i2",
    "title": "Photo (ancolie-blanc-vue.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-blanc-vue.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i3",
    "title": "Photo (ancolie-blanc-vue.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-blanc-vue.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "t4",
    "title": "Texte",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « 3D »"
   },
   {
    "name": "i5",
    "title": "Photo (ancolie-blanc-gravure.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-blanc-gravure.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i6",
    "title": "Photo (ancolie-blanc-dessus.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-blanc-dessus.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i7",
    "title": "Photo (ancolie-blanc-angle.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-blanc-angle.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i8",
    "title": "Photo (ancolie-blanc-dessous.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-blanc-dessous.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i9",
    "title": "Photo (ancolie-blanc-face.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-blanc-face.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i10",
    "title": "Photo (ancolie-blanc-coin.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-blanc-coin.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i11",
    "title": "Photo (ancolie-pieces-blanches.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-pieces-blanches.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i12",
    "title": "Photo (ancolie-pieces-noires.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-pieces-noires.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "t13",
    "title": "Grand titre",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Ancolie Blanc »"
   },
   {
    "name": "t14",
    "title": "Paragraphe",
    "fieldset": "s1",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Jeu d’échecs — Collection “Ancolie” »"
   },
   {
    "name": "t15",
    "title": "Paragraphe 2",
    "fieldset": "s1",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Dans sa version Blanc, le jeu d’échecs Ancolie révèle sa pureté. Les silhouettes semblent baignées de clarté, les contrastes se font plus s… »"
   },
   {
    "name": "t16",
    "title": "Texte 2",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Finition »"
   },
   {
    "name": "i17",
    "title": "Photo (ancolie-la-chute-des-anges.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-la-chute-des-anges.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "t18",
    "title": "Texte 3",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « La Chute des Anges »"
   },
   {
    "name": "i19",
    "title": "Photo (ancolie-blanc.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-blanc.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "t20",
    "title": "Texte 4",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Blanc »"
   },
   {
    "name": "i21",
    "title": "Photo (ancolie-noir.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-noir.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "t22",
    "title": "Texte 5",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Noir »"
   },
   {
    "name": "t23",
    "title": "Texte 6",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Ajouter au panier »"
   },
   {
    "name": "t24",
    "title": "Texte 7",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Conçu, fabriqué et assemblé à Tours »"
   },
   {
    "name": "t25",
    "title": "Texte 8",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Exemplaire numéroté et certifié »"
   },
   {
    "name": "t26",
    "title": "Texte 9",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Plateau et pièces aimantés »"
   },
   {
    "name": "t27",
    "title": "Titre",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Caractéristiques »"
   },
   {
    "name": "i28",
    "title": "Photo : Bordure en cuir vegan du plateau Ancolie Blanc et ",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-blanc-detail.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Bordure en cuir vegan du plateau Ancolie Blanc et clou ornemental, pièces en arrière-plan. »"
     }
    ]
   },
   {
    "name": "i29",
    "title": "Photo : Photo des pièces blanches Ancolie sur le plateau :",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-pieces-1.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Photo des pièces blanches Ancolie sur le plateau : tour, cavalier, fou. »"
     }
    ]
   },
   {
    "name": "i30",
    "title": "Photo : Pièces de la Collection Ancolie photographiées à l",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-pieces-2.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Pièces de la Collection Ancolie photographiées à l'atelier, détail des finitions. »"
     }
    ]
   },
   {
    "name": "i31",
    "title": "Photo : Pièces Ancolie en situation de jeu sur le plateau,",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-pieces-3.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Pièces Ancolie en situation de jeu sur le plateau, photo réelle. »"
     }
    ]
   },
   {
    "name": "t32",
    "title": "Terme",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Plateau »"
   },
   {
    "name": "t33",
    "title": "Valeur",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Bois durable recouvert d’acier magnétique »"
   },
   {
    "name": "t34",
    "title": "Terme 2",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Dimensions »"
   },
   {
    "name": "t35",
    "title": "Valeur 2",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « 40 × 40 cm »"
   },
   {
    "name": "t36",
    "title": "Terme 3",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Revêtement »"
   },
   {
    "name": "t37",
    "title": "Valeur 3",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Cuir vegan, résistant à l’abrasion, impression haute définition »"
   },
   {
    "name": "t38",
    "title": "Terme 4",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Finitions »"
   },
   {
    "name": "t39",
    "title": "Valeur 4",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « 64 clous ornementaux, 4 pieds en acier »"
   },
   {
    "name": "t40",
    "title": "Terme 5",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Pièces »"
   },
   {
    "name": "t41",
    "title": "Valeur 5",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « 32 pièces exclusives Dame de Tours, résine ABS peintes et vernies à la main »"
   },
   {
    "name": "t42",
    "title": "Terme 6",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Poids »"
   },
   {
    "name": "t43",
    "title": "Valeur 6",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Environ 3,8 kg »"
   },
   {
    "name": "t44",
    "title": "Titre (invisible, lu par Google et les lecteurs d’écran)",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Coffret, livraison et sécurité »"
   },
   {
    "name": "t45",
    "title": "Sous-titre",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Contenu du coffret »"
   },
   {
    "name": "t46",
    "title": "Élément de liste",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Un plateau d’échecs Ancolie Blanc »"
   },
   {
    "name": "t47",
    "title": "Élément de liste 2",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Un set complet de 16 pièces blanches et 16 pièces noires »"
   },
   {
    "name": "t48",
    "title": "Élément de liste 3",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Un jeton Dame de Tours qui déterminera le joueur blanc »"
   },
   {
    "name": "t49",
    "title": "Élément de liste 4",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Deux sachets de rangement Dame de Tours »"
   },
   {
    "name": "t50",
    "title": "Élément de liste 5",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Un certificat d’authenticité avec le numéro de série de votre exemplaire »"
   },
   {
    "name": "t51",
    "title": "Élément de liste 6",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Une boîte aimantée noire à finition satinée »"
   },
   {
    "name": "t52",
    "title": "Élément de liste 7",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Un cadeau exclusif Dame de Tours pour les précommandes »"
   },
   {
    "name": "t53",
    "title": "Sous-titre 2",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Livraison »"
   },
   {
    "name": "t54",
    "title": "Paragraphe",
    "fieldset": "s3",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Livraison offerte dans toute la France, en 3 à 5 jours ouvrés. »"
   },
   {
    "name": "t55",
    "title": "Paragraphe 2",
    "fieldset": "s3",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Vous recevez un e-mail dès l’expédition de votre commande. »"
   },
   {
    "name": "t56",
    "title": "Paragraphe 3",
    "fieldset": "s3",
    "group": "contenu",
    "type": "ligneRiche",
    "description": "Texte d’origine : « Zones desservies, délais et suivi : consultez notre politique d’expédition. »"
   },
   {
    "name": "t57",
    "title": "Sous-titre 3",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Sécurité et utilisation »"
   },
   {
    "name": "t58",
    "title": "Paragraphe 4",
    "fieldset": "s3",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Certaines pièces présentent des éléments fins ou pointus pouvant provoquer des blessures en cas de mauvaise manipulation. »"
   },
   {
    "name": "t59",
    "title": "Élément de liste 8",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Tenir hors de portée des enfants de moins de 14 ans »"
   },
   {
    "name": "t60",
    "title": "Élément de liste 9",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Ne pas porter à la bouche »"
   },
   {
    "name": "t61",
    "title": "Élément de liste 10",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Ne pas utiliser comme projectile »"
   },
   {
    "name": "t62",
    "title": "Élément de liste 11",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Utiliser sur une surface stable et adaptée »"
   },
   {
    "name": "i63",
    "title": "Photo : Coffret Dame de Tours ouvert : échiquier Ancolie, ",
    "fieldset": "s3",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-coffret.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Coffret Dame de Tours ouvert : échiquier Ancolie, pièces et deux sachets de rangement. »"
     }
    ]
   },
   {
    "name": "t64",
    "title": "Titre",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Les autres finitions »"
   },
   {
    "name": "t65",
    "title": "Lien",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Voir toute la collection Ancolie »"
   },
   {
    "name": "i66",
    "title": "Photo : Échiquier La Chute des Anges : plateau aux veines ",
    "fieldset": "s4",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-la-chute-des-anges.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier La Chute des Anges : plateau aux veines grises façon marbre, pièces noires et blanches. »"
     }
    ]
   },
   {
    "name": "t67",
    "title": "Paragraphe",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Collection “Ancolie” »"
   },
   {
    "name": "i68",
    "title": "Photo : Échiquier Noir : plateau noir, damier noir et blan",
    "fieldset": "s4",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-noir.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier Noir : plateau noir, damier noir et blanc, pièces noires et blanches. »"
     }
    ]
   },
   {
    "name": "i69",
    "title": "Photo : Échiquier personnalisé en 3D : damier bleu nuit et",
    "fieldset": "s4",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (personnaliseur-carte.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier personnalisé en 3D : damier bleu nuit et blanc, pièces bleues et argentées »"
     }
    ]
   },
   {
    "name": "t70",
    "title": "Texte",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « 26 teintes »"
   },
   {
    "name": "t71",
    "title": "Sous-titre",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Créez le vôtre »"
   },
   {
    "name": "t72",
    "title": "Paragraphe 2",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « dès 249 € »"
   },
   {
    "name": "t73",
    "title": "Paragraphe 3",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Plateau, damier, pièces, gravure : 9 étapes en ligne »"
   },
   {
    "name": "t74",
    "title": "Texte 2",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Ouvrir le personnaliseur »"
   },
   {
    "name": "seoTitle",
    "title": "Titre pour Google",
    "type": "string",
    "group": "google",
    "description": "Vide = titre actuel de la page. Idéalement 50 à 60 caractères."
   },
   {
    "name": "seoDescription",
    "title": "Description pour Google",
    "type": "text",
    "rows": 3,
    "group": "google",
    "description": "Vide = description actuelle. Idéalement 120 à 155 caractères."
   }
  ],
  "preview": {}
 },
 {
  "name": "page_ancolie_la_chute_des_anges",
  "title": "La Chute des Anges",
  "type": "document",
  "__group": "produits",
  "__key": "ancolie-la-chute-des-anges",
  "groups": [
   {
    "name": "contenu",
    "title": "Contenu",
    "default": true
   },
   {
    "name": "google",
    "title": "Google"
   }
  ],
  "fieldsets": [
   {
    "name": "s1",
    "title": "La Chute des Anges",
    "options": {
     "collapsible": true,
     "collapsed": false
    }
   },
   {
    "name": "s2",
    "title": "Caractéristiques",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "s3",
    "title": "Coffret, livraison et sécurité",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "s4",
    "title": "Les autres finitions",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   }
  ],
  "fields": [
   {
    "name": "i1",
    "title": "Photo : Échiquier La Chute des Anges vu de trois quarts, p",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-chute-vue.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier La Chute des Anges vu de trois quarts, pièces en place. »"
     }
    ]
   },
   {
    "name": "i2",
    "title": "Photo (ancolie-chute-vue.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-chute-vue.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i3",
    "title": "Photo (ancolie-chute-vue.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-chute-vue.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "t4",
    "title": "Texte",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « 3D »"
   },
   {
    "name": "i5",
    "title": "Photo (ancolie-chute-gravure.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-chute-gravure.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i6",
    "title": "Photo (ancolie-chute-dessus.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-chute-dessus.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i7",
    "title": "Photo (ancolie-chute-angle.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-chute-angle.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i8",
    "title": "Photo (ancolie-chute-dessous.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-chute-dessous.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i9",
    "title": "Photo (ancolie-chute-face.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-chute-face.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i10",
    "title": "Photo (ancolie-chute-coin.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-chute-coin.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i11",
    "title": "Photo (ancolie-pieces-blanches.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-pieces-blanches.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i12",
    "title": "Photo (ancolie-pieces-noires.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-pieces-noires.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "t13",
    "title": "Grand titre",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « La Chute des Anges »"
   },
   {
    "name": "t14",
    "title": "Paragraphe",
    "fieldset": "s1",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Jeu d’échecs — Collection “Ancolie” »"
   },
   {
    "name": "t15",
    "title": "Paragraphe 2",
    "fieldset": "s1",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Déclinée en série limitée à partir de la collection Ancolie, cette édition rend hommage à l’univers visionnaire de Gustave Doré. Elle trans… »"
   },
   {
    "name": "t16",
    "title": "Texte 2",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Finition »"
   },
   {
    "name": "i17",
    "title": "Photo (ancolie-la-chute-des-anges.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-la-chute-des-anges.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "i18",
    "title": "Photo (ancolie-blanc.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-blanc.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "t19",
    "title": "Texte 3",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Blanc »"
   },
   {
    "name": "i20",
    "title": "Photo (ancolie-noir.webp)",
    "fieldset": "s1",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-noir.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo"
     }
    ]
   },
   {
    "name": "t21",
    "title": "Texte 4",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Noir »"
   },
   {
    "name": "t22",
    "title": "Texte 5",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Ajouter au panier »"
   },
   {
    "name": "t23",
    "title": "Texte 6",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Conçu, fabriqué et assemblé à Tours »"
   },
   {
    "name": "t24",
    "title": "Texte 7",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Exemplaire numéroté et certifié »"
   },
   {
    "name": "t25",
    "title": "Texte 8",
    "fieldset": "s1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Plateau et pièces aimantés »"
   },
   {
    "name": "t26",
    "title": "Titre",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Caractéristiques »"
   },
   {
    "name": "i27",
    "title": "Photo : Bordure du plateau La Chute des Anges ornée de clo",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-plateau-3.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Bordure du plateau La Chute des Anges ornée de clous, pièces en arrière-plan. »"
     }
    ]
   },
   {
    "name": "i28",
    "title": "Photo : Photo des pièces blanches Ancolie sur le plateau :",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-pieces-1.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Photo des pièces blanches Ancolie sur le plateau : tour, cavalier, fou. »"
     }
    ]
   },
   {
    "name": "i29",
    "title": "Photo : Pièces de la Collection Ancolie photographiées à l",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-pieces-2.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Pièces de la Collection Ancolie photographiées à l'atelier, détail des finitions. »"
     }
    ]
   },
   {
    "name": "i30",
    "title": "Photo : Pièces Ancolie en situation de jeu sur le plateau,",
    "fieldset": "s2",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-pieces-3.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Pièces Ancolie en situation de jeu sur le plateau, photo réelle. »"
     }
    ]
   },
   {
    "name": "t31",
    "title": "Terme",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Plateau »"
   },
   {
    "name": "t32",
    "title": "Valeur",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Bois durable recouvert d’acier magnétique »"
   },
   {
    "name": "t33",
    "title": "Terme 2",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Dimensions »"
   },
   {
    "name": "t34",
    "title": "Valeur 2",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « 40 × 40 cm »"
   },
   {
    "name": "t35",
    "title": "Terme 3",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Revêtement »"
   },
   {
    "name": "t36",
    "title": "Valeur 3",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Cuir vegan, résistant à l’abrasion, impression haute définition »"
   },
   {
    "name": "t37",
    "title": "Terme 4",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Finitions »"
   },
   {
    "name": "t38",
    "title": "Valeur 4",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « 64 clous ornementaux, 4 pieds en acier »"
   },
   {
    "name": "t39",
    "title": "Terme 5",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Pièces »"
   },
   {
    "name": "t40",
    "title": "Valeur 5",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « 32 pièces exclusives Dame de Tours, résine ABS peintes et vernies à la main »"
   },
   {
    "name": "t41",
    "title": "Terme 6",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Poids »"
   },
   {
    "name": "t42",
    "title": "Valeur 6",
    "fieldset": "s2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Environ 3,8 kg »"
   },
   {
    "name": "t43",
    "title": "Titre (invisible, lu par Google et les lecteurs d’écran)",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Coffret, livraison et sécurité »"
   },
   {
    "name": "t44",
    "title": "Sous-titre",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Contenu du coffret »"
   },
   {
    "name": "t45",
    "title": "Élément de liste",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Un plateau d’échecs Ancolie « La Chute des Anges » »"
   },
   {
    "name": "t46",
    "title": "Élément de liste 2",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Un set complet de 16 pièces blanches et 16 pièces noires »"
   },
   {
    "name": "t47",
    "title": "Élément de liste 3",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Un jeton Dame de Tours qui déterminera le joueur blanc »"
   },
   {
    "name": "t48",
    "title": "Élément de liste 4",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Deux sachets de rangement Dame de Tours »"
   },
   {
    "name": "t49",
    "title": "Élément de liste 5",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Un certificat d’authenticité avec le numéro de série de votre exemplaire »"
   },
   {
    "name": "t50",
    "title": "Élément de liste 6",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Une boîte aimantée noire à finition satinée »"
   },
   {
    "name": "t51",
    "title": "Élément de liste 7",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Un cadeau exclusif Dame de Tours pour les précommandes »"
   },
   {
    "name": "t52",
    "title": "Sous-titre 2",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Livraison »"
   },
   {
    "name": "t53",
    "title": "Paragraphe",
    "fieldset": "s3",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Livraison offerte dans toute la France, en 3 à 5 jours ouvrés. »"
   },
   {
    "name": "t54",
    "title": "Paragraphe 2",
    "fieldset": "s3",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Vous recevez un e-mail dès l’expédition de votre commande. »"
   },
   {
    "name": "t55",
    "title": "Paragraphe 3",
    "fieldset": "s3",
    "group": "contenu",
    "type": "ligneRiche",
    "description": "Texte d’origine : « Zones desservies, délais et suivi : consultez notre politique d’expédition. »"
   },
   {
    "name": "t56",
    "title": "Sous-titre 3",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Sécurité et utilisation »"
   },
   {
    "name": "t57",
    "title": "Paragraphe 4",
    "fieldset": "s3",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Certaines pièces présentent des éléments fins ou pointus pouvant provoquer des blessures en cas de mauvaise manipulation. »"
   },
   {
    "name": "t58",
    "title": "Élément de liste 8",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Tenir hors de portée des enfants de moins de 14 ans »"
   },
   {
    "name": "t59",
    "title": "Élément de liste 9",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Ne pas porter à la bouche »"
   },
   {
    "name": "t60",
    "title": "Élément de liste 10",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Ne pas utiliser comme projectile »"
   },
   {
    "name": "t61",
    "title": "Élément de liste 11",
    "fieldset": "s3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Utiliser sur une surface stable et adaptée »"
   },
   {
    "name": "i62",
    "title": "Photo : Coffret Dame de Tours ouvert : échiquier Ancolie, ",
    "fieldset": "s3",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-coffret.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Coffret Dame de Tours ouvert : échiquier Ancolie, pièces et deux sachets de rangement. »"
     }
    ]
   },
   {
    "name": "t63",
    "title": "Titre",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Les autres finitions »"
   },
   {
    "name": "t64",
    "title": "Lien",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Voir toute la collection Ancolie »"
   },
   {
    "name": "i65",
    "title": "Photo : Échiquier Blanc : plateau blanc, damier noir et bl",
    "fieldset": "s4",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-blanc.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier Blanc : plateau blanc, damier noir et blanc, pièces noires et blanches. »"
     }
    ]
   },
   {
    "name": "t66",
    "title": "Paragraphe",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Collection “Ancolie” »"
   },
   {
    "name": "i67",
    "title": "Photo : Échiquier Noir : plateau noir, damier noir et blan",
    "fieldset": "s4",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (ancolie-noir.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier Noir : plateau noir, damier noir et blanc, pièces noires et blanches. »"
     }
    ]
   },
   {
    "name": "i68",
    "title": "Photo : Échiquier personnalisé en 3D : damier bleu nuit et",
    "fieldset": "s4",
    "group": "contenu",
    "type": "image",
    "options": {
     "hotspot": true
    },
    "description": "Laisser vide pour garder la photo actuelle (personnaliseur-carte.webp).",
    "fields": [
     {
      "name": "alt",
      "type": "string",
      "title": "Description de la photo",
      "description": "Actuelle : « Échiquier personnalisé en 3D : damier bleu nuit et blanc, pièces bleues et argentées »"
     }
    ]
   },
   {
    "name": "t69",
    "title": "Texte",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « 26 teintes »"
   },
   {
    "name": "t70",
    "title": "Sous-titre",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Créez le vôtre »"
   },
   {
    "name": "t71",
    "title": "Paragraphe 2",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « dès 249 € »"
   },
   {
    "name": "t72",
    "title": "Paragraphe 3",
    "fieldset": "s4",
    "group": "contenu",
    "type": "text",
    "rows": 3,
    "description": "Texte d’origine : « Plateau, damier, pièces, gravure : 9 étapes en ligne »"
   },
   {
    "name": "t73",
    "title": "Texte 2",
    "fieldset": "s4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Ouvrir le personnaliseur »"
   },
   {
    "name": "seoTitle",
    "title": "Titre pour Google",
    "type": "string",
    "group": "google",
    "description": "Vide = titre actuel de la page. Idéalement 50 à 60 caractères."
   },
   {
    "name": "seoDescription",
    "title": "Description pour Google",
    "type": "text",
    "rows": 3,
    "group": "google",
    "description": "Vide = description actuelle. Idéalement 120 à 155 caractères."
   }
  ],
  "preview": {}
 },
 {
  "name": "page_conditions_generales_de_vente",
  "title": "Conditions générales de vente",
  "type": "document",
  "__group": "legal",
  "__key": "conditions-generales-de-vente",
  "groups": [
   {
    "name": "contenu",
    "title": "Contenu",
    "default": true
   },
   {
    "name": "google",
    "title": "Google"
   }
  ],
  "fieldsets": [
   {
    "name": "entete",
    "title": "En-tête et introduction",
    "options": {
     "collapsible": true,
     "collapsed": false
    }
   },
   {
    "name": "a1",
    "title": "Article 1 : Objet",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a2",
    "title": "Article 2 : Identification du vendeur",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a3",
    "title": "Article 3 : Produits",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a4",
    "title": "Article 4 : Disponibilité",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a5",
    "title": "Article 5 : Commandes",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a6",
    "title": "Article 6 : Prix",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a7",
    "title": "Article 7 : Conditions de paiement",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a8",
    "title": "Article 8 : Réserve de propriété",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a9",
    "title": "Article 9 : Produits personnalisés",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a10",
    "title": "Article 10 : Validation des BAT",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a11",
    "title": "Article 11 : Responsabilité du client concernant les contenus transmis",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a12",
    "title": "Article 12 : Propriété intellectuelle",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a13",
    "title": "Article 13 : Fabrication artisanale",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a14",
    "title": "Article 14 : Variations admises",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a15",
    "title": "Article 15 : Délais de fabrication et de livraison",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a16",
    "title": "Article 16 : Livraison",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a17",
    "title": "Article 17 : Réception des produits",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a18",
    "title": "Article 18 : Produits manquants ou endommagés",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a19",
    "title": "Article 19 : Âge minimum",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a20",
    "title": "Article 20 : Utilisation normale des produits",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a21",
    "title": "Article 21 : Sécurité et risques liés aux produits",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a22",
    "title": "Article 22 : Fragilité normale des produits",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a23",
    "title": "Article 23 : Vieillissement naturel des matériaux",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a24",
    "title": "Article 24 : Garanties légales",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a25",
    "title": "Article 25 : Garantie Premium",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a26",
    "title": "Article 26 : Limitation de responsabilité",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a27",
    "title": "Article 27 : Exclusion des dommages indirects",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a28",
    "title": "Article 28 : Force majeure",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a29",
    "title": "Article 29 : Clients professionnels",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a30",
    "title": "Article 30 : Revendeurs",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a31",
    "title": "Article 31 : Données personnelles",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a32",
    "title": "Article 32 : Médiation et règlement des litiges",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a33",
    "title": "Article 33 : Droit applicable",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a34",
    "title": "Article 34 : Modification des CGV",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a35",
    "title": "Article 35 : Acceptation",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   }
  ],
  "fields": [
   {
    "name": "t1",
    "title": "Titre de la page",
    "fieldset": "entete",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Conditions générales de vente »"
   },
   {
    "name": "t2",
    "title": "Date de mise à jour",
    "fieldset": "entete",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Dernière mise à jour : 17 juin 2026 »"
   },
   {
    "name": "t3",
    "title": "Titre de l’article",
    "fieldset": "a1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Objet »"
   },
   {
    "name": "t4",
    "title": "Texte de l’article",
    "fieldset": "a1",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t5",
    "title": "Titre de l’article",
    "fieldset": "a2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Identification du vendeur »"
   },
   {
    "name": "t6",
    "title": "Texte de l’article",
    "fieldset": "a2",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t7",
    "title": "Titre de l’article",
    "fieldset": "a3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Produits »"
   },
   {
    "name": "t8",
    "title": "Texte de l’article",
    "fieldset": "a3",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t9",
    "title": "Titre de l’article",
    "fieldset": "a4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Disponibilité »"
   },
   {
    "name": "t10",
    "title": "Texte de l’article",
    "fieldset": "a4",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t11",
    "title": "Titre de l’article",
    "fieldset": "a5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Commandes »"
   },
   {
    "name": "t12",
    "title": "Texte de l’article",
    "fieldset": "a5",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t13",
    "title": "Titre de l’article",
    "fieldset": "a6",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Prix »"
   },
   {
    "name": "t14",
    "title": "Texte de l’article",
    "fieldset": "a6",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t15",
    "title": "Titre de l’article",
    "fieldset": "a7",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Conditions de paiement »"
   },
   {
    "name": "t16",
    "title": "Texte de l’article",
    "fieldset": "a7",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t17",
    "title": "Titre de l’article",
    "fieldset": "a8",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Réserve de propriété »"
   },
   {
    "name": "t18",
    "title": "Texte de l’article",
    "fieldset": "a8",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t19",
    "title": "Titre de l’article",
    "fieldset": "a9",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Produits personnalisés »"
   },
   {
    "name": "t20",
    "title": "Texte de l’article",
    "fieldset": "a9",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t21",
    "title": "Titre de l’article",
    "fieldset": "a10",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Validation des BAT »"
   },
   {
    "name": "t22",
    "title": "Texte de l’article",
    "fieldset": "a10",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t23",
    "title": "Titre de l’article",
    "fieldset": "a11",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Responsabilité du client concernant les contenus transmis »"
   },
   {
    "name": "t24",
    "title": "Texte de l’article",
    "fieldset": "a11",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t25",
    "title": "Titre de l’article",
    "fieldset": "a12",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Propriété intellectuelle »"
   },
   {
    "name": "t26",
    "title": "Texte de l’article",
    "fieldset": "a12",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t27",
    "title": "Titre de l’article",
    "fieldset": "a13",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Fabrication artisanale »"
   },
   {
    "name": "t28",
    "title": "Texte de l’article",
    "fieldset": "a13",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t29",
    "title": "Titre de l’article",
    "fieldset": "a14",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Variations admises »"
   },
   {
    "name": "t30",
    "title": "Texte de l’article",
    "fieldset": "a14",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t31",
    "title": "Titre de l’article",
    "fieldset": "a15",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Délais de fabrication et de livraison »"
   },
   {
    "name": "t32",
    "title": "Texte de l’article",
    "fieldset": "a15",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t33",
    "title": "Titre de l’article",
    "fieldset": "a16",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Livraison »"
   },
   {
    "name": "t34",
    "title": "Texte de l’article",
    "fieldset": "a16",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t35",
    "title": "Titre de l’article",
    "fieldset": "a17",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Réception des produits »"
   },
   {
    "name": "t36",
    "title": "Texte de l’article",
    "fieldset": "a17",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t37",
    "title": "Titre de l’article",
    "fieldset": "a18",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Produits manquants ou endommagés »"
   },
   {
    "name": "t38",
    "title": "Texte de l’article",
    "fieldset": "a18",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t39",
    "title": "Titre de l’article",
    "fieldset": "a19",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Âge minimum »"
   },
   {
    "name": "t40",
    "title": "Texte de l’article",
    "fieldset": "a19",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t41",
    "title": "Titre de l’article",
    "fieldset": "a20",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Utilisation normale des produits »"
   },
   {
    "name": "t42",
    "title": "Texte de l’article",
    "fieldset": "a20",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t43",
    "title": "Titre de l’article",
    "fieldset": "a21",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Sécurité et risques liés aux produits »"
   },
   {
    "name": "t44",
    "title": "Texte de l’article",
    "fieldset": "a21",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t45",
    "title": "Titre de l’article",
    "fieldset": "a22",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Fragilité normale des produits »"
   },
   {
    "name": "t46",
    "title": "Texte de l’article",
    "fieldset": "a22",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t47",
    "title": "Titre de l’article",
    "fieldset": "a23",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Vieillissement naturel des matériaux »"
   },
   {
    "name": "t48",
    "title": "Texte de l’article",
    "fieldset": "a23",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t49",
    "title": "Titre de l’article",
    "fieldset": "a24",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Garanties légales »"
   },
   {
    "name": "t50",
    "title": "Texte de l’article",
    "fieldset": "a24",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t51",
    "title": "Titre de l’article",
    "fieldset": "a25",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Garantie Premium »"
   },
   {
    "name": "t52",
    "title": "Texte de l’article",
    "fieldset": "a25",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t53",
    "title": "Titre de l’article",
    "fieldset": "a26",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Limitation de responsabilité »"
   },
   {
    "name": "t54",
    "title": "Texte de l’article",
    "fieldset": "a26",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t55",
    "title": "Titre de l’article",
    "fieldset": "a27",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Exclusion des dommages indirects »"
   },
   {
    "name": "t56",
    "title": "Texte de l’article",
    "fieldset": "a27",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t57",
    "title": "Titre de l’article",
    "fieldset": "a28",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Force majeure »"
   },
   {
    "name": "t58",
    "title": "Texte de l’article",
    "fieldset": "a28",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t59",
    "title": "Titre de l’article",
    "fieldset": "a29",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Clients professionnels »"
   },
   {
    "name": "t60",
    "title": "Texte de l’article",
    "fieldset": "a29",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t61",
    "title": "Titre de l’article",
    "fieldset": "a30",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Revendeurs »"
   },
   {
    "name": "t62",
    "title": "Texte de l’article",
    "fieldset": "a30",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t63",
    "title": "Titre de l’article",
    "fieldset": "a31",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Données personnelles »"
   },
   {
    "name": "t64",
    "title": "Texte de l’article",
    "fieldset": "a31",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t65",
    "title": "Titre de l’article",
    "fieldset": "a32",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Médiation et règlement des litiges »"
   },
   {
    "name": "t66",
    "title": "Texte de l’article",
    "fieldset": "a32",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t67",
    "title": "Titre de l’article",
    "fieldset": "a33",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Droit applicable »"
   },
   {
    "name": "t68",
    "title": "Texte de l’article",
    "fieldset": "a33",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t69",
    "title": "Titre de l’article",
    "fieldset": "a34",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Modification des CGV »"
   },
   {
    "name": "t70",
    "title": "Texte de l’article",
    "fieldset": "a34",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t71",
    "title": "Titre de l’article",
    "fieldset": "a35",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Acceptation »"
   },
   {
    "name": "t72",
    "title": "Texte de l’article",
    "fieldset": "a35",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "seoTitle",
    "title": "Titre pour Google",
    "type": "string",
    "group": "google",
    "description": "Vide = titre actuel de la page. Idéalement 50 à 60 caractères."
   },
   {
    "name": "seoDescription",
    "title": "Description pour Google",
    "type": "text",
    "rows": 3,
    "group": "google",
    "description": "Vide = description actuelle. Idéalement 120 à 155 caractères."
   }
  ],
  "preview": {}
 },
 {
  "name": "page_livraison",
  "title": "Livraison",
  "type": "document",
  "__group": "legal",
  "__key": "livraison",
  "groups": [
   {
    "name": "contenu",
    "title": "Contenu",
    "default": true
   },
   {
    "name": "google",
    "title": "Google"
   }
  ],
  "fieldsets": [
   {
    "name": "entete",
    "title": "En-tête et introduction",
    "options": {
     "collapsible": true,
     "collapsed": false
    }
   },
   {
    "name": "a1",
    "title": "Article 1 : Zones desservies",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a2",
    "title": "Article 2 : Transporteurs utilisés",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a3",
    "title": "Article 3 : Délais de fabrication",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a4",
    "title": "Article 4 : Délais d'expédition et de livraison",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a5",
    "title": "Article 5 : Validation des projets personnalisés",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a6",
    "title": "Article 6 : Commandes contenant plusieurs produits",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a7",
    "title": "Article 7 : Adresse de livraison",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a8",
    "title": "Article 8 : Livraison avec signature",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a9",
    "title": "Article 9 : Réception des colis",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a10",
    "title": "Article 10 : Colis endommagés",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a11",
    "title": "Article 11 : Colis perdus",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a12",
    "title": "Article 12 : Colis non récupérés",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a13",
    "title": "Article 13 : Refus de livraison",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a14",
    "title": "Article 14 : Force majeure",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a15",
    "title": "Article 15 : Transfert des risques et responsabilité après livraison",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a16",
    "title": "Article 16 : Produits artisanaux et précautions de transport",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a17",
    "title": "Article 17 : Contact",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   }
  ],
  "fields": [
   {
    "name": "t1",
    "title": "Titre de la page",
    "fieldset": "entete",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Politique d’expédition »"
   },
   {
    "name": "t2",
    "title": "Date de mise à jour",
    "fieldset": "entete",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Dernière mise à jour : 17 juin 2026 »"
   },
   {
    "name": "t3",
    "title": "Introduction",
    "fieldset": "entete",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t4",
    "title": "Titre de l’article",
    "fieldset": "a1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Zones desservies »"
   },
   {
    "name": "t5",
    "title": "Texte de l’article",
    "fieldset": "a1",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t6",
    "title": "Titre de l’article",
    "fieldset": "a2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Transporteurs utilisés »"
   },
   {
    "name": "t7",
    "title": "Texte de l’article",
    "fieldset": "a2",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t8",
    "title": "Titre de l’article",
    "fieldset": "a3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Délais de fabrication »"
   },
   {
    "name": "t9",
    "title": "Texte de l’article",
    "fieldset": "a3",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t10",
    "title": "Titre de l’article",
    "fieldset": "a4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Délais d'expédition et de livraison »"
   },
   {
    "name": "t11",
    "title": "Texte de l’article",
    "fieldset": "a4",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t12",
    "title": "Titre de l’article",
    "fieldset": "a5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Validation des projets personnalisés »"
   },
   {
    "name": "t13",
    "title": "Texte de l’article",
    "fieldset": "a5",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t14",
    "title": "Titre de l’article",
    "fieldset": "a6",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Commandes contenant plusieurs produits »"
   },
   {
    "name": "t15",
    "title": "Texte de l’article",
    "fieldset": "a6",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t16",
    "title": "Titre de l’article",
    "fieldset": "a7",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Adresse de livraison »"
   },
   {
    "name": "t17",
    "title": "Texte de l’article",
    "fieldset": "a7",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t18",
    "title": "Titre de l’article",
    "fieldset": "a8",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Livraison avec signature »"
   },
   {
    "name": "t19",
    "title": "Texte de l’article",
    "fieldset": "a8",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t20",
    "title": "Titre de l’article",
    "fieldset": "a9",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Réception des colis »"
   },
   {
    "name": "t21",
    "title": "Texte de l’article",
    "fieldset": "a9",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t22",
    "title": "Titre de l’article",
    "fieldset": "a10",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Colis endommagés »"
   },
   {
    "name": "t23",
    "title": "Texte de l’article",
    "fieldset": "a10",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t24",
    "title": "Titre de l’article",
    "fieldset": "a11",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Colis perdus »"
   },
   {
    "name": "t25",
    "title": "Texte de l’article",
    "fieldset": "a11",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t26",
    "title": "Titre de l’article",
    "fieldset": "a12",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Colis non récupérés »"
   },
   {
    "name": "t27",
    "title": "Texte de l’article",
    "fieldset": "a12",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t28",
    "title": "Titre de l’article",
    "fieldset": "a13",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Refus de livraison »"
   },
   {
    "name": "t29",
    "title": "Texte de l’article",
    "fieldset": "a13",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t30",
    "title": "Titre de l’article",
    "fieldset": "a14",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Force majeure »"
   },
   {
    "name": "t31",
    "title": "Texte de l’article",
    "fieldset": "a14",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t32",
    "title": "Titre de l’article",
    "fieldset": "a15",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Transfert des risques et responsabilité après livraison »"
   },
   {
    "name": "t33",
    "title": "Texte de l’article",
    "fieldset": "a15",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t34",
    "title": "Titre de l’article",
    "fieldset": "a16",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Produits artisanaux et précautions de transport »"
   },
   {
    "name": "t35",
    "title": "Texte de l’article",
    "fieldset": "a16",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t36",
    "title": "Titre de l’article",
    "fieldset": "a17",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Contact »"
   },
   {
    "name": "t37",
    "title": "Texte de l’article",
    "fieldset": "a17",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "seoTitle",
    "title": "Titre pour Google",
    "type": "string",
    "group": "google",
    "description": "Vide = titre actuel de la page. Idéalement 50 à 60 caractères."
   },
   {
    "name": "seoDescription",
    "title": "Description pour Google",
    "type": "text",
    "rows": 3,
    "group": "google",
    "description": "Vide = description actuelle. Idéalement 120 à 155 caractères."
   }
  ],
  "preview": {}
 },
 {
  "name": "page_remboursements",
  "title": "Remboursements",
  "type": "document",
  "__group": "legal",
  "__key": "remboursements",
  "groups": [
   {
    "name": "contenu",
    "title": "Contenu",
    "default": true
   },
   {
    "name": "google",
    "title": "Google"
   }
  ],
  "fieldsets": [
   {
    "name": "entete",
    "title": "En-tête et introduction",
    "options": {
     "collapsible": true,
     "collapsed": false
    }
   },
   {
    "name": "a1",
    "title": "Article 1 : Champ d'application",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a2",
    "title": "Article 2 : Droit de rétractation",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a3",
    "title": "Article 3 : Produits exclus du droit de rétractation",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a4",
    "title": "Article 4 : Conditions générales d'acceptation des retours",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a5",
    "title": "Article 5 : Produits endommagés à la réception",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a6",
    "title": "Article 6 : Plateaux endommagés à la réception",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a7",
    "title": "Article 7 : Pièces d'échecs ou accessoires endommagés à la réception",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a8",
    "title": "Article 8 : Produits manquants",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a9",
    "title": "Article 9 : Vérification des retours",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a10",
    "title": "Article 10 : Représentation des produits",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a11",
    "title": "Article 11 : Nature artisanale des produits",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a12",
    "title": "Article 12 : Variations artisanales non considérées comme des défauts",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a13",
    "title": "Article 13 : Vieillissement naturel des matériaux",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a14",
    "title": "Article 14 : Colis non récupérés ou refusés",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a15",
    "title": "Article 15 : Adresse de livraison erronée",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a16",
    "title": "Article 16 : Expédition des retours",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a17",
    "title": "Article 17 : Ordre de traitement des réclamations",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a18",
    "title": "Article 18 : Utilisation et sécurité",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a19",
    "title": "Article 19 : Garantie Premium",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a20",
    "title": "Article 20 : Dossiers incomplets ou sans réponse",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a21",
    "title": "Article 21 : Contact",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   }
  ],
  "fields": [
   {
    "name": "t1",
    "title": "Titre de la page",
    "fieldset": "entete",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Politique de remboursement »"
   },
   {
    "name": "t2",
    "title": "Date de mise à jour",
    "fieldset": "entete",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Dernière mise à jour : 17 juin 2026 »"
   },
   {
    "name": "t3",
    "title": "Introduction",
    "fieldset": "entete",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t4",
    "title": "Titre de l’article",
    "fieldset": "a1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Champ d'application »"
   },
   {
    "name": "t5",
    "title": "Texte de l’article",
    "fieldset": "a1",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t6",
    "title": "Titre de l’article",
    "fieldset": "a2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Droit de rétractation »"
   },
   {
    "name": "t7",
    "title": "Texte de l’article",
    "fieldset": "a2",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t8",
    "title": "Titre de l’article",
    "fieldset": "a3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Produits exclus du droit de rétractation »"
   },
   {
    "name": "t9",
    "title": "Texte de l’article",
    "fieldset": "a3",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t10",
    "title": "Titre de l’article",
    "fieldset": "a4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Conditions générales d'acceptation des retours »"
   },
   {
    "name": "t11",
    "title": "Texte de l’article",
    "fieldset": "a4",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t12",
    "title": "Titre de l’article",
    "fieldset": "a5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Produits endommagés à la réception »"
   },
   {
    "name": "t13",
    "title": "Texte de l’article",
    "fieldset": "a5",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t14",
    "title": "Titre de l’article",
    "fieldset": "a6",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Plateaux endommagés à la réception »"
   },
   {
    "name": "t15",
    "title": "Texte de l’article",
    "fieldset": "a6",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t16",
    "title": "Titre de l’article",
    "fieldset": "a7",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Pièces d'échecs ou accessoires endommagés à la réception »"
   },
   {
    "name": "t17",
    "title": "Texte de l’article",
    "fieldset": "a7",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t18",
    "title": "Titre de l’article",
    "fieldset": "a8",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Produits manquants »"
   },
   {
    "name": "t19",
    "title": "Texte de l’article",
    "fieldset": "a8",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t20",
    "title": "Titre de l’article",
    "fieldset": "a9",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Vérification des retours »"
   },
   {
    "name": "t21",
    "title": "Texte de l’article",
    "fieldset": "a9",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t22",
    "title": "Titre de l’article",
    "fieldset": "a10",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Représentation des produits »"
   },
   {
    "name": "t23",
    "title": "Texte de l’article",
    "fieldset": "a10",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t24",
    "title": "Titre de l’article",
    "fieldset": "a11",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Nature artisanale des produits »"
   },
   {
    "name": "t25",
    "title": "Texte de l’article",
    "fieldset": "a11",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t26",
    "title": "Titre de l’article",
    "fieldset": "a12",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Variations artisanales non considérées comme des défauts »"
   },
   {
    "name": "t27",
    "title": "Texte de l’article",
    "fieldset": "a12",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t28",
    "title": "Titre de l’article",
    "fieldset": "a13",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Vieillissement naturel des matériaux »"
   },
   {
    "name": "t29",
    "title": "Texte de l’article",
    "fieldset": "a13",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t30",
    "title": "Titre de l’article",
    "fieldset": "a14",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Colis non récupérés ou refusés »"
   },
   {
    "name": "t31",
    "title": "Texte de l’article",
    "fieldset": "a14",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t32",
    "title": "Titre de l’article",
    "fieldset": "a15",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Adresse de livraison erronée »"
   },
   {
    "name": "t33",
    "title": "Texte de l’article",
    "fieldset": "a15",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t34",
    "title": "Titre de l’article",
    "fieldset": "a16",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Expédition des retours »"
   },
   {
    "name": "t35",
    "title": "Texte de l’article",
    "fieldset": "a16",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t36",
    "title": "Titre de l’article",
    "fieldset": "a17",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Ordre de traitement des réclamations »"
   },
   {
    "name": "t37",
    "title": "Texte de l’article",
    "fieldset": "a17",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t38",
    "title": "Titre de l’article",
    "fieldset": "a18",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Utilisation et sécurité »"
   },
   {
    "name": "t39",
    "title": "Texte de l’article",
    "fieldset": "a18",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t40",
    "title": "Titre de l’article",
    "fieldset": "a19",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Garantie Premium »"
   },
   {
    "name": "t41",
    "title": "Texte de l’article",
    "fieldset": "a19",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t42",
    "title": "Titre de l’article",
    "fieldset": "a20",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Dossiers incomplets ou sans réponse »"
   },
   {
    "name": "t43",
    "title": "Texte de l’article",
    "fieldset": "a20",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t44",
    "title": "Titre de l’article",
    "fieldset": "a21",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Contact »"
   },
   {
    "name": "t45",
    "title": "Texte de l’article",
    "fieldset": "a21",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "seoTitle",
    "title": "Titre pour Google",
    "type": "string",
    "group": "google",
    "description": "Vide = titre actuel de la page. Idéalement 50 à 60 caractères."
   },
   {
    "name": "seoDescription",
    "title": "Description pour Google",
    "type": "text",
    "rows": 3,
    "group": "google",
    "description": "Vide = description actuelle. Idéalement 120 à 155 caractères."
   }
  ],
  "preview": {}
 },
 {
  "name": "page_mentions_legales",
  "title": "Mentions légales",
  "type": "document",
  "__group": "legal",
  "__key": "mentions-legales",
  "groups": [
   {
    "name": "contenu",
    "title": "Contenu",
    "default": true
   },
   {
    "name": "google",
    "title": "Google"
   }
  ],
  "fieldsets": [
   {
    "name": "entete",
    "title": "En-tête et introduction",
    "options": {
     "collapsible": true,
     "collapsed": false
    }
   },
   {
    "name": "a1",
    "title": "Article 1 : Éditeur du site",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a2",
    "title": "Article 2 : Hébergement",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a3",
    "title": "Article 3 : Propriété intellectuelle",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a4",
    "title": "Article 4 : Responsabilité",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a5",
    "title": "Article 5 : Liens hypertextes",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a6",
    "title": "Article 6 : Données personnelles",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a7",
    "title": "Article 7 : Cookies",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a8",
    "title": "Article 8 : Droit applicable",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a9",
    "title": "Article 9 : Règlement des litiges en ligne",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a10",
    "title": "Article 10 : Contact",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   }
  ],
  "fields": [
   {
    "name": "t1",
    "title": "Titre de la page",
    "fieldset": "entete",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Mentions légales »"
   },
   {
    "name": "t2",
    "title": "Date de mise à jour",
    "fieldset": "entete",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Dernière mise à jour : 17 juin 2026 »"
   },
   {
    "name": "t3",
    "title": "Titre de l’article",
    "fieldset": "a1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Éditeur du site »"
   },
   {
    "name": "t4",
    "title": "Texte de l’article",
    "fieldset": "a1",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t5",
    "title": "Titre de l’article",
    "fieldset": "a2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Hébergement »"
   },
   {
    "name": "t6",
    "title": "Texte de l’article",
    "fieldset": "a2",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t7",
    "title": "Titre de l’article",
    "fieldset": "a3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Propriété intellectuelle »"
   },
   {
    "name": "t8",
    "title": "Texte de l’article",
    "fieldset": "a3",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t9",
    "title": "Titre de l’article",
    "fieldset": "a4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Responsabilité »"
   },
   {
    "name": "t10",
    "title": "Texte de l’article",
    "fieldset": "a4",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t11",
    "title": "Titre de l’article",
    "fieldset": "a5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Liens hypertextes »"
   },
   {
    "name": "t12",
    "title": "Texte de l’article",
    "fieldset": "a5",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t13",
    "title": "Titre de l’article",
    "fieldset": "a6",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Données personnelles »"
   },
   {
    "name": "t14",
    "title": "Texte de l’article",
    "fieldset": "a6",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t15",
    "title": "Titre de l’article",
    "fieldset": "a7",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Cookies »"
   },
   {
    "name": "t16",
    "title": "Texte de l’article",
    "fieldset": "a7",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t17",
    "title": "Titre de l’article",
    "fieldset": "a8",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Droit applicable »"
   },
   {
    "name": "t18",
    "title": "Texte de l’article",
    "fieldset": "a8",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t19",
    "title": "Titre de l’article",
    "fieldset": "a9",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Règlement des litiges en ligne »"
   },
   {
    "name": "t20",
    "title": "Texte de l’article",
    "fieldset": "a9",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t21",
    "title": "Titre de l’article",
    "fieldset": "a10",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Contact »"
   },
   {
    "name": "t22",
    "title": "Texte de l’article",
    "fieldset": "a10",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "seoTitle",
    "title": "Titre pour Google",
    "type": "string",
    "group": "google",
    "description": "Vide = titre actuel de la page. Idéalement 50 à 60 caractères."
   },
   {
    "name": "seoDescription",
    "title": "Description pour Google",
    "type": "text",
    "rows": 3,
    "group": "google",
    "description": "Vide = description actuelle. Idéalement 120 à 155 caractères."
   }
  ],
  "preview": {}
 },
 {
  "name": "page_confidentialite",
  "title": "Confidentialité",
  "type": "document",
  "__group": "legal",
  "__key": "confidentialite",
  "groups": [
   {
    "name": "contenu",
    "title": "Contenu",
    "default": true
   },
   {
    "name": "google",
    "title": "Google"
   }
  ],
  "fieldsets": [
   {
    "name": "entete",
    "title": "En-tête et introduction",
    "options": {
     "collapsible": true,
     "collapsed": false
    }
   },
   {
    "name": "a1",
    "title": "Article 1 : Responsable du traitement",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a2",
    "title": "Article 2 : Données collectées",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a3",
    "title": "Article 3 : Finalités du traitement",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a4",
    "title": "Article 4 : Bases légales du traitement",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a5",
    "title": "Article 5 : Conservation des données",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a6",
    "title": "Article 6 : Compte client",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a7",
    "title": "Article 7 : Newsletter et communications marketing",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a8",
    "title": "Article 8 : Destinataires des données",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a9",
    "title": "Article 9 : Prestataires et sous-traitants",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a10",
    "title": "Article 10 : Shopify",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a11",
    "title": "Article 11 : Cookies et technologies similaires",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a12",
    "title": "Article 12 : Sécurité des données",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a13",
    "title": "Article 13 : Références commerciales et réalisations",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a14",
    "title": "Article 14 : Droits des utilisateurs",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a15",
    "title": "Article 15 : Réclamation auprès d'une autorité de contrôle",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a16",
    "title": "Article 16 : Modifications de la politique de confidentialité",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a17",
    "title": "Article 17 : Contact",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   }
  ],
  "fields": [
   {
    "name": "t1",
    "title": "Titre de la page",
    "fieldset": "entete",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Politique de confidentialité »"
   },
   {
    "name": "t2",
    "title": "Date de mise à jour",
    "fieldset": "entete",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Dernière mise à jour : 17 juin 2026 »"
   },
   {
    "name": "t3",
    "title": "Introduction",
    "fieldset": "entete",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t4",
    "title": "Titre de l’article",
    "fieldset": "a1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Responsable du traitement »"
   },
   {
    "name": "t5",
    "title": "Texte de l’article",
    "fieldset": "a1",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t6",
    "title": "Titre de l’article",
    "fieldset": "a2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Données collectées »"
   },
   {
    "name": "t7",
    "title": "Texte de l’article",
    "fieldset": "a2",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t8",
    "title": "Titre de l’article",
    "fieldset": "a3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Finalités du traitement »"
   },
   {
    "name": "t9",
    "title": "Texte de l’article",
    "fieldset": "a3",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t10",
    "title": "Titre de l’article",
    "fieldset": "a4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Bases légales du traitement »"
   },
   {
    "name": "t11",
    "title": "Texte de l’article",
    "fieldset": "a4",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t12",
    "title": "Titre de l’article",
    "fieldset": "a5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Conservation des données »"
   },
   {
    "name": "t13",
    "title": "Texte de l’article",
    "fieldset": "a5",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t14",
    "title": "Titre de l’article",
    "fieldset": "a6",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Compte client »"
   },
   {
    "name": "t15",
    "title": "Texte de l’article",
    "fieldset": "a6",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t16",
    "title": "Titre de l’article",
    "fieldset": "a7",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Newsletter et communications marketing »"
   },
   {
    "name": "t17",
    "title": "Texte de l’article",
    "fieldset": "a7",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t18",
    "title": "Titre de l’article",
    "fieldset": "a8",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Destinataires des données »"
   },
   {
    "name": "t19",
    "title": "Texte de l’article",
    "fieldset": "a8",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t20",
    "title": "Titre de l’article",
    "fieldset": "a9",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Prestataires et sous-traitants »"
   },
   {
    "name": "t21",
    "title": "Texte de l’article",
    "fieldset": "a9",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t22",
    "title": "Titre de l’article",
    "fieldset": "a10",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Shopify »"
   },
   {
    "name": "t23",
    "title": "Texte de l’article",
    "fieldset": "a10",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t24",
    "title": "Titre de l’article",
    "fieldset": "a11",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Cookies et technologies similaires »"
   },
   {
    "name": "t25",
    "title": "Texte de l’article",
    "fieldset": "a11",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t26",
    "title": "Titre de l’article",
    "fieldset": "a12",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Sécurité des données »"
   },
   {
    "name": "t27",
    "title": "Texte de l’article",
    "fieldset": "a12",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t28",
    "title": "Titre de l’article",
    "fieldset": "a13",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Références commerciales et réalisations »"
   },
   {
    "name": "t29",
    "title": "Texte de l’article",
    "fieldset": "a13",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t30",
    "title": "Titre de l’article",
    "fieldset": "a14",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Droits des utilisateurs »"
   },
   {
    "name": "t31",
    "title": "Texte de l’article",
    "fieldset": "a14",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t32",
    "title": "Titre de l’article",
    "fieldset": "a15",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Réclamation auprès d'une autorité de contrôle »"
   },
   {
    "name": "t33",
    "title": "Texte de l’article",
    "fieldset": "a15",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t34",
    "title": "Titre de l’article",
    "fieldset": "a16",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Modifications de la politique de confidentialité »"
   },
   {
    "name": "t35",
    "title": "Texte de l’article",
    "fieldset": "a16",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t36",
    "title": "Titre de l’article",
    "fieldset": "a17",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Contact »"
   },
   {
    "name": "t37",
    "title": "Texte de l’article",
    "fieldset": "a17",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "seoTitle",
    "title": "Titre pour Google",
    "type": "string",
    "group": "google",
    "description": "Vide = titre actuel de la page. Idéalement 50 à 60 caractères."
   },
   {
    "name": "seoDescription",
    "title": "Description pour Google",
    "type": "text",
    "rows": 3,
    "group": "google",
    "description": "Vide = description actuelle. Idéalement 120 à 155 caractères."
   }
  ],
  "preview": {}
 },
 {
  "name": "page_conditions_utilisation",
  "title": "Conditions d’utilisation",
  "type": "document",
  "__group": "legal",
  "__key": "conditions-utilisation",
  "groups": [
   {
    "name": "contenu",
    "title": "Contenu",
    "default": true
   },
   {
    "name": "google",
    "title": "Google"
   }
  ],
  "fieldsets": [
   {
    "name": "entete",
    "title": "En-tête et introduction",
    "options": {
     "collapsible": true,
     "collapsed": false
    }
   },
   {
    "name": "a1",
    "title": "Article 1 : Objet",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a2",
    "title": "Article 2 : Accès au site",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a3",
    "title": "Article 3 : Comptes utilisateurs",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a4",
    "title": "Article 4 : Suspension ou suppression d'un compte",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a5",
    "title": "Article 5 : Utilisation autorisée du site",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a6",
    "title": "Article 6 : Contenus du site",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a7",
    "title": "Article 7 : Modèles 3D et contenus numériques",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a8",
    "title": "Article 8 : Interdiction du scraping et de l'extraction automatisée",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a9",
    "title": "Article 9 : Configurateurs, visualiseurs et outils interactifs",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a10",
    "title": "Article 10 : Liens externes",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a11",
    "title": "Article 11 : Exactitude des informations",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a12",
    "title": "Article 12 : Limitation de responsabilité",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a13",
    "title": "Article 13 : Sécurité",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a14",
    "title": "Article 14 : Données personnelles",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a15",
    "title": "Article 15 : Modification des Conditions de service",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a16",
    "title": "Article 16 : Droit applicable",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   },
   {
    "name": "a17",
    "title": "Article 17 : Contact",
    "options": {
     "collapsible": true,
     "collapsed": true
    }
   }
  ],
  "fields": [
   {
    "name": "t1",
    "title": "Titre de la page",
    "fieldset": "entete",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Conditions d’utilisation »"
   },
   {
    "name": "t2",
    "title": "Date de mise à jour",
    "fieldset": "entete",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Dernière mise à jour : 17 juin 2026 »"
   },
   {
    "name": "t3",
    "title": "Introduction",
    "fieldset": "entete",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t4",
    "title": "Titre de l’article",
    "fieldset": "a1",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Objet »"
   },
   {
    "name": "t5",
    "title": "Texte de l’article",
    "fieldset": "a1",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t6",
    "title": "Titre de l’article",
    "fieldset": "a2",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Accès au site »"
   },
   {
    "name": "t7",
    "title": "Texte de l’article",
    "fieldset": "a2",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t8",
    "title": "Titre de l’article",
    "fieldset": "a3",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Comptes utilisateurs »"
   },
   {
    "name": "t9",
    "title": "Texte de l’article",
    "fieldset": "a3",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t10",
    "title": "Titre de l’article",
    "fieldset": "a4",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Suspension ou suppression d'un compte »"
   },
   {
    "name": "t11",
    "title": "Texte de l’article",
    "fieldset": "a4",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t12",
    "title": "Titre de l’article",
    "fieldset": "a5",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Utilisation autorisée du site »"
   },
   {
    "name": "t13",
    "title": "Texte de l’article",
    "fieldset": "a5",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t14",
    "title": "Titre de l’article",
    "fieldset": "a6",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Contenus du site »"
   },
   {
    "name": "t15",
    "title": "Texte de l’article",
    "fieldset": "a6",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t16",
    "title": "Titre de l’article",
    "fieldset": "a7",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Modèles 3D et contenus numériques »"
   },
   {
    "name": "t17",
    "title": "Texte de l’article",
    "fieldset": "a7",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t18",
    "title": "Titre de l’article",
    "fieldset": "a8",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Interdiction du scraping et de l'extraction automatisée »"
   },
   {
    "name": "t19",
    "title": "Texte de l’article",
    "fieldset": "a8",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t20",
    "title": "Titre de l’article",
    "fieldset": "a9",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Configurateurs, visualiseurs et outils interactifs »"
   },
   {
    "name": "t21",
    "title": "Texte de l’article",
    "fieldset": "a9",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t22",
    "title": "Titre de l’article",
    "fieldset": "a10",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Liens externes »"
   },
   {
    "name": "t23",
    "title": "Texte de l’article",
    "fieldset": "a10",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t24",
    "title": "Titre de l’article",
    "fieldset": "a11",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Exactitude des informations »"
   },
   {
    "name": "t25",
    "title": "Texte de l’article",
    "fieldset": "a11",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t26",
    "title": "Titre de l’article",
    "fieldset": "a12",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Limitation de responsabilité »"
   },
   {
    "name": "t27",
    "title": "Texte de l’article",
    "fieldset": "a12",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t28",
    "title": "Titre de l’article",
    "fieldset": "a13",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Sécurité »"
   },
   {
    "name": "t29",
    "title": "Texte de l’article",
    "fieldset": "a13",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t30",
    "title": "Titre de l’article",
    "fieldset": "a14",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Données personnelles »"
   },
   {
    "name": "t31",
    "title": "Texte de l’article",
    "fieldset": "a14",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t32",
    "title": "Titre de l’article",
    "fieldset": "a15",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Modification des Conditions de service »"
   },
   {
    "name": "t33",
    "title": "Texte de l’article",
    "fieldset": "a15",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t34",
    "title": "Titre de l’article",
    "fieldset": "a16",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Droit applicable »"
   },
   {
    "name": "t35",
    "title": "Texte de l’article",
    "fieldset": "a16",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "t36",
    "title": "Titre de l’article",
    "fieldset": "a17",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Contact »"
   },
   {
    "name": "t37",
    "title": "Texte de l’article",
    "fieldset": "a17",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "seoTitle",
    "title": "Titre pour Google",
    "type": "string",
    "group": "google",
    "description": "Vide = titre actuel de la page. Idéalement 50 à 60 caractères."
   },
   {
    "name": "seoDescription",
    "title": "Description pour Google",
    "type": "text",
    "rows": 3,
    "group": "google",
    "description": "Vide = description actuelle. Idéalement 120 à 155 caractères."
   }
  ],
  "preview": {}
 },
 {
  "name": "page_coordonnees",
  "title": "Coordonnées",
  "type": "document",
  "__group": "legal",
  "__key": "coordonnees",
  "groups": [
   {
    "name": "contenu",
    "title": "Contenu",
    "default": true
   },
   {
    "name": "google",
    "title": "Google"
   }
  ],
  "fieldsets": [
   {
    "name": "entete",
    "title": "En-tête et introduction",
    "options": {
     "collapsible": true,
     "collapsed": false
    }
   }
  ],
  "fields": [
   {
    "name": "t1",
    "title": "Titre de la page",
    "fieldset": "entete",
    "group": "contenu",
    "type": "string",
    "description": "Texte d’origine : « Coordonnées »"
   },
   {
    "name": "t2",
    "title": "Introduction",
    "fieldset": "entete",
    "group": "contenu",
    "type": "texteLegal"
   },
   {
    "name": "seoTitle",
    "title": "Titre pour Google",
    "type": "string",
    "group": "google",
    "description": "Vide = titre actuel de la page. Idéalement 50 à 60 caractères."
   },
   {
    "name": "seoDescription",
    "title": "Description pour Google",
    "type": "text",
    "rows": 3,
    "group": "google",
    "description": "Vide = description actuelle. Idéalement 120 à 155 caractères."
   }
  ],
  "preview": {}
 }
];
