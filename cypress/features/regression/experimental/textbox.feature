Feature: Experimental Textbox component
  I want to check Experimental Textbox component properties

  @positive
  Scenario Outline: Set placeholder to <placeholder>
    When I open default "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then Textbox placeholder is set to <placeholder>
    Examples:
      | placeholder                  | nameOfObject                |
      | mp150ú¿¡üßä                  | placeholderOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | placeholderSpecialCharacter |

  @positive
  Scenario: Check disabled checkbox for a Textbox component
    When I open default "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "disabled" object name
    Then Textbox component is disabled

  @positive
  Scenario: Uncheck disabled checkbox for a Textbox component
    When I open default "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "disabledFalse" object name
    Then Textbox component is not disabled

  @positive
  Scenario: Enable readOnly checkbox for a Textbox component
    When I open default "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "readOnly" object name
    Then Textbox component is readOnly

  @positive
  Scenario: Disable readOnly checkbox for a Textbox component
    When I open default "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "readOnlyFalse" object name
    Then Textbox component is not readOnly

  @positive
  Scenario Outline: Set fieldHelp to <fieldHelp>
    When I open default "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then fieldHelp on preview is set to <fieldHelp> in NoIFrame
    Examples:
      | fieldHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | fieldHelpSpecialCharacter |

  @positive
  Scenario Outline: Set label to <label>
    When I open default "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then label on preview is <label> in NoIFrame
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |

  @positive
  Scenario Outline: Set labelHelp to <labelHelp>
    When I open default "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
      And I hover mouse onto "question" icon in no iFrame
    Then tooltipPreview on preview in noIframe is set to <labelHelp>
    Examples:
      | labelHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | labelHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelHelpSpecialCharacter |

  @positive
  Scenario: Enable labelInline checkbox for a Textbox component
    When I open default "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "labelInline" object name
    Then Textbox component is labelInline

  @positive
  Scenario: Enable and disable labelInline checkbox for a Textbox component
    When I open default "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "labelInlineFalse" object name
    Then Textbox component is not labelInline

  @positive
  Scenario Outline: Set labelWidth to <labelWidth>
    When I open default "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then label width on preview is <labelWidth>
    Examples:
      | labelWidth | nameOfObject  |
      | 0          | labelWidth0   |
      | 25         | labelWidth25  |
      | 100        | labelWidth100 |

  @positive
  Scenario Outline: Set inputWidth to <inputWidth>
    When I open default "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then Textbox inputWidth is set to "<inputWidth>"
    Examples:
      | inputWidth | nameOfObject  |
      | 0          | inputWidth0   |
      | 50         | inputWidth50  |
      | 100        | inputWidth100 |

  @positive
  Scenario Outline: Set labelAlign to <labelAlign>
    When I open default "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then label Align on preview is "<labelAlign>" in NoIFrame
    Examples:
      | labelAlign | nameOfObject    |
      | left       | labelAlignLeft  |
      | right      | labelAlignRight |

  @positive
  Scenario Outline: Verify input of Textbox component
    Given I open "Experimental Textbox" component page in noIFrame
    When I type <input> into Textbox
    Then Textbox input on preview is set to <input>
    Examples:
      | input                        |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario Outline: Set label size to <size>
    When I open default "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then Textbox height is "<height>"
      And Textbox width is "<width>"
    Examples:
      | size   | height | width  | nameOfObject |
      | small  | 28px   | 1263px | sizeSmall    |
      | medium | 36px   | 1257px | sizeMedium   |
      | large  | 44px   | 1253px | sizeLarge    |

  @positive
  Scenario: Check icon inside of Textbox is visible
    When I open default "Experimental-Textbox" component in noIFrame with "textbox" json from "experimental" using "inputIconAdd" object name
    Then icon name in noIframe on preview is "add"