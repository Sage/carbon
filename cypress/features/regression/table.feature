Feature: Table component
  I want to change Table component properties

  Background: Open Table component default page
    Given I open "Table" component page

  @positive
  Scenario: I enable showPageSizeSelection
    When I check paginate checkbox
      And I check showPageSizeSelection checkbox
    Then pageSize is visible

  @positive
  Scenario: I disable showPageSizeSelection
    Given I check paginate checkbox
      And I check showPageSizeSelection checkbox
    When I uncheck showPageSizeSelection checkbox
    Then pageSize is not visible

  @positive
  Scenario: I enable selectable
    When I check selectable checkbox
    Then rows are selectable

  @positive
  Scenario: I disable selectable
    Given I check selectable checkbox
    When I uncheck selectable checkbox
    Then rows are not selectable

  @positive
  Scenario: Verify action toolbar elements
    Given I check selectable checkbox
    When I check checkbox on header
    Then Action Toolbar elemens are visible and have "rgb(0, 128, 93)" color

  @positive
  Scenario Outline: Row <rowNumber> is highlighted
    When I check highlightable checkbox
      And I click row by number <rowNumber>
    Then row number <rowNumber> is highlighted
    Examples:
      | rowNumber |
      | 1         |
      | 2         |
      | 3         |

  @positive
  Scenario Outline: Row <rowNumber> is not highlighted
    Given I check highlightable checkbox
    When I uncheck highlightable checkbox
      And I click row by number <rowNumber>
    Then row number <rowNumber> is not highlighted
    Examples:
      | rowNumber |
      | 1         |
      | 2         |
      | 3         |

  @positive
  Scenario Outline: Sort <headerName> Column by <sortColumn>
    When I select sortColumn to "<sortColumn>"
    Then "<headerName>" Table column can be sorted
    Examples:
      | sortColumn | headerName |
      | name       | Country    |
      | code       | Code       |

  @positive
  Scenario Outline: Sort Country column in <sortOrder> order
    Given I select sortColumn to "name"
    When I select sortOrder to "<sortOrder>"
    Then Country column is sorted in "<sortOrder>" order
    Examples:
      | sortOrder |
      | desc      |
      | asc       |

  @positive
  Scenario Outline: Sort Code column in <sortOrder> order
    Given I select sortColumn to "code"
    When I select sortOrder to "<sortOrder>"
    Then Code column is sorted in "<sortOrder>" order
    Examples:
      | sortOrder |
      | desc      |
      | asc       |

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
    When I set caption to "<caption>"
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
    Then totalRecords is set to "<totalRecords>" items
    Examples:
      | totalRecords |
      | 0            |
      | 1            |
      | 10           |
      | 100          |
      | 99999999     |
      | -1           |
      | -10          |

  @positive
  Scenario Outline: TotalRecords is set out of scope to <totalRecords>
    When I set totalRecords to "<totalRecords>"
      And I check paginate checkbox
    Then totalRecords is set to "" items
    Examples:
      | totalRecords            |
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
      | theme     |
      | primary   |
      | secondary |
      | tertiary  |

  @positive
  Scenario Outline: Change Table header size to <size>
    When I select size to "<size>"
    Then Table header size on preview is set to "<size>"
    Examples:
      | size    |
      | compact |
      | small   |
      | medium  |
      | large   |

  @positive
  Scenario Outline: I enable zebra striping for <position> row in Table
    When I check zebra striping checkbox
    Then <position> row has zebra striping
    Examples:
      | position |
      | 0        |
      | 1        |
      | 4        |
      | 5        |
      | 8        |
      | 9        |

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
  Scenario Outline: Page size records is set to <pageSizeRecords>
    When I set pageSize to "<pageSizeRecords>"
    Then I see <pageSizeRecords> records
    Examples:
      | pageSizeRecords |
      | 0               |
      | 1               |
      | 2               |
      | 5               |

  @positive
  Scenario Outline: Change action was called for sortColumn
    Given I select sortColumn to "<sortColumn>"
    When clear all actions in Actions Tab
      And I click "<headerName>" header
    Then change action was called in Actions Tab
    Examples:
      | sortColumn | headerName |
      | name       | Country    |
      | code       | Code       |

  @positive
  Scenario Outline: Change action was called after clicking <button> button
    Given I check paginate checkbox
    When clear all actions in Actions Tab
      And I click "<button>" pagination button
    Then change action was called in Actions Tab
    Examples:
      | button |
      | next   |
      | last   |

  @positive
  Scenario Outline: Change action was called after clicking <button> button
    Given I check paginate checkbox
      And I click "last" pagination button
    When clear all actions in Actions Tab
      And I click "<button>" pagination button
    Then change action was called in Actions Tab
    Examples:
      | button   |
      | previous |
      | first    |