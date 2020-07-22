Feature: Accessibility tests - Design System folder
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Design System Accordion component <story> page closed state
    When I open design systems <story> "Accordion" component in no iframe
    Then "Accordion <story> page" component has no accessibility violations
    Examples:
      | story                |
      | primary              |
      | secondary            |
      | styles_overriden     |
      | with_dynamic_content |

  @accessibility
  Scenario: Design System Accordion component primary page opened state
    Given I open design systems primary "Accordion" component in no iframe
    When I expand Design System accordionRow via click in NoIFrame
    Then "Accordion primary page" component has no accessibility violations

  @accessibility
  Scenario: Design System Action Popover component keyboard_access page
    Given I open design systems keyboard_access "Action Popover" component in no iframe
    When I click the menu button element in noiFrame
    Then "Action Popover keyboard_access page" component has no accessibility violations

  @ignore
  # ignored because of accessibility issues after
  # changing state of components -> FE-2894
  Scenario: Design System Advanced Color Picker component default story page
    Given I open design systems default_story "Advanced Color Picker" component in no iframe
    When I open Advanced Color Picker in noIFrame
    Then "Advanced Color Picker" component has no accessibility violations

  @accessibility
  Scenario Outline: Component <component> basic default page
    When I open basic Test "<component>" component page in noIframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | Anchornavigation    |
      | duellingpicklist    |
      | Numeral Date        |

  @accessibility
  Scenario Outline: Component <component> basic default page
    When I open "<component>" component page "basic" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component                |
      | Button Toggle Group Test |

  @accessibility
  Scenario Outline: Design System Button component <story> page
    When I open design systems <story> "Button" component in no iframe
      And I wait 1000
    Then "Button <story> page" component has no accessibility violations
    Examples:
      | story                 |
      | primary               |
      | primary_destructive   |
      | primary_disabled      |
      | primary_full_width    |
      | primary_icon          |
      | secondary             |
      | secondary_destructive |
      | secondary_disabled    |
      | secondary_full_width  |
      | secondary_icon        |
      | tertiary              |
      | tertiary_destructive  |
      | tertiary_disabled     |
      | tertiary_full_width   |
      | tertiary_icon         |
      | dashed                |
      | dashed_disabled       |
      | dashed_full_width     |
      | dashed_icon           |

  @accessibility
  Scenario Outline: Design System <component> component visual page
    When I open visual Test "<component>" component page in noIframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component |
      | Drawer    |
      | Grid      |

  @accessibility
  Scenario: Design System Form component
    When I open design systems with_both_errors_and_warnings_summary "Form" component in no iframe
    Then "Form" component has no accessibility violations

  @accessibility
  Scenario: Design System Form component
    When I open validations Test "Numeral Date" component page in noIframe
    Then "Numeral Date" component has no accessibility violations

  @ignore
  # ignored because of accessibility issues after
  # changing state of components -> FE-2894
  Scenario: Design System Popover Container component basic page
    Given I open design systems basic "Popover Container" component in no iframe
    When I open popover container in NoIFrame
    Then "Popover Container" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System <component> component basic page
    When I open design systems basic "<component>" component in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component         |
      | Badge             |
      | Batch Selection   |
      | Draggable         |
      | Flat Table        |
      | Tile Select       |
      | Select            |
      | Select Filterable |
      | Text Editor       |

  @accessibility
  Scenario Outline: Design System Text Editor component <story> page
    When I open design systems <story> "Text Editor" component in no iframe
    Then "Text Editor component <story> page" component has no accessibility violations
    Examples:
      | story                 |
      | with_content          |
      | with_optional_buttons |

  @accessibility
  Scenario Outline: Design System <component> component default story page
    When I open design systems default_story "<component>" component in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component |
      | Pager     |
      | Search    |

  @accessibility
  Scenario Outline: Design System Select component <story> page
    When I open design systems <story> "Select" component in no iframe
    Then "Select" component has no accessibility violations
    Examples:
      | story       |
      | disabled    |
      | readOnly    |
      | transparent |

  @accessibility
  Scenario: Design System Select component basic page
    Given I open design systems basic "Select" component in no iframe
    When I click on Select input in noIframe
    Then "Select" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System Filterable Select component <story> page
    When I open design systems <story> "Select filterable" component in no iframe
    Then "Select" component has no accessibility violations
    Examples:
      | story    |
      | disabled |
      | readOnly |

  @accessibility
  Scenario: Design System Note component with_footer page
    When I open design systems with_footer "Note" component in no iframe
    Then "Note with_footer" component has no accessibility violations