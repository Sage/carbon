Feature: Detail component
  I want to change Detail component properties

  Background: Open Detail component page
    Given I open "Detail" component page

  @positive
  Scenario Outline: Change Detail children to <children>
    When I set children to <children> word
    Then detail children on preview is <children>
    Examples:
      | children                |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario Outline: Change Detail footnote to <footnote>
    When I set footnote to <footnote> word
    Then detail footnote on preview is <footnote>
    Examples:
      | footnote                |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario: Change Detail icon to chevron_up
    When I set detail icon to "chevron_up"
    Then icon on preview is "chevron_up"