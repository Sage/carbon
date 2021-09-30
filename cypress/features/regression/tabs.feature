Feature: Tabs component
  I want to check Tabs component properties

  @positive
  Scenario Outline: Tab <id> content is set and visible
    Given I open default "Tabs Test" component with "tabs" json from "commonComponents" using "default" object name
    When I open Tab <id>
    Then Tab <id> content is visible
    Examples:
      | id |
      | 1  |
      | 2  |
      | 3  |
      | 4  |
      | 5  |

  @positive
  Scenario: Check that Tab has link properties
    Given I open "Tabs" component page "with link as a tab"
    Then Second Tab has a link property