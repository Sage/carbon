Feature: Batch selection component
  I want to test Batch selection component properties

  @positive
  Scenario: Hide Batch selection component
    When I open default "Batch Selection Test" component with "batchSelection" json from "commonComponents" using "hidden" object name
    Then Batch selection component is hidden

  @positive
  Scenario Outline: Set selectedCount Batch selection component to <selectedCount>
    When I open default "Batch Selection Test" component with "batchSelection" json from "commonComponents" using "<nameOfObject>" object name
    Then Batch selection component selectedCount is set to "<selectedCount>"
    Examples:
      | selectedCount | nameOfObject     |
      | 0             | selectedCount0   |
      | 10            | selectedCount10  |
      | 100           | selectedCount100 |

  @positive
  Scenario Outline: I focus <buttonIndex> inner element for Batch selection component
    Given I open "Batch selection" component page "default story"
    When I focus Batch selection "<buttonIndex>" button
    Then Batch selection component "<buttonIndex>" button is focused
    Examples:
      | buttonIndex |
      | first       |
      | second      |
      | third       |