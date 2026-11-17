// Actualité / article du blog.
import { defineField, defineType } from 'sanity';

const PRODUITS = [
  { title: 'Aucun', value: '' },
  { title: 'Ancolie Blanc', value: 'blanc' },
  { title: 'Ancolie Noir', value: 'noir' },
  { title: 'La Chute des Anges', value: 'la-chute-des-anges' },
];

export const article = defineType({
  name: 'article',
  title: 'Actualité',
  type: 'document',
  groups: [
    { name: 'contenu', title: 'Contenu', default: true },
    { name: 'carte', title: 'Carte et liens' },
    { name: 'seo', title: 'Google' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string', group: 'contenu', validation: (r) => r.required().max(90).warning('Un titre court se lit mieux (90 caractères au plus)') }),
    defineField({
      name: 'slug', title: 'Adresse de la page', type: 'slug', group: 'contenu',
      description: 'damedetours.com/actualites/… — générée depuis le titre. À ne plus changer une fois publiée.',
      options: { source: 'title', maxLength: 80, slugify: (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'date', title: 'Date de publication', type: 'date', group: 'contenu', initialValue: () => new Date().toISOString().slice(0, 10), options: { dateFormat: 'D MMMM YYYY' }, validation: (r) => r.required() }),
    defineField({ name: 'category', title: 'Catégorie', type: 'string', group: 'contenu', description: 'Ex. Lancement, Exposition, Concours', options: { list: ['Lancement', 'Exposition', 'Concours', 'Atelier', 'Presse'] }, validation: (r) => r.required() }),
    defineField({ name: 'intro', title: 'Chapeau', type: 'text', rows: 3, group: 'contenu', description: 'Une ou deux phrases sous le titre.', validation: (r) => r.required().max(300) }),
    defineField({
      name: 'cover', title: 'Photo principale', type: 'image', group: 'contenu', options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Description de la photo', validation: (r) => r.required() })],
      validation: (r) => r.required(),
    }),
    defineField({ name: 'body', title: 'Texte de l’article', type: 'texteRiche', group: 'contenu', validation: (r) => r.required() }),

    defineField({ name: 'cardText', title: 'Texte de la carte', type: 'text', rows: 3, group: 'carte', description: 'Résumé affiché sur les cartes (accueil, atelier, actualités). Vide = le chapeau.', validation: (r) => r.max(220) }),
    defineField({
      name: 'cta', title: 'Bouton en fin d’article', type: 'object', group: 'carte', options: { collapsible: true },
      fields: [
        defineField({ name: 'label', type: 'string', title: 'Texte du bouton', description: 'Ex. Voir la collection' }),
        defineField({ name: 'href', type: 'string', title: 'Lien', description: '/collection-ancolie, /personnalisation ou https://…' }),
      ],
    }),
    defineField({ name: 'product', title: 'Jeu présenté', type: 'string', group: 'carte', description: 'Carte produit affichée en fin d’article.', options: { list: PRODUITS, layout: 'radio' }, initialValue: '' }),

    defineField({ name: 'seoTitle', title: 'Titre pour Google', type: 'string', group: 'seo', description: 'Vide = « Titre | Dame de Tours ». Idéalement 50 à 60 caractères.', validation: (r) => r.max(70).warning('Google coupe au-delà d’environ 60 caractères') }),
    defineField({ name: 'seoDescription', title: 'Description pour Google', type: 'text', rows: 3, group: 'seo', description: 'Vide = le chapeau. Idéalement 120 à 155 caractères.', validation: (r) => r.max(170).warning('Google coupe au-delà d’environ 155 caractères') }),
  ],
  orderings: [{ title: 'Date (récentes d’abord)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', date: 'date', media: 'cover', category: 'category' },
    prepare: ({ title, date, media, category }) => ({ title, media, subtitle: [category, date && new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })].filter(Boolean).join(' · ') }),
  },
});
