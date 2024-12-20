// packages/blocks/vitest.config.ts
import { defineConfig } from "file:///D:/Vue_Project/hacoupian-mahdaad/blocksuite/node_modules/vitest/dist/config.js";
var vitest_config_default = defineConfig({
  esbuild: {
    target: "es2018"
  },
  test: {
    globalSetup: "../../scripts/vitest-global.ts",
    include: ["src/__tests__/**/*.unit.spec.ts"],
    testTimeout: 1e3,
    coverage: {
      provider: "istanbul",
      // or 'c8'
      reporter: ["lcov"],
      reportsDirectory: "../../.coverage/blocks"
    },
    /**
     * Custom handler for console.log in tests.
     *
     * Return `false` to ignore the log.
     */
    onConsoleLog(log, type) {
      if (log.includes("https://lit.dev/msg/dev-mode") || log.includes(
        `KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype.`
      )) {
        return false;
      }
      console.warn(`Unexpected ${type} log`, log);
      throw new Error(log);
    },
    environment: "happy-dom"
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZXMvYmxvY2tzL3ZpdGVzdC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxWdWVfUHJvamVjdFxcXFxoYWNvdXBpYW4tbWFoZGFhZFxcXFxibG9ja3N1aXRlXFxcXHBhY2thZ2VzXFxcXGJsb2Nrc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVnVlX1Byb2plY3RcXFxcaGFjb3VwaWFuLW1haGRhYWRcXFxcYmxvY2tzdWl0ZVxcXFxwYWNrYWdlc1xcXFxibG9ja3NcXFxcdml0ZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVnVlX1Byb2plY3QvaGFjb3VwaWFuLW1haGRhYWQvYmxvY2tzdWl0ZS9wYWNrYWdlcy9ibG9ja3Mvdml0ZXN0LmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVzdC9jb25maWcnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBlc2J1aWxkOiB7XHJcbiAgICB0YXJnZXQ6ICdlczIwMTgnLFxyXG4gIH0sXHJcbiAgdGVzdDoge1xyXG4gICAgZ2xvYmFsU2V0dXA6ICcuLi8uLi9zY3JpcHRzL3ZpdGVzdC1nbG9iYWwudHMnLFxyXG4gICAgaW5jbHVkZTogWydzcmMvX190ZXN0c19fLyoqLyoudW5pdC5zcGVjLnRzJ10sXHJcbiAgICB0ZXN0VGltZW91dDogMTAwMCxcclxuICAgIGNvdmVyYWdlOiB7XHJcbiAgICAgIHByb3ZpZGVyOiAnaXN0YW5idWwnLCAvLyBvciAnYzgnXHJcbiAgICAgIHJlcG9ydGVyOiBbJ2xjb3YnXSxcclxuICAgICAgcmVwb3J0c0RpcmVjdG9yeTogJy4uLy4uLy5jb3ZlcmFnZS9ibG9ja3MnLFxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogQ3VzdG9tIGhhbmRsZXIgZm9yIGNvbnNvbGUubG9nIGluIHRlc3RzLlxyXG4gICAgICpcclxuICAgICAqIFJldHVybiBgZmFsc2VgIHRvIGlnbm9yZSB0aGUgbG9nLlxyXG4gICAgICovXHJcbiAgICBvbkNvbnNvbGVMb2cobG9nLCB0eXBlKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBsb2cuaW5jbHVkZXMoJ2h0dHBzOi8vbGl0LmRldi9tc2cvZGV2LW1vZGUnKSB8fFxyXG4gICAgICAgIGxvZy5pbmNsdWRlcyhcclxuICAgICAgICAgIGBLYVRlWCBkb2Vzbid0IHdvcmsgaW4gcXVpcmtzIG1vZGUuIE1ha2Ugc3VyZSB5b3VyIHdlYnNpdGUgaGFzIGEgc3VpdGFibGUgZG9jdHlwZS5gXHJcbiAgICAgICAgKVxyXG4gICAgICApIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgY29uc29sZS53YXJuKGBVbmV4cGVjdGVkICR7dHlwZX0gbG9nYCwgbG9nKTtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGxvZyk7XHJcbiAgICB9LFxyXG4gICAgZW52aXJvbm1lbnQ6ICdoYXBweS1kb20nLFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1YLFNBQVMsb0JBQW9CO0FBRWhaLElBQU8sd0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixhQUFhO0FBQUEsSUFDYixTQUFTLENBQUMsaUNBQWlDO0FBQUEsSUFDM0MsYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLE1BQ1IsVUFBVTtBQUFBO0FBQUEsTUFDVixVQUFVLENBQUMsTUFBTTtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLElBQ3BCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBTUEsYUFBYSxLQUFLLE1BQU07QUFDdEIsVUFDRSxJQUFJLFNBQVMsOEJBQThCLEtBQzNDLElBQUk7QUFBQSxRQUNGO0FBQUEsTUFDRixHQUNBO0FBQ0EsZUFBTztBQUFBLE1BQ1Q7QUFDQSxjQUFRLEtBQUssY0FBYyxJQUFJLFFBQVEsR0FBRztBQUMxQyxZQUFNLElBQUksTUFBTSxHQUFHO0FBQUEsSUFDckI7QUFBQSxJQUNBLGFBQWE7QUFBQSxFQUNmO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
