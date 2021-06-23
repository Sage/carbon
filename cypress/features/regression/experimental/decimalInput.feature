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
  Scenario Outline: Check Decimal component input field will accept characters to <input>
    Given I open "Experimental Decimal Input Test" component page "default" in no iframe
    When I set Decimal input to the "<input>"
    Then Decimal Input is set to "<input>"
    Examples:
      | input                        |
      | mpú¿¡üßä                     |
      | !@#$%^*()_+=~[];:?{}&\"'<>´^ |

  @positive
  Scenario: Check Decimal component input field will accept white-space only
    Given I open "Experimental Decimal Input Test" component page "default" in no iframe
    When I set Decimal input to a string with only white-space
    Then Decimal Input is set to white-space only