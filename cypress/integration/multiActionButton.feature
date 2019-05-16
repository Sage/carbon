Feature: Multi Action Button component
  I want to change Multi Action Button component properties

  Background: Open Multi Action Button component page
    Given I open "Multi Action Button" component page

  @positive
  Scenario Outline: Change Multi Action Button text
    When I set text to "<text>"
    Then Multi Action Button text on preview is set to "<text>"
    Examples:
      | text                    |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

@positive
  Scenario Outline: Change as property of Multi Action Button component
    When I select as to "<asProperty>"
    Then Multi Action Button as on preview is "<asProperty>"
    Examples:
      | asProperty  |
      | primary     |
      | secondary   |
      | transparent |

@positive
  Scenario: Check left align property of Multi Action Button component
    When I select align to "left"
    Then Multi Action Button align on preview is left

  @positive
  Scenario: Check right align property of Multi Action Button component
    When I select align to "right"
    Then Multi Action Button align on preview is right

  @positive
  Scenario: Check disabled state of Multi Action Button component
    When I check disabled checkbox
    Then Multi Action Button is disabled

  @positive
  Scenario: Uncheck disabled state of Multi Action Button component
    When I check disabled checkbox
      And I uncheck disabled checkbox
    Then Multi Action Button is not disabled