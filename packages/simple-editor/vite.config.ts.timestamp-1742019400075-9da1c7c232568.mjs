// vite.config.ts
import { lessVars } from "file:///D:/mahdaad/blocksuite/packages/simple-editor/node_modules/@mahdaad/tokens/dist/index.js";
import { lessVars as pantoLess } from "file:///D:/mahdaad/blocksuite/node_modules/@pantograph/tokens/dist/index.js";
import vue from "file:///D:/mahdaad/blocksuite/packages/simple-editor/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/mahdaad/blocksuite/packages/simple-editor/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import UnoCSS from "file:///D:/mahdaad/blocksuite/packages/simple-editor/node_modules/unocss/dist/vite.mjs";
import { defineConfig } from "file:///D:/mahdaad/blocksuite/packages/simple-editor/node_modules/vite/dist/node/index.js";
import dts from "file:///D:/mahdaad/blocksuite/packages/simple-editor/node_modules/vite-plugin-dts/dist/index.mjs";
import VueDevTools from "file:///D:/mahdaad/blocksuite/packages/simple-editor/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_dirname = "D:\\mahdaad\\blocksuite\\packages\\simple-editor";
var __vite_injected_original_import_meta_url = "file:///D:/mahdaad/blocksuite/packages/simple-editor/vite.config.ts";
var { namespace, ...other } = pantoLess;
console.log("11111", other);
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
          ...lessVars,
          ...other
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxtYWhkYWFkXFxcXGJsb2Nrc3VpdGVcXFxccGFja2FnZXNcXFxcc2ltcGxlLWVkaXRvclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcbWFoZGFhZFxcXFxibG9ja3N1aXRlXFxcXHBhY2thZ2VzXFxcXHNpbXBsZS1lZGl0b3JcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L21haGRhYWQvYmxvY2tzdWl0ZS9wYWNrYWdlcy9zaW1wbGUtZWRpdG9yL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgbGVzc1ZhcnMgfSBmcm9tICdAbWFoZGFhZC90b2tlbnMnXHJcbmltcG9ydCB7IGxlc3NWYXJzIGFzIHBhbnRvTGVzcyB9IGZyb20gJ0BwYW50b2dyYXBoL3Rva2VucydcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCdcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xyXG5pbXBvcnQgVnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuY29uc3Qge25hbWVzcGFjZSwgLi4ub3RoZXJ9ID0gcGFudG9MZXNzXHJcbmNvbnNvbGUubG9nKFwiMTExMTFcIixvdGhlcik7XHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKHtcclxuICAgICAgdGVtcGxhdGU6IHtcclxuICAgICAgICBjb21waWxlck9wdGlvbnM6IHtcclxuICAgICAgICAgIC8vIHRyZWF0IGFsbCB0YWdzIHdpdGggYSBkYXNoIGFzIGN1c3RvbSBlbGVtZW50c1xyXG4gICAgICAgICAgaXNDdXN0b21FbGVtZW50OiAodGFnKSA9PiB0YWcuaW5jbHVkZXMoJy0nKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgICB2dWVKc3goKSxcclxuICAgIFZ1ZURldlRvb2xzKCksXHJcbiAgICBVbm9DU1MoKSxcclxuICAgIGR0cygpXHJcbiAgXSxcclxuICBlc2J1aWxkOiB7XHJcbiAgICB0YXJnZXQ6ICdlczIwMTgnXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiAzMDAwXHJcbiAgfSxcclxuICBjc3M6IHtcclxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgbGVzczoge1xyXG4gICAgICAgIG1vZGlmeVZhcnM6IHtcclxuICAgICAgICAgIC4uLmxlc3NWYXJzLFxyXG4gICAgICAgICAgLi4ub3RoZXIsXHJcbiAgICAgICAgICAvLyBVc2VkIGZvciBnbG9iYWwgaW1wb3J0IHRvIGF2b2lkIHRoZSBuZWVkIHRvIGltcG9ydCBlYWNoIHN0eWxlIGZpbGUgc2VwYXJhdGVseVxyXG4gICAgICAgICAgLy8gcmVmZXJlbmNlOiAgQXZvaWQgcmVwZWF0ZWQgcmVmZXJlbmNlc1xyXG4gICAgICAgICAgLy9oYWNrOiBgIDsgQGltcG9ydCAocmVmZXJlbmNlKSBcIiR7cmVzb2x2ZSgnLi9hc3NldHMvY3NzL3Zhci5sZXNzJyl9XCJgXHJcbiAgICAgICAgfSxcclxuICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgbGliOiB7XHJcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxyXG4gICAgICBuYW1lOiAnRWRpdG9yJyxcclxuICAgICAgZmlsZU5hbWU6ICd2dWUtYmxvY2stZWRpdG9yJ1xyXG4gICAgfSxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgZXh0ZXJuYWw6IFsndnVlJ10sXHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIGdsb2JhbHM6IHtcclxuICAgICAgICAgIHZ1ZTogJ1Z1ZSdcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1UsU0FBUyxnQkFBZ0I7QUFDelYsU0FBUyxZQUFZLGlCQUFpQjtBQUN0QyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsZUFBZTtBQUN4QixTQUFTLGVBQWUsV0FBVztBQUNuQyxPQUFPLFlBQVk7QUFDbkIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8saUJBQWlCO0FBVHhCLElBQU0sbUNBQW1DO0FBQWdLLElBQU0sMkNBQTJDO0FBWTFQLElBQU0sRUFBQyxXQUFXLEdBQUcsTUFBSyxJQUFJO0FBQzlCLFFBQVEsSUFBSSxTQUFRLEtBQUs7QUFDekIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0YsVUFBVTtBQUFBLFFBQ1IsaUJBQWlCO0FBQUE7QUFBQSxVQUVmLGlCQUFpQixDQUFDLFFBQVEsSUFBSSxTQUFTLEdBQUc7QUFBQSxRQUM1QztBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELE9BQU87QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUNaLE9BQU87QUFBQSxJQUNQLElBQUk7QUFBQSxFQUNOO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixZQUFZO0FBQUEsVUFDVixHQUFHO0FBQUEsVUFDSCxHQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFJTDtBQUFBLFFBQ0EsbUJBQW1CO0FBQUEsTUFDckI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUN4QyxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsSUFDWjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLEtBQUs7QUFBQSxNQUNoQixRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxLQUFLO0FBQUEsUUFDUDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
