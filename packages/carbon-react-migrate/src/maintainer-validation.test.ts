import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  extractMarkers,
  validateDependencyEvidence,
  validateEnforcement,
} from "./maintainer-validation.js";
import { generateRegister, validateRegister } from "./register.js";
import { migrations } from "./catalogue.js";

const temporaryRoot = () =>
  join(tmpdir(), `carbon-migrations-${process.pid}-${Math.random()}`);

test("register generation is byte-stable and keeps version fields independent", () => {
  const first = generateRegister(migrations);
  assert.equal(first, generateRegister(migrations));
  assert.match(first, /step-sequence-item-aria-label \| — \| 161\.7\.0/);
  assert.match(first, /npm-engine-11-18 \| 161\.3\.0 \| —/);
});

test("stale generated register fails with the regeneration command", () => {
  const root = temporaryRoot();
  mkdirSync(join(root, "migration-tooling/generated"), { recursive: true });
  writeFileSync(
    join(root, "migration-tooling/generated/MIGRATION_REGISTER.md"),
    "stale\n",
  );
  assert.throws(
    () => validateRegister(migrations, root),
    /npm run generate:migration-register/,
  );
});

test("a public marker linked to a real migration ID needs no exemption", () => {
  const root = temporaryRoot();
  mkdirSync(join(root, "src"), { recursive: true });
  writeFileSync(
    join(root, "src/api.ts"),
    "/** @deprecated migration-id: step-sequence-item-aria-label */\n",
  );
  assert.doesNotThrow(() => validateEnforcement(root, []));
});

test("ordinary deprecation wording and test files are not public markers", () => {
  const root = temporaryRoot();
  mkdirSync(join(root, "src"), { recursive: true });
  writeFileSync(
    join(root, "src/internal.ts"),
    'const description = "handles deprecation warning text";\n',
  );
  writeFileSync(
    join(root, "src/internal.test.ts"),
    "/** @deprecated test-only annotation */\n",
  );
  mkdirSync(join(root, "src/components/example/__internal__"), {
    recursive: true,
  });
  writeFileSync(
    join(root, "src/components/example/__internal__/api.ts"),
    "/** @deprecated internal-only annotation */\n",
  );
  assert.deepEqual(extractMarkers(root), []);
  assert.doesNotThrow(() => validateEnforcement(root, []));
});

test("explicit annotations, runtime warnings, and breaking markers are enforced", () => {
  const root = temporaryRoot();
  mkdirSync(join(root, "src"), { recursive: true });
  writeFileSync(
    join(root, "src/api.ts"),
    `/** @deprecated migration-id: step-sequence-item-aria-label */
Logger.deprecate(
  "migration-id: dialog-full-screen-component use Dialog",
);
// migration-breaking-change migration-id: npm-engine-11-18
`,
  );
  assert.deepEqual(
    extractMarkers(root).map(({ marker }) => marker),
    ["deprecation", "deprecation", "breaking-change"],
  );
  assert.doesNotThrow(() => validateEnforcement(root, []));
});

test("a single-line runtime warning cannot borrow a later migration ID", () => {
  const root = temporaryRoot();
  mkdirSync(join(root, "src"), { recursive: true });
  writeFileSync(
    join(root, "src/api.ts"),
    `Logger.deprecate("new warning");
const unrelated = "migration-id: step-sequence-item-aria-label";
`,
  );
  const [marker] = extractMarkers(root);
  assert.equal(marker?.text, 'Logger.deprecate("new warning");');
  assert.throws(() => validateEnforcement(root, []), /public markers changed/);
});

test("malformed or stale exemptions fail even without unreferenced markers", () => {
  const root = temporaryRoot();
  mkdirSync(join(root, "src"), { recursive: true });
  writeFileSync(
    join(root, "src/api.ts"),
    "/** @deprecated migration-id: step-sequence-item-aria-label */\n",
  );
  assert.throws(
    () =>
      validateEnforcement(root, [
        {
          id: "",
          inventoryDigest: "bad",
          reason: "",
          scope: "**",
          owner: "",
          reviewEvidence: "",
        },
      ]),
    /invalid or duplicate exemption ID|invalid inventoryDigest/,
  );
});

test("new markers and malformed exemptions fail", () => {
  const root = temporaryRoot();
  mkdirSync(join(root, "src"), { recursive: true });
  writeFileSync(
    join(root, "src/api.ts"),
    "/** @deprecated use replacement */\n",
  );
  assert.throws(() => validateEnforcement(root, []), /public markers changed/);
  assert.throws(
    () =>
      validateEnforcement(root, [
        {
          id: "BAD",
          inventoryDigest: "wrong",
          reason: "",
          scope: "**",
          owner: "",
          reviewEvidence: "",
        },
      ]),
    /requires reason|over-broad/,
  );
});

test("dependency evidence is bound to declarations, lock versions, and licenses", () => {
  const root = temporaryRoot();
  mkdirSync(join(root, "packages/carbon-react-migrate"), { recursive: true });
  mkdirSync(join(root, "migration-tooling"), { recursive: true });
  writeFileSync(
    join(root, "packages/carbon-react-migrate/package.json"),
    JSON.stringify({
      dependencies: { jscodeshift: "^17.4.0", semver: "^7.5.4" },
    }),
  );
  writeFileSync(
    join(root, "package-lock.json"),
    JSON.stringify({
      packages: {
        "node_modules/jscodeshift": { version: "17.4.0", license: "MIT" },
        "node_modules/semver": { version: "7.7.4", license: "ISC" },
        "node_modules/recast": { version: "0.23.11", license: "MIT" },
      },
    }),
  );
  const evidence = [
    "`jscodeshift`: declared `^17.4.0`, resolved `17.4.0`, license `MIT`",
    "`semver`: declared `^7.5.4`, resolved `7.7.4`, license `ISC`",
    "`recast`: resolved `0.23.11`, license `MIT`",
  ].join("\n");
  writeFileSync(
    join(root, "migration-tooling/OPEN_SOURCE_PROVENANCE.md"),
    evidence,
  );
  writeFileSync(
    join(root, "migration-tooling/THIRD_PARTY_NOTICES.md"),
    "jscodeshift, semver, and recast ship under permissive licenses.\n",
  );
  assert.doesNotThrow(() => validateDependencyEvidence(root));
  writeFileSync(
    join(root, "migration-tooling/OPEN_SOURCE_PROVENANCE.md"),
    evidence.replace("7.7.4", "7.5.4"),
  );
  assert.throws(
    () => validateDependencyEvidence(root),
    /provenance is stale for "semver"/,
  );
  writeFileSync(
    join(root, "migration-tooling/OPEN_SOURCE_PROVENANCE.md"),
    evidence,
  );
  writeFileSync(join(root, "migration-tooling/THIRD_PARTY_NOTICES.md"), "");
  assert.throws(() => validateDependencyEvidence(root), /Third-party notices/);
});
