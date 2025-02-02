import { defineConfig } from 'vite';
import handlebars from './src/vite-plugin-handlebars-precompile.ts';

export default defineConfig({
  plugins: [
    handlebars(),
  ],
  publicDir: './src/static',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use './src/styles/variables.scss' as *;
        `,
      },
    },
  },
});
