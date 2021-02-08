Feature: Tabs component
  I want to check Tabs component properties

  @positive
  Scenario Outline: Tab <id> content is set and visible
    Given I open Test default "Tabs" component in noIFrame with "tabs" json from "test" using "default" object name
    When I open Tab <id>
    Then Tab <id> content is visible
    Examples:
      | id |
      | 1  |
      | 2  |
      | 3  |
      | 4  |
      | 5  |