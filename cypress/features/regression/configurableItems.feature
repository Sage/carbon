Feature: Configurable Items component
  I want to change Configurable Items component

  @positive
  Scenario Outline: Drag record inside Configurable Items element <record> to <destinationId> element position
    Given I open "Configurable Items Test" component page "default" in no iframe
    When I drag Configurable Items "<record>" to <destinationId>
    Then Configurable Items "<record>" is dragged to <destinationId>
    Examples:
      | record | destinationId |
      | test 1 | 1             |
      | test 1 | 2             |
      | test 1 | 3             |
      | test 2 | 1             |
      | test 3 | 2             |