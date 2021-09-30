Feature: Accordion component
  I want to test Accordion component

  @positive
  Scenario: I expand accordion using click
    Given I open "Accordion" component page "default story"
    When I expand default accordionRow via click
    Then accordionRow is expanded

  @positive
  Scenario: I expand accordion using Enter key
    Given I open "Accordion" component page "default story"
    When I expand accordionRow using "Enter" key
    Then accordionRow is expanded

  @positive
  Scenario: Verify border outline color on focus
    Given I open "Accordion" component page "default story"
    When I focus first accordionRow
    Then accordionRow has golden border outline

  @positive
  Scenario: Open accordion by clicking on validation icon
    Given I open "Accordion" component page "validation icon"
    When I click on first validation icon
    Then accordionRow is expanded

  @positive
  Scenario Outline: Set Accordion iconType to <iconType>
    Given I open default "Accordion Test" component with "accordion" json from "commonComponents" using "<nameOfObject>" object name
    Then Accordion row is "closed" then iconType property on preview is set to "<iconType>"
    Examples:
      | iconType     | nameOfObject        |
      | chevron_down | iconTypeChevronDown |
      | dropdown     | iconTypeDropdown    |

  @positive
  Scenario Outline: Open accordion and set Accordion iconType to <iconType>
    Given I open default "Accordion Test" component with "accordion" json from "commonComponents" using "<nameOfObject>" object name
    When I expand accordionRow via click
    Then Accordion row is "open" then iconType property on preview is set to "<iconType>"
    Examples:
      | iconType     | nameOfObject        |
      | chevron_down | iconTypeChevronDown |
      | dropdown     | iconTypeDropdown    |

  @positive
  Scenario Outline: Set Accordion iconAlign to <iconAlign>
    Given I open default "Accordion Test" component with "accordion" json from "commonComponents" using "<nameOfObject>" object name
    Then Accordion iconAlign property on preview is set to "<iconAlign>"
    Examples:
      | iconAlign | nameOfObject   |
      | left      | iconAlignLeft  |
      | right     | iconAlignRight |

  @positive
  Scenario: Check expansion toggled event for the Accordion row on focus
    Given I open default "Accordion Test" component with "accordion" json from "commonComponents" using "default" object name
    When I expand accordionRow via click
    Then expansionToggled action was called in Actions Tab