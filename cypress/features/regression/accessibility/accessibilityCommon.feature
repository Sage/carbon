Feature: Accessibility tests - Common list
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Component <component> default story
    Given I open "<component>" component page "default story"
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | AppWrapper          |
      | Alert               |
      | Button toggle       |
      | Button Toggle Group |
      | Carousel            |
      | Confirm             |
      | Detail              |
      | Dialog              |
      | Decimal Input       |
      | GroupedCharacter    |
      | Heading             |
      | Help                |
      | Icon                |
      | Link                |
      | Message             |
      | Mount In App        |
      | Portrait            |
      | Preview             |
      | Profile             |
      | Row                 |
      | Showeditpod         |
      | Sidebar             |
      | Split Button        |
      | Step Sequence       |
      | Multi Action Button |
      | Number Input        |

  @accessibility
  Scenario Outline: Component <component> default story with open preview
    Given I open "<component>" component page "default story"
    When I open component preview
    Then "<component>" component has no accessibility violations
    Examples:
      | component          |
      | Dialog Full Screen |
      | Pages              |

  @accessibility
  Scenario Outline: Component <component> default story
    When I open "<component> Test" component page "default"
    Then "<component> Test default story" component has no accessibility violations
    Examples:
      | component        |
      | Setting row      |

  @accessibility
  Scenario Outline: Component <component> validations boolean story page
    When I open "<component>" component page "validations boolean"
    Then "<component>" component has no accessibility violations
    Examples:
      | component        |
      | Decimal Input    |
      | GroupedCharacter |
      | Number Input     |

  @accessibility
  Scenario Outline: Component <component> validations string story page
    When I open "<component>" component page "validations string component"
    Then "<component>" component has no accessibility violations
    Examples:
      | component        |
      | Decimal Input    |
      | GroupedCharacter |
      | Number Input     |

  @accessibility
  Scenario Outline: Component <component> validations string label story page
    When I open "<component>" component page "validations string label"
    Then "<component>" component has no accessibility violations
    Examples:
      | component        |
      | Decimal Input    |
      | GroupedCharacter |
      | Number Input     |

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
