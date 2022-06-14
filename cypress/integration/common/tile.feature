Feature: Tile component
  I want to test Tile component properties

  @positive
  Scenario Outline: I select Tile component as to <variant>
    When I open default "Tile Test" component with "tile" json from "commonComponents" using "<nameOfObject>" object name
    Then Tile component as property is set to "<color>"
    Examples:
      | variant     | color              | nameOfObject       |
      | tile        | rgb(255, 255, 255) | titleVariant       |
      | transparent | rgba(0, 0, 0, 0)   | transparentVariant |

  @positive
  Scenario Outline: Change Tile width to <width>
    When I open default "Tile Test" component with "tile" json from "commonComponents" using "<nameOfObject>" object name
    Then Tile width is set to <width>
    Examples:
      | width | nameOfObject |
      | 1     | width1       |
      | 10    | width10      |
      | 90    | width90      |