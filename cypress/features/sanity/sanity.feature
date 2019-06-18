Feature: Sanity tests
  I want to check all components have no violations

  @sanity
  Scenario Outline: Component <component> page with button
    When I open "<component>" component page with button
    Then "<component>" component has no violations in Accessibility section
    Examples:
      | component           |
      | alert               |
      | sidebar             |

  @sanity
  Scenario Outline: Component <component> page and open preview
    When I open "<component>" component page
    Then "<component>" component has no violations in Accessibility section
    Examples:
      | component           | data-component     |
      | dialog-full-screen  | dialog-full-screen |
      | dialog              | dialog             |
      | flash               | flash              |
      | pages               | page               |
      | confirm             | confirm            |

  @sanity
  Scenario Outline: Component <component> without activation button
    When I open "<component>" component page
    Then "<component>" component has no violations in Accessibility section
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
      | decimal              | decimal              |
      | detail               | detail               |
      | draggableContext     | table                |
      | dropdownFilterAjax   | dropdown-filter-ajax |
      | dropdown-filter      | dropdown-filter      |
      | dropdown             | dropdown             |
      | fieldset             | fieldset             |
      | filter component     | filter               |
      | form                 | form                 |
      | groupedcharacter     | grouped-character    |
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
      | number-input         | number               |
      | pager                | pager                |
      | pill                 | pill                 |
      | pod                  | pod                  |
      # portrait component name should be fixed
      | portait              | portrait             |
      | preview              | preview              |
      | profile              | profile              |
      | radio-button         | radio-button         |
      | rainbow              | rainbow              |
      | row                  | row                  |
      | settingsrow          | settings-row         |
      | simplecolorpicker    | simple-color-picker  |
      | split-button         | split-button         |
      | step-sequence-item   | step-sequence-item   |
      | step-sequence        | step-sequence        |
      | switch               | checkbox             |
      | table-ajax           | table-ajax           |
      | table                | table                |
      | tabs                 | tabs                 |
      | textarea             | textarea             |
      | textbox              | textbox              |
      | toast                | toast                |