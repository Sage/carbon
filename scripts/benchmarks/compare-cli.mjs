import { parseArgs } from "node:util";
import compareWorkflow from "./compare-workflow.mjs";

try {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      base: { type: "string", default: "origin/master" },
      fetch: { type: "boolean", default: false },
      grep: { type: "string" },
      samples: { type: "string" },
      warmups: { type: "string" },
      directory: { type: "string" },
    },
  });
  if (positionals.length)
    throw new Error(
      "Use --base <ref> and --grep <pattern>; positional arguments are not supported.",
    );
  await compareWorkflow({
    root: process.cwd(),
    base: values.base,
    fetch: values.fetch,
    grep: values.grep,
    samples: Number(values.samples ?? process.env.BENCHMARK_SAMPLES ?? 30),
    warmups: Number(values.warmups ?? process.env.BENCHMARK_WARMUPS ?? 5),
    ...(values.directory ? { directory: values.directory } : {}),
  });
} catch (error) {
  process.stderr.write(`Benchmark comparison failed: ${error.message}\n`);
  process.exitCode = 1;
}
