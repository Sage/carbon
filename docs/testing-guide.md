# Testing guide

## Contents

- [Component testing](#component-testing)
  - [Custom utilities](#custom-utilities)
  - [Use of Snapshot tests](#use-of-snapshot-tests)
  - [Continuous Integration (CI)](#continuous-integration-ci)
- [Browser-based component testing](#browser-based-component-testing)
  - [Playwright File Structure](#playwright-file-structure)
  - [Locators](#locators)
- [Visual Testing](#visual-testing)

## Introduction

This guide details Carbon's testing setup, common conventions and utilities available to you.

## Component testing

We use the [Jest](https://facebook.github.io/jest/) framework and [Enzyme](https://enzymejs.github.io/enzyme/) library for our component tests. Tests should describe the **behaviour of the components** rather than describe the implementation to keep the tests clean and reliable. All props, branches and paths and each of their conditions need to be tested to meet Carbon's 100% coverage policy.

### Custom utilities

To help with common testing scenarios, we have a number of custom utilities available in `/src/__spec_helper__` that can be imported directly into your tests.

For example the `assertStyleMatch` method which asserts if all the expected CSS properties have been applied to a DOM element or React component:

```tsx
describe("FlatTableRow", () => {
  it("then the element should have proper outline when focused", () => {
    assertStyleMatch(
      {
        outline: `3px solid var(--colorsSemanticFocus500)`,
      },
      wrapper,
      {
        modifier: ":focus",
      }
    );
  });
});
```

### Use of Snapshot tests

Snapshots are left up to the developer to be used where there is value. If you do want to use them, ensure they are small, focused and effective.

> Further information on snapshots can be found on [Jest's official docs](https://jestjs.io/docs/snapshot-testing).

### Continuous Integration (CI)

GitHub Actions runs unit tests for a Pull Request on creation and every commit push. You can manually run these steps with:

1. `npm format` - run prettier to format code under `/src`.
2. `npm run lint` - run linter on code under `/src`.
3. `npm run type-check` - run TypeScript compiler to check for type errors.
4. `npm test` - runs unit tests.

## Browser-based component testing

We use [Playwright](https://playwright.dev) for browser-based component testing. Jest-tested functionality doesn't necessarily need retesting in Playwright unless it adds user-behavior insight.

Further details on installing Playwright and our configuration for it can be found in our [Getting started with Playwright](../playwright/README.md) guide.

### Playwright File Structure

All Playwright tests must go within `*.pw.tsx` for the relevant component.

```
.
├── src/
│   ├── components/
│   │   └── [component-name]/
│   │       └── [component-name].pw.tsx
│   │       └──  components.test-pw.tsx
│
├── playwright/
│   ├── components/
│   │   └── [component-name]/
│   │       └── locators.ts
│   │       └── index.ts
│   │
│   ├── support/
│   │   └── helper.ts
│   │
│   ├── index.html
│   ├── index.tsx
│   └── README.md
│
└── playwright-ct.config.ts
```

A typical `*.pw.tsx` file may look like the following:

```tsx
// inside src/components/button/button.pw.tsx
import { test, expect } from "@playwright/experimental-ct-react17";
import Button from "./button.component";
import { buttonComponent } from "../../../playwright/component/button/index";

test.describe("Check props for Button component", async () => {
  test("should render Button label when passed to the component", async ({
    mount,
    page,
  }) => {
    const label = "foobar";

    await mount(<Button>{label}</Button>);

    await expect(buttonComponent(page)).toHaveText(label);
  });
});
```

Where `mount` renders the component in the real browser (`chromium`/`webkit`/`firefox`/`opera`) and `buttonComponent` is a _locator_ that returns the DOM element we want to test.

### Locators

Playwright offers [built-in locators](https://playwright.dev/docs/locators) to find DOM elements within a rendered component. These locators focus on finding user-facing attributes like text and ARIA roles to encourage the creation of resilient tests.

```tsx
await page.getByLabel("User Name").fill("John");

await page.getByRole("button", { name: "Sign in" }).click();

await expect(page.getByText("Welcome, John!")).toBeVisible();
```

#### Test id tests

If you need to use [Playwright's `page.getByTestId()` locator](https://playwright.dev/docs/locators#locate-by-test-id), we have configured Playwright to locate the `data-role` attribute:

```tsx
<span data-role="icon" data-element="pdf" />
```

```ts
const icon = page.getByTestId("icon");
await expect(icon).toBeAttached();
await expect(icon).toHaveAttribute("data-element", "pdf");
```

#### Custom locators

We also have custom locators for many of our components. These locators typically follow a specific structure:

`playwright/components/<component-name>/index.ts`

```ts
/* in index.ts */
import type { Page } from "@playwright/test";
import { BUTTON_DATA_COMPONENT, BUTTON_SUBTEXT } from "./locators";

const buttonComponent = (page: Page) => {
  return page.locator(BUTTON_DATA_COMPONENT);
};

const buttonSubtext = (page: Page) => {
  return page.locator(BUTTON_SUBTEXT);
};

export { buttonComponent, buttonSubtext };
```

`playwright/components/<component-name>/locators.ts`

```ts
/* locators.ts */
// `data-component` prop is typically reserved for the root element of the component. Whereas `data-element` is for specific elements.
export const BUTTON_COMPONENT = '[data-component="button"]';
export const BUTTON_SUBTEXT = '[data-element="subtext"]';
```

## Visual Testing

We use [Chromatic](https://www.chromatic.com/) for flagging any visual regressions introduced into our Storybook stories. When CI checks are run on a pull request, Chromatic automatically generates a snapshot for each story and compares the snapshots with their baseline counterparts.

### Adding new visual tests

Chromatic is set-up to check for regressions in all component stories. Typically components will have the following stories files:

```none
.
└─ src/components/
     └── [component-name]/
          ├── [component-name].stories.*  (stories used in carbon docs)
          └── [component-name]-test.stories.* (private stories)
```

To introduce a new visual test, create a story in the relevant stories file that demonstrates the behaviour and it will automatically be detected by Chromatic.
