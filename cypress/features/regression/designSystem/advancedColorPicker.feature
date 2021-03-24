Feature: Advanced Color Picker component
  I want to test Advanced Color Picker component

  Background: Open Advanced Color Picker component page
  Given I open "Design System Advanced Color Picker Test" component page "default" in no iframe
    And I open Advanced Color Picker

  @positive
  Scenario: Tab key pressed two times when color is focused regains focus on color
    Given I press Tab on 7 element
      And closeIcon is focused in no iframe
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
    Then Simple Color <position> element was picked up in noIframe
    Examples:
      | position |
      | 1        |
      | 2        |
      | 3        |