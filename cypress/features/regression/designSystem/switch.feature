Feature: Switch component
  I want to test Switch properties

  @positive
  Scenario Outline: Change Switch component fieldHelp to <fieldHelp>
    When I open Default "Design System Switch Test" component in noIFrame with "switch" json from "designSystem" using "<nameOfObject>" object name
    Then fieldHelp on preview is set to <fieldHelp> in NoIFrame
    Examples:
      | fieldHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | fieldHelpSpecialCharacter |

  @positive
  Scenario Outline: Change Switch component label to <label>
    When I open Default "Design System Switch Test" component in noIFrame with "switch" json from "designSystem" using "<nameOfObject>" object name
    Then label on preview is <label> in NoIFrame
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |

  @positive
  Scenario: Enable loading property
    When I open Default "Design System Switch Test" component in noIFrame with "switch" json from "designSystem" using "loading" object name
    Then Switch component is loading

  @positive
  Scenario: Disable loading property
    When I open Default "Design System Switch Test" component in noIFrame with "switch" json from "designSystem" using "loadingFalse" object name
    Then Switch component is not loading