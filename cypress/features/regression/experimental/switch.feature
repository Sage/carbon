Feature: Switch component
  I want to test Switch properties

  @positive
  Scenario Outline: Change Switch component fieldHelp to <fieldHelp>
    When I open default "Experimental Switch" component in noIFrame with "switch" json from "experimental" using "<nameOfObject>" object name
    Then fieldHelp on preview is set to <fieldHelp> in NoIFrame
    Examples:
      | fieldHelp               | nameOfObject              |
      | mp150ú¿¡üßä             | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | fieldHelpSpecialCharacter |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario: Enable fieldHelpInline
    When I open default "Experimental Switch" component in noIFrame with "switch" json from "experimental" using "fieldHelpInline" object name
    Then Switch is set to fieldHelpInline and has marginLeft set to "0px"

  @positive
  Scenario: Disable fieldHelpInline
    When I open default "Experimental Switch" component in noIFrame with "switch" json from "experimental" using "fieldHelpInlineFalse" object name
    Then Switch is not set to fieldHelpInline and has marginTop set to "8px"

  @positive
  Scenario Outline: Change Switch component label to <label>
    When I open default "Experimental Switch" component in noIFrame with "switch" json from "experimental" using "<nameOfObject>" object name
    Then label on preview is <label> in NoIFrame
    Examples:
      | label                   | nameOfObject          |
      | mp150ú¿¡üßä             | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | labelSpecialCharacter |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario: Enable labelInline property
    When I open default "Experimental Switch" component in noIFrame with "switch" json from "experimental" using "labelInline" object name
    Then label is inline

  @positive
  Scenario: Disabled labelInline property
    When I open default "Experimental Switch" component in noIFrame with "switch" json from "experimental" using "labelInlineFalse" object name
    Then label is not inline

  @positive
  Scenario: Enable loading property
    When I open default "Experimental Switch" component in noIFrame with "switch" json from "experimental" using "loading" object name
    Then Switch component is loading

  @positive
  Scenario: Disable loading property
    When I open default "Experimental Switch" component in noIFrame with "switch" json from "experimental" using "loadingFalse" object name
    Then Switch component is not loading

  @positive
  Scenario: Disable Switch
    When I open default "Experimental Switch" component in noIFrame with "switch" json from "experimental" using "disabled" object name
    Then Switch is disabled

  @positive
  Scenario: Enable Switch
    When I open default "Experimental Switch" component in noIFrame with "switch" json from "experimental" using "disabledFalse" object name
    Then Switch is enabled

  @positive
  Scenario Outline: Change Switch size to <size>
    When I open default "Experimental Switch" component in noIFrame with "switch" json from "experimental" using "<nameOfObject>" object name
    Then Switch is set to "<size>"
    Examples:
      | size  | nameOfObject |
      | small | sizeSmall    |
      | large | sizeLarge    |

  @positive
  Scenario: Enable reverse property
    When I open default "Experimental Switch" component in noIFrame with "switch" json from "experimental" using "reverse" object name
    Then Switch component is reversed

  @positive
  Scenario: Disable reverse property
    When I open default "Experimental Switch" component in noIFrame with "switch" json from "experimental" using "reverseFalse" object name
    Then Switch component is not reversed