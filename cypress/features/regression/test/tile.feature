Feature: Tile component
  I want to test Tile component properties

  @positive
  Scenario Outline: I select Tile component as to <as>
    When I open Test default "Tile" component in noIFrame with "tile" json from "commonComponents" using "<nameOfObject>" object name
    Then Tile component as property is set to "<color>"
    Examples:
      | as          | color              | nameOfObject  |
      | tile        | rgb(255, 255, 255) | asTile        |
      | transparent | rgba(0, 0, 0, 0)   | asTransparent |

  @positive
  Scenario Outline: Change Tile width to <width>
    When I open Test default "Tile" component in noIFrame with "tile" json from "commonComponents" using "<nameOfObject>" object name
    Then Tile width is set to <width>
    Examples:
      | width | nameOfObject |
      | 1     | width1       |
      | 10    | width10      |
      | 90    | width90      |