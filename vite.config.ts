import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "./dist",
    lib: {
      entry: "src/index.ts",
      formats: ["iife"],
      fileName: () => "index.min.js",
      name: "chuni_intl_fetcher",
    },
  },
  plugins: [],
});
