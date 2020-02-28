Feature: FlatTable component
  I want to check FlatTable component properties

  Background: Open FlatTable component page
    Given I open "test-flat-table" component page basic
    
  @positive
  Scenario: FlatTable has sticky row
    # commented because of BDD default scenario Given - When - Then
    # I open "test-flat-table" component page basic
    When I check hasHeaderRow checkbox
    Then FlatTable has sticky row

  @positive
  Scenario: FlatTable has sticky header
    # commented because of BDD default scenario Given - When - Then
    # I open "test-flat-table" component page basic
    When I check hasStickyHead checkbox
    Then FlatTable has sticky header

  @positive
  Scenario: FlatTable has nine rows
    # commented because of BDD default scenario Given - When - Then
    # I open "test-flat-table" component page basic
    Then FlatTable has nine rows

  @positive
  Scenario: FlatTable has seven columns
    # commented because of BDD default scenario Given - When - Then
    # I open "test-flat-table" component page basic
    Then FlatTable has seven columns

  @positive
  Scenario Outline: Check value in <position> header cell
    # commented because of BDD default scenario Given - When - Then
    # I open "test-flat-table" component page basic
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
    # I open "test-flat-table" component page basic
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