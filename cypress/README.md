# Cypress Cucumber tests for Carbon storybook

## Getting started
1. Clone the carbon repository `git clone git@github.com:Sage/carbon.git`
2. Checkout cypress-cucumber-storybook branch `git checkout cypress-cucumber-storybook`
3. Install `npm install`
4. Run storybook `npm run storybook`
5. Open new terminal at the same path
6. Run cypress `npm run test-cypress`
7. If you would like to run cypress in command line (headless browser for continous integration) use `npm run test-cypress`
7.1 If you would like to run specific cypress tests in command line (headless browser for continous integration) use:
  - `npm run test-cypress --spec 'cypress/features/[tests-type]/[featureFileName].feature'`
8. We have 3 test suites:
8.1 Only build suite tests, which are running on Travis after every change/commit/push in repository
  - `npm run test-cypress-build`
8.2 Only accessibility suite tests, which are running on TeamCity nightly and verifying do the components have the accessibility vulnerabilities
  - `npm run test-cypress-accessibility`
8.3 Regression test suite, runs on TeamCity nightly and make all regression tests
  - `npm run test-cypress-regression`

## Coding standards
1. Use ESlint plugin to Visual Studio Code to make sure code format is preserved
2. Use kebab-case for all `*.js` file names
3. Use camelCase for `*.feature` file names
4. Use BDD keywords:
  4.1 GIVEN - the given part describes the state of the world before you begin the behavior you are specifying in this scenario. You can think of it as the pre-conditions to the test.
  4.2 WHEN - the when section is that behavior that you are specifying. All action you need to perform before making an assertion.
  4.3 THAN - the then section describes the changes you expect due to the specified behavior. Regular assertion.
  4.4 AND - each of the section could have own and state. You can use and to avoid using duplication of the keywords (Given / When / Than).
  4.5 Scenarion outline - tests that are using parameters from given Examples under the test and will run as much as there are examples.
  4.6 Scenario - tests that are run once.
5. Step definitions for BDD:
  5.1 Step definitions are created per component as `component-steps.js`. And should be used in exactly `component.feature`.
  5.2 Common steps (`common-steps.js`) are used to use steps written inside for all common actions.
6. Common test steps:
  6.1 I set `<knobs field>` to `<parameter>`
  6.2 I select `<knobs field>` to `<parameter>`
  6.3 I check / uncheck `<knobs filed>` checkbox
  6.4 I open `<name>` component page
    6.4.1 To open different stories on storybook
      - I open `<name>` component page `classic` / `basic` / `with button` / `legacy spinner` / `iframe` / `with button page in iframe` / `multiple` /`validations`.

## Scenario tags
Use scenario tags:
1. `@positive` for happy path
2. `@negative` for negative scenario
3. `@ignore` for temporary ignored scenarios
4. `@[bug-number]` for example `@FE-1234` - use this tag after `@ignore` to explain why test is ignored.
5. `@ignore` and `@[bug-number]` should be removed after bug fix
6. `@build` for pipeline - each build is verified by those tests
7. `@accessibility` tests verifies accessibility violations

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
1. `[data-component="unique-tag"]` for component and `[data-element="unique-tag"]` for component's element
2. `#id`
3. `.class-name`
### How to use locators
1. Locators are used, the same as step-definitions, per component.
2. Common locators should be used when the components / elements are common for all stories.
3. Locators should be named:
  3.1 Component on preview - `componentPreview`.
  3.2 Knobs - `componentsKnobs`.