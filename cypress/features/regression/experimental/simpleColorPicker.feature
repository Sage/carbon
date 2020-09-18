Feature: Simple Color Picker component
  I want to test Simple Color Picker component

  @positive
  Scenario Outline: Set legend to <legend>
    When I open default "Experimental Simple Color Picker" component in noIFrame with "simpleColorSelect" json from "experimental" using "<nameOfObject>" object name
    Then simple color picker legend on preview is <legend> in NoIFrame
    Examples:
      | legend                       | nameOfObject           |
      | mp150ú¿¡üßä                  | legendOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | legendSpecialCharacter |

  @positive
  Scenario Outline: Set name to <name>
    When I open default "Experimental Simple Color Picker" component in noIFrame with "simpleColorSelect" json from "experimental" using "<nameOfObject>" object name
    Then simple color picker name <name> in NoIFrame
    Examples:
      | name                         | nameOfObject         |
      | mp150ú¿¡üßä                  | nameOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | nameSpecialCharacter |