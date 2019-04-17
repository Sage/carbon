# Cypress Cucumber tests for Storybook

## Getting started
1. Clone the carbon repository `git clone git@github.com:Sage/carbon.git`
2. Checkout cypress-cucumber-storybook branch `git checkout cypress-cucumber-storybook`
3. Install `npm install`
4. Run storybook `npm run storybook`
5. Open new terminal at the same path
6. Run cypress `npm run test-cypress`
7. If you would like to run cypress in command line (headless browser for continous integration) use `npm run test:ci`

## Coding standards
1. Use ESlint plugin to Visual Studio Code to make sure code format is preserved
2. Use kebab-case for all `*.js` file names
3. Use camelCase for `*.feature` file names

### Locators
#### Files structure
```
.
├── cypress
│ ├── fixture
│ ├── integration
│ ├── locators
│     └── [component-name]
│         ├── index.js (exported arrow functions for locators)
│         └── locators.js (string const locators)
│ ├── plugins
│ └── support
│     └──step-definitions
│        └── [component-name]-steps.js (files with cucumber steps)
├── .eslintrc.json
├── README.md
└── tsconfig.json
```

#### How to locate elements
Always use unique selectors to locate elements with order below:
1. `[data-component="unique-tag"]`
2. `#id`
3. `.class-name`
