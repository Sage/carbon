Feature: Fieldset component
  I want to change Fieldset component properties

  Background: Open Fieldset component page
    Given I open "Fieldset" component page

  @positive
  Scenario Outline: Change legend in Fieldset
    When I set legend to "<legend>"
    Then legend on preview is "<legend>"
    Examples:
      | legend                   |
      | Example text             |
      | áéíóú¿¡üñ                |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @negative
  Scenario: Set legend in Fieldset to empty
    When I set legend to empty
    Then legend on preview not exists