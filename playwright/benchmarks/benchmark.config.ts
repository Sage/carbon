const integerSetting = (name: string, fallback: number, minimum: number) => {
  const value = Number(process.env[name] ?? fallback);
  if (!Number.isInteger(value) || value < minimum) {
    throw new Error(`${name} must be an integer >= ${minimum}`);
  }
  return value;
};

const benchmarkConfig = {
  samples: integerSetting("BENCHMARK_SAMPLES", 30, 1),
  warmups: integerSetting("BENCHMARK_WARMUPS", 5, 0),
  outputDirectory:
    process.env.BENCHMARK_OUTPUT_DIR ?? "playwright/benchmark-results",
};

export default benchmarkConfig;
