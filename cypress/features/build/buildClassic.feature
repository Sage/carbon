Feature: Build tests for classic stories
  I want to check all components exists for classic stories

  @build
  Scenario Outline: Component <component> classic page with button
    When I open "<component>" component for classic story with button page in iframe
      And I open component preview no iframe
    Then "<component>" component is visible
    Examples:
      | component           |
      | alert               |
      | sidebar             |

  @build
  Scenario: Component button classic page as sibling
    When I open "button" component for classic story as sibling in iframe
    Then "button" component is visible

  @build
  Scenario Outline: Component <component> classic page and open preview
    When I open "<component>" component for classic story in iframe
      And I open component preview no iframe
    Then "<data-component>" component is visible
    Examples:
      | component           | data-component     |
      | dialog-full-screen  | dialog-full-screen |
      | dialog              | dialog             |
      | flash               | flash              |
      | pages               | page               |
      | confirm             | confirm            |

  @build
  Scenario Outline: Component <component> classic page without activation button
    When I open "<component>" component for classic story in iframe
    Then "<data-component>" component is visible
    Examples:
      | component            | data-component       |
      | action popover       | action-popover       |
      | animated menu button | animated-menu-button |
      | app wrapper          | app-wrapper          |
      | button toggle group  | button-toggle-group  |
      | button toggle        | button-toggle        |
      | button               | button               |
      | carousel             | carousel             |
      | configurable-items   | configurable-items   |
      | content              | content              |
      | create               | link                 |
      | detail               | detail               |
      | draggableContext     | table                |
      | filter component     | filter               |
      | heading              | heading              |
      | help                 | help                 |
      | i18ncomponent        | i18n                 |
      | icon                 | icon                 |
      | inlineInputs         | inline-inputs        |
      | link                 | link                 |
      | loader               | loader               |
      | menulist             | menu-list            |
      | menu                 | menu                 |
      | message              | Message              |
      | mount-in-app         | mount-in-app         |
      | multi-action-button  | multi-action-button  |
      | navigation-bar       | navigation-bar       |
      | pager                | pager                |
      | pill                 | pill                 |
      | pod                  | pod                  |
      | portrait             | portrait             |
      | preview              | preview              |
      | profile              | profile              |
      | rainbow              | rainbow              |
      | row                  | row                  |
      | settingsrow          | settings-row         |
      | split-button         | split-button         |
      | step-sequence-item   | step-sequence-item   |
      | step-sequence        | step-sequence        |
      | table-ajax           | table-ajax           |
      | table                | table                |
      | tabs                 | tabs                 |
      | toast                | toast                |

  @build
  Scenario Outline: Deprecated component <component> iframe
    When I open deprecated "<component>" component iframe
    Then "<data-component>" component is visible
    Examples:
      | component            | data-component      |
      | checkbox             | checkbox            |
      | date input           | date                |
      | date range           | date-range          |
      | decimal              | decimal             |
      | dropdownFilterAjax   | dropdown-filter-ajax|
      | dropdown-filter      | dropdown-filter     |
      | dropdown             | dropdown            |
      | fieldset             | fieldset            |
      | form                 | form                |
      | groupedcharacter     | grouped-character   |
      | number-input         | number              |
      | radio-button         | radio-button        |
      | simplecolorpicker    | simple-color-picker |
      | switch               | checkbox            |
      | textarea             | textarea            |
      | textbox              | textbox             |
