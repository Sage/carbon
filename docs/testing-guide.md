# Testing guide

## Contents

- [Testing guide](#testing-guide)
  - [Contents](#contents)
  - [Introduction](#introduction)
  - [Component testing](#component-testing)
    - [Custom utilities](#custom-utilities)
    - [Use of Snapshot tests](#use-of-snapshot-tests)
    - [Continuous Integration (CI)](#continuous-integration-ci)
  - [Functional Browser Testing](#functional-browser-testing)
    - [Cypress File Structure](#cypress-file-structure)
    - [Locators](#locators)
  - [Visual Testing](#visual-testing)
    - [Adding new visual tests](#adding-new-visual-tests)

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

## Functional Browser Testing

We use the [Cypress](https://www.cypress.io) framework to test component behaviour that requires a browser environment. Functionality which has already been tested via Jest tests does not need to be tested again using Cypress, unless it would be beneficial to test the behaviour in a manner similar to how a user would in a browser.

Further details on installing Cypress and our configuration for it can be found in our [Getting started with Cypress](../cypress/README.md) guide.

### Cypress File Structure

All Cypress tests must go within `*.cy.*` for the relevant component.

```none
.
├── cypress/
│   ├── components/
│   │   └── [component-name]/
│   │       └── [component-name].test.{js|tsx}
│   ├── locators/
│   │   └── [component-name]/
│   │       ├── index.js
│   │       └── locators.js
│   │
│   ├── support/
│   │
│   ├── docker-compose.yml
│   ├── webpack.config.js
│   ├── tsconfig.json
│   └── README.md
│
├── .eslintrc
└── cypress.config.ts
```

A typical `*.cy.*` file may look like the following:

```jsx
// inside cypress/components/button/button.test.js...
import Button from "./button.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { buttonDataComponent } from "../../../cypress/locators/button";

context("Test Button component", () => {
  describe("Check props for Button component", () => {
    it("should render Button label when passed to the component", () => {
      const label = "foobar";
      CypressMountWithProviders(<Button>{label}</Button>);
      buttonDataComponent().should("have.text", label);
    });
  });
});
```

Where `CypressMountWithProviders` renders the component in the simulated browser and `buttonDataComponent` is a _locator_ that returns the DOM element we want to test.

### Locators

We write dedicated functions to access rendered DOM elements in order to make our tests easier to read. Locators for a component typically follow this structure:

```js
/* in index.js */
import { BUTTON_COMPONENT, BUTTON_SUBTEXT } from "./locators.js";

export const buttonComponent = () => cy.get(BUTTON_DATA_COMPONENT);
export const buttonSubtext = () => cy.get(BUTTON_SUBTEXT);

/* in locators.js */
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
