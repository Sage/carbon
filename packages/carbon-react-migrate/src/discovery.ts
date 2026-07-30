import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import semver from "semver";
import { migrations } from "./catalogue.js";
import { extractMarkers } from "./maintainer-validation.js";

export const DISCOVERY_SCHEMA_VERSION = 1;
export const discoveryDirectory = "migration-tooling/discovery";

export type Evidence = {
  file: string;
  line: number;
  mechanism: string;
  excerpt: string;
  version?: string;
  subject?: string;
  action?: string;
  reasonCode?: string;
};

export type Candidate = {
  id: string;
  subjectKey: string;
  subject: string;
  action: string;
  authority: "non-authoritative";
  reviewStatus: "needs-review";
  confidence: "high" | "medium" | "low";
  mergeReason: "same-explicit-migration-id" | "same-subject-action-release";
  correlatedCatalogueIds: string[];
  evidence: Evidence[];
  applicableVersionEvidence: string[];
  missingRequiredInformation: string[];
  evidenceScope: "interval-qualified" | "current-snapshot-unbounded";
};

type CodemodReference = {
  file: "CHANGELOG.md";
  line: number;
  release: string;
  excerpt: string;
};

type HistoricalCodemod = {
  transform: string;
  subject: string;
  subjectKey: string;
  repositoryPath: string;
  references: CodemodReference[];
  correlatedCandidateIds: string[];
  fixtures: "not-inspectable-locally";
  languages: "not-inspectable-locally";
  parserAndToolVersions: "not-inspectable-locally";
  license: "Apache-2.0";
  semanticMatch: "not-reviewed";
  reuseDecision: "useful-only-as-evidence";
};

export type DiscoveryInventory = {
  schemaVersion: 1;
  authority: "non-authoritative";
  interval: { from: string; to: string };
  ordering: string;
  releaseBoundariesInspected: string[];
  evidenceSourcesUsed: string[];
  unsupportedOrUninspectable: string[];
  candidates: Candidate[];
  currentSnapshotUnboundedEvidence: Candidate[];
  catalogueCorrelatedEvidence: Candidate[];
  boundaryOnlyEvidence: Evidence[];
  internalOnlyEvidence: Evidence[];
  rejectedByRuleEvidence: Evidence[];
  ambiguousEvidence: Evidence[];
  historicalCodemods: HistoricalCodemod[];
  oldToNewIdMapping: Array<{
    oldId: string;
    disposition:
      | "candidate"
      | "catalogue-correlated"
      | "boundary-only"
      | "internal-only"
      | "rejected-by-rule"
      | "ambiguous";
    newId: string;
    reasonCode: string;
  }>;
};

const normalizedExcerpt = (value: string) =>
  value.trim().replace(/\s+/g, " ").slice(0, 400);
const stableHash = (value: string) =>
  createHash("sha256").update(value).digest("hex").slice(0, 16);
const oldEvidenceId = (evidence: Evidence) => {
  const mechanism =
    evidence.mechanism === "release-boundary-file-change"
      ? "local-tag-public-api-or-package-diff"
      : evidence.mechanism;
  const excerpt =
    evidence.mechanism === "public-deprecated"
      ? evidence.excerpt.replace(/\s+declaration:[A-Za-z][A-Za-z0-9_]*$/, "")
      : evidence.excerpt;
  return `candidate-${stableHash(
    `${mechanism}\0${evidence.file}\0${evidence.line}\0${excerpt}`,
  )}`;
};
const candidateId = (subjectKey: string) =>
  `candidate-${stableHash(`subject-v2\0${subjectKey}`)}`;
const pascal = (value: string) =>
  value
    .split(/[-_/]/)
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join("");
const sortEvidence = (items: Evidence[]) =>
  items.sort((a, b) =>
    `${a.file}:${String(a.line).padStart(8, "0")}:${a.mechanism}`.localeCompare(
      `${b.file}:${String(b.line).padStart(8, "0")}:${b.mechanism}`,
    ),
  );

export function validateInterval(from: string, to: string): void {
  if (!semver.valid(from) || !semver.valid(to))
    throw new Error("--from and --to must be valid semantic versions");
  if (!semver.lt(from, to)) throw new Error("--from must be lower than --to");
}

function componentFromPath(file: string): string | undefined {
  const segment = file.match(/^src\/components\/([^/]+)/)?.[1];
  return segment ? pascal(segment) : undefined;
}

function sourceClassification(file: string): string | undefined {
  const path = file.toLowerCase();
  if (
    /(?:^|\/)(?:test|tests|__tests__|fixtures?)(?:\/|$)|\.(?:test|spec)\./.test(
      path,
    )
  )
    return "internal-test-or-fixture";
  if (/\.stories\.|(?:^|\/)stories?(?:\/|$)/.test(path))
    return "internal-story";
  if (/playwright|\.pw\.|\.test-pw\./.test(path)) return "internal-playwright";
  if (/snapshot|__snapshots__/.test(path)) return "internal-snapshot";
  if (/__internal__|(?:^|\/)private(?:\/|$)/.test(path))
    return "internal-private";
  if (/generated|(?:^|\/)(?:lib|esm|dist)(?:\/|$)/.test(path))
    return "internal-generated";
  if (/\.mdx?$|(?:^|\/)docs?(?:\/|$)/.test(path))
    return "guidance-only-doc-change";
  return undefined;
}

function changelogDiscovery(root: string, from: string, to: string) {
  const lines = readFileSync(resolve(root, "CHANGELOG.md"), "utf8").split("\n");
  const boundaries: string[] = [];
  const qualified: Evidence[] = [];
  const rejected: Evidence[] = [];
  const codemodReferences: Array<{
    transform: string;
    subject: string;
    reference: CodemodReference;
  }> = [];
  let release = "";
  let section = "";
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    const heading = line.match(/^## \[?(\d+\.\d+\.\d+)/);
    if (heading) {
      release = heading[1] ?? "";
      section = "";
      if (semver.gt(release, from) && semver.lte(release, to))
        boundaries.push(release);
      continue;
    }
    if (!release || !semver.gt(release, from) || !semver.lte(release, to))
      continue;
    const sectionHeading = line.match(/^###\s+(.+)/);
    if (sectionHeading) {
      section = sectionHeading[1] ?? "";
      if (/(?:breaking|migration|deprecated|removed)/i.test(section))
        rejected.push({
          file: "CHANGELOG.md",
          line: index + 1,
          mechanism: "changelog",
          excerpt: normalizedExcerpt(line),
          version: release,
          reasonCode: "generic-heading-without-subject-action",
        });
      continue;
    }
    if (!/^\s*[*-]\s+/.test(line)) continue;
    const block = [line];
    while (
      index + 1 < lines.length &&
      (lines[index + 1]?.startsWith("  ") ||
        (!!lines[index + 1]?.trim() &&
          !/^#{2,3}\s|^\s*[*-]\s+/.test(lines[index + 1] ?? "")))
    )
      block.push(lines[(index += 1)] ?? "");
    const excerpt = normalizedExcerpt(block.join(" "));
    const subject =
      excerpt.match(/\*\*([^:*]+)(?:,\s*[^:*]+)*:\*\*/)?.[1]?.trim() ??
      excerpt.match(/`([A-Z][A-Za-z0-9.]*)`/)?.[1];
    const actionable =
      /\b(?:no longer|deprecated|removed|remove\b|must|requires?|requirement|incompatib|use .* instead|replace|rename|codemod)\b/i.test(
        excerpt,
      );
    const explicitBugFixMigrationSignal =
      /\b(?:deprecated|breaking|migration|codemod)\b/i.test(excerpt) ||
      /\bcustomers?\s+(?:must|should|need)\b/i.test(excerpt);
    const transform =
      excerpt.match(
        /carbon-codemod(?:\/tree\/master\/transforms\/|[ `])([a-z0-9-]+)/i,
      )?.[1] ?? excerpt.match(/\bnpx\s+carbon-codemod\s+([a-z0-9-]+)/i)?.[1];
    if (transform && subject)
      codemodReferences.push({
        transform,
        subject,
        reference: {
          file: "CHANGELOG.md",
          line: index - block.length + 2,
          release,
          excerpt,
        },
      });
    const ordinaryBugFix =
      /bug fixes?/i.test(section) &&
      !explicitBugFixMigrationSignal &&
      !transform;
    if (subject && (actionable || transform) && !ordinaryBugFix) {
      qualified.push({
        file: "CHANGELOG.md",
        line: index - block.length + 2,
        mechanism: "changelog-action",
        excerpt,
        version: release,
        subject,
        action: transform ? `codemod:${transform}` : "customer-action",
      });
    } else if (subject && ordinaryBugFix && actionable) {
      rejected.push({
        file: "CHANGELOG.md",
        line: index - block.length + 2,
        mechanism: "changelog",
        excerpt,
        version: release,
        reasonCode: "bug-fix-without-explicit-migration-signal",
      });
    } else if (
      /\b(?:changed|breaking|migration|deprecated|removed|codemod)\b/i.test(
        excerpt,
      )
    )
      rejected.push({
        file: "CHANGELOG.md",
        line: index - block.length + 2,
        mechanism: "changelog",
        excerpt,
        version: release,
        reasonCode: subject
          ? "ordinary-wording-without-actionable-customer-change"
          : "action-wording-without-public-subject",
      });
  }
  return {
    boundaries: [...new Set(boundaries)].sort(semver.compare),
    qualified,
    rejected,
    codemodReferences,
  };
}

function tagDiffDiscovery(
  root: string,
  from: string,
  boundaries: string[],
): {
  boundary: Evidence[];
  internal: Evidence[];
  ambiguous: Evidence[];
  unavailable: string[];
} {
  const boundary: Evidence[] = [];
  const internal: Evidence[] = [];
  const ambiguous: Evidence[] = [];
  const unavailable: string[] = [];
  let previous = from;
  for (const release of boundaries) {
    try {
      const output = execFileSync(
        "git",
        [
          "diff",
          "--name-status",
          `v${previous}`,
          `v${release}`,
          "--",
          "src/components",
          "package.json",
          "docs",
        ],
        { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
      );
      for (const row of output.trim().split("\n").filter(Boolean)) {
        const [status = "", ...paths] = row.split("\t");
        const file = paths.at(-1) ?? "";
        const evidence: Evidence = {
          file,
          line: 1,
          mechanism: "release-boundary-file-change",
          excerpt: `${status} between v${previous} and v${release}`,
          version: release,
          reasonCode: "file-change-is-inspection-evidence-not-candidate",
        };
        const classification = sourceClassification(file);
        if (classification)
          internal.push({ ...evidence, reasonCode: classification });
        else if (
          file === "package.json" ||
          /(?:\.d\.ts|\.types?\.ts|\.component\.tsx)$/.test(file)
        )
          ambiguous.push({
            ...evidence,
            reasonCode: "public-area-changed-without-concrete-change-signal",
          });
        else boundary.push(evidence);
      }
    } catch {
      unavailable.push(`v${previous} → v${release}`);
    }
    previous = release;
  }
  return {
    boundary: sortEvidence(boundary),
    internal: sortEvidence(internal),
    ambiguous: sortEvidence(ambiguous),
    unavailable,
  };
}

function taggedPackageRequirements(
  root: string,
  from: string,
  boundaries: string[],
): { qualified: Evidence[]; ambiguous: Evidence[] } {
  const qualified: Evidence[] = [];
  const ambiguous: Evidence[] = [];
  let previous = from;
  const fields = ["engines", "peerDependencies"] as const;
  for (const release of boundaries) {
    try {
      const before = JSON.parse(
        execFileSync("git", ["show", `v${previous}:package.json`], {
          cwd: root,
          encoding: "utf8",
          stdio: ["ignore", "pipe", "pipe"],
        }),
      ) as Record<string, Record<string, string> | undefined>;
      const after = JSON.parse(
        execFileSync("git", ["show", `v${release}:package.json`], {
          cwd: root,
          encoding: "utf8",
          stdio: ["ignore", "pipe", "pipe"],
        }),
      ) as Record<string, Record<string, string> | undefined>;
      for (const field of fields)
        for (const name of [
          ...new Set([
            ...Object.keys(before[field] ?? {}),
            ...Object.keys(after[field] ?? {}),
          ]),
        ].sort()) {
          const oldValue = before[field]?.[name];
          const newValue = after[field]?.[name];
          if (oldValue === newValue) continue;
          const evidence: Evidence = {
            file: "package.json",
            line: 1,
            mechanism: "package-requirement-change",
            excerpt: `${field}.${name}: ${oldValue ?? "absent"} → ${newValue ?? "absent"}`,
            version: release,
            subject: `${field}.${name}`,
            action: "requirement-change",
          };
          if (field === "engines") qualified.push(evidence);
          else
            ambiguous.push({
              ...evidence,
              reasonCode:
                "peer-requirement-change-needs-customer-impact-review",
            });
        }
    } catch {
      ambiguous.push({
        file: "package.json",
        line: 1,
        mechanism: "package-requirement-change",
        excerpt: `Unable to compare v${previous} and v${release}`,
        version: release,
        reasonCode: "tagged-package-json-unavailable",
      });
    }
    previous = release;
  }
  return {
    qualified: sortEvidence(qualified),
    ambiguous: sortEvidence(ambiguous),
  };
}

function markerDiscovery(root: string): {
  unbounded: Evidence[];
  internal: Evidence[];
  ambiguous: Evidence[];
} {
  const unbounded: Evidence[] = [];
  const internal: Evidence[] = [];
  const ambiguous: Evidence[] = [];
  for (const marker of extractMarkers(root)) {
    const lines = readFileSync(resolve(root, marker.file), "utf8").split("\n");
    const component = componentFromPath(marker.file);
    const markerIndex = marker.line - 1;
    let declarationIndex = markerIndex;
    if (
      marker.marker === "deprecation" &&
      !marker.text.includes("Logger.deprecate")
    ) {
      while (
        declarationIndex < lines.length &&
        (declarationIndex === markerIndex ||
          /^\s*(?:\*|\/\*|\*\/|$)/.test(lines[declarationIndex] ?? ""))
      )
        declarationIndex += 1;
    }
    const declarationLine = lines[declarationIndex]?.trim() ?? "";
    const migrationId = marker.text.match(/migration-id:\s*([a-z0-9-]+)/i)?.[1];
    const runtimeProp =
      marker.text.match(
        /(?:the\s+)?[`'"]([A-Za-z][A-Za-z0-9_-]*)[`'"]\s+prop\s+in\s+[`'"]?([A-Za-z][A-Za-z0-9]*)/i,
      ) ??
      marker.text.match(
        /(?:the\s+)?[`'"]([A-Za-z][A-Za-z0-9_-]*)[`'"]\s+prop\s+in\s+([A-Za-z][A-Za-z0-9]*)/i,
      );
    const declaration =
      declarationLine.match(
        /^["']?([A-Za-z$][A-Za-z0-9_$-]*)["']?\??\s*:/,
      )?.[1] ??
      declarationLine.match(
        /^(?:export\s+)?(?:default\s+)?(?:interface|type|class|function|const)\s+([A-Z][A-Za-z0-9]*)/,
      )?.[1];
    const subject = migrationId
      ? `migration-id:${migrationId}`
      : runtimeProp
        ? `${runtimeProp[2]}.${runtimeProp[1]}`
        : component && declaration
          ? `${component}.${declaration}`
          : (marker.text.match(/`([A-Z][A-Za-z0-9]*)`/)?.[1] ?? component);
    const usefulText = marker.text
      .replace(/^\/?\*+\s*@deprecated\s*/i, "")
      .replace(/\*\/$/, "")
      .trim();
    const evidence: Evidence = {
      file: marker.file,
      line: marker.line,
      mechanism:
        marker.marker === "breaking-change"
          ? "migration-breaking-change"
          : marker.text.includes("Logger.deprecate")
            ? "logger-deprecate"
            : "public-deprecated",
      excerpt: normalizedExcerpt(
        declaration && !marker.text.includes("Logger.deprecate")
          ? `${marker.text} declaration:${declaration}`
          : marker.text,
      ),
      ...(subject ? { subject } : {}),
      action:
        marker.marker === "breaking-change" ? "breaking-change" : "deprecation",
    };
    const explicitInternal =
      /\b(?:internal use only|intended for internal|@internal|@private)\b/i.test(
        marker.text,
      );
    const privateSubject =
      !!declaration &&
      (declaration.startsWith("$") ||
        /\.styles?\.[jt]sx?$/.test(marker.file) ||
        /^Styled[A-Z]/.test(declaration));
    if (explicitInternal || privateSubject) {
      internal.push({
        ...evidence,
        reasonCode: explicitInternal
          ? "explicit-internal-only-wording"
          : "styled-or-private-implementation-subject",
      });
      continue;
    }
    if (
      !subject ||
      (!migrationId &&
        !marker.text.includes("Logger.deprecate") &&
        !declaration) ||
      (!migrationId &&
        !marker.text.includes("Logger.deprecate") &&
        usefulText.length < 12)
    )
      ambiguous.push({
        ...evidence,
        reasonCode: "deprecation-marker-lacks-public-subject-or-useful-context",
      });
    else unbounded.push(evidence);
  }
  return {
    unbounded: sortEvidence(unbounded),
    internal: sortEvidence(internal),
    ambiguous: sortEvidence(ambiguous),
  };
}

function correlateCatalogue(items: Evidence[]): string[] {
  const text = items
    .map((item) => `${item.subject ?? ""} ${item.excerpt}`)
    .join(" ")
    .toLowerCase();
  const explicit = [
    ...new Set(
      items.flatMap((item) => {
        const id = item.excerpt.match(/migration-id:\s*([a-z0-9-]+)/i)?.[1];
        return id ? [id] : [];
      }),
    ),
  ];
  return migrations
    .filter(
      (record) =>
        explicit.includes(record.id) ||
        (!!record.subject.prop &&
          !!record.subject.component &&
          text.includes(record.subject.component.toLowerCase()) &&
          text.includes(record.subject.prop.toLowerCase())) ||
        items.some(
          (item) =>
            !!item.version &&
            item.version === record.requiredBy &&
            ((!!record.subject.component &&
              item.subject?.toLowerCase() ===
                record.subject.component.toLowerCase()) ||
              (record.id === "css-package-version-prefix" &&
                item.subject?.toLowerCase() === "css") ||
              (record.id === "npm-engine-11-18" &&
                item.subject?.toLowerCase() === "engines.npm")),
        ),
    )
    .map((record) => record.id)
    .sort();
}

function groupCandidates(
  evidence: Evidence[],
  evidenceScope: Candidate["evidenceScope"],
): Candidate[] {
  const groups = new Map<string, Evidence[]>();
  for (const item of evidence) {
    const explicitId = item.excerpt.match(/migration-id:\s*([a-z0-9-]+)/i)?.[1];
    const subject = explicitId
      ? `migration-id:${explicitId}`
      : (item.subject ?? "ambiguous");
    const key = [
      subject.toLowerCase(),
      item.action ?? "unknown-action",
      item.version ?? "version-unknown",
    ].join("|");
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return [...groups.entries()]
    .map(([subjectKey, items]): Candidate => {
      const correlatedCatalogueIds = correlateCatalogue(items);
      const subject = items[0]?.subject ?? subjectKey.split("|")[0] ?? "";
      const action = items[0]?.action ?? "unknown-action";
      return {
        id: candidateId(subjectKey),
        subjectKey,
        subject,
        action,
        authority: "non-authoritative",
        reviewStatus: "needs-review",
        confidence:
          correlatedCatalogueIds.length > 0
            ? "high"
            : items.length > 1 ||
                items.some((item) => item.mechanism === "changelog-action")
              ? "medium"
              : "low",
        mergeReason: subject.startsWith("migration-id:")
          ? "same-explicit-migration-id"
          : "same-subject-action-release",
        correlatedCatalogueIds,
        evidence: sortEvidence(items),
        applicableVersionEvidence: [
          ...new Set(
            items.flatMap((item) => (item.version ? [item.version] : [])),
          ),
        ].sort(semver.compare),
        missingRequiredInformation: correlatedCatalogueIds.length
          ? ["accountable review of the evidence-to-catalogue correlation"]
          : [
              "scope",
              "requiredBy or deprecatedIn",
              "reviewed guidance",
              "risks",
              "manual checks",
              "automation safety",
              "accountable review decision",
            ],
        evidenceScope,
      };
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}

function historicalCodemods(
  references: ReturnType<typeof changelogDiscovery>["codemodReferences"],
  candidates: Candidate[],
): HistoricalCodemod[] {
  const groups = new Map<string, typeof references>();
  for (const item of references) {
    const key = `${item.transform}|${item.subject.toLowerCase()}`;
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return [...groups.entries()]
    .map(([subjectKey, items]) => {
      const transform = items[0]?.transform ?? "";
      const subject = items[0]?.subject ?? "";
      return {
        transform,
        subject,
        subjectKey,
        repositoryPath: `https://github.com/Sage/carbon-codemod/tree/master/transforms/${transform}`,
        references: items
          .map((item) => item.reference)
          .sort((a, b) =>
            `${a.release}:${a.line}`.localeCompare(`${b.release}:${b.line}`),
          ),
        correlatedCandidateIds: candidates
          .filter(
            (candidate) =>
              candidate.subject.toLowerCase() === subject.toLowerCase() ||
              candidate.action === `codemod:${transform}`,
          )
          .map((candidate) => candidate.id)
          .sort(),
        fixtures: "not-inspectable-locally" as const,
        languages: "not-inspectable-locally" as const,
        parserAndToolVersions: "not-inspectable-locally" as const,
        license: "Apache-2.0" as const,
        semanticMatch: "not-reviewed" as const,
        reuseDecision: "useful-only-as-evidence" as const,
      };
    })
    .sort((a, b) => a.subjectKey.localeCompare(b.subjectKey));
}

export function discover(
  root: string,
  from: string,
  to: string,
): DiscoveryInventory {
  validateInterval(from, to);
  const changelog = changelogDiscovery(root, from, to);
  const tags = tagDiffDiscovery(root, from, changelog.boundaries);
  const packages = taggedPackageRequirements(root, from, changelog.boundaries);
  const markers = markerDiscovery(root);
  const grouped = groupCandidates(
    [...changelog.qualified, ...packages.qualified],
    "interval-qualified",
  );
  const markerGroups = groupCandidates(
    markers.unbounded,
    "current-snapshot-unbounded",
  );
  const markerCatalogueCorrelations = markerGroups
    .filter((candidate) => candidate.correlatedCatalogueIds.length > 0)
    .map((candidate) => ({
      ...candidate,
      evidenceScope: "interval-qualified" as const,
      applicableVersionEvidence: candidate.correlatedCatalogueIds
        .flatMap((id) => {
          const record = migrations.find((item) => item.id === id);
          return [record?.requiredBy, record?.deprecatedIn].filter(
            (value): value is string => !!value,
          );
        })
        .filter(
          (version) => semver.gt(version, from) && semver.lte(version, to),
        )
        .sort(semver.compare),
    }))
    .filter((candidate) => candidate.applicableVersionEvidence.length > 0);
  const currentSnapshotUnboundedEvidence = markerGroups.filter(
    (candidate) =>
      !markerCatalogueCorrelations.some((item) => item.id === candidate.id),
  );
  const catalogueCorrelatedEvidence = [
    ...grouped.filter(
      (candidate) => candidate.correlatedCatalogueIds.length > 0,
    ),
    ...markerCatalogueCorrelations,
  ].sort((a, b) => a.id.localeCompare(b.id));
  const candidates = grouped.filter(
    (candidate) => candidate.correlatedCatalogueIds.length === 0,
  );
  const ambiguousEvidence = sortEvidence([
    ...tags.ambiguous,
    ...packages.ambiguous,
    ...markers.ambiguous,
  ]);
  const dispositions = new Map<
    string,
    DiscoveryInventory["oldToNewIdMapping"][number]
  >();
  const mapEvidence = (
    evidence: Evidence[],
    disposition: DiscoveryInventory["oldToNewIdMapping"][number]["disposition"],
    newId: (item: Evidence) => string,
    reasonCode: string,
  ) => {
    for (const item of evidence) {
      if (
        item.mechanism === "package-requirement-change" ||
        item.mechanism === "changelog-action"
      )
        continue;
      dispositions.set(oldEvidenceId(item), {
        oldId: oldEvidenceId(item),
        disposition,
        newId: newId(item),
        reasonCode: item.reasonCode ?? reasonCode,
      });
    }
  };
  for (const candidate of [...candidates, ...catalogueCorrelatedEvidence])
    mapEvidence(
      candidate.evidence,
      candidate.correlatedCatalogueIds.length
        ? "catalogue-correlated"
        : "candidate",
      () => candidate.id,
      candidate.mergeReason,
    );
  for (const candidate of currentSnapshotUnboundedEvidence)
    mapEvidence(
      candidate.evidence,
      "candidate",
      () => candidate.id,
      "current-snapshot-marker-needs-version-evidence",
    );
  mapEvidence(
    tags.boundary,
    "boundary-only",
    (item) => `boundary:${item.version}`,
    "file-change-is-inspection-evidence-not-candidate",
  );
  mapEvidence(
    [...tags.internal, ...markers.internal],
    "internal-only",
    (item) => `internal:${item.version}:${item.file}`,
    "internal-source-cannot-create-candidate",
  );
  mapEvidence(
    changelog.rejected,
    "rejected-by-rule",
    (item) => `rejected:${item.file}:${item.line}`,
    "changelog-not-actionable",
  );
  mapEvidence(
    ambiguousEvidence,
    "ambiguous",
    (item) => `ambiguous:${item.file}:${item.line}`,
    "insufficient-concrete-customer-context",
  );
  for (const item of [
    ...tags.boundary,
    ...tags.internal,
    ...tags.ambiguous,
  ].filter((evidence) => evidence.file.startsWith("docs/")))
    dispositions.delete(oldEvidenceId(item));
  const currentPackage = JSON.parse(
    readFileSync(resolve(root, "package.json"), "utf8"),
  ) as Record<string, Record<string, string> | undefined>;
  for (const [name, value] of Object.entries({
    ...currentPackage.engines,
    ...currentPackage.peerDependencies,
  }).sort(([a], [b]) => a.localeCompare(b))) {
    const legacy: Evidence = {
      file: "package.json",
      line: 1,
      mechanism: "package-requirement",
      excerpt: `${name}: ${value}`,
      version:
        semver.gte(to, "161.3.0") && semver.lt(from, "161.3.0")
          ? "161.3.0"
          : to,
    };
    const match = [...candidates, ...catalogueCorrelatedEvidence].find(
      (candidate) =>
        candidate.subject.toLowerCase() === `engines.${name}`.toLowerCase(),
    );
    dispositions.set(oldEvidenceId(legacy), {
      oldId: oldEvidenceId(legacy),
      disposition: match?.correlatedCatalogueIds.length
        ? "catalogue-correlated"
        : match
          ? "candidate"
          : "ambiguous",
      newId: match?.id ?? `ambiguous:legacy-current-package-snapshot:${name}`,
      reasonCode: match
        ? "replaced-current-snapshot-with-tagged-requirement-change"
        : "current-package-snapshot-did-not-prove-boundary-change",
    });
  }
  return {
    schemaVersion: DISCOVERY_SCHEMA_VERSION,
    authority: "non-authoritative",
    interval: { from, to },
    ordering: "disposition, stable subject-derived ID, then evidence file/line",
    releaseBoundariesInspected: changelog.boundaries,
    evidenceSourcesUsed: [
      "repository-local actionable changelog entries",
      "contextual explicit public @deprecated markers",
      "production Logger.deprecate calls",
      "explicit migration-breaking-change markers",
      "tagged package requirement comparisons",
      "repository-local release-tag file diffs as boundary evidence",
      "authoritative catalogue correlation",
    ],
    unsupportedOrUninspectable: [
      ...(tags.unavailable.length
        ? [
            `unavailable local release-tag diffs: ${tags.unavailable.join(", ")}`,
          ]
        : []),
      "name-status tag evidence cannot independently establish customer migration semantics",
      "dynamic or undocumented public API semantics",
      "historical codemod source, fixtures, parser versions, language support, and tests absent from this repository",
      "coverage evidence is not proof of complete historical migration support",
    ],
    candidates,
    currentSnapshotUnboundedEvidence,
    catalogueCorrelatedEvidence,
    boundaryOnlyEvidence: tags.boundary,
    internalOnlyEvidence: sortEvidence([...tags.internal, ...markers.internal]),
    rejectedByRuleEvidence: changelog.rejected,
    ambiguousEvidence,
    historicalCodemods: historicalCodemods(
      changelog.codemodReferences,
      grouped,
    ),
    oldToNewIdMapping: [...dispositions.values()].sort((a, b) =>
      a.oldId.localeCompare(b.oldId),
    ),
  };
}

const countEvidence = (inventory: DiscoveryInventory) =>
  inventory.candidates.reduce((sum, item) => sum + item.evidence.length, 0);

const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);
const validId = (value: unknown) =>
  typeof value === "string" && /^candidate-[a-f0-9]{16}$/.test(value);

export function validateDiscoveryInventory(
  value: unknown,
): asserts value is DiscoveryInventory {
  if (!isObject(value) || value.schemaVersion !== 1)
    throw new Error("candidate inventory schemaVersion must be 1");
  if (value.authority !== "non-authoritative" || !isObject(value.interval))
    throw new Error("candidate inventory has invalid authority or interval");
  validateInterval(String(value.interval.from), String(value.interval.to));
  for (const field of [
    "candidates",
    "currentSnapshotUnboundedEvidence",
    "catalogueCorrelatedEvidence",
  ]) {
    if (!Array.isArray(value[field]))
      throw new Error(`candidate inventory ${field} must be an array`);
    const ids = new Set<string>();
    for (const [index, raw] of value[field].entries()) {
      if (!isObject(raw) || !validId(raw.id))
        throw new Error(`${field}[${index}].id is invalid`);
      if (ids.has(raw.id as string))
        throw new Error(`${field} contains duplicate candidate ${raw.id}`);
      ids.add(raw.id as string);
      if (
        !["interval-qualified", "current-snapshot-unbounded"].includes(
          String(raw.evidenceScope),
        )
      )
        throw new Error(`${field}[${index}].evidenceScope is invalid`);
      if (!Array.isArray(raw.evidence) || raw.evidence.length === 0)
        throw new Error(`${field}[${index}].evidence must be non-empty`);
      for (const [evidenceIndex, evidence] of raw.evidence.entries())
        if (
          !isObject(evidence) ||
          typeof evidence.file !== "string" ||
          !Number.isInteger(evidence.line) ||
          (evidence.line as number) < 1 ||
          typeof evidence.mechanism !== "string" ||
          typeof evidence.excerpt !== "string"
        )
          throw new Error(
            `${field}[${index}].evidence[${evidenceIndex}] is invalid`,
          );
    }
  }
  if (!Array.isArray(value.oldToNewIdMapping))
    throw new Error("candidate inventory oldToNewIdMapping must be an array");
  const oldIds = new Set<string>();
  for (const [index, raw] of value.oldToNewIdMapping.entries()) {
    if (
      !isObject(raw) ||
      !validId(raw.oldId) ||
      typeof raw.newId !== "string" ||
      !raw.newId ||
      typeof raw.reasonCode !== "string" ||
      !raw.reasonCode
    )
      throw new Error(`oldToNewIdMapping[${index}] is invalid`);
    if (oldIds.has(raw.oldId as string))
      throw new Error(
        `oldToNewIdMapping has conflicting duplicate oldId ${raw.oldId}`,
      );
    oldIds.add(raw.oldId as string);
  }
}

export function renderInventoryMarkdown(inventory: DiscoveryInventory): string {
  const sections = [
    [
      "Interval-qualified candidates awaiting semantic review",
      inventory.candidates,
    ],
    [
      "Current-snapshot-unbounded leads needing version evidence",
      inventory.currentSnapshotUnboundedEvidence,
    ],
    ["Catalogue-correlated evidence", inventory.catalogueCorrelatedEvidence],
  ] as const;
  const lines = [
    "<!-- Generated by deterministic local discovery. Do not edit. -->",
    "# Non-authoritative migration discovery",
    "",
    `Interval: \`${inventory.interval.from} → ${inventory.interval.to}\``,
    "",
    "Only interval-qualified evidence is connected to the requested interval. Current-snapshot markers remain useful, non-authoritative leads and need version evidence.",
    "",
  ];
  for (const [heading, candidates] of sections) {
    lines.push(`## ${heading}`, "");
    lines.push(
      "| ID | Subject | Action | Confidence | Catalogue | Evidence |",
      "| --- | --- | --- | --- | --- | --- |",
      ...candidates.map(
        (candidate) =>
          `| ${candidate.id} | ${candidate.subject} | ${candidate.action} | ${candidate.confidence} | ${candidate.correlatedCatalogueIds.join(", ") || "none"} | ${candidate.evidence.map((item) => `${item.file}:${item.line} (${item.mechanism})`).join("; ")} |`,
      ),
      "",
    );
  }
  lines.push(
    "## Other evidence dispositions",
    "",
    `- Boundary-only: ${inventory.boundaryOnlyEvidence.length}`,
    `- Current-snapshot-unbounded: ${inventory.currentSnapshotUnboundedEvidence.length}`,
    `- Internal-only: ${inventory.internalOnlyEvidence.length}`,
    `- Rejected by deterministic rule: ${inventory.rejectedByRuleEvidence.length}`,
    `- Ambiguous/unclassified: ${inventory.ambiguousEvidence.length}`,
    `- Historical codemod correlations: ${inventory.historicalCodemods.length}`,
    "",
    "## Unsupported or uninspectable",
    "",
    ...inventory.unsupportedOrUninspectable.map((item) => `- ${item}`),
    "",
  );
  return lines.join("\n");
}

export function renderCoverage(inventory: DiscoveryInventory): string {
  const approved = migrations
    .filter(
      (record) =>
        !!record.requiredBy &&
        semver.gt(record.requiredBy, inventory.interval.from) &&
        semver.lte(record.requiredBy, inventory.interval.to),
    )
    .map((record) => record.id)
    .sort();
  return [
    "<!-- Generated by deterministic local discovery. Do not edit. -->",
    "# Candidate interval coverage",
    "",
    `Interval: \`${inventory.interval.from} → ${inventory.interval.to}\``,
    "",
    "Coverage evidence is not proof of complete historical migration support.",
    "",
    `- Approved catalogue records: ${approved.join(", ") || "none"}`,
    `- Interval-qualified candidates awaiting semantic review: ${inventory.candidates.length} (${countEvidence(inventory)} evidence locations)`,
    `- Current-snapshot-unbounded leads needing version evidence: ${inventory.currentSnapshotUnboundedEvidence.length}`,
    `- Catalogue-correlated groups: ${inventory.catalogueCorrelatedEvidence.length}`,
    `- Boundary-only evidence: ${inventory.boundaryOnlyEvidence.length}`,
    `- Internal-only evidence: ${inventory.internalOnlyEvidence.length}`,
    `- Rejected-by-rule evidence: ${inventory.rejectedByRuleEvidence.length}`,
    `- Ambiguous/unclassified evidence: ${inventory.ambiguousEvidence.length}`,
    `- Historical codemod correlations: ${inventory.historicalCodemods.length}`,
    `- Release boundaries inspected: ${inventory.releaseBoundariesInspected.join(", ")}`,
    `- Unsupported inspection areas: ${inventory.unsupportedOrUninspectable.join("; ")}`,
    "- High-risk gaps: accountable semantic review of qualified candidates; ambiguous public-area and peer-requirement changes; historical codemod source/safety review",
    "",
  ].join("\n");
}

export function writeDiscovery(
  root: string,
  inventory: DiscoveryInventory,
): void {
  const directory = resolve(root, discoveryDirectory);
  mkdirSync(directory, { recursive: true });
  validateDiscoveryInventory(inventory);
  const inventoryPath = join(directory, "candidates.json");
  writeFileSync(inventoryPath, `${JSON.stringify(inventory, null, 2)}\n`);
  writeFileSync(
    join(directory, "candidates.md"),
    renderInventoryMarkdown(inventory),
  );
  writeFileSync(join(directory, "coverage.md"), renderCoverage(inventory));
}

export function validateDiscoveryArtifacts(root: string): void {
  const inventory = discover(root, "159.0.0", "161.7.0");
  validateDiscoveryInventory(inventory);
  const expected = new Map([
    ["candidates.json", `${JSON.stringify(inventory, null, 2)}\n`],
    ["candidates.md", renderInventoryMarkdown(inventory)],
    ["coverage.md", renderCoverage(inventory)],
  ]);
  for (const [name, content] of expected) {
    const path = resolve(root, discoveryDirectory, name);
    let actual = "";
    try {
      actual = readFileSync(path, "utf8");
    } catch {
      throw new Error(
        `Required Phase 5 discovery artifact is missing: ${relative(root, path)}`,
      );
    }
    if (actual !== content)
      throw new Error(
        `Phase 5 discovery artifact is stale: ${relative(root, path)}. Run npm run discover:migrations -- --from 159.0.0 --to 161.7.0`,
      );
  }
}
