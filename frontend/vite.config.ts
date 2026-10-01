import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/room-asset-v2/',
  plugins: [react()],
  server: {
    port: 5173
  }
});
