import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // Set up a proxy or configure other server options if needed
  },
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
});
