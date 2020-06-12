Feature: Button component - tertiary type with icons after
  I want to check that all examples of Button component - tertiary type with icons after render correctly per theme

  @positive
  @applitools
  Scenario Outline: Check that tertiary buttons with icons after render correctly with theme set to <theme>
    When I open "button" component tertiary_buttons_icons_after story with theme "<theme>"
    Then Element displays correctly
    Examples:
      | theme  |
      | mint   |
      | aegean |
      | none   |