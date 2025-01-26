import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "server/main.js",
      output: {
        format: "es",
        strict: false,
        entryFileNames: "main.js",
      },
      treeshake: false,
    },
    target: "es2015", // GAS supports ES2015 syntax
    minify: false,
  },
});
