Feature: Card default component
  I want to test Card default component properties

  @positive
  Scenario Outline: I set Card component spacing to <spacing>
    When I open default "Card" component in noIFrame with "card" json from "commonComponents" using "<nameOfObject>" object name
    Then Card component has <padding> padding and <margin> margin
    Examples:
      | spacing | padding | margin | nameOfObject      |
      | small   | 24      | 16     | cardSpacingSmall  |
      | medium  | 32      | 24     | cardSpacingMedium |
      | large   | 48      | 32     | cardSpacingLarge  |

  @positive
  Scenario Outline: Set the width of Card component to <width>
    When I open default "Card" component in noIFrame with "card" json from "commonComponents" using "<nameOfObject>" object name
    Then Card component has set width to "<width>"
    Examples:
      | width | nameOfObject |
      | 550px | width550     |
      | 999px | width999     |

  @positive
  Scenario Outline: Set the width of Card component to outOfScope <width>
    When I open default "Card" component in noIFrame with "card" json from "commonComponents" using "<nameOfObject>" object name
    Then Card component has not set width to "<width>"
    Examples:
      | width | nameOfObject |
      | -10   | width-10     |
      | -999  | width-999    |
      | test  | widthTest    |

  @positive
  Scenario: Enable interactive card checkbox
    When I open default "Card" component in noIFrame with "card" json from "commonComponents" using "interactiveCard" object name
    Then Card component is interactive

  @positive
  Scenario: Verify the shadow whithout interactive card
    When I open default "Card" component in noIFrame with "card" json from "commonComponents" using "interactiveCardFalse" object name
    Then Card component has non-interactive shadow

  @positive
  Scenario: Verify the interactive card shadow
    Given I open default "Card" component in noIFrame with "card" json from "commonComponents" using "interactiveCard" object name
    When I hover mouse onto Card component
    Then Card component has interactive shadow