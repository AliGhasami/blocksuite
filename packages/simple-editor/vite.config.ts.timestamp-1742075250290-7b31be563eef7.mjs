// packages/simple-editor/vite.config.ts
import { lessVars } from "file:///K:/Vue_Project/hacoupian-mahdaad/blocksuite/packages/simple-editor/node_modules/@mahdaad/tokens/dist/index.js";
import { lessVars as pantoLess } from "file:///K:/Vue_Project/hacoupian-mahdaad/blocksuite/node_modules/@pantograph/tokens/dist/index.js";
import vue from "file:///K:/Vue_Project/hacoupian-mahdaad/blocksuite/packages/simple-editor/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///K:/Vue_Project/hacoupian-mahdaad/blocksuite/packages/simple-editor/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import UnoCSS from "file:///K:/Vue_Project/hacoupian-mahdaad/blocksuite/packages/simple-editor/node_modules/unocss/dist/vite.mjs";
import { defineConfig } from "file:///K:/Vue_Project/hacoupian-mahdaad/blocksuite/packages/simple-editor/node_modules/vite/dist/node/index.js";
import dts from "file:///K:/Vue_Project/hacoupian-mahdaad/blocksuite/packages/simple-editor/node_modules/vite-plugin-dts/dist/index.mjs";
import VueDevTools from "file:///K:/Vue_Project/hacoupian-mahdaad/blocksuite/packages/simple-editor/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_dirname = "K:\\Vue_Project\\hacoupian-mahdaad\\blocksuite\\packages\\simple-editor";
var __vite_injected_original_import_meta_url = "file:///K:/Vue_Project/hacoupian-mahdaad/blocksuite/packages/simple-editor/vite.config.ts";
var { namespace, ...other } = pantoLess;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZXMvc2ltcGxlLWVkaXRvci92aXRlLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIks6XFxcXFZ1ZV9Qcm9qZWN0XFxcXGhhY291cGlhbi1tYWhkYWFkXFxcXGJsb2Nrc3VpdGVcXFxccGFja2FnZXNcXFxcc2ltcGxlLWVkaXRvclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiSzpcXFxcVnVlX1Byb2plY3RcXFxcaGFjb3VwaWFuLW1haGRhYWRcXFxcYmxvY2tzdWl0ZVxcXFxwYWNrYWdlc1xcXFxzaW1wbGUtZWRpdG9yXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9LOi9WdWVfUHJvamVjdC9oYWNvdXBpYW4tbWFoZGFhZC9ibG9ja3N1aXRlL3BhY2thZ2VzL3NpbXBsZS1lZGl0b3Ivdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBsZXNzVmFycyB9IGZyb20gJ0BtYWhkYWFkL3Rva2VucydcclxuaW1wb3J0IHsgbGVzc1ZhcnMgYXMgcGFudG9MZXNzIH0gZnJvbSAnQHBhbnRvZ3JhcGgvdG9rZW5zJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcclxuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXHJcbmltcG9ydCBWdWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5jb25zdCB7bmFtZXNwYWNlLCAuLi5vdGhlcn0gPSBwYW50b0xlc3NcclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWUoe1xyXG4gICAgICB0ZW1wbGF0ZToge1xyXG4gICAgICAgIGNvbXBpbGVyT3B0aW9uczoge1xyXG4gICAgICAgICAgLy8gdHJlYXQgYWxsIHRhZ3Mgd2l0aCBhIGRhc2ggYXMgY3VzdG9tIGVsZW1lbnRzXHJcbiAgICAgICAgICBpc0N1c3RvbUVsZW1lbnQ6ICh0YWcpID0+IHRhZy5pbmNsdWRlcygnLScpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KSxcclxuICAgIHZ1ZUpzeCgpLFxyXG4gICAgVnVlRGV2VG9vbHMoKSxcclxuICAgIFVub0NTUygpLFxyXG4gICAgZHRzKClcclxuICBdLFxyXG4gIGVzYnVpbGQ6IHtcclxuICAgIHRhcmdldDogJ2VzMjAxOCdcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICB9XHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDMwMDBcclxuICB9LFxyXG4gIGNzczoge1xyXG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICBsZXNzOiB7XHJcbiAgICAgICAgbW9kaWZ5VmFyczoge1xyXG4gICAgICAgICAgLi4ubGVzc1ZhcnMsXHJcbiAgICAgICAgICAuLi5vdGhlcixcclxuICAgICAgICAgIC8vIFVzZWQgZm9yIGdsb2JhbCBpbXBvcnQgdG8gYXZvaWQgdGhlIG5lZWQgdG8gaW1wb3J0IGVhY2ggc3R5bGUgZmlsZSBzZXBhcmF0ZWx5XHJcbiAgICAgICAgICAvLyByZWZlcmVuY2U6ICBBdm9pZCByZXBlYXRlZCByZWZlcmVuY2VzXHJcbiAgICAgICAgICAvL2hhY2s6IGAgOyBAaW1wb3J0IChyZWZlcmVuY2UpIFwiJHtyZXNvbHZlKCcuL2Fzc2V0cy9jc3MvdmFyLmxlc3MnKX1cImBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBsaWI6IHtcclxuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXHJcbiAgICAgIG5hbWU6ICdFZGl0b3InLFxyXG4gICAgICBmaWxlTmFtZTogJ3Z1ZS1ibG9jay1lZGl0b3InXHJcbiAgICB9LFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBleHRlcm5hbDogWyd2dWUnXSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgZ2xvYmFsczoge1xyXG4gICAgICAgICAgdnVlOiAnVnVlJ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvWSxTQUFTLGdCQUFnQjtBQUM3WixTQUFTLFlBQVksaUJBQWlCO0FBQ3RDLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsZUFBZSxXQUFXO0FBQ25DLE9BQU8sWUFBWTtBQUNuQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxpQkFBaUI7QUFUeEIsSUFBTSxtQ0FBbUM7QUFBOE0sSUFBTSwyQ0FBMkM7QUFZeFMsSUFBTSxFQUFDLFdBQVcsR0FBRyxNQUFLLElBQUk7QUFDOUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0YsVUFBVTtBQUFBLFFBQ1IsaUJBQWlCO0FBQUE7QUFBQSxVQUVmLGlCQUFpQixDQUFDLFFBQVEsSUFBSSxTQUFTLEdBQUc7QUFBQSxRQUM1QztBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELE9BQU87QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUNaLE9BQU87QUFBQSxJQUNQLElBQUk7QUFBQSxFQUNOO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixZQUFZO0FBQUEsVUFDVixHQUFHO0FBQUEsVUFDSCxHQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFJTDtBQUFBLFFBQ0EsbUJBQW1CO0FBQUEsTUFDckI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUN4QyxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsSUFDWjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLEtBQUs7QUFBQSxNQUNoQixRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxLQUFLO0FBQUEsUUFDUDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
