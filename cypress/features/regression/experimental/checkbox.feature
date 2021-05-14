Feature: Experimental Checkbox component
  I want to test Experimental Checkbox properties

  @positive
  Scenario Outline: Change Checkbox component label to <label>
    When I open Default "Experimental Checkbox Test" component in noIFrame with "checkbox" json from "experimental" using "<nameOfObject>" object name
    Then checkbox label on preview is <label>
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |

  @positive
  Scenario Outline: Change Checkbox component field help to <fieldHelp>
    When I open Default "Experimental Checkbox Test" component in noIFrame with "checkbox" json from "experimental" using "<nameOfObject>" object name
    Then fieldHelp on preview is set to <fieldHelp> in NoIFrame
    Examples:
      | fieldHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | fieldHelpSpecialCharacter |

  @positive
  Scenario Outline: Change Checkbox component label help to <labelHelp>
    When I open Default "Experimental Checkbox Test" component in noIFrame with "checkbox" json from "experimental" using "<nameOfObject>" object name
      And I hover mouse onto help icon
    Then tooltipPreview on preview is set to <labelHelp>
    Examples:
      | labelHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | labelHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelHelpSpecialCharacter |

  @positive
  Scenario: Change Checkbox tick color
    Given I open Default "Experimental Checkbox Test" component in noIFrame with "checkbox" json from "experimental" using "default" object name
    When I mark checkbox on preview
    Then Checkbox tick has color "rgba(0, 0, 0, 0.9)"