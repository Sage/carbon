Feature: Button component - dashed type with icons after
  I want to check that all examples of Button component - dashed type with icons after render correctly per theme

  @positive
  @applitools
  Scenario Outline: Check that dashed buttons render with icons after correctly with theme set to <theme>
    When I open "button" component dashed_buttons_icons_after story with theme "<theme>"
    Then Element displays correctly
    Examples:
      | theme  |
      | mint   |
      | aegean |
      | none   |