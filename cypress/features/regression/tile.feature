Feature: Tile component
  I want to test Tile component properties

  @positive
  Scenario Outline: I select Tile component as to <as>
    When I open default "Tile" component in noIFrame with "tile" json from "commonComponents" using "<nameOfObject>" object name
    Then Tile component as property is set to "<color>"
    Examples:
      | as          | color              | nameOfObject  |
      | tile        | rgb(255, 255, 255) | asTile        |
      | transparent | rgba(0, 0, 0, 0)   | asTransparent |

  @positive
  Scenario Outline: I select Tile component orientation to <orientation>
    When I open default "Tile" component in noIFrame with "tile" json from "commonComponents" using "<nameOfObject>" object name
    Then Tile component orientation property is set to "<orientation>"
    Examples:
      | orientation | nameOfObject          |
      | horizontal  | orientationHorizontal |
      | vertical    | orientationVertical   |

  @positive
  Scenario Outline: I select Tile component padding to <padding>
    When I open default "Tile" component in noIFrame with "tile" json from "commonComponents" using "<nameOfObject>" object name
    Then Tile component padding property is set to "<px>"
    Examples:
      | padding | px | nameOfObject |
      | XS      | 8  | paddingXS    |
      | S       | 16 | paddingS     |
      | M       | 24 | paddingM     |
      | L       | 32 | paddingL     |
      | XL      | 40 | paddingXL    |

  @positive
  Scenario Outline: Change Tile pixelWidth to <pixelWidth>
    When I open default "Tile" component in noIFrame with "tile" json from "commonComponents" using "<nameOfObject>" object name
    Then Tile pixel width is set to <pixelWidth>
    Examples:
      | pixelWidth | nameOfObject   |
      | 1          | pixelWidth1    |
      | 100        | pixelWidth100  |
      | 1999       | pixelWidth1999 |

  @positive
  Scenario Outline: Change Tile width to <width>
    When I open default "Tile" component in noIFrame with "tile" json from "commonComponents" using "<nameOfObject>" object name
    Then Tile width is set to <width>
    Examples:
      | width | nameOfObject |
      | 1     | width1       |
      | 10    | width10      |
      | 90    | width90      |