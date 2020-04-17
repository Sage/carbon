Feature: Toast component
  I want to test Toast component properties

  Background: Open Toast component default page
    Given I open basic Test "Toast" component page

  @positive
  Scenario: Verify the click action in Actions Tab
    When clear all actions in Actions Tab
      And I click closeIcon
    Then click action was called in Actions Tab

  @positive
  Scenario Outline: Change Toast children to <children>
    When I set children to "<children>"
    And I wait 500
    Then Toast children is set to "<children>"
    Examples:
      | children                |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |
