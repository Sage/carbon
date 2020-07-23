Feature: Batch selection component
  I want to test Batch selection component properties

  Background: Open Batch selection component page
    Given I open "Design System Batch Selection Test" component page "basic"

  @positive
  Scenario: Hide Batch selection component
    When I check hidden checkbox
    Then Batch selection component is hidden

  @positive
  Scenario Outline: Set selectedCount Batch selection component to <selectedCount>
    When I set selectedCount to "<selectedCount>"
    Then Batch selection component selectedCount is set to "<selectedCount>"
    Examples:
      | selectedCount |
      | 0             |
      | 10            |
      | 100           |