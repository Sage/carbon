Feature: Table With Inputs component
  I want to check Table With Inputs component properties

  @positive
  Scenario: I enable selectable
    When I open default_with_inputs "Table Test" component in noIFrame with "table" json from "commonComponents" using "selectable" object name
    Then rows are selectable

  @positive
  Scenario: I disable selectable
    When I open default_with_inputs "Table Test" component in noIFrame with "table" json from "commonComponents" using "selectableFalse" object name
    Then rows are not selectable

  @positive
  Scenario Outline: Row <rowNumber> is highlighted
    Given I open default_with_inputs "Table Test" component in noIFrame with "table" json from "commonComponents" using "highlightable" object name
    When I click row by number <rowNumber>
    Then row number <rowNumber> is highlighted
    Examples:
      | rowNumber |
      | 1         |
      | 2         |
      | 3         |

  @positive
  Scenario Outline: Row <rowNumber> is not highlighted
    Given I open default_with_inputs "Table Test" component in noIFrame with "table" json from "commonComponents" using "highlightableFalse" object name
    When I click row by number <rowNumber>
    Then row number <rowNumber> is not highlighted
    Examples:
      | rowNumber |
      | 1         |
      | 2         |
      | 3         |

  @positive
  Scenario Outline: Sort Table <headerName> Column by <sortedColumn>
    Given I open default_with_inputs "Table Test" component in noIFrame with "table" json from "commonComponents" using "<nameOfObject>" object name
    Then "<headerName>" Table column can be sorted
    Examples:
      | nameOfObject     | headerName |
      | sortedColumnName | Country    |
      | sortedColumnCode | Code       |

  @positive
  Scenario Outline: Sort Code column in <sortOrder> order
    Given I open default_with_inputs "Table Test" component in noIFrame with "table" json from "commonComponents" using "<nameOfObject>" object name
    Then Code column is sorted in "<sortOrder>" order
    Examples:
      | sortOrder | nameOfObject |
      | desc      | sortCodeDesc |
      | asc       | sortCodeAsc  |

  @positive
  Scenario Outline: Set caption to <caption>
    When I open default_with_inputs "Table Test" component in noIFrame with "table" json from "commonComponents" using "<nameOfObject>" object name
    Then caption is set to <caption>
    Examples:
      | caption                      | nameOfObject            |
      | mp150ú¿¡üßä                  | captionOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | captionSpecialCharacter |

  @positive
  Scenario Outline: TotalRecords is set to <totalRecords> items
    When I open default_with_inputs "Table Test" component in noIFrame with "table" json from "commonComponents" using "<nameOfObject>" object name
    Then totalRecords is set to "<totalRecords>" items
    Examples:
      | totalRecords | nameOfObject         |
      | 0            | totalRecords0        |
      | 100          | totalRecords100      |
      | 99999999     | totalRecords99999999 |
      | -10          | totalRecords-10      |

  @positive
  Scenario: TotalRecords is set to 1 item
    When I open default_with_inputs "Table Test" component in noIFrame with "table" json from "commonComponents" using "totalRecords1" object name
    Then totalRecords is set to "1" item

  @positive
  Scenario Outline: TotalRecords is set out of scope to <totalRecords>
    When I open default_with_inputs "Table Test" component in noIFrame with "table" json from "commonComponents" using "<nameOfObject>" object name
    Then totalRecords is set to "" items
    Examples:
      | totalRecords                 | nameOfObject                 |
      | mp150ú¿¡üßä                  | totalRecordsOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | totalRecordsSpecialCharacter |

  @positive
  Scenario Outline: Set theme to <theme>
    When I open default_with_inputs "Table Test" component in noIFrame with "table" json from "commonComponents" using "<nameOfObject>" object name
    Then theme on preview is "<theme>"
    Examples:
      | theme     | nameOfObject   |
      | primary   | themePrimary   |
      | secondary | themeSecondary |
      | tertiary  | themeTertiary  |

  @positive
  Scenario Outline: Change Table header size to <size>
    When I open default_with_inputs "Table Test" component in noIFrame with "table" json from "commonComponents" using "<nameOfObject>" object name
    Then Table header size on preview is set to "<size>"
    Examples:
      | size    | nameOfObject |
      | compact | sizeCompact  |
      | small   | sizeSmall    |
      | medium  | sizeMedium   |
      | large   | sizeLarge    |

  @positive
  Scenario Outline: I enable zebra striping for <position> row in Table
    When I open default_with_inputs "Table Test" component in noIFrame with "table" json from "commonComponents" using "zebraStriping" object name
    Then <position> row has zebra striping
    Examples:
      | position |
      | 0        |
      | 1        |
      | 4        |
      | 5        |
      | 8        |
      | 9        |

  @positive
  Scenario Outline: Set input type to <inputType>
    When I open default_with_inputs "Table Test" component in noIFrame with "table" json from "commonComponents" using "<nameOfObject>" object name
    Then input type on preview is set to "<inputType>"
    Examples:
      | inputType | nameOfObject      |
      | textbox   | inputTypeTextbox  |
      | textarea  | inputTypeTextarea |
      | date      | inputTypeDate     |

  @positive
  Scenario Outline: Page size records is set to <pageSizeRecords>
    When I open default_with_inputs "Table Test" component in noIFrame with "table" json from "commonComponents" using "<nameOfObject>" object name
    Then I see <pageSizeRecords> records
    Examples:
      | pageSizeRecords | nameOfObject |
      | 0               | pageSize0    |
      | 1               | pageSize1    |
      | 2               | pageSize2    |
      | 5               | pageSize5    |