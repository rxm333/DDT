// robots.txt du site en ligne. (Sur preprod, l'.htaccess sert robots-preprod.txt qui interdit tout.)
import { abs } from '../lib/site.js';
export function GET() {
  return new Response(`User-agent: *\nDisallow: /style-guide\nDisallow: /studio\n\nSitemap: ${abs('/sitemap.xml')}\n`, { headers: { 'content-type': 'text/plain' } });
}
