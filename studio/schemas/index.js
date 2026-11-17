import { article } from './article.js';
import { richText } from './richText.js';
import { ligneRiche, texteLegal } from './textTypes.js';
import { pageDocs } from './pages.generated.js';

// Formulaires des pages (générés) : on retire les repères internes (__group, __key) avant de les donner à Sanity
export const pageTypes = pageDocs.map(({ __group, __key, ...doc }) => doc);
export const pageIndex = pageDocs.map(({ name, title, __group, __key }) => ({ name, title, group: __group, id: `page-${__key}` }));
export const schemaTypes = [article, richText, ligneRiche, texteLegal, ...pageTypes];
