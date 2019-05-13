Feature: Filter Component
  I want to change Filter Component properties

  Background: Open Filter Component component page
    Given I open "Filter Component" component page

  @positive
  Scenario Outline: Change label align
    When I set label align "<align>"
    Then Filter label align property is set to "<align>"
    Examples:
      | align |
      | left  |
      | right |