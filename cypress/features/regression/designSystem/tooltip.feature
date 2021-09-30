Feature: Tooltip component
  I want to test Tooltip component properties

  @positive
  Scenario Outline: Set TooltipPosition to <tooltipPosition>
    When I open default "Tooltip Test" component with "tooltip" json from "commonComponents" using "<nameOfObject>" object name
    Then tooltipPosition is set to "<tooltipPosition>"
    Examples:
      | tooltipPosition | nameOfObject          |
      | right           | tooltipPositionRight  |
      | left            | tooltipPositionLeft   |
      | bottom          | tooltipPositionBottom |
      | top             | tooltipPositionTop    |

  @positive
  Scenario Outline: Set Tooltip message to <tooltipMessage>
    When I open default "Tooltip Test" component with "tooltip" json from "commonComponents" using "<nameOfObject>" object name
    Then tooltip text is set to <tooltipMessage>
    Examples:
      | tooltipMessage               | nameOfObject            |
      | mp150ú¿¡üßä                  | tooltipOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | tooltipSpecialCharacter |

  @positive
  Scenario Outline: Set Tooltip type to <tooltipType>
    When I open default "Tooltip Test" component with "tooltip" json from "commonComponents" using "<nameOfObject>" object name
    Then tooltip type is set to "<tooltipType>" and has color "<color>"
    Examples:
      | tooltipType | nameOfObject       | color            |
      | info        | tooltipTypeInfo    | rgb(0, 0, 0)     |
      | warning     | tooltipTypeWarning | rgb(0, 0, 0)     |
      | error       | tooltipTypeError   | rgb(199, 56, 79) |

  @positive
  Scenario Outline: Set Tooltip size to <tooltipSize>
    When I open default "Tooltip Test" component with "tooltip" json from "commonComponents" using "<nameOfObject>" object name
    Then tooltip size is set to "<tooltipSize>" and has font-size <px>
    Examples:
      | tooltipSize | nameOfObject | px |
      | medium      | tooltipSizeM | 14 |
      | large       | tooltipSizeL | 16 |