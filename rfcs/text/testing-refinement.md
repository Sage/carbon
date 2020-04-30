- Start Date: 2020-03-31


# Table of contents

- [Table of contents](#table-of-contents)
- [Glossary](#glossary)
- [Summary](#summary)
- [Motivation](#motivation)
  - [Visual Comparison testing](#visual-comparison-testing)
  - [Reformatting of component stories for testing](#reformatting-of-component-stories-for-testing)
- [Detailed design](#detailed-design)
  - [Test stories](#test-stories)
  - [Test feature files](#test-feature-files)
- [Drawbacks](#drawbacks)
- [Alternatives](#alternatives)
- [Adoption strategy](#adoption-strategy)
- [How we teach this](#how-we-teach-this)
- [Unresolved questions](#unresolved-questions)


# Glossary

| Term          | Description                                                                       |
|---------------|-----------------------------------------------------------------------------------|
| Actions       | The feedback tab in Storybook showing events performed on interactive components  |  
| Applitools    | An automated visual UI testing tool                                               |
| Canvas        | The component development environment tab in the preview panel in Storybook       |
| CSS           | Cascading Style Sheets, to describe how HTML elements are to be displayed         |
| Cypress       | An open source frontend testing framework                                         |
| Design System | Guidelines around use, styles, behaviours etc for developing Carbon components    |
| Docs          | The component documentation tab in the preview panel in Storybook                 |
| Knobs         | A means of editing component props dynamically in the Storybook UI                |
| MDX           | An authorable format that allows JavaScript components to be embedded in Markdown |
| Props         | Properties of the component which affect how it appears/behaves when rendered     |
| Storybook     | An open source frontend tool for developing and organising UI components          |

# Summary

The Carbon team would like to use a more rapid and accurate method of regression testing Carbon components functionally and visually to reduce development to release time and enable the regression suite to be run at every commit.

# Motivation

The regression suite uses the [Cypress.io](https://www.cypress.io) framework to test all knob configurations, events and accessibility of all stories of all components in Storybook. Following a recent move to the [Cypress OSS plan](https://www.cypress.io/oss-plan/) using the [GitHub Actions](https://github.com/features/actions) CI, the full regression suite now only takes around 10 minutes to run. However, these vast improvements to the run time don't provide us with accurate visual assertions.

Making assertions of values in the CSS is not the most reliable way to verify the visual styling of the components is correct. In addition, this has been found to be brittle in cases where browser upgrades slightly amend the number of pixels of component dimensions and the test spec is asserting on specific pixel values. We require a complete solution including rapid and accurate visual UI testing at every commit to detect regressions earlier.

## Visual Comparison testing
The visual comparison testing tool [Applitools](https://applitools.com) has been under test for some time. It is probably the most mature of this type of tool and is endorsed by prominent members of the testing community. Snapshots of the required screen or frame are taken and compared with baseline snapshots. Any differences that can be detected with the human eye are highlighted as test failures. While we are only currently primarily concerned with testing the components in Chrome, we have the option with Applitools to render the snapshots of the DOM in almost any other operating system, browser, device and viewport configuration we like by using their Ultrafast Grid. This would give us an early indication of any styling issues with the components in other set ups.

Recently, we have carried out some proof of concept testing of the Carbon components by integrating Applitools with 18 component test feature files from our existing Cypress regression suite. Steps were added into the feature files and relevant support files to enable Applitools to take a snapshot after each test scenario. While we can see that this would be a more accurate way of testing the visual attributes of the components, this activity has highlighted that in its current form, the regression suite with Applitools integration is not a viable option as the vast number of comparisons would extend an already lengthy suite. 

## Reformatting of component stories for testing
By presenting the various different pre-set configurations of the components in as few preview frames and stories as possible without the need to set knobs, the tests could run faster while Applitools could take and compare a vastly reduced number of snapshots. This will not impact the ability of our library to showcase to Developers how they can create a beautiful UI in a fast and easy manner with our components.

# Detailed design

To facilitate a change to this method of regression testing, the components will need to be presented in Storybook using `MDX` with enough possible configurations pre-set in the stories in the `Design System` directory or main component list with few to no knobs to amend to showcase the components. Any new or refactored components should be tested in the `Docs` tab as there should be more examples here in one page for Applitools to snapshot. Events should also be tested in stories from here where possible. Any further configurations required to completely test the component will be contained in the `Test` directory. This has already been done to some extent for some components e.g. Button in the `Design System` directory

![CARBON](./../../.assets/button_design_system.png)

and the `All Buttons` story for testing purposes

![CARBON](./../../.assets/all_buttons_story.png)

Existing functional or event tests can continue to be tested in the `Canvas` unless it will be faster to test in one page in the `Docs` tab. The accessibility tests should not be affected. Any visual verification tests currently done by Cypress alone should be done by Applitools. Any additional cases, such as edge cases, cases that cannot be tested in the component in the `Design System` directory or extended test cases e.g. tests for special characters in labels that we do not want to show in our documentation, should be added in an additional story in the `Test` directory. If all of the configurations can be demonstrated in a single story in the `Test` directory like the 'All Buttons' story then they should, with visual regression testing run against those stories. We should, however, take care to test only what we deem as bringing value to our regression testing and not have Applitools snapshot everything just because we can.

## Test stories
The visual test stories in Storybook should be minimal with as many configurations of the components as is sensibly possible presented in one frame to reduce the number of snapshots taken by Applitools. Applitools has the ability to knit together snapshots taken of a scrolling page so having a large number of examples for some components in one frame should not pose a problem. An example of a similar method being used for regression testing elsewhere in the industry is in the Material-UI component library which uses Argos rather than Applitools, some results of which can be found here: https://www.argos-ci.com/mui-org/material-ui/builds/294. Taking their Button component snapshot result as an example, their various size configs for primary, secondary, tertiary and icon button types are presented in one shot:

![CARBON](./../../.assets/material-ui-argos-buttons-example.png)

In this example, 13 test scenarios in our current format could be reduced to just 1 snapshot from Applitools.

## Test feature files
Cypress will use the feature files to navigate to each story, as it does currently, but without setting all the configuration via the knobs. A step will be added for Applitools to snapshot the preview panel. Any differences between this and the baseline snapshot would comprise a test failure. This will remove the need for the numerous steps taken just to get the component into the pre-requisite state on which to assert.

We should add further '@' tags in the feature files to identify those tests to be included in a smoke test and those containing, or are linked with, particular components or area of functionality. This will provide the ability for Developers to run a targetted subset of tests when required rather than the full regression suite which will further speed up the time from development to release.

The test feature file for Button could be reduced to something like:

```
Feature: Button component
  I want to check Button component properties

  Background: Open Button component default page
    Given I open "Button" component page
  
  @applitools @button @dialog
  Scenario: Verify Button is presented correctly
    # commented because of BDD default scenario Given - When - Then
    # When I open "Button" component page
    Then Button is presented correctly

  @button @dialog
  Scenario: Verify the click function for a Button component
    Given clear all actions in Actions Tab
    When I click on "button"
    Then click action was called in Actions Tab
```    

The step “Then Button is presented correctly” is where Applitools will take the snapshot. The existing accessibility and build test feature files could remain as they are. 

There are currently around 150 stories (plus 18 for deprecated components although these will disappear at some point). During proof of concept testing, the addition of Applitools to snapshot all test scenarios in the current Button feature file, for example, added 7 seconds to the run time. For most components, there will be less stories required for testing following these changes. Many will require only 1 story. So while the story containing all examples may take longer to open in Storybook and longer for Applitools to scroll and knit the snapshots together, the time taken to run the regression test suite will still be less than that taken for Cypress to run all the visual tests.

# Drawbacks

Introducing another tool to the framework to highlight regressions at every commit requires upskilling and familiarisation for the whole team.

We could encounter many false positives due to the library changing intentionally, which will require investigation of the failures and accepting the new baseline snapshots where required. This will rely on the whole team taking responsibility when their commit has caused a regression test failure not just QA Engineers, although this could be seen as a benefit.

A refactor of the test specs will be required to streamline/combine current tests into a smaller suite. This will be time consuming.

With some components requiring more stories to avoid the use of knobs, this could result in the components appearing cluttered in the library. Similarly, in those stories where the maximum number of examples is shown, the preview pane could appear cluttered by having many configurations in one frame. The stories and frames will have to be designed well to ensure this is not the perception. It may also be possible to hide the `Test` directory to keep them entirely out of view.

By having configurations set up already in the stories it removes a lot of the flexibility of testing. The story code would need to be amended to change the state of various props if the required configurations are not already present in the stories. Without the knobs being visible, it may not be immediately clear to a QA Engineer which props the component has which can be amended and thus if all changes to these have been adequately demonstrated. QA Engineers would need to become more technical to enable more detailed examination and understanding of the stories code, although this could be seen as a benefit and is indeed the trend in the frontend testing world.

If we run a visual regression test on a pull request from a 3rd party, they will be able to see the Applitools pass/fail test results but they will not be able to access the URL to the Applitools dashboard to view the full details unless an admin grants them temporary access. Where we are on one hand encouraging collaboration from other areas within Sage and beyond and expecting them to ultimately test their own improvements and fixes, this will limit how far they can test without our assistance. It will require us to grant them access to the Applitools dashboard or investigate and report their visual testing failures on their behalf, delaying completion of their contributions.

# Alternatives

One advantage of integrating Applitools is having the option of rendering the DOM snapshots in many other operating system, browser, device and viewport configurations we like by using their Ultrafast Grid. This does not mean though that we are testing our components in these other configurations at the time of test execution. There are other vendors, including CrossBrowserTesting and BrowserStack, which would allow us to run our required tests directly in these other configurations of real machines. However, this would mean a change of automation framework from Cypress to Selenium. This seems like a drastic change at this point as all the files, including the support files like helper files, indexes, locators etc, would need rewriting. In addition, not all of these other products are free for open source repositories as Applitools is and don’t all provide a dashboard which is as user-friendly as that of Applitools.

# Adoption strategy

Developers will need to amend how they write the stories. Examples of various main configurations of all components should be included in one story in the `Design System` directory without any knobs where possible. Existing stories will need to be amended to this format. Other React libraries such as Material-UI (https://material-ui.com) use this method of demonstrating their components. The current standard of documentation in the `Docs` tab will need to be maintained to provide a thorough description of how the component is meant to be used. In addition, these stories will need to be amended where necessary to show events in the `Actions` tab and the relevant test files updating as a result. Developers may need to write one or more additional stories in the `Test` directory presenting as many examples as possible of the components for visual regression purposes if they can't be fully tested in the `Design System` directory.

The Cypress tests will need to be compared with the unit tests and, where tests covered by the regression suite can be moved into the unit tests, this should be done. Whilst some duplication will remain where event tests are concerned, we feel it is necessary to have these tests in Cypress too in order to provide a second layer of testing and further confidence that the action triggered by a user is the correct one, so these will remain.

QA Engineers will amend existing specs to leave just the steps to capture snapshots with Applitools for visual verification tests, those testing animations, focus behaviour and events. QA Engineers will need to identify additional scenarios and use cases not testable in the stories in the `Design System` directory and add them to the stories in the `Test` directory. It would be beneficial if QA Engineers were able to add these themselves with the help of Developers only if required.

To clarify the purpose of each directory,

| Directory     | Usage                                                                    |
|---------------|--------------------------------------------------------------------------|
| Design System | User facing documentation, primary visual regression tests               |
| Test          | Additional stories for Cypress tests, additional visual regression tests |

Applitools can integrate with Jira and automatically log a defect when a test has failed which could be useful and save time with manual intervention, although initial investigation into whether the failure is a valid one should probably be done first so this may not be a feature we could adopt immediately.

# How we teach this

The Testing Strategy [README.md](https://github.com/Sage/carbon/blob/master/cypress/README.md) file will be updated with details of this new process, as will the [CONTRIBUTING.md](https://github.com/Sage/carbon/blob/master/CONTRIBUTING.md) file to clarify to any contributors what testing should be done where and when.

As creating the automation tests now form part of the definition of done for any new components, Developers may need some assistance with understanding how to write the new format of Cypress tests. Support documentation for Applitools is available from https://applitools.com to help with Cypress integration and GitHub. Assistance can also be provided by the Automation Team who have been undertaking the most recent phase of Applitools integration testing with Cypress.

# Unresolved questions

How long will the regression suite take to run with this proposed set up? Until we trial this with refactored stories of a varied selection of components, a more accurate estimate will not be known. However, it is likely to be of the order of a number of minutes.

What will the process be for investigating Applitools failures and who will investigate them? The responsibility for quality assurance lies with the whole team. The user limit on our Applitools account with the current open source license has been increased to allow all members of the team access therefore anyone can access the dashboard to identify where the test failure is, determine if it is valid then either fix it themselves or log it as a bug for a Developer to investigate.
