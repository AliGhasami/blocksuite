// packages/framework/store/vitest.config.ts
import { defineConfig } from "file:///D:/Vue_Project/hacoupian-mahdaad/blocksuite/node_modules/vitest/dist/config.js";
var vitest_config_default = defineConfig({
  esbuild: {
    target: "es2018"
  },
  test: {
    include: ["src/__tests__/**/*.unit.spec.ts"],
    testTimeout: 500,
    coverage: {
      provider: "istanbul",
      // or 'c8'
      reporter: ["lcov"],
      reportsDirectory: "../../../.coverage/store"
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
    }
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZXMvZnJhbWV3b3JrL3N0b3JlL3ZpdGVzdC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxWdWVfUHJvamVjdFxcXFxoYWNvdXBpYW4tbWFoZGFhZFxcXFxibG9ja3N1aXRlXFxcXHBhY2thZ2VzXFxcXGZyYW1ld29ya1xcXFxzdG9yZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVnVlX1Byb2plY3RcXFxcaGFjb3VwaWFuLW1haGRhYWRcXFxcYmxvY2tzdWl0ZVxcXFxwYWNrYWdlc1xcXFxmcmFtZXdvcmtcXFxcc3RvcmVcXFxcdml0ZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVnVlX1Byb2plY3QvaGFjb3VwaWFuLW1haGRhYWQvYmxvY2tzdWl0ZS9wYWNrYWdlcy9mcmFtZXdvcmsvc3RvcmUvdml0ZXN0LmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVzdC9jb25maWcnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBlc2J1aWxkOiB7XHJcbiAgICB0YXJnZXQ6ICdlczIwMTgnLFxyXG4gIH0sXHJcbiAgdGVzdDoge1xyXG4gICAgaW5jbHVkZTogWydzcmMvX190ZXN0c19fLyoqLyoudW5pdC5zcGVjLnRzJ10sXHJcbiAgICB0ZXN0VGltZW91dDogNTAwLFxyXG4gICAgY292ZXJhZ2U6IHtcclxuICAgICAgcHJvdmlkZXI6ICdpc3RhbmJ1bCcsIC8vIG9yICdjOCdcclxuICAgICAgcmVwb3J0ZXI6IFsnbGNvdiddLFxyXG4gICAgICByZXBvcnRzRGlyZWN0b3J5OiAnLi4vLi4vLi4vLmNvdmVyYWdlL3N0b3JlJyxcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEN1c3RvbSBoYW5kbGVyIGZvciBjb25zb2xlLmxvZyBpbiB0ZXN0cy5cclxuICAgICAqXHJcbiAgICAgKiBSZXR1cm4gYGZhbHNlYCB0byBpZ25vcmUgdGhlIGxvZy5cclxuICAgICAqL1xyXG4gICAgb25Db25zb2xlTG9nKGxvZywgdHlwZSkge1xyXG4gICAgICBpZiAobG9nLmluY2x1ZGVzKCdodHRwczovL2xpdC5kZXYvbXNnL2Rldi1tb2RlJykpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgY29uc29sZS53YXJuKGBVbmV4cGVjdGVkICR7dHlwZX0gbG9nYCwgbG9nKTtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGxvZyk7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdaLFNBQVMsb0JBQW9CO0FBRTdhLElBQU8sd0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixTQUFTLENBQUMsaUNBQWlDO0FBQUEsSUFDM0MsYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLE1BQ1IsVUFBVTtBQUFBO0FBQUEsTUFDVixVQUFVLENBQUMsTUFBTTtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLElBQ3BCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBTUEsYUFBYSxLQUFLLE1BQU07QUFDdEIsVUFBSSxJQUFJLFNBQVMsOEJBQThCLEdBQUc7QUFDaEQsZUFBTztBQUFBLE1BQ1Q7QUFDQSxjQUFRLEtBQUssY0FBYyxJQUFJLFFBQVEsR0FBRztBQUMxQyxZQUFNLElBQUksTUFBTSxHQUFHO0FBQUEsSUFDckI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
