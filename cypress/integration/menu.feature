Feature: Menu component
  I want to change Menu component properties

  Background: Open Menu component page
    Given I open "Menu" component page

  @positive
  Scenario Outline: Change Menu title
    When I set title to "<title>"
    Then title on preview is "<title>"
    Examples:
      | children                 |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |