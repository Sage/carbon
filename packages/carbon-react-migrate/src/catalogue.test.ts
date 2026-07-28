import assert from "node:assert/strict";
import test from "node:test";
import {
  UnsupportedUpgradePathError,
  selectDeprecationMigrations,
  selectUpgradeMigrations,
} from "./index.js";
import type {
  DeprecationMigration,
  MigrationRecord,
  SupportedBoundary,
  UpgradeMigration,
} from "./types.js";

const boundary: SupportedBoundary[] = [{ from: "1.0.0", to: "2.0.0" }];
const upgrade = (id: string, requiredBy: string): MigrationRecord => ({
  id,
  scope: "upgrade",
  requiredBy,
  kind: "manual",
  subject: { package: "carbon-react" },
  guidance: {
    summary: id,
    documentation: { file: "unused", anchor: "unused" },
    manualChecks: [],
    risks: [],
  },
  automation: { status: "manual", reason: "test" },
  apiReferences: [],
});
const deprecation = (id: string, deprecatedIn: string): MigrationRecord => ({
  id,
  scope: "deprecation",
  deprecatedIn,
  kind: "prop",
  subject: { package: "carbon-react" },
  guidance: {
    summary: id,
    documentation: { file: "unused", anchor: "unused" },
    manualChecks: [],
    risks: [],
  },
  automation: { status: "manual", reason: "test" },
  apiReferences: [],
});

test("interval selection covers below, equal, inside, and above boundaries", () => {
  const records = [
    upgrade("below", "0.9.0"),
    upgrade("equal-from", "1.0.0"),
    upgrade("inside", "1.5.0"),
    upgrade("equal-to", "2.0.0"),
    upgrade("above", "2.1.0"),
  ];
  assert.deepEqual(
    selectUpgradeMigrations("1.0.0", "2.0.0", records, boundary).map(
      ({ id }) => id,
    ),
    ["inside", "equal-to"],
  );
});

test("orders upgrades by requiredBy and then stable id", () => {
  const records = [
    upgrade("z-last", "1.5.0"),
    upgrade("a-first", "1.5.0"),
    upgrade("earlier", "1.2.0"),
  ];
  const first = selectUpgradeMigrations("1.0.0", "2.0.0", records, boundary);
  const second = selectUpgradeMigrations(
    "1.0.0",
    "2.0.0",
    [...records].reverse(),
    boundary,
  );
  assert.deepEqual(
    first.map(({ id }) => id),
    ["earlier", "a-first", "z-last"],
  );
  assert.deepEqual(
    second.map(({ id }) => id),
    first.map(({ id }) => id),
  );
});

test("keeps deprecation-only records out of upgrade selection", () => {
  const records = [
    upgrade("required", "1.5.0"),
    deprecation("optional", "1.1.0"),
  ];
  const selectedUpgrades: UpgradeMigration[] = selectUpgradeMigrations(
    "1.0.0",
    "2.0.0",
    records,
    boundary,
  );
  const selectedDeprecations: DeprecationMigration[] =
    selectDeprecationMigrations(records);

  assert.deepEqual(
    selectedUpgrades.map(({ id }) => id),
    ["required"],
  );
  assert.deepEqual(
    selectedDeprecations.map(({ id }) => id),
    ["optional"],
  );
  assert.ok(selectedUpgrades.every(({ scope }) => scope === "upgrade"));
  assert.ok(selectedDeprecations.every(({ scope }) => scope === "deprecation"));
});

test("rejects direct jumps and returns every tested intermediate step", () => {
  assert.throws(
    () => selectUpgradeMigrations("159.0.0", "161.7.0"),
    (error: unknown) => {
      assert.ok(error instanceof UnsupportedUpgradePathError);
      assert.deepEqual(error.intermediatePath, [
        "159.0.0",
        "160.0.0",
        "161.0.0",
        "161.3.0",
        "161.7.0",
      ]);
      return true;
    },
  );
});

test("rejects unsupported gaps and invalid or reversed intervals", () => {
  assert.throws(
    () => selectUpgradeMigrations("158.0.0", "159.0.0"),
    (error) => {
      assert.ok(error instanceof UnsupportedUpgradePathError);
      assert.deepEqual(error.intermediatePath, []);
      assert.match(error.message, /No tested steps are available from 158.0.0/);
      assert.doesNotMatch(error.message, /160.0.0/);
      return true;
    },
  );
  assert.throws(
    () => selectUpgradeMigrations("159.0.0", "160.5.0"),
    (error) => {
      assert.ok(error instanceof UnsupportedUpgradePathError);
      assert.deepEqual(error.intermediatePath, ["159.0.0", "160.0.0"]);
      assert.doesNotMatch(error.message, /161.0.0/);
      return true;
    },
  );
  assert.throws(() => selectUpgradeMigrations("2.0.0", "1.0.0"), /from < to/);
  assert.throws(
    () => selectUpgradeMigrations("nope", "2.0.0"),
    /valid versions/,
  );
});
