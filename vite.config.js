import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { portfolioApiPlugin } from './vite-portfolio-api-plugin.js';

export default defineConfig({
  plugins: [react(), portfolioApiPlugin()],
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: 5174,
    host: true
  }
});
