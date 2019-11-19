Feature: Deprecated Date Range component
  I want to change deprecated Date Range component properties

  Background: Open deprecated Date Range component page
    Given I open deprecated "Date Range" component page

  @positive
  @deprecated
  Scenario Outline: Change Date Range start label to <label>
    When I set startLabel to "<label>"
    Then startLabel on preview is "<label>"
    Examples:
      | label                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <>                       |

  @positive
  @deprecated
  Scenario Outline: Change Date Range end label to <label>
    When I set endLabel to "<label>"
    Then endLabel on preview is "<label>"
    Examples:
      | label                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <>                       |

  @positive
  @deprecated
  Scenario: Enable labels inline checkbox
    When I set startLabel to "Sample text"
      And I set endLabel to "Sample text"
      And I check labelsInline checkbox
    Then labels are set to inline for deprecated component

  @positive
  @deprecated
  Scenario: Enable and disable labels inline checkbox
    When I set startLabel to "Sample text"
      And I set endLabel to "Sample text"
      And I check labelsInline checkbox
      And I uncheck labelsInline checkbox
    Then labels are not set to inline for deprecated component