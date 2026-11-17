// Site Dame de Tours — Astro fabrique des pages HTML statiques (aucun serveur nécessaire).
// - build.format 'file' : /atelier → atelier.html ; l'.htaccess sert les adresses sans « .html ».
// - compressHTML false : le HTML sort tel qu'il a été écrit (rendu identique à l'ancien site).
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || 'https://damedetours.com',
  trailingSlash: 'never',
  compressHTML: false,
  build: { format: 'file', assets: '_astro' },
  devToolbar: { enabled: false },
});
