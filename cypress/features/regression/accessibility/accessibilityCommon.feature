Feature: Accessibility tests
  I want to check that all components have no violations

  @ignore
  # ignored because of accessibility issues after
  # changing state of components -> https://jira.sage.com/browse/FE-2894
  Scenario Outline: Component <component> page with button
    Given I open "<component>" component page with button in noIFrame
    When I open component preview no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component |
      | alert     |
      | sidebar   |

  @accessibility
  Scenario: Component button as sibling
    When I open Test "button" component page as sibling in no iframe
    Then "button" component has no accessibility violations

  @ignore
  # ignored because of accessibility issues after
  # changing state of components -> https://jira.sage.com/browse/FE-2894
  Scenario Outline: Component <component> page with preview button
    Given I open "<component>" component page in noIFrame
    When I open component preview no iframe
    Then "<data-component>" component has no accessibility violations
    Examples:
      | component          |
      | dialog-full-screen |
      | dialog             |
      | flash              |
      | pages              |
      | confirm            |

  @accessibility
  Scenario Outline: Component <component> default story
    When I open "<component>" component page in noIFrame
    Then "<component>" component has no accessibility violations
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
      | link                             |
      | loader                           |

  @accessibility
  Scenario: Component Button using Knobs story
    When I open Test "Button" component page knobs in noIFrame
    Then "Button" component has no accessibility violations
