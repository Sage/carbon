Feature: Accessibility tests
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Design System <component> component basic page
    Given I open design systems basic "<component>" component page
    When I open Accessibility Tab
    Then "<component>" component has no violations in Accessibility section
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
    Given I open design systems primary "<component>" component page
    When I open Accessibility Tab
    Then "<component>" component has no violations in Accessibility section
    Examples:
      | component |
      | Accordion |

  @accessibility
  Scenario Outline: Design System <component> component default story page
    Given I open design systems default_story "<component>" component page
    When I open Accessibility Tab
    Then "<component>" component has no violations in Accessibility section
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
    Given I open design systems controlled "<component>" component page
    When I open Accessibility Tab
    Then "<component>" component has no violations in Accessibility section
    Examples:
      | component |
      | Drawer    |