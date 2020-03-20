Feature: Advanced Color Picker component
  I want to test Advanced Color Picker component

  Background: Open Advanced Color Picker component page
    Given I open basic Test "Advanced Color Picker" component page
      And I open Advanced Color Picker

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
  Scenario: Upon opening color picker the default dolor is pre-selected and is focused
    Given closeIcon is visible
    When Simple Color 7 element was picked up
    Then Simple Color 7 has focus

  @positive
  Scenario: Advanced Simple Color is visible
    # commented because of BDD default scenario Given - When - Then
    # When I open Advanced Color Picker
    Then Advanced Simple Color is visible

  @positive
  Scenario Outline: Check the Simple Color Picker <position> element was selected
    When I pick simple <position> color
    Then Simple Color <position> element was picked up
    Examples:
      | position |
      | 1        |
      | 2        |
      | 3        |