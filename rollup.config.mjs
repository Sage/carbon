import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import path from "path";
import glob from "glob";
import postcss from "rollup-plugin-postcss";
import swc from "rollup-plugin-swc3";
import { fileURLToPath } from "url";
import url from "@rollup/plugin-url";

// Convert import.meta.url to a file path and get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getSvgFileName = (filePath) => {
  const baseDir = path.join(__dirname, "src/components"); // Base directory
  const searchPattern = path.join(baseDir, `**/${filePath}`); // Search for the file in subdirectories

  const matches = glob.sync(searchPattern, { absolute: true });

  if (matches.length > 0) {
    return matches[0]; // Return the first match
  }
  // Ensure fileName is always a string, not an object

  // try {
  //   const stats = fs.statSync(filePath);
  //   if (stats.isFile()) {
  //     console.log(`${filePath} is a file.`);
  //   } else {
  //     console.log(`${filePath} is not a file.`);
  //   }
  // } catch (error) {
  //   console.error(`Error checking file: ${error.message}`);
  // }
  // // If `filePath` exists, process it; otherwise, return the default name
  // if (filePath) {
  //   // Get the relative path from the 'src' directory (adjust accordingly if needed)
  //   const relativePath = path.relative(
  //     path.join(__dirname, 'src'),
  //     filePath
  //   );

  //   // Construct the output path based on the relative path, including the directory structure
  //   return path.join(path.dirname(relativePath), '[name][extname]');
  // }

  // Return default filename if filePath is not available
  return `assets/${filePath}`;
};

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
    url({
      include: ["**/*.svg"],
      limit: 0,
      // fileName: "components/[dirname]/[name][extname]",

      fileName: getSvgFileName("[dirname]/[name][extname]")
    }),
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
      dir: path.join(__dirname, "dist/esm"),
      format: "cjs",
      // sourcemap: true,
      entryFileNames: (chunkInfo) => {
        // Exclude specific files from the root (like action-popover-utils.js)
        if (chunkInfo.name.includes("-utils") || chunkInfo.name.includes(".style")) {
          return "components/[name].js"; // Move to the relevant component folder
        }
        return "[name].js"; // Otherwise, default to the usual naming convention
      },
    },
    {
      dir: path.join(__dirname, "dist/lib"),
      format: "esm",
      // sourcemap: true,
      entryFileNames: (chunkInfo) => {
        // Exclude specific files from the root (like action-popover-utils.js)
        if (chunkInfo.name.includes("-utils") || chunkInfo.name.includes(".style")) {
          return "components/[name].js"; // Move to the relevant component folder
        }
        return "[name].js"; // Otherwise, default to the usual naming convention
      },
    },
  ],
};
