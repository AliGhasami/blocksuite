// packages/simple-editor/vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///K:/Vue_Project/hacoupian-mahdaad/blocksuite/packages/simple-editor/node_modules/vite/dist/node/index.js";
import vue from "file:///K:/Vue_Project/hacoupian-mahdaad/blocksuite/packages/simple-editor/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import UnoCSS from "file:///K:/Vue_Project/hacoupian-mahdaad/blocksuite/packages/simple-editor/node_modules/unocss/dist/vite.mjs";
import vueJsx from "file:///K:/Vue_Project/hacoupian-mahdaad/blocksuite/packages/simple-editor/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import VueDevTools from "file:///K:/Vue_Project/hacoupian-mahdaad/blocksuite/packages/simple-editor/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import { resolve } from "path";
import dts from "file:///K:/Vue_Project/hacoupian-mahdaad/blocksuite/packages/simple-editor/node_modules/vite-plugin-dts/dist/index.mjs";
import { lessVars } from "file:///K:/Vue_Project/hacoupian-mahdaad/blocksuite/packages/simple-editor/node_modules/@mahdaad/tokens/dist/index.js";
var __vite_injected_original_dirname = "K:\\Vue_Project\\hacoupian-mahdaad\\blocksuite\\packages\\simple-editor";
var __vite_injected_original_import_meta_url = "file:///K:/Vue_Project/hacoupian-mahdaad/blocksuite/packages/simple-editor/vite.config.ts";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZXMvc2ltcGxlLWVkaXRvci92aXRlLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIks6XFxcXFZ1ZV9Qcm9qZWN0XFxcXGhhY291cGlhbi1tYWhkYWFkXFxcXGJsb2Nrc3VpdGVcXFxccGFja2FnZXNcXFxcc2ltcGxlLWVkaXRvclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiSzpcXFxcVnVlX1Byb2plY3RcXFxcaGFjb3VwaWFuLW1haGRhYWRcXFxcYmxvY2tzdWl0ZVxcXFxwYWNrYWdlc1xcXFxzaW1wbGUtZWRpdG9yXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9LOi9WdWVfUHJvamVjdC9oYWNvdXBpYW4tbWFoZGFhZC9ibG9ja3N1aXRlL3BhY2thZ2VzL3NpbXBsZS1lZGl0b3Ivdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcclxuXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgVW5vQ1NTIGZyb20gJ3Vub2Nzcy92aXRlJ1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXHJcbmltcG9ydCBWdWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcclxuaW1wb3J0IHsgbGVzc1ZhcnMgfSBmcm9tICdAbWFoZGFhZC90b2tlbnMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSh7XHJcbiAgICAgIHRlbXBsYXRlOiB7XHJcbiAgICAgICAgY29tcGlsZXJPcHRpb25zOiB7XHJcbiAgICAgICAgICAvLyB0cmVhdCBhbGwgdGFncyB3aXRoIGEgZGFzaCBhcyBjdXN0b20gZWxlbWVudHNcclxuICAgICAgICAgIGlzQ3VzdG9tRWxlbWVudDogKHRhZykgPT4gdGFnLmluY2x1ZGVzKCctJylcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pLFxyXG4gICAgdnVlSnN4KCksXHJcbiAgICBWdWVEZXZUb29scygpLFxyXG4gICAgVW5vQ1NTKCksXHJcbiAgICBkdHMoKVxyXG4gIF0sXHJcbiAgZXNidWlsZDoge1xyXG4gICAgdGFyZ2V0OiAnZXMyMDE4J1xyXG4gIH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgIH1cclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogMzAwMFxyXG4gIH0sXHJcbiAgY3NzOiB7XHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgIGxlc3M6IHtcclxuICAgICAgICBtb2RpZnlWYXJzOiB7XHJcbiAgICAgICAgICAuLi5sZXNzVmFyc1xyXG4gICAgICAgICAgLy8gVXNlZCBmb3IgZ2xvYmFsIGltcG9ydCB0byBhdm9pZCB0aGUgbmVlZCB0byBpbXBvcnQgZWFjaCBzdHlsZSBmaWxlIHNlcGFyYXRlbHlcclxuICAgICAgICAgIC8vIHJlZmVyZW5jZTogIEF2b2lkIHJlcGVhdGVkIHJlZmVyZW5jZXNcclxuICAgICAgICAgIC8vaGFjazogYCA7IEBpbXBvcnQgKHJlZmVyZW5jZSkgXCIke3Jlc29sdmUoJy4vYXNzZXRzL2Nzcy92YXIubGVzcycpfVwiYFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIGxpYjoge1xyXG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcclxuICAgICAgbmFtZTogJ0VkaXRvcicsXHJcbiAgICAgIGZpbGVOYW1lOiAndnVlLWJsb2NrLWVkaXRvcidcclxuICAgIH0sXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGV4dGVybmFsOiBbJ3Z1ZSddLFxyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBnbG9iYWxzOiB7XHJcbiAgICAgICAgICB2dWU6ICdWdWUnXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9ZLFNBQVMsZUFBZSxXQUFXO0FBRXZhLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxZQUFZO0FBQ25CLE9BQU8saUJBQWlCO0FBQ3hCLFNBQVMsZUFBZTtBQUN4QixPQUFPLFNBQVM7QUFDaEIsU0FBUyxnQkFBZ0I7QUFUekIsSUFBTSxtQ0FBbUM7QUFBOE0sSUFBTSwyQ0FBMkM7QUFZeFMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0YsVUFBVTtBQUFBLFFBQ1IsaUJBQWlCO0FBQUE7QUFBQSxVQUVmLGlCQUFpQixDQUFDLFFBQVEsSUFBSSxTQUFTLEdBQUc7QUFBQSxRQUM1QztBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELE9BQU87QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUNaLE9BQU87QUFBQSxJQUNQLElBQUk7QUFBQSxFQUNOO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixZQUFZO0FBQUEsVUFDVixHQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFJTDtBQUFBLFFBQ0EsbUJBQW1CO0FBQUEsTUFDckI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUN4QyxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsSUFDWjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLEtBQUs7QUFBQSxNQUNoQixRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxLQUFLO0FBQUEsUUFDUDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
