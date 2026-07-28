import semver from "semver";
import { migrations, supportedBoundaries } from "./catalogue.js";
import type {
  DeprecationMigration,
  MigrationRecord,
  SupportedBoundary,
  UpgradeMigration,
} from "./types.js";
import { validateCatalogue } from "./validation.js";

export * from "./types.js";
export { migrations, supportedBoundaries, validateCatalogue };

export class UnsupportedUpgradePathError extends Error {
  constructor(
    readonly from: string,
    readonly to: string,
    readonly intermediatePath: readonly string[],
  ) {
    super(
      intermediatePath.length > 1
        ? `Unsupported upgrade path ${from} -> ${to}. Available tested steps from ${from}: ${intermediatePath.join(" -> ")}`
        : `Unsupported upgrade path ${from} -> ${to}. No tested steps are available from ${from}.`,
    );
    this.name = "UnsupportedUpgradePathError";
  }
}

const compareRecords = (
  left: MigrationRecord,
  right: MigrationRecord,
): number => {
  const leftVersion =
    left.scope === "upgrade" ? left.requiredBy : left.deprecatedIn;
  const rightVersion =
    right.scope === "upgrade" ? right.requiredBy : right.deprecatedIn;
  return (
    semver.compare(leftVersion, rightVersion) || left.id.localeCompare(right.id)
  );
};

const isUpgradeMigration = (
  record: MigrationRecord,
): record is UpgradeMigration => record.scope === "upgrade";

const isDeprecationMigration = (
  record: MigrationRecord,
): record is DeprecationMigration => record.scope === "deprecation";

export function findSupportedPath(
  from: string,
  to: string,
  boundaries: readonly SupportedBoundary[] = supportedBoundaries,
): string[] {
  if (!semver.valid(from) || !semver.valid(to) || !semver.lt(from, to)) {
    throw new Error(
      `Invalid upgrade interval "${from}" -> "${to}": expected valid versions with from < to`,
    );
  }
  const path = [from];
  let current = from;
  const visited = new Set<string>();
  while (current !== to) {
    if (visited.has(current)) return path;
    visited.add(current);
    const next = boundaries
      .filter(
        (boundary) => boundary.from === current && semver.lte(boundary.to, to),
      )
      .sort((a, b) => semver.compare(a.to, b.to))[0];
    if (!next) return path;
    path.push(next.to);
    current = next.to;
  }
  return path;
}

export function selectUpgradeMigrations(
  from: string,
  to: string,
  records: readonly MigrationRecord[] = migrations,
  boundaries: readonly SupportedBoundary[] = supportedBoundaries,
): UpgradeMigration[] {
  const path = findSupportedPath(from, to, boundaries);
  if (path.length !== 2 || path.at(-1) !== to) {
    throw new UnsupportedUpgradePathError(
      from,
      to,
      path.length > 1 ? path : [],
    );
  }
  return records
    .filter(isUpgradeMigration)
    .filter(
      (record) =>
        semver.gt(record.requiredBy, from) && semver.lte(record.requiredBy, to),
    )
    .sort(compareRecords);
}

export function selectDeprecationMigrations(
  records: readonly MigrationRecord[] = migrations,
): DeprecationMigration[] {
  return records.filter(isDeprecationMigration).sort(compareRecords);
}
