Feature: Accessibility tests
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Component <component> page with button
    Given I open "<component>" component page with button
    When I open Accessibility Tab
    Then "<component>" component has no violations in Accessibility section
    Examples:
      | component |
      | alert     |
      | sidebar   |

  @accessibility
  Scenario: Component button as sibling
    Given I open "button" component page as sibling in no iframe
    When I open Accessibility Tab
    Then "button" component has no violations in Accessibility section

  @accessibility
  Scenario Outline: Component <component> page with preview button
    Given I open "<component>" component page
      And I open component preview
    When I open Accessibility Tab
    Then "<data-component>" component has no violations in Accessibility section
    Examples:
      | component          |
      | dialog-full-screen |
      | dialog             |
      | flash              |
      | pages              |
      | confirm            |

  @accessibility
  Scenario Outline: Component <component> without activation button
    Given I open "<component>" component page
    When I open Accessibility Tab
    Then "<component>" component has no violations in Accessibility section
    Examples:
      | component                        |
      | test-action-popover              |
      | animated menu button             |
      | app wrapper                      |
      | button toggle                    |
      | carousel                         |
      | card                             |
      | configurable-items               |
      | content                          |
      | create                           |
      | detail                           |
      | draggableContext                 |
      | filter component                 |
      | heading                          |
      | help                             |
      | i18ncomponent                    |
      | icon                             |
      | inlineInputs                     |
      | link                             |
      | loader                           |

  @accessibility
  Scenario: Component Button using Knobs story
    Given I open "Button" component page knobs
    When I open Accessibility Tab
    Then "Button" component has no violations in Accessibility section