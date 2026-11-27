import path from "node:path";

export default {
  process(_sourceText, sourcePath) {
    return {
      // Babel compiles Jest tests to CommonJS, so their SVG imports need CommonJS output too.
      // Switch this to an ESM export when the Jest test runtime moves to ESM.
      code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`,
    };
  },
  getCacheKey() {
    return "svgTransform";
  },
};
