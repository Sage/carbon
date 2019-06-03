Feature: Row component
  I want to change Row component properties

  Background: Open Row component page
    Given I open "Row" component page

  @positive
  Scenario: I check columnDivide
    When I check columnDivide checkbox
    Then columnDivide is set

  @positive
  Scenario: I uncheck columnDivide
    When I check columnDivide checkbox
      And I uncheck columnDivide checkbox
    Then columnDivide is not set

  @positive
  Scenario Outline: Set columnAlign to <gutter>
    When I select gutter to "<gutter>"
    Then gutter on preview is "<gutter>"
    Examples:
      | gutter       |
      | extra-small  |
      | small        |
      | medium-small |
      | medium       |
      | medium-large |
      | large        |
      | extra-large  |

  @positive
  Scenario Outline: Set columnAlign to <direction>
    When I select columnAlign to "<direction>"
    Then columnAlign on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |

  @positive
  Scenario Outline: Set columnOffset
    When I set columnOffset to "<columnOffset>"
    Then columnOffset on preview is "<columnOffset>"
    Examples:
      | columnOffset |
      | -100         |
      | -10          |
      | -1           |
      | 0            |
      | 1            |
      | 10           |
      | 100          |

  @negative
  Scenario Outline: Set columnOffset out of scope
    When I set columnOffset to "<columnOffset>"
    Then columnOffset on preview is "<columnOffset>"
    Examples:
      | columnOffset            |
      | Sample text             |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <> |

  @positive
  Scenario Outline: Set columnSpan
    When I set columnSpan to "<columnSpan>"
    Then columnSpan on preview is "<columnSpan>"
    Examples:
      | columnSpan |
      | -100       |
      | -10        |
      | -1         |
      | 0          |
      | 1          |
      | 10         |
      | 100        |

  @positive
  Scenario Outline: Set columnSpan out of scope
    When I set columnSpan to "<columnSpan>"
    Then columnSpan on preview is "<columnSpan>"
    Examples:
      | columnSpan              |
      | Sample text             |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <> |


  @positive
  Scenario Outline: Set children to <children>
    When I set children to "<children>"
    Then column text is "<children>"
    Examples:
      | children                |
      | Sample text             |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
# @ignore because of FE-1447
# | <> |