// robots.txt du site en ligne. (Sur preprod, l'.htaccess sert robots-preprod.txt qui interdit tout.)
import { abs } from '../lib/site.js';
export function GET() {
  // Moteurs de recherche et moteurs de réponse IA (ChatGPT, Perplexity, Claude, Gemini…) explicitement
// bienvenus : être lu par eux, c'est pouvoir être cité dans leurs réponses. Résumé pour eux : /llms.txt.
const AGENTS = ['*', 'Googlebot', 'Bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'GPTBot', 'PerplexityBot', 'Perplexity-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'Google-Extended', 'Applebot', 'Applebot-Extended'];
  return new Response(`${AGENTS.map((a) => `User-agent: ${a}`).join('\n')}\nAllow: /\nDisallow: /style-guide\nDisallow: /studio\n\n# Résumé du site pour les moteurs de réponse IA : ${abs('/llms.txt')}\nSitemap: ${abs('/sitemap.xml')}\n`, { headers: { 'content-type': 'text/plain' } });
}
