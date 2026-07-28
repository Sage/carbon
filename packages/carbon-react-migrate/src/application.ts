import { createHash } from "node:crypto";
import {
  chmodSync,
  copyFileSync,
  existsSync,
  lstatSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import jscodeshift from "jscodeshift";
import {
  analyzeFile,
  analyzeSource,
  type DetectedMatch,
  type SafeEdit,
} from "./detector.js";
import type { Finding, SelectionTrack } from "./report.js";
import { sourceFiles } from "./scanner.js";
import type { MigrationRecord } from "./types.js";

export class DirtyWorktreeError extends Error {
  name = "DirtyWorktreeError";
}

export class TransformationError extends Error {
  name = "TransformationError";
}

export class SymlinkInputError extends Error {
  name = "SymlinkInputError";
}

export interface ProposedChange {
  absoluteFile: string;
  file: string;
  before: string;
  after: string;
  migrationIds: string[];
  beforeHash: string;
  afterHash: string;
}

export interface ApplicationPlan {
  findings: Finding[];
  changes: ProposedChange[];
}

const hash = (source: string) =>
  createHash("sha256").update(source).digest("hex");

const sortFindings = (findings: Finding[]) =>
  findings.sort(
    (a, b) =>
      a.file.localeCompare(b.file) ||
      a.location.line - b.location.line ||
      a.location.column - b.location.column ||
      a.migrationId.localeCompare(b.migrationId),
  );

type StepSequenceEdit = Extract<
  SafeEdit,
  { rule: "replace-step-sequence-item-aria-label" }
>;
type DialogEdit = Extract<
  SafeEdit,
  { rule: "replace-dialog-full-screen-component" }
>;

interface ApplicationEditContext {
  rewrittenDialogImports: WeakSet<DialogEdit["importDeclaration"]>;
}

function replaceStepSequenceItemAriaLabel(
  edit: StepSequenceEdit,
  context: ApplicationEditContext,
): void {
  void context;
  if (edit.attribute.name.type !== "JSXIdentifier")
    throw new TransformationError("Unexpected ariaLabel attribute shape");
  edit.attribute.name.name = "aria-label";
}

function replaceDialogFullScreen(
  edit: DialogEdit,
  context: ApplicationEditContext,
): void {
  if (!context.rewrittenDialogImports.has(edit.importDeclaration)) {
    edit.importDeclaration.source = jscodeshift.stringLiteral(
      "carbon-react/lib/components/dialog",
    );
    if (edit.importSpecifier.type === "ImportSpecifier") {
      const { local } = edit.importSpecifier;
      const index =
        edit.importDeclaration.specifiers?.indexOf(edit.importSpecifier) ?? -1;
      if (index < 0)
        throw new TransformationError(
          "Unable to locate DialogFullScreen import",
        );
      edit.importDeclaration.specifiers?.splice(
        index,
        1,
        jscodeshift.importDefaultSpecifier(local),
      );
    }
    context.rewrittenDialogImports.add(edit.importDeclaration);
  }
  edit.openingElement.attributes ??= [];
  edit.openingElement.attributes.unshift(
    jscodeshift.jsxAttribute(
      jscodeshift.jsxIdentifier("size"),
      jscodeshift.stringLiteral("fullscreen"),
    ),
  );
}

export const codemodRegistry = {
  "replace-step-sequence-item-aria-label": replaceStepSequenceItemAriaLabel,
  "replace-dialog-full-screen-component": replaceDialogFullScreen,
} as const;

function applyMatch(
  match: DetectedMatch,
  context: ApplicationEditContext,
): void {
  const edit = match.safeEdit;
  if (!edit) return;
  if (edit.rule === "replace-step-sequence-item-aria-label")
    codemodRegistry[edit.rule](edit, context);
  else codemodRegistry[edit.rule](edit, context);
}

export function planApplication(
  input: string,
  records: readonly MigrationRecord[],
  track: SelectionTrack,
): ApplicationPlan {
  const absoluteInput = resolve(input);
  const inputStatus = lstatSync(absoluteInput);
  if (inputStatus.isSymbolicLink())
    throw new SymlinkInputError(
      `Refusing to apply migrations through a symbolic link: ${absoluteInput}`,
    );
  const root = inputStatus.isDirectory()
    ? absoluteInput
    : dirname(absoluteInput);
  const safeRecords = new Map(
    records
      .filter((record) => record.automation.status === "safe")
      .map((record) => [record.id, record]),
  );
  const findings: Finding[] = [];
  const changes: ProposedChange[] = [];

  for (const absoluteFile of sourceFiles(absoluteInput)) {
    if (lstatSync(absoluteFile).isSymbolicLink())
      throw new SymlinkInputError(
        `Refusing to apply migrations through a symbolic link: ${absoluteFile}`,
      );
    const analysis = analyzeFile(absoluteFile, root, records, track);
    findings.push(...analysis.matches.map(({ finding }) => finding));
    const fileHasUnsupportedMatch = analysis.matches.some(
      ({ finding }) => finding.automationStatus !== "safe",
    );
    const eligible = analysis.matches.filter(
      (match) =>
        !fileHasUnsupportedMatch &&
        match.safeEdit &&
        match.finding.automationStatus === "safe" &&
        safeRecords.has(match.finding.migrationId),
    );
    if (!eligible.length) continue;

    const editKeys = new Set<string>();
    const editContext: ApplicationEditContext = {
      rewrittenDialogImports: new WeakSet(),
    };
    for (const match of eligible) {
      const key = `${match.finding.location.line}:${match.finding.location.column}:${match.finding.migrationId}`;
      if (editKeys.has(key))
        throw new TransformationError(
          `Conflicting duplicate edit in ${match.finding.file} at ${key}`,
        );
      editKeys.add(key);
      applyMatch(match, editContext);
    }

    const after = analysis.root.toSource({ reuseWhitespace: true });
    try {
      const postcondition = analyzeSource(
        after,
        absoluteFile,
        root,
        records,
        track,
      );
      const appliedIds = new Set(
        eligible.map(({ finding }) => finding.migrationId),
      );
      if (
        postcondition.matches.some(
          ({ finding, safeEdit }) =>
            safeEdit && appliedIds.has(finding.migrationId),
        )
      )
        throw new TransformationError(
          `Postcondition failed for ${analysis.matches[0]?.finding.file ?? absoluteFile}`,
        );
    } catch (error) {
      if (error instanceof TransformationError) throw error;
      throw new TransformationError(
        `Transformed source validation failed for ${absoluteFile}: ${String(error)}`,
      );
    }
    if (after === analysis.source) continue;
    changes.push({
      absoluteFile,
      file: analysis.matches[0]?.finding.file ?? absoluteFile,
      before: analysis.source,
      after,
      migrationIds: [
        ...new Set(eligible.map(({ finding }) => finding.migrationId)),
      ].sort(),
      beforeHash: hash(analysis.source),
      afterHash: hash(after),
    });
  }

  return {
    findings: sortFindings(findings),
    changes: changes.sort((a, b) => a.file.localeCompare(b.file)),
  };
}

export function assertCleanWorktree(input: string): void {
  const start = lstatSync(resolve(input)).isDirectory()
    ? resolve(input)
    : dirname(resolve(input));
  const rootResult = spawnSync(
    "git",
    ["-C", start, "rev-parse", "--show-toplevel"],
    { encoding: "utf8" },
  );
  if (rootResult.error && "code" in rootResult.error) {
    if (rootResult.error.code === "ENOENT") return;
    throw rootResult.error;
  }
  if (rootResult.status !== 0) return;
  const worktreeRoot = rootResult.stdout.trim();
  const status = spawnSync(
    "git",
    ["-C", worktreeRoot, "status", "--porcelain", "--untracked-files=all"],
    { encoding: "utf8" },
  );
  if (status.status !== 0)
    throw new Error(status.stderr.trim() || "Unable to inspect Git status");
  if (status.stdout.trim())
    throw new DirtyWorktreeError(
      "Refusing to write to a dirty Git worktree; commit/stash changes or pass --allow-dirty.",
    );
}

export interface WriteHooks {
  beforeReplace?: (index: number, change: ProposedChange) => void;
}

export function writeChangesAtomically(
  changes: readonly ProposedChange[],
  hooks: WriteHooks = {},
): void {
  for (const change of changes) {
    if (lstatSync(change.absoluteFile).isSymbolicLink())
      throw new SymlinkInputError(
        `Refusing to apply migrations through a symbolic link: ${change.absoluteFile}`,
      );
    if (readFileSync(change.absoluteFile, "utf8") !== change.before)
      throw new TransformationError(
        `Source changed after planning: ${change.file}`,
      );
  }

  const token = `${process.pid}-${Math.random().toString(16).slice(2)}`;
  const prepared: Array<{
    change: ProposedChange;
    temporary: string;
    backup: string;
    replaced: boolean;
  }> = [];
  try {
    for (const [index, change] of changes.entries()) {
      const temporary = `${change.absoluteFile}.carbon-migrate-${token}-${index}.tmp`;
      const backup = `${change.absoluteFile}.carbon-migrate-${token}-${index}.bak`;
      prepared.push({ change, temporary, backup, replaced: false });
      writeFileSync(temporary, change.after, { flag: "wx" });
      chmodSync(temporary, lstatSync(change.absoluteFile).mode);
      copyFileSync(change.absoluteFile, backup);
    }

    for (const [index, item] of prepared.entries()) {
      hooks.beforeReplace?.(index, item.change);
      renameSync(item.temporary, item.change.absoluteFile);
      item.replaced = true;
    }
  } catch (error) {
    for (const item of [...prepared].reverse()) {
      if (item.replaced && existsSync(item.backup))
        renameSync(item.backup, item.change.absoluteFile);
    }
    throw error;
  } finally {
    for (const item of prepared) {
      rmSync(item.temporary, { force: true });
      rmSync(item.backup, { force: true });
    }
  }
}
