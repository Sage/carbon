Feature: Experimental RadioButtonGroup component
  I want to test Experimental RadioButtonGroup component properties

  @positive
  Scenario: RadioButton inline
    When I open default "Experimental RadioButton" component in noIFrame with "radioButtonGroup" json from "experimental" using "inline" object name
    Then RadioButtons are inline

  @positive
  Scenario: RadioButton not inline
    When I open default "Experimental RadioButton" component in noIFrame with "radioButtonGroup" json from "experimental" using "inlineFalse" object name
    Then RadioButtons are not inline

  @positive
  Scenario: LegendInline inline
    When I open default "Experimental RadioButton" component in noIFrame with "radioButtonGroup" json from "experimental" using "legendInline" object name
    Then legendInline is inline with RadioButton

  @positive
  Scenario: legendInline not inline
    When I open default "Experimental RadioButton" component in noIFrame with "radioButtonGroup" json from "experimental" using "legendInlineFalse" object name
    Then legendInline is not inline with RadioButton

  @positive
  Scenario Outline: Set groupLabel to <groupLabel>
    When I open default "Experimental RadioButton" component in noIFrame with "radioButtonGroup" json from "experimental" using "<nameOfObject>" object name
    Then legend on preview is <groupLabel> in NoIFrame
    Examples:
      | groupLabel                   | nameOfObject               |
      | mp150ú¿¡üßä                  | groupLabelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | groupLabelSpecialCharacter |

  @positive
  Scenario Outline: Change label to <label>
    When I open default "Experimental RadioButton" component in noIFrame with "radioButtonGroup" json from "experimental" using "<nameOfObject>" object name
    Then "first" radioButton on preview is <label>
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |

  @positive
  Scenario Outline: Change labelHelp to <labelHelp>
    When I open default "Experimental RadioButton" component in noIFrame with "radioButtonGroup" json from "experimental" using "<nameOfObject>" object name
      And I hover mouse onto "first" help icon in NoIFrame
    Then tooltipPreview on preview in noIframe is set to <labelHelp>
    Examples:
      | labelHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | labelHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelHelpSpecialCharacter |

  @positive
  Scenario Outline: Change weekly value to <weeklyValue>
    When I open default "Experimental RadioButton" component in noIFrame with "radioButtonGroup" json from "experimental" using "<nameOfObject>" object name
    Then "first" RadioButton has value <weeklyValue>
    Examples:
      | weeklyValue                  | nameOfObject                |
      | mp150ú¿¡üßä                  | weeklyValueOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | weeklyValueSpecialCharacter |

  @positive
  Scenario: Disable RadioButton
    When I open default "Experimental RadioButton" component in noIFrame with "radioButtonGroup" json from "experimental" using "disabled" object name
    Then "first" RadioButton component is disabled

  @positive
  Scenario: Enable RadioButton
    When I open default "Experimental RadioButton" component in noIFrame with "radioButtonGroup" json from "experimental" using "disabledFalse" object name
    Then "first" RadioButton component is enabled

  @positive
  Scenario: Enable reverse RadioButton
    When I open default "Experimental RadioButton" component in noIFrame with "radioButtonGroup" json from "experimental" using "reverse" object name
    Then "first" RadioButton is set to reverse

  @positive
  Scenario: Disable reverse RadioButton
    When I open default "Experimental RadioButton" component in noIFrame with "radioButtonGroup" json from "experimental" using "reverseFalse" object name
    Then "first" RadioButton is not set to reverse

  @positive
  Scenario Outline: Change RadioButton size to <size>
    When I open default "Experimental RadioButton" component in noIFrame with "radioButtonGroup" json from "experimental" using "<nameOfObject>" object name
    Then "first" RadioButton size on preview is set to "<size>"
    Examples:
      | size  | nameOfObject |
      | small | sizeSmall    |
      | large | sizeLarge    |

  @positive
  Scenario Outline: Change RadioButton component field help to <fieldHelp>
    When I open default "Experimental RadioButton" component in noIFrame with "radioButtonGroup" json from "experimental" using "<nameOfObject>" object name
    Then "first" fieldHelp on preview is set to <fieldHelp>
    Examples:
      | fieldHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | fieldHelpSpecialCharacter |

  @positive
  Scenario: Enable fieldHelpInline
    When I open default "Experimental RadioButton" component in noIFrame with "radioButtonGroup" json from "experimental" using "fieldHelpInline" object name
    Then "first" field help is set to fieldHelpInline and has margin-left set to "0px" and has margin-right "6px"

  @positive
  Scenario: Disable fieldHelpInline
    When I open default "Experimental RadioButton" component in noIFrame with "radioButtonGroup" json from "experimental" using "fieldHelpInlineFalse" object name
    Then "first" field help is not set to fieldHelpInline and has margin-left set to "32px"

  @positive
  Scenario Outline: Change RadioButton label align to <direction>
    When I open default "Experimental RadioButton" component in noIFrame with "radioButtonGroup" json from "experimental" using "<nameOfObject>" object name
    Then "first" label Align on preview is "<direction>"
    Examples:
      | direction | nameOfObject    |
      | left      | labelAlignLeft  |
      | right     | labelAlignRight |