import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

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
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "package.json",
          dest: ".",
        },
      ],
    }),
  ],
});
