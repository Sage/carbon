Feature: Draggable Component
  I want to change Draggable component

  Background: Open Draggable Component in iframe
    Given I open basic Test "Draggable" component page in noIframe

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
      | Two    | 1             |
      | Two    | 2             |
      | Two    | 3             |
      | Two    | 4             |
      | Three  | 1             |
      | Three  | 2             |
      | Three  | 3             |
      | Three  | 4             |
      | Four   | 1             |
      | Four   | 2             |
      | Four   | 3             |
      | Four   | 4             |