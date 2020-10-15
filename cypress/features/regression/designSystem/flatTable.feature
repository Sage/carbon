Feature: Design Systems FlatTable component
  I want to test Design Systems FlatTable component

  @positive
  Scenario: FlatTable has sticky row
    When I open "Design System Flat Table" component page "with_row_header" in no iframe
    Then FlatTable rows are sticky

  @positive
  Scenario: FlatTable has sticky header
    When I open "Design System Flat Table" component page "with_sticky_head" in no iframe
    Then FlatTable has sticky header

  @positive
  Scenario: Verify outline color
    When I open "Design System Flat Table" component page "with_clickable_rows" in no iframe
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