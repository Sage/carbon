Feature: Draggable Component
  I want to change Draggable component

  Background: Open Draggable Component
    Given I open "Draggable Test" component page "default"

  @positive
  Scenario Outline: Drag record <record> inside Draggable to <destinationId> element position
    When I drag Draggable "<record>" to <destinationId>
    Then Draggable "<record>" is dragged to <destinationId>
    Examples:
      | record | destinationId |
      | One    | 1             |
      | One    | 2             |
      | One    | 3             |
      | One    | 4             |
      | Two    | 3             |
      | Three  | 1             |
      | Four   | 2             |