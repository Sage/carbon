Feature: App Wrapper component
  I want to change App Wrapper component properties

  @positive
  Scenario Outline: Change App Wrapper children
    Given I open "App Wrapper" component page
    When I set children to "<children>"
    Then App Wrapper children on preview is "<children>"
    Examples:
      | children                 |
      | ÄÖÜßäöü                  |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | áéíóú¿¡üñ                |
      | <>                       |
