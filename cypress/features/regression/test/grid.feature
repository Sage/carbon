Feature: Grid component
  I want to check Grid component properties

  Background: Open Grid component page
    Given I open "Design System Grid Test" component page "basic" in no iframe

  @positive
  Scenario Outline: Set viewport to default and check size of <podTitle>
    When I resize grid viewport to "default"
    Then pod <index> has height from row "auto" to row "auto"
      And pod <index> has width from column 1 to column 13
    Examples:
      | index | podTitle    |
      | 1     | GridItem 1. |
      | 2     | GridItem 2. |
      | 3     | GridItem 3. |

  @positive
  Scenario Outline: Set viewport to small and check size of <podTitle>
    When I resize grid viewport to "small"
    Then pod <index> has height from row "<index>" to row "<index>"
      And pod <index> has width from column 1 to column 13
    Examples:
      | index | podTitle    |
      | 1     | GridItem 1. |
      | 2     | GridItem 2. |
      | 3     | GridItem 2. |

  @positive
  Scenario Outline: Set viewport to medium and check size of <podTitle>
    When I resize grid viewport to "medium"
    Then pod <index> has height from row "<index>" to row "<index>"
      And pod <index> has width from column 1 to column 13
    Examples:
      | index | podTitle    |
      | 1     | GridItem 1. |
      | 2     | GridItem 2. |
      | 3     | GridItem 3. |

@positive
Scenario Outline: Set viewport to large and check size of <podTitle>
  When I resize grid viewport to "large"
  Then pod <index> has height from row "auto" to row "auto"
    And pod <index> has width from column 1 to column 13
  Examples:
    | index | podTitle    |
    | 1     | GridItem 1. |
    | 2     | GridItem 2. |
    | 3     | GridItem 3. |

@positive
Scenario Outline: Set viewport to <viewport> and check proper margins and grid-gaps
  When I resize grid viewport to "<viewport>"
  Then grid has "margin" set to <margin>
    And grid has "grid-gap" set to <grid-gap>
  Examples:
    | viewport    | margin | grid-gap |
    | extra small | 16     | 16       |
    | small       | 24     | 16       |
    | medium      | 32     | 24       |
    | large       | 40     | 24       |
    | extra large | 40     | 40       |