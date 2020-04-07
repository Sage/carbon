Feature: Navigation Bar default component
  I want to test Navigation Bar default component properties

  Background: Open Navigation Bar component page
    Given I open "Navigation Bar" component page

  @positive
  Scenario Outline: Change Navigation Bar children to <children>
    When I set children to "<children>"
    Then Navigation Bar children on preview is set to "<children>"
    Examples:
      | children                |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <>                       |

  @positive
  Scenario Outline: Change as property of Navigation Bar component to <asProperty>
    When I select as to "<asProperty>"
    Then Navigation Bar as on preview is "<asProperty>"
    Examples:
      | asProperty  |
      | primary     |
      | secondary   |
      | transparent |