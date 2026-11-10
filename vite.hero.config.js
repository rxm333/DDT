import { defineConfig } from 'vite';

// Bundle séparé pour le héros 3D de l'accueil (Three.js) : chargé à la demande par le bundle principal.
export default defineConfig({
  build: {
    target: 'es2020',
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      entry: 'src/hero3d/index.js',
      name: 'DDSHero3DBundle',
      formats: ['iife'],
      fileName: () => 'hero-3d.min.js',
    },
  },
});
