import path from "node:path";
import { parseArgs } from "node:util";
import writeHtmlReport from "./html-report.mjs";

try {
  const { positionals, values } = parseArgs({
    allowPositionals: true,
    options: { output: { type: "string" } },
  });
  if (positionals.length !== 1)
    throw new Error(
      "Usage: npm run benchmark:report -- <comparison-directory> [--output <html-file>]",
    );
  const directory = path.resolve(positionals[0]);
  const output = await writeHtmlReport(
    directory,
    values.output ? path.resolve(values.output) : undefined,
  );
  process.stdout.write(`HTML comparison report: ${output}\n`);
} catch (error) {
  process.stderr.write(`HTML report failed: ${error.message}\n`);
  process.exitCode = 1;
}
