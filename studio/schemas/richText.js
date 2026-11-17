// Texte d'un article : paragraphes, intertitres, citations, liens, photos.
import { defineArrayMember, defineField, defineType } from 'sanity';

export const richText = defineType({
  name: 'texteRiche',
  title: 'Texte',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Paragraphe', value: 'normal' },
        { title: 'Intertitre', value: 'h2' },
        { title: 'Sous-intertitre', value: 'h3' },
        { title: 'Citation', value: 'blockquote' },
      ],
      lists: [
        { title: 'Liste à puces', value: 'bullet' },
        { title: 'Liste numérotée', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Gras', value: 'strong' },
          { title: 'Italique', value: 'em' },
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            type: 'object',
            title: 'Lien',
            fields: [
              defineField({
                name: 'href',
                type: 'string',
                title: 'Adresse',
                description: 'Page du site : /collection-ancolie · Autre site : https://… · E-mail : mailto:…',
                validation: (r) => r.required().custom((v) => !v || /^(\/|https?:\/\/|mailto:|tel:)/.test(v) || 'Commencez par / (page du site) ou https://'),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      name: 'photo',
      type: 'image',
      title: 'Photo',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Description de la photo', description: 'Ce que montre la photo, pour Google et les personnes malvoyantes.', validation: (r) => r.required().warning('Décrivez la photo en une phrase') }),
        defineField({ name: 'caption', type: 'string', title: 'Légende (facultatif)' }),
      ],
      preview: { select: { title: 'alt', media: 'asset' }, prepare: ({ title, media }) => ({ title: title || 'Photo sans description', media }) },
    }),
  ],
});
