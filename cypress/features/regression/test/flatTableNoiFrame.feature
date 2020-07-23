Feature: FlatTable component
  I want to check FlatTable component properties

  Background: Open FlatTable component page in no iFrame
    Given I open Design System Flat Table Test component basic page with prop value

  @positive
  Scenario: Header and row of FlatTabel are visible after scrolling to the right bottom
    When I scroll table content to right bottom
    Then 4 header cells are "" visible
      And 4 header cells are "not" visible
      And 6 FlatTable rows are "" visible
      And 6 FlatTable rows are "not" visible