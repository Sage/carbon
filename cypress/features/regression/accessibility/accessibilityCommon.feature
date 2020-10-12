Feature: Accessibility tests - Common list
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Component <component> page auto opened
    Given I open "<component>" component page "default" in no iframe
      And I wait 500
    Then "<component>" component has no accessibility violations
    Examples:
      | component          |
      | alert              |
      | confirm            |
      | dialog             |
      | dialog-full-screen |
      | sidebar            |
    
  @accessibility
  Scenario: Component button toggle
    When I open "Button-Toggle-Group" component page "basic" in no iframe
    Then "Button Toggle Group" component has no accessibility violations

  @ignore
  # ignored because of accessibility issues after
  # changing state of components -> FE-2894
  Scenario Outline: Component <component> page with preview button
    Given I open "<component>" component page "default" in no iframe
    When I open component preview no iframe
    Then "<data-component>" component has no accessibility violations
    Examples:
      | component          |
      | flash              |
      | pages              |

  @accessibility
  Scenario Outline: Component <component> default story
    When I open "<component>" component page in noIFrame
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | button toggle       |
      | carousel            |
      | card                |
      | configurable-items  |
      | content             |
      | draggableContext    |
      | heading             |
      | help                |
      | i18ncomponent       |
      | icon                |
      | link                |
      | loader              |
      | menulist            |
      | message             |
      | mount-in-app        |
      | multi-action-button |
      | pill                |
      | pod                 |
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
      | tooltip             |

 @accessibility
  Scenario Outline: Component <component> default_story
    When I open "<component>" component page "default_story" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component     |
      | AppWrapper    |
      | Detail        |
