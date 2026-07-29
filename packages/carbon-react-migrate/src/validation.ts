import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import semver from "semver";
import registeredRules from "./rules.js";
import type { SupportedBoundary } from "./types.js";

type HistoricalApiExemption = {
  recordId: string;
  path: string;
  symbol: string;
  historicalVersion: string;
  removedIn: string;
  reason: string;
};

export const historicalApiExemptions = new Map<string, HistoricalApiExemption>([
  [
    "P1-H1",
    {
      recordId: "button-next-dom-ref",
      path: "src/components/button/__next__/button.component.tsx",
      symbol: "ButtonHandle",
      historicalVersion: "160.0.0",
      removedIn: "161.0.0",
      reason:
        "ButtonHandle exists at v160.0.0 and was removed from the __next__ public API at v161.0.0.",
    },
  ],
]);

const versions = ["requiredBy", "deprecatedIn", "removedIn"] as const;
const risks = new Set(["behaviour", "accessibility", "visual", "types"]);
const kinds = new Set(["prop", "import", "component", "manual"]);
const scopes = new Set(["upgrade", "deprecation"]);
const automationStatuses = new Set(["safe", "partial", "manual"]);

const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

function hasAnchor(document: string, anchor: string): boolean {
  if (document.includes(`<a id="${anchor}"></a>`)) return true;
  return document.split("\n").some((line) => {
    const heading = line.match(/^#{1,6}\s+(.+)$/)?.[1] ?? "";
    const visibleHeading = heading.match(/^\[([^\]]+)\]/)?.[1] ?? heading;
    const normalized = visibleHeading
      .toLowerCase()
      .replace(/<[^>]+>/g, "")
      .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
      .trim()
      .replace(/\s+/g, "-");
    return normalized === anchor;
  });
}

function validateReference(
  value: unknown,
  field: string,
  repositoryRoot: string,
  errors: string[],
  anchorRequired: boolean,
): void {
  if (
    !isObject(value) ||
    !isNonEmptyString(value.file) ||
    (anchorRequired && !isNonEmptyString(value.anchor)) ||
    (value.anchor !== undefined && !isNonEmptyString(value.anchor))
  ) {
    errors.push(
      `${field}: expected ${anchorRequired ? "file and anchor" : "a file and optional anchor"}`,
    );
    return;
  }
  let document = "";
  try {
    document = readFileSync(resolve(repositoryRoot, value.file), "utf8");
  } catch {
    errors.push(`${field}: file not found "${value.file}"`);
    return;
  }
  if (isNonEmptyString(value.anchor) && !hasAnchor(document, value.anchor))
    errors.push(`${field}: stable anchor "${value.anchor}" not found`);
}

function validateStringArray(
  value: unknown,
  field: string,
  errors: string[],
): value is string[] {
  if (!Array.isArray(value) || value.some((item) => !isNonEmptyString(item))) {
    errors.push(`${field}: expected an array of non-empty strings`);
    return false;
  }
  return true;
}

export function validateCatalogue(
  records: readonly unknown[],
  boundaries: readonly unknown[],
  repositoryRoot: string,
): void {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const rawRecord of records) {
    if (!isObject(rawRecord)) {
      errors.push("record: expected an object");
      continue;
    }
    const record = rawRecord;
    const prefix = `record "${isNonEmptyString(record.id) ? record.id : "<missing>"}"`;
    if (!isNonEmptyString(record.id)) {
      errors.push(`${prefix}: id must be a non-empty string`);
      continue;
    }
    if (ids.has(record.id)) errors.push(`${prefix}: duplicate id`);
    ids.add(record.id);

    if (!scopes.has(String(record.scope))) {
      errors.push(`${prefix}.scope: expected "upgrade" or "deprecation"`);
    }
    if (record.scope === "upgrade" && !record.requiredBy) {
      errors.push(`${prefix}: upgrade records require requiredBy`);
    }
    if (record.scope === "deprecation" && !record.deprecatedIn) {
      errors.push(`${prefix}: deprecation records require deprecatedIn`);
    }
    for (const field of versions) {
      const value = record[field];
      if (
        value !== undefined &&
        (!isNonEmptyString(value) || semver.valid(value) === null)
      ) {
        errors.push(
          `${prefix}.${field}: invalid semantic version "${String(value)}"`,
        );
      }
    }
    if (
      record.deprecatedIn &&
      record.removedIn &&
      isNonEmptyString(record.deprecatedIn) &&
      isNonEmptyString(record.removedIn) &&
      semver.valid(record.deprecatedIn) &&
      semver.valid(record.removedIn) &&
      semver.gt(record.deprecatedIn, record.removedIn)
    ) {
      errors.push(`${prefix}: deprecatedIn must not be later than removedIn`);
    }

    if (!kinds.has(String(record.kind))) {
      errors.push(
        `${prefix}.kind: invalid migration kind "${String(record.kind)}"`,
      );
    }
    if (
      !isObject(record.subject) ||
      record.subject.package !== "carbon-react"
    ) {
      errors.push(`${prefix}.subject.package: expected "carbon-react"`);
    } else {
      for (const field of ["component", "importPath", "prop"] as const) {
        if (
          record.subject[field] !== undefined &&
          !isNonEmptyString(record.subject[field])
        ) {
          errors.push(
            `${prefix}.subject.${field}: expected a non-empty string`,
          );
        }
      }
    }
    if (
      !isObject(record.guidance) ||
      !isNonEmptyString(record.guidance.summary)
    ) {
      errors.push(`${prefix}.guidance.summary: expected a non-empty string`);
      continue;
    }
    validateStringArray(
      record.guidance.manualChecks,
      `${prefix}.guidance.manualChecks`,
      errors,
    );
    if (
      !Array.isArray(record.guidance.risks) ||
      record.guidance.risks.some((risk) => !risks.has(String(risk)))
    ) {
      errors.push(`${prefix}.guidance.risks: contains an invalid risk`);
    }
    if (
      !isObject(record.automation) ||
      !automationStatuses.has(String(record.automation.status))
    ) {
      errors.push(
        `${prefix}.automation.status: expected safe, partial, or manual`,
      );
      continue;
    }
    if (record.automation.status === "safe") {
      if (!isNonEmptyString(record.automation.rule)) {
        errors.push(
          `${prefix}.automation.rule: safe automation requires a rule`,
        );
      }
      if (
        record.automation.reason !== undefined ||
        record.automation.limitations !== undefined
      ) {
        errors.push(
          `${prefix}.automation: safe automation permits only status and rule`,
        );
      }
    } else if (record.automation.status === "partial") {
      validateStringArray(
        record.automation.limitations,
        `${prefix}.automation.limitations`,
        errors,
      );
      if (
        Array.isArray(record.automation.limitations) &&
        record.automation.limitations.length === 0
      ) {
        errors.push(
          `${prefix}.automation.limitations: partial automation requires at least one limitation`,
        );
      }
      if (record.automation.reason !== undefined) {
        errors.push(
          `${prefix}.automation: partial automation does not permit reason`,
        );
      }
      if (
        record.automation.rule !== undefined &&
        !isNonEmptyString(record.automation.rule)
      ) {
        errors.push(`${prefix}.automation.rule: expected a non-empty string`);
      }
    } else {
      if (!isNonEmptyString(record.automation.reason)) {
        errors.push(
          `${prefix}.automation.reason: manual automation requires a reason`,
        );
      }
      if (
        record.automation.rule !== undefined ||
        record.automation.limitations !== undefined
      ) {
        errors.push(
          `${prefix}.automation: manual automation permits only status and reason`,
        );
      }
    }
    if (isNonEmptyString(record.automation.rule)) {
      if (!registeredRules.has(record.automation.rule)) {
        errors.push(
          `${prefix}.automation.rule: unregistered rule "${record.automation.rule}"`,
        );
      }
    }

    validateReference(
      record.guidance.documentation,
      `${prefix}.guidance.documentation`,
      repositoryRoot,
      errors,
      true,
    );
    for (const field of ["changelog", "migrationSkill"] as const)
      if (record.guidance[field] !== undefined)
        validateReference(
          record.guidance[field],
          `${prefix}.guidance.${field}`,
          repositoryRoot,
          errors,
          false,
        );

    if (!Array.isArray(record.apiReferences)) {
      errors.push(`${prefix}.apiReferences: expected an array`);
      continue;
    }
    for (const rawReference of record.apiReferences) {
      if (!isObject(rawReference) || !isNonEmptyString(rawReference.path)) {
        errors.push(
          `${prefix}.apiReferences: each reference requires a non-empty path`,
        );
        continue;
      }
      const reference = rawReference;
      const referencePath = reference.path as string;
      const referenceSymbol = isNonEmptyString(reference.symbol)
        ? reference.symbol
        : undefined;
      if (
        reference.symbol !== undefined &&
        !isNonEmptyString(reference.symbol)
      ) {
        errors.push(`${prefix}.apiReferences: symbol must be non-empty`);
      }
      if (reference.historicalExemption !== undefined) {
        if (!isNonEmptyString(reference.historicalExemption)) {
          errors.push(
            `${prefix}.apiReferences: historicalExemption must be non-empty`,
          );
          continue;
        }
        const exemption = historicalApiExemptions.get(
          reference.historicalExemption,
        );
        if (!exemption) {
          errors.push(
            `${prefix}.apiReferences: unknown historical exemption "${reference.historicalExemption}"`,
          );
          continue;
        }
        const actual = {
          recordId: record.id,
          path: reference.path,
          symbol: reference.symbol,
          historicalVersion: reference.historicalVersion,
          removedIn: record.removedIn,
        };
        const mismatch = (
          [
            "recordId",
            "path",
            "symbol",
            "historicalVersion",
            "removedIn",
          ] as const
        ).find((field) => actual[field] !== exemption[field]);
        if (mismatch) {
          errors.push(
            `${prefix}.apiReferences: historical exemption "${reference.historicalExemption}" is not valid for ${mismatch} "${String(actual[mismatch])}"`,
          );
        }
        continue;
      }
      if (reference.historicalVersion !== undefined) {
        errors.push(
          `${prefix}.apiReferences: historicalVersion requires a reviewed historicalExemption`,
        );
        continue;
      }
      let source = "";
      try {
        source = readFileSync(resolve(repositoryRoot, referencePath), "utf8");
      } catch {
        errors.push(
          `${prefix}.apiReferences: current API file not found "${referencePath}"`,
        );
      }
      if (referenceSymbol && source && !source.includes(referenceSymbol)) {
        errors.push(
          `${prefix}.apiReferences: symbol "${referenceSymbol}" not found in "${referencePath}"`,
        );
      }
    }
  }

  const boundaryKeys = new Set<string>();
  const fromVersions = new Set<string>();
  const toVersions = new Set<string>();
  const parsedBoundaries: SupportedBoundary[] = [];
  boundaries.forEach((rawBoundary, index) => {
    if (
      !isObject(rawBoundary) ||
      !isNonEmptyString(rawBoundary.from) ||
      !isNonEmptyString(rawBoundary.to)
    ) {
      errors.push(
        `boundary at index ${index}: expected non-empty from and to versions`,
      );
      return;
    }
    const boundary = rawBoundary as unknown as SupportedBoundary;
    parsedBoundaries.push(boundary);
    const label = `boundary "${boundary.from} -> ${boundary.to}"`;
    if (!semver.valid(boundary.from) || !semver.valid(boundary.to)) {
      errors.push(`${label}: versions must be valid semantic versions`);
    } else if (!semver.lt(boundary.from, boundary.to)) {
      errors.push(`${label}: from must be earlier than to`);
    }
    const key = `${boundary.from}->${boundary.to}`;
    if (boundaryKeys.has(key)) errors.push(`${label}: duplicate boundary`);
    boundaryKeys.add(key);
    if (fromVersions.has(boundary.from)) {
      errors.push(`${label}: branching from-version "${boundary.from}"`);
    }
    if (toVersions.has(boundary.to)) {
      errors.push(`${label}: merging to-version "${boundary.to}"`);
    }
    fromVersions.add(boundary.from);
    toVersions.add(boundary.to);
    if (parsedBoundaries.length > 1) {
      const previous = parsedBoundaries[parsedBoundaries.length - 2];
      if (previous.to !== boundary.from) {
        errors.push(
          `${label}: boundary topology must be one contiguous, ascending chain; expected from "${previous.to}"`,
        );
      }
    }
  });

  if (errors.length)
    throw new Error(`Invalid migration catalogue:\n- ${errors.join("\n- ")}`);
}
