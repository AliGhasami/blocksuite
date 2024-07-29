// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/mahdaad/blocksuite/node_modules/.pnpm/vite@5.2.12_@types+node@20.14.13_less@4.2.0_lightningcss@1.25.1_terser@5.31.3/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/mahdaad/blocksuite/node_modules/.pnpm/@vitejs+plugin-vue@5.1.1_vite@5.2.12_@types+node@20.14.13_less@4.2.0_lightningcss@1.25.1_ters_6jiwqkjxm3nk6wxjzaekd5hnv4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import UnoCSS from "file:///D:/mahdaad/blocksuite/node_modules/.pnpm/unocss@0.58.9_postcss@8.4.40_rollup@4.19.1_vite@5.2.12_@types+node@20.14.13_less@4.2.0_lightn_wzhfulrohtsuq5xxj7dmzmrj3y/node_modules/unocss/dist/vite.mjs";
import vueJsx from "file:///D:/mahdaad/blocksuite/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.2.12_@types+node@20.14.13_less@4.2.0_lightningcss@1.25.1__ijeenqpwwm5s5yjssl7nh3d7da/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import VueDevTools from "file:///D:/mahdaad/blocksuite/node_modules/.pnpm/vite-plugin-vue-devtools@7.3.7_rollup@4.19.1_vite@5.2.12_@types+node@20.14.13_less@4.2.0_ligh_effpxb7tdhd7tqoerarlm2743u/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import { resolve } from "path";
import dts from "file:///D:/mahdaad/blocksuite/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.14.13_rollup@4.19.1_typescript@5.4.5_vite@5.2.12_@types+_2gjlojfi5v7d6z3jnb3w52ea4a/node_modules/vite-plugin-dts/dist/index.mjs";
import { lessVars } from "file:///D:/mahdaad/blocksuite/node_modules/.pnpm/@mahdaad+tokens@0.0.36/node_modules/@mahdaad/tokens/dist/index.js";
var __vite_injected_original_dirname = "D:\\mahdaad\\blocksuite\\packages\\simple-editor";
var __vite_injected_original_import_meta_url = "file:///D:/mahdaad/blocksuite/packages/simple-editor/vite.config.ts";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxtYWhkYWFkXFxcXGJsb2Nrc3VpdGVcXFxccGFja2FnZXNcXFxcc2ltcGxlLWVkaXRvclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcbWFoZGFhZFxcXFxibG9ja3N1aXRlXFxcXHBhY2thZ2VzXFxcXHNpbXBsZS1lZGl0b3JcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L21haGRhYWQvYmxvY2tzdWl0ZS9wYWNrYWdlcy9zaW1wbGUtZWRpdG9yL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXG5pbXBvcnQgVnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcbmltcG9ydCB7IGxlc3NWYXJzIH0gZnJvbSAnQG1haGRhYWQvdG9rZW5zJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSh7XG4gICAgICB0ZW1wbGF0ZToge1xuICAgICAgICBjb21waWxlck9wdGlvbnM6IHtcbiAgICAgICAgICAvLyB0cmVhdCBhbGwgdGFncyB3aXRoIGEgZGFzaCBhcyBjdXN0b20gZWxlbWVudHNcbiAgICAgICAgICBpc0N1c3RvbUVsZW1lbnQ6ICh0YWcpID0+IHRhZy5pbmNsdWRlcygnLScpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KSxcbiAgICB2dWVKc3goKSxcbiAgICBWdWVEZXZUb29scygpLFxuICAgIFVub0NTUygpLFxuICAgIGR0cygpXG4gIF0sXG4gIGVzYnVpbGQ6IHtcbiAgICB0YXJnZXQ6ICdlczIwMTgnXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICB9XG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDBcbiAgfSxcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgbGVzczoge1xuICAgICAgICBtb2RpZnlWYXJzOiB7XG4gICAgICAgICAgLi4ubGVzc1ZhcnNcbiAgICAgICAgICAvLyBVc2VkIGZvciBnbG9iYWwgaW1wb3J0IHRvIGF2b2lkIHRoZSBuZWVkIHRvIGltcG9ydCBlYWNoIHN0eWxlIGZpbGUgc2VwYXJhdGVseVxuICAgICAgICAgIC8vIHJlZmVyZW5jZTogIEF2b2lkIHJlcGVhdGVkIHJlZmVyZW5jZXNcbiAgICAgICAgICAvL2hhY2s6IGAgOyBAaW1wb3J0IChyZWZlcmVuY2UpIFwiJHtyZXNvbHZlKCcuL2Fzc2V0cy9jc3MvdmFyLmxlc3MnKX1cImBcbiAgICAgICAgfSxcbiAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcbiAgICAgIG5hbWU6ICdFZGl0b3InLFxuICAgICAgZmlsZU5hbWU6ICd2dWUtYmxvY2stZWRpdG9yJ1xuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFsndnVlJ10sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHZ1ZTogJ1Z1ZSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1UsU0FBUyxlQUFlLFdBQVc7QUFFblcsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sU0FBUztBQUNoQixTQUFTLGdCQUFnQjtBQVR6QixJQUFNLG1DQUFtQztBQUFnSyxJQUFNLDJDQUEyQztBQVkxUCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsTUFDRixVQUFVO0FBQUEsUUFDUixpQkFBaUI7QUFBQTtBQUFBLFVBRWYsaUJBQWlCLENBQUMsUUFBUSxJQUFJLFNBQVMsR0FBRztBQUFBLFFBQzVDO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsT0FBTztBQUFBLElBQ1AsWUFBWTtBQUFBLElBQ1osT0FBTztBQUFBLElBQ1AsSUFBSTtBQUFBLEVBQ047QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLFlBQVk7QUFBQSxVQUNWLEdBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUlMO0FBQUEsUUFDQSxtQkFBbUI7QUFBQSxNQUNyQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsS0FBSztBQUFBLE1BQ2hCLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
