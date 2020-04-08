Feature: Accessibility tests
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Component <component> page with button
    Given I open "<component>" component page with button
    When I open Accessibility Tab
    Then "<component>" component has no violations in Accessibility section
    Examples:
      | component |
      | alert     |
      | sidebar   |

  @accessibility
  Scenario: Component button as sibling
    Given I open "button" component page as sibling in no iframe
    When I open Accessibility Tab
    Then "button" component has no violations in Accessibility section

  @accessibility
  Scenario Outline: Component <component> page with preview button
    Given I open "<component>" component page
      And I open component preview
    When I open Accessibility Tab
    Then "<data-component>" component has no violations in Accessibility section
    Examples:
      | component          |
      | dialog-full-screen |
      | dialog             |
      | flash              |
      | pages              |
      | confirm            |

  @accessibility
  Scenario Outline: Component <component> without activation button
    Given I open "<component>" component page
    When I open Accessibility Tab
    Then "<component>" component has no violations in Accessibility section
    Examples:
      | component                        |
      | test-action-popover              |
      | animated menu button             |
      | app wrapper                      |
      | button toggle                    |
      | carousel                         |
      | card                             |
      | experimental-checkbox            |
      | configurable-items               |
      | content                          |
      | create                           |
      | experimental-date-range          |
      | experimental-date-input          |
      | experimental-decimal-input       |
      | detail                           |
      | draggableContext                 |
      | experimental-fieldset            |
      | filter component                 |
      | experimental-form                |
      | heading                          |
      | help                             |
      | i18ncomponent                    |
      | icon                             |
      | inlineInputs                     |
      | link                             |
      | loader                           |
      | menulist                         |
      | menu                             |
      | message                          |
      | mount-in-app                     |
      | multi-action-button              |
      | navigation-bar                   |
      | pager                            |
      | pill                             |
      | pod                              |
      | portrait                         |
      | preview                          |
      | profile                          |
      | experimental-radiobutton         |
      | rainbow                          |
      | row                              |
      | loader                           |
      | showeditpod                      |
      | settingsrow                      |
      | experimental-simple-color-picker |
      | split-button                     |
      | step-sequence-item               |
      | step-sequence                    |
      | experimental-switch              |
      | table-ajax                       |
      | table                            |
      | tabs                             |
      | tile                             |
      | toast                            |
      | tooltip                          |
      | experimental-groupedcharacter    |
      | experimental-number-input        |
      | experimental-select              |
      | experimental-textbox             |
      | experimental-checkbox            |
      | experimental-switch              |
      | experimental-decimal-input       |

  @build
  Scenario: Component Button using Knobs story
    Given I open "Button" component page knobs
    When I open Accessibility Tab
    Then "Button" component has no violations in Accessibility section

  @accessibility
  Scenario Outline: Component <component> basic default page
    Given I open basic Test "<component>" component page
    When I open Accessibility Tab
    Then "<component>" component has no violations in Accessibility section
    Examples:
      | component                | data-component      |
      | Accordion                | accordion           |
      | Anchornavigation         | anchor-navigation   |
      | Badge                    | badge               |
      | Batch Selection          | batch-selection     |
      | Button Toggle Group      | button-toggle-group |
      | duellingpicklist         | duelling-picklist   |
      | Draggable                | draggable           |
      | Flat Table               | flat-table          |
      | Grid                     | grid                |
      | Search                   | search              |
      | Popover Container        | popover-container   |
