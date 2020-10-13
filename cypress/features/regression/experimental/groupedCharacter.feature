Feature: Experimental GroupedCharacter component
  I want to check Experimental Grouped character component properties

  @positive
  Scenario Outline: Set groups to <groups> and verify input
    Given I open "Experimental GroupedCharacter" component page "default"
    When I input json to "groups" input field the "<groups>"
      And I put "<example>" example grouped character
    Then Input component value is set to "<result>"
    Examples:
      | groups | example   | result      |
      | first  | 1234567   | 1-23-456    |
      | second | 987654321 | 98765-432-1 |
      | third  | 123456789 | 12-3456-78  |

  @positive
  Scenario Outline: Set separator to <separator>
    When I open default "Experimental GroupedCharacter" component in noIFrame with "groupedCharacter" json from "experimental" using "<nameOfObject>" object name
      And I put "<text>" example grouped character in no Iframe
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
  Scenario: Disable and enable GroupedCharacter component
    When I open default "Experimental GroupedCharacter" component in noIFrame with "groupedCharacter" json from "experimental" using "disabledFalse" object name
    Then GroupedCharacter input component is not disabled

  @positive
  Scenario: Disable GroupedCharacter component
    When I open default "Experimental GroupedCharacter" component in noIFrame with "groupedCharacter" json from "experimental" using "disabled" object name
    Then GroupedCharacter input component is disabled

  @positive
  Scenario: Disable and enable readOnly property for GroupedCharacter component
    When I open default "Experimental GroupedCharacter" component in noIFrame with "groupedCharacter" json from "experimental" using "readOnlyFalse" object name
    Then GroupedCharacter input component is not readonly

  @positive
  Scenario: Disable readOnly property for GroupedCharacter component
    When I open default "Experimental GroupedCharacter" component in noIFrame with "groupedCharacter" json from "experimental" using "readOnly" object name
    Then GroupedCharacter input component is readonly

  @positive
  Scenario Outline: Change fieldHelp text to <fieldHelp>
    When I open default "Experimental GroupedCharacter" component in noIFrame with "groupedCharacter" json from "experimental" using "<nameOfObject>" object name
    Then fieldHelp on preview is set to <fieldHelp> in NoIFrame
    Examples:
      | fieldHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | fieldHelpSpecialCharacter |

  @positive
  Scenario Outline: Set label to <label>
    When I open default "Experimental GroupedCharacter" component in noIFrame with "groupedCharacter" json from "experimental" using "<nameOfObject>" object name
    Then label on preview is <label> in NoIFrame
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |

  @positive
  Scenario Outline: Set size to <size>
    When I open default "Experimental GroupedCharacter" component in noIFrame with "groupedCharacter" json from "experimental" using "<nameOfObject>" object name
    Then GroupedCharacter input component size is set to "<size>" and has min-height set to <minHeight> and paddings set to <px>
    Examples:
      | size   | minHeight | px | nameOfObject |
      | small  | 32        | 8  | sizeSmall    |
      | medium | 40        | 11 | sizeMedium   |
      | large  | 48        | 13 | sizeLarge    |

  @positive
  Scenario Outline: Change labelHelp text to <labelHelp>
    Given I open default "Experimental GroupedCharacter" component in noIFrame with "groupedCharacter" json from "experimental" using "<nameOfObject>" object name
    When I hover mouse onto help icon
    Then tooltipPreview on preview is set to <labelHelp>
    Examples:
      | labelHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | labelHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelHelpSpecialCharacter |

  @positive
  Scenario: Enable label inline
    When I open default "Experimental Number Input" component in noIFrame with "groupedCharacter" json from "experimental" using "labelInline" object name
    Then label is inline

  @positive
  Scenario: Disable label inline
    When I open default "Experimental Number Input" component in noIFrame with "groupedCharacter" json from "experimental" using "labelInlineFalse" object name
    Then GroupedCharacter component labelInline is disabled

  @positive
  Scenario Outline: Set label width to <labelWidth>
    When I open default "Experimental GroupedCharacter" component in noIFrame with "groupedCharacter" json from "experimental" using "<nameOfObject>" object name
    Then label width on preview is <labelWidth>
    Examples:
      | labelWidth | nameOfObject  |
      | 1          | labelWidth1   |
      | 10         | labelWidth10  |
      | 100        | labelWidth100 |

  @positive
  Scenario Outline: Set input width to <inputWidth>
    When I open default "Experimental GroupedCharacter" component in noIFrame with "groupedCharacter" json from "experimental" using "<nameOfObject>" object name
    Then inputWidth on preview is <inputWidth>
    Examples:
      | inputWidth | nameOfObject  |
      | 1          | inputWidth1   |
      | 10         | inputWidth10  |
      | 100        | inputWidth100 |

  @positive
  Scenario Outline: Set label align to <labelAlign>
    When I open default "Experimental GroupedCharacter" component in noIFrame with "groupedCharacter" json from "experimental" using "<nameOfObject>" object name
    Then label Align on preview is "<labelAlign>" in NoIFrame
    Examples:
      | labelAlign | nameOfObject    |
      | right      | labelAlignRight |
      | left       | labelAlignLeft  |

  @positive
  Scenario: Check icon inside of input is visible
    When I open default "Experimental GroupedCharacter" component in noIFrame with "groupedCharacter" json from "experimental" using "inputIconAdd" object name
    Then icon name in noIframe on preview is "add"