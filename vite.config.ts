import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',          // use relative paths so assets load from docs/ correctly
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'docs'     // already set — keep this
  }
})
