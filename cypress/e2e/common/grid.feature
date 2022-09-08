Feature: Grid component
  I want to check Grid component properties

  Background: Open Grid component page
    Given I open default "Grid Test" component with "grid" json from "commonComponents" using "default" object name

  @positive
  Scenario Outline: Set viewport to default and check size of <item>
    When I resize grid viewport to "default"
    Then grid item <index> has height from row "auto" to row "auto"
      And grid item <index> has width from column 1 to column 13
    Examples:
      | index | item        |
      | 0     | GridItem 1. |
      | 1     | GridItem 2. |
      | 2     | GridItem 3. |

  @positive
  Scenario Outline: Set viewport to small and check size of <item>
    When I resize grid viewport to "small"
    Then grid item <index> has height from row <rowStart> to row <rowEnd>
      And grid item <index> has width from column 1 to column 13
    Examples:
      | index | item        | rowStart | rowEnd |
      | 0     | GridItem 1. | 1        | 1      |
      | 1     | GridItem 2. | 2        | 2      |
      | 2     | GridItem 3. | 3        | 3      |

  @positive
  Scenario Outline: Set viewport to medium and check size of <item>
    When I resize grid viewport to "medium"
    Then grid item <index> has height from row <rowStart> to row <rowEnd>
      And grid item <index> has width from column 1 to column 13
    Examples:
      | index | item        | rowStart | rowEnd |
      | 0     | GridItem 1. | 1        | 1      |
      | 1     | GridItem 2. | 2        | 2      |
      | 2     | GridItem 3. | 3        | 3      |

  @positive
  Scenario Outline: Set viewport to large and check size of <item>
    When I resize grid viewport to "large"
    Then grid item <index> has height from row "auto" to row "auto"
      And grid item <index> has width from column 1 to column 13
    Examples:
      | index | item        |
      | 0     | GridItem 1. |
      | 1     | GridItem 2. |
      | 2     | GridItem 3. |

  @positive
  Scenario Outline: Set viewport to <viewport> and check proper paddings and grid-gaps
    When I resize grid viewport to "<viewport>"
    Then grid has "padding" set to <padding>
      And grid has "grid-gap" set to <grid-gap>
    Examples:
      | viewport    | padding | grid-gap |
      | extra small | 16      | 16       |
      | small       | 24      | 16       |
      | medium      | 32      | 24       |
      | large       | 40      | 24       |
      | extra large | 40      | 40       |