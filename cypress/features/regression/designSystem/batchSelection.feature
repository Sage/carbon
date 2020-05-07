Feature: Design Systems Batch selection component
  I want to test Design Systems Batch selection component

  Background: Open Design Systems Batch selection component page
    Given I open Design Systems basic "Batch selection" component docs page

  @positive
  Scenario Outline: I focus <buttonIndex> inner element for Batch selection component
    When I focus Batch selection "<buttonIndex>" button
    Then Batch selection component "<buttonIndex>" button is focused
    Examples:
      | buttonIndex |
      | first       |
      | second      |
      | third       |