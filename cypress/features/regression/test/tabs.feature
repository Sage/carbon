Feature: Tabs component
  I want to check Tabs component properties

  @positive
  Scenario Outline: I align Tabs to <nameOfObject>
    When I open Test test_basic "Tabs" component in noIFrame with "tabs" json from "test" using "<nameOfObject>" object name
    Then Tabs component is align to "<value>"
    Examples:
      | nameOfObject | value |
      | alignRignt   | right |
      | alignLeft    | start |

  @positive
  Scenario Outline: I set Tabs position to <positionLeft>
    When I open Test test_basic "Tabs" component in noIFrame with "tabs" json from "test" using "<nameOfObject>" object name
    Then Tabs component position is set to "<value>"
    Examples:
      | nameOfObject | value  |
      | positionLeft | column |
      | positionTop  | row    |

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