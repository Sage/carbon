Feature: Button component - dashed type
  I want to check that all examples of Button component - dashed type render correctly per theme

  @positive
  @applitools
  Scenario Outline: Check that dashed buttons render correctly with theme set to <theme>
    When I open "button" component dashed_buttons story with theme "<theme>"
    And the button story has loaded
    Then Element displays correctly
    Examples:
      | theme  |
      | mint   |
      | aegean |
      | none   |