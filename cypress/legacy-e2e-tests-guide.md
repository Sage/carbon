# Legacy E2E Cypress tests

> **NOTE**: As of November 2022, we are migrating away from the end-to-end, BDD-style Cypress tests in favour of writing our tests completely in JavaScript, so the following test format will eventually become obsolete.

- [Running Cypress tests](#running-cypress-tests)
- [Cypress File Structure](#cypress-file-structure)
- [BDD Test Syntax](#bdd-test-syntax)

## Running Cypress tests

To locally run the tests, execute the following:

1. `npm start` to start storybook server
2. `npx cypress open --e2e` to open Cypress test runner UI

## Cypress File Structure

```none
.
├── cypress/
│   ├── e2e/ (contains cucumber tests as .feature files)
│   │   ├── accessibility/
│   │   └── common/
│   │
│   ├── fixtures/ (test data as json files)
│   │
│   ├── componentTheme/ (tests for carbon themes)
│   │
│   ├── locators/
│   │   └── [component-name]/
│   │       ├── index.js (exported arrow functions for locators)
│   │       └── locators.js (string const locators)
│   │
│   ├── support/
│   │   ├── step-definitions/
│   │   │   └── [component-name]-steps.js (files with cucumber steps)
│   │   │
│   │   └── component-helper/ (contains utilities to help with component tests)
│   │
│   └── README.md
│
├── cypress.config.js
└── tsconfig.json
```

## BDD test syntax

Tests are written as [Cucumber](https://cucumber.io/docs/guides/overview/) expressions allowing us to write our tests in natural lanugage terms. Expressions are defined using Cucumber's [Gherkin syntax](https://cucumber.io/docs/gherkin/reference/#keywords). Observe the following additional standards:

- Use the [Cucumber extension](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete) in Visual Studio Code to make sure code format is preserved.
- Use kebab-case for all `*.js` file names.
- Use camelCase for `*.feature` file names.
- Use Gherkin syntax keywords in feature files:
  - `GIVEN` - the Given part describes the state of the world before you begin the behaviour you are specifying in this scenario. You can think of it as the pre-conditions to the test;
  - `WHEN` - the When section is the behaviour that you are specifying which is under test. All the actions you need to perform before making an assertion;
  - `THEN` - the Then section describes the changes you expect due to the specified behaviour. Regular assertion;
  - `AND` - use this to avoid duplication of the keywords (Given/When/Then). Each of the sections could have their own AND state. Indent AND lines under the previous Given/When/Then keyword by two spaces;
  - `Scenario outline` - tests that are using parameters from given `Examples` under the test and will run as many times as there are examples;
  - `Scenario` - tests that are run once.
- Write step definitions using Cucumber expressions to link to the Gherkin feature files:
- Step definitions are created per component as `component-steps.js` files and stored in `carbon/cypress/support/step-definitions`. They should follow the `component.feature` files exactly;
- Common steps (`common-steps.js`) are used for all common actions.

Some common test steps:

```none
I open `<story name>` `<component name>` component with `<dedicated json file>` json from `<directory to take json from>` using `<object name in json>` object name

I open `<name>` component page `<story name>`
```

### Scenario tags

Test scenarios in feature files can be tagged to enable a subset of scenarios to be run, ignored or identified in some manner. Use the following tags:

1. `@positive` for a happy path.
2. `@negative` for the negative scenario.
3. `@ignore` for temporarily ignored scenarios.
4. `@[bug-number]` for example `@FE-1234` - use this tag after @ignore to explain why the test is ignored.
5. `@ignore` and `@[bug-number]` should be removed after the bug fix.

Additional tags can be used to indicate other components/features are linked/dependent on this one.

A basic feature file would resemble this example:

```none
Feature: Button component
  I want to check Button component properties

  Background: Open Button component default page
    Given I open "Button" component page knobs

  @positive
  Scenario Outline: Set Button size to <size>
    When I select size to "<size>"
    Then Button height is "<height>"
    Examples:
      | size   | height |
      | small  | 32     |
      | medium | 40     |
      | large  | 48     |

  @positive
  Scenario: Verify the click function for a Button component
    When I click on "button"
    Then click action was called in Actions Tab
```
