Feature: Toast component
  I want to test Toast component properties

  @positive
  Scenario: Verify the click action in Actions Tab
    Given I open "Toast Test" component page "default"
    When I click closeIcon
    Then click action was called in Actions Tab

  @positive
  Scenario Outline: Change Toast children to <children>
    When I open Test default "Toast" component with "toast" json from "test" using "<nameOfObject>" object name
    Then Toast children is set to <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario: Verify that Toast is closed by pressing Esc key
    Given I open "Toast Test" component page "default"
    When I hit ESC key
    Then Toast component is not visible