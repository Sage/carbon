# This feature require separate task for update
Feature: Portrait component
  I want to test Portrait component

  Background: Open Portrait component page classic
    Given I open "Portrait" component page classic

  @ignore @positive
  Scenario Outline: Change Portrait alt to <alt>
    When I set alt to "<alt>"
    Then Portrait alt on preview is set to "<alt>"
    Examples:
      | alt                     |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                       |

  @ignore @positive
  Scenario: Enable darkBackground checkbox for a Portrait component
    When I check darkBackground checkbox
    Then Portrait initials value is set to "AZ_DARK"

  @ignore @positive
  Scenario: Enable and disable darkBackground checkbox for a Portrait component
    When I check darkBackground checkbox
      And I uncheck darkBackground checkbox
    Then Portrait initials value is set to "AZ"

  @ignore @positive
  Scenario: Set Portrait source to src
    When I select source to "src"
    Then Portrait source is set to "src"

  @ignore @positive
  Scenario: Set Portrait source to gravatar
    When I select source to "gravatar"
      And I set gravatar to "ABC"
    Then Portrait source is set to "https://www.gravatar.com/avatar/900150983cd24fb0d6963f7d28e17f72?s=60&d=blank"

  @ignore @positive
  Scenario Outline: Set Portrait src to <source>
    When I select source to "src"
      And I set src to "<source>"
    Then Portrait src value is set to "<source>"
    Examples:
      | source                  |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                       |

  @ignore @positive
  Scenario Outline: Change Portrait initials to <initials>
    When I set initials to "<initials>"
    Then Portrait initials value is set to "<initials>"
    Examples:
      | initials |
      | A        |
      | BC       |
      | DEF      |

  @ignore @positive
  Scenario Outline: Set Portrait gravatar to <gravatar>
    When I select source to "gravatar"
      And I set gravatar to "<gravatar>"
    Then Portrait gravatar value is set to "<result>"
    Examples:
      | gravatar | result                                                                        |
      | A        | https://www.gravatar.com/avatar/0cc175b9c0f1b6a831c399e269772661?s=60&d=blank |
      | BC       | https://www.gravatar.com/avatar/5360af35bde9ebd8f01f492dc059593c?s=60&d=blank |
      | DEF      | https://www.gravatar.com/avatar/4ed9407630eb1000c0f6b63842defa7d?s=60&d=blank |

  @ignore @positive
  Scenario Outline: Set Portrait shape to <shape>
    When I select shape to "<shape>"
    Then Portrait shape value is set to "<shape>"
    Examples:
      | shape    |
      | standard |
      | circle   |
      | leaf     |

  @ignore @positive
  Scenario Outline: Set Portrait size to <size>
    When I select size to "<size>"
    Then Portrait size has "<sizeInPx>"
    Examples:
      | size        | sizeInPx |
      | extra-small | 25       |
      | small       | 30       |
      | medium-small| 40       |
      | medium      | 60       |
      | medium-large| 70       |
      | large       | 100      |
      | extra-large | 120      |