import { resolve } from "node:path";
import { validateDiscoveryArtifacts } from "./discovery.js";

try {
  validateDiscoveryArtifacts(resolve(import.meta.dirname, "../../.."));
  process.stdout.write(
    "Validated deterministic Phase 5 discovery artifacts.\n",
  );
} catch (error) {
  process.stderr.write(
    `${error instanceof Error ? error.message : String(error)}\n`,
  );
  process.exitCode = 1;
}
