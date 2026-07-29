export type MigrationRisk = "behaviour" | "accessibility" | "visual" | "types";
export type MigrationKind = "prop" | "import" | "component" | "manual";

export interface DocumentationReference {
  file: string;
  anchor: string;
}

export interface OptionalReference {
  file: string;
  anchor?: string;
}

export interface ApiReference {
  path: string;
  symbol?: string;
  historicalExemption?: string;
  historicalVersion?: string;
}

export interface MigrationBase {
  id: string;
  kind: MigrationKind;
  subject: {
    package: "carbon-react";
    component?: string;
    importPath?: string;
    prop?: string;
  };
  guidance: {
    summary: string;
    documentation: DocumentationReference;
    changelog?: OptionalReference;
    migrationSkill?: OptionalReference;
    replacement?: string;
    removal?: string;
    manualChecks: string[];
    risks: MigrationRisk[];
  };
  automation:
    | { status: "safe"; rule: string }
    | { status: "partial"; rule?: string; limitations: string[] }
    | { status: "manual"; reason: string };
  apiReferences: ApiReference[];
  removedIn?: string;
}

export interface UpgradeMigration extends MigrationBase {
  scope: "upgrade";
  requiredBy: string;
  deprecatedIn?: string;
}

export interface DeprecationMigration extends MigrationBase {
  scope: "deprecation";
  deprecatedIn: string;
  requiredBy?: string;
}

export type MigrationRecord = UpgradeMigration | DeprecationMigration;

export interface SupportedBoundary {
  from: string;
  to: string;
}
