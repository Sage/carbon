# Getting Started with Playwright

## Contents

- [Installation](#installation)
- [Running Tests](#running-tests)
- [Continuous Integration (CI)](#continuous-integration-ci)
- [Debugging Playwright](#debugging-playwright)

## Installation

Ensure Carbon is first installed on your machine by doing the following:

1. Clone the repository `git clone git@github.com:Sage/carbon.git`.
2. Install with `npm install`.

When running Playwright tests for the first time, you will need to install the required browser binaries:

```shell
npx playwright install
```

## Running Tests

To run the tests locally:

1. Open a new terminal in the root path of the project.
2. To run Playwright using the `playwright` runner, run `npm run test:ct:ui` and then select the required test file. Test results can be seen directly in the Playwright Test Runner UI.
3. To run the suite of Playwright tests in CI mode, run `npm run test:ct`. Test results can be seen in the console run summary. Or could be shown in a separate report by running `npm run test:ct:report`.
4. To run specific Playwright tests at the command line run `npm run test:ct -- ./src/components/[component]/*.pw.tsx`. Test results can be seen in the console run summary.
5. We have specified three browsers to run tests on. So to run Playwright tests in a specific browser run `npm run test:ct -- --project=chromium` or `npm run test:ct -- --project=firefox`. If you want to run Playwright tests on a specific browser using `UI` runner you need to manually select which browser you want to use (or all available in `playwright-ct.config.ts`).

### Accessibility Report

When tests are run, an **Accessibility Report** is automatically generated alongside the standard Playwright test report. This report consolidates all accessibility violations and incomplete checks detected during the test run.

**Accessing the Report:**

- **Locally**: After running `npm run test:ct`, view the report at `playwright/test-report/accessibility-report.html`
- **Via command**: Run `npm run test:ct:report` to open the standard Playwright HTML report. The accessibility report is in the same directory (`playwright/test-report/`)
- **In CI**: The accessibility report is included in the HTML report artifacts uploaded to GitHub Actions

**Report Contents:**

The accessibility report includes:

- **Summary statistics**: Count of incomplete checks and violations by component
- **Filtering**: Search by component name, test name, or issue description; filter by type (incomplete/violation) or severity (critical/serious/moderate/minor)
- **Detailed issue information**: Each issue includes the rule ID, impact level, description, help text, and a link to detailed documentation
- **Affected elements**: For each issue, see which DOM elements are affected with their selectors and HTML
- **Export options**: Download the data as CSV or JSON for bug tracking systems

**Understanding the Results:**

- **Incomplete Checks** (Primary Focus): Accessibility rules that require manual verification because they cannot be fully automated (e.g., color contrast checks that need visual confirmation, ARIA attribute values that need contextual validation). These are displayed as console warnings during local test runs and captured in the report. They do NOT cause test failures but should be reviewed and logged as bugs if needed.
- **Violations**: Accessibility rules that definitively failed automated testing. These WILL cause test failures and must be fixed before merging.

The report is particularly valuable for tracking **incomplete checks** that require manual review by Test Analysts. While tests continue to pass with incomplete checks, the report provides a centralized view for logging and tracking these issues.

> If you use VSCode as your code editor, you can also run tests via the official [Playwright Test for VSCode](https://playwright.dev/docs/getting-started-vscode) extension.

## Continuous Integration (CI)

Every commit/pull request in the repository initiates a Playwright test run using GitHub Actions. This is configured in the `playwright.yml` workflow.

The build result can be seen in GitHub in the pull request/branch and the detailed results can be seen in the GitHub Actions Artifacts.

NOTE: If the tests failed for a reason such as if there is an issue with GitHub, and we need to re-run the run exactly as it was, select `Cancel workflow` in the `Actions` tab and then select `Re-run jobs` -> `Re-run all jobs` from the `Checks` tab.

## Debugging Playwright

Run `npm run test:ct -- --debug`.
