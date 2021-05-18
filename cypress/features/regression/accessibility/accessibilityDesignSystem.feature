Feature: Accessibility tests - Design System folder
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Design System Accordion component <story> page closed state
    When I open "Design System Accordion" component page "<story>" in no iframe
    Then "Accordion <story> page" component has no accessibility violations
    Examples:
      | story                |
      | default story        |
      | with dynamic content |

  @accessibility
  Scenario: Design System Accordion component primary page opened state
    Given I open "Design System Accordion" component page "default story" in no iframe
    When I expand Design System accordionRow via click in NoIFrame
    Then "Accordion default page" component has no accessibility violations

  @accessibility
  Scenario: Design System Advanced Color Picker component default story page
    When I open "Design System Advanced Color Picker" component page "default story" in no iframe
    Then "Advanced Color Picker" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System <component> default story page
    When I open "Test <component>" component page "default" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component        |
      | Anchornavigation |

  @accessibility
  Scenario: Design System DuellingPicklist component default story page
    When I open "Design System DuellingPicklist" component page "default" in no iframe
    Then "DuellingPicklist" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System Numeral Date component <story> story page
    When I open "Design System Numeral Date Test" component page "<story>" in no iframe
    Then "Numeral Date <story>" component has no accessibility violations
    Examples:
      | story       |
      | default     |
      | validations |

  @accessibility
  Scenario Outline: Design System Button component <story> page
    When I open "Design System Button" component page "<story>" in no iframe
    Then "Button <story> page" component has no accessibility violations
    Examples:
      | story                 |
      | primary               |
      | primary destructive   |
      | primary disabled      |
      | primary full width    |
      | primary icon          |
      | secondary             |
      | secondary destructive |
      | secondary disabled    |
      | secondary full width  |
      | secondary icon        |
      | tertiary              |
      | tertiary destructive  |
      | tertiary disabled     |
      | tertiary full width   |
      | tertiary icon         |
      | dashed                |
      | dashed disabled       |
      | dashed full width     |
      | dashed icon           |

  @accessibility
  Scenario: Design System Button component as a sibling story page
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
  Scenario: Design System Form component with both errors and warnings summary page
    When I open "Design System Form" component page "with both errors and warnings summary" in no iframe
    Then "Form" component has no accessibility violations

  @accessibility
  Scenario: Design System Numeral Date component validations page
    When I open "Design System Numeral Date Test" component page "validations" in no iframe
    Then "Numeral Date" component has no accessibility violations

  @accessibility
  Scenario: Design System Popover Container component default page
    Given I open "Design System Popover Container" component page "default story" in no iframe
    When I open popover container in NoIFrame
    Then "Popover Container" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System <component> component default page
    When I open "Design System <component>" component page "default story" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component         |
      | Badge             |
      | Batch Selection   |
      | Checkbox          |
      | Content           |
      | Draggable         |
      | Fieldset          |
      | Flat Table        |
      | Hr                |
      | Loader            |
      | Pager             |
      | Search            |
      | Select            |
      | Select Filterable |
      | Tabs              |
      | Textbox           |
      | Text Editor       |
      | Tile Select       |

  @accessibility
  Scenario Outline: Design System Text Editor component <story> page
    When I open "Design System Text Editor" component page "<story>" in no iframe
    Then "Text Editor component <story> page" component has no accessibility violations
    Examples:
      | story                 |
      | with content          |
      | with optional buttons |

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
  Scenario: Design System Select component default story page
    Given I open "Design System Select" component page "default story" in no iframe
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
  Scenario: Design System Note component inline controls page
    When I open "Design System Note" component page "inline controls" in no iframe
    Then "Note inline controls" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System Menu component <story> page
    When I open "Design System Menu" component page "<story>" in no iframe
    Then "Menu <story>" component has no accessibility violations
    Examples:
      | story         |
      | default story |
      | dark theme    |

  @accessibility
  Scenario Outline: Design System Navigation Bar component <story> page
    When I open "Design System Navigation Bar" component page "<story>" in no iframe
    Then "Navigation Bar <story>" component has no accessibility violations
    Examples:
      | story         |
      | default story |
      | dark theme    |

  @accessibility
  Scenario Outline: Design System Tile component <story> page
    When I open "Design System Tile" component page "<story>" in no iframe
    Then "Tile <story>" component has no accessibility violations
    Examples:
      | story                        |
      | default story                |
      | with definition list default |

  @accessibility
  Scenario: Design System Toast component visual story page
    When I open "Design System Toast Test" component page "visual" in no iframe
    Then "Toast" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System Card component <story> page
    When I open "Design System Card" component page "<story>" in no iframe
    Then "Card <story>" component has no accessibility violations
    Examples:
      | story                         |
      | default story                 |
      | interactive                   |
      | different card footer padding |
      | more examples of card footer  |

  @accessibility
  Scenario Outline: Design System Pill component <story> page
    When I open "Design System Pill" component page "<story>" in no iframe
    Then "Pill <story> story" component has no accessibility violations
    Examples:
      | story         |
      | custom colors |
      | status        |
      | tag           |

  @accessibility
  Scenario: Design System Tooltip component default story page
    When I open "Design System Tooltip Test" component page "default" in no iframe
    Then "Design System Tooltip Test default" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System <component> validations boolean story page
    When I open "Design System <component>" component page "validations boolean" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | textbox             |
      | fieldset            |

  @accessibility
  Scenario Outline: Design System <component> validations string story page
    When I open "Design System <component>" component page "validations string component" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | textbox             |
      | fieldset            |

  @accessibility
  Scenario Outline: Design System <component> validations string label story page
    When I open "Design System <component>" component page "validations string label" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | textbox             |
      | fieldset            | 

  @accessibility    
  Scenario: Image component default story
    When I open "Design System Image" component page "default story" in no iframe
    Then "Image default story" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System checkbox component <story> story
    When I open "Design System checkbox validations" component page "<story>" in no iframe
    Then "Design System checkbox <story> story" component has no accessibility violations
    Examples:
      | story                              |
      | group checkbox boolean validation  |
      | group checkbox string validation   |
      | single checkbox boolean validation |
      | single checkbox string validation  |

  @accessibility
  Scenario: Design System checkbox with asterisk
    When I open "Design System checkbox validations" component page "required" in no iframe
    Then "Design System checkbox with asterisk" component has no accessibility violations
    
