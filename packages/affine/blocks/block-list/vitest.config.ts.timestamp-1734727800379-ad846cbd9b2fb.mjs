// packages/affine/block-list/vitest.config.ts
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
      reportsDirectory: "../../../.coverage/affine-block-list"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZXMvYWZmaW5lL2Jsb2NrLWxpc3Qvdml0ZXN0LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFZ1ZV9Qcm9qZWN0XFxcXGhhY291cGlhbi1tYWhkYWFkXFxcXGJsb2Nrc3VpdGVcXFxccGFja2FnZXNcXFxcYWZmaW5lXFxcXGJsb2NrLWxpc3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFZ1ZV9Qcm9qZWN0XFxcXGhhY291cGlhbi1tYWhkYWFkXFxcXGJsb2Nrc3VpdGVcXFxccGFja2FnZXNcXFxcYWZmaW5lXFxcXGJsb2NrLWxpc3RcXFxcdml0ZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVnVlX1Byb2plY3QvaGFjb3VwaWFuLW1haGRhYWQvYmxvY2tzdWl0ZS9wYWNrYWdlcy9hZmZpbmUvYmxvY2stbGlzdC92aXRlc3QuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXN0L2NvbmZpZyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGVzYnVpbGQ6IHtcclxuICAgIHRhcmdldDogJ2VzMjAxOCcsXHJcbiAgfSxcclxuICB0ZXN0OiB7XHJcbiAgICBnbG9iYWxTZXR1cDogJy4uLy4uLy4uL3NjcmlwdHMvdml0ZXN0LWdsb2JhbC50cycsXHJcbiAgICBpbmNsdWRlOiBbJ3NyYy9fX3Rlc3RzX18vKiovKi51bml0LnNwZWMudHMnXSxcclxuICAgIHRlc3RUaW1lb3V0OiAxMDAwLFxyXG4gICAgY292ZXJhZ2U6IHtcclxuICAgICAgcHJvdmlkZXI6ICdpc3RhbmJ1bCcsIC8vIG9yICdjOCdcclxuICAgICAgcmVwb3J0ZXI6IFsnbGNvdiddLFxyXG4gICAgICByZXBvcnRzRGlyZWN0b3J5OiAnLi4vLi4vLi4vLmNvdmVyYWdlL2FmZmluZS1ibG9jay1saXN0JyxcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEN1c3RvbSBoYW5kbGVyIGZvciBjb25zb2xlLmxvZyBpbiB0ZXN0cy5cclxuICAgICAqXHJcbiAgICAgKiBSZXR1cm4gYGZhbHNlYCB0byBpZ25vcmUgdGhlIGxvZy5cclxuICAgICAqL1xyXG4gICAgb25Db25zb2xlTG9nKGxvZywgdHlwZSkge1xyXG4gICAgICBpZiAobG9nLmluY2x1ZGVzKCdodHRwczovL2xpdC5kZXYvbXNnL2Rldi1tb2RlJykpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgY29uc29sZS53YXJuKGBVbmV4cGVjdGVkICR7dHlwZX0gbG9nYCwgbG9nKTtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGxvZyk7XHJcbiAgICB9LFxyXG4gICAgZW52aXJvbm1lbnQ6ICdoYXBweS1kb20nLFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNaLFNBQVMsb0JBQW9CO0FBRW5iLElBQU8sd0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixhQUFhO0FBQUEsSUFDYixTQUFTLENBQUMsaUNBQWlDO0FBQUEsSUFDM0MsYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLE1BQ1IsVUFBVTtBQUFBO0FBQUEsTUFDVixVQUFVLENBQUMsTUFBTTtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLElBQ3BCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBTUEsYUFBYSxLQUFLLE1BQU07QUFDdEIsVUFBSSxJQUFJLFNBQVMsOEJBQThCLEdBQUc7QUFDaEQsZUFBTztBQUFBLE1BQ1Q7QUFDQSxjQUFRLEtBQUssY0FBYyxJQUFJLFFBQVEsR0FBRztBQUMxQyxZQUFNLElBQUksTUFBTSxHQUFHO0FBQUEsSUFDckI7QUFBQSxJQUNBLGFBQWE7QUFBQSxFQUNmO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
