import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: {
      index: "src/index.ts",
      "react/index": "src/react/index.ts",
      "vanilla/index": "src/vanilla/index.ts"
    },
    format: ["esm", "cjs"],
    outDir: "dist",
    outExtension({ format }) {
      return { js: format === "cjs" ? ".cjs" : ".js" };
    },
    dts: true,
    sourcemap: true,
    splitting: false,
    treeshake: true,
    clean: false,
    external: ["react", "react-dom", "react/jsx-runtime"]
  },
  {
    entry: {
      "matterflux.iife": "src/vanilla/browser.ts"
    },
    format: ["iife"],
    outDir: "dist",
    outExtension: () => ({ js: ".js" }),
    globalName: "MatterFlux",
    platform: "browser",
    target: "es2018",
    minify: true,
    sourcemap: true,
    splitting: false,
    clean: false
  }
]);
