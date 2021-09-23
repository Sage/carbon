Feature: Accessibility tests - Design System folder
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Design System Accordion component <story> page closed state
    When I open "Design System Accordion" component page "<story>"
    Then "Accordion <story> page" component has no accessibility violations
    Examples:
      | story                |
      | default story        |
      | with dynamic content |

  @accessibility
  Scenario: Design System Accordion component primary page opened state
    Given I open "Design System Accordion" component page "default story"
    When I expand Design System accordionRow via click
    Then "Accordion default page" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System <component> default story page
    When I open "Test <component>" component page "default"
    Then "<component>" component has no accessibility violations
    Examples:
      | component        |
      | Anchornavigation |

  @accessibility
  Scenario: Design System DuellingPicklist component default story page
    When I open "Design System DuellingPicklist Test" component page "default"
    Then "DuellingPicklist" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System Numeral Date component <story> story page
    When I open "Design System Numeral Date Test" component page "<story>"
    Then "Numeral Date <story>" component has no accessibility violations
    Examples:
      | story       |
      | default     |
      | validations |

  @accessibility
  Scenario Outline: Design System Button component <story> page
    When I open "Design System Button" component page "<story>"
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
  Scenario Outline: Design System Button Bar component <story> page
    When I open "Design System Button Bar" component page "<story>"
    Then "Button Bar <story> page" component has no accessibility violations
    Examples:
      | story        |
      | sizes        |
      | with icons   |
      | icons only   |
      | icon buttons |
      | full width   |

  @accessibility
  Scenario: Design System Button component as a sibling story page
    When I open "Design System Button Test" component page "as a sibling"
    Then "button" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System <component> component visual page
    When I open "Design System <component> Test" component page "visual"
    Then "<component>" component has no accessibility violations
    Examples:
      | component |
      | Drawer    |
      | Grid      |

  @accessibility
  Scenario: Design System Form component with both errors and warnings summary page
    When I open "Design System Form" component page "with both errors and warnings summary"
    Then "Form" component has no accessibility violations

  @accessibility
  Scenario: Design System Numeral Date component validations page
    When I open "Design System Numeral Date Test" component page "validations"
    Then "Numeral Date" component has no accessibility violations

  @accessibility
  Scenario: Design System Popover Container component default page
    Given I open "Design System Popover Container" component page "default story"
    When I open popover container
    Then "Popover Container" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System <component> component default page
    When I open "Design System <component>" component page "default story"
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
  Scenario Outline: Design System Text Editor component <story> page
    When I open "Design System Text Editor" component page "<story>"
    Then "Text Editor component <story> page" component has no accessibility violations
    Examples:
      | story                 |
      | with content          |
      | with optional buttons |

  @accessibility
  Scenario Outline: Design System Select component <story> page
    When I open "Design System Select" component page "<story>"
    Then "Select" component has no accessibility violations
    Examples:
      | story       |
      | disabled    |
      | readOnly    |
      | transparent |

  @accessibility
  Scenario: Design System Select component default story page
    Given I open "Design System Select" component page "default story"
    When I click on default Select input
    Then "Select" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System Filterable Select component <story> page
    When I open "Design System Select filterable" component page "<story>"
    Then "Select" component has no accessibility violations
    Examples:
      | story    |
      | disabled |
      | readOnly |

  @accessibility
  Scenario: Design System Note component inline controls page
    When I open "Design System Note" component page "with inline controls"
    Then "Note inline controls" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System Menu component <story> page
    When I open "Design System Menu" component page "<story>"
    Then "Menu <story>" component has no accessibility violations
    Examples:
      | story         |
      | default story |
      | dark theme    |

  @accessibility
  Scenario Outline: Design System Navigation Bar component <story> page
    When I open "Design System Navigation Bar" component page "<story>"
    Then "Navigation Bar <story>" component has no accessibility violations
    Examples:
      | story         |
      | default story |
      | dark theme    |

  @accessibility
  Scenario Outline: Design System Tile component <story> page
    When I open "Design System Tile" component page "<story>"
    Then "Tile <story>" component has no accessibility violations
    Examples:
      | story                        |
      | default story                |
      | with definition list default |

  @accessibility
  Scenario: Design System Toast component visual story page
    When I open "Design System Toast Test" component page "visual"
    Then "Toast" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System Card component <story> page
    When I open "Design System Card" component page "<story>"
    Then "Card <story>" component has no accessibility violations
    Examples:
      | story                         |
      | default story                 |
      | interactive                   |
      | different card footer padding |
      | more examples of card footer  |

  @accessibility
  Scenario Outline: Design System Pill component <story> page
    When I open "Design System Pill" component page "<story>"
    Then "Pill <story> story" component has no accessibility violations
    Examples:
      | story         |
      | custom colors |
      | status        |
      | tag           |

  @accessibility
  Scenario: Design System Tooltip component default story page
    When I open "Design System Tooltip Test" component page "default"
    Then "Design System Tooltip Test default" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System <component> validations boolean story page
    When I open "Design System <component>" component page "validations boolean"
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
  Scenario Outline: Design System <component> validations string story page
    When I open "Design System <component>" component page "validations string component"
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
  Scenario Outline: Design System <component> validations string label story page
    When I open "Design System <component>" component page "validations string label"
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
    When I open "Design System Image" component page "default story"
    Then "Image default story" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System checkbox component <story> story
    When I open "Design System checkbox validations" component page "<story>"
    Then "Design System checkbox <story> story" component has no accessibility violations
    Examples:
      | story                              |
      | group checkbox boolean validation  |
      | group checkbox string validation   |
      | single checkbox boolean validation |
      | single checkbox string validation  |

  @accessibility
  Scenario: Design System checkbox with asterisk
    When I open "Design System checkbox validations" component page "required"
    Then "Design System checkbox with asterisk" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System switch component <story> story
    When I open "Design System switch" component page "<story>"
    Then "Design System switch <story> story" component has no accessibility violations
    Examples:
      | story                                               |
      | single switch boolean validation                    |
      | single switch string validation                     |
      | single switch string validation validation on label |

  @accessibility
  Scenario Outline: Design System Radiobutton component with <story> story
    When I open "Design System Radiobutton" component page "<story>"
    Then "Design System Radiobutton with <story> story" component has no accessibility violations
    Examples:
      | story                       |
      | with legend and labels      |
      | with validations on buttons |
