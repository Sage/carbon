import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import glob from "glob";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(scriptDir, "../../src/components");
const DIST_DIR = path.join(scriptDir, "../../lib/components");

// Find all SVG files in `src/components`
const svgFiles = glob.sync(`${SRC_DIR}/**/*.svg`);

svgFiles.forEach((srcPath) => {
  // Get the relative path from src/components
  const relativePath = path.relative(SRC_DIR, srcPath);

  const destPath = path.join(DIST_DIR, relativePath);

  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(srcPath, destPath);

  console.log(`✅ ${relativePath} copied to ${destPath}`);
});

console.log("🎉 SVG files copied successfully!");
