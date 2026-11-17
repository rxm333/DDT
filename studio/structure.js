// Menu de gauche du Studio : en français, dans l'ordre où on s'en sert.
export const structure = (S) =>
  S.list()
    .title('Contenus')
    .items([
      S.documentTypeListItem('article').title('Actualités').defaultOrdering([{ field: 'date', direction: 'desc' }]),
    ]);
