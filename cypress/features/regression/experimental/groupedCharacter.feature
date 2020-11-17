Feature: Experimental GroupedCharacter component
  I want to check Experimental Grouped character component properties

  @positive
  Scenario Outline: Set groups and verify input
    Given I open default "Experimental GroupedCharacter Test" component in noIFrame with "groupedCharacter" json from "experimental" using "<nameOfObject>" object name
    When I put "<example>" example grouped character
    Then Input component value is set to "<result>"
    Examples:
      | nameOfObject | example   | result      |
      | groups1      | 1234567   | 1-23-456    |
      | groups2      | 987654321 | 98765-432-1 |
      | groups3      | 123456789 | 12-3456-78  |

  @positive
  Scenario Outline: Set separator to <separator>
    When I open default "Experimental GroupedCharacter Test" component in noIFrame with "groupedCharacter" json from "experimental" using "<nameOfObject>" object name
      And I put "<text>" example grouped character
    Then example grouped character is "<result>"
    Examples:
      | separator | text   | result   | nameOfObject |
      | -         | 123456 | 12-34-56 | separator-   |
      | ?         | sage   | sa?ge    | separator?   |
      | #         | tests  | te#st#s  | separator#   |
      | @         | a      | a        | separator@   |
      | $         | ab     | ab       | separator$   |
      | %         | abc    | ab%c     | separator%   |
      | ^         | abcde  | ab^cd^e  | separator^   |
      | !         | abcdef | ab!cd!ef | separator!   |
      | *         | 123456 | 12*34*56 | separator*   |

  @positive
  Scenario Outline: Change fieldHelp text to <fieldHelp>
    When I open default "Experimental GroupedCharacter Test" component in noIFrame with "groupedCharacter" json from "experimental" using "<nameOfObject>" object name
    Then fieldHelp on preview is set to <fieldHelp> in NoIFrame
    Examples:
      | fieldHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | fieldHelpSpecialCharacter |

  @positive
  Scenario Outline: Set label to <label>
    When I open default "Experimental GroupedCharacter Test" component in noIFrame with "groupedCharacter" json from "experimental" using "<nameOfObject>" object name
    Then label on preview is <label> in NoIFrame
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |

  @positive
  Scenario Outline: Change labelHelp text to <labelHelp>
    Given I open default "Experimental GroupedCharacter Test" component in noIFrame with "groupedCharacter" json from "experimental" using "<nameOfObject>" object name
    When I hover mouse onto help icon
    Then tooltipPreview on preview is set to <labelHelp>
    Examples:
      | labelHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | labelHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelHelpSpecialCharacter |

  @positive
  Scenario: Check icon inside of input is visible
    When I open default "Experimental GroupedCharacter Test" component in noIFrame with "groupedCharacter" json from "experimental" using "inputIconAdd" object name
    Then icon name in noIframe on preview is "add"
