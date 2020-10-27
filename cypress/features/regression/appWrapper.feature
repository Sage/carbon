Feature: App Wrapper component
  I want to check App Wrapper component properties

  @positive
  Scenario Outline: Change App Wrapper children to <children>
    When I open Basic "AppWrapper Test" component in noIFrame with "appWrapper" json from "commonComponents" using "<nameOfObject>" object name
    Then App Wrapper children on preview is <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |