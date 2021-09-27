Feature: FlatTable component
  I want to check FlatTable component properties

  @positive
  Scenario: Header and row of FlatTable are visible after scrolling to the bottom right
    Given I open Test default "Flat Table" component with "flatTable" json from "test" using "default" object name
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
    Given I open Test default "Flat Table" component with "flatTable" json from "test" using "default" object name
    When I click on 2 body row
    Then click action was called in Actions Tab

  @positive
  Scenario: Click event after pressing Enter key
    Given I open Test default "Flat Table" component with "flatTable" json from "test" using "default" object name
    When press Enter key on the row element
    Then click action was called in Actions Tab