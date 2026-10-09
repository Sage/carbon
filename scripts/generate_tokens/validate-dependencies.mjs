import fs from "node:fs";
import path from "node:path";

const readJSON = (file, missingMessage) => {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") throw new Error(missingMessage);
    throw error;
  }
};

export default function validateDependencies(projectRoot) {
  const lock = readJSON(
    path.join(projectRoot, "package-lock.json"),
    "Token generation requires this checkout's package-lock.json.",
  );

  if (!fs.existsSync(path.join(projectRoot, "node_modules"))) {
    throw new Error(
      "Dependencies are missing. Run npm ci, then retry token generation.",
    );
  }

  const packageName = "@sage/design-tokens-fusion";
  const entry = `node_modules/${packageName}`;
  const expected = lock.packages?.[entry]?.version;
  if (!expected) {
    throw new Error(
      `No locked version for ${packageName}. Restore a valid package-lock.json and run npm ci.`,
    );
  }

  const installed = readJSON(
    path.join(projectRoot, entry, "package.json"),
    `Token dependency ${packageName} is missing. Run npm ci, then retry token generation.`,
  );
  if (installed.version !== expected) {
    throw new Error(
      `Token dependency mismatch: ${packageName} requires ${expected} in this checkout, ` +
        `but ${installed.version} is installed. Run npm ci, then retry token generation.`,
    );
  }
}
