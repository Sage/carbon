const fs = require("fs");
const path = require("path");
const glob = require("glob");

const SRC_DIR = path.join(__dirname, "../../src/components");
const DIST_DIRS = [
  path.join(__dirname, "../../lib/components"),
  path.join(__dirname, "../../esm/components"),
];

// Find all SVG files in `src/components`
const svgFiles = glob.sync(`${SRC_DIR}/**/*.svg`);

svgFiles.forEach((srcPath) => {
  // Get the relative path from src/components
  const relativePath = path.relative(SRC_DIR, srcPath);

  DIST_DIRS.forEach((distDir) => {
    // Determine the destination path in dist/esm
    const destPath = path.join(distDir, relativePath);

    // Ensure the destination directory exists
    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    // Copy the file
    fs.copyFileSync(srcPath, destPath);

    console.log(`✅ ${relativePath} copied to ${destPath}`);
  });
});

console.log("🎉 SVG files copied successfully!");
