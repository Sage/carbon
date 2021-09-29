Feature: Navigation Bar Test component
  I want to test Navigation Bar component property

  @positive
  Scenario Outline: Change Navigation Bar children to <children>
    When I open Test default "Navigation Bar" component with "navigationBar" json from "test" using "<nameOfObject>" object name
    Then Navigation Bar children on preview is set to <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |