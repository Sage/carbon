Feature: Decimal input component
  I want to check Decimal component properties

  @positive
  Scenario Outline: Change Decimal component fieldHelp to <fieldHelp>
    When I open default "Experimental Decimal Input Test" component in noIFrame with "decimal" json from "experimental" using "<nameOfObject>" object name
    Then fieldHelp on preview is set to <fieldHelp> in NoIFrame
    Examples:
      | fieldHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | fieldHelpSpecialCharacter |

  @positive
  Scenario Outline: Change Decimal component label to <label>
    When I open default "Experimental Decimal Input Test" component in noIFrame with "decimal" json from "experimental" using "<nameOfObject>" object name
    Then label on preview is <label> in NoIFrame
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |

  @positive
  Scenario Outline: Change Decimal component label help to <label>
    Given I open default "Experimental Decimal Input Test" component in noIFrame with "decimal" json from "experimental" using "<nameOfObject>" object name
    When I hover mouse onto "question" icon in no iFrame
    Then tooltipPreview on preview is set to <label>
    Examples:
      | label                        | nameOfObject              |
      | mp150ú¿¡üßä                  | labelHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelHelpSpecialCharacter |

  @positive
  Scenario Outline: Check Decimal component input field will not accept characters except numbers to <label>
    Given I open default "Experimental Decimal Input Test" component in noIFrame with "decimal" json from "experimental" using "<nameOfObject>" object name
    When I set Decimal input to <label>
    Then Decimal input is not set to <label>
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |