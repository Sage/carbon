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
  Scenario: Component button as sibling
    When I open "button" component page as sibling in iframe
    Then "button" component is visible

  @build
  Scenario Outline: Component <component> page and open preview
    When I open "<component>" component iframe
      And I open component preview no iframe
    Then "<data-component>" component is visible
    Examples:
      | component           | data-component     |
      | dialog-full-screen  | dialog-full-screen |
      | dialog              | dialog             |
      | flash               | toast              |
      | pages               | page               |
      | confirm             | confirm            |

  @build
  Scenario Outline: Component <component> without activation button
    When I open "<component>" component iframe
    Then "<data-component>" component is visible
    Examples:
      | component            | data-component       |
      | action-popover       | action-popover       |
      | animated menu button | animated-menu-button |
      | app wrapper          | app-wrapper          |
      | button toggle group  | button-toggle-group  |
      | button toggle        | button-toggle        |
      | button               | button               |
      | carousel             | carousel             |
      | card                 | card                 |
      # | checkbox             | checkbox             | Commented until checkbox will be merged-out from experimental
      | configurable-items   | configurable-items   |
      | content              | content              |
      | create               | link                 |
      # | date range           | date-range           | Commented until date-range will be merged-out from experimental
      # | date input           | date                 | Commented until date input will be merged-out from experimental
      # | decimal              | decimal              | Commented until decimal will be merged-out from experimental
      | detail               | detail               |
      | draggableContext     | table                |
      # | fieldset             | fieldset             | Commented until fieldset will be merged-out from experimental
      | filter component     | filter               |
      # | form                 | form                 | Commented until form will be merged-out from experimental
      # | groupedcharacter     | grouped-character    | Commented until grouped-character will be merged-out from experimental
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
      # | number-input         | number               | Commented until number-input will be merged-out from experimental
      | pager                | pager                |
      | pill                 | pill                 |
      | portrait             | portrait             |
      | preview              | preview              |
      | profile              | profile              |
      # | radio-button         | radio-button         | Commented until radio-button will be merged-out from experimental
      | rainbow              | rainbow              |
      | row                  | row                  |
      # | select               | select               | Commented until select will be merged-out from experimental
      | settingsrow          | settings-row         |
      # | simple-color-picker  | simple-color-picker  | Commented until simple-color-picker will be merged-out from experimental
      | split-button         | split-button         |
      | step-sequence-item   | step-sequence-item   |
      | step-sequence        | step-sequence        |
      # | switch               | checkbox             | Commented until switch will be merged-out from experimental
      | table-ajax           | table-ajax           |
      | table                | table                |
      | tabs                 | tabs                 |
      # | textarea             | textarea             | Commented until textarea will be merged-out from experimental
      # | textbox              | textbox              | Commented until textbox will be merged-out from experimental
      | tile                 | tile                 |
      | toast                | toast                |