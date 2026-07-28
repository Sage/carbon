import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { migrations, supportedBoundaries } from "./catalogue.js";
import type { MigrationRecord } from "./types.js";
import { validateCatalogue } from "./validation.js";

const repositoryRoot = join(import.meta.dirname, "../../..");

test("validates the production catalogue and all current API references", () => {
  assert.doesNotThrow(() =>
    validateCatalogue(migrations, supportedBoundaries, repositoryRoot),
  );
});

test("canonical Dialog guidance never recommends the deprecated fullscreen prop", () => {
  const record = migrations.find(
    ({ id }) => id === "dialog-full-screen-component",
  );
  assert.equal(
    record?.guidance.summary,
    'Replace DialogFullScreen with Dialog size="fullscreen".',
  );
  assert.equal(
    record && "requiredBy" in record ? record.requiredBy : undefined,
    undefined,
  );
});

function fixtureRoot(): string {
  const root = mkdtempSync(join(tmpdir(), "carbon-migrate-validation-"));
  mkdirSync(join(root, "docs"));
  writeFileSync(join(root, "docs/guide.md"), '<a id="valid"></a>\n');
  writeFileSync(join(root, "api.ts"), "export const Present = true;\n");
  return root;
}

function validRecord(overrides: Record<string, unknown> = {}): MigrationRecord {
  return {
    id: "valid-record",
    scope: "upgrade",
    requiredBy: "2.0.0",
    kind: "manual",
    subject: { package: "carbon-react" },
    guidance: {
      summary: "valid",
      documentation: { file: "docs/guide.md", anchor: "valid" },
      manualChecks: [],
      risks: [],
    },
    automation: { status: "manual", reason: "test" },
    apiReferences: [{ path: "api.ts", symbol: "Present" }],
    ...overrides,
  } as MigrationRecord;
}

test("reports duplicate ids, invalid versions, and invalid version ordering actionably", () => {
  const root = fixtureRoot();
  const broken = validRecord({
    requiredBy: "not-semver",
    deprecatedIn: "3.0.0",
    removedIn: "2.0.0",
  });
  assert.throws(
    () =>
      validateCatalogue(
        [broken, broken],
        [{ from: "2.0.0", to: "1.0.0" }],
        root,
      ),
    (error: unknown) => {
      const message = String(error);
      assert.match(message, /duplicate id/);
      assert.match(message, /invalid semantic version "not-semver"/);
      assert.match(message, /deprecatedIn must not be later than removedIn/);
      assert.match(message, /from must be earlier than to/);
      return true;
    },
  );
});

test("requires independent scope versions at runtime", () => {
  const root = fixtureRoot();
  assert.throws(
    () => validateCatalogue([validRecord({ requiredBy: undefined })], [], root),
    /upgrade records require requiredBy/,
  );
  assert.throws(
    () =>
      validateCatalogue(
        [
          validRecord({
            scope: "deprecation",
            requiredBy: "2.0.0",
            deprecatedIn: undefined,
          }),
        ],
        [],
        root,
      ),
    /deprecation records require deprecatedIn/,
  );
});

test("rejects malformed runtime schema fields instead of relying on TypeScript", () => {
  const root = fixtureRoot();
  assert.throws(
    () =>
      validateCatalogue(
        [
          null,
          validRecord({
            scope: "other",
            kind: "unknown",
            subject: { package: "another-package" },
          }),
          validRecord({
            id: "bad-shapes",
            subject: {
              package: "carbon-react",
              component: 42,
            },
            guidance: {
              summary: "",
              documentation: null,
              manualChecks: ["", 4],
              risks: ["security"],
            },
            automation: { status: "safe", rule: "" },
            apiReferences: "not-an-array",
          }),
        ],
        [],
        root,
      ),
    (error: unknown) => {
      const message = String(error);
      assert.match(message, /expected an object/);
      assert.match(message, /expected "upgrade" or "deprecation"/);
      assert.match(message, /invalid migration kind/);
      assert.match(message, /expected "carbon-react"/);
      assert.match(message, /subject.component/);
      assert.match(message, /guidance.summary/);
      return true;
    },
  );
});

test("validates every automation, guidance, documentation, and reference shape", () => {
  const root = fixtureRoot();
  const records = [
    validRecord({
      id: "safe-without-rule",
      automation: { status: "safe" },
    }),
    validRecord({
      id: "partial-without-limitations",
      automation: { status: "partial", limitations: [42] },
    }),
    validRecord({
      id: "manual-without-reason",
      automation: { status: "manual", reason: "" },
    }),
    validRecord({
      id: "invalid-guidance-arrays",
      guidance: {
        summary: "valid",
        documentation: { file: "", anchor: "" },
        manualChecks: ["", 42],
        risks: ["security"],
      },
    }),
    validRecord({
      id: "invalid-api-reference",
      apiReferences: [{ path: "", symbol: 42 }],
    }),
  ];
  assert.throws(
    () => validateCatalogue(records, [], root),
    (error: unknown) => {
      const message = String(error);
      assert.match(message, /safe automation requires a rule/);
      assert.match(message, /automation.limitations/);
      assert.match(message, /manual automation requires a reason/);
      assert.match(message, /guidance.manualChecks/);
      assert.match(message, /guidance.risks/);
      assert.match(message, /guidance.documentation/);
      assert.match(message, /each reference requires a non-empty path/);
      return true;
    },
  );
});

test("rejects missing documentation, anchors, rules, and current APIs", () => {
  const root = fixtureRoot();
  const broken = validRecord({
    guidance: {
      summary: "broken",
      documentation: { file: "docs/guide.md", anchor: "missing" },
      manualChecks: [],
      risks: [],
    },
    automation: { status: "safe", rule: "not-registered" },
    apiReferences: [
      { path: "api.ts", symbol: "Absent" },
      { path: "missing.ts" },
    ],
  });
  assert.throws(
    () => validateCatalogue([broken], [], root),
    (error: unknown) => {
      const message = String(error);
      assert.match(message, /stable anchor "missing" not found/);
      assert.match(message, /unregistered rule "not-registered"/);
      assert.match(message, /symbol "Absent" not found/);
      assert.match(message, /current API file not found "missing.ts"/);
      return true;
    },
  );
});

test("permits only reviewed historical API exemptions", () => {
  const root = fixtureRoot();
  assert.doesNotThrow(() =>
    validateCatalogue(
      [
        validRecord({
          id: "button-next-dom-ref",
          removedIn: "161.0.0",
          apiReferences: [
            {
              path: "src/components/button/__next__/button.component.tsx",
              symbol: "ButtonHandle",
              historicalExemption: "P1-H1",
              historicalVersion: "160.0.0",
            },
          ],
        }),
      ],
      [],
      root,
    ),
  );
  assert.throws(
    () =>
      validateCatalogue(
        [
          validRecord({
            apiReferences: [
              {
                path: "removed.ts",
                historicalExemption: "invented-exemption",
              },
            ],
          }),
        ],
        [],
        root,
      ),
    /unknown historical exemption "invented-exemption"/,
  );
  assert.throws(
    () =>
      validateCatalogue(
        [
          validRecord({
            id: "another-record",
            removedIn: "161.0.0",
            apiReferences: [
              {
                path: "src/components/button/__next__/button.component.tsx",
                symbol: "ButtonHandle",
                historicalExemption: "P1-H1",
                historicalVersion: "160.0.0",
              },
            ],
          }),
        ],
        [],
        root,
      ),
    /not valid for recordId/,
  );
});

test("binds the Button exemption to the reviewed tagged source", () => {
  const record = migrations.find(({ id }) => id === "button-next-dom-ref");
  assert.ok(record);
  assert.equal(record.removedIn, "161.0.0");
  assert.deepEqual(record.apiReferences, [
    {
      path: "src/components/button/__next__/button.component.tsx",
      symbol: "ButtonHandle",
      historicalExemption: "P1-H1",
      historicalVersion: "160.0.0",
    },
  ]);
  const historicalSource = execFileSync(
    "git",
    ["show", "v160.0.0:src/components/button/__next__/button.component.tsx"],
    { cwd: repositoryRoot, encoding: "utf8" },
  );
  assert.match(historicalSource, /export type ButtonHandle/);
  assert.match(historicalSource, /focusButton: \(\) => void/);
});

test("rejects branching, merging, gapped, shuffled, and malformed boundaries", () => {
  const root = fixtureRoot();
  const cases: Array<[unknown[], RegExp]> = [
    [
      [
        { from: "1.0.0", to: "2.0.0" },
        { from: "1.0.0", to: "3.0.0" },
      ],
      /branching from-version/,
    ],
    [
      [
        { from: "1.0.0", to: "3.0.0" },
        { from: "2.0.0", to: "3.0.0" },
      ],
      /merging to-version/,
    ],
    [
      [
        { from: "1.0.0", to: "2.0.0" },
        { from: "3.0.0", to: "4.0.0" },
      ],
      /one contiguous, ascending chain/,
    ],
    [
      [
        { from: "2.0.0", to: "3.0.0" },
        { from: "1.0.0", to: "2.0.0" },
      ],
      /one contiguous, ascending chain/,
    ],
    [[{ from: "", to: 2 }], /expected non-empty from and to versions/],
  ];
  for (const [boundaries, expected] of cases) {
    assert.throws(
      () => validateCatalogue([validRecord()], boundaries, root),
      expected,
    );
  }
});
