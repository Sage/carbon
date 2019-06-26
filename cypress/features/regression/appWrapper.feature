Feature: App Wrapper component
  I want to change App Wrapper component properties

  @positive
  Scenario Outline: Change App Wrapper children to <children>
    Given I open "App Wrapper" component page
    When I set children to "<children>"
    Then App Wrapper children on preview is "<children>"
    Examples:
      | children                 |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      # @ignore because of FE-1447
      # | <>                       |