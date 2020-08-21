Feature: Help component
  I want to test Help component properties

  @positive
  Scenario Outline: Change children to <children>
    When I open default "Help" component in noIFrame with "help" json from "commonComponents" using "<nameOfObject>" object name
      And I hover mouse onto help icon
    Then tooltipPreview on preview is set to <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario Outline: Change tooltip position to <tooltipPosition>
    When I open default "Help" component in noIFrame with "help" json from "commonComponents" using "<nameOfObject>" object name
      And I hover mouse onto help icon
    Then tooltipPosition is set to "<tooltipPosition>"
    Examples:
      | tooltipPosition | nameOfObject          |
      | left            | tooltipPositionLeft   |
      | right           | tooltipPositionRight  |
      | top             | tooltipPositionTop    |
      | bottom          | tooltipPositionBottom |

  @positive
  Scenario Outline: Change tooltip align to <tooltipAlign>
    When I open default "Help" component in noIFrame with "help" json from "commonComponents" using "<nameOfObject>" object name
      And I hover mouse onto help icon
    Then tooltipAlign is set to "<tooltipAlign>"
    Examples:
      | tooltipAlign | nameOfObject       |
      | center       | tooltipAlignCenter |
      | bottom       | tooltipAlignBottom |
      | left         | tooltipAlignLeft   |
      | right        | tooltipAlignRight  |
      | top          | tooltipAlignTop    |

  @positive
  Scenario Outline: Change href to <href>
    When I open default "Help" component in noIFrame with "help" json from "commonComponents" using "<nameOfObject>" object name
    Then Help href on preview is set to <href>
    Examples:
      | href                         | nameOfObject         |
      | mp150ú¿¡üßä                  | hrefOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | hrefSpecialCharacter |