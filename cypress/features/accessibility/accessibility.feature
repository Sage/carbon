Feature: Accessibility tests
  I want to check all components have no violations

  @accessibility
  Scenario Outline: Component <component> page with button
    When I open "<component>" component page with button
      And I open Accessibility Tab
      And I re-run violations tests
    Then "<component>" component has no violations in Accessibility section
    Examples:
      | component           |
      | alert               |
      | sidebar             |

  @accessibility
  Scenario Outline: Component <component> without activation button
    When I open "<component>" component page
      And I open Accessibility Tab
      And I re-run violations tests
    Then "<component>" component has no violations in Accessibility section
    Examples:
      | component            |
      | animated menu button |
      | app wrapper          |
      | button toggle group  |
      | button toggle        |
      | button               |
      | carousel             |
      | checkbox             |
      | configurable-items   |
      | confirm              |
      | content              |
      | create               |
      | date range           |
      | date input           |
      | decimal              |
      | detail               |
      | dialog               |
      | dialog-full-screen   |
      | draggableContext     |
      | dropdownFilterAjax   |
      | dropdown-filter      |
      | dropdown             |
      | fieldset             |
      | filter component     |
      | flash                |
      | form                 |
      | groupedcharacter     |
      | heading              |
      | help                 |
      | i18ncomponent        |
      | icon                 |
      | inlineInputs         |
      | link                 |
      | loader               |
      | menulist             |
      | menu                 |
      | message              |
      | mount-in-app         |
      | multi-action-button  |
      | navigation-bar       |
      | number-input         |
      | pager                |
      | pages                |
      | pill                 |
      | pod                  |
      # portrait component name should be fixed
      | portait              |
      | preview              |
      | profile              |
      | radio-button         |
      | rainbow              |
      | row                  |
      | settingsrow          |
      | simplecolorpicker    |
      | split-button         |
      | step-sequence-item   |
      | step-sequence        |
      | switch               |
      | table-ajax           |
      | table                |
      | tabs                 |
      | textarea             |
      | textbox              |
      | toast                |
