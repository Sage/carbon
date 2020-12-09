Feature: Accessibility tests - Design System folder
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Design System Accordion component <story> page closed state
    When I open "Design System Accordion" component page "<story>" in no iframe
    Then "Accordion <story> page" component has no accessibility violations
    Examples:
      | story                |
      | default_story        |
      | styles_overriden     |
      | with_dynamic_content |

  @accessibility
  Scenario: Design System Accordion component primary page opened state
    Given I open "Design System Accordion" component page "default_story" in no iframe
    When I expand Design System accordionRow via click in NoIFrame
    Then "Accordion default page" component has no accessibility violations

  @ignore
  # ignored because of accessibility issues after
  # changing state of components -> FE-2894
  Scenario: Design System Advanced Color Picker component default story page
    Given I open "Design System Advanced Color Picker" component page "default_story" in no iframe
    When I open Advanced Color Picker in noIFrame
    Then "Advanced Color Picker" component has no accessibility violations

  @accessibility
  Scenario Outline: Component <component> basic default page
    When I open "Test <component>" component page "basic" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component        |
      | Anchornavigation |
      | duellingpicklist |

  @ignore
  # ignored because of accessibility issues (FE-3177)
  Scenario Outline: Numeral Date component <story> story
    When I open "Design System Numeral Date Test" component page "<story>" in no iframe
    Then "Numeral Date <story>" component has no accessibility violations
    Examples:
      | story       |
      | basic       |
      | validations |

  @accessibility
  Scenario Outline: Design System Button component <story> page
    When I open "Design System Button" component page "<story>" in no iframe
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
  Scenario: Component button as a sibling
    When I open "Design System Button Test" component page "as a sibling" in no iframe
    Then "button" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System <component> component visual page
    When I open "Design System <component> Test" component page "visual" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component |
      | Drawer    |
      | Grid      |

  @accessibility
  Scenario: Design System Form component
    When I open "Design System Form" component page "with_both_errors_and_warnings_summary" in no iframe
    Then "Form" component has no accessibility violations

  @accessibility
  Scenario: Design System Numeral Date component
    When I open "Design System Numeral Date Test" component page "validations" in no iframe
    Then "Numeral Date" component has no accessibility violations

  @ignore
  # ignored because of accessibility issues after
  # changing state of components -> FE-2894
  Scenario: Design System Popover Container component basic page
    Given I open "Design System Popover Container" component page "basic" in no iframe
    When I open popover container in NoIFrame
    Then "Popover Container" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System <component> component basic page
    When I open "Design System <component>" component page "basic" in no iframe
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
    When I open "Design System Text Editor" component page "<story>" in no iframe
    Then "Text Editor component <story> page" component has no accessibility violations
    Examples:
      | story                 |
      | with_content          |
      | with_optional_buttons |

  @accessibility
  Scenario Outline: Design System <component> component default story page
    When I open "Design System <component>" component page "default_story" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component |
      | Pager     |
      | Search    |

  @accessibility
  Scenario Outline: Design System Select component <story> page
    When I open "Design System Select" component page "<story>" in no iframe
    Then "Select" component has no accessibility violations
    Examples:
      | story       |
      | disabled    |
      | readOnly    |
      | transparent |

  @accessibility
  Scenario: Design System Select component basic page
    Given I open "Design System Select" component page "basic" in no iframe
    When I click on Select input in noIframe
    Then "Select" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System Filterable Select component <story> page
    When I open "Design System Select filterable" component page "<story>" in no iframe
    Then "Select" component has no accessibility violations
    Examples:
      | story    |
      | disabled |
      | readOnly |

  @accessibility
  Scenario: Design System Note component
    When I open "Design System Note" component page "inline_controls" in no iframe
    Then "Note inline controls" component has no accessibility violations

  @accessibility
  Scenario: Component Hr
    When I open "Design System Hr" component page "default_story" in no iframe
    Then "Hr" component has no accessibility violations

  @accessibility
  Scenario Outline: Component Menu <story>
    When I open "Design System Menu" component page "<story>" in no iframe
    Then "Menu <story>" component has no accessibility violations
    Examples:
      | story         |
      | default_story |
      | dark_theme    |

  @accessibility
  Scenario Outline: Component Navigation Bar <story>
    When I open "Design System Navigation Bar" component page "<story>" in no iframe
    Then "Navigation Bar <story>" component has no accessibility violations
    Examples:
      | story         |
      | default_story |
      | dark_theme    |

  @accessibility
  Scenario: Component Tabs
    When I open "Design System Tabs" component page "basic" in no iframe
    Then "Tabs" component has no accessibility violations

  @accessibility
  Scenario Outline: Component Tile <story>
    When I open "Design System Tile" component page "<story>" in no iframe
    Then "Tile <story>" component has no accessibility violations
    Examples:
      | story                             |
      | default_story                     |
      | tile_with_definition_list_default |

  @accessibility
  Scenario: Component Toast
    When I open "Design System Toast Test" component page "visual" in no iframe
    Then "Toast" component has no accessibility violations

  @accessibility
  Scenario Outline: Component Card <story>
    When I open "Design System Card" component page "<story>" in no iframe
    Then "Card <story>" component has no accessibility violations
    Examples:
      | story                         |
      | default_story                 |
      | interactive                   |
      | different_card_footer_padding |
      | more_examples_of_card_footer  |