// Types de texte des pages : une ligne mise en forme (gras, italique, lien) ou un texte légal complet.
import { defineArrayMember, defineField, defineType } from 'sanity';

const link = defineArrayMember({
  name: 'link', type: 'object', title: 'Lien',
  fields: [defineField({
    name: 'href', type: 'string', title: 'Adresse',
    description: 'Page du site : /livraison · Autre site : https://… · E-mail : mailto:…',
    validation: (r) => r.required().custom((v) => !v || /^(\/|#|https?:\/\/|mailto:|tel:)/.test(v) || 'Commencez par / (page du site) ou https://'),
  })],
});
const decorators = [{ title: 'Gras', value: 'strong' }, { title: 'Italique', value: 'em' }];

export const ligneRiche = defineType({
  name: 'ligneRiche', title: 'Texte', type: 'array',
  of: [defineArrayMember({ type: 'block', styles: [{ title: 'Texte', value: 'normal' }], lists: [], marks: { decorators, annotations: [link] } })],
});

export const texteLegal = defineType({
  name: 'texteLegal', title: 'Texte', type: 'array',
  of: [defineArrayMember({
    type: 'block',
    styles: [{ title: 'Paragraphe', value: 'normal' }, { title: 'Sous-titre', value: 'h3' }],
    lists: [{ title: 'Liste à puces', value: 'bullet' }, { title: 'Liste numérotée', value: 'number' }],
    marks: { decorators, annotations: [link] },
  })],
});
