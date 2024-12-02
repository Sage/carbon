const childProcess = require("child_process");
const path = require("path");
const { promisify } = require("util");

const exec = promisify(childProcess.exec);

async function run(bundle) {
  const env = {
    NODE_ENV: "production",
    BABEL_ENV: bundle,
  };

  const babelConfig = path.resolve(__dirname, "../babel.config.js");
  const srcDir = path.resolve("./src");

  const extensions = [".js", ".ts", ".tsx"];
  const ignore = [
    "**/*.spec.js",
    "**/*.spec.ts",
    "**/*.spec.tsx",
    "**/*.test.js",
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.stories.js",
    "**/*.stories.tsx",
    "**/*.d.ts",
    "**/*.pw.tsx",
    "**/*.test-pw.tsx",
    "src/__spec_helper__/__internal__/**",
  ];

  const outDir = path.resolve(
    {
      cjs: "./lib",
      esm: "./esm",
    }[bundle],
  );

  const babelArgs = [
    "--config-file",
    babelConfig,
    "--extensions",
    `"${extensions.join(",")}"`,
    srcDir,
    "--out-dir",
    outDir,
    "--ignore",
    `"${ignore.join('","')}"`,
  ];

  const command = ["babel", ...babelArgs].join(" ");

  const { stderr } = await exec(command, {
    env: { ...process.env, ...env },
  });

  if (stderr) {
    throw new Error(`'${command}' failed with \n${stderr}`);
  }
}

run("esm");
run("cjs");
