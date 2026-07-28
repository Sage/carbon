#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import {
  UnsupportedUpgradePathError,
  selectDeprecationMigrations,
  selectUpgradeMigrations,
} from "./index.js";
import { MalformedSourceError } from "./detector.js";
import {
  NO_FINDINGS,
  REPORT_SCHEMA_VERSION,
  summarize,
  type Report,
  type SelectionTrack,
} from "./report.js";
import { scan } from "./scanner.js";
import {
  assertCleanWorktree,
  DirtyWorktreeError,
  planApplication,
  SymlinkInputError,
  writeChangesAtomically,
} from "./application.js";

export const EXIT = {
  SUCCESS: 0,
  FINDINGS: 1,
  INVALID_INPUT: 2,
  MALFORMED_SOURCE: 3,
  INTERNAL_FAILURE: 4,
} as const;

type Options = {
  command:
    | "plan"
    | "check"
    | "check-deprecations"
    | "apply"
    | "apply-deprecations";
  from?: string;
  to?: string;
  format: "human" | "json";
  path?: string;
  dryRun: boolean;
  allowDirty: boolean;
};

class InvalidInputError extends Error {
  name = "InvalidInputError";
}

function parseArguments(args: string[]): Options {
  const command = args.shift();
  if (
    ![
      "plan",
      "check",
      "check-deprecations",
      "apply",
      "apply-deprecations",
    ].includes(command ?? "")
  )
    throw new InvalidInputError(
      "Expected command: plan, check, check-deprecations, apply, or apply-deprecations",
    );
  const options: Options = {
    command: command as Options["command"],
    format: "human",
    dryRun: false,
    allowDirty: false,
  };
  const seenOptions = new Set<string>();
  const readOptionValue = (option: string): string => {
    if (seenOptions.has(option))
      throw new InvalidInputError(`Duplicate option ${option}`);
    seenOptions.add(option);
    const value = args.shift();
    if (!value || value.startsWith("-"))
      throw new InvalidInputError(`${option} requires a value`);
    return value;
  };
  while (args.length) {
    const value = args.shift();
    if (value === undefined) break;
    if (value === "--from") options.from = readOptionValue(value);
    else if (value === "--to") options.to = readOptionValue(value);
    else if (value === "--format") {
      const format = readOptionValue(value);
      if (!["human", "json"].includes(format))
        throw new InvalidInputError("--format must be human or json");
      options.format = format as Options["format"];
    } else if (value === "--dry-run") {
      if (seenOptions.has(value))
        throw new InvalidInputError(`Duplicate option ${value}`);
      seenOptions.add(value);
      options.dryRun = true;
    } else if (value === "--allow-dirty") {
      if (seenOptions.has(value))
        throw new InvalidInputError(`Duplicate option ${value}`);
      seenOptions.add(value);
      options.allowDirty = true;
    } else if (value.startsWith("-"))
      throw new InvalidInputError(`Unknown option ${value}`);
    else if (options.command === "plan")
      throw new InvalidInputError(
        "plan does not accept a positional scan path",
      );
    else if (!options.path) options.path = value;
    else throw new InvalidInputError(`Unexpected argument ${value}`);
  }
  const deprecationCommand = [
    "check-deprecations",
    "apply-deprecations",
  ].includes(options.command);
  const applyCommand = ["apply", "apply-deprecations"].includes(
    options.command,
  );
  if (
    deprecationCommand &&
    (options.from !== undefined || options.to !== undefined)
  )
    throw new InvalidInputError(
      `${options.command} does not accept --from or --to`,
    );
  if (!deprecationCommand && !options.to)
    throw new InvalidInputError("--to is required");
  if (!applyCommand && (options.dryRun || options.allowDirty))
    throw new InvalidInputError(
      "--dry-run and --allow-dirty are accepted only by apply commands",
    );
  if (options.command !== "plan" && !options.path) options.path = ".";
  return options;
}

function installedVersion(start: string): string | undefined {
  let current = resolve(start);
  for (;;) {
    try {
      const packageJson = JSON.parse(
        readFileSync(
          resolve(current, "node_modules/carbon-react/package.json"),
          "utf8",
        ),
      ) as { version?: unknown };
      if (typeof packageJson.version === "string") return packageJson.version;
    } catch {}
    const parent = dirname(current);
    if (parent === current) return undefined;
    current = parent;
  }
}

function human(report: Report): string {
  const lines = [
    `${report.command}: ${report.summary.selectionTrack}`,
    `Migrations: ${report.summary.migrationCount}; findings: ${report.summary.findingCount}`,
  ];
  for (const migration of report.migrations)
    lines.push(
      `${migration.requiredForRequestedUpgrade ? "REQUIRED" : "OPTIONAL"} ${migration.migrationId} (${migration.applicableVersion}) [${migration.automationStatus}] ${migration.summary}`,
    );
  for (const finding of report.findings)
    lines.push(
      `${finding.file}:${finding.location.line}:${finding.location.column} ${finding.migrationId} ${finding.matchKind} [${finding.automationStatus}]`,
    );
  for (const change of report.changes ?? [])
    lines.push(
      `${report.dryRun ? "PROPOSED" : "APPLIED"} ${change.file} ${change.migrationIds.join(",")}`,
    );
  if (!report.findings.length) lines.push(NO_FINDINGS);
  return `${lines.join("\n")}\n`;
}

export function run(args: string[]): number {
  let options: Options;
  try {
    options = parseArguments([...args]);
    const track: SelectionTrack = [
      "check-deprecations",
      "apply-deprecations",
    ].includes(options.command)
      ? "optional-proactive-deprecation"
      : "required-upgrade";
    const invocationDirectory = process.env.INIT_CWD ?? process.cwd();
    const inputPath = options.path
      ? resolve(invocationDirectory, options.path)
      : invocationDirectory;
    if (options.command !== "plan" && !existsSync(inputPath))
      throw new InvalidInputError(`Scan path does not exist: ${options.path}`);
    const from = ["check-deprecations", "apply-deprecations"].includes(
      options.command,
    )
      ? undefined
      : (options.from ?? installedVersion(inputPath));
    if (
      !["check-deprecations", "apply-deprecations"].includes(options.command) &&
      !from
    )
      throw new InvalidInputError(
        "Unable to detect installed carbon-react version; provide --from",
      );
    let records;
    try {
      if (
        !["check-deprecations", "apply-deprecations"].includes(
          options.command,
        ) &&
        (!from || !options.to)
      )
        throw new InvalidInputError("--from and --to are required");
      records = ["check-deprecations", "apply-deprecations"].includes(
        options.command,
      )
        ? selectDeprecationMigrations()
        : selectUpgradeMigrations(from ?? "", options.to ?? "");
    } catch (error) {
      if (error instanceof UnsupportedUpgradePathError) throw error;
      throw new InvalidInputError(
        error instanceof Error ? error.message : String(error),
      );
    }
    const applicationCommand = ["apply", "apply-deprecations"].includes(
      options.command,
    );
    const application = applicationCommand
      ? planApplication(inputPath, records, track)
      : undefined;
    const findings =
      options.command === "plan"
        ? []
        : (application?.findings ?? scan(inputPath, records, track));
    if (application && !options.dryRun && application.changes.length) {
      if (!options.allowDirty) assertCleanWorktree(inputPath);
      writeChangesAtomically(application.changes);
    }
    const report: Report = {
      schemaVersion: REPORT_SCHEMA_VERSION,
      command: options.command,
      ...(from ? { from } : {}),
      ...(options.to ? { to: options.to } : {}),
      ...(application ? { dryRun: options.dryRun } : {}),
      migrations: records.map((record) => summarize(record, track)),
      findings,
      ...(application
        ? {
            changes: application.changes.map(
              ({ file, migrationIds, beforeHash, afterHash }) => ({
                file,
                migrationIds,
                beforeHash,
                afterHash,
              }),
            ),
          }
        : {}),
      summary: {
        selectionTrack: track,
        requiredForRequestedUpgrade: track === "required-upgrade",
        migrationCount: records.length,
        findingCount: findings.length,
        ...(application ? { changeCount: application.changes.length } : {}),
        message: findings.length
          ? application
            ? options.dryRun
              ? "Known supported matches found; safe changes were proposed but not written."
              : "Known supported matches found; safe changes were applied and remaining work is reported."
            : "Known supported matches found."
          : NO_FINDINGS,
      },
    };
    process.stdout.write(
      options.format === "json"
        ? `${JSON.stringify(report, null, 2)}\n`
        : human(report),
    );
    return findings.length ? EXIT.FINDINGS : EXIT.SUCCESS;
  } catch (error) {
    if (error instanceof MalformedSourceError) {
      process.stderr.write(`${error.message}\n`);
      return EXIT.MALFORMED_SOURCE;
    }
    if (
      error instanceof UnsupportedUpgradePathError ||
      error instanceof InvalidInputError ||
      error instanceof DirtyWorktreeError ||
      error instanceof SymlinkInputError
    ) {
      process.stderr.write(`${error.message}\n`);
      return EXIT.INVALID_INPUT;
    }
    process.stderr.write(
      `Internal failure: ${error instanceof Error ? error.message : String(error)}\n`,
    );
    return EXIT.INTERNAL_FAILURE;
  }
}

if (
  process.argv[1] &&
  import.meta.url === new URL(process.argv[1], "file:").href
)
  process.exitCode = run(process.argv.slice(2));
