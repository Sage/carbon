Feature: FlatTable component
  I want to check FlatTable component properties

  Background: Open FlatTable component page in no iFrame
    Given I open Test test_default "Flat-Table" component in noIFrame with "flatTable" json from "test" using "default" object name


  @positive
  Scenario: Header and row of FlatTable are visible after scrolling to the bottom right
    When I scroll table content to bottom right
    Then Last 2 header cells are visible
      And First 2 header cells aren't visible
      And Last 4 FlatTable rows are visible
      And First 3 FlatTable rows aren't visible

