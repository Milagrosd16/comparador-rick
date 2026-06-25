import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        comparar: resolve(__dirname, 'comparar.html'),
        detalle: resolve(__dirname, 'detalle.html')
      }
    }
  }
})