Feature: Batch selection component
  I want to test Batch selection component

  @positive
  Scenario Outline: I focus <buttonIndex> inner element for Batch selection component
    Given I open "Batch selection" component page "default story"
    When I focus Batch selection "<buttonIndex>" button
    Then Batch selection component "<buttonIndex>" button is focused
    Examples:
      | buttonIndex |
      | first       |
      | second      |
      | third       |