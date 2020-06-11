# Getting Started with Cypress
## Contents
[Installation](#installation)

[Running Tests](#running-tests)

[Visual Testing](#visual-testing)

[Continuous Integration (CI)](#continuous-integration)
* [Start Storybook](#start-storybook)
* [Travis](#travis)
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

## Visual Testing
We use [Applitools](https://applitools.com) integrated with Cypress for visual testing. Applitools is already installed in the Carbon project. Visual test results can be seen in the [Applitools dashboard](https://eyes.applitools.com/app/test-results/00000251811810944038/?accountId=MZDiTwN5_kOmMbjBqRi9pw~~).

Instructions to integrate Applitools with GitHub can be found [here](https://applitools.com/docs/topics/integrations/github-integration.html).

Details of how to write Cypress tests, including coding standards and Applitools integration, can be found in the [Carbon Testing Styleguide](../docs/testing-styleguide.md).

## Continuous Integration (CI)
Every commit/pull request in the repository initiates Cypress test runs. Visual regression tests run in Travis. All other regression tests run in GitHub Actions.

### Start Storybook
Storybook must be running before either CI service can run tests. Once it is running, tests in Travis or GitHub Actions can be run.
1.	`npm start` - runs Storybook.
2.	`wait-on http://localhost:9001` - waits until Storybook is up and running and is ready to run tests.

### Travis
1.	`npm run cypress:ci:visual` - runs the complete visual test suite.
2.	The build result can be seen in GitHub in the pull request/branch and the detailed results can be seen in the [Applitools dashboard](https://eyes.applitools.com/app/test-results/00000251811810944038/?accountId=MZDiTwN5_kOmMbjBqRi9pw~~) linked from the pull request/branch checks.

  NOTE: If you need to accept new snapshots to resolve a failing build, once they've been accepted and Saved in Applitools, go to the failed job in the [Travis dashboard](https://travis-ci.org/github/Sage/carbon/builds/) then select `Restart build`.

### GitHub Actions
1.	`npx cypress run --parallel -–record --spec './cypress/features/regression/**/*.feature'` - runs the complete test suite.
2.	The build result can be seen in GitHub in the pull request/branch and the detailed results can be seen in the [Cypress.io dashboard](https://dashboard.cypress.io/projects/8458bb/runs) or in GitHub Actions, both linked from the pull request/branch checks.

  NOTE: If the tests failed for a reason such as if there is an issue with GitHub or the Cypress dashboard and we need to re-run the run exactly as it was, select `Cancel workflow` in the `Actions` tab and then select `Re-run jobs` -> `Re-run all jobs` from the `Checks` tab.
