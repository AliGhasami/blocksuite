// packages/framework/global/vitest.config.ts
import { defineConfig } from "file:///D:/Vue_Project/hacoupian-mahdaad/blocksuite/node_modules/vitest/dist/config.js";
var vitest_config_default = defineConfig({
  test: {
    include: ["src/__tests__/**/*.unit.spec.ts"],
    testTimeout: 500,
    coverage: {
      provider: "istanbul",
      // or 'c8'
      reporter: ["lcov"],
      reportsDirectory: "../../../.coverage/global"
    },
    /**
     * Custom handler for console.log in tests.
     *
     * Return `false` to ignore the log.
     */
    onConsoleLog(log, type) {
      console.warn(`Unexpected ${type} log`, log);
      throw new Error(log);
    }
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZXMvZnJhbWV3b3JrL2dsb2JhbC92aXRlc3QuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcVnVlX1Byb2plY3RcXFxcaGFjb3VwaWFuLW1haGRhYWRcXFxcYmxvY2tzdWl0ZVxcXFxwYWNrYWdlc1xcXFxmcmFtZXdvcmtcXFxcZ2xvYmFsXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxWdWVfUHJvamVjdFxcXFxoYWNvdXBpYW4tbWFoZGFhZFxcXFxibG9ja3N1aXRlXFxcXHBhY2thZ2VzXFxcXGZyYW1ld29ya1xcXFxnbG9iYWxcXFxcdml0ZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVnVlX1Byb2plY3QvaGFjb3VwaWFuLW1haGRhYWQvYmxvY2tzdWl0ZS9wYWNrYWdlcy9mcmFtZXdvcmsvZ2xvYmFsL3ZpdGVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgdGVzdDoge1xyXG4gICAgaW5jbHVkZTogWydzcmMvX190ZXN0c19fLyoqLyoudW5pdC5zcGVjLnRzJ10sXHJcbiAgICB0ZXN0VGltZW91dDogNTAwLFxyXG4gICAgY292ZXJhZ2U6IHtcclxuICAgICAgcHJvdmlkZXI6ICdpc3RhbmJ1bCcsIC8vIG9yICdjOCdcclxuICAgICAgcmVwb3J0ZXI6IFsnbGNvdiddLFxyXG4gICAgICByZXBvcnRzRGlyZWN0b3J5OiAnLi4vLi4vLi4vLmNvdmVyYWdlL2dsb2JhbCcsXHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBDdXN0b20gaGFuZGxlciBmb3IgY29uc29sZS5sb2cgaW4gdGVzdHMuXHJcbiAgICAgKlxyXG4gICAgICogUmV0dXJuIGBmYWxzZWAgdG8gaWdub3JlIHRoZSBsb2cuXHJcbiAgICAgKi9cclxuICAgIG9uQ29uc29sZUxvZyhsb2csIHR5cGUpIHtcclxuICAgICAgY29uc29sZS53YXJuKGBVbmV4cGVjdGVkICR7dHlwZX0gbG9nYCwgbG9nKTtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGxvZyk7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1aLFNBQVMsb0JBQW9CO0FBRWhiLElBQU8sd0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxJQUNKLFNBQVMsQ0FBQyxpQ0FBaUM7QUFBQSxJQUMzQyxhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUEsTUFDUixVQUFVO0FBQUE7QUFBQSxNQUNWLFVBQVUsQ0FBQyxNQUFNO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsSUFDcEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFNQSxhQUFhLEtBQUssTUFBTTtBQUN0QixjQUFRLEtBQUssY0FBYyxJQUFJLFFBQVEsR0FBRztBQUMxQyxZQUFNLElBQUksTUFBTSxHQUFHO0FBQUEsSUFDckI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
