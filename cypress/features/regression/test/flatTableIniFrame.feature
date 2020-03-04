Feature: FlatTable component
  I want to check FlatTable component properties

  Background: Open FlatTable component page
    Given I open basic Test "Flat Table" component page

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

  @positive
  Scenario: Click event
    Given I check hasClickableRows checkbox
      And clear all actions in Actions Tab
    When I click on 2 body row
    Then click action was called in Actions Tab

  @positive
  Scenario: Click event after pressing enter key
    Given I check hasClickableRows checkbox
      And clear all actions in Actions Tab
    When click "enter" key on row element
    Then click action was called in Actions Tab

    @positive
  Scenario: Verify outline color
    When I check hasClickableRows checkbox
    Then I focus 2 row and focused row element has golden border on focus