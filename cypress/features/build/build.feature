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
    When I open "<component>" component in iframe
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
    When I open "<component>" component in iframe
    Then "<data-component>" component is visible
    Examples:
      | component                        | data-component       |
      | action-popover                   | action-popover       |
      | animated menu button             | animated-menu-button |
      | app wrapper                      | app-wrapper          |
      | button toggle group              | button-toggle-group  |
      | button toggle                    | button-toggle        |
      | button                           | button               |
      | carousel                         | carousel             |
      | card                             | card                 |
      | experimental-checkbox            | checkbox             |
      | configurable-items               | configurable-items   |
      | content                          | content              |
      | create                           | link                 |
      | experimental-date-range          | date-range           |
      | experimental-date-input          | date                 |
      | experimental-decimal-input       | decimal              |
      | detail                           | detail               |
      | draggableContext                 | table                |
      | experimental-fieldset            | fieldset             |
      | filter component                 | filter               |
      | experimental-form                | form                 |
      | heading                          | heading              |
      | help                             | help                 |
      | i18ncomponent                    | i18n                 |
      | icon                             | icon                 |
      | inlineInputs                     | inline-inputs        |
      | link                             | link                 |
      | loader                           | loader               |
      | menulist                         | menu-list            |
      | menu                             | menu                 |
      | message                          | Message              |
      | mount-in-app                     | mount-in-app         |
      | multi-action-button              | multi-action-button  |
      | navigation-bar                   | navigation-bar       |
      | pager                            | pager                |
      | pill                             | pill                 |
      | pod                              | pod                  |
      | portrait                         | portrait             |
      | preview                          | preview              |
      | profile                          | profile              |
      | experimental-radiobutton         | radio-button         |
      | rainbow                          | rainbow              |
      | row                              | row                  |
      | showeditpod                      | pod                  |
      | settingsrow                      | settings-row         |
      | experimental-simple-color-picker | simple-color-picker  |
      | split-button                     | split-button         |
      | step-sequence-item               | step-sequence-item   |
      | step-sequence                    | step-sequence        |
      | experimental-switch              | Switch               |
      | table-ajax                       | table-ajax           |
      | table                            | table                |
      | tabs                             | tabs                 |
      | tile                             | tile                 |
      | toast                            | toast                |
      | tooltip                          | tooltip              |

  @build
  Scenario Outline: Verify element in <component> component default page
    When I open "<component>" component in iframe
    Then "<data-element>" element is visible
    Examples:
      | component                     | data-element |
      | experimental-groupedcharacter | input        |
      | experimental-number-input     | input        |
      | experimental-select           | input        |
      | experimental-textbox          | input        |

  @build
  Scenario: Verify element by name in experimental-textarea component default page
    When I open "experimental-textarea" component in iframe
    Then "textarea" element is visible by name

  @build
  Scenario: Verify element by name in experimental-textarea component validations page
    When I open "experimental-textarea" component page validations in iframe
    Then "textarea" element is visible by name

  @build
  Scenario: Verify element by name in experimental-textarea component autoFocus page
    When I open "experimental-textarea" component page autoFocus in iframe
    Then "textarea" element is visible by name

  @build
  Scenario Outline: Component <component> validations page
    When I open "<component>" component page validations in iframe
    Then "<data-component>" component is visible
    Examples:
      | component                | data-component |
      | experimental-checkbox    | checkbox       |
      | experimental-date-input  | date           |
      | experimental-radiobutton | radio-button   |
      | experimental-switch      | Switch         |

  @build
  Scenario Outline: Component <component> autoFocus page
    When I open "<component>" component page autoFocus in iframe
    Then "<data-component>" component is visible
    Examples:
      | component                  | data-component |
      | experimental-checkbox      | checkbox       |
      | experimental-date-input    | date           |
      | experimental-decimal-input | decimal        |

  @build
  Scenario Outline: Verify element in component <component> autoFocus page
    When I open "<component>" component page autoFocus in iframe
    Then "<data-element>" element is visible
    Examples:
      | component                     | data-element |
      | experimental-groupedcharacter | input        |
      | experimental-number-input     | input        |
      | experimental-select           | input        |

  @build
  Scenario: Verify element in experimental-textbox component autoFocus multiple page
    When I open "experimental-textbox" component page autoFocus multiple in iframe
    Then "input" element is visible

  @build
  Scenario Outline: Verify element in <component> component multiple page
    When I open "<component>" component page multiple in iframe
    Then "<data-element>" element is visible
    Examples:
      | component            | data-element |
      | experimental-textbox | input        |
      | experimental-select  | input        |

  @build
  Scenario: Component Validations textbox based default page for Validations
    When I open "Validations" textbox based component page in iframe
    Then "row" component is visible

  @build
  Scenario: Component Validations basic default page for Validations
    When I open "Validations" component page basic in iframe
    Then "input" element is visible

  @build
  Scenario: Component Validations button toogle group default page for Validations
    When I open "Validations" component page buttonToogleGroup validation in iframe
    Then "button-toggle-group" component is visible

  @build
  Scenario: Component Loader legacy spinner in iframe default page
    When I open "loader" component page legacy spinner in iframe
    Then "spinner" component is visible