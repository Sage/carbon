Feature: Create component
  I want to change Create component properties

  Background: Open Content component page
    Given I open "Create" component page

  @positive
  Scenario Outline: Change children in Create component
    When I set children to "<children>"
    Then create children on preview is "<children>"
    Examples:
      | children                 |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario Outline: Change className in Create component
    When I set className to "<className>"
    Then create className on preview is "<className>"
    Examples:
      | className                |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |