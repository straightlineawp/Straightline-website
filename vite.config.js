import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['8a25c9d2064432.lhr.life', 'early-peaches-sing.loca.lt']
  }
});
