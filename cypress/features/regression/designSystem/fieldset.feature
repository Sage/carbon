Feature: Fieldset component
  I want to check Fieldset component properties

  @positive
  Scenario Outline: Change legend in Fieldset to <legend>
    When I open default "Fieldset Test" component with "fieldset" json from "commonComponents" using "<nameOfObject>" object name
    Then legend on preview is <legend>
    Examples:
      | legend                       | nameOfObject           |
      | mp150ú¿¡üßä                  | legendOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | legendSpecialCharacter |

  @negative
  Scenario: Set legend in Fieldset to empty
    When I open default "Fieldset Test" component with "fieldset" json from "commonComponents" using "legendEmpty" object name
    Then legend on preview not exists