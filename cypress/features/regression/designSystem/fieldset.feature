Feature: Design System Fieldset component
  I want to check Design System Fieldset component properties

  @positive
  Scenario Outline: Change legend in Fieldset to <legend>
    When I open default "Design System Fieldset Test" component in noIFrame with "fieldset" json from "designSystem" using "<nameOfObject>" object name
    Then legend on preview is <legend>
    Examples:
      | legend                       | nameOfObject           |
      | mp150ú¿¡üßä                  | legendOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | legendSpecialCharacter |

  @negative
  Scenario: Set legend in Fieldset to empty
    When I open default "Design System Fieldset Test" component in noIFrame with "fieldset" json from "designSystem" using "legendEmpty" object name
    Then legend on preview not exists