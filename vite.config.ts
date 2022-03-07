import path from 'path';
import { transformAssetUrls, quasar } from '@quasar/vite-plugin';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/eliza-chatbot/',
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src')
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar(),
  ],
});
