import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import type { MigrationRecord } from "./types.js";

export const registerPath = "migration-tooling/generated/MIGRATION_REGISTER.md";

const link = (reference?: { file: string; anchor?: string }) =>
  reference
    ? `[${reference.file}](${`../../${reference.file}${reference.anchor ? `#${reference.anchor}` : ""}`})`
    : "Not available in authoritative repository metadata";

const cell = (value: string) =>
  value.replaceAll("|", "\\|").replaceAll("\n", " ");

export function generateRegister(records: readonly MigrationRecord[]): string {
  const lines = [
    "<!-- Generated from packages/carbon-react-migrate/src/catalogue.ts. Do not edit. -->",
    "<!-- Regenerate with: npm run generate:migration-register -->",
    "",
    "# Migration register",
    "",
    "| ID | Required by | Deprecated in | Subject | Guidance | Automation | Documentation | Changelog | Migration Skill | Manual checks, limitations, and risks |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
  ];
  for (const record of [...records].sort((a, b) => a.id.localeCompare(b.id))) {
    const subject = [
      record.subject.package,
      record.subject.component,
      record.subject.prop,
      record.subject.importPath,
    ]
      .filter(Boolean)
      .join(" / ");
    const limitations =
      record.automation.status === "partial"
        ? record.automation.limitations
        : record.automation.status === "manual"
          ? [record.automation.reason]
          : [];
    const detail = [
      ...record.guidance.manualChecks,
      ...limitations,
      `Risks: ${record.guidance.risks.join(", ") || "none recorded"}`,
    ].join("; ");
    lines.push(
      `| ${record.id} | ${record.requiredBy ?? "—"} | ${record.deprecatedIn ?? "—"} | ${cell(subject)} | ${cell(record.guidance.replacement ?? record.guidance.removal ?? record.guidance.summary)} | ${record.automation.status} | ${link(record.guidance.documentation)} | ${link(record.guidance.changelog)} | ${link(record.guidance.migrationSkill)} | ${cell(detail)} |`,
    );
  }
  return `${lines.join("\n")}\n`;
}

export function writeRegister(
  records: readonly MigrationRecord[],
  repositoryRoot: string,
): void {
  const output = resolve(repositoryRoot, registerPath);
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, generateRegister(records));
}

export function validateRegister(
  records: readonly MigrationRecord[],
  repositoryRoot: string,
): void {
  const expected = generateRegister(records);
  let actual = "";
  try {
    actual = readFileSync(resolve(repositoryRoot, registerPath), "utf8");
  } catch {
    throw new Error(
      `Generated migration register is missing: ${registerPath}. Run npm run generate:migration-register.`,
    );
  }
  if (actual !== expected)
    throw new Error(
      `Generated migration register is stale: ${registerPath}. Run npm run generate:migration-register and commit the result.`,
    );
}
