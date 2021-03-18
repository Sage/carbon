Feature: FlatTable component
  I want to check FlatTable component properties in no iFrame

  @positive
  Scenario: Header and row of FlatTable are visible after scrolling to the bottom right
    Given I open Test default "Flat Table" component in noIFrame with "flatTable" json from "test" using "default" object name
    When I scroll table content to bottom right
    Then Last 2 header cells are visible
      And First 2 header cells aren't visible
      And Last 4 FlatTable rows are visible
      And First 3 FlatTable rows aren't visible

@positive
  Scenario Outline: Show page size select list of FlatTable is at the <position> in <size> viewport
    Given I open "Design System Flat Table" component page "paginated with sticky header" in no iframe
      And I have a <size> viewport
    When pageSize select list is opened
    Then pageSizeSelectList is visible at the <position>
    Examples:
      | position | size  |
      | bottom   | large |
      | top      | small |   