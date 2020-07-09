Feature: Test Navigation Bar component
  I want to test Test Navigation Bar component children property

  Background: Open Test Navigation Bar component basic page
    Given I open basic Test "NavigationBar" component page

  @positive
  Scenario Outline: Change Navigation Bar children to <children>
    When I set children to <children> word
    Then Navigation Bar children on preview is set to <children>
    Examples:
      | children                |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |
      | &"'<>                   |