import path from "node:path";
import { parseArgs } from "node:util";
import saveBaseline from "./save-baseline.mjs";

try {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      replace: { type: "boolean", default: false },
      report: { type: "string" },
      directory: { type: "string" },
    },
  });
  if (positionals.length !== 1) {
    throw new Error(
      "Usage: npm run benchmark:save-baseline -- <scenario-id> [--report <file>] [--directory <folder>] [--replace]",
    );
  }
  const [id] = positionals;
  const result = await saveBaseline({
    id,
    reportPath:
      values.report ??
      path.resolve(
        process.env.BENCHMARK_OUTPUT_DIR ?? "playwright/benchmark-results",
        `${id.replaceAll("/", "--")}.json`,
      ),
    directory: values.directory ?? "playwright/benchmark-baselines",
    replace: values.replace,
  });
  process.stdout.write(
    `Saved ${id} baseline (${result.samples} samples): ${result.destination}\n`,
  );
  if (result.archivePath)
    process.stdout.write(`Previous baseline archived: ${result.archivePath}\n`);
} catch (error) {
  process.stderr.write(`Baseline save failed: ${error.message}\n`);
  process.exitCode = 1;
}
