Feature: Accessibility tests - Common list
  I want to check that all components have no violations

  @ignore
  # ignored because of accessibility issues after
  # changing state of components -> FE-2894
  Scenario Outline: Component <component> page with button
    Given I open "<component>" component page with button in noIFrame
    When I open component preview no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component |
      | alert     |
      | sidebar   |

  @accessibility
  Scenario: Component button as a sibling
    When I open "Design System Button Test" component page "as a sibling" in no iframe
    Then "button" component has no accessibility violations

  @ignore
  # ignored because of accessibility issues after
  # changing state of components -> FE-2894
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
      | component           |
      | app wrapper         |
      | button toggle       |
      | carousel            |
      | card                |
      | configurable-items  |
      | content             |
      | detail              |
      | draggableContext    |
      | heading             |
      | help                |
      | i18ncomponent       |
      | icon                |
      | link                |
      | loader              |
      | menulist            |
      | menu                |
      | message             |
      | mount-in-app        |
      | multi-action-button |
      | navigation-bar      |
      | pill                |
      | portrait            |
      | preview             |
      | profile             |
      | row                 |
      | showeditpod         |
      | settingsrow         |
      | split-button        |
      | step-sequence-item  |
      | step-sequence       |
      | table-ajax          |
      | table               |
      | tabs                |
      | tile                |
      | tooltip             |

  @accessibility
  Scenario: Component Menu dark story
    When I open dark theme "Menu" component page in noIFrame
    Then "Menu dark theme" component has no accessibility violations

  @accessibility
  Scenario Outline: Component <component> basic default page
    When I open "<component>" component page "basic" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component |
      | Pod       |