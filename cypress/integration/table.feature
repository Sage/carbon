Feature: Table component
  I want to change Table component properties

  Background: Open Table component page
    Given I open "Table" component page

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
  Scenario: I enable selectable
    When I check selectable checkbox
    Then rows are selectable

  @positive
  Scenario: I disable selectable
    When I check selectable checkbox
      And I uncheck selectable checkbox
    Then rows are not selectable

  @positive
  Scenario Outline: Row <rowNumber> is highlighted
    When I check highlightable checkbox
      And row number <rowNumber> is clickable
      And I click row by number <rowNumber>
    Then row number <rowNumber> is highlighted
    Examples:
      | rowNumber |
      | 1         |
      | 2         |
      | 3         |

  @positive
  Scenario Outline: Row <rowNumber> is not highlighted
    When I check highlightable checkbox
      And I uncheck highlightable checkbox
      And row number <rowNumber> is not clickable
      And I click row by number <rowNumber>
    Then row number <rowNumber> is not highlighted
    Examples:
      | rowNumber |
      | 1         |
      | 2         |
      | 3         |

  @ignore
  @positive
  #ignored because it is not working correctly during development
  Scenario: Enable shrink property
    When I check shrink checkbox
    Then row is shrinked

  @ignore
  @positive
  #ignored because it is not working correctly during development
  Scenario: Disable shrink property
    When I check shrink checkbox
      And I uncheck shrink checkbox
    Then row is not shrinked

  @positive
  Scenario Outline: Set caption to <caption>
    When I set Caption to "<caption>"
    Then caption is set to "<caption>"
    Examples:
      | caption                 |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <> |

  @positive
  Scenario Outline: TotalRecords is set to <totalRecords>
    When I set totalRecords to "<totalRecords>"
      And I check paginate checkbox
    Then totalRecords is set to "<totalRecords>"
    Examples:
      | totalRecords |
      | 0            |
      | 1            |
      | 10           |
      | 100          |
      | 99999999     |

  @positive
  Scenario Outline: TotalRecords is set out of scope to <totalRecords>
    When I set totalRecords to "<totalRecords>"
      And I check paginate checkbox
    Then totalRecords is set to "0"
    Examples:
      | totalRecords            |
      | -1                      |
      | -10                     |
      | Sample text             |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Set theme to <theme>
    When I select theme to "<theme>"
    Then theme on preview is "<theme>"
    Examples:
      | theme          |
      | primary        |
      | secondary      |
      | tertiary       |
      | destructive    |
      | darkBackground |

  @positive
  Scenario: I enable showPageSizeSelection
    When I check paginate checkbox
      And I check showPageSizeSelection checkbox
    Then pageSize is visible

  @positive
  Scenario: I disable showPageSizeSelection
    When I check paginate checkbox
      And I check showPageSizeSelection checkbox
      And I uncheck showPageSizeSelection checkbox
    Then pageSize is not visible