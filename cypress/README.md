# Getting Started with Cypress
## Contents
[Installation](#installation)

[Running Tests](#running-tests)

[Continuous Integration (CI)](#continuous-integration)
* [Start Storybook](#start-storybook)
* [GitHub Actions](#github-actions)

## Installation
We use the [Cypress.io]( https://www.cypress.io) testing framework for functional and regression testing. Cypress is already installed in the Carbon project. Clone and install the carbon repository to apply the installation:
1.	Clone the carbon repository `git clone git@github.com:Sage/carbon.git`.
2.	Install with `npm install`.

## Running Tests
Storybook must be running before Cypress tests can be run:
1.	Run Storybook `npm start`.
2.	Open a new terminal in the root path of the project.
3.	Run Cypress using the runner with `npx cypress open` or `npm run test-cypress`, then select the required feature file. Test results can be seen directly in the Cypress Test Runner UI.
4.	To run specific Cypress tests at the command line (headless browser for continuous integration) use: `npx cypress run --spec 'cypress/features/[tests-type]/[featureFileName].feature'`. Test results can be seen in the console run summary.
5.	To run in the Chrome/Firefox browser add `--browser chrome` or `--browser firefox` to the above command.

## Continuous Integration (CI)
Every commit/pull request in the repository initiates a Cypress test run using GitHub Actions.

### Start Storybook
Storybook must be running before cypress can run.
1.	`npm start` - runs Storybook.
2.	`wait-on http://localhost:9001` - waits until Storybook is up and running and is ready to run tests.

### GitHub Actions
1.	`npx cypress run --parallel -–record --spec './cypress/features/regression/**/*.feature'` - runs the complete test suite.
2.	The build result can be seen in GitHub in the pull request/branch and the detailed results can be seen in the [Cypress.io dashboard](https://dashboard.cypress.io/projects/8458bb/runs) or in GitHub Actions, both linked from the pull request/branch checks.

  NOTE: If the tests failed for a reason such as if there is an issue with GitHub or the Cypress dashboard and we need to re-run the run exactly as it was, select `Cancel workflow` in the `Actions` tab and then select `Re-run jobs` -> `Re-run all jobs` from the `Checks` tab.
