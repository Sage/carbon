Feature: Button component - secondary type with icons before
  I want to check that all examples of Button component - secondary type with icons before render correctly per theme

  @positive
  @applitools
  Scenario Outline: Check that secondary buttons with icons before render correctly with theme set to <theme>
    When I open "button" component secondary_buttons_icons_before story with theme "<theme>" 
    Then Element displays correctly
    Examples:
      | theme  |
      | mint   |
      | aegean |
      | none   |