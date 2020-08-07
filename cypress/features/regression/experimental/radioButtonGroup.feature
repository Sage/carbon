Feature: Experimental RadioButtonGroup component
  I want to change Experimental RadioButtonGroup component properties

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