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
<p><code>.</code></p>
<p><code>├── cypress</code></p>
<p><code>│ ├── fixture</code></p>
<p><code>│ ├── integration</code></p>
<p><code>│ ├── locators</code></p>
<p><code>│ &nbsp;&nbsp;└── `[component-name]`</code></p>
<p><code>│ &nbsp;&nbsp;&nbsp;&nbsp;├── index.js <i>(exported arrow functions for locators)</i></code></p>
<p><code>│ &nbsp;&nbsp;&nbsp;&nbsp;└── locators.js <i>(string const locators)</i></code></p>
<p><code>│ ├── plugins</code></p>
<p><code>│ └── support</code></p>
<p><code>│ &nbsp;&nbsp;└──step-definitions</code></p>
<p><code>│ &nbsp;&nbsp;&nbsp;&nbsp;└── `[component-name]-steps.js` <i>(files with `cucumber steps`)</i></code></p>
<p><code>├── .eslintrc.json</code></p>
<p><code>├── README.md</code></p>
<p><code>└── tsconfig.json</code></p>

#### How to locate elements
Always use unique selectors to locate elements with order below:
1. `[data-component="unique-tag"]`
2. `#id`
3. `.class-name`
