import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { migrations, supportedBoundaries } from "./catalogue.js";
import { validateCatalogue } from "./validation.js";

const packageDirectory = resolve(
  fileURLToPath(new URL(".", import.meta.url)),
  "..",
);
const repositoryRoot = resolve(packageDirectory, "../..");
validateCatalogue(migrations, supportedBoundaries, repositoryRoot);
process.stdout.write(
  `Validated ${migrations.length} migration records and ${supportedBoundaries.length} supported boundaries.\n`,
);
