Feature: Select multiple component
  I want to check Select multiple component properties

  @positive
  Scenario: Disable filterable for Select component
    When I open multiple "Experimental Select" component in noIFrame with "select" json from "experimental" using "filterableFalse" object name
      And Type "aaa" text into input
    Then Select input has "" value

  @positive
  Scenario: Enable filterable for Select component
    When I open multiple "Experimental Select" component in noIFrame with "select" json from "experimental" using "filterable" object name
      And Type "Amber" text into input and select the value
    Then Select multiple input 1 element and has "Amber" value

  @positive
  Scenario: Disable typeAhead for Select component
    When I open multiple "Experimental Select" component in noIFrame with "select" json from "experimental" using "typeAheadFalse" object name
    Then Select typeAhead is disabled

  @positive
  Scenario: Enable typeAhead for Select component
    When I open default "Experimental Select" component in noIFrame with "select" json from "experimental" using "typeAhead" object name
    Then Select typeAhead is enabled

  @positive
  Scenario Outline: Set Select label to <label>
    When I open multiple "Experimental Select" component in noIFrame with "select" json from "experimental" using "<nameOfObject>" object name
    Then label on preview is <label> in NoIFrame
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |

  @positive
  Scenario: Disable Select
    When I open multiple "Experimental Select" component in noIFrame with "select" json from "experimental" using "disabled" object name
    Then Select is disabled

  @positive
  Scenario: Enable Select
    When I open default "Experimental Select" component in noIFrame with "select" json from "experimental" using "disabledFalse" object name
    Then Select is enabled

  @positive
  Scenario: Select is readOnly
    When I open multiple "Experimental Select" component in noIFrame with "select" json from "experimental" using "readOnly" object name
    Then Select is readOnly

  @positive
  Scenario: Select is not readOnly
    When I open multiple "Experimental Select" component in noIFrame with "select" json from "experimental" using "readOnlyFalse" object name
    Then Select is not readOnly

  @positive
  Scenario Outline: Change Select component placeholder to <placeholder>
    When I open multiple "Experimental Select" component in noIFrame with "select" json from "experimental" using "<nameOfObject>" object name
    Then Select placeholder on preview is set to <placeholder>
    Examples:
      | placeholder                  | nameOfObject                |
      | mp150ú¿¡üßä                  | placeholderOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | placeholderSpecialCharacter |

  @positive
  Scenario: Verify the inner context of Select Multiple component
    Given I open "Experimental Select" component page "multiple"
    When Type "Amber" text into input and select the value in iFrame
      And Type "Black" text into input and select the value in iFrame
      And Type "Green" text into input and select the value in iFrame
    Then Select multiple input 1 element and has "Amber" value in Iframe
      And Select multiple input 2 element and has "Black" value in Iframe
      And Select multiple input 3 element and has "Green" value in Iframe

  @positive
  Scenario: Check the change function call for Select Multiple component
    Given I open "Experimental Select" component page "multiple"
    Given clear all actions in Actions Tab
    When Type "Black" text into input and select the value in iFrame
    Then change action was called in Actions Tab