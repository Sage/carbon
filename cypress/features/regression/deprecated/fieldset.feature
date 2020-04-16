Feature: Deprecated Fieldset component
  I want to change Deprecated Fieldset component properties

  Background: Open deprecated Fieldset component page
    Given I open deprecated "Fieldset" component page

  @positive
  @deprecated
  Scenario Outline: Change legend in Fieldset to <legend>
    When I set legend to "<legend>"
    Then legend on preview is "<legend>"
    Examples:
      | legend                  |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @negative
  @deprecated
  Scenario: Set legend in Fieldset to empty
    When I set legend to empty
    Then legend on preview not exists