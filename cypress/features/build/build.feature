Feature: Build tests
  I want to check all components exists

  @build
  Scenario Outline: Component <component> page with button
    When I open "<component>" component page with button
      And I open component preview
    Then "<component>" component is visible
    Examples:
      | component           |
      | alert               |
      | sidebar             |

  @build
  Scenario Outline: Component <component> page and open preview
    When I open "<component>" component page
      And I open component preview
    Then "<data-component>" component is visible
    Examples:
      | component           | data-component     |
      | dialog-full-screen  | dialog-full-screen |
      | dialog              | dialog             |
      | flash               | flash              |
      | pages               | page               |

  @build
  Scenario Outline: Component <component> page and open button
    When I open "<component>" component page
      And I click on a openButton
    Then "<component>" component is visible
    Examples:
      | component         |
      | confirm           |


  @build
  Scenario Outline: Component <component> without activation button
    When I open "<component>" component page
    Then "<data-component>" component is visible
    Examples:
      | component            | data-component       |
      | animated menu button | animated-menu-button |
      | app wrapper          | app-wrapper          |
      # | button toggle group  | button-toggle-group  |  data-component
      # | button toggle        | button-toggle        |  data-component
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
      # | inlineInputs         | inline-inputs        |  data-component
      | link                 | link                 |
      | loader               | loader               |
      | menulist             | menu-list            |
      | menu                 | menu                 |
      | message              | Message              |
      # | mount-in-app         | carbon-mount-in-app  | data-component
      | multi-action-button  | multi-action-button  |
      | navigation-bar       | navigation-bar       |
      | number-input         | number               |
      # | pager                | pager                | data-component
      # | pill                 | pill                 | data-component
      | pod                  | pod                  |
      # portrait component name should be fixed
      | portait              | portrait             |
      | preview              | preview              |
      | profile              | profile              |
      | radio-button         | radio-button         |
      | rainbow              | rainbow              |
      # | row                  | row                  | data-component
      # | settingsrow          | settings-row         | data-component
      | simplecolorpicker    | simple-color-picker  |
      # | split-button         | split-button         | data-component
      # | step-sequence-item   | step-sequence-item   | data-component
      # | step-sequence        | step-sequence        | data-component
      | switch               | checkbox             |
      | table-ajax           | table-ajax           |
      | table                | table                |
      | tabs                 | tabs                 |
      | textarea             | textarea             |
      | textbox              | textbox              |
      | toast                | toast                |