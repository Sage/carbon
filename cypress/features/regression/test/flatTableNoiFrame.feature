Feature: FlatTable component
  I want to check FlatTable component properties

  Background: Open FlatTable component page in no iFrame
    Given I open Test test_basic "Flat-Table" component in noIFrame with "flatTable" json from "test" using "default" object name


  @positive
  Scenario: Header and row of FlatTable are visible after scrolling to the right bottom
    When I scroll table content to right bottom
    Then 4 header cells are "" visible
      And 4 header cells are "not" visible
      And 6 FlatTable rows are "" visible
      And 6 FlatTable rows are "not" visible