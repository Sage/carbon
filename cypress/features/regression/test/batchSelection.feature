Feature: Batch selection component
  I want to test Batch selection component properties

  @positive
  Scenario: Hide Batch selection component
    When I open Test default "Batch Selection" component in noIFrame with "batchSelection" json from "test" using "hidden" object name
    Then Batch selection component is hidden

  @positive
  Scenario Outline: Set selectedCount Batch selection component to <selectedCount>
    When I open Test default "Batch Selection" component in noIFrame with "batchSelection" json from "test" using "<nameOfObject>" object name
    Then Batch selection component selectedCount is set to "<selectedCount>"
    Examples:
      | selectedCount | nameOfObject     |
      | 0             | selectedCount0   |
      | 10            | selectedCount10  |
      | 100           | selectedCount100 |