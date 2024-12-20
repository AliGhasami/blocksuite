// packages/framework/inline/vitest.config.ts
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
      reportsDirectory: "../../../.coverage/inline"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZXMvZnJhbWV3b3JrL2lubGluZS92aXRlc3QuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcVnVlX1Byb2plY3RcXFxcaGFjb3VwaWFuLW1haGRhYWRcXFxcYmxvY2tzdWl0ZVxcXFxwYWNrYWdlc1xcXFxmcmFtZXdvcmtcXFxcaW5saW5lXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxWdWVfUHJvamVjdFxcXFxoYWNvdXBpYW4tbWFoZGFhZFxcXFxibG9ja3N1aXRlXFxcXHBhY2thZ2VzXFxcXGZyYW1ld29ya1xcXFxpbmxpbmVcXFxcdml0ZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVnVlX1Byb2plY3QvaGFjb3VwaWFuLW1haGRhYWQvYmxvY2tzdWl0ZS9wYWNrYWdlcy9mcmFtZXdvcmsvaW5saW5lL3ZpdGVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgZXNidWlsZDoge1xyXG4gICAgdGFyZ2V0OiAnZXMyMDE4JyxcclxuICB9LFxyXG4gIHRlc3Q6IHtcclxuICAgIGluY2x1ZGU6IFsnc3JjL19fdGVzdHNfXy8qKi8qLnVuaXQuc3BlYy50cyddLFxyXG4gICAgdGVzdFRpbWVvdXQ6IDUwMCxcclxuICAgIGNvdmVyYWdlOiB7XHJcbiAgICAgIHByb3ZpZGVyOiAnaXN0YW5idWwnLCAvLyBvciAnYzgnXHJcbiAgICAgIHJlcG9ydGVyOiBbJ2xjb3YnXSxcclxuICAgICAgcmVwb3J0c0RpcmVjdG9yeTogJy4uLy4uLy4uLy5jb3ZlcmFnZS9pbmxpbmUnLFxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogQ3VzdG9tIGhhbmRsZXIgZm9yIGNvbnNvbGUubG9nIGluIHRlc3RzLlxyXG4gICAgICpcclxuICAgICAqIFJldHVybiBgZmFsc2VgIHRvIGlnbm9yZSB0aGUgbG9nLlxyXG4gICAgICovXHJcbiAgICBvbkNvbnNvbGVMb2cobG9nLCB0eXBlKSB7XHJcbiAgICAgIGlmIChsb2cuaW5jbHVkZXMoJ2h0dHBzOi8vbGl0LmRldi9tc2cvZGV2LW1vZGUnKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLndhcm4oYFVuZXhwZWN0ZWQgJHt0eXBlfSBsb2dgLCBsb2cpO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobG9nKTtcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVosU0FBUyxvQkFBb0I7QUFFaGIsSUFBTyx3QkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFNBQVMsQ0FBQyxpQ0FBaUM7QUFBQSxJQUMzQyxhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUEsTUFDUixVQUFVO0FBQUE7QUFBQSxNQUNWLFVBQVUsQ0FBQyxNQUFNO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsSUFDcEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFNQSxhQUFhLEtBQUssTUFBTTtBQUN0QixVQUFJLElBQUksU0FBUyw4QkFBOEIsR0FBRztBQUNoRCxlQUFPO0FBQUEsTUFDVDtBQUNBLGNBQVEsS0FBSyxjQUFjLElBQUksUUFBUSxHQUFHO0FBQzFDLFlBQU0sSUFBSSxNQUFNLEdBQUc7QUFBQSxJQUNyQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
