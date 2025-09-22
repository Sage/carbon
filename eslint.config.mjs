import { defineConfig } from "eslint/config";
import { fixupPluginRules, includeIgnoreFile } from "@eslint/compat";
import { fileURLToPath } from "url";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import ssrFriendly from "eslint-plugin-ssr-friendly";
import noUnsanitized from "eslint-plugin-no-unsanitized";
import prettier from "eslint-config-prettier";
import * as mdx from "eslint-plugin-mdx";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import jest from "eslint-plugin-jest";
import testingLibrary from "eslint-plugin-testing-library";
import jestDom from "eslint-plugin-jest-dom";
import playwright from "eslint-plugin-playwright";
import js from "@eslint/js";

const cleanGlobals = (globalObj) =>
  Object.entries(globalObj).reduce((cleaned, [key, value]) => {
    cleaned[key.trim()] = value;
    return cleaned;
  }, {});

const gitIgnorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig([
  includeIgnoreFile(gitIgnorePath),
  {
    ...js.configs.recommended,
    plugins: {
      react: fixupPluginRules(react),
      "react-hooks": fixupPluginRules(reactHooks),
      "jsx-a11y": fixupPluginRules(jsxA11y),
      "ssr-friendly": fixupPluginRules(ssrFriendly),
      "no-unsanitized": fixupPluginRules(noUnsanitized),
      import: fixupPluginRules(importPlugin),
    },
    languageOptions: {
      globals: {
        ...cleanGlobals(globals.browser),
        global: false,
        process: false,
      },
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["./tsconfig.json"],
          noWarnOnMultipleProjects: true,
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
      "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...noUnsanitized.configs["recommended-legacy"].rules,
      ...ssrFriendly.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...prettier.rules,
      ...importPlugin.configs.recommended.rules,
      strict: 0,
      "class-methods-use-this": "off",
      "func-names": "off",
      "guard-for-in": "off",
      "import/extensions": ["off", "never"],
      "import/no-extraneous-dependencies": "off",
      "import/no-unresolved": "off",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/label-has-associated-control": "warn",
      "jsx-a11y/mouse-events-have-key-events": "warn",
      "jsx-a11y/no-noninteractive-element-interactions": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      "jsx-a11y/no-autofocus": "off",
      "max-params": ["error", 5],
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-console": "error",
      "no-new-func": "error",
      "no-param-reassign": [
        "error",
        {
          props: false,
        },
      ],
      "no-plusplus": [
        "error",
        {
          allowForLoopAfterthoughts: true,
        },
      ],
      "no-restricted-syntax": "off",
      "no-underscore-dangle": "off",
      "no-use-before-define": [
        "error",
        {
          functions: false,
          classes: false,
        },
      ],
      "one-var": "off",
      "prefer-const": [
        "error",
        {
          destructuring: "any",
        },
      ],
      "prefer-destructuring": [
        "error",
        {
          VariableDeclarator: {
            array: false,
            object: true,
          },
          AssignmentExpression: {
            array: false,
            object: false,
          },
        },
      ],
      radix: "off",
      "react/destructuring-assignment": 0,
      "react/no-this-in-sfc": 0,
      "react/no-unescaped-entities": "off",
      "react/jsx-filename-extension": "off",
      "react/display-name": "off",
      "react/jsx-no-bind": [
        "error",
        {
          allowArrowFunctions: true,
          allowFunctions: true,
        },
      ],
      "react/jsx-props-no-spreading": "off",
      "react/jsx-uses-react": "warn",
      "react/jsx-uses-vars": "warn",
      "react/forbid-prop-types": "off",
      "react/no-array-index-key": "warn",
      "react/no-unused-prop-types": "warn",
      "react/prop-types": "off",
      "react/require-default-props": "off",
      "react/sort-comp": [
        "error",
        {
          order: [
            "static-methods",
            "lifecycle",
            "/^on.+$/",
            "/^(?!(InitialState$|DefaultProps$|ChildContext$)).+$/",
            "everything-else",
            "/^render.+$/",
            "render",
          ],
        },
      ],
      "react/state-in-constructor": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      camelcase: [
        "error",
        {
          allow: ["^UNSAFE_", "^API_"],
          properties: "never",
          ignoreDestructuring: false,
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "styled-system",
              importNames: ["color"],
              message:
                "Please use the default export from 'src/style/utils/color' instead.",
            },
          ],
        },
      ],
      "no-restricted-exports": "off",
      "default-param-last": "off",
      "react/no-unstable-nested-components": "off",
      "react/jsx-no-constructed-context-values": "off",
      "react/jsx-no-useless-fragment": "off",
      "no-unsafe-optional-chaining": "off",
      "prefer-regex-literals": "off",
      "arrow-body-style": "off",
      "import/named": "off",
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",
      "import/prefer-default-export": "error",
    },
  },
  {
    files: ["**/*.mdx"],

    ...mdx.flat,
    plugins: {
      mdx: fixupPluginRules(mdx),
    },
    rules: {
      ...mdx.flat.rules,
      "jsx-a11y/anchor-has-content": "off",
      "jsx-a11y/control-has-associated-label": "off",
      "react/self-closing-comp": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],

    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: ["./tsconfig.json"],
        noWarnOnMultipleProjects: true,
      },
    },
    settings: {
      "mdx/code-blocks": true,
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["./tsconfig.json"],
          noWarnOnMultipleProjects: true,
        },
      },
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...prettier.rules,
      "import/named": "off",
      "react/prefer-stateless-function": "off",
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "error",
      "@typescript-eslint/no-empty-function": [
        "error",
        {
          allow: ["arrowFunctions"],
        },
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
        },
      ],
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          name: "prop-types",
          message: "Please do not import `prop-types` in TypeScript files.",
        },
        {
          name: "react",
          importNames: [
            "useId",
            "startTransition",
            "useTransition",
            "useDeferredValue",
            "useSyncExternalStore",
            "useInsertionEffect",
          ],
          message:
            "Carbon must support projects on React v17. Please do not use React v18 features.",
        },
      ],
      "react/prop-types": "off",
    },
  },
  {
    files: ["**/*.stories.tsx"],
    rules: {
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "react/jsx-key": "off",
    },
  },
  {
    files: ["**/*.test.*"],
    plugins: {
      jest: fixupPluginRules(jest),
      "testing-library": fixupPluginRules(testingLibrary),
      "jest-dom": fixupPluginRules(jestDom),
    },
    languageOptions: {
      globals: {
        ...cleanGlobals(globals.jest),
        jest: false,
        test: false,
      },
    },
    rules: {
      ...jest.configs.recommended.rules,
      ...testingLibrary.configs.react.rules,
      ...jestDom.configs.recommended.rules,
      "jest/expect-expect": "off",
      "jest-dom/prefer-to-have-attribute": "off",
      "jest/no-alias-methods": "off",
      "react/jsx-key": "off",
    },
  },
  {
    ...playwright.configs["flat/recommended"],
    files: ["**/*.pw.ts*", "**/*.test-pw.ts*", "playwright/**/*.ts*"],
    plugins: {
      playwright: fixupPluginRules(playwright),
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
    },
    settings: {
      playwright: {
        messages: {
          noSkippedTest:
            "Test skipped. If unresolved, raise a JIRA ticket or GitHub issue, then reference it in a code comment above.",
          noWaitForTimeout:
            "Hardcoded timeouts make tests fragile and inefficient. Use Playwright's built-in waits (e.g. `locator.waitFor()`) or auto-retrying assertions (e.g. `await expect(locator).toBeVisible()`) to wait for conditions like element visibility or text presence.",
        },
      },
    },
    rules: {
      ...playwright.configs["flat/recommended"].rules,
      "playwright/expect-expect": [
        "error",
        {
          assertFunctionNames: [
            "checkAccessibility",
            "checkCSSOutline",
            "checkGoldenOutline",
            "containsClass",
            "assertCssValueIsApproximately",
            "verifyRequiredAsterisk",
            "verifyRequiredAsteriskForLabel",
            "verifyRequiredAsteriskForLegend",
            "checkElementBorderColours",
            "checkNewFocusStyling",
          ],
        },
      ],
      "playwright/no-commented-out-tests": "error",
      "playwright/no-focused-test": "error",
      "playwright/no-skipped-test": "warn",
      "playwright/no-wait-for-timeout": "error",
      "no-return-await": "warn",
      "no-return-assign": "warn",
      "no-await-in-loop": "off",
      "@typescript-eslint/no-floating-promises": "error",
      "react/jsx-key": "off",
    },
  },
]);
