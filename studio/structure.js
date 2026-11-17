// Menu de gauche du Studio : en français, dans l'ordre où on s'en sert.
export const structure = (S) =>
  S.list()
    .title('Contenus')
    .items([
      S.listItem()
        .title('Actualités')
        .schemaType('article')
        .child(S.documentTypeList('article').title('Actualités').defaultOrdering([{ field: 'date', direction: 'desc' }])),
    ]);
