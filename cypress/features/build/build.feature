Feature: Build tests
  I want to check all components exists

  @build
  Scenario Outline: Component <component> page with button
    When I open "<component>" component with button page in iframe
      And I open component preview no iframe
    Then "<component>" component is visible
    Examples:
      | component |
      | alert     |
      | sidebar   |

  @build
  Scenario Outline: Component <component> page and open preview
    When I open "<component>" component iframe
      And I open component preview no iframe
    Then "<data-component>" component is visible
    Examples:
      | component          | data-component     |
      | dialog-full-screen | dialog-full-screen |
      | dialog             | dialog             |
      | flash              | flash              |
      | pages              | page               |
      | confirm            | confirm            |

  @build
  Scenario Outline: Component <component> without activation button
    When I open "<component>" component iframe
    Then "<data-component>" component is visible
    Examples:
      | component            | data-component       |
      | animated menu button | animated-menu-button |
      | app wrapper          | app-wrapper          |
      | button toggle group  | button-toggle-group  |
      | button toggle        | button-toggle        |
      | button               | button               |
      | carousel             | carousel             |
      | checkbox             | checkbox             |
      | configurable-items   | configurable-items   |
      | content              | content              |
      | create               | link                 |
      | date range           | date-range           |
      | date input           | date                 |
      | detail               | detail               |
      | draggableContext     | table                |
      | dropdownFilterAjax   | dropdown-filter-ajax |
      | dropdown-filter      | dropdown-filter      |
      | dropdown             | dropdown             |
      | filter component     | filter               |
      | form                 | form                 |
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
      | radio-button         | radio-button         |
      | rainbow              | rainbow              |
      | row                  | row                  |
      # | select               | select               | Commented until select will be merged-out from experimental
      | settingsrow          | settings-row         |
      | simplecolorpicker    | simple-color-picker  |
      | split-button         | split-button         |
      | step-sequence-item   | step-sequence-item   |
      | step-sequence        | step-sequence        |
      | switch               | checkbox             |
      | table-ajax           | table-ajax           |
      | table                | table                |
      | tabs                 | tabs                 |
      | toast                | toast                |

  @build
  Scenario Outline: Deprecated component <component> iframe
    When I open deprecated "<component>" component iframe
    Then "<component>" component is visible
    Examples:
      | component        |
      | textbox          |
      | textarea         |
      | number-input     |
      | decimal          |
      | fieldset         |
      | groupedcharacter |
