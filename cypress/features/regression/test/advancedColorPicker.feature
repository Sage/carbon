Feature: Advanced Color Picker component
  I want to test Advanced Color Picker component

  Background: Open Advanced Color Picker component page
    Given I open "Advanced Color Picker Test" component page "default"
      And I open Advanced Color Picker

  @positive
  Scenario Outline: <key> moves selection
    When I press <key> on the 7 color
    Then Simple Color <index> element was picked up
    Examples:
      | key        | index |
      | leftarrow  | 6     |
      | rightarrow | 8     |
      | uparrow    | 2     |

  @positive
  Scenario: down arrow moves selection down
    Given I press uparrow on the 7 color
    When I press downarrow on the 2 color
    Then Simple Color 7 element was picked up