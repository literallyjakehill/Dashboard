import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/REPO_NAME/', // replace with your repo name or '/' for user pages
  plugins: [react()],
  build: {
    outDir: 'docs',     // or 'dist' depending on Pages settings
    emptyOutDir: true
  }
})