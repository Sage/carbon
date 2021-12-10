# Carbon Testing Styleguide
## Follow these guidelines when testing your contributions to the Carbon repository
### Contents
[Introduction](#introduction)

[Unit Testing](#unit-testing)
* [Asserting Styles](#asserting-styles)
* [Snapshots](#snapshots)
* [Continuous Integration (CI)](#continuous-integration)

[Functional Browser Testing](#functional-browser-testing)
[Manual Testing](#manual-testing)
  * [Browser Support](#browser-support)
  * [Jira](#jira)
  * [Storybook](#storybook)
[Automated Testing](#automated-testing)
  * [Cypress File Structure](#cypress-file-structure)
  * [Coding Standards](#coding-standards)
  * [Scenario Tags](#scenario-tags)
  * [Locators](#locators)
    * [How to locate elements](#how-to-locate-elements)
    * [How to name locators](#how-to-name-locators)
  * [Test Results](#test-results)

### Introduction
This testing styleguide is provided to help you test your contributions to the Carbon repository in a way that other developers and testers can understand quickly and easily.

### Unit Testing
We use the [Jest](https://facebook.github.io/jest/) framework for unit testing. We mock and abstract anything that isn't directly encompassed by the unit under test. Unit tests should describe the behaviour of the components rather than describe the implementation to keep the tests clean and reliable. You should write them as atomic and low level as possible to reduce any reliance on other tests or conditions and thus make them less brittle. It also makes them easier to maintain and read. You should write separate test specs for subcomponents from the main component to improve readability and maintainability. It also makes code reviews easier when smaller files are used.

#### Asserting Styles
All branches, paths, props and each of their conditions need to be tested to ensure 100% coverage. Where props are being used to conditionally apply style to a component, we use the assertStyle method to test that all of the CSS properties in the parameters have been applied. For example,

```
describe('FlatTableRow', () => {
  it('then the element should have proper outline when focused', () => {
      assertStyleMatch({
        outline: `2px solid ${baseTheme.colors.focus}`,
        outlineOffset: '-1px'
      }, wrapper, { modifier: ':focus' });
    });
});
```

#### Snapshots
Snapshots render a string output of what the DOM receives. The first time the test is run, a snapshot file is generated and stored in the `__snapshots__` directory within each component in the `/src/components` directory. The next time a test is run, if nothing has changed, the test passes. However, if we change something, the test fails and a diff is indicated in the output. You can update snapshots easily using the `jest -u` command although you must take due care and consideration to ensure the changes are correct before simply updating them.

You should use snapshots in tests if amendments are being made to non-styled components to check styling is applied, but where existing and new styled components are concerned the use of snapshots is left up to the developer to decide if there is value. If you do want to use them, ensure they are small, focussed and effective.

#### Continuous Integration (CI)
GitHub Actions runs unit tests at every commit/push/pull request creation. You can manually run the steps with:
1. `npm run lint` - lints JavaScript.
2. `npm run ts-lint` - lints TypeScript.
3. `npm test` - runs unit tests.
4. Results can be investigated from the terminal or from the GitHub Actions linked from the branch/pull request checks.

### Functional Browser Testing
#### Manual Testing
Every new or amended component should be fully tested in either Storybook and/or [codesandbox.io](https://codesandbox.io) using functional testing, UI testing and internationalization testing techniques. We use [Jira](https://www.atlassian.com/software/jira) for issue and project tracking. 

##### Browser Support
Carbon is supported in the following browsers:
* Chrome
* Firefox
* Safari
* Edge Chromium

Components should be tested in all supported browsers unless the piece of functionality is not specifically related to a UI feature, e.g. adding a data-role prop type.

##### Jira
For every testable task, a test session needs to be created for each of the supported browsers. Results should be added to each of the conditions in the created test sessions with a pass `(/)` or fail `(x)` mark.

Any issues found during testing should be raised as a "Defect" in Jira unless the ticket is already of a “Bug” type, in which case comments and screenshots/recordings/GIFs can be added to the existing ticket.

If the issue is present on the master branch you should first check if the issue has already been logged in GitHub. If it is present, it should be upvoted with a “+1” comment. If it has not been logged, details of how to do this are contained in the [CONTRIBUTING.md](../CONTRIBUTING.md) guide. Collaborators internal to Sage should also log a separate Jira ticket for the issue, not blocking this one, as a "Bug" type with the GitHub issue linked. The Jira ticket number should be included in the GitHub issue, e.g. `FE-1234`, but do not include the full Jira URL.

##### Storybook
Storybook forms our Carbon component library documentation. The component stories are written in `MDX` format containing as many examples as required in set states to showcase our components. Every component should have at least one story (named `default`/`multiple`/`validation` etc.). Where required, it should be possible to test all events, e.g. `onClick`, `drag` etc., in these stories. Results of events tests can be found in the `Actions` tab.

Where the stories in the main documentation directory do not cover all scenarios required to fully test the component, additional stories (named `default`/`grouped`/`styles overridden` etc.) must be created in the `Test` directory. For example, scenarios testing special characters, all combinations of size/type/state etc. should have stories in the `Test` directory under the relevant component. Stories for visual testing should also be located in the `Test` directory and named `visual`. These stories should be written with the components in set states where possible to avoid the use of knobs although they may be required in some cases, like to allow different text strings to be entered for instance. A developer may need to assist with writing the additional required stories here.

To clarify the purpose of each directory,

| Directory     | Usage                                                                    |
| ------------- | ------------------------------------------------------------------------ |
| Design System | User facing documentation, Cypress regression tests                      |
| Test          | Additional stories for Cypress regression tests, visual regression tests |

#### Automated Testing
All regression, accessibility and theme tests are written using the [Cypress.io](https://www.cypress.io) framework with all knob configurations (where applicable) and events tested, along with accessibility via the [Axe](https://chrome.google.com/webstore/detail/axe-web-accessibility-tes/lhdoppojpmngadmnindnejefpokejbdd) add on. Instructions of how to install Cypress can be found in the [Getting Started](../cypress/README.md) guide.

Where functionality is already tested in unit testing, this does not need to be repeated in assertions in Cypress tests, with the exception of events tests which should be repeated here in order to test actions in a manner more closely resembling that of a user in a browser.

[Chromatic](https://www.chromatic.com/builds?appId=5ecf782fe724630022d27d7d) is used to test for visual regressions during each build by comparing snapshots of the storybook canvas with previous baseline snapshots. Chromatic automatically snapshots every story canvas. You should not need to run Chromatic locally.

Chromatic is configured to display each theme side-by-side, you can do this locally by using `STORYBOOK_DEBUG_ALL_THEMES=true npm start`. It is possible to display the components in a column layout by passing `fourColumnLayout` param.

```
<Story name="Example Layout" parameters={{themeSelector: { fourColumnLayout: true }}
  <Component />
</Story>
```

##### Cypress File Structure
```
.
├── cypress
│ ├── fixture
│ │   ├── json files (test data)
│ ├── features
│ │   ├── regression
│ │       ├── accessibility
│ │       ├── themes
│ │       └── common
│ ├── locators
│ │   └── [component-name]
│ │       ├── index.js (exported arrow functions for locators)
│ │       └── locators.js (string const locators)
│ ├── plugins
│ └── support
│     └── step-definitions
│         └── [component-name]-steps.js (files with cucumber steps)
├── .eslintrc.json
├── cypress.env.json
├── cypress.json
├── README.md
└── tsconfig.json
```

##### Coding Standards
Cypress tests are written in Gherkin syntax with Cucumber expressions. Observe the following additional standards:
1.	Use ESlint plugin in Visual Studio Code to make sure code format is preserved.
2.	Use kebab-case for all `*.js` file names.
3.	Use camelCase for `*.feature` file names.
4.	Use Gherkin syntax keywords in feature files:
  * GIVEN - the Given part describes the state of the world before you begin the behaviour you are specifying in this scenario. You can think of it as the pre-conditions to the test;
  * WHEN - the When section is the behaviour that you are specifying which is under test. All the actions you need to perform before making an assertion;
  * THEN - the Then section describes the changes you expect due to the specified behaviour. Regular assertion;
  * AND - use this to avoid duplication of the keywords (Given/When/Then). Each of the sections could have their own AND state. Indent AND lines under the previous Given/When/Then keyword by two spaces;
  * Scenario outline - tests that are using parameters from given `Examples` under the test and will run as many times as there are examples;
  * Scenario - tests that are run once.
5.	Write step definitions using Cucumber expressions to link to the Gherkin feature files:
  * Step definitions are created per component as `component-steps.js` files and stored in `carbon/cypress/support/step-definitions`. They should follow the `component.feature` files exactly;
  * Common steps (`common-steps.js`) are used for all common actions.

Some common test steps:
  * I open `<story name>` `<component name>` component with `<dedicated json file>` json from `<directory to take json from>` using `<object name in json>` object name
  * I open `<name>` component page `<story name>`;
 

##### Scenario tags
Test scenarios in feature files can be tagged to enable a subset of scenarios to be run, ignored or identified in some manner. Use the following tags:

1.	`@positive` for a happy path.
2.	`@negative` for the negative scenario.
3.	`@ignore` for temporarily ignored scenarios.
4.	`@[bug-number]` for example `@FE-1234` - use this tag after @ignore to explain why the test is ignored.
5.	`@ignore` and `@[bug-number]` should be removed after the bug fix.
6.	`@accessibility` tests verify accessibility violations.
7.	`@themes` tests verify theme colouristics.

Additional tags can be used to indicate other components/features are linked/dependent on this one.

A basic feature file would resemble this example:
```
Feature: Button component
  I want to check Button component properties

  Background: Open Button component default page
    Given I open "Button" component page knobs

  @positive
  Scenario Outline: Set Button size to <size>
    When I select size to "<size>"
    Then Button height is "<height>"
    Examples:
      | size   | height |
      | small  | 32     |
      | medium | 40     |
      | large  | 48     |

  @positive 
  Scenario: Verify the click function for a Button component
    When I click on "button"
    Then click action was called in Actions Tab
```

##### Locators
Moving element locators into locator files make the step definition files easier to read. Step definition files call `index.js` files. `index.js` files contain exported arrow functions for locators. They import information from `locator.js` files. `locator.js` files contain constant string selectors for locating elements.

Each component has their own `index.js` and `locators.js` files stored in `carbon/cypress/locators/component-name` unless the locators are common to more than one component/element/story, in which case they are contained in `carbon/cypress/locators`.

###### How to locate elements:
Always use unique selectors to locate elements with the order below:
1.	`[data-component="unique-tag"]` for component and `[data-element="unique-tag"]` for component's element
2.	`#id`
3.	`.class-name`

###### How to name locators:
*  Component on preview - `componentPreview`
*  Knobs - `componentKnobs`

An example of an `index.js` file:
```
import { BUTTON_SUBTEXT_PREVIEW, BUTTON_DATA_COMPONENT_PREVIEW } from './locators';

// component preview locators
export const buttonSubtextPreview = () => cy.get(BUTTON_SUBTEXT_PREVIEW);
export const buttonDataComponent = () => cy.get(BUTTON_DATA_COMPONENT_PREVIEW);
```

An example of a corresponding `locators.js` file:

```
// component preview locators
export const BUTTON_SUBTEXT_PREVIEW = '[data-element="subtext"]';
export const BUTTON_DATA_COMPONENT_PREVIEW = '[data-component="button"]';
```

Other support files include the `helper.js` file which contains functions such as that used to prepare the URL of the component page and the control of draggable components.


##### Test Results
Depending on how Cypress was run, you will find test results in either the Cypress Test Runner UI, the console or in GitHub Actions linked from the build checks in GitHub. For further information see the [Getting Started Guide](../cypress/README.md).