import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Dashboard/', // Remove the git URL from here
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
