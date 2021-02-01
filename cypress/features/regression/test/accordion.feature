Feature: Accordion component
  I want to change Accordion component properties

  Background: Open Accordion component page
    Given I open "Design System Accordion Test" component page "default"

  @positive
  Scenario Outline: Set Accordion iconType to <iconType>
    When I select iconType to "<iconType>"
    Then Accordion row is "closed" then iconType property on preview is set to "<iconType>"
    Examples:
      | iconType     |
      | chevron_down |
      | dropdown     |

  @positive
  Scenario Outline: Open accordion and set Accordion iconType to <iconType>
    Given I expand accordionRow via click
    When I select iconType to "<iconType>"
    Then Accordion row is "open" then iconType property on preview is set to "<iconType>"
    Examples:
      | iconType     |
      | chevron_down |
      | dropdown     |

  @positive
  Scenario Outline: Set Accordion iconAlign to <iconAlign>
    When I select iconAlign to "<iconAlign>"
    Then Accordion iconAlign property on preview is set to "<iconAlign>"
    Examples:
      | iconAlign |
      | left      |
      | right     |

  @positive
  Scenario: Check expansion toggled event for the Accordion row on focus
    Given clear all actions in Actions Tab
    When I expand accordionRow via click
    Then expansionToggled action was called in Actions Tab