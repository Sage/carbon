Feature: Detail component
  I want to check Detail component properties

  @positive
  Scenario Outline: Change Detail children to <children>
    When I open default "Detail Test" component with "detail" json from "commonComponents" using "<nameOfObject>" object name
    Then detail children on preview is <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario Outline: Change Detail footnote to <footnote>
    When I open default "Detail Test" component with "detail" json from "commonComponents" using "<nameOfObject>" object name
    Then detail footnote on preview is <footnote>
    Examples:
      | footnote                     | nameOfObject             |
      | mp150ú¿¡üßä                  | footnoteOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | footnoteSpecialCharacter |

  @positive
  Scenario: Change Detail icon to chevron_up
    When I open default "Detail Test" component with "detail" json from "commonComponents" using "iconChervonUp" object name
    Then icon on preview is "chevron_up"