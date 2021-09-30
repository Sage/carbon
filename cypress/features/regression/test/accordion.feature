Feature: Accordion component
  I want to change Accordion component properties

  @positive
  Scenario Outline: Set Accordion iconType to <iconType>
    Given I open Test default "Accordion" component with "accordion" json from "commonComponents" using "<nameOfObject>" object name
    Then Accordion row is "closed" then iconType property on preview is set to "<iconType>"
    Examples:
      | iconType     | nameOfObject        |
      | chevron_down | iconTypeChevronDown |
      | dropdown     | iconTypeDropdown    |

  @positive
  Scenario Outline: Open accordion and set Accordion iconType to <iconType>
    Given I open Test default "Accordion" component with "accordion" json from "commonComponents" using "<nameOfObject>" object name
    When I expand accordionRow via click
    Then Accordion row is "open" then iconType property on preview is set to "<iconType>"
    Examples:
      | iconType     | nameOfObject        |
      | chevron_down | iconTypeChevronDown |
      | dropdown     | iconTypeDropdown    |

  @positive
  Scenario Outline: Set Accordion iconAlign to <iconAlign>
    Given I open Test default "Accordion" component with "accordion" json from "commonComponents" using "<nameOfObject>" object name
    Then Accordion iconAlign property on preview is set to "<iconAlign>"
    Examples:
      | iconAlign | nameOfObject   |
      | left      | iconAlignLeft  |
      | right     | iconAlignRight |

  @positive
  Scenario: Check expansion toggled event for the Accordion row on focus
    Given I open Test default "Accordion" component with "accordion" json from "commonComponents" using "default" object name
    When I expand accordionRow via click
    Then expansionToggled action was called in Actions Tab