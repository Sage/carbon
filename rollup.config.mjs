import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import path from "path";
import glob from "glob";
import postcss from "rollup-plugin-postcss";
import swc from "rollup-plugin-swc3";
import { fileURLToPath } from "url";

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
        // This removes `src/` as well as the file extension from each
        // file, so e.g. src/nested/foo.js becomes nested/foo
        path.relative(
          path.join(__dirname, "src"),
          file.slice(0, file.length - path.extname(file).length),
        ),
        // This expands the relative paths to absolute paths, so e.g.
        // src/nested/foo becomes /project/src/nested/foo.js
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
  ],
  output: [
    {
      dir: path.join(__dirname, "dist/lib"),
      format: "cjs",
      // sourcemap: true,
      entryFileNames: ({name}) => {
        // Exclude specific files from the root (like action-popover-utils.js)
        if (/utils/.test(name) || /.style/.test(name)) {
          return `components/${name}.js`; // Move to the relevant component folder
        }
        return "[name].js"; // Otherwise, default to the usual naming convention
      },
    },
    {
      dir: path.join(__dirname, "dist/esm"),
      format: "esm",
      // sourcemap: true,
      entryFileNames: ({name}) => {
        // Exclude specific files from the root (like action-popover-utils.js)
        if (/utils/.test(name) || /style/.test(name)) {
          return `components/${name}.js`; // Move to the relevant component folder
        }
        return "[name].js"; // Otherwise, default to the usual naming convention
      },
    },
  ],
  // manualChunks(id) {
  //   if (/utils/.test(id)) {
  //     return id; // Force it into a named chunk
  //   }
  //   return null; // Let Rollup decide for other files
  // }
};
