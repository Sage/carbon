import { fileURLToPath } from "url";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import path from "path";
import glob from "glob";
import postcss from "rollup-plugin-postcss";
import swc from "rollup-plugin-swc3";
import copy from "rollup-plugin-copy";

// Convert import.meta.url to a file path and get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  input: Object.fromEntries(
    glob
      .sync(path.join(__dirname, "src/**/*.{ts,tsx}"), {
        ignore: [
          "**/*.types.ts",
          "**/*.test.ts",
          "**/*.spec.ts",
          "**/*.stories.ts",
          "**/*.test.tsx",
          "**/*.spec.tsx",
          "**/*.stories.tsx",
          "**/*.pw.tsx",
          "**/*.test-pw.tsx",
          "**/*.d.ts",
          "**/*.svg", // Ignore SVGs and move them in post-build
          "**/test-utils.ts", // Ignore test-utils files
        ],
      })
      .map((file) => [
        // Removes `src/` as well as the file extension from each
        // file, so e.g. src/components/foo.js becomes components/foo
        path.relative(
          path.join(__dirname, "src"),
          file.slice(0, file.length - path.extname(file).length),
        ),
        // This expands the relative paths to absolute paths, so e.g.
        // src/components/foo becomes /project/src/components/foo.js
        fileURLToPath(new URL(file, import.meta.url)),
      ]),
  ),
  external: [
    /node_modules/,
    /^[^./]|^\.[^./]|^\.\.[^/]/,
    /\.svg$/, // Treat all SVGs as external
  ],
  plugins: [
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      preferBuiltins: true,
      browser: true,
    }),
    commonjs({
      include: "node_modules/**",
      requireReturnsDefault: "auto",
    }),
    json(),
    postcss({
      extract: true,
      minimize: true,
    }),
    swc({
      jsc: {
        parser: {
          syntax: "typescript",
          tsx: true,
          decorators: true,
        },
        transform: {
          react: {
            runtime: "automatic",
          },
        },
      },
    }),
    terser({ maxWorkers: 4 }),
    copy({
      targets: [
        { src: "src/style/assets/**/*", dest: "dist/lib/style/assets" },
        { src: "src/style/assets/**/*", dest: "dist/esm/style/assets" },
        { src: "src/style/fonts.css", dest: "dist/lib/style/" },
        { src: "src/style/fonts.css", dest: "dist/esm/style/" },
        { src: "src/global.d.ts", dest: "dist/lib/" },
        { src: "src/global.d.ts", dest: "dist/esm/" },
      ]
    })
  ],
  output: [
    {
      dir: path.join(__dirname, "dist/lib"),
      format: "cjs",
      preserveModules: true,
      preserveModulesRoot: "src",
      // sourcemap: true,
      entryFileNames: "[name].js",
      chunkFileNames: ({ name }) => `${name}.js`, // Preserve folder structure
    },
    {
      dir: path.join(__dirname, "dist/esm"),
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src",
      // sourcemap: true,
      entryFileNames: "[name].js",
      chunkFileNames: ({ name }) => `${name}.js`, // Preserve folder structure
    },
  ],
};
