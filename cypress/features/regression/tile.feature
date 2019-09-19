Feature: Tile component
  I want to change Tile component properties

  Background: Open Tile component page
    Given I open "Tile" component page

  @positive
  Scenario Outline: I select Tile component as to <as>
    When I select as to "<as>"
    Then Tile component as property is set to "<color>"
    Examples:
      | as          | color              |
      | tile        | rgb(255, 255, 255) |
      | transparent | rgba(0, 0, 0, 0)   |

  @positive
  Scenario Outline: I select Tile component orientation to <orientation>
    When I select orientation to "<orientation>"
    Then Tile component orientation property is set to "<orientation>"
    Examples:
      | orientation |
      | horizontal  |
      | vertical    |

  @positive
  Scenario Outline: I select Tile component padding to <padding>
    When I select padding to "<padding>"
    Then Tile component padding property is set to "<px>"
    Examples:
      | padding | px |
      | XS      | 8  |
      | S       | 16 |
      | M       | 24 |
      | L       | 32 |
      | XL      | 40 |

  @positive
  Scenario Outline: Change Tile pixelWidth to <width>
    When I set pixelWidth slider to <width>
    Then Tile pixelWidth is set to <width>
    Examples:
      | width |
      | 1     |
      | 100   |
      | 533   |
      | 1999  |

  @positive
  Scenario Outline: Change Tile width to <width>
    When I set width slider to <width>
    Then Tile width is set to <px>
    Examples:
      | width | px  |
      | 1     | 11  |
      | 10    | 106 |
      | 50    | 531 |
      | 90    | 955 |