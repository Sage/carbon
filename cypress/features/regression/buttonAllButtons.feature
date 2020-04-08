Feature: Button all buttons component
  I want to check all examples of Button component render correctly per theme

  @positive @applitools
  Scenario Outline: Check all buttons render correctly with theme set to <theme> 
    When I open "button" component with theme "<theme>" all buttons story
    Then Element displays correctly in full screen
    Examples:
      | theme  |
      | mint   |
      | aegean |
      | none   |
