Feature: Experimental Checkbox component
  I want to test Experimental Checkbox properties

  @positive
  Scenario Outline: Change Checkbox component label to <label>
    When I open default "Experimental Checkbox" component in noIFrame with "checkbox" json from "experimental" using "<nameOfObject>" object name
    Then checkbox label on preview is <label>
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |

  @positive
  Scenario: Disable and enable checkbox
    When I open default "Experimental Checkbox" component in noIFrame with "checkbox" json from "experimental" using "disabledFalse" object name
    Then Checkbox is enabled

  @positive
  Scenario: Disable checkbox
    When I open default "Experimental Checkbox" component in noIFrame with "checkbox" json from "experimental" using "disabled" object name
    Then Checkbox is disabled

  @positive
  Scenario Outline: Change Checkbox component field help to <fieldHelp>
    When I open default "Experimental Checkbox" component in noIFrame with "checkbox" json from "experimental" using "<nameOfObject>" object name
    Then fieldHelp on preview is set to <fieldHelp> in NoIFrame
    Examples:
      | fieldHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | fieldHelpSpecialCharacter |

  @positive
  Scenario: Enable fieldHelpInline
    When I open default "Experimental Checkbox" component in noIFrame with "checkbox" json from "experimental" using "fieldHelpInline" object name
    Then Checkbox field help is inline

  @positive
  Scenario: Enable and disable fieldHelpInline
    When I open default "Experimental Checkbox" component in noIFrame with "checkbox" json from "experimental" using "fieldHelpInlineDisabled" object name
    Then Checkbox field help is not inline

  @positive
  Scenario: Enable reverse checkbox
    When I open default "Experimental Checkbox" component in noIFrame with "checkbox" json from "experimental" using "reverse" object name
    Then Checkbox is set to reverse and has width "16px"

  @positive
  Scenario: Enable and disable reverse checkbox
    When I open default "Experimental Checkbox" component in noIFrame with "checkbox" json from "experimental" using "reverseFalse" object name
    Then Checkbox is not set to reverse and has width "16px"

  @positive
  Scenario Outline: Change Checkbox component label help to <labelHelp>
    When I open default "Experimental Checkbox" component in noIFrame with "checkbox" json from "experimental" using "<nameOfObject>" object name
      And I hover mouse onto help icon
    Then tooltipPreview on preview is set to <labelHelp>
    Examples:
      | labelHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | labelHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelHelpSpecialCharacter |

  @positive
  Scenario Outline: Change Checkbox size to <size>
    When I open default "Experimental Checkbox" component in noIFrame with "checkbox" json from "experimental" using "<nameOfObject>" object name
    Then Checkbox size on preview is set to "<size>"
    Examples:
      | size  | nameOfObject |
      | small | smallSize    |
      | large | largeSize    |

  @positive
  Scenario: Change Checkbox tick color
    Given I open "Experimental Checkbox" component page
    When I mark checkbox on preview
    Then Checkbox tick has color "rgba(0, 0, 0, 0.9)"