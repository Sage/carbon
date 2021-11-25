Feature: App Wrapper component
  I want to check App Wrapper component properties

  @positive
  Scenario Outline: Change App Wrapper children to <children>
    When I open default "AppWrapper Test" component with "appWrapper" json from "commonComponents" using "<nameOfObject>" object name
    Then App Wrapper children on preview is <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |