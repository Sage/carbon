Feature: Table Ajax component
  I want to change Table Ajax component properties

  Background: Open Table Ajax component page
    Given I open "Table Ajax" component page

  @positive
  Scenario Outline: Page size records is set to <pageSizeRecords>
    When I set pageSize to "<pageSizeRecords>"
    Then I see <pageSizeRecords> records
    Examples:
      | pageSizeRecords |
      | 0               |
      | 1               |
      | 2               |
      | 5               |

  @ignore
  @negative
  # ignored because not working correctly during development
  Scenario Outline: Page size records is set out of scope <pageSizeRecords>
    When I set pageSize to "<pageSizeRecords>"
    Then I see 0 records
    Examples:
      | pageSizeRecords         |
      | -1                      |
      | -10                     |
      | Sample text             |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario: I enable pagination
    When I uncheck paginate checkbox
      And I check paginate checkbox
    Then pagination is visible

  @positive
  Scenario: I disable pagination
    When I uncheck paginate checkbox
    Then pagination is not visible

  @ignore
  @positive
  # ignored because not working correctly during development
  Scenario Outline: Set getCustomHeaders to <getCustomHeaders>
    When I set getCustomHeaders to "<getCustomHeaders>"
    Then getCustomHeaders is set to "<getCustomHeaders>"
    Examples:
      | getCustomHeaders        |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |
