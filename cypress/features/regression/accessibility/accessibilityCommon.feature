Feature: Accessibility tests - Common list
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Component <component> default story
    Given I open "<component>" component page "default story" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component          |
      | AppWrapper         |
      | alert              |
      | confirm            |
      | Detail             |
      | dialog             |
      | dialog-full-screen |
      | Heading            |
      | Help               |
      | I18nComponent      |
      | Link               |
      | message            |
      | MenuList           |
      | Mount In App       |
      # | Pages             |
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
      | component |
      | flash     |

  @accessibility
  Scenario Outline: Component <component> default story
    When I open "<component>" component page "default" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | carousel            |
      | card                |
      | configurable-items  |
      | content             |
      | draggableContext    |
      | multi-action-button |
      | portrait            |
      | preview             |
      | profile             |
      | row                 |
      | settingsrow         |
      | split-button        |
      | table-ajax          |
      | table               |

  @accessibility
  Scenario Outline: Component <component> basic story
    When I open "<component>" component page "basic" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component     |
      | showeditpod   |
      | step-sequence |
      | icon          |
      | button toggle |

  @accessibility
  Scenario: Component Tooltip default story
    When I open "Tooltip Test" component page "default" in no iframe
    Then "Tooltip Test default story" component has no accessibility violations