import { readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { detectFile } from "./detector.js";
import type { Finding, SelectionTrack } from "./report.js";
import type { MigrationRecord } from "./types.js";

const extensions = new Set([".js", ".jsx", ".ts", ".tsx"]);
const ignored = new Set([".git", "node_modules", "dist", "lib", "esm"]);

export function sourceFiles(input: string): string[] {
  const absolute = resolve(input);
  if (!statSync(absolute).isDirectory()) return [absolute];
  const files: string[] = [];
  const visit = (directory: string) => {
    for (const entry of readdirSync(directory, { withFileTypes: true }).sort(
      (a, b) => a.name.localeCompare(b.name),
    )) {
      if (ignored.has(entry.name)) continue;
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) visit(path);
      else if (
        extensions.has(
          entry.name.slice(entry.name.lastIndexOf(".")).toLowerCase(),
        )
      )
        files.push(path);
    }
  };
  visit(absolute);
  return files;
}

export function scan(
  input: string,
  records: readonly MigrationRecord[],
  track: SelectionTrack,
): Finding[] {
  const root = statSync(resolve(input)).isDirectory()
    ? resolve(input)
    : resolve(input, "..");
  return sourceFiles(input)
    .flatMap((file) => detectFile(file, root, records, track))
    .sort(
      (a, b) =>
        a.file.localeCompare(b.file) ||
        a.location.line - b.location.line ||
        a.location.column - b.location.column ||
        a.migrationId.localeCompare(b.migrationId),
    );
}
