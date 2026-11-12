import { defineConfig } from 'vite';

// Un seul fichier JS (IIFE, chargé avec <script defer>) + un seul fichier CSS.
export default defineConfig({
  build: {
    target: 'es2020',
    sourcemap: true,
    cssMinify: true,
    emptyOutDir: true,
    lib: {
      entry: 'src/main.js',
      name: 'DDS',
      formats: ['iife'],
      fileName: () => 'dame-de-tours.min.js',
      cssFileName: 'dame-de-tours.min',
    },
  },
});
