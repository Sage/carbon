import validateDependencies from "./validate-dependencies.mjs";

try {
  validateDependencies(process.cwd());
  // Validate before loading the generator's static token imports.
  await import("./generate_tokens.mjs");
} catch (error) {
  process.stderr.write(`Token generation failed: ${error.message}\n`);
  if (error.code === "ERR_MODULE_NOT_FOUND" || error.code === "ENOENT") {
    process.stderr.write(
      "Token source files may be missing. Run npm ci, then retry token generation.\n",
    );
  }
  process.exitCode = 1;
}
