Feature: Date Range component
  I want to check Date Range component properties

  @positive
  Scenario Outline: Change Date Range start label to <label>
    When I open default "Experimental Date Range" component in noIFrame with "dateRange" json from "experimental" using "<nameOfObject>" object name
    Then startLabel on preview is <label>
    Examples:
      | label                        | nameOfObject               |
      | mp150ú¿¡üßä                  | startLabelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | startLabelSpecialCharacter |

  @positive
  Scenario Outline: Change Date Range end label to <label>
    When I open default "Experimental Date Range" component in noIFrame with "dateRange" json from "experimental" using "<nameOfObject>" object name
    Then endLabel on preview is <label>
    Examples:
      | label                        | nameOfObject             |
      | mp150ú¿¡üßä                  | endLabelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | endLabelSpecialCharacter |

  @positive
  Scenario: Enable labels inline checkbox
    When I open default "Experimental Date Range" component in noIFrame with "dateRange" json from "experimental" using "labelsInline" object name
    Then labels are set to inline

  @positive
  Scenario: Enable and disable labels inline checkbox
    When I open default "Experimental Date Range" component in noIFrame with "dateRange" json from "experimental" using "labelsInlineFalse" object name
    Then labels are not set to inline