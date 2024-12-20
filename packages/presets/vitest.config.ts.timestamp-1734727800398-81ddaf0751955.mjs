// packages/presets/vitest.config.ts
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "file:///D:/Vue_Project/hacoupian-mahdaad/blocksuite/node_modules/vitest/dist/config.js";
var __vite_injected_original_import_meta_url = "file:///D:/Vue_Project/hacoupian-mahdaad/blocksuite/packages/presets/vitest.config.ts";
var vitest_config_default = defineConfig(
  (_configEnv) => defineConfig({
    esbuild: { target: "es2018" },
    optimizeDeps: {
      force: true,
      esbuildOptions: {
        // Vitest hardcodes the esbuild target to es2020,
        // override it to es2022 for top level await.
        target: "es2022"
      }
    },
    test: {
      include: ["src/__tests__/**/*.spec.ts"],
      browser: {
        enabled: true,
        headless: process.env.CI === "true",
        name: "chromium",
        provider: "playwright",
        isolate: false,
        providerOptions: {}
      },
      coverage: {
        provider: "istanbul",
        // or 'c8'
        reporter: ["lcov"],
        reportsDirectory: "../../.coverage/presets"
      },
      deps: {
        interopDefault: true
      },
      testTransformMode: {
        web: ["src/__tests__/**/*.spec.ts"]
      },
      alias: {
        "@blocksuite/blocks": path.resolve(
          fileURLToPath(new URL("../blocks/src", __vite_injected_original_import_meta_url))
        ),
        "@blocksuite/blocks/*": path.resolve(
          fileURLToPath(new URL("../blocks/src/*", __vite_injected_original_import_meta_url))
        ),
        "@blocksuite/global/*": path.resolve(
          fileURLToPath(new URL("../framework/global/src/*", __vite_injected_original_import_meta_url))
        ),
        "@blocksuite/store": path.resolve(
          fileURLToPath(new URL("../framework/store/src", __vite_injected_original_import_meta_url))
        ),
        "@blocksuite/inline": path.resolve(
          fileURLToPath(new URL("../framework/inline/src", __vite_injected_original_import_meta_url))
        ),
        "@blocksuite/inline/*": path.resolve(
          fileURLToPath(new URL("../framework/inline/src/*", __vite_injected_original_import_meta_url))
        )
      }
    }
  })
);
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZXMvcHJlc2V0cy92aXRlc3QuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcVnVlX1Byb2plY3RcXFxcaGFjb3VwaWFuLW1haGRhYWRcXFxcYmxvY2tzdWl0ZVxcXFxwYWNrYWdlc1xcXFxwcmVzZXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxWdWVfUHJvamVjdFxcXFxoYWNvdXBpYW4tbWFoZGFhZFxcXFxibG9ja3N1aXRlXFxcXHBhY2thZ2VzXFxcXHByZXNldHNcXFxcdml0ZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVnVlX1Byb2plY3QvaGFjb3VwaWFuLW1haGRhYWQvYmxvY2tzdWl0ZS9wYWNrYWdlcy9wcmVzZXRzL3ZpdGVzdC5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAnbm9kZTp1cmwnO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyhfY29uZmlnRW52ID0+XHJcbiAgZGVmaW5lQ29uZmlnKHtcclxuICAgIGVzYnVpbGQ6IHsgdGFyZ2V0OiAnZXMyMDE4JyB9LFxyXG4gICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgIGZvcmNlOiB0cnVlLFxyXG4gICAgICBlc2J1aWxkT3B0aW9uczoge1xyXG4gICAgICAgIC8vIFZpdGVzdCBoYXJkY29kZXMgdGhlIGVzYnVpbGQgdGFyZ2V0IHRvIGVzMjAyMCxcclxuICAgICAgICAvLyBvdmVycmlkZSBpdCB0byBlczIwMjIgZm9yIHRvcCBsZXZlbCBhd2FpdC5cclxuICAgICAgICB0YXJnZXQ6ICdlczIwMjInLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHRlc3Q6IHtcclxuICAgICAgaW5jbHVkZTogWydzcmMvX190ZXN0c19fLyoqLyouc3BlYy50cyddLFxyXG4gICAgICBicm93c2VyOiB7XHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICBoZWFkbGVzczogcHJvY2Vzcy5lbnYuQ0kgPT09ICd0cnVlJyxcclxuICAgICAgICBuYW1lOiAnY2hyb21pdW0nLFxyXG4gICAgICAgIHByb3ZpZGVyOiAncGxheXdyaWdodCcsXHJcbiAgICAgICAgaXNvbGF0ZTogZmFsc2UsXHJcbiAgICAgICAgcHJvdmlkZXJPcHRpb25zOiB7fSxcclxuICAgICAgfSxcclxuICAgICAgY292ZXJhZ2U6IHtcclxuICAgICAgICBwcm92aWRlcjogJ2lzdGFuYnVsJywgLy8gb3IgJ2M4J1xyXG4gICAgICAgIHJlcG9ydGVyOiBbJ2xjb3YnXSxcclxuICAgICAgICByZXBvcnRzRGlyZWN0b3J5OiAnLi4vLi4vLmNvdmVyYWdlL3ByZXNldHMnLFxyXG4gICAgICB9LFxyXG4gICAgICBkZXBzOiB7XHJcbiAgICAgICAgaW50ZXJvcERlZmF1bHQ6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICAgIHRlc3RUcmFuc2Zvcm1Nb2RlOiB7XHJcbiAgICAgICAgd2ViOiBbJ3NyYy9fX3Rlc3RzX18vKiovKi5zcGVjLnRzJ10sXHJcbiAgICAgIH0sXHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ0BibG9ja3N1aXRlL2Jsb2Nrcyc6IHBhdGgucmVzb2x2ZShcclxuICAgICAgICAgIGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi4vYmxvY2tzL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnQGJsb2Nrc3VpdGUvYmxvY2tzLyonOiBwYXRoLnJlc29sdmUoXHJcbiAgICAgICAgICBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4uL2Jsb2Nrcy9zcmMvKicsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnQGJsb2Nrc3VpdGUvZ2xvYmFsLyonOiBwYXRoLnJlc29sdmUoXHJcbiAgICAgICAgICBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4uL2ZyYW1ld29yay9nbG9iYWwvc3JjLyonLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gICAgICAgICksXHJcbiAgICAgICAgJ0BibG9ja3N1aXRlL3N0b3JlJzogcGF0aC5yZXNvbHZlKFxyXG4gICAgICAgICAgZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuLi9mcmFtZXdvcmsvc3RvcmUvc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgICAgICApLFxyXG4gICAgICAgICdAYmxvY2tzdWl0ZS9pbmxpbmUnOiBwYXRoLnJlc29sdmUoXHJcbiAgICAgICAgICBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4uL2ZyYW1ld29yay9pbmxpbmUvc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgICAgICApLFxyXG4gICAgICAgICdAYmxvY2tzdWl0ZS9pbmxpbmUvKic6IHBhdGgucmVzb2x2ZShcclxuICAgICAgICAgIGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi4vZnJhbWV3b3JrL2lubGluZS9zcmMvKicsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICAgICAgKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSlcclxuKTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzWCxPQUFPLFVBQVU7QUFDdlksU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxvQkFBb0I7QUFGZ04sSUFBTSwyQ0FBMkM7QUFJOVIsSUFBTyx3QkFBUTtBQUFBLEVBQWEsZ0JBQzFCLGFBQWE7QUFBQSxJQUNYLFNBQVMsRUFBRSxRQUFRLFNBQVM7QUFBQSxJQUM1QixjQUFjO0FBQUEsTUFDWixPQUFPO0FBQUEsTUFDUCxnQkFBZ0I7QUFBQTtBQUFBO0FBQUEsUUFHZCxRQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQU07QUFBQSxNQUNKLFNBQVMsQ0FBQyw0QkFBNEI7QUFBQSxNQUN0QyxTQUFTO0FBQUEsUUFDUCxTQUFTO0FBQUEsUUFDVCxVQUFVLFFBQVEsSUFBSSxPQUFPO0FBQUEsUUFDN0IsTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLFFBQ1YsU0FBUztBQUFBLFFBQ1QsaUJBQWlCLENBQUM7QUFBQSxNQUNwQjtBQUFBLE1BQ0EsVUFBVTtBQUFBLFFBQ1IsVUFBVTtBQUFBO0FBQUEsUUFDVixVQUFVLENBQUMsTUFBTTtBQUFBLFFBQ2pCLGtCQUFrQjtBQUFBLE1BQ3BCO0FBQUEsTUFDQSxNQUFNO0FBQUEsUUFDSixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLE1BQ0EsbUJBQW1CO0FBQUEsUUFDakIsS0FBSyxDQUFDLDRCQUE0QjtBQUFBLE1BQ3BDO0FBQUEsTUFDQSxPQUFPO0FBQUEsUUFDTCxzQkFBc0IsS0FBSztBQUFBLFVBQ3pCLGNBQWMsSUFBSSxJQUFJLGlCQUFpQix3Q0FBZSxDQUFDO0FBQUEsUUFDekQ7QUFBQSxRQUNBLHdCQUF3QixLQUFLO0FBQUEsVUFDM0IsY0FBYyxJQUFJLElBQUksbUJBQW1CLHdDQUFlLENBQUM7QUFBQSxRQUMzRDtBQUFBLFFBQ0Esd0JBQXdCLEtBQUs7QUFBQSxVQUMzQixjQUFjLElBQUksSUFBSSw2QkFBNkIsd0NBQWUsQ0FBQztBQUFBLFFBQ3JFO0FBQUEsUUFDQSxxQkFBcUIsS0FBSztBQUFBLFVBQ3hCLGNBQWMsSUFBSSxJQUFJLDBCQUEwQix3Q0FBZSxDQUFDO0FBQUEsUUFDbEU7QUFBQSxRQUNBLHNCQUFzQixLQUFLO0FBQUEsVUFDekIsY0FBYyxJQUFJLElBQUksMkJBQTJCLHdDQUFlLENBQUM7QUFBQSxRQUNuRTtBQUFBLFFBQ0Esd0JBQXdCLEtBQUs7QUFBQSxVQUMzQixjQUFjLElBQUksSUFBSSw2QkFBNkIsd0NBQWUsQ0FBQztBQUFBLFFBQ3JFO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFtdCn0K
