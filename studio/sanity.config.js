// Espace d'écriture Dame de Tours (Sanity Studio), servi sur le site à l'adresse /studio.
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { frFRLocale } from '@sanity/locale-fr-fr';
import { schemaTypes, pageIndex } from './schemas/index.js';
import { structure } from './structure.js';
import { PreviewAction } from './actions.js';

const PAGE_TYPES = new Set(pageIndex.map((p) => p.name));

export default defineConfig({
  name: 'dame-de-tours',
  title: 'Dame de Tours',
  projectId: 'bh9d2sfy',
  dataset: 'production',
  plugins: [structureTool({ structure, title: 'Contenus' }), frFRLocale()],
  schema: {
    types: schemaTypes,
    templates: (prev) => prev.filter((t) => !PAGE_TYPES.has(t.schemaType)),
  },
  document: {
    actions: (prev, { schemaType }) => {
      if (schemaType === 'article') return [...prev, PreviewAction];
      // Pages du site : une seule fiche par page, qu'on ne supprime ni ne duplique
      if (PAGE_TYPES.has(schemaType)) return prev.filter((a) => !['delete', 'duplicate', 'unpublish'].includes(a.action));
      return prev;
    },
    newDocumentOptions: (prev) => prev.filter((t) => !PAGE_TYPES.has(t.templateId)),
  },
});
