Feature: Button component - primary type with icons after
  I want to check that all examples of Button component - primary type with icons after render correctly per theme

  @positive
  @applitools
  Scenario Outline: Check that primary buttons with icons after render correctly with theme set to <theme>
    When I open "button" component primary_buttons_icons_after story with theme "<theme>"
    Then Element displays correctly
    Examples:
      | theme  |
      | mint   |
      | aegean |
      | none   |