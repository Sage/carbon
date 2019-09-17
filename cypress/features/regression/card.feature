Feature: Card component
  I want to change Card properties

  Background: Open Card component page
    Given I open "Card" component page

  @positive
  Scenario Outline: I set Card component spacing to <spacing>
    When I select card spacing to "<spacing>"
    Then Card component has <padding> padding and <margin> margin
    Examples:
      | spacing | padding | margin |
      | small   | 24      | 16     |
      | medium  | 32      | 24     |
      | large   | 48      | 32     |

  @positive
  Scenario: Enable interactive card checkbox
    When I check interactive card checkbox
    Then Card component is interactive