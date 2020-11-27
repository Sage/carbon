Feature: Experimental Number Input component
  I want to check Experimental Number Input component properties

  @positive
  Scenario Outline: Change field help text to <fieldHelp>
    When I open default "Experimental Number Input Test" component in noIFrame with "numberInput" json from "experimental" using "<nameOfObject>" object name
    Then fieldHelp on preview is set to <fieldHelp> in NoIFrame
    Examples:
      | fieldHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | fieldHelpSpecialCharacter |

  @positive
  Scenario Outline: Set label to <label>
    When I open default "Experimental Number Input Test" component in noIFrame with "numberInput" json from "experimental" using "<nameOfObject>" object name
    Then label on preview is <label> in NoIFrame
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |

  @positive
  Scenario Outline: Change label help text to <labelHelp>
    Given I open default "Experimental Number Input Test" component in noIFrame with "numberInput" json from "experimental" using "<nameOfObject>" object name
    When I hover mouse onto help icon
    Then tooltipPreview on preview is set to <labelHelp>
    Examples:
      | labelHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | labelHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelHelpSpecialCharacter |

  @positive
  Scenario: Check icon inside of input is visible
    When I open default "Experimental Number Input Test" component in noIFrame with "numberInput" json from "experimental" using "inputIconAdd" object name
    Then icon name in noIframe on preview is "add"
