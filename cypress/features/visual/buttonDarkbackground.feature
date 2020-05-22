Feature: Button component - dark background type
  I want to check that all examples of Button component - dark background type render correctly per theme

  @positive
  @applitools
  Scenario Outline: Check that dark background buttons render correctly with theme set to <theme>
    When I open "button" component dark_background_buttons story with theme "<theme>"
    Then Element displays correctly
    Examples:
      | theme  |
      | mint   |
      | aegean |
      | none   |