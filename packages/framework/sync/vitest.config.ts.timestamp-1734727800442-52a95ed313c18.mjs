// packages/framework/sync/vitest.config.ts
import { defineConfig } from "file:///D:/Vue_Project/hacoupian-mahdaad/blocksuite/node_modules/vitest/dist/config.js";
var vitest_config_default = defineConfig({
  test: {
    include: ["src/__tests__/**/*.unit.spec.ts"],
    testTimeout: 500,
    coverage: {
      provider: "istanbul",
      // or 'c8'
      reporter: ["lcov"],
      reportsDirectory: "../../../.coverage/sync"
    },
    /**
     * Custom handler for console.log in tests.
     *
     * Return `false` to ignore the log.
     */
    onConsoleLog(log, type) {
      console.warn(`Unexpected ${type} log`, log);
      throw new Error(log);
    },
    restoreMocks: true
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZXMvZnJhbWV3b3JrL3N5bmMvdml0ZXN0LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFZ1ZV9Qcm9qZWN0XFxcXGhhY291cGlhbi1tYWhkYWFkXFxcXGJsb2Nrc3VpdGVcXFxccGFja2FnZXNcXFxcZnJhbWV3b3JrXFxcXHN5bmNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFZ1ZV9Qcm9qZWN0XFxcXGhhY291cGlhbi1tYWhkYWFkXFxcXGJsb2Nrc3VpdGVcXFxccGFja2FnZXNcXFxcZnJhbWV3b3JrXFxcXHN5bmNcXFxcdml0ZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVnVlX1Byb2plY3QvaGFjb3VwaWFuLW1haGRhYWQvYmxvY2tzdWl0ZS9wYWNrYWdlcy9mcmFtZXdvcmsvc3luYy92aXRlc3QuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXN0L2NvbmZpZyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHRlc3Q6IHtcclxuICAgIGluY2x1ZGU6IFsnc3JjL19fdGVzdHNfXy8qKi8qLnVuaXQuc3BlYy50cyddLFxyXG4gICAgdGVzdFRpbWVvdXQ6IDUwMCxcclxuICAgIGNvdmVyYWdlOiB7XHJcbiAgICAgIHByb3ZpZGVyOiAnaXN0YW5idWwnLCAvLyBvciAnYzgnXHJcbiAgICAgIHJlcG9ydGVyOiBbJ2xjb3YnXSxcclxuICAgICAgcmVwb3J0c0RpcmVjdG9yeTogJy4uLy4uLy4uLy5jb3ZlcmFnZS9zeW5jJyxcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEN1c3RvbSBoYW5kbGVyIGZvciBjb25zb2xlLmxvZyBpbiB0ZXN0cy5cclxuICAgICAqXHJcbiAgICAgKiBSZXR1cm4gYGZhbHNlYCB0byBpZ25vcmUgdGhlIGxvZy5cclxuICAgICAqL1xyXG4gICAgb25Db25zb2xlTG9nKGxvZywgdHlwZSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oYFVuZXhwZWN0ZWQgJHt0eXBlfSBsb2dgLCBsb2cpO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobG9nKTtcclxuICAgIH0sXHJcbiAgICByZXN0b3JlTW9ja3M6IHRydWUsXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlksU0FBUyxvQkFBb0I7QUFFMWEsSUFBTyx3QkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLElBQ0osU0FBUyxDQUFDLGlDQUFpQztBQUFBLElBQzNDLGFBQWE7QUFBQSxJQUNiLFVBQVU7QUFBQSxNQUNSLFVBQVU7QUFBQTtBQUFBLE1BQ1YsVUFBVSxDQUFDLE1BQU07QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxJQUNwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU1BLGFBQWEsS0FBSyxNQUFNO0FBQ3RCLGNBQVEsS0FBSyxjQUFjLElBQUksUUFBUSxHQUFHO0FBQzFDLFlBQU0sSUFBSSxNQUFNLEdBQUc7QUFBQSxJQUNyQjtBQUFBLElBQ0EsY0FBYztBQUFBLEVBQ2hCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
