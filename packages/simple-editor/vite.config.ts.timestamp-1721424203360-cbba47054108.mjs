// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/Vue_Project/hacoupian-mahdaad/blocksuite/node_modules/.pnpm/vite@5.2.12_@types+node@20.14.10_less@4.2.0_lightningcss@1.25.1_terser@5.31.1/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Vue_Project/hacoupian-mahdaad/blocksuite/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.2.12_@types+node@20.14.10_less@4.2.0_lightningcss@1.25.1_ters_55pzzvl5imaykvnpn2tkwys36q/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import UnoCSS from "file:///D:/Vue_Project/hacoupian-mahdaad/blocksuite/node_modules/.pnpm/unocss@0.58.9_postcss@8.4.39_rollup@4.18.0_vite@5.2.12_@types+node@20.14.10_less@4.2.0_lightn_qo3qhfkvswyw2inru4zen33zdy/node_modules/unocss/dist/vite.mjs";
import vueJsx from "file:///D:/Vue_Project/hacoupian-mahdaad/blocksuite/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.2.12_@types+node@20.14.10_less@4.2.0_lightningcss@1.25.1__imgxkf55ou5ugauoaqwjimlsla/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import VueDevTools from "file:///D:/Vue_Project/hacoupian-mahdaad/blocksuite/node_modules/.pnpm/vite-plugin-vue-devtools@7.3.5_rollup@4.18.0_vite@5.2.12_@types+node@20.14.10_less@4.2.0_ligh_527wguyuhb2qdbfeafki5monxq/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import { resolve } from "path";
import dts from "file:///D:/Vue_Project/hacoupian-mahdaad/blocksuite/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.14.10_rollup@4.18.0_typescript@5.4.5_vite@5.2.12_@types+_fuulehnxw5ghmez3bcinwt54se/node_modules/vite-plugin-dts/dist/index.mjs";
import { lessVars } from "file:///D:/Vue_Project/hacoupian-mahdaad/blocksuite/node_modules/.pnpm/@mahdaad+tokens@0.0.36/node_modules/@mahdaad/tokens/dist/index.js";
var __vite_injected_original_dirname = "D:\\Vue_Project\\hacoupian-mahdaad\\blocksuite\\packages\\simple-editor";
var __vite_injected_original_import_meta_url = "file:///D:/Vue_Project/hacoupian-mahdaad/blocksuite/packages/simple-editor/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag.includes("-")
        }
      }
    }),
    vueJsx(),
    VueDevTools(),
    UnoCSS(),
    dts()
  ],
  esbuild: {
    target: "es2018"
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    port: 3e3
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          ...lessVars
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
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "Editor",
      fileName: "vue-block-editor"
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxWdWVfUHJvamVjdFxcXFxoYWNvdXBpYW4tbWFoZGFhZFxcXFxibG9ja3N1aXRlXFxcXHBhY2thZ2VzXFxcXHNpbXBsZS1lZGl0b3JcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFZ1ZV9Qcm9qZWN0XFxcXGhhY291cGlhbi1tYWhkYWFkXFxcXGJsb2Nrc3VpdGVcXFxccGFja2FnZXNcXFxcc2ltcGxlLWVkaXRvclxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVnVlX1Byb2plY3QvaGFjb3VwaWFuLW1haGRhYWQvYmxvY2tzdWl0ZS9wYWNrYWdlcy9zaW1wbGUtZWRpdG9yL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5pbXBvcnQgVnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcclxuaW1wb3J0IGR0cyBmcm9tIFwidml0ZS1wbHVnaW4tZHRzXCI7XHJcbmltcG9ydCB7IGxlc3NWYXJzIH0gZnJvbSAnQG1haGRhYWQvdG9rZW5zJ1xyXG5cclxuXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSh7XHJcbiAgICAgIHRlbXBsYXRlOiB7XHJcbiAgICAgICAgY29tcGlsZXJPcHRpb25zOiB7XHJcbiAgICAgICAgICAvLyB0cmVhdCBhbGwgdGFncyB3aXRoIGEgZGFzaCBhcyBjdXN0b20gZWxlbWVudHNcclxuICAgICAgICAgIGlzQ3VzdG9tRWxlbWVudDogKHRhZykgPT4gdGFnLmluY2x1ZGVzKCctJylcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pLFxyXG4gICAgdnVlSnN4KCksXHJcbiAgICBWdWVEZXZUb29scygpLFxyXG4gICAgVW5vQ1NTKCksXHJcbiAgICBkdHMoKSxcclxuICBdLFxyXG4gIGVzYnVpbGQ6IHtcclxuICAgIHRhcmdldDogJ2VzMjAxOCcsXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2VydmVyOntcclxuICAgIHBvcnQ6MzAwMFxyXG4gIH0sXHJcbiAgY3NzOiB7XHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgIGxlc3M6IHtcclxuICAgICAgICBtb2RpZnlWYXJzOiB7XHJcbiAgICAgICAgICAuLi5sZXNzVmFycyxcclxuICAgICAgICAgIC8vIFVzZWQgZm9yIGdsb2JhbCBpbXBvcnQgdG8gYXZvaWQgdGhlIG5lZWQgdG8gaW1wb3J0IGVhY2ggc3R5bGUgZmlsZSBzZXBhcmF0ZWx5XHJcbiAgICAgICAgICAvLyByZWZlcmVuY2U6ICBBdm9pZCByZXBlYXRlZCByZWZlcmVuY2VzXHJcbiAgICAgICAgICAvL2hhY2s6IGAgOyBAaW1wb3J0IChyZWZlcmVuY2UpIFwiJHtyZXNvbHZlKCcuL2Fzc2V0cy9jc3MvdmFyLmxlc3MnKX1cImBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBsaWI6IHtcclxuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9pbmRleC50c1wiKSxcclxuICAgICAgbmFtZTogXCJFZGl0b3JcIixcclxuICAgICAgZmlsZU5hbWU6IFwidnVlLWJsb2NrLWVkaXRvclwiLFxyXG4gICAgfSxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgZXh0ZXJuYWw6IFtcInZ1ZVwiXSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgZ2xvYmFsczoge1xyXG4gICAgICAgICAgdnVlOiBcIlZ1ZVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1ksU0FBUyxlQUFlLFdBQVc7QUFFdmEsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sU0FBUztBQUNoQixTQUFTLGdCQUFnQjtBQVR6QixJQUFNLG1DQUFtQztBQUE4TSxJQUFNLDJDQUEyQztBQWN4UyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsTUFDRixVQUFVO0FBQUEsUUFDUixpQkFBaUI7QUFBQTtBQUFBLFVBRWYsaUJBQWlCLENBQUMsUUFBUSxJQUFJLFNBQVMsR0FBRztBQUFBLFFBQzVDO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsT0FBTztBQUFBLElBQ1AsWUFBWTtBQUFBLElBQ1osT0FBTztBQUFBLElBQ1AsSUFBSTtBQUFBLEVBQ047QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBTztBQUFBLElBQ0wsTUFBSztBQUFBLEVBQ1A7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLFlBQVk7QUFBQSxVQUNWLEdBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUlMO0FBQUEsUUFDQSxtQkFBbUI7QUFBQSxNQUNyQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsS0FBSztBQUFBLE1BQ2hCLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
