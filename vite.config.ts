import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: tag=>tag.startsWith('fc-')||tag.startsWith('css-')
      }
    }
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname,'src')
    }
  }
})
