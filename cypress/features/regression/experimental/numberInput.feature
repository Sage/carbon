Feature: Experimental Number Input component
  I want to check Experimental Number Input component properties

  @positive
  Scenario Outline: Change field help text to <fieldHelp>
    When I open default "Experimental Number Input Test" component in noIFrame with "numberInput" json from "experimental" using "<nameOfObject>" object name
    Then fieldHelp on preview is set to <fieldHelp> in NoIFrame
    Examples:
      | fieldHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | fieldHelpSpecialCharacter |

  @positive
  Scenario: Disable and enable Number input component
    When I open default "Experimental Number Input Test" component in noIFrame with "numberInput" json from "experimental" using "disabledFalse" object name
    Then Number input component is not disabled

  @positive
  Scenario: Disable Number input component
    When I open default "Experimental Number Input Test" component in noIFrame with "numberInput" json from "experimental" using "disabled" object name
    Then Number input component is disabled

  @positive
  Scenario: Disable and enable readOnly property for Number input component
    When I open default "Experimental Number Input Test" component in noIFrame with "numberInput" json from "experimental" using "readOnlyFalse" object name
    Then Number input component is not readonly

  @positive
  Scenario: Disable readOnly property for Number input component
    When I open default "Experimental Number Input Test" component in noIFrame with "numberInput" json from "experimental" using "readOnly" object name
    Then Number input component is readonly

  @positive
  Scenario Outline: Set label to <label>
    When I open default "Experimental Number Input Test" component in noIFrame with "numberInput" json from "experimental" using "<nameOfObject>" object name
    Then label on preview is <label> in NoIFrame
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |

  @positive
  Scenario Outline: Change label help text to <labelHelp>
    Given I open default "Experimental Number Input Test" component in noIFrame with "numberInput" json from "experimental" using "<nameOfObject>" object name
    When I hover mouse onto help icon
    Then tooltipPreview on preview is set to <labelHelp>
    Examples:
      | labelHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | labelHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelHelpSpecialCharacter |

  @positive
  Scenario: Enable label inline
    When I open default "Experimental Number Input Test" component in noIFrame with "numberInput" json from "experimental" using "labelInline" object name
    Then label is inline

  @positive
  Scenario: Disable label inline
    When I open default "Experimental Number Input Test" component in noIFrame with "numberInput" json from "experimental" using "labelInlineFalse" object name
    Then NumberInput component labelInline is disabled

  @positive
  Scenario Outline: Set input width to <inputWidth>
    When I open default "Experimental Number Input Test" component in noIFrame with "numberInput" json from "experimental" using "<nameOfObject>" object name
    Then inputWidth on preview is <inputWidth>
    Examples:
      | inputWidth | nameOfObject  |
      | 1          | inputWidth1   |
      | 10         | inputWidth10  |
      | 100        | inputWidth100 |

  @positive
  Scenario Outline: Set label width to <labelWidth>
    When I open default "Experimental Number Input Test" component in noIFrame with "numberInput" json from "experimental" using "<nameOfObject>" object name
    Then label width on preview is <labelWidth>
    Examples:
      | labelWidth | nameOfObject  |
      | 1          | labelWidth1   |
      | 10         | labelWidth10  |
      | 100        | labelWidth100 |

  @positive
  Scenario Outline: Set label align to <labelAlign>
    When I open default "Experimental Number Input Test" component in noIFrame with "numberInput" json from "experimental" using "<nameOfObject>" object name
    Then label Align on preview is "<labelAlign>" in NoIFrame
    Examples:
      | labelAlign | nameOfObject    |
      | right      | labelAlignRight |
      | left       | labelAlignLeft  |

  @positive
  Scenario Outline: Set size to <size>
    When I open default "Experimental Number Input Test" component in noIFrame with "numberInput" json from "experimental" using "<nameOfObject>" object name
    Then Number input component size is set to "<size>" and has min-height set to <minHeight> and paddings set to <px>
    Examples:
      | size   | minHeight | px | nameOfObject |
      | small  | 32        | 8  | sizeSmall    |
      | medium | 40        | 11 | sizeMedium   |
      | large  | 48        | 13 | sizeLarge    |

  @positive
  Scenario: Check icon inside of input is visible
    When I open default "Experimental Number Input Test" component in noIFrame with "numberInput" json from "experimental" using "inputIconAdd" object name
    Then icon name in noIframe on preview is "add"
