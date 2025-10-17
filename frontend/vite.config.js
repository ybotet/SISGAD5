import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // Tu backend Express
        changeOrigin: true
      },
      '/health': {
        target: 'http://localhost:5000',  // Para el health check
        changeOrigin: true
      }
    }
  }
})