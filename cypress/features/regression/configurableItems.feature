Feature: Configurable Items component
  I want to change Configurable Items component

  Background: Open Configurable Items component page
    Given I open "Configurable Items" component iframe

  @positive
  Scenario Outline: Drag record inside Configurable Items
    When I drag Configurable Items "<record>" to <destinationId>
    Then Configurable Items "<record>" is dragged to <destinationId>
    Examples:
      | record | destinationId |
      | test 1 | 1             |
      | test 1 | 2             |
      | test 1 | 3             |
      | test 2 | 1             |
      | test 2 | 2             |
      | test 2 | 3             |
      | test 3 | 1             |
      | test 3 | 2             |
      | test 3 | 3             |
