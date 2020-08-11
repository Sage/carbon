Feature: Table Ajax component
  I want to check Table Ajax component properties

  @positive
  Scenario Outline: Page size records is set to <pageSizeRecords>
    When I open default "Table Ajax" component in noIFrame with "table" json from "commonComponents" using "<nameOfObject>" object name
    Then I see <pageSizeRecords> records for Table Ajax
    Examples:
      | pageSizeRecords | nameOfObject |
      | 0               | pageSize0    |
      | 1               | pageSize1    |
      | 2               | pageSize2    |
      | 5               | pageSize5    |

  @positive
  Scenario: Verify the pagination is visible
    When I open default "Table Ajax" component in noIFrame with "table" json from "commonComponents" using "paginate" object name
    Then pagination is visible