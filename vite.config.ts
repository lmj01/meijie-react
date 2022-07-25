import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    outDir: '../../resources/static/build/mjreact',
    manifest: true,
    minify: false,
    rollupOptions: {
      output: {
        entryFileNames: (info) => { 
          console.log('--entry file--', info.isEntry, info.facadeModuleId); 
          return `assets/js/[name].js`; 
        },
        chunkFileNames: (info) => {
          console.log('--chunk file--', info.isEntry, info.facadeModuleId, info.name, info.type); 
          return 'assets/js/[name].js';
        },
        assetFileNames: (info) => {
          console.log('--asset file--', info.name, info.type); 
          return 'assets/[ext]/[name][extname]';
        },
      },
    },
  },
})
