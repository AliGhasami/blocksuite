// packages/affine/widget-scroll-anchoring/vitest.config.ts
import { defineConfig } from "file:///D:/Vue_Project/hacoupian-mahdaad/blocksuite/node_modules/vitest/dist/config.js";
var vitest_config_default = defineConfig({
  esbuild: {
    target: "es2018"
  },
  test: {
    globalSetup: "../../../scripts/vitest-global.ts",
    include: ["src/__tests__/**/*.unit.spec.ts"],
    testTimeout: 1e3,
    coverage: {
      provider: "istanbul",
      // or 'c8'
      reporter: ["lcov"],
      reportsDirectory: "../../../.coverage/affine-widget-scroll-anchoring"
    },
    /**
     * Custom handler for console.log in tests.
     *
     * Return `false` to ignore the log.
     */
    onConsoleLog(log, type) {
      if (log.includes("https://lit.dev/msg/dev-mode")) {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZXMvYWZmaW5lL3dpZGdldC1zY3JvbGwtYW5jaG9yaW5nL3ZpdGVzdC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxWdWVfUHJvamVjdFxcXFxoYWNvdXBpYW4tbWFoZGFhZFxcXFxibG9ja3N1aXRlXFxcXHBhY2thZ2VzXFxcXGFmZmluZVxcXFx3aWRnZXQtc2Nyb2xsLWFuY2hvcmluZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVnVlX1Byb2plY3RcXFxcaGFjb3VwaWFuLW1haGRhYWRcXFxcYmxvY2tzdWl0ZVxcXFxwYWNrYWdlc1xcXFxhZmZpbmVcXFxcd2lkZ2V0LXNjcm9sbC1hbmNob3JpbmdcXFxcdml0ZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVnVlX1Byb2plY3QvaGFjb3VwaWFuLW1haGRhYWQvYmxvY2tzdWl0ZS9wYWNrYWdlcy9hZmZpbmUvd2lkZ2V0LXNjcm9sbC1hbmNob3Jpbmcvdml0ZXN0LmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVzdC9jb25maWcnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBlc2J1aWxkOiB7XHJcbiAgICB0YXJnZXQ6ICdlczIwMTgnLFxyXG4gIH0sXHJcbiAgdGVzdDoge1xyXG4gICAgZ2xvYmFsU2V0dXA6ICcuLi8uLi8uLi9zY3JpcHRzL3ZpdGVzdC1nbG9iYWwudHMnLFxyXG4gICAgaW5jbHVkZTogWydzcmMvX190ZXN0c19fLyoqLyoudW5pdC5zcGVjLnRzJ10sXHJcbiAgICB0ZXN0VGltZW91dDogMTAwMCxcclxuICAgIGNvdmVyYWdlOiB7XHJcbiAgICAgIHByb3ZpZGVyOiAnaXN0YW5idWwnLCAvLyBvciAnYzgnXHJcbiAgICAgIHJlcG9ydGVyOiBbJ2xjb3YnXSxcclxuICAgICAgcmVwb3J0c0RpcmVjdG9yeTogJy4uLy4uLy4uLy5jb3ZlcmFnZS9hZmZpbmUtd2lkZ2V0LXNjcm9sbC1hbmNob3JpbmcnLFxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogQ3VzdG9tIGhhbmRsZXIgZm9yIGNvbnNvbGUubG9nIGluIHRlc3RzLlxyXG4gICAgICpcclxuICAgICAqIFJldHVybiBgZmFsc2VgIHRvIGlnbm9yZSB0aGUgbG9nLlxyXG4gICAgICovXHJcbiAgICBvbkNvbnNvbGVMb2cobG9nLCB0eXBlKSB7XHJcbiAgICAgIGlmIChsb2cuaW5jbHVkZXMoJ2h0dHBzOi8vbGl0LmRldi9tc2cvZGV2LW1vZGUnKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLndhcm4oYFVuZXhwZWN0ZWQgJHt0eXBlfSBsb2dgLCBsb2cpO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobG9nKTtcclxuICAgIH0sXHJcbiAgICBlbnZpcm9ubWVudDogJ2hhcHB5LWRvbScsXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNmIsU0FBUyxvQkFBb0I7QUFFMWQsSUFBTyx3QkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLGFBQWE7QUFBQSxJQUNiLFNBQVMsQ0FBQyxpQ0FBaUM7QUFBQSxJQUMzQyxhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUEsTUFDUixVQUFVO0FBQUE7QUFBQSxNQUNWLFVBQVUsQ0FBQyxNQUFNO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsSUFDcEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFNQSxhQUFhLEtBQUssTUFBTTtBQUN0QixVQUFJLElBQUksU0FBUyw4QkFBOEIsR0FBRztBQUNoRCxlQUFPO0FBQUEsTUFDVDtBQUNBLGNBQVEsS0FBSyxjQUFjLElBQUksUUFBUSxHQUFHO0FBQzFDLFlBQU0sSUFBSSxNQUFNLEdBQUc7QUFBQSxJQUNyQjtBQUFBLElBQ0EsYUFBYTtBQUFBLEVBQ2Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
