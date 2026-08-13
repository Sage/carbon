// @ts-check

export const DEFAULT_MDX_GLOBS = ["src/components/**/*.mdx"];
export const DEFAULT_MDX_IGNORES = ["**/__internal__/**", "**/node_modules/**"];

// These top-level component folders are intentionally documented elsewhere or
// do not require their own component MDX.
export const MDX_COVERAGE_EXCLUSIONS = new Set([
  "dialog-full-screen",
  "i18n-provider",
  "modal",
]);

export const REQUIRED_SECTIONS = [
  "Contents",
  "Quick start",
  "Examples",
  "Props",
];

export const CATEGORIES = new Set([
  "Actions",
  "Feedback",
  "Inputs",
  "Modal",
  "Navigation",
  "Other",
  "UI presentation",
]);
