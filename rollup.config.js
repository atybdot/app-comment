import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"
import postcss from "rollup-plugin-postcss"
import babel from "@rollup/plugin-babel"
import peerDepsExternal from "rollup-plugin-peer-deps-external"

const packageJson = require("./package.json")

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({
        skip: ["react", "react-dom"],
        extensions: [".js", ".jsx"],
      }),
      commonjs(),
      postcss({
        extract: true,
        minimize: true,
      }),
      babel({
        babelHelpers: "bundled",
        presets: ["@babel/preset-react"],
        extensions: [".js", ".jsx"],
      }),
      terser(),
      peerDepsExternal(),
    ],
  },
  {
    input: "src/styles/main.css",
    output: [{ file: "dist/index.css", format: "es" }],
    plugins: [
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },
]
