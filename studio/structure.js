// Menu de gauche du Studio : en français, dans l'ordre où on s'en sert.
import { pageIndex } from './schemas/index.js';

const pageItem = (S, p) => S.listItem().title(p.title).id(p.id).schemaType(p.name).child(S.document().schemaType(p.name).documentId(p.id).title(p.title));
const pageGroup = (S, title, group) =>
  S.listItem().title(title).id(group).child(S.list().title(title).items(pageIndex.filter((p) => p.group === group).map((p) => pageItem(S, p))));

export const structure = (S) =>
  S.list()
    .title('Contenus')
    .items([
      S.listItem()
        .title('Actualités')
        .schemaType('article')
        .child(S.documentTypeList('article').title('Actualités').defaultOrdering([{ field: 'date', direction: 'desc' }])),
      S.divider(),
      pageGroup(S, 'Pages', 'pages'),
      pageGroup(S, 'Fiches produit', 'produits'),
      pageGroup(S, 'Pages légales', 'legal'),
    ]);
