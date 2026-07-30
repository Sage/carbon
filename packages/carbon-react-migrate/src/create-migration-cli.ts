import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import semver from "semver";
import { migrations } from "./catalogue.js";

const allowed = new Set([
  "--id",
  "--scope",
  "--required-by",
  "--deprecated-in",
  "--evidence",
]);
const parse = (args: string[]) => {
  const values = new Map<string, string>();
  while (args.length) {
    const option = args.shift();
    if (!option?.startsWith("--"))
      throw new Error(`Unexpected positional argument ${option ?? ""}`);
    if (!allowed.has(option)) throw new Error(`Unknown option ${option}`);
    if (values.has(option)) throw new Error(`Duplicate option ${option}`);
    const value = args.shift();
    if (!value || value.startsWith("-"))
      throw new Error(`${option} requires a value`);
    values.set(option, value);
  }
  return (name: string) => values.get(name);
};

export function validateDraftArtifact(value: unknown): void {
  if (value === null || typeof value !== "object" || Array.isArray(value))
    throw new Error("draft must be an object");
  const draft = value as Record<string, unknown>;
  const allowedKeys = new Set([
    "schemaVersion",
    "authority",
    "approvalStatus",
    "id",
    "supplied",
    "missingHumanReviewFields",
    "maintainerInstruction",
  ]);
  if (Object.keys(draft).some((key) => !allowedKeys.has(key)))
    throw new Error("draft contains an unknown field");
  if (
    draft.schemaVersion !== 1 ||
    draft.authority !== "non-authoritative-draft" ||
    draft.approvalStatus !== "needs-review" ||
    typeof draft.id !== "string" ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(draft.id) ||
    draft.supplied === null ||
    typeof draft.supplied !== "object" ||
    Array.isArray(draft.supplied) ||
    !Array.isArray(draft.missingHumanReviewFields) ||
    draft.missingHumanReviewFields.some(
      (item) => typeof item !== "string" || !item,
    ) ||
    typeof draft.maintainerInstruction !== "string" ||
    !draft.maintainerInstruction
  )
    throw new Error("draft artifact is structurally invalid");
  const supplied = draft.supplied as Record<string, unknown>;
  const suppliedKeys = new Set([
    "scope",
    "requiredBy",
    "deprecatedIn",
    "evidence",
  ]);
  if (Object.keys(supplied).some((key) => !suppliedKeys.has(key)))
    throw new Error("draft supplied metadata contains an unknown field");
  if (
    supplied.scope !== undefined &&
    !["upgrade", "deprecation"].includes(String(supplied.scope))
  )
    throw new Error("draft supplied scope is invalid");
  for (const field of ["requiredBy", "deprecatedIn"] as const)
    if (
      supplied[field] !== undefined &&
      (typeof supplied[field] !== "string" || !semver.valid(supplied[field]))
    )
      throw new Error(`draft supplied ${field} is invalid`);
  if (
    supplied.evidence !== undefined &&
    (typeof supplied.evidence !== "string" || !supplied.evidence.trim())
  )
    throw new Error("draft supplied evidence is invalid");
}

export function run(
  args: string[],
  root = resolve(import.meta.dirname, "../../.."),
): number {
  try {
    const value = parse([...args]);
    const id = value("--id");
    if (!id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))
      throw new Error("--id must be a lowercase kebab-case ID");
    if (migrations.some((record) => record.id === id))
      throw new Error(`duplicate migration ID "${id}"`);
    const scope = value("--scope");
    if (scope && !["upgrade", "deprecation"].includes(scope))
      throw new Error("--scope must be upgrade or deprecation");
    const requiredBy = value("--required-by");
    const deprecatedIn = value("--deprecated-in");
    if (requiredBy && !semver.valid(requiredBy))
      throw new Error("--required-by must be valid semver");
    if (deprecatedIn && !semver.valid(deprecatedIn))
      throw new Error("--deprecated-in must be valid semver");
    if (scope === "upgrade" && deprecatedIn)
      throw new Error("--scope upgrade is incompatible with --deprecated-in");
    if (scope === "deprecation" && requiredBy)
      throw new Error("--scope deprecation is incompatible with --required-by");
    const draft = {
      schemaVersion: 1,
      authority: "non-authoritative-draft",
      approvalStatus: "needs-review",
      id,
      supplied: {
        ...(scope ? { scope } : {}),
        ...(requiredBy ? { requiredBy } : {}),
        ...(deprecatedIn ? { deprecatedIn } : {}),
        ...(value("--evidence") ? { evidence: value("--evidence") } : {}),
      },
      missingHumanReviewFields: [
        ...(!scope ? ["scope"] : []),
        ...(!requiredBy && !deprecatedIn ? ["requiredBy or deprecatedIn"] : []),
        "kind",
        "subject",
        "guidance summary",
        "documentation",
        "manual checks",
        "risks",
        "automation status and safety",
        "API references",
        "accountable approval decision",
      ],
      maintainerInstruction:
        "Complete and review this draft, then manually add a typed record to catalogue.ts and regenerate the register. This artifact is never customer-selected.",
    };
    validateDraftArtifact(draft);
    const path = resolve(root, "migration-tooling/drafts", `${id}.json`);
    mkdirSync(resolve(root, "migration-tooling/drafts"), { recursive: true });
    writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, { flag: "wx" });
    process.stdout.write(
      `Wrote non-authoritative draft migration-tooling/drafts/${id}.json\n`,
    );
    return 0;
  } catch (error) {
    process.stderr.write(
      `${error instanceof Error ? error.message : String(error)}\n`,
    );
    return 2;
  }
}

if (
  process.argv[1] &&
  import.meta.url === new URL(process.argv[1], "file:").href
)
  process.exitCode = run(process.argv.slice(2));
