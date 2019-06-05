Feature: Tabs component
  I want to change Tabs component properties

  Background: Open Tabs component page
    Given I open "Tabs" component page

  @positive
  Scenario Outline: I align Tabs to <direction>
    When I select align to "<direction>"
    Then Tabs component is align to "<value>"
    Examples:
      | direction | value |
      | right     | right |
      | left      | start |

  @positive
  Scenario Outline: I set Tabs position to <position>
    When I select position to "<position>"
    Then Tabs component position is set to "<value>"
    Examples:
      | position | value  |
      | left     | column |
      | top      | row    |

  @positive
  Scenario Outline: Tab <id> content is set and visible
    When I open Tab <id>
    Then Tab <id> content is visible
    Examples:
      | id |
      | 1  |
      | 2  |
      | 3  |
      | 4  |
      | 5  |