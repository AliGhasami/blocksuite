// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/mahdaad/blocksuite/node_modules/.pnpm/vite@5.2.12_@types+node@20.14.10_less@4.2.0_lightningcss@1.25.1_terser@5.31.1/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/mahdaad/blocksuite/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.2.12_@types+node@20.14.10_less@4.2.0_lightningcss@1.25.1_ters_55pzzvl5imaykvnpn2tkwys36q/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import UnoCSS from "file:///D:/mahdaad/blocksuite/node_modules/.pnpm/unocss@0.58.9_postcss@8.4.40_rollup@4.18.0_vite@5.2.12_@types+node@20.14.10_less@4.2.0_lightn_zonv4klkakucq4smy5akk5zl7q/node_modules/unocss/dist/vite.mjs";
import vueJsx from "file:///D:/mahdaad/blocksuite/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.2.12_@types+node@20.14.10_less@4.2.0_lightningcss@1.25.1__imgxkf55ou5ugauoaqwjimlsla/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import VueDevTools from "file:///D:/mahdaad/blocksuite/node_modules/.pnpm/vite-plugin-vue-devtools@7.3.5_rollup@4.18.0_vite@5.2.12_@types+node@20.14.10_less@4.2.0_ligh_527wguyuhb2qdbfeafki5monxq/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import { resolve } from "path";
import dts from "file:///D:/mahdaad/blocksuite/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.14.10_rollup@4.18.0_typescript@5.4.5_vite@5.2.12_@types+_fuulehnxw5ghmez3bcinwt54se/node_modules/vite-plugin-dts/dist/index.mjs";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxtYWhkYWFkXFxcXGJsb2Nrc3VpdGVcXFxccGFja2FnZXNcXFxcc2ltcGxlLWVkaXRvclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcbWFoZGFhZFxcXFxibG9ja3N1aXRlXFxcXHBhY2thZ2VzXFxcXHNpbXBsZS1lZGl0b3JcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L21haGRhYWQvYmxvY2tzdWl0ZS9wYWNrYWdlcy9zaW1wbGUtZWRpdG9yL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5pbXBvcnQgVnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcclxuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXHJcbmltcG9ydCB7IGxlc3NWYXJzIH0gZnJvbSAnQG1haGRhYWQvdG9rZW5zJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWUoe1xyXG4gICAgICB0ZW1wbGF0ZToge1xyXG4gICAgICAgIGNvbXBpbGVyT3B0aW9uczoge1xyXG4gICAgICAgICAgLy8gdHJlYXQgYWxsIHRhZ3Mgd2l0aCBhIGRhc2ggYXMgY3VzdG9tIGVsZW1lbnRzXHJcbiAgICAgICAgICBpc0N1c3RvbUVsZW1lbnQ6ICh0YWcpID0+IHRhZy5pbmNsdWRlcygnLScpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KSxcclxuICAgIHZ1ZUpzeCgpLFxyXG4gICAgVnVlRGV2VG9vbHMoKSxcclxuICAgIFVub0NTUygpLFxyXG4gICAgZHRzKClcclxuICBdLFxyXG4gIGVzYnVpbGQ6IHtcclxuICAgIHRhcmdldDogJ2VzMjAxOCdcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICB9XHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDMwMDBcclxuICB9LFxyXG4gIGNzczoge1xyXG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICBsZXNzOiB7XHJcbiAgICAgICAgbW9kaWZ5VmFyczoge1xyXG4gICAgICAgICAgLi4ubGVzc1ZhcnNcclxuICAgICAgICAgIC8vIFVzZWQgZm9yIGdsb2JhbCBpbXBvcnQgdG8gYXZvaWQgdGhlIG5lZWQgdG8gaW1wb3J0IGVhY2ggc3R5bGUgZmlsZSBzZXBhcmF0ZWx5XHJcbiAgICAgICAgICAvLyByZWZlcmVuY2U6ICBBdm9pZCByZXBlYXRlZCByZWZlcmVuY2VzXHJcbiAgICAgICAgICAvL2hhY2s6IGAgOyBAaW1wb3J0IChyZWZlcmVuY2UpIFwiJHtyZXNvbHZlKCcuL2Fzc2V0cy9jc3MvdmFyLmxlc3MnKX1cImBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBsaWI6IHtcclxuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXHJcbiAgICAgIG5hbWU6ICdFZGl0b3InLFxyXG4gICAgICBmaWxlTmFtZTogJ3Z1ZS1ibG9jay1lZGl0b3InXHJcbiAgICB9LFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBleHRlcm5hbDogWyd2dWUnXSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgZ2xvYmFsczoge1xyXG4gICAgICAgICAgdnVlOiAnVnVlJ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnVSxTQUFTLGVBQWUsV0FBVztBQUVuVyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sWUFBWTtBQUNuQixPQUFPLGlCQUFpQjtBQUN4QixTQUFTLGVBQWU7QUFDeEIsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZ0JBQWdCO0FBVHpCLElBQU0sbUNBQW1DO0FBQWdLLElBQU0sMkNBQTJDO0FBWTFQLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLFVBQVU7QUFBQSxRQUNSLGlCQUFpQjtBQUFBO0FBQUEsVUFFZixpQkFBaUIsQ0FBQyxRQUFRLElBQUksU0FBUyxHQUFHO0FBQUEsUUFDNUM7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUEsSUFDUCxZQUFZO0FBQUEsSUFDWixPQUFPO0FBQUEsSUFDUCxJQUFJO0FBQUEsRUFDTjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osWUFBWTtBQUFBLFVBQ1YsR0FBRztBQUFBO0FBQUE7QUFBQTtBQUFBLFFBSUw7QUFBQSxRQUNBLG1CQUFtQjtBQUFBLE1BQ3JCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDeEMsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxLQUFLO0FBQUEsTUFDaEIsUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1AsS0FBSztBQUFBLFFBQ1A7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
