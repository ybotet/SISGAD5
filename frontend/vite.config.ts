// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'], // ← ¡esto evita duplicados!
  },
  server: {
    port: 5173, // o el que quieras
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // ← puerto de tu backend Express
        changeOrigin: true,
      },
    },
  },
});