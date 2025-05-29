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
import { visualizer } from "rollup-plugin-visualizer";

/* Convert import.meta.url to a file path and get the directory name */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  input: Object.fromEntries(
    glob
      .sync(path.join(__dirname, "src/**/*.{ts,tsx}"), {
        ignore: [
          "**/*.types.ts",
          /** This is just a type file so ignored to avoid an empty chunk */
          "**/icon-type.ts",
          /** This is just a type file so ignored to avoid an empty chunk */
          "**/locale.ts",
          "**/*.test.ts",
          "**/*.spec.ts",
          "**/*.stories.ts",
          "**/*.test.tsx",
          "**/*.spec.tsx",
          "**/*.stories.tsx",
          "**/*.pw.tsx",
          "**/*.test-pw.tsx",
          "**/*.d.ts",
          /* Ignores SVGs, they are moved in post-build */
          "**/*.svg",
          "**/test-utils.ts",
          /* We only want to include the mocks and spec helpers intended for public use */
          "**/__spec_helper__/__internal__/**"
        ],
      })
      .map((file) => [
        /** 
         * Removes `src/` as well as the file extension from each file
         * e.g. src/components/foo.js becomes components/foo
         * */
        path.relative(
          path.join(__dirname, "src"),
          file.slice(0, file.length - path.extname(file).length),
        ),
        /**
         * This expands the relative paths to absolute paths
         * e.g. src/components/foo becomes /project/src/components/foo.js
         * */
        fileURLToPath(new URL(file, import.meta.url)),
      ]),
  ),
  external: [
    /node_modules/,
    /^[^./]|^\.[^./]|^\.\.[^/]/,
    /* Treat all SVGs as external */
    /\.svg$/,
    "styled-components",
    "@swc/helpers",
    "react",
    "react-dom",
  ],
  plugins: [
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      preferBuiltins: true,
      browser: true,
      moduleDirectories: ["node_modules"],
      resolveOnly: [
        /* Exclude @swc/helpers from custom resolution */
        /^(?!@swc\/helpers)/,
        /* Exclude styled-components from custom resolution */
        /^(?!styled-components)/,
      ],
    }),
    commonjs({
      include: "node_modules/**",
      requireReturnsDefault: "auto",
      transformMixedEsModules: true,
      ignoreDynamicRequires: true,
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
          legacyDecorator: true,
          decoratorVersion: "2022-03"
        },
        externalHelpers: false,
        experimental: {
          plugins: [
            ["@swc/plugin-styled-components", {
              displayName: true,
              ssr: true,
              fileName: true,
              minify: true,
              transpileTemplateLiterals: true
            }]
          ]
        },
      },
    }),
    terser({
      maxWorkers: 4,
      compress: {
        /* Keep console.error and console.warn */
        pure_funcs: [
          "console.log",
          "console.info",
          "console.debug"
        ],
        passes: 2,
        unused: true,
        dead_code: true
      },
      mangle: true,
      format: {
        comments: false,
      },
      /* Matches es6 target in tsconfig */
      ecma: 2015,
      toplevel: true
    }),
    copy({
      targets: [
        { src: "src/style/assets/**/*", dest: "lib/style/assets" },
        { src: "src/style/assets/**/*", dest: "esm/style/assets" },
        { src: "src/components/icon/fonts/*.{woff,woff2}", dest: "lib/components/icon/fonts" },
        { src: "src/components/icon/fonts/*.{woff,woff2}", dest: "esm/components/icon/fonts" },
        { src: "src/style/fonts.css", dest: "lib/style/" },
        { src: "src/style/fonts.css", dest: "esm/style/" },
        { src: "src/global.d.ts", dest: "lib/" },
        { src: "src/global.d.ts", dest: "esm/" },
      ]
    }),
    visualizer({
      filename: "bundle-stats/index.html",
      gzipSize: true,
      brotliSize: true,
      template: "sunburst",
      title: "Carbon Bundle Stats",
    }),
  ],
  output: [
    {
      dir: path.join(__dirname, "lib"),
      format: "cjs",
      preserveModules: true,
      preserveModulesRoot: "src",
      entryFileNames: "[name].js",
      /* Preserves the folder structure of the source files */
      chunkFileNames: ({ name }) => `${name}.js`,
      exports: 'named',
      interop: 'auto',
    },
    {
      dir: path.join(__dirname, "esm"),
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src",
      entryFileNames: "[name].js",
      /* Preserves the folder structure of the source files */
      chunkFileNames: ({ name }) => `${name}.js`,
    },
  ],
};
