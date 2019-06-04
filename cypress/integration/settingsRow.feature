Feature: Settings Row component
  I want to test Settings Row component

  Background: Open Settings Row component page
    Given I open "SettingsRow" component page

  @positive
  Scenario Outline: Change Settings Row children to <children>
    When I set children to "<children>"
    Then Settings Row children on preview is set to "<children>"
    Examples:
      | children                |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario Outline: Change Settings Row title to <title>
    When I set title to "<title>"
    Then Settings Row title on preview is set to "<title>"
    Examples:
      | title                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario Outline: Change Settings Row description to <description>
    When I set description to "<description>"
    Then Settings Row description on preview is set to "<description>"
    Examples:
      | description             |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario: Enable divider checkbox for a Settings Row component
    When I check divider checkbox
    Then Settings Row component has divider property

  @positive
  Scenario: Enable and disable fill checkbox for a Settings Row component
    When I check divider checkbox
      And I uncheck divider checkbox
    Then Settings Row component has no divider property