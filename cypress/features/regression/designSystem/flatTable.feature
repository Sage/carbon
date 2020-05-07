Feature: Design Systems FlatTable component
  I want to test Design Systems FlatTable component

  Background: Open Design Systems FlatTable component page
    Given I open Design Systems basic "Flat Table" component docs page

  @positive
  Scenario: FlatTable has sticky row
    # commented because of BDD default scenario Given - When - Then
    # When I open Design Systems basic "Flat Table" component docs page
    Then FlatTable rows are sticky

  @positive
  Scenario: FlatTable has sticky header
    # commented because of BDD default scenario Given - When - Then
    # When I open Design Systems basic "Flat Table" component docs page
    Then FlatTable has sticky header

  @positive
  Scenario: Verify outline color
    # commented because of BDD default scenario Given - When - Then
    # When I open Design Systems basic "Flat Table" component docs page
    Then I focus 2 row and focused row element has golden border on focus

  @positive
  Scenario Outline: Sort <headerName> flat table column descending
    When I click on "<position>" header 1 times
    Then "<position>" column is sorted in "desc" order
    Examples:
      | position | headerName |
      | first    | Client     |
      | second   | total      |

  @positive
  Scenario Outline: Sort <headerName> flat table column ascending
    When I click on "<position>" header 2 times
    Then "<position>" column is sorted in "asc" order
    Examples:
      | position | headerName |
      | first    | Client     |
      | second   | total      |

  @positive
  Scenario Outline: <headerName> flat table header has focus
    When I focus "<position>" header cell
    Then "<position>" header has focus
    Examples:
      | headerName | position |
      | Client     | first    |
      | total      | second   |

  @positive
  Scenario Outline: <headerName> can be sorted descending after press Enter 1 time
    When I press "Enter" on "<position>" header 1 time
    Then "<position>" column is sorted in "desc" order
    Examples:
      | headerName | position |
      | Client     | first    |
      | total      | second   |

  @positive
  Scenario Outline: <headerName> can be sorted descending after press Space 1 time
    When I press "Space" on "<position>" header 1 time
    Then "<position>" column is sorted in "desc" order
    Examples:
      | headerName | position |
      | Client     | first    |
      | total      | second   |

  @positive
  Scenario Outline: <headerName> can be sorted ascending after press Enter 2 time
    When I press "Enter" on "<position>" header 2 time
    Then "<position>" column is sorted in "asc" order
    Examples:
      | headerName | position |
      | Client     | first    |
      | total      | second   |

  @positive
  Scenario Outline: <headerName> can be sorted ascending after press Space 2 time
    When I press "Space" on "<position>" header 2 time
    Then "<position>" column is sorted in "asc" order
    Examples:
      | headerName | position |
      | Client     | first    |
      | total      | second   |