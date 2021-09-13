Feature: Loader Bar default component
  I want to test Loader Bar component properties

  @positive
  Scenario Outline: I set Loader Bar component size to <size>
    When I open Test default "Loader Bar" component with "loaderBar" json from "commonComponents" using "<nameOfObject>" object name
    Then Loader Bar height is set to <height> px
    Examples:
      | size    | height | nameOfObject |
      | small   | 4      | sizeSmall    |
      | default | 8      | sizeDefault  |
      | large   | 16     | sizeLarge    |