import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/phylogeneticTree/',
  plugins: [react()],
  server: {
    host: true, // Écouter sur toutes les interfaces réseau
    port: 5173, // Port fixe
    strictPort: true, // Ne pas essayer d'autres ports
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173
    },
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..']
    }
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          taxonomy: ['./src/data/taxonomyData.js']
        }
      }
    }
  }
})
