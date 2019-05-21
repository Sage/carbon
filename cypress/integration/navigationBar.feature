Feature: Navigation Bar component
  I want to change Navigation Bar component properties

  Background: Open Navigation Bar component page
    Given I open "Navigation Bar" component page

  @positive
  Scenario Outline: Change Navigation Bar children
    When I set children to "<children>"
    Then Navigation Bar children on preview is set to "<children>"
    Examples:
      | children                |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

@positive
  Scenario Outline: Change as property of Navigation Bar component
    When I select as to "<asProperty>"
    Then Navigation Bar as on preview is "<asProperty>"
    Examples:
      | asProperty  |
      | primary     |
      | secondary   |
      | transparent |