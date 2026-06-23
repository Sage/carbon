// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const repoRoot = path.resolve(__dirname, "../..");

export const skillsRoot = path.join(repoRoot, "skills", "carbon-react");
export const componentsOutDir = path.join(skillsRoot, "components");
export const referencesDir = path.join(skillsRoot, "references", "docs");
export const referencesExamplesDir = path.join(referencesDir, "examples");

/** @type {Array<string | {source: string, target: string}>} */
export const docsReferenceFiles = [
  "docs/usage.mdx",
  "docs/installation.mdx",
  "docs/recommended-practices.mdx",
  "docs/usage-with-routing.mdx",
  "docs/i18n.mdx",
  "docs/deprecation-migration.mdx",
  "docs/validations.mdx",
  {
    source: "src/hooks/useMediaQuery/use-media-query.mdx",
    target: "useMediaQuery.md",
  },
];

export const KNOWN_SECTIONS = new Set([
  "contents",
  "quick start",
  "quickstart",
  "examples",
  "props",
  "translation keys",
  "designer notes",
  "related components",
  "ref methods",
  "list of icons",
]);

/**
 * Map of Storybook documentation slugs to their reference file paths (relative to a component's index.md).
 * @type {Map<string, string>}
 */
export const referenceSlugMap = new Map([
  ["documentation-validations", "../../references/docs/validations.md"],
  ["documentation-i18n", "../../references/docs/i18n.md"],
  ["documentation-usage", "../../references/docs/usage.md"],
  ["documentation-installation", "../../references/docs/installation.md"],
  [
    "documentation-recommended-practices",
    "../../references/docs/recommended-practices.md",
  ],
  [
    "documentation-usage-with-routing",
    "../../references/docs/usage-with-routing.md",
  ],
  [
    "documentation-deprecation-migration",
    "../../references/docs/deprecation-migration.md",
  ],
]);

/**
 * Map of Storybook documentation slugs to self-relative paths for use within references/docs/.
 * @type {Map<string, string>}
 */
export const referenceDocSelfSlugMap = new Map([
  ["documentation-validations", "./validations.md"],
  ["documentation-i18n", "./i18n.md"],
  ["documentation-usage", "./usage.md"],
  ["documentation-installation", "./installation.md"],
  ["documentation-recommended-practices", "./recommended-practices.md"],
  ["documentation-usage-with-routing", "./usage-with-routing.md"],
  ["documentation-deprecation-migration", "./deprecation-migration.md"],
  ["documentation-hooks-usemediaquery", "./useMediaQuery.md"],
]);
