import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";

import { cwd } from "process";

import STATIC_TOKENS_CSS from ".";

function parseCSSFile(filePath: string): Map<string, string> {
  const content = readFileSync(filePath, "utf-8");
  const tokens = new Map<string, string>();

  // Match CSS custom properties: --token-name: value;
  const regex = /--([^:]+):\s*([^;]+);/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    if (match[1] && match[2]) tokens.set(match[1].trim(), match[2].trim());
  }

  return tokens;
}

function parseStaticTokensString(tokensString: string): Map<string, string> {
  const tokens = new Map<string, string>();

  // Match CSS custom properties: --token-name: value;
  const regex = /--([^:]+):\s*([^;]+);/g;
  let match;

  while ((match = regex.exec(tokensString)) !== null) {
    if (match[1] && match[2]) tokens.set(match[1].trim(), match[2].trim());
  }

  return tokens;
}

const distPath = resolve(cwd(), "node_modules", "@sage/design-tokens-fusion");

const globalKeys = Array.from(
  parseCSSFile(resolve(distPath, "css/global.css")).keys(),
);
const lightKeys = Array.from(
  parseCSSFile(resolve(distPath, "css/light.css")).keys(),
);
const darkKeys = Array.from(
  parseCSSFile(resolve(distPath, "css/dark.css")).keys(),
);

const componentsDir = resolve(distPath, "css/components");
const components = readdirSync(componentsDir)
  .filter((file) => file.endsWith(".css"))
  .map((file) => file.replace(".css", ""));

test("static tokens match light.css token keys", () => {
  const staticKeys = Array.from(
    parseStaticTokensString(STATIC_TOKENS_CSS).keys(),
  ).filter((key) => key.startsWith("mode-"));

  expect(lightKeys.filter((key) => !staticKeys.includes(key))).toEqual([]);
  expect(lightKeys.length).toEqual(staticKeys.length);
});

test("static tokens match dark.css token keys", () => {
  const allStaticKeys = Array.from(
    parseStaticTokensString(STATIC_TOKENS_CSS).keys(),
  ).filter((key) => key.startsWith("mode-"));
  // Filter out tokens that are in light but not in dark
  const lightOnlyTokens = lightKeys.filter((key) => !darkKeys.includes(key));
  const staticKeys = allStaticKeys.filter(
    (key) => !lightOnlyTokens.includes(key),
  );

  expect(darkKeys.filter((key) => !staticKeys.includes(key))).toEqual([]);
  expect(darkKeys.length).toEqual(staticKeys.length);
});

test("static tokens match global.css token keys", () => {
  const staticKeys = Array.from(
    parseStaticTokensString(STATIC_TOKENS_CSS).keys(),
  ).filter((key) => key.startsWith("global-"));

  expect(globalKeys.filter((key) => !staticKeys.includes(key))).toEqual([]);
  expect(globalKeys.length).toEqual(staticKeys.length);
});

test.each(components)("static tokens match %s.css token keys", (component) => {
  const staticKeys = Array.from(
    parseStaticTokensString(STATIC_TOKENS_CSS).keys(),
  ).filter((key) => key.startsWith(`${component}-`));
  const componentCSSPath = resolve(componentsDir, `${component}.css`);
  const componentKeys = Array.from(parseCSSFile(componentCSSPath).keys());

  expect(componentKeys.filter((key) => !staticKeys.includes(key))).toEqual([]);
  expect(componentKeys.length).toEqual(staticKeys.length);
});

// Snapshot test to ensure the static tokens string remains consistent
test("builds the static tokens as expected", () => {
  expect(STATIC_TOKENS_CSS).toMatchSnapshot();
});
