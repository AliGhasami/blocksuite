// packages/affine/shared/vitest.config.ts
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
      reportsDirectory: "../../../.coverage/affine-shared"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZXMvYWZmaW5lL3NoYXJlZC92aXRlc3QuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcVnVlX1Byb2plY3RcXFxcaGFjb3VwaWFuLW1haGRhYWRcXFxcYmxvY2tzdWl0ZVxcXFxwYWNrYWdlc1xcXFxhZmZpbmVcXFxcc2hhcmVkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxWdWVfUHJvamVjdFxcXFxoYWNvdXBpYW4tbWFoZGFhZFxcXFxibG9ja3N1aXRlXFxcXHBhY2thZ2VzXFxcXGFmZmluZVxcXFxzaGFyZWRcXFxcdml0ZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVnVlX1Byb2plY3QvaGFjb3VwaWFuLW1haGRhYWQvYmxvY2tzdWl0ZS9wYWNrYWdlcy9hZmZpbmUvc2hhcmVkL3ZpdGVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgZXNidWlsZDoge1xyXG4gICAgdGFyZ2V0OiAnZXMyMDE4JyxcclxuICB9LFxyXG4gIHRlc3Q6IHtcclxuICAgIGdsb2JhbFNldHVwOiAnLi4vLi4vLi4vc2NyaXB0cy92aXRlc3QtZ2xvYmFsLnRzJyxcclxuICAgIGluY2x1ZGU6IFsnc3JjL19fdGVzdHNfXy8qKi8qLnVuaXQuc3BlYy50cyddLFxyXG4gICAgdGVzdFRpbWVvdXQ6IDEwMDAsXHJcbiAgICBjb3ZlcmFnZToge1xyXG4gICAgICBwcm92aWRlcjogJ2lzdGFuYnVsJywgLy8gb3IgJ2M4J1xyXG4gICAgICByZXBvcnRlcjogWydsY292J10sXHJcbiAgICAgIHJlcG9ydHNEaXJlY3Rvcnk6ICcuLi8uLi8uLi8uY292ZXJhZ2UvYWZmaW5lLXNoYXJlZCcsXHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBDdXN0b20gaGFuZGxlciBmb3IgY29uc29sZS5sb2cgaW4gdGVzdHMuXHJcbiAgICAgKlxyXG4gICAgICogUmV0dXJuIGBmYWxzZWAgdG8gaWdub3JlIHRoZSBsb2cuXHJcbiAgICAgKi9cclxuICAgIG9uQ29uc29sZUxvZyhsb2csIHR5cGUpIHtcclxuICAgICAgaWYgKGxvZy5pbmNsdWRlcygnaHR0cHM6Ly9saXQuZGV2L21zZy9kZXYtbW9kZScpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUud2FybihgVW5leHBlY3RlZCAke3R5cGV9IGxvZ2AsIGxvZyk7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihsb2cpO1xyXG4gICAgfSxcclxuICAgIGVudmlyb25tZW50OiAnaGFwcHktZG9tJyxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwWSxTQUFTLG9CQUFvQjtBQUV2YSxJQUFPLHdCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0osYUFBYTtBQUFBLElBQ2IsU0FBUyxDQUFDLGlDQUFpQztBQUFBLElBQzNDLGFBQWE7QUFBQSxJQUNiLFVBQVU7QUFBQSxNQUNSLFVBQVU7QUFBQTtBQUFBLE1BQ1YsVUFBVSxDQUFDLE1BQU07QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxJQUNwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU1BLGFBQWEsS0FBSyxNQUFNO0FBQ3RCLFVBQUksSUFBSSxTQUFTLDhCQUE4QixHQUFHO0FBQ2hELGVBQU87QUFBQSxNQUNUO0FBQ0EsY0FBUSxLQUFLLGNBQWMsSUFBSSxRQUFRLEdBQUc7QUFDMUMsWUFBTSxJQUFJLE1BQU0sR0FBRztBQUFBLElBQ3JCO0FBQUEsSUFDQSxhQUFhO0FBQUEsRUFDZjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
