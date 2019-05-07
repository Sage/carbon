Feature: Heading component
  I want to change Heading component properties

  Background: Open Heading component component page
    Given I open "Heading" component page

  @positive
  Scenario Outline: Change heading title
    When I set title to "<title>"
    Then heading title is set to "<title>"
    Examples:
      | title                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Change children
    When I set children to "<children>"
    Then heading children on preview is "<children>"
    Examples:
      | children                |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Change subheader
    When I set subheader to "<subheader>"
    Then subheader on preview is "<subheader>"
    Examples:
      | subheader               |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Change help
    When I set help to "<help>"
      And I hover mouse onto help icon
    Then Label help on preview is set to "<help>"
    Examples:
      | help                    |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Change helpLink
    When I set helpLink to "<helpLink>"
    Then helpLink on preview is "<helpLink>"
    Examples:
      | helpLink                |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Change backLink
    When I set backLink to "<backLink>"
    Then backLink on preview is "<backLink>"
    Examples:
      | backLink                |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario: Check divider
    When I check divider checkbox
    Then divider is visible

  @positive
  Scenario: Uncheck divider
    When I uncheck divider checkbox
    Then divider is not visible

  @positive
  Scenario: Check separator
    When I check separator checkbox
    Then separator is visible

  @positive
  Scenario: Uncheck separator
    When I uncheck separator checkbox
    Then separator is not visible
    