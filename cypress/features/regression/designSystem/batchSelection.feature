Feature: Design Systems Batch selection component
  I want to test Design Systems Batch selection component

  @positive
  Scenario Outline: I focus <buttonIndex> inner element for Batch selection component
    Given I open "Design System Batch selection" component page "basic" in no iframe
    When I focus Batch selection "<buttonIndex>" button
    Then Batch selection component "<buttonIndex>" button is focused
    Examples:
      | buttonIndex |
      | first       |
      | second      |
      | third       |