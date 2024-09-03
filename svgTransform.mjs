import path from "node:path";

export default {
  process(_sourceText, sourcePath) {
    return {
      code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`,
    };
  },
  getCacheKey() {
    return "svgTransform";
  },
};
