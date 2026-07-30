import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { migrations } from "./catalogue.js";
import { run as createDraft } from "./create-migration-cli.js";
import {
  discover,
  renderCoverage,
  renderInventoryMarkdown,
  validateInterval,
  writeDiscovery,
} from "./discovery.js";

const fixture = () => {
  const root = join(
    tmpdir(),
    `carbon-discovery-${process.pid}-${Math.random()}`,
  );
  mkdirSync(join(root, "src/components/example"), { recursive: true });
  writeFileSync(
    join(root, "CHANGELOG.md"),
    `## [161.7.0](local)

- **example:** deprecated OldProp; use NewProp instead. Use https://github.com/Sage/carbon-codemod/tree/master/transforms/rename-prop
### BREAKING CHANGES
changed implementation details

## [161.6.0](local)

- **example:** use https://github.com/Sage/carbon-codemod/tree/master/transforms/rename-prop to replace OldProp
`,
  );
  writeFileSync(
    join(root, "package.json"),
    JSON.stringify({ engines: { npm: ">=11.18.0" } }),
  );
  writeFileSync(
    join(root, "src/components/example/api.ts"),
    "/** @deprecated migration-id: step-sequence-item-aria-label */\n",
  );
  writeFileSync(
    join(root, "src/components/example/api.test.ts"),
    "/** @deprecated ignored */\n",
  );
  return root;
};

test("interval validation rejects malformed and reversed intervals", () => {
  assert.throws(() => validateInterval("bad", "161.7.0"), /semantic versions/);
  assert.throws(() => validateInterval("161.7.0", "159.0.0"), /lower/);
});

test("discovery is deterministic, correlates duplicates, and excludes tests", () => {
  const root = fixture();
  const first = discover(root, "159.0.0", "161.7.0");
  const second = discover(root, "159.0.0", "161.7.0");
  assert.deepEqual(first, second);
  assert.equal(
    first.catalogueCorrelatedEvidence.filter((candidate) =>
      candidate.correlatedCatalogueIds.includes(
        "step-sequence-item-aria-label",
      ),
    ).length,
    1,
  );
  assert.ok(
    first.candidates.every((candidate) =>
      candidate.evidence.every((item) => !item.file.includes(".test.")),
    ),
  );
  assert.deepEqual(
    first.historicalCodemods.map((item) => item.transform),
    ["rename-prop"],
  );
  assert.equal(first.historicalCodemods[0]?.references.length, 2);
  assert.ok(
    first.rejectedByRuleEvidence.some(
      (item) => item.reasonCode === "generic-heading-without-subject-action",
    ),
  );
  assert.match(renderCoverage(first), /not proof of complete historical/);
  assert.equal(renderInventoryMarkdown(first), renderInventoryMarkdown(second));
});

test("ordinary bug fixes containing remove stay out of customer candidates", () => {
  const root = fixture();
  writeFileSync(
    join(root, "CHANGELOG.md"),
    `## [161.7.0](local)

### Bug Fixes

- **tabs:** remove gap in overflow layout
- **sidebar:** removed internal scroll state
- **example:** deprecated oldProp; use newProp instead

### Breaking Changes

- **dialog:** no longer supports legacyMode; use mode instead
`,
  );
  const inventory = discover(root, "159.0.0", "161.7.0");
  const candidateSubjects = inventory.candidates.map(
    (candidate) => candidate.subject,
  );
  assert.ok(!candidateSubjects.includes("tabs"));
  assert.ok(!candidateSubjects.includes("sidebar"));
  assert.ok(candidateSubjects.includes("example"));
  assert.ok(candidateSubjects.includes("dialog"));
  assert.equal(
    inventory.rejectedByRuleEvidence.filter(
      (item) => item.reasonCode === "bug-fix-without-explicit-migration-signal",
    ).length,
    2,
  );
});

test("groups one public subject across marker mechanisms without merging distinct props", () => {
  const root = fixture();
  writeFileSync(
    join(root, "src/components/example/api.ts"),
    `/**
 * @deprecated Use newProp instead.
 */
oldProp?: string;
Logger.deprecate("The 'oldProp' prop in Example is deprecated; use 'newProp' instead.");
Logger.deprecate("The 'otherProp' prop in Example is deprecated.");
`,
  );
  const inventory = discover(root, "159.0.0", "161.7.0");
  const oldProp = inventory.currentSnapshotUnboundedEvidence.find(
    (candidate) => candidate.subject.toLowerCase() === "example.oldprop",
  );
  assert.equal(oldProp?.evidence.length, 2);
  assert.ok(
    oldProp?.evidence.some((item) =>
      item.excerpt.includes("declaration:oldProp"),
    ),
  );
  assert.ok(
    inventory.currentSnapshotUnboundedEvidence.some(
      (candidate) => candidate.subject.toLowerCase() === "example.otherprop",
    ),
  );
});

test("current-tree markers are unbounded and associate only with the following declaration", () => {
  const root = fixture();
  writeFileSync(
    join(root, "src/components/example/api.ts"),
    `export interface DenseProps {
  prefix?: string;
  /** @deprecated reverse is obsolete */
  reverse?: boolean;
  /**
   * More detail.
   * @deprecated use replacement
   */
  characterLimit?: number;
  forceObscurity?: boolean;
}
/** @deprecated no safe declaration follows */
`,
  );
  const inventory = discover(root, "159.0.0", "161.7.0");
  const subjects = inventory.currentSnapshotUnboundedEvidence.map(
    (candidate) => candidate.subject,
  );
  assert.ok(subjects.includes("Example.reverse"));
  assert.ok(subjects.includes("Example.characterLimit"));
  assert.ok(!subjects.includes("Example.prefix"));
  assert.ok(!subjects.includes("Example.forceObscurity"));
  assert.ok(
    inventory.ambiguousEvidence.some((item) => item.file.endsWith("api.ts")),
  );
  assert.ok(
    inventory.candidates.every(
      (candidate) =>
        candidate.evidenceScope === "interval-qualified" &&
        candidate.applicableVersionEvidence.length > 0,
    ),
  );
});

test("internal wording and styled private properties cannot create customer candidates", () => {
  const root = fixture();
  writeFileSync(
    join(root, "src/components/example/api.ts"),
    `export interface Props {
  /** @deprecated Intended for internal use only */
  isCurrent?: boolean;
}
`,
  );
  writeFileSync(
    join(root, "src/components/example/example.style.ts"),
    `export interface StyledProps {
  /** @deprecated implementation detail */
  $disabled?: boolean;
}
`,
  );
  const inventory = discover(root, "159.0.0", "161.7.0");
  assert.ok(
    inventory.internalOnlyEvidence.some(
      (item) => item.reasonCode === "explicit-internal-only-wording",
    ),
  );
  assert.ok(
    inventory.internalOnlyEvidence.some(
      (item) => item.reasonCode === "styled-or-private-implementation-subject",
    ),
  );
});

test("maintainer CLIs reject duplicates, missing values, unknowns, positionals, and incompatible scope options", async () => {
  const { default: discoverCli } = await import("./discover-cli.js");
  assert.equal(
    discoverCli(
      ["--from", "1.0.0", "--from", "2.0.0", "--to", "3.0.0"],
      fixture(),
    ),
    2,
  );
  assert.equal(discoverCli(["--from", "--to", "3.0.0"], fixture()), 2);
  assert.equal(
    discoverCli(["--from", "1.0.0", "--to", "3.0.0", "extra"], fixture()),
    2,
  );
  assert.equal(
    discoverCli(["--from", "1.0.0", "--to", "3.0.0", "--wat", "x"], fixture()),
    2,
  );
  assert.equal(createDraft(["--id", "x", "--id", "y"], fixture()), 2);
  assert.equal(createDraft(["--id"], fixture()), 2);
  assert.equal(createDraft(["--id", "x", "extra"], fixture()), 2);
  assert.equal(
    createDraft(
      ["--id", "x", "--scope", "upgrade", "--deprecated-in", "1.0.0"],
      fixture(),
    ),
    2,
  );
});

test("stable subject IDs do not change when unrelated evidence is added", () => {
  const root = fixture();
  const first = discover(root, "159.0.0", "161.7.0");
  const correlated = first.catalogueCorrelatedEvidence.find((candidate) =>
    candidate.correlatedCatalogueIds.includes("step-sequence-item-aria-label"),
  );
  writeFileSync(
    join(root, "src/components/example/other.ts"),
    "/** @deprecated unrelated context */\nexport const Other = 1;\n",
  );
  const second = discover(root, "159.0.0", "161.7.0");
  assert.equal(
    second.catalogueCorrelatedEvidence.find((candidate) =>
      candidate.correlatedCatalogueIds.includes(
        "step-sequence-item-aria-label",
      ),
    )?.id,
    correlated?.id,
  );
});

test("tag file modifications are retained as boundary/internal evidence, never candidates", () => {
  const root = fixture();
  execFileSync("git", ["init"], { cwd: root });
  execFileSync("git", ["add", "."], { cwd: root });
  execFileSync(
    "git",
    [
      "-c",
      "user.name=Test",
      "-c",
      "user.email=test@example.com",
      "commit",
      "-m",
      "base",
    ],
    { cwd: root },
  );
  execFileSync("git", ["tag", "v159.0.0"], { cwd: root });
  writeFileSync(
    join(root, "src/components/example/example.stories.tsx"),
    "export {};\n",
  );
  mkdirSync(join(root, "docs"), { recursive: true });
  writeFileSync(join(root, "docs/example.mdx"), "# changed docs\n");
  writeFileSync(
    join(root, "src/components/example/api.ts"),
    "export interface PublicApi { value: string }\n",
  );
  execFileSync("git", ["add", "."], { cwd: root });
  execFileSync(
    "git",
    [
      "-c",
      "user.name=Test",
      "-c",
      "user.email=test@example.com",
      "commit",
      "-m",
      "release",
    ],
    { cwd: root },
  );
  execFileSync("git", ["tag", "v161.6.0"], { cwd: root });
  execFileSync("git", ["tag", "v161.7.0"], { cwd: root });
  const inventory = discover(root, "159.0.0", "161.7.0");
  assert.ok(
    inventory.internalOnlyEvidence.some((item) =>
      item.file.includes(".stories."),
    ),
  );
  assert.ok(
    inventory.internalOnlyEvidence.some(
      (item) =>
        item.file.endsWith(".mdx") &&
        item.reasonCode === "guidance-only-doc-change",
    ),
  );
  assert.ok(
    [...inventory.ambiguousEvidence, ...inventory.boundaryOnlyEvidence].some(
      (item) => item.file.endsWith("api.ts"),
    ),
  );
  assert.ok(
    inventory.candidates.every((candidate) =>
      candidate.evidence.every(
        (item) => item.mechanism !== "release-boundary-file-change",
      ),
    ),
  );
  assert.ok(
    inventory.oldToNewIdMapping.every(
      (mapping) => mapping.oldId && mapping.newId && mapping.reasonCode,
    ),
  );
});

test("discovery writes only maintained discovery artifacts", () => {
  const root = fixture();
  writeFileSync(join(root, "catalogue.ts"), "authoritative\n");
  writeFileSync(join(root, "MIGRATION_REGISTER.md"), "generated\n");
  writeDiscovery(root, discover(root, "159.0.0", "161.7.0"));
  assert.equal(
    readFileSync(join(root, "catalogue.ts"), "utf8"),
    "authoritative\n",
  );
  assert.equal(
    readFileSync(join(root, "MIGRATION_REGISTER.md"), "utf8"),
    "generated\n",
  );
  assert.ok(
    existsSync(join(root, "migration-tooling/discovery/candidates.json")),
  );
});

test("scaffolding rejects invalid and catalogue duplicate IDs and preserves catalogue", () => {
  const root = fixture();
  writeFileSync(join(root, "catalogue.ts"), "authoritative\n");
  assert.equal(createDraft(["--id", "Bad ID"], root), 2);
  const existingMigration = migrations[0];
  assert.ok(existingMigration);
  assert.equal(createDraft(["--id", existingMigration.id], root), 2);
  assert.equal(
    createDraft(
      [
        "--id",
        "review-me",
        "--deprecated-in",
        "161.7.0",
        "--evidence",
        "CHANGELOG.md:1",
      ],
      root,
    ),
    0,
  );
  const draft = JSON.parse(
    readFileSync(join(root, "migration-tooling/drafts/review-me.json"), "utf8"),
  );
  assert.equal(draft.approvalStatus, "needs-review");
  assert.ok(
    draft.missingHumanReviewFields.includes("automation status and safety"),
  );
  assert.equal(
    readFileSync(join(root, "catalogue.ts"), "utf8"),
    "authoritative\n",
  );
  assert.equal(createDraft(["--id", "review-me"], root), 2);
});
