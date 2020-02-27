Feature: FlatTable component
  I want to check FlatTable component properties

  Background: Open FlatTable component page
    Given I open basic Test "Flat Table" component page

  @positive
  Scenario: FlatTable has sticky row header
    When I check hasHeaderRow checkbox
    Then FlatTable has sticky row header

  @positive
  Scenario: FlatTable has sticky header
    When I check hasStickyHead checkbox
    Then FlatTable has sticky header

  @positive
  Scenario: Check that FlatTable has nine rows
    # commented because of BDD default scenario Given - When - Then
    # When I open "Flattable" component page
    Then FlatTable has nine rows

  @positive
  Scenario: Check that FlatTable has seven columns
    # commented because of BDD default scenario Given - When - Then
    # When I open "Flattable" component page
    Then FlatTable has seven columns

  @positive
  Scenario Outline: Check value in <position> header cell
    # commented because of BDD default scenario Given - When - Then
    # When I open "Flattable" component page
    Then "<position>" header cell has value "<text>"
    Examples:
      | position | text              |
      | first    | Client            |
      | second   | Client Type       |
      | third    | Categories        |
      | fourth   | Products          |
      | fifth    | Final Account Due |
      | sixth    | Corp Tax Due      |
      | seventh  | VAT due           |

  @positive
  Scenario Outline: Check value in <position> row
    # commented because of BDD default scenario Given - When - Then
    # When I open "Flattable" component page
    Then FlatTable <position> row contains proper inner content
    Examples:
      | position |
      | 0        |
      | 1        |
      | 2        |
      | 3        |
      | 4        |
      | 5        |
      | 6        |
      | 7        |

  @positive
  Scenario Outline: Header and row of FlatTabel are visible after scrolling to the right bottom
    Given I check hasStickyHead checkbox
      And I check hasHeaderRow checkbox
    When I scroll tabel content to right bottom
    Then "<position>" header cell has value "<text>"
      And 7 FlatTable rows are visible
    Examples:
      | position | text         |
      | first    | Client       |
      | third    | Categories   |
      | fourth   | Products     |
      | sixth    | Corp Tax Due |
      | seventh  | VAT due      |

  @positive
  Scenario: Header and row of FlatTabel are not visible after scrolling to the right bottom
    Given I check hasStickyHead checkbox
      And I check hasHeaderRow checkbox
    When I scroll tabel content to right bottom
    Then "second" header cell is not visible
      And 2 FlatTable rows are not visible