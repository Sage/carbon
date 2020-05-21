Feature: Button component - secondary type
  I want to check that all examples of Button component - secondary type render correctly per theme

  @positive
  @applitools
  Scenario Outline: Check that secondary buttons render correctly with theme set to <theme>
    When I open "button" component secondary_buttons story with theme "<theme>" 
    Then Element displays correctly
    Examples:
      | theme  |
      | mint   |
      | aegean |
      | none   |