import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from "vite-plugin-dts";
import { resolve } from "node:path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(),dts()],
  server: {
    port: 3200
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "TriStateCheckbox",
      fileName: "vue-tri-state-checkbox",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
})
