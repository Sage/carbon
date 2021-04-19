Feature: Design Systems FlatTable component
  I want to test Design Systems FlatTable component

  @positive
  Scenario: FlatTable has sticky row
    When I open "Design System Flat Table" component page "with row header" in no iframe
    Then FlatTable body rows are sticky
      And FlatTable header first cell is sticky

  @positive
  Scenario: FlatTable has sticky header
    When I open "Design System Flat Table" component page "with sticky head" in no iframe
    Then FlatTable has sticky header

  @positive
  Scenario: Verify outline color
    When I open "Design System Flat Table" component page "with clickable rows" in no iframe
    Then I focus 2 row and focused row element has golden border on focus

  @positive
  Scenario Outline: Sort <headerName> flat table column descending
    Given I open "Design System Flat Table Test" component page "sortable" in no iframe
    When I click on "<position>" header 1 times
    Then "<position>" column is sorted in "desc" order
    Examples:
      | position | headerName |
      | first    | Client     |
      | second   | total      |

  @positive
  Scenario Outline: Sort <headerName> flat table column ascending
    Given I open "Design System Flat Table Test" component page "sortable" in no iframe
    When I click on "<position>" header 2 times
    Then "<position>" column is sorted in "asc" order
    Examples:
      | position | headerName |
      | first    | Client     |
      | second   | total      |

  @positive
  Scenario Outline: <headerName> flat table header has focus
    Given I open "Design System Flat Table Test" component page "sortable" in no iframe
    When I focus "<position>" header cell
    Then "<position>" header has focus
    Examples:
      | headerName | position |
      | Client     | first    |
      | total      | second   |

  @positive
  Scenario Outline: <headerName> can be sorted descending after press Enter 1 time
    Given I open "Design System Flat Table Test" component page "sortable" in no iframe
    When I press "Enter" on "<position>" header 1 time
    Then "<position>" column is sorted in "desc" order
    Examples:
      | headerName | position |
      | Client     | first    |
      | total      | second   |

  @positive
  Scenario Outline: <headerName> can be sorted descending after press Space 1 time
    Given I open "Design System Flat Table Test" component page "sortable" in no iframe
    When I press "Space" on "<position>" header 1 time
    Then "<position>" column is sorted in "desc" order
    Examples:
      | headerName | position |
      | Client     | first    |
      | total      | second   |

  @positive
  Scenario Outline: <headerName> can be sorted ascending after press Enter 2 time
    Given I open "Design System Flat Table Test" component page "sortable" in no iframe
    When I press "Enter" on "<position>" header 2 time
    Then "<position>" column is sorted in "asc" order
    Examples:
      | headerName | position |
      | Client     | first    |
      | total      | second   |

  @positive
  Scenario Outline: <headerName> can be sorted ascending after press Space 2 time
    Given I open "Design System Flat Table Test" component page "sortable" in no iframe
    When I press "Space" on "<position>" header 2 time
    Then "<position>" column is sorted in "asc" order
    Examples:
      | headerName | position |
      | Client     | first    |
      | total      | second   |

  @positive
  Scenario: Row is highlightable and all the elements are highlighted
    Given I open "Design System Flat Table" component page "highlightable rows" in no iframe
    When I click on the first row
    Then The whole row is highlighted

  @positive
  Scenario Outline: Change caption label to <caption>
    When I open default "Design System Flat Table Test" component in noIFrame with "flatTable" json from "designSystem" using "<nameOfObject>" object name
    Then Flat table caption is set to <caption>
    Examples:
      | caption                      | nameOfObject            |
      | mp150ú¿¡üßä                  | captionOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | captionSpecialCharacter |

  @positive
  Scenario Outline: I can open the accordion by clicking on the <position> cell in a row when expandable area prop is set to wholeRow
    Given I open "Design System Flat Table Expandable" component page "default story" in no iframe
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
    Given I open "Design System Flat Table Expandable" component page "expandable by first column only" in no iframe
    When I click on the <position> cell in the first row
    Then The subrows are not visible
    Examples:
      | position |
      | second   |
      | third    |
      | fourth   |

  @positive
  Scenario: I can open the accordion by clicking on the first cell in a row when the expandable area prop is set to firstColumn
    Given I open "Design System Flat Table Expandable" component page "expandable by first column only" in no iframe
    When I click on the first cell
    Then The subrows are visible

  @positive
  Scenario: There is the correct tab order through the expandable rows
    Given I open "Design System Flat Table Expandable" component page "default story" in no iframe
    When I hit Tab key 3 times in no Iframe
    Then The third content row has focus

  @positive
  Scenario: There is the correct tab order when the row is expandable by first column only
    Given I open "Design System Flat Table Expandable" component page "expandable by first column only" in no iframe
    When I hit Tab key 3 times in no Iframe
    Then The first cell in the third content row has focus

  @positive
  Scenario Outline: You can open the row using the <key> key
    Given I open "Design System Flat Table Expandable" component page "default story" in no iframe
    When I hit Tab key 1 time in no Iframe
      And I press keyboard "<key>" key times 1
    Then The subrows are visible
    Examples:
      | key   |
      | Space |
      | Enter |

  @positive
  Scenario Outline: You can open and close the row using the <key> key
    Given I open "Design System Flat Table Expandable" component page "default story" in no iframe
    When I hit Tab key 1 time in no Iframe
      And I press keyboard "<key>" key times 2
    Then The subrows are not visible
    Examples:
      | key   |
      | Space |
      | Enter |

  @positive
  Scenario Outline: You can open the row using the <key> key when the table is set to expandable by first column only
    Given I open "Design System Flat Table Expandable" component page "expandable by first column only" in no iframe
    When I hit Tab key 1 time in no Iframe
      And I press keyboard "<key>" key times 1
    Then The subrows are visible
    Examples:
      | key   |
      | Space |
      | Enter |

  @positive
  Scenario Outline: You can open and close the row using the <key> key when the table is set to expandable by first column only
    Given I open "Design System Flat Table Expandable" component page "expandable by first column only" in no iframe
    When I hit Tab key 1 time in no Iframe
      And I press keyboard "<key>" key times 2
    Then The subrows are not visible
    Examples:
      | key   |
      | Space |
      | Enter |

  @positive
  Scenario: There is the correct tab order when there are multiple tabbable elements in a row
    Given I open "Design System Flat Table Expandable" component page "both parent and chidren selectable" in no iframe
    When I hit Tab key 8 times in no Iframe
    Then The second content row has focus

  @positive
  Scenario: You can use shift tab to move back through the tabbable elements
    Given I open "Design System Flat Table Expandable" component page "both parent and chidren selectable" in no iframe
    When I hit shift Tab key 3 times in no Iframe
    Then The fourth content row has focus

  @positive
  Scenario Outline: You can not navigate through the rows using the <key> arrow key
    Given I open "Design System Flat Table Expandable" component page "both parent and chidren selectable" in no iframe
    When I hit Tab key 5 times in no Iframe
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
    Given I open "Design System Flat Table Expandable" component page "both parent and chidren selectable" in no iframe
    When I hit Tab key 5 times in no Iframe
      And I press keyboard "Enter" key times 1
      And I continue to hit Tab key 4 times in no Iframe
    Then The first subrow action popover has focus

  @positive
  Scenario: You leave the subrows when pressing tab at the end of the subrows tabbable content
    Given I open "Design System Flat Table Expandable" component page "both parent and chidren selectable" in no iframe
    When I hit Tab key 5 times in no Iframe
      And I press keyboard "Enter" key times 1
      And I continue to hit Tab key 7 times in no Iframe
    Then The fourth content row has focus

  @positive
  Scenario: Five rows are visible without Enter key pressed 
    Given I open "Design System Flat Table" component page "paginated" in no iframe
      And 5 rows are visible
    When I type 1 in pagination input
      And I hit Tab key 2 times in no Iframe
    Then 5 rows are visible
      And Pagination input should have 5 value

  @positive
  Scenario: One row is visible after Enter key is pressed
    Given I open "Design System Flat Table" component page "paginated" in no iframe
      And 5 rows are visible
    When I type 1 in pagination input
      And I press "Enter" onto focused element
    Then 1 row is visible
      And Pagination input should have 1 value