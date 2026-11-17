// Source des articles : Sanity dès qu'il contient des articles publiés ; sinon les fichiers de src/content/
// (contenu d'origine, utilisé tant que l'import dans Sanity n'est pas fait, ou hors connexion en local).
import { fetchSanityArticles } from './sanity.js';

const local = import.meta.glob('../content/articles/*.json', { eager: true, import: 'default' });
const sort = (list) => [...list].sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

let articlesPromise;
export function getArticles() {
  articlesPromise ??= (async () => {
    try {
      const remote = await fetchSanityArticles();
      if (remote.length) {
        console.log(`[sanity] ${remote.length} article(s) publiés`);
        return sort(remote);
      }
      console.log('[sanity] aucun article publié : contenus d’origine utilisés');
    } catch (e) {
      // Sur GitHub, une panne Sanity bloque la publication (on ne remplace pas le site par d'anciens articles)
      if (process.env.CI) throw new Error(`Sanity injoignable (${e.message}) : publication annulée`);
      console.warn(`[sanity] injoignable (${e.message}) : contenus d’origine utilisés`);
    }
    return sort(Object.values(local));
  })();
  return articlesPromise;
}
