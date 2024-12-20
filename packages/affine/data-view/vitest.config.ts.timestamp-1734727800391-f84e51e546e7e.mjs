// packages/affine/data-view/vitest.config.ts
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZXMvYWZmaW5lL2RhdGEtdmlldy92aXRlc3QuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcVnVlX1Byb2plY3RcXFxcaGFjb3VwaWFuLW1haGRhYWRcXFxcYmxvY2tzdWl0ZVxcXFxwYWNrYWdlc1xcXFxhZmZpbmVcXFxcZGF0YS12aWV3XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxWdWVfUHJvamVjdFxcXFxoYWNvdXBpYW4tbWFoZGFhZFxcXFxibG9ja3N1aXRlXFxcXHBhY2thZ2VzXFxcXGFmZmluZVxcXFxkYXRhLXZpZXdcXFxcdml0ZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVnVlX1Byb2plY3QvaGFjb3VwaWFuLW1haGRhYWQvYmxvY2tzdWl0ZS9wYWNrYWdlcy9hZmZpbmUvZGF0YS12aWV3L3ZpdGVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgZXNidWlsZDoge1xyXG4gICAgdGFyZ2V0OiAnZXMyMDE4JyxcclxuICB9LFxyXG4gIHRlc3Q6IHtcclxuICAgIGdsb2JhbFNldHVwOiAnLi4vLi4vc2NyaXB0cy92aXRlc3QtZ2xvYmFsLnRzJyxcclxuICAgIGluY2x1ZGU6IFsnc3JjL19fdGVzdHNfXy8qKi8qLnVuaXQuc3BlYy50cyddLFxyXG4gICAgdGVzdFRpbWVvdXQ6IDEwMDAsXHJcbiAgICBjb3ZlcmFnZToge1xyXG4gICAgICBwcm92aWRlcjogJ2lzdGFuYnVsJywgLy8gb3IgJ2M4J1xyXG4gICAgICByZXBvcnRlcjogWydsY292J10sXHJcbiAgICAgIHJlcG9ydHNEaXJlY3Rvcnk6ICcuLi8uLi8uY292ZXJhZ2UvYmxvY2tzJyxcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEN1c3RvbSBoYW5kbGVyIGZvciBjb25zb2xlLmxvZyBpbiB0ZXN0cy5cclxuICAgICAqXHJcbiAgICAgKiBSZXR1cm4gYGZhbHNlYCB0byBpZ25vcmUgdGhlIGxvZy5cclxuICAgICAqL1xyXG4gICAgb25Db25zb2xlTG9nKGxvZywgdHlwZSkge1xyXG4gICAgICBpZiAobG9nLmluY2x1ZGVzKCdodHRwczovL2xpdC5kZXYvbXNnL2Rldi1tb2RlJykpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgY29uc29sZS53YXJuKGBVbmV4cGVjdGVkICR7dHlwZX0gbG9nYCwgbG9nKTtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGxvZyk7XHJcbiAgICB9LFxyXG4gICAgZW52aXJvbm1lbnQ6ICdoYXBweS1kb20nLFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1aLFNBQVMsb0JBQW9CO0FBRWhiLElBQU8sd0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixhQUFhO0FBQUEsSUFDYixTQUFTLENBQUMsaUNBQWlDO0FBQUEsSUFDM0MsYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLE1BQ1IsVUFBVTtBQUFBO0FBQUEsTUFDVixVQUFVLENBQUMsTUFBTTtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLElBQ3BCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBTUEsYUFBYSxLQUFLLE1BQU07QUFDdEIsVUFBSSxJQUFJLFNBQVMsOEJBQThCLEdBQUc7QUFDaEQsZUFBTztBQUFBLE1BQ1Q7QUFDQSxjQUFRLEtBQUssY0FBYyxJQUFJLFFBQVEsR0FBRztBQUMxQyxZQUFNLElBQUksTUFBTSxHQUFHO0FBQUEsSUFDckI7QUFBQSxJQUNBLGFBQWE7QUFBQSxFQUNmO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
