import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { migrations } from "./catalogue.js";
import { registerPath, writeRegister } from "./register.js";

const packageDirectory = resolve(
  fileURLToPath(new URL(".", import.meta.url)),
  "..",
);
const repositoryRoot = resolve(packageDirectory, "../..");
writeRegister(migrations, repositoryRoot);
process.stdout.write(
  `Generated ${registerPath} from ${migrations.length} catalogue records.\n`,
);
