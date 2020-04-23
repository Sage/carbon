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

| Term           | Description                                                                    |
|----------------|--------------------------------------------------------------------------------|
| Applitools     | An automated visual UI testing tool                                            |
| canvas         | An area in the preview panel in Storybook                                      |
| CSS            | Cascading Style Sheets, to describe how HTML elements are to be displayed      |
| Cypress        | An open source frontend testing framework                                      |
| Design System  | Guidelines around use, styles, behaviours etc for developing Carbon components |
| knobs          | A means of editing component props dynamically in the Storybook UI             |
| props          | Properties of the component which affect how it appears/behaves when rendered  |
| Storybook      | An open source frontend tool for developing and organising UI components       |

# Summary

The Carbon team would like to use a more rapid and accurate method of regression testing Carbon components to reduce development to release time and enable the regression suite to be run at every commit.

# Motivation

The regression suite uses the [Cypress.io](https://www.cypress.io) framework to test all knob configurations, events and accessibility of all stories of all components in Storybook. In its current form it takes around 2.5 hours to run. When the build itself only takes around 7 minutes, it is disproportionate to have a regression suite for those same components to take that much longer to run by such a huge factor. We require a method by which the visual UI can be tested rapidly, accurately and at every commit to detect regressions earlier.

## Visual Comparison testing
Making assertions of values in the CSS is not the most reliable way to verify the visual styling of the components is correct. In addition, this has been found to be brittle in cases where browser upgrades slightly amend the number of pixels of component dimensions and the test spec is asserting on specific pixel values.

The visual comparison testing tool [Applitools](https://applitools.com) has been under test for some time. It is probably the most mature of this type of tool and is endorsed by prominent members of the testing community. Snapshots of the required screen or frame are taken and compared with baseline snapshots. Any differences that can be detected with the human eye are highlighted as test failures. While we are only currently primarily concerned with testing the components in Chrome, we do have the option with Applitools to render the snapshots of the DOM in almost any other operating system, browser, device and viewport configuration we like by using their Ultrafast Grid. This would give us an early indication of any styling issues with the components in other set ups.

Recently, we have carried out some proof of concept testing of the Carbon components by integrating Applitools with 18 component test feature files from our existing Cypress regression suite. Steps were added into the feature files and relevant support files to enable Applitools to take a snapshot after each test scenario. While we can see that this would be a more accurate way of testing the visual attributes of the components, this activity has highlighted that in its current form, the regression suite with Applitools integration is not a viable option as the vast number of comparisons extend an already lengthy suite. 

## Reformatting of component stories for testing
By presenting the various different pre-set configurations of the components in as few preview frames and stories as possible without the need to set knobs, the tests could run faster while Applitools could take and compare a vastly reduced number of snapshots. This will not impact the ability of our library to showcase to Developers how they can create a beautiful UI in a fast and easy manner with our components.

# Detailed design

To facilitate a change to this method of regression testing, the components will need to be presented differently in Storybook in `.mdx` files with enough possible configurations pre-set in the stories in the `Design System` directory or main component list with few to no knobs to amend to showcase the components. Events should be tested from here where possible. Any further configurations required to completely test the component will be contained in the `Test` directory. This has already been done to some extent for some components e.g. Button in the `Design System` directory

![CARBON](./../../.assets/button_design_system.png)

and the `All Buttons` story for testing purposes

![CARBON](./../../.assets/all_buttons_story.png)

Existing functional or event tests which Cypress is required for will need to be amended to test in the `Docs` tab of the new refactored stories rather than in the `Canvas`. The accessibility tests should not be affected. Any visual verification tests currently done by Cypress alone should be done by Applitools. Any additional cases, such as edge cases, cases that cannot be tested in the component in the `Design System` directory or extended test cases e.g. tests for special characters in labels, should be added in an additional story in the `Test` directory. If all of the configurations can be demonstrated in a single story in the `Test` directory then they should, with visual regression testing run against those stories. We should, however, take care to test only what we deem as bringing value to our regression testing and not have Applitools snapshot everything just because we can.

## Test stories
The visual test stories in Storybook should be minimal with as many configurations of the components as is sensibly possible presented in one frame to reduce the number of snapshots taken by Applitools. Applitools has the ability to knit together snapshots taken of a scrolling page so having a large number of examples for some components in one frame should not pose a problem. An example of a similar method being used for regression testing elsewhere in the industry is in the Material-UI component library which uses Argos rather than Applitools, some results of which can be found here: https://www.argos-ci.com/mui-org/material-ui/builds/294. Taking their Button component snapshot result as an example, their various size configs for primary, secondary, tertiary and icon button types are presented in one shot:

![CARBON](./../../.assets/material-ui-argos-buttons-example.png)

In this example alone, 13 test cases in our current regression suite could be reduced to just 1 snapshot from Applitools.

## Test feature files
Cypress will use the feature files to navigate to each story, as it does currently, but without setting all the configuration via the knobs. A step will be added for Applitools to snapshot the canvas. This will remove the need for the numerous steps taken just to get the component into the pre-requisite state on which to assert. The regression suite could be reduced to one Cypress test file for each component. Any differences between this and the baseline snapshot would comprise a test failure.

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

There are currently around 150 stories (plus 18 for deprecated components although these will disappear at some point). During proof of concept testing, the addition of Applitools to snapshot all test scenarios in the current Button feature file, for example, added 7 seconds to the run time. For most components, there will be less stories required for testing following these changes. Many will require only 1 story. So while the story containing all examples may take longer to open in Storybook and longer for Applitools to scroll and knit the snapshots together, the time taken to run the regression test suite will still be considerably less than that taken for Cypress to run all the visual tests, estimated to be in the order of a few minutes rather than a few hours.

Carbon has many contributors both internal and external to Sage. In order to maintain a second layer of confidence, we will still maintain the existing full Cypress regression suite, albeit refactored and refined, and run it during the nightly Team City process.

# Drawbacks

Introducing another tool to the framework to highlight regressions at every commit requires upskilling and familiarisation for the whole team.

We could encounter many false positives due to the library changing intentionally, which will require investigation of the failures and accepting the new baseline snapshots where required. This will rely on the whole team taking responsibility when their commit has caused a regression test failure not just QA Engineers, although this could be seen as a benefit.

A refactor of the test specs will be required to streamline/combine current tests into a smaller suite. This will be time consuming.

Using visual comparison testing only for regression testing would seem to be solely testing the look and feel of the components, not the functionality. However, the unit tests are testing all the functionality in most cases. Cypress will still be used for events tests even if this results in some duplication with the unit tests to provide an extra layer of confidence.

With some components requiring more stories, this could also result in the components appearing cluttered in the library. Similarly, the preview pane could appear cluttered by having many configurations in one frame. The stories and frames will have to be designed well to ensure this is not the perception. It may also be possible to hide the `Test` directory to keep them entirely out of view.

By having configurations set up already in the stories it removes a lot of the flexibility of testing. The story code would need to be amended to change the state of various props if the required configurations are not already present in the stories. Without the knobs being visible, it may not be immediately clear to a QA Engineer which props the component has which can be amended and thus if all changes to these have been adequately demonstrated. QA Engineers would need to become more technical to enable more detailed examination and understanding of the stories code, although this could be seen as a benefit and is indeed the trend in the frontend testing world.

If we run a visual regression test on a pull request from a 3rd party, they will be able to see the Applitools pass/fail test results but they will not be able to access the URL to the Applitools dashboard to view the full details unless an admin grants them temporary access. Where we are on one hand encouraging collaboration from other areas within Sage and beyond and expecting them to ultimately test their own improvements and fixes, this will limit how far they can test without our assistance. It will require us to grant them access to the Applitools dashboard or investigate and report their visual testing failures on their behalf, delaying completion of their contributions.

# Alternatives

There is some duplication between the Cypress regression tests and the unit tests. Indeed, the act of setting knobs to various states to set a prerequisite state and the result asserted on is already done in many of the unit tests. An exercise to remove duplicate tests in the regression suite could be carried out to speed up the run time. The recent removal of support of the ‘classic’ theme and related feature files reduced the regression suite run time by 1-1.5 hours. We could upgrade our Cypress package to a paid for service or move to the open source OSS plan which would allow the tests to be parallelised rather than them all running in one thread, reducing the run time further. All of these actions though would not reduce the regression suite run time by the required factor nor provide the visual comparison testing capability that Applitools integration would.

One advantage of integrating Applitools is having the option of rendering the DOM snapshots in many other operating system, browser, device and viewport configurations we like by using their Ultrafast Grid. This does not mean though that we are testing our components in these other configurations at the time of test execution. There are other vendors, including CrossBrowserTesting and BrowserStack, which would allow us to run our required tests directly in these other configurations of real machines. However, this would mean a change of automation framework from Cypress to Selenium. This seems like a drastic change at this point as all the files, including the support files like helper files, indexes, locators etc, would need rewriting. In addition, not all of these other products are free for open source repositories as Applitools is and don’t all provide a dashboard which is as user-friendly as that of Applitools.

# Adoption strategy

Developers will need to amend how they write the stories. Examples of various main configurations of the components should be included in one story in the `Design System` directory without any knobs where possible. Existing stories will need to be amended to this format. Other React libraries such as Material-UI (https://material-ui.com) use this method of demonstrating their components. The current standard of documentation in the `Docs` tab will need to be maintained to provide a thorough description of how the component is meant to be used. In addition, these stories will need to be amended where necessary to show events in the `Actions` tab. Developers will need to write one or more additional stories in the `Test` directory for testing purposes presenting as many examples as possible of the components for visual regression purposes. The Cypress tests will need to be compared with the unit tests and, where tests covered by the regression suite can be moved into the unit tests, this should be done. Whilst some duplication will remain where event tests are concerned, we feel it is necessary to have these tests in Cypress too in order to provide a second layer of testing and further confidence that the action triggered by a user is the correct one, so these will remain.

QA Engineers will amend existing specs to leave just the steps to capture snapshots with Applitools for visual verification tests, those testing animations, focus behaviour and events. QA Engineers will need to identify additional scenarios and use cases not testable in the stories in the `Design System` directory or main component list and add them to the stories in the `Test` directory. It would be beneficial if QA Engineers were able to add these themselves with the help of Developers if required.

Applitools can integrate with Jira and automatically log a defect when a test has failed which could be useful and save time with manual intervention, although initial investigation into whether the failure is a valid one should probably be done first so this may not be a feature we could adopt immediately.

# How we teach this

The Testing Strategy `README.md` will be updated with details of this new process. As creating the automation tests now form part of the definition of done for any new components, Developers may need some assistance with understanding how to write the new format of Cypress tests. Support documentation for Applitools is available from https://applitools.com to help with Cypress integration and GitHub. Assistance can also be provided by the Automation Team who have been undertaking the most recent phase of Applitools integration testing with Cypress.

# Unresolved questions

How long will the regression suite take to run with this proposed set up? Until we trial this with a varied selection of components, a more accurate estimate will not be known. However, it is likely to be of the order of a number of minutes rather than hours.

What will the process be for investigating Applitools failures and who will investigate them? The responsibility for quality assurance lies with the whole team, however we have a limit of 3 users for our Applitools account with the current open source license so it may be that in the short term QA Engineers will initially access the dashboard to identify where the test failure is, determine if it is valid then log it as a bug for a developer to investigate. Once we can prove the value of integrating Applitools, we may need to upgrade to an enterprise subscription.
