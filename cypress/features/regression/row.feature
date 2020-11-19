Feature: Row component
  I want to test Row component properties

  @positive
  Scenario Outline: Set children to <children>
    When I open default "Row Test" component in noIFrame with "row" json from "commonComponents" using "<nameOfObject>" object name
    Then column text is <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |