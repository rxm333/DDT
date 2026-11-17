// Espace d'écriture Dame de Tours (Sanity Studio), servi sur le site à l'adresse /studio.
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { frFRLocale } from '@sanity/locale-fr-fr';
import { schemaTypes } from './schemas/index.js';
import { structure } from './structure.js';
import { PreviewAction } from './actions.js';

export default defineConfig({
  name: 'dame-de-tours',
  title: 'Dame de Tours',
  projectId: 'bh9d2sfy',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool({ structure, title: 'Contenus' }), frFRLocale()],
  schema: { types: schemaTypes },
  document: {
    actions: (prev, { schemaType }) => (schemaType === 'article' ? [...prev, PreviewAction] : prev),
  },
});
