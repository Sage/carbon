Feature: Accordion component
  I want to change Accordion component properties

  @positive
  Scenario Outline: Set Accordion iconType to <iconType>
    When I open basic "Design System Accordion Test" component in noIFrame with "accordion" json from "designSystem" using "<nameOfObject>" object name
    Then Accordion row is "closed" then iconType property on preview is set to "<iconType>"
    Examples:
      | nameOfObject        | iconType     |
      | iconTypeChevronDown | chevron_down |
      | iconTypeDropDown    | dropdown     |

  @positive
  Scenario Outline: Open accordion and set Accordion iconType to <iconType>
    Given I open basic "Design System Accordion Test" component in noIFrame with "accordion" json from "designSystem" using "<nameOfObject>" object name
    When I expand accordionRow via click in noIFrame
    Then Accordion row is "open" then iconType property on preview is set to "<iconType>"
    Examples:
      | nameOfObject        | iconType     |
      | iconTypeChevronDown | chevron_down |
      | iconTypeDropDown    | dropdown     |

  @positive
  Scenario Outline: Set Accordion iconAlign to <iconAlign>
    Given I open basic "Design System Accordion Test" component in noIFrame with "accordion" json from "designSystem" using "<nameOfObject>" object name
    Then Accordion iconAlign property on preview is set to "<iconAlign>"
    Examples:
      | iconAlign | nameOfObject   |
      | left      | iconAlignLeft  |
      | right     | iconAlignRight |

  @positive
  Scenario: Check expansion toggled event for the Accordion row on focus
    Given I open "Design System Accordion Test" component page "basic"
      And clear all actions in Actions Tab
    When I expand accordionRow via click
    Then expansionToggled action was called in Actions Tab