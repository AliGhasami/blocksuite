// vite.config.ts
import fs from "node:fs";
import { createRequire } from "node:module";
import { cpus } from "node:os";
import path3, { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "file:///D:/mahdaad/blocksuite/node_modules/vite/dist/node/index.js";
import istanbul from "file:///D:/mahdaad/blocksuite/node_modules/vite-plugin-istanbul/dist/index.mjs";
import wasm from "file:///D:/mahdaad/blocksuite/node_modules/vite-plugin-wasm/exports/import.mjs";

// scripts/hmr-plugin/index.ts
import path2 from "node:path";
import {
  presets,
  hmrPlugin as wcHmrPlugin
} from "file:///D:/mahdaad/blocksuite/node_modules/vite-plugin-web-components-hmr/index.mjs";

// scripts/hmr-plugin/fine-tune.ts
import { init, parse } from "file:///D:/mahdaad/blocksuite/node_modules/es-module-lexer/dist/lexer.js";
import MagicString from "file:///D:/mahdaad/blocksuite/node_modules/magic-string/dist/magic-string.es.mjs";
import micromatch from "file:///D:/mahdaad/blocksuite/node_modules/micromatch/index.js";
import path from "node:path";
var isMatch = micromatch.isMatch;
function fineTuneHmr({
  include: include2,
  exclude: exclude2
}) {
  let root = "";
  const plugin = {
    name: "add-hot-for-pure-exports",
    apply: "serve",
    configResolved(config) {
      root = config.root;
    },
    async configureServer() {
      await init;
    },
    transform: (code, id) => {
      const includeGlob = include2.map((i) => path.resolve(root, i));
      const excludeGlob = exclude2.map((i) => path.resolve(root, i));
      const isInScope = isMatch(id, includeGlob) && !isMatch(id, excludeGlob);
      if (!isInScope) return;
      if (!(id.endsWith(".js") || id.endsWith(".ts"))) return;
      if (code.includes("import.meta.hot")) return;
      const [imports, exports] = parse(code, id);
      if (exports.length === 0 && imports.length > 0) {
        const modules = imports.map((i) => i.n);
        const modulesEndsWithTs = modules.filter(Boolean).map((m) => m.replace(/\.js$/, ".ts"));
        const preamble = `
          if (import.meta.hot) {
            import.meta.hot.accept(${JSON.stringify(
          modulesEndsWithTs
        )}, data => {
              // some update logic
            });
          }
          `;
        const s = new MagicString(code);
        s.prepend(preamble + "\n");
        return {
          code: s.toString(),
          map: s.generateMap({ hires: true, source: id, includeContent: true })
        };
      }
      return;
    }
  };
  return plugin;
}

// scripts/hmr-plugin/index.ts
var __vite_injected_original_dirname = "D:\\mahdaad\\blocksuite\\packages\\playground\\scripts\\hmr-plugin";
var customLitPath = path2.resolve(
  __vite_injected_original_dirname,
  "../../../blocks/src/_legacy/index.js"
);
var include = ["../blocks/src/**/*"];
var exclude = ["**/*/node_modules/**/*"];
var hmrPlugin = process.env.WC_HMR ? [
  wcHmrPlugin({
    include,
    exclude,
    presets: [presets.lit],
    decorators: [{ name: "customElement", import: "lit/decorators.js" }],
    baseClasses: [
      {
        name: "ShadowlessElement",
        import: customLitPath
      }
    ]
  }),
  fineTuneHmr({
    include,
    exclude
  })
] : [];

// vite.config.ts
var __vite_injected_original_dirname2 = "D:\\mahdaad\\blocksuite\\packages\\playground";
var __vite_injected_original_import_meta_url = "file:///D:/mahdaad/blocksuite/packages/playground/vite.config.ts";
var require2 = createRequire(__vite_injected_original_import_meta_url);
var enableIstanbul = !!process.env.COVERAGE;
var chunkSizeReport = !!process.env.CHUNK_SIZE_REPORT;
var cache = /* @__PURE__ */ new Map();
function sourcemapExclude() {
  return {
    name: "sourcemap-exclude",
    transform(code, id) {
      if (id.includes("node_modules") && !id.includes("@blocksuite")) {
        return {
          code,
          // https://github.com/rollup/rollup/blob/master/docs/plugin-development/index.md#source-code-transformations
          map: { mappings: "" }
        };
      }
    }
  };
}
function isDepInclude(id, depPaths, importChain, getModuleInfo) {
  const key = `${id}-${depPaths.join("|")}`;
  if (importChain.includes(id)) {
    cache.set(key, false);
    return false;
  }
  if (cache.has(key)) {
    return cache.get(key);
  }
  for (const depPath of depPaths) {
    if (id.includes(depPath)) {
      importChain.forEach(
        (item) => cache.set(`${item}-${depPaths.join("|")}`, true)
      );
      return true;
    }
  }
  const moduleInfo = getModuleInfo(id);
  if (!moduleInfo || !moduleInfo.importers) {
    cache.set(key, false);
    return false;
  }
  const isInclude = moduleInfo.importers.some(
    (importer) => isDepInclude(importer, depPaths, importChain.concat(id), getModuleInfo)
  );
  cache.set(key, isInclude);
  return isInclude;
}
var chunkGroups = {
  framework: [
    require2.resolve("@blocksuite/block-std"),
    require2.resolve("@blocksuite/block-std/gfx"),
    require2.resolve("@blocksuite/global"),
    require2.resolve("@blocksuite/global/utils"),
    require2.resolve("@blocksuite/global/env"),
    require2.resolve("@blocksuite/global/exceptions"),
    require2.resolve("@blocksuite/global/di"),
    require2.resolve("@blocksuite/inline"),
    require2.resolve("@blocksuite/store"),
    require2.resolve("@blocksuite/sync")
  ],
  components: [
    require2.resolve("@blocksuite/affine-components/icons"),
    require2.resolve("@blocksuite/affine-components/peek"),
    require2.resolve("@blocksuite/affine-components/portal"),
    require2.resolve("@blocksuite/affine-components/hover"),
    require2.resolve("@blocksuite/affine-components/toolbar"),
    require2.resolve("@blocksuite/affine-components/toast"),
    require2.resolve("@blocksuite/affine-components/rich-text"),
    require2.resolve("@blocksuite/affine-components/caption"),
    require2.resolve("@blocksuite/affine-components/context-menu"),
    require2.resolve("@blocksuite/affine-components/date-picker"),
    require2.resolve("@blocksuite/affine-components/drag-indicator")
  ],
  affine: [
    require2.resolve("@blocksuite/affine-shared"),
    require2.resolve("@blocksuite/affine-model"),
    require2.resolve("@blocksuite/affine-block-list"),
    require2.resolve("@blocksuite/affine-block-paragraph"),
    require2.resolve("@blocksuite/affine-block-surface"),
    require2.resolve("@blocksuite/data-view")
  ],
  datefns: [path3.dirname(require2.resolve("date-fns"))],
  dompurify: [path3.dirname(require2.resolve("dompurify"))],
  shiki: [path3.dirname(require2.resolve("@shikijs/core"))],
  dotLottie: [path3.dirname(require2.resolve("@lottiefiles/dotlottie-wc"))],
  unified: [
    path3.dirname(require2.resolve("unified")),
    path3.dirname(require2.resolve("rehype-parse")),
    path3.dirname(require2.resolve("rehype-stringify")),
    path3.dirname(require2.resolve("remark-parse")),
    path3.dirname(require2.resolve("remark-stringify")),
    path3.dirname(require2.resolve("mdast-util-gfm-autolink-literal")),
    path3.dirname(require2.resolve("mdast-util-gfm-strikethrough")),
    path3.dirname(require2.resolve("mdast-util-gfm-table")),
    path3.dirname(require2.resolve("mdast-util-gfm-task-list-item")),
    path3.dirname(require2.resolve("micromark-extension-gfm-autolink-literal")),
    path3.dirname(require2.resolve("micromark-extension-gfm-strikethrough")),
    path3.dirname(require2.resolve("micromark-extension-gfm-table")),
    path3.dirname(require2.resolve("micromark-extension-gfm-task-list-item")),
    path3.dirname(require2.resolve("micromark-util-combine-extensions"))
  ],
  blocks: [
    require2.resolve("@blocksuite/blocks"),
    require2.resolve("@blocksuite/blocks/schemas")
  ],
  presets: [require2.resolve("@blocksuite/presets")],
  common: [
    require2.resolve("@blocksuite/icons/lit"),
    require2.resolve("@toeverything/theme"),
    require2.resolve("@toeverything/y-indexeddb"),
    require2.resolve("@preact/signals-core"),
    require2.resolve("@lit/context"),
    require2.resolve("lit"),
    require2.resolve("zod"),
    require2.resolve("minimatch"),
    require2.resolve("nanoid"),
    require2.resolve("yjs")
  ]
};
var clearSiteDataPlugin = () => ({
  name: "clear-site-data",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === "/Clear-Site-Data") {
        res.statusCode = 200;
        res.setHeader("Clear-Site-Data", '"*"');
      }
      next();
    });
  }
});
var vite_config_default = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, __vite_injected_original_dirname2, "") };
  return defineConfig({
    envDir: __vite_injected_original_dirname2,
    define: {
      "import.meta.env.PLAYGROUND_SERVER": JSON.stringify(
        process.env.PLAYGROUND_SERVER ?? "http://localhost:8787"
      ),
      "import.meta.env.PLAYGROUND_WS": JSON.stringify(
        process.env.PLAYGROUND_WS ?? "ws://localhost:8787"
      )
    },
    plugins: [
      hmrPlugin,
      sourcemapExclude(),
      enableIstanbul && istanbul({
        cwd: fileURLToPath(new URL("../..", __vite_injected_original_import_meta_url)),
        include: ["packages/**/src/*"],
        exclude: [
          "node_modules",
          "tests",
          fileURLToPath(new URL(".", __vite_injected_original_import_meta_url))
        ],
        forceBuildInstrument: true
      }),
      wasm(),
      clearSiteDataPlugin()
    ],
    esbuild: {
      target: "es2018"
    },
    resolve: {
      extensions: [".ts", ".js"]
    },
    build: {
      target: "es2022",
      sourcemap: true,
      rollupOptions: {
        cache: false,
        maxParallelFileOps: Math.max(1, cpus().length - 1),
        onwarn(warning, defaultHandler) {
          if (["EVAL", "SOURCEMAP_ERROR"].includes(warning.code)) {
            return;
          }
          defaultHandler(warning);
        },
        input: {
          main: resolve(__vite_injected_original_dirname2, "index.html"),
          "starter/": resolve(__vite_injected_original_dirname2, "starter/index.html"),
          "examples/basic/page": resolve(
            __vite_injected_original_dirname2,
            "examples/basic/page/index.html"
          ),
          "examples/basic/edgeless": resolve(
            __vite_injected_original_dirname2,
            "examples/basic/edgeless/index.html"
          ),
          "examples/multiple-editors/page-page": resolve(
            __vite_injected_original_dirname2,
            "examples/multiple-editors/page-page/index.html"
          ),
          "examples/multiple-editors/page-edgeless": resolve(
            __vite_injected_original_dirname2,
            "examples/multiple-editors/page-edgeless/index.html"
          ),
          "examples/multiple-editors/edgeless-edgeless": resolve(
            __vite_injected_original_dirname2,
            "examples/multiple-editors/edgeless-edgeless/index.html"
          ),
          "examples/inline": resolve(__vite_injected_original_dirname2, "examples/inline/index.html")
        },
        treeshake: true,
        output: {
          sourcemapIgnoreList: (relativeSourcePath) => {
            const normalizedPath = path3.normalize(relativeSourcePath);
            return normalizedPath.includes("node_modules");
          },
          manualChunks(id, { getModuleInfo }) {
            for (const group of Object.keys(chunkGroups)) {
              const deps = chunkGroups[group];
              if (isDepInclude(id, deps, [], getModuleInfo)) {
                if (chunkSizeReport && id.includes("node_modules")) {
                  console.log(group + ":", id);
                  console.log(
                    group + ":",
                    fs.statSync(id.replace("\0", "").replace(/\?.*/, "")).size / 1024,
                    "KB"
                  );
                }
                return group;
              }
            }
          }
        }
      }
    }
  });
};
export {
  vite_config_default as default,
  sourcemapExclude
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic2NyaXB0cy9obXItcGx1Z2luL2luZGV4LnRzIiwgInNjcmlwdHMvaG1yLXBsdWdpbi9maW5lLXR1bmUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxtYWhkYWFkXFxcXGJsb2Nrc3VpdGVcXFxccGFja2FnZXNcXFxccGxheWdyb3VuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcbWFoZGFhZFxcXFxibG9ja3N1aXRlXFxcXHBhY2thZ2VzXFxcXHBsYXlncm91bmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L21haGRhYWQvYmxvY2tzdWl0ZS9wYWNrYWdlcy9wbGF5Z3JvdW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHR5cGUgeyBHZXRNYW51YWxDaHVuayB9IGZyb20gJ3JvbGx1cCc7XHJcbmltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSAndml0ZSc7XHJcblxyXG5pbXBvcnQgZnMgZnJvbSAnbm9kZTpmcyc7XHJcbmltcG9ydCB7IGNyZWF0ZVJlcXVpcmUgfSBmcm9tICdub2RlOm1vZHVsZSc7XHJcbmltcG9ydCB7IGNwdXMgfSBmcm9tICdub2RlOm9zJztcclxuaW1wb3J0IHBhdGgsIHsgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCc7XHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgaXN0YW5idWwgZnJvbSAndml0ZS1wbHVnaW4taXN0YW5idWwnO1xyXG5pbXBvcnQgd2FzbSBmcm9tICd2aXRlLXBsdWdpbi13YXNtJztcclxuXHJcbmltcG9ydCB7IGhtclBsdWdpbiB9IGZyb20gJy4vc2NyaXB0cy9obXItcGx1Z2luJztcclxuXHJcbmNvbnN0IHJlcXVpcmUgPSBjcmVhdGVSZXF1aXJlKGltcG9ydC5tZXRhLnVybCk7XHJcbmNvbnN0IGVuYWJsZUlzdGFuYnVsID0gISFwcm9jZXNzLmVudi5DT1ZFUkFHRTtcclxuY29uc3QgY2h1bmtTaXplUmVwb3J0ID0gISFwcm9jZXNzLmVudi5DSFVOS19TSVpFX1JFUE9SVDtcclxuXHJcbmNvbnN0IGNhY2hlID0gbmV3IE1hcCgpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNvdXJjZW1hcEV4Y2x1ZGUoKTogUGx1Z2luIHtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ3NvdXJjZW1hcC1leGNsdWRlJyxcclxuICAgIHRyYW5zZm9ybShjb2RlOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcclxuICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSAmJiAhaWQuaW5jbHVkZXMoJ0BibG9ja3N1aXRlJykpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgY29kZSxcclxuICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9yb2xsdXAvcm9sbHVwL2Jsb2IvbWFzdGVyL2RvY3MvcGx1Z2luLWRldmVsb3BtZW50L2luZGV4Lm1kI3NvdXJjZS1jb2RlLXRyYW5zZm9ybWF0aW9uc1xyXG4gICAgICAgICAgbWFwOiB7IG1hcHBpbmdzOiAnJyB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG5cclxudHlwZSBHZXRNb2R1bGVJbmZvID0gUGFyYW1ldGVyczxHZXRNYW51YWxDaHVuaz5bMV1bJ2dldE1vZHVsZUluZm8nXTtcclxuXHJcbmZ1bmN0aW9uIGlzRGVwSW5jbHVkZShcclxuICBpZDogc3RyaW5nLFxyXG4gIGRlcFBhdGhzOiBzdHJpbmdbXSxcclxuICBpbXBvcnRDaGFpbjogc3RyaW5nW10sXHJcbiAgZ2V0TW9kdWxlSW5mbzogR2V0TW9kdWxlSW5mb1xyXG4pOiBib29sZWFuIHwgdW5kZWZpbmVkIHtcclxuICBjb25zdCBrZXkgPSBgJHtpZH0tJHtkZXBQYXRocy5qb2luKCd8Jyl9YDtcclxuICBpZiAoaW1wb3J0Q2hhaW4uaW5jbHVkZXMoaWQpKSB7XHJcbiAgICBjYWNoZS5zZXQoa2V5LCBmYWxzZSk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIGlmIChjYWNoZS5oYXMoa2V5KSkge1xyXG4gICAgcmV0dXJuIGNhY2hlLmdldChrZXkpO1xyXG4gIH1cclxuICBmb3IgKGNvbnN0IGRlcFBhdGggb2YgZGVwUGF0aHMpIHtcclxuICAgIGlmIChpZC5pbmNsdWRlcyhkZXBQYXRoKSkge1xyXG4gICAgICBpbXBvcnRDaGFpbi5mb3JFYWNoKGl0ZW0gPT5cclxuICAgICAgICBjYWNoZS5zZXQoYCR7aXRlbX0tJHtkZXBQYXRocy5qb2luKCd8Jyl9YCwgdHJ1ZSlcclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbnN0IG1vZHVsZUluZm8gPSBnZXRNb2R1bGVJbmZvKGlkKTtcclxuICBpZiAoIW1vZHVsZUluZm8gfHwgIW1vZHVsZUluZm8uaW1wb3J0ZXJzKSB7XHJcbiAgICBjYWNoZS5zZXQoa2V5LCBmYWxzZSk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIGNvbnN0IGlzSW5jbHVkZSA9IG1vZHVsZUluZm8uaW1wb3J0ZXJzLnNvbWUoaW1wb3J0ZXIgPT5cclxuICAgIGlzRGVwSW5jbHVkZShpbXBvcnRlciwgZGVwUGF0aHMsIGltcG9ydENoYWluLmNvbmNhdChpZCksIGdldE1vZHVsZUluZm8pXHJcbiAgKTtcclxuICBjYWNoZS5zZXQoa2V5LCBpc0luY2x1ZGUpO1xyXG4gIHJldHVybiBpc0luY2x1ZGU7XHJcbn1cclxuXHJcbmNvbnN0IGNodW5rR3JvdXBzID0ge1xyXG4gIGZyYW1ld29yazogW1xyXG4gICAgcmVxdWlyZS5yZXNvbHZlKCdAYmxvY2tzdWl0ZS9ibG9jay1zdGQnKSxcclxuICAgIHJlcXVpcmUucmVzb2x2ZSgnQGJsb2Nrc3VpdGUvYmxvY2stc3RkL2dmeCcpLFxyXG4gICAgcmVxdWlyZS5yZXNvbHZlKCdAYmxvY2tzdWl0ZS9nbG9iYWwnKSxcclxuICAgIHJlcXVpcmUucmVzb2x2ZSgnQGJsb2Nrc3VpdGUvZ2xvYmFsL3V0aWxzJyksXHJcbiAgICByZXF1aXJlLnJlc29sdmUoJ0BibG9ja3N1aXRlL2dsb2JhbC9lbnYnKSxcclxuICAgIHJlcXVpcmUucmVzb2x2ZSgnQGJsb2Nrc3VpdGUvZ2xvYmFsL2V4Y2VwdGlvbnMnKSxcclxuICAgIHJlcXVpcmUucmVzb2x2ZSgnQGJsb2Nrc3VpdGUvZ2xvYmFsL2RpJyksXHJcbiAgICByZXF1aXJlLnJlc29sdmUoJ0BibG9ja3N1aXRlL2lubGluZScpLFxyXG4gICAgcmVxdWlyZS5yZXNvbHZlKCdAYmxvY2tzdWl0ZS9zdG9yZScpLFxyXG4gICAgcmVxdWlyZS5yZXNvbHZlKCdAYmxvY2tzdWl0ZS9zeW5jJyksXHJcbiAgXSxcclxuICBjb21wb25lbnRzOiBbXHJcbiAgICByZXF1aXJlLnJlc29sdmUoJ0BibG9ja3N1aXRlL2FmZmluZS1jb21wb25lbnRzL2ljb25zJyksXHJcbiAgICByZXF1aXJlLnJlc29sdmUoJ0BibG9ja3N1aXRlL2FmZmluZS1jb21wb25lbnRzL3BlZWsnKSxcclxuICAgIHJlcXVpcmUucmVzb2x2ZSgnQGJsb2Nrc3VpdGUvYWZmaW5lLWNvbXBvbmVudHMvcG9ydGFsJyksXHJcbiAgICByZXF1aXJlLnJlc29sdmUoJ0BibG9ja3N1aXRlL2FmZmluZS1jb21wb25lbnRzL2hvdmVyJyksXHJcbiAgICByZXF1aXJlLnJlc29sdmUoJ0BibG9ja3N1aXRlL2FmZmluZS1jb21wb25lbnRzL3Rvb2xiYXInKSxcclxuICAgIHJlcXVpcmUucmVzb2x2ZSgnQGJsb2Nrc3VpdGUvYWZmaW5lLWNvbXBvbmVudHMvdG9hc3QnKSxcclxuICAgIHJlcXVpcmUucmVzb2x2ZSgnQGJsb2Nrc3VpdGUvYWZmaW5lLWNvbXBvbmVudHMvcmljaC10ZXh0JyksXHJcbiAgICByZXF1aXJlLnJlc29sdmUoJ0BibG9ja3N1aXRlL2FmZmluZS1jb21wb25lbnRzL2NhcHRpb24nKSxcclxuICAgIHJlcXVpcmUucmVzb2x2ZSgnQGJsb2Nrc3VpdGUvYWZmaW5lLWNvbXBvbmVudHMvY29udGV4dC1tZW51JyksXHJcbiAgICByZXF1aXJlLnJlc29sdmUoJ0BibG9ja3N1aXRlL2FmZmluZS1jb21wb25lbnRzL2RhdGUtcGlja2VyJyksXHJcbiAgICByZXF1aXJlLnJlc29sdmUoJ0BibG9ja3N1aXRlL2FmZmluZS1jb21wb25lbnRzL2RyYWctaW5kaWNhdG9yJyksXHJcbiAgXSxcclxuICBhZmZpbmU6IFtcclxuICAgIHJlcXVpcmUucmVzb2x2ZSgnQGJsb2Nrc3VpdGUvYWZmaW5lLXNoYXJlZCcpLFxyXG4gICAgcmVxdWlyZS5yZXNvbHZlKCdAYmxvY2tzdWl0ZS9hZmZpbmUtbW9kZWwnKSxcclxuICAgIHJlcXVpcmUucmVzb2x2ZSgnQGJsb2Nrc3VpdGUvYWZmaW5lLWJsb2NrLWxpc3QnKSxcclxuICAgIHJlcXVpcmUucmVzb2x2ZSgnQGJsb2Nrc3VpdGUvYWZmaW5lLWJsb2NrLXBhcmFncmFwaCcpLFxyXG4gICAgcmVxdWlyZS5yZXNvbHZlKCdAYmxvY2tzdWl0ZS9hZmZpbmUtYmxvY2stc3VyZmFjZScpLFxyXG4gICAgcmVxdWlyZS5yZXNvbHZlKCdAYmxvY2tzdWl0ZS9kYXRhLXZpZXcnKSxcclxuICBdLFxyXG4gIGRhdGVmbnM6IFtwYXRoLmRpcm5hbWUocmVxdWlyZS5yZXNvbHZlKCdkYXRlLWZucycpKV0sXHJcbiAgZG9tcHVyaWZ5OiBbcGF0aC5kaXJuYW1lKHJlcXVpcmUucmVzb2x2ZSgnZG9tcHVyaWZ5JykpXSxcclxuICBzaGlraTogW3BhdGguZGlybmFtZShyZXF1aXJlLnJlc29sdmUoJ0BzaGlraWpzL2NvcmUnKSldLFxyXG4gIGRvdExvdHRpZTogW3BhdGguZGlybmFtZShyZXF1aXJlLnJlc29sdmUoJ0Bsb3R0aWVmaWxlcy9kb3Rsb3R0aWUtd2MnKSldLFxyXG4gIHVuaWZpZWQ6IFtcclxuICAgIHBhdGguZGlybmFtZShyZXF1aXJlLnJlc29sdmUoJ3VuaWZpZWQnKSksXHJcbiAgICBwYXRoLmRpcm5hbWUocmVxdWlyZS5yZXNvbHZlKCdyZWh5cGUtcGFyc2UnKSksXHJcbiAgICBwYXRoLmRpcm5hbWUocmVxdWlyZS5yZXNvbHZlKCdyZWh5cGUtc3RyaW5naWZ5JykpLFxyXG4gICAgcGF0aC5kaXJuYW1lKHJlcXVpcmUucmVzb2x2ZSgncmVtYXJrLXBhcnNlJykpLFxyXG4gICAgcGF0aC5kaXJuYW1lKHJlcXVpcmUucmVzb2x2ZSgncmVtYXJrLXN0cmluZ2lmeScpKSxcclxuICAgIHBhdGguZGlybmFtZShyZXF1aXJlLnJlc29sdmUoJ21kYXN0LXV0aWwtZ2ZtLWF1dG9saW5rLWxpdGVyYWwnKSksXHJcbiAgICBwYXRoLmRpcm5hbWUocmVxdWlyZS5yZXNvbHZlKCdtZGFzdC11dGlsLWdmbS1zdHJpa2V0aHJvdWdoJykpLFxyXG4gICAgcGF0aC5kaXJuYW1lKHJlcXVpcmUucmVzb2x2ZSgnbWRhc3QtdXRpbC1nZm0tdGFibGUnKSksXHJcbiAgICBwYXRoLmRpcm5hbWUocmVxdWlyZS5yZXNvbHZlKCdtZGFzdC11dGlsLWdmbS10YXNrLWxpc3QtaXRlbScpKSxcclxuICAgIHBhdGguZGlybmFtZShyZXF1aXJlLnJlc29sdmUoJ21pY3JvbWFyay1leHRlbnNpb24tZ2ZtLWF1dG9saW5rLWxpdGVyYWwnKSksXHJcbiAgICBwYXRoLmRpcm5hbWUocmVxdWlyZS5yZXNvbHZlKCdtaWNyb21hcmstZXh0ZW5zaW9uLWdmbS1zdHJpa2V0aHJvdWdoJykpLFxyXG4gICAgcGF0aC5kaXJuYW1lKHJlcXVpcmUucmVzb2x2ZSgnbWljcm9tYXJrLWV4dGVuc2lvbi1nZm0tdGFibGUnKSksXHJcbiAgICBwYXRoLmRpcm5hbWUocmVxdWlyZS5yZXNvbHZlKCdtaWNyb21hcmstZXh0ZW5zaW9uLWdmbS10YXNrLWxpc3QtaXRlbScpKSxcclxuICAgIHBhdGguZGlybmFtZShyZXF1aXJlLnJlc29sdmUoJ21pY3JvbWFyay11dGlsLWNvbWJpbmUtZXh0ZW5zaW9ucycpKSxcclxuICBdLFxyXG4gIGJsb2NrczogW1xyXG4gICAgcmVxdWlyZS5yZXNvbHZlKCdAYmxvY2tzdWl0ZS9ibG9ja3MnKSxcclxuICAgIHJlcXVpcmUucmVzb2x2ZSgnQGJsb2Nrc3VpdGUvYmxvY2tzL3NjaGVtYXMnKSxcclxuICBdLFxyXG4gIHByZXNldHM6IFtyZXF1aXJlLnJlc29sdmUoJ0BibG9ja3N1aXRlL3ByZXNldHMnKV0sXHJcbiAgY29tbW9uOiBbXHJcbiAgICByZXF1aXJlLnJlc29sdmUoJ0BibG9ja3N1aXRlL2ljb25zL2xpdCcpLFxyXG4gICAgcmVxdWlyZS5yZXNvbHZlKCdAdG9ldmVyeXRoaW5nL3RoZW1lJyksXHJcbiAgICByZXF1aXJlLnJlc29sdmUoJ0B0b2V2ZXJ5dGhpbmcveS1pbmRleGVkZGInKSxcclxuICAgIHJlcXVpcmUucmVzb2x2ZSgnQHByZWFjdC9zaWduYWxzLWNvcmUnKSxcclxuICAgIHJlcXVpcmUucmVzb2x2ZSgnQGxpdC9jb250ZXh0JyksXHJcbiAgICByZXF1aXJlLnJlc29sdmUoJ2xpdCcpLFxyXG4gICAgcmVxdWlyZS5yZXNvbHZlKCd6b2QnKSxcclxuICAgIHJlcXVpcmUucmVzb2x2ZSgnbWluaW1hdGNoJyksXHJcbiAgICByZXF1aXJlLnJlc29sdmUoJ25hbm9pZCcpLFxyXG4gICAgcmVxdWlyZS5yZXNvbHZlKCd5anMnKSxcclxuICBdLFxyXG59O1xyXG5cclxuY29uc3QgY2xlYXJTaXRlRGF0YVBsdWdpbiA9ICgpID0+XHJcbiAgKHtcclxuICAgIG5hbWU6ICdjbGVhci1zaXRlLWRhdGEnLFxyXG4gICAgY29uZmlndXJlU2VydmVyKHNlcnZlcikge1xyXG4gICAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gICAgICAgIGlmIChyZXEudXJsID09PSAnL0NsZWFyLVNpdGUtRGF0YScpIHtcclxuICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gMjAwO1xyXG4gICAgICAgICAgcmVzLnNldEhlYWRlcignQ2xlYXItU2l0ZS1EYXRhJywgJ1wiKlwiJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5leHQoKTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gIH0pIGFzIFBsdWdpbjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfSkgPT4ge1xyXG4gIHByb2Nlc3MuZW52ID0geyAuLi5wcm9jZXNzLmVudiwgLi4ubG9hZEVudihtb2RlLCBfX2Rpcm5hbWUsICcnKSB9O1xyXG5cclxuICByZXR1cm4gZGVmaW5lQ29uZmlnKHtcclxuICAgIGVudkRpcjogX19kaXJuYW1lLFxyXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgICdpbXBvcnQubWV0YS5lbnYuUExBWUdST1VORF9TRVJWRVInOiBKU09OLnN0cmluZ2lmeShcclxuICAgICAgICBwcm9jZXNzLmVudi5QTEFZR1JPVU5EX1NFUlZFUiA/PyAnaHR0cDovL2xvY2FsaG9zdDo4Nzg3J1xyXG4gICAgICApLFxyXG4gICAgICAnaW1wb3J0Lm1ldGEuZW52LlBMQVlHUk9VTkRfV1MnOiBKU09OLnN0cmluZ2lmeShcclxuICAgICAgICBwcm9jZXNzLmVudi5QTEFZR1JPVU5EX1dTID8/ICd3czovL2xvY2FsaG9zdDo4Nzg3J1xyXG4gICAgICApLFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgaG1yUGx1Z2luLFxyXG4gICAgICBzb3VyY2VtYXBFeGNsdWRlKCksXHJcbiAgICAgIGVuYWJsZUlzdGFuYnVsICYmXHJcbiAgICAgICAgaXN0YW5idWwoe1xyXG4gICAgICAgICAgY3dkOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4uLy4uJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgICAgICBpbmNsdWRlOiBbJ3BhY2thZ2VzLyoqL3NyYy8qJ10sXHJcbiAgICAgICAgICBleGNsdWRlOiBbXHJcbiAgICAgICAgICAgICdub2RlX21vZHVsZXMnLFxyXG4gICAgICAgICAgICAndGVzdHMnLFxyXG4gICAgICAgICAgICBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4nLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBmb3JjZUJ1aWxkSW5zdHJ1bWVudDogdHJ1ZSxcclxuICAgICAgICB9KSxcclxuICAgICAgd2FzbSgpLFxyXG4gICAgICBjbGVhclNpdGVEYXRhUGx1Z2luKCksXHJcbiAgICBdLFxyXG4gICAgZXNidWlsZDoge1xyXG4gICAgICB0YXJnZXQ6ICdlczIwMTgnLFxyXG4gICAgfSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgZXh0ZW5zaW9uczogWycudHMnLCAnLmpzJ10sXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgdGFyZ2V0OiAnZXMyMDIyJyxcclxuICAgICAgc291cmNlbWFwOiB0cnVlLFxyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgIG1heFBhcmFsbGVsRmlsZU9wczogTWF0aC5tYXgoMSwgY3B1cygpLmxlbmd0aCAtIDEpLFxyXG4gICAgICAgIG9ud2Fybih3YXJuaW5nLCBkZWZhdWx0SGFuZGxlcikge1xyXG4gICAgICAgICAgaWYgKFsnRVZBTCcsICdTT1VSQ0VNQVBfRVJST1InXS5pbmNsdWRlcyh3YXJuaW5nLmNvZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRlZmF1bHRIYW5kbGVyKHdhcm5pbmcpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5wdXQ6IHtcclxuICAgICAgICAgIG1haW46IHJlc29sdmUoX19kaXJuYW1lLCAnaW5kZXguaHRtbCcpLFxyXG4gICAgICAgICAgJ3N0YXJ0ZXIvJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzdGFydGVyL2luZGV4Lmh0bWwnKSxcclxuICAgICAgICAgICdleGFtcGxlcy9iYXNpYy9wYWdlJzogcmVzb2x2ZShcclxuICAgICAgICAgICAgX19kaXJuYW1lLFxyXG4gICAgICAgICAgICAnZXhhbXBsZXMvYmFzaWMvcGFnZS9pbmRleC5odG1sJ1xyXG4gICAgICAgICAgKSxcclxuICAgICAgICAgICdleGFtcGxlcy9iYXNpYy9lZGdlbGVzcyc6IHJlc29sdmUoXHJcbiAgICAgICAgICAgIF9fZGlybmFtZSxcclxuICAgICAgICAgICAgJ2V4YW1wbGVzL2Jhc2ljL2VkZ2VsZXNzL2luZGV4Lmh0bWwnXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgICAgJ2V4YW1wbGVzL211bHRpcGxlLWVkaXRvcnMvcGFnZS1wYWdlJzogcmVzb2x2ZShcclxuICAgICAgICAgICAgX19kaXJuYW1lLFxyXG4gICAgICAgICAgICAnZXhhbXBsZXMvbXVsdGlwbGUtZWRpdG9ycy9wYWdlLXBhZ2UvaW5kZXguaHRtbCdcclxuICAgICAgICAgICksXHJcbiAgICAgICAgICAnZXhhbXBsZXMvbXVsdGlwbGUtZWRpdG9ycy9wYWdlLWVkZ2VsZXNzJzogcmVzb2x2ZShcclxuICAgICAgICAgICAgX19kaXJuYW1lLFxyXG4gICAgICAgICAgICAnZXhhbXBsZXMvbXVsdGlwbGUtZWRpdG9ycy9wYWdlLWVkZ2VsZXNzL2luZGV4Lmh0bWwnXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgICAgJ2V4YW1wbGVzL211bHRpcGxlLWVkaXRvcnMvZWRnZWxlc3MtZWRnZWxlc3MnOiByZXNvbHZlKFxyXG4gICAgICAgICAgICBfX2Rpcm5hbWUsXHJcbiAgICAgICAgICAgICdleGFtcGxlcy9tdWx0aXBsZS1lZGl0b3JzL2VkZ2VsZXNzLWVkZ2VsZXNzL2luZGV4Lmh0bWwnXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgICAgJ2V4YW1wbGVzL2lubGluZSc6IHJlc29sdmUoX19kaXJuYW1lLCAnZXhhbXBsZXMvaW5saW5lL2luZGV4Lmh0bWwnKSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRyZWVzaGFrZTogdHJ1ZSxcclxuICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgIHNvdXJjZW1hcElnbm9yZUxpc3Q6IHJlbGF0aXZlU291cmNlUGF0aCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRQYXRoID0gcGF0aC5ub3JtYWxpemUocmVsYXRpdmVTb3VyY2VQYXRoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRQYXRoLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBtYW51YWxDaHVua3MoaWQsIHsgZ2V0TW9kdWxlSW5mbyB9KSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgT2JqZWN0LmtleXMoY2h1bmtHcm91cHMpKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgZGVwcyA9IGNodW5rR3JvdXBzW2dyb3VwXTtcclxuICAgICAgICAgICAgICBpZiAoaXNEZXBJbmNsdWRlKGlkLCBkZXBzLCBbXSwgZ2V0TW9kdWxlSW5mbykpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjaHVua1NpemVSZXBvcnQgJiYgaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGdyb3VwICsgJzonLCBpZCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwICsgJzonLFxyXG4gICAgICAgICAgICAgICAgICAgIGZzLnN0YXRTeW5jKGlkLnJlcGxhY2UoJ1xceDAwJywgJycpLnJlcGxhY2UoL1xcPy4qLywgJycpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgLnNpemUgLyAxMDI0LFxyXG4gICAgICAgICAgICAgICAgICAgICdLQidcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBncm91cDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSk7XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcbWFoZGFhZFxcXFxibG9ja3N1aXRlXFxcXHBhY2thZ2VzXFxcXHBsYXlncm91bmRcXFxcc2NyaXB0c1xcXFxobXItcGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxtYWhkYWFkXFxcXGJsb2Nrc3VpdGVcXFxccGFja2FnZXNcXFxccGxheWdyb3VuZFxcXFxzY3JpcHRzXFxcXGhtci1wbHVnaW5cXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L21haGRhYWQvYmxvY2tzdWl0ZS9wYWNrYWdlcy9wbGF5Z3JvdW5kL3NjcmlwdHMvaG1yLXBsdWdpbi9pbmRleC50c1wiO2ltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCc7XHJcbmltcG9ydCB7XHJcbiAgcHJlc2V0cyxcclxuICBobXJQbHVnaW4gYXMgd2NIbXJQbHVnaW4sXHJcbn0gZnJvbSAndml0ZS1wbHVnaW4td2ViLWNvbXBvbmVudHMtaG1yJztcclxuXHJcbmltcG9ydCB7IGZpbmVUdW5lSG1yIH0gZnJvbSAnLi9maW5lLXR1bmUuanMnO1xyXG5cclxuY29uc3QgY3VzdG9tTGl0UGF0aCA9IHBhdGgucmVzb2x2ZShcclxuICBfX2Rpcm5hbWUsXHJcbiAgJy4uLy4uLy4uL2Jsb2Nrcy9zcmMvX2xlZ2FjeS9pbmRleC5qcydcclxuKTtcclxuXHJcbmNvbnN0IGluY2x1ZGUgPSBbJy4uL2Jsb2Nrcy9zcmMvKiovKiddO1xyXG5jb25zdCBleGNsdWRlID0gWycqKi8qL25vZGVfbW9kdWxlcy8qKi8qJ107XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgY29uc3QgaG1yUGx1Z2luID0gcHJvY2Vzcy5lbnYuV0NfSE1SXHJcbiAgPyBbXHJcbiAgICAgIHdjSG1yUGx1Z2luKHtcclxuICAgICAgICBpbmNsdWRlLFxyXG4gICAgICAgIGV4Y2x1ZGUsXHJcbiAgICAgICAgcHJlc2V0czogW3ByZXNldHMubGl0XSxcclxuICAgICAgICBkZWNvcmF0b3JzOiBbeyBuYW1lOiAnY3VzdG9tRWxlbWVudCcsIGltcG9ydDogJ2xpdC9kZWNvcmF0b3JzLmpzJyB9XSxcclxuICAgICAgICBiYXNlQ2xhc3NlczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnU2hhZG93bGVzc0VsZW1lbnQnLFxyXG4gICAgICAgICAgICBpbXBvcnQ6IGN1c3RvbUxpdFBhdGgsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0pLFxyXG4gICAgICBmaW5lVHVuZUhtcih7XHJcbiAgICAgICAgaW5jbHVkZSxcclxuICAgICAgICBleGNsdWRlLFxyXG4gICAgICB9KSxcclxuICAgIF1cclxuICA6IFtdO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXG1haGRhYWRcXFxcYmxvY2tzdWl0ZVxcXFxwYWNrYWdlc1xcXFxwbGF5Z3JvdW5kXFxcXHNjcmlwdHNcXFxcaG1yLXBsdWdpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcbWFoZGFhZFxcXFxibG9ja3N1aXRlXFxcXHBhY2thZ2VzXFxcXHBsYXlncm91bmRcXFxcc2NyaXB0c1xcXFxobXItcGx1Z2luXFxcXGZpbmUtdHVuZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovbWFoZGFhZC9ibG9ja3N1aXRlL3BhY2thZ2VzL3BsYXlncm91bmQvc2NyaXB0cy9obXItcGx1Z2luL2ZpbmUtdHVuZS50c1wiO2ltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSAndml0ZSc7XHJcblxyXG5pbXBvcnQgeyBpbml0LCBwYXJzZSB9IGZyb20gJ2VzLW1vZHVsZS1sZXhlcic7XHJcbmltcG9ydCBNYWdpY1N0cmluZyBmcm9tICdtYWdpYy1zdHJpbmcnO1xyXG5pbXBvcnQgbWljcm9tYXRjaCBmcm9tICdtaWNyb21hdGNoJztcclxuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcclxuY29uc3QgaXNNYXRjaCA9IG1pY3JvbWF0Y2guaXNNYXRjaDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5lVHVuZUhtcih7XHJcbiAgaW5jbHVkZSxcclxuICBleGNsdWRlLFxyXG59OiB7XHJcbiAgaW5jbHVkZTogc3RyaW5nW107XHJcbiAgZXhjbHVkZTogc3RyaW5nW107XHJcbn0pOiBQbHVnaW4ge1xyXG4gIGxldCByb290ID0gJyc7XHJcbiAgY29uc3QgcGx1Z2luOiBQbHVnaW4gPSB7XHJcbiAgICBuYW1lOiAnYWRkLWhvdC1mb3ItcHVyZS1leHBvcnRzJyxcclxuICAgIGFwcGx5OiAnc2VydmUnLFxyXG4gICAgY29uZmlnUmVzb2x2ZWQoY29uZmlnKSB7XHJcbiAgICAgIHJvb3QgPSBjb25maWcucm9vdDtcclxuICAgIH0sXHJcbiAgICBhc3luYyBjb25maWd1cmVTZXJ2ZXIoKSB7XHJcbiAgICAgIGF3YWl0IGluaXQ7XHJcbiAgICB9LFxyXG4gICAgdHJhbnNmb3JtOiAoY29kZSwgaWQpID0+IHtcclxuICAgICAgLy8gb25seSBoYW5kbGUganMvdHMgZmlsZXNcclxuICAgICAgY29uc3QgaW5jbHVkZUdsb2IgPSBpbmNsdWRlLm1hcChpID0+IHBhdGgucmVzb2x2ZShyb290LCBpKSk7XHJcbiAgICAgIGNvbnN0IGV4Y2x1ZGVHbG9iID0gZXhjbHVkZS5tYXAoaSA9PiBwYXRoLnJlc29sdmUocm9vdCwgaSkpO1xyXG4gICAgICBjb25zdCBpc0luU2NvcGUgPSBpc01hdGNoKGlkLCBpbmNsdWRlR2xvYikgJiYgIWlzTWF0Y2goaWQsIGV4Y2x1ZGVHbG9iKTtcclxuICAgICAgaWYgKCFpc0luU2NvcGUpIHJldHVybjtcclxuICAgICAgaWYgKCEoaWQuZW5kc1dpdGgoJy5qcycpIHx8IGlkLmVuZHNXaXRoKCcudHMnKSkpIHJldHVybjtcclxuICAgICAgLy8gb25seSBoYW5kbGUgZmlsZXMgd2hpY2ggbm90IGNvbnRhaW5zIExpdCBlbGVtZW50c1xyXG4gICAgICBpZiAoY29kZS5pbmNsdWRlcygnaW1wb3J0Lm1ldGEuaG90JykpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IFtpbXBvcnRzLCBleHBvcnRzXSA9IHBhcnNlKGNvZGUsIGlkKTtcclxuICAgICAgaWYgKGV4cG9ydHMubGVuZ3RoID09PSAwICYmIGltcG9ydHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNvbnN0IG1vZHVsZXMgPSBpbXBvcnRzLm1hcChpID0+IGkubik7XHJcbiAgICAgICAgY29uc3QgbW9kdWxlc0VuZHNXaXRoVHMgPSBtb2R1bGVzXHJcbiAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXHJcbiAgICAgICAgICAubWFwKG0gPT4gbSEucmVwbGFjZSgvXFwuanMkLywgJy50cycpKTtcclxuICAgICAgICBjb25zdCBwcmVhbWJsZSA9IGBcclxuICAgICAgICAgIGlmIChpbXBvcnQubWV0YS5ob3QpIHtcclxuICAgICAgICAgICAgaW1wb3J0Lm1ldGEuaG90LmFjY2VwdCgke0pTT04uc3RyaW5naWZ5KFxyXG4gICAgICAgICAgICAgIG1vZHVsZXNFbmRzV2l0aFRzXHJcbiAgICAgICAgICAgICl9LCBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAvLyBzb21lIHVwZGF0ZSBsb2dpY1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgIGNvbnN0IHMgPSBuZXcgTWFnaWNTdHJpbmcoY29kZSk7XHJcbiAgICAgICAgcy5wcmVwZW5kKHByZWFtYmxlICsgJ1xcbicpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBjb2RlOiBzLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICBtYXA6IHMuZ2VuZXJhdGVNYXAoeyBoaXJlczogdHJ1ZSwgc291cmNlOiBpZCwgaW5jbHVkZUNvbnRlbnQ6IHRydWUgfSksXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIHJldHVybiBwbHVnaW47XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUdBLE9BQU8sUUFBUTtBQUNmLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsWUFBWTtBQUNyQixPQUFPQSxTQUFRLGVBQWU7QUFDOUIsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sVUFBVTs7O0FDVnVWLE9BQU9DLFdBQVU7QUFDelg7QUFBQSxFQUNFO0FBQUEsRUFDQSxhQUFhO0FBQUEsT0FDUjs7O0FDRlAsU0FBUyxNQUFNLGFBQWE7QUFDNUIsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxVQUFVO0FBQ2pCLElBQU0sVUFBVSxXQUFXO0FBRXBCLFNBQVMsWUFBWTtBQUFBLEVBQzFCLFNBQUFDO0FBQUEsRUFDQSxTQUFBQztBQUNGLEdBR1c7QUFDVCxNQUFJLE9BQU87QUFDWCxRQUFNLFNBQWlCO0FBQUEsSUFDckIsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLElBQ1AsZUFBZSxRQUFRO0FBQ3JCLGFBQU8sT0FBTztBQUFBLElBQ2hCO0FBQUEsSUFDQSxNQUFNLGtCQUFrQjtBQUN0QixZQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsV0FBVyxDQUFDLE1BQU0sT0FBTztBQUV2QixZQUFNLGNBQWNELFNBQVEs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QUFBLFFBQ2IsT0FBTztBQUFBLFFBQ1Asb0JBQW9CLEtBQUssSUFBSSxHQUFHLEtBQUssRUFBRSxTQUFTLENBQUM7QUFBQSxRQUNqRCxPQUFPLFNBQVMsZ0JBQWdCO0FBQzlCLGNBQUksQ0FBQyxRQUFRLGlCQUFpQixFQUFFLFNBQVMsUUFBUSxJQUFJLEdBQUc7QUFDdEQ7QUFBQSxVQUNGO0FBQ0EseUJBQWUsT0FBTztBQUFBLFFBQ3hCO0FBQUEsUUFDQSxPQUFPO0FBQUEsVUFDTCxNQUFNLFFBQVFBLG1DQUFXLFlBQVk7QUFBQSxVQUNyQyxZQUFZLFFBQVFBLG1DQUFXLG9CQUFvQjtBQUFBLFVBQ25ELHVCQUF1QjtBQUFBLFlBQ3JCQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsVUFDQSwyQkFBMkI7QUFBQSxZQUN6QkE7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFVBQ0EsdUNBQXVDO0FBQUEsWUFDckNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxVQUNBLDJDQUEyQztBQUFBLFlBQ3pDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsVUFDQSwrQ0FBK0M7QUFBQSxZQUM3Q0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFVBQ0EsbUJBQW1CLFFBQVFBLG1DQUFXLDRCQUE0QjtBQUFBLFFBQ3BFO0FBQUEsUUFDQSxXQUFXO0FBQUEsUUFDWCxRQUFRO0FBQUEsVUFDTixxQkFBcUIsd0JBQXNCO0FBQ3pDLGtCQUFNLGlCQUFpQkQsTUFBSyxVQUFVLGtCQUFrQjtBQUN4RCxtQkFBTyxlQUFlLFNBQVMsY0FBYztBQUFBLFVBQy9DO0FBQUEsVUFDQSxhQUFhLElBQUksRUFBRSxjQUFjLEdBQUc7QUFDbEMsdUJBQVcsU0FBUyxPQUFPLEtBQUssV0FBVyxHQUFHO0FBQzVDLG9CQUFNLE9BQU8sWUFBWSxLQUFLO0FBQzlCLGtCQUFJLGFBQWEsSUFBSSxNQUFNLENBQUMsR0FBRyxhQUFhLEdBQUc7QUFDN0Msb0JBQUksbUJBQW1CLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFDbEQsMEJBQVEsSUFBSSxRQUFRLEtBQUssRUFBRTtBQUMzQiwwQkFBUTtBQUFBLG9CQUNOLFFBQVE7QUFBQSxvQkFDUixHQUFHLFNBQVMsR0FBRyxRQUFRLE1BQVEsRUFBRSxFQUFFLFFBQVEsUUFBUSxFQUFFLENBQUMsRUFDbkQsT0FBTztBQUFBLG9CQUNWO0FBQUEsa0JBQ0Y7QUFBQSxnQkFDRjtBQUNBLHVCQUFPO0FBQUEsY0FDVDtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBQ0g7IiwKICAibmFtZXMiOiBbInBhdGgiLCAicGF0aCIsICJpbmNsdWRlIiwgImV4Y2x1ZGUiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJyZXF1aXJlIiwgInBhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiXQp9Cg==
