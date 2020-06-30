Feature: Accessibility tests
  I want to check that all components have no violations

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
      | Grid              |
      | Popover Container |

  @accessibility
  Scenario Outline: Design System <component> component primary page
    When I open design systems primary "<component>" component in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component |
      | Accordion |

  @accessibility
  Scenario Outline: Design System <component> component default story page
    When I open design systems default_story "<component>" component in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component             |
      | Advanced Color Picker |
      | Inline-inputs         |
      | Numeral Date          |
      | Pager                 |
      | Search                |
      | Toast                 |

  @accessibility
  Scenario Outline: Design System <component> component controlled page
    When I open design systems controlled "<component>" component in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component |
      | Drawer    |
