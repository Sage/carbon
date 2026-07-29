import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";
import { migrations, supportedBoundaries } from "./catalogue.js";
import { validateRegister } from "./register.js";
import registeredRules from "./rules.js";
import { validateCatalogue } from "./validation.js";

type Exemption = {
  id: string;
  inventoryDigest: string;
  reason: string;
  scope: string;
  owner: string;
  reviewEvidence: string;
};

type Marker = {
  file: string;
  line: number;
  marker: "deprecation" | "breaking-change";
  text: string;
};

const sourceExtensions = new Set([".js", ".jsx", ".ts", ".tsx"]);
const ignored = new Set([
  "node_modules",
  "dist",
  "lib",
  "esm",
  "coverage",
  "storybook-static",
]);
const digest = (value: string) =>
  createHash("sha256").update(value).digest("hex");

const ignoredSourceFile = (path: string) =>
  /(?:^|\/)(?:test|tests|__tests__|__internal__)(?:\/|$)|\.(?:test|stories|pw|test-pw)\.[^.]+$/i.test(
    path.replaceAll("\\", "/"),
  );

function files(root: string): string[] {
  const output: string[] = [];
  const walk = (directory: string) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (ignored.has(entry.name) || entry.isSymbolicLink()) continue;
      const path = join(directory, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (sourceExtensions.has(extname(entry.name))) output.push(path);
    }
  };
  walk(resolve(root, "src"));
  return output.sort();
}

export function extractMarkers(repositoryRoot: string): Marker[] {
  return files(repositoryRoot).flatMap((path): Marker[] => {
    const file = relative(repositoryRoot, path).replaceAll("\\", "/");
    if (ignoredSourceFile(file)) return [];
    const source = readFileSync(path, "utf8");
    const lines = source.split("\n");
    return lines.flatMap((line, index, allLines): Marker[] => {
      const normalized = line.trim();
      if (/@deprecated\b/i.test(normalized))
        return [
          {
            file,
            line: index + 1,
            marker: "deprecation" as const,
            text: normalized,
          },
        ];
      if (/\bLogger\.deprecate\s*\(/.test(normalized)) {
        const callLines = [normalized];
        if (!/\);\s*$/.test(normalized))
          for (
            let following = index + 1;
            following < Math.min(allLines.length, index + 20);
            following += 1
          ) {
            const callLine = allLines[following]?.trim() ?? "";
            callLines.push(callLine);
            if (/\);\s*$/.test(callLine)) break;
          }
        return [
          {
            file,
            line: index + 1,
            marker: "deprecation" as const,
            text: callLines.join(" "),
          },
        ];
      }
      if (/\bmigration-breaking-change\b/i.test(normalized))
        return [
          {
            file,
            line: index + 1,
            marker: "breaking-change" as const,
            text: normalized,
          },
        ];
      return [];
    });
  });
}

export function markerDigest(
  repositoryRoot: string,
  file: string,
  marker: string,
) {
  return digest(
    extractMarkers(repositoryRoot)
      .filter((item) => item.file === file && item.marker === marker)
      .map((item) => item.text)
      .join("\n"),
  );
}

export function validateEnforcement(
  repositoryRoot: string,
  exemptions: Exemption[],
) {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const exemption of exemptions) {
    if (!exemption.id || ids.has(exemption.id))
      errors.push(`invalid or duplicate exemption ID "${exemption.id}"`);
    ids.add(exemption.id);
    for (const field of ["reason", "scope", "owner", "reviewEvidence"] as const)
      if (!exemption[field]?.trim())
        errors.push(`exemption "${exemption.id}" requires ${field}`);
    if (!/^[a-f0-9]{64}$/.test(exemption.inventoryDigest))
      errors.push(`exemption "${exemption.id}" has an invalid inventoryDigest`);
    if (
      exemption.scope !==
      `unreferenced-marker-inventory:${exemption.inventoryDigest}`
    )
      errors.push(
        `exemption "${exemption.id}" scope must exactly bind its inventory digest`,
      );
  }
  if (errors.length)
    throw new Error(`Invalid migration enforcement:\n- ${errors.join("\n- ")}`);
  const markers = extractMarkers(repositoryRoot);
  const unreferenced = markers.filter((marker) => {
    const match = marker.text.match(/migration-id:\s*([a-z0-9-]+)/i);
    return !match || !migrations.some((record) => record.id === match[1]);
  });
  const inventoryDigest = digest(
    JSON.stringify(
      unreferenced.map(({ file, marker, text }) => ({ file, marker, text })),
    ),
  );
  if (unreferenced.length === 0) {
    if (exemptions.length)
      throw new Error(
        "Invalid migration enforcement:\n- reviewed marker exemptions are stale because no unreferenced markers remain",
      );
    return;
  }
  const matching = exemptions.filter(
    (item) => item.inventoryDigest === inventoryDigest,
  );
  if (matching.length !== 1 || exemptions.length !== 1) {
    const first = unreferenced[0];
    errors.push(
      `${first?.file ?? "source"}:${first?.line ?? 1}: public markers changed without matching "migration-id: <catalogue-id>" references or an updated reviewed exemption; inventory digest is ${inventoryDigest}`,
    );
  }
  if (errors.length)
    throw new Error(`Invalid migration enforcement:\n- ${errors.join("\n- ")}`);
}

export function validateDependencyEvidence(repositoryRoot: string): void {
  const packageMetadata = JSON.parse(
    readFileSync(
      resolve(repositoryRoot, "packages/carbon-react-migrate/package.json"),
      "utf8",
    ),
  );
  const lock = JSON.parse(
    readFileSync(resolve(repositoryRoot, "package-lock.json"), "utf8"),
  );
  const provenance = readFileSync(
    resolve(repositoryRoot, "migration-tooling/OPEN_SOURCE_PROVENANCE.md"),
    "utf8",
  );
  const notices = readFileSync(
    resolve(repositoryRoot, "migration-tooling/THIRD_PARTY_NOTICES.md"),
    "utf8",
  );
  for (const dependency of ["jscodeshift", "semver"]) {
    const declared = packageMetadata.dependencies?.[dependency];
    const locked = lock.packages?.[`node_modules/${dependency}`];
    if (!declared || !locked?.version || !locked?.license)
      throw new Error(
        `Production dependency "${dependency}" lacks declared, locked-version, or license evidence`,
      );
    const evidence = `\`${dependency}\`: declared \`${declared}\`, resolved \`${locked.version}\`, license \`${locked.license}\``;
    if (!provenance.includes(evidence))
      throw new Error(
        `Open-source provenance is stale for "${dependency}"; expected: ${evidence}`,
      );
  }
  const recast = lock.packages?.["node_modules/recast"];
  if (!recast?.version || !recast?.license)
    throw new Error("Recast lacks locked-version or license evidence");
  const recastEvidence = `\`recast\`: resolved \`${recast.version}\`, license \`${recast.license}\``;
  if (!provenance.includes(recastEvidence))
    throw new Error(
      `Open-source provenance is stale for "recast"; expected: ${recastEvidence}`,
    );
  if (!notices.trim() || !/jscodeshift|semver|recast/i.test(notices))
    throw new Error(
      "Third-party notices must state the notice disposition for migration-tooling dependencies",
    );
}

export function validateMaintainerWorkflow(repositoryRoot: string) {
  validateCatalogue(migrations, supportedBoundaries, repositoryRoot);
  validateRegister(migrations, repositoryRoot);
  const exemptions = JSON.parse(
    readFileSync(
      resolve(repositoryRoot, "migration-tooling/exemptions.json"),
      "utf8",
    ),
  ) as Exemption[];
  validateEnforcement(repositoryRoot, exemptions);
  for (const rule of registeredRules)
    if (
      !migrations.some(
        (record) =>
          record.automation.status !== "manual" &&
          record.automation.rule === rule,
      )
    )
      throw new Error(`Registered rule "${rule}" has no catalogue record`);
  for (const path of [
    "packages/carbon-react-migrate/schema/report-v1.schema.json",
    "packages/carbon-react-migrate/test/fixtures/report-v1.snapshot.json",
    "packages/carbon-react-migrate/test/fixtures/supported",
    "packages/carbon-react-migrate/test/fixtures/negative",
    "packages/carbon-react-migrate/test/fixtures/ambiguous",
    "migration-tooling/OPEN_SOURCE_PROVENANCE.md",
    "migration-tooling/THIRD_PARTY_NOTICES.md",
    "migration-tooling/MAINTAINER_WORKFLOW.md",
  ])
    if (!existsSync(resolve(repositoryRoot, path)))
      throw new Error(`Required migration artifact is missing: ${path}`);
  validateDependencyEvidence(repositoryRoot);
  return {
    markers: extractMarkers(repositoryRoot).length,
    files: files(repositoryRoot).length,
  };
}
