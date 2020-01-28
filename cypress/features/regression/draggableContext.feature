Feature: Draggable Context component
  I want to change Draggable Context component

  Background: Open Draggable Context component in iframe
    Given I open "DraggableContext" component in iframe

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
      | China   | 1             |
      | China   | 2             |
      | China   | 3             |
      | China   | 4             |
      | Germany | 1             |
      | Germany | 2             |
      | Germany | 3             |
      | Germany | 4             |
      | US      | 1             |
      | US      | 2             |
      | US      | 3             |
      | US      | 4             |