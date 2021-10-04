Feature: FlatTable component
  I want to check FlatTable component properties

  @positive
  Scenario: Header and row of FlatTable are visible after scrolling to the bottom right
    Given I open default "Flat Table Test" component with "flatTable" json from "commonComponents" using "default" object name
    When I scroll table content to bottom right
    Then Last 2 header cells are visible
      And First 2 header cells aren't visible
      And Last 4 FlatTable rows are visible
      And First 3 FlatTable rows aren't visible

  @positive
  Scenario Outline: Show page size select list of FlatTable is at the <position> in <size> viewport
    Given I open "Flat Table" component page "paginated with sticky header"
      And I have a <size> viewport
    When pageSize select list is opened
    Then pageSizeSelectList is visible at the <position>
    Examples:
      | position | size  |
      | bottom   | large |
      | top      | small |

  @positive
  Scenario: Click event
    Given I open default "Flat Table Test" component with "flatTable" json from "commonComponents" using "default" object name
    When I click on 2 body row
    Then click action was called in Actions Tab

  @positive
  Scenario: Click event after pressing Enter key
    Given I open default "Flat Table Test" component with "flatTable" json from "commonComponents" using "default" object name
    When press Enter key on the row element
    Then click action was called in Actions Tab

  @positive
  Scenario: FlatTable has sticky row
    When I open "Flat Table" component page "with row header"
    Then FlatTable body rows are sticky
      And FlatTable header first cell is sticky

  @positive
  Scenario: FlatTable has sticky header
    When I open "Flat Table" component page "with sticky head"
    Then FlatTable has sticky header

  @positive
  Scenario: Verify outline color
    When I open "Flat Table" component page "with clickable rows"
    Then I focus 2 row and focused row element has golden border on focus

  @positive
  Scenario Outline: Sort <headerName> flat table column descending
    Given I open "Flat Table Test" component page "sortable"
    When I click on "<position>" header 1 times
    Then "<position>" column is sorted in "desc" order
    Examples:
      | position | headerName |
      | first    | Client     |
      | second   | total      |

  @positive
  Scenario Outline: Sort <headerName> flat table column ascending
    Given I open "Flat Table Test" component page "sortable"
    When I click on "<position>" header 2 times
    Then "<position>" column is sorted in "asc" order
    Examples:
      | position | headerName |
      | first    | Client     |
      | second   | total      |

  @positive
  Scenario Outline: <headerName> flat table header has focus
    Given I open "Flat Table Test" component page "sortable"
    When I focus "<position>" header cell
    Then "<position>" header has focus
    Examples:
      | headerName | position |
      | Client     | first    |
      | total      | second   |

  @positive
  Scenario Outline: <headerName> can be sorted descending after press Enter 1 time
    Given I open "Flat Table Test" component page "sortable"
    When I press "Enter" on "<position>" header 1 time
    Then "<position>" column is sorted in "desc" order
    Examples:
      | headerName | position |
      | Client     | first    |
      | total      | second   |

  @positive
  Scenario Outline: <headerName> can be sorted descending after press Space 1 time
    Given I open "Flat Table Test" component page "sortable"
    When I press "Space" on "<position>" header 1 time
    Then "<position>" column is sorted in "desc" order
    Examples:
      | headerName | position |
      | Client     | first    |
      | total      | second   |

  @positive
  Scenario Outline: <headerName> can be sorted ascending after press Enter 2 time
    Given I open "Flat Table Test" component page "sortable"
    When I press "Enter" on "<position>" header 2 time
    Then "<position>" column is sorted in "asc" order
    Examples:
      | headerName | position |
      | Client     | first    |
      | total      | second   |

  @positive
  Scenario Outline: <headerName> can be sorted ascending after press Space 2 time
    Given I open "Flat Table Test" component page "sortable"
    When I press "Space" on "<position>" header 2 time
    Then "<position>" column is sorted in "asc" order
    Examples:
      | headerName | position |
      | Client     | first    |
      | total      | second   |

  @positive
  Scenario: Row is highlightable and all the elements are highlighted
    Given I open "Flat Table" component page "highlightable rows"
    When I click on the first row
    Then The whole row is highlighted

  @positive
  Scenario Outline: Change caption label to <caption>
    When I open default "Flat Table Test" component with "flatTable" json from "commonComponents" using "<nameOfObject>" object name
    Then Flat table caption is set to <caption>
    Examples:
      | caption                      | nameOfObject            |
      | mp150ú¿¡üßä                  | captionOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | captionSpecialCharacter |

  @positive
  Scenario Outline: I can open the accordion by clicking on the <position> cell in a row when expandable area prop is set to wholeRow
    Given I open "Flat Table Expandable" component page "default story"
    When I click on the <position> cell in the first row
    Then The subrows are visible
    Examples:
      | position |
      | first    |
      | second   |
      | third    |
      | fourth   |

  @positive
  Scenario Outline: I can not open the accordion by clicking on the <position> cell in a row when the expandable area prop is set to firstColumn
    Given I open "Flat Table Expandable" component page "expandable by first column only"
    When I click on the <position> cell in the first row
    Then The subrows are not visible
    Examples:
      | position |
      | second   |
      | third    |
      | fourth   |

  @positive
  Scenario: I can open the accordion by clicking on the first cell in a row when the expandable area prop is set to firstColumn
    Given I open "Flat Table Expandable" component page "expandable by first column only"
    When I click on the first cell
    Then The subrows are visible

  @positive
  Scenario: There is the correct tab order through the expandable rows
    Given I open "Flat Table Expandable" component page "default story"
    When I hit Tab key 3 times
    Then The third content row has focus

  @positive
  Scenario: There is the correct tab order when the row is expandable by first column only
    Given I open "Flat Table Expandable" component page "expandable by first column only"
    When I hit Tab key 3 times
    Then The first cell in the third content row has focus

  @positive
  Scenario Outline: You can open the row using the <key> key
    Given I open "Flat Table Expandable" component page "default story"
    When I hit Tab key 1 time
      And I press keyboard "<key>" key times 1
    Then The subrows are visible
    Examples:
      | key   |
      | Space |
      | Enter |

  @positive
  Scenario Outline: You can open and close the row using the <key> key
    Given I open "Flat Table Expandable" component page "default story"
    When I hit Tab key 1 time
      And I press keyboard "<key>" key times 2
    Then The subrows are not visible
    Examples:
      | key   |
      | Space |
      | Enter |

  @positive
  Scenario Outline: You can open the row using the <key> key when the table is set to expandable by first column only
    Given I open "Flat Table Expandable" component page "expandable by first column only"
    When I hit Tab key 1 time
      And I press keyboard "<key>" key times 1
    Then The subrows are visible
    Examples:
      | key   |
      | Space |
      | Enter |

  @positive
  Scenario Outline: You can open and close the row using the <key> key when the table is set to expandable by first column only
    Given I open "Flat Table Expandable" component page "expandable by first column only"
    When I hit Tab key 1 time
      And I press keyboard "<key>" key times 2
    Then The subrows are not visible
    Examples:
      | key   |
      | Space |
      | Enter |

  @positive
  Scenario: There is the correct tab order when there are multiple tabbable elements in a row
    Given I open "Flat Table Expandable" component page "both parent and children selectable"
    When I hit Tab key 8 times
    Then The second content row has focus

  @positive
  Scenario: You can use shift tab to move back through the tabbable elements
    Given I open "Flat Table Expandable" component page "both parent and children selectable"
    When I hit shift Tab key 3 times
    Then The fourth content row has focus

  @positive
  Scenario Outline: You can not navigate through the rows using the <key> arrow key
    Given I open "Flat Table Expandable" component page "both parent and children selectable"
    When I hit Tab key 5 times
      And I press keyboard "<key>" key times 1
    Then The first content row has focus
    Examples:
      | key        |
      | downarrow  |
      | uparrow    |
      | leftarrow  |
      | rightarrow |

  @positive
  Scenario: You can enter the sub rows using the keyboard
    Given I open "Flat Table Expandable" component page "both parent and children selectable"
    When I hit Tab key 5 times
      And I press keyboard "Enter" key times 1
      And I continue to hit Tab key 4 times
    Then The first subrow action popover has focus

  @positive
  Scenario: You leave the subrows when pressing tab at the end of the subrows tabbable content
    Given I open "Flat Table Expandable" component page "both parent and children selectable"
    When I hit Tab key 5 times
      And I press keyboard "Enter" key times 1
      And I continue to hit Tab key 7 times
    Then The fourth content row has focus

  @positive
  Scenario: Five rows are visible without Enter key pressed
    Given I open "Flat Table" component page "paginated"
      And 5 rows are visible
    When I type 1 in pagination input
      And I hit Tab key 2 times
    Then 5 rows are visible
      And Pagination input should have 5 value

  @positive
  Scenario: One row is visible after Enter key is pressed
    Given I open "Flat Table" component page "paginated"
      And 5 rows are visible
    When I type 1 in pagination input
      And I press "Enter" onto focused element
    Then 1 row is visible
      And Pagination input should have 1 value

  @positive
  Scenario: You can collapse all rows by clicking on Collapse All
    Given I open "Flat Table Expandable" component page "controlled"
    When I click "Collapse All" button on preview
    Then The subrows are not visible

  @positive
  Scenario: You can expand all rows by clicking on Expand All
    Given I open "Flat Table Expandable" component page "controlled"
      And I click "Collapse All" button on preview
      And I wait 100
    When I click "Expand All" button on preview
    Then The subrows are visible