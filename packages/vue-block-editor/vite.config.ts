import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'path'
import dts from "vite-plugin-dts";
import { lessVars } from '@mahdaad/tokens'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    }),
    vueJsx(),
    VueDevTools(),
    UnoCSS(),
    dts(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    port:3000
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          ...lessVars,
          // Used for global import to avoid the need to import each style file separately
          // reference:  Avoid repeated references
          //hack: ` ; @import (reference) "${resolve('./assets/css/var.less')}"`
        },
        javascriptEnabled: true
      }
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Editor",
      fileName: "index",
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
