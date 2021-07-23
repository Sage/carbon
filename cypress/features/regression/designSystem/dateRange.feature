Feature: Date Range component
  I want to check Date Range component properties

  @positive
  Scenario Outline: Change Date Range start label to <label>
    When I open default "Design System Date Range Test" component in noIFrame with "dateRange" json from "designSystem" using "<nameOfObject>" object name
    Then startLabel on preview is <label>
    Examples:
      | label                        | nameOfObject               |
      | mp150ú¿¡üßä                  | startLabelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | startLabelSpecialCharacter |

  @positive
  Scenario Outline: Change Date Range end label to <label>
    When I open default "Design System Date Range Test" component in noIFrame with "dateRange" json from "designSystem" using "<nameOfObject>" object name
    Then endLabel on preview is <label>
    Examples:
      | label                        | nameOfObject             |
      | mp150ú¿¡üßä                  | endLabelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | endLabelSpecialCharacter |