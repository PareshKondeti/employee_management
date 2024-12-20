import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/employees': {
        target: 'http://localhost:5005',
        changeOrigin: true,
      },
    },
  },
});
