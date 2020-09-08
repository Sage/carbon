Feature: Experimental Textbox multiple component
  I want to check Experimental Textbox multiple component properties

  @positive
  Scenario Outline: Set placeholder to <placeholder>
    When I open multiple "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then Multiple Textbox placeholder is set to <placeholder>
    Examples:
      | placeholder                  | nameOfObject                |
      | mp150ú¿¡üßä                  | placeholderOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | placeholderSpecialCharacter |

  @positive
  Scenario: Check disabled checkbox for a Textbox multiple component
    When I open multiple "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "disabled" object name
    Then Textbox multiple component is disabled

  @positive
  Scenario: Uncheck disabled checkbox for a Textbox multiple component
    When I open multiple "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "disabledFalse" object name
    Then Textbox multiple component is not disabled

  @positive
  Scenario: Enable readOnly checkbox for a Textbox multiple component
    When I open multiple "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "readOnly" object name
    Then Textbox multiple component is readOnly

  @positive
  Scenario: Disable readOnly checkbox for a Textbox multiple component
    When I open multiple "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "readOnlyFalse" object name
    Then Textbox multiple component is not readOnly

  @positive
  Scenario Outline: Set fieldHelp to <fieldHelp>
    When I open multiple "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then Multiple fieldHelp on preview is set to <fieldHelp>
    Examples:
      | fieldHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | fieldHelpSpecialCharacter |

  @positive
  Scenario Outline: Set label to <label>
    When I open multiple "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then Multiple label is set to <label>
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |

  @positive
  Scenario Outline: Set labelHelp to <labelHelp>
    Given I open multiple "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    When I hover mouse onto "first" help icon in NoIFrame
      And I hover mouse onto "second" help icon in NoIFrame
    Then Multiple tooltipPreview on preview is set to <labelHelp>
    Examples:
      | labelHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | labelHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelHelpSpecialCharacter |

  @positive
  Scenario: Enable labelInline checkbox for a Textbox multiple component
    When I open multiple "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "labelInline" object name
    Then Multiple Textbox component is labelInline

  @positive
  Scenario: Disable labelInline checkbox for a Textbox multiple component
    When I open multiple "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "labelInlineFalse" object name
    Then Multiple Textbox component is not labelInline

  @positive
  Scenario Outline: Set labelWidth to <labelWidth>
    When I open multiple "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then Multiple label width is set to "<labelWidth>"
    Examples:
      | labelWidth | nameOfObject  |
      | 0          | labelWidth0   |
      | 25         | labelWidth25  |
      | 100        | labelWidth100 |

  @positive
  Scenario Outline: Set inputWidth to <inputWidth>
    When I open multiple "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then Multiple Textbox inputWidth is set to "<inputWidth>"
    Examples:
      | inputWidth | nameOfObject  |
      | 50         | inputWidth50  |
      | 100        | inputWidth100 |

  @positive
  Scenario Outline: Set labelAlign to <labelAlign>
    When I open multiple "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then Multiple label Align on preview is "<labelAlign>"
    Examples:
      | labelAlign | nameOfObject    |
      | left       | labelAlignLeft  |
      | right      | labelAlignRight |

  @positive
  Scenario Outline: Verify input of Textbox multiple component
    Given I open "Experimental Textbox" component page multiple in NoIFrame
    When I type <input> into "first" Textbox
      And I type <input> into "second" Textbox
    Then Multiple textbox input on preview is set to <input>
    Examples:
      | input                        |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario Outline: Set label size to <size>
    When I open multiple "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then Multiple Textbox height is "<height>"
      And Multiple Textbox width is "<width>"
    Examples:
      | size   | height | width  | nameOfObject |
      | small  | 28px   | 1259px | sizeSmall    |
      | medium | 36px   | 1253px | sizeMedium   |
      | large  | 44px   | 1249px | sizeLarge    |