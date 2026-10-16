const fs = require("fs");
const path = require("path");
const glob = require("glob");

const SRC_DIR = path.join(__dirname, "../../src/components");
const DIST_DIR = path.join(__dirname, "../../lib/components");

// Find all SVG files in `src/components`
const svgFiles = glob.sync(`${SRC_DIR}/**/*.svg`);

svgFiles.forEach((srcPath) => {
  // Get the relative path from src/components
  const relativePath = path.relative(SRC_DIR, srcPath);

  const destPath = path.join(DIST_DIR, relativePath);

  // Ensure the destination directory exists
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  // Copy the file
  fs.copyFileSync(srcPath, destPath);

  // eslint-disable-next-line no-console
  console.log(`✅ ${relativePath} copied to ${destPath}`);
});

// eslint-disable-next-line no-console
console.log("🎉 SVG files copied successfully!");
