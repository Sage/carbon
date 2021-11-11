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

  @positive
  Scenario: Tab key pressed two times when color is focused regains focus on color
    Given I press Tab on 7 element
      And closeIcon is focused
    When I press Tab on 7 element
    Then Simple Color 7 has focus

  @positive
  Scenario: Space key on checked color closes picker
    When I press Space on 7 element
    Then closeIcon is not visible

  @positive
  Scenario: Enter key on checked color closes picker
    When I press Enter on 7 element
    Then closeIcon is not visible

  @positive
  Scenario Outline: Check the Simple Color Picker <position> element was selected
    When I pick simple <position> color
    Then Simple Color <position> element was picked up
    Examples:
      | position |
      | 1        |
      | 2        |
      | 3        |