import { performance } from "node:perf_hooks";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { validateMaintainerWorkflow } from "./maintainer-validation.js";

const packageDirectory = resolve(
  fileURLToPath(new URL(".", import.meta.url)),
  "..",
);
const repositoryRoot = resolve(packageDirectory, "../..");
const started = performance.now();
const result = validateMaintainerWorkflow(repositoryRoot);
process.stdout.write(
  `Validated migration workflow (${result.markers} markers across ${result.files} source files) in ${Math.round(performance.now() - started)}ms.\n`,
);
