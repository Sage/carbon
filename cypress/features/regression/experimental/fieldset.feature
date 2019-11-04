Feature: Experimental Fieldset component
  I want to change Experimental Fieldset component properties

  Background: Open Experimental Fieldset component page
    Given I open "Experimental Fieldset" component page

  @positive
  Scenario Outline: Change legend in Fieldset to <legend>
    When I set legend to "<legend>"
    Then legend on preview is "<legend>"
    Examples:
      | legend                  |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @negative
  Scenario: Set legend in Fieldset to empty
    When I set legend to empty
    Then legend on preview not exists

  @positive
  Scenario: Verify Fieldset properties
    # Given I open "Experimental Fieldset" component page
    Then Fieldset component has proper field names