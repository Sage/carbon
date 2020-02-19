Feature: Advanced Color Picker component
  I want to test Advanced Color Picker component

  Background: Open Advanced Color Picker component page
    Given I open basic Test "Advanced Color Picker" component page
      And I open Advanced Color Picker

  @positive
  Scenario: Left arrow moves selection left
    When I press "ArrowLeft" on a 7 color in advanced colorpicker
    Then Simple Color 6 element was picked up

  @positive
  Scenario: Right arrow moves selection right
    When I press "ArrowRight" on a 7 color in advanced colorpicker
    Then Simple Color 8 element was picked up

  @positive
  Scenario: Up arrow moves selection up
    When I press "ArrowUp" on a 7 color in advanced colorpicker
    Then Simple Color 2 element was picked up

  @positive
  Scenario: Down arrow moves selection down
    When I press "ArrowDown" on a 7 color in advanced colorpicker
    Then Simple Color 7 element was picked up

  @positive
  Scenario: Tab key pressed two times when color is focused regains focus on color
    When I press Tab on 7 element
    Then closeIcon is focused
    Given I press Tab on 7 element
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
  Scenario: Upon opening color picker the default dolor is pre-selected and is focused
    Given closeIcon is visible
    When Simple Color 7 element was picked up
    Then Simple Color 7 has focus

  @positive
  Scenario: Clicking Advanced Color Picker Cell preview opens the color picker
    Then closeIcon is visible

  @positive
  Scenario Outline: Check the Simple Color Picker <position> element was selected
    When I pick simple <position> color
    Then Simple Color <position> element was picked up
    Examples:
      | position |
      | 1        |
      | 2        |
      | 3        |
