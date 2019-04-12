Feature: Create component
  I want to change Create component properties

  Background: Open Content component page
    Given I open "Create" component page

  @positive
  Scenario Outline: Change data in Create component
    When I set children to "<children>"
      And I set className to "<className>"
    Then create children on preview is "<children>"
      And create className on preview is "<className>"
    Examples:
      | children                 | className                |
      | áéíóú¿¡üñ                | ÄÖÜßäöü                  |
      | 1!@#$%^*()_+-=~[];:.,?{} | <>                       |
      | ÄÖÜßäöüß                 | áéíóú¿¡üñ                |
      | <>                       | 1!@#$%^*()_+-=~[];:.,?{} |