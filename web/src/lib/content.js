// Source des contenus éditables. Aujourd'hui : fichiers JSON de src/content/.
// Demain : Sanity (même forme de données), sans toucher aux gabarits.
const local = import.meta.glob('../content/articles/*.json', { eager: true, import: 'default' });

let articlesPromise;
export function getArticles() {
  articlesPromise ??= Promise.resolve(Object.values(local)).then((list) =>
    [...list].sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug)),
  );
  return articlesPromise;
}
