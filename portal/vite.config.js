import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  // Relative asset URLs so the built portal can be served from any
  // sub-path of the Alimo EduCloud site (it lives at /portal/dist/).
  base: './',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
});
