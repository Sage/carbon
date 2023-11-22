# Getting Started with Playwright

## Contents

- [Installation](#installation)
- [Running Tests](#running-tests)
- [Continuous Integration (CI)](#continuous-integration-ci)
- [Debugging playwright](#debugging-playwright)

## Installation

We are planning to use [Playwright](https://playwright.dev) testing framework for functional and regression testing. Playwright is already installed in the Carbon project. Clone and install the carbon repository to apply the installation:

1. Clone the carbon repository `git clone git@github.com:Sage/carbon.git`.
2. Install with `npm install`.
3. Also (for the first time) we would need to install browser using `npx playwright install`;

## Running Tests

We are refactoring cypress tests to playwright tests, using `playwright-react17` component framework. There is no need to start Storybook for this kind of integration tests. They include the refactored accessibility tests.

To run the tests locally:

1. Open a new terminal in the root path of the project.
2. To run Playwright using the `playwright` runner, run `npm run test:ct:ui` and then select the required test file. Test results can be seen directly in the Playwright Test Runner UI.
3. To run the suite of Playwright tests in CI mode, run `npm run test:ct`. Test results can be seen in the console run summary. Or could be shown in a separate report by running `npm run test:ct:report`.
4. To run specific Playwright test at the command line run `npm run test:ct -- ./src/components/[component]/*.pw.tsx`. Test results can be seen in the console run summary.
5. We have specified three browsers to run tests on. So to run Playwright tests in a specific browser run `npm run test:ct -- --project=chromium` or `npm run test:ct -- --project=firefox`. If you want to run Playwright tests on a specific browser using `UI` runner you need manually select which browser you want to use (or all available in `playwright-ct.config.ts`).

> If you use VSCode as your code editor, you can also run tests via the official [Playwright Test for VSCode](https://playwright.dev/docs/getting-started-vscode) extension.

## Continuous Integration (CI)

Every commit/pull request in the repository initiates a Playwright test run using GitHub Actions. This is configured in the `playwright.yml` workflow.

The build result can be seen in GitHub in the pull request/branch and the detailed results can be seen in the GitHub Actions Artifacts.

NOTE: If the tests failed for a reason such as if there is an issue with GitHub and we need to re-run the run exactly as it was, select `Cancel workflow` in the `Actions` tab and then select `Re-run jobs` -> `Re-run all jobs` from the `Checks` tab.

## Debugging Playwright

Run `npm run test:ct -- --debug`.
