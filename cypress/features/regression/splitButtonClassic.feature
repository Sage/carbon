Feature: Split Button component
  I want to change Split Button component properties

  Background: Open Split Button component page classic
    Given I open "Split Button" component page classic

  @positive
  Scenario Outline: I select as to <as>
    When I select as to "<as>"
    Then Button background color is "<color>"
    Examples:
      | as        | color            |
      | primary   | rgb(37, 91, 199) |
      | secondary | rgba(0, 0, 0, 0) |

  @positive
  Scenario Outline: I set data-element to <data-element>
    When I set data-element to "<data-element>"
    Then data-element "<data-element>" is present
    Examples:
      | data-element            |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |

  @positive
  Scenario Outline: I set data-role to <data-role>
    When I set data-role to "<data-role>"
    Then data-role "<data-role>" is present
    Examples:
      | data-role               |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |

  @positive
  Scenario: I disable Split Button component
    When I disable SplitButton component
    Then Button is disabled

  @positive
  Scenario: I enable Split Button component
    When I disable SplitButton component
      And I enable SplitButton component
    Then Button is enabled

  @positive
  Scenario Outline: I set text to <text>
    When I set text to "<text>"
    Then Button label on preview is "<text>"
    Examples:
      | text                    |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <>

  @positive
  Scenario: I expand Split Button component
    When I hover mouse onto icon
    Then Split Button is expanded
