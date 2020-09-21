Feature: Experimental Fieldset component
  I want to check Experimental Fieldset component properties

  @positive
  Scenario Outline: Change legend in Fieldset to <legend>
    When I open default "Experimental-Fieldset" component in noIFrame with "fieldset" json from "experimental" using "<nameOfObject>" object name
    Then legend on preview is <legend>
    Examples:
      | legend                       | nameOfObject           |
      | mp150ú¿¡üßä                  | legendOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | legendSpecialCharacter |

  @negative
  Scenario: Set legend in Fieldset to empty
    When I open default "Experimental-Fieldset" component in noIFrame with "fieldset" json from "experimental" using "legendEmpty" object name
    Then legend on preview not exists