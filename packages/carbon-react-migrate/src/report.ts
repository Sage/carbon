import type { MigrationRecord } from "./types.js";

export const REPORT_SCHEMA_VERSION = 1 as const;
export const NO_FINDINGS =
  "No known matches found in supported patterns. This does not prove the migration is complete.";

export type SelectionTrack =
  | "required-upgrade"
  | "optional-proactive-deprecation";

export interface SourceLocation {
  line: number;
  column: number;
}

export interface Finding {
  migrationId: string;
  applicableVersion: string;
  selectionTrack: SelectionTrack;
  requiredForRequestedUpgrade: boolean;
  file: string;
  location: SourceLocation;
  matchedApi: string;
  importOrigin: string;
  matchKind: string;
  automationStatus: "safe" | "partial" | "manual" | "unsupported";
  documentation: string;
  manualChecks: string[];
  risks: string[];
  limitations: string[];
  runtimeWarningChecks: string[];
}

export interface MigrationSummary {
  migrationId: string;
  applicableVersion: string;
  selectionTrack: SelectionTrack;
  requiredForRequestedUpgrade: boolean;
  automationStatus: MigrationRecord["automation"]["status"];
  summary: string;
  documentation: string;
  manualChecks: string[];
  risks: string[];
  limitations: string[];
}

export interface Report {
  schemaVersion: typeof REPORT_SCHEMA_VERSION;
  command: "plan" | "check" | "check-deprecations";
  from?: string;
  to?: string;
  migrations: MigrationSummary[];
  findings: Finding[];
  summary: {
    selectionTrack: SelectionTrack;
    requiredForRequestedUpgrade: boolean;
    migrationCount: number;
    findingCount: number;
    message: string;
  };
}

export function documentationUrl(record: MigrationRecord): string {
  const { file, anchor } = record.guidance.documentation;
  return `${file}#${anchor}`;
}

export function summarize(
  record: MigrationRecord,
  track: SelectionTrack,
): MigrationSummary {
  const limitations =
    record.automation.status === "partial"
      ? record.automation.limitations
      : record.automation.status === "manual"
        ? [record.automation.reason]
        : [];
  return {
    migrationId: record.id,
    applicableVersion:
      record.scope === "upgrade" ? record.requiredBy : record.deprecatedIn,
    selectionTrack: track,
    requiredForRequestedUpgrade: track === "required-upgrade",
    automationStatus: record.automation.status,
    summary: record.guidance.summary,
    documentation: documentationUrl(record),
    manualChecks: [...record.guidance.manualChecks],
    risks: [...record.guidance.risks],
    limitations,
  };
}
