# Getting Started with Cypress

> **DISCLAIMER** - As of 3rd August 2023, we are in the progress of switching test framework for our functional browser tests from [Cypress](https://www.cypress.io/) to [Playwright](https://playwright.dev), so the information in this guide will become obsolete. The latest details of our Playwright setup can be found in our [Testing Guide](../docs/testing-guide.md#functional-browser-testing).

## Contents

- [Installation](#installation)
- [Running Tests](#running-tests)
- [Continuous Integration (CI)](#continuous-integration-ci)

## Installation

We use the [Cypress.io](https://www.cypress.io) testing framework for functional and regression testing. Cypress is already installed in the Carbon project. Clone and install the carbon repository to apply the installation:

1. Clone the carbon repository `git clone git@github.com:Sage/carbon.git`.
2. Install with `npm install`.

## Running Tests

We have implemented a new approach for cypress tests, using cypress-react framework. There is no need to start Storybook for this kind of integration tests. They include the refactored accessibility tests.

### Cypress test suite

1. Open a new terminal in the root path of the project.
2. To run Cypress using the `cypress` runner, run `npx cypress open --component`, select the type Component Testing and then the required test file. Test results can be seen directly in the Cypress Test Runner UI.
3. To run the suite of Cypress tests in CI mode, run `npx cypress run --component`. Test results can be seen in the console run summary.
4. To run specific Cypress tests at the command line (headless browser for continuous integration) run `npx cypress run --component --spec './cypress/components/[component]/*.cy.*'`. Test results can be seen in the console run summary.
5. To run in the Chrome/Firefox browser add `--browser chrome` or `--browser firefox` to the above command.

## Continuous Integration (CI)

Every commit/pull request in the repository initiates a Cypress test run using GitHub Actions. This is configured through the `cypress.yml` workflow.

The full test results for a pull request can be found on GitHub, by going to the CI checks and following the "Details" link for the Cypress tests check.

NOTE: If the tests failed for a reason such as if there is an issue with GitHub or the Cypress dashboard and we need to re-run the run exactly as it was, select `Cancel workflow` in the `Actions` tab and then select `Re-run jobs` -> `Re-run all jobs` from the `Checks` tab.
