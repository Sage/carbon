import assert from "node:assert/strict";
import test from "node:test";
import { ESLint } from "eslint";

import carbon from "./no-numeric-token-spacing.mjs";

const lint = (code) =>
  new ESLint({
    overrideConfigFile: true,
    overrideConfig: [
      {
        files: ["**/*.tsx"],
        languageOptions: {
          parserOptions: { ecmaFeatures: { jsx: true } },
        },
        plugins: { carbon },
        rules: { "carbon/no-numeric-token-spacing": "warn" },
      },
    ],
  }).lintText(code, { filePath: "example.tsx" });

test("warns for numeric token-first spacing but not legacy Box spacing", async () => {
  const [result] = await lint(`
    const Example = () => <><BoxNext p={8} /><NextBox m={0} /><Box p={8} /></>;
  `);

  assert.equal(result.warningCount, 2);
  assert.match(result.messages[0].message, /interpreted as pixels/);
});
