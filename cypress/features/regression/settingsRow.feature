Feature: Settings Row component
  I want to test Settings Row component

  Background: Open Settings Row component page
    Given I open "SettingsRow" component page

  @positive
  Scenario Outline: Change Settings Row children to <children>
    When I set children to <children> word
    Then Settings Row children on preview is set to <children>
    Examples:
      | children                |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario Outline: Change Settings Row title to <title>
    When I set title to <title> word
    Then Settings Row title on preview is set to <title>
    Examples:
      | title                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario Outline: Change Settings Row description to <description>
    When I set description to <description> word
    Then Settings Row description on preview is set to <description>
    Examples:
      | description             |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario: Enable divider checkbox for a Settings Row component
    When I uncheck divider checkbox
      And I check divider checkbox
    Then Settings Row component has divider property

  @positive
  Scenario: Enable and disable fill checkbox for a Settings Row component
    When I uncheck divider checkbox
    Then Settings Row component has no divider property