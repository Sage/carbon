const fs = require("fs");
const path = require("path");
const glob = require("glob");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

// Get the root directory of the project
const rootDir = process.cwd();

// Directories to scan for index files
const directoriesToScan = [
  path.join(rootDir, "src/components"),
  path.join(rootDir, "src/utils"),
  path.join(rootDir, "src/hooks"),
  // Add other directories as needed
];

// Output file
const outputFile = path.join(rootDir, "src/index.ts");

// Find all index files
const indexFiles = directoriesToScan.flatMap((dir) =>
  glob.sync(path.join(dir, "**/index.ts"), {
    ignore: [
      "**/__internal__/**",
      "**/*.test.ts",
      "**/*.stories.ts",
      "**/*.spec.ts",
      "**/*.d.ts",
    ],
  }),
);

const getExportInfo = (file) => {
  if (!fs.existsSync(file)) {
    console.warn(`File does not exist: ${file}`);
    return { defaultExportName: null, hasNamedExport: false };
  }

  const content = fs.readFileSync(file, "utf-8");

  let ast;
  try {
    ast = parser.parse(content, {
      sourceType: "module",
      plugins: ["typescript", "jsx", "decorators-legacy"],
    });
  } catch (error) {
    console.error(`❌ Failed to parse: ${file}\nError: ${error.message}`);
    return { defaultExportName: null, hasNamedExport: false };
  }

  console.log(`✅ Successfully parsed: ${file}`);

  let defaultExportName = null;
  let hasNamedExport = false;

  traverse(ast, {
    ExportDefaultDeclaration(filePath) {
      const { declaration } = filePath.node;

      if (!declaration) {
        console.warn(
          `⚠️ Skipping export default in ${file} (no declaration found)`,
        );
        return;
      }

      if (declaration.type === "Identifier") {
        defaultExportName = declaration.name;
      } else if (
        declaration.type === "FunctionDeclaration" ||
        declaration.type === "ClassDeclaration"
      ) {
        if (declaration.id) {
          defaultExportName = declaration.id.name;
        } else {
          console.warn(
            `⚠️ Default export in ${file} is an anonymous function/class.`,
          );
        }
      } else {
        console.warn(
          `⚠️ Unknown default export type in ${file}: ${declaration.type}`,
        );
      }
    },
    ExportNamedDeclaration() {
      console.log(`🔍 Found ExportNamedDeclaration in ${file}`);
      hasNamedExport = true;
    },
  });

  return { defaultExportName, hasNamedExport };
};

const exportStatements = new Set();

// Generate export statements
indexFiles.flatMap((indexFile) => {
  const content = fs.readFileSync(indexFile, "utf-8");
  const ast = parser.parse(content, {
    sourceType: "module",
    plugins: ["typescript", "jsx", "decorators-legacy"],
  });

  const exportPaths = [];
  traverse(ast, {
    ExportAllDeclaration(filePath) {
      exportPaths.push(filePath.node.source.value);
    },
    ExportNamedDeclaration(filePath) {
      if (filePath?.node?.source) {
        exportPaths.push(filePath.node.source.value);
      }
    },
  });

  return exportPaths.forEach((exportPath) => {
    const absolutePathTs = path.resolve(
      path.dirname(indexFile),
      `${exportPath}.ts`,
    );
    const absolutePathTsx = path.resolve(
      path.dirname(indexFile),
      `${exportPath}.tsx`,
    );
    let absolutePath = null;

    if (fs.existsSync(absolutePathTs)) {
      absolutePath = absolutePathTs;
    } else if (fs.existsSync(absolutePathTsx)) {
      absolutePath = absolutePathTsx;
    }

    if (!absolutePath) {
      console.warn(`Skipping missing file: ${exportPath}`);
      return;
    }

    const { defaultExportName, hasNamedExport } = getExportInfo(absolutePath);
    const relativePath = path
      .relative(path.dirname(outputFile), absolutePath)
      .replace(/\.[tj]sx?$/, "") // Remove .ts, .tsx, .js, .jsx
      .replace(/\\/g, "/");

    // if (defaultExportName && hasNamedExport) {
    //   return [
    //     `export * from "./${relativePath}";`,
    //     `export { default as ${defaultExportName} } from "./${relativePath}";`
    //   ];
    // }

    // if (defaultExportName) {
    //   return `export { default as ${defaultExportName} } from "./${relativePath}";`;
    // }

    // if (hasNamedExport) {
    //   return `export * from "./${relativePath}";`;
    // }

    // Avoid returning an empty entry if no exports are found
    // return [];

    if (defaultExportName) {
      exportStatements.add(
        `export { default as ${defaultExportName} } from "./${relativePath}";`,
      );
    } else if (hasNamedExport) {
      exportStatements.add(`export * from "./${relativePath}";`);
    }
  });
});

// console.log(`📝 Writing ${statements.length} exports to ${outputFile}:\n`, exportStatements);

// Write to index.ts
fs.writeFileSync(outputFile, Array.from(exportStatements).join("\n"), "utf-8");

console.log(
  `Generated ${outputFile} with ${exportStatements.size} unique exports.`,
);
