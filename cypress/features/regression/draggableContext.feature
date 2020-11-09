Feature: Draggable Context component
  I want to change Draggable Context component

  Background: Open Draggable Context component in no iframe
    Given I open "DraggableContext Test" component page "default" in no iframe

  @positive
  Scenario Outline: Drag record <record> inside Draggable Context to <destinationId> element position
    When I drag Draggable Context "<record>" to <destinationId>
    Then Draggable Context "<record>" is dragged to <destinationId>
    Examples:
      | record  | destinationId |
      | UK      | 1             |
      | UK      | 2             |
      | UK      | 3             |
      | UK      | 4             |
      | China   | 2             |
      | Germany | 1             |
      | US      | 3             |