Feature: Date Range component
  I want to change Date Range component properties

  Background: Open Date Range component page
    Given I open "Experimental Date Range" component page

  @positive
  Scenario Outline: Change Date Range start label to <label>
    When I set startLabel to "<label>"
    Then startLabel on preview is "<label>"
    Examples:
      | label                    |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario Outline: Change Date Range end label to <label>
    When I set endLabel to "<label>"
    Then endLabel on preview is "<label>"
    Examples:
      | label                    |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario: Enable labels inline checkbox
    When I set startLabel to "label"
      And I set endLabel to "label"
      And I check labelsInline checkbox
    Then labels are set to inline

  @positive
  Scenario: Enable and disable labels inline checkbox
    When I set startLabel to "label"
      And I set endLabel to "label"
      And I check labelsInline checkbox
      And I uncheck labelsInline checkbox
    Then labels are not set to inline