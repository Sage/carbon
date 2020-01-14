# Testing Strategy

## Unit Testing
   Unit tests are written and maintained by developers.

## Manual Testing
### Components:
1. Every component should be fully tested using functional testing / UI testing / Internationalisation testing.
2. Every component should have a dedicated story (default / classic / multiple / validation / themes etc.),
   notes section and accessibility section.
3. Supporting browsers:
  * Chrome,
  * Firefox,
  * Safari,
  * Edge,
  * Internet Explorer 11.
4. Jira:
  * For every testable task, a JIRA test session needs to be created for each of the supported browsers;
  * Results should be added to the created test sessions with pass / fail mark;
  * Any issues found during testing should be raised as a "Defect" JIRA;
  * If the issue is present on the `master` branch it should be raised as a "Bug" in JIRA, not as a "Defect".

# Cypress Cucumber tests for Carbon storybook (Automation Testing)

## Description
  * Automation tests are written using [Cypress.io](https://www.cypress.io/) framework.
  * All component functionallity is testing using all Knobs configuration.
  * Events are tested as well (could be checked in Actions section).
  * Accessibility is also testing using Axe framework.

## Getting started
1. Clone the carbon repository `git clone git@github.com:Sage/carbon.git`.
2. Checkout cypress-cucumber-storybook branch `git checkout cypress-cucumber-storybook`.
3. Install `npm install`.
4. Run storybook `npm run storybook`.
5. Open new terminal at the same path.
6. Run cypress `npm run test-cypress`.
7. If you would like to run specific cypress tests in command line (headless browser for continous integration) use: `npm run test-cypress --spec 'cypress/features/[tests-type]/[featureFileName].feature'`.
8. We have 3 test suites:
  * Only build suite tests, which are running on Travis after every change/commit/push in repository. To run use:`npm run test-cypress-build`;
  * Only accessibility suite tests, which are running on TeamCity nightly and verifying do the components have the accessibility vulnerabilities. To run use:`npm run test-cypress-accessibility`;
  * Regression test suite, runs on TeamCity nightly and make all regression tests. To use run: `npm run test-cypress-regression`.

## Coding standards
1. Use ESlint plugin to Visual Studio Code to make sure code format is preserved.
2. Use kebab-case for all `*.js` file names.
3. Use camelCase for `*.feature` file names.
4. Use BDD keywords:
  * GIVEN - the given part describes the state of the world before you begin the behavior you are specifying in this scenario. You can think of it as the pre-conditions to the test;
  * WHEN - the when section is that behavior that you are specifying. All action you need to perform before making an assertion;
  * THEN - the then section describes the changes you expect due to the specified behavior. Regular assertion;
  * AND - each of the section could have own and state. You can use and to avoid using duplication of the keywords (Given / When / Then);
  * Scenarion outline - tests that are using parameters from given Examples under the test and will run as much as there are examples;
  * Scenario - tests that are run once.
5. Step definitions for BDD:
  * Step definitions are created per component as `component-steps.js`. And should be used in exactly `component.feature`;
  * Common steps (`common-steps.js`) are used to use steps written inside for all common actions.
6. Common test steps:
  * I set `<knobs field>` to `<parameter>`;
  * I select `<knobs field>` to `<parameter>`;
  * I check / uncheck `<knobs filed>` checkbox;
  * I open `<name>` component page;
    * To open different stories on storybook;
      * I open `<name>` component page `classic` / `basic` / `with button` / `legacy spinner` / `iframe` / `with button page in iframe` / `multiple` /`validations`.

## Scenario tags
Use scenario tags:
1. `@positive` for happy path.
2. `@negative` for negative scenario.
3. `@ignore` for temporary ignored scenarios.
4. `@[bug-number]` for example `@FE-1234` - use this tag after `@ignore` to explain why test is ignored.
5. `@ignore` and `@[bug-number]` should be removed after bug fix.
6. `@build` for pipeline - each build is verified by those tests.
7. `@accessibility` tests verifies accessibility violations.
8. `@validations` tests verify validation components.
9. `@deprecated` tests verifies deprecated components.

## Files structure
```
.
├── cypress
│ ├── fixture
│ ├── features
│ │   ├── build
│ │   ├── accessibility
│ │   └── regression
│ ├── locators
│ │   └── [component-name]
│ │       ├── index.js (exported arrow functions for locators)
│ │       └── locators.js (string const locators)
│ ├── plugins
│ └── support
│     └── step-definitions
│         └── [component-name]-steps.js (files with cucumber steps)
├── .eslintrc.json
├── README.md
└── tsconfig.json
```

## Locators
### How to locate elements
Always use unique selectors to locate elements with order below:
1. `[data-component="unique-tag"]` for component and `[data-element="unique-tag"]` for component's element.
2. `#id`.
3. `.class-name`.

### How to use locators
1. Locators are used, the same as step-definitions, per component.
2. Common locators should be used when the components / elements are common for all stories.
3. Locators should be named:
  * Component on preview - `componentPreview`;
  * Knobs - `componentKnobs`.

## Continuous Integration (CI)
### Travis
Every commit / pull request in repository initializing cypress `@build` tests and runs:
1. `npm run storybook-ci </dev/null &>/dev/null &` - runs storybook.
2. `npm run lint ./src && npm test -- --maxWorkers=2` - runs lint test and after that runs jest tests.
3. `npm run test-storybook-smoke` - runs `--smoke-test` and `--ci` - exit after successful start and don't open the browser.
4. `wait-on http://localhost:9001` - waits until storybook is up and running and is ready to run tests.
5. `npm run test-cypress-build` - run `@build` tests suite.