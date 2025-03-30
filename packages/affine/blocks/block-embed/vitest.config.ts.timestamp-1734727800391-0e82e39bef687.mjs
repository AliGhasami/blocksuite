// packages/affine/block-embed/vitest.config.ts
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZXMvYWZmaW5lL2Jsb2NrLWVtYmVkL3ZpdGVzdC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxWdWVfUHJvamVjdFxcXFxoYWNvdXBpYW4tbWFoZGFhZFxcXFxibG9ja3N1aXRlXFxcXHBhY2thZ2VzXFxcXGFmZmluZVxcXFxibG9jay1lbWJlZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVnVlX1Byb2plY3RcXFxcaGFjb3VwaWFuLW1haGRhYWRcXFxcYmxvY2tzdWl0ZVxcXFxwYWNrYWdlc1xcXFxhZmZpbmVcXFxcYmxvY2stZW1iZWRcXFxcdml0ZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVnVlX1Byb2plY3QvaGFjb3VwaWFuLW1haGRhYWQvYmxvY2tzdWl0ZS9wYWNrYWdlcy9hZmZpbmUvYmxvY2stZW1iZWQvdml0ZXN0LmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVzdC9jb25maWcnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBlc2J1aWxkOiB7XHJcbiAgICB0YXJnZXQ6ICdlczIwMTgnLFxyXG4gIH0sXHJcbiAgdGVzdDoge1xyXG4gICAgZ2xvYmFsU2V0dXA6ICcuLi8uLi8uLi9zY3JpcHRzL3ZpdGVzdC1nbG9iYWwudHMnLFxyXG4gICAgaW5jbHVkZTogWydzcmMvX190ZXN0c19fLyoqLyoudW5pdC5zcGVjLnRzJ10sXHJcbiAgICB0ZXN0VGltZW91dDogMTAwMCxcclxuICAgIGNvdmVyYWdlOiB7XHJcbiAgICAgIHByb3ZpZGVyOiAnaXN0YW5idWwnLCAvLyBvciAnYzgnXHJcbiAgICAgIHJlcG9ydGVyOiBbJ2xjb3YnXSxcclxuICAgICAgcmVwb3J0c0RpcmVjdG9yeTogJy4uLy4uLy4uLy5jb3ZlcmFnZS9hZmZpbmUtYmxvY2stbGlzdCcsXHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBDdXN0b20gaGFuZGxlciBmb3IgY29uc29sZS5sb2cgaW4gdGVzdHMuXHJcbiAgICAgKlxyXG4gICAgICogUmV0dXJuIGBmYWxzZWAgdG8gaWdub3JlIHRoZSBsb2cuXHJcbiAgICAgKi9cclxuICAgIG9uQ29uc29sZUxvZyhsb2csIHR5cGUpIHtcclxuICAgICAgaWYgKGxvZy5pbmNsdWRlcygnaHR0cHM6Ly9saXQuZGV2L21zZy9kZXYtbW9kZScpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUud2FybihgVW5leHBlY3RlZCAke3R5cGV9IGxvZ2AsIGxvZyk7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihsb2cpO1xyXG4gICAgfSxcclxuICAgIGVudmlyb25tZW50OiAnaGFwcHktZG9tJyxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5WixTQUFTLG9CQUFvQjtBQUV0YixJQUFPLHdCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0osYUFBYTtBQUFBLElBQ2IsU0FBUyxDQUFDLGlDQUFpQztBQUFBLElBQzNDLGFBQWE7QUFBQSxJQUNiLFVBQVU7QUFBQSxNQUNSLFVBQVU7QUFBQTtBQUFBLE1BQ1YsVUFBVSxDQUFDLE1BQU07QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxJQUNwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU1BLGFBQWEsS0FBSyxNQUFNO0FBQ3RCLFVBQUksSUFBSSxTQUFTLDhCQUE4QixHQUFHO0FBQ2hELGVBQU87QUFBQSxNQUNUO0FBQ0EsY0FBUSxLQUFLLGNBQWMsSUFBSSxRQUFRLEdBQUc7QUFDMUMsWUFBTSxJQUFJLE1BQU0sR0FBRztBQUFBLElBQ3JCO0FBQUEsSUFDQSxhQUFhO0FBQUEsRUFDZjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
