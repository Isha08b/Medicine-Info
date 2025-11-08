import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'fs'; // 👈 add this

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      closeBundle() {
        // 👇 this ensures Netlify gets the _redirects file inside dist/
        copyFileSync('public/_redirects', 'dist/_redirects');
      },
    },
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
