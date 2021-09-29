Feature: Accessibility tests - Continued
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Accordion component <story> page closed state
    When I open "Accordion" component page "<story>"
    Then "Accordion <story> page" component has no accessibility violations
    Examples:
      | story                |
      | default story        |
      | with dynamic content |

  @accessibility
  Scenario: Accordion component primary page opened state
    Given I open "Accordion" component page "default story"
    When I expand default accordionRow via click
    Then "Accordion default page" component has no accessibility violations

  @accessibility
  Scenario Outline: <component> default story page
    When I open "Test <component>" component page "default"
    Then "<component>" component has no accessibility violations
    Examples:
      | component        |
      | Anchornavigation |

  @accessibility
  Scenario: DuellingPicklist component default story page
    When I open "DuellingPicklist Test" component page "default"
    Then "DuellingPicklist" component has no accessibility violations

  @accessibility
  Scenario Outline: Numeral Date component <story> story page
    When I open "Numeral Date Test" component page "<story>"
    Then "Numeral Date <story>" component has no accessibility violations
    Examples:
      | story       |
      | default     |
      | validations |

  @accessibility
  Scenario Outline: Button component <story> page
    When I open "Button" component page "<story>"
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
  Scenario Outline: Button Bar component <story> page
    When I open "Button Bar" component page "<story>"
    Then "Button Bar <story> page" component has no accessibility violations
    Examples:
      | story        |
      | sizes        |
      | with icons   |
      | icons only   |
      | icon buttons |
      | full width   |

  @accessibility
  Scenario: Button component as a sibling story page
    When I open "Button Test" component page "as a sibling"
    Then "button" component has no accessibility violations

  @accessibility
  Scenario Outline: <component> component visual page
    When I open "<component> Test" component page "visual"
    Then "<component>" component has no accessibility violations
    Examples:
      | component |
      | Drawer    |
      | Grid      |

  @accessibility
  Scenario: Form component with both errors and warnings summary page
    When I open "Form" component page "with both errors and warnings summary"
    Then "Form" component has no accessibility violations

  @accessibility
  Scenario: Numeral Date component validations page
    When I open "Numeral Date Test" component page "validations"
    Then "Numeral Date" component has no accessibility violations

  @accessibility
  Scenario: Popover Container component default page
    Given I open "Popover Container" component page "default story"
    When I open popover container
    Then "Popover Container" component has no accessibility violations

  @accessibility
  Scenario Outline: <component> component default page
    When I open "<component>" component page "default story"
    Then "<component>" component has no accessibility violations
    Examples:
      | component             |
      | Advanced Color Picker |
      | Badge                 |
      | Batch Selection       |
      | Content               |
      | Date Input            |
      | Date Range            |
      | Draggable             |
      | Fieldset              |
      | Flat Table            |
      | Hr                    |
      | Image                 |
      | Loader Bar            |
      | Loader                |
      | Pager                 |
      | Simple color picker   |
      | Search                |
      | Select                |
      | Select Filterable     |
      | Switch                |
      | Tabs                  |
      | Textarea              |
      | Textbox               |
      | Text Editor           |
      | Tile Select           |

  @accessibility
  Scenario Outline: Text Editor component <story> page
    When I open "Text Editor" component page "<story>"
    Then "Text Editor component <story> page" component has no accessibility violations
    Examples:
      | story                 |
      | with content          |
      | with optional buttons |

  @accessibility
  Scenario Outline: Select component <story> page
    When I open "Select" component page "<story>"
    Then "Select" component has no accessibility violations
    Examples:
      | story       |
      | disabled    |
      | readOnly    |
      | transparent |

  @accessibility
  Scenario: Select component default story page
    Given I open "Select" component page "default story"
    When I click on default Select input
    Then "Select" component has no accessibility violations

  @accessibility
  Scenario Outline: Filterable Select component <story> page
    When I open "Select filterable" component page "<story>"
    Then "Select" component has no accessibility violations
    Examples:
      | story    |
      | disabled |
      | readOnly |

  @accessibility
  Scenario: Note component inline controls page
    When I open "Note" component page "with inline controls"
    Then "Note inline controls" component has no accessibility violations

  @accessibility
  Scenario Outline: Menu component <story> page
    When I open "Menu" component page "<story>"
    Then "Menu <story>" component has no accessibility violations
    Examples:
      | story         |
      | default story |
      | dark theme    |

  @accessibility
  Scenario Outline: Navigation Bar component <story> page
    When I open "Navigation Bar" component page "<story>"
    Then "Navigation Bar <story>" component has no accessibility violations
    Examples:
      | story         |
      | default story |
      | dark theme    |

  @accessibility
  Scenario Outline: Tile component <story> page
    When I open "Tile" component page "<story>"
    Then "Tile <story>" component has no accessibility violations
    Examples:
      | story                        |
      | default story                |
      | with definition list default |

  @accessibility
  Scenario: Toast component visual story page
    When I open "Toast Test" component page "visual"
    Then "Toast" component has no accessibility violations

  @accessibility
  Scenario Outline: Card component <story> page
    When I open "Card" component page "<story>"
    Then "Card <story>" component has no accessibility violations
    Examples:
      | story                         |
      | default story                 |
      | interactive                   |
      | different card footer padding |
      | more examples of card footer  |

  @accessibility
  Scenario Outline: Pill component <story> page
    When I open "Pill" component page "<story>"
    Then "Pill <story> story" component has no accessibility violations
    Examples:
      | story         |
      | custom colors |
      | status        |
      | tag           |

  @accessibility
  Scenario: Tooltip component default story page
    When I open "Tooltip Test" component page "default"
    Then "Tooltip Test default" component has no accessibility violations

  @accessibility
  Scenario Outline: <component> validations boolean story page
    When I open "<component>" component page "validations boolean"
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | simple-color-picker |
      | textarea            |
      | date-input          |
      | date-range          |
      | textbox             |
      | fieldset            |

  @accessibility
  Scenario Outline: <component> validations string story page
    When I open "<component>" component page "validations string component"
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | simple-color-picker |
      | textarea            |
      | date-input          |
      | date-range          |
      | textbox             |
      | fieldset            |

  @accessibility
  Scenario Outline: <component> validations string label story page
    When I open "<component>" component page "validations string label"
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | simple-color-picker |
      | textarea            |
      | date-input          |
      | date-range          |
      | textbox             |
      | fieldset            |

  @accessibility
  Scenario: Image component default story
    When I open "Image" component page "default story"
    Then "Image default story" component has no accessibility violations

  @accessibility
  Scenario Outline: checkbox component <story> story
    When I open "checkbox validations" component page "<story>"
    Then "checkbox <story> story" component has no accessibility violations
    Examples:
      | story                              |
      | group checkbox boolean validation  |
      | group checkbox string validation   |
      | single checkbox boolean validation |
      | single checkbox string validation  |

  @accessibility
  Scenario: checkbox with asterisk
    When I open "checkbox validations" component page "required"
    Then "checkbox with asterisk" component has no accessibility violations

  @accessibility
  Scenario Outline: switch component <story> story
    When I open "switch" component page "<story>"
    Then "switch <story> story" component has no accessibility violations
    Examples:
      | story                                               |
      | single switch boolean validation                    |
      | single switch string validation                     |
      | single switch string validation validation on label |

  @accessibility
  Scenario Outline: Radiobutton component with <story> story
    When I open "Radiobutton" component page "<story>"
    Then "Radiobutton with <story> story" component has no accessibility violations
    Examples:
      | story                       |
      | with legend and labels      |
      | with validations on buttons |
