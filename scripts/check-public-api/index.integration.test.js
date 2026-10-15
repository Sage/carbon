import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const checker = path.join(__dirname, "index.mjs");
const commitMsgHook = path.resolve(__dirname, "../../.husky/commit-msg");
const entry = 'export type { ExampleProps } from "./components/example";\n';
const optionalProp = "export interface ExampleProps { labelSpacing?: 1 | 2 }\n";

const git = (cwd, ...args) =>
  execFileSync("git", args, { cwd, encoding: "utf8" });
const shellQuote = (value) => `'${value.replaceAll("'", "'\\''")}'`;

const createdRepos = [];
afterEach(() => {
  for (const cwd of createdRepos.splice(0)) {
    fs.rmSync(cwd, { recursive: true, force: true });
  }
});

const createRepo = () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "carbon-public-api-test-"));
  createdRepos.push(cwd);

  git(cwd, "init", "-q");
  git(cwd, "config", "user.name", "API Check Test");
  git(cwd, "config", "user.email", "api-check-test@example.invalid");
  git(cwd, "config", "commit.gpgsign", "false");
  git(cwd, "config", "core.hooksPath", ".git/no-hooks");

  fs.mkdirSync(path.join(cwd, "src/components"), { recursive: true });
  fs.writeFileSync(path.join(cwd, "src/index.ts"), entry);
  fs.writeFileSync(path.join(cwd, "src/components/example.ts"), optionalProp);
  git(cwd, "add", "src");
  git(cwd, "commit", "-qm", "test: baseline");
  return cwd;
};

const check = (cwd, message, ...args) => {
  const messageFile = path.join(cwd, "commit-message.txt");
  fs.writeFileSync(messageFile, message);
  const result = spawnSync(process.execPath, [checker, messageFile, ...args], {
    cwd,
    encoding: "utf8",
  });
  assert.ifError(result.error);
  return { status: result.status, output: result.stdout + result.stderr };
};

test("staged breaking prop change fails without a footer and passes with one", () => {
  const cwd = createRepo();
  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    "export interface ExampleProps { labelSpacing: 1 | 2 }\n",
  );
  git(cwd, "add", "src/components/example.ts");

  const withoutFooter = check(cwd, "feat!: require label spacing", "--quiet");
  assert.equal(withoutFooter.status, 1, withoutFooter.output);
  assert.match(
    withoutFooter.output,
    /ExampleProps\.labelSpacing changed from optional to required\./,
  );
  assert.match(withoutFooter.output, /BREAKING CHANGE: footer/);
  assert.doesNotMatch(withoutFooter.output, /"kind":/);

  const inlineMention = check(
    cwd,
    "fix: mention BREAKING CHANGE: in the title",
  );
  assert.equal(inlineMention.status, 1, inlineMention.output);

  const withFooter = check(
    cwd,
    "feat!: require label spacing\n\nBREAKING CHANGE: labelSpacing is now required.",
    "--quiet",
  );
  assert.equal(withFooter.status, 0, withFooter.output);
  assert.equal(withFooter.output, "");
});

test("additive optional prop passes without a breaking footer", () => {
  const cwd = createRepo();
  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    "export interface ExampleProps { labelSpacing?: 1 | 2; hint?: string }\n",
  );
  git(cwd, "add", "src/components/example.ts");

  const result = check(cwd, "feat: add optional hint");
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /Staged public API compatibility check passed\./);
});

test("adding an optional method passes but a required method needs a footer", () => {
  const cwd = createRepo();
  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    "export interface ExampleProps { labelSpacing?: 1 | 2; validate?(): void }\n",
  );
  git(cwd, "add", "src/components/example.ts");

  const optional = check(cwd, "feat: add optional validation method");
  assert.equal(optional.status, 0, optional.output);

  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    "export interface ExampleProps { labelSpacing?: 1 | 2; validate(): void }\n",
  );
  git(cwd, "add", "src/components/example.ts");

  const required = check(cwd, "feat: require validation method");
  assert.equal(required.status, 1, required.output);
  assert.match(
    required.output,
    /ExampleProps\.validate was added as a required member/,
  );
});

test("inherited optional methods remain additive", () => {
  const cwd = createRepo();
  fs.writeFileSync(
    path.join(cwd, "src/index.ts"),
    'export type { ExampleProps } from "./components/example";\n',
  );
  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    'import type { InternalProps } from "./internal";\nexport interface ExampleProps extends InternalProps {}\n',
  );
  const internalPath = path.join(cwd, "src/components/internal.ts");
  fs.writeFileSync(
    internalPath,
    "export interface InternalProps { value: string }\n",
  );
  git(cwd, "add", "src");
  git(cwd, "commit", "-qm", "test: add inherited props");

  fs.writeFileSync(
    internalPath,
    "export interface InternalProps { value: string; validate?(): void }\n",
  );
  git(cwd, "add", "src/components/internal.ts");
  const optional = check(cwd, "feat: add inherited optional method");
  assert.equal(optional.status, 0, optional.output);

  fs.writeFileSync(
    internalPath,
    "export interface InternalProps { value: string; validate(): void }\n",
  );
  git(cwd, "add", "src/components/internal.ts");
  const required = check(cwd, "feat: require inherited method");
  assert.equal(required.status, 1, required.output);
  assert.match(
    required.output,
    /ExampleProps\.validate was added as a required member/,
  );
});

test("making a required prop optional and widening its type passes", () => {
  const cwd = createRepo();
  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    'export interface ExampleProps { value: "one" }\n',
  );
  git(cwd, "add", "src/components/example.ts");
  git(cwd, "commit", "-qm", "test: add required prop");

  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    'export interface ExampleProps { value?: "one" | "two" }\n',
  );
  git(cwd, "add", "src/components/example.ts");

  const result = check(cwd, "feat: relax accepted value");
  assert.equal(result.status, 0, result.output);
});

test("removing a public export requires a breaking footer", () => {
  const cwd = createRepo();
  fs.writeFileSync(path.join(cwd, "src/index.ts"), "export {};\n");
  git(cwd, "add", "src/index.ts");

  const withoutFooter = check(cwd, "refactor: remove ExampleProps");
  assert.equal(withoutFooter.status, 1, withoutFooter.output);
  assert.match(
    withoutFooter.output,
    /Public export `ExampleProps` was removed\./,
  );

  const withFooter = check(
    cwd,
    "feat: remove ExampleProps\n\nBREAKING CHANGE: ExampleProps is no longer exported.",
  );
  assert.equal(withFooter.status, 0, withFooter.output);
});

test("moving a declaration behind the same public export preserves compatibility", () => {
  const cwd = createRepo();
  fs.writeFileSync(
    path.join(cwd, "src/index.ts"),
    'export type { ExampleProps } from "./components/moved";\n',
  );
  fs.copyFileSync(
    path.join(cwd, "src/components/example.ts"),
    path.join(cwd, "src/components/moved.ts"),
  );
  git(cwd, "add", "-A", "src");

  const sameContract = check(cwd, "refactor: move props declaration");
  assert.equal(sameContract.status, 0, sameContract.output);

  fs.writeFileSync(
    path.join(cwd, "src/index.ts"),
    'export type { MovedProps as ExampleProps } from "./components/moved";\n',
  );
  fs.writeFileSync(
    path.join(cwd, "src/components/moved.ts"),
    "export interface MovedProps { labelSpacing?: 1 | 2 }\n",
  );
  git(cwd, "add", "src/index.ts", "src/components/moved.ts");
  const renamedLocalDeclaration = check(
    cwd,
    "refactor: rename local declaration",
  );
  assert.equal(
    renamedLocalDeclaration.status,
    0,
    renamedLocalDeclaration.output,
  );

  fs.rmSync(path.join(cwd, "src/components/example.ts"));
  git(cwd, "add", "-A", "src");
  const deletedOldFile = check(
    cwd,
    "refactor: finish moving props declaration",
  );
  assert.equal(deletedOldFile.status, 0, deletedOldFile.output);

  fs.writeFileSync(
    path.join(cwd, "src/components/moved.ts"),
    "export interface MovedProps { labelSpacing: 1 | 2 }\n",
  );
  git(cwd, "add", "src/components/moved.ts");

  const changedContract = check(cwd, "refactor: move and require props");
  assert.equal(changedContract.status, 1, changedContract.output);
  assert.match(
    changedContract.output,
    /ExampleProps\.labelSpacing changed from optional to required\./,
  );
});

test("narrowing a public alias through a const tuple requires a breaking footer", () => {
  const cwd = createRepo();
  const typographyDir = path.join(cwd, "src/components/typography");
  fs.mkdirSync(typographyDir);
  fs.writeFileSync(
    path.join(typographyDir, "index.ts"),
    'export type { VariantTypes } from "./typography.component";\n',
  );
  fs.writeFileSync(
    path.join(typographyDir, "typography.component.tsx"),
    'export const VARIANT_TYPES = ["h1", "h2"] as const;\nexport type VariantTypes = (typeof VARIANT_TYPES)[number];\n',
  );
  git(cwd, "add", "src/components/typography");
  git(cwd, "commit", "-qm", "test: add typography variants");

  fs.writeFileSync(
    path.join(typographyDir, "typography.component.tsx"),
    'export const VARIANT_TYPES = ["h1"] as const;\nexport type VariantTypes = (typeof VARIANT_TYPES)[number];\n',
  );
  git(cwd, "add", "src/components/typography/typography.component.tsx");

  const withoutFooter = check(cwd, "fix: remove h2 variant");
  assert.equal(withoutFooter.status, 1, withoutFooter.output);
  assert.match(withoutFooter.output, /VariantTypes/);

  const withFooter = check(
    cwd,
    "feat: remove h2 variant\n\nBREAKING CHANGE: h2 is no longer supported.",
  );
  assert.equal(withFooter.status, 0, withFooter.output);

  fs.writeFileSync(
    path.join(typographyDir, "typography.component.tsx"),
    'export const VARIANT_TYPES = ["h2", "h1"] as const;\nexport type VariantTypes = (typeof VARIANT_TYPES)[number];\n',
  );
  git(cwd, "add", "src/components/typography/typography.component.tsx");
  const reordered = check(cwd, "refactor: reorder variants");
  assert.equal(reordered.status, 0, reordered.output);

  fs.writeFileSync(
    path.join(typographyDir, "typography.component.tsx"),
    'export const VARIANT_TYPES = ["h1", "h2", "h3"] as const;\nexport type VariantTypes = (typeof VARIANT_TYPES)[number];\n',
  );
  git(cwd, "add", "src/components/typography/typography.component.tsx");
  const additive = check(cwd, "feat: add h3 variant");
  assert.equal(additive.status, 0, additive.output);
});

test("directly widening a public alias passes without a footer", () => {
  const cwd = createRepo();
  fs.writeFileSync(
    path.join(cwd, "src/index.ts"),
    'export type { Variant } from "./components/example";\n',
  );
  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    'export type Variant = "one";\n',
  );
  git(cwd, "add", "src");
  git(cwd, "commit", "-qm", "test: add public alias");

  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    'export type Variant = "one" | "two";\n',
  );
  git(cwd, "add", "src/components/example.ts");

  const widening = check(cwd, "feat: add variant two");
  assert.equal(widening.status, 0, widening.output);

  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    'export type Variant = "two";\n',
  );
  git(cwd, "add", "src/components/example.ts");

  const narrowing = check(cwd, "fix: remove variant one");
  assert.equal(narrowing.status, 1, narrowing.output);
  assert.match(narrowing.output, /Variant resolved type changed/);
});

test("a public alias detects changes in an imported const tuple", () => {
  const cwd = createRepo();
  const typographyDir = path.join(cwd, "src/components/typography");
  fs.mkdirSync(typographyDir);
  fs.writeFileSync(
    path.join(typographyDir, "index.ts"),
    'export type { VariantTypes } from "./typography.component";\n',
  );
  fs.writeFileSync(
    path.join(typographyDir, "typography.component.tsx"),
    'import { VARIANT_TYPES } from "./variants";\nexport type VariantTypes = (typeof VARIANT_TYPES)[number];\n',
  );
  fs.writeFileSync(
    path.join(typographyDir, "variants.ts"),
    'export const VARIANT_TYPES = ["h1", "h2"] as const;\n',
  );
  git(cwd, "add", "src/components/typography");
  git(cwd, "commit", "-qm", "test: add imported variants");

  fs.writeFileSync(
    path.join(typographyDir, "variants.ts"),
    'export const VARIANT_TYPES = ["h1"] as const;\n',
  );
  git(cwd, "add", "src/components/typography/variants.ts");

  const result = check(cwd, "fix: remove h2 variant");
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /VariantTypes resolved type changed/);
});

test("a public interface detects changes in an internal inherited prop", () => {
  const cwd = createRepo();
  const typographyDir = path.join(cwd, "src/components/typography");
  const internalDir = path.join(typographyDir, "__internal__");
  fs.mkdirSync(internalDir, { recursive: true });
  fs.writeFileSync(
    path.join(typographyDir, "index.ts"),
    'export type { TypographyProps } from "./typography.component";\n',
  );
  fs.writeFileSync(
    path.join(typographyDir, "typography.component.tsx"),
    'import type { NextTypographyProps } from "./__internal__/next";\nexport interface TypographyProps extends Pick<NextTypographyProps, "size"> { label?: string }\n',
  );
  fs.writeFileSync(
    path.join(internalDir, "next.ts"),
    'export interface NextTypographyProps { size?: "M" | "L" }\n',
  );
  git(cwd, "add", "src/components/typography");
  git(cwd, "commit", "-qm", "test: add typography props");

  fs.writeFileSync(
    path.join(internalDir, "next.ts"),
    'export interface NextTypographyProps { size?: "M" }\n',
  );
  git(cwd, "add", "src/components/typography/__internal__/next.ts");

  const withoutFooter = check(cwd, "fix: narrow typography size");
  assert.equal(withoutFooter.status, 1, withoutFooter.output);
  assert.match(withoutFooter.output, /TypographyProps\.size/);

  const withFooter = check(
    cwd,
    "feat: narrow typography size\n\nBREAKING CHANGE: Typography no longer accepts size L.",
  );
  assert.equal(withFooter.status, 0, withFooter.output);

  fs.writeFileSync(
    path.join(internalDir, "next.ts"),
    'export interface NextTypographyProps { size?: "M" | "L"; fluid?: boolean }\n',
  );
  git(cwd, "add", "src/components/typography/__internal__/next.ts");
  const additiveChange = check(cwd, "feat: add internal fluid option");
  assert.equal(additiveChange.status, 0, additiveChange.output);

  fs.writeFileSync(
    path.join(internalDir, "next.ts"),
    'export interface NextTypographyProps { size?: "M"; fluid?: boolean }\n',
  );
  const unstagedChange = check(cwd, "feat: add internal fluid option");
  assert.equal(unstagedChange.status, 0, unstagedChange.output);
});

test("reordering a public member union does not require a breaking footer", () => {
  const cwd = createRepo();
  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    'export interface ExampleProps { value?: "one" | "two" }\n',
  );
  git(cwd, "add", "src/components/example.ts");
  git(cwd, "commit", "-qm", "test: add union prop");

  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    'export interface ExampleProps { value?: "two" | "one" }\n',
  );
  git(cwd, "add", "src/components/example.ts");

  const result = check(cwd, "refactor: reorder accepted values");
  assert.equal(result.status, 0, result.output);
});

test("replacing a public member alias with an equivalent alias passes", () => {
  const cwd = createRepo();
  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    'type First = "one" | "two";\ntype Second = "two" | "one";\nexport interface ExampleProps { value?: First }\n',
  );
  git(cwd, "add", "src/components/example.ts");
  git(cwd, "commit", "-qm", "test: add equivalent aliases");

  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    'type First = "one" | "two";\ntype Second = "two" | "one";\nexport interface ExampleProps { value?: Second }\n',
  );
  git(cwd, "add", "src/components/example.ts");

  const result = check(cwd, "refactor: use equivalent alias");
  assert.equal(result.status, 0, result.output);
});

test("reordering a public class member union passes", () => {
  const cwd = createRepo();
  fs.writeFileSync(
    path.join(cwd, "src/index.ts"),
    'export { Example } from "./components/example";\n',
  );
  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    'export class Example { value!: "one" | "two" }\n',
  );
  git(cwd, "add", "src");
  git(cwd, "commit", "-qm", "test: add class member union");

  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    'export class Example { value!: "two" | "one" }\n',
  );
  git(cwd, "add", "src/components/example.ts");

  const result = check(cwd, "refactor: reorder class values");
  assert.equal(result.status, 0, result.output);
});

test("a component entry point is protected even when the root barrel omits it", () => {
  const cwd = createRepo();
  const componentDir = path.join(cwd, "src/components/text-editor");
  fs.mkdirSync(path.join(componentDir, "__internal__"), { recursive: true });
  fs.writeFileSync(
    path.join(componentDir, "index.ts"),
    'export { default as MentionsPlugin } from "./__internal__/mentions";\n',
  );
  fs.writeFileSync(
    path.join(componentDir, "__internal__/mentions.ts"),
    "export default function MentionsPlugin() {}\n",
  );
  git(cwd, "add", "src/components/text-editor");
  git(cwd, "commit", "-qm", "test: add component entry point");

  fs.writeFileSync(path.join(componentDir, "index.ts"), "export {};\n");
  git(cwd, "add", "src/components/text-editor/index.ts");

  const withoutFooter = check(cwd, "refactor: remove MentionsPlugin");
  assert.equal(withoutFooter.status, 1, withoutFooter.output);
  assert.match(
    withoutFooter.output,
    /src\/components\/text-editor\/index\.ts: Public export `MentionsPlugin` was removed\./,
  );

  const withFooter = check(
    cwd,
    "feat: remove MentionsPlugin\n\nBREAKING CHANGE: MentionsPlugin is no longer exported.",
  );
  assert.equal(withFooter.status, 0, withFooter.output);
});

test("a named export of an imported binding is protected", () => {
  const cwd = createRepo();
  const componentDir = path.join(cwd, "src/components/radio-button");
  fs.mkdirSync(componentDir);
  fs.writeFileSync(
    path.join(componentDir, "index.ts"),
    'import RadioButton from "./radio-button.component";\nexport { RadioButton };\nexport default RadioButton;\n',
  );
  fs.writeFileSync(
    path.join(componentDir, "radio-button.component.tsx"),
    "const RadioButton = (value: string) => value;\nexport default RadioButton;\n",
  );
  git(cwd, "add", "src/components/radio-button");
  git(cwd, "commit", "-qm", "test: add radio button entry point");

  fs.writeFileSync(
    path.join(componentDir, "index.ts"),
    'import RadioButton from "./radio-button.component";\nexport default RadioButton;\n',
  );
  git(cwd, "add", "src/components/radio-button/index.ts");

  const withoutFooter = check(cwd, "refactor: remove named RadioButton");
  assert.equal(withoutFooter.status, 1, withoutFooter.output);
  assert.match(
    withoutFooter.output,
    /Public export `RadioButton` was removed\./,
  );

  const withFooter = check(
    cwd,
    "feat: remove named RadioButton\n\nBREAKING CHANGE: RadioButton is no longer a named export.",
  );
  assert.equal(withFooter.status, 0, withFooter.output);

  fs.writeFileSync(
    path.join(componentDir, "index.ts"),
    'import RadioButton from "./radio-button.component";\nexport { RadioButton };\nexport default RadioButton;\n',
  );
  fs.writeFileSync(
    path.join(componentDir, "radio-button.component.tsx"),
    "const RadioButton = (value: number) => value;\nexport default RadioButton;\n",
  );
  git(cwd, "add", "src/components/radio-button");

  const changedOrigin = check(cwd, "refactor: change RadioButton signature");
  assert.equal(changedOrigin.status, 1, changedOrigin.output);
  assert.match(changedOrigin.output, /RadioButton.*variable signature/);
});

test("renamed imports remain protected when re-exported locally", () => {
  const cwd = createRepo();
  const componentDir = path.join(cwd, "src/components/example");
  fs.mkdirSync(componentDir);
  fs.writeFileSync(
    path.join(componentDir, "index.ts"),
    'import { Actual as Local } from "./actual";\nexport { Local as PublicName };\n',
  );
  fs.writeFileSync(
    path.join(componentDir, "actual.ts"),
    "export const Actual = 1;\n",
  );
  git(cwd, "add", "src/components/example");
  git(cwd, "commit", "-qm", "test: add renamed import export");

  fs.writeFileSync(path.join(componentDir, "index.ts"), "export {};\n");
  git(cwd, "add", "src/components/example/index.ts");

  const result = check(cwd, "refactor: remove PublicName");
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /Public export `PublicName` was removed\./);
});

test("inferred public function, variable, and class types require a breaking footer", () => {
  const cwd = createRepo();
  const sourcePath = path.join(cwd, "src/components/example.ts");
  fs.writeFileSync(
    path.join(cwd, "src/index.ts"),
    'export { publicFunction, publicArrow, PublicClass } from "./components/example";\n',
  );
  fs.writeFileSync(
    sourcePath,
    'export function publicFunction() { return "one"; }\nexport const publicArrow = () => "one";\nexport class PublicClass { value = "one"; method() { return "one"; } }\n',
  );
  git(cwd, "add", "src");
  git(cwd, "commit", "-qm", "test: add inferred public types");

  fs.writeFileSync(
    sourcePath,
    "export function publicFunction() { return 1; }\nexport const publicArrow = () => 1;\nexport class PublicClass { value = 1; method() { return 1; } }\n",
  );
  git(cwd, "add", "src/components/example.ts");

  const withoutFooter = check(cwd, "refactor: change inferred public types");
  assert.equal(withoutFooter.status, 1, withoutFooter.output);
  assert.match(withoutFooter.output, /publicFunction/);
  assert.match(withoutFooter.output, /publicArrow/);
  assert.match(withoutFooter.output, /PublicClass/);

  const withFooter = check(
    cwd,
    "feat: change inferred public types\n\nBREAKING CHANGE: Public return types have changed.",
  );
  assert.equal(withFooter.status, 0, withFooter.output);

  fs.writeFileSync(
    sourcePath,
    'export function publicFunction() { return "two"; }\nexport const publicArrow = () => "two";\nexport class PublicClass { value = "two"; method() { return "two"; } }\n',
  );
  git(cwd, "add", "src/components/example.ts");
  const compatible = check(cwd, "refactor: change implementation only");
  assert.equal(compatible.status, 0, compatible.output);
});

test("public call signatures follow internal parameter types", () => {
  const cwd = createRepo();
  const internalPath = path.join(cwd, "src/components/input.ts");
  fs.writeFileSync(
    path.join(cwd, "src/index.ts"),
    'export { accept, acceptArrow, Acceptor } from "./components/example";\n',
  );
  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    'import type { Input } from "./input";\nexport function accept(value: Input) { return value; }\nexport const acceptArrow = (value: Input) => value;\nexport class Acceptor { accept(value: Input) { return value; } }\n',
  );
  fs.writeFileSync(internalPath, 'export type Input = "one" | "two";\n');
  git(cwd, "add", "src");
  git(cwd, "commit", "-qm", "test: add imported input type");

  fs.writeFileSync(internalPath, 'export type Input = "one";\n');
  git(cwd, "add", "src/components/input.ts");

  const withoutFooter = check(cwd, "refactor: narrow accepted input");
  assert.equal(withoutFooter.status, 1, withoutFooter.output);
  assert.match(withoutFooter.output, /accept resolved type changed/);
  assert.match(withoutFooter.output, /acceptArrow resolved type changed/);
  assert.match(withoutFooter.output, /Acceptor\.accept changed type/);

  const withFooter = check(
    cwd,
    "feat: narrow accepted input\n\nBREAKING CHANGE: Only one is accepted.",
  );
  assert.equal(withFooter.status, 0, withFooter.output);
});

test("widening a public class method return type still requires a footer", () => {
  const cwd = createRepo();
  fs.writeFileSync(
    path.join(cwd, "src/index.ts"),
    'export { PublicClass } from "./components/example";\n',
  );
  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    'export class PublicClass { method() { return "one" as const; } }\n',
  );
  git(cwd, "add", "src");
  git(cwd, "commit", "-qm", "test: add literal class method return");

  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    'export class PublicClass { method() { return "one" as string; } }\n',
  );
  git(cwd, "add", "src/components/example.ts");

  const result = check(cwd, "refactor: widen class method return");
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /PublicClass\.method changed type/);
});

test("a staged internal declaration stays protected despite an unstaged barrel edit", () => {
  const cwd = createRepo();
  const componentDir = path.join(cwd, "src/components/text-editor");
  fs.mkdirSync(path.join(componentDir, "__internal__"), { recursive: true });
  fs.writeFileSync(
    path.join(componentDir, "index.ts"),
    'export { default as MentionsPlugin } from "./__internal__/mentions";\n',
  );
  fs.writeFileSync(
    path.join(componentDir, "__internal__/mentions.ts"),
    "export const MentionsPlugin = (value: string) => value; export default MentionsPlugin;\n",
  );
  git(cwd, "add", "src/components/text-editor");
  git(cwd, "commit", "-qm", "test: export internal declaration");

  fs.writeFileSync(
    path.join(componentDir, "__internal__/mentions.ts"),
    "export const MentionsPlugin = (value: number) => value; export default MentionsPlugin;\n",
  );
  git(cwd, "add", "src/components/text-editor/__internal__/mentions.ts");
  fs.writeFileSync(path.join(componentDir, "index.ts"), "export {};\n");

  const result = check(cwd, "refactor: require mention value");
  assert.equal(result.status, 1, result.output);
  assert.match(
    result.output,
    /MentionsPlugin changed its variable signature\./,
  );
});

test("an index under __internal__ is not itself a public entry point", () => {
  const cwd = createRepo();
  const internalDir = path.join(cwd, "src/components/text-editor/__internal__");
  fs.mkdirSync(internalDir, { recursive: true });
  fs.writeFileSync(
    path.join(internalDir, "index.ts"),
    "export const privateHelper = true;\n",
  );
  git(cwd, "add", "src/components/text-editor/__internal__/index.ts");
  git(cwd, "commit", "-qm", "test: add internal barrel");

  fs.writeFileSync(path.join(internalDir, "index.ts"), "export {};\n");
  git(cwd, "add", "src/components/text-editor/__internal__/index.ts");

  const result = check(cwd, "refactor: remove private helper");
  assert.equal(result.status, 0, result.output);
});

test("unadvertised hook and style barrels are not public entry points", () => {
  const cwd = createRepo();
  for (const filePath of [
    "src/hooks/use-multi-input/index.ts",
    "src/style/utils/index.ts",
  ]) {
    const absolutePath = path.join(cwd, filePath);
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
    fs.writeFileSync(absolutePath, "export const helper = true;\n");
  }
  git(cwd, "add", "src");
  git(cwd, "commit", "-qm", "test: add internal barrels");

  for (const filePath of [
    "src/hooks/use-multi-input/index.ts",
    "src/style/utils/index.ts",
  ]) {
    fs.writeFileSync(path.join(cwd, filePath), "export {};\n");
  }
  git(cwd, "add", "src");

  const result = check(cwd, "refactor: remove internal helpers");
  assert.equal(result.status, 0, result.output);
});

test("documented hook, locale, and theme barrels remain protected", () => {
  const cwd = createRepo();
  const entries = [
    "src/hooks/useMediaQuery/index.ts",
    "src/locales/index.ts",
    "src/style/themes/index.ts",
  ];
  for (const filePath of entries) {
    const absolutePath = path.join(cwd, filePath);
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
    fs.writeFileSync(absolutePath, "export const publicValue = true;\n");
  }
  git(cwd, "add", "src");
  git(cwd, "commit", "-qm", "test: add documented entry points");

  for (const filePath of entries) {
    fs.writeFileSync(path.join(cwd, filePath), "export {};\n");
  }
  git(cwd, "add", "src");

  const result = check(cwd, "refactor: remove documented exports");
  assert.equal(result.status, 1, result.output);
  for (const filePath of entries) {
    assert.match(result.output, new RegExp(filePath.replaceAll("/", "\\/")));
  }
});

test("a utility barrel remains protected when the root exports it", () => {
  const cwd = createRepo();
  const utilityPath = path.join(cwd, "src/style/utils/index.ts");
  fs.mkdirSync(path.dirname(utilityPath), { recursive: true });
  fs.writeFileSync(utilityPath, "export const publicHelper = true;\n");
  fs.writeFileSync(
    path.join(cwd, "src/index.ts"),
    `${entry}export { publicHelper } from "./style/utils";\n`,
  );
  git(cwd, "add", "src");
  git(cwd, "commit", "-qm", "test: export utility through root");

  fs.writeFileSync(utilityPath, "export {};\n");
  git(cwd, "add", "src/style/utils/index.ts");

  const result = check(cwd, "refactor: remove public utility");
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /Public export `publicHelper` was removed\./);
});

test("the check only considers staged, root-exported changes", () => {
  const cwd = createRepo();
  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    "export interface ExampleProps { labelSpacing: 1 | 2 }\n",
  );
  const unstaged = check(cwd, "fix: unrelated change");
  assert.equal(unstaged.status, 0, unstaged.output);

  fs.writeFileSync(
    path.join(cwd, "src/components/private.ts"),
    "export interface PrivateProps { value: string }\n",
  );
  git(cwd, "add", "src/components/private.ts");
  const privateChange = check(cwd, "fix: change private type");
  assert.equal(privateChange.status, 0, privateChange.output);

  git(cwd, "add", "src/components/example.ts");
  const staged = check(cwd, "fix: require label spacing");
  assert.equal(staged.status, 1, staged.output);
});

test("the commit-msg hook blocks an undocumented break and allows a documented one", () => {
  const cwd = createRepo();
  fs.writeFileSync(
    path.join(cwd, "src/components/example.ts"),
    "export interface ExampleProps { labelSpacing: 1 | 2 }\n",
  );
  git(cwd, "add", "src/components/example.ts");

  const hooksDir = path.join(cwd, ".husky");
  fs.mkdirSync(path.join(hooksDir, "_"), { recursive: true });
  fs.copyFileSync(commitMsgHook, path.join(hooksDir, "commit-msg"));
  fs.chmodSync(path.join(hooksDir, "commit-msg"), 0o755);
  fs.writeFileSync(path.join(hooksDir, "_/husky.sh"), "set -e\n");
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    JSON.stringify({
      name: "api-check-fixture",
      version: "1.0.0",
      scripts: { "check:public-api": `node ${shellQuote(checker)}` },
    }),
  );
  const binDir = path.join(cwd, "bin");
  fs.mkdirSync(binDir);
  fs.writeFileSync(path.join(binDir, "npx"), "#!/bin/sh\nexit 0\n", {
    mode: 0o755,
  });
  git(cwd, "config", "core.hooksPath", ".husky");

  const commit = (message) =>
    spawnSync("git", ["commit", "-m", message], {
      cwd,
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: `${binDir}${path.delimiter}${process.env.PATH}`,
        HUSKY: "",
      },
    });

  const rejected = commit("feat!: require label spacing");
  assert.equal(rejected.status, 1, rejected.stdout + rejected.stderr);
  assert.match(rejected.stdout + rejected.stderr, /BREAKING CHANGE: footer/);
  assert.equal(git(cwd, "rev-list", "--count", "HEAD").trim(), "1");

  const accepted = commit(
    "feat!: require label spacing\n\nBREAKING CHANGE: labelSpacing is now required.",
  );
  assert.equal(accepted.status, 0, accepted.stdout + accepted.stderr);
  assert.equal(git(cwd, "rev-list", "--count", "HEAD").trim(), "2");
});
