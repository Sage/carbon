# Cypress Cucumber tests for Storybook

## Getting started
1. Clone the carbon repository `git clone git@github.com:Sage/carbon.git`
2. Checkout cypress-cucumber-storybook branch `git checkout cypress-cucumber-storybook`
3. Install `npm install`
4. Run storybook `npm run storybook`
5. Open new terminal at the same path
6. Run cypress `npm run test-cypress`
7. If you would like to run cypress in command line (headless browser for continous integration) use `npm run test:ci`
7.1 If you would like to run specific cypress tests in command line (headless browser for continous integration) use:
  - for Windows `npm run test:ci --spec 'cypress/features/[tests-type]/[featureFileName].feature'`
  - for MacOS `npm run test:ci -- --spec 'cypress/features/[tests-type]/[featureFileName].feature'`

## Coding standards
1. Use ESlint plugin to Visual Studio Code to make sure code format is preserved
2. Use kebab-case for all `*.js` file names
3. Use camelCase for `*.feature` file names

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
