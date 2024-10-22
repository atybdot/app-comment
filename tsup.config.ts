import {defineConfig} from 'tsup';

export default defineConfig({
  outDir: "./dist",
  clean: true,
  format: "esm",
  dts: true,
  entry: ["./src/index.ts"],
  // sourcemap: true,
  target: "esnext",
  minify: true,
  treeshake : true,
  splitting : true,
  platform : "neutral"
});