# Testing guide

## Contents

- [Component tests](#component-tests)
  - [Using test ID to query elements](#using-test-id-to-query-elements)
  - [Use of Snapshot tests](#use-of-snapshot-tests)
  - [Continuous Integration (CI)](#continuous-integration-ci)
- [Browser-based component tests](#browser-based-component-tests)
  - [Playwright File Structure](#playwright-file-structure)
  - [Locators](#locators)
- [Visual Testing](#visual-testing)

## Introduction

This guide details Carbon's testing setup, common conventions, and utilities available to you.

## Component tests

We use [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) (RTL) for our component tests. Tests should describe the **behaviour of the components** rather than describe the implementation to keep the tests clean and reliable. All props, branches, and paths and each of their conditions need to be tested to meet Carbon's 100% coverage policy.

### Using test ID to query elements

RTL follows a user-centric testing approach. To encourage this the library provides query functions for locating DOM elements by user-facing attributes like text, ARIA roles, etc.

If you need to use [RTL's `*ByTestId()` query functions](https://testing-library.com/docs/queries/bytestid), we have configured RTL to locate the `data-role` attribute:

```tsx
<span data-role="icon" data-element="pdf" />
```

```ts
const icon = screen.getByTestId("icon");

await expect(icon).toBeInTheDocument();
await expect(icon).toHaveAttribute("data-element", "pdf");
```

### Use of Snapshot tests

Snapshots are left up to the developer to be used where there is value. If you do want to use them, ensure they are small, focused, and effective.

> Further information on snapshots can be found on [Jest's official docs](https://jestjs.io/docs/snapshot-testing).

### Continuous Integration (CI)

GitHub Actions runs component tests for a particular Pull Request when it is created and on every commit push. You can manually run these steps with:

1. `npm format` - run prettier to format code under `/src`.
2. `npm run lint` - run linter on code under `/src`.
3. `npm run type-check` - run TypeScript compiler to check for type errors.
4. `npm test` - runs unit tests.

## Browser-based component tests

We use [Playwright](https://playwright.dev) for conducting component tests that necessitate a real browser environment. This is particularly useful for certain scenarios, such as event handling, where it is beneficial to more accurately simulate and test user interactions.

Further details on installing Playwright and our configuration for it can be found in our [Getting Started with Playwright](../playwright/README.md) guide.

### Playwright File Structure

All Playwright tests must go within `*.pw.tsx` for the relevant component.

```none
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
import { test, expect } from "@playwright/experimental-ct-react";
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

#### Test ID tests

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

Chromatic is set up to check for visual regressions in all component stories. Typically, components will have the following story files:

```none
.
└─ src/components/
     └── [component-name]/
          ├── [component-name].stories.*  (stories used in carbon docs)
          └── [component-name]-test.stories.* (private stories)
```

To introduce a new visual test, create a story in the relevant stories file that demonstrates the behaviour.

Carbon automatically enables snapshots for all stories, though be wary that this can be overridden by story files. Make sure to check if snapshots have been disabled for a story file in its metadata-level parameters:

```tsx
// Button.stories.tsx
import Button from "./button":
import type { Meta } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: ActionPopover,
  // 👇 Disables snapshots for all stories in this file
  parameters: { chromatic: { disableSnapshot: true } },
};

export default meta;
```

If required, you can explicitly enable snapshots for a story via its own parameters:

```tsx
// Button.stories.tsx
import { Button } from "./Button";
import type { StoryObj } from "@storybook/react";

type Story = StoryObj<typeof Button>;

export const OnDark: Story = {
  // 👇 Story-level parameters
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
};
```
