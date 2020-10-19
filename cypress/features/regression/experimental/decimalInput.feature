Feature: Decimal input component
  I want to check Decimal component properties

  @positive
  Scenario Outline: Change Decimal component fieldHelp to <fieldHelp>
    When I open default "Experimental Decimal Input" component in noIFrame with "decimal" json from "experimental" using "<nameOfObject>" object name
    Then fieldHelp on preview is set to <fieldHelp> in NoIFrame
    Examples:
      | fieldHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | fieldHelpSpecialCharacter |

  @positive
  Scenario Outline: Change Decimal component label to <label>
    When I open default "Experimental Decimal Input" component in noIFrame with "decimal" json from "experimental" using "<nameOfObject>" object name
    Then label on preview is <label> in NoIFrame
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |

  @positive
  Scenario Outline: Change Decimal input align to the <direction>
    When I open default "Experimental Decimal Input" component in noIFrame with "decimal" json from "experimental" using "<nameOfObject>" object name
    Then input direction is "<direction>"
    Examples:
      | direction | nameOfObject    |
      | left      | inputAlignLeft  |
      | right     | inputAlignRight |

  @positive
  Scenario Outline: Change Decimal component label help to <label>
    Given I open default "Experimental Decimal Input" component in noIFrame with "decimal" json from "experimental" using "<nameOfObject>" object name
    When I hover mouse onto "question" icon in no iFrame
    Then tooltipPreview on preview is set to <label>
    Examples:
      | label                        | nameOfObject              |
      | mp150ú¿¡üßä                  | labelHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelHelpSpecialCharacter |

  @positive
  Scenario: Change Decimal component label inline
    Given I open default "Experimental Decimal Input" component in noIFrame with "decimal" json from "experimental" using "labelInline" object name
    Then label is inline

  @positive
  Scenario Outline: Change Decimal component label width to <width>
    When I open default "Experimental Decimal Input" component in noIFrame with "decimal" json from "experimental" using "<nameOfObject>" object name
    Then label width on preview is <width>
    Examples:
      | width | nameOfObject  |
      | 0     | labelWidth0   |
      | 10    | labelWidth10  |
      | 100   | labelWidth100 |

  @positive
  Scenario Outline: Change Decimal component input width to <width>
    When I open default "Experimental Decimal Input" component in noIFrame with "decimal" json from "experimental" using "<nameOfObject>" object name
    Then inputWidth on preview is <width>
    Examples:
      | width | nameOfObject  |
      | 1     | inputWidth1   |
      | 10    | inputWidth10  |
      | 100   | inputWidth100 |

  @positive
  Scenario Outline: Change Decimal component label align to <labelAlign>
    When I open default "Experimental Decimal Input" component in noIFrame with "decimal" json from "experimental" using "<nameOfObject>" object name
    Then label Align on preview is "<labelAlign>" in NoIFrame
    Examples:
      | labelAlign | nameOfObject    |
      | left       | labelAlignLeft  |
      | right      | labelAlignRight |

  @positive
  Scenario: Disable Decimal component
    When I open default "Experimental Decimal Input" component in noIFrame with "decimal" json from "experimental" using "disabled" object name
    Then Decimal component is disabled

  @positive
  Scenario: Disable and enable Decimal component
    When I open default "Experimental Decimal Input" component in noIFrame with "decimal" json from "experimental" using "disabledFalse" object name
    Then Decimal component is enabled

  @positive
  Scenario: Decimal component is readOnly
    When I open default "Experimental Decimal Input" component in noIFrame with "decimal" json from "experimental" using "readOnly" object name
    Then Decimal component is readOnly

  @positive
  Scenario: Decimal component is not readOnly
    When I open default "Experimental Decimal Input" component in noIFrame with "decimal" json from "experimental" using "readOnlyFalse" object name
    Then Decimal component is not readOnly

  @positive
  Scenario Outline: Check Decimal component input field will not accept characters except numbers to <label>
    Given I open "Experimental Decimal Input" component page "default" in no iframe
    When I set Decimal input to <label>
    Then Decimal input is not set to <label>
    Examples:
      | label                     |
      | mpú¿¡üßä                  |
      | !@#$%^*()_+=~[];:?{}&"'<> |
